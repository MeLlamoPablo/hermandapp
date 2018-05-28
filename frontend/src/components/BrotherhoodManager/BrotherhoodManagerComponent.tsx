import * as React from "react"
import { Brotherhood } from "../../model/Brotherhood"
import { Credentials } from "../AdminPanel/AdminPanelContainer"
import { BrotherhoodDetail } from "../BrotherhoodDetail"
import {
	BrotherhoodDragDropList,
	Props as DragDropProps
} from "./BrotherhoodDragDropList"
import { Shared } from "./BrotherhoodManagerContainer"

interface Props extends DragDropProps, Shared {
	credentials: Credentials
	onBrotherhoodUpdated: (newBrotherhood: Brotherhood) => void
}

export const BrotherhoodManagerComponent = (
	{
		selectedBrotherhood,
		brotherhoods,
		credentials,
		onSelectBrotherhood,
		onReorderBrotherhood,
		onBrotherhoodUpdated
	}: Props
) => <div className="columns">
	<div className="brotherhood-list column">
		{
			brotherhoods.length > 0
			?
				<BrotherhoodDragDropList
					brotherhoods={brotherhoods}
					onReorderBrotherhood={onReorderBrotherhood}
					onSelectBrotherhood={onSelectBrotherhood}
				/>
			:
				<p>¡Aún no hay hermandades!</p>
		}
	</div>
	<div className="column">
		{
			selectedBrotherhood
			?
				<BrotherhoodDetail
					brotherhood={selectedBrotherhood}
					credentials={credentials}
					onBrotherhoodUpdated={onBrotherhoodUpdated}
				/>
			:
				<p>¡Hola! Selecciona una hermandad para modificar sus datos.</p>
		}
	</div>
</div>