import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import Login from './components/Login'
import Entry from './components/Entry'
import ForgotPassword from './components/ForgotPassword'
import UpdateCredentials from './components/UpdateCredentials'
// import Sevas from './components/Sevas'
import SevaTable from './components/SevaTable'
import Checkout from './components/Checkout'
import DormBooking from './components/DormBooking'
import DormView from './components/DormView'
import DownloadRec from './components/DownloadRec'
import Mahalasa from './components/Mahalasa'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Mahalasa/>}></Route>
        <Route path='/entry' element={<Entry/>}></Route>
        <Route path='/register' element={<Signup/>}>
        </Route>
        <Route path='/login' element={<Login/>}>
        </Route>
        <Route path='/login/forgot-password' element={<ForgotPassword/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/sevas' element={<SevaTable/>}></Route>
        <Route path='/sevas/checkout' element={<Checkout/>}></Route>
        <Route path='/dorm-booking' element={<DormBooking/>}></Route> 
       <Route path='/dorm-booking/dorm-view/:dormName' element={<DormView/>}></Route>
       <Route path='/sevas/download-receipt' element={<DownloadRec/>}></Route>
      </Routes>
    </BrowserRouter>
  
  )

  
}

export default App
