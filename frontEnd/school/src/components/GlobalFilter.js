import React, {useState} from 'react';
import {useAsyncDebounce} from 'react-table';

export const GlobalFilter = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 500)
  return (
      <div className='search'>
          <span>
              Search: {' '}
              <input
                  value={value || ''}
                  placeholder='search'
                  onChange={(e) => {
                      setValue(e.target.value)
                      onChange(e.target.value)
                  }}
              />
          </span>
      </div>
    )
}
