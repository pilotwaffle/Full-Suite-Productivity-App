# Productivity Suite

A modern, full-featured productivity application built with Next.js 14, featuring a Kanban board, todo list, and calendar. **Now available as a Progressive Web App (PWA)** - install it on any device!

## 🚀 Live Demo

**[View Live App on Vercel →](https://full-suite-productivity.vercel.app)**

### 📱 Install as PWA

**iOS/Safari:** Tap Share → Add to Home Screen
**Android/Chrome:** Tap Menu → Install App
**Desktop:** Click install icon (⊕) in address bar

## Features

### Core Features
- **📋 Todo List**: Create, edit, and manage tasks with priority levels and filtering
- **🎯 Kanban Board**: Drag-and-drop cards across customizable columns (To Do, In Progress, Done)
- **📅 Calendar**: Month view calendar with event creation and management
- **🌙 Dark Mode**: Toggle between light and dark themes with persistent preference

### PWA Features ✨ NEW
- **📲 Installable**: Works like a native app on any device
- **⚡ Offline Support**: Access your data without internet connection
- **🏠 Home Screen**: Add to home screen for quick access
- **🚀 Fast Loading**: Cached assets for instant startup
- **🔄 Auto Updates**: Seamlessly updates in the background
- **🔒 Secure**: All data stays on your device

### Technical Features
- **💾 Local Storage**: All data persists in browser localStorage
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🎨 Modern UI**: Clean, professional design with subtle animations
- **♿ Accessible**: WCAG compliant with proper contrast ratios

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Drag & Drop**: @dnd-kit
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Date Utilities**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── calendar/    # Calendar feature components
│   ├── kanban/      # Kanban board components
│   ├── layout/      # Layout components
│   ├── shared/      # Reusable UI components
│   └── todos/       # Todo list components
├── hooks/           # Custom React hooks
├── lib/             # Utilities and constants
├── types/           # TypeScript type definitions
└── utils/           # Helper functions
```

## Features in Detail

### Todo List
- Add, edit, and delete todos
- Mark tasks as complete
- Filter by All, Active, or Completed
- Priority levels (Low, Medium, High)
- Optional descriptions

### Kanban Board
- Drag and drop cards between columns
- Reorder cards within columns
- Set due dates and priorities
- Edit and delete cards
- Visual priority indicators

### Calendar
- Month view with week grid
- Create and edit events
- All-day or timed events
- Color-coded events
- Click any day to create an event
- View multiple events per day

### Dark Mode
- Toggle button in top-right corner (moon/sun icon)
- Smooth transitions between light and dark themes
- Preference saved to localStorage
- Respects system preference on first visit
- All components fully themed for both modes

## Data Storage

All data is stored in browser localStorage with:
- Automatic versioning for future migrations
- Cross-tab synchronization
- Debounced writes for performance
- Error handling and recovery

## Progressive Web App (PWA)

This app is a fully-featured PWA that can be installed on any device. See [PWA_GUIDE.md](./PWA_GUIDE.md) for complete documentation.

### Installation

**Mobile (iOS/Android):**
1. Open the app in your browser
2. Follow the browser's "Add to Home Screen" prompts
3. Launch from your home screen like a native app

**Desktop (Windows/Mac/Linux):**
1. Visit the app in Chrome/Edge
2. Click the install icon (⊕) in the address bar
3. App opens in its own window

### Offline Support

- All features work offline
- Data syncs when you're back online
- Service worker caches app for fast loading
- Automatic updates when new versions deploy

### Requirements

- HTTPS connection (provided by Vercel)
- Modern browser with PWA support:
  - Chrome 40+
  - Safari 11.3+
  - Firefox 44+
  - Edge 17+

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
