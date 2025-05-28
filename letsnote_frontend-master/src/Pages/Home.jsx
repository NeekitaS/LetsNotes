import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { getAllCategories } from '../Actions/Category.js';
import { getAllNotes, getCategoryNotes } from '../Actions/Note';
import { Add } from '@mui/icons-material';

import Note from '../components/Note';
import { toast } from 'react-toastify'

const Home = () => {
    const { categories, loading: categoryLoading, message: categoryMessage, error: categoryError } = useSelector(state => state.category);
    const { notes, loading: notesLoading, message: notesMessage, error: notesError } = useSelector(state => state.note);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch])

    useEffect(() => {
        if (selectedCategory === 'All') {
            dispatch(getAllNotes());
        } else {
            dispatch(getCategoryNotes(selectedCategory));
        }
    }, [selectedCategory])

    useEffect(() => {
        if (categoryError) {
            toast.error(categoryError);
            dispatch({ type: 'clearError' })
        }

        if (notesError) {
            toast.error(notesError);
            dispatch({ type: 'clearError' })
        }

        if (categoryMessage) {
            toast.success(categoryMessage);
            dispatch({ type: 'clearMessage' })
        }

        if (notesMessage) {
            toast.success(notesMessage);
            dispatch({ type: 'clearMessage' })
        }

    }, [categoryError, notesError, notesMessage, categoryMessage])

    return (
        <>
            {
                categoryLoading
                    ?
                    <div className='w-full h-[20vh] flex justify-center items-center'>
                        <Typography variant='h6'>Loading Categories...</Typography>
                    </div>
                    :
                    (
                        categories && categories.length > 0 ? (
                            <div className='my-2 mx-auto w-fit max-w-full md:my-4 py-2 px-4 flex items-center gap-2 overflow-x-hidden hover:overflow-x-auto'>
                                <div className={`border-[0.5px] rounded-full px-4 py-2 cursor-pointer hover:bg-cyan-100 ${selectedCategory === 'All' && 'bg-cyan-100'}`}
                                    onClick={() => setSelectedCategory('All')}
                                >
                                    All
                                </div>
                                {
                                    categories.map((category) => (
                                        <div key={category._id}
                                            className={`w-fit text-nowrap border-[0.5px] rounded-full px-4 py-2 cursor-pointer hover:bg-cyan-100 ${selectedCategory === category._id && 'bg-gray-100'}`}
                                            onClick={() => setSelectedCategory(category._id)}
                                        >
                                            {category.name}
                                        </div>
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='w-full h-[20vh] flex justify-center items-center'>
                                {/* <Typography variant='h6'>No Categories Found Yet</Typography> */}
                            </div>
                        )
                    )
            }

            {
                notesLoading
                    ?
                    <div className='w-full h-[60vh] flex justify-center items-center'>
                        <Typography variant='h6'>Loading Notes...</Typography>
                    </div>
                    :
                    (
                        notes && notes.length > 0 ? (
                            <div className='m-4 mb-8 max-sm:m-0 max-sm:mb-8 py-2 px-2 flex flex-wrap justify-center items-start gap-2 overflow-x-hidden hover:overflow-x-auto'>
                                {
                                    notes.map((note) => (
                                        <Note key={note._id} noteId={note._id} title={note.title} content={note.content} category_id={selectedCategory} category={note.category.name} lastUpdated={new Date(note.updatedAt).toDateString()} />
                                    ))
                                }
                            </div>
                        ) : (
                            <div className='w-full h-[60vh] flex justify-center items-center'>
                                <Typography variant='h6'>No Notes Found Yet</Typography>
                            </div>
                        )
                    )
            }

            <Link to='/note'>
                <div className='fixed bottom-14 right-6 bg-cyan-200 p-3 rounded-full cursor-pointer shadow-md hover:bg-cyan-300 z-10'>
                    <Add fontSize='large' />
                </div>
            </Link>
        </>
    )
}

export default Home