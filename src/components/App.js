import React  from 'react';
import { connect } from 'react-redux';
import Container from './Container';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <span>app</span>
            <Container />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(App);
