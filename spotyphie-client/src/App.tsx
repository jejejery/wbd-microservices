import React, {useEffect} from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


class App extends React.Component<{}, {toAnotherPage : boolean}>{

  constructor(props : any) {
    super(props);

    this.state = {
      toAnotherPage: false,
    };
  }

  componentDidMount() {
    // Set a timeout to update the state after 5 seconds
    setTimeout(() => {
      this.setState({
        toAnotherPage: true,
      });
    }, 2000);
  }

  switchPage = () => {
    if(this.state.toAnotherPage){
      if(localStorage.getItem('username')===null){
        return <Navigate to="/login" />;
      }
      return <Navigate to="/Main" />;
    }
  }
  
    render() {
      
      return (
        <div className="App">
          <header className="App-header">
            <img src="./logo_spotyphie.png" className="App-logo" alt="logo" />
            <h2>
              Spotyphie Premium Service
            </h2>
            {
              this.switchPage()
            }
          </header>
        </div>
      );
    }
}

export default App;
