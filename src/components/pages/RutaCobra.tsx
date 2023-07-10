import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface Ruta {
  idRuta: number;
  nombre: string;
  dia: string;
}

const RutaCRUD: React.FC = () => {
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newRuta, setNewRuta] = useState<Partial<Ruta>>({
    nombre: '',
    dia: '',
  });

  useEffect(() => {
    fetchRutas();
  }, []);

  const fetchRutas = async () => {
    try {
      const response = await axios.get<Ruta[]>('http://localhost:8080/api/ruta');
      setRutas(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRuta((prevRuta) => ({
      ...prevRuta,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<Ruta>('http://localhost:8080/api/ruta', newRuta);
      setNewRuta({
        nombre: '',
        dia: '',
      });
      setShowModal(false);
      fetchRutas();
    } catch (error) {
      console.error('Error al agregar la ruta', error);
    }
  };

  const handleEdit = async (id: number) => {
    const rutaToEdit = rutas.find((ruta) => ruta.idRuta === id);
    if (rutaToEdit) {
      try {
        await axios.put<Ruta>(`http://localhost:8080/api/ruta/${id}`, rutaToEdit);
        fetchRutas();
      } catch (error) {
        console.error('Error al editar la ruta', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/ruta/${id}`);
      fetchRutas();
    } catch (error) {
      console.error('Error al eliminar la ruta', error);
    }
  };

  return (
    <div className="container">
      <h1>Administración de Rutas</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Ruta
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Ruta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newRuta.nombre}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre de la ruta"
              />
            </Form.Group>
            <Form.Group controlId="formDia">
              <Form.Label>Día</Form.Label>
              <Form.Control
                type="text"
                name="dia"
                value={newRuta.dia}
                onChange={handleInputChange}
                placeholder="Ingrese el día de la ruta"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Día</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map((ruta) => (
            <tr key={ruta.idRuta}>
              <td>{ruta.idRuta}</td>
              <td>{ruta.nombre}</td>
              <td>{ruta.dia}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(ruta.idRuta)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(ruta.idRuta)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RutaCRUD;
