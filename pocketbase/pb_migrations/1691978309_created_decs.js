migrate(
  (db) => {
    const collection = new Collection({
      id: 'u9pul9c8rrrq201',
      created: '2023-08-14 01:58:29.724Z',
      updated: '2023-08-14 01:58:29.724Z',
      name: 'decks',
      type: 'base',
      system: false,
      schema: [
        {
          system: false,
          id: 'ymzv2or3',
          name: 'name',
          type: 'text',
          required: true,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: '',
          },
        },
        {
          system: false,
          id: 'wcq8zjtx',
          name: 'description',
          type: 'text',
          required: false,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: '',
          },
        },
        {
          system: false,
          id: 'nqbakzy9',
          name: 'lastEdited',
          type: 'date',
          required: true,
          unique: false,
          options: {
            min: '',
            max: '',
          },
        },
        {
          system: false,
          id: 'ptoqn1mm',
          name: 'lastAttempted',
          type: 'date',
          required: false,
          unique: false,
          options: {
            min: '',
            max: '',
          },
        },
        {
          system: false,
          id: 'mzmpciq6',
          name: 'color',
          type: 'text',
          required: true,
          unique: false,
          options: {
            min: null,
            max: null,
            pattern: '',
          },
        },
      ],
      indexes: [],
      listRule: null,
      viewRule: null,
      createRule: null,
      updateRule: null,
      deleteRule: null,
      options: {},
    });

    return Dao(db).saveCollection(collection);
  },
  (db) => {
    const dao = new Dao(db);
    const collection = dao.findCollectionByNameOrId('u9pul9c8rrrq201');

    return dao.deleteCollection(collection);
  },
);
