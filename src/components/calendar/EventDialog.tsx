'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarFormData, CalendarEvent } from '@/types/calendar'
import { calendarFormSchema } from '@/lib/validators'
import { useCalendar } from '@/hooks/useCalendar'
import { Modal, ModalFooter } from '@/components/shared/Modal'
import { Input } from '@/components/shared/Input'
import { Textarea } from '@/components/shared/Textarea'
import { Button } from '@/components/shared/Button'

interface EventDialogProps {
  isOpen: boolean
  onClose: () => void
  selectedDate?: Date
  editEvent?: CalendarEvent | null
}

const EVENT_COLORS = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
]

export function EventDialog({
  isOpen,
  onClose,
  selectedDate,
  editEvent,
}: EventDialogProps) {
  const { addEvent, updateEvent } = useCalendar()
  const [selectedColor, setSelectedColor] = useState(EVENT_COLORS[0])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CalendarFormData>({
    resolver: zodResolver(calendarFormSchema),
    defaultValues: {
      title: '',
      description: '',
      allDay: false,
      color: EVENT_COLORS[0],
    },
  })

  const allDay = watch('allDay')

  // Populate form
  useEffect(() => {
    if (editEvent) {
      setValue('title', editEvent.title)
      setValue('description', editEvent.description || '')
      setValue('startDate', new Date(editEvent.startDate))
      setValue('endDate', new Date(editEvent.endDate))
      setValue('allDay', editEvent.allDay)
      const color = editEvent.color || EVENT_COLORS[0]
      setValue('color', color)
      setSelectedColor(color)
    } else if (selectedDate) {
      const start = new Date(selectedDate)
      start.setHours(9, 0, 0, 0)
      const end = new Date(selectedDate)
      end.setHours(10, 0, 0, 0)

      setValue('startDate', start)
      setValue('endDate', end)
      setValue('allDay', false)
      setValue('color', EVENT_COLORS[0])
      setSelectedColor(EVENT_COLORS[0])
    }
  }, [editEvent, selectedDate, setValue])

  const onSubmit = (data: CalendarFormData) => {
    if (editEvent) {
      updateEvent(editEvent.id, {
        title: data.title,
        description: data.description,
        startDate: data.startDate.getTime(),
        endDate: data.endDate.getTime(),
        allDay: data.allDay,
        color: selectedColor,
      })
    } else {
      addEvent({
        ...data,
        color: selectedColor,
      })
    }

    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editEvent ? 'Edit Event' : 'New Event'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            placeholder="Event title"
          />

          <Textarea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
            placeholder="Add a description (optional)"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="allDay"
              {...register('allDay')}
              className="w-4 h-4 text-primary-600 border-slate-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="allDay" className="text-sm font-medium text-slate-700">
              All day
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start"
              type={allDay ? 'date' : 'datetime-local'}
              {...register('startDate', {
                setValueAs: (v) => (v ? new Date(v) : new Date()),
              })}
              error={errors.startDate?.message}
            />

            <Input
              label="End"
              type={allDay ? 'date' : 'datetime-local'}
              {...register('endDate', {
                setValueAs: (v) => (v ? new Date(v) : new Date()),
              })}
              error={errors.endDate?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Color
            </label>
            <div className="flex gap-2">
              {EVENT_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color)
                    setValue('color', color)
                  }}
                  className={`w-8 h-8 rounded-full transition-all ${
                    selectedColor === color
                      ? 'ring-2 ring-offset-2 ring-primary-500'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          </div>
        </div>

        <ModalFooter className="mt-6 -mx-6 -mb-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            {editEvent ? 'Save Changes' : 'Create Event'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
