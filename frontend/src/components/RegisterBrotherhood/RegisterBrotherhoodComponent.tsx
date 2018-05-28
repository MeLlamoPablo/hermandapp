import {isBefore} from "date-fns"
import * as React from "react"
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
		validationRules={value => [
			[
				value !== "",
				"Este campo es obligatorio"
			],
			[
				value.length <= 50,
				"El nombre no puede tener más de 50 caracteres"
			],
			[
				!value
					.toLowerCase()
					.replace("á", "a")
					.includes("satan"),
				"No se admiten nombres herejes"
			]
		]}
		onValueChange={value => onDataChanged("name", value)}
		onValidityChange={isValid => onValidityChanged("name", isValid)}
	/>
	<ValidableInput
		name={"Email del responsable"}
		value={email}
		validationRules={value => [
			[
				value !== "",
				"Necesitamos un email para contactar al responsable"
			],
			[
				!!value.match(/.+@.+\..+/),
				"No es un email válido"
			]
		]}
		onValueChange={v => onDataChanged("email", v)}
		onValidityChange={isValid => onValidityChanged("email", isValid)}
	/>
	<ValidableInput
		type="date"
		name={"Fecha de creación"}
		value={createdAt}
		validationRules={value => [
			[
				value !== "" && !isNaN(Date.parse(value)),
				"El formato de la fecha es inválido"
			],
			[
				isBefore(new Date(value), new Date()),
				"A menos que la hermandad adore al dios Chrono, " +
				"me da a mi que esa fecha está mal"
			]
		]}
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

