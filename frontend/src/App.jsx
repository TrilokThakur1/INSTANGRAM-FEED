import React,{useEffect,useState} from 'react'

import NavBar from './components/NavBar.jsx'
import Auth from './components/Auth.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'

import Feed from './pages/Feed.jsx'
import Profile from './pages/Profile.jsx'

import { BrowserRouter ,Routes, Route } from 'react-router-dom'

export default function App() {
    let [user,setUser]=useState({});

    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
    },[])
      
  return (
    <div>
        <BrowserRouter>
            <NavBar user={user} />  
            <Routes>
                <Route path='/' element={
                <PrivateRoute user={user} setUser={setUser}>
                    <Feed />
                </PrivateRoute>} 
                />
                <Route path='/Profile' element={
                    <PrivateRoute user={user} setUser={setUser}>
                        <Profile user={user} setUser={setUser}/>
                    </PrivateRoute>} />
                <Route path='/auth' element={<Auth user={user} setUser={setUser} />} />
                
                <Route path='/*' element={<center><h2>Page Not Found</h2></center>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
