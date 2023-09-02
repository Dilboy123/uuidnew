import React, { createContext, useContext } from "react";
import * as Api from "./api";
import { useState } from "react";

const DeviceContext = createContext();

export const useDeviceContext = () => useContext(DeviceContext);

export const DeviceProvider = ({ children }) => {
    const [devices, setDevices] = useState([]);

    const [isEditSuccess, setisEditSuccess] = useState(false);
    const [isAddSuccess, setisAddSuccess] = useState(false);

    const getDevices = (userId) => {
        Api.getDevices(userId).then((devices) => {
            setDevices(devices);
        });
    };
    const updateDevice = (userId, index) => {
        setisEditSuccess(false);

        if (index >= 0 && index < devices.length) {
            let _device = devices[index];
            _device.userId = userId;
            Api.editDevice(_device).then((res) => {
                //
                setisEditSuccess(true);
            });
        }
    };
    const addDevice = (userId, device) => {
        setisAddSuccess(false);
        let _device = device;
        _device.userId = userId;
        Api.addDevice(device).then((res) => {
            //
            setisAddSuccess(true);
        });
    };

    const getisEditSuccess = () => {
        return isEditSuccess;
    };

    const getisAddSuccess = () => {
        return isAddSuccess;
    };
    const resetDevices = () => {
        setDevices([]);
    };

    return (
        <DeviceContext.Provider
            value={{
                devices,
                getDevices,
                updateDevice,
                resetDevices,
                addDevice,
                getisEditSuccess,
                getisAddSuccess,
            }}
        ></DeviceContext.Provider>
    );
};

export { DeviceContext }