import React, { useState } from "react";
import Modal from "react-modal";
import { useRegisterContext } from "../../context/EndUser/RegisterContext";
import axios from "axios";
import { FormRow } from "../../components";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
Modal.setAppElement("#root");

function UsersAddNewDevice({ isOpen, onClose, rowdata }) {
    const {
        updateNewDeviceData, newDevice,
        addNewDevice,
        issuccess } = useRegisterContext();

    const [values, setValues] = useState({
        userId: '',
        uuid: "",
        devicename: "",
    });

    const handleOnchange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        updateNewDeviceData('userId', rowdata._id)
        updateNewDeviceData(e.target.name, e.target.value)
    };

    const handleSubmit = async () => {
        try {

            console.log(newDevice);
            addNewDevice().then(() => {
                if (issuccess) {
                    //
                    console.log("device uuid registerd")
                }
            })
            // Call API to register user and handle UUIDs
            //    const userResponse = await axios.post('/api/register', values);

            //  const uuidResponse = await axios.post('/api/submit-uuids', {
            //      userId: userResponse.data.userId,
            //      uuids: values.uuids,
            //  });

            // Handle server integration based on responses
            // ...

            onClose();
            setValues({
                userId: '',
                uuid: "",
                devicename: "",
            });
        } catch (error) {
            // Handle errors
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}

        >
            <DialogTitle>Add UUID to user with device</DialogTitle>
            <DialogContent>
                <div>
                    <FormRow
                        type="text"
                        name="devicename"
                        value={values.devicename}
                        handleChange={handleOnchange}
                    />
                    <FormRow
                        type="text"
                        name="uuid"
                        value={values.uuid}
                        handleChange={handleOnchange}
                    />
                </div>
            </DialogContent>
            <DialogActions>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <button style={{ margin: 10 }} className="btn" onClick={handleSubmit}>
                        Add Device
                    </button>
                    <button style={{ margin: 10 }} className="btn" onClick={() => {
                        console.log('closed')
                        setValues({
                            userId: '',
                            uuid: "",
                            devicename: "",
                        });
                        onClose();
                    }}>
                        Close
                    </button>
                </div>
            </DialogActions>
        </Dialog>

    );
}

export default UsersAddNewDevice;
