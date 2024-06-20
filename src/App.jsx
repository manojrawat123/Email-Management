import { useState } from 'react'
import RateManagmentForm from './pages/ratemanagement/RateManagmentForm'
import { Route, Routes, useLocation } from 'react-router-dom'
import EmailSender from './pages/RouteEmail/EmailSender'
import Navbar from './component/Navbar/Navbar'
import AddCustomer from './pages/Customer/AddCustomer/AddCustomer'
import UpdateRate from './pages/ratemanagement/UpdateRate/UpdateRate'
import SearchRoutePage from './pages/TopRoute/SearchRoutePage/SearchRoutePage'
import AddTopRoute from './pages/TopRoute/AddTopRoute/AddTopRoute'
import SearchRatePage from './pages/ratemanagement/SearchRatePage/SearchRatePage'
import DisplayRate from './pages/ratemanagement/DisplayRate/DisplayRate'
import DisplayCustomer from './pages/Customer/ShowCustomer/DisplayCustomer'
import DisplayTopRoutes from './pages/TopRoute/DisplayTopRoute/TopRouteDisplay'
import ProtectedRoutes from './component/ProtectedRoutes/ProtectedRoutes'
import LoginPage from './component/LoginComponent/Login/LoginPage'
import Register from './component/registerComp/Register'
import DisplayUser from './pages/display_user/DisplayUser'
import ResetPassword from './component/LoginComponent/ResetPassword/ResetPassword'
import RouteDeleteUpdate from './pages/TopRoute/RouteDeleteUpdate/RouteDeleteUpdate'
import RateEmail from './pages/RateEmail/RateEmail'
import EmailRouteSchedule from './pages/EmailRouteSchedule/EmailRouteSchedule'
import AddInvoice from './pages/InvoiceManagement/AddInvoice/AddInvoice'
import InvoiceDisplay from './pages/InvoiceManagement/ShowInvoice/InvoiceDisplay'
import AddDispute from './pages/DisputeManagement/AddDispute/AddDispute'
import SearchInvoice from './pages/InvoiceManagement/SearchInvoice/SearchInvoice'
import SearchDispute from './pages/DisputeManagement/SearchDispute/SearchDispute'
import DisputeDisplay from './pages/DisputeManagement/DisplayDispute/DisplayDispute'

function App() {

  const location = useLocation();

  console.log()

  return (
    <>
     {["/login", "/add"].includes(location.pathname) ? null :  <Navbar />}
      <Routes>

      {/* Un Protected Routes */}
      <Route path='/login' Component={LoginPage} />
      <Route path="/reset-password/:userid_encode/:verify_token/" Component={ResetPassword} />
      {/* <Route path='' Component={ProtectedRoutes}> */}
          <Route path='' Component={AddCustomer} />
        {/* </Route> */}

      <Route path='' Component={ProtectedRoutes}>
        <Route path='/register' Component={Register}/>
      </ Route >

      <Route path='' Component={ProtectedRoutes}>
        <Route path='/manage-user' Component={DisplayUser}/>
      </Route >
      
      <Route path='' Component={ProtectedRoutes}>
        <Route path='/search-invoice' Component={SearchInvoice}/>
      </Route >
      <Route path='' Component={ProtectedRoutes}>
        <Route path='/search-dispute' Component={SearchDispute}/>
      </Route >

        {/* Protected Routes  */}
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/addrate' Component={RateManagmentForm} />
        </Route>
      
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/add-invoice' Component={AddInvoice} />
        </Route>
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/add-dispute' Component={AddDispute} />
        </Route>
      
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/display-invoice' Component={InvoiceDisplay} />
        </Route>
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/display-dispute' Component={DisputeDisplay} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/emailsender' Component={EmailSender} />
        </Route>
        
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/send-rate-email' Component={RateEmail} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/addcustomer' Component={AddCustomer} />
        </Route>
       
        
       
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/showcustomer' Component={DisplayCustomer} />
        </Route>

        {/* Route Management */}
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/addtoproute' Component={AddTopRoute} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/search-route' Component={SearchRoutePage} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/route' Component={DisplayTopRoutes} />
        </Route>
      
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/route-update-delete' Component={RouteDeleteUpdate} />
        </Route>
      
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/email-schedule' Component={EmailRouteSchedule} />
        </Route>

        {/* Rate Management */}
        <Route path='' Component={ProtectedRoutes}>
          <Route path='/search-rate' Component={SearchRatePage} />

        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/updaterate' Component={UpdateRate} />
        </Route>

        <Route path='' Component={ProtectedRoutes}>
          <Route path='/rate' Component={DisplayRate} />
        </Route>

      </Routes>
    </>
  )
}

export default App
