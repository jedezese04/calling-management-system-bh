import React, { useState, useEffect } from 'react'
import { SelectChangeEvent } from '@mui/material'
import { Select } from '../components'

interface Props {
    onSelect: (e: SelectChangeEvent<string>) => void
}

export const SelectLocation: React.FC<Props> = ({ onSelect }) => {
    const [listItem, setListItem] = useState<Array<{title: string, value: string}>>(
        [
            {
                title: 'Location A',
                value: 'a'
            },
            {
                title: 'Location B',
                value: 'b'
            }
        ]
    )

    useEffect(() => {
        // connect to api here
        // setListItem([])
    }, [])
    
    return <Select
        label=''
        choices={listItem}
        selectionCallback={(e) => {
            onSelect(e)
        }}
        small
    />
}