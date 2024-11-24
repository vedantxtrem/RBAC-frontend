import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage.jsx"
import User from "./Pages/User.jsx";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/user" element={ <User/> } />
      </Routes>
    </>
  )
}

export default App;