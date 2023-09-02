import React, { useState } from "react";
import Modal from "react-modal";
import { useRegisterContext } from "../../context/EndUser/RegisterContext";
import axios from "axios";
import { FormRow } from "../../components";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Alert } from "@mui/material";
import Button from '@mui/material/Button';
Modal.setAppElement("#root");

function UsersModelDialog({ isOpen, onClose }) {
    const {
        registrationData,
        updateRegistrationData,
        resetRegistrationData,
        submitRegistration,
        issuccess } = useRegisterContext();

    const [values, setValues] = useState({
        UserName: "",
        uuids: [],
        Password: "",
    });

    const [rerror, setError] = useState(null);


    const handleOnchange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        updateRegistrationData(e.target.name, e.target.value)
    };

    const handleSubmit = async () => {
        try {
            console.log(registrationData);
            submitRegistration().then((res) => {
                console.log(res)
                setError(null)
                onClose();
                setValues({
                    UserName: "",
                    uuids: [],
                    Password: "",
                });
                console.log("user registerd")

            }).catch((error) => {
                setError('user registration failed!! check input data')
                console.log(error.message)
            })

        } catch (error) {
            console.log(error)
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
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
                <div>
                    <FormRow
                        type="text"
                        name="UserName"
                        value={values.UserName}
                        handleChange={handleOnchange}
                    />
                </div>
                <div>
                    <FormRow
                        type="password"
                        name="Password"
                        value={values.Password}
                        handleChange={handleOnchange}
                    />
                </div>
            </DialogContent>
            {rerror && <Alert severity="warning">{rerror}</Alert>}
            <DialogActions>


                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <button style={{ margin: 10 }} className="btn" onClick={handleSubmit}>
                        Add User
                    </button>
                    <button style={{ margin: 10 }} className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </DialogActions>
        </Dialog>
    );
}

export default UsersModelDialog;
