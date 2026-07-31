# sio_backend/app/models/usuario.py
from datetime import date
from app.database import db


class Usuario(db.Model):
    __tablename__ = 'usuarios'

    id_usuario = db.Column(db.Integer, primary_key=True)
    nombres = db.Column(db.String(100), nullable=False)
    ape_pat = db.Column(db.String(100), nullable=False)
    ape_mat = db.Column(db.String(100))
    fecha_creacion = db.Column(db.Date, default=date.today)  # default explícito por si la BD no lo aplica
    celular = db.Column(db.String(20))
    fecha_nacimiento = db.Column(db.Date)
    domicilio = db.Column(db.String(255))
    correo_institucional = db.Column(db.String(150), unique=True)
    usuario = db.Column(db.String(50), nullable=False, unique=True)
    salt = db.Column(db.String(40), nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    estado = db.Column(db.Boolean, nullable=False)
    tipo = db.Column(db.String(40), nullable=False)

    def to_dict(self):
        """Resumen ligero (usado por ejemplo en /api/auth/me). Nunca incluir salt/password_hash."""
        return {
            "id": self.id_usuario,
            "nombres": self.nombres,
            "ape_pat": self.ape_pat,
            "ape_mat": self.ape_mat,
            "correo_institucional": self.correo_institucional,
            "usuario": self.usuario,
            "tipo": self.tipo,
            "estado": self.estado,
        }

    def to_dict_completo(self):
        """
        Versión completa para la Lista de Usuarios (tabla + modal de Actualizar).
        Sigue sin incluir salt/password_hash: esos campos jamás viajan al frontend.
        """
        return {
            "id_usuario": self.id_usuario,
            "nombres": self.nombres,
            "ape_pat": self.ape_pat,
            "ape_mat": self.ape_mat,
            "fecha_creacion": self.fecha_creacion.isoformat() if self.fecha_creacion else None,
            "celular": self.celular,
            "fecha_nacimiento": self.fecha_nacimiento.isoformat() if self.fecha_nacimiento else None,
            "domicilio": self.domicilio,
            "correo_institucional": self.correo_institucional,
            "usuario": self.usuario,
            "estado": self.estado,
            "tipo": self.tipo,
        }