import * as React from "react"
import {
	BrowserRouter as Router
} from "react-router-dom"
import "./App.css"
import { Header } from "./components/Header"
import { Routes } from "./routes"

export class App extends React.Component {
    public render() {
        return (
            <div className="App">
	            <Router>
		            <div>
			            <Header />
			            <Routes />
		            </div>
	            </Router>
            </div>
        )
    }
}
