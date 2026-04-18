const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
}

});

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;