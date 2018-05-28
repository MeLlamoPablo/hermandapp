import * as React from "react"

// The first item represents whether or not the condition has been met
// The second item represents the error message to show if the condition
// is not met
export type ValidationResult = [boolean, string]
export type ValidationRules = (value: string) => Array<ValidationResult>

interface Props {
	name: string
	value: string
	type?: string
	validationRules?: ValidationRules
	onValueChange: (value: string) => void
	onValidityChange: (isValid: boolean) => void
	onEnterPressed?: () => void
}

interface State {
	blurred: boolean
}

/**
 * An HTML input with custom validations.
 *
 * This component abstracts input validation logic away from components that
 * need to implement forms by accepting the validationRules property, where
 * the parent component can easily define rules.
 *
 * This component has the following features:
 *
 * - Performs validations and informs the parent component using
 * onValidityChange.
 * - Displays validation errors in the event that the input is invalid.
 * - Only displays errors after the input has been focused and then blurred
 * (de-focused), in order to prevent the form from showing all required inputs
 * in red.
 */
export class ValidableInput extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)

		this.state = {
			blurred: false
		}
	}

	public render() {
		const {
			name,
			type,
			value,
			onValueChange,
			onValidityChange,
			onEnterPressed
		} = this.props
		const { blurred } = this.state
		const errors = this.getErrors()
		const isValid = errors.length === 0

		// Notify the parent components about whether or not there are errors.
		// We do this inside render because the component will be re-rendered
		// each time the value changes.
		onValidityChange(isValid)

		// We only alert the user of the validation errors after the user has
		// blurred the input (i.e: he has focused it at least once, and then
		// focused anything else). We do this to have a clean form; otherwise,
		// the form will start with all inputs in red because empty strings
		// are usually not valid.
		const alertUser = !isValid && blurred

		return <div className="field">
			<label className="label">{name}</label>
			<div className="control">
				<input
					className={`input${alertUser ? " is-danger" : " "}`}
					type={type || "text"}
					placeholder={name}
					value={value}
					onChange={e => onValueChange(e.target.value)}
					onBlur={() => this.setState({ blurred: true })}
					onKeyDown={e => {
						if (e.key === "Enter" && onEnterPressed) {
							onEnterPressed()
						}
					}}
				/>
			</div>
			{alertUser &&
			<ul className="validation-errors-list">
				{errors.map((error, i) =>
					<li key={i}>{error}</li>
				)}
			</ul>
			}
		</div>
	}

	/**
	 * Only re-render the component in the following scenarios:
	 *
	 * - (a) When the input value changes
	 *
	 *    This is to prevent infinite render loops: we call onValidityChange
	 *    inside render, so as a side effect, the parent component will
	 *    re-render each time this component re-renders, provided they modify
	 *    their state based on onValidityChange.
	 *
	 * - (b) When the input is blurred (focus is lost)
	 *
	 *    Thus we allow the errors to be shown if the focus is lost and the
	 *    value is invalid.
	 */
	public shouldComponentUpdate(nextProps: Props, nextState: State) {
		return /* (a) */ nextProps.value !== this.props.value ||
			/* (b) */ nextState.blurred !== this.state.blurred
	}

	/**
	 * Runs the validations and returns the errors raised by them.
	 */
	private getErrors() {
		const { value, validationRules } = this.props

		const result = validationRules ? validationRules(value) : []
		return result
			.map(([isValid, error]) => isValid ? null : error)
			.filter(it => it != null) as Array<string>
	}
}