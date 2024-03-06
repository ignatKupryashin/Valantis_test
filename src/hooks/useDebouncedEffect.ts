import { useEffect, useState } from 'react';

export function useDebouncedEffect(callback: () => void, dependencies: any[], debounceDelay: number) {
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            callback();
        }, debounceDelay);
        setTimer(newTimer);
        return () => clearTimeout(newTimer);
    }, dependencies);
}