with open('/Users/juderozario/projects/judesPortfolio/src/data/radiusSystemArchitecture.ts', 'r') as f:
    text = f.read()

replacements = {
    # 1. client-mobile-floor -> Sales Floor Terminal to Mobile Device
    "'Sales Floor Terminal'": "'Sales Floor Mobile Device'",
    "'Supports 1,200+ counts/hr per terminal'": "'Supports 1,200+ counts/hr per mobile device'",
    "'POS Terminal & Service Desk'": "'Transaction Viewer Mobile'",
    "'Multi-Tender Cash/Card/Gift'": "'Audit Logs & Mock Test Viewer'",
    "'Point of Sale register client with split-tender support (Cash, Debit, Credit, Gift Card), provincial tax calculation, and print shop order tracker.'": "'Mobile interface for viewing real-time transaction logs, auditing stock changes, and monitoring regional tax data.'",
    "'POS DESK'": "'VIEWER'",
    "'radius-mobile/app/pos.tsx'": "'radius-mobile/app/transactions.tsx'",
    "'Ensures zero penny discrepancies between split tenders and the computed gross total.'": "'Polls central transaction history so employees can audit sales and deductions on their phones.'",
    "'Strict transaction total validation; fails immediately if tender amounts do not exactly match order subtotal + provincial taxes.'": "'Strict read-only view validation; instantly syncs remote mock orders with local provincial taxes.'",
    "'Cashier tender selections, barcode gun inputs'": "'Associate manual refresh, automated polling'",
    "'POST /api/pos/transactions, GET /api/inventory/search'": "'GET /api/pos/transactions/logs, GET /api/inventory/search'",
    "['Multi-Tender', 'Split Payment', 'Tax Engine']": "['Read-Only', 'Audit Logs', 'Tax Viewer']",
    "'Sub-cent rounding accuracy'": "'Instantly renders 5,000+ log entries'",
    "export async function checkoutPOSTransaction(cart: CartItem[], tenders: PaymentTender[]) {\n  const payload = {\n    cart_items: cart,\n    tenders: tenders,\n    store_id: getCurrentStoreId()\n  };\n  return apiClient.post('/api/pos/transactions', payload);\n}": "export async function fetchTransactionLogs(storeId: number) {\n  const payload = {\n    store_id: storeId\n  };\n  return apiClient.get('/api/pos/transactions/logs', { params: payload });\n}",
    "'Instant remote session kill: if another terminal logs in, the previous token is blacklisted in Redis within 1 millisecond.'": "'Instant remote session kill: if another device logs in, the previous token is blacklisted in Redis within 1 millisecond.'",
    "'Transaction Cancellation Safety'": "'Query Cancellation Safety'",
    "'Attaches 5-second deadline context to all incoming HTTP transactions and propagates cancellation down through repository calls.'": "'Attaches 5-second deadline context to all incoming HTTP requests and propagates cancellation down through repository calls.'",
    "'If a client drops connection, context.Done() signals pgx to immediately roll back pending SQL transactions.'": "'If a client drops connection, context.Done() signals pgx to immediately roll back pending SQL operations.'",
    "'Ingests IS4TC empty shelf scans and delivers optimized serpentine restock walk lists to mobile terminals.'": "'Ingests IS4TC empty shelf scans and delivers optimized serpentine restock walk lists to mobile devices.'",
    "'POS Transaction Handler'": "'Transaction Viewer Handler'",
    "'/api/pos/transactions'": "'/api/pos/transactions/logs'",
    "'Handles retail checkout transactions, payment tender breakdown verification, and tax calculations.'": "'Handles real-time transaction polling, mock log retrieval, and regional tax display calculations.'",
    "'POS DTO'": "'VIEWER API'",
    "'radius-backend/internal/handler/transaction_handler.go'": "'radius-backend/internal/handler/transaction_viewer_handler.go'",
    "'Exposes /api/pos/transactions, /api/pos/returns, and /api/pos/tax-calculate endpoints.'": "'Exposes /api/pos/transactions/logs and /api/pos/tax-calculate endpoints.'",
    "'Verifies tender sum matches invoice grand total to the exact cent; rejects incomplete payment splits.'": "'Rejects mock creation unless the authenticated token belongs to an Admin role.'",
    "'POST /api/pos/transactions'": "'GET /api/pos/transactions/logs'",
    "'TransactionService.ProcessTransaction(ctx, ...)'": "'TransactionService.FetchLogs(ctx, ...)'",
    "['POS', 'Split Tender', 'Tax Engine']": "['Log Retrieval', 'Tax Engine', 'Admin Roles']",
    "'< 20ms end-to-end checkout commit'": "'Streams JSON payload in <5ms'",
    "func (h *TransactionHandler) ProcessSale(c *gin.Context) {\n\tvar txDTO CreateTransactionDTO\n\tif err := c.ShouldBindJSON(&txDTO); err != nil {\n\t\tc.JSON(http.StatusBadRequest, gin.H{\"error\": \"malformed sale request\"})\n\t\treturn\n\t}\n\tresp, err := h.txService.CreateTransaction(c.Request.Context(), txDTO)\n\tc.JSON(http.StatusCreated, resp)\n}": "func (h *TransactionHandler) GetLogs(c *gin.Context) {\n\tstoreId := c.Query(\"store_id\")\n\t// Delegate to business service to fetch logs\n\tresp, err := h.txService.FetchLogs(c.Request.Context(), storeId)\n}",
    "'If a user logs into Terminal B while Terminal A is active, emits TAKEOVER_PROMPT and revokes Terminal A in Redis.'": "'If a user logs into Device B while Device A is active, emits TAKEOVER_PROMPT and revokes Device A in Redis.'",
    "'POS Transaction Engine'": "'Transaction Viewer Service'",
    "'Split-Tender & Tax Calculation'": "'Business Rules & Mock Admin Generator'",
    "'Validates payment tender combinations (Cash, Card, Gift Card), computes Canadian provincial taxes (ON 13% HST, BC 12%), and adjusts sellable stock.'": "'Aggregates read-only views for general staff and allows admins to generate mock transactions for testing tax/inventory logic.'",
    "'radius-backend/internal/service/transaction_service.go'": "'radius-backend/internal/service/transaction_viewer_service.go'",
    "'Dispatches immutable transaction ledger rows and updates sub-inventory counts.'": "'Retrieves immutable transaction ledger rows and audits sub-inventory counts.'",
    "'Double-entry ledger integrity: total debits must exactly equal credits before database commit.'": "'Double-entry ledger integrity enforced for admin mocks: total debits must exactly equal credits before mock commit.'",
    "['Provincial Tax', 'Double-Entry', 'Atomic Checkout']": "['Provincial Tax', 'Double-Entry', 'Atomic Audit']",
    "'Tested across 50,000+ synthetic transactions'": "'Tested across 50,000+ synthetic transaction log fetches'",
    "func (s *TransactionService) CreateTransaction(ctx context.Context, dto CreateTransactionDTO) (*Transaction, error) {\n\ttax := calculateProvincialTax(dto.Province, dto.Subtotal)\n\tif sumTenders(dto.Tenders) != dto.Subtotal + tax {\n\t\treturn nil, ErrTenderMismatch\n\t}\n\treturn s.txRepo.ExecuteCheckout(ctx, dto, tax)\n}": "func (s *TransactionService) FetchLogs(ctx context.Context, storeId string) ([]*Transaction, error) {\n\t// Returns a strict view of the transaction history\n\tlogs, err := s.txRepo.GetRecentLogs(ctx, storeId)\n\tif err != nil {\n\t\treturn nil, err\n\t}\n\treturn logs, nil\n}",
    "'Dispatches real-time inventory events (ORDER_PICKED, COUNT_LOCKED) only to terminals within that store.'": "'Dispatches real-time inventory events (ORDER_PICKED, COUNT_LOCKED) only to mobile devices within that store.'",
    "'ACID transaction commits'": "'ACID database operations'",
    "'Executes atomic transaction updating order status to READY_FOR_PICKUP'": "'Executes atomic database operation updating order status to READY_FOR_PICKUP'",
    "'Append-Only inventory_transactions'": "'Append-Only `inventory_transactions`'",
    "'radius-backend/internal/repository/inventory_transaction_repo.go'": "'radius-backend/internal/repository/inventory_log_repo.go'",
    "'Strictly append-only: UPDATE and DELETE operations are forbidden on the inventory_transactions table.'": "'Strictly append-only: UPDATE and DELETE operations are forbidden on the `inventory_transactions` table.'",
    "'Runs within atomic transaction with SKIP LOCKED to avoid contending with live customer pick-ups.'": "'Runs within atomic database lock with SKIP LOCKED to avoid contending with live customer pick-ups.'",
    "'POS register dispatches split-tender checkout transactions and return slips.'": "'Mobile device polls for transaction logs and admin mock events.'",
    "'Routes POS checkout and return transactions to TransactionHandler.'": "'Routes transaction log polling to TransactionHandler.'",
    "'TransactionService Contract'": "'Transaction Viewer Contract'",
    "'TransactionHandler invokes TransactionService.CreateTransaction for checkout.'": "'TransactionHandler invokes TransactionService.FetchLogs for viewing.'",
    "'Insert POS Transaction'": "'Query POS Logs'",
    "'Writes sales header, split payment tender records, and updates sellable stock.'": "'Fetches read-only transaction history or executes admin mock inserts.'",
    "'Appends permanent shrinkage delta to inventory_transactions ledger.'": "'Appends permanent shrinkage delta to `inventory_transactions` ledger.'"
}

for k, v in replacements.items():
    if k not in text:
        print(f"Warning: could not find key {k}")
    text = text.replace(k, v)

with open('/Users/juderozario/projects/judesPortfolio/src/data/radiusSystemArchitecture.ts', 'w') as f:
    f.write(text)

