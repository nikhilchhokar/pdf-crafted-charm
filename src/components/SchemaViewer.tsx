import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, Key, Link } from "lucide-react";

const mockSchema = {
  tables: [
    {
      name: "employees",
      columns: [
        { name: "emp_id", type: "INTEGER", isPrimary: true },
        { name: "full_name", type: "VARCHAR(255)", isPrimary: false },
        { name: "email", type: "VARCHAR(255)", isPrimary: false },
        { name: "dept_id", type: "INTEGER", isPrimary: false },
        { name: "position", type: "VARCHAR(100)", isPrimary: false },
        { name: "annual_salary", type: "DECIMAL(10,2)", isPrimary: false },
        { name: "join_date", type: "DATE", isPrimary: false },
        { name: "office_location", type: "VARCHAR(100)", isPrimary: false },
      ],
      rowCount: 1247
    },
    {
      name: "departments",
      columns: [
        { name: "dept_id", type: "INTEGER", isPrimary: true },
        { name: "dept_name", type: "VARCHAR(100)", isPrimary: false },
        { name: "manager_id", type: "INTEGER", isPrimary: false },
        { name: "budget", type: "DECIMAL(12,2)", isPrimary: false },
      ],
      rowCount: 12
    },
    {
      name: "performance_reviews",
      columns: [
        { name: "review_id", type: "INTEGER", isPrimary: true },
        { name: "emp_id", type: "INTEGER", isPrimary: false },
        { name: "review_date", type: "DATE", isPrimary: false },
        { name: "rating", type: "INTEGER", isPrimary: false },
        { name: "comments", type: "TEXT", isPrimary: false },
      ],
      rowCount: 3891
    }
  ],
  relationships: [
    { from: "employees.dept_id", to: "departments.dept_id" },
    { from: "departments.manager_id", to: "employees.emp_id" },
    { from: "performance_reviews.emp_id", to: "employees.emp_id" }
  ]
};

export const SchemaViewer = () => {
  return (
    <div className="space-y-6">
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="w-5 h-5 text-primary" />
            Discovered Schema
          </CardTitle>
          <CardDescription>
            Automatically detected {mockSchema.tables.length} tables with {mockSchema.relationships.length} relationships
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {mockSchema.tables.map((table) => (
            <div key={table.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                    <Table className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{table.name}</h4>
                    <p className="text-sm text-muted-foreground">{table.rowCount.toLocaleString()} rows</p>
                  </div>
                </div>
                <Badge variant="outline">{table.columns.length} columns</Badge>
              </div>
              
              <div className="ml-11 grid gap-2 bg-muted/30 rounded-lg p-3">
                {table.columns.map((column) => (
                  <div key={column.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {column.isPrimary && <Key className="w-3 h-3 text-accent" />}
                      <span className="font-mono text-foreground">{column.name}</span>
                    </div>
                    <span className="text-muted-foreground">{column.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t pt-4">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Link className="w-4 h-4 text-primary" />
              Relationships
            </h4>
            <div className="space-y-2">
              {mockSchema.relationships.map((rel, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="font-mono text-foreground">{rel.from}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-mono text-foreground">{rel.to}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
