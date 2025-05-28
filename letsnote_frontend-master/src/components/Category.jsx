import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Folder, DeleteRounded, Done, Clear } from '@mui/icons-material';
import { getAllCategories, updateCategory, deleteCategory } from '../Actions/Category';
import { loadUser } from '../Actions/User';

const Category = ({ category_id, title, total_notes }) => {
    const [Category, setCategory] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    const dispatch = useDispatch();

    const onDone = async () => {
        setIsEditing(false);

        //calling dispatch to update the category
        await dispatch(updateCategory(category_id, Category));
        await dispatch(getAllCategories());
        await dispatch(loadUser());
    }

    const onClear = () => {
        setIsEditing(false)
        setCategory(title);
    };

    const onDelete = async () => {
        //calling dispatch to delete the category
        await dispatch(deleteCategory(category_id));
        await dispatch(getAllCategories());
        await dispatch(loadUser());
    }

    return (
        <div className='w-fit min-w-[260px] border-[0.5px] rounded-lg p-3
            flex justify-between items-center gap-4 hover:shadow-lg'>
            <Folder className='text-amber-400' fontSize='large' />
            <div className='flex-grow'>
                {
                    isEditing
                        ? (
                            <div className='flex items-center'>
                                <input className='max-w-[120px] text-xl focus:outline-none' value={Category} onChange={(e) => setCategory(e.target.value)}
                                />

                                <div className='mx-2 flex gap-4'>
                                    <Done className='cursor-pointer text-black-400 hover:bg-slate-50 rounded-full' fontSize='medium' onClick={onDone} />

                                    <Clear className='cursor-pointer text-red-400 hover:bg-slate-50 rounded-full' fontSize='medium' onClick={onClear} />
                                </div>
                            </div>
                        )
                        : (
                            <>
                                <p className='text-xl font-bold' onDoubleClick={() => setIsEditing(true)}
                                >
                                    {Category}
                                </p>
                                <p className='italic text-sm text-gray-400'>Total Notes: {total_notes}</p>

                            </>
                        )
                }
            </div>
            {!isEditing && <DeleteRounded className='cursor-pointer text-red-400' fontSize='medium' onClick={onDelete} />}
        </div>
    )
}

export default Category