from flask import Flask, Response
import cv2
import requests

app = Flask(__name__)


CAMERA_URL = 'http://192.0.0.2:8080/video'  

def generate_frames():
    while True:
    
        response = requests.get(CAMERA_URL, stream=True)
        bytes_data = b''
        for chunk in response.iter_content(chunk_size=1024):
            bytes_data += chunk
            a = bytes_data.find(b'\xff\xd8') 
            b = bytes_data.find(b'\xff\xd9')  
            if a != -1 and b != -1:
                jpg = bytes_data[a:b+2] 
                bytes_data = bytes_data[b+2:] 
                frame = cv2.imdecode(np.frombuffer(jpg, dtype=np.uint8), cv2.IMREAD_COLOR)
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + jpg + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 
