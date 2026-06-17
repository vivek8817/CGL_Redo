import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  JoyfulFace,
  SensitiveFace,
  HappyFace,
  ConfusedFace,
  HappyExpression,
} from "../components/Faces";
import ProfileModal from "../components/ProfileModal";
import SettingsModal from "../components/SettingsModal";
import { useSelector, useDispatch } from "react-redux";
import { type RootState, type AppDispatch } from "../store";
import { fetchSyllabus } from "../store/subjectsSlice";
import { fetchDashboard } from "../store/streakSlice";

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { subjects: subjectsData, status } = useSelector(
    (state: RootState) => state.subjects,
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSyllabus());
      dispatch(fetchDashboard());
    }
  }, [status, dispatch]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      {/* TOP SECTION: WHITE OVERLAY CARD */}
      <div className="bg-surface rounded-t-overlay rounded-b-sm px-card-pad pt-12 pb-6 z-10 flex flex-col relative shrink-0">
        {/* Top Navigation */}
        <header className="flex justify-between items-center mb-6">
          <div
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-inner-gap cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-border overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Vivek&backgroundColor=e5e7eb"
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xs text-text-muted font-medium">
                Welcome back
              </span>
              <span className="text-base font-bold text-text-primary">
                Vivek Ahirwar
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(true)}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-surface-hover transition-colors active:scale-95"
          >
            <iconify-icon
              icon="solar:hamburger-menu-linear"
              width="20"
              style={{ color: "var(--color-text-primary)" }}
            ></iconify-icon>
          </button>
        </header>

        {/* Greeting Section */}
        <div className="mb-6 mt-12">
          <p className="text-sm text-text-muted font-bold mb-2">
            {new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <h1 className="font-display text-5xl leading-[1.05] font-bold tracking-tight text-text-primary">
            Ready to crush your revision today?
          </h1>
        </div>

        {/* Stat Pills Section (Adapted from Mood Pills) */}
        <div className="flex justify-between items-end gap-inner-gap mt-2">
          {/* Strong */}
          <div className="relative flex-1 bg-surface-hover rounded-full py-2 flex justify-center items-center cursor-pointer active:scale-95 transition-transform">
            <JoyfulFace
              className="absolute -top-5 right-0 rotate-12 drop-shadow-sm"
              size={32}
            />
            <span className="text-xxs font-bold text-text-primary">Strong</span>
          </div>

          {/* Weak */}
          <div className="relative flex-1 bg-surface-hover rounded-full py-2 flex justify-center items-center cursor-pointer active:scale-95 transition-transform">
            <SensitiveFace
              className="absolute -top-5 right-0 -rotate-12 drop-shadow-sm"
              size={32}
            />
            <span className="text-xxs font-bold text-text-primary">Weak</span>
          </div>

          {/* Revised */}
          <div className="relative flex-1 bg-surface-hover rounded-full py-2 flex justify-center items-center cursor-pointer active:scale-95 transition-transform">
            <HappyFace
              className="absolute -top-5 right-1 rotate-6 drop-shadow-sm"
              size={32}
            />
            <span className="text-xxs font-bold text-text-primary">
              Revised
            </span>
          </div>

          {/* Pending */}
          <div className="relative flex-1 bg-surface-hover rounded-full py-2 flex justify-center items-center cursor-pointer active:scale-95 transition-transform">
            <ConfusedFace
              className="absolute -top-4 -right-1 rotate-12 drop-shadow-sm"
              size={32}
            />
            <span className="text-xxs font-bold text-text-primary">
              Pending
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: COLORED CARDS ON BLACK BACKGROUND */}
      <main className="flex-1 overflow-y-auto pt-1 pb-24 flex flex-col gap-layout-gap scrollbar-hide">
        {/* Grid for Dual Cards */}
        <div className="grid grid-cols-2 gap-layout-gap">
          {/* Calendar Streak Card (Yellowish / Sleep theme color) */}
          <div className="bg-widget-sleep-bg rounded-sm p-card-pad flex flex-col h-[160px] justify-between relative overflow-hidden">
            <div className="flex items-center gap-inner-gap text-text-primary opacity-80 z-10">
              <iconify-icon icon="solar:fire-bold" width="18"></iconify-icon>
              <span className="text-xs font-bold tracking-tight">
                Current Streak
              </span>
            </div>

            {/* Floating/Stacked Column Chart Mockup from Reference Image */}
            <div className="flex items-end justify-between gap-layout-gap mt-auto mb-2 h-full px-2 opacity-90 z-10">
              {/* Column 1 */}
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 bottom-[20%] h-[60%] flex flex-col justify-between">
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[75%]"></div>
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[15%]"></div>
                </div>
              </div>
              {/* Column 2 */}
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 bottom-[15%] h-[70%] flex flex-col justify-between">
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[85%]"></div>
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[8%]"></div>
                </div>
              </div>
              {/* Column 3 */}
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 bottom-[25%] h-[55%] flex flex-col justify-between">
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[60%]"></div>
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[25%]"></div>
                </div>
              </div>
              {/* Column 4 */}
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 bottom-[35%] h-[40%] flex flex-col justify-between">
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[90%]"></div>
                </div>
              </div>
              {/* Column 5 */}
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 bottom-[40%] h-[50%] flex flex-col justify-between">
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[95%]"></div>
                </div>
              </div>
              {/* Column 6 */}
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 bottom-[10%] h-[65%] flex flex-col justify-between">
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[70%]"></div>
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[20%]"></div>
                </div>
              </div>
              {/* Column 7 */}
              <div className="relative w-full h-full">
                <div className="absolute left-0 right-0 bottom-[20%] h-[60%] flex flex-col justify-between">
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[10%]"></div>
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[65%]"></div>
                  <div className="w-full bg-widget-sleep-chart rounded-sm h-[10%]"></div>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-layout-gap text-text-primary z-10 mt-auto">
              <span className="text-4xl font-bold leading-none">12</span>
              <span className="text-base font-bold text-widget-sleep-accent leading-none">
                Days
              </span>
            </div>
          </div>

          {/* Quick Resume Card (Purple / Stress theme color) */}
          <div className="bg-widget-stress-bg rounded-sm p-card-pad flex flex-col h-[160px] justify-between relative">
            {/* Expression Floating inside (Rule: no full faces for wide containers) */}
            <HappyExpression className="absolute -top-4 -right-16 rotate-[-28deg] w-42 h-42" />

            <div className="flex items-center gap-inner-gap text-text-primary opacity-80">
              <iconify-icon
                icon="solar:play-circle-bold"
                width="18"
              ></iconify-icon>
              <span className="text-xs font-bold tracking-tight">
                Next Weak Chapter
              </span>
            </div>

            <div className="flex flex-col mt-auto text-text-primary z-10">
              <span className="text-xs font-bold opacity-60 mb-1">Physics</span>
              <span className="text-xl font-bold leading-none tracking-tight">
                Motion & Force
              </span>
            </div>

            {/* Play Button Indicator
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-widget-stress-chart rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform cursor-pointer">
              <iconify-icon icon="solar:play-bold" width="16"></iconify-icon>
            </div> */}
          </div>
        </div>

        {/* Overall Progress / Mini Quiz Card (Green) */}
        <div className="bg-widget-quiz-bg rounded-sm p-card-pad flex flex-col gap-inner-gap relative">
          <div className="flex justify-between items-center text-text-primary">
            <div className="flex items-center gap-inner-gap">
              <iconify-icon
                icon="solar:chart-line-bold"
                width="18"
              ></iconify-icon>
              <span className="text-xs font-bold">Overall Accuracy</span>
            </div>
            <span className="text-xs font-bold opacity-50">This Week</span>
          </div>

          <div className="flex items-baseline gap-2 text-text-primary mt-2">
            <span className="text-5xl font-display font-bold leading-none">
              68%
            </span>
          </div>

          {/* Progress Bar Visual */}
          <div className="w-full h-3 bg-black/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-text-primary rounded-full"
              style={{ width: "68%" }}
            ></div>
          </div>
        </div>

        {/* Fixed Main Subjects List */}
        <div className="flex flex-col gap-inner-gap mt-1">
          <h2 className="text-text-inverse font-bold text-sm px-1 opacity-80">
            Main Subjects
          </h2>

          {subjectsData.map((subject) => {
            // Count weak chapters if any
            let weakCount = 0;
            const chapters =
              (subject.chapters && subject.chapters.length > 0)
                ? subject.chapters
                : subject.subSubjects?.flatMap((s) => s.chapters || []) || [];
            weakCount = chapters.filter(
              (c) => c.progressLevel === "Weak",
            ).length;

            return (
              <div
                key={subject.id}
                onClick={() => navigate(`/subject/${subject.id}`)}
                className="bg-surface rounded-sm p-card-pad  flex justify-between items-center cursor-pointer active:scale-95 transition-transform"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {subject.icon && (
                      <iconify-icon
                        icon={subject.icon}
                        width="18"
                        style={{ color: "var(--color-text-primary)" }}
                      ></iconify-icon>
                    )}
                    <span className="text-base font-bold text-text-primary leading-none">
                      {subject.title}
                    </span>
                  </div>
                  {weakCount > 0 && (
                    <span className="text-xs text-widget-sleep-chart font-bold mt-1">
                      {weakCount} Weak Chapter{weakCount > 1 ? "s" : ""}
                    </span>
                  )}
                  {weakCount === 0 && (
                    <span className="text-xs text-text-muted font-semibold mt-1">
                      {chapters.length} Chapters
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center">
                  <iconify-icon
                    icon="solar:alt-arrow-right-linear"
                    width="20"
                    style={{ color: "var(--color-text-primary)" }}
                  ></iconify-icon>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* MODALS */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};

export default HomeScreen;
