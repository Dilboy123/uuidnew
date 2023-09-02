import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component';
import { blockUser as blockApi, unblockUser as unblockApi } from '../../context/EndUser/api';
const UsersViewDetails = ({ open, handleClose, data }) => {

    const [isBlocked, setIsBlocked] = useState(false); // Add state for blocked status
    const [message, setMessage] = useState(''); // Add state for messages


    const blockUser = async () => {
        try {
            const response = await blockApi(data._id,);
            setIsBlocked(true);
            setMessage(response.message);
            handleClose();
        } catch (error) {
            setMessage(error.message);
        }
    };

    const unblockUser = async () => {
        try {
            const response = await unblockApi(data._id,);
            setIsBlocked(false);
            setMessage(response.message);
            handleClose();
        } catch (error) {
            setMessage(error.message);
        }
    };

    useEffect(() => {
        setMessage('');
    }, [message])

    const columns = [
        {
            name: 'Device Name',
            selector: row => row.devicename,
            sortable: true,
        }, {
            name: 'UUID',
            selector: row => row.uuid,
            sortable: true,
        },
    ]

    const columns_servers = [
        { name: 'Server Type', selector: row => row.servertype },
        { name: 'IP Address', selector: row => row.ip },
        { name: 'Port', selector: row => row.port },
        { name: 'Username', selector: row => row.username },
        { name: 'Allowed UUID', selector: row => row.alloweduuid },
    ];

    return (
        <>
            {data && <Dialog open={open} onClose={handleClose}>
                <DialogTitle>User Details</DialogTitle>
                <DialogContent dividers>
                    <div>
                        <strong>User ID:</strong> {data._id}
                    </div>
                    <div>
                        <strong>User Name:</strong> {data.UserName}
                    </div>

                    <div>
                        <strong>Is Blocked:</strong> {data.isBlocked ? 'Yes ' : 'No '}
                        <button className='btn danger' onClick={data.isBlocked ? unblockUser : blockUser}>
                            {data.isBlocked ? 'Unblock User' : 'Block User'}
                        </button>
                        {message && <p>{message}</p>}
                    </div>
                    <div>
                        <strong>Devices:</strong>
                        {data.devices && <DataTable
                            columns={columns}
                            data={data.devices}
                            direction="auto"
                            fixedHeader
                            fixedHeaderScrollHeight="300px"
                            highlightOnHover
                            pagination
                            responsive
                            subHeaderAlign="right"
                            subHeaderWrap
                        />}
                        <strong>Servers:</strong>

                        {data.serverauths &&
                            <DataTable
                                columns={columns_servers}
                                data={data.serverauths}
                                highlightOnHover
                                pagination
                            />}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>}
        </>
    );
};

export default UsersViewDetails;
