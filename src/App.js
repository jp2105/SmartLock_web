import React from 'react';
import {Provider} from 'react-redux'
import './App.css';
import store from  '../src/APP/Store/ConfigStore';
import firebase from 'firebase'
import { Navigation } from './APP/Navigation'

const firebaseConfig = {
  apiKey: "AIzaSyD_u2Z_nvPQQIVYhKrBpfIZDyyassop_l4",
  authDomain: "smart-lock-4e641.firebaseapp.com",
  databaseURL: "https://smart-lock-4e641.firebaseio.com",
  projectId: "smart-lock-4e641",
  storageBucket: "smart-lock-4e641.appspot.com",
  messagingSenderId: "898144052520",
  appId: "1:898144052520:web:c7017793306739924bdc1d",
  measurementId: "G-P42EPR8Y9X"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default class App extends React.Component {
  render(){
  return (
    <Provider store={store}>
   <Navigation/>
    </Provider>
  );
}
}

