#sio_backend/app/models/tabla_dependencia.py
from app.database import db

class UbicacionGeografica(db.Model):
    __tablename__ = 'ubicacion_geografica'
    id_ubigeo = db.Column(db.Integer, primary_key=True)
    codigo_ubigeo = db.Column(db.String(10), nullable=True)
    distrito = db.Column(db.String(100), nullable=False)
    provincia = db.Column(db.String(100), nullable=False)
    departamento = db.Column(db.String(100), nullable=False)
    pais = db.Column(db.String(50), default='PERU', nullable=False)

    def to_dict(self):
        return {
            "id_ubigeo": self.id_ubigeo,
            "codigo_ubigeo": self.codigo_ubigeo,
            "distrito": self.distrito,
            "provincia": self.provincia,
            "departamento": self.departamento,
            "pais": self.pais
        }

class Predio(db.Model):
    __tablename__ = 'predios'
    id_predio = db.Column(db.Integer, primary_key=True)
    codigo_predio = db.Column(db.String(20), nullable=True)
    direccion = db.Column(db.String(255), nullable=False)
    referencia = db.Column(db.Text, nullable=True)
    id_ubigeo = db.Column(db.Integer, db.ForeignKey('ubicacion_geografica.id_ubigeo', ondelete='RESTRICT'), nullable=False)

    ubicacion = db.relationship('UbicacionGeografica')

    def to_dict(self):
        return {
            "id_predio": self.id_predio,
            "codigo_predio": self.codigo_predio,
            "direccion": self.direccion,
            "referencia": self.referencia,
            "id_ubigeo": self.id_ubigeo,
            "distrito": self.ubicacion.distrito if self.ubicacion else None,
            "provincia": self.ubicacion.provincia if self.ubicacion else None,
            "departamento": self.ubicacion.departamento if self.ubicacion else None
        }

class Pabellon(db.Model):
    __tablename__ = 'pabellones'
    id_pabellon = db.Column(db.Integer, primary_key=True)
    nom_pabellon = db.Column(db.String(100), nullable=False)
    id_predio = db.Column(db.Integer, db.ForeignKey('predios.id_predio', ondelete='CASCADE'), nullable=False)

    predio = db.relationship('Predio')

    def to_dict(self):
        return {
            "id_pabellon": self.id_pabellon,
            "nom_pabellon": self.nom_pabellon,
            "id_predio": self.id_predio,
            "codigo_predio": self.predio.codigo_predio if self.predio else None,
            "direccion_predio": self.predio.direccion if self.predio else None
        }

class Dependencia(db.Model):
    __tablename__ = 'dependencias'
    id_dependencia = db.Column(db.Integer, primary_key=True)
    siglas_dependencia = db.Column(db.String(20), nullable=True)
    nom_dependencia = db.Column(db.String(200), nullable=False)
    correo_electronico = db.Column(db.String(150), nullable=True)
    id_predio_sede = db.Column(db.Integer, db.ForeignKey('predios.id_predio', ondelete='SET NULL'), nullable=True)

    predio_sede = db.relationship('Predio')

    def to_dict(self):
        return {
            "id_dependencia": self.id_dependencia,
            "siglas_dependencia": self.siglas_dependencia,
            "nom_dependencia": self.nom_dependencia,
            "correo_electronico": self.correo_electronico,
            "id_predio_sede": self.id_predio_sede,
            "direccion_sede": self.predio_sede.direccion if self.predio_sede else None
        }

class CarreraProfesional(db.Model):
    __tablename__ = 'carreras_profesionales'
    id_carrera = db.Column(db.Integer, primary_key=True)
    nom_carrera = db.Column(db.String(200), nullable=False)
    siglas_carrera = db.Column(db.String(20), nullable=True)
    id_dependencia = db.Column(db.Integer, db.ForeignKey('dependencias.id_dependencia', ondelete='CASCADE'), nullable=False)

    dependencia = db.relationship('Dependencia')

    def to_dict(self):
        return {
            "id_carrera": self.id_carrera,
            "nom_carrera": self.nom_carrera,
            "siglas_carrera": self.siglas_carrera,
            "id_dependencia": self.id_dependencia,
            "nom_dependencia": self.dependencia.nom_dependencia if self.dependencia else None
        }

class TipoArea(db.Model):
    __tablename__ = 'tipos_area'
    id_tipo_area = db.Column(db.Integer, primary_key=True)
    nom_tipo_area = db.Column(db.String(100), nullable=False)
    id_area = db.Column(db.Integer, db.ForeignKey('area.id_area', ondelete='RESTRICT'), nullable=False)

    area = db.relationship('Area')

    def to_dict(self):
        return {
            "id_tipo_area": self.id_tipo_area,
            "nom_tipo_area": self.nom_tipo_area,
            "id_area": self.id_area,
            "nom_area": self.area.nom_area if self.area else None
        }

class Area(db.Model):
    __tablename__ = 'area'
    id_area = db.Column(db.Integer, primary_key=True)
    nom_area = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id_area": self.id_area,
            "nom_area": self.nom_area
        }

class Ambiente(db.Model):
    __tablename__ = 'ambientes'
    id_ambiente = db.Column(db.Integer, primary_key=True)
    nom_ambiente = db.Column(db.String(150), nullable=False)
    piso = db.Column(db.String(20), nullable=True)
    id_predio = db.Column(db.Integer, db.ForeignKey('predios.id_predio', ondelete='RESTRICT'), nullable=False)
    id_pabellon = db.Column(db.Integer, db.ForeignKey('pabellones.id_pabellon', ondelete='SET NULL'), nullable=True)
    id_dependencia = db.Column(db.Integer, db.ForeignKey('dependencias.id_dependencia', ondelete='SET NULL'), nullable=True)
    id_tipo_area = db.Column(db.Integer, db.ForeignKey('tipos_area.id_tipo_area', ondelete='RESTRICT'), nullable=False)

    predio = db.relationship('Predio')
    pabellon = db.relationship('Pabellon')
    dependencia = db.relationship('Dependencia')
    tipo_area = db.relationship('TipoArea')

    def to_dict(self):
        return {
            "id_ambiente": self.id_ambiente,
            "nom_ambiente": self.nom_ambiente,
            "piso": self.piso,
            "id_predio": self.id_predio,
            "direccion_predio": self.predio.direccion if self.predio else None,
            "id_pabellon": self.id_pabellon,
            "nom_pabellon": self.pabellon.nom_pabellon if self.pabellon else None,
            "id_dependencia": self.id_dependencia,
            "nom_dependencia": self.dependencia.nom_dependencia if self.dependencia else None,
            "id_tipo_area": self.id_tipo_area,
            "nom_tipo_area": self.tipo_area.nom_tipo_area if self.tipo_area else None
        }