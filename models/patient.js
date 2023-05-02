const mongoose = require('mongoose');
const express = require('express');  

const app = express();


const MedCard = mongoose.model('MedCard', { 
    patient_code: String,
    date: String,
    last_name: String,
    first_name: String,
    middle_name: String,
    sex: String,
    Birthday: String,
    city: String,
    street: String,
    work: String,
    email: String,
    phone_number: String, 
    contingent: String,
    select_sex: String,
    certification: String, 
    taken: String,
    about: String,
    removed: String,
    reason: String, 

    all_number: String, 

    cart_identification_code: String,   
    cart_take: String,      
    cart_date: String,  
    
    car_series: String,
    car_number: String,   
    car_city: String,
    car_group: String,
    car_rezus: String,
    car_issued: String, 
    car_valid: String,
    car_categories: String,
    car_chairman: String,
    work_series: String,
    work_number: String, work_surname: String, work_number_cart: String, work_top: String, work_issued: String, work_reason: String,
  });  

  
module.exports = MedCard;        
 