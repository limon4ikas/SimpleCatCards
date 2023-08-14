migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u9pul9c8rrrq201")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u9pul9c8rrrq201")

  // remove
  collection.schema.removeField("vnchzx6r")

  return dao.saveCollection(collection)
})
