import { useState } from 'react';
import { Calendar, Clock, Search, Filter, Plus, CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';

// Mock data
const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'];

const attendanceRecords = [
  { id: 1, date: '2024-01-15', subject: 'Mathematics', status: 'present', time: '9:00 AM' },
  { id: 2, date: '2024-01-15', subject: 'Physics', status: 'absent', time: '11:00 AM' },
  { id: 3, date: '2024-01-14', subject: 'Computer Science', status: 'present', time: '2:00 PM' },
  { id: 4, date: '2024-01-14', subject: 'English', status: 'late', time: '4:00 PM' },
  { id: 5, date: '2024-01-13', subject: 'Chemistry', status: 'present', time: '10:00 AM' },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSubject, setSelectedSubject] = useState<string>('all-subjects');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-danger" />;
      case 'late':
        return <MinusCircle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-success bg-success/10 border-success/20';
      case 'absent':
        return 'text-danger bg-danger/10 border-danger/20';
      case 'late':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch = record.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.date.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    const matchesSubject = selectedSubject === 'all-subjects' || selectedSubject === '' || 
                          record.subject.toLowerCase().replace(' ', '-') === selectedSubject;
    return matchesSearch && matchesStatus && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your class attendance</p>
        </div>
        <Button 
          onClick={() => setShowMarkAttendance(!showMarkAttendance)}
          className="btn-gradient-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Mark Attendance
        </Button>
      </div>

      {/* Mark Attendance Form */}
      {showMarkAttendance && (
        <Card className="attendance-card">
          <h2 className="text-xl font-semibold mb-4">Mark Today's Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Subject</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject.toLowerCase().replace(' ', '-')}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Mark status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-success mr-2" />
                      Present
                    </div>
                  </SelectItem>
                  <SelectItem value="absent">
                    <div className="flex items-center">
                      <XCircle className="w-4 h-4 text-danger mr-2" />
                      Absent
                    </div>
                  </SelectItem>
                  <SelectItem value="late">
                    <div className="flex items-center">
                      <MinusCircle className="w-4 h-4 text-warning mr-2" />
                      Late
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full btn-gradient-success">
                Save Attendance
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Search and Filters */}
      <Card className="attendance-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by subject or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-subjects">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject.toLowerCase().replace(' ', '-')}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Attendance Records */}
      <Card className="attendance-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Attendance Records</h2>
          <div className="text-sm text-muted-foreground">
            Showing {filteredRecords.length} records
          </div>
        </div>

        <div className="space-y-3">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-12 bg-primary rounded-full"></div>
                  <div>
                    <h3 className="font-medium">{record.subject}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(record.date).toLocaleDateString()}
                      <Clock className="w-3 h-3 ml-3 mr-1" />
                      {record.time}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                    {getStatusIcon(record.status)}
                    <span className="ml-1 capitalize">{record.status}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No attendance records found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}