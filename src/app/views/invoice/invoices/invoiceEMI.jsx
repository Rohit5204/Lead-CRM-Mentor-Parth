import React from 'react';
import InvoiceFieldEMI from './EMIFields';
import { Icon, IconButton } from '@mui/material';
const InvoiceEMI = ({ no, id, date, amount, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
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
            name: 'no',
            id: id,
            value: no,
          }}
        />
      </td>
      <td className="w-full">
        {/* <input type="date" value={date} name={date} onChange={(event) => onEdtiItem(event)} /> */}
        <InvoiceFieldEMI
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Item name',
            type: 'date',
            name: 'date',
            id: id,
            value: date,
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
            name: 'amount',
            id: id,
            value: amount,
          }}
        />
      </td>

      <td className="flex items-center justify-center">
        <IconButton onClick={deleteItemHandler}>
          <Icon color="warning">delete</Icon>
        </IconButton>
      </td>
    </tr>
  );
};

export default InvoiceEMI;
