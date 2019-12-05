import { commentRegex } from './request-handler'

async function commentsHandler(url: string, method: string, data: any) {
	let result: any = {
		status: 200,
		message: 'The comments well be here',
		url,
		method,
		data
	}

	switch (method) {
		case 'GET':
			break

		case 'POST':
			break

		case 'DELETE':
			break

		case 'PUT':
			break
	}

	return result
}

async function GET(params: any) {}

async function POST(params: any, comment: string) {}

async function DELETE(id: number) {}

async function PUT(params: any, comment: string) {}

function getUrlParams(url: string) {
	return commentRegex.exec(url)!.groups
}

export { commentsHandler }
