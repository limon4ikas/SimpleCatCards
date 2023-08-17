migrate((db) => {
  const snapshot = [
    {
      "id": "u9pul9c8rrrq201",
      "created": "2023-08-14 01:58:29.724Z",
      "updated": "2023-08-16 08:32:37.084Z",
      "name": "decks",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ymzv2or3",
          "name": "name",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "wcq8zjtx",
          "name": "description",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "nqbakzy9",
          "name": "lastEdited",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "ptoqn1mm",
          "name": "lastAttempted",
          "type": "date",
          "required": false,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        },
        {
          "system": false,
          "id": "mzmpciq6",
          "name": "color",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "vnchzx6r",
          "name": "cards",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "6mpr0zcsa99a0zm",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "xbnwxxxc",
          "name": "user",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "_pb_users_auth_",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        }
      ],
      "indexes": [],
      "listRule": "@request.auth.id = user.id",
      "viewRule": "@request.auth.id = user.id",
      "createRule": "",
      "updateRule": "@request.auth.id = user.id",
      "deleteRule": "@request.auth.id = user.id",
      "options": {}
    },
    {
      "id": "6mpr0zcsa99a0zm",
      "created": "2023-08-14 02:00:40.738Z",
      "updated": "2023-08-16 08:32:37.085Z",
      "name": "flashcards",
      "type": "base",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "ipfatwhm",
          "name": "front",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "zuua7gna",
          "name": "back",
          "type": "text",
          "required": true,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "rgi8cely",
          "name": "deck",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "u9pul9c8rrrq201",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": 1,
            "displayFields": []
          }
        },
        {
          "system": false,
          "id": "9ia7xh8m",
          "name": "interval",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "xkarxfh7",
          "name": "repetition",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "6fpnlb52",
          "name": "efactor",
          "type": "number",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null
          }
        },
        {
          "system": false,
          "id": "viv2soxn",
          "name": "dueDate",
          "type": "date",
          "required": true,
          "unique": false,
          "options": {
            "min": "",
            "max": ""
          }
        }
      ],
      "indexes": [],
      "listRule": "@request.auth.id = deck.user.id",
      "viewRule": "@request.auth.id = deck.user.id",
      "createRule": "@request.auth.id = deck.user.id",
      "updateRule": "@request.auth.id = deck.user.id",
      "deleteRule": "@request.auth.id = deck.user.id",
      "options": {}
    },
    {
      "id": "_pb_users_auth_",
      "created": "2023-08-16 04:01:53.082Z",
      "updated": "2023-08-16 08:32:37.085Z",
      "name": "users",
      "type": "auth",
      "system": false,
      "schema": [
        {
          "system": false,
          "id": "users_name",
          "name": "name",
          "type": "text",
          "required": false,
          "unique": false,
          "options": {
            "min": null,
            "max": null,
            "pattern": ""
          }
        },
        {
          "system": false,
          "id": "users_avatar",
          "name": "avatar",
          "type": "file",
          "required": false,
          "unique": false,
          "options": {
            "maxSelect": 1,
            "maxSize": 5242880,
            "mimeTypes": [
              "image/jpeg",
              "image/png",
              "image/svg+xml",
              "image/gif",
              "image/webp"
            ],
            "thumbs": null,
            "protected": false
          }
        },
        {
          "system": false,
          "id": "k2is3fou",
          "name": "decks",
          "type": "relation",
          "required": false,
          "unique": false,
          "options": {
            "collectionId": "u9pul9c8rrrq201",
            "cascadeDelete": false,
            "minSelect": null,
            "maxSelect": null,
            "displayFields": []
          }
        }
      ],
      "indexes": [],
      "listRule": "id = @request.auth.id",
      "viewRule": "id = @request.auth.id",
      "createRule": "",
      "updateRule": "id = @request.auth.id",
      "deleteRule": "id = @request.auth.id",
      "options": {
        "allowEmailAuth": true,
        "allowOAuth2Auth": true,
        "allowUsernameAuth": true,
        "exceptEmailDomains": null,
        "manageRule": null,
        "minPasswordLength": 8,
        "onlyEmailDomains": null,
        "requireEmail": false
      }
    }
  ];

  const collections = snapshot.map((item) => new Collection(item));

  return Dao(db).importCollections(collections, true, null);
}, (db) => {
  return null;
})
