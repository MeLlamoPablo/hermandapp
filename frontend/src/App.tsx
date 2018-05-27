import * as React from 'react';
import './App.css';
import { Header } from "./components/Header"
import { RegisterBrotherhood } from "./components/RegisterBrotherhood"
import { Welcome } from "./components/Welcome"

class App extends React.Component {
    public render() {
        return (
            <div className="App">
	            <Header />
	            <section className="section">
		            <div className="container">
			            <div className="columns">
				            <div className="column">
								<Welcome />
				            </div>
				            <div className="column">
					            <RegisterBrotherhood />
				            </div>
			            </div>
		            </div>
	            </section>
            </div>
        );
    }
}

export default App;
