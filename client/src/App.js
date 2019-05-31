import React from 'react';
import './App.css';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./actions/authActions";
import jwt_decode from "jwt-decode";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileAction";
import PrivateRoute from "./components/common/PrivateRoute";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddEducation from "./components/add-credentials/AddEducation";
import AddExperience from "./components/add-credentials/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime){
        store.dispatch(clearCurrentProfile());
        store.dispatch(logoutUser());
        window.location.href = '/login';
    }
}

function App() {
  return (
      <Provider store={store}>
          <Router>
              <div className="App">
                  <Navbar/>
                  <Route exact path="/" component={Landing}/>
                  <div className="container">
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/register" component={Register}/>
                      <Switch>
                          <PrivateRoute exact path="/profiles" component={Profiles}/>
                          <PrivateRoute exact path="/profile/:handle" component={Profile}/>
                          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                          <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                          <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
                          <PrivateRoute exact path="/add-education" component={AddEducation}/>
                          <PrivateRoute exact path="/add-experience" component={AddExperience}/>
                          <PrivateRoute exact path="/feed" component={Posts}/>
                          <PrivateRoute exact path="/post/:id" component={Post}/>
                      </Switch>
                  </div>
                  <Footer/>
              </div>
          </Router>
      </Provider>
  );
}

export default App;
