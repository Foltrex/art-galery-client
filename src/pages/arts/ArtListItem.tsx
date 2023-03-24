import { useGetLastArtInfoByArtId } from '@/api/ArtInfoApi';
import { Art } from '@/models/Art';
import { Box, Card, ImageListItem, ImageListItemBar, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { render } from 'react-dom';
import { useGetArtListItemImageByArtId } from './useGetArtListItemImageByArtId';

interface IArtListItemProps {
    art: Art;
}

const ArtListItem: React.FunctionComponent<IArtListItemProps> = ({ art }) => {
    const router = useRouter();

    const handleImageClick = (id: string) => {
        router.push(`/arts/${id}`)
    }

    const {
        data: image,
        isFetched: isImageFetched,
        isLoading: isImageLoading
    } = useGetArtListItemImageByArtId(art.id);

    const { data: artInfo } = useGetLastArtInfoByArtId(art.id);

    let facilityName = ''
    if (artInfo?.facility) {
        const { name } = artInfo.facility;
        facilityName = name ?? 'Exhibited';
    } else {
        facilityName = 'Available';
    }

    const renderImage = () => {
        if (isImageFetched && image) {
            return (
                <Image
                    src={image}
                    alt={art.name}
                    onClick={() => handleImageClick(art.id!)}
                    fill
                    style={{
                        objectFit: 'cover'
                    }}
                />
            );
        }

        if (isImageLoading) {
            return (
                <Skeleton
                    width='100%'
                    height='100%'
                />
            );
        }

        if (!image) {
            return (
                <Typography
                    variant='h3'
                    sx={{
                        display: 'block',
                        paddingY: '25%',
                        fontFamily: "'Pacifico', cursive",
                        textAlign: 'center',
                    }}
                >
                    Here Must Be Image
                </Typography>
            );
        }
    }

    return (
        <Card sx={{ border: 0.5 }}>
            <ImageListItem key={art.id} sx={{ cursor: 'pointer' }}>
                {renderImage()}
                <ImageListItemBar title={art.name} />
            </ImageListItem>
        </Card>
    );
};

export default ArtListItem;
