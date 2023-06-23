
import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Orders from './components/Orders';
import CheckUser from './components/CheckUser';
import CheckAdmin from './components/CheckAdmin';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import ClassComponent from './components/ClassComponent';
import NewAdmin from './components/NewAdmin';
import Cart from './components/Cart';
import Profile from './components/Profile';
import SearchProducts from './components/SearchProducts';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
     <Router>
      <Header />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path='/cart' element={<Cart />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<SignUp />} />
         <Route path='/profile' element={<Profile/>}></Route>
         <Route path='/newadmin' element={<NewAdmin/>}/>
         <Route path='/search' element={<SearchProducts/>}></Route>
         <Route path='/product/:pid' element={<ProductDetails/>}></Route>
         <Route element={<CheckUser />}>
           <Route path='/orders' element={<Orders />} />
         </Route>
         <Route path ='/admin' element={<CheckAdmin/>}>
           <Route path='' element={<NewAdmin />}/>
           <Route path='addProduct' element={<AddProduct />}></Route>
           <Route path='updateProduct' element={<UpdateProduct/>} ></Route>
         </Route>
         <Route path='/classcomp' element={<ClassComponent/>}></Route>
      </Routes>
     </Router>
  );
}

export default App;
