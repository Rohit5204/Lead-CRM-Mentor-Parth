import React from 'react';
import InvoiceField from './InvoiceField';
import { Icon, IconButton } from '@mui/material';
const InvoiceEMI = ({ id, date, amount, onDeleteItem, onEdtiItem }) => {
  const deleteItemHandler = () => {
    onDeleteItem(id);
  };

  return (
    <tr>
      <td className="w-full">
        <input
          type="date"
          value={date}
          name={date}
          id={id}
          onChange={(event) => onEdtiItem(event)}
        />
        {/* <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            placeholder: 'Item name',
            type: 'text',
            name: 'name',
            id: id,
            value: name,
          }}
        /> */}
      </td>
      <td className="w-full">
        <input type="number" value={amount} name={amount} onChange={(event) => onEdtiItem(event)} />
        {/* <InvoiceField
          onEditItem={(event) => onEdtiItem(event)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'qty',
            id: id,
            value: qty,
          }}
        /> */}
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
