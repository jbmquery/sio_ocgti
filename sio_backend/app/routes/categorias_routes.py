#sio_backend/app/routes/categorias_routes.py
from flask import Blueprint, request, jsonify
from app.utils.security import token_required
from app.services.categorias_service import *
from app.services.lista_usuarios_service import ErrorNegocio

categorias_bp = Blueprint('categorias_bp', __name__, url_prefix='/api')

def manejar_respuesta(func, *args):
    try:
        resultado = func(*args)
        return jsonify(resultado) if resultado is not None else jsonify({"mensaje": "OK"}), 200
    except ErrorNegocio as e:
        return jsonify({"error": e.mensaje}), e.status_code

# Categorias
@categorias_bp.route('/categorias', methods=['GET'])
@token_required
def get_cat(): return manejar_respuesta(listar_categorias)

@categorias_bp.route('/categorias', methods=['POST'])
@token_required
def post_cat(): return manejar_respuesta(crear_categoria, request.get_json(silent=True) or {})

@categorias_bp.route('/categorias/<int:id>', methods=['PUT'])
@token_required
def put_cat(id): return manejar_respuesta(actualizar_categoria, id, request.get_json(silent=True) or {})

@categorias_bp.route('/categorias/<int:id>', methods=['DELETE'])
@token_required
def del_cat(id): return manejar_respuesta(eliminar_categoria, id)

# SubCategorias
@categorias_bp.route('/sub-categorias', methods=['GET'])
@token_required
def get_sub(): return manejar_respuesta(listar_sub_categorias)

@categorias_bp.route('/sub-categorias', methods=['POST'])
@token_required
def post_sub(): return manejar_respuesta(crear_sub_categoria, request.get_json(silent=True) or {})

@categorias_bp.route('/sub-categorias/<int:id>', methods=['PUT'])
@token_required
def put_sub(id): return manejar_respuesta(actualizar_sub_categoria, id, request.get_json(silent=True) or {})

@categorias_bp.route('/sub-categorias/<int:id>', methods=['DELETE'])
@token_required
def del_sub(id): return manejar_respuesta(eliminar_sub_categoria, id)

# SsCategorias
@categorias_bp.route('/ss-categorias', methods=['GET'])
@token_required
def get_ss(): return manejar_respuesta(listar_ss_categorias)

@categorias_bp.route('/ss-categorias', methods=['POST'])
@token_required
def post_ss(): return manejar_respuesta(crear_ss_categoria, request.get_json(silent=True) or {})

@categorias_bp.route('/ss-categorias/<int:id>', methods=['PUT'])
@token_required
def put_ss(id): return manejar_respuesta(actualizar_ss_categoria, id, request.get_json(silent=True) or {})

@categorias_bp.route('/ss-categorias/<int:id>', methods=['DELETE'])
@token_required
def del_ss(id): return manejar_respuesta(eliminar_ss_categoria, id)