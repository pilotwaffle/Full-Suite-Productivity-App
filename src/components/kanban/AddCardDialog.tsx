'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { KanbanFormData, KanbanCard, KanbanStatus } from '@/types/kanban'
import { kanbanFormSchema } from '@/lib/validators'
import { useKanban } from '@/hooks/useKanban'
import { Modal, ModalFooter } from '@/components/shared/Modal'
import { Input } from '@/components/shared/Input'
import { Textarea } from '@/components/shared/Textarea'
import { Select } from '@/components/shared/Select'
import { Button } from '@/components/shared/Button'

interface AddCardDialogProps {
  isOpen: boolean
  onClose: () => void
  status: KanbanStatus
  editCard?: KanbanCard | null
}

export function AddCardDialog({
  isOpen,
  onClose,
  status,
  editCard,
}: AddCardDialogProps) {
  const { addCard, updateCard } = useKanban()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<KanbanFormData>({
    resolver: zodResolver(kanbanFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'medium',
    },
  })

  // Populate form when editing
  useEffect(() => {
    if (editCard) {
      setValue('title', editCard.title)
      setValue('description', editCard.description || '')
      setValue('priority', editCard.priority)
      if (editCard.dueDate) {
        setValue('dueDate', new Date(editCard.dueDate))
      }
    } else {
      reset()
    }
  }, [editCard, setValue, reset])

  const onSubmit = (data: KanbanFormData) => {
    if (editCard) {
      updateCard(editCard.id, {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate ? data.dueDate.getTime() : undefined,
      })
    } else {
      addCard(data, status)
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
      title={editCard ? 'Edit Card' : 'Add New Card'}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input
            label="Title"
            {...register('title')}
            error={errors.title?.message}
            placeholder="Enter card title"
          />

          <Textarea
            label="Description"
            {...register('description')}
            error={errors.description?.message}
            placeholder="Add a description (optional)"
          />

          <Select
            label="Priority"
            {...register('priority')}
            error={errors.priority?.message}
            options={[
              { value: 'low', label: 'Low Priority' },
              { value: 'medium', label: 'Medium Priority' },
              { value: 'high', label: 'High Priority' },
            ]}
          />

          <Input
            label="Due Date"
            type="date"
            {...register('dueDate', {
              setValueAs: (v) => (v ? new Date(v) : undefined),
            })}
            error={errors.dueDate?.message}
          />
        </div>

        <ModalFooter className="mt-6 -mx-6 -mb-4">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            {editCard ? 'Save Changes' : 'Add Card'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}
