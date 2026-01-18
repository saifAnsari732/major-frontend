import Navbar from './Componants/Navbar'
import Hero from './Componants/Hero'
import './styles/global.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './Componants/Auth/Signup';
import SignIn from './Componants/Auth/SignIn';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
