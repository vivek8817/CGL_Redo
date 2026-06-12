Edited BottomNavigation.jsx
Edited App.jsx
Edited HomeScreen.jsx
Edited vite.config.ts
Edited App.tsx
Edited index.css
Viewed Onboard_screen.jsx:1-32

Here is a complete summary of the core UI and architectural design rules we’ve established. By following these rules, your app will remain visually stunning, consistent, and perfectly primed for your future transition to React Native.

### 1. The "Viewport Simulator" Pattern (Mobile Wrapper)
- **The Rule:** Never write desktop-centering or fixed-width phone dimensions directly inside your screen files (like `HomeScreen.jsx`). 
- **The Implementation:** All screens are wrapped inside a global `<MobileWrapper>` component. This wrapper handles the desktop background and the phone container shape (392px x 848px, rounded corners, shadow).
- **The "Why":** When you move to React Native, you simply delete the `MobileWrapper`. Your actual screen code won't need to be touched because it's already used to filling exactly 100% of the space it's given!

### 2. Edge-to-Edge "Widget" Layouts
- **The Rule:** The main scrollable area of your app should not have large arbitrary margins pushing everything inward.
- **The Implementation:** The outer wrapper has a tiny `p-layout-gap` (4px) border. The cards/widgets inside push all the way out to touch that 4px border. 
- **The "Why":** This maximizes screen real estate on small phone screens and creates a very modern, modular iOS-style widget interface.

### 3. The 3-Tier Semantic Spacing System
- **The Rule:** Never use raw Tailwind spacing classes (`p-3`, `p-5`, `gap-2`, `gap-3`) randomly. Every gap and padding must follow the 3-tier system defined in your `index.css` theme.
- **The Implementation:**
  1. **`layout-gap` (4px):** Used exclusively for the empty space *between* different cards/containers, and for the outer edge of the phone screen.
  2. **`inner-gap` (8px):** Used exclusively for the empty space *inside* a container between small elements (e.g., the space between an icon and its text label).
  3. **`card-pad` (16px):** Used exclusively for the internal padding (`p-card-pad`) of every major card/container widget to ensure uniform breathing room everywhere.
- **The "Why":** Absolute mathematical consistency. If you ever decide the app needs to look "tighter" or "looser," you change 3 numbers in `index.css` and the entire app mathematically recalculates perfectly.

### 4. Global UI Component Abstraction (DRY Principle)
- **The Rule:** If a UI element appears on more than one screen (like the Bottom Navigation Bar), it must be extracted into its own component file.
- **The Implementation:** `BottomNavigation.jsx` is a single file rendered once in `App.jsx`, sitting *outside* of the individual screens. 
- **The "Why":** 
  - **Don't Repeat Yourself (DRY):** You only have to update the navigation code in one place.
  - **Performance/UX:** Because it sits outside the screens, the navigation bar doesn't flash, reload, or lose its state when the user navigates between the Home screen and the Calendar screen. 
  - **React Native Prep:** This is exactly how React Navigation works natively.

### 5. Centralized Theming
- **The Rule:** Colors, fonts, and dimensions are strictly mapped to variables in your CSS theme file (`index.css`), not hardcoded in the JSX.
- **The Implementation:** Instead of `bg-[#000000]`, you use `bg-background-app`. Instead of `h-[848px]`, you use `h-mobile-h`.
- **The "Why":** If you ever want to build a "Light Theme" or change the brand color, you just swap the hex codes in `index.css` and the whole app obeys immediately.

### 6. Modal-First Navigation
- **The Rule:** Use bottom sheets, drawers, or modals for auxiliary features (Profile, Settings, Filters) rather than navigating to entirely new pages.
- **The Implementation:** The Dashboard will feature a hamburger menu and profile icon that trigger overlay UI elements instead of routing to new screens.
- **The "Why":** This heavily reinforces the native mobile application feel, keeping the user grounded in their current context without unnecessary page reloads.

### 7. Calendar Streak Faces & Expressions
- **The Rule:** Streak visualizations must use the face components, strictly adhering to shape and expression rules.
- **The Implementation:** 
  - **Grid Calendars:** Only **Square Shape** faces are allowed in the calendar grids. `AngryFace` (Orange) represents Absent/Missed. `HappyFace` (Yellow) represents Present/Studied.
  - **Long Containers:** For wide/long elements (like a "Monthly Streak Summary Card"), do not render the full square face background. Render **only their expressions** (e.g., just the smile and eyebrows SVG paths) floating inside the container.
- **The "Why":** Keeps the streak tracking playful but visually consistent, preventing large, repetitive blocks of color from overwhelming the UI in wide containers.