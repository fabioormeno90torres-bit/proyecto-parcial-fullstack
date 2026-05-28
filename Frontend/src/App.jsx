import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    try {
      // Enviamos los datos al Backend de Flask
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        setIsLoggedIn(true);
        setMensaje(`Bienvenido, ${data.user}`);
      } else {
        setIsLoggedIn(false);
        setMensaje(data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setMensaje("No se pudo conectar con el backend.");
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      
      {!isLoggedIn ? (
        // FORMULARIO DE LOGIN
        <form onSubmit={handleLogin}>
          <h2>Iniciar Sesión</h2>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Usuario:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              required 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Contraseña:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
              required 
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Ingresar
          </button>
        </form>
      ) : (
        // VISTA DEL DASHBOARD SIMULADO
        <div style={{ textAlign: 'center' }}>
          <h2>¡Dashboard del Sistema!</h2>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>
          <p>Aquí irá toda la información protegida de tu proyecto parcial.</p>
          <button onClick={() => { setIsLoggedIn(false); setMensaje(''); }} style={{ padding: '8px 15px', background: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Cerrar Sesión
          </button>
        </div>
      )}

      {/* Alertas de error bajo el formulario */}
      {!isLoggedIn && mensaje && (
        <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{mensaje}</p>
      )}
    </div>
  );
}

export default App;