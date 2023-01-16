import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall({values, currentValue, setValue, label}) {

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl sx={{ m: 0, width: 100, height: 50}} size="small">
      <InputLabel style={{ padding:0, margin:0 }} id="demo-select-small">{label}</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={currentValue}
        label={label}
        onChange={handleChange}
      >
        {values?.map((value, index) =>
           <MenuItem key={index} value={value}>{value}</MenuItem>
        )}
      </Select>
    </FormControl>
  );
}