import { z } from 'zod'

// Todo validation
export const todoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(500),
  description: z.string().max(2000).optional(),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()).optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  completedAt: z.number().optional(),
})

export const todoFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(500, 'Title is too long'),
  description: z.string().max(2000, 'Description is too long').optional(),
  priority: z.enum(['low', 'medium', 'high']),
})

// Kanban validation
export const kanbanCardSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  status: z.enum(['todo', 'in-progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  tags: z.array(z.string()).optional(),
  assignee: z.string().optional(),
  dueDate: z.number().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  order: z.number(),
})

export const kanbanFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(2000, 'Description is too long').optional(),
  priority: z.enum(['low', 'medium', 'high']),
  dueDate: z.date().optional(),
})

// Calendar validation
export const calendarEventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  startDate: z.number(),
  endDate: z.number(),
  allDay: z.boolean(),
  color: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
})

export const calendarFormSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(200, 'Title is too long'),
    description: z.string().max(2000, 'Description is too long').optional(),
    startDate: z.date(),
    endDate: z.date(),
    allDay: z.boolean(),
    color: z.string().optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  })
