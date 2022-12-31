import React from 'react';
import './index.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';
import { data } from './users';

// CLASSIC REACT DATE PICKER

const DatePicker = () => {
  const [filteredData, setFilteredData] = useState([]);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);


  const handleDateRangeChange = (item) => {
    setState([item.selection]);
    const startDate = item.selection.startDate;
    const endDate = item.selection.endDate;
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
    setFilteredData(filteredData);
  };

  return (
    <div>
      <DateRangePicker
        onChange={handleDateRangeChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />
        <div className="datepicker">
            <h1>Users data</h1>
            <div className="datepicker-container">
                {filteredData && filteredData.map((item) => (
                    <div className="datepicker-item" key={item.id}>
                        <p>Name: {item.name}</p>
                        <p>Date: {item.date}</p>
                    </div>
                ))
                }
            </div>
        </div>
    </div>
  );
};

export default DatePicker;

