import { KeyboardArrowUp } from '@mui/icons-material';
import { Fab, useScrollTrigger, Zoom } from '@mui/material';
import * as React from 'react';

interface IScrollTopProps {
}

const ScrollTop: React.FunctionComponent<IScrollTopProps> = (props) => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100
    })

    const scrollTop = React.useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } , []);

    return (
        <Zoom in={trigger}>
            <Fab
                onClick={scrollTop}
                sx={{
                    position: 'fixed',
                    zIndex: 3,
                    bottom: 35, 
                    right: 35
                }}
            >
                <KeyboardArrowUp />
            </Fab>
        </Zoom>
    );
};

export default ScrollTop;
