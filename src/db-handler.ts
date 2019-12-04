import { Pool } from 'pg'
import dotenv from 'dotenv'

interface IPerson {
	id: number
	name: string
	lastName: string
}

dotenv.config()

const pool = new Pool({
	password: process.env.PASS,
	user: process.env.USER,
	port: Number(process.env.PORT),
	database: process.env.DB,
	host: 'localhost'
})

async function getBlogs(id?: number) {
	let query = 'SELECT * FROM "Person"'
	id ? (query += ` WHERE id=${id}`) : ''

	const client = await pool.connect()

	try {
		const res = await client.query(query)

		let response = {}

		if (res.rows.length) {
			response = {
				status: 200,
				queryResult: res.rows
			}
		} else {
			response = {
				status: 404,
				message: 'Element not found'
			}
		}
		return response
	} catch (e) {
		console.error(e)
		return {
			status: 500,
			message: 'Error at resolving request'
		}
	} finally {
		client.release()
	}
}

async function postBlogs(person: IPerson) {
	if (!checkIPerson(person))
		return {
			status: 400,
			message: 'Missing parameters'
		}

	let queryText =
		'INSERT INTO "Person" (id,name,"lastName") VALUES ($1,$2,$3) returning id'

	const client = await pool.connect()

	try {
		await client.query('BEGIN')
		const res = await client.query(queryText, [
			person.id,
			person.name,
			person.lastName
		])
		await client.query('COMMIT')
		return {
			status: 201,
			queryResult: res.rows
		}
	} catch (e) {
		await client.query('ROLLBACK')

		return {
			status: 500,
			message: 'Error at insert object'
		}
	} finally {
		client.release()
	}
}

async function deleteBlogs(id?: number) {
	if (!id) return { status: 400, message: 'Missing id' }

	const client = await pool.connect()

	try {
	} catch (e) {
		await client.query('ROLLBACK')
		return {
			status: 500,
			message: 'Error at delete object'
		}
	} finally {
		client.release()
	}
}

function checkIPerson(person: IPerson) {
	return person.id && person.name && person.lastName ? true : false
}

export { getBlogs, postBlogs, deleteBlogs, IPerson }
