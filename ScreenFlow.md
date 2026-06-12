```mermaid
graph TD
    subgraph Auth Flow
        Splash["Splash Screen"]
        Login["Login Screen"]
        Register["Register Screen"]
        ForgotPassword["Forgot Password Screen"]
    end

    subgraph Main Navigation
        Dashboard["Main Dashboard"]
        CalendarTab["Calendar / Streaks Tab"]
        SubjectDetail["Subject Detail Screen"]
        SubSubject["Sub-subject (Bottom Sheet Modal)"]
        ChapterList["Chapter List Screen"]
    end

    subgraph Learning Flow
        ChapterOverview["Chapter Overview Screen"]
        ChapterProgress["Chapter Progress Screen"]
    end

    subgraph Session Flow
        MCQAttempt["MCQ Attempt Screen"]
        PauseModal["Pause/Exit Confirmation Modal"]
        SessionResult["Session Result Screen"]
    end

    subgraph Utility Flow
        Bookmarks["Bookmarks (Modal / Bottom Sheet)"]
        ProfileSettings["Profile/Settings (Drawer Modal)"]
    end

    Splash -->|Not Logged In| Login
    Splash -->|Logged In| Dashboard
    
    Login -->|Clicks Register| Register
    Register -->|Clicks Login| Login
    Login -->|Clicks Forgot Password| ForgotPassword
    ForgotPassword -->|Back to Login| Login
    
    Login -->|Successful Login| Dashboard
    Register -->|Successful Registration| Dashboard
    
    Dashboard -->|Selects Calendar Tab| CalendarTab
    Dashboard -->|Selects Subject| SubjectDetail
    Dashboard -->|Selects Quick Bookmarks| Bookmarks
    Dashboard -->|Selects Profile| ProfileSettings
    
    CalendarTab -->|Back to Dashboard| Dashboard
    
    SubjectDetail -->|Has Sub-subjects| SubSubject
    SubjectDetail -->|Direct Chapters| ChapterList
    SubSubject -->|Selects Category| ChapterList
    
    ChapterList -->|Selects Chapter| ChapterOverview
    
    ChapterOverview -->|Starts Full/Wrong/Bookmarked| MCQAttempt
    ChapterOverview -->|Checks Cumulative Progress| ChapterProgress
    
    MCQAttempt -->|Clicks Exit| PauseModal
    PauseModal -->|Continue Solving| MCQAttempt
    PauseModal -->|Save and Exit| SessionResult
    MCQAttempt -->|Finishes Last Question| SessionResult
    
    SessionResult -->|Revise Wrong Only| MCQAttempt
    SessionResult -->|Go to Chapter Overview| ChapterOverview
    SessionResult -->|Back to Chapter List| ChapterList
    SessionResult -->|Views Progress| ChapterProgress
    
    ChapterProgress -->|Starts Chapter| MCQAttempt
    
    Bookmarks -->|Start Bookmarked Session| MCQAttempt
    Bookmarks -->|Back to Dashboard| Dashboard
    
    ProfileSettings -->|Logs Out| Login
    ProfileSettings -->|Back to Dashboard| Dashboard

    SubjectDetail -->|Back| Dashboard
    SubSubject -->|Back| SubjectDetail
    ChapterList -->|Back| SubSubject
    ChapterList -->|Back| SubjectDetail
    ChapterOverview -->|Back| ChapterList
    ChapterProgress -->|Back| ChapterOverview
```