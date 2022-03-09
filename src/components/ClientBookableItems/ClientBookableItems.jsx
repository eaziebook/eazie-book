import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import './ClientBookableItem.css'
const itemData = [
    {
        img: 'https://d1nkxkz7ge96ao.cloudfront.net/eyJidWNrZXQiOiJzbW4tbWFpbi1zaXRlLWJ1Y2tldCIsImtleSI6ImltYWdlc1wvaW1hZ2luXC9McktPcmhFcE5FN0FNV3lFQUxRMUpFOE0wTjVsc1VkekxsNU9ZcEZsLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MjYwMCwiaGVpZ2h0IjoxMzAwLCJmaXQiOiJjb3ZlciJ9fX0=',
        title: 'boat 1',
        rate: '4/20 an hr', 
        datesAvailable: 'zorp', 
        detail: 'zeep'

    },
    {
        img: 'https://media.kare11.com/assets/KARE/images/5da0a2e9-81c3-4169-9cbb-be95fc892207/5da0a2e9-81c3-4169-9cbb-be95fc892207_1920x1080.jpg',
        title: 'Boat 2',
        rate: '4/20 an hr',
        datesAvailable: 'zorp',
        detail: 'zeep'
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        rate: '4/20 an hr',
        datesAvailable: 'zorp',
        detail: 'zeep'
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        rate: '4/20 an hr',
        datesAvailable: 'zorp',
        detail: 'zeep'
    },
    
];

function ClientBookableItems() {
    return (
        <>
        <h1>Client Bookable items</h1>
            <ImageList sx={{ width: 900, height: 750 }}>

                 {itemData.map(item => {
                    return (
                        <>
                            <Grid container key={item.img}>
                                <Grid item>
                                    <ImageListItem>
                                        <img
                                            src={`${item.img}?w=248&fit=crop&auto=format`}
                                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                            alt={item.title}
                                            loading='lazy'
                                        />
                                    </ImageListItem>
                                

                                
                                    <Typography variant='h5'>{item.title}</Typography>
                                    <Typography variant='h5'>rate: {item.rate}</Typography>
                                    <Typography variant='h5'>dates available: {item.datesAvailable}</Typography>
                                    <Typography variant='h5'>{item.detail}</Typography>
                                </Grid>
                            </Grid>
                        </>
                    )
                })}



            </ImageList>
        </>
    )
}

export default ClientBookableItems;