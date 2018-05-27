import * as React from "react"
import { ValidableInput } from "../ValidableInput"
import { Shared } from "./LogInContainer"

interface Props extends Shared {
	isDataValid: boolean
	onDataChanged: (key: string, newValue: string) => void
	onValidityChanged: (key: string, newValue: boolean) => void
	onSendButtonClicked: () => void
	onDismissIncorrectCredentialsDialog: () => void
}

export const LogInComponent = (
	{
		username,
		password,
		showIncorrectCredentialsDialog,
		isDataValid,
		onDataChanged,
		onValidityChanged,
		onDismissIncorrectCredentialsDialog,
		onSendButtonClicked
	}: Props
) => <div className="section">
	<h3 className="title is-3">Iniciar sesión</h3>
	<ValidableInput
		name={"Nombre de usuario"}
		value={username}
		validationRules={value => [
			[
				value !== "",
				"Este campo es obligatorio"
			]
		]}
		onValueChange={value => onDataChanged("username", value)}
		onValidityChange={isValid => onValidityChanged("username", isValid)}
	/>
	<ValidableInput
		name={"Contraseña"}
		type="password"
		value={password}
		validationRules={value => [
			[
				value !== "",
				"Este campo es obligatorio"
			]
		]}
		onValueChange={v => onDataChanged("password", v)}
		onValidityChange={isValid => onValidityChanged("password", isValid)}
	/>

	{ showIncorrectCredentialsDialog &&
		<div className="notification is-danger">
			<button
				className="delete"
				onClick={onDismissIncorrectCredentialsDialog}
			/>
			¡Usuario o contraseña incorrectos!
		</div>
	}

	<div className="field is-grouped">
		<div className="control">
			<button
				className="button is-link"
				disabled={!isDataValid}
				onClick={onSendButtonClicked}
			>
				Iniciar sesión
			</button>
		</div>
	</div>
</div>

