import cv2
import numpy as np
from ultralytics import YOLO

# Load YOLO model
model = YOLO('yolov8s.pt')

# Initialize variables
boxes = []  # List to store rectangles
points = []  # Temporarily store points of current rectangle
colors = []  # Colors for each box

# Mouse callback to select points and define boxes
def select_points(event, x, y, flags, param):
    global points, boxes, colors
    if event == cv2.EVENT_LBUTTONDOWN:
        points.append((x, y))
        print(f"Point clicked: {x}, {y}")
        
        if len(points) == 4:  # 4 points to define the box
            boxes.append(points.copy())
            colors.append((0, 255, 0))  # Start with green for each box
            print(f"Rectangle added: {points}")
            points = []  # Reset points for the next rectangle

# Function to check if a click is inside a rectangle
def is_inside_box(x, y, box):
    x_coords = [pt[0] for pt in box]
    y_coords = [pt[1] for pt in box]
    return min(x_coords) < x < max(x_coords) and min(y_coords) < y < max(y_coords)

# Video input
video_path = 'video.mp4'  # Path to video file
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
    for i, box in enumerate(boxes):
        # Draw each box with its current color
        cv2.polylines(frame, [np.array(box)], isClosed=True, color=colors[i], thickness=2)

    if len(points) > 0:
        # If drawing a box, show it with a temporary color (blue)
        cv2.polylines(frame, [np.array(points)], isClosed=True, color=(255, 0, 0), thickness=2)

    # Display the frame
    cv2.imshow('RGB', frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

if len(boxes) > 0:
    print("All Rectangle Points:")
    for i, box in enumerate(boxes):
        print(f"Rectangle {i + 1}: {box}")

# Video processing with detection and color change logic
cap = cv2.VideoCapture(video_path)

# This callback ensures clicked areas turn yellow and stay yellow
def on_click(event, x, y, flags, param):
    global colors
    if event == cv2.EVENT_LBUTTONDOWN:
        for i, box in enumerate(boxes):
            if is_inside_box(x, y, box):
                colors[i] = (0, 255, 255)  # Change color to yellow when clicked

cv2.namedWindow('RGB')
cv2.setMouseCallback('RGB', on_click)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    results = model(rgb_frame)

    if isinstance(results, list) and len(results) > 0:
        detections = results[0]  # Get first result if model returns multiple
    else:
        continue

    detected_cars = set()

    for result in detections.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = result
        if int(cls) == 2:  # Class 2 for 'car'
            detected_cars.add((int(x1), int(y1), int(x2), int(y2)))

    for idx, box in enumerate(boxes):
        color = colors[idx]  # Get the color of the box

        # Only change to red if it's green and a car is detected
        if color == (0, 255, 0):  # If the color is green, check for cars
            box_polygon = np.array(box)
            for (dx1, dy1, dx2, dy2) in detected_cars:
                if (box_polygon[0][0] < dx2 and box_polygon[2][0] > dx1 and
                    box_polygon[0][1] < dy2 and box_polygon[2][1] > dy1):
                    color = (0, 0, 255) 
                    break


        cv2.polylines(frame, [np.array(box)], isClosed=True, color=color, thickness=2)

        detection_status = "NOT FREE SLOT" if color == (0, 0, 255) else "FREE SLOT"
        print(f"Area {idx + 1}: {detection_status}")

    cv2.imshow('RGB', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
