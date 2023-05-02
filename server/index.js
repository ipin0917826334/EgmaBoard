const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const topicsRouter = require('./routes/topics');

const app = express();
app.use(express.json());

app.use(cors());
app.use('/api/topics', topicsRouter);

mongoose.connect('mongodb://63070049:Asd04140@ac-hf8gfdn-shard-00-00.rliflax.mongodb.net:27017,ac-hf8gfdn-shard-00-01.rliflax.mongodb.net:27017,ac-hf8gfdn-shard-00-02.rliflax.mongodb.net:27017/?ssl=true&replicaSet=atlas-va9ist-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
