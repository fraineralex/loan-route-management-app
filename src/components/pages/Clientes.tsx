import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface Cliente {
  idCliente: number;
  nombre: string;
  apellido: string;
  cedula: string;
  direccion: string;
  // Add other properties from the backend code
}

const App: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newCliente, setNewCliente] = useState<Partial<Cliente>>({
    nombre: '',
    apellido: '',
    cedula: '',
    direccion: '',
    // Initialize other properties
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const response = await axios.get<Cliente[]>('http://localhost:8080/api/cliente');
      setClientes(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCliente((prevCliente) => ({
      ...prevCliente,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<Cliente>('http://localhost:8080/api/cliente', newCliente);
      setNewCliente({
        nombre: '',
        apellido: '',
        cedula: '',
        direccion: '',
        // Reset other properties
      });
      setShowModal(false);
      fetchClientes();
    } catch (error) {
      console.error('Error al agregar el cliente', error);
    }
  };

    function editCuadre(cliente: any): void {
        throw new Error('Function not implemented.');
    }

    function deleteCuadre(cliente: any): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className="container">
      <h2>Clientes</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Cliente
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.idCliente}>
              <td>{cliente.idCliente}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.apellido}</td>
              <td>{cliente.cedula}</td>
              <td>{cliente.direccion}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => editCuadre(cliente)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCuadre(cliente)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

   

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={newCliente.nombre} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="apellido" value={newCliente.apellido} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="cedula">
              <Form.Label>Cédula</Form.Label>
              <Form.Control type="text" name="cedula" value={newCliente.cedula} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="direccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" name="direccion" value={newCliente.direccion} onChange={handleInputChange} />
            </Form.Group>
            {/* Add form inputs for other properties */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
