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
    readTime: "24 min read",
    tags: ["Go", "System Design", "PostgreSQL", "Clean Architecture", "WebSockets", "React Native"],
    heroSummary: "In a busy retail store, software simply cannot freeze or crash. When cashiers are ringing up long checkout lines and warehouse staff are scanning incoming inventory across multiple store locations, even a few seconds of lag causes real-world chaos. I built Radius from scratch to solve these everyday headaches. Here is an honest look at how I designed the system, the practical problems I ran into, and why I chose simplicity and reliability over complicated frameworks.",
    metrics: [
      { label: "Backend Architecture", value: "3-Tier Go Monolith" },
      { label: "Database Migrations", value: "40 Versioned Up/Down" },
      { label: "DB Driver & Pool", value: "pgx/v5 (25 Conns)" },
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
        description: "Designing a 40-migration relational schema for multi-store retail, and stress-testing it with 70,000+ synthetic records."
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
        title: "Closing the Loop Between POS Velocity and Empty Shelf Scans",
        status: "published",
        description: "How mobile aisle scans and POS transactions feed an ephemeral Redis session to build optimal serpentine picking routes through the warehouse."
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
        id: "part-8-store-hierarchy",
        partNumber: 8,
        title: "Multi-Store Structure & Branch Management",
        status: "upcoming",
        description: "How head office administrators and store staff can easily switch between store branches without having to log in repeatedly."
      },
      {
        id: "part-9-product-catalog",
        partNumber: 9,
        title: "Product Catalog, Fast Search & Smart Caching",
        status: "upcoming",
        description: "Managing thousands of master barcodes and categories, and keeping search results instant by saving popular lookups in memory."
      },
      {
        id: "part-10-mims-inventory",
        partNumber: 10,
        title: "Mobile Inventory Management (MIMS) & Stock Shelving",
        status: "upcoming",
        description: "Tracking exactly where products sit in the warehouse using 9-digit shelf coordinates and 11 distinct stock statuses."
      },
      {
        id: "part-11-inbound-logistics",
        partNumber: 11,
        title: "Receiving Shipments & Box Scanning",
        status: "upcoming",
        description: "Accepting truck deliveries, scanning master container barcodes, and routing items safely between retail stores."
      },
      {
        id: "part-12-pos-transactions",
        partNumber: 12,
        title: "Point of Sale (POS) Checkout & Canadian Tax Rules",
        status: "upcoming",
        description: "Processing multiple payment types at the cash register, calculating provincial taxes accurately, and adjusting stock numbers instantly."
      },
      {
        id: "part-13-print-orders",
        partNumber: 13,
        title: "Print & Copy Commercial Service Center",
        status: "upcoming",
        description: "Managing custom client print workflows, document specifications, turnaround deadlines, and deposit calculations."
      },
      {
        id: "part-14-immutable-ledger",
        partNumber: 14,
        title: "Permanent Activity History & Audit Logs",
        status: "upcoming",
        description: "Recording every single inventory adjustment into a permanent history log so managers can always see who moved what and when."
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
          "• Tier 4: Domain Business Services (internal/service): The brain of Radius. Houses retail business logic (cycle count locks, session collision detection, pick-list serpentine sorting) and orchestrates background goroutine workers and the real-time WebSocket hub.",
          "• Tier 5: Persistence & Caching (internal/repository): Manages PostgreSQL 16 relational tables via pgx/v5 connection pools, Redis in-memory token blacklists and ephemeral floor sessions, and the immutable audit ledger."
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
          tradeoff: "The main.go file is about 150 lines long, but those 150 lines save hours of debugging down the road."
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
          "A multi-store retail operating system lives and dies by its database. When inventory levels drop on the sales floor, online customers reserve pickup orders, and cashiers scan goods at register lanes, the database must enforce ACID integrity without creating transaction bottlenecks.",
          "Rather than using an unstructured NoSQL store or hiding critical schema operations behind an unoptimized ORM, I modeled Radius around a strictly relational schema across 40 versioned UP/DOWN migrations in PostgreSQL 16. Below is the interactive Entity-Relationship (ER) Explorer and Canvas Diagram mapping every core domain of the platform.",
          "• Multi-Store Partitioning: Every operational table is scoped by store_id, creating rock-solid data boundaries between retail branches while allowing head office and regional managers to run unified enterprise rollups.",
          "• 11 Sub-Inventory Status Buckets: Retail stock is never just 'in stock' or 'out of stock'. The mims_inventory schema divides units into 11 distinct buckets (new_qty, open_box_qty, display_qty, damaged_qty, bopis_qty, transfer_hold_qty, etc.) so online pickup allocations or broken units are never accidentally sold to in-store customers.",
          "• Standardized 9-Digit Warehouse Shelving: Backroom inventory is indexed through mims_locations using standardized aisle coordinates (AA-BB-SS-PPP). This enables the replenishment engine to build serpentine routes that minimize walking time during restocking runs.",
          "• Synthetic Scale Verification: To verify schema performance under heavy store traffic, I wrote a Python Faker test generator orchestrated by a Go runner. It seeded over 70,000 inventory rows, 50,000 register transactions, 10,000 master products, 5,000 online orders, and 1,000 cycle count audits across 7 store branches, ensuring indexes and connection pools maintain sub-millisecond lookups."
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
          "While the code logic runs in Go, retail systems live and die by how well they handle busy hours. On a busy Saturday afternoon, dozens of employees are scanning inventory shelves at the exact same moment cashiers are ringing up customer orders at the registers.",
          "Instead of using the older `lib/pq` library, I chose the modern `pgx/v5` driver. I carefully tuned the connection pool settings in `internal/database/database.go` to keep the store snappy and reliable:",
          "• Limit open connections to 25 (`SetMaxOpenConns`): Prevents the database server from running out of memory when lots of people are using the app at once.",
          "• Keep 25 connections warm (`SetMaxIdleConns`): Keeps ready-to-use lines open so when a worker scans a barcode, the response is instant without waiting to establish a new connection from scratch.",
          "• Refresh connections every 5 minutes (`SetConnMaxLifetime`): Periodically closes and re-opens connections to cleanly handle cloud database restarts or brief network hiccups.",
          "I also built database migrations directly into the startup process. When running in development or testing, the server checks for any new database table updates and applies them automatically before opening up for requests:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/database/database.go",
          code: `func (d *DB) RunMigrations(migrationsPath string) error {
    log.Println("Running database migrations...")

    driver, err := postgres.WithInstance(d.DB, &postgres.Config{})
    if err != nil {
        return fmt.Errorf("creating migration driver: %w", err)
    }

    m, err := migrate.NewWithDatabaseInstance("file://"+migrationsPath, "postgres", driver)
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
        id: "part-4-auth-sessions",
        partNumber: 4,
        badge: "Security & Sessions",
        title: "4. Device Security & Access Control: Stopping Session Conflicts on Shared Handhelds",
        content: [
          "In a fast-paced retail store, shared handheld scanners and floor tablets change hands constantly. An associate might log in on a terminal in aisle 4, set it down on a packing bench, and pick up another device five minutes later to continue working. If two people end up using the same account simultaneously, cash drawers, inventory adjustments, and audit trails become a tangled nightmare.",
          "Many consumer apps silently allow unlimited concurrent logins from any device anywhere in the world. But in retail operations, a user account maps to a physical human being holding a physical barcode scanner. If two different devices perform conflicting inventory transactions under the same name at the exact same second, there is no way to know who made which change.",
          "To eliminate ghost logins and preserve strict operational accountability, I built an IP-aware single active session policy in `radius-backend/internal/service/auth_service.go`. When an associate logs in, the backend checks PostgreSQL and Redis to see if that employee already has an active session on the store network.",
          "If an active session already exists, Radius detects the potential collision. Rather than abruptly disconnecting a working register or silently creating duplicate sessions, the app prompts the worker for confirmation to take over the session. Once confirmed, the previous session is immediately revoked, issuing a brand-new token pair and keeping the audit ledger completely untangled."
        ],
        callout: {
          type: "insight",
          title: "Why Retail Hardware Demands Remote Revocation",
          message: "If an employee accidentally leaves a company scanner on a public sales display or in a shopping cart, managers cannot afford to wait for a 24-hour token to expire. From the active session console, managers can terminate any lost scanner's session with a single tap, immediately invalidating the token in Redis."
        }
      },
      {
        id: "part-4-single-session",
        partNumber: "4.1",
        badge: "Session Takeover",
        title: "4.1 IP-Aware Session Takeover and Remote Device Revocation",
        content: [
          "Handling shared hardware gracefully means distinguishing between someone switching devices on the store Wi-Fi versus an unauthorized login attempt from outside the building.",
          "In `internal/service/auth_service.go`, the login flow inspects the incoming client IP address against active session records in Redis and PostgreSQL:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/auth_service.go",
          code: `// 1. Inspect existing active sessions for this employee
activeSessions, err := s.sessionService.GetSessionsByEmployeeId(ctx, employee.EmployeeId)
if err == nil && len(activeSessions) > 0 {
    parsedIP := net.ParseIP(ipAddress)
    hasSameIPSession := false
    for _, sess := range activeSessions {
        if sess.IpAddress != nil && parsedIP != nil && sess.IpAddress.Equal(parsedIP) {
            hasSameIPSession = true
            break
        }
    }

    // Require explicit confirmation if an active session exists on the store network
    if hasSameIPSession && !model.Force {
        return &models.LoginResult{RequiresConfirmation: true}, nil
    }
}

// 2. Provision new session and store hashed refresh token
accessToken, refreshToken, sessionId, err := s.sessionService.CreateSession(
    ctx, employee.EmployeeId, employee.Role, email, ipAddress, employee.StoreId,
)`,
          explanation: "When an employee signs in on a replacement device, the server recognizes the existing session on the store IP network and requires a takeover confirmation (RequiresConfirmation: true). This prevents two associates from unknowingly sharing the same login, while allowing seamless hardware swaps."
        },
        tradeoff: {
          choice: "IP-Aware Single Active Session Enforcement",
          alternatives: ["Permit Unlimited Concurrent Logins", "Silent Force-Eviction Without Warning", "Hardware MAC Address Whitelisting"],
          why: "Guarantees that every inventory scan, cash transaction, and stock adjustment traces back to a single active device, while preventing accidental logouts during routine terminal handovers.",
          tradeoff: "Adds a confirmation prompt when employees switch scanners on shift, but prevents costly audit ledger corruption."
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
        title: "6. Shelf Restocking: Closing the Loop Between Register Sales and Empty Shelves",
        content: [
          "In retail, one of the most frustrating experiences for both customers and staff is the 'ghost out-of-stock'. A customer walks down an aisle looking for a specific cable or tool, finds an empty shelf hook, and leaves without buying anything—even though three cases of that exact product are sitting untouched in the back storage room.",
          "Traditional stores rely on manual clipboards or delayed end-of-week reports to identify missing stock. By the time a report is printed, dozens of sales opportunities have already been lost.",
          "To solve this, I built a closed-loop replenishment system that connects real-time register sales directly with mobile aisle audits.",
          "Floor associates conduct routine floor walks using the IS4TC ('In-Stock For The Customer') mobile camera scanner, tagging empty shelf hooks in seconds. Each scan is written to a shared 24-hour Redis store session, preventing duplicate scans across team members walking neighboring aisles.",
          "Simultaneously, the backend monitors checkout transactions from cash registers. The fill report service combines these high-velocity sales and empty hole tags against backroom overstock bin quantities (`mims_location_items`). It automatically generates a prioritized pick list showing exactly which products to pull from the warehouse to restock the sales floor."
        ],
        callout: {
          type: "insight",
          title: "Serpentine Picking Paths Save Miles of Walking",
          message: "Warehouse stock is tracked with 9-digit standardized coordinates (Aisle-Bay-Shelf-Position, e.g., 01-02-01-001). By sorting generated pick lists in alphanumeric aisle order, warehouse pickers follow an optimal serpentine path through the back room without zig-zagging back and forth."
        }
      },
      {
        id: "part-6-closed-loop",
        partNumber: "6.1",
        badge: "Floor Logistics",
        title: "6.1 Merging POS Velocity with Mobile Empty Hole Scans in Redis",
        content: [
          "Here is how the fill report service orchestrates floor scans, updates Redis memory sessions, and writes empty hole events to PostgreSQL in `internal/service/fill_report_service.go`:"
        ],
        codeSnippet: {
          language: "go",
          fileName: "radius-backend/internal/service/fill_report_service.go",
          code: `func (s *FillReportService) AddToIS4TCSession(ctx context.Context, storeID int, product models.MimsProductInventory, employeeID *int) ([]models.MimsProductInventory, error) {
    // 1. Automatically record empty hole in PostgreSQL fill report
    if s.fillReportRepo != nil {
        _ = s.fillReportRepo.AddEmptyHole(ctx, storeID, product.ProductId, employeeID)
    }

    // 2. Add to active shared Redis session for store-wide collaboration
    items, err := s.GetActiveIS4TCSession(ctx, storeID)
    if err != nil {
        return nil, err
    }

    // Deduplicate scans across associates walking the floor
    for _, item := range items {
        if item.ProductId == product.ProductId {
            return items, nil
        }
    }

    items = append([]models.MimsProductInventory{product}, items...)
    data, _ := json.Marshal(items)

    key := fmt.Sprintf("is4tc_session:%d", storeID)
    _ = s.redisClient.Set(ctx, key, data, 24*time.Hour).Err()
    return items, nil
}`,
          explanation: "When an employee scans an empty shelf, it is recorded in PostgreSQL for long-term fill reporting and simultaneously pushed into Redis. If a second employee scans that same empty spot three minutes later, Redis detects the duplicate product ID instantly, saving time and keeping pick lists clean."
        },
        tradeoff: {
          choice: "Shared Ephemeral Redis Session for Floor Scanning",
          alternatives: ["Direct Persistent SQL Inserts for Every Scan Event", "Local-Only On-Phone Scan Storage", "End-Of-Shift Paper Batch Entry"],
          why: "Redis provides sub-millisecond deduplication across multiple mobile devices operating simultaneously, while PostgreSQL maintains the formal restocking audit record.",
          tradeoff: "Requires maintaining dual persistence paths in the service layer, but provides a seamless collaborative experience on the sales floor."
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
        id: "roadmap-summary",
        badge: "Roadmap",
        title: "Looking Ahead: What Is Coming Next in the Radius Series",
        content: [
          "We have now covered the first 7 core operational pillars of Radius in sequential order: clean 3-tier Go architecture & top-level design, PostgreSQL relational database architecture & 70K scale testing, real-time WebSocket communication, IP-aware device security, concurrency-locked cycle counts, closed-loop shelf replenishment, and BOPIS omnichannel fulfillment.",
          "All 7 published modules are backed by production-grade Go code, React Native mobile interfaces, and 40 versioned database migrations.",
          "In the upcoming chapters of this engineering series, we will dive into the remaining operational modules in sequential order:",
          "• Part 8: Multi-Store Structure & Branch Management: Branch tenant isolation, regional manager global views, and instant store switching.",
          "• Part 9: Product Catalog, Fast Search & Smart Caching: 10,000+ master UPC barcodes, brand hierarchy, and Redis cache invalidation.",
          "• Part 10: Mobile Inventory Management (MIMS): 9-digit warehouse shelf coordinates (Aisle-Bay-Shelf-Position) and 11 distinct stock status sub-buckets.",
          "• Part 11: Inbound Logistics & Box Scanning: Receiving supplier purchase orders, routing multi-store transfers, and 20-digit License Plate Receiving (LPR) master carton scans.",
          "• Part 12: Point of Sale (POS) Checkout: Register cash drawers, multi-tender payments, Canadian provincial tax rule engines (GST/PST/HST), and instant inventory decrements.",
          "• Part 13: Print & Copy Commercial Service Center: Custom commercial printing workflows, paper stock options, turnaround deadlines, and deposit calculations.",
          "• Part 14: Permanent Activity History & Audit Ledger: Strict append-only tracking in the inventory_transactions audit ledger for permanent accountability.",
          "Stay tuned as I share more practical engineering stories and architectural deep dives from building Radius!"
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
  }
];
