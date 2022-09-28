import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import { ListProfessorView } from './pages/ListProfessors';
import { RegisterProfessor } from './pages/RegisterProfesor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ListProfessorView></ListProfessorView>}/>
        <Route path='/professor' element={<RegisterProfessor></RegisterProfessor>}/>
        <Route path='/professor/:id' element={<RegisterProfessor></RegisterProfessor>}/>
      </Routes>
    </Router>
  );
}

export default App;
