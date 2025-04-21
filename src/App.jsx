import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './pages/admin/adminDashboard'
import HomePage from './pages/home/homePage'


function App() {
  return (
  
  <BrowserRouter>
     <Routes path="/*">
     
        <Route path='/admin/*' element={<AdminDashboard/>}/>
        <Route path='/*' element={<HomePage/>}/>
    
     </Routes>
  </BrowserRouter>
  )
}

export default App
