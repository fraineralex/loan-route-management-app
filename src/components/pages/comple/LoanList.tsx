import React from 'react';
import { Loan } from './types';


interface LoanListProps {
  loans: Loan[];
  onEdit: (loan: Loan) => void;
  onDelete: (loanId: number) => void;
}

const LoanList: React.FC<LoanListProps> = ({ loans, onEdit, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {loans.length === 0 ? (
          <tr>
            <td colSpan={4}>No hay préstamos asignados.</td>
          </tr>
        ) : (
          loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.client}</td>
              <td>${loan.amount}</td>
              <td>{loan.date}</td>
              <td>
                <button
                  className="btn btn-sm btn-info mr-2"
                  onClick={() => onEdit(loan)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(loan.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default LoanList;
