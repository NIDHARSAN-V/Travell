from flask import Flask, render_template, Response, request, jsonify
import cv2
import numpy as np
from ultralytics import YOLO

app = Flask(__name__)

# Load the YOLO model
model = YOLO('yolov8s.pt')

boxes = []  # List to store points for drawn boxes
first_frame = None
cap = cv2.VideoCapture('video.mp4')  # Update the path if necessary

# Function to get the first frame of the video
def get_first_frame():
    global cap, first_frame
    if first_frame is None:
        ret, first_frame = cap.read()
        if not ret:
            cap.release()
            print("Error: Unable to read the first frame.")  # Debugging line
            return None
    print("First frame loaded successfully.")  # Debugging line
    return first_frame

# Function to get live frames from the video
def get_live_frame():
    global cap
    ret, frame = cap.read()
    if not ret:
        cap.release()
        return None
    return frame

# Index route
@app.route('/')
def index():
    return render_template('index.html')

# Route to return the first frame of the video
@app.route('/first_frame')
def first_frame_route():
    frame = get_first_frame()
    if frame is None:
        return "Error loading video.", 500
    _, buffer = cv2.imencode('.jpg', frame)  # Encode frame as JPEG
    return Response(buffer.tobytes(), mimetype='image/jpeg')

# Route to add a bounding box (user-selected points)
@app.route('/add_box', methods=['POST'])
def add_box():
    global boxes
    points = request.json.get('points')
    if points:
        boxes.append(points)
        return jsonify({'status': 'Box added successfully!'})
    return jsonify({'status': 'No points provided'})

# Live feed route
@app.route('/live_feed')
def live_feed():
    def generate_frames():
        while True:
            frame = get_live_frame()
            if frame is None:
                break

            # Convert frame to RGB for YOLO model
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = model(rgb_frame)

            # Set to store detected cars
            detected_cars = set()

            # Process YOLO detection results
            for result in results[0].boxes.data.tolist():
                x1, y1, x2, y2, conf, cls = result
                if int(cls) == 2:  # Class 2 corresponds to cars
                    detected_cars.add((int(x1), int(y1), int(x2), int(y2)))

            # Check for cars in user-defined areas (boxes)
            for idx, box in enumerate(boxes):
                box_polygon = np.array(box)
                is_car_detected = False

                # Check if a detected car overlaps with the box area
                for (dx1, dy1, dx2, dy2) in detected_cars:
                    if (box_polygon[0][0] < dx2 and box_polygon[2][0] > dx1 and
                        box_polygon[0][1] < dy2 and box_polygon[2][1] > dy1):
                        is_car_detected = True
                        break

                # Draw bounding box on the frame
                color = (0, 0, 255) if is_car_detected else (0, 255, 0)  # Red for detected, green otherwise
                cv2.polylines(frame, [box_polygon], isClosed=True, color=color, thickness=2)

            # Encode frame to JPEG for live stream
            _, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
