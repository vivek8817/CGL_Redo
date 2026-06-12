import React from 'react';

const BookmarksScreen = () => {
  const bookmarks = [
    { id: 1, type: 'MCQ', subject: 'Physics', title: "Newton's First Law", date: '2 days ago' },
    { id: 2, type: 'Concept', subject: 'History', title: "Battle of Panipat", date: '1 week ago' },
    { id: 3, type: 'MCQ', subject: 'Geography', title: "Atmospheric Layers", date: '2 weeks ago' }
  ];

  return (
    <>
      {/* TOP SECTION */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-12 pb-6 z-10 flex flex-col relative shrink-0 shadow-sm">
        <header className="flex justify-between items-center mb-6">
          <h1 className="font-display text-4xl font-bold tracking-tight text-text-primary leading-none">
            Saved Items
          </h1>
          <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-surface-hover">
            <span className="font-bold text-text-primary text-sm">{bookmarks.length}</span>
          </div>
        </header>

        {/* Filter Chips Mockup */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          <div className="px-4 py-2 rounded-full bg-text-primary text-text-inverse text-xs font-bold whitespace-nowrap cursor-pointer">All</div>
          <div className="px-4 py-2 rounded-full bg-surface-hover text-text-primary text-xs font-bold whitespace-nowrap cursor-pointer">MCQs</div>
          <div className="px-4 py-2 rounded-full bg-surface-hover text-text-primary text-xs font-bold whitespace-nowrap cursor-pointer">Concepts</div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <main className="flex-1 overflow-y-auto pt-1 pb-24 flex flex-col gap-layout-gap scrollbar-hide ">
        {bookmarks.map(bm => (
          <div key={bm.id} className="bg-surface rounded-sm p-card-pad flex flex-col gap-2 shadow-sm relative active:scale-95 transition-transform cursor-pointer">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-text-muted">{bm.subject} • {bm.type}</span>
              <iconify-icon icon="solar:bookmark-bold" width="16" style={{ color: "var(--color-text-primary)" }}></iconify-icon>
            </div>
            <h3 className="text-base font-bold text-text-primary leading-tight">{bm.title}</h3>
            <span className="text-xs font-semibold text-text-muted opacity-60 mt-1">{bm.date}</span>
          </div>
        ))}
      </main>
    </>
  );
};

export default BookmarksScreen;
