import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { styled, ThemeProvider } from '@mui/material/styles';
import defaultTheme from './Styles/Theme/defaultTheme';





const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%'  
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>  
);


const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

const Login = Loadable(React.lazy(() => import("./Pages/Auth/Login")));
const ForgotPassword = Loadable(React.lazy(() => import("./Pages/Auth/ForgotPassword")));
const Register = Loadable(React.lazy(() => import("./Pages/Auth/Register")));
const PageNotFound = Loadable(React.lazy(() => import('./Pages/Common/PageNotFound')));
const InventoryDashboard = Loadable(React.lazy(() => import('./Pages/InventoryDashboard')));
const AddItem = Loadable(React.lazy(() => import('./Pages/AddItem')));
const LogConsumption = Loadable(React.lazy(() => import('./Pages/LogConsumption')));
const RestockAlerts = Loadable(React.lazy(() => import('./Pages/RestockAlerts')));



 



function App() {
  return (  
    <>
       <ThemeProvider theme={defaultTheme}>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />
      <Route path='/master/register/user' element={<Register />} />
      <Route path='*' element={<PageNotFound />} /> 
      
    
      <Route path="/dashboard/inventory" element={<InventoryDashboard />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/log-consumption" element={<LogConsumption />} />
      <Route path="/restock-alerts" element={<RestockAlerts />} />


      </Routes>
      </ThemeProvider>
      </>
  );
}

export default App;
