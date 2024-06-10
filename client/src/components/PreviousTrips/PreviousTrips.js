import React from "react";
import { useEffect, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { columnDef } from "./columns.js";
import "./table.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function PreviousTrips() {
  // get 'sample' list from the api
  const [samples, setSamples] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/samples`);
      response = await response.json();
      setSamples(response);
    }

    fetchMyAPI();
  }, []);

  // GET previousTrips
  let [previousTrips, setPreviousTrips] = useState([]);
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        `${process.env.REACT_APP_API_SERVER_URL}/fishingTrips`
      );
      response = await response.json();
      console.log(response);
      setPreviousTrips(response);
    }

    fetchMyAPI();
  }, []);

  const finalData = React.useMemo(() => previousTrips, [previousTrips]);
  const finalCol = React.useMemo(() => columnDef, []);

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // table state - with bindings
  const tableInstance = useReactTable({
    columns: finalCol,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  // display previousTrips in a table
  return (
    <div>
      <div className="border border-solid ml-5 mr-5 mt-3 p-3 mb-5 md:ml-10 md:mr-10 md:mt-5 md:p-3 md:pb-5 rounded bg-white shadow-[0px_2px_2px_0px_rgba(0,_0,_0,_0.10)]">
        {/* filter */}
        <div className="flex flex-row inputContainer appearance-none block w-full md:w-1/3 mb-5 text-gray-700 border rounded py-2 px-4 leading-tight outline-none bg-white border-gray-500">
          <span className="text-left">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </span>
          <span>
            <input
              type="text"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
              autoComplete="off"
              className="mt-1 ml-3 outline-none"
            />
          </span>
        </div>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <table>
            <thead>
              {tableInstance.getHeaderGroups().map((headerEl) => {
                return (
                  <tr key={headerEl.id}>
                    {
                      // header
                      headerEl.headers.map((columnEl) => {
                        return (
                          <th
                            key={columnEl.id}
                            colSpan={columnEl.colSpan}
                            onClick={columnEl.column.getToggleSortingHandler()}
                            className="pt-3 pb-3 pr-3 bg-orange-500 text-white"
                          >
                            <div className="flex flex-row items-center justify-center">
                              <span className="ml-2">
                                {flexRender(
                                  columnEl.column.columnDef.header,
                                  columnEl.getContext()
                                )}
                              </span>
                            </div>
                          </th>
                        );
                      })
                    }
                  </tr>
                );
              })}
            </thead>
            <tbody>
              {tableInstance.getRowModel().rows.map((rowEl) => {
                return (
                  <tr key={rowEl.id}>
                    {
                      // data
                      rowEl.getVisibleCells().map((cellEl) => {
                        return (
                          <td key={cellEl.id} className="text-center pt-1 pb-1">
                            {flexRender(
                              cellEl.column.columnDef.cell,
                              cellEl.getContext()
                            )}
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-row mt-4 align-right">
          <button
            type="button"
            onClick={() => tableInstance.setPageIndex(0)}
            disabled={!tableInstance.getCanPreviousPage()}
            className="mr-2 text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.1)]"
          >
            {"<<"}
          </button>
          <button
            type="button"
            onClick={() => tableInstance.previousPage()}
            disabled={!tableInstance.getCanPreviousPage()}
            className="mr-2 text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.1)]"
          >
            Previous Page
          </button>
          <button
            type="button"
            onClick={() => tableInstance.nextPage()}
            disabled={!tableInstance.getCanNextPage()}
            className="mr-2 text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.1)]"
          >
            Next Page
          </button>
          <button
            type="button"
            onClick={() =>
              tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
            }
            disabled={!tableInstance.getCanNextPage()}
            className="text-white bg-orange-500 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_1px_1px_0px_rgba(0,_0,_0,_0.1)]"
          >
            {">>"}
          </button>
        </div>
        <div className="flex flex-row mt-2">
          <div className="mr-2">
            page: {tableInstance.options.state.pagination.pageIndex}
          </div>
          <div className="mr-2">
            total pages: {tableInstance.getPageCount() - 1}
          </div>
        </div>
      </div>
    </div>
  );
}
