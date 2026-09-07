export interface SchemaColumn {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: {
    table: string;
    column: string;
  };
  isNullable?: boolean;
  isUnique?: boolean;
  isGenerated?: boolean;
  description?: string;
}

export interface SchemaTable {
  id: string;
  name: string;
  domain: 'core' | 'catalog' | 'inventory' | 'sales' | 'purchasing' | 'auditing';
  description: string;
  x: number;
  y: number;
  width: number;
  columns: SchemaColumn[];
}

export interface SchemaRelation {
  id: string;
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: 'one-to-many' | 'one-to-one' | 'many-to-many';
}

export const SCHEMA_DOMAINS = [
  { id: 'all', label: 'All Tables (32)', color: 'text-tokyo-fg' },
  { id: 'core', label: 'Core & Tenancy (5)', color: 'text-tokyo-purple' },
  { id: 'catalog', label: 'Catalog (4)', color: 'text-tokyo-cyan' },
  { id: 'inventory', label: 'Inventory & MIMS (8)', color: 'text-emerald-400' },
  { id: 'sales', label: 'POS & Orders (6)', color: 'text-[#ffbd2e]' },
  { id: 'purchasing', label: 'Purchasing (6)', color: 'text-[#7aa2f7]' },
  { id: 'auditing', label: 'Audits & Counts (3)', color: 'text-[#ff5f56]' },
] as const;

export const RADIUS_SCHEMA_TABLES: SchemaTable[] = [
  {
    "id": "stores",
    "name": "stores",
    "domain": "core",
    "description": "Physical and digital store partition roots. Scopes all retail operations, staff, and inventory.",
    "x": 100,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "store_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "name",
        "type": "VARCHAR(100)",
        "isUnique": true
      },
      {
        "name": "address",
        "type": "VARCHAR(255)"
      },
      {
        "name": "city",
        "type": "VARCHAR(100)",
        "isUnique": true
      },
      {
        "name": "province",
        "type": "VARCHAR(50)",
        "isUnique": true
      },
      {
        "name": "postal_code",
        "type": "VARCHAR(50)",
        "isUnique": true
      },
      {
        "name": "phone",
        "type": "VARCHAR(20)",
        "isUnique": true
      },
      {
        "name": "timezone",
        "type": "VARCHAR(50)"
      },
      {
        "name": "is_active",
        "type": "BOOLEAN"
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "location_type",
        "type": "LOCATION_TYPE",
        "isNullable": true
      },
      {
        "name": "region",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "open_date",
        "type": "DATE",
        "isNullable": true
      },
      {
        "name": "close_date",
        "type": "DATE",
        "isNullable": true
      },
      {
        "name": "manager_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      }
    ]
  },
  {
    "id": "schema_migrations",
    "name": "schema_migrations",
    "domain": "core",
    "description": "Versioned database migration ledger tracking applied schema changes and dirty states.",
    "x": 440,
    "y": 560,
    "width": 260,
    "columns": [
      {
        "name": "version",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "dirty",
        "type": "BOOLEAN"
      }
    ]
  },
  {
    "id": "categories",
    "name": "categories",
    "domain": "catalog",
    "description": "Hierarchical taxonomy tree supporting multi-level department and subcategory classification.",
    "x": 1220,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "category_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "parent_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "categories",
          "column": "category_id"
        },
        "isNullable": true
      },
      {
        "name": "name",
        "type": "VARCHAR(100)"
      }
    ]
  },
  {
    "id": "purchase_order_lprs",
    "name": "purchase_order_lprs",
    "domain": "purchasing",
    "description": "License Plate Receipt (LPR) pallet barcodes for high-throughput warehouse receiving.",
    "x": 780,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "lpr_id",
        "type": "SERIAL",
        "isPrimaryKey": true,
        "isNullable": true
      },
      {
        "name": "po_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "purchase_orders",
          "column": "po_id"
        }
      },
      {
        "name": "lpr_barcode",
        "type": "VARCHAR(20)",
        "isUnique": true
      },
      {
        "name": "is_received",
        "type": "BOOLEAN",
        "isNullable": true
      },
      {
        "name": "received_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "received_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "suppliers",
    "name": "suppliers",
    "domain": "catalog",
    "description": "Wholesale vendor directory storing lead times, ordering terms, and supplier contact points.",
    "x": 1980,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "supplier_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "name",
        "type": "VARCHAR(150)"
      },
      {
        "name": "contact_email",
        "type": "VARCHAR(50)"
      },
      {
        "name": "phone",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "lead_time_days",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "is_active",
        "type": "BOOLEAN",
        "isNullable": true
      }
    ]
  },
  {
    "id": "print_orders",
    "name": "print_orders",
    "domain": "sales",
    "description": "In-store print and copy service work orders, job specifications, and turnaround deadlines.",
    "x": 1460,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "print_order_id",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "customer_name",
        "type": "VARCHAR(150)"
      },
      {
        "name": "customer_email",
        "type": "VARCHAR(150)",
        "isNullable": true
      },
      {
        "name": "customer_phone",
        "type": "VARCHAR(30)",
        "isNullable": true
      },
      {
        "name": "order_type",
        "type": "PRINT_ORDER_TYPE"
      },
      {
        "name": "status",
        "type": "PRINT_ORDER_STATUS"
      },
      {
        "name": "subtotal",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "tax_amount",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "shipping_fee",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "total_amount",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "shipping_address",
        "type": "TEXT",
        "isNullable": true
      },
      {
        "name": "notes",
        "type": "TEXT",
        "isNullable": true
      },
      {
        "name": "placed_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "fulfilled_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "cycle_count_schedule",
    "name": "cycle_count_schedule",
    "domain": "auditing",
    "description": "Automated calendar scheduling recurring department audits and manager assignments.",
    "x": 2360,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "schedule_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "category_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "categories",
          "column": "category_id"
        }
      },
      {
        "name": "scheduled_date",
        "type": "DATE"
      },
      {
        "name": "created_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "cycle_count_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "cycle_counts",
          "column": "count_id"
        },
        "isNullable": true
      }
    ]
  },
  {
    "id": "purchase_order_lpr_items",
    "name": "purchase_order_lpr_items",
    "domain": "purchasing",
    "description": "Pallet-level item manifests linking received stock to parent purchase orders.",
    "x": 1120,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "lpr_item_id",
        "type": "SERIAL",
        "isPrimaryKey": true,
        "isNullable": true
      },
      {
        "name": "lpr_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "purchase_order_lprs",
          "column": "lpr_id"
        }
      },
      {
        "name": "po_item_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "purchase_orders_items",
          "column": "po_item_id"
        }
      },
      {
        "name": "qty",
        "type": "INTEGER"
      }
    ]
  },
  {
    "id": "fill_report_items",
    "name": "fill_report_items",
    "domain": "inventory",
    "description": "Item-level replenishment assignments tracking target shelf bins and fill quantities.",
    "x": 1800,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "fill_item_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "fill_report_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "fill_reports",
          "column": "fill_report_id"
        },
        "isNullable": true,
        "isUnique": true
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        },
        "isNullable": true,
        "isUnique": true
      },
      {
        "name": "fill_qty",
        "type": "INTEGER"
      },
      {
        "name": "completed",
        "type": "BOOLEAN",
        "isNullable": true
      },
      {
        "name": "completed_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "is_empty_hole",
        "type": "BOOLEAN",
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "updated_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "fill_reports",
    "name": "fill_reports",
    "domain": "inventory",
    "description": "Restock replenishment queue flagging shelves requiring re-stocking from warehouse overstock.",
    "x": 1460,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "fill_report_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        },
        "isNullable": true
      },
      {
        "name": "report_date",
        "type": "DATE"
      },
      {
        "name": "generated_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "status",
        "type": "FILL_REPORTS_STATUS",
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "transactions",
    "name": "transactions",
    "domain": "sales",
    "description": "Point-of-sale checkout receipts logging registers, payment methods, tax amounts, and staff.",
    "x": 100,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "transaction_id",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "register_id",
        "type": "VARCHAR(10)"
      },
      {
        "name": "employee_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "transaction_type",
        "type": "TRANSACTIONS_TYPE",
        "isNullable": true
      },
      {
        "name": "subtotal",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "tax_amount",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "total_amount",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "payment_method",
        "type": "TRANSACTIONS_PAYMENT_METHOD",
        "isNullable": true
      },
      {
        "name": "status",
        "type": "TRANSACTIONS_STATUS",
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "discount_total",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "cost_total",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "preferred_member_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "preferred_members",
          "column": "member_id"
        },
        "isNullable": true
      },
      {
        "name": "payment_reference",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "card_type",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "card_number",
        "type": "VARCHAR(4)",
        "isNullable": true
      }
    ]
  },
  {
    "id": "online_orders",
    "name": "online_orders",
    "domain": "sales",
    "description": "Omnichannel eCommerce and BOPIS (Buy Online, Pick-up In Store) customer orders.",
    "x": 780,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "order_id",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "customer_email",
        "type": "VARCHAR(150)"
      },
      {
        "name": "customer_name",
        "type": "VARCHAR(150)"
      },
      {
        "name": "order_type",
        "type": "ONLINE_ORDER_TYPE"
      },
      {
        "name": "status",
        "type": "ONLINE_ORDER_STATUS"
      },
      {
        "name": "placed_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "fulfilled_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "subtotal",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "tax_amount",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "shipping_fee",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "total_amount",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "shipping_address",
        "type": "TEXT"
      },
      {
        "name": "discount_total",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "promo_code",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "cost_total",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "preferred_member_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "preferred_members",
          "column": "member_id"
        },
        "isNullable": true
      },
      {
        "name": "carrier",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "tracking_number",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "estimated_delivery_date",
        "type": "DATE",
        "isNullable": true
      },
      {
        "name": "actual_delivery_date",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "customer_first_name",
        "type": "VARCHAR(150)",
        "isNullable": true
      },
      {
        "name": "customer_last_name",
        "type": "VARCHAR(150)",
        "isNullable": true
      },
      {
        "name": "billing_first_name",
        "type": "VARCHAR(150)",
        "isNullable": true
      },
      {
        "name": "billing_last_name",
        "type": "VARCHAR(150)",
        "isNullable": true
      },
      {
        "name": "billing_address_line1",
        "type": "VARCHAR(255)",
        "isNullable": true
      },
      {
        "name": "billing_address_line2",
        "type": "VARCHAR(255)",
        "isNullable": true
      },
      {
        "name": "billing_city",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "billing_province",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "billing_postal_code",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "billing_phone",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "billing_company",
        "type": "VARCHAR(150)",
        "isNullable": true
      },
      {
        "name": "payment_method",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "purchase_order_number",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "alternate_pickup_person",
        "type": "VARCHAR(150)",
        "isNullable": true
      },
      {
        "name": "payment_card_last4",
        "type": "VARCHAR(4)",
        "isNullable": true
      }
    ]
  },
  {
    "id": "purchase_orders_items",
    "name": "purchase_orders_items",
    "domain": "purchasing",
    "description": "Line-item purchase quantities, wholesale unit costs, and receiving tallies.",
    "x": 440,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "po_item_id",
        "type": "SERIAL",
        "isPrimaryKey": true,
        "isNullable": true
      },
      {
        "name": "po_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "purchase_orders",
          "column": "po_id"
        }
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        }
      },
      {
        "name": "qty_ordered",
        "type": "INTEGER"
      },
      {
        "name": "qty_received",
        "type": "INTEGER"
      },
      {
        "name": "unit_cost",
        "type": "NUMERIC(10,2)"
      }
    ]
  },
  {
    "id": "transaction_items",
    "name": "transaction_items",
    "domain": "sales",
    "description": "Line-item purchase receipts capturing unit prices, barcode scans, and promo discounts.",
    "x": 440,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "transaction_item_id",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "transaction_id",
        "type": "BIGINT",
        "isForeignKey": true,
        "references": {
          "table": "transactions",
          "column": "transaction_id"
        },
        "isNullable": true
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        },
        "isNullable": true
      },
      {
        "name": "quantity",
        "type": "INTEGER"
      },
      {
        "name": "unit_price",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "discount_amount",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "scanned_barcode",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "unit_cost",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "return_reason",
        "type": "VARCHAR(100)",
        "isNullable": true
      }
    ]
  },
  {
    "id": "cycle_counts",
    "name": "cycle_counts",
    "domain": "auditing",
    "description": "Regular scheduled inventory physical counts used to detect shrinkage and stock drift.",
    "x": 2700,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "count_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "count_date",
        "type": "DATE",
        "isNullable": true
      },
      {
        "name": "category_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "categories",
          "column": "category_id"
        }
      },
      {
        "name": "status",
        "type": "CYCLE_COUNT_STATUS"
      },
      {
        "name": "counted_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "total_variance_cost",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "approved_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "started_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "completed_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "approved_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "notes",
        "type": "TEXT",
        "isNullable": true
      },
      {
        "name": "total_items",
        "type": "INTEGER"
      },
      {
        "name": "counted_items",
        "type": "INTEGER"
      }
    ]
  },
  {
    "id": "products",
    "name": "products",
    "domain": "catalog",
    "description": "Enterprise master catalog storing universal SKUs, barcodes, dimensions, weights, and taxes.",
    "x": 1560,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "product_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "sku",
        "type": "VARCHAR(10)",
        "isUnique": true
      },
      {
        "name": "upc",
        "type": "VARCHAR(20)",
        "isUnique": true
      },
      {
        "name": "name",
        "type": "VARCHAR(255)"
      },
      {
        "name": "description",
        "type": "TEXT",
        "isNullable": true
      },
      {
        "name": "category_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "categories",
          "column": "category_id"
        },
        "isNullable": true
      },
      {
        "name": "brand",
        "type": "VARCHAR(100)"
      },
      {
        "name": "unit_of_measure",
        "type": "MEASURING_UNITS"
      },
      {
        "name": "units_per_case",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "weight",
        "type": "NUMERIC(8,3)"
      },
      {
        "name": "is_active",
        "type": "BOOLEAN",
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "default_cost",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "default_price",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "tax_class",
        "type": "TAX_CLASS",
        "isNullable": true
      },
      {
        "name": "is_returnable",
        "type": "BOOLEAN",
        "isNullable": true
      },
      {
        "name": "warranty_days",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "images",
        "type": "JSONB",
        "isNullable": true
      },
      {
        "name": "color",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "size",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "lifecycle_stage",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "retail_price",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "constrained_end_after",
        "type": "DATE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "inventory",
    "name": "inventory",
    "domain": "inventory",
    "description": "Real-time retail inventory tracking on-hand, sellable, reserved, damaged, and 11 distinct buckets.",
    "x": 2360,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "inventory_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        },
        "isNullable": true,
        "isUnique": true
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        },
        "isNullable": true,
        "isUnique": true
      },
      {
        "name": "reserved_qty",
        "type": "INTEGER"
      },
      {
        "name": "reorder_point",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "reorder_qty",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "aisle",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "mims_location",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "last_counted_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "updated_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "in_transit_qty",
        "type": "INTEGER"
      },
      {
        "name": "sellable_qty",
        "type": "INTEGER"
      },
      {
        "name": "non_sellable_qty",
        "type": "INTEGER"
      },
      {
        "name": "demo_qty",
        "type": "INTEGER"
      },
      {
        "name": "open_box_qty",
        "type": "INTEGER"
      },
      {
        "name": "damaged_qty",
        "type": "INTEGER"
      },
      {
        "name": "returned_qty",
        "type": "INTEGER"
      },
      {
        "name": "new_qty",
        "type": "INTEGER"
      },
      {
        "name": "rtv_qty",
        "type": "INTEGER"
      },
      {
        "name": "code88_qty",
        "type": "INTEGER"
      },
      {
        "name": "bopis_qty",
        "type": "INTEGER"
      },
      {
        "name": "quarantine_qty",
        "type": "INTEGER"
      },
      {
        "name": "repair_qty",
        "type": "INTEGER"
      },
      {
        "name": "customer_on_hold_qty",
        "type": "INTEGER"
      },
      {
        "name": "fc_on_hold_qty",
        "type": "INTEGER"
      },
      {
        "name": "verify_qty",
        "type": "INTEGER"
      },
      {
        "name": "on_order_qty",
        "type": "INTEGER"
      },
      {
        "name": "last_received_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "on_hand_qty",
        "type": "INTEGER",
        "isNullable": true,
        "isGenerated": true
      },
      {
        "name": "available_qty",
        "type": "INTEGER",
        "isNullable": true,
        "isGenerated": true
      }
    ]
  },
  {
    "id": "stock_transfers",
    "name": "stock_transfers",
    "domain": "purchasing",
    "description": "Inter-store inventory transfer requests facilitating regional stock balancing.",
    "x": 2360,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "transfer_id",
        "type": "SERIAL",
        "isPrimaryKey": true,
        "isNullable": true
      },
      {
        "name": "from_store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "to_store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "status",
        "type": "STOCK_TRANSFER_STATUS",
        "isNullable": true
      },
      {
        "name": "requested_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        }
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE"
      },
      {
        "name": "received_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "manual_check_required",
        "type": "BOOLEAN",
        "isNullable": true
      }
    ]
  },
  {
    "id": "mims_scan_log",
    "name": "mims_scan_log",
    "domain": "inventory",
    "description": "RF barcode scanner telemetry logging employee actions, scan timestamps, and bin checks.",
    "x": 3040,
    "y": 560,
    "width": 260,
    "columns": [
      {
        "name": "scan_id",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "employee_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        }
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        },
        "isNullable": true
      },
      {
        "name": "scanned_barcode",
        "type": "VARCHAR(50)"
      },
      {
        "name": "mims_location_id",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "scan_type",
        "type": "VARCHAR(20)"
      },
      {
        "name": "scanned_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "product_suppliers",
    "name": "product_suppliers",
    "domain": "catalog",
    "description": "Cross-reference matrix linking catalog SKUs to vendor item codes and negotiated wholesale costs.",
    "x": 1770,
    "y": 580,
    "width": 260,
    "columns": [
      {
        "name": "product_id",
        "type": "INTEGER",
        "isPrimaryKey": true,
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        }
      },
      {
        "name": "supplier_id",
        "type": "INTEGER",
        "isPrimaryKey": true,
        "isForeignKey": true,
        "references": {
          "table": "suppliers",
          "column": "supplier_id"
        }
      },
      {
        "name": "supplier_sku",
        "type": "VARCHAR(20)"
      },
      {
        "name": "cost_price",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "is_primary",
        "type": "BOOLEAN",
        "isNullable": true
      }
    ]
  },
  {
    "id": "preferred_members",
    "name": "preferred_members",
    "domain": "core",
    "description": "Customer loyalty program registry tracking reward points, membership tiers, and spending.",
    "x": 100,
    "y": 560,
    "width": 260,
    "columns": [
      {
        "name": "member_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "first_name",
        "type": "VARCHAR(100)"
      },
      {
        "name": "last_name",
        "type": "VARCHAR(100)"
      },
      {
        "name": "email",
        "type": "VARCHAR(150)",
        "isUnique": true
      },
      {
        "name": "phone",
        "type": "VARCHAR(20)",
        "isNullable": true
      },
      {
        "name": "points_balance",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "tier_level",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "joined_date",
        "type": "DATE",
        "isNullable": true
      },
      {
        "name": "is_active",
        "type": "BOOLEAN",
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "purchase_orders",
    "name": "purchase_orders",
    "domain": "purchasing",
    "description": "Store replenishment purchase orders issued to commercial suppliers with ETA tracking.",
    "x": 100,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "po_id",
        "type": "SERIAL",
        "isPrimaryKey": true,
        "isNullable": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        },
        "isNullable": true
      },
      {
        "name": "supplier_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "suppliers",
          "column": "supplier_id"
        },
        "isNullable": true
      },
      {
        "name": "status",
        "type": "PURCHASE_ORDERS_STATUS",
        "isNullable": true
      },
      {
        "name": "ordered_at",
        "type": "TIMESTAMP WITH TIME ZONE"
      },
      {
        "name": "expected_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "created_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        }
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "arrived_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "online_order_items",
    "name": "online_order_items",
    "domain": "sales",
    "description": "eCommerce picking line-items tracking fulfillment statuses and substitutions.",
    "x": 1120,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "order_item_id",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "order_id",
        "type": "BIGINT",
        "isForeignKey": true,
        "references": {
          "table": "online_orders",
          "column": "order_id"
        },
        "isNullable": true
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        },
        "isNullable": true
      },
      {
        "name": "quantity",
        "type": "INTEGER"
      },
      {
        "name": "unit_price",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "picked_qty",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "unit_cost",
        "type": "NUMERIC(10,2)"
      },
      {
        "name": "discount_amount",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "tax_amount",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "total_price",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "fulfillment_status",
        "type": "VARCHAR(50)",
        "isNullable": true
      },
      {
        "name": "is_substituted",
        "type": "BOOLEAN",
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "updated_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "inventory_transactions",
    "name": "inventory_transactions",
    "domain": "inventory",
    "description": "Immutable double-entry ledger auditing all stock movements, write-offs, and transfers.",
    "x": 2700,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "transaction_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        }
      },
      {
        "name": "from_store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        },
        "isNullable": true
      },
      {
        "name": "to_store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        },
        "isNullable": true
      },
      {
        "name": "transaction_type",
        "type": "INVENTORY_TRANSACTION_TYPE"
      },
      {
        "name": "quantity",
        "type": "INTEGER"
      },
      {
        "name": "unit_cost",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "unit_price",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "reason_code",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "employee_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "reference_id",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "print_order_items",
    "name": "print_order_items",
    "domain": "sales",
    "description": "Detailed custom print service line-items, finishing options, and pricing breakdowns.",
    "x": 1800,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "print_order_item_id",
        "type": "BIGINT",
        "isPrimaryKey": true
      },
      {
        "name": "print_order_id",
        "type": "BIGINT",
        "isForeignKey": true,
        "references": {
          "table": "print_orders",
          "column": "print_order_id"
        }
      },
      {
        "name": "service_id",
        "type": "BIGINT",
        "isNullable": true
      },
      {
        "name": "description",
        "type": "VARCHAR(255)"
      },
      {
        "name": "quantity",
        "type": "INTEGER"
      },
      {
        "name": "unit_price",
        "type": "NUMERIC(10,2)"
      }
    ]
  },
  {
    "id": "cycle_count_items",
    "name": "cycle_count_items",
    "domain": "auditing",
    "description": "Counted items with PostgreSQL generated variance math between system and actual counts.",
    "x": 3040,
    "y": 1560,
    "width": 260,
    "columns": [
      {
        "name": "count_item_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "count_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "cycle_counts",
          "column": "count_id"
        }
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        }
      },
      {
        "name": "expected_qty",
        "type": "INTEGER"
      },
      {
        "name": "counted_qty",
        "type": "INTEGER"
      },
      {
        "name": "variance",
        "type": "INTEGER",
        "isNullable": true,
        "isGenerated": true
      },
      {
        "name": "variance_cost",
        "type": "NUMERIC(10,2)",
        "isNullable": true
      },
      {
        "name": "reason_code",
        "type": "VARCHAR(100)",
        "isNullable": true
      },
      {
        "name": "scanned_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "scanned_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      }
    ]
  },
  {
    "id": "employees",
    "name": "employees",
    "domain": "core",
    "description": "Store staff, cashiers, supervisors, and branch administrators with 4-tier role-based access.",
    "x": 440,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "employee_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "email",
        "type": "VARCHAR(100)",
        "isUnique": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "first_name",
        "type": "VARCHAR(50)"
      },
      {
        "name": "last_name",
        "type": "VARCHAR(50)"
      },
      {
        "name": "role",
        "type": "EMPLOYEE_ROLES"
      },
      {
        "name": "password_hash",
        "type": "VARCHAR(255)"
      },
      {
        "name": "phone",
        "type": "VARCHAR(20)",
        "isUnique": true
      },
      {
        "name": "address",
        "type": "VARCHAR(100)"
      },
      {
        "name": "city",
        "type": "VARCHAR(100)"
      },
      {
        "name": "province",
        "type": "VARCHAR(100)"
      },
      {
        "name": "postal_code",
        "type": "VARCHAR(100)"
      },
      {
        "name": "is_active",
        "type": "BOOLEAN"
      },
      {
        "name": "is_terminated",
        "type": "BOOLEAN"
      }
    ]
  },
  {
    "id": "mims_location_items",
    "name": "mims_location_items",
    "domain": "inventory",
    "description": "Sub-inventory mapping stock items to specific warehouse racks and overstock bins.",
    "x": 2700,
    "y": 560,
    "width": 260,
    "columns": [
      {
        "name": "mims_location_id",
        "type": "VARCHAR(20)",
        "isForeignKey": true,
        "references": {
          "table": "mims_location",
          "column": "mims_location_id"
        },
        "isNullable": true,
        "isUnique": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        },
        "isNullable": true,
        "isUnique": true
      },
      {
        "name": "inventory_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "inventory",
          "column": "inventory_id"
        },
        "isNullable": true,
        "isUnique": true
      },
      {
        "name": "quantity",
        "type": "INTEGER"
      },
      {
        "name": "location_type",
        "type": "VARCHAR(50)"
      }
    ]
  },
  {
    "id": "inventory_adjustments",
    "name": "inventory_adjustments",
    "domain": "inventory",
    "description": "Discrepancy reconciliation records requiring managerial sign-off and reason codes.",
    "x": 3040,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "adjustment_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "inventory_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "inventory",
          "column": "inventory_id"
        }
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        }
      },
      {
        "name": "previous_qty",
        "type": "INTEGER"
      },
      {
        "name": "adjusted_qty",
        "type": "INTEGER"
      },
      {
        "name": "reason",
        "type": "TEXT",
        "isNullable": true
      },
      {
        "name": "status",
        "type": "VARCHAR(20)"
      },
      {
        "name": "requested_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        }
      },
      {
        "name": "reviewed_by",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        },
        "isNullable": true
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE"
      },
      {
        "name": "reviewed_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      }
    ]
  },
  {
    "id": "stock_transfer_items",
    "name": "stock_transfer_items",
    "domain": "purchasing",
    "description": "Specific transfer shipment quantities requested, dispatched, and confirmed received.",
    "x": 2700,
    "y": 1000,
    "width": 260,
    "columns": [
      {
        "name": "transfer_item_id",
        "type": "SERIAL",
        "isPrimaryKey": true,
        "isNullable": true
      },
      {
        "name": "transfer_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stock_transfers",
          "column": "transfer_id"
        },
        "isNullable": true
      },
      {
        "name": "product_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "products",
          "column": "product_id"
        },
        "isNullable": true
      },
      {
        "name": "qty_requested",
        "type": "INTEGER"
      },
      {
        "name": "qty_sent",
        "type": "INTEGER",
        "isNullable": true
      },
      {
        "name": "qty_received",
        "type": "INTEGER",
        "isNullable": true
      }
    ]
  },
  {
    "id": "mims_location",
    "name": "mims_location",
    "domain": "inventory",
    "description": "Warehouse bin coordinates following the 00-00-00-000 coordinate binning schema.",
    "x": 2360,
    "y": 560,
    "width": 260,
    "columns": [
      {
        "name": "mims_location_id",
        "type": "VARCHAR(20)",
        "isPrimaryKey": true,
        "isUnique": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        },
        "isNullable": true,
        "isUnique": true
      }
    ]
  },
  {
    "id": "sessions",
    "name": "sessions",
    "domain": "core",
    "description": "Active device and user JWT sessions with dual-token rotation and remote termination.",
    "x": 780,
    "y": 100,
    "width": 260,
    "columns": [
      {
        "name": "session_id",
        "type": "INTEGER",
        "isPrimaryKey": true
      },
      {
        "name": "store_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "stores",
          "column": "store_id"
        }
      },
      {
        "name": "employee_id",
        "type": "INTEGER",
        "isForeignKey": true,
        "references": {
          "table": "employees",
          "column": "employee_id"
        }
      },
      {
        "name": "access_token_hash",
        "type": "TEXT",
        "isUnique": true
      },
      {
        "name": "ip_address",
        "type": "INET"
      },
      {
        "name": "created_at",
        "type": "TIMESTAMP WITH TIME ZONE",
        "isNullable": true
      },
      {
        "name": "expires_at",
        "type": "TIMESTAMP WITH TIME ZONE"
      },
      {
        "name": "refresh_token_hash",
        "type": "TEXT"
      }
    ]
  }
];

export const RADIUS_SCHEMA_RELATIONS: SchemaRelation[] = [
  {
    "id": "rel-stores-manager_id-employees",
    "fromTable": "stores",
    "fromColumn": "manager_id",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-categories-parent_id-categories",
    "fromTable": "categories",
    "fromColumn": "parent_id",
    "toTable": "categories",
    "toColumn": "category_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_order_lprs-po_id-purchase_orders",
    "fromTable": "purchase_order_lprs",
    "fromColumn": "po_id",
    "toTable": "purchase_orders",
    "toColumn": "po_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_order_lprs-received_by-employees",
    "fromTable": "purchase_order_lprs",
    "fromColumn": "received_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-print_orders-store_id-stores",
    "fromTable": "print_orders",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_count_schedule-category_id-categories",
    "fromTable": "cycle_count_schedule",
    "fromColumn": "category_id",
    "toTable": "categories",
    "toColumn": "category_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_count_schedule-created_by-employees",
    "fromTable": "cycle_count_schedule",
    "fromColumn": "created_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_count_schedule-cycle_count_id-cycle_counts",
    "fromTable": "cycle_count_schedule",
    "fromColumn": "cycle_count_id",
    "toTable": "cycle_counts",
    "toColumn": "count_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_count_schedule-store_id-stores",
    "fromTable": "cycle_count_schedule",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_order_lpr_items-lpr_id-purchase_order_lprs",
    "fromTable": "purchase_order_lpr_items",
    "fromColumn": "lpr_id",
    "toTable": "purchase_order_lprs",
    "toColumn": "lpr_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_order_lpr_items-po_item_id-purchase_orders_items",
    "fromTable": "purchase_order_lpr_items",
    "fromColumn": "po_item_id",
    "toTable": "purchase_orders_items",
    "toColumn": "po_item_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-fill_report_items-fill_report_id-fill_reports",
    "fromTable": "fill_report_items",
    "fromColumn": "fill_report_id",
    "toTable": "fill_reports",
    "toColumn": "fill_report_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-fill_report_items-product_id-products",
    "fromTable": "fill_report_items",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-fill_reports-generated_by-employees",
    "fromTable": "fill_reports",
    "fromColumn": "generated_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-fill_reports-store_id-stores",
    "fromTable": "fill_reports",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-transactions-employee_id-employees",
    "fromTable": "transactions",
    "fromColumn": "employee_id",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-transactions-preferred_member_id-preferred_members",
    "fromTable": "transactions",
    "fromColumn": "preferred_member_id",
    "toTable": "preferred_members",
    "toColumn": "member_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-transactions-store_id-stores",
    "fromTable": "transactions",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-online_orders-preferred_member_id-preferred_members",
    "fromTable": "online_orders",
    "fromColumn": "preferred_member_id",
    "toTable": "preferred_members",
    "toColumn": "member_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-online_orders-store_id-stores",
    "fromTable": "online_orders",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_orders_items-po_id-purchase_orders",
    "fromTable": "purchase_orders_items",
    "fromColumn": "po_id",
    "toTable": "purchase_orders",
    "toColumn": "po_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_orders_items-product_id-products",
    "fromTable": "purchase_orders_items",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-transaction_items-product_id-products",
    "fromTable": "transaction_items",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-transaction_items-transaction_id-transactions",
    "fromTable": "transaction_items",
    "fromColumn": "transaction_id",
    "toTable": "transactions",
    "toColumn": "transaction_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_counts-approved_by-employees",
    "fromTable": "cycle_counts",
    "fromColumn": "approved_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_counts-category_id-categories",
    "fromTable": "cycle_counts",
    "fromColumn": "category_id",
    "toTable": "categories",
    "toColumn": "category_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_counts-counted_by-employees",
    "fromTable": "cycle_counts",
    "fromColumn": "counted_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_counts-store_id-stores",
    "fromTable": "cycle_counts",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-products-category_id-categories",
    "fromTable": "products",
    "fromColumn": "category_id",
    "toTable": "categories",
    "toColumn": "category_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory-product_id-products",
    "fromTable": "inventory",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory-store_id-stores",
    "fromTable": "inventory",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-stock_transfers-from_store_id-stores",
    "fromTable": "stock_transfers",
    "fromColumn": "from_store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-stock_transfers-requested_by-employees",
    "fromTable": "stock_transfers",
    "fromColumn": "requested_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-stock_transfers-to_store_id-stores",
    "fromTable": "stock_transfers",
    "fromColumn": "to_store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-mims_scan_log-employee_id-employees",
    "fromTable": "mims_scan_log",
    "fromColumn": "employee_id",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-mims_scan_log-product_id-products",
    "fromTable": "mims_scan_log",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-mims_scan_log-store_id-stores",
    "fromTable": "mims_scan_log",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-product_suppliers-product_id-products",
    "fromTable": "product_suppliers",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-product_suppliers-supplier_id-suppliers",
    "fromTable": "product_suppliers",
    "fromColumn": "supplier_id",
    "toTable": "suppliers",
    "toColumn": "supplier_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_orders-created_by-employees",
    "fromTable": "purchase_orders",
    "fromColumn": "created_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_orders-store_id-stores",
    "fromTable": "purchase_orders",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-purchase_orders-supplier_id-suppliers",
    "fromTable": "purchase_orders",
    "fromColumn": "supplier_id",
    "toTable": "suppliers",
    "toColumn": "supplier_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-online_order_items-order_id-online_orders",
    "fromTable": "online_order_items",
    "fromColumn": "order_id",
    "toTable": "online_orders",
    "toColumn": "order_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-online_order_items-product_id-products",
    "fromTable": "online_order_items",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_transactions-employee_id-employees",
    "fromTable": "inventory_transactions",
    "fromColumn": "employee_id",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_transactions-from_store_id-stores",
    "fromTable": "inventory_transactions",
    "fromColumn": "from_store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_transactions-product_id-products",
    "fromTable": "inventory_transactions",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_transactions-to_store_id-stores",
    "fromTable": "inventory_transactions",
    "fromColumn": "to_store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-print_order_items-print_order_id-print_orders",
    "fromTable": "print_order_items",
    "fromColumn": "print_order_id",
    "toTable": "print_orders",
    "toColumn": "print_order_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_count_items-count_id-cycle_counts",
    "fromTable": "cycle_count_items",
    "fromColumn": "count_id",
    "toTable": "cycle_counts",
    "toColumn": "count_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_count_items-product_id-products",
    "fromTable": "cycle_count_items",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-cycle_count_items-scanned_by-employees",
    "fromTable": "cycle_count_items",
    "fromColumn": "scanned_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-employees-store_id-stores",
    "fromTable": "employees",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-mims_location_items-inventory_id-inventory",
    "fromTable": "mims_location_items",
    "fromColumn": "inventory_id",
    "toTable": "inventory",
    "toColumn": "inventory_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-mims_location_items-mims_location_id-mims_location",
    "fromTable": "mims_location_items",
    "fromColumn": "mims_location_id",
    "toTable": "mims_location",
    "toColumn": "mims_location_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-mims_location_items-store_id-stores",
    "fromTable": "mims_location_items",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_adjustments-inventory_id-inventory",
    "fromTable": "inventory_adjustments",
    "fromColumn": "inventory_id",
    "toTable": "inventory",
    "toColumn": "inventory_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_adjustments-product_id-products",
    "fromTable": "inventory_adjustments",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_adjustments-requested_by-employees",
    "fromTable": "inventory_adjustments",
    "fromColumn": "requested_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_adjustments-reviewed_by-employees",
    "fromTable": "inventory_adjustments",
    "fromColumn": "reviewed_by",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-inventory_adjustments-store_id-stores",
    "fromTable": "inventory_adjustments",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-stock_transfer_items-product_id-products",
    "fromTable": "stock_transfer_items",
    "fromColumn": "product_id",
    "toTable": "products",
    "toColumn": "product_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-stock_transfer_items-transfer_id-stock_transfers",
    "fromTable": "stock_transfer_items",
    "fromColumn": "transfer_id",
    "toTable": "stock_transfers",
    "toColumn": "transfer_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-mims_location-store_id-stores",
    "fromTable": "mims_location",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-sessions-employee_id-employees",
    "fromTable": "sessions",
    "fromColumn": "employee_id",
    "toTable": "employees",
    "toColumn": "employee_id",
    "type": "one-to-many"
  },
  {
    "id": "rel-sessions-store_id-stores",
    "fromTable": "sessions",
    "fromColumn": "store_id",
    "toTable": "stores",
    "toColumn": "store_id",
    "type": "one-to-many"
  }
];
