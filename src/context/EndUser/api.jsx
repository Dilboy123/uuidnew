// api.js
import axios from 'axios';
import "../../utils/axios";

const BASE_ENDPOINT = '/enduser'

const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_ENDPOINT}/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error);
    }
};


const getUsers = async () => {
    try {
        const response = await axios.get(`${BASE_ENDPOINT}/get-users/`)
        return response.data;
    } catch (error) {
        console.log(error)

    }
}


const getDevices = async (userID) => {
    try {
        const response = await axios.get(`${BASE_ENDPOINT}/get-devices/${userID}`)
        return response.data;
    } catch (error) {
        throw new Error('fetching failed');
    }
}


const editDevice = async (device) => {
    try {
        console.log(device)
        const response = await axios.put(`${BASE_ENDPOINT}/edit-devices`, {
            device
        })
        return response.data;
    } catch (error) {
        throw new Error('Edit failed');
    }
}


const addDevice = async (device) => {
    console.log(device)
    try {
        const response = await axios.post(`${BASE_ENDPOINT}/add-device`, {
            device
        })
        return response.data;
    } catch (error) {
        throw error;
    }
}

const blockUser = async (userId) => {
    try {
        const response = await axios.put(`${BASE_ENDPOINT}/block-user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Blocking failed');
    }
};

const unblockUser = async (userId) => {
    try {
        const response = await axios.put(`${BASE_ENDPOINT}/unblock-user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Unblocking failed');
    }
};

const addServerAuth = async (data) => {
    try {
        const response = await axios.post(`${BASE_ENDPOINT}/add-server-auth/`, data);
        return response.data;
    } catch (error) {
        throw new Error('Adding server authentication failed');
    }
};

const getServerAuths = async (userId) => {
    try {
        const response = await axios.get(`${BASE_ENDPOINT}/get-server-auths/${userId}`);
        return response.data.serverauths;
    } catch (error) {
        throw new Error('Fetching server authentications failed');
    }
};

const updateServerAuth = async (data) => {
    try {
        const response = await axios.put(`${BASE_ENDPOINT}/update-server-auth/${data.userId}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Updating server authentication failed');
    }
};
export { registerUser, getDevices, editDevice, addDevice, getUsers, blockUser, unblockUser, addServerAuth, getServerAuths, updateServerAuth };
