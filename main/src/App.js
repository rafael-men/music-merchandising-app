import './App.css';
import { Route, Routes } from 'react-router-dom';
import Hero from './Components/Hero';
import Navbar from './Components/Navbar';
import NewDetail from './Components/NewDetail';  

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/novidade/:id" element={<NewDetail />} />  
      </Routes>
    </div>
  );
}

export default App;
