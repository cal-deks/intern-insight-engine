import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  ExternalLink, 
  BrainCircuit,
  Building
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface JobCardProps {
  application: Application;
}

const statusColors = {
  applied: 'bg-muted text-muted-foreground',
  screening: 'bg-warning/10 text-warning border-warning/20',
  interview: 'bg-primary/10 text-primary border-primary/20',
  offer: 'bg-accent/10 text-accent border-accent/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusLabels = {
  applied: 'Applied',
  screening: 'Phone Screen',
  interview: 'Interview',
  offer: 'Offer',
  rejected: 'Rejected',
};

export const JobCard = ({ application }: JobCardProps) => {
  const getFitScoreColor = (score: number) => {
    if (score >= 90) return 'text-accent';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  const getFitScoreGradient = (score: number) => {
    if (score >= 90) return 'from-accent to-accent/50';
    if (score >= 80) return 'from-primary to-primary/50';
    if (score >= 70) return 'from-warning to-warning/50';
    return 'from-destructive to-destructive/50';
  };

  return (
    <Card variant="glass" className="p-6 transition-spring hover:glass-elevated group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl">
            {application.logo || <Building className="w-6 h-6 text-primary" />}
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-smooth">
              {application.role}
            </h3>
            <p className="text-lg font-medium text-muted-foreground">{application.company}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {application.location}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {application.salary}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(application.appliedDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={cn('border', statusColors[application.status])}>
            {statusLabels[application.status]}
          </Badge>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">AI Fit Score</span>
          </div>
          <span className={cn('text-lg font-bold', getFitScoreColor(application.fitScore))}>
            {application.fitScore}%
          </span>
        </div>
        
        <div className="relative">
          <Progress 
            value={application.fitScore} 
            className="h-2 bg-muted/30" 
          />
          <div 
            className={cn(
              'absolute inset-0 h-2 rounded-full bg-gradient-to-r opacity-80 transition-all duration-500',
              getFitScoreGradient(application.fitScore)
            )}
            style={{ width: `${application.fitScore}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span>Based on resume & job description analysis</span>
          <span className="font-medium">
            {application.fitScore >= 90 ? 'Excellent Match' : 
             application.fitScore >= 80 ? 'Good Match' :
             application.fitScore >= 70 ? 'Fair Match' : 'Weak Match'}
          </span>
        </div>
      </div>
    </Card>
  );
};