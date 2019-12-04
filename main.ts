import * as http from 'http'
import * as url from 'url'
import * as qs from 'querystring'

import { blogsHandler } from './src/blog-handler'

const blogServer = http.createServer((req, res) => {
	let body: any
	let response: any

	req.on('data', data => (body = JSON.parse(data)))
	req.on('end', async () => {
		response = await blogsHandler(req.url!, req.method!, body)
		res.write(response)
		res.end()
	})
})

blogServer.listen(3000)
