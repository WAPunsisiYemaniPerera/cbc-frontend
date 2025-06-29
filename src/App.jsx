import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/header'
import ProductCard from './components/product-card'
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import Testing from './pages/testing';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResponsiveTesting from './pages/testing2';

function App() {
  return (
    <GoogleOAuthProvider clientId="753235929328-pgnv7nrl5ef6vtrd88nluso58s9isdnq.apps.googleusercontent.com">
      <BrowserRouter>
      <Toaster position='top-right'/>

          <Routes>

            <Route path="/admin/*" element={<AdminPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/testing" element={<Testing/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/r" element={<ResponsiveTesting/>}/>
            <Route path="/*" element={<HomePage/>}/>
            

          </Routes>

      </BrowserRouter>
    </GoogleOAuthProvider>

  );
}

export default App
