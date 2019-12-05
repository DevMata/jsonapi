import {
	getBlogs,
	postBlogs,
	deleteBlogs,
	updateBlogs,
	IBlog
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

async function POST(blog: IBlog) {
	return checkBlog(blog) ? await postBlogs(blog) : missingParameters
}

async function GET(url: string) {
	return await getBlogs(getUrlId(url))
}

async function DELETE(url: string) {
	const id = getUrlId(url)

	return id ? await deleteBlogs(id) : missingId
}

async function PUT(url: string, blog: IBlog) {
	const id = getUrlId(url)
	return id
		? checkBlog(blog)
			? await updateBlogs(id, blog)
			: missingParameters
		: missingId
}

function getUrlId(url: string) {
	return blogRegex.test(url)
		? Number(blogRegex.exec(url)!.groups!.id)
		: undefined
}

function checkBlog(blog: IBlog) {
	return blog.title && blog.content ? true : false
}

const missingId = {
	status: 400,
	message: 'Missing Id'
}

const missingParameters = {
	status: 400,
	message: 'Missing parameters. Title and content are required'
}

export { blogsHandler }
