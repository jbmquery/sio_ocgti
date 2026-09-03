#sio_backend/app/__init__.py
from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.database import db
from app.routes.usuario_routes import usuario_bp
from app.routes.auth_routes import auth_bp
from app.routes.lista_usuarios_routes import lista_usuarios_bp
from app.routes.categorias_routes import categorias_bp
from app.routes.tabla_bitacora_routes import tabla_bitacora_bp
from app.routes.tabla_dependencia_routes import tabla_dependencia_bp
# Si ya creaste las rutas de técnicos, impórtalas aquí:
# from app.routes.tabla_tecnicos_routes import tabla_tecnicos_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Configuración de CORS
    CORS(
        app,
        resources={r"/api/*": {"origins": Config.FRONTEND_ORIGIN}},
        supports_credentials=True,
        allow_headers=["Content-Type", "Authorization"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    )

    # Inicializar SQLAlchemy
    db.init_app(app)

    # Registrar Blueprints
    app.register_blueprint(usuario_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(lista_usuarios_bp)
    app.register_blueprint(categorias_bp)
    app.register_blueprint(tabla_bitacora_bp)
    app.register_blueprint(tabla_dependencia_bp)
    # app.register_blueprint(tabla_tecnicos_bp)

    # Crear tablas
    with app.app_context():
        db.create_all()

    return app