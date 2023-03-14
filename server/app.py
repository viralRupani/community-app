from flask import Flask, request
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, JWTManager, jwt_required
import json

app = Flask(__name__)

client = MongoClient('localhost', 27017)
db = client.chatDB

users = db.users
users.create_index([("username", 1)], unique=True)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
app.config["SECRET_KEY"] = "secret-key"

JWTManager(app)


@app.route('/register', methods=["POST"])
def register():
    json_data = request.get_json()
    if len(json_data["password"]) < 8:
        return json.dumps({"response": "failur", "reason": "Password is too short"})
    try:
        new_user = {
            "email": json_data["email"],
            "username": json_data["username"],
            "password": generate_password_hash(
                json_data["password"], method="pbkdf2:sha256", salt_length=8)
        }
        users.insert_one(new_user)
        return json.dumps({"response": "success"}), 200
    except DuplicateKeyError:
        return json.dumps({"response": "failur", "reason": "Username is already in use"})


@app.route('/login', methods=["POST"])
def login():
    json_data = request.get_json()
    username = json_data["username"]
    existing_user = users.find_one({"username": username})
    if existing_user:
        if check_password_hash(pwhash=existing_user["password"], password=json_data["password"]):
            print(existing_user)
            jwt_access_token = create_access_token(
                identity=existing_user["username"])
            return json.dumps({"response": "success", "jwt_access_token": jwt_access_token}), 200
    return json.dumps({"response": "failur", "reason": "Username or Password issue"}), 401


@app.route('/')
def index():
    return 'server is running'


@app.route('/chat', methods=['GET', 'POST'])
@jwt_required()
def chat():
    if request.method == 'POST':
        print(request.get_json()['data'])
        return 'got post request'
    return 'got get request'


if __name__ == '__app__':
    app.run(debug=True)
