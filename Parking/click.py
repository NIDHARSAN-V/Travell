import cv2

# Define initial rectangle color (green)
rect_color = (0, 255, 0)

# Define the rectangle position and size
rect_x, rect_y, rect_w, rect_h = 200, 150, 200, 150

# Function to check if the mouse click is within the rectangle
def is_inside_rectangle(x, y):
    return rect_x <= x <= rect_x + rect_w and rect_y <= y <= rect_y + rect_h

# Mouse callback function
def mouse_callback(event, x, y, flags, param):
    global rect_color
    if event == cv2.EVENT_LBUTTONDOWN:
        # Check if the click was inside the rectangle
        if is_inside_rectangle(x, y):
            rect_color = (0, 255, 255)  # Change color to yellow

# Start video capture
cap = cv2.VideoCapture(0)

# Set mouse callback
cv2.namedWindow('Video')
cv2.setMouseCallback('Video', mouse_callback)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    cv2.rectangle(frame, (rect_x, rect_y), (rect_x + rect_w, rect_y + rect_h), rect_color, 2)

    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


cap.release()
cv2.destroyAllWindows()
