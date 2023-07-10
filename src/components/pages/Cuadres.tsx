import React, { useState } from 'react';

interface Cuadre {
  id: string;
  nombre: string;
  apellido: string;
  cedula: string;
  direccion: string;
  telefono: string;
}

const Cuadres: React.FC = () => {
  const [cuadres, setCuadres] = useState<Cuadre[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCuadre, setEditingCuadre] = useState<Cuadre | null>(null);
  const [newCuadre, setNewCuadre] = useState<Cuadre>({
    id: '',
    nombre: '',
    apellido: '',
    cedula: '',
    direccion: '',
    telefono: '',
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCuadre(null);
    setNewCuadre({
      id: '',
      nombre: '',
      apellido: '',
      cedula: '',
      direccion: '',
      telefono: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCuadre((prevCuadre) => ({
      ...prevCuadre,
      [name]: value,
    }));
  };

  const addCuadre = () => {
    setCuadres((prevCuadres) => [...prevCuadres, newCuadre]);
    closeModal();
  };

  const editCuadre = (cuadre: Cuadre) => {
    setEditingCuadre(cuadre);
    setNewCuadre(cuadre);
    setModalOpen(true);
  };

  const updateCuadre = () => {
    setCuadres((prevCuadres) =>
      prevCuadres.map((cuadre) =>
        cuadre.id === editingCuadre?.id ? newCuadre : cuadre
      )
    );
    closeModal();
  };

  const deleteCuadre = (cuadre: Cuadre) => {
    setCuadres((prevCuadres) =>
      prevCuadres.filter((item) => item.id !== cuadre.id)
    );
  };

  return (
    <div className="container">
      <h2>Página de Cuadres</h2>

      <button className="btn btn-primary" onClick={openModal}>
        Agregar Cuadre
      </button>

      {modalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar/Editar Cuadre</h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="id"
                    value={newCuadre.id}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    value={newCuadre.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    value={newCuadre.apellido}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Cédula:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cedula"
                    value={newCuadre.cedula}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Dirección:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="direccion"
                    value={newCuadre.direccion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono"
                    value={newCuadre.telefono}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                {editingCuadre ? (
                  <button
                    className="btn btn-primary"
                    onClick={updateCuadre}
                  >
                    Guardar Cambios
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={addCuadre}>
                    Agregar
                  </button>
                )}
                <button
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cuadres.map((cuadre) => (
            <tr key={cuadre.id}>
              <td>{cuadre.id}</td>
              <td>{cuadre.nombre}</td>
              <td>{cuadre.apellido}</td>
              <td>{cuadre.cedula}</td>
              <td>{cuadre.direccion}</td>
              <td>{cuadre.telefono}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => editCuadre(cuadre)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCuadre(cuadre)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cuadres;
