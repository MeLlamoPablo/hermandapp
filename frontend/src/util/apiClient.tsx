import { Base64 } from "js-base64"
import { Credentials } from "../components/AdminPanel/AdminPanelContainer"
import { Brotherhood } from "../model/Brotherhood"

const BASE_URL = "http://localhost:4000"

export async function createBrotherhood(name: string, email: string) {
	await fetch(`${BASE_URL}/brotherhoods/`, {
		body: JSON.stringify({ name, manager_email: email }),
		headers: COMMON_HEADERS,
		method: "POST"
	})
}

/**
 * Queries all brotherhoods.
 *
 * Throws INVALID_CREDENTIALS if the provided credentials are invalid.
 *
 * @param credentials The admin credentials
 * @returns All created brotherhoods
 */
export async function getBrotherhoods(
	credentials: Credentials
): Promise<Array<Brotherhood>> {
	const response = await fetch(`${BASE_URL}/brotherhoods/`, {
		headers: {
			...COMMON_HEADERS,
			...getAuthHeader(credentials)
		},
		method: "GET"
	})

	if (response.status === 401) {
		throw new Error("INVALID_CREDENTIALS")
	} else {
		const json: Array<any> = await response.json()
		return json.map(it => Brotherhood.deserialize(it))
	}
}

const COMMON_HEADERS = {
	"Accept": "application/json",
	"Content-Type": "application/json"
}

function getAuthHeader(credentials: Credentials) {
	const { username, password } = credentials
	return {
		"Authorization": `Basic ${Base64.encode(`${username}:${password}`)}`
	}
}