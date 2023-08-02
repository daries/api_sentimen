const { Article } = require('newspaperjs');
const { Detik, Cnbcindonesia } = require('indo-news-scraper');
const { Container } = require('@nlpjs/core');
const { SentimentAnalyzer } = require('@nlpjs/sentiment');
const { LangId } = require('@nlpjs/lang-id');
const container = new Container();
container.use(LangId);
const sentiment = new SentimentAnalyzer({ container });
const { list, add } = require('./sentimennews');
var moment = require('moment');

const { QueueKategori, WorkerKategori, QueueArtikel, WorkerArtikel } = require('./antrian');

var kategori = ['tekstil',
    'besi',
    'kimia',
    'semen',
    'makanan',
    'minuman',
    'pertambangan',
    'pengolahan',
    'perkebunan',
    'perkayuan',
    'air',
    'minum',
    'perikanan',
    'sepatu',
    'baja',
    'logam',
    'kertas',
    'plastik',
    'otomotif',
    'pertanian',
    'elektronik',
    'peternakan',
    'migas'];

module.exports = {
    async getUrl(i) {
        console.log('proses jam: ' + moment().format('MMMM Do YYYY, h:mm:ss a') + '');

        await Detik.scrap(kategori[i]).then(respon => {
            console.log('looping kategori:' + kategori[i]);
            console.log(kategori[i], respon);
            QueueArtikel.add(
                'artikel',
                { hasil: respon, sumber: 'detik', kategori: kategori[i] },
                { delay: 5000 }
            );
        });
        await Cnbcindonesia.scrap(kategori[i]).then(respon1 => {
            console.log(kategori[i], respon1);
            QueueArtikel.add(
                'artikel',
                { hasil: respon1, sumber: 'cncbindonesia', kategori: kategori[i] },
                { delay: 5000 }
            );

        })


    },
    async getListUrl(data) {
        console.log(data.kategori);
        await Detik.scrap(data.kategori).then(respon => {
            console.log('looping kategori:' + data.kategori);
            console.log(data.kategori, respon);
            QueueArtikel.add(
                'artikel',
                { hasil: respon, sumber: 'detik', kategori: data.kategori },
                { delay: 5000 }
            );
        });
        await Cnbcindonesia.scrap(data.kategori).then(respon1 => {
            console.log(data.kategori, respon1);
            QueueArtikel.add(
                'artikel',
                { hasil: respon1, sumber: 'cncbindonesia', kategori: data.kategori },
                { delay: 5000 }
            );

        })



    },
    async getUrlData(resItem) {
        console.log('resitem', resItem)
        if (resItem.hasil.length > 0) {
            for (let i = 0; i < resItem.hasil.length; i++) {
                await Article(resItem.hasil[i].url)
                    .then(result => {
                        dataSimpan = {
                            url: resItem.hasil[i].url,
                            sumber: resItem.sumber,
                            category: resItem.kategori,
                            tanggal: result.date,
                            isi: result.text
                        }
                        simpandata(dataSimpan);
                    }).catch(reason => {
                        console.log(reason);
                    })

            }

        }


    }

}





async function simpandata(dataSentimen) {
    console.log('dataSentimen', dataSentimen);
    const result = await sentiment.process({
        locale: 'id',
        text: dataSentimen.isi,
    });
    console.log(result)
    add(dataSentimen.url, dataSentimen.sumber, dataSentimen.category, dataSentimen.tanggal, dataSentimen.isi, result.sentiment);
}




