import { IconButton, InputBase, Paper, styled } from '@mui/material';
import * as React from 'react';
import { Search } from '@mui/icons-material';

interface ISearchBarProps {
    onClick: (searchText: string) => void;
    placeholder: string;
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = ({
    onClick,
    placeholder
}) => {
    const [searchText, setSearchText] = React.useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    return (
        <Paper sx={{ position: 'relative', width: '100%' }}>
            <InputBase
                sx={{
                    display: 'block',
                    px: 1,
                    py: 0.5
                }}
                value={searchText}
                onChange={handleInputChange}
                placeholder={placeholder}
            />
            <IconButton
                size='small'
                onClick={() => onClick(searchText)}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translate(0, -50%)',
                    right: 0,
                }}
            >
                <Search />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;
