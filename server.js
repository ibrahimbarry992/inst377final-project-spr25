const path = require('path');
const supabaseClient = require('@supabase/supabase-js');
const express = require('express');
const dotenv = require('dotenv');

const app = express();


//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

//Supabase
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseURL, supabaseKey);

//Routes to different pages
app.get('/', (req, res) => {
  res.render('steamapp');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/games', (req, res) => {
  res.render('games');
});

//API - Attempts to get profiles from Supabase
app.get('/api/profile', async (req, res) => {
 
  const { data, error } = await supabase.from('profile').select('*');

  if (error) {
    console.error(`Error: ${error}`); 
    return res.status(500).send(error); 
  }

  res.status(200).json(data);
});

//API - Attempts to add new profile
app.post('/api/profile', async (req, res) => {
 
  const profileUser = req.body.profileUser;

  const { data, error } = await supabase
    .from('profile')
    .insert({ profile: profileUser })
    .select();

  if (error) {
    console.error(`Error: ${error}`); 
    return res.status(500).send(error); 
  }

  res.status(201).json(data); 
});

module.exports = async (req, res) => {
  try {
    app(req, res);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
