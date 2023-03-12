from flask import Flask, request
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.chatDB
users = db.users


@app.route('/register', methods=["POST"])
def register():
    json_data = request.get_json()

    if users.find_one({"username":json_data["username"] }):
        return {"response": "failur", "reason": "Username is already in use"}
    if len(json_data["password"]) < 8:
        return {"response": "failur", "reason": "Password is too short"}
    new_user = {
        "email": json_data["email"],
        "username": json_data["username"],
        "password": generate_password_hash(
            json_data["password"], method="pbkdf2:sha256", salt_length=8)
    }
    users.insert_one(new_user)
    return {"response": "success"}, 200


@app.route('/login', methods=["POST"])
def login():
    json_data = request.get_json()
    username = json_data["username"]
    existing_user = users.find_one({"username": username})
    if existing_user:
        if check_password_hash(pwhash=existing_user["password"], password=json_data["password"]):
            return {"response": "success"}
    return {"response": "failur", "reason": "Username or Password issue"}


@app.route('/')
def index():
    return 'server is running'


@app.route('/chat', methods=['GET', 'POST'])
def chat():
    if request.method == 'POST':
        print(request.get_json()['data'])
        return 'got post request'
    return 'got get request'


if __name__ == '__app__':
    app.run(debug=True)
