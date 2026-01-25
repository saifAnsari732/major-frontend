import Navbar from './Componants/Navbar'
import Hero from './Componants/Hero'
import './styles/global.css'
import './styles/Navbar.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Componants/Auth/Signup';
import SignIn from './Componants/Auth/SignIn';
import Profile from './Componants/ButtomNavbar/Profile';
import CodeCompiler from './Componants/CodeCompiler ';
import Footer from './Componants/Footer';
import BranchListing from './Componants/All-course/BranchListing.jsxBranchListing';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>

          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/codecompiler" element={<CodeCompiler />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/branch" element={<BranchListing />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
