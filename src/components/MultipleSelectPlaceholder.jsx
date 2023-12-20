/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
// import { useTheme } from '@mui/material/styles';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';




// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const languages = [
//   'English',
//   'Malayalam',
//   'Kannada',
//   'Hindi',
//   'Telugu',
//   'Tamil',
// ];

// function getStyles(language, languageName, theme) {
//   return {
//     fontWeight:
//       languageName.indexOf(language) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }




// export default function MultipleSelectPlaceholder(props) {
//     const theme = useTheme();
    
  
//     const handleChange = (event) => {
//       const {
//         target: { value },
//       } = event;
//       // eslint-disable-next-line react/prop-types
//       props.setLanguageName(
//         // On autofill we get a stringified value.
//         typeof value === 'string' ? value.split(',') : value,
//       );
//     };
    
  
  
//     return (
//       <div>
//         <FormControl sx={{ m: 0, width: "100%", mt: 0, border: 0, textAlign: "left" }}>
//           <Select
//             multiple
//             displayEmpty
//             // eslint-disable-next-line react/prop-types
//             value={props.languageName}
//             onChange={handleChange}
//             input={<OutlinedInput />}
//             renderValue={(selected) => {
//               if (selected.length === 0) {
//                 return <span>Select Languages</span>;
//               }
  
//               return selected.join(', ');
//             }}
//             MenuProps={MenuProps}
//             inputProps={{ 'aria-label': 'Without label' }}
//           >
//             <MenuItem disabled value="">
//               <span>Select Languages</span>
//             </MenuItem>
//             {languages.map((language) => (
//               <MenuItem
//                 key={language}
//                 value={language}
//                 // eslint-disable-next-line no-undef
//                 style={getStyles(language, props.languageName, theme)}
//               >
                
//                 {language}
//               </MenuItem>
//             ))}
//           </Select>
        
//         </FormControl>
//       </div>
//     );
//   }

import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./MultipleSelectPlaceholder.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const languages = ['English', 'Hindi', 'Kannada', 'Malayalam', 'Tamil', 'Telugu'];

function getStyles(language, selectedLanguages, theme) {
  return {
    fontWeight:
      selectedLanguages.indexOf(language) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const MultipleSelectPlaceholder = ({ languageName, setLanguageName, langErr, setLangErr }) => {
  const theme = useTheme();

  const handleChange = (event) => {
    if(selectedLanguages.length < 1){
          setLangErr(true);
    }
    else{
      setLangErr(false);
    }
    const {
      target: { value },
    } = event;


    if (value.length < 1) {
      setLangErr(true);
    } else {
      setLangErr(false);
    }

    setLanguageName(typeof value === 'string' ? value.split(',') : value);
  };

  const selectedLanguages = languageName || [];

  return (
    <div>
      <FormControl sx={{ m: 0, pb: 0, width: "100%", border: 0, textAlign: "left" }}>
        <Select
          multiple
          displayEmpty
          value={selectedLanguages}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <span>Select Languages</span>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{ pb:0, m:0, height:"7vh" }}
        >
          <MenuItem disabled>
            <span>Select Languages</span>
          </MenuItem>
          {languages.map((language) => (
            <MenuItem
              key={ language }
              value={ language }
              style={ getStyles(language, selectedLanguages, theme) }
            >
              { language }
            </MenuItem>
          ))}
        </Select>
        {/* commenting this line triggers error */}
        {/* {langErr && <span className="show-error">Please select at least one language</span>} */}
      </FormControl>
    </div>
  );
};

MultipleSelectPlaceholder.propTypes = {
  setLanguageName: PropTypes.func.isRequired,
  languageName: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MultipleSelectPlaceholder;
