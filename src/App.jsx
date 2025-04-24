import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './pages/admin/adminDashboard'
import HomePage from './pages/home/homePage'
import Testing from './components/testing'
import LoginPage from './pages/login/loginPage'
import { Toaster } from 'react-hot-toast'
import Register from './pages/register/rejister'


function App() {
  return (
  
  <BrowserRouter>
     <Toaster/>
     <Routes path="/*">
        <Route path='/testing' element={<Testing/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin/*' element={<AdminDashboard/>}/>
        <Route path='/*' element={<HomePage/>}/>
    
     </Routes>
  </BrowserRouter>
  )
}

export default App
