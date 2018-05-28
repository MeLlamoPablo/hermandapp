import * as React from "react"
import {
	BrotherhoodDragDropList,
	Props as DragDropProps
} from "./BrotherhoodDragDropList"

type Props = DragDropProps

export const BrotherhoodManagerComponent = (
	{
		brotherhoods,
		onReorder
	}: Props
) => <div className="columns">
	<div className="brotherhood-list column">
		{
			brotherhoods.length > 0
			?
				<BrotherhoodDragDropList
					brotherhoods={brotherhoods}
					onReorder={onReorder}
				/>
			:
				<p>¡Aún no hay hermandades!</p>
		}
	</div>
	<div className="column">
		Hola
	</div>
</div>