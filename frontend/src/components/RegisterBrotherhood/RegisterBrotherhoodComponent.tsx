import * as React from "react"
import { validationRules } from "../../util/validationRules"
import { ValidableInput } from "../ValidableInput"
import { Shared } from "./RegisterBrotherhoodContainer"

interface Props extends Shared {
	isDataValid: boolean
	onDataChanged: (key: string, newValue: string) => void
	onValidityChanged: (key: string, newValue: boolean) => void
	onSendButtonClicked: () => void
}

export const RegisterBrotherhoodComponent = (
	{
		name,
		email,
		createdAt,
		isDataValid,
		onDataChanged,
		onValidityChanged,
		onSendButtonClicked
	}: Props
) => <div className="section">
	<h3 className="title is-3">Registrar hermandad</h3>
	<ValidableInput
		name={"Nombre de la hermandad"}
		value={name}
		validationRules={validationRules.brotherhood.name}
		onValueChange={value => onDataChanged("name", value)}
		onValidityChange={isValid => onValidityChanged("name", isValid)}
	/>
	<ValidableInput
		name={"Email del responsable"}
		value={email}
		validationRules={validationRules.brotherhood.email}
		onValueChange={v => onDataChanged("email", v)}
		onValidityChange={isValid => onValidityChanged("email", isValid)}
	/>
	<ValidableInput
		type="date"
		name={"Fecha de creación"}
		value={createdAt}
		validationRules={validationRules.brotherhood.date}
		onValueChange={v => onDataChanged("createdAt", v)}
		onValidityChange={isValid => onValidityChanged("createdAt", isValid)}
	/>

	<div className="field is-grouped">
		<div className="control">
			<button
				className="button is-link"
				disabled={!isDataValid}
				onClick={onSendButtonClicked}
			>
				Registrar
			</button>
		</div>
	</div>
</div>

