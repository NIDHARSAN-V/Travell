
import cv2
import face_recognition as fr


known_face_encodings = []
known_face_names = []

knp1i = fr.load_image_file("./image1.jpg")
knp2i = fr.load_image_file("./image2.jpg")

knp1e = fr.face_encodings(knp1i)[0]
knp2e = fr.face_encodings(knp2i)[0]

known_face_encodings.append(knp1e)
known_face_encodings.append(knp2e)

known_face_names.append("Person 1")
known_face_names.append("Person 2")


video_capture = cv2.VideoCapture(0)

while True:
    ret, frame = video_capture.read()

    if not ret:
        print("Failed to grab frame")
        break

   
    face_locations = fr.face_locations(frame)
    face_encodings = fr.face_encodings(frame, face_locations)

  
    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
   
        matches = fr.compare_faces(known_face_encodings, face_encoding)
        
        name = "Unknown"
        if True in matches:
            first_match_index = matches.index(True)
            name = known_face_names[first_match_index]
        
       
        cv2.rectangle(frame, (left, top), (right, bottom), (255, 0, 0), 2)
       
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)


    cv2.imshow("Video", frame)


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()
