import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage'
import Navbar from './components/navbar'
import Register from './pages/register'
import Login from './pages/login'
import Autores from './pages/Autores'
import Categorias from './pages/Categorias'

export default function App() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/autores" element={<Autores />} />
        </Routes>
      </>
    )
  }