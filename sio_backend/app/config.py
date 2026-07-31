#sio_backend/app/config.py
import os
from dotenv import load_dotenv

# Forzar codificación UTF-8 al cargar el .env
load_dotenv(encoding='utf-8')


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'clave-secreta-default')

    # Origen permitido para CORS (tu app de Vite en desarrollo)
    FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', 'http://localhost:5173')

    # Opcional: Forzar a SQLAlchemy a usar UTF-8 en la conexión
    SQLALCHEMY_ENGINE_OPTIONS = {
        'client_encoding': 'utf8'
    }