from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from database import db
from routes.auth import auth_bp
from routes.expenses import expenses_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(expenses_bp, url_prefix='/expenses')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
