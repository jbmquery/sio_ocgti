import pg8000.native

try:
    print("Intentando conectar a la base de datos 'postgres'...")
    con = pg8000.native.Connection(
        user="postgres",
        password="123",
        host="localhost",
        port=5432,
        database="postgres"
    )
    print("\n¡CONEXIÓN EXITOSA A POSTGRESQL!")
    con.close()
except Exception as e:
    print("\n--- ERROR DETECTADO ---")
    print(e)