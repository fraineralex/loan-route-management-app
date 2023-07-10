import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

interface Usuario {
  idUsuario: number;
  usuario: string;
  password: string;
  estatus: number;
  rol: Rol;
  empresa: Empresa;
  cobrador: Cobrador;
}

interface Rol {
  idRol: number;
  nombre: string;
}

interface Empresa {
  idEmpresa: number;
  nombre: string;
}

interface Cobrador {
  idCobrador: number;
  nombre: string;
}

const App: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newUsuario, setNewUsuario] = useState<Partial<Usuario>>({
    usuario: '',
    password: '',
    estatus: 0,
    rol: {} as Rol,
    empresa: {} as Empresa,
    cobrador: {} as Cobrador,
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get<Usuario[]>(
        'http://localhost:8080/api/usuario'
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUsuario((prevUsuario) => ({
      ...prevUsuario,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<Usuario>('http://localhost:8080/api/usuario', newUsuario);
      setNewUsuario({
        usuario: '',
        password: '',
        estatus: 0,
        rol: {} as Rol,
        empresa: {} as Empresa,
        cobrador: {} as Cobrador,
      });
      setShowModal(false);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al agregar el usuario', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/usuario/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar el usuario', error);
    }
  };

  const handleEdit = (usuario: Usuario) => {
    // Implementar la lógica para editar el usuario
    console.log('Editar usuario:', usuario);
  };

  return (
    <Container>
      <h1>Usuarios</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Usuario
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Empresa</th>
            <th>Cobrador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.idUsuario}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.rol.nombre}</td>
              <td>{usuario.empresa.nombre}</td>
              <td>{usuario.cobrador.nombre}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(usuario)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(usuario.idUsuario)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsuario">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                name="usuario"
                value={newUsuario.usuario}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUsuario.password}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* Agrega aquí los campos adicionales del formulario */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
