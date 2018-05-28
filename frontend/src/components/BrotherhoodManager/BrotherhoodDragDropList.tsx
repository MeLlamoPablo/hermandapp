import * as React from "react"
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult, HookProvided
} from "react-beautiful-dnd"
import { Brotherhood } from "../../model/Brotherhood"
import { BrotherhoodListElement } from "./BrotherhoodListElement"

export interface Props {
	brotherhoods: Array<Brotherhood>
	onSelectBrotherhood: (index: number) => void
	onReorderBrotherhood: (result: DropResult, provided: HookProvided) => void
}

export const BrotherhoodDragDropList = (
	{
		brotherhoods,
		onSelectBrotherhood,
		onReorderBrotherhood
	}: Props
) => <DragDropContext
	onDragEnd={onReorderBrotherhood}
	onDragStart={i => onSelectBrotherhood(i.source.index)}
>
	<Droppable droppableId="droppable">
		{provided =>
			<div
				ref={provided.innerRef}
				{...provided.droppableProps}
			>
				{
					brotherhoods.map((brotherhood, i) =>
						<Draggable
							key={i}
							draggableId={i + ""}
							index={i}
						>
							{draggableProvided =>
								<div
									onClick={() => onSelectBrotherhood(i)}
									ref={draggableProvided.innerRef}
									{...(
										draggableProvided.draggableProps as any
									)}
									{...draggableProvided.dragHandleProps}
								>
									<BrotherhoodListElement
										brotherhood={brotherhood}
									/>
								</div>
							}
						</Draggable>
					)
				}
			</div>
		}
	</Droppable>
</DragDropContext>