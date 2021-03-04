import React from 'react';
import { connect } from 'react-redux';
import Container from './Container';

import { LoginState } from '../types';
import './App.css';

export const App = () => (
  <div className="app">
    <Container />
  </div>
);
