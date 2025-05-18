const path = require('path');
const supabaseClient = require('@supabase/supabase-js');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/profile', async (req, res) => {
    console.log('Attempting to GET all profile usernames')

    const { data, error } = await supabase.from('profile').select('*');

    if(error) {
        console.log(`Error: ${error}`);
        res.send(error);
    }

    res.send(data)
})

//API - Attempts to add new profile
app.post('/profile', async (req, res) => {
    console.log('Adding profile...')

    console.log(req.body);
    const profileUser = req.body.profileUser;

    const { data, error } = await supabase
    .from('profile')
    .insert({ profile: profileUser })
    .select();

    if(error) {
        console.log(`Error: ${error}`);
        res.send(error);
    }

    res.send(data);
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});