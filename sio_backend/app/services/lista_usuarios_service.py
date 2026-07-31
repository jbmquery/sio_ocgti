# sio_backend/app/services/lista_usuarios_service.py
from datetime import date
from sqlalchemy.exc import IntegrityError
from app.database import db
from app.models.lista_usuarios import Usuario
from app.utils.security import encriptar_contrasena


class ErrorNegocio(Exception):
    """Error esperado de negocio (validación, duplicado, FK, etc.) -> se traduce a un status HTTP legible."""

    def __init__(self, mensaje, status_code=400):
        super().__init__(mensaje)
        self.mensaje = mensaje
        self.status_code = status_code


CAMPOS_OBLIGATORIOS = ["nombres", "ape_pat", "correo_institucional", "tipo"]
TIPOS_VALIDOS = ["ADMINISTRATIVO", "TECNICO"]

# Columnas que se guardan en MAYÚSCULAS. correo_institucional, usuario, salt
# y password_hash quedan fuera a propósito: esas van siempre en minúscula.
CAMPOS_MAYUSCULA = ["nombres", "ape_pat", "ape_mat", "celular", "domicilio", "tipo"]


def _normalizar_mayuscula(valor):
    """Recorta espacios y pasa a MAYÚSCULAS. Devuelve None si queda vacío."""
    if valor is None:
        return None
    texto = str(valor).strip().upper()
    return texto or None


def _usuario_desde_correo(correo: str) -> str:
    """jblanco@unfv.edu.pe -> jblanco (siempre en minúscula)"""
    return correo.strip().split("@")[0].lower()


def listar_usuarios():
    """
    Devuelve TODOS los usuarios. El filtrado/búsqueda se hace en el
    frontend (local) para no golpear el servidor en cada tecleo.
    """
    usuarios = Usuario.query.order_by(Usuario.id_usuario.desc()).all()
    return [u.to_dict_completo() for u in usuarios]


def crear_usuario(data: dict) -> dict:
    faltantes = [c for c in CAMPOS_OBLIGATORIOS if not data.get(c)]
    if faltantes:
        raise ErrorNegocio(f"Faltan campos obligatorios: {', '.join(faltantes)}")

    tipo = _normalizar_mayuscula(data["tipo"])
    if tipo not in TIPOS_VALIDOS:
        raise ErrorNegocio(f"tipo debe ser uno de: {', '.join(TIPOS_VALIDOS)}")

    correo = data["correo_institucional"].strip().lower()
    usuario_gen = _usuario_desde_correo(correo)
    salt_hex, hash_hex = encriptar_contrasena(usuario_gen)

    nuevo = Usuario(
        nombres=_normalizar_mayuscula(data["nombres"]),
        ape_pat=_normalizar_mayuscula(data["ape_pat"]),
        ape_mat=_normalizar_mayuscula(data.get("ape_mat")),
        celular=_normalizar_mayuscula(data.get("celular")),
        fecha_nacimiento=data.get("fecha_nacimiento") or None,
        domicilio=_normalizar_mayuscula(data.get("domicilio")),
        fecha_creacion=date.today(),  # se fija explícitamente, no se deja al default de la BD
        correo_institucional=correo,
        usuario=usuario_gen,
        salt=salt_hex,
        password_hash=hash_hex,
        estado=True,  # Siempre Activo al crear
        tipo=tipo,
    )

    try:
        db.session.add(nuevo)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio(
            "Ya existe un usuario con ese correo institucional (o el usuario generado ya está en uso)",
            status_code=409,
        )

    return nuevo.to_dict_completo()


def actualizar_usuario(id_usuario: int, data: dict) -> dict:
    usuario_obj = Usuario.query.get(id_usuario)
    if not usuario_obj:
        raise ErrorNegocio("Usuario no encontrado", status_code=404)

    if "tipo" in data and data["tipo"]:
        tipo = _normalizar_mayuscula(data["tipo"])
        if tipo not in TIPOS_VALIDOS:
            raise ErrorNegocio(f"tipo debe ser uno de: {', '.join(TIPOS_VALIDOS)}")
        usuario_obj.tipo = tipo

    if "nombres" in data and data["nombres"]:
        usuario_obj.nombres = _normalizar_mayuscula(data["nombres"])
    if "ape_pat" in data and data["ape_pat"]:
        usuario_obj.ape_pat = _normalizar_mayuscula(data["ape_pat"])
    if "ape_mat" in data:
        usuario_obj.ape_mat = _normalizar_mayuscula(data.get("ape_mat"))
    if "celular" in data:
        usuario_obj.celular = _normalizar_mayuscula(data.get("celular"))
    if "fecha_nacimiento" in data:
        usuario_obj.fecha_nacimiento = data.get("fecha_nacimiento") or None
    if "domicilio" in data:
        usuario_obj.domicilio = _normalizar_mayuscula(data.get("domicilio"))
    if "estado" in data and data["estado"] is not None:
        usuario_obj.estado = bool(data["estado"])

    # Si cambia el correo, el 'usuario' derivado se recalcula para mantener consistencia
    if "correo_institucional" in data and data["correo_institucional"]:
        nuevo_correo = data["correo_institucional"].strip().lower()
        if nuevo_correo != usuario_obj.correo_institucional:
            usuario_obj.correo_institucional = nuevo_correo
            usuario_obj.usuario = _usuario_desde_correo(nuevo_correo)

    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio(
            "Ya existe un usuario con ese correo institucional (o el usuario generado ya está en uso)",
            status_code=409,
        )

    return usuario_obj.to_dict_completo()


def eliminar_usuario(id_usuario: int):
    usuario_obj = Usuario.query.get(id_usuario)
    if not usuario_obj:
        raise ErrorNegocio("Usuario no encontrado", status_code=404)

    try:
        db.session.delete(usuario_obj)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise ErrorNegocio(
            "No se puede eliminar: existen registros relacionados a este usuario",
            status_code=409,
        )