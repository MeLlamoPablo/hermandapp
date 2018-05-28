import * as React from "react"
import { Brotherhood } from "../../model/Brotherhood"
import { validationRules } from "../../util/validationRules"
import { ValidableInput } from "../ValidableInput"
import { Shared } from "./BrotherhoodDetailContainer"

interface Props extends Shared {
	brotherhood: Brotherhood
	dataValid: boolean
	dataChanged: boolean
	onDataChanged: (key: string, newValue: string) => void
	onValidityChanged: (key: string, newValue: boolean) => void
	onSendButtonClicked: () => void
	onDiscardButtonClicked: () => void
}

export const BrotherhoodDetailComponent = (
	{
		newName,
		newEmail,
		newCreatedAt,
		brotherhood,
		dataValid,
		dataChanged,
		onDataChanged,
		onValidityChanged,
		onSendButtonClicked,
		onDiscardButtonClicked
	}: Props
) => <div>
	<h3 className="title is-3">Editando {brotherhood.name}</h3>
	<ValidableInput
		name={"Nombre de la hermandad"}
		value={newName}
		validationRules={validationRules.brotherhood.name}
		onValueChange={value => onDataChanged("newName", value)}
		onValidityChange={isValid => onValidityChanged("newName", isValid)}
	/>
	<ValidableInput
		name={"Email del responsable"}
		value={newEmail}
		validationRules={validationRules.brotherhood.email}
		onValueChange={v => onDataChanged("newEmail", v)}
		onValidityChange={isValid => onValidityChanged("newEmail", isValid)}
	/>
	<ValidableInput
		type="date"
		name={"Fecha de creación"}
		value={newCreatedAt}
		validationRules={validationRules.brotherhood.date}
		onValueChange={v => onDataChanged("newCreatedAt", v)}
		onValidityChange={isValid => onValidityChanged("newCreatedAt", isValid)}
	/>

	<div className="field is-grouped">
		<div className="control">
			<button
				className="button is-link"
				disabled={!(dataValid && dataChanged)}
				onClick={onSendButtonClicked}
			>
				Guardar
			</button>
			<button
				className="button is-danger is-outlined"
				disabled={!dataChanged}
				onClick={onDiscardButtonClicked}
			>
				Descartar cambios
			</button>
		</div>
	</div>
</div>