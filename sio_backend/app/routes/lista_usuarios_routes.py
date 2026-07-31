#sio_backend/app/routes/lista_usuarios_routes.py
from flask import Blueprint, request, jsonify
from app.services.lista_usuarios_service import (
    ErrorNegocio,
    listar_usuarios,
    crear_usuario,
    actualizar_usuario,
    eliminar_usuario,
)
from app.utils.security import token_required

lista_usuarios_bp = Blueprint('lista_usuarios_bp', __name__, url_prefix='/api/lista-usuarios')


@lista_usuarios_bp.route('', methods=['GET'])
@token_required
def obtener_lista_usuarios():
    return jsonify(listar_usuarios()), 200


@lista_usuarios_bp.route('', methods=['POST'])
@token_required
def crear_usuario_route():
    data = request.get_json(silent=True) or {}
    try:
        usuario_creado = crear_usuario(data)
    except ErrorNegocio as e:
        return jsonify({"error": e.mensaje}), e.status_code
    return jsonify(usuario_creado), 201


@lista_usuarios_bp.route('/<int:id_usuario>', methods=['PUT'])
@token_required
def actualizar_usuario_route(id_usuario):
    data = request.get_json(silent=True) or {}
    try:
        usuario_actualizado = actualizar_usuario(id_usuario, data)
    except ErrorNegocio as e:
        return jsonify({"error": e.mensaje}), e.status_code
    return jsonify(usuario_actualizado), 200


@lista_usuarios_bp.route('/<int:id_usuario>', methods=['DELETE'])
@token_required
def eliminar_usuario_route(id_usuario):
    try:
        eliminar_usuario(id_usuario)
    except ErrorNegocio as e:
        return jsonify({"error": e.mensaje}), e.status_code
    return jsonify({"mensaje": "Usuario eliminado correctamente"}), 200