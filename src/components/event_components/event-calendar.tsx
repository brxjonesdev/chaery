'use client'
import React, { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  add,
  addDays,
} from 'date-fns'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Event } from './events'
import { Button } from '../ui/button'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import trash from '@/public/trash.svg'
import { createBrowserClient } from '@supabase/ssr'
import { toast } from 'sonner'

function Calendar({ events, chaerylink }: { events: Event[]; chaerylink: string }) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [eventData, setEventData] = useState<Event[]>(events)
  const debugFunction = () => {
    console.log(events, 'events')
    console.log(selectedDate, 'selectedDate')
  }

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="text-gray-600">
          &lt;
        </button>
        <span className="text-lg font-semibold">{format(currentDate, 'MMMM yyyy')}</span>
        <button onClick={nextMonth} className="text-gray-600">
          &gt;
        </button>
      </div>
    )
  }

  const renderDays = () => {
    const dateFormat = 'EEE'
    const days = []
    let startDate = startOfWeek(currentDate)

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="flex justify-center items-center text-gray-600 w-1/7">
          {format(startDate, dateFormat)}
        </div>,
      )
      startDate = new Date(addDays(startDate.getTime(), 1)) // Adding one day
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = eachDayOfInterval({ start: startDate, end: endDate })

    while (days.length > 0) {
      rows.push(
        <div className="grid grid-cols-7" key={days[0].toString()}>
          {days.slice(0, 7).map((day, index) => renderCell(day as unknown as string, index.toLocaleString()))}
        </div>,
      )
      days = days.slice(7)
    }

    return <div>{rows}</div>
  }

  const renderCell = (day: string, index: string) => {
    const isToday = isSameDay(day, new Date())
    const isSelected = selectedDate && isSameDay(day, selectedDate)
    const hasEvent = eventData?.some((event) => isSameDay(new Date(event.date), day))

    return (
      <div
        key={index}
        className={`flex justify-center items-center cursor-pointer px-2 py-4 sm:py-6 rounded-md
         ${
           isSameMonth(day, currentDate) ? '' : 'text-gray-400'
         } ${isToday ? 'bg-cherry_light-600' : ''} ${isSelected ? 'bg-cherry_light-700 border border-white-100' : ''} ${
           hasEvent ? 'bg-cherry_light-900' : ''
         }`}
        onClick={() => handleDayClick(day)}
      >
        {format(day, 'd')}
      </div>
    )
  }

  const nextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))
  }

  const handleDayClick = (day: any) => {
    setSelectedDate(day)
  }

  const deleteEvent = async () => {
    const filteredEvents = eventData?.filter((event) => !isSameDay(new Date(event.date), selectedDate))
    console.log(filteredEvents, 'filteredEvents')

    const { data, error } = await supabase
      .from('Relationships')
      .update({
        couples_events: filteredEvents,
      })
      .eq('chaery_link_id', chaerylink)
    setEventData(filteredEvents)

    if (error) {
      console.error(error)
    } else {
      toast.success('Event deleted successfully')
    }
  }

  const renderEventsForSelectedDate = () => {
    if (!selectedDate) return null

    const filteredEvents = eventData?.filter((event) => isSameDay(new Date(event.date), selectedDate))

    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Events for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {filteredEvents?.length === 0 && <p>No events for this date</p>}
              <ul className="list-disc ml-6">
                {filteredEvents.map((event, index) => (
                  <li key={index} className="text-sm hover:text-cher">
                    {event.title} @ {event.start_time} - {event.end_time}
                  </li>
                ))}
              </ul>
              {filteredEvents?.length !== 0 && (
                <Image
                  src={trash}
                  alt="delete"
                  className="h-4 w-4 cursor-pointer hover:bg-cherry_light-300 rounded-md"
                  onClick={deleteEvent}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <section className="w-full">
      <div className="w-full p-4 bg-white rounded shadow mb-4">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {/* 
    show events for selected date
    */}
      {events ? renderEventsForSelectedDate() : null}
      {/* <Button onClick={debugFunction}>Debug</Button> */}
    </section>
  )
}

export default Calendar
