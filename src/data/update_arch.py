import re

with open('/Users/juderozario/projects/judesPortfolio/src/data/radiusSystemArchitecture.ts', 'r') as f:
    content = f.read()

# Replacements
replacements = [
    (r"nodeId: 'storage-ledger', title: 'Emit Audit Delta', action: 'Records immutable audit entry in inventory_transactions'", r"nodeId: 'storage-ledger', title: 'Emit Audit Delta', action: 'Records immutable audit entry in `inventory_transactions`'"),
    (r"name: 'Sales Floor Terminal'", r"name: 'Sales Floor Mobile Device'"),
    (r"metrics: 'Supports 1,200\+ counts/hr per terminal'", r"metrics: 'Supports 1,200+ counts/hr per mobile phone'"),
    (r"name: 'POS Terminal & Service Desk'", r"name: 'Service Desk Mobile View'"),
    (r"description: 'Web-based point of sale handling split tenders and checkouts.'", r"description: 'Mobile interface for viewing transaction logs and monitoring stock changes.'"),
    (r"safeguard: 'Strict transaction total validation; fails immediately if tender amounts do not exactly match order subtotal \+ provincial taxes.'", r"safeguard: 'Strict read-only view validation; instantly syncs remote mock orders with local provincial taxes.'"),
    (r"outbound: 'POST /api/pos/transactions, GET /api/inventory/search'", r"outbound: 'GET /api/pos/transactions/logs, GET /api/inventory/search'"),
    (r"export async function checkoutPOSTransaction\(cart: CartItem\[\], tenders: PaymentTender\[\]\) \{", r"export async function fetchTransactionLogs(storeId: number) {"),
    (r"return apiClient\.post\('/api/pos/transactions', payload\);", r"return apiClient.get(`/api/pos/transactions/logs?store_id=${storeId}`);"),
    (r"safeguard: 'Instant remote session kill: if another terminal logs in, the previous token is blacklisted in Redis within 1 millisecond.'", r"safeguard: 'Instant remote session kill: if another device logs in, the previous token is blacklisted in Redis within 1 millisecond.'"),
    (r"subtitle: 'Transaction Cancellation Safety'", r"subtitle: 'Query Cancellation Safety'"),
    (r"role: 'Attaches 5-second deadline context to all incoming HTTP transactions and propagates cancellation down through repository calls.'", r"role: 'Attaches 5-second deadline context to all incoming HTTP requests and propagates cancellation down through repository calls.'"),
    (r"safeguard: 'If a client drops connection, context\.Done\(\) signals pgx to immediately roll back pending SQL transactions.'", r"safeguard: 'If a client drops connection, context.Done() signals pgx to immediately roll back pending SQL operations.'"),
    (r"role: 'Ingests IS4TC empty shelf scans and delivers optimized serpentine restock walk lists to mobile terminals.'", r"role: 'Ingests IS4TC empty shelf scans and delivers optimized serpentine restock walk lists to mobile devices.'"),
    (r"name: 'POS Transaction Handler'", r"name: 'Transaction Viewer Handler'"),
    (r"subtitle: '/api/pos/transactions'", r"subtitle: '/api/pos/transactions/logs'"),
    (r"role: 'Handles retail checkout transactions, payment tender breakdown verification, and tax calculations.'", r"role: 'Handles real-time transaction polling, log retrieval, and regional tax display calculations.'"),
    (r"filePath: 'radius-backend/internal/handler/transaction_handler\.go'", r"filePath: 'radius-backend/internal/handler/transaction_viewer_handler.go'"),
    (r"description: 'Exposes /api/pos/transactions, /api/pos/returns, and /api/pos/tax-calculate endpoints.'", r"description: 'Exposes /api/pos/transactions/logs and /api/pos/tax-calculate endpoints.'"),
    (r"inbound: 'POST /api/pos/transactions'", r"inbound: 'GET /api/pos/transactions/logs'"),
    (r"outbound: 'TransactionService\.ProcessTransaction\(ctx, \.\.\.\)'", r"outbound: 'TransactionService.FetchLogs(ctx, ...)'"),
    (r"func \(h \*TransactionHandler\) ProcessSale\(c \*gin\.Context\) \{", r"func (h *TransactionHandler) GetLogs(c *gin.Context) {"),
    (r"var txDTO CreateTransactionDTO", r"storeId := c.Query(\"store_id\")"),
    (r"resp, err := h\.txService\.CreateTransaction\(c\.Request\.Context\(\), txDTO\)", r"resp, err := h.txService.FetchLogs(c.Request.Context(), storeId)"),
    (r"safeguard: 'If a user logs into Terminal B while Terminal A is active, emits TAKEOVER_PROMPT and revokes Terminal A in Redis.'", r"safeguard: 'If a user logs into Device B while Device A is active, emits TAKEOVER_PROMPT and revokes Device A in Redis.'"),
    (r"name: 'POS Transaction Engine'", r"name: 'Transaction Viewer Service'"),
    (r"filePath: 'radius-backend/internal/service/transaction_service\.go'", r"filePath: 'radius-backend/internal/service/transaction_viewer_service.go'"),
    (r"description: 'Dispatches immutable transaction ledger rows and updates sub-inventory counts.'", r"description: 'Retrieves immutable transaction ledger rows and audits sub-inventory counts.'"),
    (r"metrics: 'Tested across 50,000\+ synthetic transactions'", r"metrics: 'Tested across 50,000+ synthetic transaction log fetches'"),
    (r"func \(s \*TransactionService\) CreateTransaction\(ctx context\.Context, dto CreateTransactionDTO\) \(\*Transaction, error\) \{", r"func (s *TransactionService) FetchLogs(ctx context.Context, storeId string) ([]*Transaction, error) {"),
    (r"description: 'Dispatches real-time inventory events \(ORDER_PICKED, COUNT_LOCKED\) only to terminals within that store.'", r"description: 'Dispatches real-time inventory events (ORDER_PICKED, COUNT_LOCKED) only to mobile devices within that store.'"),
    (r"outbound: 'ACID transaction commits'", r"outbound: 'ACID database operations'"),
    (r"bopis: \{ stepNumber: 5, action: 'Executes atomic transaction updating order status to READY_FOR_PICKUP' \}", r"bopis: { stepNumber: 5, action: 'Executes atomic database operation updating order status to READY_FOR_PICKUP' }"),
    (r"subtitle: 'Append-Only inventory_transactions'", r"subtitle: 'Append-Only `inventory_transactions`'"),
    (r"filePath: 'radius-backend/internal/repository/inventory_transaction_repo\.go'", r"filePath: 'radius-backend/internal/repository/inventory_log_repo.go'"),
    (r"safeguard: 'Strictly append-only: UPDATE and DELETE operations are forbidden on the inventory_transactions table.'", r"safeguard: 'Strictly append-only: UPDATE and DELETE operations are forbidden on the `inventory_transactions` table.'"),
    (r"safeguard: 'Runs within atomic transaction with SKIP LOCKED to avoid contending with live customer pick-ups.'", r"safeguard: 'Runs within atomic database lock with SKIP LOCKED to avoid contending with live customer pick-ups.'"),
    (r"description: 'POS register dispatches split-tender checkout transactions and return slips.'", r"description: 'Mobile device polls for transaction logs and admin mock events.'"),
    (r"description: 'Routes POS checkout and return transactions to TransactionHandler.'", r"description: 'Routes transaction log polling to TransactionHandler.'"),
    (r"label: 'TransactionService Contract'", r"label: 'Transaction Viewer Contract'"),
    (r"description: 'TransactionHandler invokes TransactionService\.CreateTransaction for checkout.'", r"description: 'TransactionHandler invokes TransactionService.FetchLogs for viewing.'"),
    (r"label: 'Insert POS Transaction'", r"label: 'Query POS Logs'"),
    (r"description: 'Appends permanent shrinkage delta to inventory_transactions ledger.'", r"description: 'Appends permanent shrinkage delta to `inventory_transactions` ledger.'")
]

for old, new in replacements:
    content = re.sub(old, new, content)

# Check if there are other plain "inventory_transactions" references not caught
content = re.sub(r'(?<!`)inventory_transactions(?!`)', r'`inventory_transactions`', content)
content = re.sub(r'(?<!`)store_id(?!`)', r'`store_id`', content)
content = re.sub(r'(?<!`)employee_id(?!`)', r'`employee_id`', content)
content = re.sub(r'(?<!`)mims_locations(?!`)', r'`mims_locations`', content)
content = re.sub(r'(?<!`)mims_inventory(?!`)', r'`mims_inventory`', content)

with open('/Users/juderozario/projects/judesPortfolio/src/data/radiusSystemArchitecture.ts', 'w') as f:
    f.write(content)

print("Done")
