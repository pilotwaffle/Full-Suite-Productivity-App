import { render, screen, fireEvent, act } from '@testing-library/react'
import { WeekView } from '../src/components/calendar/WeekView'
import { CalendarEvent } from '../src/types/calendar'

// Mock the classnames utility
jest.mock('../src/utils/classnames', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' ')
}))

describe('WeekView', () => {
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      startDate: new Date('2024-01-15T10:00:00'),
      endDate: new Date('2024-01-15T11:00:00'),
      color: '#3b82f6'
    },
    {
      id: '2',
      title: 'Lunch with Client',
      startDate: new Date('2024-01-16T12:00:00'),
      endDate: new Date('2024-01-16T13:00:00'),
      color: '#10b981'
    }
  ]

  const mockOnDayClick = jest.fn()
  const mockOnEventClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders Sunday-Saturday header correctly', () => {
    const testDate = new Date('2024-01-15') // Monday Jan 15, 2024
    render(
      <WeekView
        currentDate={testDate}
        events={[]}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    const headers = screen.getAllByText(/Sun|Mon|Tue|Wed|Thu|Fri|Sat/)
    expect(headers).toHaveLength(7)
  })

  it('renders time slots from 06:00 to 22:00', () => {
    const testDate = new Date('2024-01-15')
    render(
      <WeekView
        currentDate={testDate}
        events={[]}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    const timeSlots = screen.getAllByText(/(06:00|07:00|08:00|09:00|10:00|11:00|12:00|13:00|14:00|15:00|16:00|17:00|18:00|19:00|20:00|21:00|22:00)/)
    expect(timeSlots).toHaveLength(17)
  })

  it('displays events in correct time slots', () => {
    const testDate = new Date('2024-01-15') // Monday
    render(
      <WeekView
        currentDate={testDate}
        events={mockEvents}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    // Team meeting should appear on Monday at 10:00
    const teamMeeting = screen.getByText('Team Meeting')
    expect(teamMeeting).toBeInTheDocument()

    // Lunch meeting should appear on Tuesday at 12:00
    const lunchMeeting = screen.getByText('Lunch with Client')
    expect(lunchMeeting).toBeInTheDocument()
  })

  it('calls onDayClick when day header is clicked', () => {
    const testDate = new Date('2024-01-15')
    render(
      <WeekView
        currentDate={testDate}
        events={[]}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    const mondayHeader = screen.getByText('Mon')
    fireEvent.click(mondayHeader)

    expect(mockOnDayClick).toHaveBeenCalledWith(expect.any(Date))
  })

  it('calls onEventClick when event is clicked', () => {
    const testDate = new Date('2024-01-15')
    render(
      <WeekView
        currentDate={testDate}
        events={mockEvents}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    const teamMeeting = screen.getByText('Team Meeting')
    fireEvent.click(teamMeeting)

    expect(mockOnEventClick).toHaveBeenCalledWith(mockEvents[0])
  })

  it('handles events correctly when multiple events in same hour', () => {
    const multipleEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Event 1',
        startDate: new Date('2024-01-15T14:00:00'),
        endDate: new Date('2024-01-15T15:00:00'),
        color: '#3b82f6'
      },
      {
        id: '2',
        title: 'Event 2',
        startDate: new Date('2024-01-15T14:00:00'),
        endDate: new Date('2024-01-15T15:00:00'),
        color: '#10b981'
      }
    ]

    const testDate = new Date('2024-01-15')
    render(
      <WeekView
        currentDate={testDate}
        events={multipleEvents}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    // Both events should be visible
    expect(screen.getByText('Event 1')).toBeInTheDocument()
    expect(screen.getByText('Event 2')).toBeInTheDocument()
  })

  it('renders in dark mode correctly', () => {
    const testDate = new Date('2024-01-15')
    render(
      <WeekView
        currentDate={testDate}
        events={mockEvents}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    // Check for dark mode classes in the container
    const container = screen.getByRole('grid')
    expect(container).toHaveClass('dark:bg-slate-900')
    expect(container).toHaveClass('dark:border-slate-700')
  })

  it('handles week navigation correctly', () => {
    const testDate = new Date('2024-01-15') // Monday
    render(
      <WeekView
        currentDate={testDate}
        events={mockEvents}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    // Check that it starts on the correct week (Sunday Jan 14 to Saturday Jan 20)
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('truncates long event titles', () => {
    const longTitleEvent: CalendarEvent = {
      id: '1',
      title: 'This is a very long event title that should be truncated',
      startDate: new Date('2024-01-15T10:00:00'),
      endDate: new Date('2024-01-15T11:00:00'),
      color: '#3b82f6'
    }

    const testDate = new Date('2024-01-15')
    render(
      <WeekView
        currentDate={testDate}
        events={[longTitleEvent]}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    const eventTitle = screen.getByText(/This is a very long event title that should be truncated/)
    expect(eventTitle).toBeInTheDocument()
    // Check if it has truncate class
    expect(eventTitle.parentElement).toHaveClass('truncate')
  })

  it('displays no events when none exist', () => {
    const testDate = new Date('2024-01-15')
    render(
      <WeekView
        currentDate={testDate}
        events={[]}
        onDayClick={mockOnDayClick}
        onEventClick={mockOnEventClick}
      />
    )

    // Should not have any event titles
    expect(screen.queryByText(/Team Meeting|Lunch with Client/)).not.toBeInTheDocument()
  })
})