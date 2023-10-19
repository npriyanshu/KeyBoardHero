import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import StateProvider from './Contexts/StateContextProvider'
import { lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
// Define lazy-loaded components
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const Setting = lazy(() => import('./pages/Setting'));
const Profile = lazy(() => import('./pages/ProfilePage'));
const Signup = lazy(() => import('./components/Signup'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

function App() {
  return (
        <StateProvider>

    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <HomePage />
            </Suspense>
          }
          />
        <Route
          path="/setting"
          element={
            <Suspense fallback={<Loader />}>
              <Setting />
            </Suspense>
          }
          />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          }
          />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<Loader />}>
              <Signup />
            </Suspense>
          }
          />
        <Route
          path="/login"
          element={
            <Suspense fallback={<Loader />}>
              <LoginPage />
            </Suspense>
          }
          />
      </Routes>
      <Footer />
    </Router>
    <Toaster />
  </StateProvider>
  );
}

export default App;




// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
// import Setting from "./pages/Setting";
// import Profile from "./pages/ProfilePage";
// import Signup from "./components/Signup";
// import LoginPage from "./pages/LoginPage";
// import HomePage from "./pages/HomePage";
// import StateProvider from "./Contexts/StateContextProvider";



// const App = () => {
//   return (

//    <StateProvider>
//      <Router>
//       <Header/>
//   <Routes>
//     <Route path={"/"} element= { <HomePage/> }/>
//     <Route path={"/setting"} element= { <Setting/> }/>
//     <Route path={"/profile"} element= { <Profile/> }/>
//     <Route path={"/signup"} element= { <Signup/> }/>
//     <Route path={"/login"} element= { <LoginPage/> }/>
//   </Routes>
//   <Footer/>
// </Router>
//    </StateProvider>
//   )
// }
// export default App