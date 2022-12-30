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
      <InputLabel style={{ padding:0, margin:0 }} id="demo-select-small">כיתה</InputLabel>
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
      </Select>
    </FormControl>
  );
}