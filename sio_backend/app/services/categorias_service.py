#sio_backend/app/services/categorias_service.py
from app.database import db
from sqlalchemy.exc import IntegrityError
from app.models.categoria import Categoria, SubCategoria, SsCategoria
from app.services.lista_usuarios_service import ErrorNegocio

def _normalizar_mayuscula(valor):
    if valor is None: return None
    texto = str(valor).strip().upper()
    return texto or None

# --- CATEGORIAS ---
def listar_categorias():
    return [c.to_dict() for c in Categoria.query.order_by(Categoria.nom_cat.asc()).all()]

def crear_categoria(data):
    if not data.get("nom_cat"): raise ErrorNegocio("Falta el nombre de la categoría")
    nuevo = Categoria(nom_cat=_normalizar_mayuscula(data["nom_cat"]))
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_categoria(id_cat, data):
    obj = Categoria.query.get(id_cat)
    if not obj: raise ErrorNegocio("Categoría no encontrada", 404)
    if "nom_cat" in data and data["nom_cat"]:
        obj.nom_cat = _normalizar_mayuscula(data["nom_cat"])
    db.session.commit()
    return obj.to_dict()

def eliminar_categoria(id_cat):
    obj = Categoria.query.get(id_cat)
    if not obj: raise ErrorNegocio("Categoría no encontrada", 404)
    try:
        db.session.delete(obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio("No se puede eliminar: tiene registros relacionados", 409)

# --- SUB CATEGORIAS ---
def listar_sub_categorias():
    return [c.to_dict() for c in SubCategoria.query
    .join(Categoria)
    .order_by(Categoria.nom_cat.asc(), SubCategoria.nom_sub_cat.asc())
    .all()]

def crear_sub_categoria(data):
    if not data.get("nom_sub_cat") or not data.get("id_cat"): 
        raise ErrorNegocio("Faltan campos obligatorios")
    nuevo = SubCategoria(
        nom_sub_cat=_normalizar_mayuscula(data["nom_sub_cat"]),
        id_cat=data["id_cat"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_sub_categoria(id_sub_cat, data):
    obj = SubCategoria.query.get(id_sub_cat)
    if not obj: raise ErrorNegocio("Sub Categoría no encontrada", 404)
    if "nom_sub_cat" in data: obj.nom_sub_cat = _normalizar_mayuscula(data["nom_sub_cat"])
    if "id_cat" in data: obj.id_cat = data["id_cat"]
    db.session.commit()
    return obj.to_dict()

def eliminar_sub_categoria(id_sub_cat):
    obj = SubCategoria.query.get(id_sub_cat)
    if not obj: raise ErrorNegocio("Sub Categoría no encontrada", 404)
    db.session.delete(obj)
    db.session.commit()

# --- SS CATEGORIAS ---
def listar_ss_categorias():
    return [c.to_dict() for c in SsCategoria.query
    .join(SsCategoria.categoria)
    .join(SsCategoria.sub_categoria)
    .order_by(Categoria.nom_cat.asc(), SubCategoria.nom_sub_cat.asc(), SsCategoria.nom_ss_cat.asc())
    .all()]

def crear_ss_categoria(data):
    if not data.get("nom_ss_cat") or not data.get("id_cat") or not data.get("id_sub_cat"): 
        raise ErrorNegocio("Faltan campos obligatorios")
    nuevo = SsCategoria(
        nom_ss_cat=_normalizar_mayuscula(data["nom_ss_cat"]),
        id_cat=data["id_cat"],
        id_sub_cat=data["id_sub_cat"]
    )
    db.session.add(nuevo)
    db.session.commit()
    return nuevo.to_dict()

def actualizar_ss_categoria(id_ss_cat, data):
    obj = SsCategoria.query.get(id_ss_cat)
    if not obj: raise ErrorNegocio("Ss Categoría no encontrada", 404)
    if "nom_ss_cat" in data: obj.nom_ss_cat = _normalizar_mayuscula(data["nom_ss_cat"])
    if "id_cat" in data: obj.id_cat = data["id_cat"]
    if "id_sub_cat" in data: obj.id_sub_cat = data["id_sub_cat"]
    db.session.commit()
    return obj.to_dict()

def eliminar_ss_categoria(id_ss_cat):
    obj = SsCategoria.query.get(id_ss_cat)
    if not obj: raise ErrorNegocio("Ss Categoría no encontrada", 404)
    db.session.delete(obj)
    db.session.commit()