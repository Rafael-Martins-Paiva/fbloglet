import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReportButtonWithDialog() {
  const [showReportTypes, setShowReportTypes] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');

  const reportTypes = [
    'Inappropriate Content',
    'Spam',
    'Hate Speech',
    'Harassment',
    'Other',
  ];

  const handleReportClick = () => {
    setShowReportTypes(!showReportTypes);
  };

  const handleReportTypeSelect = (type: string) => {
    setSelectedReportType(type);
    setShowReportTypes(false);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedReportType('');
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        onClick={handleReportClick}
      >
        <AlertTriangle className="w-4 h-4 mr-2" />
        Report
      </Button>

      {showReportTypes && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-md shadow-lg z-10">
          {reportTypes.map((type) => (
            <button
              key={type}
              className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted"
              onClick={() => handleReportTypeSelect(type)}
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are about to report this content for: <strong>{selectedReportType}</strong>.
              Are you sure you want to proceed?
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleCloseDialog}>
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
