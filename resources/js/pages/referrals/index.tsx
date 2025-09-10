import { IntakeForm } from './IntakeForm';
import { useState, useEffect } from 'react';
import { Search, X, Plus, Eye, Edit, Trash2, ChevronDown, Settings2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ReferralForm from './referralForm';
import { ReferralDetailsModal } from "./ReferralDetailsModal";
import UpdateForm from "./UpdateForm";

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
    { id: 1, campus:'Obrero', name: 'Mark David Prado', email: 'markdavidprado@gmail.com', program: 'BSIT', college: 'CIC', status: 'Pending', type: 'incoming', nature: 'Individual Counseling', mode: 'Face-to-Face', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 2, campus:'Mintal', name: 'Maria Santos', email: 'maria.santos@gmail.com', program: 'BSIT', college: 'CIC', status: 'Approved', type: 'incoming', nature: 'Psychological Testing', mode: 'Tele-Counseling', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 3, campus:'Tagum-Mabini', name: 'John Cruz', email: 'john.cruz@gmail.com', program: 'BSIT', college: 'CIC', status: 'Rejected', type: 'incoming', nature: 'Individual Counseling', mode: 'Face-to-Face', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 4, campus:'Obrero', name: 'Ana Reyes', email: 'ana.reyes@gmail.com', program: 'BSIT', college: 'CIC', status: 'Pending', type: 'incoming', nature: 'Psychological Testing', mode: 'Tele-Counseling', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 5, campus:'Mintal', name: 'Carlos Mendoza', email: 'carlos.mendoza@gmail.com', program: 'BSIT', college: 'CIC', status: 'Approved', type: 'incoming', nature: 'Individual Counseling', mode: 'Face-to-Face', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
  ],
  outgoing: [
    { id: 6, campus:'Obrero', name: 'Lisa Garcia', email: 'lisa.garcia@gmail.com', program: 'BSIT', college: 'CIC', status: 'Pending', type: 'outgoing', nature: 'Psychological Testing', mode: 'Tele-Counseling', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 7, campus:'Mintal', name: 'Miguel Torres', email: 'miguel.torres@gmail.com', program: 'BSIT', college: 'CIC', status: 'Approved', type: 'outgoing', nature: 'Individual Counseling', mode: 'Face-to-Face', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 8, campus:'Tagum-Mabini', name: 'Sofia Ramirez', email: 'sofia.ramirez@gmail.com', program: 'BSIT', college: 'CIC', status: 'Rejected', type: 'outgoing', nature: 'Psychological Testing', mode: 'Tele-Counseling', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 9, campus:'Obrero', name: 'Diego Lopez', email: 'diego.lopez@gmail.com', program: 'BSIT', college: 'CIC', status: 'Pending', type: 'outgoing', nature: 'Individual Counseling', mode: 'Face-to-Face', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 10, campus:'Mintal', name: 'Carmen Flores', email: 'carmen.flores@gmail.com', program: 'BSIT', college: 'CIC', status: 'Approved', type: 'outgoing', nature: 'Psychological Testing', mode: 'Tele-Counseling', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 11, campus:'Tagum-Mabini', name: 'Roberto Silva', email: 'roberto.silva@gmail.com', program: 'BSIT', college: 'CIC', status: 'Pending', type: 'outgoing', nature: 'Individual Counseling', mode: 'Face-to-Face', reason: 'Feeling overwhelmed with academic workload and personal issues.' },
    { id: 12, campus:'Obrero', name: 'Elena Martinez', email: 'elena.martinez@gmail.com', program: 'BSIT', college: 'CIC', status: 'Approved', type: 'outgoing', nature: 'Psychological Testing', mode: 'Tele-Counseling', reason: 'Feeling overwhelmed with academic workload and personal issues.' }
  ]
};

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'program', label: 'Program' },
  { key: 'college', label: 'College' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' }
];

function ReferralsInterface({onProceedToIntake }) {
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [editingReferral, setEditingReferral] = useState<any>(null);

  const handleView = (referral: any) => {
    setSelectedReferral(referral);
    setShowModal(true);
  };
  const [activeTab, setActiveTab] = useState('incoming');
  const [showReferralForm, setShowReferralForm] = useState(false);
  
  // Pagination and column visibility states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    email: true,
    program: true,
    college: true,
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

return (
    <div className="bg-background rounded-lg shadow-sm">
      {/* Header with tabs and create button */}
      <div className="flex items-center justify-between p-4 border-b  overflow-x-auto gap-2">
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
        {/* Referral Form Component */}
        <ReferralForm
          open={showReferralForm}
          onOpenChange={setShowReferralForm}
          campusOptions={campusOptions}
          mockStudents={mockStudents}
          onSubmit={(data) => {
            console.log("Submitting referral:", data);
            setShowReferralForm(false);
          }}
        />
      </div>

      {/* Search bar and controls */}
      <div className="p-4 border-b space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name, email, or college..."
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
              {visibleColumns.college && <TableHead>College</TableHead>}
              {visibleColumns.status && <TableHead>Status</TableHead>}
              {visibleColumns.actions && <TableHead className="text-center">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((referral) => (
                <TableRow key={referral.id}>
                  {visibleColumns.name && <TableCell className="max-w-[120px] truncate">{referral.name}</TableCell>}
                  {visibleColumns.email && <TableCell className="max-w-[120px] truncate text-primary">{referral.email}</TableCell>}
                  {visibleColumns.program && <TableCell className="max-w-[120px] truncate">{referral.program}</TableCell>}
                  {visibleColumns.college && <TableCell className="max-w-[120px] truncate">{referral.college}</TableCell>}
                  {visibleColumns.status && (
                    <TableCell className="whitespace-nowrap">
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
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer"  onClick={() => handleView(referral)}>
                          <Eye className="h-4 w-4" />
                          
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer" onClick={() => { setEditingReferral(referral); setShowUpdateForm(true); }}>
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
                  {visibleColumns.name && <h3 className="font-medium max-w-[120px] truncate">{referral.name}</h3>}
                  {visibleColumns.email && <p className="text-sm text-primary max-w-[120px] truncate">{referral.email}</p>}
                </div>
                {visibleColumns.status && (
                  <Badge 
                    variant="secondary" 
                    className={
                      referral.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 whitespace-nowrap' :
                      referral.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-100 whitespace-nowrap' :
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
                {visibleColumns.college && (
                  <div>
                    <span className="text-muted-foreground">College:</span>
                    <p className="font-medium">{referral.college}</p>
                  </div>
                )}
              </div>
              
              {visibleColumns.actions && (
                <div className="flex gap-2 pt-2">
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleView(referral)}>
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
      {/* Modal for referral details */}
      <ReferralDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onProceed={() => {
          setShowModal(false);
          onProceedToIntake();
        }}
        referral={selectedReferral}
      />
      <UpdateForm
        open={showUpdateForm}
        onOpenChange={setShowUpdateForm}
        referral={editingReferral}
        campusOptions={campusOptions}
        onSubmit={(updatedData) => {
        console.log("Updated referral:", updatedData);
         setShowUpdateForm(false);
        }}
      />
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
              {/* <div className="flex justify-end p-2">
                <Button onClick={() => setShowIntakeForm(true)}>
                  Go to Intake Form
                </Button>
              </div> */}
              <ReferralsInterface onProceedToIntake={() => setShowIntakeForm(true)} />
            </>
          ) : (
            <>
              {/* Intake Form view with back button */}
            
                <Button 
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors self-start"
                  variant="outline" onClick={() => setShowIntakeForm(false)}>
                  <ChevronLeft className="w-4 h-4" />
                  Back to Referrals
                </Button>
             
              <IntakeForm />
            </>
          )}

        </div>
      </div>
    </AppLayout>
  );
}