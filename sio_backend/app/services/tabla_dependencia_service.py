#sio_backend/app/services/tabla_dependencia_service.py
from app.database import db
from sqlalchemy.exc import IntegrityError
from app.models.tabla_dependencia import (
    UbicacionGeografica, Predio, Pabellon, Dependencia, 
    CarreraProfesional, TipoArea, Ambiente, Area
)
from app.services.lista_usuarios_service import ErrorNegocio
from sqlalchemy.orm import joinedload

def _normalizar_mayuscula(valor):
    if valor is None: return None
    texto = str(valor).strip().upper()
    return texto or None

# --- UBICACION GEOGRAFICA ---
def listar_ubigeos():
    return [u.to_dict() for u in UbicacionGeografica.query
    .order_by(UbicacionGeografica.departamento.asc(), UbicacionGeografica.provincia.asc(), UbicacionGeografica.distrito.asc()).all()]

def crear_ubigeo(data):
    if not data.get("distrito") or not data.get("provincia") or not data.get("departamento"):
        raise ErrorNegocio("Distrito, Provincia y Departamento son obligatorios")
    nuevo = UbicacionGeografica(
        codigo_ubigeo=_normalizar_mayuscula(data.get("codigo_ubigeo")),
        distrito=_normalizar_mayuscula(data["distrito"]),
        provincia=_normalizar_mayuscula(data["provincia"]),
        departamento=_normalizar_mayuscula(data["departamento"]),
        pais=_normalizar_mayuscula(data.get("pais") or "PERU")
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_ubigeo(id_ubigeo, data):
    obj = UbicacionGeografica.query.get(id_ubigeo)
    if not obj: raise ErrorNegocio("Ubigeo no encontrado", 404)
    if "codigo_ubigeo" in data: obj.codigo_ubigeo = _normalizar_mayuscula(data["codigo_ubigeo"])
    if "distrito" in data and data["distrito"]: obj.distrito = _normalizar_mayuscula(data["distrito"])
    if "provincia" in data and data["provincia"]: obj.provincia = _normalizar_mayuscula(data["provincia"])
    if "departamento" in data and data["departamento"]: obj.departamento = _normalizar_mayuscula(data["departamento"])
    if "pais" in data and data["pais"]: obj.pais = _normalizar_mayuscula(data["pais"])
    db.session.commit()
    return obj.to_dict()

def eliminar_ubigeo(id_ubigeo):
    obj = UbicacionGeografica.query.get(id_ubigeo)
    if not obj: raise ErrorNegocio("Ubigeo no encontrado", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: está siendo referenciado en otros registros", 409)

# --- PREDIOS ---
def listar_predios():
    return [p.to_dict() for p in Predio.query.order_by(Predio.codigo_predio.asc()).all()]

def crear_predio(data):
    if not data.get("direccion") or not data.get("id_ubigeo"):
        raise ErrorNegocio("Dirección y Ubigeo son obligatorios")
    nuevo = Predio(
        codigo_predio=_normalizar_mayuscula(data.get("codigo_predio")),
        direccion=_normalizar_mayuscula(data["direccion"]),
        referencia=_normalizar_mayuscula(data.get("referencia")),
        id_ubigeo=data["id_ubigeo"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_predio(id_predio, data):
    obj = Predio.query.get(id_predio)
    if not obj: raise ErrorNegocio("Predio no encontrado", 404)
    if "codigo_predio" in data: obj.codigo_predio = _normalizar_mayuscula(data["codigo_predio"])
    if "direccion" in data and data["direccion"]: obj.direccion = _normalizar_mayuscula(data["direccion"])
    if "referencia" in data: obj.referencia = _normalizar_mayuscula(data["referencia"])
    if "id_ubigeo" in data and data["id_ubigeo"]: obj.id_ubigeo = data["id_ubigeo"]
    db.session.commit()
    return obj.to_dict()

def eliminar_predio(id_predio):
    obj = Predio.query.get(id_predio)
    if not obj: raise ErrorNegocio("Predio no encontrado", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)

# --- PABELLONES ---
def listar_pabellones():
    return [
        p.to_dict() for p in Pabellon.query
        .options(joinedload(Pabellon.predio)) # Trae el Predio en la misma consulta
        .join(Pabellon.predio)
        .order_by(Predio.direccion.asc(), Pabellon.nom_pabellon.asc())
        .all()
    ]

def crear_pabellon(data):
    if not data.get("nom_pabellon") or not data.get("id_predio"):
        raise ErrorNegocio("Nombre del pabellón y Predio son obligatorios")
    nuevo = Pabellon(
        nom_pabellon=_normalizar_mayuscula(data["nom_pabellon"]),
        id_predio=data["id_predio"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_pabellon(id_pabellon, data):
    obj = Pabellon.query.get(id_pabellon)
    if not obj: raise ErrorNegocio("Pabellón no encontrado", 404)
    if "nom_pabellon" in data and data["nom_pabellon"]: obj.nom_pabellon = _normalizar_mayuscula(data["nom_pabellon"])
    if "id_predio" in data and data["id_predio"]: obj.id_predio = data["id_predio"]
    db.session.commit()
    return obj.to_dict()

def eliminar_pabellon(id_pabellon):
    obj = Pabellon.query.get(id_pabellon)
    if not obj: raise ErrorNegocio("Pabellón no encontrado", 404)
    db.session.delete(obj)
    db.session.commit()

# --- DEPENDENCIAS ---
def listar_dependencias():
    return [d.to_dict() for d in Dependencia.query.order_by(Dependencia.nom_dependencia.asc()).all()]

def crear_dependencia(data):
    if not data.get("nom_dependencia"): raise ErrorNegocio("Falta el nombre de la dependencia")
    nuevo = Dependencia(
        siglas_dependencia=_normalizar_mayuscula(data.get("siglas_dependencia")),
        nom_dependencia=_normalizar_mayuscula(data["nom_dependencia"]),
        correo_electronico=str(data.get("correo_electronico")).strip().lower() if data.get("correo_electronico") else None,
        id_predio_sede=data.get("id_predio_sede") or None
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_dependencia(id_dependencia, data):
    obj = Dependencia.query.get(id_dependencia)
    if not obj: raise ErrorNegocio("Dependencia no encontrada", 404)
    if "siglas_dependencia" in data: obj.siglas_dependencia = _normalizar_mayuscula(data["siglas_dependencia"])
    if "nom_dependencia" in data and data["nom_dependencia"]: obj.nom_dependencia = _normalizar_mayuscula(data["nom_dependencia"])
    if "correo_electronico" in data: obj.correo_electronico = str(data["correo_electronico"]).strip().lower() if data["correo_electronico"] else None
    if "id_predio_sede" in data: obj.id_predio_sede = data["id_predio_sede"] or None
    db.session.commit()
    return obj.to_dict()

def eliminar_dependencia(id_dependencia):
    obj = Dependencia.query.get(id_dependencia)
    if not obj: raise ErrorNegocio("Dependencia no encontrada", 404)
    db.session.delete(obj)
    db.session.commit()

# --- CARRERAS PROFESIONALES ---
def listar_carreras():
    return [c.to_dict() for c in CarreraProfesional.query.order_by(CarreraProfesional.nom_carrera.asc()).all()]

def crear_carrera(data):
    if not data.get("nom_carrera") or not data.get("id_dependencia"):
        raise ErrorNegocio("Nombre de la carrera y Dependencia son obligatorios")
    nuevo = CarreraProfesional(
        nom_carrera=_normalizar_mayuscula(data["nom_carrera"]),
        siglas_carrera=_normalizar_mayuscula(data.get("siglas_carrera")),
        id_dependencia=data["id_dependencia"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_carrera(id_carrera, data):
    obj = CarreraProfesional.query.get(id_carrera)
    if not obj: raise ErrorNegocio("Carrera no encontrada", 404)
    if "nom_carrera" in data and data["nom_carrera"]: obj.nom_carrera = _normalizar_mayuscula(data["nom_carrera"])
    if "siglas_carrera" in data: obj.siglas_carrera = _normalizar_mayuscula(data["siglas_carrera"])
    if "id_dependencia" in data and data["id_dependencia"]: obj.id_dependencia = data["id_dependencia"]
    db.session.commit()
    return obj.to_dict()

def eliminar_carrera(id_carrera):
    obj = CarreraProfesional.query.get(id_carrera)
    if not obj: raise ErrorNegocio("Carrera no encontrada", 404)
    db.session.delete(obj)
    db.session.commit()

# --- TIPOS DE AREA ---
def listar_tipos_area():
    return [t.to_dict() for t in TipoArea.query
        .options(joinedload(TipoArea.area))
        .join(TipoArea.area)
        .order_by(Area.nom_area.asc(), TipoArea.nom_tipo_area.asc())
        .all()]

def crear_tipo_area(data):
    if not data.get("nom_tipo_area") or not data.get("id_area"):
        raise ErrorNegocio("Nombre de tipo de área y Área son obligatorios")
    nuevo = TipoArea(
        nom_tipo_area=_normalizar_mayuscula(data["nom_tipo_area"]),
        id_area=data["id_area"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_tipo_area(id_tipo_area, data):
    obj = TipoArea.query.get(id_tipo_area)
    if not obj: raise ErrorNegocio("Tipo de área no encontrado", 404)
    if "nom_tipo_area" in data and data["nom_tipo_area"]: obj.nom_tipo_area = _normalizar_mayuscula(data["nom_tipo_area"])
    if "id_area" in data and data["id_area"]: obj.id_area = data["id_area"]
    db.session.commit()
    return obj.to_dict()

def eliminar_tipo_area(id_tipo_area):
    obj = TipoArea.query.get(id_tipo_area)
    if not obj: raise ErrorNegocio("Tipo de área no encontrado", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)
        
# --- AMBIENTES ---
def listar_ambientes():
    return [a.to_dict() for a in Ambiente.query.order_by(Ambiente.nom_ambiente.asc()).all()]

def crear_ambiente(data):
    if not data.get("nom_ambiente") or not data.get("id_predio") or not data.get("id_tipo_area"):
        raise ErrorNegocio("Nombre de ambiente, Predio y Tipo de Área son obligatorios")
    nuevo = Ambiente(
        nom_ambiente=_normalizar_mayuscula(data["nom_ambiente"]),
        piso=_normalizar_mayuscula(data.get("piso")),
        id_predio=data["id_predio"],
        id_pabellon=data.get("id_pabellon") or None,
        id_dependencia=data.get("id_dependencia") or None,
        id_tipo_area=data["id_tipo_area"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_ambiente(id_ambiente, data):
    obj = Ambiente.query.get(id_ambiente)
    if not obj: raise ErrorNegocio("Ambiente no encontrado", 404)
    if "nom_ambiente" in data and data["nom_ambiente"]: obj.nom_ambiente = _normalizar_mayuscula(data["nom_ambiente"])
    if "piso" in data: obj.piso = _normalizar_mayuscula(data["piso"])
    if "id_predio" in data and data["id_predio"]: obj.id_predio = data["id_predio"]
    if "id_pabellon" in data: obj.id_pabellon = data["id_pabellon"] or None
    if "id_dependencia" in data: obj.id_dependencia = data["id_dependencia"] or None
    if "id_tipo_area" in data and data["id_tipo_area"]: obj.id_tipo_area = data["id_tipo_area"]
    db.session.commit()
    return obj.to_dict()

def eliminar_ambiente(id_ambiente):
    obj = Ambiente.query.get(id_ambiente)
    if not obj: raise ErrorNegocio("Ambiente no encontrado", 404)
    db.session.delete(obj)
    db.session.commit()

# --- AREAS ---
def listar_areas():
    return [a.to_dict() for a in Area.query.order_by(Area.nom_area.asc()).all()]

def crear_area(data):
    if not data.get("nom_area"):
        raise ErrorNegocio("El nombre del área es obligatorio")
    nuevo = Area(
        nom_area=_normalizar_mayuscula(data["nom_area"])
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_area(id_area, data):
    obj = Area.query.get(id_area)
    if not obj: raise ErrorNegocio("Área no encontrada", 404)
    if "nom_area" in data and data["nom_area"]:
        obj.nom_area = _normalizar_mayuscula(data["nom_area"])
    db.session.commit()
    return obj.to_dict()

def eliminar_area(id_area):
    obj = Area.query.get(id_area)
    if not obj: raise ErrorNegocio("Área no encontrada", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)