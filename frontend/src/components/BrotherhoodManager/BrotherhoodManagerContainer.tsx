import * as NProgress from "nprogress"
import * as React from "react"
import { DropResult } from "react-beautiful-dnd"
import { Brotherhood } from "../../model/Brotherhood"
import { reorderBrotherhood } from "../../util/apiClient"
import { Session } from "../AdminPanel/AdminPanelContainer"
import { BrotherhoodManagerComponent } from "./BrotherhoodManagerComponent"

interface Props {
	session: Session
	onBrotherhoodsChanged: (brotherhoods: Array<Brotherhood>) => void
}

export interface Shared {
	selectedBrotherhood: Brotherhood | null
}

type State = Shared

const DEFAULT_STATE: State = {
	selectedBrotherhood: null
}

export class BrotherhoodManagerContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = DEFAULT_STATE

		this.handleSelectBrotherhood = this.handleSelectBrotherhood.bind(this)
		this.handleReorderBrotherhood = this.handleReorderBrotherhood.bind(this)
		this.handleBrotherhoodUpdated = this.handleBrotherhoodUpdated.bind(this)
	}

	public render() {
		const { session } = this.props
		const { selectedBrotherhood } = this.state

		return <BrotherhoodManagerComponent
			selectedBrotherhood={selectedBrotherhood}
			brotherhoods={session.brotherhoods}
			credentials={session.credentials}
			onSelectBrotherhood={this.handleSelectBrotherhood}
			onReorderBrotherhood={this.handleReorderBrotherhood}
			onBrotherhoodUpdated={this.handleBrotherhoodUpdated}
		/>
	}

	private handleSelectBrotherhood(index: number) {
		const brotherhoods = this.props.session.brotherhoods
		const selectedBrotherhood = brotherhoods[index]

		this.setState({ selectedBrotherhood })
	}

	private handleBrotherhoodUpdated(newBrotherhood: Brotherhood) {
		const brotherhoods = [...this.props.session.brotherhoods]
		const index = brotherhoods
			.findIndex(it => it.id === newBrotherhood.id)

		brotherhoods[index] = newBrotherhood
		this.props.onBrotherhoodsChanged(brotherhoods)
	}

	/**
	 * Handles a Brotherhood reorder from the drag and drop interface, and tells
	 * the parent component to update the state so the changes are persisted
	 * in memory. Then, sends an API request to persist the changes in the
	 * backend.
	 */
	private async handleReorderBrotherhood(result: DropResult) {
		const {
			session: {
				brotherhoods,
				credentials
			},
			onBrotherhoodsChanged,
		} = this.props

		// Do nothing if the element wasn't moved
		if (!result.destination) {
			return
		}

		const fromIndex = result.source.index
		const toIndex = result.destination.index

		if (fromIndex === toIndex) {
			return
		}

		NProgress.start()

		const newBrotherhoods = [...brotherhoods]

		// Remove the dragged element from the list
		const [removedBrotherhood] = newBrotherhoods.splice(
			fromIndex,
			1
		)

		// Add it back after the destination index
		newBrotherhoods.splice(
			toIndex,
			0 ,
			removedBrotherhood
		)

		onBrotherhoodsChanged(newBrotherhoods)

		await reorderBrotherhood(
			credentials,
			newBrotherhoods[toIndex],
			newBrotherhoods[toIndex - 1] || null
		)

		NProgress.done()
	}
}