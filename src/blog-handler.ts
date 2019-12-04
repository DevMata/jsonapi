import {
	getBlogs,
	postBlogs,
	deleteBlogs,
	updateBlogs,
	IPerson
} from './db-handler'

const blogRegex = /\/blogs\/(?<id>[0-9]+)/

async function blogsHandler(url: string, method: string, data: any) {
	let result: any = {}

	switch (method) {
		case 'GET':
			result = await GET(url)
			break

		case 'POST':
			result = await POST(data)
			break

		case 'DELETE':
			result = await DELETE(url)
			break

		case 'PUT':
			result = await PUT(url, data)
			break
	}

	return result
}

async function POST(person: IPerson) {
	return checkIPerson(person) ? await postBlogs(person) : missingParameters
}

async function GET(url: string) {
	const id = getUrlId(url)

	return await getBlogs(id)
}

async function DELETE(url: string) {
	const id = getUrlId(url)

	return id ? await deleteBlogs(id) : missingId
}

async function PUT(url: string, person: IPerson) {
	const id = getUrlId(url)

	person.id = Number.MAX_SAFE_INTEGER
	return id
		? checkIPerson(person)
			? await updateBlogs(id, person)
			: missingParameters
		: missingId
}

function getUrlId(url: string) {
	return blogRegex.test(url)
		? Number(blogRegex.exec(url)!.groups!.id)
		: undefined
}

function checkIPerson(person: IPerson) {
	return person.id && person.name && person.lastName ? true : false
}

const missingId = {
	status: 400,
	message: 'Missing Id'
}

const missingParameters = {
	status: 400,
	message: 'Missing parameters'
}

export { blogsHandler }
