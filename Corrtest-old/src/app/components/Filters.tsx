import { useState } from 'react';
import { Icon } from './Icon';

interface FiltersProps {
  onSearch?: (value: string) => void;
  filters?: Array<{
    label: string;
    options: string[];
    value?: string;
    onChange?: (value: string) => void;
  }>;
  activeFilters?: number;
}

export function Filters({ onSearch, filters = [], activeFilters = 0 }: FiltersProps) {
  const [searchValue, setSearchValue] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="mb-3">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              onSearch?.(e.target.value);
            }}
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md hover:bg-muted/30"
          >
            <Icon name="sliders" size={14} />
            Filters
            {activeFilters > 0 && (
              <span className="bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {activeFilters}
              </span>
            )}
          </button>
        )}
      </div>

      {showFilters && filters.length > 0 && (
        <div className="mt-2 p-3 bg-muted/20 border border-border rounded-md">
          <div className="grid grid-cols-4 gap-3">
            {filters.map((filter) => (
              <div key={filter.label}>
                <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wide">
                  {filter.label}
                </label>
                <select
                  value={filter.value || ''}
                  onChange={(e) => filter.onChange?.(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">All</option>
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
