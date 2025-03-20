
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileText, Calendar, Download, Loader2 } from 'lucide-react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell
} from "@/components/ui/table";

export const TranslationLogs = () => {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Mock data for translation logs
  // In a real application, this would be fetched from a database
  const mockLogs = [
    { id: 1, text: "Hello, how are you?", date: "2023-06-10T14:30:00", duration: "00:05" },
    { id: 2, text: "My name is Sign Scribe", date: "2023-06-10T14:35:00", duration: "00:03" },
    { id: 3, text: "Nice to meet you", date: "2023-06-10T15:20:00", duration: "00:02" },
    { id: 4, text: "Thank you for using Sign Scribe", date: "2023-06-11T10:15:00", duration: "00:06" },
    { id: 5, text: "How can I help you today?", date: "2023-06-11T10:25:00", duration: "00:04" },
    { id: 6, text: "Please sign more slowly", date: "2023-06-12T09:30:00", duration: "00:03" },
    { id: 7, text: "I am learning Indian Sign Language", date: "2023-06-12T09:40:00", duration: "00:07" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    // Simulate download delay
    setTimeout(() => {
      let content;
      let filename;
      let mimeType;
      
      if (selectedFormat === 'json') {
        content = JSON.stringify(mockLogs, null, 2);
        filename = 'translation-logs.json';
        mimeType = 'application/json';
      } else {
        // CSV format
        const headers = ['ID', 'Text', 'Date', 'Duration'];
        const csvRows = [
          headers.join(','),
          ...mockLogs.map(log => [
            log.id,
            `"${log.text.replace(/"/g, '""')}"`,
            formatDate(log.date),
            log.duration
          ].join(','))
        ];
        content = csvRows.join('\n');
        filename = 'translation-logs.csv';
        mimeType = 'text/csv';
      }
      
      // Create download link
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      
      setIsDownloading(false);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Translation Logs
        </CardTitle>
        <CardDescription>
          View and download your sign language translation history
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Logs Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Translated Text</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.text}</TableCell>
                  <TableCell>{formatDate(log.date)}</TableCell>
                  <TableCell>{log.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Download Section */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border rounded-lg">
          <div className="flex items-center gap-2">
            <FileDown className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Download Logs</h3>
              <p className="text-sm text-muted-foreground">Export your translation history</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="json">JSON Format</option>
              <option value="csv">CSV Format</option>
            </select>
            
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
