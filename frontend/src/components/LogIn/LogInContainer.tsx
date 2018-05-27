import * as NProgress from "nprogress"
import * as React from "react"
import { Brotherhood } from "../../model/Brotherhood"
import { getBrotherhoods } from "../../util/apiClient"
import { Session } from "../AdminPanel/AdminPanelContainer"
import { LogInComponent } from "./LogInComponent"

interface Props {
	onLogin: (session: Session) => void
}

export interface Shared {
	username: string
	password: string
	showIncorrectCredentialsDialog: boolean
}

export interface Validity {
	username: boolean
	password: boolean
}

interface State extends Shared {
	validity: Validity
}

const DEFAULT_STATE: State = {
	password: "",
	showIncorrectCredentialsDialog: false,
	username: "",
	validity: {
		password: false,
		username: false
	}
}

export class LogInContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = DEFAULT_STATE

		this.handleDataChanged = this.handleDataChanged.bind(this)
		this.handleValidityChanged = this.handleValidityChanged.bind(this)
		this.handleDismissIncorrectCredentialsDialog =
			this.handleDismissIncorrectCredentialsDialog.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}

	public render() {
		const {
			username,
			password,
			showIncorrectCredentialsDialog
		} = this.state

		return <LogInComponent
			username={username}
			password={password}
			showIncorrectCredentialsDialog={showIncorrectCredentialsDialog}
			isDataValid={this.isDataValid()}
			onDataChanged={this.handleDataChanged}
			onValidityChanged={this.handleValidityChanged}
			onDismissIncorrectCredentialsDialog={
				this.handleDismissIncorrectCredentialsDialog}
			onSendButtonClicked={this.handleLogin}
		/>
	}

	private isDataValid() {
		const { validity } = this.state
		return validity.username && validity.password
	}

	private handleDataChanged(key: string, newValue: string) {
		const newState = { ...this.state }
		newState[key] = newValue
		this.setState(newState)
	}

	private handleValidityChanged(key: string, newValue: boolean) {
		const newState = { ...this.state }
		newState.validity[key] = newValue
		this.setState(newState)
	}

	private handleDismissIncorrectCredentialsDialog() {
		this.setState({ showIncorrectCredentialsDialog: false })
	}

	private async handleLogin() {
		const { onLogin } = this.props
		const { username, password } = this.state

		const credentials = { username, password }

		NProgress.start()

		const brotherhoods: Array<Brotherhood> | null = await (async () => {
			try {
				return await getBrotherhoods(credentials)
			} catch (e) {
				if (e.message === "INVALID_CREDENTIALS") {
					return null
				} else {
					throw e
				}
			}
		})()

		if (brotherhoods) {
			onLogin({
				brotherhoods,
				credentials
			})
		} else {
			this.setState({ showIncorrectCredentialsDialog: true })
		}

		NProgress.done()
	}
}