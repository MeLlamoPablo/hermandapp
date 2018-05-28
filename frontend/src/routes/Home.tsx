import * as React from "react"
import { Link } from "react-router-dom"
import { RegisterBrotherhood } from "../components/RegisterBrotherhood"
import { Welcome } from "../components/Welcome"

export const Home = () => <div>
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
	<section className="section">
		<div className="content has-text-centered">
			<Link to="/admin" >
				¿Eres Dios? Ir al panel de administración
			</Link>
		</div>
	</section>
</div>
