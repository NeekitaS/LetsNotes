import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL;

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest"
        });

        const { data } = await axios.get(`${base_url}/api/me`, {
            withCredentials: true
        });

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user
        });

    } catch (error) {
        dispatch({
            type: "LoadUserFailure",
            payload: error.response.data.message
        })
    }
}

export const loginUser = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({
            type: "LoginUserRequest"
        });

        const { data } = await axios.post(`${base_url}/api/login`, { name, email, password }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "LoginUserSuccess",
            payload: data
        });

    } catch (error) {
        dispatch({
            type: "LoginUserFailure",
            payload: error.response.data.message
        })
    }
}

export const registerUser = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: "RegisterUserRequest"
        });

        const { data } = await axios.post(`${base_url}/api/register`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "RegisterUserSuccess",
            payload: data
        });

    } catch (error) {
        dispatch({
            type: "RegisterUserFailure",
            payload: error.response.data.message
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LogoutUserRequest"
        });

        const { data } = await axios.get(`${base_url}/api/logout`, {
            withCredentials: true
        });

        dispatch({
            type: "LogoutUserSuccess",
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: "LogoutUserFailure",
            payload: error.response.data.message
        })
    }

}

export const updateProfile = (name) => async (dispatch) => {
    try {
        dispatch({
            type: "UpdateProfileRequest"
        });

        const { data } = await axios.put(`${base_url}/api/me`, { name }, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            }
        });

        dispatch({
            type: "UpdateProfileSuccess",
            payload: data
        });
    } catch (error) {
        dispatch({
            type: "UpdateProfileFailure",
            payload: error.response.data.message
        })
    }
}

export const deleteMyProfile = () => async (dispatch) => {
    try {
        dispatch({
            type: "DeleteProfileRequest"
        });

        const { data } = await axios.delete(`${base_url}/api/me`, {
            withCredentials: true
        });

        dispatch({
            type: "DeleteProfileSuccess",
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: "DeleteProfileFailure",
            payload: error.response.data.message
        })
    }
}