import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  description: string;
}

export const StatsCard = ({ title, value, icon, trend, description }: StatsCardProps) => {
  const isPositive = trend > 0;

  return (
    <Card variant="glass" className="relative overflow-hidden transition-spring hover:glass-elevated group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
            isPositive ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10"
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-foreground">{value}</h3>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};