import React, { useState, useEffect } from 'react';
import ItemField from './itemFields';
import { Icon, IconButton, FormControl, Autocomplete, TextField, } from '@mui/material';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const QuotationItem = ({ id, name, qty, price, onDeleteItem, onEdtiItem }) => {
    const [catalogueData, setCatalogueData] = useState([]);
    useEffect(() => {
        axios.post(`http://35.89.6.16:4002/api/getCatalogue`, { catId: 0 }).then((res) => {
            for (var i = 0; i < res.data.data.length; i++) {
                setCatalogueData(current => [...current, res.data.data[i].gsName]);
            }
        });
    }, []);

    const deleteItemHandler = () => {
        onDeleteItem(id);
    };

    return (
        <tr className='mt-1'>
            <td className="w-full">
                {/* <FormControl>
                    <Autocomplete
                        style={{ width: 250 }}
                        freeSolo
                        autoComplete
                        autoHighlight
                        options={!catalogueData ? [{ label: "Loading...", id: 0 }] : catalogueData}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                onChange={(e) => setCatalogueData(e.target.value)}
                                variant="outlined"
                                label="Select the Product or Service"
                                size="small"
                            />
                        )}
                    />
                </FormControl> */}
                <ItemField
                    onEditItem={(event) => onEdtiItem(event)}
                    cellData={{
                        placeholder: 'Item name',
                        type: 'text',
                        name: 'name',
                        id: id,
                        value: name,
                    }}
                />
            </td>
            <td className="min-w-[65px] md:min-w-[80px]">
                <ItemField
                    onEditItem={(event) => onEdtiItem(event)}
                    cellData={{
                        type: 'number',
                        min: '1',
                        name: 'qty',
                        id: id,
                        value: qty,
                    }}
                />
            </td>
            <td className="relative min-w-[100px] md:min-w-[150px]">

                <ItemField
                    onEditItem={(event) => onEdtiItem(event)}
                    cellData={{
                        // className: 'text-right',
                        type: 'number',
                        min: '1',
                        // step: '1',
                        name: 'price',
                        id: id,
                        value: price,
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

export default QuotationItem;
