import { Pool } from 'pg'
import dotenv from 'dotenv'

interface IBlog {
	id: number
	title: string
	content: string
}

interface IResponse {
	status: number
	message?: string
	result?: any[]
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
	let query =
		'SELECT * FROM blog' +
		(id ? ` WHERE blog_id=${id}` : '') +
		' ORDER BY modified_at DESC'

	const client = await pool.connect()

	try {
		const res = await client.query(query)

		let response = {}

		if (res.rows.length) {
			response = {
				status: 200,
				result: res.rows
			}
		} else {
			response = {
				status: 404,
				message: 'Blog not found'
			}
		}
		return response
	} catch (e) {
		console.error(e)
		return {
			status: 500,
			message: 'Error at listing blogs'
		}
	} finally {
		client.release()
	}
}

async function postBlogs(blog: IBlog) {
	const queryText =
		'INSERT INTO blog (blog_title,blog_content) VALUES ($1,$2) returning *'

	const client = await pool.connect()

	try {
		await client.query('BEGIN')
		const res = await client.query(queryText, [blog.title, blog.content])
		await client.query('COMMIT')

		return {
			status: 201,
			result: res.rows
		}
	} catch (e) {
		await client.query('ROLLBACK')

		return {
			status: 500,
			message: 'Error at creating blog'
		}
	} finally {
		client.release()
	}
}

async function deleteBlogs(id?: number) {
	const client = await pool.connect()

	try {
		const validation = await getBlogs(id)
		if ((validation as IResponse).status === 404) return validation

		await client.query('BEGIN')
		await client.query('DELETE FROM blog WHERE blog_id=$1', [id])
		await client.query('COMMIT')

		return { status: 200, message: 'Blog deleted successfully' }
	} catch (e) {
		console.log(e)
		await client.query('ROLLBACK')
		return {
			status: 500,
			message: 'Error at deleting blog'
		}
	} finally {
		client.release()
	}
}

async function updateBlogs(id: number, blog: IBlog) {
	const queryText =
		'UPDATE blog SET blog_title=$1, blog_content=$2, modified_at=NOW() WHERE blog_id=$3 RETURNING *'

	const client = await pool.connect()

	try {
		const validation = await getBlogs(id)
		if ((validation as IResponse).status === 404) return validation

		await client.query('BEGIN')
		const res = await client.query(queryText, [blog.title, blog.content, id])
		await client.query('COMMIT')

		return { status: 200, result: res.rows }
	} catch (e) {
		await client.query('ROLLBACK')
		return {
			status: 500,
			message: 'Error at updating blog'
		}
	} finally {
		client.release()
	}
}

export { getBlogs, postBlogs, deleteBlogs, updateBlogs, IBlog, IResponse }
