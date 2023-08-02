const Sentimen = require('../models').Sentimentnews;

module.exports = {
  list(req, res) {
    return Sentimen
      .findAll({
        attributes: ['url','tanggal','sentimen','skor','sumber','category'],
        order: [
          ['createdAt', 'DESC']
        ],
      })
      .then((sentimen) => res.status(200).send(sentimen))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Classroom
      .findByPk(req.params.id, {
        include: [{
          model: Student,
          as: 'students'
        }],
      })
      .then((classroom) => {
        if (!classroom) {
          return res.status(404).send({
            message: 'Classroom Not Found',
          });
        }
        return res.status(200).send(classroom);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
};
