import { Sort } from '@mui/icons-material';
import { Box, IconButton, MenuItem, Select, SelectChangeEvent, SxProps, Theme } from '@mui/material';
import * as React from 'react';


export type SortParamsT = {
    value: string;
    label: string;
}

interface IFilterDropdownProps {
    list: SortParamsT[];
    sx?: SxProps<Theme>;
    onSortParamChange: (value: string) => void;
    onSortDirectionChange: (value: string) => void;
}

const FilterDropdown: React.FunctionComponent<IFilterDropdownProps> = ({ list, sx, onSortDirectionChange, onSortParamChange }) => {
    const [currentSelectValue, setSelectValue] = React.useState(list[0]); 
    const [isAscendingSort, setIsAscendingSort] = React.useState(true);

    React.useEffect(() => {
        onSortDirectionChange(isAscendingSort ? 'asc' : 'desc');
        onSortParamChange(list[0].value)
    }, []);

    const handleChange = (event: SelectChangeEvent<string>) => {
        onSortParamChange(event.target.value);

        const newValue = list.find(item => item.value === event.target.value);
        if (newValue) {
            setSelectValue(newValue);
        }
    };

    const changeSortDirection = () => {
        onSortDirectionChange(!isAscendingSort ? 'asc' : 'desc');

        setIsAscendingSort(!isAscendingSort);
    }

    return (
        <>
            <Box sx={{justifyContent: 'center', ...sx, display: 'flex', alignItems: 'center'}}>
                <IconButton onClick={changeSortDirection}>
                    {isAscendingSort
                        ? <Sort sx={{ transform: 'rotate(180deg)' }} />
                        : <Sort />
                    }
                </IconButton>

                Sort By

                <Select
                    value={currentSelectValue.value}
                    onChange={handleChange}
                    variant='standard'
                    sx={{
                        borderBottom: 'none',
                        marginLeft: 1,
                        minWidth: 150
                    }}
                >
                    {list.map(item => (
                        <MenuItem 
                            key={item.value} 
                            value={item.value}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </>
    );
};

export default FilterDropdown;
