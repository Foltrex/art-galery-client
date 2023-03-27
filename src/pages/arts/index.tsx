import { prefetchInfiniteArts, useLoadMoreArts } from '@/api/ArtApi';
import FilterDropdown, { SortParamsT } from '@/components/ui/FilterDropdown';
import ScrollTop from '@/components/ui/ScrollTop';
import SearchBar from '@/components/ui/SearchBar';
import { useScrollAction } from '@/hooks/useScrollAction';
import { Box, Container, Divider, Paper, Stack } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import ArtList from '../../components/arts/ArtList';

interface IHomeProps {
  env: NodeJS.ProcessEnv
}

export default function Home({ env }: IHomeProps) {
  const [artistName, setArtistName] = useState('');
  const [cityName, setCityName] = useState('');
  const [artNameAndDescription, setArtNameAndDescription] = useState('');
  const [sortParam, setSortParam] = useState<string>();
  const [sortDirection, setSortDirection] = useState<string>();

  const sortParams: SortParamsT[] = [
    {
      value: 'date-creation',
      label: 'Date Creation'
    }
  ];
  
  const { data, fetchNextPage, isSuccess } = useLoadMoreArts({
    artistName: artistName,
    cityName: cityName,
    artNameAndDescription: artNameAndDescription
  });
  
  useScrollAction(() => fetchNextPage())

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
              onClick={setArtistName}
              placeholder='Enter artist name...' />
            <SearchBar
              onClick={setCityName}
              placeholder='Enter city name...' />
            <SearchBar
              onClick={setArtNameAndDescription}
              placeholder='Enter art name or description'
            />
          </Stack>
          
          <FilterDropdown 
            sx={{justifyContent: 'end', mr: 5, mb: 3}} 
            list={sortParams} 
            onSortParamChange={setSortParam}
            onSortDirectionChange={setSortDirection}
          />

          <Divider sx={{mb: 2}} />

          {isSuccess && <ArtList data={data} sortParam={sortParam} sortDirection={sortDirection} />}
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
      dehydratedState: dehydrate(queryClient)
    },
  };
} 