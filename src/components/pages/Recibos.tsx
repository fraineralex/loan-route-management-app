import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface ReciboGen {
  idRecibosGen: number;
  fecha: string;
  valor: number;
}

const ReciboGenCRUD: React.FC = () => {
  const [recibosGen, setRecibosGen] = useState<ReciboGen[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newReciboGen, setNewReciboGen] = useState<Partial<ReciboGen>>({
    fecha: '',
    valor: 0,
  });

  useEffect(() => {
    fetchRecibosGen();
  }, []);

  const fetchRecibosGen = async () => {
    try {
      const response = await axios.get<ReciboGen[]>('http://localhost:8080/api/recibo-gen');
      setRecibosGen(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReciboGen((prevReciboGen) => ({
      ...prevReciboGen,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<ReciboGen>('http://localhost:8080/api/recibo-gen', newReciboGen);
      setNewReciboGen({
        fecha: '',
        valor: 0,
      });
      setShowModal(false);
      fetchRecibosGen();
    } catch (error) {
      console.error('Error al agregar el recibo', error);
    }
  };

  const handleEdit = async (id: number) => {
    const reciboGenToEdit = recibosGen.find((reciboGen) => reciboGen.idRecibosGen === id);
    if (reciboGenToEdit) {
      try {
        await axios.put<ReciboGen>(`http://localhost:8080/api/recibo-gen/${id}`, reciboGenToEdit);
        fetchRecibosGen();
      } catch (error) {
        console.error('Error al editar el recibo', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/recibo-gen/${id}`);
      fetchRecibosGen();
    } catch (error) {
      console.error('Error al eliminar el recibo', error);
    }
  };

  return (
    <div className="container">
      <h1>Administración de Recibos Generados</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Recibo
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Recibo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                name="fecha"
                value={newReciboGen.fecha}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha del recibo"
              />
            </Form.Group>
            <Form.Group controlId="formValor">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                name="valor"
                value={newReciboGen.valor}
                onChange={handleInputChange}
                placeholder="Ingrese el valor del recibo"
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
            <th>Fecha</th>
            <th>Valor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recibosGen.map((reciboGen) => (
            <tr key={reciboGen.idRecibosGen}>
              <td>{reciboGen.idRecibosGen}</td>
              <td>{reciboGen.fecha}</td>
              <td>{reciboGen.valor}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(reciboGen.idRecibosGen)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(reciboGen.idRecibosGen)}>
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

export default ReciboGenCRUD;
