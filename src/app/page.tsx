"use client"
import Image from 'next/image'
import { Grid } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useEffect } from "react";
import { Bubble } from "@/components/Bubble";
import Head from 'next/head';
import Link from "next/link";
import aleo from 'aleo-wasm-swift'
export default function Home() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,

        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const arr = [
        "https://marketplace.canva.com/EAFA7iX_soE/1/0/1600w/canva-dark-blue-modern-night-music-festival-ticket-jis9rnXxMbs.jpg",
        "https://marketplace.canva.com/EAFftn-UJko/1/0/1600w/canva-black-and-white-purple-neon-night-music-live-concert-ticket-kIP8QR-muEQ.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwot9byi1gXcLY1alMxfBXTKCqAQvJfB1f_5sQwQxrHqO_ro1yYTrZCnY6P3MOvl6X0XQ&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpkGq4VUQLrsD6t5pUOisi6-kAebhuy4ovD8_KOuidDGwr_jmmF8cCUI48_l8GXO0hFZ0&usqp=CAU",
        "https://marketplace.canva.com/EAE9Q0hiuEc/1/0/1600w/canva-blue-white-minimalist-the-night-concert-ticket-H4JMsRp6iCc.jpg",
        "https://marketplace.canva.com/EAFZNNFft7g/1/0/1600w/canva-white-and-black-modern-music-concert-modern-ticket-gCaohCfEAt0.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxefP6s7X5YRiDCqZH1Zaom6BQ4MQEHMZhLhq9qVFVjrMuSRHNmVJwKJSbro3eoiGzYXE&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKbj8TNwwe5cFa18OjIi8rwTPU17VFSzmcZ10rqy0UFnyLJ7PvA673VT9KbevbckWbbg&usqp=CAU"
    ]
    const musicFestivalIntro = [
        "Music festivals are the ultimate gathering for music lovers.",
        "These events showcase a wide variety of artists from different genres.",
        "From rock, pop, and hip-hop to EDM and jazz, there's something for everyone.",
        "People come from all over the world to experience the energy and excitement of a music festival.",
        "The atmosphere is electric, with crowds dancing and singing along to their favorite tunes.",
        "Along with the music, festivals offer food, drinks, and art installations.",
        "Whether you're a seasoned festival-goer or a first-timer, music festivals are an unforgettable experience.",
        "7 Days of Joy on the Pacific, sway in the ocean ballroom, and feel your holiday."
    ];

    return (
        <>

            <header className="flex flex-col items-center justify-between p-14">

                <h1 className={" text-5xl"}>TICKET</h1>
                <br />
            </header>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">

                <Grid container spacing={4} columns={{ xs: 1, sm: 1, md: 16 }}>
                    {arr.map((t, index) => (
                        <Grid xs={20} sm={40} md={4} key={index}>
                            <Item className={"m-4 border-none shadow-none"}>
                                <Card sx={{ minWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={t}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {index === 7 ? "Ship ticket" : "Music Festival"}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {musicFestivalIntro[index]}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link href={"ticket/" + index}><Button size="small">BUY</Button></Link>
                                    </CardActions>
                                </Card>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </main>
        </>

    )
}
