import React, { useState } from 'react';
import './styles.css';

const initialFormState = {
  fecha: '',
  monto: '',
  tipoPrestamo: '',
  vencimiento: '',
  interes: '',
  cuotas: '',
  estado: '',
  pagares: '',
  cliente: '',
};

const Pagares = () => {
  const [pagares, setPagares] = useState([]);
  const [form, setForm] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPagares([...pagares, form]);
    setForm(initialFormState);
  };

  const handleEdit = (index) => {
    // Aquí puedes implementar la lógica para editar un pagaré según el índice proporcionado.
    // Por ejemplo: setForm(pagares[index]);
  };

  const handleDelete = (index) => {
    // Aquí puedes implementar la lógica para eliminar un pagaré según el índice proporcionado.
    // Por ejemplo: setPagares(pagares.filter((_, i) => i !== index));
  };

  return (
    <div className="pagares-container">
      <h1>Administración de Pagarés</h1>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
      </form>

      <div className="list-container">
        <h2>Listado de Pagarés</h2>
        <div className="filter-container">
          {/* Opciones de filtro por fecha o cliente */}
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Monto</th>
              <th>Tipo de Préstamo</th>
              <th>Vencimiento</th>
              <th>Interés</th>
              <th>Cuotas</th>
              <th>Estado</th>
              <th>Pagarés</th>
              <th>Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagares.map((pagare, index) => (
              <tr key={index}>
                <td>{pagare.fecha}</td>
                <td>{pagare.monto}</td>
                <td>{pagare.tipoPrestamo}</td>
                <td>{pagare.vencimiento}</td>
                <td>{pagare.interes}</td>
                <td>{pagare.cuotas}</td>
                <td>{pagare.estado}</td>
                <td>{pagare.pagares}</td>
                <td>{pagare.cliente}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Editar</button>
                  <button onClick={() => handleDelete(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Pagares;
