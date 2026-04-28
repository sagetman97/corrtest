import { ReactNode, useMemo, useState } from 'react';
import { Icon } from '../Icon';
import { cn } from '../ui/utils';

export interface PTableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  freeze?: boolean;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

interface PDataTableProps<T> {
  columns: PTableColumn<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string;
  emptyMessage?: string;
  emptyTitle?: string;
  loading?: boolean;
  errored?: boolean;
  errorMessage?: string;
  onRowClick?: (row: T) => void;
  footer?: ReactNode;
  variant?: 'default' | 'compact';
}

export function PDataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No rows available.',
  emptyTitle = 'No Data',
  loading = false,
  errored = false,
  errorMessage = 'Unable to load table data.',
  onRowClick,
  footer,
  variant = 'default',
}: PDataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    return [...rows].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      const order = aVal > bVal ? 1 : -1;
      return direction === 'asc' ? order : -order;
    });
  }, [rows, sortKey, direction]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setDirection((current) => (current === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(key);
    setDirection('asc');
  };

  return (
    <div className="overflow-hidden rounded-[16px] border border-border bg-card shadow-[var(--shadow-m)]">
      <div className="overflow-x-auto">
        <table className={cn('w-full min-w-[640px]', variant === 'compact' ? 'text-xs' : '')}>
          <thead className="bg-muted/40">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    'px-3 py-2 text-left text-xs uppercase tracking-wide text-muted-foreground',
                    column.sortable ? 'cursor-pointer hover:text-foreground' : '',
                    column.align === 'right' ? 'text-right' : '',
                    column.align === 'center' ? 'text-center' : '',
                    column.freeze ? 'sticky left-0 z-10 bg-muted/40' : '',
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-1">
                    {column.label}
                    {sortKey === column.key ? (
                      <Icon name={direction === 'asc' ? 'arrow-up' : 'arrow-down'} size={11} />
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              <tr>
                <td className="px-3 py-6 text-sm text-muted-foreground" colSpan={columns.length}>
                  Loading table data...
                </td>
              </tr>
            ) : errored ? (
              <tr>
                <td className="px-3 py-6 text-sm text-destructive" colSpan={columns.length}>
                  {errorMessage}
                </td>
              </tr>
            ) : sortedRows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-sm text-muted-foreground" colSpan={columns.length}>
                  <div className="space-y-1">
                    <div className="font-medium text-foreground">{emptyTitle}</div>
                    <div>{emptyMessage}</div>
                  </div>
                </td>
              </tr>
            ) : (
              sortedRows.map((row, index) => (
                <tr
                  key={rowKey(row, index)}
                  className={cn('hover:bg-muted/20', onRowClick ? 'cursor-pointer' : '')}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => {
                    const value = row[column.key];
                    return (
                      <td
                        key={String(column.key)}
                        className={cn(
                          'px-3 py-2.5 text-sm',
                          column.align === 'right' ? 'text-right' : '',
                          column.align === 'center' ? 'text-center' : '',
                          column.freeze ? 'sticky left-0 z-[1] bg-card' : '',
                        )}
                      >
                        {column.render ? column.render(value, row) : String(value ?? '-')}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {footer ? <div className="border-t border-border bg-card p-3">{footer}</div> : null}
    </div>
  );
}
