import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminDashboard from './pages/admin/adminDashboard'


function App() {
  return (
  
  <BrowserRouter>
     <Routes path="/*">
        <Route path='/admin/*' element={<AdminDashboard/>}/>
        <Route path='/' element={<h1>Home</h1>}/>
        <Route path='/*' element={<h1>404 NOT Found</h1>}/>

     </Routes>
  </BrowserRouter>
  )
}

export default App
