import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function CommentSection() {
  return (
    <div className="mt-10 p-6 lg:p-10">
      <h2 className="text-2xl font-medium mb-4">Comments</h2>
      <div className="space-y-6">
        {/* Example Comment 1 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold">
            JD
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold">John Doe <span className="text-xs text-muted-foreground">2 days ago</span></p>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <ChevronUp className="w-4 h-4" />
                  <span>12</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-destructive transition-colors">
                  <ChevronDown className="w-4 h-4" />
                  <span>1</span>
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">This is a great post! Very insightful and well-written.</p>
            <button className="text-xs text-primary hover:underline mt-1">Reply</button>

            {/* Nested Comment */}
            <div className="flex gap-4 mt-4 pl-8 border-l border-border">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-xs font-semibold">
                AB
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Alice Brown <span className="text-xs text-muted-foreground">1 day ago</span></p>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                      <ChevronUp className="w-4 h-4" />
                      <span>5</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-destructive transition-colors">
                      <ChevronDown className="w-4 h-4" />
                      <span>0</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">I agree! The points on X were particularly helpful.</p>
                <button className="text-xs text-primary hover:underline mt-1">Reply</button>
              </div>
            </div>
          </div>
        </div>

        {/* Example Comment 2 */}
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold">
            AJ
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Jane Smith <span className="text-xs text-muted-foreground">1 day ago</span></p>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                  <ChevronUp className="w-4 h-4" />
                  <span>8</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-destructive transition-colors">
                  <ChevronDown className="w-4 h-4" />
                  <span>0</span>
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">I learned a lot from this article. Thanks for sharing!</p>
            <button className="text-xs text-primary hover:underline mt-1">Reply</button>
          </div>
        </div>

        {/* Add a placeholder for new comment input */}
        <div className="pt-4">
          <textarea
            className="w-full p-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={4}
            placeholder="Write your comment here..."
          ></textarea>
          <button
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Submit Comment
          </button>
        </div>
      </div>
    </div>
  );
}
