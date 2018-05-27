import * as React from 'react'

export class HeaderComponent extends React.Component {
	public render() {
		return <nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="#">
					<img src="https://bulma.io/images/bulma-logo.png"
					     alt="Bulma: a modern CSS framework based on Flexbox" width="112"
					     height="28"/>
				</a>
			</div>
		</nav>
	}
}
