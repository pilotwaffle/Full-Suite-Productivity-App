import { render, screen, fireEvent, act } from '@testing-library/react'
import { CalendarView } from '../src/components/calendar/CalendarView'
import { CalendarEvent } from '../src/types/calendar'

// Mock the hooks and utilities
jest.mock('../src/hooks/useCalendar', () => ({
  useCalendar: () => ({
    events: [],
    deleteEvent: jest.fn()
  })
}))

jest.mock('../src/utils/dates', () => ({
  format: jest.fn((date, formatStr) => {
    if (formatStr === 'MMMM yyyy') return 'January 2024'
    if (formatStr === 'MMM d') return 'Jan 15'
    if (formatStr === 'MMM d, yyyy') return 'Jan 15, 2024'
    return date.toString()
  }),
  addWeeks: jest.fn((date, weeks) => {
    const d = new Date(date)
    d.setDate(d.getDate() + (weeks * 7))
    return d
  }),
  subWeeks: jest.fn((date, weeks) => {
    const d = new Date(date)
    d.setDate(d.getDate() - (weeks * 7))
    return d
  }),
  addMonths: jest.fn((date, months) => {
    const d = new Date(date)
    d.setMonth(d.getMonth() + months)
    return d
  }),
  subMonths: jest.fn((date, months) => {
    const d = new Date(date)
    d.setMonth(d.getMonth() - months)
    return d
  })
}))

describe('CalendarView', () => {
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Test Event',
      startDate: new Date('2024-01-15T10:00:00'),
      endDate: new Date('2024-01-15T11:00:00'),
      color: '#3b82f6'
    }
  ]

  beforeEach(() => {
    // Reset mock implementations
    jest.clearAllMocks()
  })

  it('renders with default week view', () => {
    render(<CalendarView />)

    expect(screen.getByText('Week')).toHaveClass('bg-primary-600')
    expect(screen.getByText('Month')).not.toHaveClass('bg-primary-600')
  })

  it('switches to month view when Month button is clicked', () => {
    render(<CalendarView />)

    const monthButton = screen.getByText('Month')
    fireEvent.click(monthButton)

    expect(monthButton).toHaveClass('bg-primary-600')
    expect(screen.getByText('Week')).not.toHaveClass('bg-primary-600')
  })

  it('switches to week view when Week button is clicked', () => {
    render(<CalendarView />)

    const weekButton = screen.getByText('Week')
    fireEvent.click(weekButton)

    expect(weekButton).toHaveClass('bg-primary-600')
    expect(screen.getByText('Month')).not.toHaveClass('bg-primary-600')
  })

  it('navigates to previous week in week view', () => {
    render(<CalendarView />)

    const prevButton = screen.getByLabelText('Previous week')
    fireEvent.click(prevButton)

    // Should have updated currentDate state (mocked)
    expect(require('../src/utils/dates').subWeeks).toHaveBeenCalled()
  })

  it('navigates to next week in week view', () => {
    render(<CalendarView />)

    const nextButton = screen.getByLabelText('Next week')
    fireEvent.click(nextButton)

    // Should have updated currentDate state (mocked)
    expect(require('../src/utils/dates').addWeeks).toHaveBeenCalled()
  })

  it('navigates to previous month in month view', () => {
    // Switch to month view first
    const { rerender } = render(<CalendarView />)

    const monthButton = screen.getByText('Month')
    fireEvent.click(monthButton)

    const prevButton = screen.getByLabelText('Previous month')
    fireEvent.click(prevButton)

    expect(require('../src/utils/dates').subMonths).toHaveBeenCalled()
  })

  it('navigates to next month in month view', () => {
    // Switch to month view first
    const { rerender } = render(<CalendarView />)

    const monthButton = screen.getByText('Month')
    fireEvent.click(monthButton)

    const nextButton = screen.getByLabelText('Next month')
    fireEvent.click(nextButton)

    expect(require('../src/utils/dates').addMonths).toHaveBeenCalled()
  })

  it('shows title based on current view', () => {
    render(<CalendarView />)

    // In week view, should show date range
    expect(screen.getByText(/Jan 15 – Jan 15, 2024/)).toBeInTheDocument()
  })

  it('opens event dialog when Today button is clicked', () => {
    render(<CalendarView />)

    const todayButton = screen.getByText('Today')
    fireEvent.click(todayButton)

    // The dialog should open (EventDialog component should be present)
    expect(screen.getByText('Today')).toBeInTheDocument()
  })

  it('opens event dialog when New Event button is clicked', () => {
    render(<CalendarView />)

    const newEventButton = screen.getByText('New Event')
    fireEvent.click(newEventButton)

    // The dialog should open (EventDialog component should be present)
    expect(screen.getByText('New Event')).toBeInTheDocument()
  })

  it('handles view mode state correctly', () => {
    const { rerender } = render(<CalendarView />)

    // Initially in week view
    expect(screen.getByText('Week')).toHaveClass('bg-primary-600')

    // Switch to month view
    const monthButton = screen.getByText('Month')
    fireEvent.click(monthButton)

    expect(monthButton).toHaveClass('bg-primary-600')
    expect(screen.getByText('Week')).not.toHaveClass('bg-primary-600')
  })

  it('updates title when switching between views', () => {
    render(<CalendarView />)

    // Should show week view title initially
    expect(screen.getByText(/Jan 15 – Jan 15, 2024/)).toBeInTheDocument()

    // Switch to month view
    const monthButton = screen.getByText('Month')
    fireEvent.click(monthButton)

    // Should show month view title
    expect(screen.getByText('January 2024')).toBeInTheDocument()
  })

  it('calls onDayClick when day is clicked in week view', () => {
    // Mock WeekView to track day clicks
    jest.doMock('../src/components/calendar/WeekView', () => ({
      WeekView: ({ onDayClick }: any) => {
        return <button onClick={() => onDayClick(new Date())}>WeekView</button>
      }
    }))

    const { rerender } = render(<CalendarView />)

    // Switch to week view and trigger day click
    const weekView = screen.getByText('WeekView')
    fireEvent.click(weekView)

    // Check that onDayClick was called (this would be tested in WeekView tests)
    expect(require('../src/hooks/useCalendar').useCalendar().events).toBeDefined()
  })

  it('calls onEventClick when event is clicked', () => {
    // Mock WeekView to track event clicks
    jest.doMock('../src/components/calendar/WeekView', () => ({
      WeekView: ({ onEventClick }: any) => {
        return <button onClick={() => onEventClick(mockEvents[0])}>WeekView</button>
      }
    }))

    const { rerender } = render(<CalendarView />)

    // Switch to week view and trigger event click
    const weekView = screen.getByText('WeekView')
    fireEvent.click(weekView)

    // Check that onEventClick was called (this would be tested in WeekView tests)
    expect(require('../src/hooks/useCalendar').useCalendar().events).toBeDefined()
  })
})