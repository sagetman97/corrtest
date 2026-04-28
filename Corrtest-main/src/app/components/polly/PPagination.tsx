interface PPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PPagination({ page, totalPages, onPageChange }: PPaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        className="rounded-[99px] border border-border px-3 py-1 text-sm hover:bg-muted disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="text-xs text-muted-foreground">Page {page} of {totalPages}</span>
      <button
        className="rounded-[99px] border border-border px-3 py-1 text-sm hover:bg-muted disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
