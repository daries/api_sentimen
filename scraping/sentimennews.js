const Sentimentnews = require('../models').Sentimentnews;
module.exports = {
    list() {
        return Urlnews.findAll() 
      },
      async add(url,sumber,kategori,tanggal,isi,sentimen) {
        const { count } = await Sentimentnews.findAndCountAll({
          where: { url: url },
        });
        if (count < 1) {
          return await Sentimentnews.create({
            url: url,
            sumber: sumber,
            category: kategori,
            tanggal: tanggal,
            isi : isi,
            sentimen : sentimen.vote,
            skor : sentimen.score
          })
        }
        
          
      },

}