import * as React from 'react'

interface Props {
	onReturn: () => void
}

export const BrotherhoodRegistered = (
	{
		onReturn
	}: Props
) => <div className="section">
	<h2 className="subtitle">Registrar hermandad</h2>

	<p>¡Se ha registrado la hermandad correctamente!</p>

	<br />

	<p>¡Que el altísimo te bendiga, hermano!</p>

	<br />

	<button
		className="button is-link"
		onClick={onReturn}
	>
		Volver
	</button>
</div>