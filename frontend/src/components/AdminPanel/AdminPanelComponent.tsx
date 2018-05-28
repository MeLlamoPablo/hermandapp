import * as React from "react"
import { Link } from "react-router-dom"
import { Brotherhood } from "../../model/Brotherhood"
import { BrotherhoodManager } from "../BrotherhoodManager/index"
import { LogInContainer } from "../LogIn"
import { Session, Shared } from "./AdminPanelContainer"

interface Props extends Shared {
	onLogIn: (session: Session) => void
	onLogOut: () => void
	onBrotherhoodsChanged: (brotherhoods: Array<Brotherhood>) => void
}

export const AdminPanelComponent = (
	{
		session,
		onLogIn,
		onLogOut,
		onBrotherhoodsChanged
	}: Props
) => <div>
	<section className="section">
		<div className="container">
			{
				session
				?
					<BrotherhoodManager
						session={session}
						onBrotherhoodsChanged={onBrotherhoodsChanged}
					/>
				:
					<LogInContainer
						onLogin={onLogIn}
					/>
			}
		</div>
	</section>
	<section className="section">
		<div className="content has-text-centered columns">
			<div className="column">
				<Link to="/" >
					¿Eres mortal? Ir al panel de registro
				</Link>
			</div>
			{
				session &&
				<div className="column">
					<a href="#" onClick={onLogOut} >
						Cerrar sesión
					</a>
				</div>
			}
		</div>
	</section>
</div>
