import React from 'react';
import {Login} from './components/Login'
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Register } from './components/Register';
import { CreateReciep } from './components/createReciep';
import { AllRecieps } from './components/AllRecieps'
import { EditReciep } from './components/EditReciep';
import { UserList } from './components/UserList';
import { EditUser } from './components/EditUser';

function App() {
  return (
    <Router>
      <Route path="/register" exact component={Register} />
      <Route path="/reciep/new" exact component={CreateReciep} />
      <Route path="/reciep" exact component={AllRecieps} />
      <Route path="/reciep/edit/:id" exact component={EditReciep} />
      <Route path="/user/edit/:id" exact component={EditUser} />
      <Route path="/admin/register" exact component={Register} />
      <Route path="/users" exact component={UserList} />
      <Route path="/" exact component={Login} />
    </Router>
  );
}

export default App;
