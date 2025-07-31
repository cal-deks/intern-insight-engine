import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Building, 
  BrainCircuit,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { JobCard } from './JobCard';
import { StatsCard } from './StatsCard';
import { ApplicationsPipeline } from './ApplicationsPipeline';

interface Application {
  id: string;
  company: string;
  role: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  fitScore: number;
  appliedDate: string;
  location: string;
  salary: string;
  logo?: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    company: 'Google',
    role: 'Software Engineering Intern',
    status: 'interview',
    fitScore: 94,
    appliedDate: '2024-01-15',
    location: 'Mountain View, CA',
    salary: '$8,000/month',
    logo: '🔍'
  },
  {
    id: '2',
    company: 'Meta',
    role: 'Product Manager Intern',
    status: 'screening',
    fitScore: 87,
    appliedDate: '2024-01-12',
    location: 'Menlo Park, CA',
    salary: '$7,500/month',
    logo: '📘'
  },
  {
    id: '3',
    company: 'Microsoft',
    role: 'Data Science Intern',
    status: 'applied',
    fitScore: 91,
    appliedDate: '2024-01-10',
    location: 'Redmond, WA',
    salary: '$7,000/month',
    logo: '🪟'
  },
  {
    id: '4',
    company: 'Amazon',
    role: 'Cloud Engineering Intern',
    status: 'offer',
    fitScore: 89,
    appliedDate: '2024-01-08',
    location: 'Seattle, WA',
    salary: '$6,800/month',
    logo: '📦'
  },
  {
    id: '5',
    company: 'Netflix',
    role: 'Machine Learning Intern',
    status: 'rejected',
    fitScore: 76,
    appliedDate: '2024-01-05',
    location: 'Los Gatos, CA',
    salary: '$8,500/month',
    logo: '🎬'
  }
];

export const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const stats = {
    totalApplications: applications.length,
    responseRate: Math.round((applications.filter(app => app.status !== 'applied').length / applications.length) * 100),
    avgFitScore: Math.round(applications.reduce((sum, app) => sum + app.fitScore, 0) / applications.length),
    interviews: applications.filter(app => app.status === 'interview').length,
    offers: applications.filter(app => app.status === 'offer').length,
  };

  const filteredApplications = selectedFilter === 'all' 
    ? applications 
    : applications.filter(app => app.status === selectedFilter);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            JobFunnel
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered internship tracking dashboard</p>
        </div>
        <div className="flex gap-3">
          <Button variant="glass" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="premium" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Application
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications.toString()}
          icon={<Target className="w-5 h-5" />}
          trend={+12}
          description="vs last month"
        />
        <StatsCard
          title="Response Rate"
          value={`${stats.responseRate}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          trend={+8}
          description="vs last month"
        />
        <StatsCard
          title="Avg Fit Score"
          value={`${stats.avgFitScore}%`}
          icon={<BrainCircuit className="w-5 h-5" />}
          trend={+3}
          description="AI-powered matching"
        />
        <StatsCard
          title="Active Interviews"
          value={stats.interviews.toString()}
          icon={<Clock className="w-5 h-5" />}
          trend={+2}
          description="this week"
        />
      </div>

      {/* Pipeline Visualization */}
      <ApplicationsPipeline applications={applications} />

      {/* Applications List */}
      <Card variant="glass" className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Recent Applications
              </CardTitle>
              <CardDescription>Track your internship applications and AI fit scores</CardDescription>
            </div>
            <div className="flex gap-2">
              {['all', 'applied', 'screening', 'interview', 'offer'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredApplications.map((application, index) => (
            <div
              key={application.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <JobCard application={application} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};