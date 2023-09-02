import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addServerAuth, updateServerAuth } from '../../context/EndUser/api';
import { FormRow } from '../../components';
import DataTable from 'react-data-table-component';

const ServerAuthDialog = ({ open, onClose, action, serverAuth, userId }) => {
    const [formData, setFormData] = useState(serverAuth || {});
    const [message, setMessage] = useState('');

    // Columns for the data table
    const columns = [
        { name: 'Server Type', selector: row => row.servertype },
        { name: 'IP Address', selector: row => row.ip },
        { name: 'Port', selector: row => row.port },
        { name: 'Username', selector: row => row.username },
        { name: 'Allowed UUID', selector: row => row.alloweduuid },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {

            console.log(userId);
            if (action === 'add') {
                await addServerAuth({ ...formData, userId });
                setMessage('Server authentication added successfully');
            } else if (action === 'update') {
                await updateServerAuth({ ...formData, userId });
                setMessage('Server authentication updated successfully');
            }
            onClose(); // Close the dialog after successful action
            setMessage('')
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{action === 'view' ? 'View Server Authentications' : 'Manage Server Authentication'}</DialogTitle>
            <DialogContent dividers>
                {action === 'view' ? (
                    // Render the data table when viewing server authentications
                    <DataTable
                        columns={columns}
                        data={serverAuth}
                        highlightOnHover
                        pagination
                    />
                ) : (
                    // Render the form fields when adding or updating server authentication
                    <>
                        <FormRow type="text" name="servertype" value={formData.servertype || ''} handleChange={handleChange} id="servertype" placeholder="Enter Server Type" />
                        <FormRow type="text" name="ip" value={formData.ip || ''} handleChange={handleChange} id="ip" placeholder="Enter IP Address" />
                        <FormRow type="text" name="port" value={formData.port || ''} handleChange={handleChange} id="port" placeholder="Enter Port" />
                        <FormRow type="text" name="username" value={formData.username || ''} handleChange={handleChange} id="username" placeholder="Enter Username" />
                        <FormRow type="password" name="password" value={formData.password || ''} handleChange={handleChange} id="password" placeholder="Enter Password" />
                        <FormRow type="text" name="alloweduuid" value={formData.alloweduuid || ''} handleChange={handleChange} id="alloweduuid" placeholder="Enter Allowed UUID" />
                    </>
                )}  {message && <p>{message}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                {action !== 'view' && <Button onClick={handleSubmit} color="primary">{action === 'add' ? 'Add' : 'Update'}</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default ServerAuthDialog;
