import { getBlogs, postBlogs, deleteBlogs, IPerson } from './db-handler'

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
	}

	return result
}

async function POST(person: IPerson) {
	return await postBlogs(person)
}

async function GET(url: string) {
	const id = blogRegex.test(url)
		? Number(blogRegex.exec(url)!.groups!.id)
		: undefined

	return await getBlogs(id)
}

async function DELETE(url: string) {
	const id = blogRegex.test(url)
		? Number(blogRegex.exec(url)!.groups!.id)
		: undefined
	console.log(id)
	return await deleteBlogs(id)
}

export { blogsHandler }
