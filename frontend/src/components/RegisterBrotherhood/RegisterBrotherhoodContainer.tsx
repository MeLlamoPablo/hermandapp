import * as NProgress from "nprogress"
import * as React from "react"
import { createBrotherhood } from "../../util/apiClient"
import { BrotherhoodRegistered } from "./BrotherhoodRegistered"
import { RegisterBrotherhoodComponent } from "./RegisterBrotherhoodComponent"

// Properties that are part of the state, and will be passed to the
// component as-is
export interface Shared {
	email: string
	name: string
	createdAt: string
}

interface State extends Shared {
	validity: Validity
	brotherhoodRegistered: boolean
}

export interface Validity {
	email: boolean
	name: boolean
	createdAt: boolean
}

const DEFAULT_STATE: State = {
	brotherhoodRegistered: false,
	createdAt: "",
	email: "",
	name: "",
	validity: {
		createdAt: false,
		email: false,
		name: false,
	}
}

export class RegisterBrotherhoodContainer extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props)

		this.state = DEFAULT_STATE

		this.handleDataChanged = this.handleDataChanged.bind(this)
		this.handleValidityChanged = this.handleValidityChanged.bind(this)
		this.handleReturnFromSuccessDialog = this.handleReturnFromSuccessDialog
			.bind(this)
		this.handleBrotherhoodCreated = this.handleBrotherhoodCreated.bind(this)
	}

	public render() {
		const { brotherhoodRegistered, name, email, createdAt } = this.state

		if (brotherhoodRegistered) {
			return <BrotherhoodRegistered
				onReturn={this.handleReturnFromSuccessDialog}
			/>
		} else {
			return <RegisterBrotherhoodComponent
				name={name}
				email={email}
				createdAt={createdAt}
				isDataValid={this.isDataValid()}
				onDataChanged={this.handleDataChanged}
				onValidityChanged={this.handleValidityChanged}
				onSendButtonClicked={this.handleBrotherhoodCreated}
			/>
		}
	}

	private isDataValid() {
		const { validity } = this.state
		return validity.email && validity.name && validity.createdAt
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

	private handleReturnFromSuccessDialog() {
		this.setState(DEFAULT_STATE)
	}

	private async handleBrotherhoodCreated() {
		const { name, email, createdAt } = this.state

		NProgress.start()
		await createBrotherhood(name, email, new Date(createdAt))
		NProgress.done()

		this.setState({
			brotherhoodRegistered: true
		})
	}
}