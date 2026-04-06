import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import Navbar from './Components/Navbar';
import NewDetail from './pages/NewDetail';
import MainPage from './pages/MainPage';
import MainProductDetails from './pages/MainProductDetails';
import CategoryPage from './pages/CategoryPage';
import RecentlyViewed from './pages/RecentlyViewed';
import Categories from './Components/Categories';
import Footer from './Components/Footer';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';




function App() {
  return (
    <ThemeProvider>
      <div className="bg-gray-950 min-h-screen">
        <Navbar />
        <Categories />
        <Routes>
          <Route path="/carrinho" element={<Cart/>} />
          <Route path="/" element={<MainPage />} />
          <Route path="/novidade/:id" element={<NewDetail/>} />
          <Route path="/produto/:id" element={<MainProductDetails/>}/>
          <Route path="/perfil" element={<Profile/>}/>
          <Route path="/categoria/:slug" element={<CategoryPage/>}/>
          <Route path="/vistos-recentemente" element={<RecentlyViewed/>}/>
          <Route path="/favoritos" element={<Favorites/>}/>
        </Routes>
        <Footer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
