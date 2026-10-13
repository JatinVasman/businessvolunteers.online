// Business Volunteers Tools Directory Data (106 Standalone Free Tools)
export interface ToolMeta {
  id: string;
  name: string;
  categoryKey: string;
  categoryLabel: string;
  badge: string;
  icon: string;
  description: string;
  isV16?: boolean;
}

export interface ToolCategory {
  key: string;
  label: string;
  icon: string;
  count: number;
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  { key: 'all', label: 'All Tools', icon: '⚡', count: 106 },
  { key: 'ecommerce', label: 'E-Commerce & Sellers', icon: '🛒', count: 27 },
  { key: 'calculators', label: 'Calculators & Finance', icon: '🧮', count: 7 },
  { key: 'pdf', label: 'PDF Utilities', icon: '📄', count: 13 },
  { key: 'images', label: 'Image & Media', icon: '🖼️', count: 8 },
  { key: 'marketing', label: 'Marketing & Social', icon: '📣', count: 9 },
  { key: 'seo', label: 'SEO & Webmaster', icon: '🔍', count: 13 },
  { key: 'qr', label: 'QR & Barcodes', icon: '📱', count: 7 },
  { key: 'dev', label: 'Developer Tools', icon: '💻', count: 8 },
  { key: 'docs', label: 'Documents & Files', icon: '📑', count: 8 },
  { key: 'text', label: 'Text & Content', icon: '✍️', count: 6 }
];

export const ALL_TOOLS: ToolMeta[] = [
  {
    "id": "bulk-product-listing-generator",
    "name": "Bulk Product Listing Generator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Generate editable product titles, bullets and descriptions from product details or a CSV file.",
    "isV16": true
  },
  {
    "id": "inventory-reorder-calculator",
    "name": "Inventory & Reorder Calculator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Estimate stock cover, reorder point and suggested reorder quantity using sales velocity and supplier lead time.",
    "isV16": true
  },
  {
    "id": "marketplace-profit-calculator",
    "name": "Marketplace Profit Calculator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Estimate per-order profit after product cost, shipping, marketplace/payment fees, ads, packaging and GST. All assumptions are editable.",
    "isV16": true
  },
  {
    "id": "product-image-compliance-checker",
    "name": "Product Image Compliance Checker",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Batch-check dimensions, file sizes, formats, aspect ratios and approximate white-background suitability.",
    "isV16": true
  },
  {
    "id": "purchase-order-generator",
    "name": "Purchase Order Generator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Create a clean purchase order with supplier/buyer details, item lines, tax totals and print-ready export.",
    "isV16": true
  },
  {
    "id": "seller-settlement-reconciliation",
    "name": "Seller Settlement Reconciliation",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Compare order exports with settlement payouts and flag missing orders or amount differences.",
    "isV16": true
  },
  {
    "id": "selling-price-calculator",
    "name": "Selling Price Calculator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Work backwards from costs, fees and a target profit margin to estimate a sensible selling price.",
    "isV16": true
  },
  {
    "id": "smart-label-sorter",
    "name": "Smart Label Sorter",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "🛒",
    "description": "Preview label pages, optionally extract text with OCR, edit SKU/size/colour tags and sort before printing.",
    "isV16": true
  },
  {
    "id": "heic-to-jpg",
    "name": "HEIC to JPG Converter",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Convert HEIC/HEIF and common images to JPEG in your browser with a live preview and batch ZIP download.",
    "isV16": true
  },
  {
    "id": "exif-metadata-remover",
    "name": "Image Metadata & EXIF Remover",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Re-export images to strip embedded camera metadata and location tags before sharing.",
    "isV16": true
  },
  {
    "id": "pdf-to-excel",
    "name": "PDF to Excel",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": "Extract PDF text into editable rows and export a spreadsheet. Best for text-based PDFs; inspect the table preview.",
    "isV16": true
  },
  {
    "id": "pdf-to-images",
    "name": "PDF to Images",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": "Render PDF pages as PNG or JPEG at your chosen resolution and download them individually or as a ZIP.",
    "isV16": true
  },
  {
    "id": "pdf-to-word",
    "name": "PDF to Word",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": "Extract PDF text into an editable Word-compatible document. Original layout and tables may need adjustment.",
    "isV16": true
  },
  {
    "id": "broken-link-checker",
    "name": "Broken Link Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Scan links on a public webpage and identify links that appear unreachable using the included optional Vercel API endpoint.",
    "isV16": true
  },
  {
    "id": "hreflang-generator-validator",
    "name": "Hreflang Generator & Validator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Validate locale/URL pairs, catch duplicate language codes and generate hreflang annotations.",
    "isV16": true
  },
  {
    "id": "redirect-chain-checker",
    "name": "Redirect Chain Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Trace HTTP redirect hops and final URL using the included optional Vercel API endpoint.",
    "isV16": true
  },
  {
    "id": "break-even-calculator",
    "name": "Break Even Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "🧮",
    "description": "Break Even Calculator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "discount-calculator",
    "name": "Discount Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "🧮",
    "description": "Discount Calculator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "emi-calculator",
    "name": "EMI Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "🧮",
    "description": "EMI Calculator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "gst-calculator",
    "name": "GST Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "🧮",
    "description": "GST Calculator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "gst-inclusive-exclusive-calculator",
    "name": "GST Inclusive Exclusive Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "🧮",
    "description": "GST Inclusive Exclusive Calculator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "invoice-and-quotation-generator",
    "name": "Invoice and Quotation Generator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "🧮",
    "description": "Invoice and Quotation Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "profit-margin-calculator",
    "name": "Profit Margin Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "🧮",
    "description": "Profit Margin Calculator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "base64-encoder-decoder",
    "name": "Base64 Encoder Decoder",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "Base64 Encoder Decoder: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "color-converter",
    "name": "Color Converter",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "Color Converter: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "html-css-js-minifier",
    "name": "HTML CSS JS Minifier",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "HTML CSS JS Minifier: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "json-formatter",
    "name": "JSON Formatter",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "JSON Formatter: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "regex-tester",
    "name": "Regex Tester",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "Regex Tester: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "timestamp-converter",
    "name": "Timestamp Converter",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "Timestamp Converter: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "url-encoder-decoder",
    "name": "URL Encoder Decoder",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "URL Encoder Decoder: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "uuid-generator",
    "name": "UUID Generator",
    "categoryKey": "dev",
    "categoryLabel": "Developer Utilities",
    "badge": "Developer",
    "icon": "💻",
    "description": "UUID Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "csv-to-json",
    "name": "CSV to JSON",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "CSV to JSON: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "csv-to-xlsx",
    "name": "CSV to XLSX",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "CSV to XLSX: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "html-to-pdf",
    "name": "HTML to PDF",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "HTML to PDF: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "json-to-csv",
    "name": "JSON to CSV",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "JSON to CSV: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "markdown-to-html",
    "name": "Markdown to HTML",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "Markdown to HTML: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "text-to-pdf",
    "name": "Text to PDF",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "Text to PDF: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "xlsx-to-csv",
    "name": "XLSX to CSV",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "XLSX to CSV: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "zip-file-creator",
    "name": "ZIP File Creator",
    "categoryKey": "docs",
    "categoryLabel": "Document & Conversion",
    "badge": "Document",
    "icon": "📑",
    "description": "ZIP File Creator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "compress-image-to-kb",
    "name": "Compress Image to KB",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Compress Image to KB: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "convert-image-to-webp",
    "name": "Convert Image to WebP",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Convert Image to WebP: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "crop-image",
    "name": "Crop Image",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Crop Image: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "image-to-pdf",
    "name": "Image to PDF",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Image to PDF: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "passport-photo-maker",
    "name": "Passport Photo Maker",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Passport Photo Maker: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "resize-image",
    "name": "Resize Image",
    "categoryKey": "images",
    "categoryLabel": "Image & Media Tools",
    "badge": "Image",
    "icon": "🖼️",
    "description": "Resize Image: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "facebook-cover-resizer",
    "name": "Facebook Cover Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "Facebook Cover Resizer: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "google-snippet-preview",
    "name": "Google Snippet Preview",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "Google Snippet Preview: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "instagram-image-resizer",
    "name": "Instagram Image Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "Instagram Image Resizer: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "linkedin-banner-resizer",
    "name": "LinkedIn Banner Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "LinkedIn Banner Resizer: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "reels-and-shorts-resizer",
    "name": "Reels and Shorts Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "Reels and Shorts Resizer: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "social-media-caption-generator",
    "name": "Social Media Caption Generator",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "Social Media Caption Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "utm-builder",
    "name": "UTM Builder",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "UTM Builder: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "whatsapp-link-generator",
    "name": "WhatsApp Link Generator",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "WhatsApp Link Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "youtube-thumbnail-resizer",
    "name": "YouTube Thumbnail Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social Media",
    "badge": "Marketing",
    "icon": "📣",
    "description": "YouTube Thumbnail Resizer: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "add-page-numbers",
    "name": "Add Page Numbers",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Add Page Numbers: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "add-watermark",
    "name": "Add Watermark",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Add Watermark: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "compress-pdf",
    "name": "Compress PDF",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Compress PDF: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "crop-pdf-pages",
    "name": "Crop PDF Pages",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Crop PDF Pages: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "delete-pdf-pages",
    "name": "Delete PDF Pages",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Delete PDF Pages: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "extract-pdf-pages",
    "name": "Extract PDF Pages",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Extract PDF Pages: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "merge-pdf",
    "name": "Merge PDF",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Merge PDF: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "reorder-pdf-pages",
    "name": "Reorder PDF Pages",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Reorder PDF Pages: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "rotate-pdf",
    "name": "Rotate PDF",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Rotate PDF: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "split-pdf",
    "name": "Split PDF",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF Tool",
    "icon": "📄",
    "description": " Split PDF: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "barcode-generator",
    "name": "Barcode Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR Code",
    "icon": "📱",
    "description": "Barcode Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "bulk-qr-code-generator",
    "name": "Bulk QR Code Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR Code",
    "icon": "📱",
    "description": "Bulk QR Code Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "custom-logo-qr-generator",
    "name": "Custom Logo QR Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR Code",
    "icon": "📱",
    "description": "Custom Logo QR Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "qr-code-generator",
    "name": "QR Code Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR Code",
    "icon": "📱",
    "description": "QR Code Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "upi-qr-generator",
    "name": "UPI QR Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR Code",
    "icon": "📱",
    "description": "UPI QR Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "whatsapp-qr-generator",
    "name": "WhatsApp QR Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR Code",
    "icon": "📱",
    "description": "WhatsApp QR Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "wifi-qr-generator",
    "name": "WiFi QR Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR Code",
    "icon": "📱",
    "description": "WiFi QR Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "a4-to-4x6-label-converter",
    "name": "A4 to 4x6 Label Converter",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "A4 to 4x6 Label Converter: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "ajio-label-cropper",
    "name": "AJIO Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "AJIO Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "amazon-label-cropper",
    "name": "Amazon Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Amazon Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "ebay-label-cropper",
    "name": "eBay Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "eBay Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "etsy-label-cropper",
    "name": "Etsy Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Etsy Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "flipkart-label-cropper",
    "name": "Flipkart Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Flipkart Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "jiomart-label-cropper",
    "name": "JioMart Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "JioMart Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "meesho-label-cropper",
    "name": "Meesho Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Meesho Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "multiple-labels-per-page",
    "name": "Multiple Labels per Page",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Multiple Labels per Page: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "myntra-label-cropper",
    "name": "Myntra Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Myntra Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "nykaa-fashion-label-cropper",
    "name": "Nykaa Fashion Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Nykaa Fashion Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "packing-slip-generator",
    "name": "Packing Slip Generator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Packing Slip Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "product-barcode-label-maker",
    "name": "Product Barcode Label Maker",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Product Barcode Label Maker: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "shipping-label-cropper",
    "name": "Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Shipping Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "shipping-label-page-splitter",
    "name": "Shipping Label Page Splitter",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Shipping Label Page Splitter: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "shopify-shipping-label-cropper",
    "name": "Shopify Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Shopify Shipping Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "snapdeal-label-cropper",
    "name": "Snapdeal Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Snapdeal Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "tata-cliq-label-cropper",
    "name": "Tata CLiQ Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "Tata CLiQ Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "woocommerce-shipping-label-cropper",
    "name": "WooCommerce Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "Seller Suite",
    "icon": "📦",
    "description": "WooCommerce Shipping Label Cropper: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "canonical-tag-generator",
    "name": "Canonical Tag Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Generate a canonical link tag for a preferred page URL. Includes a live preview and clean HTML output.",
    "isV16": false
  },
  {
    "id": "dns-lookup",
    "name": "DNS Lookup",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Look up common DNS records over DNS-over-HTTPS. View record values, resolver status and TTL.",
    "isV16": false
  },
  {
    "id": "favicon-generator",
    "name": "Favicon Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Create a downloadable PNG favicon pack in common sizes, preview icons live and copy HTML tags.",
    "isV16": false
  },
  {
    "id": "http-status-redirect-checker",
    "name": "HTTP Status Redirect Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Try a browser-readable HTTP status check or open an external redirect-chain checker when cross-origin access is blocked.",
    "isV16": false
  },
  {
    "id": "meta-title-description-checker",
    "name": "Meta Title Description Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Preview a Google-style search result live and review title and meta description character counts.",
    "isV16": false
  },
  {
    "id": "open-graph-generator",
    "name": "Open Graph Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Generate Open Graph and X/Twitter card tags with a live social sharing preview.",
    "isV16": false
  },
  {
    "id": "robots-txt-generator",
    "name": "Robots.txt Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Create a simple robots.txt file with user-agent, disallow rules and an optional sitemap URL.",
    "isV16": false
  },
  {
    "id": "schema-markup-generator",
    "name": "Schema Markup Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Build JSON-LD for common Schema.org types with optional advanced properties and validation links.",
    "isV16": false
  },
  {
    "id": "sitemap-generator",
    "name": "Sitemap Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Create a same-site XML sitemap from page URLs, with duplicate removal, URL validation and live XML preview.",
    "isV16": false
  },
  {
    "id": "ssl-expiry-checker",
    "name": "SSL Expiry Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "🔍",
    "description": "Open a remote SSL Labs report to inspect certificate validity and TLS configuration for a domain.",
    "isV16": false
  },
  {
    "id": "character-counter",
    "name": "Character Counter",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text Tool",
    "icon": "✍️",
    "description": "Character Counter: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "password-generator",
    "name": "Password Generator",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text Tool",
    "icon": "✍️",
    "description": "Password Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "remove-duplicate-lines",
    "name": "Remove Duplicate Lines",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text Tool",
    "icon": "✍️",
    "description": "Remove Duplicate Lines: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "slug-generator",
    "name": "Slug Generator",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text Tool",
    "icon": "✍️",
    "description": "Slug Generator: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "text-diff-checker",
    "name": "Text Diff Checker",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text Tool",
    "icon": "✍️",
    "description": "Text Diff Checker: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  },
  {
    "id": "word-counter",
    "name": "Word Counter",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text Tool",
    "icon": "✍️",
    "description": "Word Counter: a browser-first tool from Business Volunteers. Configure advanced options, generate results, and export your work.",
    "isV16": false
  }
];

export function getToolById(id: string): ToolMeta | undefined {
  const norm = id.toLowerCase().trim();
  return ALL_TOOLS.find(t => t.id.toLowerCase() === norm);
}

export function getToolsByCategory(cat: string): ToolMeta[] {
  if (!cat || cat === 'all') return ALL_TOOLS;
  return ALL_TOOLS.filter(t => t.categoryKey === cat);
}
