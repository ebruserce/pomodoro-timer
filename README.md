# Pomogrowo: A Goal-Based Pomodoro Focus Website
---
My first personal web project! My goals with this project were to gain experience using React and Typescript, get an introduction to TailwindCSS, and create a fullstack project with API integration. I'm a big user of Pomodoro, and I wanted to see what it would be like if I made my own version of it!

Built using React + Typescript + Vite, and TailwindCSS

### Current Features:
- Timer Display
  - displays remaining time in current Pomodoro/Break session
  - Start/Pause button
  - Reset and Skip buttons appear when timer is running
- Settings
  - user can adjust pomodoro and break lengths
  - user can set a goal for the number of pomodoros they want to complete in this session
- Progress Indicator
  - green tomatoes turn red as the user completes their pomodoros
- Completion Page
  - congratulates user for meeting their goal!
  - option to restart session

### Current Goals:
- Complete CSS Formatting
- Todoist API integration
  - user can log into their Todoist account and see their todo list
  - stats about how many/which tasks were completed are displayed
- Tomato growth animation
  - As the user works towards their goal number of pomodoros, a tomato plant on screen grows until reaching full growth at the end! Meant to be a fun element of motivation for users :D
- Saving state
  - reloading the page does not undo the changes and progress

### Northstar Vision:
- User login
- Spotify API integration
  - User can pick playlist to play by default during pomodoro and break sessions
  - stats about number of songs/minutes listened to are displayed
- Sound effects for timer 
- Animations for clicking settings button, progress indicator
- Show user history and stats
  - number of times goals were met
  - public ranking of productivity among friends
- Allow users to add friends, social media element
- Allow more customization for the user (themes, colors, sounds, short/long breaks)

### For Developers:

#### Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/ebruserce/pomodoro-timer.git
   cd pomodoro-timer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (default Vite port).

#### Project Structure

- `src/` - Main source code (React + TypeScript)
  - `components/` - Reusable UI components
  - `assets/` - Assets
- `public/` - Static assets

#### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run linter

#### Contributing

1. Fork the repository and create your branch:
   ```bash
   git checkout -b feature/your-feature
   ```
2. Make your changes and commit:
   ```bash
   git commit -m "Add your feature"
   ```
3. Push and open a pull request.

#### Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS, Vite
- **API Integration:** (Planned) Todoist, Spotify

#### Notes

- Please follow the existing code style and naming conventions.
- Open issues for bugs or feature requests.
- PRs are welcome!
