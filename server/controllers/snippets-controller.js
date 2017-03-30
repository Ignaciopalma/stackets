var db = require('../config/db.js');

module.exports = {
  get: function(req, res) {
    db.Snippet.findAll({
      include: [
        {
          model: db.Tag
        }, {
          model: db.Language
        }
      ]
    }).then(function(snippets) {
      snippets = snippets.map(function(snippet) {
        // Get ALL data regarding the snippet, including join table values and columns
        var snipVals = snippet.dataValues;
        // Get only the tag id and name. We don't care about when the tags were created
        var tags = snipVals.Tags.map(function(tag) {
          return {id: tag.dataValues.id, tag: tag.dataValues.tag};
        });
        return {
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          'notes': snipVals.notes,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'Tags': tags
        };
      });
      res.status(200).json(snippets);
    });
  },

  getById: function(req, res) {
    db.Snippet.findOne({
      include: [
        {
          model: db.Tag
        }, {
          model: db.Language
        }, {
          model: db.ResourceUrl
        }
      ],
      where: {
        id: Number(req.params.id)
      }
    }).then(function(snippet) {
      if (snippet) {
        // NOTE: This is the exact same as 'get'
        // Only difference is that the 'where' options is added and returns 1 object
        // Make this more modular and DRY
        var snipVals = snippet.dataValues;
        var tags = snipVals.Tags.map(function(tag) {
          return {id: tag.dataValues.id, tag: tag.dataValues.tag};
        });

        res.status(200).json({
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          'notes': snipVals.notes,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'Tags': tags,
          'resources': snipVals.ResourceUrls
        });
      }
    });
  },

  getMostRecent: function(req, res) {
    db.Snippet.findAll({
      include: [
        {
          model: db.Tag
        }, {
          model: db.Language
        }
      ],
      limit: 10,
      order: '"createdAt" DESC'
    }).then(function(snippets) {
      // NOTE: This is the exact same as 'get'
      // Only difference is that the 'limit' and 'order' options are added
      // Make this more modular and DRY
      snippets = snippets.map(function(snippet) {
        var snipVals = snippet.dataValues;

        var tags = snipVals.Tags.map(function(tag) {
          return {id: tag.dataValues.id, tag: tag.dataValues.tag};
        });

        return {
          id: snipVals.id,
          title: snipVals.title,
          snippet: snipVals.snippet,
          'notes': snipVals.notes,
          'createdAt': snipVals.createdAt,
          'updatedAt': snipVals.updatedAt,
          'LanguageId': snipVals.LanguageId,
          'Language': snipVals.Language.dataValues.displayname,
          'Tags': tags
        };
      });
      res.status(200).json(snippets);
    });
  },

  post: function(req, res) {
    var params = {
      title: req.body.title,
      snippet: req.body.snippet,
      notes: req.body.notes,
      LanguageId: Number(req.body.LanguageId), // languageId comes as a string from front-end form
    };

    db.Snippet.create(params)
      .then(function(data) {
        var resourceUrlData = req.body.resources.map(url => {
          return {
            "SnippetId": data.id,
            "url": url
          }
        });

        db.ResourceUrl.bulkCreate(resourceUrlData)
        .then(function(resourceUrls) {
          res.status(201).json(data);
        })
      })
  }
};
