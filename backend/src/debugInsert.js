const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/video_app')
  .then(async () => {
    console.log('Connected');

    const TestSchema = new mongoose.Schema({ name: String });
    const Test = mongoose.model('Test', TestSchema);

    await Test.create({ name: 'debug-test' });

    console.log('Document inserted');
    process.exit(0);
  })
  .catch(console.error);
