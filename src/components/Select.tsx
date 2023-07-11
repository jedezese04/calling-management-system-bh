import React, { useState } from 'react'
import { Select as MUISelect, FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material'

interface Props {
    label: string
    choices: {
        title: string,
        value: string
    }[]
    selectionCallback: (e: SelectChangeEvent<string>) => void
    small?: boolean
}

export const Select: React.FC<Props> = ({ label, choices, selectionCallback, small }) => {
    const [value, setValue] = useState<string>(choices[0].value)

    function handleChange(e: SelectChangeEvent<string>) {
        setValue(e.target.value)
        selectionCallback(e)
    }
    
    return (
        <FormControl>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <MUISelect
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={label}
            value={value}
            defaultValue={choices[0].value}
            onChange={handleChange}
            size={small ? "small" : "medium"}
          >
            {
                choices.length > 0 &&
                choices.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.title}</MenuItem>
                ))
            }
          </MUISelect>
        </FormControl>
    )
}