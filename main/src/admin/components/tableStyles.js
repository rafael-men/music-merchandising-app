export const adminTablePt = {
  root:    { className: 'admin-datatable' },
  table:   { className: 'w-full' },
  thead:   { className: 'bg-gray-800/60' },
  tbody:   { className: '' },
  emptyMessage: { className: 'text-center text-gray-500' },
  paginator: {
    root: { className: 'flex flex-wrap items-center justify-end gap-1 mt-3 px-2 py-1.5' },
    pageButton: ({ context }) => ({
      className: `min-w-[28px] h-7 px-1.5 text-xs rounded-md flex items-center justify-center transition-colors ${
        context.active
          ? 'bg-white text-black font-semibold'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`,
    }),
    firstPageButton:    { className: 'w-7 h-7 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors flex items-center justify-center' },
    previousPageButton: { className: 'w-7 h-7 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors flex items-center justify-center' },
    nextPageButton:     { className: 'w-7 h-7 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors flex items-center justify-center' },
    lastPageButton:     { className: 'w-7 h-7 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400 transition-colors flex items-center justify-center' },
    pages:   { className: 'flex items-center gap-0.5' },
    current: { className: 'text-[11px] text-gray-500 px-2' },
    RPPDropdown: {
      root:    { className: 'h-7 bg-gray-800 border border-gray-700 rounded-md flex items-center hover:border-gray-600 transition-colors ml-1' },
      input:   { className: 'bg-transparent border-0 text-white text-xs px-2 focus:outline-none' },
      trigger: { className: 'text-gray-500 w-6 flex items-center justify-center shrink-0' },
      panel:   { className: 'bg-gray-800 border border-gray-700 rounded-md mt-1 shadow-xl shadow-black/40 overflow-hidden' },
      list:    { className: 'list-none m-0 p-1' },
      item:    { className: 'text-xs text-gray-200 px-3 py-1.5 hover:bg-gray-700 cursor-pointer list-none rounded' },
    },
  },
}

export const adminColumnPt = {
  headerCell: { className: 'text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-left px-4 py-3 border-b border-gray-800 bg-transparent' },
  bodyCell:   { className: 'text-sm text-gray-200 px-4 py-3 border-b border-gray-800/60' },
}

export const adminPaginatorProps = {
  paginator: true,
  rows: 10,
  rowsPerPageOptions: [10, 25, 50],
  paginatorTemplate: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
  currentPageReportTemplate: '{first}–{last} de {totalRecords}',
}
