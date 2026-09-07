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
    readTime: "14 min read",
    tags: ["Go", "System Design", "PostgreSQL", "Clean Architecture", "WebSockets", "React Native"],
    heroSummary: "In a busy retail store, software simply cannot freeze or crash. When cashiers are ringing up long checkout lines and warehouse staff are scanning incoming inventory across multiple store locations, even a few seconds of lag causes real-world chaos. I built Radius from scratch to solve these everyday headaches. Here is an honest look at how I designed the system, the practical problems I ran into, and why I chose simplicity and reliability over complicated frameworks.",
    metrics: [
      { label: "Backend Architecture", value: "3-Tier Go Monolith" },
      { label: "Database Migrations", value: "38 Versioned Up/Down" },
      { label: "DB Driver & Pool", value: "pgx/v5 (25 Conns)" },
      { label: "Testing Approach", value: "Interface Mocking" }
    ],
    tableOfContents: [
      {
        id: "part-1-layered-architecture",
        partNumber: 1,
        title: "Clean Architecture: Keeping the Code Clean and Organized",
        status: "published",
        description: "How dividing code into three simple jobs (handling web requests, running store rules, and talking to the database) stops files from becoming a tangled mess."
      },
      {
        id: "part-1-interfaces",
        partNumber: "1.1",
        title: "Using Interfaces: Making Parts Easy to Test and Swap",
        status: "published",
        description: "Why writing simple contracts for what the database should do makes the code much easier to test without a live database."
      },
      {
        id: "part-1-manual-di",
        partNumber: "1.2",
        title: "Connecting the Pieces by Hand in main.go",
        status: "published",
        description: "Why assembling components explicitly is much safer than relying on complicated background magic that can break unexpectedly."
      },
      {
        id: "part-1-database-pgx",
        partNumber: "1.3",
        title: "Database Connections: Handling Rushes Without Crashing",
        status: "published",
        description: "Tuning connection limits so dozens of barcode scanners can work at once without overwhelming the database server."
      },
      {
        id: "part-1-context-propagation",
        partNumber: "1.4",
        title: "Handling Dropped Wi-Fi and Canceling Unneeded Work",
        status: "published",
        description: "How canceling database queries the moment an employee walks out of Wi-Fi range keeps the server fast and responsive."
      },
      {
        id: "part-2-real-time-websockets",
        partNumber: 2,
        title: "Real-Time Updates: Instant Notifications Across Store Branches",
        status: "published",
        description: "Replacing battery-draining page refreshes with a live communication hub, ensuring Store 1 never receives notifications meant for Store 2."
      },
      {
        id: "part-2-concurrency",
        partNumber: "2.1",
        title: "Handling Slow Phones in Wi-Fi Dead Zones",
        status: "published",
        description: "What happens when an employee walks into a back stock room with zero Wi-Fi, and how I drop stuck connections so the rest of the store keeps running."
      },
      {
        id: "part-2-react-native",
        partNumber: "2.2",
        title: "Mobile Reliability: Reconnecting Gracefully and Saving Battery",
        status: "published",
        description: "Automatically pausing the live connection when the phone is in a pocket to save battery, and reconnecting the instant it unlocks."
      },
      {
        id: "part-3-auth-sessions",
        partNumber: 3,
        title: "Authentication, Device Tracking & Security Roles",
        status: "upcoming",
        description: "How I track physical store devices, keep user logins secure with token rotation, and let managers log out any lost device with one tap."
      },
      {
        id: "part-4-store-hierarchy",
        partNumber: 4,
        title: "Multi-Store Structure & Branch Management",
        status: "upcoming",
        description: "How head office administrators and store staff can easily switch between store branches without having to log in repeatedly."
      },
      {
        id: "part-5-product-catalog",
        partNumber: 5,
        title: "Product Catalog, Fast Search & Smart Caching",
        status: "upcoming",
        description: "Managing thousands of master barcodes and categories, and keeping search results instant by saving popular lookups in memory."
      },
      {
        id: "part-6-mims-inventory",
        partNumber: 6,
        title: "Mobile Inventory Management (MIMS) & Stock Shelving",
        status: "upcoming",
        description: "Tracking exactly where products sit in the warehouse using 9-digit shelf coordinates and 11 distinct stock statuses."
      },
      {
        id: "part-7-cycle-counting",
        partNumber: 7,
        title: "Routine Store Audits & Loss Prevention",
        status: "upcoming",
        description: "Helping staff audit store sections with mobile barcode scanners, calculating dollar differences automatically in real time."
      },
      {
        id: "part-8-inbound-logistics",
        partNumber: 8,
        title: "Receiving Shipments & Box Scanning",
        status: "upcoming",
        description: "Accepting truck deliveries, scanning master container barcodes, and routing items safely between retail stores."
      },
      {
        id: "part-9-fill-replenishment",
        partNumber: 9,
        title: "Shelf Restocking & Fill Reports",
        status: "upcoming",
        description: "Guiding staff on regular floor walks to spot empty shelves and generating smart pick lists to bring items out from the back room."
      },
      {
        id: "part-10-pos-transactions",
        partNumber: 10,
        title: "Point of Sale (POS) Checkout & Canadian Tax Rules",
        status: "upcoming",
        description: "Processing multiple payment types at the cash register, calculating provincial taxes accurately, and adjusting stock numbers instantly."
      },
      {
        id: "part-11-omnichannel-fulfillment",
        partNumber: 11,
        title: "In-Store Pickup (BOPIS) & Order Fulfillment",
        status: "upcoming",
        description: "Helping store workers find, pack, and label online orders for customer pickup at the front counter."
      },
      {
        id: "part-12-immutable-ledger",
        partNumber: 12,
        title: "Permanent Activity History & Audit Logs",
        status: "upcoming",
        description: "Recording every single inventory adjustment into a permanent history log so managers can always see who moved what and when."
      }
    ],
    sections: [
      {
        id: "part-1-layered-architecture",
        partNumber: 1,
        badge: "Architecture Foundation",
        title: "1. The Blueprint: Organizing the Code into 3 Simple Layers",
        content: [
          "When building software that has to run on cash registers, warehouse barcode scanners, and manager tablets all at once, the easiest mistake to make is stuffing everything into one giant file. When database queries, screen logic, and store calculation rules are all mixed together, fixing a small bug in one place accidentally breaks something completely unrelated.",
          "To keep Radius clean and maintainable, I organized the backend into three clear layers, each with one straightforward job:",
          "• The Front Desk (HTTP Handlers in `internal/handler`): The handler's only job is greeting incoming requests from the mobile app or web browser. It checks that the user sent the right information (like a valid email or order number), hands the request to the business layer, and sends back a clear answer. Handlers never talk to the database directly.",
          "• The Brain (Business Services in `internal/service`): This is where the real store rules live. It decides things like: Does this customer have enough loyalty points? Can an employee with this role approve an inventory count? It coordinates between data storage and caching, but has no idea whether the request came from an iPhone, an Android scanner, or a desktop computer.",
          "• The Filing Cabinet (Repositories in `internal/repository`): This layer is solely responsible for saving and loading information from the database. It runs database queries and turns rows of raw data into clean objects the service can work with. It contains zero business rules.",
          "Because each layer only does its own job, if I ever decide to change the web framework or swap out a database, the core business rules do not have to change at all."
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
        id: "part-1-database-pgx",
        partNumber: "1.3",
        badge: "Data Layer",
        title: "1.3 Database Connections: Handling Rush Hours Without Crashing",
        content: [
          "While the code logic runs in Go, retail systems live and die by how well they handle busy hours. On a busy Saturday afternoon, dozens of employees are scanning inventory shelves at the exact same moment cashiers are ringing up customer orders at the registers.",
          "Instead of using the older `lib/pq` library, I chose the modern `pgx/v5` driver. I carefully tuned the connection pool settings in `internal/database/database.go` to keep the store snappy and reliable:",
          "• Limit open connections to 25 (`SetMaxOpenConns`): Prevents the database server from running out of memory when lots of people are using the app at once.",
          "• Keep 25 connections warm (`SetMaxIdleConns`): Keeps ready-to-use lines open so when a worker scans a barcode, the response is instant without waiting to establish a new connection from scratch.",
          "• Refresh connections every 5 minutes (`SetConnMaxLifetime`): Periodically closes and re-opens connections to cleanly handle cloud database restarts or brief network hiccups.",
          "I also built database migrations directly into the startup process. When running in development or testing, the server checks for any new database table updates and applies them automatically before opening up for requests:"
        ],
        image: {
          src: "/assets/images/radius-er-diagram.png",
          alt: "Radius PostgreSQL Entity-Relationship (ER) Diagram",
          caption: "Figure 1.1: Complete PostgreSQL Relational Schema: Multi-Store Partitioning, Products, Inventory, MIMS Sections, Cycle Audits & POS Transactions"
        },
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
        id: "part-1-context-propagation",
        partNumber: "1.4",
        badge: "Reliability",
        title: "1.4 Handling Dropped Wi-Fi and Canceling Unneeded Work",
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
        id: "part-2-real-time-websockets",
        partNumber: 2,
        badge: "Real-Time System",
        title: "2. Real-Time Operations: Building a Live Store Notification Hub",
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
        id: "part-2-concurrency",
        partNumber: "2.1",
        badge: "Concurrency",
        title: "2.1 Handling Slow Phones in Wi-Fi Dead Zones",
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
        id: "part-2-react-native",
        partNumber: "2.2",
        badge: "Mobile Frontend",
        title: "2.2 Mobile Reliability: Reconnecting Gracefully and Saving Battery",
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
        id: "roadmap-summary",
        badge: "Roadmap",
        title: "Looking Ahead: What Is Coming Next in the Radius Series",
        content: [
          "This covers the first step in building the core foundation of Radius.",
          "In the upcoming chapters, I will share how I built the rest of the system:",
          "• Part 3: Employee Logins, Device Tracking and Role Permissions: How I designed secure logins, tracked store terminal devices, and let managers log out any lost device with one tap.",
          "• Part 4: Managing Multiple Store Locations: How managers can switch between branches without having to log in and out repeatedly.",
          "• Part 5: Product Catalog and Fast Barcode Search: How I organize thousands of products and make barcode scanning feel instantaneous.",
          "• Part 6: Warehouse Inventory (MIMS) and Bin Coordinates: How I track stock across 11 different inventory states using 9-digit shelf locations.",
          "Stay tuned as I share more practical stories and lessons from building this platform!"
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
