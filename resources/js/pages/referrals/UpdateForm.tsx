// UpdateForm.tsx
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

// Types
interface ReferralData {
  id: number;
  campus: string;
  name: string;
  status: string;
  type: string;
  nature: string;
  mode: string;
  reason: string;
}

interface UpdateFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referral: ReferralData | null;
  campusOptions: string[];
  onSubmit: (data: ReferralData) => void;
}

export default function UpdateForm({
  open,
  onOpenChange,
  referral,
  campusOptions,
  onSubmit,
}: UpdateFormProps) {
  const [formData, setFormData] = useState<ReferralData | null>(referral);

  useEffect(() => {
    if (referral) {
      setFormData(referral);
    }
  }, [referral]);

  const handleChange = (key: keyof ReferralData, value: string) => {
    if (formData) {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      onSubmit(formData);
      onOpenChange(false);
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Referral</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Status</Label>
            <Input value={formData.status} disabled />
          </div>

          <div className="space-y-2">
            <Label>Campus</Label>
            <Select
              value={formData.campus}
              onValueChange={(v) => handleChange("campus", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select campus..." />
              </SelectTrigger>
              <SelectContent>
                {campusOptions.map((campus) => (
                  <SelectItem key={campus} value={campus}>
                    {campus}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Name</Label>
            <Input value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
          </div>

          <div className="space-y-3">
            <Label>Nature of Request</Label>
            <RadioGroup
              value={formData.nature}
              onValueChange={(v) => handleChange("nature", v)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Individual Counseling" id="individual" />
                <Label htmlFor="individual">Individual Counseling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Psychological Testing" id="psychological" />
                <Label htmlFor="psychological">Psychological Testing</Label>
              </div>
            </RadioGroup>

            <Label>Mode of Counseling</Label>
            <RadioGroup
              value={formData.mode}
              onValueChange={(v) => handleChange("mode", v)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Face-to-Face" id="face-to-face" />
                <Label htmlFor="face-to-face">Face-to-face</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Tele-Counseling" id="telecounseling" />
                <Label htmlFor="telecounseling">Tele-Counseling [Online]</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Reason for request / referral:</Label>
            <Textarea
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              className="h-24 resize-none"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full cursor-pointer">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}



