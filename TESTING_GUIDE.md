# Testing Guide - NLP Query Engine

This guide explains how to test the NLP Query Engine system.

## Quick Test Checklist

### Pre-Demo Testing (15 minutes)

- [ ] Database connection works
- [ ] Schema displays correctly
- [ ] Documents upload successfully
- [ ] All query types return results
- [ ] Metrics dashboard updates
- [ ] No console errors
- [ ] Responsive on mobile

## Manual Testing Procedures

### 1. Database Connection Test

**Steps:**
1. Navigate to "Database" tab
2. Enter connection string: `sqlite:///demo.db`
3. Click "Connect & Discover Schema"
4. Wait for success message

**Expected Results:**
- ✓ Success toast notification
- ✓ Schema viewer shows 3 tables (employees, departments, projects)
- ✓ Relationships displayed
- ✓ Sample row counts visible
- ✓ Process completes in < 5 seconds

**Common Issues:**
- Connection timeout → Check backend function logs
- No schema displayed → Verify mock data in edge function

---

### 2. Document Upload Test

**Steps:**
1. Navigate to "Documents" tab
2. Prepare 3 test files (PDF, DOCX, TXT)
3. Drag files to upload area OR click to browse
4. Monitor upload progress
5. Wait for processing completion

**Expected Results:**
- ✓ Progress bars show for each file
- ✓ Success indicators appear
- ✓ File names, sizes, and types displayed
- ✓ Processing completes in < 10 seconds for 3 files
- ✓ "Clear All" button works

**Common Issues:**
- Upload fails → Check file size limits (20MB max)
- Slow processing → Check edge function performance
- Progress stuck → Verify mock simulation logic

---

### 3. Query Testing

#### Test 3A: SQL Query

**Steps:**
1. Navigate to "Query" tab
2. Type: "Show me all employees with salary greater than 50000"
3. Click "Search" button
4. Review results

**Expected Results:**
- ✓ Query classified as "SQL"
- ✓ Results table with employee data
- ✓ Response time < 2 seconds
- ✓ Source shown as "database"
- ✓ Results properly formatted

#### Test 3B: Document Query

**Steps:**
1. Type: "What are the vacation policies?"
2. Click "Search"
3. Review document results

**Expected Results:**
- ✓ Query classified as "document"
- ✓ Document cards with excerpts
- ✓ Relevance scores displayed
- ✓ Source file names shown
- ✓ Response time < 2 seconds

#### Test 3C: Hybrid Query

**Steps:**
1. Type: "Show employee records and their contract documents"
2. Click "Search"
3. Review combined results

**Expected Results:**
- ✓ Query classified as "hybrid"
- ✓ Both SQL and document results
- ✓ Clear separation of result types
- ✓ Response time < 3 seconds

#### Test 3D: Example Queries

**Steps:**
1. Click each example query button
2. Verify it populates the input
3. Execute the query

**Expected Results:**
- ✓ Input field fills correctly
- ✓ All examples work without errors
- ✓ Variety of result types

#### Test 3E: Query Caching

**Steps:**
1. Execute a query (e.g., "List all departments")
2. Note response time
3. Execute the same query again
4. Compare response times

**Expected Results:**
- ✓ Second query shows "Cache Hit"
- ✓ Second query faster (< 100ms)
- ✓ Results identical
- ✓ Cache indicator visible

---

### 4. Metrics Dashboard Test

**Steps:**
1. Navigate to "Metrics" tab after running queries
2. Review all metric cards
3. Check recent queries list

**Expected Results:**
- ✓ Total queries count updates
- ✓ Average response time displayed
- ✓ Cache hit rate shows percentage
- ✓ Active sessions count
- ✓ Indexed data count
- ✓ Recent queries list populated
- ✓ Cache indicators in history

**Common Issues:**
- Metrics not updating → Check backend logging
- Zero values → Run queries first

---

### 5. Schema Visualization Test

**Steps:**
1. Navigate to "Database" tab
2. Scroll to schema section
3. Review table cards and relationships

**Expected Results:**
- ✓ All tables displayed as cards
- ✓ Columns listed with types
- ✓ Primary keys marked with key icon
- ✓ Relationships shown with arrows
- ✓ Row counts displayed

---

### 6. Responsive Design Test

**Steps:**
1. Open browser DevTools
2. Test at different viewport sizes:
   - Desktop (1920px)
   - Tablet (768px)
   - Mobile (375px)
3. Test all tabs at each size

**Expected Results:**
- ✓ Layout adapts smoothly
- ✓ No horizontal scrolling
- ✓ Touch targets adequate size
- ✓ Text remains readable
- ✓ Cards stack on mobile

---

### 7. Error Handling Test

#### Test 7A: Empty Query

**Steps:**
1. Navigate to Query tab
2. Click Search without entering text

**Expected Result:**
- ✓ Validation message or disabled button

#### Test 7B: Large File Upload

**Steps:**
1. Try uploading a file > 20MB

**Expected Result:**
- ✓ Error message about file size
- ✓ File rejected gracefully

#### Test 7C: Network Failure Simulation

**Steps:**
1. Open DevTools → Network tab
2. Set to "Offline"
3. Try executing a query

**Expected Result:**
- ✓ Error toast notification
- ✓ Helpful error message
- ✓ No app crash

---

## Performance Testing

### Response Time Tests

**Target**: 95% of queries < 2 seconds

**Method:**
1. Execute 20 different queries
2. Record response time for each
3. Calculate 95th percentile

**Acceptance Criteria:**
- 19 out of 20 queries < 2000ms

### Cache Hit Rate Test

**Target**: > 95% cache hit rate for repeated queries

**Method:**
1. Execute 10 unique queries (cold cache)
2. Execute the same 10 queries 9 more times each
3. Calculate hit rate: (cache hits / total queries) * 100

**Expected Result:**
- Hit rate: 90/100 = 90%+ (excluding first execution)

### Concurrent User Test

**Target**: Handle 10 concurrent users

**Method:**
1. Open 10 browser tabs
2. Execute queries simultaneously from each tab
3. Monitor response times and errors

**Acceptance Criteria:**
- All queries complete successfully
- No response time > 5 seconds
- No server errors

---

## Automated Testing

### Unit Tests (Future Enhancement)

```typescript
// Example test structure
describe('Query Classification', () => {
  test('classifies SQL queries correctly', () => {
    expect(classifyQuery('Show me all employees')).toBe('sql');
  });
  
  test('classifies document queries correctly', () => {
    expect(classifyQuery('Find vacation policy')).toBe('document');
  });
});
```

### Integration Tests (Future Enhancement)

```typescript
describe('End-to-End Query Flow', () => {
  test('SQL query returns results', async () => {
    const result = await executeQuery('List all departments');
    expect(result.success).toBe(true);
    expect(result.results.length).toBeGreaterThan(0);
  });
});
```

---

## Pre-Loom Demo Checklist

**15 Minutes Before Recording:**

- [ ] Clear browser cache and cookies
- [ ] Close unnecessary browser tabs
- [ ] Restart development server
- [ ] Prepare test files for upload
- [ ] Test microphone audio
- [ ] Test screen recording quality
- [ ] Have demo script open in another window
- [ ] Set browser zoom to 100%
- [ ] Hide bookmarks bar for clean recording
- [ ] Disable browser notifications
- [ ] Close Slack/email/other distractions

**Quick Smoke Test:**
1. [ ] Load app - no errors
2. [ ] Connect database - works
3. [ ] Upload 1 file - works
4. [ ] Execute 1 query of each type - all work
5. [ ] Check metrics - updating

**If any test fails:**
- Check console for errors
- Verify backend functions are deployed
- Verify database tables exist
- Test in incognito mode

---

## Known Issues & Workarounds

### Issue 1: Mock Data Instead of Real Database
**Workaround**: Document this as a limitation in README. Explain that real implementation would use actual DB connectors.

### Issue 2: Embeddings Use Mock Data
**Workaround**: Explain that production would use actual embedding models via Lovable AI.

### Issue 3: SQL Execution is Simulated
**Workaround**: State that real implementation would use parameterized queries with proper SQL execution.

---

## Troubleshooting Guide

### Problem: No results returned
**Solutions:**
1. Check browser console for errors
2. Verify backend function is deployed
3. Check network tab for failed requests
4. Verify mock data exists in edge functions

### Problem: Slow performance
**Solutions:**
1. Check if caching is enabled
2. Verify edge function cold start (first query slower)
3. Check network latency
4. Reduce mock data processing time

### Problem: Upload fails
**Solutions:**
1. Verify file size < 20MB
2. Check file type is supported
3. Verify edge function has proper CORS headers
4. Check browser console for specific errors

---

## Test Results Template

Use this template to document test results:

```
## Test Session: [Date/Time]
**Tester:** [Your Name]
**Environment:** [Development/Production]
**Browser:** [Chrome/Firefox/Safari] [Version]

### Database Connection
- Status: ✓ Pass / ✗ Fail
- Response Time: [X]ms
- Notes: [Any observations]

### Document Upload
- Status: ✓ Pass / ✗ Fail
- Files Tested: [3 files - PDF, DOCX, TXT]
- Processing Time: [X]s
- Notes: [Any observations]

### Query Testing
- SQL Queries: ✓ Pass / ✗ Fail ([X]/[Y] worked)
- Document Queries: ✓ Pass / ✗ Fail
- Hybrid Queries: ✓ Pass / ✗ Fail
- Average Response Time: [X]ms
- Notes: [Any observations]

### Overall Assessment
- Ready for Demo: ✓ Yes / ✗ No
- Critical Issues: [List any blockers]
- Recommendations: [Any suggestions]
```

---

**Last Updated:** January 2025
**Next Review:** Before final demo recording
