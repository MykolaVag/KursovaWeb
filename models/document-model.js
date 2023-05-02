const Document = require('./models/Document');

const newDocument = new Document({ 
});

newDocument.save()
  .then(() => console.log('Document saved to database.'))
  .catch((error) => console.error(error));