// Business Volunteers Tools Directory Data (106 Standalone Free Tools)
// 100% Client-Side Processing • Complete Privacy • No Watermarks

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolMeta {
  id: string;
  slug: string;
  name: string;
  categoryKey: string;
  categoryLabel: string;
  badge: string;
  icon: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  relatedTools: string[];
  faq: ToolFaq[];
  isNew?: boolean;
}

export interface ToolCategory {
  key: string;
  label: string;
  icon: string;
  count: number;
}

export const ALL_TOOLS: ToolMeta[] = [
  {
    "id": "gst-calculator",
    "slug": "gst-calculator",
    "name": "GST Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "\ud83e\uddee",
    "description": "Calculate CGST, SGST, IGST tax amounts, base price and net total with Indian GST tax slab presets (0%, 5%, 12%, 18%, 28%).",
    "seoTitle": "GST Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Calculate CGST, SGST, IGST tax amounts, base price and net total with Indian GST tax slab presets (0%, 5%, 12%, 18%, 28%). 100% free, private in-browser processing.",
    "keywords": [
      "gst calculator",
      "cgst sgst igst",
      "gst india",
      "tax calculator"
    ],
    "relatedTools": [
      "gst-inclusive-exclusive-calculator",
      "emi-calculator",
      "discount-calculator",
      "profit-margin-calculator"
    ],
    "faq": [
      {
        "question": "How are CGST and SGST calculated for intra-state transactions?",
        "answer": "For sales within the same Indian state, GST is split equally into 50% Central GST (CGST) and 50% State GST (SGST)."
      },
      {
        "question": "When does IGST apply?",
        "answer": "Integrated GST (IGST) applies on inter-state transactions where goods or services move across state borders."
      },
      {
        "question": "Are my financial calculations saved or sent anywhere?",
        "answer": "No. All calculation happens 100% inside your browser using JavaScript. No financial data leaves your device."
      }
    ]
  },
  {
    "id": "gst-inclusive-exclusive-calculator",
    "slug": "gst-inclusive-exclusive-calculator",
    "name": "GST Inclusive / Exclusive Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "\ud83e\uddee",
    "description": "Calculate backwards from gross price to find exact pre-tax base cost and reverse tax component, or forward to add GST.",
    "seoTitle": "GST Inclusive / Exclusive Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Calculate backwards from gross price to find exact pre-tax base cost and reverse tax component, or forward to add GST. 100% free, private in-browser processing.",
    "keywords": [
      "reverse gst",
      "gst inclusive exclusive",
      "pre tax price calculator",
      "gst reverse calculation"
    ],
    "relatedTools": [
      "gst-calculator",
      "emi-calculator",
      "discount-calculator",
      "profit-margin-calculator"
    ],
    "faq": [
      {
        "question": "What is the formula for reverse GST calculation?",
        "answer": "Base Price = Total Inclusive Price / (1 + GST Rate / 100). The GST amount is Total Price minus Base Price."
      },
      {
        "question": "Can I calculate for any custom tax rate?",
        "answer": "Yes, you can choose standard Indian GST rates (5%, 12%, 18%, 28%) or enter any custom percentage rate."
      }
    ]
  },
  {
    "id": "emi-calculator",
    "slug": "emi-calculator",
    "name": "EMI Calculator & Loan Amortization",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "\ud83e\uddee",
    "description": "Compute monthly loan EMI, total interest payable, overall payment breakdown, and generate a complete month-by-month amortization schedule.",
    "seoTitle": "EMI Calculator & Loan Amortization \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Compute monthly loan EMI, total interest payable, overall payment breakdown, and generate a complete month-by-month amortization schedule. 100% free, private in-browser processing.",
    "keywords": [
      "emi calculator",
      "loan emi",
      "amortization schedule",
      "home loan emi",
      "car loan emi"
    ],
    "relatedTools": [
      "gst-calculator",
      "gst-inclusive-exclusive-calculator",
      "discount-calculator",
      "profit-margin-calculator"
    ],
    "faq": [
      {
        "question": "What formula is used for EMI calculation?",
        "answer": "EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure in months."
      },
      {
        "question": "Can I download the amortization table?",
        "answer": "Yes, you can export the full month-by-month and year-by-year schedule as a CSV spreadsheet."
      }
    ]
  },
  {
    "id": "discount-calculator",
    "slug": "discount-calculator",
    "name": "Discount & Stacked Offer Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "\ud83e\uddee",
    "description": "Calculate final sale price, savings amount, and stacked discounts (e.g. 20% off + extra 10% coupon) with optional post-discount tax.",
    "seoTitle": "Discount & Stacked Offer Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Calculate final sale price, savings amount, and stacked discounts (e.g. 20% off + extra 10% coupon) with optional post-discount tax. 100% free, private in-browser processing.",
    "keywords": [
      "discount calculator",
      "stacked discount",
      "percentage off",
      "sale price calculator"
    ],
    "relatedTools": [
      "gst-calculator",
      "gst-inclusive-exclusive-calculator",
      "emi-calculator",
      "profit-margin-calculator"
    ],
    "faq": [
      {
        "question": "How does stacked discount work?",
        "answer": "A second discount is applied sequentially to the already-discounted price rather than simply adding the percentages together."
      },
      {
        "question": "Can I calculate GST after discount?",
        "answer": "Yes, the tool allows applying an optional tax rate after single or multiple stacked discounts are deducted."
      }
    ]
  },
  {
    "id": "profit-margin-calculator",
    "slug": "profit-margin-calculator",
    "name": "Profit Margin & Markup Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "\ud83e\uddee",
    "description": "Evaluate gross margin percentage, markup percentage, revenue and net profit from unit cost and selling price.",
    "seoTitle": "Profit Margin & Markup Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Evaluate gross margin percentage, markup percentage, revenue and net profit from unit cost and selling price. 100% free, private in-browser processing.",
    "keywords": [
      "profit margin calculator",
      "margin vs markup",
      "gross margin",
      "retail markup"
    ],
    "relatedTools": [
      "gst-calculator",
      "gst-inclusive-exclusive-calculator",
      "emi-calculator",
      "discount-calculator"
    ],
    "faq": [
      {
        "question": "What is the difference between margin and markup?",
        "answer": "Profit Margin is profit divided by selling price (expressed as %). Markup is profit divided by cost price."
      },
      {
        "question": "Can I enter target margin to calculate selling price?",
        "answer": "Yes, you can calculate either margin from price, or price from target margin and cost."
      }
    ]
  },
  {
    "id": "break-even-calculator",
    "slug": "break-even-calculator",
    "name": "Break-Even Analysis Calculator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "\ud83e\uddee",
    "description": "Calculate the exact unit sales and gross revenue needed to cover fixed overhead and variable unit costs.",
    "seoTitle": "Break-Even Analysis Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Calculate the exact unit sales and gross revenue needed to cover fixed overhead and variable unit costs. 100% free, private in-browser processing.",
    "keywords": [
      "break even calculator",
      "break even point",
      "bep units",
      "contribution margin"
    ],
    "relatedTools": [
      "gst-calculator",
      "gst-inclusive-exclusive-calculator",
      "emi-calculator",
      "discount-calculator"
    ],
    "faq": [
      {
        "question": "What is Break-Even Point (BEP)?",
        "answer": "BEP is the point where total revenue equals total costs (fixed + variable), resulting in zero net profit or loss."
      },
      {
        "question": "How is contribution margin calculated?",
        "answer": "Contribution margin per unit is Selling Price minus Variable Cost per unit."
      }
    ]
  },
  {
    "id": "invoice-and-quotation-generator",
    "slug": "invoice-and-quotation-generator",
    "name": "GST Invoice & Quotation Generator",
    "categoryKey": "calculators",
    "categoryLabel": "Calculators & Finance",
    "badge": "Finance",
    "icon": "\ud83e\uddee",
    "description": "Create professional GST-compliant tax invoices and quotations with itemized HSN codes, tax splits, terms, and instant PDF download.",
    "seoTitle": "GST Invoice & Quotation Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Create professional GST-compliant tax invoices and quotations with itemized HSN codes, tax splits, terms, and instant PDF download. 100% free, private in-browser processing.",
    "keywords": [
      "invoice generator",
      "gst invoice maker",
      "free quotation generator",
      "printable gst bill"
    ],
    "relatedTools": [
      "gst-calculator",
      "gst-inclusive-exclusive-calculator",
      "emi-calculator",
      "discount-calculator"
    ],
    "faq": [
      {
        "question": "Does this support Indian GST compliance?",
        "answer": "Yes, it supports Seller/Buyer GSTIN, State code, HSN/SAC codes, CGST/SGST/IGST breakdown, and auto amount in words."
      },
      {
        "question": "Can I save my invoice as PDF?",
        "answer": "Yes, you can generate and download a clean, print-ready PDF invoice directly from your browser."
      }
    ]
  },
  {
    "id": "word-counter",
    "slug": "word-counter",
    "name": "Word & Content Counter",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text",
    "icon": "\u270d\ufe0f",
    "description": "Analyze text in real time with counts for words, characters (with/without spaces), sentences, paragraphs, reading time, and keyword density.",
    "seoTitle": "Word & Content Counter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Analyze text in real time with counts for words, characters (with/without spaces), sentences, paragraphs, reading time, and keyword density. 100% free, private in-browser processing.",
    "keywords": [
      "word counter",
      "character count",
      "reading time estimator",
      "keyword density"
    ],
    "relatedTools": [
      "character-counter",
      "remove-duplicate-lines",
      "slug-generator",
      "text-diff-checker"
    ],
    "faq": [
      {
        "question": "How is reading time calculated?",
        "answer": "Reading time is based on an average adult reading speed of 200 words per minute."
      },
      {
        "question": "Does it detect duplicate or top keywords?",
        "answer": "Yes, it automatically parses top 1-word and 2-word keyword frequencies and percentages."
      }
    ]
  },
  {
    "id": "character-counter",
    "slug": "character-counter",
    "name": "Character & Social Limit Counter",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text",
    "icon": "\u270d\ufe0f",
    "description": "Live character counting with platform safe limits for Twitter/X (280), Meta (63,206), LinkedIn (3,000), SMS (160), and Google SERP titles (60).",
    "seoTitle": "Character & Social Limit Counter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Live character counting with platform safe limits for Twitter/X (280), Meta (63,206), LinkedIn (3,000), SMS (160), and Google SERP titles (60). 100% free, private in-browser processing.",
    "keywords": [
      "character counter",
      "twitter char limit",
      "sms length calculator",
      "meta description length"
    ],
    "relatedTools": [
      "word-counter",
      "remove-duplicate-lines",
      "slug-generator",
      "text-diff-checker"
    ],
    "faq": [
      {
        "question": "Does it count spaces and newlines?",
        "answer": "Yes, it displays total characters, characters excluding spaces, whitespace count, and line break counts."
      },
      {
        "question": "Which social platforms are benchmarked?",
        "answer": "Twitter/X, SMS/GSM segment count, LinkedIn post, Instagram caption, and Google SEO Title/Description."
      }
    ]
  },
  {
    "id": "remove-duplicate-lines",
    "slug": "remove-duplicate-lines",
    "name": "Remove Duplicate Lines",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text",
    "icon": "\u270d\ufe0f",
    "description": "Deduplicate text lists, customer emails, SKUs, and URLs with options for case sensitivity, whitespace trimming, and alphabetical sorting.",
    "seoTitle": "Remove Duplicate Lines \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Deduplicate text lists, customer emails, SKUs, and URLs with options for case sensitivity, whitespace trimming, and alphabetical sorting. 100% free, private in-browser processing.",
    "keywords": [
      "remove duplicate lines",
      "deduplicate list",
      "unique lines",
      "text cleaner"
    ],
    "relatedTools": [
      "word-counter",
      "character-counter",
      "slug-generator",
      "text-diff-checker"
    ],
    "faq": [
      {
        "question": "Can it trim whitespace around lines before deduplication?",
        "answer": "Yes, enable 'Trim whitespace' to treat 'abc' and '  abc  ' as the same duplicate line."
      },
      {
        "question": "Can I sort the unique output?",
        "answer": "Yes, you can preserve original order, sort A to Z, sort Z to A, or sort by line length."
      }
    ]
  },
  {
    "id": "slug-generator",
    "slug": "slug-generator",
    "name": "URL Slug Generator",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text",
    "icon": "\u270d\ufe0f",
    "description": "Convert article headlines and product titles into clean, URL-safe, SEO-friendly slugs with custom separators and stop-word filters.",
    "seoTitle": "URL Slug Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert article headlines and product titles into clean, URL-safe, SEO-friendly slugs with custom separators and stop-word filters. 100% free, private in-browser processing.",
    "keywords": [
      "slug generator",
      "url slugify",
      "seo slug creator",
      "clean url"
    ],
    "relatedTools": [
      "word-counter",
      "character-counter",
      "remove-duplicate-lines",
      "text-diff-checker"
    ],
    "faq": [
      {
        "question": "How does it handle accented characters and symbols?",
        "answer": "Accented unicode characters (e.g. \u00e9, \u00fc, \u00e7) are normalized into ASCII equivalents and special punctuation is stripped."
      },
      {
        "question": "Can I customize the separator?",
        "answer": "Yes, choose between hyphens (-), underscores (_), dots (.), or remove spaces entirely."
      }
    ]
  },
  {
    "id": "text-diff-checker",
    "slug": "text-diff-checker",
    "name": "Text Diff & Comparison Checker",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text",
    "icon": "\u270d\ufe0f",
    "description": "Compare two text snippets or code blocks side-by-side or inline with visual highlighting of additions, deletions, and line changes.",
    "seoTitle": "Text Diff & Comparison Checker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Compare two text snippets or code blocks side-by-side or inline with visual highlighting of additions, deletions, and line changes. 100% free, private in-browser processing.",
    "keywords": [
      "text diff",
      "diff checker",
      "compare text online",
      "code diff"
    ],
    "relatedTools": [
      "word-counter",
      "character-counter",
      "remove-duplicate-lines",
      "slug-generator"
    ],
    "faq": [
      {
        "question": "Does it highlight word-level or character-level changes?",
        "answer": "It provides line-by-line diff with granular word-level addition/deletion highlight tags."
      },
      {
        "question": "Is my text uploaded to any server?",
        "answer": "Never. Text diff comparison runs 100% locally in your browser memory."
      }
    ]
  },
  {
    "id": "password-generator",
    "slug": "password-generator",
    "name": "Secure Password & Passphrase Generator",
    "categoryKey": "text",
    "categoryLabel": "Text & Content",
    "badge": "Text",
    "icon": "\u270d\ufe0f",
    "description": "Generate cryptographically secure passwords and memorable diceware passphrases using browser window.crypto with live entropy meter.",
    "seoTitle": "Secure Password & Passphrase Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate cryptographically secure passwords and memorable diceware passphrases using browser window.crypto with live entropy meter. 100% free, private in-browser processing.",
    "keywords": [
      "password generator",
      "secure password",
      "passphrase generator",
      "crypto random password"
    ],
    "relatedTools": [
      "word-counter",
      "character-counter",
      "remove-duplicate-lines",
      "slug-generator"
    ],
    "faq": [
      {
        "question": "Is this generator cryptographically secure?",
        "answer": "Yes. It uses the browser's native window.crypto.getRandomValues() CSPRNG rather than Math.random()."
      },
      {
        "question": "What is passphrase mode?",
        "answer": "Passphrase mode strings together 4-6 random dictionary words separated by hyphens for high security that is easy to memorize."
      }
    ]
  },
  {
    "id": "json-formatter",
    "slug": "json-formatter",
    "name": "JSON Formatter, Validator & Tree Viewer",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Prettify, minify, validate, and inspect JSON with exact line-and-column error pointers, schema tree viewing, and clipboard copy.",
    "seoTitle": "JSON Formatter, Validator & Tree Viewer \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Prettify, minify, validate, and inspect JSON with exact line-and-column error pointers, schema tree viewing, and clipboard copy. 100% free, private in-browser processing.",
    "keywords": [
      "json formatter",
      "json validator",
      "prettify json",
      "minify json",
      "json tree"
    ],
    "relatedTools": [
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "uuid-generator",
      "regex-tester"
    ],
    "faq": [
      {
        "question": "What happens when JSON has a syntax error?",
        "answer": "The validator highlights the exact line number, column position, and reason for the parse failure."
      },
      {
        "question": "Can it minify large JSON files?",
        "answer": "Yes, minification removes all whitespace and line breaks for minimum payload size."
      }
    ]
  },
  {
    "id": "base64-encoder-decoder",
    "slug": "base64-encoder-decoder",
    "name": "Base64 Encoder / Decoder (Text & Files)",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Encode and decode plain text or binary files into standard and URL-safe Base64 strings with live preview and download.",
    "seoTitle": "Base64 Encoder / Decoder (Text & Files) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Encode and decode plain text or binary files into standard and URL-safe Base64 strings with live preview and download. 100% free, private in-browser processing.",
    "keywords": [
      "base64 encoder",
      "base64 decoder",
      "url safe base64",
      "image to base64"
    ],
    "relatedTools": [
      "json-formatter",
      "url-encoder-decoder",
      "uuid-generator",
      "regex-tester"
    ],
    "faq": [
      {
        "question": "Does it support URL-safe Base64?",
        "answer": "Yes, toggling URL-safe replaces '+' with '-' and '/' with '_', and strips trailing '=' padding."
      },
      {
        "question": "Can I encode binary files or images?",
        "answer": "Yes, drag and drop any image or file to instantly generate its base64 data URI."
      }
    ]
  },
  {
    "id": "url-encoder-decoder",
    "slug": "url-encoder-decoder",
    "name": "URL & Query Parameter Encoder / Decoder",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Encode or decode query strings, full URLs, and URI components conforming to RFC 3986 with parsed parameter breakdown.",
    "seoTitle": "URL & Query Parameter Encoder / Decoder \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Encode or decode query strings, full URLs, and URI components conforming to RFC 3986 with parsed parameter breakdown. 100% free, private in-browser processing.",
    "keywords": [
      "url encode",
      "url decode",
      "uri component encoder",
      "query string parser"
    ],
    "relatedTools": [
      "json-formatter",
      "base64-encoder-decoder",
      "uuid-generator",
      "regex-tester"
    ],
    "faq": [
      {
        "question": "What is the difference between encodeURI and encodeURIComponent?",
        "answer": "encodeURI preserves protocol and slashes (:/?#&=), whereas encodeURIComponent escapes reserved characters for safe query parameter values."
      },
      {
        "question": "Does it parse query parameters?",
        "answer": "Yes, it decodes the URL into a key-value parameter table for easy editing."
      }
    ]
  },
  {
    "id": "uuid-generator",
    "slug": "uuid-generator",
    "name": "UUID / GUID Generator (v4 & v7)",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Generate RFC 4122 random UUID v4 and time-ordered UUID v7 identifiers in bulk with uppercase, lowercase, and hyphen options.",
    "seoTitle": "UUID / GUID Generator (v4 & v7) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate RFC 4122 random UUID v4 and time-ordered UUID v7 identifiers in bulk with uppercase, lowercase, and hyphen options. 100% free, private in-browser processing.",
    "keywords": [
      "uuid generator",
      "guid generator",
      "uuid v4",
      "uuid v7",
      "bulk uuid"
    ],
    "relatedTools": [
      "json-formatter",
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "regex-tester"
    ],
    "faq": [
      {
        "question": "What is the difference between UUID v4 and v7?",
        "answer": "UUID v4 is completely random, while UUID v7 incorporates a millisecond timestamp prefix, making it sortable and optimal for database primary keys."
      },
      {
        "question": "Can I generate up to 500 UUIDs at once?",
        "answer": "Yes, set the bulk count slider to generate up to 500 unique IDs in one click."
      }
    ]
  },
  {
    "id": "regex-tester",
    "slug": "regex-tester",
    "name": "Regular Expression Tester & Debugger",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Test JavaScript regex patterns against sample text with live color match highlighting, capture group extraction, and flag toggles.",
    "seoTitle": "Regular Expression Tester & Debugger \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Test JavaScript regex patterns against sample text with live color match highlighting, capture group extraction, and flag toggles. 100% free, private in-browser processing.",
    "keywords": [
      "regex tester",
      "regular expression",
      "regex match",
      "regex flags"
    ],
    "relatedTools": [
      "json-formatter",
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "uuid-generator"
    ],
    "faq": [
      {
        "question": "Which regex engine is used?",
        "answer": "It runs the browser's native JavaScript RegExp engine supporting flags g, i, m, s, u, and y."
      },
      {
        "question": "Does it show capture groups?",
        "answer": "Yes, all numbered and named capture groups for each match are listed in a structured results table."
      }
    ]
  },
  {
    "id": "timestamp-converter",
    "slug": "timestamp-converter",
    "name": "Unix Timestamp & Epoch Converter",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Convert Unix epoch seconds and milliseconds to human-readable dates in UTC, IST (India), local time, and ISO 8601 with relative time display.",
    "seoTitle": "Unix Timestamp & Epoch Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert Unix epoch seconds and milliseconds to human-readable dates in UTC, IST (India), local time, and ISO 8601 with relative time display. 100% free, private in-browser processing.",
    "keywords": [
      "unix timestamp converter",
      "epoch converter",
      "epoch to date",
      "current unix timestamp"
    ],
    "relatedTools": [
      "json-formatter",
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "uuid-generator"
    ],
    "faq": [
      {
        "question": "Does it support both seconds and milliseconds?",
        "answer": "Yes, the tool auto-detects whether the input is 10 digits (seconds) or 13 digits (milliseconds)."
      },
      {
        "question": "Can I convert from a calendar date back to timestamp?",
        "answer": "Yes, pick any date and time on the interactive picker to generate the corresponding epoch value."
      }
    ]
  },
  {
    "id": "color-converter",
    "slug": "color-converter",
    "name": "Color Converter & Contrast Checker",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Convert colors seamlessly across HEX, RGB, HSL, HSV, and CMYK formats with WCAG 2.1 AA/AAA contrast ratio evaluation.",
    "seoTitle": "Color Converter & Contrast Checker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert colors seamlessly across HEX, RGB, HSL, HSV, and CMYK formats with WCAG 2.1 AA/AAA contrast ratio evaluation. 100% free, private in-browser processing.",
    "keywords": [
      "color converter",
      "hex to rgb",
      "rgb to hsl",
      "contrast checker",
      "wcag contrast"
    ],
    "relatedTools": [
      "json-formatter",
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "uuid-generator"
    ],
    "faq": [
      {
        "question": "What WCAG contrast standards are checked?",
        "answer": "It calculates the contrast ratio against white and black backgrounds, rating Normal Text (4.5:1) and Large Text (3:1) for AA and AAA compliance."
      },
      {
        "question": "Can I copy CSS variables directly?",
        "answer": "Yes, each color format has a 1-click copy button for CSS property syntax."
      }
    ]
  },
  {
    "id": "html-css-js-minifier",
    "slug": "html-css-js-minifier",
    "name": "HTML, CSS & JavaScript Code Minifier",
    "categoryKey": "dev",
    "categoryLabel": "Developer Tools",
    "badge": "Developer",
    "icon": "\ud83d\udcbb",
    "description": "Strip comments, collapse extraneous whitespace, and compress HTML, CSS, or JS code client-side with size reduction metrics.",
    "seoTitle": "HTML, CSS & JavaScript Code Minifier \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Strip comments, collapse extraneous whitespace, and compress HTML, CSS, or JS code client-side with size reduction metrics. 100% free, private in-browser processing.",
    "keywords": [
      "html minifier",
      "css minifier",
      "js minifier",
      "code compressor"
    ],
    "relatedTools": [
      "json-formatter",
      "base64-encoder-decoder",
      "url-encoder-decoder",
      "uuid-generator"
    ],
    "faq": [
      {
        "question": "Is minification safe for production code?",
        "answer": "Yes, comments and non-essential formatting whitespace are stripped while preserving semantics and string literals."
      },
      {
        "question": "Does it show the byte savings?",
        "answer": "Yes, it reports original size, minified size, bytes saved, and the percentage reduction achieved."
      }
    ]
  },
  {
    "id": "qr-code-generator",
    "slug": "qr-code-generator",
    "name": "QR Code Generator (Custom Colors & High Res)",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR & Barcodes",
    "icon": "\ud83d\udcf1",
    "description": "Generate custom high-resolution QR codes for websites, plain text, emails, phones, and SMS with custom foreground/background colors and PNG/SVG download.",
    "seoTitle": "QR Code Generator (Custom Colors & High Res) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate custom high-resolution QR codes for websites, plain text, emails, phones, and SMS with custom foreground/background colors and PNG/SVG download. 100% free, private in-browser processing.",
    "keywords": [
      "qr code generator",
      "free qr maker",
      "custom color qr",
      "high res qr code"
    ],
    "relatedTools": [
      "custom-logo-qr-generator",
      "bulk-qr-code-generator",
      "upi-qr-generator",
      "whatsapp-qr-generator"
    ],
    "faq": [
      {
        "question": "Can I download QR codes in vector SVG format?",
        "answer": "Yes, you can export your QR code as high-resolution PNG or crisp scalable SVG."
      },
      {
        "question": "What error correction level should I choose?",
        "answer": "Level M (15%) is great for general use; choose Level H (30%) if you plan on printing or adding logos."
      }
    ]
  },
  {
    "id": "custom-logo-qr-generator",
    "slug": "custom-logo-qr-generator",
    "name": "Custom Logo QR Code Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR & Barcodes",
    "icon": "\ud83d\udcf1",
    "description": "Embed your brand logo or icon into the center of a scannable QR code with automatic High (Level H) error correction and scan-safety padding.",
    "seoTitle": "Custom Logo QR Code Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Embed your brand logo or icon into the center of a scannable QR code with automatic High (Level H) error correction and scan-safety padding. 100% free, private in-browser processing.",
    "keywords": [
      "qr code with logo",
      "brand qr code",
      "custom logo qr",
      "logo in qr"
    ],
    "relatedTools": [
      "qr-code-generator",
      "bulk-qr-code-generator",
      "upi-qr-generator",
      "whatsapp-qr-generator"
    ],
    "faq": [
      {
        "question": "Will adding a logo make the QR unscannable?",
        "answer": "The generator automatically applies Level H error correction (30% redundancy) and scales the logo to safe proportions (20-22% area) with an opaque buffer ring."
      },
      {
        "question": "Which logo file formats are accepted?",
        "answer": "PNG, JPEG, WebP, and SVG logos can be uploaded directly."
      }
    ]
  },
  {
    "id": "bulk-qr-code-generator",
    "slug": "bulk-qr-code-generator",
    "name": "Bulk QR Code Generator (CSV to ZIP)",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR & Barcodes",
    "icon": "\ud83d\udcf1",
    "description": "Upload a CSV spreadsheet or list of URLs/SKUs and generate hundreds of high-res QR codes bundled into a single downloadable ZIP file.",
    "seoTitle": "Bulk QR Code Generator (CSV to ZIP) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Upload a CSV spreadsheet or list of URLs/SKUs and generate hundreds of high-res QR codes bundled into a single downloadable ZIP file. 100% free, private in-browser processing.",
    "keywords": [
      "bulk qr generator",
      "csv qr code",
      "batch qr code generator",
      "mass qr code creator"
    ],
    "relatedTools": [
      "qr-code-generator",
      "custom-logo-qr-generator",
      "upi-qr-generator",
      "whatsapp-qr-generator"
    ],
    "faq": [
      {
        "question": "How should my CSV file be formatted?",
        "answer": "Simply provide one item per row, or a CSV with a column containing the URL, text, or SKU to encode. The filename is generated from the second column or row number."
      },
      {
        "question": "What is the maximum number of QR codes per batch?",
        "answer": "You can process hundreds of QR codes smoothly in your browser with live progress tracking."
      }
    ]
  },
  {
    "id": "upi-qr-generator",
    "slug": "upi-qr-generator",
    "name": "UPI Payment QR Code Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR & Barcodes",
    "icon": "\ud83d\udcf1",
    "description": "Generate NPCI-compliant UPI payment QR codes for Google Pay, PhonePe, Paytm, and BHIM with prefilled VPA, payee name, amount, and transaction note.",
    "seoTitle": "UPI Payment QR Code Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate NPCI-compliant UPI payment QR codes for Google Pay, PhonePe, Paytm, and BHIM with prefilled VPA, payee name, amount, and transaction note. 100% free, private in-browser processing.",
    "keywords": [
      "upi qr generator",
      "bhim upi qr",
      "phonepe qr maker",
      "gpay qr generator"
    ],
    "relatedTools": [
      "qr-code-generator",
      "custom-logo-qr-generator",
      "bulk-qr-code-generator",
      "whatsapp-qr-generator"
    ],
    "faq": [
      {
        "question": "Does this work with all Indian UPI apps?",
        "answer": "Yes, it creates a standard upi://pay URI compatible with Google Pay, PhonePe, Paytm, Cred, and BHIM."
      },
      {
        "question": "Can I leave the amount empty for dynamic buyer entry?",
        "answer": "Yes, leaving the amount blank allows the customer to enter any payment amount upon scanning."
      }
    ]
  },
  {
    "id": "whatsapp-qr-generator",
    "slug": "whatsapp-qr-generator",
    "name": "WhatsApp Direct Chat QR Code Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR & Barcodes",
    "icon": "\ud83d\udcf1",
    "description": "Create a scannable QR code that instantly opens a WhatsApp chat with your business phone number and prefilled greeting message.",
    "seoTitle": "WhatsApp Direct Chat QR Code Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Create a scannable QR code that instantly opens a WhatsApp chat with your business phone number and prefilled greeting message. 100% free, private in-browser processing.",
    "keywords": [
      "whatsapp qr code",
      "whatsapp chat qr",
      "wa me qr generator",
      "whatsapp business qr"
    ],
    "relatedTools": [
      "qr-code-generator",
      "custom-logo-qr-generator",
      "bulk-qr-code-generator",
      "upi-qr-generator"
    ],
    "faq": [
      {
        "question": "Do I need the international country code?",
        "answer": "Yes, enter your number with country code (e.g. 91 for India) without '+' or leading zeros."
      },
      {
        "question": "Does it open WhatsApp directly on mobile?",
        "answer": "Yes, scanning the QR opens WhatsApp mobile app immediately or WhatsApp Web on desktop."
      }
    ]
  },
  {
    "id": "wifi-qr-generator",
    "slug": "wifi-qr-generator",
    "name": "WiFi Network Connection QR Code Generator",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR & Barcodes",
    "icon": "\ud83d\udcf1",
    "description": "Generate a printable WiFi connection QR code for guests and customers to join your WPA/WPA2/WPA3 network without typing passwords.",
    "seoTitle": "WiFi Network Connection QR Code Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate a printable WiFi connection QR code for guests and customers to join your WPA/WPA2/WPA3 network without typing passwords. 100% free, private in-browser processing.",
    "keywords": [
      "wifi qr code",
      "wifi qr generator",
      "guest wifi qr",
      "connect to wifi qr"
    ],
    "relatedTools": [
      "qr-code-generator",
      "custom-logo-qr-generator",
      "bulk-qr-code-generator",
      "upi-qr-generator"
    ],
    "faq": [
      {
        "question": "How does guest scanning work?",
        "answer": "Guests scan the QR code with their native iOS or Android camera and tap 'Join Network' to connect automatically."
      },
      {
        "question": "Are hidden WiFi networks supported?",
        "answer": "Yes, toggle the 'Hidden Network' option if your SSID broadcast is disabled."
      }
    ]
  },
  {
    "id": "barcode-generator",
    "slug": "barcode-generator",
    "name": "Barcode Generator (Code 128, EAN-13, UPC-A)",
    "categoryKey": "qr",
    "categoryLabel": "QR & Barcodes",
    "badge": "QR & Barcodes",
    "icon": "\ud83d\udcf1",
    "description": "Create standard retail and logistics linear barcodes including Code 128, EAN-13, EAN-8, UPC-A, and Code 39 with automatic checksum calculation.",
    "seoTitle": "Barcode Generator (Code 128, EAN-13, UPC-A) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Create standard retail and logistics linear barcodes including Code 128, EAN-13, EAN-8, UPC-A, and Code 39 with automatic checksum calculation. 100% free, private in-browser processing.",
    "keywords": [
      "barcode generator",
      "code 128 barcode",
      "ean 13 generator",
      "upc barcode maker"
    ],
    "relatedTools": [
      "qr-code-generator",
      "custom-logo-qr-generator",
      "bulk-qr-code-generator",
      "upi-qr-generator"
    ],
    "faq": [
      {
        "question": "Does it calculate the EAN-13 check digit automatically?",
        "answer": "Yes, if you enter a 12-digit number, the tool computes and appends the official modulo-10 checksum digit automatically."
      },
      {
        "question": "Which format is best for general inventory and SKUs?",
        "answer": "Code 128 is the industry standard for general alphanumeric inventory labels and warehouse tracking."
      }
    ]
  },
  {
    "id": "resize-image",
    "slug": "resize-image",
    "name": "Batch Image Resizer (Pixels & Percent)",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Resize single or multiple images to exact pixel dimensions or percentage scale while preserving aspect ratio and visual clarity.",
    "seoTitle": "Batch Image Resizer (Pixels & Percent) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Resize single or multiple images to exact pixel dimensions or percentage scale while preserving aspect ratio and visual clarity. 100% free, private in-browser processing.",
    "keywords": [
      "resize image",
      "image resizer",
      "scale photo",
      "batch image resize"
    ],
    "relatedTools": [
      "crop-image",
      "compress-image-to-kb",
      "convert-image-to-webp",
      "image-to-pdf"
    ],
    "faq": [
      {
        "question": "Can I lock the aspect ratio?",
        "answer": "Yes, keep the aspect ratio lock checked so modifying width automatically recalculates proportional height."
      },
      {
        "question": "What image formats are supported?",
        "answer": "PNG, JPEG, WebP, GIF, and SVG images are supported with instant download."
      }
    ]
  },
  {
    "id": "crop-image",
    "slug": "crop-image",
    "name": "Visual Image Cropper",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Crop photos with visual drag-and-drop bounding boxes, aspect ratio presets (1:1 Square, 4:3, 16:9, 4:5 Portrait), and pixel-exact export.",
    "seoTitle": "Visual Image Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop photos with visual drag-and-drop bounding boxes, aspect ratio presets (1:1 Square, 4:3, 16:9, 4:5 Portrait), and pixel-exact export. 100% free, private in-browser processing.",
    "keywords": [
      "crop image",
      "image cropper",
      "photo crop online",
      "aspect ratio crop"
    ],
    "relatedTools": [
      "resize-image",
      "compress-image-to-kb",
      "convert-image-to-webp",
      "image-to-pdf"
    ],
    "faq": [
      {
        "question": "Can I freely crop without an aspect ratio constraint?",
        "answer": "Yes, select 'Freeform' to crop any rectangular selection freely."
      },
      {
        "question": "Is the original image quality preserved?",
        "answer": "Yes, cropped output is rendered on a high-precision canvas at 100% pixel fidelity."
      }
    ]
  },
  {
    "id": "compress-image-to-kb",
    "slug": "compress-image-to-kb",
    "name": "Compress Image to Exact KB Target",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Compress photos to meet strict file size limits (e.g. under 50KB, 100KB, or 200KB) for government portals, exam forms, and job applications.",
    "seoTitle": "Compress Image to Exact KB Target \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Compress photos to meet strict file size limits (e.g. under 50KB, 100KB, or 200KB) for government portals, exam forms, and job applications. 100% free, private in-browser processing.",
    "keywords": [
      "compress image to kb",
      "reduce image size in kb",
      "photo under 50kb",
      "image compressor"
    ],
    "relatedTools": [
      "resize-image",
      "crop-image",
      "convert-image-to-webp",
      "image-to-pdf"
    ],
    "faq": [
      {
        "question": "How does exact KB compression work?",
        "answer": "The tool uses a binary quality search algorithm to find the highest possible image quality that fits strictly within your target KB limit."
      },
      {
        "question": "Does my sensitive ID or photo leave my computer?",
        "answer": "No! Compression runs completely client-side in your browser for absolute privacy."
      }
    ]
  },
  {
    "id": "convert-image-to-webp",
    "slug": "convert-image-to-webp",
    "name": "Image to Next-Gen WebP Converter",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Convert JPG and PNG photos into lightweight next-gen WebP format for 30-70% smaller file sizes and lightning-fast web page loads.",
    "seoTitle": "Image to Next-Gen WebP Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert JPG and PNG photos into lightweight next-gen WebP format for 30-70% smaller file sizes and lightning-fast web page loads. 100% free, private in-browser processing.",
    "keywords": [
      "convert to webp",
      "jpg to webp",
      "png to webp",
      "next gen image format"
    ],
    "relatedTools": [
      "resize-image",
      "crop-image",
      "compress-image-to-kb",
      "image-to-pdf"
    ],
    "faq": [
      {
        "question": "Why should I convert images to WebP?",
        "answer": "WebP produces dramatically smaller file sizes than JPEG and PNG while maintaining virtually identical visual fidelity, improving Google Core Web Vitals."
      },
      {
        "question": "Can I convert multiple images at once?",
        "answer": "Yes, upload multiple files to convert and download them individually or as a ZIP archive."
      }
    ]
  },
  {
    "id": "image-to-pdf",
    "slug": "image-to-pdf",
    "name": "Images to PDF Document Converter",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Combine single or multiple JPG and PNG images into a clean, paginated PDF document with A4, Letter, or Fit-to-Image page sizing options.",
    "seoTitle": "Images to PDF Document Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Combine single or multiple JPG and PNG images into a clean, paginated PDF document with A4, Letter, or Fit-to-Image page sizing options. 100% free, private in-browser processing.",
    "keywords": [
      "image to pdf",
      "jpg to pdf",
      "combine photos to pdf",
      "convert images to pdf"
    ],
    "relatedTools": [
      "resize-image",
      "crop-image",
      "compress-image-to-kb",
      "convert-image-to-webp"
    ],
    "faq": [
      {
        "question": "Can I rearrange the order of images before making the PDF?",
        "answer": "Yes, you can reorder images or sort them alphabetically before generating the document."
      },
      {
        "question": "Does it support A4 page format with margins?",
        "answer": "Yes, choose between Standard A4 with clean margins, US Letter, or fit page dimensions to each image."
      }
    ]
  },
  {
    "id": "passport-photo-maker",
    "slug": "passport-photo-maker",
    "name": "Passport Photo Maker & Printable Sheet",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Create standard passport and visa photos with country size presets (India 35x45mm, US 2x2 inch) and arrange them onto printable 4x6 / A4 photo sheets.",
    "seoTitle": "Passport Photo Maker & Printable Sheet \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Create standard passport and visa photos with country size presets (India 35x45mm, US 2x2 inch) and arrange them onto printable 4x6 / A4 photo sheets. 100% free, private in-browser processing.",
    "keywords": [
      "passport photo maker",
      "visa photo maker",
      "indian passport size photo",
      "passport photo printable sheet"
    ],
    "relatedTools": [
      "resize-image",
      "crop-image",
      "compress-image-to-kb",
      "convert-image-to-webp"
    ],
    "faq": [
      {
        "question": "What size is required for Indian passport photos?",
        "answer": "Indian passport and visa photos require 35mm x 45mm dimensions with 70-80% face coverage."
      },
      {
        "question": "Can I print multiple copies on one 4x6 photo paper?",
        "answer": "Yes, the tool automatically tiles 6 or 8 photos onto a standard 4x6 inch printable sheet."
      }
    ]
  },
  {
    "id": "heic-to-jpg",
    "slug": "heic-to-jpg",
    "name": "Apple HEIC to JPG / PNG Converter",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Convert iPhone and iPad HEIC / HEIF camera photos into universally compatible high-resolution JPG or PNG files without uploading to a server.",
    "seoTitle": "Apple HEIC to JPG / PNG Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert iPhone and iPad HEIC / HEIF camera photos into universally compatible high-resolution JPG or PNG files without uploading to a server. 100% free, private in-browser processing.",
    "keywords": [
      "heic to jpg",
      "heic converter",
      "iphone photo to jpg",
      "heif to jpeg"
    ],
    "relatedTools": [
      "resize-image",
      "crop-image",
      "compress-image-to-kb",
      "convert-image-to-webp"
    ],
    "faq": [
      {
        "question": "Why do iPhone photos save as HEIC?",
        "answer": "Apple uses HEIC (High Efficiency Image Container) to save storage space, but many Windows PCs and websites cannot open it without conversion."
      },
      {
        "question": "Does it process photos in bulk?",
        "answer": "Yes, drop all your iPhone HEIC photos to convert and download them in a batch."
      }
    ]
  },
  {
    "id": "exif-metadata-remover",
    "slug": "exif-metadata-remover",
    "name": "EXIF Metadata & GPS Location Remover",
    "categoryKey": "images",
    "categoryLabel": "Image & Media",
    "badge": "Media",
    "icon": "\ud83d\uddbc\ufe0f",
    "description": "Inspect hidden EXIF metadata (camera model, GPS coordinates, capture date) and strip all personal details before sharing photos online.",
    "seoTitle": "EXIF Metadata & GPS Location Remover \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Inspect hidden EXIF metadata (camera model, GPS coordinates, capture date) and strip all personal details before sharing photos online. 100% free, private in-browser processing.",
    "keywords": [
      "exif remover",
      "remove gps from photo",
      "strip metadata",
      "privacy photo cleaner"
    ],
    "relatedTools": [
      "resize-image",
      "crop-image",
      "compress-image-to-kb",
      "convert-image-to-webp"
    ],
    "faq": [
      {
        "question": "What information does EXIF data contain?",
        "answer": "EXIF data often contains your exact GPS home location, camera serial number, shutter speed, date, and lens information."
      },
      {
        "question": "How does it strip the metadata?",
        "answer": "It re-renders the pure pixel data onto an unpolluted canvas, ensuring 100% of EXIF, GPS, and device tags are cleanly eliminated."
      }
    ]
  },
  {
    "id": "merge-pdf",
    "slug": "merge-pdf",
    "name": "Merge PDF Files (Combine Multiple PDFs)",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Combine multiple PDF documents into a single organized file with drag-and-drop page ordering, 100% in your browser using pdf-lib.",
    "seoTitle": "Merge PDF Files (Combine Multiple PDFs) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Combine multiple PDF documents into a single organized file with drag-and-drop page ordering, 100% in your browser using pdf-lib. 100% free, private in-browser processing.",
    "keywords": [
      "merge pdf",
      "combine pdf",
      "join pdf files",
      "pdf merger online"
    ],
    "relatedTools": [
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages",
      "reorder-pdf-pages"
    ],
    "faq": [
      {
        "question": "Is there a limit on the number of PDFs I can merge?",
        "answer": "Because merging happens in your computer's browser memory, you can combine dozens of files with zero server limits."
      },
      {
        "question": "Can I adjust the order of documents before merging?",
        "answer": "Yes, simply reorder the files using the move up/down controls before clicking Merge."
      }
    ]
  },
  {
    "id": "split-pdf",
    "slug": "split-pdf",
    "name": "Split PDF into Separate Pages or Ranges",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Split large PDF files into individual single-page documents or custom page ranges (e.g. 1-3, 5, 8-12) with instant ZIP download.",
    "seoTitle": "Split PDF into Separate Pages or Ranges \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Split large PDF files into individual single-page documents or custom page ranges (e.g. 1-3, 5, 8-12) with instant ZIP download. 100% free, private in-browser processing.",
    "keywords": [
      "split pdf",
      "separate pdf pages",
      "extract pdf range",
      "pdf splitter"
    ],
    "relatedTools": [
      "merge-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages",
      "reorder-pdf-pages"
    ],
    "faq": [
      {
        "question": "Can I specify multiple custom page ranges?",
        "answer": "Yes, enter comma-separated ranges such as '1-5, 6-10, 11-15' to generate separate partitioned PDFs."
      },
      {
        "question": "Can I split every page into its own file?",
        "answer": "Yes, choose 'Split all pages' to download a ZIP containing each page as an individual PDF."
      }
    ]
  },
  {
    "id": "extract-pdf-pages",
    "slug": "extract-pdf-pages",
    "name": "Extract Specific PDF Pages",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Extract only the exact pages you need from a multi-page document into a clean, compact standalone PDF.",
    "seoTitle": "Extract Specific PDF Pages \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Extract only the exact pages you need from a multi-page document into a clean, compact standalone PDF. 100% free, private in-browser processing.",
    "keywords": [
      "extract pdf pages",
      "save specific pdf pages",
      "export pages from pdf"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "delete-pdf-pages",
      "reorder-pdf-pages"
    ],
    "faq": [
      {
        "question": "How do I specify which pages to extract?",
        "answer": "Enter page numbers separated by commas or ranges, for example: '1, 3, 5-7'."
      },
      {
        "question": "Does it retain bookmarks and original vector clarity?",
        "answer": "Yes, vector fonts and high-resolution assets are preserved intact."
      }
    ]
  },
  {
    "id": "delete-pdf-pages",
    "slug": "delete-pdf-pages",
    "name": "Delete PDF Pages (Remove Unwanted Pages)",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Remove blank pages, outdated sections, or duplicate sheets from your PDF and download the clean remaining document.",
    "seoTitle": "Delete PDF Pages (Remove Unwanted Pages) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Remove blank pages, outdated sections, or duplicate sheets from your PDF and download the clean remaining document. 100% free, private in-browser processing.",
    "keywords": [
      "delete pdf pages",
      "remove pages from pdf",
      "cut pages from pdf"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "reorder-pdf-pages"
    ],
    "faq": [
      {
        "question": "Can I delete multiple pages at once?",
        "answer": "Yes, list the page numbers to remove (e.g. '2, 4, 9') and the rest will be compiled into a fresh PDF."
      },
      {
        "question": "Is the original file modified on my hard drive?",
        "answer": "No, your original file is never touched. A clean modified copy is created for download."
      }
    ]
  },
  {
    "id": "reorder-pdf-pages",
    "slug": "reorder-pdf-pages",
    "name": "Reorder & Rearrange PDF Pages",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Rearrange page order in any PDF document using visual page sequencing or custom ordering numbers (e.g. 4, 1, 2, 3).",
    "seoTitle": "Reorder & Rearrange PDF Pages \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Rearrange page order in any PDF document using visual page sequencing or custom ordering numbers (e.g. 4, 1, 2, 3). 100% free, private in-browser processing.",
    "keywords": [
      "reorder pdf",
      "rearrange pdf pages",
      "sort pdf pages",
      "organize pdf"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "How do I specify the new sequence?",
        "answer": "Enter the desired order as comma-separated page numbers, such as '3, 1, 2, 4, 5'."
      },
      {
        "question": "Can I reverse all pages in a document?",
        "answer": "Yes, click the 'Reverse Page Order' button to flip the entire document sequence instantly."
      }
    ]
  },
  {
    "id": "rotate-pdf",
    "slug": "rotate-pdf",
    "name": "Rotate PDF Pages (90\u00b0, 180\u00b0, 270\u00b0)",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Permanently rotate upside-down or sideways PDF scans clockwise or counter-clockwise across all pages or selected sheets.",
    "seoTitle": "Rotate PDF Pages (90\u00b0, 180\u00b0, 270\u00b0) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Permanently rotate upside-down or sideways PDF scans clockwise or counter-clockwise across all pages or selected sheets. 100% free, private in-browser processing.",
    "keywords": [
      "rotate pdf",
      "turn pdf sideways",
      "fix upside down pdf",
      "permanent pdf rotate"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "Can I rotate only specific pages?",
        "answer": "Yes, choose whether to rotate 'All Pages', 'Only Odd Pages', 'Only Even Pages', or specific page numbers."
      },
      {
        "question": "Is the rotation saved permanently?",
        "answer": "Yes, the exported PDF contains updated rotation attributes compatible with any PDF reader or printer."
      }
    ]
  },
  {
    "id": "crop-pdf-pages",
    "slug": "crop-pdf-pages",
    "name": "Crop PDF Page Margins & Bleed",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Trim excess white margins, headers, or printer crop marks from PDF pages with custom crop box millimeter dimensions.",
    "seoTitle": "Crop PDF Page Margins & Bleed \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Trim excess white margins, headers, or printer crop marks from PDF pages with custom crop box millimeter dimensions. 100% free, private in-browser processing.",
    "keywords": [
      "crop pdf",
      "trim pdf margins",
      "pdf crop box",
      "cut white space from pdf"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "Can I crop all pages equally?",
        "answer": "Yes, set top, bottom, left, and right margin trim amounts in millimeters to apply across all pages uniformly."
      },
      {
        "question": "Does it reduce file size?",
        "answer": "It reduces visible page boundaries and eliminates unwanted white borders for cleaner viewing and printing."
      }
    ]
  },
  {
    "id": "compress-pdf",
    "slug": "compress-pdf",
    "name": "Compress PDF File Size",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Reduce PDF file size by stripping redundant metadata, deduplicating objects, and compressing embedded streams with before/after size readout.",
    "seoTitle": "Compress PDF File Size \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Reduce PDF file size by stripping redundant metadata, deduplicating objects, and compressing embedded streams with before/after size readout. 100% free, private in-browser processing.",
    "keywords": [
      "compress pdf",
      "reduce pdf size",
      "shrink pdf",
      "pdf compressor online"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "How much file size reduction can I expect?",
        "answer": "Typical documents shrink by 20% to 70% depending on the presence of uncompressed streams and redundant metadata."
      },
      {
        "question": "Does it work without uploading to third-party servers?",
        "answer": "Yes, 100% of stream parsing and object cleanup happens in your browser."
      }
    ]
  },
  {
    "id": "add-page-numbers",
    "slug": "add-page-numbers",
    "name": "Add Page Numbers to PDF",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Stamp custom page numbering ('Page X of Y', 'X', '- X -') onto PDF documents with position presets, font styling, and starting number offset.",
    "seoTitle": "Add Page Numbers to PDF \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Stamp custom page numbering ('Page X of Y', 'X', '- X -') onto PDF documents with position presets, font styling, and starting number offset. 100% free, private in-browser processing.",
    "keywords": [
      "add page numbers to pdf",
      "number pdf pages",
      "pdf page numbering",
      "stamp page numbers"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "Where can page numbers be positioned?",
        "answer": "Bottom Center, Bottom Right, Bottom Left, Top Center, or Top Right."
      },
      {
        "question": "Can I skip numbering on the cover page?",
        "answer": "Yes, configure 'Start numbering on page' to 2 or any desired page."
      }
    ]
  },
  {
    "id": "add-watermark",
    "slug": "add-watermark",
    "name": "Add Text or Image Watermark to PDF",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Stamp confidential, draft, or custom logo watermarks onto PDF pages with angle rotation, transparency opacity, and page selection.",
    "seoTitle": "Add Text or Image Watermark to PDF \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Stamp confidential, draft, or custom logo watermarks onto PDF pages with angle rotation, transparency opacity, and page selection. 100% free, private in-browser processing.",
    "keywords": [
      "add watermark to pdf",
      "stamp pdf",
      "confidential watermark",
      "draft watermark pdf"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "Can I adjust watermark transparency?",
        "answer": "Yes, adjust the opacity slider from 10% to 100% so text underneath remains completely readable."
      },
      {
        "question": "Can I rotate the watermark diagonally?",
        "answer": "Yes, standard 45-degree diagonal placement or horizontal placement is supported."
      }
    ]
  },
  {
    "id": "pdf-to-images",
    "slug": "pdf-to-images",
    "name": "PDF to Images Converter (PNG / JPEG ZIP)",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Render each page of your PDF document into crisp, high-resolution PNG or JPEG images at 150/300 DPI packaged into a convenient ZIP archive.",
    "seoTitle": "PDF to Images Converter (PNG / JPEG ZIP) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Render each page of your PDF document into crisp, high-resolution PNG or JPEG images at 150/300 DPI packaged into a convenient ZIP archive. 100% free, private in-browser processing.",
    "keywords": [
      "pdf to images",
      "pdf to png",
      "pdf to jpg",
      "convert pdf to picture"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "What image resolution does it produce?",
        "answer": "Choose between Standard Web (150 DPI) or High-Quality Print (300 DPI) for razor-sharp vector clarity."
      },
      {
        "question": "How are the images downloaded?",
        "answer": "Single pages can be saved individually, or the entire document can be downloaded as a ZIP file."
      }
    ]
  },
  {
    "id": "pdf-to-word",
    "slug": "pdf-to-word",
    "name": "PDF to Word (.docx) Text Converter",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Extract text, headings, and paragraphs from PDF files into an editable Microsoft Word (.docx) document client-side.",
    "seoTitle": "PDF to Word (.docx) Text Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Extract text, headings, and paragraphs from PDF files into an editable Microsoft Word (.docx) document client-side. 100% free, private in-browser processing.",
    "keywords": [
      "pdf to word",
      "convert pdf to docx",
      "pdf to doc",
      "editable pdf"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "Does it support editable text?",
        "answer": "Yes, text content, line structures, and paragraphs are extracted into a clean Word-compatible document."
      },
      {
        "question": "What are the limitations of client-side conversion?",
        "answer": "Complex multi-column magazines and scanned image-only PDFs without OCR may require manual layout refinement."
      }
    ]
  },
  {
    "id": "pdf-to-excel",
    "slug": "pdf-to-excel",
    "name": "PDF to Excel (.xlsx) Table Extractor",
    "categoryKey": "pdf",
    "categoryLabel": "PDF Utilities",
    "badge": "PDF",
    "icon": "\ud83d\udcc4",
    "description": "Detect tables and tabular numbers in bank statements, invoices, and reports and export directly into a formatted Microsoft Excel (.xlsx) spreadsheet.",
    "seoTitle": "PDF to Excel (.xlsx) Table Extractor \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Detect tables and tabular numbers in bank statements, invoices, and reports and export directly into a formatted Microsoft Excel (.xlsx) spreadsheet. 100% free, private in-browser processing.",
    "keywords": [
      "pdf to excel",
      "convert pdf to xlsx",
      "extract tables from pdf",
      "pdf to spreadsheet"
    ],
    "relatedTools": [
      "merge-pdf",
      "split-pdf",
      "extract-pdf-pages",
      "delete-pdf-pages"
    ],
    "faq": [
      {
        "question": "Can it extract bank statement transactions?",
        "answer": "Yes, structured financial tables and column data are parsed into rows and cells ready for Excel formulas."
      },
      {
        "question": "Can I preview extracted data before downloading?",
        "answer": "Yes, the interactive preview table lets you inspect and copy extracted data before saving."
      }
    ]
  },
  {
    "id": "csv-to-json",
    "slug": "csv-to-json",
    "name": "CSV to JSON Converter",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Transform comma/tab-delimited CSV files into structured JSON array of objects with automatic type inference (numbers, booleans).",
    "seoTitle": "CSV to JSON Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Transform comma/tab-delimited CSV files into structured JSON array of objects with automatic type inference (numbers, booleans). 100% free, private in-browser processing.",
    "keywords": [
      "csv to json",
      "convert csv to json",
      "csv parser",
      "tabular to json"
    ],
    "relatedTools": [
      "json-to-csv",
      "csv-to-xlsx",
      "xlsx-to-csv",
      "markdown-to-html"
    ],
    "faq": [
      {
        "question": "Does it auto-detect delimiters?",
        "answer": "Yes, commas, semicolons, and tabs are automatically recognized."
      },
      {
        "question": "Are numbers converted to numeric types?",
        "answer": "Yes, values like '123' and 'true' can be parsed as numbers and booleans or retained as plain strings."
      }
    ]
  },
  {
    "id": "json-to-csv",
    "slug": "json-to-csv",
    "name": "JSON to CSV Converter",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Flatten arrays of JSON objects into clean, downloadable CSV spreadsheets with custom delimiter and quote options.",
    "seoTitle": "JSON to CSV Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Flatten arrays of JSON objects into clean, downloadable CSV spreadsheets with custom delimiter and quote options. 100% free, private in-browser processing.",
    "keywords": [
      "json to csv",
      "convert json to csv",
      "flatten json",
      "json to excel table"
    ],
    "relatedTools": [
      "csv-to-json",
      "csv-to-xlsx",
      "xlsx-to-csv",
      "markdown-to-html"
    ],
    "faq": [
      {
        "question": "How are nested objects handled?",
        "answer": "Nested properties are flattened using dot notation (e.g. user.address.city) for clean tabular columns."
      },
      {
        "question": "Can I copy the CSV directly?",
        "answer": "Yes, you can copy the raw CSV to your clipboard or download a .csv file."
      }
    ]
  },
  {
    "id": "csv-to-xlsx",
    "slug": "csv-to-xlsx",
    "name": "CSV to Excel (.xlsx) Converter",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Convert plain text CSV and TSV spreadsheets into binary Microsoft Excel (.xlsx) workbooks using SheetJS.",
    "seoTitle": "CSV to Excel (.xlsx) Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert plain text CSV and TSV spreadsheets into binary Microsoft Excel (.xlsx) workbooks using SheetJS. 100% free, private in-browser processing.",
    "keywords": [
      "csv to xlsx",
      "convert csv to excel",
      "csv to workbook"
    ],
    "relatedTools": [
      "csv-to-json",
      "json-to-csv",
      "xlsx-to-csv",
      "markdown-to-html"
    ],
    "faq": [
      {
        "question": "Does it preserve special characters and UTF-8 symbols?",
        "answer": "Yes, standard UTF-8 text and Indian rupee symbols (\u20b9) are encoded cleanly without Excel encoding errors."
      },
      {
        "question": "Is SheetJS processing local?",
        "answer": "Yes, spreadsheet compilation happens completely inside your browser."
      }
    ]
  },
  {
    "id": "xlsx-to-csv",
    "slug": "xlsx-to-csv",
    "name": "Excel (.xlsx) to CSV Converter",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Extract spreadsheets from Excel (.xlsx/.xls) files with sheet selection and convert them into standard CSV format.",
    "seoTitle": "Excel (.xlsx) to CSV Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Extract spreadsheets from Excel (.xlsx/.xls) files with sheet selection and convert them into standard CSV format. 100% free, private in-browser processing.",
    "keywords": [
      "xlsx to csv",
      "excel to csv",
      "convert workbook to csv"
    ],
    "relatedTools": [
      "csv-to-json",
      "json-to-csv",
      "csv-to-xlsx",
      "markdown-to-html"
    ],
    "faq": [
      {
        "question": "Can I pick which sheet to convert from a multi-sheet file?",
        "answer": "Yes, a dropdown lets you preview and select any tab from the Excel workbook."
      },
      {
        "question": "Can I export as Tab-Separated (TSV)?",
        "answer": "Yes, toggle between comma, semicolon, or tab delimiters."
      }
    ]
  },
  {
    "id": "markdown-to-html",
    "slug": "markdown-to-html",
    "name": "Markdown to Clean HTML Converter",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Parse Markdown text with GitHub Flavored Markdown (GFM) tables, task lists, code blocks, and output sanitized semantic HTML.",
    "seoTitle": "Markdown to Clean HTML Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Parse Markdown text with GitHub Flavored Markdown (GFM) tables, task lists, code blocks, and output sanitized semantic HTML. 100% free, private in-browser processing.",
    "keywords": [
      "markdown to html",
      "md to html",
      "gfm parser",
      "markdown previewer"
    ],
    "relatedTools": [
      "csv-to-json",
      "json-to-csv",
      "csv-to-xlsx",
      "xlsx-to-csv"
    ],
    "faq": [
      {
        "question": "Does it support tables and code blocks?",
        "answer": "Yes, full GitHub Flavored Markdown including tables, blockquotes, syntax highlighting, and checklists is supported."
      },
      {
        "question": "Is the HTML sanitized?",
        "answer": "Yes, all output is sanitized to prevent malicious script injection."
      }
    ]
  },
  {
    "id": "html-to-pdf",
    "slug": "html-to-pdf",
    "name": "HTML & Webpage to PDF Converter",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Convert HTML code, snippets, or styled web documents into high-quality paginated PDF files with CSS styling preserved.",
    "seoTitle": "HTML & Webpage to PDF Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert HTML code, snippets, or styled web documents into high-quality paginated PDF files with CSS styling preserved. 100% free, private in-browser processing.",
    "keywords": [
      "html to pdf",
      "convert html to pdf",
      "webpage to pdf",
      "print html"
    ],
    "relatedTools": [
      "csv-to-json",
      "json-to-csv",
      "csv-to-xlsx",
      "xlsx-to-csv"
    ],
    "faq": [
      {
        "question": "Does it support custom CSS styling?",
        "answer": "Yes, inline and linked styles, typography, and color schemes are preserved in the print render."
      },
      {
        "question": "Can I set page margins?",
        "answer": "Yes, configure portrait/landscape orientation and margin padding."
      }
    ]
  },
  {
    "id": "text-to-pdf",
    "slug": "text-to-pdf",
    "name": "Text to Formatted PDF Converter",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Turn plain text, essays, meeting minutes, and notes into clean, paginated PDF documents with custom font sizes and margins.",
    "seoTitle": "Text to Formatted PDF Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Turn plain text, essays, meeting minutes, and notes into clean, paginated PDF documents with custom font sizes and margins. 100% free, private in-browser processing.",
    "keywords": [
      "text to pdf",
      "convert txt to pdf",
      "notes to pdf",
      "plain text pdf maker"
    ],
    "relatedTools": [
      "csv-to-json",
      "json-to-csv",
      "csv-to-xlsx",
      "xlsx-to-csv"
    ],
    "faq": [
      {
        "question": "Can I adjust font sizes and line spacing?",
        "answer": "Yes, choose between 10pt, 12pt, 14pt, or 16pt font size with comfortable 1.5x line height."
      },
      {
        "question": "How are page breaks handled?",
        "answer": "Long text wraps automatically and paginates cleanly across multiple A4 pages."
      }
    ]
  },
  {
    "id": "zip-file-creator",
    "slug": "zip-file-creator",
    "name": "ZIP File Creator & Archive Packager",
    "categoryKey": "docs",
    "categoryLabel": "Documents & Files",
    "badge": "Documents",
    "icon": "\ud83d\udcd1",
    "description": "Bundle multiple documents, images, and files into a compressed .zip archive directly inside your browser using JSZip.",
    "seoTitle": "ZIP File Creator & Archive Packager \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Bundle multiple documents, images, and files into a compressed .zip archive directly inside your browser using JSZip. 100% free, private in-browser processing.",
    "keywords": [
      "zip file creator",
      "create zip online",
      "compress files to zip",
      "browser zip maker"
    ],
    "relatedTools": [
      "csv-to-json",
      "json-to-csv",
      "csv-to-xlsx",
      "xlsx-to-csv"
    ],
    "faq": [
      {
        "question": "Are my files uploaded to an external server to create the zip?",
        "answer": "No. The entire ZIP archive is built in-memory within your browser using JSZip."
      },
      {
        "question": "Can I rename files or folders inside the zip?",
        "answer": "Yes, you can organize uploaded files into custom folder subpaths."
      }
    ]
  },
  {
    "id": "instagram-image-resizer",
    "slug": "instagram-image-resizer",
    "name": "Instagram Post, Story & Reel Image Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Resize photos for Instagram Square (1080x1080 1:1), Portrait (1080x1350 4:5), and Story/Reel (1080x1920 9:16) with smart blur background fill.",
    "seoTitle": "Instagram Post, Story & Reel Image Resizer \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Resize photos for Instagram Square (1080x1080 1:1), Portrait (1080x1350 4:5), and Story/Reel (1080x1920 9:16) with smart blur background fill. 100% free, private in-browser processing.",
    "keywords": [
      "instagram image resizer",
      "insta 1080x1080",
      "instagram portrait resizer",
      "instagram story size"
    ],
    "relatedTools": [
      "facebook-cover-resizer",
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer",
      "reels-and-shorts-resizer"
    ],
    "faq": [
      {
        "question": "What is the best aspect ratio for Instagram feed posts?",
        "answer": "Portrait 4:5 (1080x1350 px) occupies the most vertical screen space on mobile feeds, maximizing engagement."
      },
      {
        "question": "What is the blur background fill option?",
        "answer": "If your photo does not fit the target ratio, blur background fills the empty borders with an aesthetic blurred copy of the photo instead of harsh black or white bars."
      }
    ]
  },
  {
    "id": "facebook-cover-resizer",
    "slug": "facebook-cover-resizer",
    "name": "Facebook Cover & Banner Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Resize banners for Facebook Page Cover (820x312 px), Group Cover (1640x856 px), and Link Post (1200x630 px) with mobile safe zone overlays.",
    "seoTitle": "Facebook Cover & Banner Resizer \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Resize banners for Facebook Page Cover (820x312 px), Group Cover (1640x856 px), and Link Post (1200x630 px) with mobile safe zone overlays. 100% free, private in-browser processing.",
    "keywords": [
      "facebook cover resizer",
      "fb cover size",
      "facebook banner safe zone"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer",
      "reels-and-shorts-resizer"
    ],
    "faq": [
      {
        "question": "Why does Facebook crop cover photos differently on mobile vs desktop?",
        "answer": "Desktop displays covers at 820x312 px while mobile crops the sides to 640x360 px. The safe-zone guide ensures your text stays visible on both devices."
      },
      {
        "question": "Can I export as PNG or JPEG?",
        "answer": "Yes, select PNG for crisp typography or JPEG for smaller file size."
      }
    ]
  },
  {
    "id": "linkedin-banner-resizer",
    "slug": "linkedin-banner-resizer",
    "name": "LinkedIn Profile & Company Banner Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Fit artwork to LinkedIn Personal Banner (1584x396 px) and Company Page Banner (1128x191 px) with avatar cutout preview.",
    "seoTitle": "LinkedIn Profile & Company Banner Resizer \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Fit artwork to LinkedIn Personal Banner (1584x396 px) and Company Page Banner (1128x191 px) with avatar cutout preview. 100% free, private in-browser processing.",
    "keywords": [
      "linkedin banner resizer",
      "linkedin cover photo size",
      "linkedin safe area"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "facebook-cover-resizer",
      "youtube-thumbnail-resizer",
      "reels-and-shorts-resizer"
    ],
    "faq": [
      {
        "question": "How does the avatar cutout preview help?",
        "answer": "It shows exactly where your circular profile picture covers the banner on the bottom-left so crucial text or logos aren't obscured."
      },
      {
        "question": "What is the recommended resolution?",
        "answer": "1584 x 396 pixels at 72 or 150 DPI provides the sharpest clarity across retina displays."
      }
    ]
  },
  {
    "id": "youtube-thumbnail-resizer",
    "slug": "youtube-thumbnail-resizer",
    "name": "YouTube Thumbnail Resizer (1280x720 HD)",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Resize and optimize YouTube video thumbnails to 1280x720 16:9 HD under 2MB with duration badge safe-zone guide.",
    "seoTitle": "YouTube Thumbnail Resizer (1280x720 HD) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Resize and optimize YouTube video thumbnails to 1280x720 16:9 HD under 2MB with duration badge safe-zone guide. 100% free, private in-browser processing.",
    "keywords": [
      "youtube thumbnail resizer",
      "youtube thumbnail size",
      "1280x720 thumbnail maker"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "facebook-cover-resizer",
      "linkedin-banner-resizer",
      "reels-and-shorts-resizer"
    ],
    "faq": [
      {
        "question": "What are YouTube's official thumbnail specifications?",
        "answer": "1280x720 resolution, 16:9 aspect ratio, minimum width of 640 pixels, under 2MB file size, and JPEG/PNG format."
      },
      {
        "question": "What is the duration badge safe zone?",
        "answer": "YouTube overlays video duration in the bottom right corner; our safe-zone overlay keeps you from placing text in that covered spot."
      }
    ]
  },
  {
    "id": "reels-and-shorts-resizer",
    "slug": "reels-and-shorts-resizer",
    "name": "Reels, TikTok & Shorts 9:16 Video Canvas Resizer",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Format graphics and video covers to 1080x1920 vertical 9:16 ratio with native UI overlay safe zone guides for captions and action buttons.",
    "seoTitle": "Reels, TikTok & Shorts 9:16 Video Canvas Resizer \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Format graphics and video covers to 1080x1920 vertical 9:16 ratio with native UI overlay safe zone guides for captions and action buttons. 100% free, private in-browser processing.",
    "keywords": [
      "reels resizer",
      "shorts thumbnail size",
      "tiktok safe zone",
      "vertical 9:16 resizer"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "facebook-cover-resizer",
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer"
    ],
    "faq": [
      {
        "question": "What are the safe margins on Reels and TikTok?",
        "answer": "Keep vital text away from the top 15% (header icons) and bottom 25% (caption and audio tags) to avoid overlapping platform UI."
      },
      {
        "question": "Can I fit landscape photos into 9:16?",
        "answer": "Yes, using blur-padding or top/bottom canvas expansion."
      }
    ]
  },
  {
    "id": "social-media-caption-generator",
    "slug": "social-media-caption-generator",
    "name": "Social Media Caption & Hook Generator",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Generate engaging social captions, hooks, calls-to-action (CTAs), and relevant hashtags tailored for Instagram, LinkedIn, X, or Facebook.",
    "seoTitle": "Social Media Caption & Hook Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate engaging social captions, hooks, calls-to-action (CTAs), and relevant hashtags tailored for Instagram, LinkedIn, X, or Facebook. 100% free, private in-browser processing.",
    "keywords": [
      "social media caption generator",
      "instagram caption generator",
      "linkedin post hook",
      "hashtag generator"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "facebook-cover-resizer",
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer"
    ],
    "faq": [
      {
        "question": "Can I select different tones of voice?",
        "answer": "Yes, choose between Professional, Conversational, Witty, High-Energy, or Minimalist tones."
      },
      {
        "question": "Does it format hashtags?",
        "answer": "Yes, it compiles 5-15 niche and trending hashtags ready to copy with one click."
      }
    ]
  },
  {
    "id": "utm-builder",
    "slug": "utm-builder",
    "name": "Campaign UTM Parameter Builder & Tracker",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Build error-free Google Analytics 4 (GA4) campaign tracking URLs with presets for source, medium, campaign, content, and term.",
    "seoTitle": "Campaign UTM Parameter Builder & Tracker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Build error-free Google Analytics 4 (GA4) campaign tracking URLs with presets for source, medium, campaign, content, and term. 100% free, private in-browser processing.",
    "keywords": [
      "utm builder",
      "google analytics utm",
      "campaign url builder",
      "ga4 tracking link"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "facebook-cover-resizer",
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer"
    ],
    "faq": [
      {
        "question": "What are the required UTM parameters?",
        "answer": "Website URL, Campaign Source (utm_source), and Campaign Medium (utm_medium) are essential for GA4 tracking."
      },
      {
        "question": "Does it automatically format spaces?",
        "answer": "Yes, spaces are replaced with hyphens or percent-encoded (%20) to prevent broken links."
      }
    ]
  },
  {
    "id": "whatsapp-link-generator",
    "slug": "whatsapp-link-generator",
    "name": "WhatsApp Click-to-Chat Link Generator",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Create instant wa.me click-to-chat links and short URLs with custom prefilled messages for customer support and marketing campaigns.",
    "seoTitle": "WhatsApp Click-to-Chat Link Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Create instant wa.me click-to-chat links and short URLs with custom prefilled messages for customer support and marketing campaigns. 100% free, private in-browser processing.",
    "keywords": [
      "whatsapp link generator",
      "wa me link maker",
      "click to chat whatsapp",
      "whatsapp chat link"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "facebook-cover-resizer",
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer"
    ],
    "faq": [
      {
        "question": "Does the recipient need to save my phone number first?",
        "answer": "No! wa.me links allow anyone to message your WhatsApp business without saving your number in their contacts."
      },
      {
        "question": "Can I test the link immediately?",
        "answer": "Yes, you can click 'Test Link' or copy the generated link directly."
      }
    ]
  },
  {
    "id": "google-snippet-preview",
    "slug": "google-snippet-preview",
    "name": "Google SERP Search Snippet Preview Tool",
    "categoryKey": "marketing",
    "categoryLabel": "Marketing & Social",
    "badge": "Marketing",
    "icon": "\ud83d\udce3",
    "description": "Visualize exactly how your webpage title, URL breadcrumbs, and meta description will render on Google Desktop and Mobile search results.",
    "seoTitle": "Google SERP Search Snippet Preview Tool \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Visualize exactly how your webpage title, URL breadcrumbs, and meta description will render on Google Desktop and Mobile search results. 100% free, private in-browser processing.",
    "keywords": [
      "google snippet preview",
      "serp preview tool",
      "meta title pixel width",
      "google search simulator"
    ],
    "relatedTools": [
      "instagram-image-resizer",
      "facebook-cover-resizer",
      "linkedin-banner-resizer",
      "youtube-thumbnail-resizer"
    ],
    "faq": [
      {
        "question": "What is Google's pixel width limit for titles?",
        "answer": "Google truncates desktop titles over approximately 600 pixels (typically 55-60 characters) and mobile titles over ~560 pixels."
      },
      {
        "question": "What is the recommended meta description length?",
        "answer": "155 to 160 characters on desktop; 120 characters on mobile."
      }
    ]
  },
  {
    "id": "canonical-tag-generator",
    "slug": "canonical-tag-generator",
    "name": "Canonical Tag Generator & Validator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Generate standardized rel=\"canonical\" link tags to prevent duplicate content penalties across tracking URLs and parameters.",
    "seoTitle": "Canonical Tag Generator & Validator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate standardized rel=\"canonical\" link tags to prevent duplicate content penalties across tracking URLs and parameters. 100% free, private in-browser processing.",
    "keywords": [
      "canonical tag generator",
      "rel canonical",
      "duplicate content seo",
      "canonical url"
    ],
    "relatedTools": [
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator",
      "schema-markup-generator"
    ],
    "faq": [
      {
        "question": "Why are canonical tags crucial for SEO?",
        "answer": "Canonical tags tell search engines which URL represents the master version, consolidating ranking signals and avoiding duplicate penalties."
      },
      {
        "question": "Does it handle trailing slashes and HTTPS?",
        "answer": "Yes, it normalizes protocol, domain casing, and trailing slashes to guarantee clean syntax."
      }
    ]
  },
  {
    "id": "meta-title-description-checker",
    "slug": "meta-title-description-checker",
    "name": "Meta Title & Description Pixel Width Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Measure real-time character count and pixel width of your SEO meta title and description with live truncation alerts and search previews.",
    "seoTitle": "Meta Title & Description Pixel Width Checker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Measure real-time character count and pixel width of your SEO meta title and description with live truncation alerts and search previews. 100% free, private in-browser processing.",
    "keywords": [
      "meta title checker",
      "meta description length",
      "seo title pixel checker",
      "serp simulator"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "open-graph-generator",
      "robots-txt-generator",
      "schema-markup-generator"
    ],
    "faq": [
      {
        "question": "Why does pixel width matter more than character count?",
        "answer": "Google uses proportional fonts (Arial). Characters like 'W' and 'M' take up more space than 'I' or 'l', so pixel calculation prevents unexpected ellipsis truncation."
      },
      {
        "question": "What are the optimal lengths?",
        "answer": "Title: 50-60 characters (< 600px). Description: 140-160 characters (< 960px)."
      }
    ]
  },
  {
    "id": "open-graph-generator",
    "slug": "open-graph-generator",
    "name": "Open Graph & Twitter Card Meta Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Generate complete og:title, og:image, og:description, and twitter:card meta tags with live social media card previews.",
    "seoTitle": "Open Graph & Twitter Card Meta Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate complete og:title, og:image, og:description, and twitter:card meta tags with live social media card previews. 100% free, private in-browser processing.",
    "keywords": [
      "open graph generator",
      "og tags generator",
      "twitter card generator",
      "social meta tags"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "robots-txt-generator",
      "schema-markup-generator"
    ],
    "faq": [
      {
        "question": "What is the recommended Open Graph image size?",
        "answer": "1200 x 630 pixels (1.91:1 aspect ratio) ensures sharp display on Facebook, LinkedIn, Twitter, and WhatsApp previews."
      },
      {
        "question": "Can I copy the ready HTML tags?",
        "answer": "Yes, copy the complete <meta> tags block with 1 click to paste into your website's <head>."
      }
    ]
  },
  {
    "id": "robots-txt-generator",
    "slug": "robots-txt-generator",
    "name": "Robots.txt Generator & Directives Validator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Generate clean, crawler-friendly robots.txt files with bot rules (Googlebot, Bingbot, Baiduspider), crawl delays, and XML sitemap directives.",
    "seoTitle": "Robots.txt Generator & Directives Validator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate clean, crawler-friendly robots.txt files with bot rules (Googlebot, Bingbot, Baiduspider), crawl delays, and XML sitemap directives. 100% free, private in-browser processing.",
    "keywords": [
      "robots txt generator",
      "robots txt maker",
      "disallow crawler",
      "crawl delay"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "schema-markup-generator"
    ],
    "faq": [
      {
        "question": "Where should the robots.txt file be uploaded?",
        "answer": "In the root directory of your domain (e.g. https://yourdomain.com/robots.txt)."
      },
      {
        "question": "Can I block specific admin directories?",
        "answer": "Yes, add Disallow rules for paths like /admin/, /wp-admin/, or /cart/."
      }
    ]
  },
  {
    "id": "schema-markup-generator",
    "slug": "schema-markup-generator",
    "name": "JSON-LD Schema Markup Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Generate Google-validated JSON-LD structured data for Articles, Products, FAQ Pages, Local Businesses, Organizations, and Breadcrumbs.",
    "seoTitle": "JSON-LD Schema Markup Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate Google-validated JSON-LD structured data for Articles, Products, FAQ Pages, Local Businesses, Organizations, and Breadcrumbs. 100% free, private in-browser processing.",
    "keywords": [
      "schema markup generator",
      "json ld generator",
      "faq schema maker",
      "product rich snippets"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "Which schema types are supported?",
        "answer": "FAQPage, Product with pricing/offers, Article/BlogPosting, LocalBusiness with address, Organization, and BreadcrumbList."
      },
      {
        "question": "How do I add JSON-LD to my website?",
        "answer": "Paste the generated <script type=\"application/ld+json\"> snippet into your page's <head> or <body>."
      }
    ]
  },
  {
    "id": "sitemap-generator",
    "slug": "sitemap-generator",
    "name": "XML Sitemap Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Create Google and Bing search-engine compliant XML sitemaps from a list of website URLs with changefreq and priority attributes.",
    "seoTitle": "XML Sitemap Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Create Google and Bing search-engine compliant XML sitemaps from a list of website URLs with changefreq and priority attributes. 100% free, private in-browser processing.",
    "keywords": [
      "xml sitemap generator",
      "create sitemap online",
      "sitemap xml maker",
      "google sitemap"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "What is the maximum URL limit for a standard sitemap?",
        "answer": "Search engines accept up to 50,000 URLs or 50MB uncompressed per sitemap file."
      },
      {
        "question": "How do priority and changefreq work?",
        "answer": "Priority (0.0 to 1.0) and changefreq (daily, weekly, monthly) indicate how frequently pages update and their relative importance."
      }
    ]
  },
  {
    "id": "favicon-generator",
    "slug": "favicon-generator",
    "name": "Favicon Generator & App Icon Pack",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Convert any image or logo into complete multi-size web favicons (16x16, 32x32, 180x180 Apple Touch, 192x192 Android) packaged in a ZIP with HTML tags.",
    "seoTitle": "Favicon Generator & App Icon Pack \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert any image or logo into complete multi-size web favicons (16x16, 32x32, 180x180 Apple Touch, 192x192 Android) packaged in a ZIP with HTML tags. 100% free, private in-browser processing.",
    "keywords": [
      "favicon generator",
      "create favicon",
      "apple touch icon generator",
      "favicon ico maker"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "Which sizes are included in the package?",
        "answer": "16x16, 32x32 (standard browsers), 180x180 (Apple Touch Icon for iOS), 192x192 and 512x512 (PWA / Android)."
      },
      {
        "question": "Does it generate the HTML embed code?",
        "answer": "Yes, the complete <link rel=\"icon\"> and <link rel=\"apple-touch-icon\"> HTML snippet is provided."
      }
    ]
  },
  {
    "id": "hreflang-generator-validator",
    "slug": "hreflang-generator-validator",
    "name": "Hreflang Multi-Language Tag Generator",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Generate ISO 639-1 language and ISO 3166-1 country hreflang link tags with automatic x-default fallback for international SEO.",
    "seoTitle": "Hreflang Multi-Language Tag Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate ISO 639-1 language and ISO 3166-1 country hreflang link tags with automatic x-default fallback for international SEO. 100% free, private in-browser processing.",
    "keywords": [
      "hreflang generator",
      "international seo tags",
      "x default hreflang",
      "multilingual seo"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "What is the purpose of the x-default hreflang tag?",
        "answer": "The x-default tag tells search engines which page to show visitors whose language or region is not specifically targeted by other tags."
      },
      {
        "question": "Are bidirectional tags required?",
        "answer": "Yes, if page A links to page B via hreflang, page B must link back to page A for validation to succeed."
      }
    ]
  },
  {
    "id": "dns-lookup",
    "slug": "dns-lookup",
    "name": "DNS Record Lookup (DNS-over-HTTPS)",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Query live DNS records across global resolvers (Cloudflare & Google DoH) for A, AAAA, MX, TXT, NS, CNAME, and SOA records.",
    "seoTitle": "DNS Record Lookup (DNS-over-HTTPS) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Query live DNS records across global resolvers (Cloudflare & Google DoH) for A, AAAA, MX, TXT, NS, CNAME, and SOA records. 100% free, private in-browser processing.",
    "keywords": [
      "dns lookup",
      "check dns records",
      "mx record lookup",
      "txt record verification"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "How does the lookup execute?",
        "answer": "It queries Cloudflare and Google public DNS over HTTPS (DoH) APIs in real time directly from your browser."
      },
      {
        "question": "Can I verify domain TXT verification records?",
        "answer": "Yes, all TXT records (SPF, Google site verification, DMARC) are returned and displayed."
      }
    ]
  },
  {
    "id": "broken-link-checker",
    "slug": "broken-link-checker",
    "name": "Broken Link & Dead URL Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Test a list of URLs for broken 404 errors, network timeouts, and connectivity issues with detailed response codes.",
    "seoTitle": "Broken Link & Dead URL Checker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Test a list of URLs for broken 404 errors, network timeouts, and connectivity issues with detailed response codes. 100% free, private in-browser processing.",
    "keywords": [
      "broken link checker",
      "check 404 links",
      "dead link detector",
      "url status checker"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "How are links tested?",
        "answer": "Links are checked for HTTP status, SSL handshake validity, and response availability."
      },
      {
        "question": "Can I paste a batch of links to check?",
        "answer": "Yes, paste up to 25 URLs at once to check their live availability."
      }
    ]
  },
  {
    "id": "redirect-chain-checker",
    "slug": "redirect-chain-checker",
    "name": "Redirect Chain & Loop Checker (301/302)",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Trace URL redirection hops, identify unnecessary 301/302 chains, and detect redirect loops that dilute SEO link equity.",
    "seoTitle": "Redirect Chain & Loop Checker (301/302) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Trace URL redirection hops, identify unnecessary 301/302 chains, and detect redirect loops that dilute SEO link equity. 100% free, private in-browser processing.",
    "keywords": [
      "redirect chain checker",
      "301 redirect trace",
      "redirect loop test",
      "http redirect tracker"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "Why are redirect chains harmful for SEO?",
        "answer": "Every extra hop in a redirect chain increases page latency, drains crawl budget, and can reduce PageRank flow."
      },
      {
        "question": "What is the difference between 301 and 302 redirects?",
        "answer": "301 is a permanent redirect that passes search rankings, while 302 is temporary and preserves the original indexing."
      }
    ]
  },
  {
    "id": "http-status-redirect-checker",
    "slug": "http-status-redirect-checker",
    "name": "HTTP Status Code & Header Inspector",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Inspect HTTP response status codes (200 OK, 301, 302, 403, 404, 500) and response headers for any target URL.",
    "seoTitle": "HTTP Status Code & Header Inspector \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Inspect HTTP response status codes (200 OK, 301, 302, 403, 404, 500) and response headers for any target URL. 100% free, private in-browser processing.",
    "keywords": [
      "http status checker",
      "http header inspector",
      "check 200 ok",
      "server response code"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "What does a 200 OK status mean?",
        "answer": "200 OK confirms that the server successfully processed the request and delivered the content without issues."
      },
      {
        "question": "Can I inspect security headers?",
        "answer": "Yes, response headers like Content-Type, Cache-Control, and Strict-Transport-Security are displayed."
      }
    ]
  },
  {
    "id": "ssl-expiry-checker",
    "slug": "ssl-expiry-checker",
    "name": "SSL Certificate Expiry & Health Checker",
    "categoryKey": "seo",
    "categoryLabel": "SEO & Webmaster",
    "badge": "SEO",
    "icon": "\ud83d\udd0d",
    "description": "Check SSL/TLS certificate validity, certificate authority issuer, exact expiry date, and days remaining before expiration.",
    "seoTitle": "SSL Certificate Expiry & Health Checker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Check SSL/TLS certificate validity, certificate authority issuer, exact expiry date, and days remaining before expiration. 100% free, private in-browser processing.",
    "keywords": [
      "ssl expiry checker",
      "check ssl certificate",
      "https certificate validity",
      "days left on ssl"
    ],
    "relatedTools": [
      "canonical-tag-generator",
      "meta-title-description-checker",
      "open-graph-generator",
      "robots-txt-generator"
    ],
    "faq": [
      {
        "question": "Why is monitoring SSL expiry critical?",
        "answer": "Expired certificates trigger full-screen browser security warnings (ERR_CERT_DATE_INVALID) that block visitors and damage SEO trust."
      },
      {
        "question": "How far in advance should I renew SSL?",
        "answer": "Most automated systems (Let's Encrypt) renew at 30 days remaining; manual certificates should be renewed at least 14 days before expiry."
      }
    ]
  },
  {
    "id": "marketplace-profit-calculator",
    "slug": "marketplace-profit-calculator",
    "name": "Marketplace Profit & Settlement Calculator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Calculate exact per-order profit, commission, closing fees, shipping fees, packaging, and GST across Amazon, Flipkart, Meesho, and Myntra.",
    "seoTitle": "Marketplace Profit & Settlement Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Calculate exact per-order profit, commission, closing fees, shipping fees, packaging, and GST across Amazon, Flipkart, Meesho, and Myntra. 100% free, private in-browser processing.",
    "keywords": [
      "marketplace profit calculator",
      "amazon fee calculator",
      "flipkart profit calculator",
      "meesho seller margin"
    ],
    "relatedTools": [
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation",
      "bulk-product-listing-generator"
    ],
    "faq": [
      {
        "question": "How are marketplace commissions deducted?",
        "answer": "The platform takes a category percentage commission plus fixed closing fees and shipping charges before applying 18% GST on services."
      },
      {
        "question": "Can I edit all cost assumptions?",
        "answer": "Yes, customize product cost, shipping weight, referral percentage, ad spend, and return loss allowance."
      }
    ]
  },
  {
    "id": "selling-price-calculator",
    "slug": "selling-price-calculator",
    "name": "Target Margin Selling Price Calculator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Calculate backwards from product cost, logistics, packaging, marketplace deductions, and target profit margin to determine the ideal selling price.",
    "seoTitle": "Target Margin Selling Price Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Calculate backwards from product cost, logistics, packaging, marketplace deductions, and target profit margin to determine the ideal selling price. 100% free, private in-browser processing.",
    "keywords": [
      "selling price calculator",
      "target margin pricing",
      "ecommerce price calculator",
      "how to price products"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation",
      "bulk-product-listing-generator"
    ],
    "faq": [
      {
        "question": "Why work backwards to calculate selling price?",
        "answer": "Because marketplace fees and taxes are percentages of the selling price itself, iterative backward calculation ensures you don't underestimate costs."
      },
      {
        "question": "Can I test different profit margin targets?",
        "answer": "Yes, adjust your desired net margin from 5% to 50% to see the corresponding required listing price."
      }
    ]
  },
  {
    "id": "inventory-reorder-calculator",
    "slug": "inventory-reorder-calculator",
    "name": "Inventory Days Cover & Reorder Point Calculator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Determine stock cover days, reorder points, and recommended replenishment quantities based on sales velocity, lead time, and safety buffer.",
    "seoTitle": "Inventory Days Cover & Reorder Point Calculator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Determine stock cover days, reorder points, and recommended replenishment quantities based on sales velocity, lead time, and safety buffer. 100% free, private in-browser processing.",
    "keywords": [
      "inventory reorder calculator",
      "reorder point formula",
      "safety stock calculator",
      "stock cover days"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "seller-settlement-reconciliation",
      "bulk-product-listing-generator"
    ],
    "faq": [
      {
        "question": "What is the Reorder Point formula?",
        "answer": "Reorder Point = (Daily Sales Velocity x Supplier Lead Time Days) + Safety Buffer Stock."
      },
      {
        "question": "What is stock cover?",
        "answer": "Stock cover represents how many days your current warehouse inventory will last at current daily sales velocity before stocking out."
      }
    ]
  },
  {
    "id": "seller-settlement-reconciliation",
    "slug": "seller-settlement-reconciliation",
    "name": "Seller Settlement & Payout Reconciliation",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Upload marketplace order reports and bank settlement payouts (CSV/XLSX) to flag missing orders, fee discrepancies, and payout shortages.",
    "seoTitle": "Seller Settlement & Payout Reconciliation \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Upload marketplace order reports and bank settlement payouts (CSV/XLSX) to flag missing orders, fee discrepancies, and payout shortages. 100% free, private in-browser processing.",
    "keywords": [
      "seller settlement reconciliation",
      "amazon settlement recon",
      "flipkart payment reconciliation",
      "marketplace fee audit"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "bulk-product-listing-generator"
    ],
    "faq": [
      {
        "question": "How does reconciliation work?",
        "answer": "It matches Order IDs across your internal dispatch report and the marketplace settlement sheet, comparing expected vs actual payout."
      },
      {
        "question": "Can I export the discrepancy findings?",
        "answer": "Yes, download a structured CSV discrepancy report highlighting all underpaid orders for ticket raising."
      }
    ]
  },
  {
    "id": "bulk-product-listing-generator",
    "slug": "bulk-product-listing-generator",
    "name": "Bulk Product Listing Generator (Amazon & Flipkart)",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Generate bulk marketplace catalog titles, 5 key feature bullets, and HTML descriptions from basic specs with character count limits.",
    "seoTitle": "Bulk Product Listing Generator (Amazon & Flipkart) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate bulk marketplace catalog titles, 5 key feature bullets, and HTML descriptions from basic specs with character count limits. 100% free, private in-browser processing.",
    "keywords": [
      "bulk listing generator",
      "amazon title generator",
      "product description template",
      "ecommerce listing maker"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it adhere to Amazon title length rules?",
        "answer": "Yes, it enforces Amazon's 200-character maximum and highlights character count compliance."
      },
      {
        "question": "Can I export as a CSV flat file?",
        "answer": "Yes, generate and download structured CSV templates ready for bulk catalog upload."
      }
    ]
  },
  {
    "id": "product-image-compliance-checker",
    "slug": "product-image-compliance-checker",
    "name": "Product Image Marketplace Compliance Checker",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Batch audit product images against Amazon, Flipkart, and Meesho guidelines for resolution (min 1000px), aspect ratio, and white background suitability.",
    "seoTitle": "Product Image Marketplace Compliance Checker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Batch audit product images against Amazon, Flipkart, and Meesho guidelines for resolution (min 1000px), aspect ratio, and white background suitability. 100% free, private in-browser processing.",
    "keywords": [
      "product image compliance",
      "amazon image checker",
      "white background checker",
      "ecommerce image audit"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "What are Amazon's main image rules?",
        "answer": "Pure white background (RGB 255,255,255), minimum 1000 pixels on the longest side for zoom capability, and product filling 85%+ of frame."
      },
      {
        "question": "How does the white background check work?",
        "answer": "It samples the four corner pixels and border perimeter to check for color variation and background purity."
      }
    ]
  },
  {
    "id": "packing-slip-generator",
    "slug": "packing-slip-generator",
    "name": "E-Commerce Packing Slip Generator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Create professional packing slips with seller branding, customer address, SKU line items, order ID, and printable PDF format.",
    "seoTitle": "E-Commerce Packing Slip Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Create professional packing slips with seller branding, customer address, SKU line items, order ID, and printable PDF format. 100% free, private in-browser processing.",
    "keywords": [
      "packing slip generator",
      "ecommerce packing slip",
      "order packing list",
      "printable dispatch slip"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Can I add my business logo?",
        "answer": "Yes, upload your store logo to embed it into the header of the printed slip."
      },
      {
        "question": "Does it fit standard A4 or thermal paper?",
        "answer": "Yes, choose between standard A4 format or compact thermal slip layout."
      }
    ]
  },
  {
    "id": "purchase-order-generator",
    "slug": "purchase-order-generator",
    "name": "B2B Purchase Order (PO) Generator",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Generate supplier purchase orders with GST calculations, itemized line items, delivery terms, PO number, and instant PDF download.",
    "seoTitle": "B2B Purchase Order (PO) Generator \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate supplier purchase orders with GST calculations, itemized line items, delivery terms, PO number, and instant PDF download. 100% free, private in-browser processing.",
    "keywords": [
      "purchase order generator",
      "po maker",
      "b2b purchase order",
      "vendor po generator"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it support HSN and GST tax splits?",
        "answer": "Yes, specify supplier details, delivery terms, HSN codes, and tax rates for compliant B2B procurement."
      },
      {
        "question": "Can I save local drafts?",
        "answer": "Yes, form values can be saved locally in your browser so you don't re-type supplier details."
      }
    ]
  },
  {
    "id": "product-barcode-label-maker",
    "slug": "product-barcode-label-maker",
    "name": "Product Barcode Label Sheet Maker",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Generate printable A4 barcode sticker sheets (24-up, 40-up, or custom) with product name, SKU, MRP, and scannable Code 128 / EAN barcodes.",
    "seoTitle": "Product Barcode Label Sheet Maker \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Generate printable A4 barcode sticker sheets (24-up, 40-up, or custom) with product name, SKU, MRP, and scannable Code 128 / EAN barcodes. 100% free, private in-browser processing.",
    "keywords": [
      "barcode label sheet maker",
      "barcode sticker maker",
      "24 up barcode sheet",
      "product label generator"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "What standard sticker sheet layouts are supported?",
        "answer": "24 labels per A4 page (65x38mm) and 40 labels per A4 page (52.5x29.7mm) standard sticker paper formats."
      },
      {
        "question": "Can I print MRP and SKU alongside the barcode?",
        "answer": "Yes, customize product title, SKU code, and MRP in Indian Rupees (\u20b9)."
      }
    ]
  },
  {
    "id": "a4-to-4x6-label-converter",
    "slug": "a4-to-4x6-label-converter",
    "name": "A4 to 4x6 Thermal Shipping Label Converter",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Extract shipping labels embedded inside multi-page A4 documents and convert them into clean 4x6 inch (100x150mm) roll format for thermal printers.",
    "seoTitle": "A4 to 4x6 Thermal Shipping Label Converter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Extract shipping labels embedded inside multi-page A4 documents and convert them into clean 4x6 inch (100x150mm) roll format for thermal printers. 100% free, private in-browser processing.",
    "keywords": [
      "a4 to 4x6 converter",
      "thermal label converter",
      "a4 shipping label to 4x6",
      "convert invoice to shipping label"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Why convert A4 labels to 4x6?",
        "answer": "Thermal roll printers (e.g. TSC, Zebra, Rollo) require 4x6 inch (100x150 mm) dimensions, whereas Indian marketplaces often output mixed A4 invoice-labels."
      },
      {
        "question": "Does it crop invoices automatically?",
        "answer": "Yes, it detects the upper shipping label segment and scales it to standard 4x6 roll output."
      }
    ]
  },
  {
    "id": "multiple-labels-per-page",
    "slug": "multiple-labels-per-page",
    "name": "Multiple Shipping Labels per A4 Page (2/4/6 Grid)",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Arrange multiple 4x6 shipping labels onto standard A4 paper in 2-up or 4-up grids to save paper when printing on laser and inkjet printers.",
    "seoTitle": "Multiple Shipping Labels per A4 Page (2/4/6 Grid) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Arrange multiple 4x6 shipping labels onto standard A4 paper in 2-up or 4-up grids to save paper when printing on laser and inkjet printers. 100% free, private in-browser processing.",
    "keywords": [
      "multiple labels per page",
      "4 labels per a4",
      "2 up shipping labels",
      "save paper shipping labels"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "How much paper does this save?",
        "answer": "Arranging 2 or 4 labels per A4 sheet cuts paper consumption by 50% to 75% for regular desktop printers."
      },
      {
        "question": "Can I configure page margins and gaps?",
        "answer": "Yes, customizable cut margins and separator dashed lines make cutting simple."
      }
    ]
  },
  {
    "id": "shipping-label-page-splitter",
    "slug": "shipping-label-page-splitter",
    "name": "Shipping Label & Tax Invoice Page Splitter",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Split combined multi-page orders into two separate organized PDF bundles: one for thermal shipping labels and one for customer tax invoices.",
    "seoTitle": "Shipping Label & Tax Invoice Page Splitter \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Split combined multi-page orders into two separate organized PDF bundles: one for thermal shipping labels and one for customer tax invoices. 100% free, private in-browser processing.",
    "keywords": [
      "shipping label splitter",
      "split invoice and shipping label",
      "separate label and invoice",
      "ecommerce label splitter"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "How does page splitting work?",
        "answer": "Marketplaces often bundle alternating Label and Invoice pages. This tool separates odd and even pages into dedicated downloads in one click."
      },
      {
        "question": "Can I download both bundles together?",
        "answer": "Yes, get 'All_Labels_4x6.pdf' and 'All_Invoices.pdf' instantly."
      }
    ]
  },
  {
    "id": "smart-label-sorter",
    "slug": "smart-label-sorter",
    "name": "Smart Shipping Label Sorter (by SKU & Courier)",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Organize shipping label PDF pages by SKU, item size, order quantity, or courier service (Delhivery, BlueDart, Ekart) for streamlined warehouse packing.",
    "seoTitle": "Smart Shipping Label Sorter (by SKU & Courier) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Organize shipping label PDF pages by SKU, item size, order quantity, or courier service (Delhivery, BlueDart, Ekart) for streamlined warehouse packing. 100% free, private in-browser processing.",
    "keywords": [
      "smart label sorter",
      "sort shipping labels by sku",
      "sort labels by courier",
      "warehouse packing organizer"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Why is sorting shipping labels important?",
        "answer": "Sorting labels by SKU lets warehouse staff batch-pick and pack the same product consecutively, cutting order fulfillment time in half."
      },
      {
        "question": "Can I visually drag and rearrange pages?",
        "answer": "Yes, page thumbnails allow visual drag-and-drop or tagging by product category."
      }
    ]
  },
  {
    "id": "amazon-label-cropper",
    "slug": "amazon-label-cropper",
    "name": "Amazon Easy Ship & ATS Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop Amazon ATS & Easy Ship combined PDF pages to isolate clean 4x6 inch thermal shipping labels and discard the invoice half.",
    "seoTitle": "Amazon Easy Ship & ATS Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop Amazon ATS & Easy Ship combined PDF pages to isolate clean 4x6 inch thermal shipping labels and discard the invoice half. 100% free, private in-browser processing.",
    "keywords": [
      "amazon label cropper",
      "amazon easy ship 4x6",
      "amazon shipping label crop",
      "amazon ats label cropper"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it remove the Amazon invoice portion?",
        "answer": "Yes, it automatically isolates the top half containing the carrier barcode, ATS routing, and delivery address."
      },
      {
        "question": "Does it support bulk multi-order PDFs?",
        "answer": "Yes, upload a PDF with dozens of Amazon orders and get a unified 4x6 thermal PDF in seconds."
      }
    ]
  },
  {
    "id": "flipkart-label-cropper",
    "slug": "flipkart-label-cropper",
    "name": "Flipkart Ekart Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Isolate Flipkart Ekart thermal shipping labels from multi-page combined manifests into clean 4x6 inch format ready for thermal printing.",
    "seoTitle": "Flipkart Ekart Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Isolate Flipkart Ekart thermal shipping labels from multi-page combined manifests into clean 4x6 inch format ready for thermal printing. 100% free, private in-browser processing.",
    "keywords": [
      "flipkart label cropper",
      "ekart label 4x6",
      "flipkart thermal label crop",
      "flipkart shipping label"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it crop the Flipkart invoice?",
        "answer": "Yes, it extracts only the shipping label segment while preserving high barcode scanning resolution."
      },
      {
        "question": "Can I adjust crop boundaries if needed?",
        "answer": "Yes, manual fine-tuning handles any custom layout variation."
      }
    ]
  },
  {
    "id": "meesho-label-cropper",
    "slug": "meesho-label-cropper",
    "name": "Meesho Thermal Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop Meesho combined PDF sheets to isolate the courier barcode and customer address into clean 4x6 thermal labels.",
    "seoTitle": "Meesho Thermal Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop Meesho combined PDF sheets to isolate the courier barcode and customer address into clean 4x6 thermal labels. 100% free, private in-browser processing.",
    "keywords": [
      "meesho label cropper",
      "meesho 4x6 label",
      "meesho shipping label crop",
      "meesho thermal printer"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it work with Valmo and Shadowfax labels?",
        "answer": "Yes, all 3PL carriers integrated with Meesho are supported by the standardized crop preset."
      },
      {
        "question": "Can I process hundreds of labels at once?",
        "answer": "Yes, multi-page PDFs are processed in browser memory within seconds."
      }
    ]
  },
  {
    "id": "myntra-label-cropper",
    "slug": "myntra-label-cropper",
    "name": "Myntra Logistics Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Extract Myntra 4x6 thermal shipping labels from standard manifests with high-fidelity barcode preservation.",
    "seoTitle": "Myntra Logistics Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Extract Myntra 4x6 thermal shipping labels from standard manifests with high-fidelity barcode preservation. 100% free, private in-browser processing.",
    "keywords": [
      "myntra label cropper",
      "myntra logistics label",
      "myntra 4x6 thermal",
      "myntra shipping label"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "What is the output format?",
        "answer": "Standard 4x6 inch (100x150mm) PDF optimized for 203 DPI and 300 DPI thermal printers."
      },
      {
        "question": "Does it preserve barcode clarity?",
        "answer": "Yes, vector lines are maintained without pixelation for 100% first-pass scanner readability."
      }
    ]
  },
  {
    "id": "ajio-label-cropper",
    "slug": "ajio-label-cropper",
    "name": "AJIO B2C Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop AJIO order manifests and invoices to extract clean 4x6 thermal dispatch labels.",
    "seoTitle": "AJIO B2C Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop AJIO order manifests and invoices to extract clean 4x6 thermal dispatch labels. 100% free, private in-browser processing.",
    "keywords": [
      "ajio label cropper",
      "ajio shipping label",
      "ajio 4x6 thermal label"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Is AJIO Omnichannel supported?",
        "answer": "Yes, both AJIO B2C and Dropship manifest formats are supported."
      },
      {
        "question": "Can I rotate upside-down labels?",
        "answer": "Yes, auto-rotation or manual 90\u00b0 rotation can be toggled."
      }
    ]
  },
  {
    "id": "nykaa-fashion-label-cropper",
    "slug": "nykaa-fashion-label-cropper",
    "name": "Nykaa Beauty & Fashion Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop Nykaa orders into thermal-ready 4x6 labels with optimal margins for carrier tracking barcodes.",
    "seoTitle": "Nykaa Beauty & Fashion Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop Nykaa orders into thermal-ready 4x6 labels with optimal margins for carrier tracking barcodes. 100% free, private in-browser processing.",
    "keywords": [
      "nykaa label cropper",
      "nykaa fashion label",
      "nykaa shipping label 4x6"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it work for Nykaa Beauty and Fashion?",
        "answer": "Yes, presets accommodate both Nykaa platform label layouts."
      },
      {
        "question": "Are customer contact numbers protected?",
        "answer": "All processing happens locally on your device with complete privacy."
      }
    ]
  },
  {
    "id": "jiomart-label-cropper",
    "slug": "jiomart-label-cropper",
    "name": "JioMart Retail Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Extract JioMart Reliance Retail shipping labels from order summaries to 4x6 thermal format.",
    "seoTitle": "JioMart Retail Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Extract JioMart Reliance Retail shipping labels from order summaries to 4x6 thermal format. 100% free, private in-browser processing.",
    "keywords": [
      "jiomart label cropper",
      "jiomart shipping label",
      "jiomart 4x6 thermal"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it crop out the customer tax invoice?",
        "answer": "Yes, only the dispatch and routing segment is saved to the thermal label file."
      }
    ]
  },
  {
    "id": "snapdeal-label-cropper",
    "slug": "snapdeal-label-cropper",
    "name": "Snapdeal Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Extract Snapdeal shipping labels from combined pages into clean 4x6 thermal format.",
    "seoTitle": "Snapdeal Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Extract Snapdeal shipping labels from combined pages into clean 4x6 thermal format. 100% free, private in-browser processing.",
    "keywords": [
      "snapdeal label cropper",
      "snapdeal shipping label",
      "snapdeal 4x6"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Can I merge multiple Snapdeal label PDFs?",
        "answer": "Yes, upload multiple files to generate one combined 4x6 printable PDF."
      }
    ]
  },
  {
    "id": "tata-cliq-label-cropper",
    "slug": "tata-cliq-label-cropper",
    "name": "Tata CLiQ Luxury & Fashion Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop Tata CLiQ order manifests to thermal-ready 4x6 shipping labels.",
    "seoTitle": "Tata CLiQ Luxury & Fashion Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop Tata CLiQ order manifests to thermal-ready 4x6 shipping labels. 100% free, private in-browser processing.",
    "keywords": [
      "tata cliq label cropper",
      "tata cliq shipping label",
      "tata cliq 4x6"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Are high-end luxury manifests supported?",
        "answer": "Yes, standard CLiQ and CLiQ Luxury dispatch notes are cropped cleanly."
      }
    ]
  },
  {
    "id": "ebay-label-cropper",
    "slug": "ebay-label-cropper",
    "name": "eBay Shipping Label Cropper (Domestic & Global)",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop eBay standard and international shipping labels into 4x6 thermal printable format.",
    "seoTitle": "eBay Shipping Label Cropper (Domestic & Global) \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop eBay standard and international shipping labels into 4x6 thermal printable format. 100% free, private in-browser processing.",
    "keywords": [
      "ebay label cropper",
      "ebay 4x6 thermal label",
      "ebay shipping crop"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it work with eBay International Shipping labels?",
        "answer": "Yes, standard eBay domestic and global customs label layouts are supported."
      }
    ]
  },
  {
    "id": "etsy-label-cropper",
    "slug": "etsy-label-cropper",
    "name": "Etsy Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Convert Etsy 8.5x11 inch label pages into crisp 4x6 thermal printable labels.",
    "seoTitle": "Etsy Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Convert Etsy 8.5x11 inch label pages into crisp 4x6 thermal printable labels. 100% free, private in-browser processing.",
    "keywords": [
      "etsy label cropper",
      "etsy shipping label 4x6",
      "etsy thermal printer"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it remove the Etsy instructions header?",
        "answer": "Yes, the cutting instructions header is automatically cropped out."
      }
    ]
  },
  {
    "id": "shopify-shipping-label-cropper",
    "slug": "shopify-shipping-label-cropper",
    "name": "Shopify Shipping & Shiprocket Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop Shopify Shipping, Shiprocket, and Delhivery labels to clean 4x6 thermal roll format.",
    "seoTitle": "Shopify Shipping & Shiprocket Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop Shopify Shipping, Shiprocket, and Delhivery labels to clean 4x6 thermal roll format. 100% free, private in-browser processing.",
    "keywords": [
      "shopify label cropper",
      "shiprocket label crop",
      "shopify shipping label 4x6"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Can I crop Shiprocket A4 labels?",
        "answer": "Yes, Shiprocket A4 multi-order sheets are isolated into individual 4x6 pages."
      }
    ]
  },
  {
    "id": "woocommerce-shipping-label-cropper",
    "slug": "woocommerce-shipping-label-cropper",
    "name": "WooCommerce & Printful Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Crop WooCommerce order invoices and packing slips into 4x6 thermal shipping labels.",
    "seoTitle": "WooCommerce & Printful Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Crop WooCommerce order invoices and packing slips into 4x6 thermal shipping labels. 100% free, private in-browser processing.",
    "keywords": [
      "woocommerce label cropper",
      "woocommerce shipping label",
      "wp shipping label 4x6"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Does it work with standard WooCommerce PDF plugins?",
        "answer": "Yes, standard A4 invoices with integrated labels are cleanly cropped."
      }
    ]
  },
  {
    "id": "shipping-label-cropper",
    "slug": "shipping-label-cropper",
    "name": "Universal Custom Shipping Label Cropper",
    "categoryKey": "ecommerce",
    "categoryLabel": "E-Commerce & Sellers",
    "badge": "E-Commerce",
    "icon": "\ud83d\udce6",
    "description": "Universal label cropper with interactive millimeter crop boundaries for any courier or regional logistics provider.",
    "seoTitle": "Universal Custom Shipping Label Cropper \u2014 Free Online Tool | Business Volunteers",
    "seoDescription": "Universal label cropper with interactive millimeter crop boundaries for any courier or regional logistics provider. 100% free, private in-browser processing.",
    "keywords": [
      "shipping label cropper",
      "custom label cropper",
      "universal 4x6 cropper",
      "thermal label crop"
    ],
    "relatedTools": [
      "marketplace-profit-calculator",
      "selling-price-calculator",
      "inventory-reorder-calculator",
      "seller-settlement-reconciliation"
    ],
    "faq": [
      {
        "question": "Can I define custom crop coordinates for my regional courier?",
        "answer": "Yes, use the interactive crop box or enter exact percentage/mm coordinates to crop any PDF."
      }
    ]
  }
];

const CATEGORY_DEFINITIONS: Omit<ToolCategory, 'count'>[] = [
  { key: 'all', label: 'All Tools', icon: '⚡' },
  { key: 'ecommerce', label: 'E-Commerce & Sellers', icon: '📦' },
  { key: 'calculators', label: 'Calculators & Finance', icon: '🧮' },
  { key: 'pdf', label: 'PDF Utilities', icon: '📄' },
  { key: 'images', label: 'Image & Media', icon: '🖼️' },
  { key: 'marketing', label: 'Marketing & Social', icon: '📣' },
  { key: 'seo', label: 'SEO & Webmaster', icon: '🔍' },
  { key: 'qr', label: 'QR & Barcodes', icon: '📱' },
  { key: 'dev', label: 'Developer Tools', icon: '💻' },
  { key: 'docs', label: 'Documents & Files', icon: '📑' },
  { key: 'text', label: 'Text & Content', icon: '✍️' },
];

// Dynamically compute category tool counts from ALL_TOOLS
export const TOOL_CATEGORIES: ToolCategory[] = CATEGORY_DEFINITIONS.map(cat => ({
  ...cat,
  count: cat.key === 'all'
    ? ALL_TOOLS.length
    : ALL_TOOLS.filter(t => t.categoryKey === cat.key).length,
}));

export const getToolById = (idOrSlug: string): ToolMeta | undefined => {
  if (!idOrSlug) return undefined;
  const norm = idOrSlug.toLowerCase().trim();
  return ALL_TOOLS.find(t => t.id.toLowerCase() === norm || t.slug.toLowerCase() === norm);
};

export const getToolsByCategory = (cat: string): ToolMeta[] => {
  if (!cat || cat === 'all') return ALL_TOOLS;
  return ALL_TOOLS.filter(t => t.categoryKey === cat);
};
