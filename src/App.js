import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// DatePicker with MUI with fake data

function App() {
  const [value, setValue] = useState([null, null]);
  const [data, setData] = useState(null); 

  const handleChange = (newValue) => {
    setValue(newValue);

    const startDate = newValue[0] ? newValue[0].format('YYYY-MM-DD') : null;
    const endDate = newValue[1] ? newValue[1].format('YYYY-MM-DD') : null;
    fetchData(startDate, endDate).then((data) => {
      setData(data);
    });
  }; 



  const fetchData = (startDate, endDate) => {
    return new Promise((resolve) => {
      const data = [
        {
          id: 1,
          name: 'Product 1',
          date: '2023-01-01',
          price: 20,
        },
        {
          id: 2,
          name: 'Product 2',
          date: '2023-02-01',
          price: 50,
        },
        {
          id: 3,
          name: 'Product 3',
          date: '2023-03-01',
          price: 70,
        },
        {
          id: 4,
          name: 'Product 4',
          date: '2023-04-01',
          price: 90,
        },
  ];

    // Filter the data based on the date range
    const filteredData = data.filter((item) => {
      const itemDate = item.date;
      return (!startDate || itemDate >= startDate) && (!endDate || itemDate <= endDate);
    });

    resolve(filteredData);
  });
}
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={handleChange}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />

      {data && 
        data.map((item) => (
            <div key={item.id}>
                <p>{item.name}</p>
                <p>{item.date}</p>
                <p>{item.price}</p>
            </div>
        ))
      }
    </LocalizationProvider>
  );
}

export default App;