migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mpr0zcsa99a0zm")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6mpr0zcsa99a0zm")

  // remove
  collection.schema.removeField("rgi8cely")

  return dao.saveCollection(collection)
})
