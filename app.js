var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cron = require('node-cron');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const { QueueKategori, QueueArtikel } = require('./scraping/antrian');
const scraping = require('./scraping/index')
const {Worker}  = require('bullmq');

/**
 * bull service worker
 */
// const WorkerKategori = new Worker('antrianKategori', 
// async (job)=>{
//   console.log(job.data);
//   scraping.getListUrl(job.data);

// }, { connection: {
//   host: "localhost",
//   port: 6379
// }});

const WorkerArtikel = new Worker('antrianArtikel', 
async (job)=>{
  console.log(job.data);
  scraping.getUrlData(job.data);
}, { connection: {
  host: "localhost",
  port: 6379
}});



/**
 * Schedule pengambilan berita
 */
var i =0;
const task = cron.schedule('*/5 * * * *', function() {
  if (i>22){
    i=0;
  }else{
    i++;
    scraping.getUrl(i);
  }
  
});

task.start();

/**
 * konfigurasi BullMQ
 */
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(QueueKategori), new BullAdapter(QueueArtikel)],
  serverAdapter: serverAdapter,
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');




var app = express();

//bullmq monitoring
app.use('/admin/queues', serverAdapter.getRouter());

//swaggerUI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send({ error: 'Not found' })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send({ error: err })
});

module.exports = app;
