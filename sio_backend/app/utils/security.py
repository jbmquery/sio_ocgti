#sio_backend/app/utils/security.py
import hashlib
import hmac
import os
import datetime
import jwt
from functools import wraps
from flask import request, jsonify, current_app

# ---------------------------------------------------------------------------
# Hashing de contraseñas (mismo esquema que ya usaste para crear tu usuario)
# PBKDF2-HMAC-SHA256, salt de 16 bytes, 100 000 iteraciones.
# ---------------------------------------------------------------------------

ITERACIONES = 100_000


def encriptar_contrasena(password: str):
    """Genera (salt_hex, hash_hex) para guardar un usuario nuevo."""
    salt = os.urandom(16)
    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        ITERACIONES
    )
    return salt.hex(), key.hex()


def verificar_contrasena(password: str, salt_hex: str, hash_guardado: str) -> bool:
    """Recalcula el hash con la sal guardada y compara de forma segura."""
    salt = bytes.fromhex(salt_hex)
    key = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        ITERACIONES
    )
    return hmac.compare_digest(key.hex(), hash_guardado)


# ---------------------------------------------------------------------------
# JWT
# ---------------------------------------------------------------------------

def generar_token(usuario):
    payload = {
        "id_usuario": usuario.id_usuario,
        "usuario": usuario.usuario,
        "tipo": usuario.tipo,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=8),
        "iat": datetime.datetime.utcnow(),
    }
    token = jwt.encode(payload, current_app.config["SECRET_KEY"], algorithm="HS256")
    return token


def decodificar_token(token):
    return jwt.decode(token, current_app.config["SECRET_KEY"], algorithms=["HS256"])


def token_required(f):
    """Decorator para proteger endpoints con el JWT enviado en el header Authorization."""
    @wraps(f)
    def decorador(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Token no proporcionado"}), 401

        token = auth_header.split(" ", 1)[1]
        try:
            payload = decodificar_token(token)
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Sesión expirada, vuelve a iniciar sesión"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        request.usuario_actual = payload
        return f(*args, **kwargs)

    return decorador