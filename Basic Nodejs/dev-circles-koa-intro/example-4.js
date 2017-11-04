const Koa = require('koa');
const KoaRouter = require('koa-router');
var bodyParser = require('koa-bodyparser');
const Joi = require('joi');

const app = new Koa();

const router = new KoaRouter();

const database = {
	users: {},
	userIdPrimary: 0,
};

const userSchema = Joi.object().keys({
	username: Joi.string().required(),
	password: Joi.string().required(),
});

const validate = async function (data, schema){
	return Joi.validate(data, schema);
}

router
	.use(bodyParser())
	.use(async function(ctx, next){
		ctx.schemas = {
			userSchema
		}
		await next();
	})
	.get('/user', function (ctx) {
		ctx.body = database.users;
	})
	.post('/user', async function (ctx) {
		try{
			const newUser = ctx.request.body;
			const isValid = await validate(newUser, userSchema);

			database.userIdPrimary+=1;
			newUser.id = database.userIdPrimary;

			database.users[database.userIdPrimary] = newUser;

			ctx.body = ctx.request.body;
		} catch (e) {
			ctx.throw(e);
		}
		
	})
	.del('/user/:userId', function(ctx){
		if(database.users[ctx.params.userId]){
			delete database.users[ctx.params.userId];	
		}
	
		ctx.status = 204;
	})

app.use(router.routes());

app.listen(3000);
console.log('Running !')