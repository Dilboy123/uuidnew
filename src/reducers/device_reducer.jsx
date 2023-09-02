import { ActionTypes } from '../action';


const deviceReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_DEVICES:
            return {
                devices: action.payload,
            };
        case ActionTypes.ADD_DEVICE:
            return {
                devices: [...state.devices, action.payload],
            };
        case ActionTypes.EDIT_DEVICE:
            const updatedDevices = state.devices.map((device, index) =>
                index === action.payload.index ? action.payload.device : device
            );
            return {
                devices: updatedDevices,
            };
        default:
            return state;
    }
};

export default deviceReducer