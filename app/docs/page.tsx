export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Hotel Booking System - Documentation
          </h1>
          <p className="text-gray-600 mb-8">
            Complete documentation of the implementation and architecture
          </p>

          {/* Table of Contents */}
          <div className="mb-12 border-l-4 border-primary-500 pl-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Table of Contents</h2>
            <ul className="space-y-2 text-gray-700">
              <li><a href="#overview" className="text-primary-600 hover:underline">1. Project Overview</a></li>
              <li><a href="#tech-stack" className="text-primary-600 hover:underline">2. Technology Stack</a></li>
              <li><a href="#architecture" className="text-primary-600 hover:underline">3. Architecture</a></li>
              <li><a href="#implementation" className="text-primary-600 hover:underline">4. Implementation Details</a></li>
              <li><a href="#api-endpoints" className="text-primary-600 hover:underline">5. API Endpoints</a></li>
              <li><a href="#components" className="text-primary-600 hover:underline">6. Frontend Components</a></li>
              <li><a href="#features" className="text-primary-600 hover:underline">7. Features Implemented</a></li>
              <li><a href="#future" className="text-primary-600 hover:underline">8. Future Enhancements</a></li>
            </ul>
          </div>

          {/* Project Overview */}
          <section id="overview" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Project Overview</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                The Hotel Booking System is a full-stack web application designed to facilitate hotel room bookings,
                property management, and reservation handling. The system provides a clean, user-friendly interface
                for guests to search, view, and book hotel rooms, while also offering administrative capabilities
                for property and inventory management.
              </p>
              <p className="text-gray-700">
                This project follows a modern architecture pattern with a Next.js frontend communicating with
                a Spring Boot REST API backend, backed by PostgreSQL for data persistence.
              </p>
            </div>
          </section>

          {/* Technology Stack */}
          <section id="tech-stack" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Technology Stack</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Frontend</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>Next.js 14</strong> - React framework with App Router for server-side rendering and routing</li>
                  <li><strong>TypeScript</strong> - Type-safe JavaScript for better development experience</li>
                  <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for rapid UI development</li>
                  <li><strong>React Hooks</strong> - For state management and side effects</li>
                  <li><strong>Fetch API</strong> - For making HTTP requests to the backend</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Backend</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>Spring Boot 3.x</strong> - Java framework for building RESTful APIs</li>
                  <li><strong>Java 21</strong> - Modern Java with latest features</li>
                  <li><strong>Spring Data JPA</strong> - For database operations and ORM</li>
                  <li><strong>Spring Security</strong> - For authentication and authorization</li>
                  <li><strong>PostgreSQL 16</strong> - Relational database for data persistence</li>
                  <li><strong>Flyway</strong> - Database migration tool</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Development Tools</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li><strong>Git</strong> - Version control</li>
                  <li><strong>Maven/Gradle</strong> - Build automation</li>
                  <li><strong>Docker</strong> - Containerization (for deployment)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Architecture</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">System Architecture</h3>
              <div className="text-gray-700 space-y-2">
                <p>
                  The application follows a <strong>client-server architecture</strong> with clear separation
                  between frontend and backend:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Frontend (Next.js)</strong>: Handles UI/UX, user interactions, and client-side state management</li>
                  <li><strong>Backend (Spring Boot)</strong>: Provides RESTful APIs, business logic, and data processing</li>
                  <li><strong>Database (PostgreSQL)</strong>: Stores all persistent data including properties, rooms, reservations, etc.</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Flow</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>User interacts with Next.js frontend (searches, views properties, makes bookings)</li>
                <li>Frontend makes HTTP requests to Spring Boot REST API endpoints</li>
                <li>Spring Boot processes requests, applies business logic, and queries PostgreSQL</li>
                <li>Database returns data to Spring Boot</li>
                <li>Spring Boot formats and returns JSON responses to frontend</li>
                <li>Frontend updates UI based on API responses</li>
              </ol>
            </div>
          </section>

          {/* Implementation Details */}
          <section id="implementation" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Implementation Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Frontend Implementation</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Project Structure</h4>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`app/
├── page.tsx              # Home page with search and property listing
├── layout.tsx            # Root layout with Navbar and Footer
├── properties/
│   └── [id]/page.tsx     # Property details page
├── booking/page.tsx      # Booking form page
├── bookings/page.tsx      # User bookings list
└── admin/                # Admin pages
    ├── properties/
    ├── room-types/
    └── inventory/

components/
├── Navbar.tsx            # Navigation bar
├── Footer.tsx            # Footer component
├── PropertyCard.tsx      # Property card display
├── RoomTypeCard.tsx      # Room type card
├── PropertyFilters.tsx   # Sidebar filters
├── FeaturesSection.tsx   # Features section
├── SearchBar.tsx         # Search bar component
├── DatePicker.tsx        # Date picker input
├── PriceBadge.tsx        # Price display component
└── BookingSummary.tsx   # Booking summary card`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Backend Implementation (Spring Boot)</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Modules</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li><strong>Catalog Module</strong>: Manages properties, room types, rooms, and rate plans</li>
                    <li><strong>Availability Module</strong>: Handles availability checks and inventory management</li>
                    <li><strong>Reservation Module</strong>: Manages booking lifecycle (create, confirm, cancel)</li>
                    <li><strong>Payment Module</strong>: Integrates with payment gateways (Razorpay/Stripe/PayU)</li>
                    <li><strong>Housekeeping Module</strong>: Tracks room status and cleaning logs</li>
                    <li><strong>User & Auth Module</strong>: Handles authentication and role-based access control</li>
                    <li><strong>Reporting Module</strong>: Generates occupancy, ADR, and RevPAR reports</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Database Schema (PostgreSQL)</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Core Entities</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                    <li><strong>property</strong>: Hotel properties with address, contact info, timezone</li>
                    <li><strong>room_type</strong>: Room categories with occupancy limits and descriptions</li>
                    <li><strong>room</strong>: Individual rooms linked to room types and properties</li>
                    <li><strong>rate_plan</strong>: Pricing plans with cancellation policies</li>
                    <li><strong>rate_calendar</strong>: Daily pricing and availability rules</li>
                    <li><strong>inventory</strong>: Daily room availability (total, reserved, out-of-order)</li>
                    <li><strong>reservation</strong>: Booking records with guest info and status</li>
                    <li><strong>payment</strong>: Payment transactions and refunds</li>
                    <li><strong>user</strong>: System users with roles (ADMIN, AGENT, HOUSEKEEPING, GUEST)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* API Endpoints */}
          <section id="api-endpoints" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. API Endpoints</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Public/Guest APIs</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <code className="text-blue-600 font-mono">GET /v1/properties</code>
                    <p className="text-gray-600 mt-1">Fetch all available properties</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <code className="text-blue-600 font-mono">GET /v1/property/{'{id}'}/details</code>
                    <p className="text-gray-600 mt-1">Get detailed property information including room types</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <code className="text-blue-600 font-mono">POST /v1/admin/search-details</code>
                    <p className="text-gray-600 mt-1">Search properties by location, check-in, and check-out dates</p>
                    <p className="text-gray-500 text-xs mt-1">Body: {`{ checkIn, checkOut, location }`}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Admin APIs</h3>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-green-500 pl-4">
                    <code className="text-green-600 font-mono">POST /v1/admin/properties</code>
                    <p className="text-gray-600 mt-1">Create new property</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <code className="text-green-600 font-mono">GET /v1/admin/properties</code>
                    <p className="text-gray-600 mt-1">List all properties (admin view)</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <code className="text-green-600 font-mono">POST /v1/admin/room-types</code>
                    <p className="text-gray-600 mt-1">Create room type</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Components */}
          <section id="components" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Frontend Components</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Reusable Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Layout Components</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>Navbar - Sticky navigation with menu</li>
                      <li>Footer - Site footer with links</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Property Components</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>PropertyCard - Property display card</li>
                      <li>PropertyFilters - Sidebar filter component</li>
                      <li>RoomTypeCard - Room type information</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Form Components</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>SearchBar - Search form</li>
                      <li>DatePicker - Date input component</li>
                      <li>BookingSummary - Booking details summary</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Display Components</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4">
                      <li>PriceBadge - Price display</li>
                      <li>FeaturesSection - Features showcase</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Implemented */}
          <section id="features" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Features Implemented</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">User Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Property Search</strong>: Search properties by location, dates, guests, and rooms</li>
                  <li><strong>Property Listing</strong>: View all available properties with images, prices, and ratings</li>
                  <li><strong>Property Details</strong>: Detailed view with room types, descriptions, and contact information</li>
                  <li><strong>Filtering</strong>: Filter properties by price range, room type, and minimum rating</li>
                  <li><strong>Booking Flow</strong>: Complete booking process with guest information form</li>
                  <li><strong>My Bookings</strong>: View all user reservations with status and details</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Admin Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Property Management</strong>: Create, edit, and delete properties</li>
                  <li><strong>Room Type Management</strong>: Manage room types with capacity and pricing</li>
                  <li><strong>Inventory Management</strong>: View room inventory by date with availability tracking</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Features</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Responsive Design</strong>: Mobile-first approach with Tailwind CSS</li>
                  <li><strong>API Integration</strong>: RESTful API calls with proper error handling</li>
                  <li><strong>State Management</strong>: React hooks for component state</li>
                  <li><strong>URL Parameters</strong>: Search parameters preserved in URL for sharing</li>
                  <li><strong>Loading States</strong>: Loading indicators during API calls</li>
                  <li><strong>Error Handling</strong>: Graceful error messages and empty states</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Property Search Flow</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>User enters search criteria (location, dates, guests, rooms) on home page</li>
                  <li>Frontend calls <code className="bg-blue-100 px-2 py-1 rounded">POST /v1/admin/search-details</code> with search parameters</li>
                  <li>Backend queries PostgreSQL for matching properties based on availability</li>
                  <li>Results are filtered and returned as JSON</li>
                  <li>Frontend displays properties in a responsive grid layout</li>
                  <li>User can apply additional filters (price, rating) client-side</li>
                </ol>
              </div>

              <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Property Details Flow</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                  <li>User clicks on a property card</li>
                  <li>Frontend navigates to <code className="bg-green-100 px-2 py-1 rounded">/properties/{'{id}'}</code></li>
                  <li>Page calls <code className="bg-green-100 px-2 py-1 rounded">GET /v1/property/{'{id}'}/details</code></li>
                  <li>Backend fetches property details, room types, and pricing from PostgreSQL</li>
                  <li>Frontend displays property information, room types with descriptions, and contact details</li>
                  <li>User can select a room type to proceed with booking</li>
                </ol>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Backend Architecture (Spring Boot)</h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    The Spring Boot backend follows a <strong>layered architecture</strong>:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Controller Layer</strong>: REST endpoints that handle HTTP requests/responses</li>
                    <li><strong>Service Layer</strong>: Business logic and orchestration</li>
                    <li><strong>Repository Layer</strong>: Data access using Spring Data JPA</li>
                    <li><strong>Entity Layer</strong>: JPA entities mapping to database tables</li>
                  </ul>
                  <p className="mt-3">
                    <strong>Database Operations</strong>: Spring Data JPA provides automatic query generation
                    and transaction management. Flyway handles database migrations to ensure schema consistency.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Future Enhancements */}
          <section id="future" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Future Enhancements</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Planned Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Booking & Payments</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4 text-sm">
                    <li>Complete booking creation with payment integration</li>
                    <li>Payment gateway integration (Razorpay/Stripe)</li>
                    <li>Booking confirmation emails</li>
                    <li>Cancellation and refund processing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Authentication</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4 text-sm">
                    <li>User registration and login</li>
                    <li>JWT-based authentication</li>
                    <li>Role-based access control (RBAC)</li>
                    <li>Password reset functionality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Advanced Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4 text-sm">
                    <li>Check-in/Check-out management</li>
                    <li>Housekeeping status updates</li>
                    <li>Rate plan management</li>
                    <li>Promotional codes and discounts</li>
                    <li>Multi-property support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Reporting & Analytics</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 ml-4 text-sm">
                    <li>Occupancy reports</li>
                    <li>Revenue analytics (ADR, RevPAR)</li>
                    <li>Daily arrivals/departures</li>
                    <li>Dashboard with key metrics</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Backend PRD Summary */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Backend Architecture (PRD Summary)</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4 text-gray-700">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Core Modules</h3>
                  <p className="text-sm">
                    The Spring Boot backend is organized into modular components: Catalog (properties/rooms/rates),
                    Availability (inventory management), Reservation (booking lifecycle), Payment (gateway integration),
                    Housekeeping (room status), User & Auth (authentication/authorization), and Reporting (analytics).
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Availability Algorithm</h3>
                  <p className="text-sm">
                    The system uses an atomic inventory update mechanism to prevent overbooking. When a booking is initiated,
                    a hold is created with a TTL (time-to-live) in Redis, and inventory is reserved atomically. This ensures
                    no double-bookings even under concurrent load.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Security & Compliance</h3>
                  <p className="text-sm">
                    The backend implements OAuth2/OIDC with JWT tokens, password hashing (Argon2id/BCrypt), input validation,
                    and audit logging. Payment data follows PCI-DSS guidelines with tokenization.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Performance & Scalability</h3>
                  <p className="text-sm">
                    The system is designed for horizontal scaling with stateless instances, database read replicas,
                    Redis caching, and optimized queries. Target performance: P95 latency &lt; 300ms for reads,
                    99.9% availability.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact & Support */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Resources</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                For more detailed information about the backend implementation, refer to the Product Requirements Document (PRD)
                which outlines the complete system architecture, data models, API specifications, and implementation guidelines.
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Note:</strong> This documentation reflects the current state of the implementation. As new features
                are added, this page will be updated accordingly.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

