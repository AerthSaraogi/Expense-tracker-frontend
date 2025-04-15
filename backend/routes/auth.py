from flask import Blueprint, request, jsonify
from models.user import User
from database import db
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = User(username=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(message='User created'), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['email']).first()
    if user and user.check_password(data['password']):
        token = create_access_token(identity=str(user.id))
        return jsonify(token=token)
    return jsonify(message='Invalid credentials'), 401
