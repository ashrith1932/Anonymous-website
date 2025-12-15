import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Route, Routes, Link} from "react-router-dom";
import Guest from "./guest.jsx";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Guest/>}/>
        {/* <Route path="/home" element={<Home/>}/> */}
      </Routes>
    </>
  )
}

export default App
