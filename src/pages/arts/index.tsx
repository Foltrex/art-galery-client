import { prefetchInfiniteArts, useLoadMoreArts } from '@/api/ArtApi';
import ScrollTop from '@/components/ui/ScrollTop';
import SearchBar from '@/components/ui/SearchBar';
import { useScrollAction } from '@/hooks/useScrollAction';
import { Box, Container, Paper, Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import ArtList from './ArtList';

export default function Home() {
  const [artistName, setArtistName] = useState('');
  const [cityName, setCityName] = useState('');
  const [artNameAndDescription, setArtNameAndDescription] = useState('');

  
  const { data, fetchNextPage, isSuccess } = useLoadMoreArts({
    artistName: artistName,
    cityName: cityName,
    artNameAndDescription: artNameAndDescription,
  });
  
  useScrollAction(() => fetchNextPage())

  const handleArtistNameSearchBoxClick = (searchText: string) => {
    setArtistName(searchText);
  }

  const handleCityNameSearchBoxClick = (searchText: string) => {
    setCityName(searchText);
  }

  const handleArtSearchBoxClick = (searchText: string) => {
    setArtNameAndDescription(searchText);
  }

  return (
    <>
      <Container 
        sx={{ 
            marginTop: 30, 
            marginBottom: 12, 
            zIndex: 0, 
            position: 'relative' 
          }}
      >
        <Paper>
          <Stack
            direction='row'
            gap={2}
            justifyContent='space-around'
            sx={{
              py: 3, px: 5
            }}
          >
            <SearchBar
              onClick={handleArtistNameSearchBoxClick}
              placeholder='Enter artist name...' />
            <SearchBar
              onClick={handleCityNameSearchBoxClick}
              placeholder='Enter city name...' />
            <SearchBar
              onClick={handleArtSearchBoxClick}
              placeholder='Enter art name or description'
            />
          </Stack>

          {isSuccess && <ArtList data={data} />}
        </Paper>
        <ScrollTop />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async ({ req, res }) => {
  const queryClient = new QueryClient();

  await prefetchInfiniteArts();

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
} 