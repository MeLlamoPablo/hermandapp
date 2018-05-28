import * as React from "react"
import { Link } from "react-router-dom"

export const HeaderComponent = () => <nav
	className="navbar"
	role="navigation"
	aria-label="main navigation">
	<div className="navbar-brand">
		<Link className="navbar-item" to="/">
			<h2 className="title is-2">Hermandapp</h2>
		</Link>
	</div>
</nav>