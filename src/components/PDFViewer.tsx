import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Download, ExternalLink, X } from 'lucide-react';

interface PDFViewerProps {
  url: string;
  title: string;
  onClose?: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title, onClose }) => {
  const [scale, setScale] = useState(1);
  const isFullscreen = false;

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.click();
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900' : 'relative'}`}>
      {/* PDF Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate flex-1 mr-4">
          {title}
        </h4>
        
        <div className="flex items-center gap-2">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-white dark:bg-gray-700 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-200 min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
            title="Open in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* PDF Content */}
      <div className={`overflow-auto bg-gray-100 dark:bg-gray-800 ${isFullscreen ? 'h-[calc(100vh-64px)]' : 'h-96'}`}>
        <div className="flex justify-center p-4">
          <iframe
            src={`${url}#toolbar=0&navpanes=0&scrollbar=1`}
            className="border border-gray-300 dark:border-gray-600 rounded shadow-lg"
            style={{
              width: `${640 * scale}px`,
              height: `${900 * scale}px`,
              minWidth: '300px',
              minHeight: '400px'
            }}
            title={title}
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;