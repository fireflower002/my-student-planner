import { useState } from 'react';
import { Search, Plus, FileText, Image, Download, Edit, Trash2, Star, Clock, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock data
const notes = [
  {
    id: 1,
    title: 'Calculus Integration Techniques',
    subject: 'Mathematics',
    content: 'Detailed notes on various integration methods including substitution, parts, and partial fractions...',
    attachments: [
      { name: 'integration_examples.pdf', type: 'pdf', size: '2.3 MB' },
      { name: 'formula_sheet.jpg', type: 'image', size: '1.2 MB' }
    ],
    tags: ['calculus', 'integration', 'formulas'],
    createdAt: '2024-01-15',
    lastModified: '2024-01-16',
    starred: true,
  },
  {
    id: 2,
    title: 'Quantum Physics Fundamentals',
    subject: 'Physics',
    content: 'Introduction to quantum mechanics, wave-particle duality, and Heisenberg uncertainty principle...',
    attachments: [
      { name: 'quantum_diagrams.png', type: 'image', size: '850 KB' }
    ],
    tags: ['quantum', 'mechanics', 'physics'],
    createdAt: '2024-01-14',
    lastModified: '2024-01-14',
    starred: false,
  },
  {
    id: 3,
    title: 'Data Structures and Algorithms',
    subject: 'Computer Science',
    content: 'Comprehensive guide to arrays, linked lists, stacks, queues, trees, and graph algorithms...',
    attachments: [
      { name: 'algorithm_complexity.pdf', type: 'pdf', size: '1.8 MB' },
      { name: 'code_examples.txt', type: 'document', size: '45 KB' }
    ],
    tags: ['algorithms', 'data-structures', 'programming'],
    createdAt: '2024-01-13',
    lastModified: '2024-01-15',
    starred: true,
  },
];

const subjects = [
  { label: 'All Subjects', value: 'all-subjects' },
  { label: 'Mathematics', value: 'mathematics' },
  { label: 'Physics', value: 'physics' },
  { label: 'Chemistry', value: 'chemistry' },
  { label: 'Computer Science', value: 'computer-science' },
  { label: 'English', value: 'english' }
];

export default function Notes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all-subjects');
  const [sortBy, setSortBy] = useState('modified');
  const [showStarred, setShowStarred] = useState(false);

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-4 h-4 text-danger" />;
      case 'image':
        return <Image className="w-4 h-4 text-success" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all-subjects' || note.subject.toLowerCase().replace(' ', '-') === selectedSubject;
    const matchesStarred = !showStarred || note.starred;
    return matchesSearch && matchesSubject && matchesStarred;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'modified':
      default:
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notes Management</h1>
          <p className="text-muted-foreground mt-1">Organize and manage your study notes</p>
        </div>
        <Button className="btn-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Create Note
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="attendance-card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modified">Last Modified</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant={showStarred ? "default" : "outline"}
              size="sm"
              onClick={() => setShowStarred(!showStarred)}
            >
              <Star className={`w-4 h-4 ${showStarred ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNotes.length > 0 ? (
          sortedNotes.map((note) => (
            <Card key={note.id} className="attendance-card hover:shadow-medium transition-all duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{note.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {note.subject}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle star toggle
                  }}
                >
                  <Star className={`h-4 w-4 ${note.starred ? 'fill-warning text-warning' : 'text-muted-foreground'}`} />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {note.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {note.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Attachments */}
              {note.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">Attachments:</p>
                  <div className="space-y-1">
                    {note.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-secondary/30 rounded text-xs">
                        <div className="flex items-center space-x-2">
                          {getAttachmentIcon(attachment.type)}
                          <span className="font-medium truncate">{attachment.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-muted-foreground">{attachment.size}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(note.lastModified).toLocaleDateString()}
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-danger hover:text-danger">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="attendance-card text-center py-8">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No notes found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm || selectedSubject !== 'All Subjects' || showStarred 
                  ? 'Try adjusting your search or filters' 
                  : 'Create your first note to get started'}
              </p>
              <Button className="btn-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}