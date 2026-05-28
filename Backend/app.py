from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Permite que React se conecte sin bloqueos de seguridad

# Base de datos simulada (para no complicarnos con SQL por ahora)
USUARIOS_DB = {
    "admin": "admin123",
    "fabio": "clave2026"
}

@app.route('/api/login', methods=['POST'])
def login():
    # 1. Recibir los datos enviados por React
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # 2. Validar si el usuario existe y la contraseña coincide
    if username in USUARIOS_DB and USUARIOS_DB[username] == password:
        return jsonify({
            "success": True,
            "message": "¡Inicio de sesión exitoso!",
            "user": username
        }), 200
    else:
        return jsonify({
            "success": False,
            "message": "Usuario o contraseña incorrectos."
        }), 401 # 401 significa No Autorizado

if __name__ == '__main__':
    app.run(debug=True, port=5000)