import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './Actions/User'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './Pages/Home'
import NotePage from './Pages/NotePage'
import Categories from './Pages/Categories'
import Login from './Pages/Login'
import Account from './Pages/Account'
import Register from './Pages/Register'

import { toast } from 'react-toastify'

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error, message } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);


  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch({ type: 'clearError' })
  //   }

  //   if (message) {
  //     toast.success(message);
  //     dispatch({ type: 'clearMessage' })
  //   }
  // }, [error])

  return (
    <Router>
      <Header />

      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/categories' element={isAuthenticated ? <Categories /> : <Login />} />
        <Route path='/note' element={isAuthenticated ? <NotePage /> : <Login />} />

        <Route path='/account' element={isAuthenticated ? <Account /> : <Login />} />
        <Route path='/login' element={isAuthenticated ? <Home /> : <Login />} />
        <Route path='/register' element={isAuthenticated ? <Home /> : <Register />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App