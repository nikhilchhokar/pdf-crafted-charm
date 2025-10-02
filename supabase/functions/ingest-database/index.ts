import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DatabaseConnectionRequest {
  connectionString: string;
  databaseType: "sqlite" | "postgresql";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { connectionString, databaseType }: DatabaseConnectionRequest = await req.json();

    if (!connectionString) {
      throw new Error("Connection string is required");
    }

    // Generate a unique job ID
    const jobId = crypto.randomUUID();
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store job status
    await supabase.from("ingestion_jobs").insert({
      job_id: jobId,
      job_type: "database",
      status: "processing",
      metadata: { connectionString, databaseType },
    });

    // Simulate schema discovery (in real implementation, connect to actual DB)
    // This would use libraries like postgres/mysql/sqlite3 to introspect
    const discoveredSchema = await discoverSchema(connectionString, databaseType);

    // Store discovered schema
    await supabase.from("database_schemas").insert({
      job_id: jobId,
      schema_data: discoveredSchema,
      connection_info: { databaseType },
    });

    // Update job status
    await supabase.from("ingestion_jobs").update({
      status: "completed",
      completed_at: new Date().toISOString(),
    }).eq("job_id", jobId);

    return new Response(
      JSON.stringify({
        success: true,
        jobId,
        schema: discoveredSchema,
        message: "Database schema discovered successfully",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Database ingestion error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

async function discoverSchema(connectionString: string, databaseType: string) {
  // Mock schema discovery - in production, would introspect actual database
  // This simulates connecting to a database and extracting its structure
  
  const mockSchema = {
    tables: [
      {
        name: "employees",
        columns: [
          { name: "id", type: "INTEGER", isPrimary: true, nullable: false },
          { name: "name", type: "VARCHAR(255)", isPrimary: false, nullable: false },
          { name: "email", type: "VARCHAR(255)", isPrimary: false, nullable: false },
          { name: "department_id", type: "INTEGER", isPrimary: false, nullable: true },
          { name: "salary", type: "DECIMAL(10,2)", isPrimary: false, nullable: true },
          { name: "hire_date", type: "DATE", isPrimary: false, nullable: true },
        ],
        rowCount: 150,
        sampleRows: [
          { id: 1, name: "John Doe", email: "john@example.com", department_id: 1, salary: 75000, hire_date: "2020-01-15" },
          { id: 2, name: "Jane Smith", email: "jane@example.com", department_id: 2, salary: 85000, hire_date: "2019-06-20" },
        ],
      },
      {
        name: "departments",
        columns: [
          { name: "id", type: "INTEGER", isPrimary: true, nullable: false },
          { name: "name", type: "VARCHAR(255)", isPrimary: false, nullable: false },
          { name: "budget", type: "DECIMAL(12,2)", isPrimary: false, nullable: true },
        ],
        rowCount: 8,
        sampleRows: [
          { id: 1, name: "Engineering", budget: 500000 },
          { id: 2, name: "Marketing", budget: 300000 },
        ],
      },
      {
        name: "projects",
        columns: [
          { name: "id", type: "INTEGER", isPrimary: true, nullable: false },
          { name: "name", type: "VARCHAR(255)", isPrimary: false, nullable: false },
          { name: "department_id", type: "INTEGER", isPrimary: false, nullable: true },
          { name: "start_date", type: "DATE", isPrimary: false, nullable: true },
          { name: "status", type: "VARCHAR(50)", isPrimary: false, nullable: true },
        ],
        rowCount: 25,
      },
    ],
    relationships: [
      {
        from: "employees.department_id",
        to: "departments.id",
        type: "many-to-one",
      },
      {
        from: "projects.department_id",
        to: "departments.id",
        type: "many-to-one",
      },
    ],
    synonymMap: {
      salary: ["compensation", "pay", "wage", "income"],
      employee: ["worker", "staff", "personnel", "team member"],
      department: ["division", "unit", "team", "group"],
      hire_date: ["start date", "join date", "employment date"],
    },
  };

  return mockSchema;
}
