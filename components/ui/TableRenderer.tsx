import React from 'react';

export interface TableColumn {
  header: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableRendererProps {
  columns: TableColumn[];
  rows: string[][];
  className?: string;
}

export const TableRenderer: React.FC<TableRendererProps> = ({
  columns,
  rows,
  className = '',
}) => {
  const getAlignClass = (align?: 'left' | 'center' | 'right'): string => {
    switch (align) {
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white 
                  border border-gray-300 dark:border-gray-700 ${getAlignClass(column.align)}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                    border border-gray-300 dark:border-gray-700 
                    ${getAlignClass(columns[cellIndex]?.align)}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
