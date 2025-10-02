# NLP Query Engine - AI Engineering Assignment

A full-stack web application that enables natural language querying over structured databases and unstructured documents using semantic search and LLM-powered query processing.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A modern web browser

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Features

### Core Functionality
- **Database Connection**: Connect to SQLite/PostgreSQL databases with automatic schema discovery
- **Document Upload**: Drag-and-drop support for PDF, DOCX, TXT, CSV files
- **Natural Language Queries**: Ask questions in plain English
- **Hybrid Search**: Combines SQL queries and document semantic search
- **Schema Visualization**: Interactive view of database tables and relationships
- **Performance Metrics**: Real-time query performance and cache statistics
- **Query History**: Track and replay previous queries

### Backend Services
- Schema discovery with synonym mapping
- Document processing with chunking and embeddings
- Query classification (SQL/document/hybrid)
- Natural language to SQL conversion
- Response caching for performance
- Source attribution for results

## 🎥 Demo Video

[Watch the Loom Demo](https://www.loom.com/share/your-video-link)
*5-7 minute walkthrough demonstrating all core features*

## 💡 Example Queries

### SQL Queries
```
- "Show me all employees with salary greater than 50000"
- "What's the average order value by customer?"
- "List top 5 products by revenue"
- "How many active users do we have?"
```

### Document Queries
```
- "What are the key terms in employment contracts?"
- "Find documents mentioning vacation policy"
- "Summarize project requirements from uploaded PDFs"
```

### Hybrid Queries
```
- "Show employee records and their contract documents"
- "Find products and related documentation"
- "Match customer data with support tickets"
```

## 🏗️ Architecture

### Frontend (React + TypeScript + Vite)
```
src/
├── components/
│   ├── DatabaseConnector.tsx    # DB connection & schema discovery
│   ├── DocumentUploader.tsx     # File upload with progress
│   ├── QueryInterface.tsx       # NL query input & results
│   ├── SchemaViewer.tsx         # Schema visualization
│   └── MetricsDashboard.tsx     # Performance metrics
├── pages/
│   └── Index.tsx                # Main application page
└── index.css                    # Design system & tokens
```

### Backend (Lovable Cloud / Supabase Edge Functions)
```
supabase/functions/
├── ingest-database/             # POST /api/ingest/database
├── ingest-documents/            # POST /api/ingest/documents
├── check-ingestion-status/      # GET /api/ingest/status/{job_id}
├── process-query/               # POST /api/query
├── query-history/               # GET /api/query/history
└── get-schema/                  # GET /api/schema
```

## 🔧 API Endpoints

### Ingestion
- `POST /api/ingest/database` - Connect to database and discover schema
- `POST /api/ingest/documents` - Upload and process documents
- `GET /api/ingest/status/{job_id}` - Check processing status

### Querying
- `POST /api/query` - Execute natural language query
- `GET /api/query/history` - Retrieve query history

### Schema
- `GET /api/schema` - Get discovered database schema

## 🎯 Technical Highlights

### Schema Discovery
- Automatic table and column introspection
- Foreign key relationship detection
- Synonym mapping (e.g., salary ↔ compensation)
- Sample data extraction for context

### Document Processing
- Multi-format support (PDF, DOCX, TXT, CSV)
- Dynamic chunking based on document type
- Semantic embeddings using AI models
- Metadata indexing for fast retrieval

### Query Engine
- Query classification (SQL/document/hybrid)
- Rule-based + LLM natural language to SQL
- Parameterized query generation (SQL injection safe)
- Response caching (95%+ hit rate target)
- Source attribution for all results

### Performance
- Target: 95% of queries < 2 seconds
- In-memory caching with LRU eviction
- Concurrent request handling (10+ users)
- Batch processing for embeddings

## 🧪 Sample Data

The project includes sample data for testing:
- Sample SQLite database with HR schema (employees, departments, salaries)
- Sample documents (employment contracts, policies, reports)

Load sample data:
```bash
# Sample data is automatically loaded on first run
# Or manually reset: (feature to be implemented)
npm run seed-data
```

## 📊 Performance Metrics

The dashboard displays:
- Total queries processed
- Average response time
- Cache hit rate
- Active database connections
- Indexed documents count
- Recent query history

## ⚠️ Known Limitations

1. **Database Support**: Currently optimized for SQLite and PostgreSQL schemas
2. **Document Size**: Maximum file size 20MB per document
3. **Concurrent Queries**: Designed for up to 10 concurrent users
4. **Embedding Model**: Uses Lovable AI (Gemini) for embeddings - requires credits
5. **Schema Complexity**: Best performance with schemas < 100 tables
6. **Query Complexity**: Complex nested SQL queries may require manual review
7. **Language Support**: Optimized for English language queries

## 🔐 Security Features

- Parameterized SQL queries prevent injection attacks
- File type and size validation
- Input sanitization for all user inputs
- No raw SQL execution from user input
- Secure environment variable management

## 🚧 Future Enhancements

- [ ] Support for more database types (MySQL, MongoDB)
- [ ] Advanced query optimization
- [ ] Multi-language support
- [ ] Query suggestions based on schema
- [ ] Export results to CSV/Excel
- [ ] Collaborative query sharing
- [ ] Advanced visualization options
- [ ] Real-time database updates

## 📝 Development Notes

### Design Philosophy
- Clean, professional UI avoiding "AI-generated" aesthetics
- Focus on usability and clear information hierarchy
- Responsive design for all screen sizes
- Semantic color tokens for consistent theming

### Code Quality
- TypeScript for type safety
- Component-based architecture
- Reusable UI components (shadcn/ui)
- Proper error handling and user feedback

## 🤝 Contributing

This is an assignment project. For questions or issues, contact the developer.

## 📄 License

This project is created for educational purposes as part of an AI Engineering assignment.

---

**Built with**: React, TypeScript, Vite, Tailwind CSS, Lovable Cloud, Supabase, Lovable AI
**Author**: [Your Name]
**Date**: October 2025
