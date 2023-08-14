migrate((db) => {
  const collection = new Collection({
    "id": "6mpr0zcsa99a0zm",
    "created": "2023-08-14 02:00:40.738Z",
    "updated": "2023-08-14 02:00:40.738Z",
    "name": "cards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ipfatwhm",
        "name": "question",
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
        "name": "answer",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6mpr0zcsa99a0zm");

  return dao.deleteCollection(collection);
})
