import { Card, CardContent, CardMedia, createTheme, Grid, ThemeProvider, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Character } from '.';

const theme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif'
        ].join(',')
    }
})

interface IArtProps {
    art: Character;
    qr: string;
}

export default function Art({art, qr}: IArtProps) {
    const router = useRouter();

    console.log(art)
    console.log(qr)
    // console.log(data)
    return (
        <Grid
            container
            justifyContent='center'
            alignItems='center'
            sx={{
                textAlign: 'center',
                mt: 20
            }}
        >
            <Grid
                item
                xs={5}
            >
                <Card sx={{position: 'relative', boxShadow: 'none'}}>
                    <CardMedia image={art.image} sx={{height: 300}} />
                    <CardContent>
                        <ThemeProvider theme={theme}>
                            <Typography variant='h4'>
                                {art.name}
                            </Typography>
                            <Typography variant='body1'>
                                Ivan Ivanovich
                            </Typography>
                            <Typography variant='body1'>
                                maslo, 14.03.2023
                            </Typography>
                            <Typography variant='body1'>
                                Minsk, 1000 rub
                            </Typography>
                        </ThemeProvider>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const {pathname} = url;

    let id;
    const pathParts = pathname.split(/[/.?&]/)
    for (let i = 0; i < pathParts.length; ++i) {
        if (pathParts.at(i) === 'arts') {
            id = pathParts.at(i + 1);
        }
    }

    const art = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(response => response.json());

    const qr = await fetch(
            `https://api.qrserver.com/v1/create-qr-code?size=150x150&data=${req.url}`
        )
        .then(async (response) => {
            const arrayBuffer = await response.arrayBuffer();
            return Buffer.from(arrayBuffer);
        })
        .then(buffer => buffer.toString('base64'));

    return {
      props: {
        art: art, 
        qr: qr
      }
    };
}


{/* <Card sx={{position: 'relative', maxWidth: 345 }} >
<CardMedia
    image={art.image}
/>
<CardContent>
    <Typography gutterBottom variant="h5" component="div">
        {art.name}
    </Typography>
</CardContent>
<Tooltip title='Show QR' sx={{position: 'absolute', bottom: 1, left: 1}} >
    <IconButton>
        <img src={`data:image/png;base64, ${qr}`} />
    </IconButton>
</Tooltip>
</Card>
{/* <CardActions>

</CardActions> */}
{/* <img
src={art.image}
alt={art.name}
/> */}
{/* <h2>{art.name}</h2> */}