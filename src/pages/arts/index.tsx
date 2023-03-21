import Navbar from '@/components/layout/Navbar';
import { Container, ImageList, ImageListItem, ImageListItemBar, Paper } from '@mui/material'
import { GetServerSideProps } from 'next'
import Image from 'next/image';
import { useRouter } from 'next/router';


export type Character = {
  id: number;
  image: string;
  name: string;
}

export type RickAndMortyResponseType = {
  info: object;
  results: Character[];
}

interface IHomeProps {
  data: RickAndMortyResponseType;
}

export default function Home({ data }: IHomeProps) {
  const { results } = data;

  const router = useRouter();

  const handleImageClick = (id: number) => {
    router.push(`/arts/${id}`)
  }
  
  return (
    <>
      <Container sx={{ marginY: 30, zIndex: 0 }}>
        <Paper>
          <ImageList cols={3} rowHeight={400} sx={{ width: 'auto', p: 5 }}>
            {results.map((result, index) => (
              <ImageListItem key={index} sx={{ cursor: 'pointer' }}>
                <img 
                  src={result.image} 
                  alt={result.name} 
                  onClick={() => handleImageClick(result.id)} 
                  loading='lazy'
                />
                {/* <Image src={result.image} alt={result.name} /> */}
                <ImageListItemBar position='below' title={result.name} />
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async ({req, res}) => {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const data = await response.json();

  return {
    props: {
      data
    }
  };
} 