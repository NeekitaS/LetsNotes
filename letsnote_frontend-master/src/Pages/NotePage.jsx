import { useEffect, useState, useRef, useMemo } from 'react'
import { Save, ExpandMore, Add } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { addNote, editNote } from '../Actions/Note'
import { TextField, MenuItem } from '@mui/material/';
import { getAllCategories } from '../Actions/Category';
import { loadUser } from '../Actions/User';

import { toast } from 'react-toastify';

const NotePage = () => {
  const location = useLocation();
  const [note_id, setNoteId] = useState(null);
  const [note, setNote] = useState({
    title: '',
    category: '',
    content: ''
  })
  const [addCategory, setAddCategory] = useState(true);

  const { message, error } = useSelector(state => state.note);
  const { categories } = useSelector(state => state.category);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note_id) {
      await dispatch(editNote(note_id, note))
    } else {
      await dispatch(addNote(note))
    }

    await dispatch(getAllCategories());
    await dispatch(loadUser());
  }

  useEffect(() => {
    if (!categories) {
      dispatch(getAllCategories());
    }
  })

  useEffect(() => {
    if (location.state) {
      setNote({
        title: location.state.title,
        category: location.state.category,
        content: location.state.content
      })
      setNoteId(location.state.noteId)
    }
  }, [location])

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' })
      setNote({
        title: '',
        category: '',
        content: ''
      })
    }

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' })
    }
  }, [message, error])

  return (
    <div className="w-[50%] max-md:w-[90%] mx-auto my-8 px-4 py-8 max-sm:px-0 max-sm:py-2">
      <form
        className="flex flex-col justify-center items-center gap-6"
        onSubmit={handleSubmit}
      >
        {/* <input type="text" placeholder="Title" name='title'
          className="w-[90%] rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-200 transition duration-500 ease-in-out"
          required
          value={note.title}
          onChange={handleChange}
        />
        <input type="test" placeholder="Category" name='category'
          className="w-[90%] rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-200 transition duration-500 ease-in-out"
          required
          value={note.category}
          onChange={handleChange}
        /> */}

        <TextField label="Title" variant="standard" name='title' value={note.title} onChange={handleChange}
          className="w-[90%] rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-200 transition duration-500 ease-in-out"
          required
        />

        {
          addCategory ? (
            <div className='w-[90%] flex justify-between items-baseline'>
              <TextField label="New Category" variant="standard" name='category' value={note.category} onChange={handleChange}
                className="w-[80%] rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-blue-200 transition duration-500 ease-in-out"
                required
              />
              <button type="button" onClick={() => setAddCategory(false)}
                className="px-4 p-2 flex justify-center items-center gap-2 hover:text-blue-300 transition duration-100 ease-in-out"
              >
                Select
                <ExpandMore fontSize="medium" />
              </button>
            </div>
          ) : (
            categories && (
              <div className='w-[90%] flex justify-between items-baseline'>
                <TextField
                  select
                  label="Select Category"
                  name='category'
                  value={note.category}
                  variant="standard"
                  className="w-[80%] rounded-md px-4 py-3 border border-gray-300 focus:outline-none focus:border-yellow-200 transition duration-500 ease-in-out"
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
                <button type="button" onClick={() => setAddCategory(true)}
                  className="px-4 p-2 flex justify-center items-center gap-2 hover:text-amber-200 transition duration-100 ease-in-out"
                >
                  Add
                  <Add fontSize="medium" />
                </button>
              </div>
            )
          )
        }

        <textarea placeholder="Start Typing here..." name='content'
          className="w-[90%] px-4 py-2 max-sm:px-2 border border-b-gray-400 transition duration-500 ease-in-out outline-none"
          rows={10}
          value={note.content}
          onChange={handleChange}
          required
        />

        <button type="submit"
          className="w-[50%] max-w-[200px] rounded-full px-4 py-2 bg-cyan-200 font-semibold hover:bg-amber-300 transition  ease-in-out text-xl max-md:text-sm duration-500 flex justify-center items-center gap-2"
        >
          <Save fontSize="small" />
          Save
        </button>
      </form>
    </div>
  )
}

export default NotePage