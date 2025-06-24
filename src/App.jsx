import React from 'react'
import './index.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Body from './components/body'
import Login from './components/login'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Connection from './components/Connection'
import Request from './components/Request'

function App() {

  return (
    <>  
  <Provider store={appStore}>
   <BrowserRouter basename="/">
    <Routes>
     <Route path="/" element={<Body />}>
     <Route path="/" element={<Feed/>} />
     <Route path="/login" element={<Login />} />
     <Route path="/Profile" element={<Profile/>}/>
     <Route path="/connections" element={<Connection/>}/>
     <Route path="/requests" element={<Request/>}/>
    </Route>
   </Routes>
 </BrowserRouter>
</Provider>
    </>
  )
}

export default App
