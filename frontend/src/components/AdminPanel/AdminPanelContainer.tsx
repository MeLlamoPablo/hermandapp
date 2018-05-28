import * as NProgress from "nprogress"
import * as React from "react"
import { Brotherhood } from "../../model/Brotherhood"
import { getBrotherhoods } from "../../util/apiClient"
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

interface State extends Shared {
	loaded: boolean
}

const DEFAULT_STATE: State = {
	loaded: false,
	session: null
}

export class AdminPanelContainer extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props)

		this.state = DEFAULT_STATE

		this.handleLogIn = this.handleLogIn.bind(this)
		this.handleLogOut = this.handleLogOut.bind(this)
		this.handleBrotherhoodsChanged = this.handleBrotherhoodsChanged
			.bind(this)
	}

	public render() {
		const { session, loaded } = this.state

		if (!loaded) {
			return null
		}

		return <AdminPanelComponent
			session={session}
			onLogIn={this.handleLogIn}
			onLogOut={this.handleLogOut}
			onBrotherhoodsChanged={this.handleBrotherhoodsChanged}
		/>
	}

	public async componentDidMount() {
		// If the user was logged in, restore the session
		const rawCredentials = localStorage.getItem("credentials")

		if (rawCredentials) {
			const credentials: Credentials = JSON.parse(rawCredentials)

			NProgress.start()

			this.setState({
				session: {
					brotherhoods: await getBrotherhoods(credentials),
					credentials
				}
			})

			NProgress.done()
		}

		this.setState({ loaded: true })
	}

	private handleLogIn(session: Session) {
		this.setState({ session })

		// We persist the credentials so the session isn't closed when the
		// page is reloaded. If this wasn't a demo app we'd save session tokens
		// instead of the username and password.
		localStorage.setItem("credentials", JSON.stringify(session.credentials))
	}

	private handleLogOut() {
		this.setState({ session: null })
		localStorage.removeItem("credentials")
	}

	private handleBrotherhoodsChanged(brotherhoods: Array<Brotherhood>) {
		this.setState({
			session: {
				...this.state.session!,
				brotherhoods
			}
		})
	}
}