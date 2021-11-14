import './App.css';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import StarterPage from './Pages/StarterPage';
import UserSignin from './UserPages/UserSignin';
import ForgotPassword from './UserPages/ForgotPassword';
import OwnerSignin from './OwnerPages/OwnerSignin';
import OwnerForgotpassword from './OwnerPages/OwnerForgotpassword';
import AuthProvider from './Authenticationpart/UseAuth';
import UserHomepage from './UserPages/UserHomepage';
import OwnerHome from './OwnerPages/OwnerHome';
import UserForm from './UserPages/UserForm';
import UserDetails from './UserPages/UserDetails';
import Addrestaurant from './OwnerPages/Addrestaurant';
import Addmenuitems from './OwnerPages/Addmenuitems';
import RestaurantDetails from './OwnerPages/RestaurantDetails';
import CheckOrder from './OwnerPages/CheckOrder';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<StarterPage/>} />
            <Route path="/usersignin" element={<UserSignin/>} />
            <Route path="/userforgotpassword" element={<ForgotPassword/>} />
            <Route path="/ownersignin" element={<OwnerSignin/>} />
            <Route path="/ownerforgotpassword" element={<OwnerForgotpassword/>} />
            <Route path="/userhomepage" element={<UserHomepage/>} />
            <Route path="/ownerhomepage" element={<OwnerHome/>} />
            <Route path="/userform" element={<UserForm/>}/> 
            <Route path="/mydetails" element={<UserDetails/>}/>
            <Route path="/addrestaurant" element={<Addrestaurant/>}/>
            <Route path="/addmenuitems" element={<Addmenuitems/>}/>
            <Route path="/restaurantdetails" element={<RestaurantDetails/>}/>
            <Route path="/checkorderowner" element={<CheckOrder/>}/> 
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
