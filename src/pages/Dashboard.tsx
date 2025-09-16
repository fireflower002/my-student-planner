import { Calendar, BookOpen, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

// Mock data for demonstration
const attendanceData = [
  { subject: 'Mathematics', present: 28, total: 32, percentage: 87.5 },
  { subject: 'Physics', present: 22, total: 30, percentage: 73.3 },
  { subject: 'Chemistry', present: 25, total: 28, percentage: 89.3 },
  { subject: 'Computer Science', present: 30, total: 32, percentage: 93.8 },
  { subject: 'English', present: 18, total: 26, percentage: 69.2 },
];

const todaysTimetable = [
  { time: '9:00 AM', subject: 'Mathematics', room: 'A-101', type: 'Lecture' },
  { time: '11:00 AM', subject: 'Physics Lab', room: 'Lab-B', type: 'Practical' },
  { time: '2:00 PM', subject: 'Computer Science', room: 'C-204', type: 'Lecture' },
  { time: '4:00 PM', subject: 'English', room: 'A-205', type: 'Tutorial' },
];

export default function Dashboard() {
  const overallAttendance = attendanceData.reduce((acc, curr) => acc + curr.percentage, 0) / attendanceData.length;
  const totalNotes = 24;
  const lowAttendanceCount = attendanceData.filter(sub => sub.percentage < 75).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John! Here's your academic overview.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today's Date</p>
          <p className="font-semibold">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="dashboard-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Attendance</p>
              <p className="text-2xl font-bold text-foreground">{overallAttendance.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <Progress 
              value={overallAttendance} 
              className="h-2"
            />
          </div>
        </Card>

        <Card className="dashboard-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Notes</p>
              <p className="text-2xl font-bold text-foreground">{totalNotes}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-xs text-success mt-2">+3 notes this week</p>
        </Card>

        <Card className="dashboard-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Classes</p>
              <p className="text-2xl font-bold text-foreground">{todaysTimetable.length}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Next: Mathematics at 9:00 AM</p>
        </Card>

        <Card className="dashboard-stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Attendance</p>
              <p className="text-2xl font-bold text-danger">{lowAttendanceCount}</p>
            </div>
            <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-danger" />
            </div>
          </div>
          <p className="text-xs text-danger mt-2">{lowAttendanceCount > 0 ? 'Subjects below 75%' : 'All subjects good'}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <Card className="attendance-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Subject Attendance</h2>
            <Button variant="outline" size="sm">View Details</Button>
          </div>
          <div className="space-y-4">
            {attendanceData.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <span className={`text-sm font-semibold ${
                    subject.percentage >= 85 ? 'text-success' :
                    subject.percentage >= 75 ? 'text-warning' : 'text-danger'
                  }`}>
                    {subject.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{subject.present}/{subject.total} classes</span>
                </div>
                <Progress 
                  value={subject.percentage} 
                  className={`h-2 ${
                    subject.percentage >= 85 ? '[&>*]:attendance-progress-good' :
                    subject.percentage >= 75 ? '[&>*]:attendance-progress-warning' : '[&>*]:attendance-progress-danger'
                  }`}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Today's Timetable */}
        <Card className="attendance-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Today's Schedule</h2>
            <Button variant="outline" size="sm">Full Timetable</Button>
          </div>
          <div className="space-y-3">
            {todaysTimetable.map((class_, index) => (
              <div key={index} className="flex items-center p-3 bg-secondary/30 rounded-lg border border-border/50">
                <div className="w-2 h-12 bg-primary rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm">{class_.subject}</h3>
                      <p className="text-xs text-muted-foreground">{class_.room} • {class_.type}</p>
                    </div>
                    <span className="text-xs font-medium text-primary">{class_.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="attendance-card">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="btn-gradient-primary h-auto p-4 flex flex-col items-center space-y-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Mark Attendance</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm">Add Note</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm">View Timetable</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm">View Reports</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}