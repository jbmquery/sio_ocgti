#sio_backend/app/models/tabla_bitacora.py
from app.database import db

class Estado(db.Model):
    __tablename__ = 'estados'
    id_estado = db.Column(db.Integer, primary_key=True)
    nom_estado = db.Column(db.String(50), nullable=False)
    desc_estado = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id_estado": self.id_estado,
            "nom_estado": self.nom_estado,
            "desc_estado": self.desc_estado
        }

class Medio(db.Model):
    __tablename__ = 'medios'
    id_medio = db.Column(db.Integer, primary_key=True)
    nom_medio = db.Column(db.String(100), nullable=False)
    desc_medio = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id_medio": self.id_medio,
            "nom_medio": self.nom_medio,
            "desc_medio": self.desc_medio
        }

class Tipo(db.Model):
    __tablename__ = 'tipos'
    id_tipo = db.Column(db.Integer, primary_key=True)
    nom_tipo = db.Column(db.String(100), nullable=False)
    desc_tipo = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id_tipo": self.id_tipo,
            "nom_tipo": self.nom_tipo,
            "desc_tipo": self.desc_tipo
        }

class TipoSolicitud(db.Model):
    __tablename__ = 'tipo_solicitudes'
    id_solicitud = db.Column(db.Integer, primary_key=True)
    nom_solicitud = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_solicitud": self.id_solicitud,
            "nom_solicitud": self.nom_solicitud
        }

class Prioridad(db.Model):
    __tablename__ = 'prioridades'
    id_prioridad = db.Column(db.Integer, primary_key=True)
    nom_prioridad = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id_prioridad": self.id_prioridad,
            "nom_prioridad": self.nom_prioridad
        }