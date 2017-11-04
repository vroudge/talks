const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router
	.get('/math/:operation', function (ctx) {
		
		// Query string from url can be gotten by checking ctx.query
		// ?number1=5&number2=10
		const number1 = Number(ctx.query.number1);
		const number2 = Number(ctx.query.number2);

		// :operation in URL can be gotten by checking ctx.params
		if(ctx.params.operation === 'add'){
			ctx.body = number1 + number2;
		} else if (ctx.params.operation === 'subtract'){
			ctx.body = number1 - number2;
		} else {
			ctx.throw(500, 'Wrong operation!')
		}

	});

app.use(router.routes());

app.listen(3000);