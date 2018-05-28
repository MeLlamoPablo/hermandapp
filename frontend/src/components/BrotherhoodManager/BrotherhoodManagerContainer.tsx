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

export class BrotherhoodManagerContainer extends React.Component<Props, {}> {
	constructor(props: Props) {
		super(props)

		this.handleReorder = this.handleReorder.bind(this)
	}

	public render() {
		return <BrotherhoodManagerComponent
			brotherhoods={this.props.session.brotherhoods}
			onReorder={this.handleReorder}
		/>
	}

	/**
	 * Handles a Brotherhood reorder from the drag and drop interface, and tells
	 * the parent component to update the state so the changes are persisted
	 * in memory. Then, sends an API request to persist the changes in the
	 * backend.
	 */
	private async handleReorder(result: DropResult) {
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