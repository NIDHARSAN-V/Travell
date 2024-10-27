import cv2
import numpy as np

boxes = []  # Stores the rectangle coordinates
points = []  # Stores the points selected for the current rectangle

# Mouse callback function to select points
def select_points(event, x, y, flags, param):
    global points, boxes
    if event == cv2.EVENT_LBUTTONDOWN:
        points.append((x, y))  # Add the selected point 
        print(f"Point clicked: {x}, {y}") 
        
        if len(points) == 4:  # Once 4 points are selected
            boxes.append(points.copy())  # Add the rectangle to the list of boxes
            print(f"Rectangle added: {points}")
            points = []  # Reset points for the next rectangle

            # Write the box coordinates to a text file
            with open('boxes.txt', 'w') as f:
                for box in boxes:
                    f.write(f"{box}\n")
            print("Coordinates saved to boxes.txt")

# Load video
video_path = '../video.mp4'  # Update with your actual video path
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print("Error loading video.")
    exit()

# Read the first frame
ret, frame = cap.read()
if not ret:
    print("Error reading the first frame.")
    cap.release()
    exit()


cv2.namedWindow('RGB')
cv2.setMouseCallback('RGB', select_points)

while True:
    
    if len(points) > 0:
        cv2.polylines(frame, [np.array(points)], isClosed=True, color=(255, 0, 0), thickness=2)

   
    for box in boxes:
        cv2.polylines(frame, [np.array(box)], isClosed=True, color=(0, 255, 0), thickness=2)

    cv2.imshow('RGB', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

if len(boxes) > 0:
    print("All rectangle coordinates saved to boxes.txt")
