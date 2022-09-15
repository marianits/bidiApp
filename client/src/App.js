import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/homePage'
import Navbar from './components/navbar'
import Register from './pages/register'
import Login from './pages/login'

export default function App() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
        </Routes>
      </>
    )
  }