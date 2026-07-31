#sio_backend/app/routes/usuario_routes.py
from flask import Blueprint, jsonify, request
from app.database import db
from app.models.usuario import Usuario

usuario_bp = Blueprint('usuario_bp', __name__)

@usuario_bp.route('/api/usuarios', methods=['GET'])
def obtener_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([u.to_dict() for u in usuarios]), 200

@usuario_bp.route('/api/usuarios', methods=['POST'])
def crear_usuario():
    data = request.get_json()
    if not data or 'nombre' not in data or 'email' not in data:
        return jsonify({"error": "Faltan campos obligatorios ('nombre' y 'email')"}), 400

    nuevo_usuario = Usuario(nombre=data['nombre'], email=data['email'])
    db.session.add(nuevo_usuario)
    db.session.commit()
    return jsonify(nuevo_usuario.to_dict()), 201