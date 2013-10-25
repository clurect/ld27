# Ten Second Ninja (TSN)
## Getting Started:

### LimeJS 

#### Installation
This game was made with the LimeJS game framework, thus is it needed.
Go to <https://github.com/digitalfruit/limejs> and follow his instructions to install.

#### Configuration
1. bin/lime.py init (if you haven't already)
2. Add "../tsn" or the absolute pathname to the "tsn" folder to the bin/projects file on a blank line. 

### Installation 
1. Checkout code into the same directory of your LimeJS framework. There should be two folders "limejs" and "tsn".
2. Go to the tsn folder.
3. ./build.sh

### Installation - Advanced
1. Set the path in limejs/bin/projects to the absolute path of "tsn".
2. Go to limejs/
3. bin/lime.py build tsn -o ../tsn/compiled/tsn.js -a
3.1. See <http://www.limejs.com/7-building> for more options.
4. Go to tsn/
5. cp -r assets bin/
6. cp tsn.html bin/

### Running
1. Go to the tsn/bin folder.
2. Open tsn.html.
