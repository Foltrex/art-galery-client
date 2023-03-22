import { useCallback, useEffect } from "react";

export const useScrollAction = <T>(action: () => T | Promise<T>) => {
    const onScroll = useCallback(async () => {
        const { scrollY, innerHeight } = window;
        const documentHeight = document.body.offsetHeight;
        const isEndOfPage = scrollY + innerHeight > documentHeight;

        if (isEndOfPage) {
            await action();
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll)
    }, []);
}