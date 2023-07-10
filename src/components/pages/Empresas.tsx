import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface Empresa {
  idEmpresa: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}

const EmpresaCRUD: React.FC = () => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newEmpresa, setNewEmpresa] = useState<Partial<Empresa>>({
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  });

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get<Empresa[]>('http://localhost:8080/api/empresa');
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<Empresa>('http://localhost:8080/api/empresa', newEmpresa);
      setNewEmpresa({
        nombre: '',
        direccion: '',
        telefono: '',
        email: '',
      });
      setShowModal(false);
      fetchEmpresas();
    } catch (error) {
      console.error('Error al agregar la empresa', error);
    }
  };

  const handleEdit = async (id: number) => {
    const empresaToEdit = empresas.find((empresa) => empresa.idEmpresa === id);
    if (empresaToEdit) {
      try {
        await axios.put<Empresa>(`http://localhost:8080/api/empresa/${id}`, empresaToEdit);
        fetchEmpresas();
      } catch (error) {
        console.error('Error al editar la empresa', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/empresa/${id}`);
      fetchEmpresas();
    } catch (error) {
      console.error('Error al eliminar la empresa', error);
    }
  };

  return (
    <div className="container">
      <h1>Administración de Empresas</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Empresa
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={newEmpresa.nombre}
                onChange={handleInputChange}
                placeholder="Ingrese el nombre"
              />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="direccion"
                value={newEmpresa.direccion}
                onChange={handleInputChange}
                placeholder="Ingrese la dirección"
              />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={newEmpresa.telefono}
                onChange={handleInputChange}
                placeholder="Ingrese el teléfono"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newEmpresa.email}
                onChange={handleInputChange}
                placeholder="Ingrese el email"
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
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa) => (
            <tr key={empresa.idEmpresa}>
              <td>{empresa.idEmpresa}</td>
              <td>{empresa.nombre}</td>
              <td>{empresa.direccion}</td>
              <td>{empresa.telefono}</td>
              <td>{empresa.email}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(empresa.idEmpresa)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(empresa.idEmpresa)}>
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

export default EmpresaCRUD;
