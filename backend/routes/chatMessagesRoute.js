const express = require("express");
const models = require("../models/models");
const router = express.Router();
const Op = require("sequelize").Op;

router.post("/set", async function(req, res, next) {
  let messages = req.body.messages;

  let responseMessages = [];
  for (const message of messages) {
    try {
      await models.ChatMessages.create(message).then(message => {
        responseMessages.push(message);
      });
    } catch (exception) {
      responseMessages.push({
        error: exception.message
      });
    }
  }
  res.json(responseMessages);
});

router.post("/get", async function(req, res, next) {
  const topicID = req.body.id;

  models.Author.findAll({
    where: {
      topicID: topicID
    }
  })
    .then(authors => {
      let authorIDs = [];
      for (let i = 0; i < authors.length; i++) {
        authorIDs.push(authors[i].id);
      }

      return models.ChatMessages.findAll({
        where: {
          authorID: {
            [Op.or]: authorIDs
          }
        }
      });
    })
    .then(messages => {
      res.json(messages);
    })
    .catch(() => {
      res.status(400);
      res.end();
    });
});

module.exports = router;
