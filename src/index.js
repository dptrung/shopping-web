import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Blog from './component/Blog/Index'
import Home from './component/Home'
import Detail from './component/Blog/Detail';
import Login from './component/Member/Login';
import Register from './component/Member/Register';
import Account from './component/Member/Account';
import MyProduct from './component/My-Product/MyProduct';
import AddProduct from './component/My-Product/AddProduct';
import EditProduct from './component/My-Product/EditProduct';
import ProductDetail from './component/My-Product/ProductDetail';
import CartProduct from './component/My-Product/CartProduct';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home/>}/>  
          <Route path='/blog/list' element={<Blog/>}/>  
          <Route path='/blog/detail/:id' element={<Detail/>}/>  
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/myproduct' element={<MyProduct/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/editproduct' element={<EditProduct/>}/>
          <Route path='/productDetail' element={<ProductDetail/>}/>
          <Route path='/cartProduct' element={<CartProduct/>}/>
        </Routes>
      </App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
