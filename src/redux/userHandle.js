import axios from 'axios';
import {
    authRequest,
    authSuccess,
    authFailed,
    authError,
    stuffAdded,
    updateFailed,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    productSuccess,
    productDetailsSuccess,
    getProductDetailsFailed,
    getProductsFailed,
    setFilteredProducts,
    getSearchFailed,
    sellerProductSuccess,
    getSellerProductsFailed,
    stuffUpdated,
    updateCurrentUser,
    customersListSuccess,
    getCustomersListFailed,
    specificProductSuccess,
    getSpecificProductsFailed,
} from './userSlice';

// Define your async actions
export const authUser = (fields, role, mode) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}${mode}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError({ message: error.message, status: error.response?.status }));
    }
};

export const addStuff = (address, fields) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded());
        }
    } catch (error) {
        dispatch(authError({ message: error.message, status: error.response?.status }));
    }
};

export const updateStuff = (fields, id, address) => async (dispatch) => {
    try {
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields);
        if (result.data.message) {
            dispatch(updateFailed(result.data.message));
        } else {
            dispatch(stuffUpdated());
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const deleteStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const updateCustomer = (fields, id) => async (dispatch) => {
    dispatch(updateCurrentUser(fields));
    try {
        await axios.put(`${process.env.REACT_APP_BASE_URL}/CustomerUpdate/${id}`, fields);
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const getProductsbySeller = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getSellerProducts/${id}`);
        if (result.data.message) {
            dispatch(getSellerProductsFailed(result.data.message));
        } else {
            dispatch(sellerProductSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const getProducts = () => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getProducts`);
        if (result.data.message) {
            dispatch(getProductsFailed(result.data.message));
        } else {
            dispatch(productSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getProductDetail/${id}`);
        if (result.data.message) {
            dispatch(getProductDetailsFailed(result.data.message));
        } else {
            dispatch(productDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const getCustomers = (id) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getCustomers/${id}`);
        if (result.data.message) {
            dispatch(getCustomersListFailed(result.data.message));
        } else {
            dispatch(customersListSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const getSpecificProducts = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
        if (result.data.message) {
            dispatch(getSpecificProductsFailed(result.data.message));
        } else {
            dispatch(specificProductSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};

export const getSearchedProducts = (address, key) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${key}`);
        if (result.data.message) {
            dispatch(getSearchFailed(result.data.message));
        } else {
            dispatch(setFilteredProducts(result.data)); // Assuming `result.data` contains the filtered products
        }
    } catch (error) {
        dispatch(getError({ message: error.message, status: error.response?.status }));
    }
};
