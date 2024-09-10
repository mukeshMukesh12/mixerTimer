# Egg Timer Project

## Overview

The Egg Timer Project is a web-based application that allows users to manage multiple timers for boiling eggs to various levels of doneness (soft-boiled, medium-boiled, and hard-boiled). Users can select a timer, start it, and reset it as needed.

## Features

- Select from different types of egg boiling timers: Soft-Boiled, Medium-Boiled, and Hard-Boiled.
- Timer displays and progresses through various stages (e.g., Boiling Water, Boil the Egg, Cool Egg).
- Countdown functionality with progress bars indicating each stage.
- Ability to start, pause, and reset the timer.

## Usage

1. **Select a Timer**: Use the dropdown menu to choose the type of egg you want to cook.
2. **Start the Timer**: Click the "Start" button to begin the timer. The progress bars will update as the timer progresses through each stage.
3. **Reset the Timer**: Click the "Reset" button to stop the timer and reset the progress.

## Code Overview

- **`index.html`**: Contains the structure of the page.
- **`styles.css`**: Styles for the timer and progress bars.
- **`script.js`**: JavaScript code managing the timer logic and UI interactions.

### `script.js` Functions

- `createMixtureTimer(ID, element)`: Creates and initializes the timer elements.
- `hasClass(el, cls)`: Checks if an element has a specific class.
- `selectMixer(element)`: Returns the timer configuration based on the selected egg type.
- `update(element)`: Updates the UI and starts the timer based on the selected product.
- `countdown(wrapperId, playbtnId, resetbtnId)`: Manages the countdown functionality and progress updates.
- `createProgress(element, array)`: Creates progress bars for each stage of the timer.
