import React, { useState } from 'react';
import { Loan } from './types';



interface LoanFormProps {
  onSubmit: (loan: Loan) => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ onSubmit }) => {
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLoan: Loan = {
      client,
      amount: parseFloat(amount),
      date: new Date().toISOString().slice(0, 10),
      id: 0
    };

    onSubmit(newLoan);

    setClient('');
    setAmount('');
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Asignar Nuevo Préstamo</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cliente:</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Monto:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Asignar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
