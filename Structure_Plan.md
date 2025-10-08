# 📐 Project Structure & Navigation Plan - The Pong Hub

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [File Structure](#2-file-structure)
3. [HTML Structure](#3-html-structure)
4. [Navigation System](#4-navigation-system)
5. [Section Breakdown](#5-section-breakdown)
6. [Responsive Breakpoints](#6-responsive-breakpoints)
7. [Navigation Implementation](#7-navigation-implementation)
8. [User Flow Scenarios](#8-user-flow-scenarios)
9. [Key Structure Decisions](#9-key-structure-decisions)
10. [Accessibility Considerations](#10-accessibility-considerations)

---

## 1. Architecture Overview

### 1.1 Application Type
**Single Page Application (SPA)**

**Definition:**
All content exists in one HTML file (index.html) with JavaScript controlling which section is visible at any given time. No traditional page navigation or URL changes occur during user interaction.

### 1.2 Rationale for SPA Architecture

**Advantages (Why SPA Was Chosen):**
- ✅ **Speed:** Instant section transitions without page reloads
- ✅ **User Experience:** Smooth, app-like feel
- ✅ **State Persistence:** Score values maintain during navigation
- ✅ **Code Simplicity:** Single HTML file, centralized navigation logic
- ✅ **Maintainability:** Updates to navigation affect one location only

**Trade-offs (Acknowledged Limitations):**
- ⚠️ **JavaScript Dependency:** Application requires JavaScript enabled to function
- ⚠️ **SEO Limitations:** Single URL doesn't benefit from multiple page indexing (not relevant for this use case)
- ⚠️ **Initial Load:** All content loads initially (minimal impact with lightweight design)

**Risk Mitigation:**
The JavaScript dependency is acceptable because:
- Target audience uses modern browsers with JavaScript enabled by default
- Core functionality (score tracking, countdown) inherently requires JavaScript
- Performance benefits significantly outweigh the risk
- Browser JavaScript support is near-universal (>98% of users)

### 1.3 Alternative Considered

**Multi-Page Architecture:**
```
❌ index.html (home)
❌ rules.html (rules)
❌ score.html (score tracker)
❌ events.html (tournament info)
❌ contact.html (feedback form)
```

**Why Rejected:**
- Requires duplicating navigation HTML across 5 files
- Page reloads disrupt user experience
- Score state would be lost when navigating away
- More complex to maintain (changes needed in multiple files)
- Traditional approach feels dated compared to modern SPA experience

---

## 2. File Structure

### 2.1 Project Organization

```
Assignment-module-2/
│
├── index.html              # Single HTML file (SPA)
│   ├── <header>           # Navigation
│   ├── <main>             # Content container
│   │   ├── #home          # Home section
│   │   ├── #rules         # Rules section
│   │   ├── #score         # Score tracker section
│   │   ├── #events        # Tournament countdown section
│   │   └── #contact       # Contact form section
│   └── <script>           # JavaScript import
│
├── style.css               # Complete stylesheet (~250 lines)
│   ├── Reset CSS
│   ├── Utility classes
│   ├── Navigation styles
│   ├── Section styles
│   └── Responsive media queries
│
├── script.js               # All JavaScript logic (~150 lines)
│   ├── Navigation function (showSection)
│   ├── Score tracking (addPoint, checkWinner, resetScore)
│   ├── Form validation
│   └── Countdown timer
│
├── Logo3.png              # Application branding
│
├── README.md              # Project overview and usage
├── DOCUMENTATION.md       # Technical documentation
├── PROJECT_CONCEPT.md     # Concept and planning
└── STRUCTURE_PLAN.md      # This file
```

### 2.2 Separation of Concerns

**HTML (Structure):**
Defines content structure, semantic meaning, and document hierarchy. No styling or behavior included in HTML.

**CSS (Presentation):**
Handles all visual styling, layout, colors, spacing, and responsive design. No JavaScript logic in CSS.

**JavaScript (Behavior):**
Controls interactivity, navigation, calculations, validation, and dynamic updates. Minimal inline JavaScript (only onclick attributes for navigation).

---

## 3. HTML Structure

### 3.1 Document Hierarchy

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Pong Hub</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet">
  </head>
  
  <body>
    <header>
      <nav>
        <H1><img src="Logo3.png" alt="Logo Pong Hub" class="logo"> The Pong Hub</H1>
        <div class="nav-container">
          <button class="nav-btn active" onclick="showSection('home')">Home</button>
          <button class="nav-btn" onclick="showSection('rules')">Rules</button>
          <button class="nav-btn" onclick="showSection('score')">Score Tracker</button>
          <button class="nav-btn" onclick="showSection('events')">Events</button>
          <button class="nav-btn" onclick="showSection('contact')">Contact</button>
        </div>
      </nav>
    </header>
    
    <main>
      <section id="home" class="active">
        <!-- Home content -->
      </section>
      
      <section id="rules">
        <!-- Rules content -->
      </section>
      
      <section id="score">
        <!-- Score tracker content -->
      </section>
      
      <section id="events">
        <!-- Tournament countdown content -->
      </section>
      
      <section id="contact">
        <!-- Contact form content -->
      </section>
    </main>
    
    <script src="script.js"></script>
  </body>
</html>
```

### 3.2 Section Visibility Logic

**CSS Mechanism:**
```css
/* All sections hidden by default */
section {
    display: none;
}

/* Only section with 'active' class is visible */
section.active {
    display: block;
}
```

**JavaScript Control:**
```javascript
function showSection(sectionID) {
    // 1. Remove 'active' from all sections (hide all)
    // 2. Add 'active' to target section (show one)
    // 3. Update navigation button states
}
```

### 3.3 Semantic HTML Benefits

**Elements Used:**
- `<header>` - Site-wide header with navigation
- `<nav>` - Navigation menu container
- `<main>` - Primary content area
- `<section>` - Thematic content groupings
- `<h1>`, `<h2>`, `<h3>` - Heading hierarchy
- `<form>` - Contact form structure
- `<button>` - Interactive elements

**Benefits:**
- ✅ **Accessibility:** Screen readers understand document structure
- ✅ **SEO:** Search engines better comprehend content
- ✅ **Code Readability:** Semantic meaning immediately clear
- ✅ **Maintainability:** Self-documenting structure

---

## 4. Navigation System

### 4.1 Navigation Structure

```
┌──────────────────────────────────────────────────┐
│                    HEADER                         │
│  ┌──────────┐  ┌─────────────────────────────┐  │
│  │   Logo   │  │    Navigation Buttons       │  │
│  │  + Title │  │  [Home][Rules][Score]...    │  │
│  └──────────┘  └─────────────────────────────┘  │
└──────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────┐
│                     MAIN                          │
│  ┌────────────────────────────────────────────┐  │
│  │   Active Section (one visible at a time)  │  │
│  │                                            │  │
│  │   - Home (default)                        │  │
│  │   - Rules                                  │  │
│  │   - Score Tracker                         │  │
│  │   - Events                                 │  │
│  │   - Contact                                │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### 4.2 Navigation Flow

```
┌─────────┐
│  HOME   │ ← Landing page (section with 'active' class by default)
└────┬────┘
     │
     ├──→ [RULES] ← Educational content, accessed when needed
     │
     ├──→ [SCORE TRACKER] ← Core feature (also via CTA button from Home)
     │
     ├──→ [EVENTS] ← Tournament discovery and countdown
     │
     └──→ [CONTACT] ← Feedback collection (standard last position)
```

### 4.3 Navigation Order Rationale

**Chosen Order:** Home → Rules → Score → Events → Contact

**Justification:**

| Position | Section | Reasoning |
|----------|---------|-----------|
| **1st** | Home | Standard web convention, provides orientation |
| **2nd** | Rules | Educational first - users should understand rules before playing |
| **3rd** | Score Tracker | Core feature after learning rules |
| **4th** | Events | Discovery of professional scene after engaging with app |
| **5th** | Contact | Feedback collection (standard final position in navigation) |

**Design Philosophy:**
Progressive disclosure from simple (rules) to complex (scoring) to discovery (events), following natural user learning curve.

**Alternative Considered:** Home → Score → Rules → Events → Contact

**Why Rejected:**
Placing Score before Rules contradicts educational-first approach. Users might start scoring without understanding official rules, defeating one of the project's key objectives.

---

## 5. Section Breakdown

### 5.1 HOME Section

**Purpose:** Welcome users and orient them to the application

**Visual Structure:**
```
┌───────────────────────────────────────┐
│   Welcome to the Pong Hub             │
│   Your simple destination for ping    │
│   pong basics!                         │
│                                        │
│      ┌──────────────────┐             │
│      │  Ready to play?  │ ← CTA       │
│      └──────────────────┘             │
└───────────────────────────────────────┘
```

**Elements:**
- H2: Welcome message (centered)
- P: Tagline description
- Button: Call-to-action (onclick redirects to Score Tracker)

**User Action:**
Users can either click "Ready to play?" button or use navigation to explore other sections.

**Design Decision:**
Minimal content ensures fast comprehension. Large CTA button provides clear next action for users wanting to start immediately.

---

### 5.2 RULES Section

**Purpose:** Educational reference for beginners

**Visual Structure:**
```
┌───────────────────────────────────────┐
│   Understand the basic rules!         │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ • Serving: Can serve from...     │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │ • Scoring: First to 11 points... │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │ • Let: Ball touches net...       │ │
│  └──────────────────────────────────┘ │
│  ┌──────────────────────────────────┐ │
│  │ • Alternating: Serve every 2 pts │ │
│  └──────────────────────────────────┘ │
└───────────────────────────────────────┘
```

**Elements:**
- H2: Section title
- UL > LI: 4 rule cards with light green background (#ddf6e8)
- Strong tags: Emphasize rule categories

**Design Choice:**
Card-based layout allows easy scanning. Users can quickly find specific rules without reading full paragraphs.

**Content Strategy:**
Simple language avoiding technical jargon. Each rule includes practical explanation relevant to casual play.

---

### 5.3 SCORE TRACKER Section

**Purpose:** Real-time match score tracking (core feature)

**Visual Structure:**
```
┌───────────────────────────────────────┐
│   Score Tracker - Let's play!         │
│                                        │
│  ┌──────────┐      ┌──────────┐      │
│  │ Player 1 │      │ Player 2 │      │
│  │    0     │      │    0     │      │
│  │  [+1]    │      │  [+1]    │      │
│  └──────────┘      └──────────┘      │
│                                        │
│      ┌──────────────────┐             │
│      │   Reset Game     │             │
│      └──────────────────┘             │
│      [Player X Wins!]                  │
└───────────────────────────────────────┘
```

**Elements:**
- H2: Section title
- Grid layout (2 columns desktop, 1 column mobile)
- 2x Player cards:
  - H3: Player name
  - Div.score: Large number display (3rem/48px)
  - Button: +1 increment button (blue)
- Reset button (red, centered)
- Winner message div (dynamic, initially empty)

**Functionality:**
- Clicking +1 increments respective player's score
- Winner detection: score >= 11 AND difference >= 2
- Reset clears both scores to 0 and removes winner message
- Winner message appears automatically when conditions met

**Layout Rationale:**
Grid layout provides visual balance. Large score numbers are readable from distance (important for table-side viewing).

---

### 5.4 EVENTS Section

**Purpose:** Professional tournament awareness

**Visual Structure:**
```
┌───────────────────────────────────────┐
│   WTT Finals Hong Kong                │
│   10 Dec - 14 Dec 2025                │
│   (Clickable link to WTT)             │
│                                        │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐      │
│  │ 62 │  │ 12 │  │ 34 │  │ 56 │      │
│  │Days│  │Hrs │  │Min │  │Sec │      │
│  └────┘  └────┘  └────┘  └────┘      │
│   (Updates every second)               │
└───────────────────────────────────────┘
```

**Elements:**
- H2 > A: Tournament title with external link to worldtabletennis.com
- Countdown display (flexbox horizontal, switches to vertical on mobile):
  - 4 containers (day, hour, minute, second)
  - Large numbers (2.5em/40px) with light green background
  - Labels below each number

**Functionality:**
- JavaScript countdown updates every second via setInterval
- Calculates time remaining until December 10, 2025
- Link opens WTT official website in same tab

**Why This Tournament:**
WTT Finals is the year's most prestigious event, creating maximum engagement and anticipation among users.

---

### 5.5 CONTACT Section

**Purpose:** User feedback collection

**Visual Structure:**
```
┌───────────────────────────────────────┐
│          Contact Us                   │
│   Have a question or feedback?        │
│                                        │
│  ┌──────────────────────────────────┐ │
│  │ Name:     [____________]         │ │
│  │ Email:    [____________]         │ │
│  │ Message:  [____________]         │ │
│  │           [____________]         │ │
│  │           [ Submit ]             │ │
│  └──────────────────────────────────┘ │
│  [Success/Error message here]         │
└───────────────────────────────────────┘
```

**Elements:**
- H2: Section title
- P: Description/instructions
- Form (flexbox vertical):
  - Label + Input: Name (text, required, min 2 chars)
  - Label + Input: Email (email, required, regex validated)
  - Label + Textarea: Message (required, 6-500 chars)
  - Button: Submit (blue, hover to green)
- Result div: Displays validation messages dynamically

**Validation Messages (Themed):**
- ❌ "Let serve!" - Missing field
- ❌ "Faulty serve!" - Invalid email
- ❌ "Net shot!" - Name too short
- ❌ "Edge ball!" - Message too short
- ❌ "Out of bounds!" - Message too long
- ✅ "Smash!" - Success

**Form Processing:**
Client-side validation only (no backend). Form prevents default submission and displays appropriate feedback message based on validation results.

---

## 6. Responsive Breakpoints

### 6.1 Desktop Layout (> 768px)

```
┌────────────────────────────────────────┐
│  [Logo + Title]  [Nav Buttons →→→→]   │ ← Horizontal
└────────────────────────────────────────┘
┌────────────────────────────────────────┐
│  ┌──────────┐      ┌──────────┐       │
│  │ Player 1 │      │ Player 2 │       │ ← 2 columns
│  │    0     │      │    0     │       │
│  └──────────┘      └──────────┘       │
└────────────────────────────────────────┘
┌────┐  ┌────┐  ┌────┐  ┌────┐          ← Horizontal
│ 62 │  │ 12 │  │ 34 │  │ 56 │
└────┘  └────┘  └────┘  └────┘
```

**Characteristics:**
- Navigation buttons horizontal (flexbox row)
- Score board 2-column grid
- Countdown horizontal (flexbox row)
- Full font sizes (3rem scores, 2.5em countdown)
- Generous spacing (2rem margins/padding)

---

### 6.2 Mobile Layout (≤ 768px)

```
┌───────────────────────────┐
│     [Logo + Title]        │
│  [Home][Rules][Score]     │ ← Wrapped
│    [Events][Contact]      │
└───────────────────────────┘
┌───────────────────────────┐
│       Player 1            │ ← Single
│          0                │   column
│        [+1]               │
├───────────────────────────┤
│       Player 2            │
│          0                │
│        [+1]               │
└───────────────────────────┘
┌───────────────────────────┐
│       62 Days             │ ← Vertical
│      12 Hours             │
│    34 Minutes             │
│    56 Seconds             │
└───────────────────────────┘
```

**Characteristics:**
- Navigation buttons wrap (flexbox wrap)
- Score board 1-column (grid-template-columns: 1fr)
- Countdown vertical (flex-direction: column)
- Reduced font sizes (2rem scores and countdown)
- Reduced spacing (1rem margins/padding)

**CSS Implementation:**
```css
@media (max-width: 768px) {
    nav {
        flex-direction: column;
        gap: 1rem;
    }
    
    .score-board {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .countdown {
        flex-direction: column;
        align-items: center;
    }
    
    .score {
        font-size: 2rem;
    }
}
```

---

## 7. Navigation Implementation

### 7.1 JavaScript Function

```javascript
function showSection(sectionID) {
    // Step 1: Hide all sections
    const sections = document.querySelectorAll('section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    
    // Step 2: Show selected section
    document.getElementById(sectionID).classList.add('active');
    
    // Step 3: Update button states
    const buttons = document.querySelectorAll('.nav-btn');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    // Step 4: Activate corresponding button
    for (let i = 0; i < buttons.length; i++) {
        const onclickAttr = buttons[i].getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes("'" + sectionID + "'")) {
            buttons[i].classList.add('active');
        }
    }
}
```

### 7.2 Button Implementation

```html
<button class="nav-btn active" onclick="showSection('home')">Home</button>
<button class="nav-btn" onclick="showSection('rules')">Rules</button>
<button class="nav-btn" onclick="showSection('score')">Score Tracker</button>
<button class="nav-btn" onclick="showSection('events')">Events</button>
<button class="nav-btn" onclick="showSection('contact')">Contact</button>
```

**Design Decision:**
Inline onclick attributes chosen for simplicity and directness in educational context. Alternative approach using data-attributes could be more scalable but adds complexity unnecessary for this project scope.

---

## 8. User Flow Scenarios

### 8.1 Scenario 1: New User (First Visit)

```
User lands → HOME section (default visible)
     ↓
Reads welcome message + tagline
     ↓
Clicks "Ready to play?" button
     ↓
Redirected to SCORE TRACKER
     ↓
Clicks +1 buttons to track match
     ↓
Winner announced automatically
```

**Clicks to start scoring: 2** (Home CTA → +1 button)

**User experience:** Fast path to core functionality

---

### 8.2 Scenario 2: Learning User

```
User lands → HOME
     ↓
Clicks "RULES" in navigation
     ↓
Reads rules cards (scanning for needed info)
     ↓
Clicks "SCORE TRACKER"
     ↓
Applies learned rules during match tracking
```

**Educational path supported**

---

### 8.3 Scenario 3: Returning User

```
User lands → HOME
     ↓
Directly clicks "SCORE TRACKER" (knows the app)
     ↓
Tracks multiple matches over time
     ↓
Clicks "EVENTS" to check tournament countdown
     ↓
Clicks external link to WTT website
```

**Efficiency for experienced users:** Direct navigation to familiar features

---

## 9. Key Structure Decisions

### 9.1 Why SPA over Multi-Page?

| Aspect | SPA (Chosen) | Multi-Page |
|--------|--------------|------------|
| **Loading** | ✅ Instant | ❌ Page reloads |
| **State** | ✅ Persists | ❌ Lost |
| **Code** | ✅ One file | ❌ Multiple files |
| **Maintenance** | ✅ Centralized | ❌ Distributed |
| **UX** | ✅ Smooth | ❌ Disruptive |
| **JS Dependency** | ⚠️ Required | ✅ Optional |

**Verdict:** SPA advantages outweigh JavaScript dependency risk for this use case and target audience.

---

### 9.2 Section Order Logic

**Order:** Home → Rules → Score → Events → Contact

**Alternative Considered:** Home → Score → Rules → Events → Contact

**Chosen Approach Reasoning:**
- Educational-first philosophy: understand before doing
- Progressive complexity: simple concepts → application → discovery
- Standard conventions: contact forms typically last

---

## 10. Accessibility Considerations

### 10.1 Current Implementation

✅ **Semantic HTML:** `<nav>`, `<header>`, `<main>`, `<section>`, `<form>`  
✅ **Keyboard accessible:** All buttons can be tabbed to and activated with Enter  
✅ **Clear labels:** Button text describes action clearly  
✅ **Visual feedback:** Active state clearly indicated (green background)  
✅ **Focus states:** Visible when navigating with keyboard  
✅ **Alt text:** Logo image includes descriptive alt attribute  
✅ **Form labels:** All inputs associated with label elements


## Conclusion

The project structure successfully implements a modern Single Page Application architecture using vanilla JavaScript, demonstrating understanding of:
- Component-based thinking (sections as components)
- State management (active class toggling)
- Event-driven programming (navigation clicks)
- Responsive design (mobile-first considerations)
- User-centered navigation (logical flow)

The structure balances simplicity with functionality, creating an efficient, maintainable, and user-friendly application that meets all project objectives while remaining accessible to users across devices and contexts.

---

**Document Version:** 1.2
**Date:** October 2025  
**Author:** Damien Mullet  
**Project:** The Pong Hub - Interactive Table Tennis Web Application  
**Repository:** https://github.com/damien62-dev/Assignment-module-2  
**Live Site:** https://damien62-dev.github.io/Assignment-module-2/