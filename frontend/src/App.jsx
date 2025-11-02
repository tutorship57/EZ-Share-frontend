import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import "./App.css";
import Login from './page/Login'
import DashBoard from "./page/DashBoard";
import TripDetail from "./page/TripDetail";
import CreateTripModal from "./components/CreateTripModal";
import AssignModal from "./components/AssignModal";
import { AuthProvider } from "./contextProvider/AuthProvider";
import UserRoute from "./routes/UserRoute";
import CreateTrip from "./page/CreateTrip";
import MealDetail from "./page/MealDetail";
import CreateGuest from "./page/CreateGuest";
import CreateMeal from "./page/CreateMeal";
import SelectTripGuest from "./page/SelectTripGuest";
import CreateMenu from "./page/CreateMenu";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/SignIn" />} />
        <Route path="/SignIn" element={<Login/>} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="/User" element={<UserRoute />} >
          <Route path="DashBoard" element={<DashBoard/>}/>
          <Route path="DashBoard/NewTrip" element={<CreateTrip/>} />
          <Route path="DashBoard/AssignUser" element={<AssignModal/>}/>

          <Route path="DashBoard/TripDetail/:tripId" element={<TripDetail/>}/>
          <Route path="DashBoard/TripDetail/:id/AddGuest" element={<CreateGuest/>}/>
          <Route path="DashBoard/TripDetail/:id/SelectTripGuest" element={<SelectTripGuest/>}/>
          <Route path="DashBoard/TripDetail/:id/AddMeal" element={<CreateMeal/>}/>
          <Route path="DashBoard/TripDetail/:tripId/MealDetail/:mealId" element={<MealDetail/>}/>
          <Route path="DashBoard/TripDetail/:tripId/MealDetail/:mealId/addMenu" element={<CreateMenu/>} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

