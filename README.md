# Anime Memory Game

This is a simple memory game built with React, where players click on anime character cards, aiming not to click the same card twice to increase their score. The game includes a scoring system, a reset option, and a win condition when players reach a target score.

## Table of Contents

- Features
- Installation
- Usage
- Technologies Used
- Project Structure
- License

## Features

- **Memory Game**: Players click on each card only once to gain points. A repeated click resets the score.
- **Shuffling**: Cards shuffle randomly after each click to increase difficulty.
- **Score Tracking**: Displays current and highest scores.
- **Victory Condition**: Players win when reaching a score of 10.
- **Reset Option**: Button to restart the game and reset scores.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/anime-memory-game.git
   cd anime-memory-game
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the App**:

   ```bash
   npm start
   ```

   The app will run at `http://localhost:3000`.

## Usage

1. Click each card only once.  
2. Track your score and aim to reach a score of 10 without clicking the same card twice.  
3. Use the "Play Again" button if you'd like to reset the game after winning or losing.

## Technologies Used

- **React** - Component-based UI
- **CSS** - Styling for layout and animations
- **GraphQL** - Fetching anime character data from AniList API

## Project Structure

```
├── public
│   └── index.html          # Root HTML file
├── src
│   ├── assets              # Images and loading GIFs
│   ├── components
│   │   └── Cards.jsx       # Main game component
│   ├── App.css             # Global and component-specific styles
│   ├── App.jsx             # Main app component
│   └── index.js            # ReactDOM rendering
└── README.md               # Project documentation
```

## License

This project is licensed under the MIT License. See `LICENSE` for more information.

---

This README provides a comprehensive guide for someone new to your project, covering setup, features, and structure.
