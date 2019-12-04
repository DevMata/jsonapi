import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
	password: process.env.PASS,
	user: process.env.USER,
	port: Number(process.env.PORT),
	database: process.env.DB,
	host: 'localhost'
})

async function get(id?: number) {
	let query = 'SELECT * FROM "Person"'
	id ? (query += ` WHERE id=${id}`) : ''

	const client = await pool.connect()

	try {
		const res = await client.query(query)
		return JSON.stringify(res.rows)
	} catch (e) {
		return e
	} finally {
		client.release()
	}
}

export { get }
