import * as React from "react";
import { Link } from "react-router-dom"
import { BrotherhoodManager } from "../BrotherhoodManager/index"
import { LogInContainer } from "../LogIn"
import { Session, Shared } from "./AdminPanelContainer"

interface Props extends Shared {
	onLogIn: (session: Session) => void
	onLogOut: () => void
}

export const AdminPanelComponent = (
	{
		session,
		onLogIn,
		onLogOut
	}: Props
) => <div>
	<section className="section">
		<div className="container">
			{
				session
				?
					<BrotherhoodManager />
				:
					<LogInContainer
						onLogin={onLogIn}
					/>
			}
		</div>
	</section>
	<section className="section">
		<div className="content has-text-centered">
			{
				session
				?
					<a href="#" onClick={onLogOut} >
						Cerrar sesión
					</a>
				:
					<Link to="/" >
						¿Eres mortal? Ir al panel de registro
					</Link>
			}
		</div>
	</section>
</div>
