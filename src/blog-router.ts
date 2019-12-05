import {
	getBlogs,
	postBlogs,
	deleteBlogs,
	updateBlogs,
	IBlog
} from './db-handler'

import { blogRegex } from './request-handler'

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

async function GET(url: string) {
	return await getBlogs(getBlogId(url))
}

async function POST(blog: IBlog) {
	return checkBlog(blog) ? await postBlogs(blog) : missingParameters
}

async function DELETE(url: string) {
	const id = getBlogId(url)

	return id ? await deleteBlogs(id) : missingId
}

async function PUT(url: string, blog: IBlog) {
	const id = getBlogId(url)
	return id
		? checkBlog(blog)
			? await updateBlogs(id, blog)
			: missingParameters
		: missingId
}

function getBlogId(url: string) {
	return blogRegex.test(url)
		? Number(blogRegex.exec(url)!.groups!.blog)
		: undefined
}

function checkBlog(blog: IBlog) {
	return blog ? (blog.title && blog.content ? true : false) : false
}

const missingId = {
	status: 400,
	message: 'Missing blog Id'
}

const missingParameters = {
	status: 400,
	message: 'Missing parameters. Title and content are required'
}

export { blogsHandler }
