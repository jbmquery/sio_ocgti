#sio_backend/app/routes/auth_routes.py

from flask import Blueprint, request, jsonify
from app.services.auth_service import autenticar_usuario
from app.models.usuario import Usuario
from app.utils.security import token_required

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/api/auth')


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    correo = data.get('correo')
    clave = data.get('clave')

    if not correo or not clave:
        return jsonify({"error": "Correo y contraseña son obligatorios"}), 400

    usuario, token = autenticar_usuario(correo, clave)

    if not usuario:
        return jsonify({"error": "Credenciales incorrectas"}), 401

    return jsonify({
        "token": token,
        "usuario": usuario.to_dict()
    }), 200


@auth_bp.route('/me', methods=['GET'])
@token_required
def me():
    """Usado por el frontend al recargar la página para revalidar la sesión."""
    id_usuario = request.usuario_actual["id_usuario"]
    usuario = Usuario.query.get(id_usuario)

    if not usuario or not usuario.estado:
        return jsonify({"error": "Usuario no válido"}), 401

    return jsonify({"usuario": usuario.to_dict()}), 200


@auth_bp.route('/logout', methods=['POST'])
@token_required
def logout():
    # JWT es stateless: el "cierre de sesión" real ocurre en el frontend
    # borrando el token guardado. Este endpoint solo confirma la operación
    # (útil si más adelante quieres loguear el evento o usar una blacklist).
    return jsonify({"mensaje": "Sesión cerrada"}), 200