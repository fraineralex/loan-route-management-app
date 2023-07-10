import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUsers, FiBriefcase, FiFileText, FiDollarSign, FiClipboard, FiSettings, FiMap } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [showButtons, setShowButtons] = useState(true);
  const navigate = useNavigate();

  const handleButtonClick = (path: string) => {
    setShowButtons(false);
    navigate(path);
  };

  const handleNavItemClick = () => {
    setShowButtons(false);
  };

  const handleInicioClick = () => {
    setShowButtons(true);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style={{ marginBottom: '50px' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" onClick={handleInicioClick}>
            Inicio
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100">
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/clientes' ? 'active' : ''}`}
                  to="/clientes"
                  onClick={handleNavItemClick}
                >
                  Clientes
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/prestamos' ? 'active' : ''}`}
                  to="/prestamos"
                  onClick={handleNavItemClick}
                >
                  Préstamos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/cuadres' ? 'active' : ''}`}
                  to="/cuadres"
                  onClick={handleNavItemClick}
                >
                  Cuadres
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/pagares' ? 'active' : ''}`}
                  to="/pagares"
                  onClick={handleNavItemClick}
                >
                  Pagares
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === '/usuarios' ? 'active' : ''}`}
                  to="/usuarios"
                  onClick={handleNavItemClick}
                >
                  Usuarios
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container" style={{ paddingTop: '20px' }}>
        <div className="dashboard-buttons">
          {showButtons && (
            <div className="row mt-4">
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/clientes')}
                >
                  <FiUsers className="btn-icon" />
                  Clientes
                </button>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/cobrador')}
                >
                  <FiUsers className="btn-icon" />
                  Cobradores
                </button>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/empresas')}
                >
                  <FiBriefcase className="btn-icon" />
                  Empresas
                </button>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/pagares')}
                >
                  <FiFileText className="btn-icon" />
                  Pagares
                </button>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/prestamos')}
                >
                  <FiDollarSign className="btn-icon" />
                  Préstamos
                </button>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/recibos')}
                >
                  <FiClipboard className="btn-icon" />
                  Recibos
                </button>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/usuarios')}
                >
                  <FiSettings className="btn-icon" />
                  Usuarios
                </button>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <button
                  className="btn btn-lg btn-block btn-transparent"
                  onClick={() => handleButtonClick('/rutas')}
                >
                  <FiMap className="btn-icon" />
                  Rutas
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
  <div className="container-fluid">
    <div className="text-center">
      <h4>Copyright by EasyRoutes</h4>
    </div>
  </div>
</footer>

    </div>
  );
};

export default Dashboard;
