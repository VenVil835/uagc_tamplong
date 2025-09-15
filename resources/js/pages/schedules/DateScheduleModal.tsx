import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dayjs from "dayjs";

interface Schedule {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  schedules: Schedule[];
}

function formatTimeTo12Hour(time: string): string {
  // Tries both 24h and already formatted 12h inputs
  return dayjs(time, ["HH:mm", "hh:mm A"]).format("hh:mm A");
}

export default function DateScheduleModal({ open, onClose, schedules }: Props) {
  if (schedules.length === 0) return null;

  const dateLabel = new Date(schedules[0].date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-x-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedules for {dateLabel}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {schedules.map((s) => (
            <div key={s.id} className="border rounded-md p-3">
              <h3 className="font-medium text-1xl">{s.title}</h3>
              <p className="text-sm text-1xl">
                {formatTimeTo12Hour(s.startTime)} - {formatTimeTo12Hour(s.endTime)}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
