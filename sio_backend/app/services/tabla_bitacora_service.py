#sio_backend/app/services/tabla_bitacora_service.py
from app.database import db
from sqlalchemy.exc import IntegrityError
from app.models.tabla_bitacora import Estado, Medio, Tipo, TipoSolicitud, Prioridad
from app.services.lista_usuarios_service import ErrorNegocio

def _normalizar_mayuscula(valor):
    if valor is None: return None
    texto = str(valor).strip().upper()
    return texto or None

# --- ESTADOS ---
def listar_estados():
    return [e.to_dict() for e in Estado.query.order_by(Estado.nom_estado.asc()).all()]

def crear_estado(data):
    if not data.get("nom_estado"): raise ErrorNegocio("Falta el nombre del estado")
    nuevo = Estado(
        nom_estado=_normalizar_mayuscula(data["nom_estado"]),
        desc_estado=_normalizar_mayuscula(data.get("desc_estado"))
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_estado(id_estado, data):
    obj = Estado.query.get(id_estado)
    if not obj: raise ErrorNegocio("Estado no encontrado", 404)
    if "nom_estado" in data and data["nom_estado"]:
        obj.nom_estado = _normalizar_mayuscula(data["nom_estado"])
    if "desc_estado" in data:
        obj.desc_estado = _normalizar_mayuscula(data["desc_estado"])
    db.session.commit()
    return obj.to_dict()

def eliminar_estado(id_estado):
    obj = Estado.query.get(id_estado)
    if not obj: raise ErrorNegocio("Estado no encontrado", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)

# --- MEDIOS ---
def listar_medios():
    return [m.to_dict() for m in Medio.query.order_by(Medio.nom_medio.asc()).all()]

def crear_medio(data):
    if not data.get("nom_medio"): raise ErrorNegocio("Falta el nombre del medio")
    nuevo = Medio(
        nom_medio=_normalizar_mayuscula(data["nom_medio"]),
        desc_medio=_normalizar_mayuscula(data.get("desc_medio"))
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_medio(id_medio, data):
    obj = Medio.query.get(id_medio)
    if not obj: raise ErrorNegocio("Medio no encontrado", 404)
    if "nom_medio" in data and data["nom_medio"]:
        obj.nom_medio = _normalizar_mayuscula(data["nom_medio"])
    if "desc_medio" in data:
        obj.desc_medio = _normalizar_mayuscula(data["desc_medio"])
    db.session.commit()
    return obj.to_dict()

def eliminar_medio(id_medio):
    obj = Medio.query.get(id_medio)
    if not obj: raise ErrorNegocio("Medio no encontrado", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)

# --- TIPOS ---
def listar_tipos():
    return [t.to_dict() for t in Tipo.query.order_by(Tipo.nom_tipo.asc()).all()]

def crear_tipo(data):
    if not data.get("nom_tipo"): raise ErrorNegocio("Falta el nombre del tipo")
    nuevo = Tipo(
        nom_tipo=_normalizar_mayuscula(data["nom_tipo"]),
        desc_tipo=_normalizar_mayuscula(data.get("desc_tipo"))
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_tipo(id_tipo, data):
    obj = Tipo.query.get(id_tipo)
    if not obj: raise ErrorNegocio("Tipo no encontrado", 404)
    if "nom_tipo" in data and data["nom_tipo"]:
        obj.nom_tipo = _normalizar_mayuscula(data["nom_tipo"])
    if "desc_tipo" in data:
        obj.desc_tipo = _normalizar_mayuscula(data["desc_tipo"])
    db.session.commit()
    return obj.to_dict()

def eliminar_tipo(id_tipo):
    obj = Tipo.query.get(id_tipo)
    if not obj: raise ErrorNegocio("Tipo no encontrado", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)

# --- TIPO SOLICITUDES ---
def listar_tipo_solicitudes():
    return [ts.to_dict() for ts in TipoSolicitud.query.order_by(TipoSolicitud.nom_solicitud.asc()).all()]

def crear_tipo_solicitud(data):
    if not data.get("nom_solicitud"): raise ErrorNegocio("Falta el nombre de la solicitud")
    nuevo = TipoSolicitud(nom_solicitud=_normalizar_mayuscula(data["nom_solicitud"]))
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_tipo_solicitud(id_solicitud, data):
    obj = TipoSolicitud.query.get(id_solicitud)
    if not obj: raise ErrorNegocio("Tipo de solicitud no encontrada", 404)
    if "nom_solicitud" in data and data["nom_solicitud"]:
        obj.nom_solicitud = _normalizar_mayuscula(data["nom_solicitud"])
    db.session.commit()
    return obj.to_dict()

def eliminar_tipo_solicitud(id_solicitud):
    obj = TipoSolicitud.query.get(id_solicitud)
    if not obj: raise ErrorNegocio("Tipo de solicitud no encontrada", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)

# --- PRIORIDADES ---
def listar_prioridades():
    return [p.to_dict() for p in Prioridad.query.order_by(Prioridad.nom_prioridad.asc()).all()]

def crear_prioridad(data):
    if not data.get("nom_prioridad"): raise ErrorNegocio("Falta el nombre de la prioridad")
    nuevo = Prioridad(nom_prioridad=_normalizar_mayuscula(data["nom_prioridad"]))
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_prioridad(id_prioridad, data):
    obj = Prioridad.query.get(id_prioridad)
    if not obj: raise ErrorNegocio("Prioridad no encontrada", 404)
    if "nom_prioridad" in data and data["nom_prioridad"]:
        obj.nom_prioridad = _normalizar_mayuscula(data["nom_prioridad"])
    db.session.commit()
    return obj.to_dict()

def eliminar_prioridad(id_prioridad):
    obj = Prioridad.query.get(id_prioridad)
    if not obj: raise ErrorNegocio("Prioridad no encontrada", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)