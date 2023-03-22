import { useGetLastArtInfoByArtId } from '@/api/ArtInfoApi';
import { Art } from '@/models/Art';
import { Card, ImageListItem, ImageListItemBar } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useGetArtListItemImageByArtId } from './useGetArtListItemImageByArtId';

interface IArtListItemProps {
    art: Art;
}

const ArtListItem: React.FunctionComponent<IArtListItemProps> = ({art}) => {
    const router = useRouter();

    const handleImageClick = (id: string) => {
      router.push(`/arts/${id}`)
    }

    const image = useGetArtListItemImageByArtId(art.id);

    const { data: artInfo } = useGetLastArtInfoByArtId(art.id);
    
    let facilityName = ''
    if (artInfo?.facility) {
        const { name } = artInfo.facility;
        facilityName = name ?? 'Exhibited';
    } else {
        facilityName = 'Available';
    }
    
    return (
        <Card>
            <ImageListItem key={art.id} sx={{ cursor: 'pointer' }}>
                {/* <ImageListItemBar position='top' title={facilityName} /> */}
                <img
                    src={image}
                    alt={art.name}
                    onClick={() => handleImageClick(art.id!)}
                    loading='lazy'
                    style={{
                        height: '100%',
                        width: 'auto'
                    }}
                />
                <ImageListItemBar title={art.name} />
            </ImageListItem>
        </Card>
    );
};

export default ArtListItem;
