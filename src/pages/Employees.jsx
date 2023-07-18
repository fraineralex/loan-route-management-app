import React, { useState, useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Page, Selection, Edit, Toolbar, Sort, Filter, Search } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import avatar3 from '../data/avatar3.png';

const Employees = () => {
  const [usersList, setUsersList] = useState([]);
  const selectionsettings = { persistSelection: true };
  const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
  const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

  useEffect(() => {
    const origin = process.env.ORIGIN;
    const url = `${origin}/usuarios/list`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map((item) => {
          const employee = {
            employeeID: item.idUsuario,
            username: item.usuario,
            name: `${item.cobrador.nombre} ${item.cobrador.apellido}`,
            role: item.rol.idRol === 1 ? 'Administrador' : 'Cobrador',
            hireDate: `${item.cobrador.fechaIngreso[2]}/${item.cobrador.fechaIngreso[1]}/${item.cobrador.fechaIngreso[0]}`,
            company: item.empresa.nombre,
            cedula: `${item.cobrador.cedula}`,
            status: item.estatus === 1 ? '🟢 Activo' : '🟠 Inactivo',
            employeeImage: avatar3,
          };
          return employee;
        });

        setUsersList(mappedData);
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Sección" title="Empleados" />
      <GridComponent
        dataSource={usersList}
        enableHover={false}
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editOptions}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter, Search]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
