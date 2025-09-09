import { useState } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

type Student = {
  id: string;
  name: string;
  image: string;
};

type ReferralFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campusOptions: string[];
  mockStudents: Student[];
  onSubmit: (data: {
    campus: string;
    students: Student[];
    natureOfRequest: string;
    modeOfCounseling: string;
    reason: string;
  }) => void;
};

export default function ReferralForm({
  open,
  onOpenChange,
  campusOptions,
  mockStudents,
  onSubmit,
}: ReferralFormProps) {
  const [selectedCampus, setSelectedCampus] = useState("");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [searchResults, setSearchResults] = useState<Student[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [reasonText, setReasonText] = useState("");
  const [natureOfRequest, setNatureOfRequest] = useState("");
  const [modeOfCounseling, setModeOfCounseling] = useState("");

  const handleStudentSearch = (value: string) => {
    setStudentSearch(value);
    if (value.length > 0) {
      const filtered = mockStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(value.toLowerCase()) ||
          student.id.includes(value)
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const selectStudent = (student: Student) => {
    if (!selectedStudents.find((s) => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student]);
    }
    setStudentSearch("");
    setShowSearchResults(false);
  };

  const removeStudent = (studentId: string) => {
    setSelectedStudents(selectedStudents.filter((s) => s.id !== studentId));
  };

  const handleSubmit = () => {
    onSubmit({
      campus: selectedCampus,
      students: selectedStudents,
      natureOfRequest,
      modeOfCounseling,
      reason: reasonText,
    });
    // Reset form
    setSelectedCampus("");
    setSelectedStudents([]);
    setNatureOfRequest("");
    setModeOfCounseling("");
    setReasonText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Referral Form</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Fill this form below and we will get back soon to you for more
            updates and plan your appointment.
          </p>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input id="status" value="New" disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campus">Campus</Label>
            <Select
              value={selectedCampus}
              onValueChange={setSelectedCampus}
              required
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
            <Label htmlFor="student">Student</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                required
                id="student"
                type="text"
                placeholder="Search student..."
                value={studentSearch}
                onChange={(e) => handleStudentSearch(e.target.value)}
                className="pl-10"
              />
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 bg-background border rounded-b shadow-lg max-h-32 overflow-y-auto z-10">
                  {searchResults.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => selectStudent(student)}
                      className="p-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                    >
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {student.id}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedStudents.length > 0 && (
              <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                {selectedStudents.map((student) => (
                  <div key={student.id} className="flex-shrink-0 relative">
                    <div className="text-center">
                      <div className="relative">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <Button
                          onClick={() => removeStudent(student.id)}
                          variant="destructive"
                          size="sm"
                          className="absolute -top-0 -right-2 w-5 h-5 rounded-full p-2"
                        >
                          <X size={10} />
                        </Button>
                      </div>
                      <div className="text-xs mt-1 max-w-16 truncate">
                        {student.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {student.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Nature of Request</Label>
            <RadioGroup
              value={natureOfRequest}
              onValueChange={setNatureOfRequest}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual Counseling</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="psychological" id="psychological" />
                <Label htmlFor="psychological">Psychological Testing</Label>
              </div>
            </RadioGroup>
            <Label>Mode of Counseling</Label>
            <RadioGroup
              value={modeOfCounseling}
              onValueChange={setModeOfCounseling}
              required
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="face-to-face" id="face-to-face" />
                <Label htmlFor="face-to-face">Face-to-face</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="telecounseling" id="telecounseling" />
                <Label htmlFor="telecounseling">Tele-Counseling [Online]</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for request / referral:</Label>
            <Textarea
              id="reason"
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="Type your message here."
              className="h-24 resize-none"
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
