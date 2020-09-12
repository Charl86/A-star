# Introduction
<img align="right" src="gallery/Path_Found_Gif.gif" height="200">

In this project I attempt to implement the graph traversal and path search A* Algorithm, in order to find the most optimal path between two points in a plane, programmed in JavaScript and using p5.js library for graphical display.


# Index
- [About](#About)
- [Installation](#Installation)
- [Resources](#Resources)
- [Gallery](#Gallery)
- [Licence](#Licence)

# About
A* is an informed search algorithm (also known as best-first search algorithm). This means that it makes use of a grid of weighted points, or nodes. Each node, given a starting node, has a score associated with it, related to values like the least distance travelled, shortest time, etc. The algorithm takes this score into account and chooses which nodes to go through, until the goal node has been reached or no suitable paths have been found. A* was created with the goal of building a mobile robot that could plan ahead a set of actions to take, as part of the Shakey project.

# Installation
In order to run the program, one must generate p5.js libraries and then copy the content of the repository into the generated libraries directory. One can set up a local server and serve the `sketch.js` file and watch the algorithm run on localhost, assuming depencencies are installed.
- If starting from scratch with no dependencies, make sure that you have Node.js installed.

For Ubuntu-based systems, one can install Node.js with the package manager by executing the following commands in the terminal:
```
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

If using macOS, from the terminal, type in the following commands to install Node.js:
```
brew update
brew install node
```
Once Node.js is installed, you can optionally install and use `http-server` to set up a local server. In order to install it single user and make it globally available, [make sure to export an npm-global directory](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally). Then, the following command should run with no errors:
```
npm install http-server -g
```

In order to install `p5.js`, run the following command:
```
npm install p5-manager -g
```
Now, one can execute the following command in order to generate a directory with `p5.js` libraries. Make sure to type in a name for directory:
```
p5 generate --bundle <directory name>
```
Copy the files from the repository into this newly created directory, and serve the `sketch.js` file using a localhost. If using `http-server`, simply by typing:
```
http-server
```
in the command line and clicking on the server link will serve the `sketch.js` file and run the program.

# Resources
- [A* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm) (Wikipedia)
- [Coding Challenge 51.1: A* Pathfinding Algorithm - Part 1](https://www.youtube.com/watch?v=aKYlikFAV4k) (The Coding Train)
- [Node.js](https://nodejs.org/)

# Gallery

![Path Found](gallery/Path_Found.png)

![Path Found Dark Theme](gallery/Path_Found_Dark.png)

![No Solution](gallery/No_Solution.png)

![Path Found Gif](gallery/Path_Found_Gif.gif)
