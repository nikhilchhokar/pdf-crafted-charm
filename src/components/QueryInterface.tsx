import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, Clock, Database, FileText } from "lucide-react";
import { toast } from "sonner";

const exampleQueries = [
  "Show me all Python developers in Engineering",
  "Find employees with 5+ years experience",
  "Who joined in the last 6 months?",
  "List all senior managers with their departments",
];

interface QueryResult {
  type: "database" | "document" | "hybrid";
  results: any[];
  responseTime: number;
  cacheHit: boolean;
}

export const QueryInterface = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setResult(null);

    // Simulate query processing
    setTimeout(() => {
      const mockResult: QueryResult = {
        type: Math.random() > 0.5 ? "database" : "hybrid",
        responseTime: Math.random() * 1500 + 300,
        cacheHit: Math.random() > 0.7,
        results: [
          {
            id: 1,
            name: "Sarah Chen",
            position: "Senior Python Developer",
            department: "Engineering",
            experience: "6 years",
            source: "database"
          },
          {
            id: 2,
            name: "Marcus Johnson",
            position: "Python Backend Engineer",
            department: "Engineering",
            experience: "4 years",
            source: "database"
          },
          {
            id: 3,
            name: "Elena Rodriguez",
            position: "Full Stack Developer",
            department: "Engineering",
            skills: "Python, React, PostgreSQL",
            source: "document"
          }
        ]
      };

      setResult(mockResult);
      setIsSearching(false);
      toast.success("Query completed", {
        description: `Found ${mockResult.results.length} results in ${mockResult.responseTime.toFixed(0)}ms`
      });
    }, 1800);
  };

  const handleExampleClick = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-elevated">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Ask anything about your employees..."
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isSearching || !query.trim()}
              className="h-12 px-6 bg-gradient-primary"
              size="lg"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Searching
                </>
              ) : (
                "Search"
              )}
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Try:</span>
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-smooth"
              >
                {example}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Results ({result.results.length})
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {result.responseTime.toFixed(0)}ms
                </span>
              </div>
              {result.cacheHit && (
                <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                  Cache Hit
                </Badge>
              )}
              <Badge variant="outline">
                {result.type === "database" ? "Database" : result.type === "document" ? "Documents" : "Hybrid"}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4">
            {result.results.map((item) => (
              <Card key={item.id} className="hover:shadow-elevated transition-smooth">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground text-lg mb-1">
                        {item.name}
                      </h4>
                      <p className="text-muted-foreground">{item.position}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.source === "database" ? (
                        <Database className="w-4 h-4 text-accent" />
                      ) : (
                        <FileText className="w-4 h-4 text-accent" />
                      )}
                      <span className="text-xs text-muted-foreground capitalize">
                        {item.source}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {item.department && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Department:</span>{" "}
                        <span className="text-foreground font-medium">{item.department}</span>
                      </p>
                    )}
                    {item.experience && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Experience:</span>{" "}
                        <span className="text-foreground font-medium">{item.experience}</span>
                      </p>
                    )}
                    {item.skills && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Skills:</span>{" "}
                        <span className="text-foreground font-medium">{item.skills}</span>
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
