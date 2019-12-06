import * as http from 'http'

import { responseHandler } from './src/request-handler'
import { IResponse } from './src/db-handler'

const blogServer = http.createServer((req, res) => {
	const data: Uint8Array[] = []
	let response: IResponse

	req.on('data', body => data.push(body))

	req.on('end', async () => {
		response =
			req.headers['content-type'] === 'application/json'
				? await responseHandler(
						req.url!,
						req.method!,
						JSON.parse(Buffer.concat(data).toString())
				  )
				: { status: 405, message: 'JSON format needed' }

		res.write(JSON.stringify(response))
		res.end()
	})
})

blogServer.listen(3000)
