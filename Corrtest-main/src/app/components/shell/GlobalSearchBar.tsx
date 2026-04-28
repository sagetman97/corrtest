import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { globalSearchIndex, type SearchIndexItem } from '../../data/searchIndex';
import { Icon } from '../Icon';

function scoreItem(q: string, item: SearchIndexItem): number {
  if (!q) return 0;
  const terms = [item.label, item.description, item.group, item.path, ...(item.keywords ?? [])]
    .join(' ')
    .toLowerCase();
  if (terms.includes(q)) return 3;
  if (item.label.toLowerCase().includes(q)) return 2;
  if (terms.split(/\s+/).some((w) => w.startsWith(q) && w.length > 2)) return 1;
  return 0;
}

export function GlobalSearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onGlobalKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onGlobalKey);
    return () => window.removeEventListener('keydown', onGlobalKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const ranked = globalSearchIndex
      .map((item) => ({ item, score: scoreItem(q, item) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || a.item.label.localeCompare(b.item.label));
    return ranked.slice(0, 12).map((x) => x.item);
  }, [query]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const choose = useCallback(
    (item: SearchIndexItem) => {
      navigate(item.path);
      setQuery('');
      setOpen(false);
    },
    [navigate],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open || results.length === 0) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') setOpen(true);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(results.length - 1, i + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        choose(results[activeIdx]);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    },
    [activeIdx, choose, open, results],
  );

  return (
    <div ref={wrapRef} className="relative min-w-[200px] max-w-md flex-1">
      <Icon
        name="search"
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-[var(--colors-text-icon-placeholder)]"
      />
      <input
        ref={inputRef}
        type="search"
        placeholder="Search routes & workspaces…"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={open && results.length > 0}
        aria-controls="global-search-results"
        role="combobox"
        value={query}
        onChange={(ev) => {
          setQuery(ev.target.value);
          setOpen(true);
        }}
        onFocus={() => query.trim().length >= 1 && setOpen(true)}
        onKeyDown={onKeyDown}
        className="h-10 w-full rounded-[var(--border-radius-xl)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] pl-9 pr-3 text-sm text-[var(--colors-text-icon-dark)] placeholder:text-[var(--colors-text-icon-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--colors-border-common-accent)]"
        aria-label="Global search"
      />
      {open && query.trim().length >= 1 ? (
        <div
          id="global-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-[80] max-h-[min(420px,70vh)] overflow-auto rounded-[var(--border-radius-base)] border border-[var(--colors-border-common-default)] bg-[var(--colors-background-common-white)] shadow-[var(--shadow-xl)]"
        >
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-[var(--colors-text-icon-medium)]">
              No matches · try “escrow”, “mandatory”, or “insights”
            </p>
          ) : (
            <ul className="py-1">
              {results.map((item, idx) => (
                <li key={item.id} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={idx === activeIdx}
                    id={`search-opt-${item.id}`}
                    className={`flex w-full flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition ${
                      idx === activeIdx
                        ? 'bg-[var(--colors-background-common-ultra-light-neutral)]'
                        : 'hover:bg-[var(--colors-background-common-ultra-light-neutral)]'
                    }`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(item);
                    }}
                  >
                    <span className="font-medium text-[var(--colors-text-icon-dark)]">{item.label}</span>
                    <span className="text-xs text-[var(--colors-text-icon-medium)]">{item.description}</span>
                    <span className="text-[11px] uppercase tracking-wide text-[var(--colors-text-icon-placeholder)]">
                      {item.group} · {item.path}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-[var(--colors-border-common-default)] px-3 py-2 text-[11px] text-[var(--colors-text-icon-placeholder)]">
            ↑↓ navigate · Enter open · Esc close · ⌘/Ctrl+K focus · Prototype index only
          </div>
        </div>
      ) : null}
    </div>
  );
}
