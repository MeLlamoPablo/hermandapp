import { isBefore } from "date-fns"
import { ValidationRules } from "../components/ValidableInput"

const brotherhoodName: ValidationRules = value => [
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
]

const brotherhoodEmail: ValidationRules = value => [
	[
		value !== "",
		"Necesitamos un email para contactar al responsable"
	],
	[
		!!value.match(/.+@.+\..+/),
		"No es un email válido"
	]
]

const brotherhoodDate: ValidationRules = value => [
	[
		value !== "" && !isNaN(Date.parse(value)),
		"El formato de la fecha es inválido"
	],
	[
		isBefore(new Date(value), new Date()),
		"A menos que la hermandad adore al dios Chrono, " +
		"me da a mi que esa fecha está mal"
	]
]

export const validationRules = {
	brotherhood: {
		date: brotherhoodDate,
		email: brotherhoodEmail,
		name: brotherhoodName
	}
}
