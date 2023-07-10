import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles/styles (prestamos).css';

interface Prestamo {
  idPrestamo: number;
  fecha: string;
  monto: number;
  tipoPrestamo: string;
  vencimiento: string;
  interes: number;
  cuotas: number;
  estado: number;
  pagares: any[];
  cliente: any;
}

const PrestamoCRUD: React.FC = () => {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newPrestamo, setNewPrestamo] = useState<Partial<Prestamo>>({
    fecha: '',
    monto: 0,
    tipoPrestamo: '',
    vencimiento: '',
    interes: 0,
    cuotas: 0,
    estado: 0,
    pagares: [],
    cliente: null,
  });
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroFechaDesde, setFiltroFechaDesde] = useState<Date | null>(null);
  const [filtroFechaHasta, setFiltroFechaHasta] = useState<Date | null>(null);

  useEffect(() => {
    fetchPrestamos();
  }, []);

  const fetchPrestamos = async () => {
    try {
      const response = await axios.get<Prestamo[]>('http://localhost:8080/api/prestamo');
      setPrestamos(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrestamo((prevPrestamo) => ({
      ...prevPrestamo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post<Prestamo>('http://localhost:8080/api/prestamo', newPrestamo);
      setNewPrestamo({
        fecha: '',
        monto: 0,
        tipoPrestamo: '',
        vencimiento: '',
        interes: 0,
        cuotas: 0,
        estado: 0,
        pagares: [],
        cliente: null,
      });
      setShowModal(false);
      fetchPrestamos();
    } catch (error) {
      console.error('Error al agregar el préstamo', error);
    }
  };

  const filteredPrestamos = prestamos.filter((prestamo) => {
    if (filtroCliente && prestamo.cliente !== filtroCliente) {
      return false;
    }

    if (filtroFechaDesde && new Date(prestamo.fecha) < filtroFechaDesde) {
      return false;
    }

    if (filtroFechaHasta && new Date(prestamo.fecha) > filtroFechaHasta) {
      return false;
    }

    return true;
  });

  function editCuadre(prestamo: Prestamo): void {
    throw new Error('Function not implemented.');
  }

  function deleteCuadre(prestamo: Prestamo): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="container">
      <h2>Asignación de Préstamos</h2>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Añadir Préstamo
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {/* Modal content */}
        <Modal.Header closeButton>
          <Modal.Title>Añadir Préstamo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="text"
                name="fecha"
                value={newPrestamo.fecha}
                onChange={handleInputChange}
                placeholder="Ingrese la fecha"
              />
            </Form.Group>
            <Form.Group controlId="formMonto">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                name="monto"
                value={newPrestamo.monto}
                onChange={handleInputChange}
                placeholder="Ingrese el monto"
              />
            </Form.Group>
            <Form.Group controlId="formTipoPrestamo">
              <Form.Label>Tipo de Préstamo</Form.Label>
              <Form.Control
                type="text"
                name="tipoPrestamo"
                value={newPrestamo.tipoPrestamo}
                onChange={handleInputChange}
                placeholder="Ingrese el tipo de préstamo"
              />
            </Form.Group>
            <Form.Group controlId="formVencimiento">
              <Form.Label>Vencimiento</Form.Label>
              <br />
              <DatePicker
                selected={newPrestamo.vencimiento ? new Date(newPrestamo.vencimiento) : null}
                onChange={(date) => setNewPrestamo((prevPrestamo) => ({ ...prevPrestamo, vencimiento: date?.toISOString() || '' }))}
                dateFormat="yyyy-MM-dd HH:mm:ss"
                showTimeInput
                placeholderText="Seleccione una fecha"
              />
            </Form.Group>
            <Form.Group controlId="formInteres">
              <Form.Label>Interés</Form.Label>
              <Form.Control
                type="number"
                name="interes"
                value={newPrestamo.interes}
                onChange={handleInputChange}
                placeholder="Ingrese el interés"
              />
            </Form.Group>
            <Form.Group controlId="formEstado">
              <Form.Label>Estado</Form.Label>
              <Form.Control
                type="number"
                name="estado"
                value={newPrestamo.estado}
                onChange={handleInputChange}
                placeholder="Ingrese el estado"
              />
            </Form.Group>
            <Form.Group controlId="formCliente">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                as="select"
                name="cliente"
                value={newPrestamo.cliente || ''}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un cliente</option>
                <option value="cliente1">Cliente 1</option>
                <option value="cliente2">Cliente 2</option>
                <option value="cliente3">Cliente 3</option>
              </Form.Control>
            </Form.Group>
            {/* Resto de los campos del formulario */}
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

      <h4>Filtrar Préstamos</h4>
      <div className="mb-3">
        <Form.Group controlId="formFiltroCliente">
          <Form.Label>Filtrar por Cliente</Form.Label>
          <Form.Control
            type="text"
            value={filtroCliente}
            onChange={(e) => setFiltroCliente(e.target.value)}
            placeholder="Ingrese el cliente"
          />
        </Form.Group>
        <Form.Group controlId="formFiltroFechaDesde">
          <Form.Label>Filtrar por Fecha Desde</Form.Label>
          <br />
          <DatePicker
            selected={filtroFechaDesde}
            onChange={(date) => setFiltroFechaDesde(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccione una fecha"
          />
        </Form.Group>
        <Form.Group controlId="formFiltroFechaHasta">
          <Form.Label>Filtrar por Fecha Hasta</Form.Label>
          <br />
          <DatePicker
            selected={filtroFechaHasta}
            onChange={(date) => setFiltroFechaHasta(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Seleccione una fecha"
          />
        </Form.Group>
      </div>

      <table className="table">
      <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Tipo de Préstamo</th>
            <th>Vencimiento</th>
            <th>Interés</th>
            <th>Cuotas</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredPrestamos.map((prestamo) => (
            <tr key={prestamo.idPrestamo}>
              <td>{prestamo.idPrestamo}</td>
              <td>{prestamo.fecha}</td>
              <td>{prestamo.monto}</td>
              <td>{prestamo.tipoPrestamo}</td>
              <td>{prestamo.vencimiento}</td>
              <td>{prestamo.interes}</td>
              <td>{prestamo.cuotas}</td>
              <td>{prestamo.estado}</td>
              <td>{prestamo.cliente}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => editCuadre(prestamo)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCuadre(prestamo)}
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

export default PrestamoCRUD;
