import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface Cobrador {
  idCobrador: number;
  nombre: string;
  apellido: string;
  cedula: string;
  direccion: string;
  telefono: string;
  fechaIngreso: string;
  rutas: any[];
}

const CobradorCRUD: React.FC = () => {
  const [cobradores, setCobradores] = useState<Cobrador[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCobrador, setNewCobrador] = useState<Partial<Cobrador>>({
    nombre: '',
    apellido: '',
    cedula: '',
    direccion: '',
    telefono: '',
    fechaIngreso: '',
    rutas: [],
  });

  useEffect(() => {
    fetchCobradores();
  }, []);

  const fetchCobradores = async () => {
    try {
      const response = await axios.get<Cobrador[]>('http://localhost:8080/api/cobrador');
      setCobradores(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCobrador((prevCobrador) => ({
      ...prevCobrador,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<Cobrador>('http://localhost:8080/api/cobrador', newCobrador);
      setNewCobrador({
        nombre: '',
        apellido: '',
        cedula: '',
        direccion: '',
        telefono: '',
        fechaIngreso: '',
        rutas: [],
      });
      setShowModal(false);
      fetchCobradores();
    } catch (error) {
      console.error('Error al agregar el cobrador', error);
    }
  };

  const handleEdit = async (id: number) => {
    const cobradorToEdit = cobradores.find((cobrador) => cobrador.idCobrador === id);
    if (cobradorToEdit) {
      try {
        await axios.put<Cobrador>(`http://localhost:8080/api/cobrador/${id}`, cobradorToEdit);
        fetchCobradores();
      } catch (error) {
        console.error('Error al editar el cobrador', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/cobrador/${id}`);
      fetchCobradores();
    } catch (error) {
      console.error('Error al eliminar el cobrador', error);
    }
  };

  return (
    <div className="container">
      <h1>Administración de Cobradores</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Cobrador
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Cobrador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newCobrador.nombre}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre"
              />
            </Form.Group>
            <Form.Group controlId="formApellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={newCobrador.apellido}
                onChange={handleInputChange}
                placeholder="Ingrese el apellido"
              />
            </Form.Group>
            <Form.Group controlId="formCedula">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                type="text"
                name="cedula"
                value={newCobrador.cedula}
                onChange={handleInputChange}
                placeholder="Ingrese la cédula"
              />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={newCobrador.direccion}
                onChange={handleInputChange}
                placeholder="Ingrese la dirección"
              />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={newCobrador.telefono}
                onChange={handleInputChange}
                placeholder="Ingrese el teléfono"
              />
            </Form.Group>
            <Form.Group controlId="formFechaIngreso">
              <Form.Label>Fecha de Ingreso</Form.Label>
              <Form.Control
                type="text"
                name="fechaIngreso"
                value={newCobrador.fechaIngreso}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha de ingreso"
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
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Fecha de Ingreso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cobradores.map((cobrador) => (
            <tr key={cobrador.idCobrador}>
              <td>{cobrador.idCobrador}</td>
              <td>{cobrador.nombre}</td>
              <td>{cobrador.apellido}</td>
              <td>{cobrador.cedula}</td>
              <td>{cobrador.direccion}</td>
              <td>{cobrador.telefono}</td>
              <td>{cobrador.fechaIngreso}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(cobrador.idCobrador)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(cobrador.idCobrador)}>
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

export default CobradorCRUD;
