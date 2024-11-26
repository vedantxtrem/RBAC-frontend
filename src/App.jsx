import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage.jsx"
import User from "./Pages/User.jsx";
import Profile from "./Pages/Profile.jsx";
import NotFound from "./Pages/NotFound.jsx";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/user" element={ <User/> } />
        <Route path="/user/profile" element={ <Profile/> } />
        <Route path="*" element={ <NotFound/> } />
        
      </Routes>
    </>
  )
}

export default App;