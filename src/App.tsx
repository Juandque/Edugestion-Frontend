import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Sidebar from './components/Sidebar';
import AlumnosPage from './pages/AlumnoPage';
import MateriasPage from './pages/MateriaPage';
import AlumnoDetallePage from './pages/AlumnoDetallePage';
import NotasPage from './pages/NotasPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />
      <div className='flex min-h-screen bg-gray-50'>
        <Sidebar></Sidebar>
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path='/' element={<AlumnosPage/>}/>
              <Route path='/materias' element={<MateriasPage/>}/>
              <Route path="/alumno/:id" element={<AlumnoDetallePage />} />
              <Route path='/notas' element={<NotasPage/>}></Route>
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
