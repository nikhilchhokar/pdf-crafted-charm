import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QueryRequest {
  query: string;
  sessionId?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, sessionId }: QueryRequest = await req.json();

    if (!query) {
      throw new Error("Query is required");
    }

    const startTime = Date.now();
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check cache first
    const cacheKey = generateCacheKey(query);
    const cachedResult = await checkCache(supabase, cacheKey);
    
    if (cachedResult) {
      const responseTime = Date.now() - startTime;
      
      // Log query
      await logQuery(supabase, query, "cache_hit", responseTime, sessionId);
      
      return new Response(
        JSON.stringify({
          success: true,
          result: cachedResult,
          responseTime,
          cacheHit: true,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Classify query type
    const queryType = await classifyQuery(query);

    let result;
    if (queryType === "sql") {
      result = await processSQLQuery(query, supabase);
    } else if (queryType === "document") {
      result = await processDocumentQuery(query, supabase);
    } else {
      result = await processHybridQuery(query, supabase);
    }

    const responseTime = Date.now() - startTime;

    // Cache result
    await cacheResult(supabase, cacheKey, result);

    // Log query
    await logQuery(supabase, query, queryType, responseTime, sessionId);

    return new Response(
      JSON.stringify({
        success: true,
        result,
        responseTime,
        cacheHit: false,
        queryType,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Query processing error:", error);
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

function generateCacheKey(query: string): string {
  return `query:${query.toLowerCase().trim()}`;
}

async function checkCache(supabase: any, cacheKey: string) {
  const { data } = await supabase
    .from("query_cache")
    .select("result")
    .eq("cache_key", cacheKey)
    .gte("expires_at", new Date().toISOString())
    .single();
  
  return data?.result || null;
}

async function cacheResult(supabase: any, cacheKey: string, result: any) {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour cache

  await supabase.from("query_cache").upsert({
    cache_key: cacheKey,
    result,
    expires_at: expiresAt.toISOString(),
  });
}

async function classifyQuery(query: string): Promise<"sql" | "document" | "hybrid"> {
  const lowerQuery = query.toLowerCase();
  
  // Rule-based classification
  const sqlKeywords = ["show", "list", "count", "average", "sum", "total", "how many"];
  const docKeywords = ["document", "contract", "policy", "file", "pdf", "what does", "explain"];
  
  const hasSqlKeywords = sqlKeywords.some(kw => lowerQuery.includes(kw));
  const hasDocKeywords = docKeywords.some(kw => lowerQuery.includes(kw));
  
  if (hasSqlKeywords && hasDocKeywords) return "hybrid";
  if (hasDocKeywords) return "document";
  return "sql";
}

async function processSQLQuery(query: string, supabase: any) {
  // Convert natural language to SQL using Lovable AI
  const sqlQuery = await convertToSQL(query);
  
  // For safety, we don't execute arbitrary SQL directly
  // Instead, return structured data based on mock schema
  const mockResults = generateMockSQLResults(query);
  
  return {
    type: "sql",
    query: sqlQuery,
    results: mockResults,
    source: "database",
  };
}

async function processDocumentQuery(query: string, supabase: any) {
  // Generate query embedding
  const queryEmbedding = await generateQueryEmbedding(query);
  
  // Search similar document chunks (mock implementation)
  const { data: chunks } = await supabase
    .from("document_chunks")
    .select("*, documents(*)")
    .limit(5);
  
  const results = chunks?.map((chunk: any) => ({
    content: chunk.content,
    fileName: chunk.documents?.file_name,
    relevanceScore: Math.random() * 0.3 + 0.7, // Mock score
  })) || [];
  
  return {
    type: "document",
    results,
    source: "documents",
  };
}

async function processHybridQuery(query: string, supabase: any) {
  const [sqlResults, docResults] = await Promise.all([
    processSQLQuery(query, supabase),
    processDocumentQuery(query, supabase),
  ]);
  
  return {
    type: "hybrid",
    sqlResults: sqlResults.results,
    docResults: docResults.results,
    source: "database+documents",
  };
}

async function convertToSQL(query: string): Promise<string> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  
  if (!LOVABLE_API_KEY) {
    return "SELECT * FROM employees LIMIT 10"; // Fallback
  }

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "Convert natural language queries to safe SQL. Only output the SQL query, no explanations.",
          },
          {
            role: "user",
            content: query,
          },
        ],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("SQL conversion error:", error);
    return "SELECT * FROM employees LIMIT 10";
  }
}

async function generateQueryEmbedding(query: string): Promise<number[]> {
  // Mock embedding
  return Array(768).fill(0).map(() => Math.random());
}

function generateMockSQLResults(query: string) {
  return [
    { id: 1, name: "John Doe", email: "john@example.com", department: "Engineering", salary: 75000 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Marketing", salary: 85000 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", department: "Sales", salary: 70000 },
  ];
}

async function logQuery(supabase: any, query: string, queryType: string, responseTime: number, sessionId?: string) {
  await supabase.from("query_history").insert({
    query,
    query_type: queryType,
    response_time: responseTime,
    session_id: sessionId,
  });
}
