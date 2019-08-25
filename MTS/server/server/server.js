const Koa = require('koa')
const cors = require('@koa/cors');
const logger = require('koa-morgan')
const Router = require('koa-router')
const bodyParser = require("koa-bodyparser")
const low = require('lowdb')
const FileAsync = require('lowdb/adapters/FileAsync')

const adapter = new FileAsync('db.json')

const server = new Koa()
server.use(bodyParser())
const router = new Router()
const db = low(adapter)
low(adapter)
  .then(db => {
		router
		.get('/', ctx => {
			ctx.body = 'server main'
		})
		.get('/games', async (ctx, next) => {
			ctx.body = await db.get('games')
		})
		.get('/games/:id', async (ctx, next) => {
			const id = Number(ctx.params.id)
			const game = await db.get('games').value()[id]
			if (game) {
					ctx.body = game
			} else {
					ctx.body = 'Not found'
					ctx.status = 404
			}
		})
		.post('/games/', async (ctx, next) => {
			const state = await db.get('games').value()
			const newData = await ctx.request.body;
			const newState = state.concat(newData)
			await db.set('games', newState).write()
			ctx.body = await db.get('games')
		})
	})
	.then(() => {
    server
			.use(logger('tiny'))
			.use(cors())
			.use(router.routes())
			.use(router.allowedMethods())
			server.listen(3000)
  })




