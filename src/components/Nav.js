import React from 'react';

import './Nav.css';


const Nav = ({onRoomChange}) => {


    return (
        <div className="nav">
            <ul>
                <li><button onClick={() => {onRoomChange('Room 1')}}>Room 1</button></li>
                <li><button onClick={() => {onRoomChange('Room 2')}}>Room 2</button></li>
                <li><button onClick={() => {onRoomChange('Room 3')}}>Room 3</button></li>
                <li><button onClick={() => {onRoomChange('Room 4')}}>Room 4</button></li>
            </ul>
        </div>
    )

}



export default Nav;