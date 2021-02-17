import React from 'react';
import { connect } from 'react-redux';
import Container from './Container';
import './App.css';

const App = () => (
  <div className="app">
    <Container />
  </div>
);

const mapStateToProps = (state:any) => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
