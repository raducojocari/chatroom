import React from 'react';

import './Nav.css';


const Nav = ({onRoomChange}) => {
    return (
        <div className="nav">
            <button id="nav_button" className="nav_button" onClick={() => {onRoomChange('Room 1')}}>Room 1</button>
            <button className="nav_button" onClick={() => {onRoomChange('Room 2')}}>Room 2</button>
            <button className="nav_button" onClick={() => {onRoomChange('Room 3')}}>Room 3</button>
            <button className="nav_button" onClick={() => {onRoomChange('Room 4')}}>Room 4</button>
        </div>
    )
}



export default Nav;