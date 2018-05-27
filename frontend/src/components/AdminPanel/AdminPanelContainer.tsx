import * as React from "react";
import { Brotherhood } from "../../model/Brotherhood"
import { AdminPanelComponent } from "./AdminPanelComponent"

export interface Credentials {
	username: string
	password: string
}

export interface Session {
	brotherhoods: Array<Brotherhood>
	credentials: Credentials
}

export interface Shared {
	session: Session | null
}

type State = Shared

const DEFAULT_STATE: State = {
	session: null
}

export class AdminPanelContainer extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props)

		this.state = DEFAULT_STATE

		this.handleLogIn = this.handleLogIn.bind(this)
		this.handleLogOut = this.handleLogOut.bind(this)
	}

	public render() {
		const { session } = this.state
		return <AdminPanelComponent
			session={session}
			onLogIn={this.handleLogIn}
			onLogOut={this.handleLogOut}
		/>
	}

	private handleLogIn(session: Session) {
		this.setState({ session })
	}

	private handleLogOut() {
		this.setState({ session: null })
	}
}