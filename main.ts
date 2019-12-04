import * as http from 'http'
import * as url from 'url'
import * as qs from 'querystring'

import { blogsHandler } from './src/blog-handler'

interface IResponse {
	status: number
	message?: string
	queryResult?: any[]
}

const blogServer = http.createServer((req, res) => {
	let body: any
	let response: IResponse

	req.on('data', data => (body = JSON.parse(data)))
	req.on('end', async () => {
		response = await blogsHandler(req.url!, req.method!, body)
		res.writeHead(response.status, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify(response))
		res.end()
	})
})

blogServer.listen(3000)
