import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Database, FileText, Zap, Clock, TrendingUp } from "lucide-react";

const mockMetrics = {
  totalQueries: 1834,
  avgResponseTime: 847,
  cacheHitRate: 67,
  activeSessions: 8,
  tablesIndexed: 5,
  documentsIndexed: 142,
  recentQueries: [
    { query: "Show me all Python developers", time: 423, cached: true },
    { query: "Find employees with 5+ years experience", time: 1240, cached: false },
    { query: "List senior managers", time: 356, cached: true },
    { query: "Who joined in last 6 months", time: 892, cached: false },
  ]
};

export const MetricsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Queries
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.totalQueries.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">↑ 12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Response Time
            </CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.avgResponseTime}ms</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">↓ 8%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cache Hit Rate
            </CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.cacheHitRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-success">↑ 5%</span> optimization
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Sessions
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.activeSessions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently connected users
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Database Tables
            </CardTitle>
            <Database className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.tablesIndexed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              47 columns indexed
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Documents Indexed
            </CardTitle>
            <FileText className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockMetrics.documentsIndexed}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Ready for search
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle>Recent Queries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockMetrics.recentQueries.map((query, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{query.query}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{query.time}ms</span>
                    {query.cached && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success">
                        Cached
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
