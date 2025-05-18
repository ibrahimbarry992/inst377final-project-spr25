# inst377-finalproject-spr25

Title: Steam Companion App 
Description: A website that allows the user who game on their computers to input their own personalized Steam API Key, as well as a Steam user ID (instructions on the About page for accessing both)to check the amount of time they have spent on their top games, as well as showing them the top games that they have played within a recent amount of time.
Description of Target Browsers: Preferrably Google Chrome. If you are on MacOS then Safari works as well.
Link to API: https://steamapi.xpaw.me/#

# Developer Manual

The dependencies needed are:
- Supabase
- Dotenv
- Node.js
- Express
- Chart.js
- Simple Slider
These work in tandem to provide the user a seamless experience when navigating through the website. Since the code is written on EJS instead of HTML, which work better with server-based websites, Express is an essential framework for backend development as it allows for middleware to be easier to manuever. As for the API, I used SteamAPI, which is linked above. The endpoints I used were "IPlayerService" which retrieves statistics on the games played such as time spent, as well as top games. All the GET and POST retrieve and send Steam profile information. 

For future development, I really want to implement a better way for on-site API key input. That way developers wouldn't need to go through the code itself to change the API key and Steam user ID.