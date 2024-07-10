import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import {store} from './store/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Container } from './Components/indexComponent.js'
import { Welcome,LoginScreen,SignUp, PostForm,PostScreen,EdtingFormScreen,HomeScreen } from './Screens/Screen.js'
import AuthenticationLayout from './Components/AuthenticationLayout.jsx'


const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Container />} >
      <Route path="" element={
        <AuthenticationLayout authentication={false}
        >
          {' '}
          <Welcome/>
        </AuthenticationLayout>
      }/>
      <Route path='/loginUser' element = {
        <AuthenticationLayout authentication={false}
        >
          {' '}
          <LoginScreen/>
        </AuthenticationLayout>
      }/>
      <Route path='/sign-up' element = {
        <AuthenticationLayout authentication={false}
        >
          {' '}
          <SignUp/>
        </AuthenticationLayout>
      }/>
      <Route path='/create-post' element = {
        <AuthenticationLayout authentication={true}
        >
          {' '}
          <PostForm/>
        </AuthenticationLayout>
      }/>
      <Route path='/post/:postId' element ={
        <AuthenticationLayout authentication={true}
        >
          {' '}
          <PostScreen/>
        </AuthenticationLayout>
      }/>
      <Route path='/edit-post/:postId' element ={
        <AuthenticationLayout authentication={true}
        >
          {' '}
          <EdtingFormScreen/>
        </AuthenticationLayout>
      }/>
      <Route path='/home' element ={
        <AuthenticationLayout authentication={true}>
          {' '}
          <HomeScreen/>
        </AuthenticationLayout>
      }/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={route} />
        
    </Provider>
  </React.StrictMode>,
)
