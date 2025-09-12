import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
            <div key={s.id} className="border rounded-md p-3 bg-gray-50">
              <h3 className="font-medium">{s.title}</h3>
              <p className="text-sm text-gray-600">
                {s.startTime} - {s.endTime}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
