# Tena - Mobile-Based Rental Booking Management Application

## Overview
Tena is a mobile-responsive rental booking management system for Nairobi, designed to streamline rental processes with role-based access for Admins, Landlords, Property Evaluators, and Tenants. The project aims to deliver a comprehensive platform for property verification, booking, and rental management, significantly improving efficiency and user experience in the rental market.

## User Preferences
I prefer iterative development with clear, concise explanations for each step. When making changes, please prioritize the Admin, Evaluator, and Landlord workflows, ensuring robust functionality and user experience for these roles first. I like to see practical implementations and clickable prototypes. Ensure all numeric fields have strict validation that rejects decimals and scientific notation. Please make sure that any new pages or significant feature additions are reflected in the navigation systems (e.g., TopBar, Bottom Navigation, MenuSheet) where appropriate for each role.

## System Architecture

### UI/UX Decisions
-   **Design Principles**: Material Design inspired, mobile-first responsive design, clear visual hierarchy, accessible color contrasts.
-   **Color Scheme**:
    -   Primary: Blue (#2563eb)
    -   Role-based: Admin (Blue), Landlord (Green), Evaluator (Orange), Tenant (Purple)
    -   Property Status: Pending (Amber), In Review (Blue), Approved (Green), Rejected (Red)
-   **Navigation**: Top bar with menu drawer, role-based bottom navigation, intelligent back navigation, and URL query parameter support for deep linking.
-   **Component Reusability**: Utilizes reusable card components (UserCard, PropertyCard) and Shadcn UI primitives for consistency.
-   **Interactive Elements**: Clickable image galleries with full-screen modal lightboxes, Google Maps-style location maps with realistic visualizations.

### Technical Implementations
-   **Role-Based Access Control**: Distinct dashboards and workflows for Admin, Landlord, Property Evaluator, and Tenant.
-   **Property Management**: Comprehensive property listing, evaluation, approval/rejection workflows, and unit management with strict validation.
-   **User Management**: Admin can view, add, modify user roles with role-based color coding and search functionality.
-   **Authentication**: Login and registration with email/password validation and role-based redirects.
-   **Data Display**: Tabbed interfaces for managing lists (e.g., properties by status, users, bookings) and detailed views for individual entities.
-   **Validation**: Strict validation for numeric fields (e.g., unit numbers, rent) using regex patterns to reject decimals and scientific notation.

### Feature Specifications (Key Examples)
-   **Admin Dashboard**: Statistics overview, quick actions, user and property management, evaluator assignment.
-   **Evaluator Workflow**: Property inspection, evaluation reporting, and status updates.
-   **Landlord Features**: Property registration, units management, tenant management, booking management, and revenue tracking.
-   **Notifications**: Functional notification system with read/unread states and type distinctions (success, warning, info).
-   **Responsive Design**: Optimized for mobile devices across all features.

## External Dependencies

### Frontend
-   **React**: JavaScript library for building user interfaces.
-   **TypeScript**: Superset of JavaScript that adds static typing.
-   **Vite**: Fast build tool for modern web projects.
-   **Wouter**: Small routing library for React.
-   **TanStack Query**: Data-fetching library for React.
-   **Shadcn UI**: Reusable UI components.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Lucide React**: Icon library for React.

### Backend
-   **Express.js**: Web application framework for Node.js.
-   **In-memory storage**: Used for mock data persistence (MemStorage pattern).