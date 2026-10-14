import React, { useState, useMemo } from 'react';
import type { ToolMeta } from '../../../data/toolsData';
import { copyToClipboard, downloadText } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const TextRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --------------------------------------------------------------------------
  // 1: WORD COUNTER
  // --------------------------------------------------------------------------
  const [wordText, setWordText] = useState(
    'Business Volunteers delivers high-impact digital transformation, automated data infrastructure, and specialized e-commerce tools for growing Indian brands. Our browser-first utilities ensure complete privacy, high performance, and zero server bottlenecks.'
  );

  const wordStats = useMemo(() => {
    const text = wordText;
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0).length : 0;
    const paragraphs = text.trim() ? text.split(/\n+/).filter(p => p.trim().length > 0).length : 0;
    const readingTimeMins = Math.ceil(wordCount / 200);
    const speakingTimeMins = Math.ceil(wordCount / 130);

    // Keyword density
    const freq: Record<string, number> = {};
    words.forEach(w => {
      const clean = w.toLowerCase().replace(/[^a-z0-9]/gi, '');
      if (clean.length > 2) {
        freq[clean] = (freq[clean] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([word, count]) => ({
        word,
        count,
        density: wordCount > 0 ? ((count / wordCount) * 100).toFixed(1) : '0',
      }));

    return { wordCount, charCount, charNoSpaces, sentences, paragraphs, readingTimeMins, speakingTimeMins, topKeywords };
  }, [wordText]);

  // --------------------------------------------------------------------------
  // 2: CHARACTER COUNTER
  // --------------------------------------------------------------------------
  const [charText, setCharText] = useState('Supercharge your brand growth with Business Volunteers suite of free tools.');

  const charMetrics = useMemo(() => {
    const len = charText.length;
    const noSpaces = charText.replace(/\s+/g, '').length;
    const lines = charText.split('\n').length;
    const smsSegments = Math.ceil(Math.max(1, len) / 160);

    const limits = [
      { name: 'Twitter / X', max: 280, val: len },
      { name: 'Google SERP Title', max: 60, val: len },
      { name: 'Google Meta Description', max: 160, val: len },
      { name: 'SMS (160 char segments)', max: 160, val: len % 160 || (len > 0 ? 160 : 0), extra: `${smsSegments} segment(s)` },
      { name: 'LinkedIn Post', max: 3000, val: len },
      { name: 'Instagram Caption', max: 2200, val: len },
    ];

    return { len, noSpaces, lines, limits };
  }, [charText]);

  // --------------------------------------------------------------------------
  // 3: REMOVE DUPLICATE LINES
  // --------------------------------------------------------------------------
  const [dupInput, setDupInput] = useState(
    "contact@businessvolunteers.online\nsupport@client.com\ncontact@businessvolunteers.online\nsales@client.com\nSUPPORT@CLIENT.COM\nhello@partner.org"
  );
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [sortOrder, setSortOrder] = useState<'none' | 'az' | 'za' | 'len'>('az');

  const dupResult = useMemo(() => {
    const rawLines = dupInput.split('\n');
    let processed = rawLines.map(l => (trimWhitespace ? l.trim() : l));
    processed = processed.filter(l => l.length > 0);

    const seen = new Set<string>();
    const unique: string[] = [];

    processed.forEach(line => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    });

    if (sortOrder === 'az') unique.sort((a, b) => a.localeCompare(b));
    else if (sortOrder === 'za') unique.sort((a, b) => b.localeCompare(a));
    else if (sortOrder === 'len') unique.sort((a, b) => a.length - b.length);

    const origCount = rawLines.length;
    const uniqueCount = unique.length;
    const removedCount = origCount - uniqueCount;

    return { output: unique.join('\n'), origCount, uniqueCount, removedCount };
  }, [dupInput, caseSensitive, trimWhitespace, sortOrder]);

  // --------------------------------------------------------------------------
  // 4: SLUG GENERATOR
  // --------------------------------------------------------------------------
  const [slugSource, setSlugSource] = useState('10 Best E-Commerce Tools Every Indian Seller Needs in 2026!');
  const [slugSep, setSlugSep] = useState<string>('-');
  const [slugCase, setSlugCase] = useState<'lower' | 'upper'>('lower');
  const [removeStopWords, setRemoveStopWords] = useState(true);

  const generatedSlug = useMemo(() => {
    let s = slugSource.trim();
    // Normalize unicode / accents
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    if (removeStopWords) {
      const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'of', 'to', 'for', 'and', 'with', 'by']);
      s = s
        .split(/\s+/)
        .filter(w => !stopWords.has(w.toLowerCase()))
        .join(' ');
    }

    // Replace non-alphanumeric with separator
    s = s.replace(/[^a-zA-Z0-9]+/g, slugSep);
    // Trim leading/trailing separators
    const escSep = slugSep.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    s = s.replace(new RegExp(`^${escSep}+|${escSep}+$`, 'g'), '');

    return slugCase === 'lower' ? s.toLowerCase() : s.toUpperCase();
  }, [slugSource, slugSep, slugCase, removeStopWords]);

  // --------------------------------------------------------------------------
  // 5: TEXT DIFF CHECKER
  // --------------------------------------------------------------------------
  const [diffOriginal, setDiffOriginal] = useState(
    "Return Policy:\n1. Items must be returned within 7 days of delivery.\n2. Must be unused with original tags attached.\n3. Return shipping cost is ₹100 flat.\n4. Refunds processed to original payment method."
  );
  const [diffModified, setDiffModified] = useState(
    "Return & Exchange Policy:\n1. Items must be returned within 14 days of delivery.\n2. Must be unused with original tags attached.\n3. Return shipping is 100% free for prepaid orders.\n4. Refunds processed to UPI or bank account within 24 hours.\n5. Sale items are eligible for store credit only."
  );

  const diffAnalysis = useMemo(() => {
    const origLines = diffOriginal.split('\n');
    const modLines = diffModified.split('\n');

    const maxLen = Math.max(origLines.length, modLines.length);
    const comparison: { orig?: string; mod?: string; type: 'same' | 'added' | 'removed' | 'modified' }[] = [];

    for (let i = 0; i < maxLen; i++) {
      const o = origLines[i];
      const m = modLines[i];
      if (o === undefined) {
        comparison.push({ mod: m, type: 'added' });
      } else if (m === undefined) {
        comparison.push({ orig: o, type: 'removed' });
      } else if (o === m) {
        comparison.push({ orig: o, mod: m, type: 'same' });
      } else {
        comparison.push({ orig: o, mod: m, type: 'modified' });
      }
    }

    return comparison;
  }, [diffOriginal, diffModified]);

  // --------------------------------------------------------------------------
  // 6: PASSWORD GENERATOR
  // --------------------------------------------------------------------------
  const [pwMode, setPwMode] = useState<'random' | 'passphrase'>('random');
  const [pwLength, setPwLength] = useState<number>(16);
  const [pwWords, setPwWords] = useState<number>(4);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [bulkCount, setBulkCount] = useState<number>(1);
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);

  const WORD_LIST = [
    'swift', 'tiger', 'cobalt', 'matrix', 'beacon', 'valley', 'falcon', 'galaxy',
    'zenith', 'pulse', 'quantum', 'harbor', 'shadow', 'orbit', 'radiant', 'timber',
    'breeze', 'shield', 'vertex', 'crystal', 'anchor', 'voyage', 'summit', 'dynamo',
    'phoenix', 'aurora', 'castle', 'glacier', 'meteor', 'sapphire', 'tempo', 'wizard'
  ];

  const generateNewPasswords = () => {
    const list: string[] = [];
    for (let b = 0; b < bulkCount; b++) {
      if (pwMode === 'passphrase') {
        const parts: string[] = [];
        const cryptoArr = new Uint32Array(pwWords);
        window.crypto.getRandomValues(cryptoArr);
        for (let i = 0; i < pwWords; i++) {
          parts.push(WORD_LIST[cryptoArr[i] % WORD_LIST.length]);
        }
        list.push(parts.join('-'));
      } else {
        let chars = '';
        if (includeUpper) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
        if (includeLower) chars += 'abcdefghijkmnopqrstuvwxyz';
        if (includeNumbers) chars += '23456789';
        if (includeSymbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?';
        if (!chars) chars = 'abcdefghjkmnpqrstuvwxyz23456789';

        const randValues = new Uint32Array(pwLength);
        window.crypto.getRandomValues(randValues);
        let str = '';
        for (let i = 0; i < pwLength; i++) {
          str += chars[randValues[i] % chars.length];
        }
        list.push(str);
      }
    }
    setGeneratedPasswords(list);
  };

  // Run initial password generation
  React.useEffect(() => {
    if (tool.id === 'password-generator' && generatedPasswords.length === 0) {
      generateNewPasswords();
    }
  }, [tool.id]);

  // --------------------------------------------------------------------------
  // RENDER PER TOOL ID
  // --------------------------------------------------------------------------

  // 1: WORD COUNTER
  if (tool.id === 'word-counter') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">LIVE TEXT ANALYSIS</span>
            <h2 className="bv-panel-title">Word & Reading Counter</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Paste or Type Your Text</span>
            <textarea
              className="bv-input bv-textarea"
              rows={10}
              placeholder="Start typing or paste your content here..."
              value={wordText}
              onChange={e => setWordText(e.target.value)}
            />
          </label>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setWordText('')}
            >
              Clear Text
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() =>
                setWordText(
                  'Search engine optimization (SEO) requires comprehensive keyword strategy, crisp metadata, and lightning-fast web speed. Business Volunteers helps ambitious ventures scale with cutting-edge digital infrastructure and data-driven marketing.'
                )
              }
            >
              Try Sample
            </button>
          </div>
        </div>

        {/* METRICS */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>CONTENT METRICS</span>
            <h2 className="bv-panel-title">Live Statistics</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#FFF1EE', borderRadius: '12px', border: '1.5px solid #FF4E27', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF4E27', textTransform: 'uppercase' }}>Words</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0B132A', marginTop: '0.2rem' }}>{wordStats.wordCount}</div>
            </div>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Characters</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B132A', marginTop: '0.2rem' }}>{wordStats.charCount}</div>
            </div>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Sentences</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B132A', marginTop: '0.2rem' }}>{wordStats.sentences}</div>
            </div>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Reading Time</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563EB', marginTop: '0.2rem' }}>~{wordStats.readingTimeMins}m</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.75rem' }}>Top Keyword Frequencies</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {wordStats.topKeywords.length > 0 ? (
                wordStats.topKeywords.map((kw, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      background: '#F1F5F9',
                      fontSize: '0.8rem',
                      color: '#334155',
                      fontWeight: 600
                    }}
                  >
                    <strong>{kw.word}</strong>: {kw.count}x ({kw.density}%)
                  </span>
                ))
              ) : (
                <span style={{ color: '#94A3B8', fontSize: '0.85rem' }}>Type more text to see keyword density.</span>
              )}
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => handleCopy(`Words: ${wordStats.wordCount} | Characters: ${wordStats.charCount} | Sentences: ${wordStats.sentences} | Paragraphs: ${wordStats.paragraphs} | Est Reading: ${wordStats.readingTimeMins} min`)}
          >
            {copied ? '✓ Copied Summary!' : 'Copy Summary'}
          </button>
        </div>
      </div>
    );
  }

  // 2: CHARACTER COUNTER
  if (tool.id === 'character-counter') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">SOCIAL LIMITS</span>
            <h2 className="bv-panel-title">Character Counter</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Enter Message / Copy</span>
            <textarea
              className="bv-input bv-textarea"
              rows={8}
              placeholder="Paste your post or ad copy here..."
              value={charText}
              onChange={e => setCharText(e.target.value)}
            />
          </label>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              onClick={() => setCharText('')}
            >
              Clear
            </button>
          </div>
        </div>

        {/* CHARACTER PROGRESS BARS */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>PLATFORM CHECKS</span>
            <h2 className="bv-panel-title">Platform Safe-Zones</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {charMetrics.limits.map((l, i) => {
              const pct = Math.min(100, Math.round((l.val / l.max) * 100));
              const isOver = l.val > l.max;
              return (
                <div key={i} style={{ background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                    <strong>{l.name}</strong>
                    <span style={{ fontWeight: 800, color: isOver ? '#DC2626' : '#475569' }}>
                      {l.val} / {l.max} {l.extra ? `(${l.extra})` : ''}
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: isOver ? '#DC2626' : pct > 85 ? '#EA580C' : '#10B981',
                        borderRadius: '999px',
                        transition: 'width 0.2s ease'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3: REMOVE DUPLICATE LINES
  if (tool.id === 'remove-duplicate-lines') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">CLEANUP CONFIG</span>
            <h2 className="bv-panel-title">Remove Duplicate Lines</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Original Text List (One per line)</span>
            <textarea
              className="bv-input bv-textarea"
              rows={9}
              value={dupInput}
              onChange={e => setDupInput(e.target.value)}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} />
              Case Sensitive
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={trimWhitespace} onChange={e => setTrimWhitespace(e.target.checked)} />
              Trim Whitespace
            </label>
          </div>

          <label className="bv-field" style={{ marginTop: '0.75rem' }}>
            <span className="bv-field-label">Sorting Mode</span>
            <select className="bv-input bv-select" value={sortOrder} onChange={e => setSortOrder(e.target.value as any)}>
              <option value="none">Preserve Original Order</option>
              <option value="az">Sort Alphabetically (A → Z)</option>
              <option value="za">Sort Reverse (Z → A)</option>
              <option value="len">Sort by Length (Short → Long)</option>
            </select>
          </label>
        </div>

        {/* DUP OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>DEDUPLICATED</span>
            <h2 className="bv-panel-title">Clean Unique List</h2>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
            <div>Original: <strong>{dupResult.origCount}</strong> lines</div>
            <div style={{ color: '#059669' }}>Unique: <strong>{dupResult.uniqueCount}</strong> lines</div>
            <div style={{ color: '#DC2626' }}>Removed: <strong>{dupResult.removedCount}</strong> duplicates</div>
          </div>

          <textarea
            className="bv-input bv-textarea"
            rows={9}
            readOnly
            value={dupResult.output}
            style={{ backgroundColor: '#F8FAFC', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}
          />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => handleCopy(dupResult.output)}
            >
              {copied ? '✓ Copied!' : 'Copy Unique Lines'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => downloadText(dupResult.output, 'deduplicated_lines.txt')}
            >
              Download (.txt)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4: SLUG GENERATOR
  if (tool.id === 'slug-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">SEO SLUGIFY</span>
            <h2 className="bv-panel-title">URL Slug Generator</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Headline / Product Title</span>
            <input
              type="text"
              className="bv-input"
              value={slugSource}
              onChange={e => setSlugSource(e.target.value)}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Word Separator</span>
              <select className="bv-input bv-select" value={slugSep} onChange={e => setSlugSep(e.target.value)}>
                <option value="-">Hyphen (-)</option>
                <option value="_">Underscore (_)</option>
                <option value=".">Dot (.)</option>
                <option value="">No Separator</option>
              </select>
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Letter Casing</span>
              <select className="bv-input bv-select" value={slugCase} onChange={e => setSlugCase(e.target.value as any)}>
                <option value="lower">lowercase</option>
                <option value="upper">UPPERCASE</option>
              </select>
            </label>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginTop: '1rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={removeStopWords} onChange={e => setRemoveStopWords(e.target.checked)} />
            Remove common stop-words (a, an, the, in, on, for, etc.)
          </label>
        </div>

        {/* SLUG OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>URL-SAFE</span>
            <h2 className="bv-panel-title">Generated Slug</h2>
          </div>

          <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '12px', border: '1.5px solid #FF4E27', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Clean Slug</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#FF4E27', fontFamily: 'monospace', wordBreak: 'break-all' }}>
              {generatedSlug || 'enter-headline'}
            </div>
          </div>

          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
            <span>URL Preview: </span>
            <code style={{ background: '#F1F5F9', padding: '0.2rem 0.5rem', borderRadius: '4px', color: '#0B132A' }}>
              https://businessvolunteers.online/{generatedSlug}
            </code>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => handleCopy(generatedSlug)}
          >
            {copied ? '✓ Copied!' : 'Copy Slug'}
          </button>
        </div>
      </div>
    );
  }

  // 5: TEXT DIFF CHECKER
  if (tool.id === 'text-diff-checker') {
    return (
      <div className="bv-tool-layout" style={{ gridTemplateColumns: '1fr' }}>
        <div className="bv-tool-panel" style={{ width: '100%' }}>
          <div className="bv-panel-header">
            <span className="bv-panel-badge">SIDE-BY-SIDE COMPARISON</span>
            <h2 className="bv-panel-title">Text Difference Checker</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <span className="bv-field-label">Original Version</span>
              <textarea
                className="bv-input bv-textarea"
                rows={8}
                value={diffOriginal}
                onChange={e => setDiffOriginal(e.target.value)}
              />
            </div>
            <div>
              <span className="bv-field-label">Modified Version</span>
              <textarea
                className="bv-input bv-textarea"
                rows={8}
                value={diffModified}
                onChange={e => setDiffModified(e.target.value)}
              />
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.75rem' }}>Difference Highlights</h3>
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', fontFamily: 'monospace', fontSize: '0.85rem' }}>
            {diffAnalysis.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  padding: '0.5rem 0.75rem',
                  borderBottom: '1px solid #F1F5F9',
                  background:
                    item.type === 'added' ? '#ECFDF5' : item.type === 'removed' ? '#FEF2F2' : item.type === 'modified' ? '#FFFBEB' : '#FFFFFF',
                }}
              >
                <div style={{ color: item.type === 'removed' || item.type === 'modified' ? '#DC2626' : '#64748B', borderRight: '1px solid #E2E8F0', paddingRight: '0.5rem' }}>
                  {item.orig || <span style={{ opacity: 0.3 }}>-</span>}
                </div>
                <div style={{ color: item.type === 'added' || item.type === 'modified' ? '#16A34A' : '#64748B', paddingLeft: '0.5rem' }}>
                  {item.mod || <span style={{ opacity: 0.3 }}>-</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6: PASSWORD GENERATOR
  if (tool.id === 'password-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">CRYPTO CSPRNG</span>
            <h2 className="bv-panel-title">Password & Passphrase Generator</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Generation Mode</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
                <button
                  type="button"
                  className={pwMode === 'random' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.6rem', fontSize: '0.85rem' }}
                  onClick={() => setPwMode('random')}
                >
                  Random Password
                </button>
                <button
                  type="button"
                  className={pwMode === 'passphrase' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.6rem', fontSize: '0.85rem' }}
                  onClick={() => setPwMode('passphrase')}
                >
                  Memorable Passphrase
                </button>
              </div>
            </label>

            {pwMode === 'random' ? (
              <>
                <label className="bv-field">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="bv-field-label">Length: {pwLength} characters</span>
                  </div>
                  <input
                    type="range"
                    min={8}
                    max={64}
                    value={pwLength}
                    onChange={e => setPwLength(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#FF4E27' }}
                  />
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeUpper} onChange={e => setIncludeUpper(e.target.checked)} />
                    Uppercase (A-Z)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeLower} onChange={e => setIncludeLower(e.target.checked)} />
                    Lowercase (a-z)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeNumbers} onChange={e => setIncludeNumbers(e.target.checked)} />
                    Numbers (0-9)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={includeSymbols} onChange={e => setIncludeSymbols(e.target.checked)} />
                    Symbols (!@#$%)
                  </label>
                </div>
              </>
            ) : (
              <label className="bv-field">
                <span className="bv-field-label">Passphrase Word Count: {pwWords} words</span>
                <input
                  type="range"
                  min={3}
                  max={8}
                  value={pwWords}
                  onChange={e => setPwWords(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#FF4E27', marginTop: '0.5rem' }}
                />
              </label>
            )}

            <label className="bv-field">
              <span className="bv-field-label">Generate in Bulk: {bulkCount} passwords</span>
              <input
                type="range"
                min={1}
                max={10}
                value={bulkCount}
                onChange={e => setBulkCount(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#FF4E27', marginTop: '0.5rem' }}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              onClick={generateNewPasswords}
            >
              🔄 Generate Passwords
            </button>
          </div>
        </div>

        {/* PASSWORD OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>STRONG & SECURE</span>
            <h2 className="bv-panel-title">Generated Passwords</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {generatedPasswords.map((pw, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem'
                }}
              >
                <code style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0B132A', wordBreak: 'break-all' }}>{pw}</code>
                <button
                  type="button"
                  style={{ background: 'transparent', border: 'none', color: '#FF4E27', fontWeight: 800, cursor: 'pointer', padding: '0.25rem 0.5rem', fontSize: '0.85rem' }}
                  onClick={() => handleCopy(pw)}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5 }}>
            🛡️ Generated via your browser&apos;s cryptographically secure <code>crypto.getRandomValues</code> API. No passwords are sent over the network.
          </div>
        </div>
      </div>
    );
  }

  return null;
};
