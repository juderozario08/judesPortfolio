export interface TableOfContentsItem {
  id: string;
  partNumber: number | string;
  title: string;
  status: 'published' | 'upcoming';
  description?: string;
}

export interface BlogSection {
  id?: string;
  partNumber?: number | string;
  badge?: string;
  title: string;
  content: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  tradeoff?: {
    choice: string;
    alternatives: string[];
    why: string;
    tradeoff: string;
  };
  codeSnippet?: {
    language: string;
    fileName: string;
    code: string;
    explanation: string;
  };
  callout?: {
    type: 'tip' | 'warning' | 'insight';
    title: string;
    message: string;
  };
}

export interface BlogPost {
  slug: string;
  projectId: string;
  projectTitle: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tags: string[];
  heroSummary: string;
  metrics?: { label: string; value: string }[];
  tableOfContents?: TableOfContentsItem[];
  sections: BlogSection[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "radius-system-architecture",
    projectId: "radius",
    projectTitle: "Radius - Cross-Platform Mobile App",
    title: "Architecting Radius: Building a Scalable Retail Operations Engine from Scratch",
    subtitle: "A step-by-step story of how I built a multi-store retail system in Go and React Native, starting with a clean foundation and turning it into a reliable, real-time operating system for store employees.",
    date: "September 2026",
    readTime: "45 min read",
    tags: ["Go", "System Design", "PostgreSQL", "Clean Architecture", "WebSockets", "Redis", "React Native"],
    heroSummary: "In a busy retail store, software simply cannot freeze or crash. When cashiers are ringing up long checkout lines and warehouse staff are scanning incoming inventory across multiple store locations, even a few seconds of lag causes real-world chaos. I built Radius from scratch to solve these everyday headaches. Here is an honest look at how I designed the system, the practical problems I ran into, and why I chose simplicity and reliability over complicated frameworks.",
    metrics: [
      { label: "Backend Architecture", value: "3-Tier Go Monolith" },
      { label: "Database Migrations", value: "45 Versioned Up/Down" },
      { label: "DB Driver & Pool", value: "pgx/v5 (50 Conns)" },
      { label: "Synthetic Test Scale", value: "70K+ Seeded Records" }
    ],
    tableOfContents: [
      {
        id: "part-1-system-architecture",
        partNumber: 1,
        title: "System Architecture: 3-Tier Monolith & Top-Level Design",
        status: "published",
        description: "How dividing code into three strict tiers (transport handlers, business services, and data repositories) keeps mobile scanners and cash registers rock-solid."
      },
      {
        id: "part-1-interfaces",
        partNumber: "1.1",
        title: "Using Interfaces: Making Parts Easy to Test and Swap",
        status: "published",
        description: "Why writing simple contracts for what the database should do makes the code much easier to test without running a live database."
      },
      {
        id: "part-1-manual-di",
        partNumber: "1.2",
        title: "Connecting the Pieces by Hand in main.go",
        status: "published",
        description: "Why assembling components explicitly is much safer than relying on complicated background magic that can break unexpectedly."
      },
      {
        id: "part-1-context-propagation",
        partNumber: "1.3",
        title: "Handling Dropped Wi-Fi and Canceling Unneeded Work",
        status: "published",
        description: "How canceling database queries the moment an employee walks out of Wi-Fi range keeps the server fast and responsive."
      },
      {
        id: "part-2-database-design",
        partNumber: 2,
        title: "Database Architecture: Relational Schema & Scaled Testing",
        status: "published",
        description: "Designing a 45-migration relational schema for multi-store retail, and stress-testing it with 70,000+ synthetic records."
      },
      {
        id: "part-2-database-pgx",
        partNumber: "2.1",
        title: "Database Connections: Handling Rush Hours with pgx/v5",
        status: "published",
        description: "Tuning connection limits and running versioned migrations on startup so dozens of barcode scanners can work at once without crashing."
      },
      {
        id: "part-3-real-time-websockets",
        partNumber: 3,
        title: "Real-Time Updates: Instant Notifications Across Store Branches",
        status: "published",
        description: "Replacing battery-draining page refreshes with a live communication hub, ensuring Store 1 never receives notifications meant for Store 2."
      },
      {
        id: "part-3-concurrency",
        partNumber: "3.1",
        title: "Handling Slow Phones in Wi-Fi Dead Zones",
        status: "published",
        description: "What happens when an employee walks into a back stock room with zero Wi-Fi, and how I drop stuck connections so the rest of the store keeps running."
      },
      {
        id: "part-3-react-native",
        partNumber: "3.2",
        title: "Mobile Reliability: Reconnecting Gracefully and Saving Battery",
        status: "published",
        description: "Automatically pausing the live connection when the phone is in a pocket to save battery, and reconnecting the instant it unlocks."
      },
      {
        id: "part-3-connection-tickets",
        partNumber: "3.3",
        title: "Securing WebSockets: Single-Use Connection Tickets",
        status: "published",
        description: "Why passing secret auth tokens in WebSocket URLs leaks credentials into proxy logs, and how 30-second single-use tickets keep connections secure."
      },
      {
        id: "part-4-auth-sessions",
        partNumber: 4,
        title: "Authentication, Device Security & Session Management",
        status: "published",
        description: "Enforcing single active sessions per employee, preventing accidental login collisions with IP-aware checks, and enabling remote one-tap session revocation."
      },
      {
        id: "part-4-single-session",
        partNumber: "4.1",
        title: "Stopping Duplicate Logins with IP-Aware Session Takeover",
        status: "published",
        description: "How detecting existing sessions on the store network prompts confirmation before session takeover, and how managers terminate lost handhelds."
      },
      {
        id: "part-5-cycle-counting",
        partNumber: 5,
        title: "Routine Store Audits, Concurrency Locking & Shift Handovers",
        status: "published",
        description: "Preventing audit race conditions with automatic concurrency locks, tracking real-time dollar shrinkage, and seamlessly handing in-progress counts between shifts."
      },
      {
        id: "part-5-concurrency",
        partNumber: "5.1",
        title: "Auto-Assignment Locks & Shift Ownership Transfer",
        status: "published",
        description: "Why single-employee count locking stops double-counted shelves, and how managers transfer active audits to incoming shifts without losing data."
      },
      {
        id: "part-6-fill-replenishment",
        partNumber: 6,
        title: "Shelf Restocking & Closed-Loop Fill Reports (IS4TC + POS)",
        status: "published",
        description: "Linking cash register sales velocity with mobile empty hole scans in Redis to generate replenishment pick lists ordered by physical warehouse aisle."
      },
      {
        id: "part-6-closed-loop",
        partNumber: "6.1",
        title: "Closing the Loop Between Sales Velocity Logs and Empty Shelf Scans",
        status: "published",
        description: "How mobile aisle scans and central transaction logs feed an ephemeral Redis session to build aisle-by-aisle picking routes through the warehouse."
      },
      {
        id: "part-7-omnichannel-fulfillment",
        partNumber: 7,
        title: "In-Store Pickup (BOPIS) & Omnichannel Order Fulfillment",
        status: "published",
        description: "Guiding associates through mobile item picking with assignment locks, item status tracking, and Go background workers that automatically cancel expired orders."
      },
      {
        id: "part-7-picking-locks",
        partNumber: "7.1",
        title: "Order Assignment Locks & Background Expiration Workers",
        status: "published",
        description: "Preventing picker collisions with mutual exclusion locks and running automated background sweeps to return abandoned BOPIS stock to sellable inventory."
      },
      {
        id: "part-8-product-catalog",
        partNumber: 8,
        title: "Product Catalog, Fast Search & Smart Caching",
        status: "published",
        description: "Delivering low-millisecond barcode scans using two-tier Redis caching, negative caching, singleflight stampede protection, and pg_trgm GIN indexing."
      },
      {
        id: "part-8-barcode-caching",
        partNumber: "8.1",
        title: "Two-Tier Barcode Lookups and Negative Caching",
        status: "published",
        description: "Splitting global barcode identity from store stock snapshots to eliminate database joins, and caching invalid scans to protect PostgreSQL."
      },
      {
        id: "part-8-singleflight-search",
        partNumber: "8.2",
        title: "Stopping Cache Stampedes with Singleflight and Trigram Search",
        status: "published",
        description: "Deduplicating concurrent cache misses with Go singleflight, adding jittered TTLs, and speeding up catalog searches with PostgreSQL pg_trgm."
      },
      {
        id: "part-8-mobile-swr",
        partNumber: "8.3",
        title: "Mobile Speed: Stale-While-Revalidate (SWR) for Instant Screen Loads",
        status: "published",
        description: "Eliminating screen flicker on React Native handhelds by returning cached data instantly while quietly refreshing in the background."
      },
      {
        id: "part-9-store-hierarchy",
        partNumber: 9,
        title: "Multi-Store Structure & Branch Management",
        status: "published",
        description: "How head office administrators and store staff can easily switch between store branches without cross-store data leaks."
      },
      {
        id: "part-9-store-switching",
        partNumber: "9.1",
        title: "Dynamic Branch Switching, Scoped Data Isolation & SWR Cache Partitioning",
        status: "published",
        description: "How store-scoped token headers and automatic client cache wipes let managers switch between retail branches without data contamination."
      },
      {
        id: "part-10-mims-inventory",
        partNumber: 10,
        title: "Mobile Inventory Management (MIMS) & Stock Shelving",
        status: "published",
        description: "Tracking exactly where products sit in the warehouse using 9-digit shelf coordinates and 11 distinct stock statuses."
      },
      {
        id: "part-10-coordinates-buckets",
        partNumber: "10.1",
        title: "9-Digit Warehouse Coordinates & 11 Sub-Inventory Buckets",
        status: "published",
        description: "Navigating 40,000 sq.ft. stores using Aisle-Bay-Shelf-Position coordinates and tracking stock across 11 granular condition buckets."
      },
      {
        id: "part-10-adjustment-workflows",
        partNumber: "10.2",
        title: "Supervisor Approval Queues for Floor Stock Adjustments",
        status: "published",
        description: "Preventing rogue stock count edits by routing barcode variance submissions into supervisor review queues before committing."
      },
      {
        id: "part-11-inbound-logistics",
        partNumber: 11,
        title: "Inbound Logistics, Box Scanning & Inter-Store Transfers",
        status: "published",
        description: "Accepting truck deliveries, scanning master container barcodes, and routing items safely between retail stores."
      },
      {
        id: "part-11-po-lpr-receiving",
        partNumber: "11.1",
        title: "Purchase Order Verification & 20-Digit License Plate Receiving (LPR)",
        status: "published",
        description: "Item-by-item barcode verification and high-speed master carton scans that unpack hundreds of units in a single scan."
      },
      {
        id: "part-11-stock-transfers",
        partNumber: "11.2",
        title: "Inter-Store Transfers: Manual Verification vs. One-Tap Quick Receive",
        status: "published",
        description: "Protecting inventory transfers between stores with strict manual check requirements and one-tap receiving modes."
      },
      {
        id: "part-12-pos-transactions",
        partNumber: 12,
        title: "Real-Time Transaction Viewer & Canadian Tax Rules",
        status: "published",
        description: "Polling real-time sales history, calculating provincial taxes dynamically, and securely auditing inventory deductions."
      },
      {
        id: "part-12-canadian-taxes",
        partNumber: "12.1",
        title: "Dynamic Canadian Provincial Taxes (GST/PST/HST) Without Floating-Point Drift",
        status: "published",
        description: "Eliminating rounding discrepancies by computing exact provincial sales taxes in fixed-point integer cents per 100,000."
      },
      {
        id: "part-12-pos-velocity",
        partNumber: "12.2",
        title: "Real-Time Sales Feeds, PCI Card Masking & Floor Velocity Logs",
        status: "published",
        description: "Broadcasting sales over WebSockets, storing only the last 4 card digits, and feeding real-time velocity into IS4TC shelf replenishment."
      },
      {
        id: "part-13-print-orders",
        partNumber: 13,
        title: "Print & Copy Commercial Service Center",
        status: "published",
        description: "Managing custom client print workflows, document specifications, turnaround deadlines, and deposit calculations."
      },
      {
        id: "part-13-print-workflows",
        partNumber: "13.1",
        title: "Production Lifecycle State Machines & Service Role Guarding",
        status: "published",
        description: "Managing custom commercial print queues, paper stock specs, turnaround deadlines, and state transitions guarded by employee roles."
      },
      {
        id: "part-14-immutable-ledger",
        partNumber: 14,
        title: "Permanent Activity History & Audit Logs",
        status: "published",
        description: "Recording every single inventory adjustment into a permanent history log so managers can always see who moved what and when."
      },
      {
        id: "part-14-transaction-audit",
        partNumber: "14.1",
        title: "Transaction-Atomic Audit Logging & Immutable Inventory Ledgers",
        status: "published",
        description: "Ensuring zero phantom stock movements by executing append-only audit records inside the exact same database transaction as inventory mutations."
      }
    ],
    sections: [
      {
        id: "part-1-system-architecture",
        partNumber: 1,
        badge: "Architecture Foundation",
        title: "System Architecture: 3-Tier Clean Monolith Blueprint",
        content: [
          "When building software that has to run on cash registers, warehouse barcode scanners, and manager tablets all at once, the easiest mistake to make is stuffing everything into one giant file. When database queries, screen logic, and store calculation rules are all mixed together, fixing a small bug in one place accidentally breaks something completely unrelated.",
          "To keep Radius clean and maintainable, I organized the system into a strict, layered architecture. Below is the interactive System Architecture & End-to-End Data Flow engine. You can click any component across the 5 tiers to inspect its responsibilities, code file location, and production safeguards, or select live simulation flows (such as BOPIS fulfillment or cycle counting) to trace requests end-to-end.",
          "• Tier 1: Client Frontends (React Native & Expo SDK 54): Handheld barcode scanners, cash registers, and tablets running native workflows for sales floor empty hole scanning (IS4TC), BOPIS order picking, register checkout, and weekly cycle count audits.",
          "• Tier 2: Ingress & Security Middleware (Port 8080): IP token bucket rate limiting, JWT validation with store-tenancy checks, context cancellation propagation, and Gorilla WebSocket protocol upgraders.",
          "• Tier 3: Transport Handlers (internal/handler): The front desk of the API. Handlers parse incoming JSON bodies, validate query parameters, delegate work to domain services via interfaces, and serialize JSON responses. Handlers never talk directly to PostgreSQL or Redis.",
          "• Tier 4: Domain Business Services (internal/service): The brain of Radius. Houses retail business logic (cycle count locks, session collision detection, pick-list aisle-by-aisle sorting) and orchestrates background goroutine workers and the real-time WebSocket hub.",
          "• Tier 5: Persistence & Caching (internal/repository): Manages PostgreSQL relational tables via pgx/v5 connection pools, Redis in-memory token blacklists and ephemeral floor sessions, and the immutable audit ledger."
        ],
        callout: {
          type: "insight",
          title: "The Simple Rule of Layers",
          message: "Information only moves in one direction: Handlers ask Services for help, Services ask Repositories for data, and Repositories talk to the Database. Nothing ever skips a step or reaches backwards."
        }
      },
      {
        id: "part-1-interfaces",
        partNumber: "1.1",
        badge: "Design Patterns",
        title: "1.1 Using Interfaces: Making Parts Easy to Test and Swap",
        content: [
          "In many projects, the business logic is glued directly to the database. If your user service is hardcoded to talk directly to PostgreSQL, testing that service means you must run a real, live database every single time you test. That makes tests slow, fragile, and frustrating to maintain.",
          "In Go, you can use interfaces, which are essentially simple contracts. Instead of saying 'the service must talk directly to this specific PostgreSQL database', the service simply says: 'I just need something that knows how to find an employee by email and save a new employee.'",
          "In `internal/service/interfaces.go`, I wrote down these contracts for every major part of the store:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/interfaces.go",
          code: `package service

import (
    "context"
    "radius/internal/models"
)

// EmployeeRepository decouples auth and employee business rules
// from the underlying PostgreSQL implementation.
type EmployeeRepository interface {
    GetEmployeeByEmail(ctx context.Context, email string) (*models.Employee, error)
    GetEmployeeById(ctx context.Context, id int) (*models.Employee, error)
    GetEmployeeByEmailWithSession(ctx context.Context, email string) (*models.GetEmployeeByEmailWithSession, error)
    GetAllEmployees(ctx context.Context, limit, offset int, storeId *int) ([]models.Employee, int, error)
    CreateEmployee(ctx context.Context, model models.CreateEmployeeRow) (*models.CreateEmployeeResponse, error)
    TerminateEmployeeById(ctx context.Context, id int) error
    ActivateEmployeeById(ctx context.Context, id int) error
    UpdateEmployee(ctx context.Context, body models.Employee) error
}

// StoreRepository defines boundary controls for retail store branches.
type StoreRepository interface {
    GetAllStores(ctx context.Context, pageSize, pageNumber int) ([]models.Store, int, error)
    UpdateStore(ctx context.Context, body models.UpdateStoreRequest) error
    CreateStore(ctx context.Context, body models.CreateStoreRequest) (*models.Store, error)
    ActivateStore(ctx context.Context, storeId int) error
    DeactivateStore(ctx context.Context, storeId int) error
    GetStore(ctx context.Context, storeId int) (*models.Store, error)
}`,
          explanation: "Because the employee service relies on this contract rather than a real database connection, I can easily create a lightweight fake version for automated tests. The tests run in milliseconds on any machine without having to install or start a database."
        },
        tradeoff: {
          choice: "Defining Data Contracts in the Service Layer",
          alternatives: ["Direct Database Calls Everywhere", "Database-Owned Interfaces", "Heavy All-In-One ORM Libraries"],
          why: "It keeps the business logic completely independent. The code that decides store rules does not care what brand of database holds the data.",
          tradeoff: "Writing these contracts takes a few extra minutes upfront compared to writing quick, direct queries everywhere."
        }
      },
      {
        id: "part-1-manual-di",
        partNumber: "1.2",
        badge: "Backend Core",
        title: "1.2 Connecting Everything by Hand in main.go",
        content: [
          "Radius handles over 15 different store areas, including logins, barcode scanning, stock audits, daily restocking, checkout, and live order alerts. With so many moving parts, connecting them together can easily get confusing.",
          "Many developers reach for complicated dependency injection tools that use runtime inspection to magically stitch parts together in the background. But when something goes wrong with those tools, the error messages are often cryptic, and the program can crash unexpectedly while running.",
          "Instead, I chose to connect every single piece explicitly by hand in `radius-backend/cmd/api/main.go`. When the program starts up, it reads like an open recipe book where you can see every single connection being made:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/cmd/api/main.go",
          code: `func main() {
    cfg, err := config.LoadConfig()
    if err != nil {
        log.Fatalf("Failed to load config: %v", err)
    }

    // 1. Establish Database & Redis Connections
    db, err := database.ConnectDB(cfg.DatabaseURL)
    if err != nil {
        log.Fatalf("Database connection failure: %v", err)
    }
    defer db.Close()

    // 2. Instantiate Concrete Repositories (Data Layer)
    employeeRepo := repository.NewEmployeeRepo(db.DB)
    sessionRepo  := repository.NewSessionRepo(db.DB)
    storeRepo    := repository.NewStoreRepo(db.DB)
    inventoryRepo:= repository.NewInventoryRepo(db.DB)
    ordersRepo   := repository.NewOrdersRepo(db.DB)
    productsRepo := repository.NewProductRepo(db.DB)

    // 3. Instantiate Domain Services (Business Logic Layer)
    sessionService := service.NewSessionService(sessionRepo, cfg.JWTSecretKey, redisClient)
    authService    := service.NewAuthService(employeeRepo, sessionService)
    storeService   := service.NewStoreService(storeRepo, employeeRepo, productsRepo)
    inventoryService := service.NewInventoryService(storeRepo, employeeRepo, sessionRepo, inventoryRepo, productsRepo)

    // 4. Instantiate HTTP Handlers (Transport Layer)
    appHandlers := router.Handlers{
        AuthHandler:      handler.NewAuthHandler(authService),
        StoreHandler:     handler.NewStoreHandler(storeService),
        InventoryHandler: handler.NewInventoryHandler(inventoryService),
        // ...
    }

    // 5. Mount Routes & Start Server
    r := router.NewRouter(router.Config{
        Handlers:    appHandlers,
        JWTSecret:   cfg.JWTSecretKey,
        AuthService: authService,
        AppConfig:   cfg,
    })
}`,
          explanation: "Connecting components by hand means there are zero surprises. If I forget to pass a database connection to a service, the Go compiler tells me immediately before the program ever runs. Any developer can open main.go and trace exactly how the whole system fits together in thirty seconds."
        },
        tradeoff: {
          choice: "Manual Assembly in main.go",
          alternatives: ["Automatic Background Injection Libraries (Uber Dig / Fx)", "Code-Generation Tools (Google Wire)", "Global Variables Everywhere"],
          why: "No hidden magic, immediate compile-time errors if anything is missing, and crystal-clear visibility when troubleshooting issues.",
          tradeoff: "The main.go file is about 180 lines long, but those 180 lines save hours of debugging down the road."
        }
      },
      {
        id: "part-1-context-propagation",
        partNumber: "1.3",
        badge: "Reliability",
        title: "1.3 Handling Dropped Wi-Fi and Canceling Unneeded Work",
        content: [
          "In a real store or warehouse, employees are constantly moving. They lock their phone, walk behind concrete pillars, or step outside where Wi-Fi drops out. In traditional web servers, if a user's phone disconnects while waiting for an answer, the database blindly keeps running the query in the background, wasting precious server resources on an answer nobody will ever see.",
          "In Radius, every single query and function accepts a Go `context.Context`. This acts like a live safety cord between the phone and the database.",
          "Here is how it works in the employee lookup query:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/repository/employee_repo.go",
          code: `func (r *EmployeeRepo) GetEmployeeByEmail(ctx context.Context, email string) (*models.Employee, error) {
    var employee models.Employee
    query := \`
        SELECT
            e.employee_id, e.email, e.password_hash, e.store_id,
            e.first_name, e.last_name, e.role, e.phone, e.address,
            e.city, e.province, e.postal_code, e.is_active, e.is_terminated
        FROM employees as e
        WHERE e.email = $1;
    \`

    // QueryRowContext immediately cancels the Postgres execution
    // if the client drops connection or exceeds timeout
    err := r.db.QueryRowContext(ctx, query, email).Scan(
        &employee.EmployeeId, &employee.Email, &employee.PasswordHash,
        &employee.StoreId, &employee.FirstName, &employee.LastName, &employee.Role,
        &employee.Phone, &employee.Address, &employee.City,
        &employee.Province, &employee.PostalCode, &employee.IsActive, &employee.IsTerminated,
    )
    if errors.Is(err, sql.ErrNoRows) {
        return nil, nil
    }
    if err != nil {
        return nil, err
    }
    return &employee, nil
}`,
          explanation: "Using QueryRowContext tells PostgreSQL to stop work immediately if the phone loses connection or the request times out. This keeps the database fast and prevents abandoned requests from hogging memory."
        }
      },
      {
        id: "part-2-database-design",
        partNumber: 2,
        badge: "Database Architecture",
        title: "2. Database Architecture: Relational Foundations & Scaled Multi-Store Schema",
        content: [
          "A multi-store retail operating system lives and dies by its database. When inventory levels drop on the sales floor, online customers reserve pickup orders, and managers audit inventory from their phones, the database must enforce strict data integrity without creating query bottlenecks.",
          "Rather than using an unstructured NoSQL store or hiding critical schema operations behind an unoptimized ORM, I modeled Radius around a strictly relational schema across 45 versioned UP/DOWN migrations in PostgreSQL. Below is the interactive Entity-Relationship (ER) Explorer and Canvas Diagram mapping every core domain of the platform.",
          "• Multi-Store Partitioning: Every operational table is scoped by `store_id`, creating rock-solid data boundaries between retail branches while allowing head office and regional managers to run unified enterprise rollups.",
          "• 11 Sub-Inventory Status Buckets: Retail stock is never just 'in stock' or 'out of stock'. The `mims_inventory` schema divides units into 11 distinct buckets (`new_qty`, `open_box_qty`, `demo_qty`, `bopis_qty`, `rtv_qty`, `quarantine_qty`, etc.) so online pickup allocations or broken units are never accidentally sold to in-store customers.",
          "• Standardized 9-Digit Warehouse Shelving: Backroom inventory is indexed through `mims_locations` using standardized aisle coordinates (AA-BB-SS-PPP). This enables the replenishment engine to build aisle-by-aisle routes that minimize walking time during restocking runs.",
          "• Trigram Text Search & Composite Covering Indexes: Migrations 42 and 43 introduced the PostgreSQL `pg_trgm` extension and GIN indexes on product name, SKU and description, alongside a covering index on inventory lookups. Measured with `EXPLAIN ANALYZE` on 10,000 products, a wildcard search dropped from about 20ms (sequential scan) to about 1ms (bitmap index scan).",
          "• Synthetic Scale Verification: To verify schema performance under heavy store traffic, I wrote a Python Faker test generator orchestrated by a Go runner. It seeded over 70,000 inventory rows, 50,000 transaction log records, 10,000 master products, 5,000 online orders, and 1,000 cycle count audits across 7 store branches, ensuring indexes and connection pools keep typical lookups in the low single-digit milliseconds."
        ],
        callout: {
          type: "insight",
          title: "Why Relational Integrity Protects Retail Operations",
          message: "In retail, phantom inventory costs real money. Enforcing strict foreign keys and check constraints at the PostgreSQL database level prevents orphaned stock records, negative inventory quantities, and mismatched cashier drawer settlements before bad data can ever enter the system."
        }
      },
      {
        id: "part-2-database-pgx",
        partNumber: "2.1",
        badge: "Data Layer",
        title: "2.1 Database Connections: Handling Rush Hours with pgx/v5 Pooling",
        content: [
          "While the code logic runs in Go, retail systems live and die by how well they handle busy hours. On a busy Saturday afternoon, dozens of employees are scanning inventory shelves at the exact same moment managers are reviewing real-time transaction logs.",
          "Instead of using the older `lib/pq` library, I chose the modern `pgx/v5` driver. I carefully tuned the connection pool settings in `internal/database/database.go` to keep the store snappy and reliable:",
          "• Limit open connections to 50 (`SetMaxOpenConns`): Prevents the database server from running out of memory while handling peak scan traffic across store branches.",
          "• Keep 25 connections warm (`SetMaxIdleConns`): Keeps ready-to-use lines open so when a worker scans a barcode, the response is instant without waiting to establish a new connection from scratch.",
          "• Refresh connections every 15 minutes (`SetConnMaxLifetime`): Periodically closes and re-opens connections to cleanly handle cloud database restarts or brief network hiccups.",
          "I also built database migrations directly into the startup process. When running in development or testing, the server checks for any new database table updates and applies them automatically before opening up for requests:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/database/database.go",
          code: `func (d *DB) RunMigrations(migrationsPath string) error {
    log.Println("Running database migrations...")

    driver, err := pgxmigrate.WithInstance(d.DB, &pgxmigrate.Config{})
    if err != nil {
        return fmt.Errorf("creating migration driver: %w", err)
    }

    m, err := migrate.NewWithDatabaseInstance("file://"+migrationsPath, "pgx5", driver)
    if err != nil {
        return fmt.Errorf("loading migration files: %w", err)
    }

    // Execute any pending UP migrations
    if err := m.Up(); err != nil && err != migrate.ErrNoChange {
        return fmt.Errorf("error running migrations: %w", err)
    }

    log.Println("Database migrations applied successfully")
    return nil
}`,
          explanation: "By checking if any changes are needed, the server smoothly skips migrations if the database is already up to date. This ensures quick startup times and keeps database tables perfectly synchronized across the team."
        },
        callout: {
          type: "tip",
          title: "A Safety Guard for Production",
          message: "In live production, I never run migrations automatically on server startup. If five servers started at the exact same second, they would compete to update the database at once. In production, updates are run through a dedicated release pipeline."
        }
      },
      {
        id: "part-3-real-time-websockets",
        partNumber: 3,
        badge: "Real-Time System",
        title: "3. Real-Time Operations: Building a Live Store Notification Hub",
        content: [
          "Once the foundation and database were solid, the next big challenge appeared on the sales floor: keeping all employees up to date in real time.",
          "When a customer buys an item online for in-store pickup, store associates need an instant alert on their handheld devices so they can pick the item off the shelf right away, not ten minutes later after manually pulling down to refresh.",
          "At first, having phones constantly ask the server 'Are there any new orders yet?' every few seconds drained phone batteries and hammered the database with useless checks. To fix this, I built a live WebSocket communication hub in Go."
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/websocket/hub.go",
          code: `type Hub struct {
    // Master registry of all connected clients
    clients map[*Client]bool

    // Store-scoped client routing: map[store_id] -> map[client_pointer]bool
    storeClients map[int]map[*Client]bool

    // Dedicated pool of administrator connections receiving global feeds
    adminClients map[*Client]bool

    // Channel for inbound broadcast messages
    broadcast chan *models.WebSocketEvent

    register   chan *Client
    unregister chan *Client

    stateMu sync.RWMutex
}`,
          explanation: "The storeClients map guarantees store privacy: an order placed at Store #2 is sent only to employees working at Store #2. Meanwhile, regional managers have an administrative view that lets them see updates across all stores at once."
        },
        tradeoff: {
          choice: "Self-Hosted WebSocket Hub with Store Grouping",
          alternatives: ["Server-Sent Events (SSE)", "Checking Every Few Seconds (HTTP Polling)", "Third-Party Paid Services (Pusher or Ably)"],
          why: "Two-way communication allows instant notifications, low-overhead heartbeats, and complete ownership of the system without paying monthly fees for every message sent.",
          tradeoff: "Live connections require careful memory management. The server must actively notice when a phone disconnects so stuck connections do not pile up."
        },
        callout: {
          type: "warning",
          title: "The Phone Battery Trap",
          message: "Waking up a phone's Wi-Fi or cellular chip every five seconds stops the device from entering low-power sleep mode. Constant polling drains the battery in a few hours, leaving store staff with dead scanners halfway through their shift."
        }
      },
      {
        id: "part-3-concurrency",
        partNumber: "3.1",
        badge: "Concurrency",
        title: "3.1 Handling Slow Phones in Wi-Fi Dead Zones",
        content: [
          "In busy retail stores, employees frequently carry scanners into concrete back stock rooms, freight elevators, or deep storage aisles where Wi-Fi barely reaches.",
          "If the server tried to force messages through a sluggish connection, the entire notification system for that store would get stuck waiting on that one device. Suddenly, nobody in the entire store would get new order alerts!",
          "To prevent this, I designed a non-blocking system with automatic cleanup:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/websocket/hub.go",
          code: `// Fan out with non-blocking send and slow client eviction
var slowClients []*Client

for _, c := range targets {
    select {
    case c.Send <- data:
        // Message enqueued successfully into client's private buffer
    default:
        // Buffer overflow: client is too slow or disconnected without closing TCP
        log.Printf("[WS HUB] Slow client evicted: employee=%d, store=%d", c.EmployeeId, c.StoreId)
        slowClients = append(slowClients, c)
    }
}

// Cleanly unregister and free memory for slow clients
if len(slowClients) > 0 {
    h.stateMu.Lock()
    for _, c := range slowClients {
        h.removeClient(c)
    }
    h.stateMu.Unlock()
}`,
          explanation: "The select statement with a default block ensures the server never pauses for a sluggish phone. If a device cannot receive messages because it has zero signal, the server safely removes it from the broadcast list so the rest of the store stays lightning-fast."
        }
      },
      {
        id: "part-3-react-native",
        partNumber: "3.2",
        badge: "Mobile Frontend",
        title: "3.2 Mobile Reliability: Reconnecting Gracefully and Saving Battery",
        content: [
          "Mobile networks are unpredictable. Connections drop when workers pocket their devices, when switching from warehouse Wi-Fi to cellular data, or when switching to another app.",
          "I wrote a clean, custom React hook (useWebSocket.ts) that listens to the phone's operating system status:"
        ],
        codeSnippet: {
          language: "typescript",
          fileName: "radius-frontend/src/hooks/useWebSocket.ts",
          code: `// AppState Lifecycle Listener: Pause when backgrounded, resume on active
useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      connect();
    } else if (nextAppState.match(/inactive|background/)) {
      disconnect(); // Save battery and avoid dangling zombie sockets
    }
  });

  return () => subscription.remove();
}, [connect, disconnect]);`,
          explanation: "By listening to the phone's active status, the app pauses the connection as soon as the screen is locked, saving precious battery. The second the associate taps the screen to unlock it, the app instantly reconnects and catches up on any new orders."
        }
      },
      {
        id: "part-3-connection-tickets",
        partNumber: "3.3",
        badge: "WebSocket Security",
        title: "3.3 Securing WebSockets: Single-Use Connection Tickets",
        content: [
          "When mobile devices connect to the live notification hub, verifying their identity safely introduces a subtle security trap.",
          "Standard web browsers and mobile WebSocket clients cannot easily attach custom HTTP headers (such as `Authorization: Bearer <token>`) during the initial protocol upgrade request. Many applications take the easy shortcut of passing the user's secret JWT token directly inside the URL query string, like `ws://server/api/ws?token=...`.",
          "The danger with this shortcut is that URL query parameters are not private. Reverse proxies, load balancers, and cloud monitoring tools routinely write full request URLs into access logs in plain text. If an employee reconnects dozens of times as they walk between Wi-Fi access points, secret authentication tokens end up permanently written to log disks where anyone with monitoring access can see them.",
          "To keep tokens completely out of URL logs, I implemented a single-use connection ticket pattern in `radius-backend/internal/handler/ws_handler.go`.",
          "Before initiating the WebSocket handshake, the mobile app sends an authenticated POST request to `/api/v1/ws/ticket` using its regular Bearer token. The server generates a cryptographically secure 32-byte ticket, saves the employee ID, store ID, and role in Redis under `ws_ticket:<ticket>` with a strict 30-second time-to-live, and returns the ticket string to the app.",
          "The mobile client then opens the WebSocket connection using `?ticket=...`. The handshake handler reads and deletes the ticket in a single atomic Redis `GETDEL`, then establishes the client session. If an attacker inspects access logs moments later, the ticket is already gone and cannot be reused."
        ],
        image: {
          src: "/assets/images/radius-ws-ticket-handshake.svg",
          alt: "Radius WebSocket Security: Single-Use Ticket Protocol Diagram",
          caption: "Single-use 30-second handshake tickets prevent JWT authentication credentials from leaking into reverse proxy access logs."
        },
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/handler/ws_handler.go",
          code: `func (h *WSHandler) CreateTicket(ctx *gin.Context) {
    employeeID := ctx.GetInt("employee_id")
    email := ctx.GetString("email")
    role := models.EmployeeRole(ctx.GetString("role"))
    storeID := ctx.GetInt("store_id")

    // Generate cryptographically secure random 32-byte ticket
    b := make([]byte, 32)
    if _, err := rand.Read(b); err != nil {
        ctx.AbortWithStatusJSON(http.StatusInternalServerError, models.APIError{Error: "Failed to generate ticket"})
        return
    }
    ticket := hex.EncodeToString(b)

    ticketData, _ := json.Marshal(models.WSTicketData{
        EmployeeID: employeeID,
        StoreID:    storeID,
        Role:       role,
        Email:      email,
    })

    // Store in Redis with strict 30-second expiration
    h.redisClient.Set(ctx.Request.Context(), "ws_ticket:"+ticket, ticketData, 30*time.Second)

    ctx.JSON(http.StatusOK, models.WSTicketResponse{Ticket: ticket, ExpiresIn: 30})
}

func (h *WSHandler) HandleWebSocket(ctx *gin.Context) {
    ticket := ctx.Query("ticket")
    if ticket != "" {
        // Read and burn the ticket in one atomic step so it can never be replayed
        val, err := h.redisClient.GetDel(ctx.Request.Context(), "ws_ticket:"+ticket).Result()
        if err != nil {
            ctx.AbortWithStatusJSON(http.StatusUnauthorized, models.APIError{Error: "Invalid or expired ticket"})
            return
        }

        var ticketData models.WSTicketData
        _ = json.Unmarshal([]byte(val), &ticketData)
        // Authenticate client using ticketData...
    }
}`,
          explanation: "Because GETDEL reads and deletes the ticket atomically, two simultaneous connection attempts can never both redeem it. Even if full URLs are logged by intermediate proxies, the logged ticket is already invalid."
        },
        tradeoff: {
          choice: "Single-Use Redis Handshake Tickets",
          alternatives: ["Passing Bearer Tokens in URL Query Strings", "Cookie-Based WebSocket Upgrades", "Unauthenticated WebSocket with In-Band First Message Auth"],
          why: "Keeps sensitive authentication tokens completely out of proxy logs, monitoring traces, and browser history while avoiding complex browser cookie quirks.",
          tradeoff: "Requires one quick HTTP round trip before opening the socket, but issuing a ticket took a median of 1.4 milliseconds server-side in local benchmarks."
        }
      },
      {
        id: "part-4-auth-sessions",
        partNumber: 4,
        badge: "Security & Sessions",
        title: "4. Device Security & Access Control: Stopping Session Conflicts on Shared Handhelds",
        content: [
          "In a fast-paced retail store, company-issued phones change hands constantly. An associate might log in on a phone in aisle 4, set it down on a packing bench, and pick up another device five minutes later to continue working. If two people end up using the same account simultaneously, inventory adjustments and audit trails become a tangled nightmare.",
          "Many consumer apps silently allow unlimited concurrent logins from any device anywhere in the world. But in retail operations, a user account maps to a physical human being holding a single company phone. If two different devices perform conflicting inventory adjustments under the same name at the exact same second, there is no way to know who made which change.",
          "To eliminate ghost logins and preserve strict operational accountability, I built an IP-aware single active session policy in `radius-backend/internal/service/auth_service.go`. When an associate logs in, the backend checks PostgreSQL and Redis to see if that employee already has an active session on the store network.",
          "If an active session already exists, Radius detects the potential collision. Rather than abruptly disconnecting a working phone or silently creating duplicate sessions, the app prompts the worker for confirmation to take over the session. Once confirmed, the previous session is immediately revoked, issuing a brand-new token pair and keeping the audit ledger completely untangled.",
          "I also eliminated a subtle session revocation leak. In early testing, deleting a session in PostgreSQL left its cached token in Redis, so a revoked device kept working until the cache entry expired. Now `TerminateSessionById` writes a revocation marker for the session in Redis (`radius:auth:revoked:<sessionId>`) and evicts the cached token, so terminated workers and lost devices are locked out on their very next request instead of when their 15-minute access token runs out. Refresh tokens are rotated on every use, with a short 30-second grace window so a dropped response on bad Wi-Fi does not end the session.",
          "Finally, to keep the API fast under heavy store traffic, authenticated endpoints extract verified employee ID and store ID directly from JWT token claims and request context. This eliminated thousands of redundant `GetEmployeeByEmail` database queries every single hour."
        ],
        callout: {
          type: "insight",
          title: "Why Retail Hardware Demands Remote Revocation",
          message: "If an employee accidentally leaves a company scanner on a public sales display or in a shopping cart, managers cannot afford to wait for a token to expire. A Redis revocation marker lets managers terminate any lost scanner's session with a single tap, invalidating it on the very next request."
        }
      },
      {
        id: "part-4-single-session",
        partNumber: "4.1",
        badge: "Session Takeover",
        title: "4.1 IP-Aware Session Takeover and Remote Device Revocation",
        content: [
          "Handling shared hardware gracefully means distinguishing between someone switching devices on the store Wi-Fi versus an unauthorized login attempt from outside the building.",
          "In `internal/service/auth_service.go`, the login flow inspects the incoming client IP address against active session records in Redis and PostgreSQL, while session cleanup immediately purges the token hash from Redis:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/session_service.go",
          code: `// TerminateSessionById revokes a session everywhere it could still be trusted
func (s *SessionService) TerminateSessionById(ctx context.Context, sessionId int) (*models.APIMessage, error) {
    if s.redisClient != nil {
        // Revocation marker: every authenticated request checks for it first
        _ = s.redisClient.Set(ctx, "radius:auth:revoked:"+strconv.Itoa(sessionId), "1", utils.MaxSessionLifetime).Err()
    }
    session, err := s.sessionRepo.GetSessionById(ctx, sessionId)
    if err == nil && session != nil && session.AccessTokenHash != "" && s.redisClient != nil {
        // Evict the cached token so the fast path cannot authorize it again
        _ = s.redisClient.Del(ctx, cache.AuthTokenKey(session.AccessTokenHash)).Err()
    }

    if err = s.sessionRepo.TerminateSessionById(ctx, sessionId); err != nil {
        return nil, err
    }
    return &models.APIMessage{Message: "Session deleted successfully"}, nil
}`,
          explanation: "Writing a revocation marker and evicting the cached token means a revoked session fails on its very next request. The fast-path cache can never authorize a token that a manager has already terminated."
        },
        tradeoff: {
          choice: "IP-Aware Single Active Session Enforcement",
          alternatives: ["Permit Unlimited Concurrent Logins", "Silent Force-Eviction Without Warning", "Hardware MAC Address Whitelisting"],
          why: "Guarantees that every inventory scan, inventory audit, and stock adjustment traces back to a single active device, while preventing accidental logouts during routine device handovers.",
          tradeoff: "Adds a confirmation prompt when employees switch phones on shift, but prevents costly audit ledger corruption."
        }
      },
      {
        id: "part-5-cycle-counting",
        partNumber: 5,
        badge: "Inventory Auditing",
        title: "5. Routine Store Audits: Concurrency Locks and Shift Ownership Transfers",
        content: [
          "In a retail store carrying over 10,000 products, inventory shrinkage is inevitable. Boxes get misplaced, barcodes get scanned incorrectly at the checkout, and items get damaged. To maintain inventory accuracy without shutting down the entire store for annual audits, Radius uses weekly cycle counting organized by product category.",
          "However, auditing live store aisles introduces a severe concurrency problem: race conditions. If two store associates both begin auditing the 'Audio & Headphones' category at the same time, their barcode scans collide. Scanned numbers get overwritten or double-counted, producing phantom discrepancies that trigger needless manager investigations.",
          "To prevent collisions, I designed an auto-assignment mechanism with strict concurrency locking in `internal/service/cycle_count_service.go`. When an associate opens a category count on their mobile device, the system locks that count to their employee ID. If another floor associate attempts to enter that same count, the backend rejects access and displays the name of the colleague currently auditing that aisle.",
          "Equally important is handling shift changes. Retail shifts end while audits are midway through. Rather than forcing workers to discard half-scanned categories and restart from scratch, managers can execute a clean ownership transfer (`TransferOwnership`). This passes the active audit to incoming shift staff with one tap, preserving every scanned barcode and dual expected vs. physical quantity calculation."
        ],
        callout: {
          type: "tip",
          title: "Dual Real-Time Discrepancy Tracking",
          message: "As staff scan items with the mobile camera, the app displays expected book units and physically scanned units side-by-side. The backend computes the net unit variance and wholesale dollar shrinkage in real time, alerting managers to high-value discrepancies before the count is finalized."
        }
      },
      {
        id: "part-5-concurrency",
        partNumber: "5.1",
        badge: "Concurrency Control",
        title: "5.1 Auto-Assignment Locking and Shift Ownership Handover",
        content: [
          "Here is how the backend prevents conflicting counts while allowing managers to reassign in-progress audits across shifts in `internal/service/cycle_count_service.go`:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/cycle_count_service.go",
          code: `// 1. Auto-assign unassigned count to the current employee
if count.CountedBy == nil && employee.Role != models.RoleAdmin {
    updatedCount, err := s.cycleCountRepo.AutoAssignCycleCount(ctx, countID, count.StoreId, employee.EmployeeId)
    if err != nil {
        return nil, err
    }
    if updatedCount != nil {
        count = updatedCount
    }
} else if count.CountedBy != nil && *count.CountedBy != employee.EmployeeId {
    // 2. Concurrency lock check: non-managers cannot access someone else's active count
    if employee.Role != models.RoleManager && employee.Role != models.RoleAdmin {
        assignee := "another employee"
        if count.CountedByName != nil && *count.CountedByName != "" {
            assignee = *count.CountedByName
        }
        return nil, fmt.Errorf("cycle count is currently assigned to %s and is in progress", assignee)
    }
}`,
          explanation: "When an employee opens a count, the server claims ownership for that worker. Any peer attempting to access the same count is immediately blocked, protecting count integrity. Store managers retain supervisor access to review variances or transfer ownership to an incoming associate."
        },
        tradeoff: {
          choice: "Pessimistic Count Locking with Dynamic Shift Handover",
          alternatives: ["Free-For-All Unsynchronized Collaborative Counting", "Last-Write-Wins Database Overwriting", "End-Of-Shift Manual Spreadsheet Reconciliation"],
          why: "Cycle counting requires clear personal accountability for inventory variances. Locking the count to one person guarantees data integrity while shift handovers prevent lost work.",
          tradeoff: "Associates cannot split a single category file simultaneously, but categories can easily be divided across different weekly schedules."
        }
      },
      {
        id: "part-6-fill-replenishment",
        partNumber: 6,
        badge: "Replenishment Engine",
        title: "6. Shelf Restocking: Closing the Loop Between Mobile Audits and Empty Shelves",
        content: [
          "In retail, one of the most frustrating experiences for both customers and staff is the 'ghost out-of-stock'. A customer walks down an aisle looking for a specific cable or tool, finds an empty shelf hook, and leaves without buying anything, even though three cases of that exact product are sitting untouched in the back storage room.",
          "Traditional stores rely on manual clipboards or delayed end-of-week reports to identify missing stock. By the time a report is printed, dozens of sales opportunities have already been lost.",
          "To solve this, I built a closed-loop replenishment system that connects real-time transaction logs directly with mobile aisle audits.",
          "Floor associates conduct routine floor walks using the IS4TC ('In-Stock For The Customer') mobile camera scanner, tagging empty shelf hooks in seconds. Each scan is written to a shared 24-hour Redis store session, preventing duplicate scans across team members walking neighboring aisles.",
          "Simultaneously, the backend monitors transaction logs from the central server. The fill report service combines these high-velocity sales and empty hole tags against backroom overstock bin quantities (`mims_location_items`). It automatically generates a prioritized pick list showing exactly which products to pull from the warehouse to restock the sales floor."
        ],
        callout: {
          type: "insight",
          title: "Aisle-by-Aisle Picking Paths Save Miles of Walking",
          message: "Warehouse stock is tracked with 9-digit standardized coordinates (Aisle-Bay-Shelf-Position, e.g., 01-02-01-001). By sorting generated pick lists in alphanumeric aisle order, warehouse pickers make a single aisle-by-aisle pass through the back room instead of zig-zagging back and forth."
        }
      },
      {
        id: "part-6-closed-loop",
        partNumber: "6.1",
        badge: "Floor Logistics",
        title: "6.1 Merging Sales Velocity Logs with Mobile Empty Hole Scans in Redis",
        content: [
          "Here is how the fill report service orchestrates floor scans, records empty shelf holes in PostgreSQL, and synchronizes live aisle audits across devices using atomic Redis Hashes in `internal/service/fill_report_service.go`:",
          "In early versions, the active floor scanning session was stored as a serialized JSON array. But that created a classic concurrency bug: if Associate A and Associate B scanned empty hooks on the same sales floor at the exact same moment, the second write completely overwrote the first associate's scan. Serializing and sending a growing JSON array also created unnecessary network bloat.",
          "To guarantee atomic collaboration, I transitioned the session to a Redis Hash (`HSet`). Each product ID is stored as an independent field under `is4tc_session:<storeID>`. Multiple staff can scan empty hooks simultaneously without clobbering each other, and checking active holes becomes an instant O(1) operation."
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/fill_report_service.go",
          code: `func (s *FillReportService) AddToIS4TCSession(ctx context.Context, storeID int, product models.MimsProductInventory, employeeID *int) ([]models.MimsProductInventory, error) {
    // 1. Automatically record empty hole in PostgreSQL fill report
    if s.fillReportRepo != nil {
        _ = s.fillReportRepo.AddEmptyHole(ctx, storeID, product.ProductId, employeeID)
    }

    data, err := json.Marshal(product)
    if err != nil {
        return nil, err
    }

    // 2. Atomic collaborative Redis Hash write (O(1) complexity)
    key := fmt.Sprintf("is4tc_session:%d", storeID)
    field := fmt.Sprintf("%d", product.ProductId)

    err = s.redisClient.HSet(ctx, key, field, data).Err()
    if err != nil {
        return nil, err
    }

    _ = s.redisClient.Expire(ctx, key, 24*time.Hour).Err()
    return s.GetActiveIS4TCSession(ctx, storeID)
}`,
          explanation: "Using Redis Hashes guarantees atomic writes on the sales floor. When multiple floor staff scan neighboring aisles simultaneously, each product ID is saved as an independent field, completely eliminating race conditions and lost scan updates."
        },
        tradeoff: {
          choice: "Atomic Redis Hashes for Collaborative Floor Scanning",
          alternatives: ["Serialized JSON Array Overwrites", "Direct Persistent SQL Inserts for Every Scan Event", "Local-Only On-Phone Scan Storage"],
          why: "Redis Hashes provide atomic, field-level writes and sub-millisecond deduplication across multiple mobile devices operating simultaneously without overwriting colleague scans.",
          tradeoff: "Requires maintaining dual persistence paths in the service layer, but provides a rock-solid, race-free collaborative experience on the sales floor."
        }
      },
      {
        id: "part-7-omnichannel-fulfillment",
        partNumber: 7,
        badge: "Omnichannel Logistics",
        title: "7. In-Store Pickup (BOPIS): Order Assignment Locks and Automated Expirations",
        content: [
          "Fulfilling Buy Online, Pick Up In Store (BOPIS) orders creates immediate operational bottlenecks if warehouse and sales floor staff lack clear coordination. When an online order comes in, multiple associates might notice it on their screens and start walking aisles to gather the same items, resulting in wasted labor, duplicated efforts, and mixed-up staging carts.",
          "Even worse is what happens when customers abandon orders. If a customer places an order but never shows up, the items sit in a staging cubby reserved under `bopis_qty`. Because the software considers those items allocated, walk-in store shoppers cannot purchase them even though they are sitting right behind the counter.",
          "In Radius, when an associate taps an order on their handheld, the backend immediately acquires an assignment lock (`AssignOnlineOrder`) and broadcasts an `ORDER_ASSIGNED` event over WebSockets to all devices in the store. Other employees immediately see who claimed the order, preventing duplicate picks.",
          "The mobile app then guides the associate through an item-by-item picking workflow. Each item is verified with the camera barcode scanner. If an item is out of stock or damaged, the associate selects a standardized cancellation reason, updating the order and adjusting inventory records in real time.",
          "To solve the problem of abandoned orders, I wrote an automated background worker (`StartBOPISAutoCancelWorker`) in Go. The worker runs on a continuous background ticker, querying PostgreSQL for BOPIS orders that have exceeded their 5-day pickup window. When found, it automatically sets the order status to `CANCELLED`, restores reserved `bopis_qty` back to active sellable stock (`new_qty`), and broadcasts an alert to the store dashboard."
        ],
        callout: {
          type: "warning",
          title: "The Danger of Locked BOPIS Stock",
          message: "During high-volume retail seasons, unfulfilled or abandoned orders can silently freeze tens of thousands of dollars in high-demand stock. Automated expiration workers protect store revenue by returning abandoned units to the sales floor without requiring manual manager audits."
        }
      },
      {
        id: "part-7-picking-locks",
        partNumber: "7.1",
        badge: "Background Workers",
        title: "7.1 Order Assignment Locks and Background Expiration Workers",
        content: [
          "Here is how the automated background worker periodically scans for expired BOPIS orders, cancels them in PostgreSQL, and broadcasts real-time updates to all store devices in `internal/service/online_order_service.go`:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/online_order_service.go",
          code: `// StartBOPISAutoCancelWorker periodically runs auto-cancellation in the background
func (s *OnlineOrderService) StartBOPISAutoCancelWorker(ctx context.Context, interval time.Duration) {
    ticker := time.NewTicker(interval)
    go func() {
        for {
            select {
            case <-ctx.Done():
                ticker.Stop()
                return
            case <-ticker.C:
                cancelled, err := s.ordersRepo.AutoCancelExpiredBOPISOrders(context.Background(), 5*24*time.Hour)
                if err != nil || len(cancelled) == 0 {
                    continue
                }
                for _, o := range cancelled {
                    s.broadcaster.BroadcastToStore(o.StoreId, models.WebSocketEvent{
                        Type:      models.EventOrderStatusUpdated,
                        StoreId:   o.StoreId,
                        Timestamp: time.Now().UTC(),
                        Payload: models.OrderStatusUpdatedPayload{
                            OrderId:   o.OrderId,
                            StoreId:   o.StoreId,
                            NewStatus: models.OnlineOrderStatusCancelled,
                        },
                    })
                }
            }
        }
    }()
}`,
          explanation: "By spawning a lightweight goroutine with a time.Ticker, Radius handles scheduled maintenance natively inside the Go application without requiring an external cron daemon. When expired orders are cancelled, reserved stock is freed and store staff receive an instant WebSocket notification."
        },
        tradeoff: {
          choice: "Native Go Goroutine Ticker Worker",
          alternatives: ["External Linux Cron Job Calling an HTTP Endpoint", "Third-Party Cloud Task Scheduler (AWS EventBridge / Cloud Tasks)", "Checking Expirations Only on User Page Visits"],
          why: "Runs natively inside the Go monolith with zero external infrastructure dependencies, cleanly respects application context cancellation on graceful shutdown, and accesses domain services directly.",
          tradeoff: "In multi-instance deployments, workers on different servers run concurrently; this is protected with idempotent SQL UPDATE statements and row-level locking."
        }
      },
      {
        id: "part-8-product-catalog",
        partNumber: 8,
        badge: "High-Performance Caching",
        title: "8. Product Catalog, Fast Search & Smart Caching: Millisecond Barcode Lookups",
        content: [
          "In a retail environment, employees and customers interact with the product catalog constantly. A cashier scanning items at a busy checkout counter, a warehouse specialist receiving cartons off a pallet, and a sales associate checking stock on the floor all depend on instant barcode lookups.",
          "When a system handles over 10,000 products and 70,000 inventory entries across multiple store locations, executing a traditional relational database query on every single barcode scan quickly creates severe performance bottlenecks. Joining product catalog definitions with store-specific stock tables on each scan can easily cause database response times to balloon during morning rushes.",
          "To solve this, I designed a multi-tier caching architecture in Redis paired with PostgreSQL trigram search indexes. This setup keeps barcode lookups in the low milliseconds on the sales floor while shielding the database from heavy traffic spikes.",
          "• Tier 1: Store-Agnostic Barcode Mapping (24-Hour TTL): Maps UPC barcodes directly to core product details in Redis (`radius:v1:catalog:barcode:<barcode>`). Because barcode numbers and master product details rarely change, this lookup resolves item identity across all retail stores with zero database queries.",
          "• Tier 2: Store-Specific Inventory Snapshot (Jittered TTL with Event Invalidation): Caches real-time stock levels (`radius:v1:inventory:store:<store_id>:product:<product_id>`) including on-hand, reserved, and available quantities alongside physical warehouse aisle and shelf coordinates.",
          "• Negative Caching for Invalid Scans: If an associate accidentally scans an unrecognized barcode or damaged packaging, the backend caches a `NotFound` marker in Redis for about a minute (60 seconds plus up to 15 seconds of jitter). In a local test, 200 scans of the same bad barcode triggered exactly one product lookup. This prevents repetitive bad scans from constantly penalizing PostgreSQL with empty table lookups.",
          "• Write-Time Cache Invalidation: Whenever cashiers finalize a sale, receiving docks check in purchase orders, or managers approve manual adjustments, the backend immediately purges the corresponding store inventory cache keys so associates never see stale quantities.",
          "• Trigram GIN Search Indexing: Migrations 42 and 43 added the `pg_trgm` extension with GIN indexes on name, SKU and description. Partial wildcard searches across 10,000 products dropped from about 20 milliseconds to about 1 millisecond in `EXPLAIN ANALYZE`."
        ],
        callout: {
          type: "insight",
          title: "Why Barcode Lookups Need Two Tiers",
          message: "A barcode number identifies what an item is across the entire company, but how many units sit on the shelf changes constantly store by store. Splitting the lookup into two independent cache tiers lets us keep master product data cached for 24 hours while allowing store stock counts to refresh rapidly."
        }
      },
      {
        id: "part-8-barcode-caching",
        partNumber: "8.1",
        badge: "Two-Tier Caching",
        title: "8.1 Two-Tier Barcode Lookups and Negative Caching",
        content: [
          "Here is how `ScanProduct` in `radius-backend/internal/service/inventory_service.go` checks Tier 1 and Tier 2 caches, handles negative caching, and falls back gracefully to the database:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/inventory_service.go",
          code: `func (s *InventoryService) ScanProduct(ctx context.Context, storeId int, employeeId int, barcode string) (*models.ScanProductResponse, error) {
    tier1Key := fmt.Sprintf("radius:v1:catalog:barcode:%s", barcode)

    if s.redisClient != nil {
        t1Val, t1Err := s.redisClient.Get(ctx, tier1Key).Result()
        if t1Err == nil {
            var t1 catalogBarcodeCache
            if json.Unmarshal([]byte(t1Val), &t1) == nil {
                // Negative cache hit: immediately return without touching database
                if t1.NotFound {
                    return &models.ScanProductResponse{
                        Product: nil,
                        Message: "No product found for this barcode",
                    }, nil
                }

                // Tier 2: Check store-specific inventory snapshot
                tier2Key := fmt.Sprintf("radius:v1:inventory:store:%d:product:%d", storeId, t1.ProductId)
                t2Val, t2Err := s.redisClient.Get(ctx, tier2Key).Result()
                if t2Err == nil {
                    var t2 storeInventoryCache
                    if json.Unmarshal([]byte(t2Val), &t2) == nil {
                        combined := s.combineProductInventory(t1, t2)
                        return &models.ScanProductResponse{
                            Product: &combined,
                            Message: "Product found",
                        }, nil
                    }
                }
            }
        }
    }

    // Cache miss: deduplicate concurrent database queries using singleflight
    sfKey := fmt.Sprintf("scan:%d:%s", storeId, barcode)
    v, err, _ := s.sfGroup.Do(sfKey, func() (any, error) {
        product, dbErr := s.inventoryRepo.GetInventoryByBarcode(ctx, storeId, barcode)
        if dbErr != nil {
            return nil, dbErr
        }
        if product == nil && s.redisClient != nil {
            // Store negative cache with short jittered TTL to absorb bad scans
            negPayload, _ := json.Marshal(catalogBarcodeCache{NotFound: true})
            negTTL := cache.ApplyJitter(60*time.Second, 15*time.Second)
            _ = s.redisClient.Set(ctx, tier1Key, negPayload, negTTL).Err()
        }
        return product, nil
    })
    // ...
}`,
          explanation: "Checking the global barcode cache first and the store inventory snapshot second skips the product lookup entirely on a cache hit. Against the hosted PostgreSQL database, a cache hit came back in about 6ms versus about 91ms on a miss. Locally, 500 warm scans had a median of 1.4ms server-side (2.7ms cold), and the endpoint sustained roughly 3,000 scans per second at 50 concurrent clients. Every scan is still written to the scan log for auditing."
        },
        tradeoff: {
          choice: "Two-Tier Barcode Caching with Negative Caching",
          alternatives: ["Single Monolithic Store-Barcode Cache Key", "Querying PostgreSQL on Every Barcode Scan", "Client-Side In-Memory Barcode Dictionaries"],
          why: "Decouples static product identity from dynamic store stock counts, roughly halves cache memory across seven stores (about 2.1KB vs 4.2KB per product, estimated from measured key sizes of 407 and 249 bytes), and protects PostgreSQL against scan bursts.",
          tradeoff: "Requires write-time invalidation in transaction and receiving services, but keeps sales floor data accurate."
        }
      },
      {
        id: "part-8-singleflight-search",
        partNumber: "8.2",
        badge: "Cache Protection",
        title: "8.2 Stopping Cache Stampedes with Singleflight and Trigram Search",
        content: [
          "A common hazard in high-concurrency retail systems is the cache stampede (or thundering herd problem). When the cache for a high-traffic category or popular product expires, dozens of mobile scanners might request that same item within a fraction of a second. If every request blindly queries the database simultaneously, PostgreSQL experiences sudden CPU spikes.",
          "To eliminate this risk, I integrated Go's `golang.org/x/sync/singleflight` package across product, category, and inventory domain services. When a cache miss occurs, `singleflight.Group` ensures that only one goroutine executes the database query. All other concurrent requests wait for that single query to finish and share the identical result.",
          "In addition, I introduced jittered TTLs (adding a random extra of up to 10% to expiration times) so records cached at the same moment never expire simultaneously.",
          "Radius also adheres to a fail-open resilience principle: if Redis ever encounters a connection error or goes offline, domain services catch the error, log a warning, and seamlessly fall back to PostgreSQL so store operations continue without disruption."
        ],
        image: {
          src: "/assets/images/radius-singleflight-stampede.svg",
          alt: "Cache Stampede Protection: Go Singleflight Architecture Diagram",
          caption: "Measured locally: 500 concurrent requests for an uncached product produced exactly 1 database query, in three out of three runs."
        },
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/product_service.go",
          code: `func (s *ProductService) GetProductByID(ctx context.Context, id int) (*models.Product, error) {
    cacheKey := fmt.Sprintf("radius:v1:catalog:product:%d", id)
    if s.redisClient != nil {
        if val, err := s.redisClient.Get(ctx, cacheKey).Result(); err == nil {
            var product models.Product
            if json.Unmarshal([]byte(val), &product) == nil {
                return &product, nil
            }
        }
    }

    // Deduplicate concurrent cache misses through singleflight
    v, err, _ := s.requestGroup.Do(cacheKey, func() (any, error) {
        prod, dbErr := s.productsRepo.GetProductByID(ctx, id)
        if dbErr != nil {
            return nil, dbErr
        }
        if prod != nil && s.redisClient != nil {
            // Apply randomized TTL jitter to prevent synchronized expirations
            ttl := cache.ApplyJitter(5*time.Minute, 30*time.Second)
            if data, marshalErr := json.Marshal(prod); marshalErr == nil {
                _ = s.redisClient.Set(ctx, cacheKey, data, ttl).Err()
            }
        }
        return prod, nil
    })

    if err != nil {
        return nil, err
    }
    return v.(*models.Product), nil
}`,
          explanation: "Go singleflight guarantees that even if 50 associates open the same product page at once, exactly one database query runs. The remaining 49 requests receive the result simultaneously without touching PostgreSQL."
        },
        callout: {
          type: "tip",
          title: "Fail-Open Resilience",
          message: "Caching layers should accelerate systems, not become single points of failure. In Radius, if Redis becomes unreachable, read operations log a warning and fall back to PostgreSQL cleanly rather than blocking staff from ringing up sales."
        }
      },
      {
        id: "part-8-mobile-swr",
        partNumber: "8.3",
        badge: "Mobile Frontend",
        title: "8.3 Mobile Speed: Stale-While-Revalidate (SWR) for Instant Screen Loads",
        content: [
          "Optimizing backend queries and in-memory caches brings server latency down to milliseconds. However, on handheld Android scanners connecting over warehouse Wi-Fi, round-trip network latency can still cause noticeable screen loading spinners when navigating between tabs.",
          "To make the mobile app feel as responsive as a native desktop application, I implemented an in-memory client-side cache with Stale-While-Revalidate (SWR) semantics as a cache policy on `apiFetch` in `radius-frontend/src/api/client.ts`.",
          "When an associate navigates to screens displaying slow-changing resources (such as store lists or product categories), the `swr` policy immediately returns the cached in-memory version without waiting on the network. Simultaneously, it fires a background HTTP request to revalidate the data, updating the in-memory cache smoothly without causing layout shifts or screen flickers."
        ],
        codeSnippet: {
          language: "typescript",
          fileName: "radius-frontend/src/api/client.ts",
          code: `export function buildCacheKey(method: string, path: string): string {
    const url = new URL(path.startsWith("http") ? path : \`http://localhost\${path}\`);
    const query = Array.from(url.searchParams.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => \`\${k}=\${v}\`)
        .join("&");
    // Every entry is scoped to the active store and employee
    const storeScope = clientStoreId !== null ? \`s:\${clientStoreId}\` : "s:none";
    const userScope = clientEmployeeId !== null ? \`u:\${clientEmployeeId}\` : "u:none";
    return \`\${method.toUpperCase()}:\${url.pathname}:\${query}:\${storeScope}:\${userScope}\`;
}

// Inside apiFetch, for the "swr" cache policy
if (cachePolicy === "swr") {
    const cached = swrCache.get(cacheKey);
    const currentGeneration = getSessionGeneration();
    if (cached && cached.generation === currentGeneration) {
        if (Date.now() - cached.timestamp > 5 * 60 * 1000) {
            // Stale: refresh quietly in the background without blocking the UI
            executeNetworkFetch<T>(path, options, cacheKey, method, true)
                .then((data) => {
                    if (getSessionGeneration() === currentGeneration) {
                        setWithEviction(swrCache, cacheKey, { data, timestamp: Date.now(), generation: currentGeneration });
                        notifyCacheUpdate(cacheKey, data);
                    }
                })
                .catch(() => {});
        }
        return cached.data as T;
    }
}`,
          explanation: "By returning cached data instantly and refreshing quietly in the background, screen navigation on mobile scanners feels instantaneous. Associates never see empty loading spinners when switching between familiar screens."
        }
      },
      {
        id: "part-9-store-hierarchy",
        partNumber: 9,
        badge: "Multi-Tenancy",
        title: "9. Multi-Store Structure, Branch Management & Active Operations Safety",
        content: [
          "In a multi-store retail chain, each store branch is an autonomous operational tenant. When employees are scanning barcodes, fulfilling online pickup orders, or counting shelves in Toronto, they must never see or accidentally modify inventory, cycle counts, or purchase orders belonging to Ottawa or Mississauga.",
          "At the same time, regional managers and head office administrators need a unified operational view. They need the ability to switch between retail locations from a single mobile handheld without logging out and back in every time they visit a different store.",
          "To enforce strict tenant boundaries without creating duplicate codebases, Radius scopes every operational database query by `store_id`. For non-admin roles (`SALES`, `SERVICE`, `MANAGER`), the store ID is strictly extracted from the employee's authenticated session context. Cross-store data leaks are impossible at the database query level.",
          "Crucially, physical stores are not just static rows in a database table. They represent active floor labor, pending customer pickup orders, and trucks at the loading dock. To protect ongoing store operations, Radius implements an active operations safety guard (`StoreOperationSummary`). Before a manager can close, mothball, or deactivate a store branch, the system queries live operational metrics:",
          "• Active Online Orders: Checks `active_orders_count` to ensure no BOPIS pickup orders are waiting to be picked or claimed by customers.",
          "• In-Progress Audits: Checks `active_counts_count` to prevent deactivating a store while floor staff are midway through a concurrency-locked cycle count.",
          "• Pending Freight: Checks `pending_pos_count` to guarantee no inbound purchase orders or delivery manifests are open at the loading bay.",
          "If `has_active_operations` returns true, the backend strictly rejects the deactivation request, preventing orphaned orders and lost pallets."
        ],
        callout: {
          type: "insight",
          title: "Guarding Physical Store State with Operational Invariants",
          message: "A physical retail store is not a static database row. It represents active human labor, pending customer orders, and physical trucks at the loading dock. Radius checks active fulfillment pick lists, cycle count locks, and purchase order receipts before any branch can be deactivated."
        }
      },
      {
        id: "part-9-store-switching",
        partNumber: "9.1",
        badge: "Client Architecture",
        title: "9.1 Dynamic Branch Switching, Scoped Data Isolation & SWR Cache Partitioning",
        content: [
          "When regional managers inspect stores, requiring them to sign out and log back in to switch branches causes immense friction. But switching store contexts dynamically in a mobile app introduces a dangerous trap: client cache poisoning.",
          "If a regional manager reviews shelf replenishment in Store 1 (Toronto) and then switches to Store 2 (Ottawa), any cached products, shelf coordinates, or activity feeds stored in memory could bleed across screens if the cache is not cleanly partitioned.",
          "In `radius-frontend/src/context/StoreContext.tsx`, I solved this by coupling active store selection with an instantaneous client cache wipe:",
          "• Context Injection: When `setActiveStoreId` is triggered, the new store ID is registered with `setClientContext({ storeId })`, which scopes every future request and every cache key to that store.",
          "• Instant SWR Cache Invalidation: The store provider immediately calls `clearSWRCache()`. This completely wipes the in-memory Stale-While-Revalidate cache, ensuring that stale stock counts or aisle layouts from Toronto never appear on screen for Ottawa.",
          "• Graceful 401 Expiration: If a manager's store-specific permissions change while switching, the provider catches `UnauthorizedError` and invokes `handleSessionExpired`, terminating the session safely without leaving the UI in an inconsistent state."
        ],
        codeSnippet: {
          language: "typescript",
          fileName: "radius-frontend/src/context/StoreContext.tsx",
          code: `export function StoreProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated, isLoading: authLoading, logout } = useAuth();
    const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
    const activeStoreId = selectedStoreId ?? user?.store_id ?? null;
    const [store, setStore] = useState<Store | null>(null);

    // Synchronize client context headers and wipe stale cache on store change
    useEffect(() => {
        setClientContext({ storeId: activeStoreId });
        clearSWRCache();
    }, [activeStoreId]);

    const setActiveStoreId = useCallback((storeId: number | null) => {
        setSelectedStoreId(storeId);
        setClientContext({ storeId: storeId ?? user?.store_id ?? null });
        clearSWRCache();
    }, [user?.store_id]);

    const refreshStore = useCallback(async () => {
        if (!canFetchStore || !activeStoreId) {
            setStore(null);
            return;
        }
        setIsLoading(true);
        try {
            const endpoint = ENDPOINTS.MANAGER.STORE.get(activeStoreId);
            const result = await apiFetch<GetStoreResponse>(endpoint, { method: "GET" });
            setStore(result.store);
        } catch (err) {
            setStore(null);
            if (err instanceof UnauthorizedError) {
                await handleSessionExpired(err.message, logout);
            }
        } finally {
            setIsLoading(false);
        }
    }, [canFetchStore, activeStoreId, logout]);`,
          explanation: "Coupling branch selection with clearSWRCache() ensures zero cross-store data leakage on mobile screens. Handheld scanners switch store contexts instantly without requiring an expensive application restart."
        },
        tradeoff: {
          choice: "Store-Scoped Cache Keys plus an Immediate SWR Flush on Switch",
          alternatives: ["Full Application Reload on Branch Switch", "Cache Flush Alone Without Scoped Keys", "Ambient LocalStorage State"],
          why: "Scoping every cache key by store and employee means one store's data can never be served for another, and the flush frees memory and in-flight state immediately, without the latency and screen flash of a full React Native app reload.",
          tradeoff: "Requires re-fetching root branch data on the initial screen of the newly selected store."
        }
      },
      {
        id: "part-10-mims-inventory",
        partNumber: 10,
        badge: "Warehouse Logistics",
        title: "10. Mobile Inventory Management (MIMS): Shelving, Coordinates & 11 Stock Sub-Buckets",
        content: [
          "In a 40,000 square foot retail store carrying over 10,000 SKUs, an associate searching for a product cannot rely on a simple aggregate number like 'Quantity: 5'.",
          "If a customer arrives asking for an OLED television and the system simply reports 5 units in stock, but 2 are sealed on high-bay overstock racking 20 feet in the air, 1 is an unboxed floor demonstration unit, 1 is reserved in a locker for an online pickup order, and 1 is defective waiting for return to the manufacturer, the employee will spend 20 minutes running around the backroom before walking out empty-handed.",
          "To reflect physical retail reality, Radius models inventory across 11 granular condition sub-buckets in `models.Inventory`:",
          "• Brand-New Sealed (`new_qty`): Factory-sealed units ready for regular sales floor display or register checkout.",
          "• Open Box (`open_box_qty`): Inspected customer returns repackaged and eligible for discounted sales floor clearance.",
          "• BOPIS Reserved (`bopis_qty`): Units picked and held in the online pickup staging area, strictly excluded from walk-in retail sales.",
          "• Return to Vendor (`rtv_qty`): Defective or recalled manufacturer stock quarantined in the backroom waiting for vendor shipping credits.",
          "• Code 88 Salvage (`code88_qty`): Severely damaged or broken merchandise marked down for disposal or recycling.",
          "• Quarantine Hold (`quarantine_qty`): Units placed on hold pending managerial investigation, batch recall, or safety audits.",
          "• Service Center Repair (`repair_qty`): Units checked into the store's technician depot for hardware diagnostics or warranty repair.",
          "• Customer Layaway (`customer_on_hold_qty`): Reserved units held for customer deposits or delayed pickup agreements.",
          "• Fulfillment Hold (`fc_on_hold_qty`): Stock allocated for outbound regional fulfillment center redistribution.",
          "• Recount Verification (`verify_qty`): Units flagged during cycle count audits that require supervisor recount verification before being marked sellable.",
          "• Display & Demo (`demo_qty`): Working floor display models powering interactive demonstration tables.",
          "By tracking every unit in its explicit condition bucket, the system computes `on_hand_qty` and `available_qty` deterministically. Cashiers and mobile pickers never sell stock that cannot physically be handed to a customer."
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/models/inventory.go",
          code: `// Inventory models comprehensive store-level stock tracking across 11 condition sub-buckets.
type Inventory struct {
    InventoryId       int        \`json:"inventory_id"\`
    StoreId           int        \`json:"store_id"\`
    ProductId         int        \`json:"product_id"\`
    OnHandQty         int        \`json:"on_hand_qty"\`
    ReservedQty       int        \`json:"reserved_qty"\`
    AvailableQty      int        \`json:"available_qty"\`
    ReorderQty        int        \`json:"reorder_qty"\`
    Aisle             *string    \`json:"aisle"\`
    MimsLocation      *string    \`json:"mims_location"\`
    LastCountedAt     *time.Time \`json:"last_counted_at"\`
    UpdatedAt         *time.Time \`json:"updated_at"\`

    // Granular 11 Sub-Inventory Buckets
    NewQty            int        \`json:"new_qty"\`
    OpenBoxQty        int        \`json:"open_box_qty"\`
    BopisQty          int        \`json:"bopis_qty"\`
    RtvQty            int        \`json:"rtv_qty"\`
    Code88Qty         int        \`json:"code88_qty"\`
    QuarantineQty     int        \`json:"quarantine_qty"\`
    RepairQty         int        \`json:"repair_qty"\`
    CustomerOnHoldQty int        \`json:"customer_on_hold_qty"\`
    FcOnHoldQty       int        \`json:"fc_on_hold_qty"\`
    VerifyQty         int        \`json:"verify_qty"\`
    DemoQty           int        \`json:"demo_qty"\`
    OnOrderQty        int        \`json:"on_order_qty"\`
    LastReceivedAt    *time.Time \`json:"last_received_at"\`
}`,
          explanation: "Partitioning inventory into 11 discrete condition buckets prevents retail shrinkage and ensures online order pickers and floor cashiers never allocate reserved, damaged, or floor-demo units."
        },
        tradeoff: {
          choice: "11 Explicit Sub-Inventory Columns in PostgreSQL",
          alternatives: ["Single Quantity Integer with Status Flags", "Generic Key-Value Metadata JSONB", "Normalized Separate Inventory Sub-Tables"],
          why: "Allows atomic row-level increment/decrement queries with zero joins, enforcing check constraints directly in the database.",
          tradeoff: "Widens the inventory table schema and requires explicit mapping in SQL scans."
        }
      },
      {
        id: "part-10-coordinates-buckets",
        partNumber: "10.1",
        badge: "Hardware & Scanning",
        title: "10.1 Standardized 9-Digit Warehouse Shelving Coordinates (Aisle-Bay-Shelf-Position)",
        content: [
          "Knowing that a store possesses 3 sealed units of an item is useless if warehouse staff do not know where in the warehouse it sits. If a pallet of monitors is pushed onto a high rack without recording its location, it effectively disappears until the next annual inventory audit.",
          "Radius organizes backroom warehouse storage through standardized 9-digit numeric coordinates formatted as `Aisle-Bay-Shelf-Position` (e.g. `04-02-03-001`), enforced by a database check constraint:",
          "• Aisle (`04`): The physical corridor or racking row in the warehouse.",
          "• Bay (`02`): The vertical racking section between structural upright support pillars.",
          "• Shelf (`03`): The horizontal steel shelf tier counted from the floor upward.",
          "• Position (`001`): The specific bin slot or pallet footprint along the shelf tier.",
          "Mobile barcode scanners enforce a two-scan binning protocol (`BinItemRequest`): the employee scans the product UPC, followed by the shelf bin location barcode. The backend validates location types (`OVERSTOCK` for top pallet racking, `TOP_STOCK` for risers above active sales shelves, and `UNBINNED` for intake carts).",
          "Standardized coordinates eliminate warehouse scavenger hunts and allow the replenishment engine to sort restock pick lists in physical aisle-by-aisle order through the warehouse corridors."
        ],
        image: {
          src: "/assets/images/radius-mims-coordinate-shelving.svg",
          alt: "MIMS Spatial Coordinate Topology & Aisle-by-Aisle Routing Diagram",
          caption: "Standardized 9-digit Aisle-Bay-Shelf-Position coordinates let pick lists run aisle by aisle. In a walking model over the seeded store layout, sorted pick lists cut walking distance by about 65% versus unsorted ones."
        },
        callout: {
          type: "tip",
          title: "Why Standardized Coordinates Save Miles of Walking",
          message: "By enforcing standardized Aisle-Bay-Shelf-Position coordinate formatting, the IS4TC shelf replenishment engine sorts picking routes in aisle-by-aisle order, cutting most of the backtracking through warehouse corridors."
        }
      },
      {
        id: "part-10-adjustment-workflows",
        partNumber: "10.2",
        badge: "Loss Prevention",
        title: "10.2 Preventing Rogue Stock Edits: Supervisor Review & Approval Queues",
        content: [
          "A classic failure mode in retail inventory systems is allowing sales floor associates to edit inventory numbers whenever they cannot locate an item on the shelf. If an associate can type 'Qty: 0' with no oversight, inventory shrinkage is swept under the rug, and theft or misplacement is never investigated.",
          "In Radius, regular floor associates cannot alter inventory numbers directly. Instead, they submit an inventory adjustment proposal (`AdjustInventoryRequest`) containing the inventory ID, product ID, previous recorded quantity, observed count, and an operational reason code.",
          "The adjustment enters a supervisory review queue (`AdjustmentStatusPending`):",
          "• Review Batching: Department managers open the review drawer (`PendingAdjustmentDetail`) to inspect submitted variances alongside historical sales and recent shipments.",
          "• Decision Authority: Supervisors review adjustment items in batches (`ReviewAdjustmentRequest`), selecting `APPROVED`, `REJECTED`, or `WRITE_OFF`.",
          "• Atomic Ledger Commit: Upon approval, the stock quantity adjustment and the corresponding transaction record in `inventory_transactions` are committed within a single PostgreSQL database transaction. Rogue edits are eliminated, and every stock change is permanently tied to the requesting associate and approving manager."
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/models/inventory.go",
          code: `type AdjustInventoryRequest struct {
    InventoryId int    \`json:"inventory_id" binding:"required"\`
    ProductId   int    \`json:"product_id"   binding:"required"\`
    PreviousQty int    \`json:"previous_qty"\`
    AdjustedQty int    \`json:"adjusted_qty" binding:"required"\`
    Reason      string \`json:"reason"\`
}

type ReviewAdjustmentItem struct {
    AdjustmentId int              \`json:"adjustment_id" binding:"required"\`
    Status       AdjustmentStatus \`json:"status"        binding:"required"\`
    AdjustedQty  *int             \`json:"adjusted_qty"\`
    Reason       *string          \`json:"reason"\`
}

type ReviewAdjustmentRequest struct {
    Reviews []ReviewAdjustmentItem \`json:"reviews" binding:"required,min=1"\`
}`,
          explanation: "Floor associates submit adjustment requests with reason codes, but stock changes remain pending until department supervisors review and sign off in batches, preventing unvetted shrinkage write-offs."
        }
      },
      {
        id: "part-11-inbound-logistics",
        partNumber: 11,
        badge: "Supply Chain",
        title: "11. Inbound Logistics: Purchase Order Receiving & Inter-Store Transfers",
        content: [
          "Every morning between 6:00 AM and 8:00 AM, freight trucks back into retail store loading docks with pallets of merchandise. Receiving inbound freight is one of the highest-friction operations in retail: backroom teams must process hundreds of items rapidly without letting supplier shipping mistakes slip past unnoticed.",
          "If backroom staff blindly accept a shipment, missing items become phantom inventory. If they must scan every single individual pencil and cable by hand, the loading bay becomes hopelessly bottlenecked, delaying trucks and keeping stock off the sales floor.",
          "Radius supports two primary freight intake streams: external vendor Purchase Orders (POs) and internal Store-to-Store Stock Transfers (`StockTransfer`). Both workflows are engineered around high-speed barcode verification, atomic database updates, and automatic cache invalidation."
        ],
        callout: {
          type: "insight",
          title: "The Real Cost of Receiving Discrepancies",
          message: "A receiving mistake at the loading dock cascades into every customer touchpoint. Marking 10 items as received when only 8 arrived creates phantom online inventory and immediate fulfillment failures."
        }
      },
      {
        id: "part-11-po-lpr-receiving",
        partNumber: "11.1",
        badge: "Receiving Engine",
        title: "11.1 Purchase Order Verification & 20-Digit License Plate Receiving (LPR)",
        content: [
          "For mixed freight shipments, associates perform item-by-item verification using `CheckProductInPO`. Handheld scanners check each scanned barcode against open purchase order lines in real time, alerting associates if an item was not ordered or if a supplier over-shipped a line item.",
          "However, for high-volume master cartons packed at central distribution centers, scanning every individual unit inside a sealed box of 200 headphones is a massive waste of labor. To solve this, Radius implements 20-digit License Plate Receiving (LPR):",
          "• Master Carton Scanning: The associate scans the master carton's 20-digit LPR barcode.",
          "• Single Atomic Transaction: The backend method `ReceiveLPR(ctx, storeId, poId, lprBarcode, employeeId)` looks up the pre-verified carton manifest in PostgreSQL, updates the purchase order line items, increments inventory condition buckets, and logs the receipt in the audit ledger inside one database transaction.",
          "• Multi-Tier Cache Purge: Immediately after the database commit, `cache.InvalidateStoreOperations` purges operational caches, and a Redis scanner deletes cached product-level inventory records (`InventoryProductKey`) across affected items so newly received stock appears on sales floor screens instantaneously."
        ],
        image: {
          src: "/assets/images/radius-lpr-barcode-anatomy.svg",
          alt: "20-Digit License Plate Receiving (LPR) Architecture Diagram",
          caption: "GS1-128 20-digit LPR barcodes allow handheld scanners to check in 200 pre-palletized units in under one second with atomic database execution."
        },
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/receiving_service.go",
          code: `func (s *ReceivingService) ReceiveLPR(ctx context.Context, storeId int, employeeId int, role string, req models.ReceiveLPRRequest) error {
    detail, err := s.receivingRepo.GetPurchaseOrderDetail(ctx, req.PoId)
    if err != nil {
        return err
    }
    if detail == nil {
        return fmt.Errorf("%w: purchase order not found", ErrNotFound)
    }
    if role != "ADMIN" && detail.StoreId != storeId {
        return fmt.Errorf("%w: cannot receive for a different store", ErrValidation)
    }

    // Unpack and check in all carton items in one atomic repository transaction
    err = s.receivingRepo.ReceiveLPR(ctx, detail.StoreId, req.PoId, req.LprBarcode, employeeId)
    if err != nil {
        return err
    }

    // Invalidate store operation summaries and product inventory cache
    cache.InvalidateStoreOperations(ctx, s.redisClient, detail.StoreId)
    if s.redisClient != nil {
        iter := s.redisClient.Scan(ctx, 0, cache.InventoryStorePattern(detail.StoreId), 100).Iterator()
        for iter.Next(ctx) {
            _ = s.redisClient.Del(ctx, iter.Val()).Err()
        }
    }
    return nil
}`,
          explanation: "ReceiveLPR unpacks pre-manifested master cartons in one atomic call, updating line items and flushing Redis product cache keys so stock is instantly sellable on the floor."
        },
        tradeoff: {
          choice: "20-Digit License Plate Receiving (LPR)",
          alternatives: ["Mandatory Unit-by-Unit Scan for Every Carton", "Blind Pallet Receipt Without Verification"],
          why: "Accelerates inbound pallet intake from hours to minutes while retaining verified carton manifests.",
          tradeoff: "Relies on distribution center pack-accuracy; discrepancies must be handled via post-receive adjustment claims."
        }
      },
      {
        id: "part-11-stock-transfers",
        partNumber: "11.2",
        badge: "Logistics Security",
        title: "11.2 Inter-Store Stock Transfers: Manual Verification vs. One-Tap Quick Receive",
        content: [
          "When Store 1 has excess gaming laptops while Store 2 is out of stock, Radius manages stock balancing via inter-store transfers (`StockTransfer`). Items transition across clear lifecycle stages: `PENDING` ➔ `IN_TRANSIT` ➔ `RECEIVED`.",
          "Because merchandise is transported across public roads by third-party couriers, inventory shrinkage and damaged cartons can happen in transit. To balance speed with security, Radius provides two distinct receiving modes:",
          "• Manual Scan Verification (`ReceiveTransfer`): The receiving associate scans each product barcode individually to verify that all sent units arrived safely without transit loss.",
          "• One-Tap Quick Receive (`QuickReceiveTransfer`): For low-shrink merchandise packed in tamper-evident sealed totes, associates can intake the entire transfer in one tap.",
          "Crucially, the backend enforces a security override: if the dispatching store manager flagged `ManualCheckRequired = true` (e.g. for high-shrink electronics, open-box items, or suspicious seal breaks), `QuickReceiveTransfer` strictly refuses execution with `ErrValidation: this transfer requires manual check`. The associate is forced to open the box and scan every unit individually, preventing shrinkage from being swept under the rug."
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/receiving_service.go",
          code: `func (s *ReceivingService) QuickReceiveTransfer(ctx context.Context, storeId int, employeeId int, req models.QuickReceiveTransferRequest) error {
    detail, err := s.receivingRepo.GetStockTransferDetail(ctx, req.TransferId)
    if err != nil {
        return err
    }
    if detail == nil {
        return fmt.Errorf("%w: transfer not found", ErrNotFound)
    }
    if detail.Status != "IN_TRANSIT" {
        return fmt.Errorf("%w: transfer is not in transit", ErrValidation)
    }

    // Security Guard: Prevent quick-receive if manual audit was mandated at dispatch
    if detail.ManualCheckRequired {
        return fmt.Errorf("%w: this transfer requires manual check", ErrValidation)
    }

    err = s.receivingRepo.QuickReceiveTransfer(ctx, storeId, req.TransferId, employeeId)
    if err != nil {
        return err
    }
    cache.InvalidateStoreOperations(ctx, s.redisClient, storeId)
    return nil
}`,
          explanation: "If high-shrink items or box tampering require inspection, the backend blocks quick-receive shortcuts, forcing associates to verify each item individually."
        }
      },
      {
        id: "part-12-pos-transactions",
        partNumber: 12,
        badge: "Financial Engine",
        title: "12. Real-Time Transaction Viewer, Canadian Tax Rules & Exact Cent Arithmetic",
        content: [
          "In financial and retail engineering, standard floating-point numbers (`float32` or `float64`) are a disaster waiting to happen. Due to IEEE 754 representation, numbers like `0.1 + 0.2` yield `0.30000000000000004`.",
          "In a retail chain processing 50,000 monthly transactions with discounts, line returns, and multi-tier provincial taxes, fractions of a cent compound into accounting variances that fail financial audits.",
          "To guarantee mathematical perfection, Radius represents all currency using an exact integer cents type: `type Money int64`. Every retail price, cost, discount, and tax calculation is computed in integer cents without floating-point arithmetic.",
          "Furthermore, Radius enforces a strict zero client financial trust principle. The mobile application functions strictly as a real-time transaction viewer and auditor (only administrators create administrative transactions). In `CreateTransactionRequest` and `CreateReturnRequest`, client-submitted monetary amounts (`subtotal`, `tax_amount`, `total_amount`) are explicitly stripped (`json:\"-\"`). The backend recalculates every single subtotal, line discount, and tax dynamically from authoritative catalog prices and store provincial tax tables."
        ],
        callout: {
          type: "warning",
          title: "Never Trust Client Financial Math",
          message: "In retail systems, mobile scanners and point-of-sale clients should never dictate tax rates, line prices, or order totals. A rogue client could submit 0% tax or penny prices. Radius computes every cent server-side based on the store's province and catalog price tables."
        }
      },
      {
        id: "part-12-canadian-taxes",
        partNumber: "12.1",
        badge: "Fixed-Point Math",
        title: "12.1 Dynamic Canadian Provincial Taxes (GST/PST/HST) Without Floating-Point Math",
        content: [
          "Canada has a notoriously complex sales tax regime. Some provinces charge a unified Harmonized Sales Tax (HST), others charge a combination of federal Goods and Services Tax (GST) and Provincial Sales Tax (PST), Alberta charges GST only, and Quebec charges a unique Quebec Sales Tax (QST) of 9.975% alongside 5% GST.",
          "To compute provincial taxes with zero floating-point drift, Radius uses fixed-point basis rates scaled per 100,000 in `utils.SalesTaxRatePer100000`:",
          "• Ontario (13.000% HST): Scaled rate `13000`.",
          "• Maritime Provinces (NB, NL, PE - 15.000% HST): Scaled rate `15000`.",
          "• Nova Scotia (14.000% HST): Scaled rate `14000`.",
          "• British Columbia & Manitoba (5% GST + 7% PST = 12.000%): Scaled rate `12000`.",
          "• Saskatchewan (5% GST + 6% PST = 11.000%): Scaled rate `11000`.",
          "• Quebec (5% GST + 9.975% QST = 14.975%): Scaled rate `14975` (captured perfectly without floating-point approximations!).",
          "• Alberta, NWT, Nunavut, Yukon (5.000% GST): Scaled rate `5000`.",
          "Tax rounding is executed via exact half-up integer math in `Money.TaxAtRatePer100000`: `((product + 50000) / 100000)`. Line item discount proration uses `math/big` rational arithmetic (`Money.Prorate`) to ensure discounts are distributed across lines without losing or gaining a single cent."
        ],
        image: {
          src: "/assets/images/radius-fixed-point-tax-math.svg",
          alt: "Financial Integrity: Fixed-Point Scaled Tax Arithmetic Diagram",
          caption: "Eliminating IEEE 754 floating-point drift across Canadian provinces using fixed-point integer cents scaled per 100,000."
        },
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/models/money.go",
          code: `type Money int64

// TaxAtRatePer100000 calculates exact tax in integer cents using half-up rounding.
// A rate of 13000 represents 13.000% HST (Ontario).
// A rate of 14975 represents 14.975% GST + QST (Quebec).
func (m Money) TaxAtRatePer100000(rate int64) Money {
    product := int64(m) * rate
    if product < 0 {
        return Money(-((-product + 50000) / 100000))
    }
    return Money((product + 50000) / 100000)
}

// Prorate divides discounts and partial refunds across lines with zero cent drift.
func (m Money) Prorate(part, whole Money) Money {
    if whole == 0 {
        return 0
    }
    numerator := new(big.Int).Mul(big.NewInt(int64(m)), big.NewInt(int64(part)))
    denominator := big.NewInt(int64(whole))
    quotient, remainder := new(big.Int).QuoRem(numerator, denominator, new(big.Int))
    if new(big.Int).Mul(new(big.Int).Abs(remainder), big.NewInt(2)).Cmp(new(big.Int).Abs(denominator)) >= 0 {
        quotient.Add(quotient, big.NewInt(int64(numerator.Sign()*denominator.Sign())))
    }
    return Money(quotient.Int64())
}`,
          explanation: "Fixed-point scaling per 100,000 captures fractional tax rates like Quebec's 14.975% exactly in integer math. Half-up rounding prevents compounding rounding errors."
        },
        tradeoff: {
          choice: "Exact int64 Cents with Scaled Tax Basis Points",
          alternatives: ["Standard float64 Currency", "Arbitrary-Precision string Decimal Types", "Database NUMERIC with Float App Hydration"],
          why: "Guarantees mathematically exact half-up rounding, zero memory allocation overhead, and zero IEEE 754 precision drift.",
          tradeoff: "Requires explicit formatting helpers when rendering human-readable currency strings in the UI."
        }
      },
      {
        id: "part-12-pos-velocity",
        partNumber: "12.2",
        badge: "Real-Time Operations",
        title: "12.2 Real-Time Sales Feeds, PCI Card Masking & Floor Velocity Logs",
        content: [
          "When a transaction completes at the cash register, it initiates three immediate system reactions:",
          "• Real-Time WebSocket Broadcast: The backend emits a `StoreActivityPayload` (`tx-{id}`) over WebSockets, delivering live sales alerts, subtotal amounts, and register IDs to managerial tablets.",
          "• Closed-Loop Sales Velocity: The service calls `fillReportRepo.AddSoldItems`, recording the transaction items into the ephemeral floor sales log. This feeds the IS4TC replenishment algorithm, ensuring shelves restock before items sell out.",
          "• Card Masking: Radius never stores raw primary account numbers (PAN), only the payment method, card brand, and the last 4 digits for receipt verification. Migration 44 renamed the legacy `card_number` column, which already held just those 4 digits, to `payment_card_last4` so the schema says exactly what it stores."
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/transaction_service.go",
          code: `// Process transaction completion: deduct stock, log replenishment velocity, and notify staff
tx, items, err := s.salesRepo.CreateTransaction(ctx, targetStoreID, empID, req)
if err != nil {
    return nil, err
}

// 1. Purge Redis cached stock for purchased items
if s.redisClient != nil && len(items) > 0 {
    cache.InvalidateStoreOperations(ctx, s.redisClient, targetStoreID)
    for _, itm := range items {
        _ = s.redisClient.Del(ctx, cache.InventoryProductKey(targetStoreID, itm.ProductId)).Err()
    }
}

// 2. Feed sales velocity directly into IS4TC shelf replenishment
if s.fillReportRepo != nil && len(items) > 0 {
    _ = s.fillReportRepo.AddSoldItems(ctx, targetStoreID, items)
}

// 3. Broadcast real-time activity to store tablets
if s.broadcaster != nil && tx != nil {
    s.broadcaster.BroadcastToStore(targetStoreID, models.WebSocketEvent{
        Type:      models.EventTransactionCreated,
        StoreId:   targetStoreID,
        Timestamp: time.Now().UTC(),
        Payload:   payload,
    })
}`,
          explanation: "Transaction completion deducts inventory atomically, updates IS4TC replenishment velocity, and broadcasts a live WebSocket event to store devices."
        }
      },
      {
        id: "part-13-print-orders",
        partNumber: 13,
        badge: "Service Center",
        title: "13. Print & Copy Commercial Service Center: Custom Production Workflows",
        content: [
          "In many major retail chains, stores feature a commercial print and copy service center alongside standard merchandise aisles. Unlike retail boxes that sit on shelves waiting to be scanned, custom print orders (business cards, blueprint drafting, coil-bound manuals, vinyl banners) are bespoke manufacturing jobs produced in-store.",
          "Print orders cannot be treated like regular merchandise: they consume raw materials (`PrintSupply` tracking bond paper, gloss cardstock, toner, and binding coils), require custom turnaround deadlines, and progress through multi-stage production steps.",
          "Radius models commercial print workflows around strict state transitions, raw supply thresholds, and role-based operational permissions."
        ],
        callout: {
          type: "insight",
          title: "Custom Service Orders vs. Packaged Retail Goods",
          message: "A retail shelf item is scanned and handed to the customer in 10 seconds. A commercial print job requires multi-hour production stages, specialized raw paper stock, proofing, and strict role guards before completion."
        }
      },
      {
        id: "part-13-print-workflows",
        partNumber: "13.1",
        badge: "State Machines",
        title: "13.1 Production Lifecycle State Machines & Service Role Guarding",
        content: [
          "To prevent associates from accidentally skipping critical production stages or marking incomplete jobs as finished, `PrintOrderService` enforces a strict state transition matrix:",
          "• Pending (`PENDING`): Order received; can transition to `IN_PROGRESS` or `CANCELLED`.",
          "• In Production (`IN_PROGRESS`): Job on the press; can transition to `READY_FOR_PICKUP`, `SHIPPED`, or `CANCELLED`.",
          "• Ready for Pickup (`READY_FOR_PICKUP`): Staged in customer pickup bays; can transition to `COMPLETED` or `CANCELLED`.",
          "• Shipped (`SHIPPED`): Dispatched via courier; can transition to `COMPLETED` or `CANCELLED`.",
          "If an associate attempts an illegal status transition (such as jumping directly from `PENDING` to `COMPLETED`), the service strictly aborts with `ErrConflict`.",
          "Furthermore, permissions are enforced at the service boundary: only employees with `SERVICE`, `MANAGER`, or `ADMIN` roles are authorized to modify print order statuses. Sales floor cashiers attempting to change job stages receive an explicit `ErrForbidden`. Upon successful transition, the service emits an `EventPrintOrderStatusUpdated` event over WebSockets to synchronize production queue screens in real time."
        ],
        image: {
          src: "/assets/images/radius-print-state-machine.svg",
          alt: "Commercial Print Order Finite State Machine (FSM) Diagram",
          caption: "Strict production lifecycle state transitions guarded by employee roles, blocking illegal skips with 409 Conflict."
        },
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/print_order_service.go",
          code: `func (s *PrintOrderService) UpdateStatus(ctx context.Context, id, storeID int, role models.EmployeeRole, next models.PrintOrderStatus) (*models.PrintOrder, error) {
    // Role boundary guard
    if role != models.RoleService && role != models.RoleManager && role != models.RoleAdmin {
        return nil, ErrForbidden
    }

    // Strict production state transition matrix
    allowed := map[models.PrintOrderStatus][]models.PrintOrderStatus{
        models.PrintOrderStatusPending:        {models.PrintOrderStatusInProgress, models.PrintOrderStatusCancelled},
        models.PrintOrderStatusInProgress:     {models.PrintOrderStatusReadyForPickup, models.PrintOrderStatusShipped, models.PrintOrderStatusCancelled},
        models.PrintOrderStatusReadyForPickup: {models.PrintOrderStatusCompleted, models.PrintOrderStatusCancelled},
        models.PrintOrderStatusShipped:        {models.PrintOrderStatusCompleted, models.PrintOrderStatusCancelled},
    }

    order, _, err := s.GetPrintOrderByIDForStore(ctx, id, storeID, role)
    if err != nil || order == nil {
        return nil, ErrNotFound
    }

    // Validate transition
    valid := false
    for _, status := range allowed[order.Status] {
        if status == next {
            valid = true
            break
        }
    }
    if !valid {
        return nil, ErrConflict
    }

    // Persist only if the order is still in the status we validated against
    updated, err := s.ordersRepo.UpdatePrintOrderStatus(ctx, id, order.StoreId, order.Status, next)
    if err != nil {
        return nil, err
    }
    if !updated {
        return nil, ErrConflict
    }
    previous := order.Status
    order.Status = next

    // Broadcast the stage change to service center displays
    if s.broadcaster != nil {
        s.broadcaster.BroadcastToStore(order.StoreId, models.WebSocketEvent{
            Type: models.EventPrintOrderStatusUpdated, StoreId: order.StoreId, Timestamp: time.Now(),
            Payload: models.PrintOrderStatusUpdatedPayload{PrintOrderID: id, StoreID: order.StoreId, PreviousStatus: previous, NewStatus: next},
        })
    }
    return order, nil
}`,
          explanation: "The state machine prevents illegal status skips, protects production queues with role authorization, and broadcasts stage updates live via WebSockets."
        },
        tradeoff: {
          choice: "Strict State Transition Matrix in Domain Service",
          alternatives: ["Unconstrained Database Status Column Updates", "Database Trigger Status Validations", "External Workflow Orchestrator Engine"],
          why: "Guarantees invalid production skips (e.g. Pending directly to Completed) are caught before hitting the database.",
          tradeoff: "Adding a new intermediate production status requires updating the service transition map and test fixtures."
        }
      },
      {
        id: "part-14-immutable-ledger",
        partNumber: 14,
        badge: "Audit Integrity",
        title: "14. Permanent Activity History & Immutable Inventory Audit Ledger",
        content: [
          "In retail operations, the question is never just 'what is our stock count today?' It is always: 'Who touched this item, at which store, on what date, and why?'",
          "When a retail store discovers that 10 expensive laptops are missing, store management cannot rely on guesswork. They need a permanent, tamper-proof history of every movement: when the shipment was received, which associate binned it into overstock racking, when a cycle count reported a discrepancy, and whether an adjustment was signed off.",
          "Radius guarantees complete accountability through an append-only immutable audit ledger: the `inventory_transactions` table. Every single physical movement (`RECEIPT`, `SALE`, `RETURN`, `TRANSFER_OUT`, `TRANSFER_IN`, `CYCLE_COUNT_VARIANCE`, `ADJUSTMENT`) writes an immutable record to this ledger."
        ],
        callout: {
          type: "insight",
          title: "Accountability as a Core System Primitive",
          message: "In retail operations, the question is never just 'what is our stock today?' It is always 'who touched this item, at which store, on what date, and why?' An immutable ledger transforms guesswork into verifiable accountability."
        }
      },
      {
        id: "part-14-transaction-audit",
        partNumber: "14.1",
        badge: "Transaction Integrity",
        title: "14.1 Transaction-Atomic Audit Logging & Immutable Inventory Ledgers",
        content: [
          "The critical architectural guarantee of Radius is transaction atomicity. An audit log is completely useless if a database crash or network disconnect causes an inventory adjustment to succeed while failing to write the audit entry.",
          "In `radius-backend/internal/repository/audit_repo.go`, `LogInventoryTransaction` accepts an active PostgreSQL transaction pointer (`tx *sql.Tx`):",
          "• Atomic Commits: The inventory quantity update and the `inventory_transactions` insert are executed within the exact same database transaction. If the audit record fails to insert, the inventory mutation rolls back completely. Phantom movements cannot exist.",
          "• Comprehensive Traceability: Every record stores `product_id`, `from_store_id`, `to_store_id`, `transaction_type`, `quantity`, `unit_cost`, `unit_price`, `reason_code`, `employee_id`, and `reference_id` (purchase order number, transfer ID, or transaction number).",
          "• Dynamic Query Filtering: The audit repository joins entries with `employees` and `stores` tables, providing paginated chronological audit trails filtered by barcode, date range, transaction type, or employee ID on mobile handhelds.",
          "• Structured Observability: Coupled with Go's standard `log/slog` structured logging and `X-Request-ID` correlation IDs, every change across the entire platform can be traced from the mobile screen to the database disk."
        ],
        image: {
          src: "/assets/images/radius-atomic-audit-ledger.svg",
          alt: "Transaction-Atomic Audit Ledger Architecture Diagram",
          caption: "Writing append-only audit entries inside the active tx *sql.Tx database transaction guarantees zero phantom inventory movements."
        },
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/repository/audit_repo.go",
          code: `// LogInventoryTransaction writes an immutable audit record inside the active DB transaction.
func (r *AuditRepo) LogInventoryTransaction(ctx context.Context, tx *sql.Tx, entry models.InventoryTransaction) error {
    query := \`
        INSERT INTO inventory_transactions
            (product_id, from_store_id, to_store_id, transaction_type, quantity,
             unit_cost, unit_price, reason_code, employee_id, reference_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    \`
    _, err := tx.ExecContext(ctx, query,
        entry.ProductId, entry.FromStoreId, entry.ToStoreId,
        entry.TransactionType, entry.Quantity, entry.UnitCost,
        entry.UnitPrice, entry.ReasonCode, entry.EmployeeId, entry.ReferenceId,
    )
    return err
}`,
          explanation: "Accepting tx *sql.Tx ensures the audit entry is written in the exact same database transaction as the inventory mutation. Zero untracked movements can ever slip through."
        },
        tradeoff: {
          choice: "Synchronous In-Transaction Audit Logging via *sql.Tx",
          alternatives: ["Asynchronous Event Queue Logging", "PostgreSQL CDC / WAL Listeners", "Application-Level File Audit Logs"],
          why: "Guarantees that an inventory mutation and its corresponding audit ledger record can never drift out of sync if an outage occurs mid-operation.",
          tradeoff: "Adds a slight write latency to every inventory transaction by executing an additional insert within the database transaction."
        }
      },
      {
        id: "operations-retrospective",
        badge: "Architecture Retrospective",
        title: "Engineering Retrospective: The Complete 14-Pillar Retail Operations Engine",
        content: [
          "With all 14 operational pillars fully architected, implemented, and tested, Radius stands as a comprehensive retail, logistics, and store management engine built from first principles.",
          "Every module is backed by production-ready code across the Go backend and React Native Expo SDK 54 frontend:",
          "• Strict 3-Tier Go Clean Monolith: Explicit manual dependency wiring in `main.go`, context cancellation propagation on dropped Wi-Fi, and clean interface decoupling.",
          "• PostgreSQL Relational Topology: 45 versioned UP/DOWN schema migrations, composite covering indexes, pg_trgm trigram search, and 70,000+ seeded synthetic records stress-tested under load.",
          "• High-Speed Resilient WebSockets: Gorilla WebSocket hubs, single-use 30-second handshake tickets, slow-client dead-zone dropped connection protections, and mobile AppState battery savers.",
          "• IP-Aware Single-Device Security: Token bucket IP rate limiting, SHA-256 refresh token hashing, and IP-aware takeover prompts that stop duplicate handheld logins.",
          "• Concurrency-Safe Operations: Assignment-locked cycle counts, shift ownership handovers, mutual-exclusion BOPIS order assignment locks, and background expiration goroutines.",
          "• Closed-Loop Replenishment & Omnichannel: In-Stock For The Customer (IS4TC) empty hole floor scans combined with live POS sales velocity to generate optimal aisle-by-aisle warehouse pick lists.",
          "• High-Performance Multi-Tier Caching: Negative caching, Go singleflight stampede suppression, and mobile Stale-While-Revalidate (SWR) screen loads.",
          "• Enterprise Multi-Store Logistics: Dynamic branch switching with cache partitioning, 9-digit warehouse coordinates (Aisle-Bay-Shelf-Position), 11 inventory sub-buckets, supervisor approval queues, and 20-digit LPR freight receiving.",
          "• Financial Integrity & Immutable Auditing: Fixed-point integer cent arithmetic (`Money int64`), dynamic Canadian provincial tax rules (GST/PST/HST), last-4-only card storage, and transaction-atomic audit ledger logging.",
          "Modern software development often pushes teams toward over-complicated microservice meshes and bloated libraries. Building Radius proved that by choosing simplicity, relational database guarantees, and clear software architecture, a unified system can remain blazingly fast, rock-solid, and a true pleasure for retail associates to use every single day."
        ]
      }
    ]
  },
  {
    slug: "blip-text-editor-piece-table",
    projectId: "blip",
    projectTitle: "Blip - Production-Grade Text Editor",
    title: "Designing a Fast Text Editor in C++: Handling Big Files Without Lag",
    subtitle: "What building a lightweight desktop text editor in C++ taught me about computer memory, screen rendering, and lightning-fast undo and redo.",
    date: "August 2026",
    readTime: "7 min read",
    tags: ["C++", "Data Structures", "SDL2", "Systems Programming", "Memory Management"],
    heroSummary: "A simple look at why standard text programs slow down when opening large files, how a smart data structure called a Piece Table lets you insert text instantly without copying huge chunks of memory, and how to build unlimited undo and redo without eating up RAM.",
    metrics: [
      { label: "Typing Speed", value: "Instant (O(1))" },
      { label: "Memory Usage", value: "Near-Zero Copy" },
      { label: "Undo History", value: "Unlimited" },
      { label: "Frame Rate", value: "60 FPS Smooth" }
    ],
    sections: [
      {
        title: "1. The Challenge: Opening Big Files Without Freezing",
        content: [
          "When you start building a text editor, the most natural instinct is to store all the text in one big string.",
          "While that works fine for a short paragraph, it falls apart the moment someone opens a 50MB log file. If the user types a single character at the top of the file, the computer has to shuffle 50 million characters over in memory just to make room for that one letter. That causes noticeable typing lag.",
          "A Piece Table solves this by dividing text into two simple lists that never change: the original file on disk, and a list of new text you type. Instead of moving millions of characters, the editor just keeps a small list of pointers saying: 'take 10 words from the original file, insert 3 words the user just typed, then take the rest from the original file'. Opening a massive file takes almost zero time."
        ],
        tradeoff: {
          choice: "Two-Buffer Piece Table",
          alternatives: ["One Giant String", "Gap Buffer (shifting text around a cursor gap)", "Rope (a tree of small strings)"],
          why: "It lets large files open instantly without copying megabytes of memory, and makes undo and redo effortless.",
          tradeoff: "Finding the exact line and column on screen takes a tiny bit of math compared to counting characters in a single string."
        }
      },
      {
        title: "2. Instant Undo and Redo",
        content: [
          "Because neither the original file nor the new text list are ever erased or edited in place, saving an 'Undo' step is as simple as taking a quick snapshot of the list of pointers.",
          "It takes a fraction of a millisecond and uses virtually no memory, letting you press Ctrl+Z as many times as you want without slowing down your computer."
        ]
      }
    ]
  },
  {
    slug: "creditguardai-credit-default-prediction",
    projectId: "creditguardai",
    projectTitle: "CreditGuard AI: Credit Default Prediction",
    title: "Building an End-to-End Credit Default Prediction Engine",
    subtitle: "From raw data ingestion to GPU-accelerated PyTorch models and threshold optimization, here is how I built a robust ML pipeline to predict credit card defaults.",
    date: "September 2026",
    readTime: "10 min read",
    tags: ["Machine Learning", "PyTorch", "Scikit-Learn", "Data Science", "Python"],
    heroSummary: "In the financial sector, missing a high-risk credit account can result in thousands of dollars in losses, while rejecting good customers hurts revenue. CreditGuard AI tackles this by analyzing 6 months of historical billing data using classical ML ensembles and deep learning. I built the entire pipeline from scratch, dealing with imbalanced datasets, heavy feature engineering, and hyperparameter tuning across multiple CPU cores.",
    metrics: [
      { label: "Default Catch Rate (Coverage)", value: "80.3%" },
      { label: "Dataset Size", value: "30,000 Records" },
      { label: "Engineered Features", value: "24 New Financial Signals" },
      { label: "Best Performing Model", value: "HistGradientBoosting" }
    ],
    sections: [
      {
        title: "1. The Data and Feature Engineering",
        content: [
          "The dataset from the UCI Machine Learning Repository contained 30,000 customer records. However, raw numbers like billing amounts and payment amounts don't tell the whole story.",
          "I engineered 24 new domain-specific features to surface real credit risk signals. For instance, `AVG_UTILIZATION` measures how close a customer is to maxing out their credit line. `DELINQUENCY_TREND` measures whether a customer's late payments are getting worse over time.",
          "As shown below, analyzing the class distribution highlighted a heavy imbalance (77.9% settled vs 22.1% default), which influenced all subsequent model decisions."
        ],
        image: {
          src: "/assets/images/eda_class_distribution.png",
          alt: "Class Distribution showing 77.9% settled vs 22.1% default",
          caption: "A clear view of the class imbalance that required weighted loss functions."
        }
      },
      {
        title: "2. Exploring Delinquency and Utilization",
        content: [
          "Before training any models, I ran an Exploratory Data Analysis (EDA) to understand the strongest predictors of default.",
          "Plotting the delinquency status against the default rate revealed that customers who were 2+ months late on their most recent payment had default rates exceeding 60%.",
          "Similarly, comparing credit utilization distributions showed that defaulters consistently ran higher utilization rates compared to customers who settled their balances."
        ],
        image: {
          src: "/assets/images/eda_delinquency_vs_default.png",
          alt: "Delinquency vs Default Rate",
          caption: "Customers with recent late payments are highly likely to default."
        }
      },
      {
        title: "3. Training the Models (Classical & PyTorch)",
        content: [
          "I trained four distinct models: Logistic Regression, Random Forest, Histogram-Based Gradient Boosting, and a PyTorch Multi-Layer Perceptron (MLP).",
          "To combat the class imbalance, I used `class_weight='balanced'` for the Scikit-Learn models and `pos_weight=3.52` in the PyTorch `BCEWithLogitsLoss` function.",
          "The PyTorch model was built with 3 hidden layers using LeakyReLU activations and Dropout for regularization. Because my development machine uses an AMD Radeon GPU, I implemented Microsoft's `torch-directml` backend to parallelize training, bypassing the lack of CUDA support."
        ],
        codeSnippet: {
          language: "python",
          fileName: "src/train_pytorch.py",
          code: `criterion = nn.BCEWithLogitsLoss(pos_weight=torch.tensor([3.52]).to(device))\noptimizer = torch.optim.AdamW(model.parameters(), lr=0.001, weight_decay=1e-4)\nscheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='max', factor=0.5, patience=2)`,
          explanation: "Using AdamW for decoupled weight decay and a dynamic learning rate scheduler helped the PyTorch model converge smoothly without overfitting."
        }
      },
      {
        title: "4. Hyperparameter Tuning and Threshold Optimization",
        content: [
          "Gradient Boosting emerged as the best performer. To squeeze out the last bit of accuracy, I ran a `RandomizedSearchCV` across all CPU cores (`n_jobs=-1`), testing 25 different hyperparameter combinations.",
          "However, standard 0.50 decision thresholds are poor choices for imbalanced risk domains. Catching defaulters is generally more valuable than preventing false alarms. I swept 51 thresholds from 0.20 to 0.70 and plotted the precision-recall tradeoff.",
          "By shifting the decision threshold to 0.37, I achieved an 80.3% default coverage rate, successfully catching 4 out of every 5 defaulters."
        ],
        image: {
          src: "/assets/images/threshold_coverage_tradeoff.png",
          alt: "Threshold vs Coverage Tradeoff",
          caption: "Optimizing the decision threshold to prioritize catching defaults (recall)."
        }
      },
      {
        title: "5. The Evaluation Dashboard",
        content: [
          "To provide a clear comparison across all models, the pipeline automatically generates a 4-panel evaluation dashboard.",
          "This dashboard includes ROC curves, Precision-Recall curves, the final Confusion Matrix, and the Top 10 Feature Importances.",
          "The feature importance plot confirmed that `PAY_0` (most recent repayment status) and `AVG_UTILIZATION` were the strongest indicators of future default."
        ],
        image: {
          src: "/assets/images/model_benchmark_dashboard.png",
          alt: "Model Benchmark Dashboard",
          caption: "The final 4-panel dashboard comparing all trained models."
        }
      }
    ]
  }
];
