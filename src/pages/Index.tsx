import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatabaseConnector } from "@/components/DatabaseConnector";
import { DocumentUploader } from "@/components/DocumentUploader";
import { QueryInterface } from "@/components/QueryInterface";
import { SchemaViewer } from "@/components/SchemaViewer";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { Database, FileText, Search, BarChart3 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("connect");
  const [schemaDiscovered, setSchemaDiscovered] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">QueryEngine</h1>
                <p className="text-xs text-muted-foreground">NLP-powered employee data search</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${schemaDiscovered ? 'bg-success' : 'bg-muted'}`} />
                <span className="text-muted-foreground">Database {schemaDiscovered ? 'Connected' : 'Not Connected'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${documentsUploaded ? 'bg-success' : 'bg-muted'}`} />
                <span className="text-muted-foreground">{documentsUploaded ? 'Documents Indexed' : 'No Documents'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
            <TabsTrigger value="connect" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Connect</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="query" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Query</span>
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Metrics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connect" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Connect Your Database</h2>
                <p className="text-muted-foreground">
                  Connect to your employee database and let our system automatically discover the schema,
                  relationships, and data structure. Works with PostgreSQL, MySQL, and other SQL databases.
                </p>
              </div>
              <DatabaseConnector onSchemaDiscovered={() => setSchemaDiscovered(true)} />
              {schemaDiscovered && (
                <div className="mt-8">
                  <SchemaViewer />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Upload Employee Documents</h2>
                <p className="text-muted-foreground">
                  Upload resumes, performance reviews, contracts, and other documents. Our system processes
                  and indexes them for natural language search alongside your database.
                </p>
              </div>
              <DocumentUploader onDocumentsUploaded={() => setDocumentsUploaded(true)} />
            </div>
          </TabsContent>

          <TabsContent value="query" className="space-y-6">
            <div className="max-w-5xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Search Employee Data</h2>
                <p className="text-muted-foreground">
                  Ask questions in plain English. Our engine searches both structured database records
                  and unstructured documents to give you comprehensive results.
                </p>
              </div>
              <QueryInterface />
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Performance Metrics</h2>
                <p className="text-muted-foreground">
                  Monitor query performance, cache efficiency, and system health in real-time.
                </p>
              </div>
              <MetricsDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
