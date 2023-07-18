import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { customersData, customersGrid } from '../data/dummy';
import { Header } from '../components';
import avatar3 from '../data/avatar3.png';

const Customers = () => {
  const [customersList, setCustomerList] = useState([]);
  
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Delete', 'Search'];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    const url = 'http://localhost:8080/cliente/list';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const mappedData = data.map((item) => {
          const customer = {
            customerID: item.idCliente,
            email: item.email,
            name: `${item.nombre} ${item.apellido}`,
            ocupacion: item.ocupacion,
            entryDate: `${item.fechaIngreso[2]}/${item.fechaIngreso[1]}/${item.fechaIngreso[0]}`,
            lugarTrabajo: item.lugarTrabajo,
            cedula: `${item.cedula}`,
            status: item.estatus === 1 ? '🟢 Activo' : '🟠 Inactivo',
            customerImage: avatar3,
          };
          return customer;
        });

        setCustomerList(mappedData);
      })
      .catch((error) => {
        // Manejar errores de la solicitud
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Sección" title="Clientes" />
      <GridComponent
        dataSource={customersList}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
