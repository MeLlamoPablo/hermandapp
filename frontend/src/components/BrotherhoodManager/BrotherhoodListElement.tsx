import * as React from "react"
import { Brotherhood } from "../../model/Brotherhood"

interface Props {
	brotherhood: Brotherhood
}

export const BrotherhoodListElement = (
	{
		brotherhood,
	}: Props
) => <div className="box">
	<h3 className="title is-3">{brotherhood.name}</h3>
	<p>Responsable: <i>{brotherhood.managerEmail}</i></p>
</div>