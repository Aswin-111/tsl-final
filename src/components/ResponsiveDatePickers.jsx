/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */

// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// export default function ResponsiveDatePickers({ setDob,setTog }) {
//   // Function to check if a date is in the future
//   const isFutureDate = (date) => dayjs().isBefore(date);

//   // Function to disable future dates
//   const shouldDisableDate = (date) => isFutureDate(date);


//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 0, width: "100%", mt: 0, border: 0 }}>
//       <DatePicker
//         label="DOB"
//         onChange={(newDate) => {setTog(false);setDob(newDate)}}
//         shouldDisableDate={shouldDisableDate}
//       />
//     </LocalizationProvider>
//   );
// }


import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ResponsiveDatePickers({ setDob, setTog }) {
  // Function to check if a date is in the future
  const isFutureDate = (date) => dayjs().isBefore(date);

  // Function to disable dates outside the range 1930-01-01 to 2010-12-31
  const shouldDisableDate = (date) => {
    const minDate = dayjs('1930-01-01');
    const maxDate = dayjs('2010-12-31');
    return isFutureDate(date) || date.isBefore(minDate) || date.isAfter(maxDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ m: 0, width: "100%", mt: 0, border: 0 }}>
      <DatePicker
        label="DOB"
        onChange={(newDate) => { setTog(false); setDob(newDate) }}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
}
