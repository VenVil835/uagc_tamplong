import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReferralDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  referral: {
    status: string;
    campus: string;
    student: string;
    nature: string;
    mode: string;
    reason: string;
  } | null;
}

export function ReferralDetailsModal({ isOpen, onClose, onProceed, referral }: ReferralDetailsModalProps) {
  if (!referral) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Referral Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Your referral was acknowledged by the UAGC Counselor.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <p><span className="font-semibold">Status:</span> <span className="text-green-600">{referral.status}</span></p>
            <p><span className="font-semibold">Campus:</span> {referral.campus}</p>
            <p><span className="font-semibold">Student:</span> {referral.student}</p>
            <p><span className="font-semibold">Nature of request:</span> {referral.nature}</p>
            <p><span className="font-semibold">Mode of counseling:</span> {referral.mode}</p>
          </div>
          <div>
            <p className="font-semibold text-sm">Reason for request / referral:</p>
            <p className="p-2 border rounded bg-gray-50 text-sm">{referral.reason}</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="secondary" onClick={onClose}>Decline</Button>
          <Button variant="destructive" onClick={onProceed}>Proceed</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
