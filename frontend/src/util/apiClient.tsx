const BASE_URL = "http://localhost:4000"

export async function createBrotherhood(name: string, email: string) {
	await fetch(`${BASE_URL}/brotherhoods/`, {
		body: JSON.stringify({ name, manager_email: email }),
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST"
	})
}
