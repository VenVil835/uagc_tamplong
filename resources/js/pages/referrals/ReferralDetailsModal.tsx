import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ReferralDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  referral: {
    status: string;
    type: string;
    campus: string;
    name: string;
    email: string;
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
            <p><span className="font-semibold">Status:</span> <span className={
                          referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                          referral.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }>{referral.status}</span></p>
            <p><span className="font-semibold">Type:</span> {referral.type}</p>
            <p><span className="font-semibold">Campus:</span> {referral.campus}</p>
            <p><span className="font-semibold">Student:</span> {referral.name}</p>
            <p><span className="font-semibold ">Email:</span> {referral.email}</p>
            <br />
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
