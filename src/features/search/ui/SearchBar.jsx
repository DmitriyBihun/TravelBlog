import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import AppContainer from '@/shared/ui/AppContainer/AppContainer';

function SearchBar({ onSearch, searchTerm }) {

    const [localValue, setLocalValue] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearch?.(localValue);
        }, 300);

        return () => clearTimeout(handler);
    }, [localValue, onSearch]);

    useEffect(() => {
        setLocalValue(searchTerm);
    }, [searchTerm]);

    const clearSearch = () => {
        setLocalValue('');
        onSearch?.('');
    };

    return (
        <AppContainer>
            <TextField
                fullWidth
                placeholder="Search by city or country..."
                value={localValue || ''}
                onChange={(e) => setLocalValue(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                    ),
                    endAdornment: localValue && (
                        <InputAdornment position="end">
                            <CloseIcon
                                onClick={clearSearch}
                                sx={{ cursor: 'pointer', color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                            />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: 'primary.main',
                        },
                    }
                }}
            />
        </AppContainer>
    );
}

export default SearchBar;