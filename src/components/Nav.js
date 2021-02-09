import React from 'react';

import './Nav.css';


const Nav = ({onRoomChange, activeRoom}) => {
    return (
        <div className="nav">
            <button id="nav_button" className={`nav_button ${activeRoom === 'Room 1' ? ' activeClass' : ''}`} onClick={() => {onRoomChange('Room 1')}}>Room 1</button>
            <button className={`nav_button ${activeRoom === 'Room 2' ? ' activeClass' : ''}`} onClick={() => {onRoomChange('Room 2')}}>Room 2</button>
            <button className={`nav_button ${activeRoom === 'Room 3' ? ' activeClass' : ''}`} onClick={() => {onRoomChange('Room 3')}}>Room 3</button>
            <button className={`nav_button ${activeRoom === 'Room 4' ? ' activeClass' : ''}`} onClick={() => {onRoomChange('Room 4')}}>Room 4</button>
        </div>
    )
}



export default Nav;