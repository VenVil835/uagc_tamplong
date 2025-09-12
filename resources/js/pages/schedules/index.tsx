"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import ScheduleModal from "./ScheduleModal";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import DateScheduleModal from "./DateScheduleModal";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Schedules',
        href: '/schedules',
    },
];
interface Schedule {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
}

function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      title: "Psychological Testing",
      date: "2025-08-05",
      startTime: "09:00 AM",
      endTime: "11:00 AM",
    },
    {
      id: 2,
      title: "Career Counseling",
      date: "2025-08-12",
      startTime: "02:00 PM",
      endTime: "03:30 PM",
    },
    {
      id: 3,
      title: "Academic Advising",
      date: "2025-08-19",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

  const [selectedDateSchedules, setSelectedDateSchedules] = useState<Schedule[]>([]);
  const [showDateModal, setShowDateModal] = useState(false);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  // Fill leading empty days
  for (let i = 0; i < startDay; i++) currentWeek.push(null);

  // Fill days of month
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill trailing empty days
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
  }

  const handleAddSchedule = (newSchedule: Schedule) => {
    setSchedules((prev) => [...prev, { ...newSchedule, id: prev.length + 1 }]);
  };

  const handleEventClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailsModal(true);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">University Schedules</h1>
            <p className="text-gray-500 text-sm">
              Assessment and Guidance Center Calendar
            </p>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2 text-white cursor-pointer" />
            Set Schedule
          </Button>
        </div>

        {/* Top Schedule Cards */}
        <div className="overflow-x-auto">
  <div className="flex gap-4 pb-2">
    {schedules.map((s) => (
      <Card
        key={s.id}
        className="min-w-[220px] p-4 border rounded-xl shadow-sm bg-white flex-shrink-0"
      >
        <h3 className="font-semibold text-gray-800 mb-1">{s.title}</h3>
        <p className="text-xs text-gray-500 mb-2">Session</p>
        <p className="font-medium text-sm text-gray-700">
          {new Date(s.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
        <p className="text-xs text-gray-600">
          {s.startTime} - {s.endTime}
        </p>
      </Card>
    ))}
  </div>
</div>

        {/* Calendar */}
        <Card className="p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft />
            </Button>
            <h2 className="text-lg font-semibold">
              {monthName} {year}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight />
            </Button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 text-center font-medium text-gray-600 mb-2 text-sm">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Days */}
          {/* Calendar Days */}
<div className="grid grid-cols-7 gap-px border border-gray-200 bg-gray-200">
  {weeks.map((week, wi) =>
    week.map((day, di) => {
      if (!day) {
        // Empty placeholder for days outside current month
        return (
          <div
            key={`${wi}-${di}`}
            className="bg-gray-50 h-28 p-2 text-sm"
          />
        );
      }

      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const daySchedules = schedules.filter((s) => s.date === dateStr);

      return (
        <div
          key={`${wi}-${di}`}
          className="bg-white h-28 p-2 text-sm relative cursor-pointer hover:bg-gray-50"
          onClick={() => {
            setSelectedDateSchedules(daySchedules);
            setShowDateModal(true);
          }}
        >
          {/* Date number */}
          <span className="absolute top-1 right-2 text-gray-500">{day}</span>

          {/* Preview schedules (max 2) */}
          <div className="mt-5 space-y-1">
            {daySchedules.slice(0, 2).map((s) => (
              <div
                key={s.id}
                className="text-xs bg-red-100 text-red-700 p-1 rounded truncate"
              >
                {s.title}
              </div>
            ))}

            {/* Show +more if more than 2 */}
            {daySchedules.length > 2 && (
              <p className="text-[10px] text-blue-600">+ more</p>
            )}
          </div>
        </div>
      );
    })
  )}
</div>

        </Card>
      </div>

      {/* Modals */}
      {showModal && (
        <ScheduleModal
          onClose={() => setShowModal(false)}
          onSave={handleAddSchedule}
        />
      )}

      {showDetailsModal && selectedSchedule && (
        <ScheduleDetailsModal
          schedule={selectedSchedule}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {showDateModal && (
      <DateScheduleModal
        open={showDateModal}
        onClose={() => setShowDateModal(false)}
        schedules={selectedDateSchedules}
      />
      )}

    </>
  );
}

export default function Index() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <CalendarPage />
    </AppLayout>
  );
}
