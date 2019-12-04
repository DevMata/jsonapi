import { get } from './db-handler'

const blogRegex = /\/blogs\/(?<id>[0-9]+)/

async function blogsHandler(url: string, method: string, data: any) {
	let result: any = {}

	switch (method) {
		case 'GET':
			result = await GET(url)
			break
	}

	return result
}

function POST() {}

async function GET(url: string) {
	const id = blogRegex.test(url)
		? Number(blogRegex.exec(url)!.groups!.id)
		: undefined

	return await get(id)
}

function DELETE() {}

export { blogsHandler }
