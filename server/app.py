from flask import Flask, request, redirect
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import random

db = SQLAlchemy()
app = Flask(__name__)

# app configuration
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///community.db'

db.init_app(app=app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(20), nullable=False)
    username = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(250), nullable=False)


with app.app_context():
    db.create_all()


@app.route('/register', methods=["POST"])
def register():
    json_data = request.get_json()
    if User.query.filter_by(username=json_data["username"]).first():
        return {"response": "failur", "reason": "Username is already in use"}
    if len(json_data["password"]) < 8:
        return {"response": "failur", "reason": "Password is too short"}
    new_user = User(
        email=json_data["email"],
        username=json_data["username"],
        password=generate_password_hash(
            json_data["password"], method="pbkdf2:sha256", salt_length=8)
    )
    db.session.add(new_user)
    db.session.commit()
    return {"response": "success"}, 200


@app.route('/login', methods=["POST"])
def login():
    json_data = request.get_json()
    email = json_data["email"]
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        if check_password_hash(pwhash=existing_user.password, password=json_data["password"]):
            return {"response": "success"}
    return {"response": "failur", "reson": "Email or Password issue"}


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
