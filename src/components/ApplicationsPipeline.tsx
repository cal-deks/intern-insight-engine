import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Phone, 
  Users, 
  Award, 
  X,
  ArrowRight
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

interface ApplicationsPipelineProps {
  applications: Application[];
}

const pipelineStages = [
  { 
    key: 'applied', 
    label: 'Applied', 
    icon: FileText, 
    color: 'text-muted-foreground',
    bgColor: 'bg-muted/20'
  },
  { 
    key: 'screening', 
    label: 'Screening', 
    icon: Phone, 
    color: 'text-warning',
    bgColor: 'bg-warning/20'
  },
  { 
    key: 'interview', 
    label: 'Interview', 
    icon: Users, 
    color: 'text-primary',
    bgColor: 'bg-primary/20'
  },
  { 
    key: 'offer', 
    label: 'Offer', 
    icon: Award, 
    color: 'text-accent',
    bgColor: 'bg-accent/20'
  },
  { 
    key: 'rejected', 
    label: 'Rejected', 
    icon: X, 
    color: 'text-destructive',
    bgColor: 'bg-destructive/20'
  },
];

export const ApplicationsPipeline = ({ applications }: ApplicationsPipelineProps) => {
  const getStageCount = (status: string) => 
    applications.filter(app => app.status === status).length;

  const totalApplications = applications.length;
  const getStagePercentage = (status: string) => 
    totalApplications > 0 ? (getStageCount(status) / totalApplications) * 100 : 0;

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
            <ArrowRight className="w-3 h-3 text-primary-foreground" />
          </div>
          Application Pipeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {pipelineStages.map((stage, index) => {
            const count = getStageCount(stage.key);
            const percentage = getStagePercentage(stage.key);
            const Icon = stage.icon;

            return (
              <div key={stage.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('p-2 rounded-lg', stage.bgColor)}>
                      <Icon className={cn('w-4 h-4', stage.color)} />
                    </div>
                    <span className="font-medium text-sm">{stage.label}</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">{count}</span>
                </div>
                
                <div className="space-y-1">
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground text-center">
                    {percentage.toFixed(1)}%
                  </p>
                </div>

                {index < pipelineStages.length - 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{applications.length}</p>
            <p className="text-xs text-muted-foreground">Total Applied</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">
              {Math.round((getStageCount('offer') / Math.max(totalApplications, 1)) * 100)}%
            </p>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">
              {getStageCount('screening') + getStageCount('interview')}
            </p>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {Math.round(
                applications.reduce((sum, app) => sum + app.fitScore, 0) / Math.max(totalApplications, 1)
              )}%
            </p>
            <p className="text-xs text-muted-foreground">Avg Fit Score</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};