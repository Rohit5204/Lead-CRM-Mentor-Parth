import React from 'react';
import InvoiceFieldEMI from './EMIFields';
import { Icon, IconButton } from '@mui/material';
const InvoiceEMI = ({ id, instalmentNumber, instalmentDate, instalmentAmount, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(instalmentNumber);
  };
  return (
    <tr>
      <td className="w-full">
        {/* <input type="text" value={no} name={no} id={id} onChange={(event) => onEdtiItem(event)} /> */}
        <InvoiceFieldEMI
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Installment No.',
            type: 'text',
            name: 'instalmentNumber',
            id: instalmentNumber,
            value: instalmentNumber,
          }}
        />
      </td>
      <td className="w-full">
        {/* <input type="date" value={date} name={date} onChange={(event) => onEdtiItem(event)} /> */}
        <InvoiceFieldEMI
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: 'date',
            name: 'instalmentDate',
            id: instalmentNumber,
            value: instalmentDate,
          }}
        />
      </td>
      <td className="w-full">
        {/* <input type="number" value={amount} name={amount} onChange={(event) => onEdtiItem(event)} /> */}
        <InvoiceFieldEMI
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Installment Amount',
            type: 'text',
            name: 'instalmentAmount',
            id: instalmentNumber,
            value: instalmentAmount,
          }}
        />
      </td>

      <td className="flex items-center justify-center">
        <IconButton onClick={deleteItemHandler} className="ml-5">
          <Icon color="warning">delete</Icon>
        </IconButton>
      </td>
    </tr>
  );
};

export default InvoiceEMI;
