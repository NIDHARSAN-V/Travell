import cv2
import numpy as np
from ultralytics import YOLO
import requests


model = YOLO('yolov8s.pt')

boxes = []  
points = []
colors = []  

def select_points(event, x, y, flags, param): 
    global points, boxes, colors 
    if event == cv2.EVENT_LBUTTONDOWN: 
        points.append((x, y))
        print(f"Point clicked: {x}, {y}")
        
        if len(points) == 4:  
            boxes.append(points.copy())
            colors.append((0, 255, 0))  
            print(f"Rectangle added: {points}")
            points = []  

def is_inside_box(x, y, box):
    x_coords = [pt[0] for pt in box]
    y_coords = [pt[1] for pt in box]
    return min(x_coords) < x < max(x_coords) and min(y_coords) < y < max(y_coords)

# Load video
video_path = 'video.mp4'  
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Error loading video.")
    exit()

ret, frame = cap.read()
if not ret:
    print("Error reading the first frame.")
    cap.release()
    exit()

# Set up window and mouse callback
cv2.namedWindow('RGB')
cv2.setMouseCallback('RGB', select_points)

while True:
    # Draw each box with its current color and index
    for i, box in enumerate(boxes):
        cv2.polylines(frame, [np.array(box)], isClosed=True, color=colors[i], thickness=2)
        
        # Get the top-left corner of the box to place the index text
        top_left = tuple(box[0])
        cv2.putText(frame, str(i + 1), top_left, cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    if len(points) > 0:
        # Show temporary box while drawing
        cv2.polylines(frame, [np.array(points)], isClosed=True, color=(255, 0, 0), thickness=2)

    cv2.imshow('RGB', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

if len(boxes) > 0:
    print("All Rectangle Points:")
    for i, box in enumerate(boxes):
        print(f"Rectangle {i + 1}: {box}")

cap = cv2.VideoCapture(video_path)

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
        if int(cls) == 2: 
            detected_cars.add((int(x1), int(y1), int(x2), int(y2)))

    for idx, box in enumerate(boxes):
        color = colors[idx] 
        box_polygon = np.array(box)

        for (dx1, dy1, dx2, dy2) in detected_cars:
            if (box_polygon[0][0] < dx2 and box_polygon[2][0] > dx1 and
                box_polygon[0][1] < dy2 and box_polygon[2][1] > dy1):
                color = (0, 0, 255)  # Change color to red if a car is detected
                break

        cv2.polylines(frame, [box_polygon], isClosed=True, color=color, thickness=2)

        # Display only the index of the box
        top_left = tuple(box[0])
        cv2.putText(frame, str(idx + 1), top_left, cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    cv2.imshow('RGB', frame)

    def on_click(event, x, y, flags, param):
        global colors
        if event == cv2.EVENT_LBUTTONDOWN:
            for i, box in enumerate(boxes):
                if is_inside_box(x, y, box):
                    try:
                        res = requests.get("http://localhost:6000/park_payment")
                        if res.status_code == 200:
                            print("PARKED IN OWNER_SLOT")
                            colors[i] = (0, 255, 255)  
                            cv2.putText(frame, str(i + 1), tuple(box[0]), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
                    except requests.exceptions.RequestException as e:
                        print("Error in Payment")
                    
    cv2.setMouseCallback('RGB', on_click)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
