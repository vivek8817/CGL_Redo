import React, { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store";

const BookmarksScreen = () => {
  const bookmarks = useSelector(
    (state: RootState) => state.streak.bookmarks || [],
  );
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="flex-1 w-full bg-background-app flex flex-col relative shrink-0 h-full">
      {/* TOP SECTION */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-12 pb-6 z-10 flex flex-col relative shrink-0 shadow-sm">
        <header className="flex justify-between items-center mb-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none">
            Saved Items
          </h1>
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-surface-hover">
            <span className="font-bold text-text-primary text-sm">
              {bookmarks.length}
            </span>
          </div>
        </header>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <div className="px-4 py-2 rounded-full bg-text-primary text-text-inverse text-xs font-bold whitespace-nowrap cursor-pointer">
            All
          </div>
          <div className="px-4 py-2 rounded-full bg-surface-hover text-text-primary text-xs font-bold whitespace-nowrap cursor-pointer opacity-50">
            MCQs
          </div>
          <div className="px-4 py-2 rounded-full bg-surface-hover text-text-primary text-xs font-bold whitespace-nowrap cursor-pointer opacity-50">
            Concepts
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <main className="flex-1 overflow-y-auto pt-1 pb-24 flex flex-col gap-layout-gap scrollbar-hide px-layout-gap">
        {bookmarks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-12 opacity-50">
            <iconify-icon
              icon="solar:bookmark-circle-bold"
              width="64"
              style={{ color: "var(--color-text-muted)" }}
            ></iconify-icon>
            <p className="font-bold text-text-muted mt-4">
              No saved items yet.
            </p>
            <p className="text-xs font-semibold text-text-muted">
              Bookmark tricky questions during a quiz to review them here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-inner-gap mt-1">
            {bookmarks.map((bm) => {
              // Now that bookmarks are populated MCQ documents from MongoDB, we use their real _id
              const uniqueId = bm._id;
              const isExpanded = expandedIds[uniqueId];

              return (
                <div
                  key={uniqueId}
                  onClick={() => toggleExpand(uniqueId)}
                  className="bg-surface rounded-sm p-card-pad flex flex-col gap-2 shadow-sm relative active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-text-muted">
                      Saved Concept
                    </span>
                    <iconify-icon
                      icon="solar:bookmark-bold"
                      width="16"
                      style={{ color: "var(--color-text-primary)" }}
                    ></iconify-icon>
                  </div>

                  <h3
                    className={`text-base font-bold text-text-primary leading-tight ${isExpanded ? "" : "line-clamp-2"}`}
                  >
                    {bm.text}
                  </h3>

                  {isExpanded && (
                    <div className="mt-3 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-3 bg-surface-hover rounded-sm border border-border">
                        <div className="flex items-center gap-1 text-[#0f5132] mb-1">
                          <iconify-icon
                            icon="solar:info-circle-bold"
                            width="16"
                          ></iconify-icon>
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Concept / Explanation
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-text-muted leading-relaxed">
                          {bm.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BookmarksScreen;
