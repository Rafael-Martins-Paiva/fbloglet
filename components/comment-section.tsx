import React from 'react';

export function CommentSection() {
  return (
    <div className="mt-10 p-6 lg:p-10 bg-muted/20 rounded-lg">
      <h2 className="text-2xl font-medium mb-4">Comments</h2>
      <div className="space-y-6">
        {/* Example Comment 1 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold">
            JD
          </div>
          <div className="flex-1">
            <p className="font-semibold">John Doe <span className="text-xs text-muted-foreground">2 days ago</span></p>
            <p className="text-sm text-muted-foreground">This is a great post! Very insightful and well-written.</p>
          </div>
        </div>

        {/* Example Comment 2 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold">
            AJ
          </div>
          <div className="flex-1">
            <p className="font-semibold">Jane Smith <span className="text-xs text-muted-foreground">1 day ago</span></p>
            <p className="text-sm text-muted-foreground">I learned a lot from this article. Thanks for sharing!</p>
          </div>
        </div>

        {/* Add a placeholder for new comment input */}
        <div className="pt-4 border-t border-border">
          <textarea
            className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
            placeholder="Write your comment here..."
            disabled
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md opacity-50 cursor-not-allowed"
            disabled
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
}
