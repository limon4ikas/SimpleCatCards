migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u9pul9c8rrrq201")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u9pul9c8rrrq201")

  // remove
  collection.schema.removeField("xbnwxxxc")

  return dao.saveCollection(collection)
})
