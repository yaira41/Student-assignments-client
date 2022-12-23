import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {innerClasses} from '../../utils/utils';

export default function SelectSmall({classroom, setClassroom}) {

  const handleChange = (event) => {
    setClassroom(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">כיתה</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={classroom}
        label="כיתה"
        onChange={handleChange}
      >
        {innerClasses.map((classroom, index) =>
           <MenuItem key={index} value={classroom}>{classroom}</MenuItem>
        )}
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
}