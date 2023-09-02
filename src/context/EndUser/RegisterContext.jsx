import React, { createContext, useState, useContext, useEffect } from "react";
import * as Api from "./api";

const RegisterContext = React.createContext();

export const useRegisterContext = () => {
    return useContext(RegisterContext);
};

export const RegisterProvider = ({ children }) => {
    const [issuccess, setisSuccess] = useState(false);
    const [users, setUsers] = useState(null);

    const [devices, setDevices] = useState(null);
    const [newDevice, setNewDevice] = useState(null)

    const [registrationData, setRegistrationData] = useState({
        UserName: "",
        Password: "",
        // other registration fields
    });

    const addNewDevice = async () => {
        setisSuccess(false);
        await Api.addDevice(newDevice)
        setisSuccess(true)
    }
    const getAllUsers = () => {
        Api.getUsers().then((u) => {
            setUsers(u);
        });
    };

    const getUsers = () => {
        return users
    }


    const updateNewDeviceData = (field, value) => {
        setNewDevice((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        console.log(newDevice);
    };

    const updateRegistrationData = (field, value) => {
        setRegistrationData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        console.log(registrationData);
    };

    const resetRegistrationData = () => {
        setRegistrationData({
            UserName: "",
            password: "",
            // other registration fields
        });
    };

    const submitRegistration = async () => {
        try {
            const response = await Api.registerUser(registrationData);
            // Handle successful registration response, e.g., show a success message
            console.log(response)
            setisSuccess(true);
            return response;
        } catch (error) {
            // Handle registration error, e.g., show an error message
            setisSuccess(false);
            throw error
        }
    };


    useEffect(() => {
        getAllUsers();
    }, [users]);

    return (
        <RegisterContext.Provider
            value={{
                registrationData,
                updateRegistrationData,
                resetRegistrationData,
                submitRegistration, updateNewDeviceData,
                issuccess,
                users, getUsers, addNewDevice, newDevice, devices
            }}
        >
            {children}
        </RegisterContext.Provider>
    );
};
