import Navbar from './Componants/Navbar'
import Hero from './Componants/Hero'
import './styles/global.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Componants/Auth/Signup';
import SignIn from './Componants/Auth/SignIn';
import Profile from './Componants/ButtomNavbar/Profile';
import CodeCompiler from './Componants/CodeCompiler ';
import Compiler from './CodeEditor/Compiler';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/codecompiler" element={<CodeCompiler />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
