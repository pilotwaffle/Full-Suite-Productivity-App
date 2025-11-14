# Productivity Suite

A modern, full-featured productivity application built with Next.js 14, featuring a Kanban board, todo list, and calendar.

## 🚀 Live Demo

**[View Live App on Vercel →](https://full-productivity-app.vercel.app)**

## Features

- **📋 Todo List**: Create, edit, and manage tasks with priority levels and filtering
- **🎯 Kanban Board**: Drag-and-drop cards across customizable columns (To Do, In Progress, Done)
- **📅 Calendar**: Month view calendar with event creation and management
- **🌙 Dark Mode**: Toggle between light and dark themes with persistent preference
- **💾 Local Storage**: All data persists in browser localStorage
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Modern UI**: Clean, professional design with subtle animations

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

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
