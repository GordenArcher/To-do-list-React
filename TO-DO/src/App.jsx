import './App.css'
import { Routes, Route} from 'react-router-dom'
import { Home } from './pages/home'
import { Register } from './pages/register'
import { Login } from './pages/login'
import { useContext } from 'react'
import { AuthContext } from './utils/context/AuthContext'

const App = () => {
  const { token } = useContext(AuthContext)

  return (
    <div>
        <Routes>
          <Route path='/' element={ token ? <Home /> : <Register /> }/>
          <Route path='/auth/login' element={<Login />} />
        </Routes>
    </div>
  )
}

export default App