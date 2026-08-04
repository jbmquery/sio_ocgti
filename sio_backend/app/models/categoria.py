# sio_backend/app/models/categoria.py
from app.database import db

class Categoria(db.Model):
    __tablename__ = 'categorias'
    id_cat = db.Column(db.Integer, primary_key=True)
    nom_cat = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id_cat": self.id_cat,
            "nom_cat": self.nom_cat
        }

class SubCategoria(db.Model):
    __tablename__ = 'sub_categorias'
    id_sub_cat = db.Column(db.Integer, primary_key=True)
    id_cat = db.Column(db.Integer, db.ForeignKey('categorias.id_cat', ondelete='CASCADE'), nullable=False)
    nom_sub_cat = db.Column(db.String(100), nullable=False)

    categoria = db.relationship('Categoria', backref=db.backref('sub_categorias', cascade='all, delete'))

    def to_dict(self):
        return {
            "id_sub_cat": self.id_sub_cat,
            "id_cat": self.id_cat,
            "nom_cat": self.categoria.nom_cat if self.categoria else None,
            "nom_sub_cat": self.nom_sub_cat
        }

class SsCategoria(db.Model):
    __tablename__ = 'ss_categorias'
    id_ss_cat = db.Column(db.Integer, primary_key=True)
    id_sub_cat = db.Column(db.Integer, db.ForeignKey('sub_categorias.id_sub_cat', ondelete='CASCADE'), nullable=False)
    id_cat = db.Column(db.Integer, db.ForeignKey('categorias.id_cat', ondelete='CASCADE'), nullable=False)
    nom_ss_cat = db.Column(db.String(100), nullable=False)

    categoria = db.relationship('Categoria')
    sub_categoria = db.relationship('SubCategoria')

    def to_dict(self):
        return {
            "id_ss_cat": self.id_ss_cat,
            "id_cat": self.id_cat,
            "nom_cat": self.categoria.nom_cat if self.categoria else None,
            "id_sub_cat": self.id_sub_cat,
            "nom_sub_cat": self.sub_categoria.nom_sub_cat if self.sub_categoria else None,
            "nom_ss_cat": self.nom_ss_cat
        }