"use client"
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import React, { useCallback, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { TimeAgoAgo } from "@/utils/aleo/time";
import axios from "axios";
import { ToDecodeBase58 } from "@/utils/aleo/aleo-decode";
import Image from 'next/image'

export default function Me() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [data, setData] = useState([])
    const generateFakeData = useCallback(async () => {
        const fakeData: any[] = [];
        const metadata_uri = JSON.parse(window.localStorage.getItem("aleoRecords") as string)?.filter((t: any) => t.result.indexOf("param_ticket_price") > -1)
        // const metadata = metadata_uri?.map((t:any)=>t.result.split("metadata_uri1:")[1]?.split(".private")[0].split("field")[0])
        const handledUri = ToDecodeBase58(metadata_uri?.map((t: any) => {
            const regex = /param_url[1-4]: (\d+)[a-z.]+/g;
            let match;
            const values = [];

            while ((match = regex.exec(t.result)) !== null) {
                const value = match[1].substring(1); // Remove the first digit
                values.push(value);
            }
            const result = values.join('');
            return result;
        }))?.map(t => t.replace("ipfs://", "https://ipfs.io/ipfs/"))
        const requests = handledUri?.map((address: any) => axios.get(address));
        await Promise.all(requests)
            .then((results) => {
                results.forEach((response, i) => {
                    const timeIndex = metadata_uri[i].result.indexOf("time:");
                    const u64Index = metadata_uri[i].result.indexOf("u64", timeIndex);
                    const timeValue = metadata_uri[i].result.slice(timeIndex + 5, u64Index).trim();

                    const moment = {
                        id: 1,
                        address: response.data.name,
                        timestamp: TimeAgoAgo.format(Number(timeValue)),
                        timestamp_n: timeValue,
                        metadataURL: "https://ipfs.io/ipfs/" + response.data.properties.media.cid,
                        contentText: response.data.description,
                        username: window.localStorage.getItem("aleoAvatarName") ?? "",
                        // userImg: window.localStorage.getItem("aleoAvatar") as string??"",
                        userImg: "https://i.seadn.io/gcs/files/06a9042df571917b3904517e89baca76.png?auto=format&dpr=1&w=640",
                        media: "https://ipfs.io/ipfs/" + response.data.properties.media.cid,
                        mediaType: response.data.properties.media.type,
                    };
                    fakeData.push(moment);
                    fakeData.sort((a, b) => (b?.timestamp_n ?? 0) - (a?.timestamp_n ?? 0))

                });
            })
            .catch((error) => {
                console.error(error);
            });
        return fakeData;
    }, [])
    useEffect(() => {
        (async function () {
            const a: any = await generateFakeData()
            setData(a);
        })()
    }, [])

    return <div>
        <div className="w-screen h-[500px]  flex flex-col items-center justify-between">
            <div
                className="w-200 h-200 rounded-full flex flex-col items-center justify-center"
                style={{ fontSize: '264px' }}
            >
                <Image
                    src="https://i.seadn.io/gcs/files/7386920d3a2250737e9278e8d44cba47.gif?auto=format&dpr=1&w=640"
                    className={"rounded-full"}
                    width={300}
                    height={300}
                    alt="Picture of the author"
                />
                <Typography variant="body1" color="text.secondary">
                    Sunshine Beach, Beautiful World In progress
                </Typography>
            </div>
        </div>
        <div className="flex min-h-screen flex-col items-center justify-between p-4">
            <Grid container spacing={2} columns={{ xs: 1, sm: 1, md: 20 }}>
                {/*{data.map((t:any, index) => (*/}
                <Grid xs={2} sm={2} md={4} key={1} className={" p-2"}>
                    <Item className={" border-none shadow-none p-2 bg-transparent"}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                // image={t?.media}
                                image={"https://marketplace.canva.com/EAFftn-UJko/1/0/1600w/canva-black-and-white-purple-neon-night-music-live-concert-ticket-kIP8QR-muEQ.jpg"}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {/*{t.contentText}*/}
                                    Music Festival
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {/*{t.timestamp}*/}
                                    {/*<br/>*/}
                                    {/*{t.address}*/}
                                    20 minutes ago
                                    <br />
                                    These events showcase a wide variety of artists from different genres.
                                </Typography>
                            </CardContent>

                        </Card>
                    </Item>
                </Grid>
                {/*))}*/}
            </Grid>
        </div>
    </div>

}