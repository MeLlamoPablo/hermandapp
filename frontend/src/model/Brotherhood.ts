export class Brotherhood {
	public static deserialize(data: any) {
		return new Brotherhood(
			data.name,
			data.managerEmail,
			new Date(data.created)
		)
	}

	public readonly name: string
	public readonly managerEmail: string
	public readonly created: Date

	constructor(name: string, managerEmail: string, created: Date) {
		this.name = name
		this.managerEmail = managerEmail
		this.created = created
	}
}