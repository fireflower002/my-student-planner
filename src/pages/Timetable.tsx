import { useState } from 'react';
import { Clock, Plus, Edit, Trash2, MapPin, User, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock timetable data
const timetableData = {
  Monday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', room: 'A-101', instructor: 'Dr. Smith', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Physics', room: 'B-204', instructor: 'Prof. Johnson', type: 'Lecture' },
    { time: '2:00 PM - 3:30 PM', subject: 'Computer Science', room: 'C-301', instructor: 'Dr. Brown', type: 'Practical' },
  ],
  Tuesday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Chemistry', room: 'Lab-A', instructor: 'Dr. Wilson', type: 'Lab' },
    { time: '11:00 AM - 12:30 PM', subject: 'English', room: 'A-205', instructor: 'Ms. Davis', type: 'Tutorial' },
    { time: '2:00 PM - 3:30 PM', subject: 'Mathematics', room: 'A-101', instructor: 'Dr. Smith', type: 'Tutorial' },
  ],
  Wednesday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Physics', room: 'B-204', instructor: 'Prof. Johnson', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Computer Science', room: 'C-301', instructor: 'Dr. Brown', type: 'Lecture' },
    { time: '2:00 PM - 4:00 PM', subject: 'Physics Lab', room: 'Lab-B', instructor: 'Prof. Johnson', type: 'Lab' },
  ],
  Thursday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Mathematics', room: 'A-101', instructor: 'Dr. Smith', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Chemistry', room: 'A-301', instructor: 'Dr. Wilson', type: 'Lecture' },
    { time: '2:00 PM - 3:30 PM', subject: 'English', room: 'A-205', instructor: 'Ms. Davis', type: 'Lecture' },
  ],
  Friday: [
    { time: '9:00 AM - 10:30 AM', subject: 'Computer Science', room: 'C-301', instructor: 'Dr. Brown', type: 'Lecture' },
    { time: '11:00 AM - 12:30 PM', subject: 'Mathematics', room: 'A-101', instructor: 'Dr. Smith', type: 'Tutorial' },
    { time: '2:00 PM - 4:00 PM', subject: 'Chemistry Lab', room: 'Lab-A', instructor: 'Dr. Wilson', type: 'Lab' },
  ],
  Saturday: [],
  Sunday: [],
};

const days = Object.keys(timetableData) as Array<keyof typeof timetableData>;

export default function Timetable() {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'practical':
        return 'bg-success/10 text-success border-success/20';
      case 'lab':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'tutorial':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCurrentDayClasses = () => {
    return timetableData[selectedDay as keyof typeof timetableData] || [];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timetable</h1>
          <p className="text-muted-foreground mt-1">Manage your class schedule</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-secondary rounded-lg p-1">
            <Button
              variant={viewMode === 'weekly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('weekly')}
              className="text-xs"
            >
              Weekly
            </Button>
            <Button
              variant={viewMode === 'daily' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('daily')}
              className="text-xs"
            >
              Daily
            </Button>
          </div>
          <Button className="btn-gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Add Class
          </Button>
        </div>
      </div>

      {viewMode === 'weekly' ? (
        /* Weekly View */
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {days.map((day) => (
            <Card key={day} className="attendance-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{day}</h3>
                <span className="text-xs text-muted-foreground">
                  {timetableData[day].length} classes
                </span>
              </div>
              
              <div className="space-y-2">
                {timetableData[day].length > 0 ? (
                  timetableData[day].map((class_, index) => (
                    <div
                      key={index}
                      className="p-3 bg-secondary/20 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{class_.subject}</h4>
                        <Badge className={`text-xs ${getTypeColor(class_.type)}`}>
                          {class_.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {class_.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {class_.room}
                        </div>
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {class_.instructor}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No classes</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        /* Daily View */
        <div className="space-y-4">
          {/* Day Selector */}
          <Card className="attendance-card">
            <div className="flex flex-wrap gap-2">
              {days.map((day) => (
                <Button
                  key={day}
                  variant={selectedDay === day ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedDay(day)}
                  className="text-sm"
                >
                  {day}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {timetableData[day].length}
                  </Badge>
                </Button>
              ))}
            </div>
          </Card>

          {/* Selected Day Schedule */}
          <Card className="attendance-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{selectedDay} Schedule</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Class
              </Button>
            </div>

            <div className="space-y-4">
              {getCurrentDayClasses().length > 0 ? (
                getCurrentDayClasses().map((class_, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-secondary/20 rounded-lg border border-border/50 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="w-2 h-16 bg-primary rounded-full mr-4"></div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{class_.subject}</h3>
                        <Badge className={getTypeColor(class_.type)}>
                          {class_.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {class_.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {class_.room}
                        </div>
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          {class_.instructor}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-danger hover:text-danger">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No classes scheduled</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {selectedDay === 'Saturday' || selectedDay === 'Sunday' 
                      ? `${selectedDay} is a day off` 
                      : `No classes scheduled for ${selectedDay}`}
                  </p>
                  <Button className="btn-gradient-primary">
                    <Plus className="w-4 h-4 mr-2" />
                    Add First Class
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}