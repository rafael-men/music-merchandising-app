import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import NewDetail from './Components/NewDetail';
import MainPage from './Components/MainPage';
import MainProductDetails from './Components/MainProductDetails';
import Categories from './Components/Categories';
import Footer from './Components/Footer';



function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="bg-black text-white py-4 shadow-md">
          <div className="container mx-auto px-4">
            <Categories />
          </div>
        </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/novidade/:id" element={<NewDetail/>} /> 
        <Route path="/produto/:id" element={<MainProductDetails/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
