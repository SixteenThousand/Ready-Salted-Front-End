# Ready-Salted: The Game
*Prepare to get salty!*
In Ready Salted, you play as a plucky little bag of crisps, just trying to 
get some flavour & recognition from the Hungry Humans that come to eat you. 
The aim of the game is to catch the correct ingredients for your flavour of 
crisp, but be careful! Ingredients of the wrong flavour are also falling, 
and the Hungry Humans will not appreciate a bag of the wrong kind of crisps!

You have 5 crisps in your bag (you are a “fun size” packet). As ingredients 
fall, swipe up/down/left/right to move yourself under those ingredients! Try 
to catch ones that match your bag’s flavour, matched as follows:

- Ready Salted - Salt
- Cheese & Onion- Onion
- Prawn Cocktail - Prawn
- Tomato - Tomato
- Smoky Bacon - Bacon

(Bad items being the wrong ingredients)

As you catch ingredients, your crisps will get flavoured, which is shown on 
the bar on the bottom right <!--[MAYBE SHOW PIC OF BAR HERE]-->. Ticks mean 
that crisp’s flavour matches your bag, crosses mean they don’t. At random, a 
Hungry Human will reach down to get a bag of crisps. This is your moment. 
Get yourself beneath the hand in time and you’ll get points, but be careful! 
You only get points for the crisps that have the flavour that matches your 
bag! Once your crisps have been eaten, you will be reincarnated as a new 
bag! With a different flavour!! Then the cycle continues, forever, or until 
the timer stops, whichever is sooner.

The indicator at the bottom left tells you what new flavour you will become 
after being devoured.

In the settings menu you can change parts of the game difficulty, including 
board size & hand dropping frequency.

In single player as the timer goes on the speed of the falling ingredients 
increases as well as the speed of the Hungry human hand, which will 
gradually increase difficulty.

This game is served by the backend found here: https://github.com/141Soft/be-ready-salted


## Developer Setup Notes
After cloning, run
```
npx expo start
```
and select the option given for your system (android, iOS, or web).
You will need to have a mobile development environment setup already if 
you're running this on android or iOS.

You may also find you need to add the `--tunnel` flag if you get a 
connection error on mobile.


## Acknowledgements
This game is being made as a final portfolio piece for the Northcoders 
software development bootcamp 
(https://northcoders.com/our-courses/skills-bootcamp-in-software-development).
We would also like to thank Rakha Wibowo for their excellent YouTube 
tutorial & example project on using React Native with three.js, which served 
as a basis for this project.
Link to their GitHub: https://github.com/Rakha112
Link to their tutorial: https://www.youtube.com/watch?v=iRavet_Zau8&t=35s
