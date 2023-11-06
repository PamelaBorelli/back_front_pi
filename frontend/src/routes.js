import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';



function RoutesApp() {
    
    return (
    <BrowserRouter>
        <Header/>
        <Routes>

            <Route path="/" element = { <Home/> } />
            <Route path="/login" element = { <Login/> } />
            <Route path="/*" element = { <Error/> } />
            <Route path="/dashboard" element = { <Dashboard/> } />

        </Routes>
     
    </BrowserRouter>
    );
  }
  
  export default RoutesApp;
  