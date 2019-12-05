import { commentRegex } from './request-handler'
import {
	getComments,
	postComments,
	deleteComments,
	updateComments,
	IComment
} from './db-handler'

async function commentsHandler(url: string, method: string, data: any) {
	let result: any = {}
	console.log(url, method, data)

	switch (method) {
		case 'GET':
			result = await GET(url)
			break

		case 'POST':
			result = await POST(url, data)
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
	const params = getUrlParams(url)

	const blog_id = Number(params!.blog)
	const comment_id = params!.comment ? Number(params!.comment) : undefined

	return await getComments(blog_id, comment_id)
}

async function POST(url: string, comment: IComment) {
	const params = getUrlParams(url)

	// return params!.comment_id
	// 	? { status: 405, message: 'POST comment does not need comment Id' }
	// 	: checkComment(comment.content)
	// 	? await postComments(Number(params!.blog_id), comment.content)
	// 	: missingParameters

	return checkComment(comment)
		? await postComments(Number(params!.blog), comment.content)
		: missingParameters
}

async function DELETE(url: string) {
	const params = getUrlParams(url)

	const blog_id = params!.blog
	const comment_id = params!.comment ? Number(params!.comment) : undefined

	return comment_id
		? await deleteComments(Number(blog_id), comment_id)
		: missingId
}

async function PUT(url: string, comment: IComment) {
	const params = getUrlParams(url)

	const blog_id = params!.blog
	const comment_id = params!.comment ? Number(params!.comment) : undefined

	return comment_id
		? checkComment(comment)
			? await updateComments(Number(blog_id), comment_id, comment.content)
			: missingParameters
		: missingId
}

function getUrlParams(url: string) {
	return commentRegex.exec(url)!.groups
}

function checkComment(comment: IComment) {
	return comment ? (comment.content ? true : false) : false
}

const missingId = {
	status: 400,
	message: 'Missing comment Id'
}

const missingParameters = {
	status: 400,
	message: 'Missing parameters. Comment text is required'
}

export { commentsHandler }
