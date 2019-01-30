# Milestone Project 2 – Pokémon Dashboard
## by Sophie King

# CREATE A DATA DASHBOARD
This is a one page dashboard displaying various interesting visual snippets of information relating to Pokemnon and Pokemon Go. This information is both useful and interesting to players of the game.
The brief for the project was

•	Build a data dashboard that visualizes a dataset of your choice

•	Your data can be stored locally (e.g., in a js file) or sourced from an API

•	Visualise your data using D3.js and dc.js


## UX
### User Stories
As a user I want to find out how many shiny Pokemon are available compared to how many I have.

As a user I want to know how many Pokemon will be released in generations 4-7. I expect this to be displayed clearly with proper labels.

As a user, I want to be able to see how many Pokemon are available from eggs. I would like to be able to click on the egg distance and see which regions the pokemon are from.

As a user, I would like to see what the most popular type of pokemon is.

As a user, I want to be able to view the dashboard on a variety of different screen sizes.

I made an original mockup of the design using Balsamiq. This gave me a good idea of where I wanted to position certain things, although I changed this during the process of creating the website to make the project more aesthetically pleasing.

![Mockup screenshot1](https://github.com/sophieroseking/milestone-one/blob/master/assets/mockup/screenshot1.png "Mockup screenshot1")
![Mockup screenshot2](https://github.com/sophieroseking/milestone-one/blob/master/assets/mockup/screenshot1.png "Mockup screenshot2")


## Features

### Features Left to Implement
An idea I would like to include is a scatter plot showing whether there is any correlation between level 1 min and max CP OR Level 1 min CP and Level 40 Max CP.
It would be nice to have a reset button for when bars and slices have been highlighted.


## Technolgies used:

### HTML 5
Used to give structure and content to the page

### CSS3
Used to give styling to the page

### Bootstrap v4.2.1
Used for its grid system to help in design going from mobile to larger displays.
Bootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery. [https://getbootstrap.com/]

### Crossfilter
I used crossfilter to make it easy to group and filter my data

### D3.js, DC.js
I used D3 and DC to create the charts on my website from my csv file by manipulating the data in my csv file.

### Font awesome
I used Font awesome for my social media and some title icons

### Google fonts
I picked Monsterrat by Julieta Ulanovsky for my website font as it is clear with good spacing.


## Testing
I have tested the page using google developer tools. Any console errors were dealt with and none remain in the deployed site.
I wanted to ensure that users get the best possible experience on all screen sizes. I used the Bootstrap grid system to achieve this, although some of the charts are not as responsive as I might like them to be (the scatter plot is the least visually appealing when viewing on a mobile). I didn’t like the way two of the number display charts were displaying in mobile view, so I hid them in screen sizes smaller than large. I also added a note to the scatter plot to advise viewers it is best viewed on a larger screen size.
I used the W3 verifier to check my code and fixed one error in the CSS code.
I ensured the charts were linked by clicking on different elements to see if the other charts changed accordingly.


## Deployment
The website has been deployed via GitHub pages, it can be found [here.](https://sophieroseking.github.io/pokedashboard/)


## Credits
Reddit user **u/Zifendale** had uploaded a Pokedex spreadsheet that I manipulated to get the data I wanted for my dashboard and pushed into a csv file.
