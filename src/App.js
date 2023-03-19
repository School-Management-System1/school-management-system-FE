import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Signin from './components/Signin'
import UserPage from './components/UserPage'
import Admin from './components/Admin'
import Main from './components/Main'
// import ChatMessages from './components/ChatMessages';

const App = () => {
  const [allMessages, setAllMessages] = useState([])
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/users' element={<UserPage allMessages={allMessages} setAllMessages={setAllMessages}/>} />
          <Route path='/admin' element={<Admin allMessages={allMessages} setAllMessages={setAllMessages}/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
