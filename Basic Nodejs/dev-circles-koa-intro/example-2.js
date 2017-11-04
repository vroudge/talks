const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/', function (ctx) {
	ctx.body = 'Hola que tal';
});

app.use(router.routes());

app.listen(3000);