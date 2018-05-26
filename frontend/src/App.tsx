import * as React from 'react';
import './App.css';
import { Header } from "./components/Header"
import { RegisterBrotherhood } from "./components/RegisterBrotherhood"

class App extends React.Component {
    public render() {
        return (
            <div className="App">
	            <Header />
	            <RegisterBrotherhood />
            </div>
        );
    }
}

export default App;
