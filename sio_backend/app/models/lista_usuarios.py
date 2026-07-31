#sio_backend/app/models/lista_usuarios.py
"""
Este módulo NO define un modelo nuevo.

La tabla 'usuarios' ya está mapeada por completo en app/models/usuario.py
(clase Usuario). Definir aquí otra clase db.Model apuntando a la misma
__tablename__ = 'usuarios' generaría un conflicto de mapeo en SQLAlchemy
(InvalidRequestError: Table 'usuarios' is already defined).

Por eso este archivo solo re-exporta Usuario, para que el resto del módulo
"lista_usuarios" (servicios, rutas) pueda importar siempre desde aquí,
manteniendo la nomenclatura de carpetas que ya definiste.
"""

from app.models.usuario import Usuario

__all__ = ["Usuario"]