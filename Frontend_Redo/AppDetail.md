# App Product Plan

Here is a clean end-to-end product plan for the app. The app focuses on structured subjectwise revision, chapterwise MCQ practice, wrong-only next-session revision, progress levels, bookmarks, and short explanations, while keeping search, mixed tests, timer, and import for later versions.

## App Flow

The overall flow is simple: the user enters the app, creates or logs into an account, lands on the main dashboard, opens a subject, selects a chapter, attempts MCQs, sees results, and then returns to a dynamically reprioritized chapter list where weaker chapters rise to the top inside that subject flow. The main subject order remains fixed, while sub-subjects and chapters can reorder by weakness score or wrong-count so the app stays familiar but still adaptive.

A good base flow is:
1. Splash screen
2. Login screen
3. Register screen
4. Forgot password (Bottom Sheet Modal)
5. Main dashboard (Adheres to inspiration white-overlay layout)
6. Calendar/Streaks Tab (Repurposed Mood Calendar with Streak Faces)
7. Subject detail screen
8. Sub-subject (Bottom Sheet Modal)
9. Chapter list screen
10. Chapter overview screen
11. MCQ attempt screen
12. Session result screen
13. Chapter progress screen
14. Bookmarks (Modal / Bottom Sheet)
15. Profile/Settings (Drawer / Modal)

## Auth Screens

### 1. Splash Screen
**Purpose:** Quick brand entry and route check for logged-in vs logged-out user.

**Features and options:**
- App logo/name
- One-line value proposition like “Revise weak chapters first”
- Continue button or auto-redirect
- Login / Register shortcuts if needed

### 2. Login Screen
**Purpose:** Allow existing users to access their saved revision data.

**Features and options:**
- Email / phone input
- Password input
- Show/hide password
- Login button
- “Forgot password?”
- “Don’t have an account? Register”
- Error state for invalid credentials

### 3. Register Screen
**Purpose:** Create a new user profile and start tracking progress.

**Features and options:**
- Full name
- Email / phone
- Password
- Confirm password
- Register button
- “Already have an account? Login”
- Validation messages

### 4. Forgot Password Screen
**Purpose:** Reset access if user forgets password.

**Features and options:**
- Email / phone field
- Send OTP / reset link button
- Back to login
- Success confirmation state

## Main Learning Screens

### 5. Main Dashboard
**Purpose:** Central home screen after login. Fully mobile-native feel adhering strictly to the inspiration UI.

**Features and options:**
- **Top White Overlay Card**: Contains Profile Icon (opens Profile Drawer), Hamburger Menu (opens Settings Modal), User Greeting, and Date.
- **Widgets Section (Colored Cards on Dark Background)**:
  - **Calendar Streak Widget**: Using the face expression rule (no full faces for long containers, just smile/eyebrows) to show current month/week streak.
  - **Quick Resume**: Continue the last weak chapter.
  - **Overall Progress**: High-level stats.
- Main fixed subject list (placed below widgets or accessible via navigation).

**Important behavior:**
- Adheres to the new Modal-First architecture. Profile, Settings, and Bookmarks open in overlays instead of routing to new screens.

### 6. Subject Detail Screen
**Purpose:** Open one subject and show its internal structure.

For subjects without sub-subjects, this screen directly shows chapters. For subjects with nested grouping, this screen shows sub-subject cards first (e.g., Physics, Chemistry, Biology under Science, or Ancient, Medieval, Modern under History).

**Features and options:**
- Subject title
- Back button
- Overall subject stats
- If nested:
  - Sub-subject cards
  - Each card shows chapter count, wrong count, progress level
- If not nested:
  - Direct chapter list
- Sort label: “Automatically ordered by weak areas”
- Resume previous chapter

### 7. Sub-subject Screen
**Purpose:** Show chapters under a nested branch like Physics or Ancient History.

**Features and options:**
- Breadcrumb (e.g., Science > Physics)
- Chapter list
- Each chapter row/card shows:
  - Chapter name
  - Total MCQs
  - Attempted count
  - Wrong count
  - Accuracy percent
  - Progress level
  - Last attempted status
- Chapters auto-arranged from highest wrong to lowest wrong
- Start / Continue button for each chapter

## Chapter-level Screens

### 8. Chapter List Screen
**Purpose:** Lists all chapters clearly with revision priority.

**Features and options:**
- Chapter cards/list
- Status pills:
  - Not started
  - In progress
  - Revised
  - Strong
- Wrong-count badge
- Bookmark count badge
- Progress bar per chapter
- Start chapter / Continue chapter action

This screen makes the “most wrong at top” behavior visible and motivating.

### 9. Chapter Overview Screen
**Purpose:** Before entering questions, show what this chapter contains and what revision mode is available.

**Features and options:**
- Chapter title
- Parent subject/sub-subject
- Total MCQs
- Attempted count
- Wrong count
- Bookmarked count
- Accuracy percentage
- Progress level badge
- Start options:
  - Start full chapter
  - Revise wrong only
  - Revise bookmarked only
- Small note that each answer has a short explanation

This screen helps the user choose the right study mode rather than jumping blindly into questions.

## MCQ Play Screens

### 10. MCQ Attempt Screen
**Purpose:** Main solving experience; clean and distraction-free.

**Features and options:**
- Chapter title on top
- Question progress (e.g., 3 of 40)
- MCQ question text
- 4 options or more if needed
- Select one answer
- Submit answer button
- Next question button
- Previous question button
- Bookmark toggle
- Exit chapter button
- Progress strip

After submission, show:
- Correct / Wrong state
- Correct answer highlight
- User selected answer highlight
- 1–3 line explanation under the answer
- Next button

**Important behavior:**
- No retry-inside-session for wrong answers
- Wrongly answered questions are stored for next-session “wrong only” revision

### 11. Pause/Exit Confirmation Modal
**Purpose:** Prevent accidental exits during a chapter session.

**Features and options:**
- “Do you want to leave this session?”
- Save and exit
- Continue solving
- Small note that progress till current question will be saved

## Result and Progress Screens

### 12. Session Result Screen
**Purpose:** Show how the chapter attempt went immediately after a session.

**Features and options:**
- Score summary
- Correct count
- Wrong count
- Unattempted count if allowed
- Accuracy percentage
- Progress level after this session
- Improvement message (“This chapter is still weak” or “Now improving”)
- Buttons:
  - Revise wrong only
  - Go to chapter overview
  - Back to chapter list
  - Continue to next weak chapter

This is one of the most important screens because it bridges practice and revision planning.

### 13. Chapter Progress Screen
**Purpose:** Show cumulative chapter performance across sessions, not just one result.

**Features and options:**
- Chapter name
- Total sessions attempted
- Total MCQs
- Correct / wrong totals
- Current accuracy
- Progress level (Weak, Improving, Strong)
- Bookmark count
- Last attempted date/session label
- Available actions:
  - Start full chapter
  - Revise wrong only
  - Revise bookmarked only

## Bookmark and Utility Screens

### 14. Bookmarked MCQs (Modal / Bottom Sheet)
**Purpose:** Collect all saved questions in one place for quick revision without leaving the current context.

**Features and options:**
- Accessible via a Bottom Sheet from the Dashboard or Chapter List.
- All bookmarked MCQs list
- Filter by subject
- Filter by chapter
- Question preview
- Remove bookmark
- Open full question
- Start bookmarked revision session

### 15. Profile/Settings (Drawer / Modal)
**Purpose:** Basic account and study preferences area, accessible globally via the Hamburger menu or Profile Icon.

**Features and options:**
- Name
- Email / phone
- Change password
- Logout
- Basic app preferences
- Stats summary:
  - Chapters attempted
  - Total questions solved
  - Strong chapters count
  - Weak chapters count

## Recommended Subject Structure

Content tree can be planned like this:

**Flat Subjects (Directly contain chapters):**
- Static GK
- Geography
- Economics
- Polity
- Biology

**Nested Subjects (Contain sub-subjects, then chapters):**
- History
  - Ancient
  - Modern
  - Medieval

Under each final branch, chapters will appear, and under each chapter, MCQs will appear.

## End-to-End User Journey

1. User opens app
2. Splash screen checks login state
3. User logs in or registers
4. Lands on main dashboard
5. Selects a subject from the fixed subject list
6. If the subject has sub-subjects, user selects one
7. User sees chapter list ordered by weak areas
8. Opens a chapter overview
9. Starts either full chapter, wrong-only revision, or bookmarked revision
10. Attempts MCQs one by one
11. Sees answer result plus 1–3 line explanation after each submission
12. Completes session and lands on result screen
13. Returns to chapter list where chapter order updates based on wrong answers
14. Can revisit bookmarks or continue another weak chapter

## Version 1 Scope

| Screen | Include now? | Notes |
|---|---|---|
| Splash | Yes | Simple routing entry |
| Login | Yes | Needed |
| Register | Yes | Needed |
| Forgot password | Yes | Good basic auth support |
| Main dashboard | Yes | Core home screen |
| Subject detail | Yes | Core navigation |
| Sub-subject | Yes | Needed for Science/History |
| Chapter list | Yes | Core revision planning |
| Chapter overview | Yes | Very useful before attempting |
| MCQ attempt | Yes | Core product screen |
| Exit confirmation modal | Yes | Good UX |
| Session result | Yes | Core loop closure |
| Chapter progress | Yes | Needed for progress levels |
| Bookmarks | Yes | Useful for saved questions |
| Profile/settings | Yes | Keep minimal |
| Search by keyword | Later | As requested |
| Mixed revision test | Later | As requested |
| Timer/mock exam mode | Later | Excluded for now |
| Import/upload | Later | Excluded for now |