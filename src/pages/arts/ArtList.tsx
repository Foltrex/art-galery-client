import { IPage } from '@/hooks/react-query';
import { Art } from '@/models/Art';
import { ImageList } from '@mui/material';
import * as React from 'react';
import { InfiniteData } from 'react-query';
import ArtListItem from './ArtListItem';
import { useArtComparator } from './useArtComparator';

interface IArtListProps {
    data: InfiniteData<IPage<Art>>;
    sortParam?: string;
    sortDirection?: string;
}

const ArtList: React.FunctionComponent<IArtListProps> = ({ data, sortParam, sortDirection }) => {
    const comporator = useArtComparator(sortParam, sortDirection);

    const sortedArts = React.useMemo(() => {
        const arts = data.pages.flatMap(page => page.content);
        return [...arts].sort(comporator);
    }, [data, sortParam, sortDirection])

    return (
        <ImageList
            cols={3}
            rowHeight={300}
            sx={{
                width: 'auto',
                p: 5,
                pt: 0
            }}
        >
            {sortedArts.map(art => (
                <ArtListItem key={art.id} art={art} />
            ))}
        </ImageList>
    );
};

export default ArtList;
