export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  calendarStartDay: 0 | 1
  dateFormat: string
  timeFormat: '12h' | '24h'
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  calendarStartDay: 0,
  dateFormat: 'MM/dd/yyyy',
  timeFormat: '12h',
}
