import { useMemo, useState } from "react";

export type AdminListFilter<TRecord> = {
  key: string;
  label: string;
  predicate: (record: TRecord) => boolean;
};

export type AdminListSortOption<TRecord> = {
  key: string;
  compare: (first: TRecord, second: TRecord) => number;
};

type AdminListControlsOptions<TRecord> = {
  filters?: AdminListFilter<TRecord>[];
  sortOptions?: AdminListSortOption<TRecord>[];
  defaultFilter?: string;
  defaultSort?: string;
};

export function compareBoolean(first: unknown, second: unknown) {
  return Number(Boolean(second)) - Number(Boolean(first));
}

export function compareNumber(first: unknown, second: unknown) {
  return (Number(first) || 0) - (Number(second) || 0);
}

export function compareText(first: unknown, second: unknown) {
  return String(first || "").localeCompare(String(second || ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export default function useAdminListControls<TRecord>(
  records: TRecord[] = [],
  {
    filters = [],
    sortOptions = [],
    defaultFilter = "all",
    defaultSort = "name",
  }: AdminListControlsOptions<TRecord>
) {
  const [activeFilter, setActiveFilter] = useState(defaultFilter);
  const [activeSort, setActiveSort] = useState(defaultSort);

  const filterOptions = useMemo(
    () =>
      filters.map((filter) => ({
        key: filter.key,
        label: filter.label,
        count: records.filter(filter.predicate).length,
      })),
    [filters, records]
  );

  const visibleRecords = useMemo(() => {
    const filter =
      filters.find((option) => option.key === activeFilter) || filters[0];
    const sorter =
      sortOptions.find((option) => option.key === activeSort) || sortOptions[0];

    return records
      .filter(filter?.predicate || (() => true))
      .slice()
      .sort(sorter?.compare || (() => 0));
  }, [activeFilter, activeSort, filters, records, sortOptions]);

  return {
    activeFilter,
    activeSort,
    filterOptions,
    visibleRecords,
    setActiveFilter,
    setActiveSort,
  };
}
