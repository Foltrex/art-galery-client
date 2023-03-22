import { IPage } from '@/hooks/react-query';
import { Art } from '@/models/Art';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import * as React from 'react';
import { InfiniteData } from 'react-query';
import ArtListItem from './ArtListItem';

interface IArtListProps {
    data: InfiniteData<IPage<Art>>;
}

const ArtList: React.FunctionComponent<IArtListProps> = ({ data }) => {
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
            {data.pages.map(page =>
                page.content.map(art => (
                    <ArtListItem 
                        key={art.id}
                        art={art} 
                    />
                ))
            )}
        </ImageList>
    );
};

export default ArtList;
