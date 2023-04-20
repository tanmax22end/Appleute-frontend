import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./components/Home/index"
import Signup from "./components/SignUp/index"
import Login from "./components/Login/index"
import User from "./components/User/index"
import Cart from "./components/cart/index"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<User />} />
                <Route path="/cart" element={<Cart/>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
