from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/park_payment', methods=['GET'])
def park_payment():
    return jsonify({'message': 'Payment successful!'}), 200

if __name__ == '__main__':
    app.run(port=6000)
