import { useState, useRef, useMemo } from 'react';
import { EditRounded, DeleteRounded, MoreVert } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllNotes, getCategoryNotes, deleteNote } from '../Actions/Note';
import { getAllCategories } from '../Actions/Category.js';
import { loadUser } from '../Actions/User';

const Note = ({ noteId, title, content, category_id, category, lastUpdated = "21-03-2024" }) => {
    const [dialogOpen, setDialogOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleEditNote = () => {
        navigate('/note', { state: { noteId, title, content, category_id, category } });
    }

    const handleDeleteNote = async () => {
        await dispatch(deleteNote(noteId));
        await dispatch(getAllCategories());

        if (category_id === 'All') {
            await dispatch(getAllNotes());
        } else {
            await dispatch(getCategoryNotes(category_id));
        }

        await dispatch(loadUser());
    }

    return (
        <div className="relative w-[300px] h-fit min-h-[180px] m-4 border-[0.5px] shadow hover:shadow-lg rounded-lg cursor-pointer">
            <div onClick={handleEditNote}>
                <div className="relative text-lg font-medium border-b-[0.5px] py-2 px-4">
                    {title}
                    <p className="text-sm italic text-gray-500">
                        {category}
                    </p>

                    <MoreVert className={`absolute right-1 top-3 cursor-pointer hover:text-cyan-500 
                ${dialogOpen && 'text-black-500'}
                `}
                        onClick={(e) => { e.stopPropagation(); setDialogOpen(!dialogOpen); }}
                    />
                </div>
                <div className="text-sm py-4 px-4 pb-6">
                    {content.substring(0, 100) + '...'}
                </div>
                <div className='absolute right-0 bottom-0 text-[0.8rem] m-2 mr-3 text-gray-400'>
                    Last Updated At: {lastUpdated.toString()}
                </div>
            </div>
            {
                dialogOpen && (
                    <div className="bg-white border-[0.5px] rounded-lg text-sm flex flex-col justify-center items-start absolute top-4 right-8 drop-shadow-xl">
                        <div className='w-full p-2 pr-4 flex cursor-pointer hover:text-cyan-500 border-b-2 hover:bg-gray-50 rounded-t-md'
                            onClick={handleEditNote}
                        >
                            <EditRounded className="mr-2" fontSize='small' />
                            Edit
                        </div>

                        <div className='w-full p-2 pr-4 flex cursor-pointer hover:text-red-500
                        hover:bg-gray-50 rounded-b-md'
                            onClick={handleDeleteNote}
                        >
                            <DeleteRounded className="mr-2" fontSize='small' /> Delete
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Note