import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Clientes from './components/pages/Clientes';
import Prestamos from './components/pages/Prestamos';
import Cuadres from './components/pages/Cuadres';
import Pagares from './components/pages/Pagare';
import RutaCobra from './components/pages/RutaCobra';
import Usuarios from './components/pages/Usuario';
import Cobrador from './components/pages/Cobrador';
import Empresas from './components/pages/Empresas';
import Recibos from './components/pages/Recibos';



import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Dashboard />
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/prestamos" element={<Prestamos />} />
          <Route path="/cuadres" element={<Cuadres />} />
          <Route path="/pagares" element={<Pagares />} />
          <Route path="/rutas" element={<RutaCobra />} />
          <Route path="/usuarios" element={<Usuarios/>}/>
          <Route path="/cobrador" element={<Cobrador/>}/>
          <Route path="/empresas" element={<Empresas/>}/>
          <Route path="/recibos" element={<Recibos/>}/>
          


        </Routes>
      </div>
    </Router>
  );
};

export default App;
