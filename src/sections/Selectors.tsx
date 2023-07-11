import React from 'react'
import { Stack, Typography } from '@mui/material';
import { SelectDoctor, SelectLocation } from '../containers';

export const Selectors: React.FC = () => {
    return (
        <Stack direction={"row"} justifyContent={"center"} spacing={5}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography>Doctor Name : </Typography>
                <SelectDoctor
                onSelect={() => {}}
                />
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Typography>Location : </Typography>
                <SelectLocation
                onSelect={() => {}}
                />
            </Stack>
        </Stack>
    )
}