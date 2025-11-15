import {
  addWeeks,
  subWeeks,
  format,
  startOfWeek,
  addMonths,
  subMonths
} from '../src/utils/dates'

describe('Date Utilities', () => {
  const baseDate = new Date('2024-01-15T12:00:00') // Monday, January 15, 2024

  describe('Week Navigation', () => {
    it('adds weeks correctly', () => {
      const result = addWeeks(baseDate, 1)
      expect(result.getDate()).toBe(22) // Monday, January 22, 2024
      expect(result.getMonth()).toBe(0) // January
      expect(result.getFullYear()).toBe(2024)
    })

    it('subtracts weeks correctly', () => {
      const result = subWeeks(baseDate, 1)
      expect(result.getDate()).toBe(8) // Monday, January 8, 2024
      expect(result.getMonth()).toBe(0) // January
      expect(result.getFullYear()).toBe(2024)
    })

    it('handles zero weeks', () => {
      const result = addWeeks(baseDate, 0)
      expect(result.getTime()).toBe(baseDate.getTime())
    })

    it('handles negative weeks', () => {
      const result = addWeeks(baseDate, -1)
      expect(result.getDate()).toBe(8) // Same as subWeeks(baseDate, 1)
    })

    it('handles multiple weeks', () => {
      const result = addWeeks(baseDate, 4)
      expect(result.getDate()).toBe(12) // Monday, February 12, 2024
      expect(result.getMonth()).toBe(1) // February
    })
  })

  describe('Month Navigation', () => {
    it('adds months correctly', () => {
      const result = addMonths(baseDate, 1)
      expect(result.getMonth()).toBe(1) // February
      expect(result.getDate()).toBe(15) // Same day
      expect(result.getFullYear()).toBe(2024)
    })

    it('subtracts months correctly', () => {
      const result = subMonths(baseDate, 1)
      expect(result.getMonth()).toBe(11) // December
      expect(result.getDate()).toBe(15) // Same day
      expect(result.getFullYear()).toBe(2023)
    })

    it('handles year boundary when adding months', () => {
      const decDate = new Date('2023-12-15T12:00:00')
      const result = addMonths(decDate, 1)
      expect(result.getMonth()).toBe(0) // January
      expect(result.getFullYear()).toBe(2024)
      expect(result.getDate()).toBe(15) // Same day
    })

    it('handles year boundary when subtracting months', () => {
      const janDate = new Date('2024-01-15T12:00:00')
      const result = subMonths(janDate, 1)
      expect(result.getMonth()).toBe(11) // December
      expect(result.getFullYear()).toBe(2023)
      expect(result.getDate()).toBe(15) // Same day
    })
  })

  describe('Date Formatting', () => {
    it('formats month-year correctly', () => {
      const result = format(baseDate, 'MMMM yyyy')
      expect(result).toBe('January 2024')
    })

    it('formats day-month correctly', () => {
      const result = format(baseDate, 'MMM d')
      expect(result).toBe('Jan 15')
    })

    it('formats day-month-year correctly', () => {
      const result = format(baseDate, 'MMM d, yyyy')
      expect(result).toBe('Jan 15, 2024')
    })

    it('handles different date formats', () => {
      const result = format(baseDate, 'yyyy-MM-dd')
      expect(result).toBe('2024-01-15')
    })
  })

  describe('Week Start Calculation', () => {
    it('calculates week start correctly for Sunday', () => {
      const result = startOfWeek(baseDate, { weekStartsOn: 0 })
      expect(result.getDay()).toBe(0) // Sunday
      expect(result.getDate()).toBe(14) // January 14, 2024 (Sunday before Monday 15th)
    })

    it('maintains proper week structure', () => {
      const sunday = new Date('2024-01-14T12:00:00') // Sunday
      const result = startOfWeek(sunday, { weekStartsOn: 0 })
      expect(result.getTime()).toBe(sunday.getTime()) // Same day
    })
  })
})