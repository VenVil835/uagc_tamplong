import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import dayjs from "dayjs";

function formatTimeTo12Hour(time: string): string {
  // Tries both 24h and already formatted 12h inputs
  return dayjs(time, ["HH:mm", "hh:mm A"]).format("hh:mm A");
}
interface Props {
  onClose: () => void;
  onSave: (schedule: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
}


export default function ScheduleModal({ onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSave = () => {
    if (!title || !date || !startTime || !endTime) return;
    onSave({ title, date, startTime: formatTimeTo12Hour(startTime), endTime: formatTimeTo12Hour(endTime), });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 text-1xl">
      <div className="bg-white dark:bg-black border rounded-lg shadow-lg p-6 w-[400px] relative">
        <button onClick={onClose} className="absolute top-3 right-3">
          <X className="w-5 h-5 cursor-pointer" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Set Schedule</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Schedule Title"
            className="w-full border rounded-md p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="date"
            className="w-full border rounded-md p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="time"
              className="w-1/2 border rounded-md p-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              type="time"
              className="w-1/2 border rounded-md p-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-primary text-white py-2 rounded-md cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  );
}
