# Macra CRM Frontend

A modern Customer Relationship Management (CRM) Single Page Application built with React, TypeScript, and modern web technologies.

## Features

- **Lead Management**: Create, read, update, and delete leads
- **Status Tracking**: Track leads through pipeline stages (Prospect → Negotiation → Deal → Lost)
- **Interaction History**: Record and view customer interactions (calls, emails, meetings, complaints)
- **Dashboard**: Overview of CRM activities with key statistics
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **UI Components**: shadcn/ui (Radix UI + Tailwind CSS)
- **Routing**: React Router DOM 6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Mock API**: JSON Server

## Project Structure

```
macra-crm-fe/
├── src/
│   ├── components/
│   │   ├── common/          # Shared components
│   │   ├── interactions/    # Interaction-related components
│   │   ├── leads/           # Lead-related components
│   │   ├── layout/          # Layout components (Navbar, Sidebar)
│   │   └── ui/              # shadcn/ui base components
│   ├── lib/
│   │   ├── api.ts           # API client and endpoints
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Dashboard.tsx    # Dashboard page
│   │   ├── Leads.tsx        # Leads list page
│   │   ├── LeadDetail.tsx   # Lead detail page
│   │   ├── Interactions.tsx # Interactions list page
│   │   └── Settings.tsx     # Settings page
│   ├── store/
│   │   └── useCrmStore.ts   # Zustand store
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── db.json                  # JSON Server database
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository (if applicable)
2. Navigate to the project directory:
   ```bash
   cd macra-crm-fe
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. In a separate terminal, start the JSON Server (mock API):
   ```bash
   npm run server
   ```

6. Open your browser and navigate to:
   - App: http://localhost:5173
   - JSON Server: http://localhost:3001

### Available Scripts

```bash
# Start development server
npm run dev

# Start JSON Server (mock API)
npm run server

# Build for production
npm run build

# Preview production build
npm run preview
```

## CRM Data Model

### Lead
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| name | string | Lead's full name |
| email | string | Email address |
| phone | string | Phone number |
| company | string | Company name |
| status | string | Pipeline stage (Prospect, Negotiation, Deal, Lost) |
| source | string | Lead source (Website, Referral, Social Media, Cold Call) |
| notes | string | Additional notes |
| createdAt | string | Creation timestamp |
| updatedAt | string | Last update timestamp |

### Interaction
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| leadId | string | Reference to Lead |
| type | string | Interaction type (Call, Email, Meeting, Complaint) |
| description | string | Interaction details |
| date | string | Interaction timestamp |

## API Endpoints

### Leads
- `GET /leads` - Get all leads
- `GET /leads/:id` - Get single lead
- `POST /leads` - Create new lead
- `PUT /leads/:id` - Update lead
- `DELETE /leads/:id` - Delete lead

### Interactions
- `GET /interactions` - Get all interactions
- `GET /interactions?leadId=:id` - Get interactions for specific lead
- `POST /interactions` - Create new interaction
- `DELETE /interactions/:id` - Delete interaction

## Responsive Design

The application is fully responsive and works on:
- **Mobile**: < 768px - Single column layout with hamburger menu
- **Tablet**: 768px - 1024px - Two column grid
- **Desktop**: > 1024px - Full sidebar with multi-column layout

## Component Library

This project uses shcn/ui components for a consistent and accessible UI:
- Button, Input, Label
- Card, Badge, Dialog
- Select, Tabs

## License

This project is for educational purposes as part of the Front-End Programming course.
