import React, { useMemo } from 'react';
import { Button } from 'react-bootstrap';
import { useTable, useSortBy, useGlobalFilter, useRowSelect } from 'react-table';
import { GlobalFilter } from '../../GlobalFilter';
import { Checkbox } from '../../Checkbox';
import {ROSTER_COLUMNS} from './RosterColumns'
import './RosterTable.css';

export const RosterTable = ({ roster, error}) => {
  
  const columns = useMemo(() => ROSTER_COLUMNS, [])
  const data = useMemo(() => roster, [])

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow,
    state,
    setGlobalFilter,
    selectedFlatRows,
  } = useTable({
    columns,
    data
  },
  useGlobalFilter,
  useSortBy,
  useRowSelect,
  (hooks) => {
    hooks.visibleColumns.push((columns) => {
      return [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps}) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({row}) => (
            <Checkbox {...row.getToggleRowSelectedProps()} />
          )
        },
        ...columns
      ]
    })
  })
  
  const { globalFilter } = state

  const handleClick = () => {
    const row = selectedFlatRows.map((row) => row.original)
    console.log(row);
  }
  
  return (
    <>
      {error &&
        <div className='error'><p>{error}</p></div>}
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {
            headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ?  ' 🔽' : ' 🔼' ) : ''}
                      </span>
                      </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody {...getTableBodyProps()}>
          {
            rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>{
                  row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })
                }
                </tr>
              )
            })
          }
        </tbody>      
      </table>
      <button onClick={handleClick}>Click Me</button>
      <pre>
          <code>
            {JSON.stringify (
              {
                selectedFlatRows: selectedFlatRows.map((row) => row.original),
              },
              null,
              2
            )}
          </code>
        </pre>
    </>
    )
  }