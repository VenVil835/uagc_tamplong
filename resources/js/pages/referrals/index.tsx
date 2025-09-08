import { IntakeForm } from './intake-form';
import { useState, useEffect } from 'react';
import { Search, X, Plus, Eye, Edit, Trash2, ChevronDown, Settings2, ChevronLeft, ChevronRight } from 'lucide-react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Referrals',
        href: '/referrals',
    },
];

// Mock data for students
const mockStudents = [
  { id: '2023001', name: 'Mark David Prado', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { id: '2023002', name: 'Maria Santos', image: 'https://images.unsplash.com/photo-1494790108755-2616b2e80e21?w=100&h=100&fit=crop&crop=face' },
  { id: '2023003', name: 'John Cruz', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
  { id: '2023004', name: 'Ana Reyes', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
  { id: '2023005', name: 'Carlos Mendoza', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
];

// Mock referral data - separated by type for incoming and outgoing
const mockReferralsData = {
  incoming: [
    { id: 1, name: 'Mark David Prado', email: 'markdavidprado@gmail.com', program: '8801', role: 'Student', status: 'Pending', type: 'incoming' },
    { id: 2, name: 'Maria Santos', email: 'maria.santos@gmail.com', program: '8802', role: 'Student', status: 'Approved', type: 'incoming' },
    { id: 3, name: 'John Cruz', email: 'john.cruz@gmail.com', program: '8803', role: 'Student', status: 'Rejected', type: 'incoming' },
    { id: 4, name: 'Ana Reyes', email: 'ana.reyes@gmail.com', program: '8804', role: 'Student', status: 'Pending', type: 'incoming' },
    { id: 5, name: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', program: '8805', role: 'Student', status: 'Approved', type: 'incoming' },
  ],
  outgoing: [
    { id: 6, name: 'Lisa Garcia', email: 'lisa.garcia@gmail.com', program: '8806', role: 'Student', status: 'Pending', type: 'outgoing' },
    { id: 7, name: 'Miguel Torres', email: 'miguel.torres@gmail.com', program: '8807', role: 'Student', status: 'Approved', type: 'outgoing' },
    { id: 8, name: 'Sofia Ramirez', email: 'sofia.ramirez@gmail.com', program: '8808', role: 'Student', status: 'Rejected', type: 'outgoing' },
    { id: 9, name: 'Diego Lopez', email: 'diego.lopez@gmail.com', program: '8809', role: 'Student', status: 'Pending', type: 'outgoing' },
    { id: 10, name: 'Carmen Flores', email: 'carmen.flores@gmail.com', program: '8810', role: 'Student', status: 'Approved', type: 'outgoing' },
    { id: 11, name: 'Roberto Silva', email: 'roberto.silva@gmail.com', program: '8811', role: 'Student', status: 'Pending', type: 'outgoing' },
    { id: 12, name: 'Elena Martinez', email: 'elena.martinez@gmail.com', program: '8812', role: 'Student', status: 'Approved', type: 'outgoing' }
  ]
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'program', label: 'Program' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
];

function ReferralsInterface() {
  const [activeTab, setActiveTab] = useState('incoming');
  const [showReferralForm, setShowReferralForm] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [reasonText, setReasonText] = useState('');
  const [natureOfRequest, setNatureOfRequest] = useState('');
  const [modeOfCounseling, setModeOfCounseling] = useState('');
  
  // Pagination and column visibility states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    program: true,
    role: true,
    status: true,
    actions: true
  });
  const [globalFilter, setGlobalFilter] = useState('');
  const [referrals, setReferrals] = useState([]);

  const campusOptions = ['Obrero', 'Mintal', 'Tagum-mabini'];

  // Update referrals when tab changes
  useEffect(() => {
    // In a real implementation, this would be an API call
    setReferrals(mockReferralsData[activeTab]);
    setCurrentPage(1); // Reset to first page when tab changes
  }, [activeTab]);

  // Filter data based on global search
  const filteredData = referrals.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(globalFilter.toLowerCase())
    )
  );

  // Calculate pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filter changes
  const handleGlobalFilterChange = (value) => {
    setGlobalFilter(value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handleColumnVisibilityChange = (columnKey, checked) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: checked
    }));
  };

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleStudentSearch = (value) => {
    setStudentSearch(value);
    if (value.length > 0) {
      const filtered = mockStudents.filter(student => 
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

  const selectStudent = (student) => {
    if (!selectedStudents.find(s => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student]);
    }
    setStudentSearch('');
    setShowSearchResults(false);
  };

  const removeStudent = (studentId) => {
    setSelectedStudents(selectedStudents.filter(s => s.id !== studentId));
  };

  const handleSubmit = () => {
    console.log('Submitting referral:', {
      campus: selectedCampus,
      students: selectedStudents,
      natureOfRequest,
      modeOfCounseling,
      reason: reasonText
    });
    // Reset form
    setSelectedCampus('');
    setSelectedStudents([]);
    setNatureOfRequest('');
    setModeOfCounseling('');
    setReasonText('');
    setShowReferralForm(false);
  };

  if (showReferralForm) {
    return (
      <Dialog open={showReferralForm} onOpenChange={setShowReferralForm}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Referral Form</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Fill this form below and we will get back soon to you for more updates and plan your appointment.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" value="New" disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="campus">Campus</Label>
              <Select value={selectedCampus} onValueChange={setSelectedCampus} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select campus..." />
                </SelectTrigger>
                <SelectContent>
                  {campusOptions.map(campus => (
                    <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="student">Student</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input required
                  id="student"
                  type="text"
                  placeholder="Search student..."
                  value={studentSearch}
                  onChange={(e) => handleStudentSearch(e.target.value)}
                  className="pl-10"
                />
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 bg-background border rounded-b shadow-lg max-h-32 overflow-y-auto z-10">
                    {searchResults.map(student => (
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
                          <div className="text-xs text-muted-foreground">{student.id}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {selectedStudents.length > 0 && (
                <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
                  {selectedStudents.map(student => (
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
                        <div className="text-xs mt-1 max-w-16 truncate">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.id}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label>Nature of Request</Label>
              <RadioGroup value={natureOfRequest} onValueChange={setNatureOfRequest} required>
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
              <RadioGroup value={modeOfCounseling} onValueChange={setModeOfCounseling} required>
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

            <Button onClick={handleSubmit} className="w-full" >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

return (
    <div className="bg-background rounded-lg shadow-sm">
      {/* Header with tabs and create button */}
      <div className="flex items-center justify-between p-4 border-b  overflow-x-auto">
        <div className="flex space-x-1">
          <Button
            onClick={() => setActiveTab('incoming')}
            variant={activeTab === 'incoming' ? 'default' : 'ghost'}
            className={activeTab === 'incoming' ? 'border-b-2 border-primary cursor-pointer' : ''}
          >
            Incoming
          </Button>
          <Button
            onClick={() => setActiveTab('outgoing')}
            variant={activeTab === 'outgoing' ? 'default' : 'ghost'}
            className={activeTab === 'outgoing' ? 'border-b-2 border-primary cursor-pointer' : ''}
          >
            Outgoing
          </Button>
          
        </div>
        <Button className="cursor-pointer" onClick={() => setShowReferralForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Referral
        </Button>
      </div>

      {/* Search bar and controls */}
      <div className="p-4 border-b space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, email, or role..."
              value={globalFilter}
              onChange={(e) => handleGlobalFilterChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {/* Column visibility dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings2 className="mr-2 h-4 w-4" />
                  Columns
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.key}
                    checked={visibleColumns[column.key]}
                    onCheckedChange={(checked) => handleColumnVisibilityChange(column.key, checked)}
                    disabled={column.key === 'actions'} // Always show actions
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rows per page selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows:</span>
              <Select value={rowsPerPage.toString()} onValueChange={handleRowsPerPageChange}>
                <SelectTrigger className="w-16 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-md border-0">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.name && <TableHead>Name ↕</TableHead>}
              {visibleColumns.email && <TableHead>Email ↕</TableHead>}
              {visibleColumns.program && <TableHead>Program</TableHead>}
              {visibleColumns.role && <TableHead>Role</TableHead>}
              {visibleColumns.status && <TableHead>Status</TableHead>}
              {visibleColumns.actions && <TableHead className="text-center">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((referral) => (
                <TableRow key={referral.id}>
                  {visibleColumns.name && <TableCell>{referral.name}</TableCell>}
                  {visibleColumns.email && <TableCell className="text-primary">{referral.email}</TableCell>}
                  {visibleColumns.program && <TableCell>{referral.program}</TableCell>}
                  {visibleColumns.role && <TableCell>{referral.role}</TableCell>}
                  {visibleColumns.status && (
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={
                          referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                          referral.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }
                      >
                        {referral.status}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.actions && (
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive cursor-pointer">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={Object.values(visibleColumns).filter(Boolean).length} className="text-center py-8">
                  No {activeTab} referrals found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 p-4 ">
        {paginatedData.length > 0 ? (
          paginatedData.map((referral) => (
            <div key={referral.id} className="bg-card rounded-lg border p-2 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  {visibleColumns.name && <h3 className="font-medium">{referral.name}</h3>}
                  {visibleColumns.email && <p className="text-sm text-primary">{referral.email}</p>}
                </div>
                {visibleColumns.status && (
                  <Badge 
                    variant="secondary" 
                    className={
                      referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' :
                      referral.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-100' :
                      'bg-red-100 text-red-800 hover:bg-red-100'
                    }
                  >
                    {referral.status}
                  </Badge>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                {visibleColumns.program && (
                  <div>
                    <span className="text-muted-foreground">Program:</span>
                    <p className="font-medium">{referral.program}</p>
                  </div>
                )}
                {visibleColumns.role && (
                  <div>
                    <span className="text-muted-foreground">Role:</span>
                    <p className="font-medium">{referral.role}</p>
                  </div>
                )}
              </div>
              
              {visibleColumns.actions && (
                <div className="flex gap-2 pt-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No {activeTab} referrals found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} {activeTab} referrals
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    onClick={() => goToPage(pageNumber)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [showIntakeForm, setShowIntakeForm] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Referrals" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          
          {!showIntakeForm ? (
            <>
              {/* Default view with button */}
              <div className="flex justify-end p-2">
                <Button onClick={() => setShowIntakeForm(true)}>
                  Go to Intake Form
                </Button>
              </div>
              <ReferralsInterface />
            </>
          ) : (
            <>
              {/* Intake Form view with back button */}
              <div className="flex justify-end p-2">
                <Button variant="outline" onClick={() => setShowIntakeForm(false)}>
                  Back to Referrals
                </Button>
              </div>
              <IntakeForm />
            </>
          )}

        </div>
      </div>
    </AppLayout>
  );
}