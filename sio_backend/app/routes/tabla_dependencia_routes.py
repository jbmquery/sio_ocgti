#sio_backend/app/routes/tabla_dependencia_routes.py
from flask import Blueprint, request, jsonify
from app.utils.security import token_required
from app.services.tabla_dependencia_service import *
from app.services.lista_usuarios_service import ErrorNegocio

tabla_dependencia_bp = Blueprint('tabla_dependencia_bp', __name__, url_prefix='/api')

def manejar_respuesta(func, *args):
    try:
        resultado = func(*args)
        return jsonify(resultado) if resultado is not None else jsonify({"mensaje": "OK"}), 200
    except ErrorNegocio as e:
        return jsonify({"error": e.mensaje}), e.status_code

# Ubicación Geográfica
@tabla_dependencia_bp.route('/ubigeos', methods=['GET'])
@token_required
def get_ubi(): return manejar_respuesta(listar_ubigeos)

@tabla_dependencia_bp.route('/ubigeos', methods=['POST'])
@token_required
def post_ubi(): return manejar_respuesta(crear_ubigeo, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/ubigeos/<int:id>', methods=['PUT'])
@token_required
def put_ubi(id): return manejar_respuesta(actualizar_ubigeo, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/ubigeos/<int:id>', methods=['DELETE'])
@token_required
def del_ubi(id): return manejar_respuesta(eliminar_ubigeo, id)

# Predios
@tabla_dependencia_bp.route('/predios', methods=['GET'])
@token_required
def get_pre(): return manejar_respuesta(listar_predios)

@tabla_dependencia_bp.route('/predios', methods=['POST'])
@token_required
def post_pre(): return manejar_respuesta(crear_predio, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/predios/<int:id>', methods=['PUT'])
@token_required
def put_pre(id): return manejar_respuesta(actualizar_predio, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/predios/<int:id>', methods=['DELETE'])
@token_required
def del_pre(id): return manejar_respuesta(eliminar_predio, id)

# Pabellones
@tabla_dependencia_bp.route('/pabellones', methods=['GET'])
@token_required
def get_pab(): return manejar_respuesta(listar_pabellones)

@tabla_dependencia_bp.route('/pabellones', methods=['POST'])
@token_required
def post_pab(): return manejar_respuesta(crear_pabellon, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/pabellones/<int:id>', methods=['PUT'])
@token_required
def put_pab(id): return manejar_respuesta(actualizar_pabellon, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/pabellones/<int:id>', methods=['DELETE'])
@token_required
def del_pab(id): return manejar_respuesta(eliminar_pabellon, id)

# Dependencias
@tabla_dependencia_bp.route('/dependencias', methods=['GET'])
@token_required
def get_dep(): return manejar_respuesta(listar_dependencias)

@tabla_dependencia_bp.route('/dependencias', methods=['POST'])
@token_required
def post_dep(): return manejar_respuesta(crear_dependencia, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/dependencias/<int:id>', methods=['PUT'])
@token_required
def put_dep(id): return manejar_respuesta(actualizar_dependencia, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/dependencias/<int:id>', methods=['DELETE'])
@token_required
def del_dep(id): return manejar_respuesta(eliminar_dependencia, id)

# Carreras Profesionales
@tabla_dependencia_bp.route('/carreras', methods=['GET'])
@token_required
def get_car(): return manejar_respuesta(listar_carreras)

@tabla_dependencia_bp.route('/carreras', methods=['POST'])
@token_required
def post_car(): return manejar_respuesta(crear_carrera, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/carreras/<int:id>', methods=['PUT'])
@token_required
def put_car(id): return manejar_respuesta(actualizar_carrera, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/carreras/<int:id>', methods=['DELETE'])
@token_required
def del_car(id): return manejar_respuesta(eliminar_carrera, id)

# Tipos de Área
@tabla_dependencia_bp.route('/tipos-area', methods=['GET'])
@token_required
def get_ta(): return manejar_respuesta(listar_tipos_area)

@tabla_dependencia_bp.route('/tipos-area', methods=['POST'])
@token_required
def post_ta(): return manejar_respuesta(crear_tipo_area, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/tipos-area/<int:id>', methods=['PUT'])
@token_required
def put_ta(id): return manejar_respuesta(actualizar_tipo_area, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/tipos-area/<int:id>', methods=['DELETE'])
@token_required
def del_ta(id): return manejar_respuesta(eliminar_tipo_area, id)

# Ambientes
@tabla_dependencia_bp.route('/ambientes', methods=['GET'])
@token_required
def get_amb(): return manejar_respuesta(listar_ambientes)

@tabla_dependencia_bp.route('/ambientes', methods=['POST'])
@token_required
def post_amb(): return manejar_respuesta(crear_ambiente, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/ambientes/<int:id>', methods=['PUT'])
@token_required
def put_amb(id): return manejar_respuesta(actualizar_ambiente, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/ambientes/<int:id>', methods=['DELETE'])
@token_required
def del_amb(id): return manejar_respuesta(eliminar_ambiente, id)

# Áreas
@tabla_dependencia_bp.route('/areas', methods=['GET'])
@token_required
def get_area(): return manejar_respuesta(listar_areas)

@tabla_dependencia_bp.route('/areas', methods=['POST'])
@token_required
def post_area(): return manejar_respuesta(crear_area, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/areas/<int:id>', methods=['PUT'])
@token_required
def put_area(id): return manejar_respuesta(actualizar_area, id, request.get_json(silent=True) or {})

@tabla_dependencia_bp.route('/areas/<int:id>', methods=['DELETE'])
@token_required
def del_area(id): return manejar_respuesta(eliminar_area, id)