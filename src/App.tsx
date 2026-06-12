

import { Routes, Route, useLocation } from 'react-router';
import MobileWrapper from './components/MobileWrapper';
import BottomNavigation from './components/BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import SubjectDetailScreen from './screens/SubjectDetailScreen';
import ChapterOverviewScreen from './screens/ChapterOverviewScreen';
import MCQAttemptScreen from './screens/MCQAttemptScreen';
import SessionResultScreen from './screens/SessionResultScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import SubjectsScreen from './screens/SubjectsScreen';

const App = () => {
  const location = useLocation();
  const hideNav = ['/mcq', '/result', '/chapter'].some(path => location.pathname.startsWith(path)) || location.pathname.startsWith('/subject/');

  return (
    <MobileWrapper>
      <div className="flex-1 w-full relative flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/subject/:id" element={<SubjectDetailScreen />} />
          <Route path="/chapter/:id" element={<ChapterOverviewScreen />} />
          <Route path="/mcq" element={<MCQAttemptScreen />} />
          <Route path="/result" element={<SessionResultScreen />} />
          <Route path="/bookmarks" element={<BookmarksScreen />} />
          <Route path="/calendar" element={<CalendarScreen />} />
          <Route path="/subjects" element={<SubjectsScreen />} />
        </Routes>
      </div>
      {!hideNav && <BottomNavigation />}
    </MobileWrapper>
  );
};

export default App;