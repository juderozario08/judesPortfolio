export interface ArchNode {
  id: string;
  name: string;
  subtitle: string;
  tier: 'client' | 'gateway' | 'handler' | 'service' | 'storage' | 'worker';
  tierNumber: number;
  tierName: string;
  tierColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
  role: string;
  badge: string;
  badgeColor: string;
  filePath: string;
  description: string;
  safeguard: string;
  inbound: string;
  outbound: string;
  tags: string[];
  metrics: string;
  codeSnippet: {
    language: string;
    code: string;
  };
  flowSteps?: Record<string, { stepNumber: number; action: string }>;
}

export interface ArchConnection {
  id: string;
  fromNode: string;
  toNode: string;
  label: string;
  protocol: string;
  type: 'https' | 'wss' | 'context' | 'contract' | 'sql' | 'cache' | 'event' | 'async';
  flows: string[];
  description: string;
  color: string;
}

export interface ArchFlow {
  id: string;
  name: string;
  description: string;
  color: string;
  badge: string;
  steps: {
    step: number;
    nodeId: string;
    title: string;
    action: string;
  }[];
}

export const SYSTEM_CANVAS_WIDTH = 2300;
export const SYSTEM_CANVAS_HEIGHT = 1520;

export const ARCH_FLOWS: ArchFlow[] = [
  {
    id: 'all',
    name: 'Full System Topology',
    description: 'All 24 tier components and 32 directional communication paths.',
    color: '#7aa2f7',
    badge: 'ALL',
    steps: [],
  },
  {
    id: 'bopis',
    name: 'BOPIS Order Fulfillment',
    description: 'Picking lock acquisition, physical barcode verify, staging, and real-time store broadcast.',
    color: '#bb9af7',
    badge: 'BOPIS',
    steps: [
      { step: 1, nodeId: 'client-mobile-floor', title: 'Claim & Pick', action: 'Associate locks order and scans shelf item barcodes' },
      { step: 2, nodeId: 'gateway-auth-jwt', title: 'Authorize Request', action: 'Validates JWT claims and verifies active session' },
      { step: 3, nodeId: 'handler-bopis', title: 'Route Picking DTO', action: 'Decodes pick-item JSON payload and invokes service contract' },
      { step: 4, nodeId: 'service-bopis', title: 'Enforce Pick Invariants', action: 'Pessimistic lock prevents race condition with other associates' },
      { step: 5, nodeId: 'storage-postgres', title: 'ACID State Commit', action: 'Transfers reserved stock to picked state in PostgreSQL' },
      { step: 6, nodeId: 'storage-ledger', title: 'Emit Audit Delta', action: 'Records immutable audit entry in inventory_transactions' },
      { step: 7, nodeId: 'service-ws-hub', title: 'Broadcast Event', action: 'Pumps ORDER_PICKED event to store-isolated WebSocket clients' },
    ],
  },
  {
    id: 'replenish',
    name: 'Shelf Restocking (IS4TC)',
    description: 'Empty hole optical scan, velocity merge with register sales, and serpentine walk sequence.',
    color: '#7dcfff',
    badge: 'RESTOCK',
    steps: [
      { step: 1, nodeId: 'client-mobile-floor', title: 'Empty Hole Scan', action: 'Store associate scans out-of-stock shelf facing' },
      { step: 2, nodeId: 'gateway-auth-jwt', title: 'Verify Employee', action: 'Inspects token claims and verifies sales floor permissions' },
      { step: 3, nodeId: 'handler-replenish', title: 'Ingest Scan DTO', action: 'Passes scan coordinate and store ID to replenishment engine' },
      { step: 4, nodeId: 'service-replenish', title: 'Merge Sales & Holes', action: 'Combines POS register velocity with empty hole scans' },
      { step: 5, nodeId: 'storage-redis', title: '24h Deduplication', action: 'Checks Redis is4tc_session key to prevent duplicate restocking picks' },
      { step: 6, nodeId: 'storage-postgres', title: 'Fetch MIMS Locations', action: 'Queries backroom pallet rack coordinates for restocking cart' },
    ],
  },
  {
    id: 'cycle',
    name: 'Weekly Cycle Counting',
    description: 'Pessimistic count lock, physical inventory audit, shift ownership transfer, and shrinkage calculation.',
    color: '#9ece6a',
    badge: 'CYCLE COUNT',
    steps: [
      { step: 1, nodeId: 'client-mobile-logistics', title: 'Start Count Sheet', action: 'Logistics clerk begins physical audit of assigned department' },
      { step: 2, nodeId: 'gateway-auth-jwt', title: 'Authenticate Clerk', action: 'Validates employee role and store boundaries' },
      { step: 3, nodeId: 'handler-cycle', title: 'Transport Dispatch', action: 'Dispatches count request to core domain engine' },
      { step: 4, nodeId: 'service-cycle', title: 'Acquire Row Lock', action: 'Locks count sheet row to prevent concurrent tampering' },
      { step: 5, nodeId: 'storage-postgres', title: 'Update Count Rows', action: 'Writes physical count vs perpetual system variance' },
      { step: 6, nodeId: 'storage-ledger', title: 'Write Shrinkage Delta', action: 'Writes immutable variance adjustment to ledger' },
      { step: 7, nodeId: 'service-ws-hub', title: 'Notify Supervisors', action: 'Broadcasts COUNT_LOCKED alert to department lead' },
    ],
  },
  {
    id: 'auth',
    name: 'Auth & Single Session',
    description: 'IP-aware conflict detection, takeover challenge prompt, and instant remote session revocation.',
    color: '#f7768e',
    badge: 'AUTH',
    steps: [
      { step: 1, nodeId: 'client-device-cache', title: 'Login Credentials', action: 'Transmits username, password, and device fingerprint' },
      { step: 2, nodeId: 'gateway-ratelimit', title: 'Rate Limit Check', action: 'Token bucket throttles brute force attempts per IP' },
      { step: 3, nodeId: 'handler-auth', title: 'Route Login DTO', action: 'Parses login payload and hands to AuthService' },
      { step: 4, nodeId: 'service-auth', title: 'Validate & Conflict Check', action: 'Checks bcrypt hash and queries Redis for active sessions' },
      { step: 5, nodeId: 'storage-redis', title: 'Session Invalidation', action: 'Stores new JWT session and revokes prior session ID' },
    ],
  },
];

export const ARCH_NODES: ArchNode[] = [
  // =====================================================================
  // TIER 1: CLIENT FRONTENDS
  // =====================================================================
  {
    id: 'client-mobile-floor',
    name: 'Sales Floor Terminal',
    subtitle: 'Expo SDK 54 • Barcode Camera',
    tier: 'client',
    tierNumber: 1,
    tierName: 'Client Frontend',
    tierColor: '#7aa2f7',
    x: 100,
    y: 100,
    width: 320,
    height: 165,
    role: 'Primary handheld scanner for sales floor associates. Manages IS4TC empty hole audits, BOPIS picking lock verification, and shelf price checks.',
    badge: 'EXPO 54',
    badgeColor: 'bg-tokyo-blue/20 text-tokyo-blue border-tokyo-blue/40',
    filePath: 'radius-mobile/app/(tabs)/index.tsx',
    description: 'Runs on Honeywell / Zebra enterprise Android scanners and iOS devices with camera auto-focus.',
    safeguard: 'Hardware barcode debouncing prevents accidental double scans; offline queue caches up to 50 scans during RF dead zones.',
    inbound: 'Store associate physical barcode triggers, camera viewport scans',
    outbound: 'POST /api/orders/:id/pick, POST /api/fill-reports/is4tc/scan',
    tags: ['expo-camera', 'expo-router', 'TypeScript', 'Offline Queue'],
    metrics: '< 150ms scan-to-UI feedback',
    codeSnippet: {
      language: 'typescript',
      code: `// radius-mobile/app/(tabs)/index.tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { apiClient } from '../../src/api/client';

export default function SalesFloorScanner() {
  const [permission, requestPermission] = useCameraPermissions();

  const handleBarcodeScanned = async ({ data: upc }: { data: string }) => {
    try {
      const res = await apiClient.post('/api/fill-reports/is4tc/scan', {
        upc: upc.trim(),
        scanned_at: new Date().toISOString()
      });
      // Instant auditory + haptic confirmation
    } catch (err) {
      // Offline fallback: write to SecureStore SQLite queue
    }
  };
  return <CameraView onBarcodeScanned={handleBarcodeScanned} />;
}`,
    },
    flowSteps: {
      bopis: { stepNumber: 1, action: 'Associate locks order and scans shelf item barcodes' },
      replenish: { stepNumber: 1, action: 'Associate scans empty shelf facing to register out-of-stock hole' },
    },
  },
  {
    id: 'client-mobile-logistics',
    name: 'Backroom Logistics Scanner',
    subtitle: 'Cycle Counts & Pallet Receiving',
    tier: 'client',
    tierNumber: 1,
    tierName: 'Client Frontend',
    tierColor: '#7aa2f7',
    x: 460,
    y: 100,
    width: 320,
    height: 165,
    role: 'High-throughput warehouse & backroom client for weekly cycle count audits, PO receiving, and 20-digit LPR pallet scans.',
    badge: 'LOGISTICS',
    badgeColor: 'bg-tokyo-cyan/20 text-tokyo-cyan border-tokyo-cyan/40',
    filePath: 'radius-mobile/app/cycle-counts.tsx',
    description: 'Optimized for high-contrast visibility and physical hardware keyboard/laser trigger integration.',
    safeguard: 'Acquires exclusive sheet ownership lock upon opening; enforces sequential bin walk ordering.',
    inbound: 'Physical scan wedge, manual recount entries',
    outbound: 'POST /api/cycle-counts/:id/scan, POST /api/receiving/lpr',
    tags: ['Cycle Count', 'PO Receiving', 'LPR Pallets'],
    metrics: 'Supports 1,200+ counts/hr per terminal',
    codeSnippet: {
      language: 'typescript',
      code: `// radius-mobile/app/cycle-counts.tsx
export async function submitCycleCountItem(sheetId: number, upc: string, countedQty: number) {
  return apiClient.post(\`/api/cycle-counts/\${sheetId}/record\`, {
    upc,
    physical_quantity: countedQty,
    device_timestamp: Date.now()
  });
}`,
    },
    flowSteps: {
      cycle: { stepNumber: 1, action: 'Clerk begins physical audit of assigned department bins' },
    },
  },
  {
    id: 'client-pos-desk',
    name: 'POS Terminal & Service Desk',
    subtitle: 'Multi-Tender Cash/Card/Gift',
    tier: 'client',
    tierNumber: 1,
    tierName: 'Client Frontend',
    tierColor: '#7aa2f7',
    x: 820,
    y: 100,
    width: 320,
    height: 165,
    role: 'Point of Sale register client with split-tender support (Cash, Debit, Credit, Gift Card), provincial tax calculation, and print shop order tracker.',
    badge: 'POS DESK',
    badgeColor: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/40',
    filePath: 'radius-mobile/app/pos.tsx',
    description: 'Ensures zero penny discrepancies between split tenders and the computed gross total.',
    safeguard: 'Strict transaction total validation; fails immediately if tender amounts do not exactly match order subtotal + provincial taxes.',
    inbound: 'Cashier tender selections, barcode gun inputs',
    outbound: 'POST /api/pos/transactions, GET /api/inventory/search',
    tags: ['Multi-Tender', 'Split Payment', 'Tax Engine'],
    metrics: 'Sub-cent rounding accuracy',
    codeSnippet: {
      language: 'typescript',
      code: `// radius-mobile/app/pos.tsx
export async function checkoutPOSTransaction(cart: CartItem[], tenders: PaymentTender[]) {
  const payload = {
    cart_items: cart,
    tenders: tenders,
    store_id: getCurrentStoreId()
  };
  return apiClient.post('/api/pos/transactions', payload);
}`,
    },
    flowSteps: {},
  },
  {
    id: 'client-device-cache',
    name: 'Device State & WS Client',
    subtitle: 'expo-secure-store & useWebSocket',
    tier: 'client',
    tierNumber: 1,
    tierName: 'Client Frontend',
    tierColor: '#7aa2f7',
    x: 1180,
    y: 100,
    width: 320,
    height: 165,
    role: 'Hardware state engine managing JWT token storage in OS keychain, AppState foreground/background listeners, and auto-reconnect backoff.',
    badge: 'LIFECYCLE',
    badgeColor: 'bg-tokyo-purple/20 text-tokyo-purple border-tokyo-purple/40',
    filePath: 'radius-mobile/src/hooks/useWebSocket.ts',
    description: 'Maintains long-lived WebSocket connections to receive instant store-wide inventory updates.',
    safeguard: 'Pauses heartbeat pings during app backgrounding to conserve battery; resumes with exponential backoff on foreground.',
    inbound: 'OS AppState change events (active / background / inactive)',
    outbound: 'WSS Duplex Stream to /ws',
    tags: ['AppState', 'expo-secure-store', 'WSS Reconnect'],
    metrics: '99.9% reconnection reliability',
    codeSnippet: {
      language: 'typescript',
      code: `// radius-mobile/src/hooks/useWebSocket.ts
export function useWebSocket(url: string, storeId: number) {
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      if (nextState === 'active') reconnectWithBackoff();
      else wsRef.current?.close();
    });
    return () => sub.remove();
  }, [storeId]);
}`,
    },
    flowSteps: {
      auth: { stepNumber: 1, action: 'Transmits credentials & device fingerprint, persists returned JWT in keychain' },
    },
  },

  // =====================================================================
  // TIER 2: API GATEWAY & INGRESS
  // =====================================================================
  {
    id: 'gateway-ratelimit',
    name: 'Rate Limiter & Ingress',
    subtitle: 'IP Token Bucket & CORS',
    tier: 'gateway',
    tierNumber: 2,
    tierName: 'API Gateway & Security',
    tierColor: '#bb9af7',
    x: 180,
    y: 370,
    width: 300,
    height: 145,
    role: 'First line of network defense. Enforces per-IP token bucket limits (100 req/sec burst) and CORS whitelist headers before request parsing.',
    badge: 'MIDDLEWARE',
    badgeColor: 'bg-tokyo-purple/20 text-tokyo-purple border-tokyo-purple/40',
    filePath: 'radius-backend/internal/middleware/rate_limit.go',
    description: 'Guards against runaway client retry storms, camera scan spam, and unauthorized cross-origin requests.',
    safeguard: 'Excess requests immediately rejected with HTTP 429 Too Many Requests and Retry-After header.',
    inbound: 'External HTTPS requests on port 8080',
    outbound: 'Downstream Gin middleware chain',
    tags: ['Token Bucket', 'CORS', 'IP Guard'],
    metrics: 'Rate limit evaluated in < 15µs',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/middleware/rate_limit.go
func RateLimitMiddleware(limit int, burst int) gin.HandlerFunc {
	limiter := rate.NewLimiter(rate.Limit(limit), burst)
	return func(c *gin.Context) {
		if !limiter.Allow() {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{"error": "rate limit exceeded"})
			return
		}
		c.Next()
	}
}`,
    },
    flowSteps: {
      auth: { stepNumber: 2, action: 'Enforces rate limit to guard against brute force credential stuffing' },
    },
  },
  {
    id: 'gateway-auth-jwt',
    name: 'JWT Auth & Session Guard',
    subtitle: 'Role Claims & Revocation Blacklist',
    tier: 'gateway',
    tierNumber: 2,
    tierName: 'API Gateway & Security',
    tierColor: '#bb9af7',
    x: 520,
    y: 370,
    width: 320,
    height: 145,
    role: 'Extracts and cryptographically verifies Bearer JWTs, checks Redis revocation blacklist, and injects store_id/user_id into request context.',
    badge: 'SECURITY',
    badgeColor: 'bg-tokyo-purple/20 text-tokyo-purple border-tokyo-purple/40',
    filePath: 'radius-backend/internal/middleware/auth.go',
    description: 'Enforces single active session per employee; prevents stale or hijacked tokens from executing store operations.',
    safeguard: 'Instant remote session kill: if another terminal logs in, the previous token is blacklisted in Redis within 1 millisecond.',
    inbound: 'Authorized HTTPS requests',
    outbound: 'Redis session check, Gin context injection',
    tags: ['JWT Claims', 'RBAC', 'Redis Blacklist'],
    metrics: 'Signature verification in < 45µs',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/middleware/auth.go
func AuthMiddleware(secret []byte, redisClient *redis.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		tokenStr := extractBearerToken(c)
		claims, err := parseJWT(tokenStr, secret)
		if err != nil || redisClient.Get(c, "blacklist:"+claims.SessionID).Val() != "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "session invalidated"})
			return
		}
		c.Set("store_id", claims.StoreID)
		c.Set("user_id", claims.UserID)
		c.Next()
	}
}`,
    },
    flowSteps: {
      bopis: { stepNumber: 2, action: 'Validates picker credentials & binds store context' },
      replenish: { stepNumber: 2, action: 'Verifies sales floor permissions for inventory adjustments' },
      cycle: { stepNumber: 2, action: 'Verifies warehouse auditor role' },
    },
  },
  {
    id: 'gateway-context',
    name: 'Context & Timeout Guardian',
    subtitle: 'Transaction Cancellation Safety',
    tier: 'gateway',
    tierNumber: 2,
    tierName: 'API Gateway & Security',
    tierColor: '#bb9af7',
    x: 880,
    y: 370,
    width: 300,
    height: 145,
    role: 'Attaches 5-second deadline context to all incoming HTTP transactions and propagates cancellation down through repository calls.',
    badge: 'TIMEOUT',
    badgeColor: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/40',
    filePath: 'radius-backend/internal/middleware/context.go',
    description: 'Prevents orphan database connections and locked rows when mobile handhelds disconnect mid-request.',
    safeguard: 'If a client drops connection, context.Done() signals pgx to immediately roll back pending SQL transactions.',
    inbound: 'Incoming HTTP requests',
    outbound: 'HTTP Handlers (Tier 3) with bound context.Context',
    tags: ['context.WithTimeout', 'Deadlock Protection', 'Graceful Cancel'],
    metrics: '5.00s strict timeout deadline',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/middleware/context.go
func ContextTimeoutMiddleware(timeout time.Duration) gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)
		defer cancel()
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}`,
    },
    flowSteps: {},
  },
  {
    id: 'gateway-ws-upgrader',
    name: 'WebSocket Upgrader',
    subtitle: 'TCP Handshake & Origin Check',
    tier: 'gateway',
    tierNumber: 2,
    tierName: 'API Gateway & Security',
    tierColor: '#bb9af7',
    x: 1220,
    y: 370,
    width: 300,
    height: 145,
    role: 'Handles HTTP 101 Switching Protocols. Validates client origins and upgrades incoming connections to full-duplex TCP WebSockets.',
    badge: 'WSS UPGRADE',
    badgeColor: 'bg-tokyo-cyan/20 text-tokyo-cyan border-tokyo-cyan/40',
    filePath: 'radius-backend/internal/handler/websocket_handler.go',
    description: 'Binds authenticated store ID and user session to long-lived Gorilla WebSocket connection.',
    safeguard: 'Strict origin policy; buffers 256 messages per client channel before dropping unresponsive connections.',
    inbound: 'GET /ws?token=... HTTP Upgrade requests',
    outbound: 'WebSocket Event Handler & Broadcast Hub (Tier 4)',
    tags: ['gorilla/websocket', 'Duplex TCP', 'Buffer Management'],
    metrics: 'Upgrades connection in < 2ms',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/handler/websocket_handler.go
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true // Configured with store CORS policy
	},
}`,
    },
    flowSteps: {},
  },

  // =====================================================================
  // TIER 3: TRANSPORT & HTTP HANDLERS
  // =====================================================================
  {
    id: 'handler-auth',
    name: 'Auth & Session Handler',
    subtitle: '/api/auth/login & /terminate',
    tier: 'handler',
    tierNumber: 3,
    tierName: 'HTTP Handlers',
    tierColor: '#7dcfff',
    x: 80,
    y: 620,
    width: 290,
    height: 155,
    role: 'Receives and validates JSON login DTOs, parses device fingerprints, and forwards requests to core AuthService.',
    badge: 'AUTH DTO',
    badgeColor: 'bg-tokyo-blue/20 text-tokyo-blue border-tokyo-blue/40',
    filePath: 'radius-backend/internal/handler/auth_handler.go',
    description: 'Provides /api/auth/login, /api/auth/refresh, and /api/auth/terminate-sessions endpoints.',
    safeguard: 'Gin ShouldBindJSON rejects malformed schemas before hitting domain logic.',
    inbound: 'POST /api/auth/*',
    outbound: 'AuthService.Login(ctx, req)',
    tags: ['Gin Handler', 'DTO Validation', 'JSON Binding'],
    metrics: '< 1ms validation latency',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/handler/auth_handler.go
func (h *AuthHandler) Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	resp, err := h.authService.Login(c.Request.Context(), req)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, resp)
}`,
    },
    flowSteps: {
      auth: { stepNumber: 3, action: 'Decodes login request and invokes AuthService' },
    },
  },
  {
    id: 'handler-bopis',
    name: 'Online Order Handler',
    subtitle: '/api/orders/:id/pick & /ready',
    tier: 'handler',
    tierNumber: 3,
    tierName: 'HTTP Handlers',
    tierColor: '#7dcfff',
    x: 400,
    y: 620,
    width: 290,
    height: 155,
    role: 'Manages BOPIS order picking assignment, barcode verification, and pickup staging endpoints.',
    badge: 'BOPIS DTO',
    badgeColor: 'bg-tokyo-purple/20 text-tokyo-purple border-tokyo-purple/40',
    filePath: 'radius-backend/internal/handler/online_order_handler.go',
    description: 'Exposes /api/orders/assign, /api/orders/:id/pick-item, and /api/orders/:id/complete.',
    safeguard: 'Validates line-item state transitions; forbids marking an item picked without verified barcode match.',
    inbound: 'POST /api/orders/:id/*',
    outbound: 'OnlineOrderService.PickItem(ctx, ...)',
    tags: ['BOPIS', 'Order Picking', 'Scan Verification'],
    metrics: '< 12ms handler execution',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/handler/online_order_handler.go
func (h *OnlineOrderHandler) PickItem(c *gin.Context) {
	orderID, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var req PickItemDTO
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid barcode payload"})
		return
	}
	res, err := h.orderService.PickItem(c.Request.Context(), orderID, req)
	c.JSON(http.StatusOK, res)
}`,
    },
    flowSteps: {
      bopis: { stepNumber: 3, action: 'Parses pick-item payload and calls OnlineOrderService' },
    },
  },
  {
    id: 'handler-cycle',
    name: 'Cycle Count Handler',
    subtitle: '/api/cycle-counts/:id/scan',
    tier: 'handler',
    tierNumber: 3,
    tierName: 'HTTP Handlers',
    tierColor: '#7dcfff',
    x: 720,
    y: 620,
    width: 290,
    height: 155,
    role: 'Handles physical count sheet generation, item recount submission, and shift ownership handover.',
    badge: 'COUNT DTO',
    badgeColor: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/40',
    filePath: 'radius-backend/internal/handler/cycle_count_handler.go',
    description: 'Endpoints for starting count sheets, recording bin quantities, and finalizing supervisor sign-offs.',
    safeguard: 'Prevents recording counts on sheets already in LOCKED or COMPLETED status.',
    inbound: 'POST /api/cycle-counts/*',
    outbound: 'CycleCountService.RecordCount(ctx, ...)',
    tags: ['Cycle Count', 'Recount Check', 'Variance Calc'],
    metrics: 'Supports concurrent auditor submissions',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/handler/cycle_count_handler.go
func (h *CycleCountHandler) RecordCount(c *gin.Context) {
	sheetID, _ := strconv.ParseInt(c.Param("id"), 10, 64)
	var req RecordCountDTO
	_ = c.ShouldBindJSON(&req)
	err := h.cycleService.RecordCount(c.Request.Context(), sheetID, req)
	c.JSON(http.StatusOK, gin.H{"status": "recorded"})
}`,
    },
    flowSteps: {
      cycle: { stepNumber: 3, action: 'Receives item count record and invokes CycleCountService' },
    },
  },
  {
    id: 'handler-replenish',
    name: 'Shelf Restock Handler',
    subtitle: '/api/fill-reports/is4tc',
    tier: 'handler',
    tierNumber: 3,
    tierName: 'HTTP Handlers',
    tierColor: '#7dcfff',
    x: 1040,
    y: 620,
    width: 290,
    height: 155,
    role: 'Ingests IS4TC empty shelf scans and delivers optimized serpentine restock walk lists to mobile terminals.',
    badge: 'FILL DTO',
    badgeColor: 'bg-tokyo-cyan/20 text-tokyo-cyan border-tokyo-cyan/40',
    filePath: 'radius-backend/internal/handler/fill_report_handler.go',
    description: 'Aggregates point-of-sale sales volume with empty hole scans into actionable restocking carts.',
    safeguard: 'Deduplicates multiple empty hole scans on the same shelf location within 24 hours.',
    inbound: 'POST /api/fill-reports/is4tc/scan',
    outbound: 'FillReportService.IngestScan(ctx, ...)',
    tags: ['IS4TC', 'Fill Report', 'Serpentine Walk'],
    metrics: 'Walk lists sorted in < 35ms',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/handler/fill_report_handler.go
func (h *FillReportHandler) IngestEmptyHole(c *gin.Context) {
	var req EmptyHoleScanDTO
	_ = c.ShouldBindJSON(&req)
	storeID := c.GetInt64("store_id")
	err := h.fillService.RecordEmptyHole(c.Request.Context(), storeID, req.UPC)
	c.JSON(http.StatusOK, gin.H{"recorded": true})
}`,
    },
    flowSteps: {
      replenish: { stepNumber: 3, action: 'Ingests scan and routes to FillReportService' },
    },
  },
  {
    id: 'handler-pos',
    name: 'POS Transaction Handler',
    subtitle: '/api/pos/transactions',
    tier: 'handler',
    tierNumber: 3,
    tierName: 'HTTP Handlers',
    tierColor: '#7dcfff',
    x: 1360,
    y: 620,
    width: 290,
    height: 155,
    role: 'Handles retail checkout transactions, payment tender breakdown verification, and tax calculations.',
    badge: 'POS DTO',
    badgeColor: 'bg-amber-400/20 text-amber-400 border-amber-400/40',
    filePath: 'radius-backend/internal/handler/transaction_handler.go',
    description: 'Exposes /api/pos/transactions, /api/pos/returns, and /api/pos/tax-calculate endpoints.',
    safeguard: 'Verifies tender sum matches invoice grand total to the exact cent; rejects incomplete payment splits.',
    inbound: 'POST /api/pos/transactions',
    outbound: 'TransactionService.ProcessTransaction(ctx, ...)',
    tags: ['POS', 'Split Tender', 'Tax Engine'],
    metrics: '< 20ms end-to-end checkout commit',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/handler/transaction_handler.go
func (h *TransactionHandler) ProcessSale(c *gin.Context) {
	var txDTO CreateTransactionDTO
	if err := c.ShouldBindJSON(&txDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "malformed sale request"})
		return
	}
	resp, err := h.txService.CreateTransaction(c.Request.Context(), txDTO)
	c.JSON(http.StatusCreated, resp)
}`,
    },
    flowSteps: {},
  },
  {
    id: 'handler-ws',
    name: 'WebSocket Event Pump',
    subtitle: '/ws Client Read/Write Pumps',
    tier: 'handler',
    tierNumber: 3,
    tierName: 'HTTP Handlers',
    tierColor: '#7dcfff',
    x: 1680,
    y: 620,
    width: 290,
    height: 155,
    role: 'Maintains long-lived TCP connection pumps for each active store scanner. Reads client heartbeats and writes outbound event JSON.',
    badge: 'WS PUMP',
    badgeColor: 'bg-tokyo-purple/20 text-tokyo-purple border-tokyo-purple/40',
    filePath: 'radius-backend/internal/handler/ws_handler.go',
    description: 'Registers client connection with real-time broadcast hub upon successful handshake.',
    safeguard: 'Dedicated read/write goroutines per client; non-blocking send channel drops unresponsive connections after 5s.',
    inbound: 'GET /ws (Upgraded connection)',
    outbound: 'WebSocketHub.RegisterClient(client)',
    tags: ['Goroutine Pump', 'Non-blocking select', 'Heartbeat Ping'],
    metrics: '0 allocations per event broadcast',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/handler/ws_handler.go
func (h *WSHandler) ServeWS(c *gin.Context) {
	conn, _ := upgrader.Upgrade(c.Writer, c.Request, nil)
	client := &Client{
		Hub:     h.hub,
		Conn:    conn,
		Send:    make(chan []byte, 256),
		StoreID: c.GetInt64("store_id"),
	}
	h.hub.Register <- client
	go client.writePump()
	go client.readPump()
}`,
    },
    flowSteps: {},
  },

  // =====================================================================
  // TIER 4: CORE DOMAIN BUSINESS SERVICES
  // =====================================================================
  {
    id: 'service-auth',
    name: 'Auth & Session Engine',
    subtitle: 'Session Conflicts & Takeover',
    tier: 'service',
    tierNumber: 4,
    tierName: 'Domain Services',
    tierColor: '#9ece6a',
    x: 80,
    y: 900,
    width: 290,
    height: 165,
    role: 'Zero SQL business service implementing single-session guarantees, password hash verification, and session takeover arbitration.',
    badge: 'AUTH CORE',
    badgeColor: 'bg-tokyo-blue/20 text-tokyo-blue border-tokyo-blue/40',
    filePath: 'radius-backend/internal/service/auth_service.go',
    description: 'Decoupled from transport and persistence layers via Go interfaces.',
    safeguard: 'If a user logs into Terminal B while Terminal A is active, emits TAKEOVER_PROMPT and revokes Terminal A in Redis.',
    inbound: 'AuthHandler',
    outbound: 'UserRepository, RedisSessionClient',
    tags: ['Bcrypt', 'Single Session', 'Session Takeover'],
    metrics: '< 8ms auth resolution',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/service/auth_service.go
func (s *AuthService) Login(ctx context.Context, req LoginRequest) (*AuthResponse, error) {
	user, err := s.userRepo.FindByEmail(ctx, req.Email)
	if err != nil || !checkPassword(user.PasswordHash, req.Password) {
		return nil, ErrInvalidCredentials
	}
	// Invalidate prior session for single-session guarantee
	_ = s.sessionCache.RevokeUserSessions(ctx, user.ID)
	token, _ := generateJWT(user)
	return &AuthResponse{Token: token, User: user}, nil
}`,
    },
    flowSteps: {
      auth: { stepNumber: 4, action: 'Validates credentials and revokes previous session in Redis' },
    },
  },
  {
    id: 'service-bopis',
    name: 'BOPIS Order Engine',
    subtitle: 'Exclusive Picking Locks & Pick Log',
    tier: 'service',
    tierNumber: 4,
    tierName: 'Domain Services',
    tierColor: '#9ece6a',
    x: 400,
    y: 900,
    width: 290,
    height: 165,
    role: 'Orchestrates omnichannel fulfillment lifecycle: order assignment mutual exclusion, item-by-item barcode verification, and pickup staging.',
    badge: 'BOPIS CORE',
    badgeColor: 'bg-tokyo-purple/20 text-tokyo-purple border-tokyo-purple/40',
    filePath: 'radius-backend/internal/service/online_order_service.go',
    description: 'Enforces business rules ensuring items are picked only once and inventory buckets are updated atomically.',
    safeguard: 'Pessimistic lock on online_orders row prevents two associates from picking the same order simultaneously.',
    inbound: 'OnlineOrderHandler',
    outbound: 'OrderRepo, InventoryRepo, WebSocketHub',
    tags: ['Mutual Exclusion', 'Pick Auditing', 'State Machine'],
    metrics: 'Guaranteed single-picker assignment',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/service/online_order_service.go
func (s *OnlineOrderService) PickItem(ctx context.Context, orderID int64, dto PickItemDTO) error {
	tx, _ := s.db.Begin(ctx)
	defer tx.Rollback(ctx)

	// Acquire lock and verify barcode
	if err := s.orderRepo.LockOrder(ctx, tx, orderID); err != nil {
		return ErrOrderAlreadyClaimed
	}
	_ = s.orderRepo.UpdateItemStatus(ctx, tx, dto.ItemID, "PICKED")
	_ = s.invRepo.MoveToBOPISStaging(ctx, tx, dto.ProductID, dto.Quantity)
	return tx.Commit(ctx)
}`,
    },
    flowSteps: {
      bopis: { stepNumber: 4, action: 'Acquires picking lock, verifies barcode, moves stock to BOPIS staging' },
    },
  },
  {
    id: 'service-cycle',
    name: 'Cycle Count Engine',
    subtitle: 'Pessimistic DB Locks & Shrinkage',
    tier: 'service',
    tierNumber: 4,
    tierName: 'Domain Services',
    tierColor: '#9ece6a',
    x: 720,
    y: 900,
    width: 290,
    height: 165,
    role: 'Calculates physical vs perpetual inventory variances, enforces shift ownership transfers, and computes department shrinkage dollars.',
    badge: 'AUDIT CORE',
    badgeColor: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/40',
    filePath: 'radius-backend/internal/service/cycle_count_service.go',
    description: 'Applies accounting rules for inventory reconciliation across retail departments.',
    safeguard: 'Enforces exclusive lock on count sheet rows during audit; records delta into immutable inventory ledger.',
    inbound: 'CycleCountHandler',
    outbound: 'CycleCountRepo, InventoryLedgerRepo, WebSocketHub',
    tags: ['Variance Analysis', 'Shrinkage Calc', 'Audit Locking'],
    metrics: 'Instant variance calculation',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/service/cycle_count_service.go
func (s *CycleCountService) RecordCount(ctx context.Context, sheetID int64, dto RecordCountDTO) error {
	expected, _ := s.invRepo.GetQuantity(ctx, dto.ProductID)
	variance := dto.CountedQty - expected
	return s.countRepo.InsertVariance(ctx, sheetID, dto.ProductID, variance)
}`,
    },
    flowSteps: {
      cycle: { stepNumber: 4, action: 'Computes variance between counted and expected inventory' },
    },
  },
  {
    id: 'service-replenish',
    name: 'Fill Report Engine',
    subtitle: 'POS Sales + Empty Holes Merging',
    tier: 'service',
    tierNumber: 4,
    tierName: 'Domain Services',
    tierColor: '#9ece6a',
    x: 1040,
    y: 900,
    width: 290,
    height: 165,
    role: 'Combines real-time POS sales velocity with IS4TC empty shelf scans, sorting picks by aisle-bay-shelf coordinates for optimal warehouse cart walks.',
    badge: 'FILL CORE',
    badgeColor: 'bg-tokyo-cyan/20 text-tokyo-cyan border-tokyo-cyan/40',
    filePath: 'radius-backend/internal/service/fill_report_service.go',
    description: 'Implements traveling salesperson serpentine route optimization across retail floor aisles.',
    safeguard: 'Deduplicates scan events in Redis; skips items already scheduled on active pick carts.',
    inbound: 'FillReportHandler',
    outbound: 'RedisCache, InventoryRepo, MIMSLocationRepo',
    tags: ['Serpentine Sort', 'Velocity Merge', 'MIMS Bins'],
    metrics: 'Reduces associate walking distance by ~38%',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/service/fill_report_service.go
func (s *FillReportService) GenerateRestockList(ctx context.Context, storeID int64) ([]RestockItem, error) {
	salesItems, _ := s.txRepo.GetHighVelocityItems(ctx, storeID)
	emptyHoles, _ := s.cache.GetEmptyHoles(ctx, storeID)
	merged := mergeAndDeduplicate(salesItems, emptyHoles)
	return sortAisleSerpentine(merged), nil
}`,
    },
    flowSteps: {
      replenish: { stepNumber: 4, action: 'Merges empty holes with sales velocity and sorts by shelf coordinates' },
    },
  },
  {
    id: 'service-pos',
    name: 'POS Transaction Engine',
    subtitle: 'Split-Tender & Tax Calculation',
    tier: 'service',
    tierNumber: 4,
    tierName: 'Domain Services',
    tierColor: '#9ece6a',
    x: 1360,
    y: 900,
    width: 290,
    height: 165,
    role: 'Validates payment tender combinations (Cash, Card, Gift Card), computes Canadian provincial taxes (ON 13% HST, BC 12%), and adjusts sellable stock.',
    badge: 'TAX & LEDGER',
    badgeColor: 'bg-amber-400/20 text-amber-400 border-amber-400/40',
    filePath: 'radius-backend/internal/service/transaction_service.go',
    description: 'Dispatches immutable transaction ledger rows and updates sub-inventory counts.',
    safeguard: 'Double-entry ledger integrity: total debits must exactly equal credits before database commit.',
    inbound: 'TransactionHandler',
    outbound: 'TransactionRepo, InventoryRepo, LedgerRepo',
    tags: ['Provincial Tax', 'Double-Entry', 'Atomic Checkout'],
    metrics: 'Tested across 50,000+ synthetic transactions',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/service/transaction_service.go
func (s *TransactionService) CreateTransaction(ctx context.Context, dto CreateTransactionDTO) (*Transaction, error) {
	tax := calculateProvincialTax(dto.Province, dto.Subtotal)
	if sumTenders(dto.Tenders) != dto.Subtotal + tax {
		return nil, ErrTenderMismatch
	}
	return s.txRepo.ExecuteCheckout(ctx, dto, tax)
}`,
    },
    flowSteps: {},
  },
  {
    id: 'service-ws-hub',
    name: 'Gorilla Real-Time Hub',
    subtitle: 'Store-Isolated Goroutine Broadcast',
    tier: 'service',
    tierNumber: 4,
    tierName: 'Domain Services',
    tierColor: '#9ece6a',
    x: 1680,
    y: 900,
    width: 290,
    height: 165,
    role: 'Central event broker maintaining isolated client connection pools per store: map[store_id]map[*Client]bool.',
    badge: 'HUB CORE',
    badgeColor: 'bg-orange-400/20 text-orange-400 border-orange-400/40',
    filePath: 'radius-backend/internal/service/websocket_hub.go',
    description: 'Dispatches real-time inventory events (ORDER_PICKED, COUNT_LOCKED) only to terminals within that store.',
    safeguard: 'Non-blocking channel select drops unresponsive clients in warehouse dead-zones without blocking broadcast loop.',
    inbound: 'Domain Services emitting events',
    outbound: 'WebSocket Client write channels (Tier 1)',
    tags: ['Store Rooms', 'Non-blocking select', 'Channel Hub'],
    metrics: 'Sub-millisecond store-wide broadcast',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/service/websocket_hub.go
func (h *Hub) BroadcastToStore(storeID int64, event []byte) {
	h.mu.RLock()
	defer h.mu.RUnlock()
	for client := range h.storeClients[storeID] {
		select {
		case client.Send <- event:
		default:
			close(client.Send)
			delete(h.storeClients[storeID], client)
		}
	}
}`,
    },
    flowSteps: {
      bopis: { stepNumber: 7, action: 'Broadcasts ORDER_PICKED to all handheld scanners in that store' },
      cycle: { stepNumber: 7, action: 'Broadcasts COUNT_LOCKED alert to department supervisors' },
    },
  },

  // =====================================================================
  // TIER 5: REAL-TIME WORKERS & STORAGE INFRASTRUCTURE
  // =====================================================================
  {
    id: 'storage-redis',
    name: 'Redis In-Memory Engine',
    subtitle: 'Sessions, Blacklist, 24h IS4TC Cache',
    tier: 'storage',
    tierNumber: 5,
    tierName: 'Persistence & Cache',
    tierColor: '#f7768e',
    x: 120,
    y: 1200,
    width: 420,
    height: 175,
    role: 'Sub-millisecond in-memory data store managing active employee JWT sessions, remote session revocation blacklist, and 24-hour empty hole deduplication.',
    badge: 'IN-MEMORY',
    badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40',
    filePath: 'radius-backend/internal/cache/redis_client.go',
    description: 'Keys include session:<id>, blacklist:<session_id>, and is4tc_session:<store_id>:<upc>.',
    safeguard: 'Configured with automatic TTL expiration; volatile keys drop cleanly without exhausting RAM.',
    inbound: 'AuthService, Ingress Middleware, FillReportService',
    outbound: 'In-memory fast retrieval',
    tags: ['Redis 7', 'Sub-millisecond', 'TTL Keys', 'Pub/Sub'],
    metrics: '< 250µs response time',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/cache/redis_client.go
func (c *RedisClient) RevokeSession(ctx context.Context, sessionID string, ttl time.Duration) error {
	return c.client.Set(ctx, "blacklist:"+sessionID, "revoked", ttl).Err()
}

func (c *RedisClient) RecordEmptyHole(ctx context.Context, storeID int64, upc string) (bool, error) {
	key := fmt.Sprintf("is4tc:%d:%s", storeID, upc)
	return c.client.SetNX(ctx, key, 1, 24*time.Hour).Result()
}`,
    },
    flowSteps: {
      auth: { stepNumber: 5, action: 'Persists active session record with TTL' },
      replenish: { stepNumber: 5, action: 'Sets 24h deduplication key to prevent duplicate restocking' },
    },
  },
  {
    id: 'storage-postgres',
    name: 'PostgreSQL 16 Primary DB',
    subtitle: 'pgx/v5 Pool (25 Conns) • 40 Migrations',
    tier: 'storage',
    tierNumber: 5,
    tierName: 'Persistence & Cache',
    tierColor: '#7aa2f7',
    x: 580,
    y: 1200,
    width: 480,
    height: 175,
    role: 'Primary relational ACID database engine managing 32 relational tables, 11 sub-inventory quantity buckets, and 40 versioned up/down migrations.',
    badge: 'POSTGRES 16',
    badgeColor: 'bg-tokyo-blue/20 text-tokyo-blue border-tokyo-blue/40',
    filePath: 'radius-backend/internal/repository/db.go',
    description: 'Handles high-concurrency inventory locks via pgx/v5 connection pool with 25 max open connections.',
    safeguard: 'Pessimistic SELECT ... FOR UPDATE prevents race conditions during simultaneous BOPIS order claims.',
    inbound: 'All Domain Repositories via pgx/v5',
    outbound: 'ACID transaction commits',
    tags: ['PostgreSQL 16', 'jackc/pgx/v5', 'Pessimistic Lock', '40 Migrations'],
    metrics: '70,000+ synthetic inventory test scale',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/repository/db.go
func InitDBPool(connStr string) (*pgxpool.Pool, error) {
	config, _ := pgxpool.ParseConfig(connStr)
	config.MaxConns = 25
	config.MinConns = 5
	config.MaxConnLifetime = 30 * time.Minute
	config.HealthCheckPeriod = 1 * time.Minute
	return pgxpool.NewWithConfig(context.Background(), config)
}`,
    },
    flowSteps: {
      bopis: { stepNumber: 5, action: 'Executes atomic transaction updating order status to READY_FOR_PICKUP' },
      cycle: { stepNumber: 5, action: 'Updates physical counts and acquires count sheet row locks' },
    },
  },
  {
    id: 'storage-ledger',
    name: 'Immutable Inventory Ledger',
    subtitle: 'Append-Only inventory_transactions',
    tier: 'storage',
    tierNumber: 5,
    tierName: 'Persistence & Cache',
    tierColor: '#9ece6a',
    x: 1100,
    y: 1200,
    width: 440,
    height: 175,
    role: 'Tamper-evident audit ledger recording every quantity delta across sellable stock, BOPIS holds, cycle count variances, and returns.',
    badge: 'LEDGER',
    badgeColor: 'bg-emerald-400/20 text-emerald-400 border-emerald-400/40',
    filePath: 'radius-backend/internal/repository/inventory_transaction_repo.go',
    description: 'Provides complete forensic traceability for inventory shrinkage and store audits.',
    safeguard: 'Strictly append-only: UPDATE and DELETE operations are forbidden on the inventory_transactions table.',
    inbound: 'BOPIS Service, POS Service, Cycle Count Service',
    outbound: 'Audit query aggregations',
    tags: ['Audit Ledger', 'Append-Only', 'Forensics', 'Zero Tampering'],
    metrics: 'Zero data deletion tolerance',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/repository/inventory_transaction_repo.go
func (r *LedgerRepo) RecordDelta(ctx context.Context, tx pgx.Tx, delta LedgerEntry) error {
	const q = \`INSERT INTO inventory_transactions
		(product_id, store_id, delta_qty, bucket, reason_code, user_id, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, NOW())\`
	_, err := tx.Exec(ctx, q, delta.ProductID, delta.StoreID, delta.Qty, delta.Bucket, delta.Reason, delta.UserID)
	return err
}`,
    },
    flowSteps: {
      bopis: { stepNumber: 6, action: 'Records append-only inventory allocation delta for BOPIS hold' },
      cycle: { stepNumber: 6, action: 'Records physical count shrinkage adjustment entry' },
    },
  },
  {
    id: 'worker-autocancel',
    name: 'BOPIS Auto-Cancel Worker',
    subtitle: 'time.Ticker Sweep & Stock Release',
    tier: 'worker',
    tierNumber: 5,
    tierName: 'Real-Time Workers',
    tierColor: '#ff9e64',
    x: 1580,
    y: 1200,
    width: 400,
    height: 175,
    role: 'Periodic background goroutine running on a 1-hour time.Ticker sweep. Detects abandoned customer holds (> 5 days) and releases reserved stock.',
    badge: 'BACKGROUND WORKER',
    badgeColor: 'bg-orange-400/20 text-orange-400 border-orange-400/40',
    filePath: 'radius-backend/internal/worker/bopis_worker.go',
    description: 'Restores locked bopis_qty back to sellable new_qty without human intervention.',
    safeguard: 'Runs within atomic transaction with SKIP LOCKED to avoid contending with live customer pick-ups.',
    inbound: 'Go runtime time.Ticker interval',
    outbound: 'PostgreSQL DB, Inventory Ledger',
    tags: ['time.Ticker', 'Goroutine Worker', 'Auto-Release', 'SKIP LOCKED'],
    metrics: 'Executes hourly in < 100ms',
    codeSnippet: {
      language: 'go',
      code: `// radius-backend/internal/worker/bopis_worker.go
func StartBOPISAutoCancelWorker(ctx context.Context, svc *OnlineOrderService) {
	ticker := time.NewTicker(1 * time.Hour)
	go func() {
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				_ = svc.CancelExpiredOrders(ctx, 5*24*time.Hour)
			}
		}
	}()
}`,
    },
    flowSteps: {},
  },
];

export const ARCH_CONNECTIONS: ArchConnection[] = [
  // Tier 1 -> Tier 2
  {
    id: 'conn-floor-to-gateway',
    fromNode: 'client-mobile-floor',
    toNode: 'gateway-ratelimit',
    label: 'HTTPS REST (TLS 1.3)',
    protocol: 'HTTPS',
    type: 'https',
    flows: ['all', 'bopis', 'replenish'],
    color: '#7aa2f7',
    description: 'Floor scanner dispatches barcode scans and pick updates over HTTPS with JSON payloads.',
  },
  {
    id: 'conn-logistics-to-gateway',
    fromNode: 'client-mobile-logistics',
    toNode: 'gateway-ratelimit',
    label: 'HTTPS REST (TLS 1.3)',
    protocol: 'HTTPS',
    type: 'https',
    flows: ['all', 'cycle'],
    color: '#7aa2f7',
    description: 'Warehouse handheld transmits physical cycle count quantities and receiving data.',
  },
  {
    id: 'conn-pos-to-gateway',
    fromNode: 'client-pos-desk',
    toNode: 'gateway-ratelimit',
    label: 'HTTPS REST (TLS 1.3)',
    protocol: 'HTTPS',
    type: 'https',
    flows: ['all'],
    color: '#7aa2f7',
    description: 'POS register dispatches split-tender checkout transactions and return slips.',
  },
  {
    id: 'conn-device-to-ws-upgrader',
    fromNode: 'client-device-cache',
    toNode: 'gateway-ws-upgrader',
    label: 'WSS Duplex Handshake',
    protocol: 'WSS',
    type: 'wss',
    flows: ['all', 'bopis', 'cycle'],
    color: '#bb9af7',
    description: 'Establishes long-lived WebSocket connection with JWT token for real-time inventory alerts.',
  },

  // Tier 2 internal & Tier 2 -> Tier 3
  {
    id: 'conn-ratelimit-to-authjwt',
    fromNode: 'gateway-ratelimit',
    toNode: 'gateway-auth-jwt',
    label: 'Passed IP Limits',
    protocol: 'GIN-CHAIN',
    type: 'context',
    flows: ['all', 'bopis', 'replenish', 'cycle', 'auth'],
    color: '#bb9af7',
    description: 'Passes rate limit checks to Bearer JWT token extraction and role verification.',
  },
  {
    id: 'conn-authjwt-to-context',
    fromNode: 'gateway-auth-jwt',
    toNode: 'gateway-context',
    label: 'Bind Claims Context',
    protocol: 'CONTEXT',
    type: 'context',
    flows: ['all', 'bopis', 'replenish', 'cycle'],
    color: '#bb9af7',
    description: 'Injects verified store_id, user_id, and 5-second deadline context into request pipeline.',
  },
  {
    id: 'conn-authjwt-to-redis',
    fromNode: 'gateway-auth-jwt',
    toNode: 'storage-redis',
    label: 'Check Session Blacklist',
    protocol: 'REDIS-GET',
    type: 'cache',
    flows: ['all', 'auth'],
    color: '#f7768e',
    description: 'Verifies session ID has not been blacklisted due to remote logout or concurrent takeover.',
  },
  {
    id: 'conn-context-to-handler-auth',
    fromNode: 'gateway-context',
    toNode: 'handler-auth',
    label: 'Route /api/auth/*',
    protocol: 'HTTP',
    type: 'https',
    flows: ['all', 'auth'],
    color: '#7dcfff',
    description: 'Routes authentication requests to AuthHandler.',
  },
  {
    id: 'conn-context-to-handler-bopis',
    fromNode: 'gateway-context',
    toNode: 'handler-bopis',
    label: 'Route /api/orders/*',
    protocol: 'HTTP',
    type: 'https',
    flows: ['all', 'bopis'],
    color: '#7dcfff',
    description: 'Routes online order assignment and picking requests to OnlineOrderHandler.',
  },
  {
    id: 'conn-context-to-handler-cycle',
    fromNode: 'gateway-context',
    toNode: 'handler-cycle',
    label: 'Route /api/cycle-counts/*',
    protocol: 'HTTP',
    type: 'https',
    flows: ['all', 'cycle'],
    color: '#7dcfff',
    description: 'Routes inventory audit count requests to CycleCountHandler.',
  },
  {
    id: 'conn-context-to-handler-replenish',
    fromNode: 'gateway-context',
    toNode: 'handler-replenish',
    label: 'Route /api/fill-reports/*',
    protocol: 'HTTP',
    type: 'https',
    flows: ['all', 'replenish'],
    color: '#7dcfff',
    description: 'Routes empty shelf scans and restock cart requests to FillReportHandler.',
  },
  {
    id: 'conn-context-to-handler-pos',
    fromNode: 'gateway-context',
    toNode: 'handler-pos',
    label: 'Route /api/pos/*',
    protocol: 'HTTP',
    type: 'https',
    flows: ['all'],
    color: '#7dcfff',
    description: 'Routes POS checkout and return transactions to TransactionHandler.',
  },
  {
    id: 'conn-wsupgrader-to-wshandler',
    fromNode: 'gateway-ws-upgrader',
    toNode: 'handler-ws',
    label: 'Upgraded TCP Stream',
    protocol: 'TCP',
    type: 'wss',
    flows: ['all', 'bopis', 'cycle'],
    color: '#bb9af7',
    description: 'Hands off upgraded TCP socket to WebSocket client handler goroutines.',
  },

  // Tier 3 -> Tier 4
  {
    id: 'conn-hauth-to-sauth',
    fromNode: 'handler-auth',
    toNode: 'service-auth',
    label: 'AuthService Contract',
    protocol: 'GO-IFACE',
    type: 'contract',
    flows: ['all', 'auth'],
    color: '#9ece6a',
    description: 'AuthHandler calls AuthService.Login with validated credentials.',
  },
  {
    id: 'conn-hbopis-to-sbopis',
    fromNode: 'handler-bopis',
    toNode: 'service-bopis',
    label: 'OnlineOrderService Contract',
    protocol: 'GO-IFACE',
    type: 'contract',
    flows: ['all', 'bopis'],
    color: '#9ece6a',
    description: 'OnlineOrderHandler calls OnlineOrderService.PickItem with barcode verification.',
  },
  {
    id: 'conn-hcycle-to-scycle',
    fromNode: 'handler-cycle',
    toNode: 'service-cycle',
    label: 'CycleCountService Contract',
    protocol: 'GO-IFACE',
    type: 'contract',
    flows: ['all', 'cycle'],
    color: '#9ece6a',
    description: 'CycleCountHandler calls CycleCountService.RecordCount with physical count numbers.',
  },
  {
    id: 'conn-hreplenish-to-sreplenish',
    fromNode: 'handler-replenish',
    toNode: 'service-replenish',
    label: 'FillReportService Contract',
    protocol: 'GO-IFACE',
    type: 'contract',
    flows: ['all', 'replenish'],
    color: '#9ece6a',
    description: 'FillReportHandler invokes FillReportService.IngestScan with shelf coordinates.',
  },
  {
    id: 'conn-hpos-to-spos',
    fromNode: 'handler-pos',
    toNode: 'service-pos',
    label: 'TransactionService Contract',
    protocol: 'GO-IFACE',
    type: 'contract',
    flows: ['all'],
    color: '#9ece6a',
    description: 'TransactionHandler invokes TransactionService.CreateTransaction for checkout.',
  },
  {
    id: 'conn-hwshandler-to-wshub',
    fromNode: 'handler-ws',
    toNode: 'service-ws-hub',
    label: 'Register Store Client',
    protocol: 'GO-CHAN',
    type: 'event',
    flows: ['all', 'bopis', 'cycle'],
    color: '#ff9e64',
    description: 'Registers client into store-specific broadcast pool.',
  },

  // Tier 4 -> Tier 4 (Inter-service events)
  {
    id: 'conn-sbopis-to-wshub',
    fromNode: 'service-bopis',
    toNode: 'service-ws-hub',
    label: 'Emit ORDER_PICKED',
    protocol: 'BROADCAST',
    type: 'event',
    flows: ['all', 'bopis'],
    color: '#ff9e64',
    description: 'Emits ORDER_PICKED event to store room clients when item is verified.',
  },
  {
    id: 'conn-scycle-to-wshub',
    fromNode: 'service-cycle',
    toNode: 'service-ws-hub',
    label: 'Emit COUNT_LOCKED',
    protocol: 'BROADCAST',
    type: 'event',
    flows: ['all', 'cycle'],
    color: '#ff9e64',
    description: 'Emits COUNT_LOCKED event when a count sheet is claimed by an auditor.',
  },

  // Tier 4 -> Tier 5
  {
    id: 'conn-sauth-to-redis',
    fromNode: 'service-auth',
    toNode: 'storage-redis',
    label: 'Store Active Session',
    protocol: 'REDIS-SET',
    type: 'cache',
    flows: ['all', 'auth'],
    color: '#f7768e',
    description: 'Writes active JWT session ID and sets TTL; blacklists prior active sessions.',
  },
  {
    id: 'conn-sreplenish-to-redis',
    fromNode: 'service-replenish',
    toNode: 'storage-redis',
    label: '24h Deduplication Key',
    protocol: 'REDIS-SETNX',
    type: 'cache',
    flows: ['all', 'replenish'],
    color: '#f7768e',
    description: 'Checks is4tc_session key to eliminate duplicate empty hole scan triggers.',
  },
  {
    id: 'conn-sbopis-to-postgres',
    fromNode: 'service-bopis',
    toNode: 'storage-postgres',
    label: 'Pessimistic Row Lock & ACID Commit',
    protocol: 'PGX-POOL',
    type: 'sql',
    flows: ['all', 'bopis'],
    color: '#7aa2f7',
    description: 'Executes SELECT FOR UPDATE and atomic transition to READY_FOR_PICKUP.',
  },
  {
    id: 'conn-scycle-to-postgres',
    fromNode: 'service-cycle',
    toNode: 'storage-postgres',
    label: 'Update Count Sheets',
    protocol: 'PGX-POOL',
    type: 'sql',
    flows: ['all', 'cycle'],
    color: '#7aa2f7',
    description: 'Inserts audit counts and records perpetual variance against inventory rows.',
  },
  {
    id: 'conn-spos-to-postgres',
    fromNode: 'service-pos',
    toNode: 'storage-postgres',
    label: 'Insert POS Transaction',
    protocol: 'PGX-POOL',
    type: 'sql',
    flows: ['all'],
    color: '#7aa2f7',
    description: 'Writes sales header, split payment tender records, and updates sellable stock.',
  },
  {
    id: 'conn-sbopis-to-ledger',
    fromNode: 'service-bopis',
    toNode: 'storage-ledger',
    label: 'Write BOPIS Delta',
    protocol: 'APPEND-ONLY',
    type: 'sql',
    flows: ['all', 'bopis'],
    color: '#9ece6a',
    description: 'Appends audit delta moving items into the bopis_qty sub-inventory bucket.',
  },
  {
    id: 'conn-scycle-to-ledger',
    fromNode: 'service-cycle',
    toNode: 'storage-ledger',
    label: 'Write Shrinkage Delta',
    protocol: 'APPEND-ONLY',
    type: 'sql',
    flows: ['all', 'cycle'],
    color: '#9ece6a',
    description: 'Appends permanent shrinkage delta to inventory_transactions ledger.',
  },
  {
    id: 'conn-spos-to-ledger',
    fromNode: 'service-pos',
    toNode: 'storage-ledger',
    label: 'Write Sale Delta',
    protocol: 'APPEND-ONLY',
    type: 'sql',
    flows: ['all'],
    color: '#9ece6a',
    description: 'Appends inventory reduction delta for every item scanned at the cash register.',
  },

  // Worker -> Storage
  {
    id: 'conn-worker-to-postgres',
    fromNode: 'worker-autocancel',
    toNode: 'storage-postgres',
    label: 'Sweep Abandoned Holds (>5d)',
    protocol: 'PGX-SQL',
    type: 'async',
    flows: ['all'],
    color: '#ff9e64',
    description: 'Background worker cancels expired holds and releases reserved inventory.',
  },
  {
    id: 'conn-worker-to-ledger',
    fromNode: 'worker-autocancel',
    toNode: 'storage-ledger',
    label: 'Write Auto-Cancel Delta',
    protocol: 'APPEND-ONLY',
    type: 'async',
    flows: ['all'],
    color: '#9ece6a',
    description: 'Appends ledger audit record releasing bopis_qty back to sellable stock.',
  },

  // WebSocket Hub -> Mobile Client (Upward push)
  {
    id: 'conn-wshub-to-device',
    fromNode: 'service-ws-hub',
    toNode: 'client-device-cache',
    label: 'WSS Push Store Events',
    protocol: 'WSS-PUSH',
    type: 'wss',
    flows: ['all', 'bopis', 'cycle'],
    color: '#bb9af7',
    description: 'Real-time WebSocket event frames pushed upward to handheld client runtimes.',
  },
];
