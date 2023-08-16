const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Configuration
const dbURI = 'mongodb+srv://anniagg2003:annanay@cluster0.81ccs6o.mongodb.net/';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Routes
const testRoutes = require('./routes/questionroutes');

app.use('/api/tests', testRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
