import './App.css';
import About from './components/About';
import Home from './components/Home';
import NavBar from './components/NavBar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

export default function App() {
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} /> 
            <Route exact path="/inotebook" element={<Navigate to="/" replace />} />           
            <Route exact path="/about" element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}