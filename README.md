# The Dojo - Fitness Tracker

A modern, web-based fitness tracker application built with D3.js, Materialize CSS, and Firebase. Track your fitness activities including cycling, running, swimming, and walking.

## Features

- **Multiple Activity Types**: Track cycling, running, swimming, and walking
- **Real-time Data Visualization**: Interactive D3.js charts to visualize your fitness data
- **Cloud Storage**: All activity data is stored in Firebase Firestore
- **Activity Logging**: Easily log distance traveled for each activity

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: [Materialize CSS](https://materializecss.com/) v1.0.0
- **Data Visualization**: [D3.js](https://d3js.org/) v7.9.0
- **Backend**: [Firebase](https://firebase.google.com/)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. The application will automatically connect to the Firebase database using the configured credentials

## Usage

1. **Select an Activity**: Click one of the activity buttons (Cycling, Running, Swimming, Walking)
2. **Log a Distance**: Enter the distance you've completed in the input field
3. **Submit**: The form will save your activity to the database and update the visualization
4. **View Stats**: Your activities are displayed in a real-time chart that updates instantly

## Firebase Configuration

The application uses the following Firebase services:
- **Firestore Database**: Stores activity collection
- **Real-time Updates**: Data syncs automatically when changes are made

To use your own Firebase project:
1. Update the `firebaseConfig` object in `db.js` with your project credentials
2. Ensure your Firestore database has proper read/write permissions

## Dependencies

All dependencies are loaded via CDN:
- Materialize CSS: `https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css`
- D3.js: `https://cdnjs.cloudflare.com/ajax/libs/d3/7.9.0/d3.min.js`
- Firebase SDKs: Loaded from `https://www.gstatic.com/firebasejs/10.12.0/`
