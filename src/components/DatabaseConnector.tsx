import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Database, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface DatabaseConnectorProps {
  onSchemaDiscovered: () => void;
}

export const DatabaseConnector = ({ onSchemaDiscovered }: DatabaseConnectorProps) => {
  const [connectionString, setConnectionString] = useState("postgresql://user:pass@localhost:5432/company_db");
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConnect = async () => {
    setIsConnecting(true);
    setConnectionStatus("idle");
    setErrorMessage("");

    // Simulate connection and schema discovery
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate for demo
      
      if (success) {
        setConnectionStatus("success");
        setIsConnecting(false);
        onSchemaDiscovered();
        toast.success("Database connected successfully", {
          description: "Discovered 5 tables with 47 columns and 3 relationships"
        });
      } else {
        setConnectionStatus("error");
        setErrorMessage("Connection failed. Please check your credentials and network connection.");
        setIsConnecting(false);
        toast.error("Connection failed", {
          description: "Unable to connect to database"
        });
      }
    }, 2000);
  };

  const handleTest = async () => {
    setIsConnecting(true);
    setTimeout(() => {
      toast.success("Connection test successful");
      setIsConnecting(false);
    }, 1000);
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5 text-primary" />
          Database Connection
        </CardTitle>
        <CardDescription>
          Enter your database connection string. The system will automatically discover tables, columns, and relationships.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="connection-string">Connection String</Label>
          <Input
            id="connection-string"
            value={connectionString}
            onChange={(e) => setConnectionString(e.target.value)}
            placeholder="postgresql://username:password@host:port/database"
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Supports PostgreSQL, MySQL, SQLite, and other SQL databases
          </p>
        </div>

        {connectionStatus === "success" && (
          <Alert className="border-success bg-success/10">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertDescription className="text-success-foreground">
              Connected successfully! Schema discovery complete.
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleTest}
            variant="outline"
            disabled={isConnecting || !connectionString}
            className="flex-1"
          >
            {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Test Connection
          </Button>
          <Button
            onClick={handleConnect}
            disabled={isConnecting || !connectionString}
            className="flex-1 bg-gradient-primary"
          >
            {isConnecting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Connect & Analyze
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
