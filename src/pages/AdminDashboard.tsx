import React, { useState } from 'react';
import { Bell, Plus, Search, Edit, Trash2, Users, BookOpen, TrendingUp, Settings, BarChart3, Home, User, Menu, LogOut } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  students: number;
  lessons: number;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
  joinedAt: string;
  coursesCompleted: number;
}

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Mock data
  const stats = {
    totalUsers: 12567,
    activeCourses: 45,
    completionRate: 78,
    revenue: 125000
  };

  const courses: Course[] = [
    {
      id: '1',
      title: 'Spanish for Beginners',
      description: 'Learn basic Spanish vocabulary and grammar',
      language: 'Spanish',
      level: 'Beginner',
      students: 1250,
      lessons: 25,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Advanced French Grammar',
      description: 'Master complex French grammar structures',
      language: 'French',
      level: 'Advanced',
      students: 380,
      lessons: 40,
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      title: 'German Conversation',
      description: 'Practice German speaking skills',
      language: 'German',
      level: 'Intermediate',
      students: 720,
      lessons: 30,
      createdAt: '2024-03-10'
    }
  ];

  const users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'Active',
      joinedAt: '2024-01-10',
      coursesCompleted: 3
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'Active',
      joinedAt: '2024-02-15',
      coursesCompleted: 1
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      status: 'Inactive',
      joinedAt: '2024-03-01',
      coursesCompleted: 0
    }
  ];

  const userActivityData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 800 },
    { month: 'Apr', users: 1100 },
    { month: 'May', users: 1200 },
    { month: 'Jun', users: 1400 }
  ];

  const coursePopularityData = [
    { name: 'Spanish', value: 45, color: 'hsl(var(--primary))' },
    { name: 'French', value: 25, color: 'hsl(var(--secondary))' },
    { name: 'German', value: 20, color: 'hsl(var(--accent))' },
    { name: 'Italian', value: 10, color: 'hsl(var(--muted))' }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Manage Courses', icon: BookOpen },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleAddCourse = (courseData: Partial<Course>) => {
    console.log('Adding course:', courseData);
    setIsAddCourseOpen(false);
  };

  const handleEditCourse = (courseData: Partial<Course>) => {
    console.log('Editing course:', courseData);
    setIsEditCourseOpen(false);
    setSelectedCourse(null);
  };

  const handleDeleteCourse = (courseId: string) => {
    console.log('Deleting course:', courseId);
  };

  const toggleUserStatus = (userId: string) => {
    console.log('Toggling user status:', userId);
  };

  const renderDashboardContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-primary text-primary-foreground hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <p className="text-xs opacity-80">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-secondary text-secondary-foreground hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                  <BookOpen className="h-4 w-4 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeCourses}</div>
                  <p className="text-xs opacity-80">+3 new this month</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-accent text-accent-foreground hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 opacity-80" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completionRate}%</div>
                  <p className="text-xs opacity-80">+5% improvement</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-2 hover-lift">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Course Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{course.title}</p>
                          <p className="text-sm text-muted-foreground">{course.students} students enrolled</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses
                      .sort((a, b) => b.students - a.students)
                      .slice(0, 3)
                      .map((course, index) => (
                        <div key={course.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-muted-foreground">{course.language}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium">{course.students} students</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold">Manage Courses</h2>
                <p className="text-muted-foreground">Create, edit, and manage language courses</p>
              </div>
              <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <CourseModal
                  title="Add New Course"
                  onSubmit={handleAddCourse}
                  onClose={() => setIsAddCourseOpen(false)}
                />
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Courses</CardTitle>
                <CardDescription>Manage all language courses in your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Lessons</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.title}</TableCell>
                          <TableCell>{course.language}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              course.level === 'Beginner' ? 'bg-primary-soft text-primary' :
                              course.level === 'Intermediate' ? 'bg-secondary-soft text-secondary' :
                              'bg-accent-soft text-accent'
                            }`}>
                              {course.level}
                            </span>
                          </TableCell>
                          <TableCell>{course.students.toLocaleString()}</TableCell>
                          <TableCell>{course.lessons}</TableCell>
                          <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedCourse(course);
                                  setIsEditCourseOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteCourse(course.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
              <CourseModal
                title="Edit Course"
                course={selectedCourse}
                onSubmit={handleEditCourse}
                onClose={() => {
                  setIsEditCourseOpen(false);
                  setSelectedCourse(null);
                }}
              />
            </Dialog>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Manage Users</h2>
              <p className="text-muted-foreground">View and manage user accounts</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>All registered users on your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Courses Completed</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              user.status === 'Active' 
                                ? 'bg-primary-soft text-primary' 
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                          <TableCell>{user.coursesCompleted}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleUserStatus(user.id)}
                            >
                              {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Reports & Analytics</h2>
              <p className="text-muted-foreground">Track user engagement and course performance</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="users" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Popularity</CardTitle>
                  <CardDescription>Distribution of students across languages</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={coursePopularityData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {coursePopularityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Course Enrollment Stats</CardTitle>
                <CardDescription>Number of students enrolled in each course</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={courses}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="students" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Settings</h2>
              <p className="text-muted-foreground">Configure platform settings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                  <CardDescription>General platform configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="LingoFlow" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input id="support-email" type="email" defaultValue="support@lingoflow.com" />
                  </div>
                  <Button className="bg-gradient-primary hover:opacity-90">Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure system notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email Notifications</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">New user registrations</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Course completions</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Weekly reports</span>
                      </label>
                    </div>
                  </div>
                  <Button className="bg-gradient-primary hover:opacity-90">Update Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        {/* Sidebar */}
        <Sidebar className="border-r border-sidebar-border">
          <div className="p-6 border-b border-sidebar-border">
            <h2 className="text-lg font-bold text-sidebar-foreground">Admin Panel</h2>
          </div>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveSection(item.id)}
                          isActive={activeSection === item.id}
                          className="w-full justify-start"
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold capitalize">{activeSection}</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Admin Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="hidden sm:block">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setActiveSection('settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 overflow-auto">
            {renderDashboardContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Course Modal Component
interface CourseModalProps {
  title: string;
  course?: Course | null;
  onSubmit: (courseData: Partial<Course>) => void;
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ title, course, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    language: course?.language || '',
    level: course?.level || 'Beginner' as const,
    lessons: course?.lessons || 10
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {course ? 'Update course information' : 'Create a new language course'}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Spanish for Beginners"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the course"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={formData.language} onValueChange={(value) => setFormData({ ...formData, language: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Spanish">Spanish</SelectItem>
                <SelectItem value="French">French</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="Italian">Italian</SelectItem>
                <SelectItem value="Portuguese">Portuguese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select value={formData.level} onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced') => setFormData({ ...formData, level: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lessons">Number of Lessons</Label>
          <Input
            id="lessons"
            type="number"
            value={formData.lessons}
            onChange={(e) => setFormData({ ...formData, lessons: parseInt(e.target.value) || 0 })}
            min="1"
            max="100"
            required
          />
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-gradient-primary hover:opacity-90">
            {course ? 'Update Course' : 'Create Course'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default AdminDashboard;