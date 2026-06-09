import { type HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface TableProps extends HTMLAttributes<HTMLTableElement> {}

const Table = forwardRef<HTMLTableElement, TableProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="w-full overflow-x-auto">
      <table ref={ref} className={clsx("w-full text-14", className)} {...props}>
        {children}
      </table>
    </div>
  );
});

Table.displayName = "Table";

function THead({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={clsx("text-12 text-text-secondary uppercase tracking-wider", className)} {...props}>{children}</thead>;
}

function TBody({ className, children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={clsx("divide-y divide-navy-border", className)} {...props}>{children}</tbody>;
}

function TR({ className, children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={clsx("hover:bg-navy-surface2 transition-colors", className)} {...props}>{children}</tr>;
}

function TH({ className, children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <th className={clsx("px-4 py-3 text-left font-medium whitespace-nowrap", className)} {...props}>{children}</th>;
}

function TD({ className, children, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={clsx("px-4 py-3 text-text-primary whitespace-nowrap", className)} {...props}>{children}</td>;
}

export { Table, THead, TBody, TR, TH, TD };
