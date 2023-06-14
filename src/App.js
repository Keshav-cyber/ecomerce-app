
import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './components/Home'
import Header from './components/Header';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Orders from './components/Orders';
import Admin from './components/Admin';
import CheckUser from './components/CheckUser';
import CheckAdmin from './components/CheckAdmin';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import ClassComponent from './components/ClassComponent';
import NewAdmin from './components/NewAdmin';

function App() {
  return (
     <Router>
      <Header />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<SignUp />} />
         <Route path='/newadmin' element={<NewAdmin/>}/>
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
