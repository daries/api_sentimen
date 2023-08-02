const { Queue, Worker } = require('bullmq');

const QueueKategori = new Queue('antrianKategori', { connection: {
    host: "localhost",
    port: 6379
  }});
  
  const WorkerKategori =new Worker('workerKategori', async (job)=>{}, { connection: {
    host: "localhost",
    port: 6379
  }});
  const QueueArtikel =new Queue('antrianArtikel', { connection: {
    host: "localhost",
    port: 6379
  }});
  
  const WorkerArtikel =new Worker('workerArtikel', async (job)=>{}, { connection: {
    host: "localhost",
    port: 6379
  }});



module.exports ={QueueKategori,QueueArtikel}