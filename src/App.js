<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { css } from '@emotion/css';
import { Auth } from 'aws-amplify';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listNotes } from './graphql/queries';
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';
import MyAlbum from './pages/MyAlbum/MyAlbum';
import UploadTemp from './pages/UploadTemp/UploadTemp';
import SocialGallery from './pages/SocialGallery/SocialGallery';
import Setting from './pages/Setting/Setting';
import Landing from './pages/LandingPage/LandingPage';
import Upload from './pages/Upload/Upload';
=======
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Auth, Hub } from "aws-amplify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "routes";
import { loginUser } from "components/auth/slice";
import FallbackSpinner from "components/fallbackSpinner";
>>>>>>> 2460fdc623b6ca1e3e55f32f517a8f5b6229c47f

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // check for auth status
  const checkAuthStatus = useCallback(async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      if (cognitoUser) {
        const loggedinUser = {
          id: cognitoUser.attributes.sub,
          name: cognitoUser.attributes.name,
          email: cognitoUser.attributes.email,
        };

        dispatch(loginUser(loggedinUser));
      }
    } catch (err) {
      console.log("error: ", err);
    }
  }, [dispatch]);

  // check auth status when the app loads
  useEffect(() => {
    const checkStatus = async () => {
      setLoading(true);
      await checkAuthStatus();
      setLoading(false);
    };

    checkStatus();
  }, [checkAuthStatus]);

<<<<<<< HEAD
  return (
    <div className='App'>
      <Router>
        <div>
          <>
            <Navbar className='nav-bar' variant='dark'>
              <Navbar.Brand href='/'>NeuraInk</Navbar.Brand>
              <Nav className='mr-auto'>
                <Nav.Link href='upload'>Upload</Nav.Link>
                <Nav.Link href='myalbum'>Album</Nav.Link>
                <Nav.Link href='social-gallery'>Gallery</Nav.Link>
                <Nav.Link href='setting'>Setting</Nav.Link>
                {user ? (
                  <Nav.Link
                    onClick={() => {
                      signout();
                    }}
                  >
                    Sign Out
                  </Nav.Link>
                ) : (
                  <Nav.Link href='upload'>Log In</Nav.Link>
                )}
              </Nav>
            </Navbar>
          </>

          <Switch>
            {/* <Route exact path='/'>
              <Redirect to='/upload' />
            </Route> */}
            <Route path='/upload'>
              <Upload />
            </Route>
            <Route path='/myalbum'>
              <MyAlbum />
            </Route>
            <Route path='/social-gallery'>
              <SocialGallery />
            </Route>
            <Route path='/setting'>
              <Setting />
            </Route>
            <Route path='/aboutus'>
              <Profile />
            </Route>
            <Route path='/users'>{/* <Users /> */}</Route>
            <Route path='/'>
              <Landing />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
=======
  // listen for auth change events
  Hub.listen("auth", async (data) => {
    if (data && data.payload && data.payload.event === "signIn") {
      checkAuthStatus();
    }
  });

  if (loading) return <FallbackSpinner />;

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
>>>>>>> 2460fdc623b6ca1e3e55f32f517a8f5b6229c47f
  );
};

export default App;
