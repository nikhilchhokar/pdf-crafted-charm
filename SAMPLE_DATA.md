# Sample Data for NLP Query Engine

This document describes the sample data included with the project for testing and demonstration purposes.

## Sample Database Schema

The project includes a mock HR database with the following structure:

### Tables

#### employees
```sql
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  department_id INTEGER,
  salary DECIMAL(10,2),
  hire_date DATE,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

**Sample Data (150 rows):**
- John Doe, Engineering, $75,000
- Jane Smith, Marketing, $85,000
- Bob Johnson, Sales, $70,000
- ... (147 more rows)

#### departments
```sql
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  budget DECIMAL(12,2)
);
```

**Sample Data (8 departments):**
1. Engineering - $500,000
2. Marketing - $300,000
3. Sales - $400,000
4. Human Resources - $200,000
5. Finance - $250,000
6. Operations - $350,000
7. Customer Support - $150,000
8. Research & Development - $450,000

#### projects
```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  department_id INTEGER,
  start_date DATE,
  status VARCHAR(50),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

**Sample Data (25 projects):**
- Project Alpha, Engineering, Active
- Marketing Campaign Q4, Marketing, Active
- Sales Initiative 2025, Sales, Planning
- ... (22 more projects)

### Relationships

- `employees.department_id` → `departments.id` (many-to-one)
- `projects.department_id` → `departments.id` (many-to-one)

### Synonym Mapping

The system recognizes these synonyms for better query understanding:

| Primary Term | Synonyms |
|--------------|----------|
| salary | compensation, pay, wage, income |
| employee | worker, staff, personnel, team member |
| department | division, unit, team, group |
| hire_date | start date, join date, employment date |

## Sample Documents

The project includes sample documents for testing document search:

### 1. Employment Contract Template (PDF)
- **File**: `sample_employment_contract.pdf`
- **Size**: ~50 KB
- **Content**: Standard employment contract with sections on:
  - Position and responsibilities
  - Compensation and benefits
  - Working hours and vacation policy
  - Confidentiality clauses
  - Termination conditions

### 2. Company Policies (DOCX)
- **File**: `company_policies.docx`
- **Size**: ~80 KB
- **Content**: HR policies including:
  - Vacation and PTO policy
  - Remote work guidelines
  - Code of conduct
  - Performance review process
  - Benefits overview

### 3. Project Requirements (TXT)
- **File**: `project_requirements.txt`
- **Size**: ~15 KB
- **Content**: Technical requirements for Project Alpha:
  - Functional requirements
  - Technical specifications
  - Timeline and milestones
  - Success criteria

### 4. Q4 Financial Report (CSV)
- **File**: `q4_financial_report.csv`
- **Size**: ~25 KB
- **Content**: Quarterly financial data:
  - Revenue by department
  - Expense breakdown
  - Budget utilization
  - Year-over-year comparison

## How to Use Sample Data

### Option 1: Using Mock Data (Default)
The application uses mock data by default for demonstration:
- Database schema is simulated in `ingest-database` edge function
- Document results are mocked in `process-query` edge function
- No actual database connection required

### Option 2: Creating Real Database
To test with actual data:

1. **Create SQLite Database:**
```bash
# Create a new SQLite database
sqlite3 demo.db

# Run the schema creation script (create from the tables above)
# Insert sample data
```

2. **Connect in the App:**
- Navigate to the Database tab
- Enter connection string: `sqlite:///demo.db`
- Click "Connect & Discover Schema"

### Option 3: Using PostgreSQL
For PostgreSQL testing:

```sql
-- Create database
CREATE DATABASE nlp_query_demo;

-- Create tables and insert sample data
-- (Use the schema above)
```

Connection string: `postgresql://user:password@localhost:5432/nlp_query_demo`

## Example Queries for Demo

### SQL Queries
```
1. "Show me all employees with salary greater than 50000"
2. "What's the average salary by department?"
3. "List all active projects"
4. "How many employees are in each department?"
5. "Show the top 5 highest paid employees"
6. "What's the total budget across all departments?"
7. "List employees hired after 2020"
8. "Which departments have more than 10 employees?"
```

### Document Queries
```
1. "What are the vacation policies?"
2. "Find information about confidentiality clauses"
3. "What are the project requirements for Alpha?"
4. "Summarize the benefits overview"
5. "What's the remote work policy?"
6. "Find documents mentioning performance reviews"
7. "What are the key terms in employment contracts?"
8. "Show quarterly revenue information"
```

### Hybrid Queries
```
1. "Show employee records and their contract documents"
2. "Find HR department staff and related policy documents"
3. "List active projects and their requirement documents"
4. "Show financial data for the Marketing department"
```

## Data Statistics

- **Total Employees**: 150
- **Total Departments**: 8
- **Total Projects**: 25
- **Average Salary**: $68,500
- **Salary Range**: $45,000 - $120,000
- **Sample Documents**: 4 files
- **Total Document Chunks**: ~50-60 (depending on chunking strategy)

## Generating More Sample Data

To generate additional sample data for stress testing:

```javascript
// Use this pattern to generate more employees
const generateEmployee = (id) => ({
  id,
  name: `Employee ${id}`,
  email: `employee${id}@company.com`,
  department_id: (id % 8) + 1,
  salary: 45000 + Math.random() * 75000,
  hire_date: new Date(2018 + Math.random() * 7, Math.floor(Math.random() * 12), 1)
});

// Generate 1000 employees for performance testing
const employees = Array.from({ length: 1000 }, (_, i) => generateEmployee(i + 1));
```

## Notes

- All sample data is fictional and for demonstration purposes only
- Names, emails, and financial figures are randomly generated
- The data is designed to showcase the system's capabilities
- Actual production use would connect to real databases with proper authentication
