import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploaderProps {
  onDocumentsUploaded: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
}

export const DocumentUploader = ({ onDocumentsUploaded }: DocumentUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: "uploading",
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload and processing
    newFiles.forEach((file, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) =>
                f.id === file.id ? { ...f, status: "complete", progress: 100 } : f
              )
            );
            if (index === newFiles.length - 1) {
              toast.success("All documents processed", {
                description: `${newFiles.length} documents indexed successfully`
              });
              onDocumentsUploaded();
            }
          }, 500);
        }
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id ? { ...f, progress: Math.min(progress, 100) } : f
          )
        );
      }, 200);
    });
  }, [onDocumentsUploaded]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
    },
    [processFiles]
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <Card className="shadow-elevated">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Document Upload
        </CardTitle>
        <CardDescription>
          Upload employee resumes, reviews, contracts, or other documents. Supports PDF, DOCX, TXT, and CSV formats.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center transition-smooth
            ${isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30"}
            hover:border-primary hover:bg-primary/5 cursor-pointer
          `}
        >
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".pdf,.docx,.txt,.csv"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium text-foreground mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PDF, DOCX, TXT, CSV • Maximum 20MB per file
            </p>
          </label>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Uploaded Files ({files.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFiles([])}
              >
                Clear All
              </Button>
            </div>
            
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <FileText className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                    <Progress value={file.progress} className="h-1.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {file.status === "complete" ? "Processing complete" : `Processing... ${Math.round(file.progress)}%`}
                    </p>
                  </div>
                  {file.status === "complete" ? (
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  ) : (
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-muted-foreground hover:text-destructive transition-smooth flex-shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
