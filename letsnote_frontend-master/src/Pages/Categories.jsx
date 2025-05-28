import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../Actions/Category';

import { Typography } from '@mui/material';
import Category from '../components/Category';

import { toast } from 'react-toastify';

const Categories = () => {
  const { categories, loading: categoryLoading, message: categoryMessage, error: categoryError } = useSelector(state => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch])

  useEffect(() => {
    if (categoryError) {
      toast.error(categoryError);
      dispatch({ type: 'clearError' })
    }

    if (categoryMessage) {
      toast.success(categoryMessage);
      dispatch({ type: 'clearMessage' })
    }

  }, [categoryError, categoryMessage])

  return (
    <>
      {
        categoryLoading
          ?
          <div className='w-full h-[80vh] flex justify-center items-center'>
            <Typography variant='h6'>Loading Categories...</Typography>
          </div>
          :
          (
            categories && categories.length > 0 ? (
              <div className='mt-6 flex flex-wrap justify-center gap-4'>
                {
                  categories.map((category) => (
                    <Category key={category._id} category_id={category._id} title={category.name} total_notes={category.notes.length} />
                  ))
                }
              </div>
            ) : (
              <div className='w-full h-[80vh] flex justify-center items-center'>
                <Typography variant='h6'>No Categories Found</Typography>
              </div>
            )
          )
      }
    </>
  )
}

export default Categories