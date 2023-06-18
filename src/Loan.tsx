import React, { useState, useEffect } from 'react';
import LoanList from './Components/LoanList';
import LoanForm from './Components/LoanForm';
import { Loan, FilterOptions } from './Components/types';
import './Loan.css';
import axios from 'axios';

const App: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    fromDate: '',
    toDate: '',
    client: '',
  });

  useEffect(() => {
    // Aquí se simula una llamada a la API para obtener los préstamos
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/endpoint');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos de la API', error);
    }


  };

  const handleFilterChange = (name: string, value: string) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleLoanSubmit = (loan: Loan) => {
    // Aquí se simularía una llamada a la API para guardar el préstamo
    // Puedes reemplazar esto con tu propia lógica de asignación de préstamos
    const newLoan: Loan = {
      ...loan,
      id: loans.length + 1,
    };

    setLoans((prevLoans) => [...prevLoans, newLoan]);
  };

  const handleLoanEdit = (editedLoan: Loan) => {
    // Aquí se simularía una llamada a la API para editar el préstamo
    // Puedes reemplazar esto con tu propia lógica de edición de préstamos
    setLoans((prevLoans) =>
      prevLoans.map((loan) => (loan.id === editedLoan.id ? editedLoan : loan))
    );
  };

  const handleLoanDelete = (loanId: number) => {
    // Aquí se simularía una llamada a la API para eliminar el préstamo
    // Puedes reemplazar esto con tu propia lógica de eliminación de préstamos
    setLoans((prevLoans) => prevLoans.filter((loan) => loan.id !== loanId));
  };

  const filteredLoans = loans.filter((loan) => {
    const { fromDate, toDate, client } = filterOptions;
    const loanDate = new Date(loan.date);

    return (
      (fromDate === '' || loanDate >= new Date(fromDate)) &&
      (toDate === '' || loanDate <= new Date(toDate)) &&
      (client === '' || loan.client.toLowerCase().includes(client.toLowerCase()))
    );
  });

  return (
    <div className="container mt-4">
      <h1>Asignación de Préstamos</h1>
      <LoanForm onSubmit={handleLoanSubmit} />
      <hr />
      <h3>Filtrar Préstamos</h3>
      <div className="row">
        <div className="col-sm-4">
          <input
            type="text"
            placeholder="Cliente"
            value={filterOptions.client}
            onChange={(e) => handleFilterChange('client', e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-sm-4">
          <input
            type="date"
            placeholder="Desde fecha"
            value={filterOptions.fromDate}
            onChange={(e) => handleFilterChange('fromDate', e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-sm-4">
          <input
            type="date"
            placeholder="Hasta fecha"
            value={filterOptions.toDate}
            onChange={(e) => handleFilterChange('toDate', e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <hr />
      <h3>Préstamos Asignados</h3>
      <LoanList
        loans={filteredLoans}
        onEdit={handleLoanEdit}
        onDelete={handleLoanDelete}
      />
    </div>
  );
};

export default App;
function setData(data: any) {
  throw new Error('Function not implemented.');
}

