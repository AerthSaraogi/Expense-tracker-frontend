from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.expense import Expense
from database import db

expenses_bp = Blueprint('/expenses/', __name__)

@expenses_bp.route('/', methods=['GET'])
@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()
    expenses = Expense.query.filter_by(user_id=user_id).all()
    return jsonify([
        {
            'id': e.id,
            'type': e.type,
            'category': e.category,
            'amount': e.amount
        } for e in expenses
    ])

@expenses_bp.route('/', methods=['POST'])
@jwt_required()
def add_expense():
    user_id = get_jwt_identity()
    data = request.get_json()
    expense = Expense(
        user_id=user_id,
        type=data['type'],
        category=data['category'],
        amount=data['amount']
    )
    db.session.add(expense)
    db.session.commit()
    return jsonify(message='Expense added'), 201

@expenses_bp.route('/<int:expense_id>', methods=['DELETE'])
@jwt_required()
def delete_expense(expense_id):
    user_id = get_jwt_identity()
    expense = Expense.query.filter_by(id=expense_id, user_id=user_id).first()

    if not expense:
        return jsonify(message="Expense not found"), 404

    db.session.delete(expense)
    db.session.commit()
    return jsonify(message="Expense deleted"), 200
