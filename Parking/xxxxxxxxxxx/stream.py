from flask import Flask, Response, render_template, request
from flask_cors import CORS
import cv2
import numpy as np
from ultralytics import YOLO
import ast

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = YOLO('yolov8s.pt')

# Read points from file
boxes = []
with open('boxes.txt', 'r') as f:
    for line in f.readlines():
        box = ast.literal_eval(line.strip())
        boxes.append(box)

colors = [(0, 255, 0) for _ in range(len(boxes))]
highlighted_slot = None  # Variable to store highlighted slot number
video_position = 0  # Variable to store the current position in the video

def is_inside_box(x, y, box):
    x_coords = [pt[0] for pt in box]
    y_coords = [pt[1] for pt in box]
    return min(x_coords) < x < max(x_coords) and min(y_coords) < y < max(y_coords)

# Video generator function for streaming
def generate_frames():
    global video_position  # Use the global variable to track video position
    video_path = '../video.mp4'  # Update to your actual video path
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("Error loading video.")
        exit()

    cap.set(cv2.CAP_PROP_POS_FRAMES, video_position)  # Set the video to the current position

    global highlighted_slot

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = model(rgb_frame)

        if isinstance(results, list) and len(results) > 0:
            detections = results[0]
        else:
            continue

        detected_cars = set()

        for result in detections.boxes.data.tolist():
            x1, y1, x2, y2, conf, cls = result
            if int(cls) == 2:  # '2' corresponds to cars in the COCO dataset
                detected_cars.add((int(x1), int(y1), int(x2), int(y2)))

        for idx, box in enumerate(boxes):
            color = colors[idx]

            # Change color to yellow if this slot is highlighted
            if highlighted_slot is not None and idx + 1 == highlighted_slot:
                color = (0, 255, 255)  # Yellow color

            box_polygon = np.array(box)

            for (dx1, dy1, dx2, dy2) in detected_cars:
                if (box_polygon[0][0] < dx2 and box_polygon[2][0] > dx1 and
                    box_polygon[0][1] < dy2 and box_polygon[2][1] > dy1):
                    color = (0, 0, 255)  # Change color to red if a car is detected
                    break

            # Draw the bounding box
            cv2.polylines(frame, [box_polygon], isClosed=True, color=color, thickness=2)

            # Get the top-left corner of the bounding box to place the slot number
            top_left = tuple(box[0])
            cv2.putText(frame, f'Slot {idx + 1}', (top_left[0], top_left[1] - 5), 
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

        # Encode frame to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()

        # Yield frame in byte format for streaming
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

        video_position += 1  # Increment the video position after processing each frame

    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/highlight_slot', methods=['POST'])
def highlight_slot():
    global highlighted_slot
    data = request.get_json()
    highlighted_slot = data.get('slot_number')
    return {'status': 'success'}

if __name__ == '__main__':
    app.run(debug=True)
