import logo from './logo.svg';
import './App.css';


var io = require('socket.io-client');
const socket = io("http://localhost:3001");

function App() {

  console.log("boo");
 
  socket.on('connect', function () {
    console.log('FINALLY')
      socket.emit('joinRoom', {
          username: 'Bob',
          room: 'react-coding'
      }, function (data) {
          socket.emit('message',
              {
                  username: 'Bob',
                  text: 'Your message goes here'
              });
      });
  });

  socket.on('message', function (message) {
    console.log('BOB received a message', message);
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
