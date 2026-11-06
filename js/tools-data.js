/* Toolbox by Harmno | github.com/harmno */
/* ═══════════════════════════════════════════════════════════════
   TOOLBOX — Tool registry
   ─────────────────────────────────────────────────────────────
   YOU NEVER NEED TO EDIT THE AUTO SECTION BY HAND.

   Your tools live one folder per tool — paste the whole thing in:
     tools/pdf/merge-pdf/index.html   (+ its css/js/images next to it)

   A tool can be:
     • a folder (standard):  tools/pdf/merge-pdf/index.html
     • a single file:        tools/pdf/merge-pdf.html
   Copy  tools/_template/  as a starting point for either.

   Tool name       ← read from the file's <title>  (text before "—" or "|" is used)
   Description     ← read from <meta name="description" content="...">
   Icon (optional) ← add  <!-- toolbox-icon: braces -->  inside the file
                     (keys live in ICONS in js/main.js — default per category)
   Category        ← the folder the tool lives in

   ▼ The ONLY part the sync script rewrites is between the markers:
   ═══════════════════════════════════════════════════════════════ */

const TOOLS = [
  // >>> toolbox-auto >>>
  {
    name: "Image Compressor",
    desc: "Compress JPG, PNG and WebP images right in your browser — quality slider, live preview, instant download. Nothing is uploaded.",
    category: "image",
    icon: "image",
    status: "live",
    url: "tools/image/image-compressor/index.html",
  },
  {
    name: "Image Resizer",
    desc: "Resize images to exact pixels, centimeters or inches — with print DPI control and one-click ratio templates (1:1, 16:9, passport, A4). Free in your browser.",
    category: "image",
    icon: "maximize",
    status: "live",
    url: "tools/image/image-resizer/index.html",
  },
  {
    name: "Case Converter",
    desc: "Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case and more — live, free, in your browser.",
    category: "text",
    icon: "case",
    status: "live",
    url: "tools/text/case-converter/index.html",
  },
  {
    name: "Lorem Ipsum Generator",
    desc: "Generate Lorem Ipsum placeholder text by paragraphs, sentences or words — free and instant in your browser.",
    category: "text",
    icon: "file-text",
    status: "live",
    url: "tools/text/lorem-ipsum/index.html",
  },
  {
    name: "Word Counter",
    desc: "Count words, characters, sentences, paragraphs and reading time — live, free and private in your browser.",
    category: "text",
    icon: "type",
    status: "live",
    url: "tools/text/word-counter/index.html",
  },
  {
    name: "Base64 Encoder / Decoder",
    desc: "Encode text to Base64 and decode it back — UTF-8 safe, instant, and entirely in your browser.",
    category: "developer",
    icon: "hash",
    status: "live",
    url: "tools/developer/base64/index.html",
  },
  {
    name: "JSON Formatter & Validator",
    desc: "Prettify, validate and minify JSON instantly. Syntax highlighting, line errors and one-click copy — free in your browser.",
    category: "developer",
    icon: "braces",
    status: "live",
    url: "tools/developer/json-formatter/index.html",
  },
  {
    name: "Regex Tester",
    desc: "Test regular expressions live — see matches highlighted, count them, inspect capture groups. Free in your browser.",
    category: "developer",
    icon: "terminal",
    status: "live",
    url: "tools/developer/regex-tester/index.html",
  },
  {
    name: "Unit Converter",
    desc: "Convert length, weight, temperature, area, volume, speed and data units — instant, free, in your browser.",
    category: "converters",
    icon: "ruler",
    status: "live",
    url: "tools/converters/unit-converter/index.html",
  },
  {
    name: "Age Calculator",
    desc: "Exact age in years, months and days — plus total days lived, weekday you were born, and your next birthday countdown.",
    category: "calculators",
    icon: "calendar",
    status: "live",
    url: "tools/calculators/age-calculator/index.html",
  },
  {
    name: "BMI Calculator",
    desc: "Body Mass Index in metric or imperial units — with healthy range guidance and a visual scale. Free and private.",
    category: "calculators",
    icon: "heart",
    status: "live",
    url: "tools/calculators/bmi-calculator/index.html",
  },
  {
    name: "Percentage Calculator",
    desc: "Three percentage calculators in one: what is X% of Y, what percent is X of Y, and percentage change — instant results.",
    category: "calculators",
    icon: "percent",
    status: "live",
    url: "tools/calculators/percentage-calculator/index.html",
  },
  // <<< toolbox-auto <<<

  /* ── "Coming soon" placeholders (hand-written, kept by sync) ── */
  {
    name: 'Merge PDF',
    desc: 'Combine multiple PDFs into one clean document. Drag to reorder pages before merging.',
    category: 'pdf',
    icon: 'merge',
    status: 'soon',
  },
  {
    name: 'Compress PDF',
    desc: 'Shrink PDF file size dramatically without visible quality loss. Free, unlimited.',
    category: 'pdf',
    icon: 'minimize',
    status: 'soon',
  },
  {
    name: 'PDF to Word',
    desc: 'Convert PDF documents to editable Word files while keeping the layout intact.',
    category: 'pdf',
    icon: 'file-output',
    status: 'soon',
  },
  {
    name: 'Background Remover',
    desc: 'Remove image backgrounds in seconds and export transparent PNGs — no uploads.',
    category: 'image',
    icon: 'scissors',
    status: 'soon',
  },
  {
    name: 'Currency Converter',
    desc: 'Live exchange rates for 160+ world currencies with a clean, offline-friendly UI.',
    category: 'converters',
    icon: 'dollar',
    status: 'soon',
  },
];

const CATEGORIES = [
  { id: 'all',         label: 'All tools'   },
  { id: 'pdf',         label: 'PDF'         },
  { id: 'image',       label: 'Image'       },
  { id: 'text',        label: 'Text'        },
  { id: 'developer',   label: 'Developer'   },
  { id: 'converters',  label: 'Converters'  },
  { id: 'calculators', label: 'Calculators' },
];
