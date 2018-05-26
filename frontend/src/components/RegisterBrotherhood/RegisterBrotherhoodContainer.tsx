import * as React from 'react'
import { RegisterBrotherhoodComponent } from "./RegisterBrotherhoodComponent"

// Properties that are part of the state, and will be passed to the
// component as-is
export interface Shared {
	email: string
	name: string
}

interface State extends Shared {
	validity: Validity
}

export interface Validity {
	email: boolean
	name: boolean
}

export class RegisterBrotherhoodContainer extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props)

		this.state = {
			email: "",
			name: "",
			validity: {
				email: false,
				name: false
			}
		}

		this.handleDataChanged = this.handleDataChanged.bind(this)
		this.handleValidityChanged = this.handleValidityChanged.bind(this)
	}

	public render() {
		const { name, email } = this.state
		return <RegisterBrotherhoodComponent
			name={name}
			email={email}
			isDataValid={this.isDataValid()}
			onDataChanged={this.handleDataChanged}
			onValidityChanged={this.handleValidityChanged}
		/>
	}

	private isDataValid() {
		const { validity } = this.state
		return validity.email && validity.name
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
}