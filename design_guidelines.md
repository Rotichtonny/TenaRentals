# Design Guidelines: Rental Booking & Management Application

## Design Approach
**Hybrid Approach**: Material Design principles with inspiration from Airbnb (property browsing) and Notion (dashboard organization). This combines trust-building visual patterns from property platforms with clean, functional mobile UI components for complex workflows.

**Key Principles**:
- Trust through clarity: Verified properties and status indicators are visually prominent
- Role-based visual hierarchy: Each dashboard has distinct primary actions
- Mobile-first efficiency: Touch-optimized controls, minimal navigation depth

## Typography
**Font Family**: Inter via Google Fonts
- **Headings**: 600 weight for dashboard titles, 500 for section headers
- **Body**: 400 weight for content, 500 for emphasis
- **Labels**: 500 weight, uppercase tracking for status badges

**Scale**:
- Dashboard titles: text-2xl
- Section headers: text-lg
- Card titles: text-base font-medium
- Body text: text-sm
- Labels/metadata: text-xs

## Layout System
**Spacing Units**: Tailwind 2, 4, 6, and 8 (p-4, mb-6, gap-8)
- Card padding: p-4
- Section spacing: mb-6 or mb-8
- List item gaps: gap-4
- Form field spacing: space-y-4

**Container Strategy**:
- Mobile: Full-width with px-4 side padding
- Content max-width: No max-width constraints on mobile
- Bottom navigation: Fixed, h-16

## Component Library

### Navigation
- **Bottom Tab Bar** (Fixed): 4-5 tabs with icons + labels, active state with accent color and bold weight
- **Top App Bar**: Role indicator badge, notification icon, menu icon
- **Drawer Menu**: Slide-in for settings, profile, logout

### Cards & Lists
- **Property Cards**: Rounded corners (rounded-lg), shadow-sm, image on top (16:9 ratio), content p-4, status badge overlay on image
- **List Items**: Minimal separation with border-b, touch target h-16 minimum, chevron-right indicator
- **Dashboard Stats Cards**: Grid layout, icon + number + label, subtle background

### Forms & Inputs
- **Text Fields**: Outlined style, rounded-md, focus ring, helper text below
- **Buttons**: 
  - Primary: Full-width on mobile, rounded-lg, h-12, font-medium
  - Secondary: Outlined variant
  - Floating Action Button: Fixed bottom-right for primary actions (+ Add Property)
- **Dropdowns/Selects**: Native mobile selectors styled to match
- **File Upload**: Card-based with preview thumbnails in grid

### Status Indicators
- **Badges**: Rounded-full, text-xs, px-3, py-1, positioned top-right on cards
  - Pending: Yellow/amber background
  - Approved: Green background
  - Awaiting Evaluation: Blue background
  - Active: Green background
- **Progress Stepper**: Horizontal for property approval flow (4 steps)

### Data Display
- **Analytics Dashboard**: 2-column grid of stat cards (xs to md breakpoint)
- **Property Gallery**: Horizontal scroll snap for images, dot indicators
- **Agreements Viewer**: Document-style with scrollable content, action buttons fixed at bottom

### Modals & Overlays
- **Bottom Sheets**: Slide up for filters, booking time selection, quick actions
- **Full-Screen Modals**: Property details, agreement signing, inspection checklist
- **Notifications**: Toast-style top notifications with auto-dismiss

## Images
**Hero/Feature Images**:
- **Property Cards**: 16:9 ratio thumbnail showing property exterior, required
- **Property Detail View**: Full-width image gallery (horizontal scroll), first image is hero
- **Empty States**: Illustration placeholders for empty lists (e.g., "No properties yet")
- **User Avatars**: Circular, 40x40px in lists, 80x80px in profiles

**Image Specifications**:
- Property thumbnails on listings
- Full property galleries (5-10 images) in detail views
- Profile photos for landlords/evaluators
- Inspection checklist can include photo captures
- No large hero sections (mobile app, not landing page)

## Animations
**Minimal, Purposeful Only**:
- Page transitions: Slide left/right for navigation depth
- Card interactions: Subtle scale on touch (scale-[0.98])
- Bottom sheet: Slide up with backdrop fade
- Loading states: Skeleton screens, no spinners
- Status changes: Brief highlight pulse

## Role-Based Visual Differentiation
- **Admin**: Blue accent color, grid-heavy dashboards
- **Landlord**: Green accent, property-focused views
- **Evaluator**: Orange accent, checklist-oriented
- **Tenant**: Purple accent, search/browse-focused

Each role's dashboard uses its accent color for primary buttons, active states, and key indicators while maintaining consistent component structure.