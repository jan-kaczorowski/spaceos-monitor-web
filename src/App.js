import React, { Component } from 'react';
import StatusChecker from './components/StatusChecker'
//import { Table } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <StatusChecker></StatusChecker>
        </header>
        
      </div>
    );
  }
}

export default App;
