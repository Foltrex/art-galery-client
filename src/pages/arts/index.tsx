import { useLoadMoreArts } from '@/api/ArtApi';
import ScrollTop from '@/components/ui/ScrollTop';
import SearchBar from '@/components/ui/SearchBar';
import { prefetchInfiniteQuery, QueryKeyT, useLoadMore } from '@/hooks/react-query';
import { Container, ImageList, ImageListItem, ImageListItemBar, Paper, Stack } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { dehydrate, QueryClient, QueryKey, useInfiniteQuery } from 'react-query';


export type Character = {
  id: number;
  image: string;
  name: string;
  next: string;
}

export type RickAndMortyResponseType = {
  info: object;
  results: Character[];
}

interface IHomeProps {
  initialArtsData: RickAndMortyResponseType;
}

const getArts = ([url, params]: QueryKeyT): Promise<Character[]> => {
  return axios.get(url, {
    params: params
  })
  // return fetch(`https://rickandmortyapi.com/api/character/?page=${params}`)
  //   .then(res => res.json())
  //   .then(res => res as RickAndMortyResponseType)
  //   .then(res => res.results);
}

export default function Home() {
  const [artistName, setArtistName] = useState('');
  const [cityName, setCityName] = useState('');
  const [artSearchBarText, setArtSearchBarText] = useState('');

  const { data, fetchNextPage, isSuccess } = useLoadMoreArts();

  console.log(data)

  const onScroll = async () => {
    const { scrollY, innerHeight } = window;
    const documentHeight = document.body.offsetHeight;
    const isEndOfPage = scrollY + innerHeight > documentHeight;
    if (isEndOfPage) {
      await fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, []);


  const router = useRouter();

  const handleImageClick = (id: number) => {
    router.push(`/arts/${id}`)
  }

  const handleArtistNameSearchBoxClick = (searchText: string) => {
    setArtistName(searchText);
  }

  const handleCityNameSearchBoxClick = (searchText: string) => {
    setArtistName(searchText);
  }

  const handleArtSearchBoxClick = (searchText: string) => {
    setArtSearchBarText(searchText);
  }

  return (
    <>
      <Container sx={{ marginTop: 30, marginBottom: 12, zIndex: 0, position: 'relative' }}>
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

          <ImageList cols={3} rowHeight={400} sx={{ width: 'auto', p: 5, pt: 0 }}>
            {isSuccess && data.pages.map(page =>
              page.content.map(art => (
                <ImageListItem key={art.id} sx={{ cursor: 'pointer' }}>
                  <img
                    src={art.image}
                    alt={art.name}
                    onClick={() => handleImageClick(art.id)}
                    loading='lazy'
                  />
                  <ImageListItemBar position='below' title={art.name} />
                </ImageListItem>
              ))
            )}
          </ImageList>
        </Paper>

        <ScrollTop />
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async ({ req, res }) => {
  const queryClient = new QueryClient();

  const firstPageNumber = 1;
  await prefetchInfiniteQuery<RickAndMortyResponseType>('https://rickandmortyapi.com/api/character', {
    page: 1
  });
  // const data = await fetch('https://rickandmortyapi.com/api/character')
  //   .then(response => response.json());

  // const someData = await fetch('https://rickandmortyapi.com/api/character/?page=2')
  //   .then(response => response.json())
  //   .then(json => console.log(json))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
} 