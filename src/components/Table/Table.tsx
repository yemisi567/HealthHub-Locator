import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getExpandedRowModel,
  Row,
} from "@tanstack/react-table";
import cn from "classnames";
import Card from "../Card/Card";
import styles from "./Table.module.scss";

interface TableProps<TData> {
  /** Table data */
  data: TData[];
  /** Defines table columns and their values */
  columns: ColumnDef<TData>[];
  /** Additional classname for styling */
  className?: string;
  /** Table card className */
  cardClass?: string;
  /**  Function that handles adding styling to each table row */
  handleRowStyle?: (row: Row<TData>) => Record<string, string>;
}

export default function Table<TData>({
  data,
  columns,
  className,
  cardClass,
  handleRowStyle,
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableHiding: true,
  });

  return (
    <Card type="dashboard" className={cn(cardClass)}>
      <div className={cn(styles.wrapper)}>
        <table role="table" className={cn(className, styles.table)}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <>
                <tr key={row.id} style={handleRowStyle && handleRowStyle(row)}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
