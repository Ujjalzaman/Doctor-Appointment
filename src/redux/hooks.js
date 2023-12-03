import { useEffect, useState } from 'react'

export const useDebounced = ({ searchQuery, delay }) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(searchQuery);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(searchQuery);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [searchQuery, delay]);

    return debouncedValue;
}