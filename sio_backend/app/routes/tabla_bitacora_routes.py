#sio_backend/app/routes/tabla_bitacora_routes.py
from flask import Blueprint, request, jsonify
from app.utils.security import token_required
from app.services.tabla_bitacora_service import *
from app.services.lista_usuarios_service import ErrorNegocio

tabla_bitacora_bp = Blueprint('tabla_bitacora_bp', __name__, url_prefix='/api')

def manejar_respuesta(func, *args):
    try:
        resultado = func(*args)
        return jsonify(resultado) if resultado is not None else jsonify({"mensaje": "OK"}), 200
    except ErrorNegocio as e:
        return jsonify({"error": e.mensaje}), e.status_code

# Estados
@tabla_bitacora_bp.route('/estados', methods=['GET'])
@token_required
def get_est(): return manejar_respuesta(listar_estados)

@tabla_bitacora_bp.route('/estados', methods=['POST'])
@token_required
def post_est(): return manejar_respuesta(crear_estado, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/estados/<int:id>', methods=['PUT'])
@token_required
def put_est(id): return manejar_respuesta(actualizar_estado, id, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/estados/<int:id>', methods=['DELETE'])
@token_required
def del_est(id): return manejar_respuesta(eliminar_estado, id)

# Medios
@tabla_bitacora_bp.route('/medios', methods=['GET'])
@token_required
def get_med(): return manejar_respuesta(listar_medios)

@tabla_bitacora_bp.route('/medios', methods=['POST'])
@token_required
def post_med(): return manejar_respuesta(crear_medio, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/medios/<int:id>', methods=['PUT'])
@token_required
def put_med(id): return manejar_respuesta(actualizar_medio, id, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/medios/<int:id>', methods=['DELETE'])
@token_required
def del_med(id): return manejar_respuesta(eliminar_medio, id)

# Tipos
@tabla_bitacora_bp.route('/tipos', methods=['GET'])
@token_required
def get_tip(): return manejar_respuesta(listar_tipos)

@tabla_bitacora_bp.route('/tipos', methods=['POST'])
@token_required
def post_tip(): return manejar_respuesta(crear_tipo, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/tipos/<int:id>', methods=['PUT'])
@token_required
def put_tip(id): return manejar_respuesta(actualizar_tipo, id, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/tipos/<int:id>', methods=['DELETE'])
@token_required
def del_tip(id): return manejar_respuesta(eliminar_tipo, id)

# Tipo Solicitudes
@tabla_bitacora_bp.route('/tipo-solicitudes', methods=['GET'])
@token_required
def get_ts(): return manejar_respuesta(listar_tipo_solicitudes)

@tabla_bitacora_bp.route('/tipo-solicitudes', methods=['POST'])
@token_required
def post_ts(): return manejar_respuesta(crear_tipo_solicitud, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/tipo-solicitudes/<int:id>', methods=['PUT'])
@token_required
def put_ts(id): return manejar_respuesta(actualizar_tipo_solicitud, id, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/tipo-solicitudes/<int:id>', methods=['DELETE'])
@token_required
def del_ts(id): return manejar_respuesta(eliminar_tipo_solicitud, id)

# Prioridades
@tabla_bitacora_bp.route('/prioridades', methods=['GET'])
@token_required
def get_pri(): return manejar_respuesta(listar_prioridades)

@tabla_bitacora_bp.route('/prioridades', methods=['POST'])
@token_required
def post_pri(): return manejar_respuesta(crear_prioridad, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/prioridades/<int:id>', methods=['PUT'])
@token_required
def put_pri(id): return manejar_respuesta(actualizar_prioridad, id, request.get_json(silent=True) or {})

@tabla_bitacora_bp.route('/prioridades/<int:id>', methods=['DELETE'])
@token_required
def del_pri(id): return manejar_respuesta(eliminar_prioridad, id)