  const express = require('express')
  const mongoose = require('mongoose'); 
  const bodyParser = require('body-parser');
  const path = require('path');
  const Document = require('./models/Document');
  const MedCard = require('./models/patient'); 
  const User = require('./models/user'); 
  const session = require('express-session'); 
  const app = express();  
  const bcrypt = require('bcrypt');  
  const passport = require('passport');   
  const LocalStrategy = require('passport-local').Strategy;
  const PORT = process.env.PORT || 3000;
  const flash = require('connect-flash');


  // Middleware        
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'views'))); 
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  app.use(flash());
  app.use(passport.initialize()); 
  app.set('views', './views');
  app.set('view engine', 'ejs');  
  

  // Routes
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Вхід',
    });   
  });

  app.get('/base-card', async (req, res) => {
    try {   
      const medcards = await MedCard.find({});
      res.render( 
        'base-card', { medcards }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });

  app.get('/base-all', async (req, res) => {
    try {   
      const medcards = await MedCard.find({});
      res.render( 
        'main', { medcards }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });

  app.get('/base-car', async (req, res) => {
    try {   
      const medcards = await MedCard.find({});
      res.render( 
        'main', { medcards }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });

  app.get('/base-cart', async (req, res) => {
    try {   
      const medcards = await MedCard.find({});
      res.render( 
        'main', { medcards }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });

  app.get('/base-work', async (req, res) => {
    try {   
      const medcards = await MedCard.find({});
      res.render( 
        'main', { medcards }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });

  app.get('/base', async (req, res) => {
    try {   
      const medcards = await MedCard.find({});
      res.render( 
        'base', { medcards },  
      ); 
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  });

  app.get('/filling', (req, res) => {
    res.render('pages/filling');
  }); 

  app.get('/filling-all', (req, res) => {  
      res.render('pages/filling-all');  
  });

  app.get('/filling-cart', (req, res) => {  
    res.render('pages/filling-cart');   
  });

  app.get('/filling-car', (req, res) => {  
    res.render('pages/filling-car');  
  });

  app.get('/filling-work', (req, res) => {  
    res.render('pages/filling-work');  
  });

  app.get('/base-all', (req, res) => {  
    res.render('base-all');  
  });

  app.get('/base-cart', (req, res) => {  
    res.render('base-cart');  
  });

  app.get('/base-card', (req, res) => {  
    res.render('base-card');  
  });

  app.get('/base-car', (req, res) => {  
    res.render('base-car');  
  });

  app.get('/main', (req, res) => {
    if (req.isAuthenticated()) { 
      res.render('main');
    } else { 
      res.redirect('/login');
    }
  });

  app.get('/register', function(req, res) {
    res.render('register', {
      title: 'Реєстрація',
    });
  });  

  app.get('/documents', async (req, res) => {
    try {
      const documents = await Document.find();
      res.render('pages/documents', { documents });
    } catch (err) { 
      console.error(err);
      res.status(500).send('Server Error');
    }
  });     
      
  app.get('/public/base.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/public/base.js'); 
  });  

  app.get('/public/documents.js', function(req, res) {
    res.setHeader('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/public/documents.js'); 
  });  

  app.get('/', function(req, res) {
    res.render('main'); 
  });

  app.get('/submit', function(req, res) {
    res.render('main'); 
  }); 

  app.get('/login', function(req, res){
    res.render('main')
  })

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  function(req, username, password, done) {
    User.findOne({ username: username })
      .then(user => {
        if (user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          const newUser = new User();
          newUser.username = username;
          newUser.password = newUser.encryptPassword(password);
          newUser.save()
            .then(() => done(null, newUser))
            .catch(err => done(err));
        }
      })
      .catch(err => done(err));
  }));

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true 
  },

  async function(req, username, password, done) {
    try {
      const existingUser = await User.findOne({ username });
      if (!existingUser) {
        return done(null, false, req.flash('loginMessage', 'No user found.'));
      } 
      const passwordMatch = await existingUser.verifyPassword(password);
      if (!passwordMatch) {
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
      }
      return done(null, existingUser);
    } catch (err) {
      return done(err);
    }
  })); 

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/main', 
    failureRedirect: '/index',
    failureFlash: true
  }));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', 
    failureRedirect: '/register',
    failureFlash: true
  })); 

  app.post('/submit', async (req, res) => {
    try { 
      const data = req.body; 
      const medcards = new MedCard(data);
      await medcards.save();
      res.render('base-card', { medcards });     
    } catch (err) {
      console.error(err);
      res.sendStatus(500);  
    }
  });

  app.post('/base-all', async (req, res) => {
    try { 
      const data = req.body;
      const medcards = new MedCard(data);
      await medcards.save();
      res.render('base-all', { medcards });     
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });   

  app.post('/base-work', async (req, res) => {
    try { 
      const data = req.body;
      const medcards = new MedCard(data);
      await medcards.save();
      res.render('base-work', { medcards });     
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });  

  app.post('/base-car', async (req, res) => {
    try { 
      const data = req.body;
      const medcards = new MedCard(data);
      await medcards.save();
      res.render('base-car', { medcards });     
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });  

  app.post('/base-cart', async (req, res) => {
    try { 
      const data = req.body;
      const medcards = new MedCard(data);
      await medcards.save();
      res.render('base-cart', { medcards });     
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });   


  // Database connection
  mongoose.connect('mongodb+srv://olsojokey:8ENJHgkV0LGHLgeM11111@cluster0.hfye4rb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  }).catch((err) => {
    console.error(err);
  });


  // Test database query
  Document.find()
    .then((documents) => console.log(documents))
    .catch((error) => console.error(error)); 