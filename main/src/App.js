import { Route, Routes, Outlet } from 'react-router-dom';
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
import SearchResults from './pages/SearchResults';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import EditProfile from './pages/auth/EditProfile';
import MyOrders from './pages/MyOrders';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/components/AdminLayout';
import AdminHome from './admin/pages/AdminHome';
import AdminOrders from './admin/pages/AdminOrders';
import AdminProducts from './admin/pages/AdminProducts';
import AdminUsers from './admin/pages/AdminUsers';

const PublicLayout = () => (
  <>
    <Navbar />
    <Categories />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <ThemeProvider>
      <div className="bg-gray-950 min-h-screen">
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/carrinho" element={<Cart/>} />
            <Route path="/novidade/:id" element={<NewDetail/>} />
            <Route path="/produto/:id" element={<MainProductDetails/>}/>
            <Route path="/perfil" element={<Profile/>}/>
            <Route path="/categoria/:slug" element={<CategoryPage/>}/>
            <Route path="/vistos-recentemente" element={<RecentlyViewed/>}/>
            <Route path="/favoritos" element={<Favorites/>}/>
            <Route path="/busca" element={<SearchResults/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/perfil/editar" element={<EditProfile/>}/>
            <Route path="/perfil/pedidos" element={<MyOrders/>}/>
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path="pedidos" element={<AdminOrders />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="usuarios" element={<AdminUsers />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
