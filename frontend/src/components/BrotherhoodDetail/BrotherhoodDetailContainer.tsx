import * as NProgress from "nprogress"
import * as React from "react"
import { Brotherhood } from "../../model/Brotherhood"
import { updateBrotherhood } from "../../util/apiClient"
import { dateToHTMLFormat } from "../../util/dateToHTMLFormat"
import { Credentials } from "../AdminPanel/AdminPanelContainer"
import { BrotherhoodDetailComponent } from "./BrotherhoodDetailComponent"

interface Props {
	brotherhood: Brotherhood
	credentials: Credentials
	onBrotherhoodUpdated: (newBrotherhood: Brotherhood) => void
}

export interface Shared {
	newName: string
	newEmail: string
	newCreatedAt: string
}

export interface Validity {
	newName: boolean
	newEmail: boolean
	newCreatedAt: boolean
}

interface State extends Shared {
	brotherhood: Brotherhood
	validity: Validity
}

export class BrotherhoodDetailContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = this.getInitialState()

		this.handleDataChanged = this.handleDataChanged.bind(this)
		this.handleValidityChanged = this.handleValidityChanged.bind(this)
		this.handleSaveChanges = this.handleSaveChanges.bind(this)
		this.handleDiscardChanges = this.handleDiscardChanges.bind(this)
		this.getInitialState = this.getInitialState.bind(this)
	}

	public render() {
		const { brotherhood, newName, newEmail, newCreatedAt } = this.state

		return <BrotherhoodDetailComponent
			newName={newName}
			newEmail={newEmail}
			newCreatedAt={newCreatedAt}
			brotherhood={brotherhood}
			dataValid={this.isDataValid()}
			dataChanged={this.hasDataChanged()}
			onDataChanged={this.handleDataChanged}
			onValidityChanged={this.handleValidityChanged}
			onSendButtonClicked={this.handleSaveChanges}
			onDiscardButtonClicked={this.handleDiscardChanges}
		/>
	}

	public componentDidUpdate(prevProps: Props, prevState: State) {
		if (prevProps.brotherhood.id !== this.props.brotherhood.id) {
			this.setState(this.getInitialState())
		}
	}

	private getInitialState(): State {
		const { brotherhood } = this.props

		return {
			brotherhood,
			newCreatedAt: dateToHTMLFormat(brotherhood.createdAt),
			newEmail: brotherhood.managerEmail,
			newName: brotherhood.name,
			validity: {
				newCreatedAt: true,
				newEmail: true,
				newName: true
			}
		}
	}

	private isDataValid() {
		const { validity } = this.state

		return validity.newEmail &&
			validity.newName &&
			validity.newCreatedAt
	}

	private hasDataChanged() {
		const {
			brotherhood: {
				name,
				managerEmail: email,
				createdAt
			},
			newEmail,
			newCreatedAt,
			newName
		} = this.state

		return newEmail !== email ||
			newName !== name ||
			newCreatedAt !== dateToHTMLFormat(createdAt)
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

	private handleDiscardChanges() {
		this.setState(this.getInitialState())
	}

	private async handleSaveChanges() {
		NProgress.start()

		const { credentials, onBrotherhoodUpdated } = this.props
		const { brotherhood, newName, newEmail, newCreatedAt } = this.state

		const newBrotherhood = await updateBrotherhood(
			credentials,
			brotherhood,
			{
				created_at: new Date(newCreatedAt),
				manager_email: newEmail,
				name: newName
			}
		)

		NProgress.done()

		this.setState({ brotherhood: newBrotherhood })
		onBrotherhoodUpdated(newBrotherhood)
	}
}