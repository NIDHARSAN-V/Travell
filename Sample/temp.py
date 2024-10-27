import cv2
import numpy as np
from ultralytics import YOLO
import time  # Import the time module

# Load YOLO model 
model = YOLO('yolov8s.pt')

# List to store all boxes (rectangles) 
boxes = [] 
# List to store the current points for one rectangle  
points = [] 

# Callback function to capture the clicks and form the rectangle 
def select_points(event, x, y, flags, param):
    global points, boxes
    if event == cv2.EVENT_LBUTTONDOWN:  # On left mouse click 
        points.append((x, y))  # Store the click coordinates 
        print(f"Point clicked: {x}, {y}")  # Print the coordinates
        
        if len(points) == 4:  # If 4 points are clicked 
            boxes.append(points.copy())  # Store the rectangle points in boxes
            print(f"Rectangle added: {points}")  # Print the rectangle points 
            points = []  # Reset points for the next rectangle 

# Load video from a file
video_path = 'video.mp4'  # Replace with your video file path
cap = cv2.VideoCapture(video_path)

# Check if the video was opened successfully 
if not cap.isOpened():
    print("Error loading video.")
    exit()

# Read the first frame from the video
ret, frame = cap.read()
if not ret:
    print("Error reading the first frame.")
    cap.release()
    exit()

# Create a window and set the mouse callback 
cv2.namedWindow('RGB') 
cv2.setMouseCallback('RGB', select_points)

# Display the first frame to allow the user to select rectangles
while True: 
    # Draw all stored rectangles 
    for box in boxes:
        cv2.polylines(frame, [np.array(box)], isClosed=True, color=(0, 255, 0), thickness=2)

    # Draw the current points being clicked
    if len(points) > 0: 
        cv2.polylines(frame, [np.array(points)], isClosed=True, color=(255, 0, 0), thickness=2) 

    # Display the image
    cv2.imshow('RGB', frame)

    # Break the loop with 'q' key 
    if cv2.waitKey(1) & 0xFF == ord('q'): 
        break 

# Release the video capture after using the first frame
cap.release()

# Destroy the window
cv2.destroyAllWindows()

# Print all collected rectangles
if len(boxes) > 0:
    print("All Rectangle Points:")
    for i, box in enumerate(boxes): 
        print(f"Rectangle {i + 1}: {box}")

# Reopen the video to process all frames
cap = cv2.VideoCapture(video_path)

while True:
    ret, frame = cap.read()
    if not ret:
        break  # Exit the loop if no more frames

    # Convert frame to RGB for YOLO
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Run YOLO detection
    results = model(rgb_frame)

    # Check the structure of results
    if isinstance(results, list) and len(results) > 0:
        detections = results[0]  # Get the first result if it's a list
    else:
        continue  # Skip this frame if no detections

    # Create a set to hold detected car coordinates
    detected_cars = set()
    
    # Iterate through the detections
    for result in detections.boxes.data.tolist():  # Access boxes from the result
        x1, y1, x2, y2, conf, cls = result
        if int(cls) == 2:  # Assuming class 2 corresponds to 'car'
            detected_cars.add((int(x1), int(y1), int(x2), int(y2)))

    # Check each box and print the status dynamically
    for idx, box in enumerate(boxes):
        # Check if any detected car overlaps with the current rectangle
        box_polygon = np.array(box)
        is_car_detected = False
        
        for (dx1, dy1, dx2, dy2) in detected_cars:
            # Check for overlap
            if (box_polygon[0][0] < dx2 and box_polygon[2][0] > dx1 and
                box_polygon[0][1] < dy2 and box_polygon[2][1] > dy1):
                is_car_detected = True
                break
        
        # Print the detection result
        if is_car_detected:
            print(f"Area {idx + 1}: NO")  # Car detected
        else:
            print(f"Area {idx + 1}: YES")  # No car detected

    # Draw the stored rectangles on each frame
    for idx, box in enumerate(boxes):
        box_polygon = np.array(box)
        color = (0, 0, 255) if is_car_detected else (0, 255, 0)  # Red if detected, Green otherwise
        cv2.polylines(frame, [box_polygon], isClosed=True, color=color, thickness=2)

    # Display the frame with rectangles
    cv2.imshow('RGB', frame)

    # Slow down the processing speed by adding a delay
    time.sleep(0.1)  # Adjust the delay time (in seconds) as needed

    # Break the loop with 'q' key 
    if cv2.waitKey(1) & 0xFF == ord('q'): 
        break 

# Release the video capture and destroy all windows
cap.release() 
cv2.destroyAllWindows()
