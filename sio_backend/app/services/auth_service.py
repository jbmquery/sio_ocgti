#sio_backend/app/services/autj_service.py
from app.models.usuario import Usuario
from app.utils.security import verificar_contrasena, generar_token


def autenticar_usuario(correo: str, clave: str):
    """
    Busca al usuario por correo_institucional y valida la contraseña.
    Devuelve (usuario, token) si es correcto, o (None, None) si no.
    """
    usuario = Usuario.query.filter_by(correo_institucional=correo).first()

    if not usuario:
        return None, None

    if not usuario.estado:
        # Cuenta desactivada
        return None, None

    if not verificar_contrasena(clave, usuario.salt, usuario.password_hash):
        return None, None

    token = generar_token(usuario)
    return usuario, token