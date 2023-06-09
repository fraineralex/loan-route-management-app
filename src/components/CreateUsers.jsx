import React, { useState } from 'react';
import './AdminPage.css';

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al servidor y crear un nuevo usuario
    console.log('Crear usuario:', username, password);
    // Limpiar los campos después de enviar los datos
    setUsername('');
    setPassword('');
  };

  return (
    <div className="admin-page">
      <h2 className="admin-page__title">Crear nuevo usuario</h2>
      <form className="admin-page__form" onSubmit={handleSubmit}>
        <div className="admin-page__form-group">
          <label htmlFor="username" className="admin-page__label">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            className="admin-page__input"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="admin-page__form-group">
          <label htmlFor="password" className="admin-page__label">Contraseña:</label>
          <input
            type="password"
            id="password"
            className="admin-page__input"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" className="admin-page__button">Crear usuario</button>
      </form>
    </div>
  );
};

export default AdminPage;
