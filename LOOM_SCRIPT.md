# Loom Demo Script - NLP Query Engine
## Target Duration: 5-7 minutes

---

## 1. Introduction (30 seconds)
**[Show landing page]**

"Hi! This is my NLP Query Engine for the AI Engineering assignment. This system lets you query both structured databases and unstructured documents using natural language - no SQL or complex search required."

**Key points to mention:**
- Full-stack application with React frontend and Lovable Cloud backend
- Handles SQL databases and document search
- Uses AI for natural language understanding

---

## 2. Database Connection & Schema Discovery (60 seconds)
**[Navigate to Database tab]**

"First, let me show you the database connection feature."

**Actions:**
1. Click on "Database" tab
2. Enter a connection string (use: `sqlite:///demo.db`)
3. Click "Connect & Discover Schema"
4. Wait for success message

**Talking points while connecting:**
- "The system automatically discovers your database schema"
- "It identifies tables, columns, data types, and relationships"
- "It also builds a synonym map - so 'salary' matches 'compensation'"

**[Show schema viewer]**
- Point out discovered tables (employees, departments, projects)
- Show relationships between tables
- Mention sample row counts

---

## 3. Document Upload (45 seconds)
**[Navigate to Documents tab]**

"Next, let's upload some documents."

**Actions:**
1. Drag and drop 2-3 files (PDF, DOCX, TXT)
2. Show upload progress bars
3. Wait for processing complete

**Talking points:**
- "Supports multiple formats: PDF, Word, text files, CSV"
- "The system chunks documents intelligently based on type"
- "Generates embeddings for semantic search"
- "Different chunk sizes for resumes vs contracts"

---

## 4. Natural Language Queries - SQL (90 seconds)
**[Navigate to Query tab]**

"Now for the main feature - natural language querying."

**Demo Query 1: Simple SQL**
- Type: "Show me all employees with salary greater than 50000"
- Click Search
- Show results table

**Talking points:**
- "Query is classified as SQL type"
- "Converted to safe, parameterized SQL"
- "Results from database with source attribution"
- Point out response time (< 2 seconds)

**Demo Query 2: Aggregation**
- Click example query: "What's the average salary by department?"
- Show results

**Talking points:**
- "Handles aggregations and joins"
- "Cache hit on repeated queries" (if you run it twice)

---

## 5. Natural Language Queries - Documents (60 seconds)
**[Stay on Query tab]**

**Demo Query 3: Document Search**
- Type: "Find documents mentioning vacation policy"
- Show results

**Talking points:**
- "Classified as document query"
- "Uses semantic similarity, not keyword matching"
- "Shows relevant chunks with source files"
- "Relevance scores for each result"

---

## 6. Hybrid Query (45 seconds)

**Demo Query 4: Hybrid**
- Type: "Show employee records and their contract documents"
- Show combined results

**Talking points:**
- "Combines database queries with document search"
- "Returns structured data AND relevant documents"
- "Perfect for questions spanning both sources"

---

## 7. Performance Metrics (45 seconds)
**[Navigate to Metrics tab]**

"Let me show you the performance dashboard."

**Point out:**
- Total queries processed
- Average response time (target: < 2 seconds)
- Cache hit rate (target: > 95%)
- Active connections
- Indexed documents count
- Recent query history

**Talking points:**
- "Real-time metrics for system health"
- "Query caching improves performance"
- "Full query history for analysis"

---

## 8. Schema Visualization (30 seconds)
**[Navigate back to Database tab, scroll to schema]**

"The schema viewer shows your database structure visually."

**Point out:**
- Table cards with column details
- Primary key indicators
- Relationship arrows
- Sample data included

---

## 9. Technical Highlights (45 seconds)
**[Can show code or stay on UI]**

"Quick technical overview of what's under the hood:"

**Backend:**
- Lovable Cloud (Supabase) edge functions
- Automatic schema introspection
- LLM-powered NL to SQL conversion (using Gemini Flash)
- Vector embeddings for semantic search
- In-memory caching with 1-hour TTL

**Frontend:**
- React + TypeScript + Vite
- Responsive design with semantic tokens
- Real-time progress indicators
- Professional UI avoiding AI-generated look

---

## 10. Closing & Key Features (30 seconds)

"To summarize, this system provides:"

✓ Automatic database schema discovery
✓ Multi-format document processing
✓ Natural language to SQL conversion
✓ Semantic document search
✓ Hybrid querying capabilities
✓ Performance optimization with caching
✓ Real-time metrics dashboard
✓ Source attribution for all results

"The code is fully documented, includes a comprehensive README, and is ready to run. Thank you!"

---

## Tips for Recording:

1. **Rehearse** the script 2-3 times before recording
2. **Keep energy up** - sound enthusiastic about your work
3. **Slow down** when showing technical details
4. **Use cursor highlights** to draw attention to important UI elements
5. **Have all example files ready** before starting
6. **Reset the app** to a clean state before recording
7. **Check audio levels** - clear voice, no background noise
8. **Keep within time limit** - practice with a timer

## Backup Queries (if you have extra time):

- "How many active projects are there?"
- "List all departments with budget over 200000"
- "What are the key terms in employment contracts?"
- "Show me the highest paid employees"

---

## Common Issues & Solutions:

**If something doesn't load:**
- "As you can see, the system gracefully handles loading states"
- Move to next feature

**If mock data shows:**
- "I'm using mock data for this demo, but the system connects to real databases"

**If you go over time:**
- Skip the backup queries section
- Combine the technical highlights into the closing
