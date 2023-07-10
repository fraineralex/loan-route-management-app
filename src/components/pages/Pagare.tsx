import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

interface Pagare {
  idPagare: number;
  noPagare: number;
  capital: number;
  interes: number;
  total: number;
  vencimiento: string;
  prestamo: any;
  reciboGen: any;
}

const PagareCRUD: React.FC = () => {
  const [pagares, setPagares] = useState<Pagare[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPagare, setNewPagare] = useState<Partial<Pagare>>({
    noPagare: 0,
    capital: 0,
    interes: 0,
    total: 0,
    vencimiento: '',
    prestamo: null,
    reciboGen: null,
  });

  useEffect(() => {
    fetchPagares();
  }, []);

  const fetchPagares = async () => {
    try {
      const response = await axios.get<Pagare[]>('http://localhost:8080/api/pagare');
      setPagares(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPagare((prevPagare) => ({
      ...prevPagare,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<Pagare>('http://localhost:8080/api/pagare', newPagare);
      setNewPagare({
        noPagare: 0,
        capital: 0,
        interes: 0,
        total: 0,
        vencimiento: '',
        prestamo: null,
        reciboGen: null,
      });
      setShowModal(false);
      fetchPagares();
    } catch (error) {
      console.error('Error al agregar el pagare', error);
    }
  };

  const handleEdit = async (id: number) => {
    const pagareToEdit = pagares.find((pagare) => pagare.idPagare === id);
    if (pagareToEdit) {
      try {
        await axios.put<Pagare>(`http://localhost:8080/api/pagare/${id}`, pagareToEdit);
        fetchPagares();
      } catch (error) {
        console.error('Error al editar el pagare', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/pagare/${id}`);
      fetchPagares();
    } catch (error) {
      console.error('Error al eliminar el pagare', error);
    }
  };

  return (
    <div className="container">
      <h1>Administración de Pagares</h1>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Pagare
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Pagare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNoPagare">
              <Form.Label>No. de Pagare</Form.Label>
              <Form.Control
                type="number"
                name="noPagare"
                value={newPagare.noPagare}
                onChange={handleInputChange}
                placeholder="Ingrese el número de pagare"
              />
            </Form.Group>
            <Form.Group controlId="formCapital">
              <Form.Label>Capital</Form.Label>
              <Form.Control
                type="number"
                name="capital"
                value={newPagare.capital}
                onChange={handleInputChange}
                placeholder="Ingrese el capital"
              />
            </Form.Group>
            <Form.Group controlId="formInteres">
              <Form.Label>Interés</Form.Label>
              <Form.Control
                type="number"
                name="interes"
                value={newPagare.interes}
                onChange={handleInputChange}
                placeholder="Ingrese el interés"
              />
            </Form.Group>
            <Form.Group controlId="formTotal">
              <Form.Label>Total</Form.Label>
              <Form.Control
                type="number"
                name="total"
                value={newPagare.total}
                onChange={handleInputChange}
                placeholder="Ingrese el total"
              />
            </Form.Group>
            <Form.Group controlId="formVencimiento">
              <Form.Label>Vencimiento</Form.Label>
              <Form.Control
                type="text"
                name="vencimiento"
                value={newPagare.vencimiento}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha de vencimiento"
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
            <th>No. de Pagare</th>
            <th>Capital</th>
            <th>Interés</th>
            <th>Total</th>
            <th>Vencimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pagares.map((pagare) => (
            <tr key={pagare.idPagare}>
              <td>{pagare.idPagare}</td>
              <td>{pagare.noPagare}</td>
              <td>{pagare.capital}</td>
              <td>{pagare.interes}</td>
              <td>{pagare.total}</td>
              <td>{pagare.vencimiento}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(pagare.idPagare)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(pagare.idPagare)}>
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

export default PagareCRUD;
