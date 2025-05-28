import axios from "axios";
const base_url = import.meta.env.VITE_BASE_URL;

export const getAllNotes = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadNotesRequest"
        })

        const { data } = await axios.get(`${base_url}/api/notes`, {
            withCredentials: true
        });

        dispatch({
            type: "LoadNotesSuccess",
            payload: data.notes
        })

    } catch (error) {
        dispatch({
            type: "LoadNotesFailure",
            payload: error.response.data.message
        })
    }
}

export const getCategoryNotes = (category_id) => async (dispatch) => {
    try {
        dispatch({
            type: "LoadNotesRequest"
        })

        const { data } = await axios.get(`${base_url}/api/notes/${category_id}`, {
            withCredentials: true
        });

        dispatch({
            type: "LoadNotesSuccess",
            payload: data.notes
        })


    } catch (error) {
        dispatch({
            type: "LoadNotesFailure",
            payload: error.response.data.message
        })
    }
}

export const addNote = (note) => async (dispatch) => {
    try {
        dispatch({
            type: "AddNoteRequest"
        })

        const { data } = await axios.post(`${base_url}/api/note`,
            note,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })

        dispatch({
            type: "AddNoteSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "AddNoteFailure",
            payload: error.response.data.message
        })
    }
}

export const editNote = (note_id, note) => async (dispatch) => {
    try {
        dispatch({
            type: "EditNoteRequest"
        })

        const { data } = await axios.put(`${base_url}/api/note/${note_id}`, note, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        })

        dispatch({
            type: "EditNoteSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "EditNoteFailure",
            payload: error.response.data.message
        })
    }
}

export const deleteNote = (note_id) => async (dispatch) => {
    try {
        dispatch({
            type: "DeleteNoteRequest"
        })

        const { data } = await axios.delete(`${base_url}/api/note/${note_id}`, {
            withCredentials: true
        });

        dispatch({
            type: "DeleteNoteSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "DeleteNoteFailure",
            payload: error.response.data.message
        })
    }
}