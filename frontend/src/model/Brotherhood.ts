export class Brotherhood {
	public static deserialize(data: any) {
		const URL_REGEX = /https?:\/\/.+\/brotherhoods\/([0-9]+)\//
		return new Brotherhood(
			+data.url.match(URL_REGEX)[1],
			data.name,
			data.manager_email,
			new Date(data.createdAt)
		)
	}

	public readonly id: number
	public readonly name: string
	public readonly managerEmail: string
	public readonly createdAt: Date

	constructor(id: number, name: string, managerEmail: string, created: Date) {
		this.id = id
		this.name = name
		this.managerEmail = managerEmail
		this.createdAt = created
	}
}