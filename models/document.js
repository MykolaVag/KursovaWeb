const mongoose = require('mongoose');     
const express = require('express');  

const app = express();


const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },     
    title5: {
        type: String,
        required: true
      },  
    title11: {
        type: String,
        required: true
      },
    title14: {
        type: String,
        required: true
      }, 
    title19: {
        type: String,
        required: true
      },  
    content: {
        type: String,
        required: true
      }, 
});

const pages = [
  { name: 'checkbox1', path: '/filling' },
  { name: 'checkbox2', path: '/filling-all' },
  { name: 'checkbox3', path: '/filling-cart' },
  { name: 'checkbox4', path: '/filling-car' },
  { name: 'checkbox5', path: '/filling-work' },        
];

const Document = mongoose.model('Documents', documentSchema);
 
module.exports = Document;
 
