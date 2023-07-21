"use client"
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import React, { useEffect, useRef } from "react";
import { aleoHelper } from "@/utils/aleo/aleo-helper";
import { workerHelper } from "@/utils/aleo/worker-helper";
import axios from "axios";
import { base58ToInteger, splitAndAddField, stringToBase58 } from "@/utils/aleo/aleo-decode";
import { useAleoPrivateKey } from "@/utils/useAleo";
import { metadata } from "@/app/layout";
import { createMomentSwapMetadata, storeMetadataToIPFS } from "@/utils/aleo/IpfsStorage";
import {
    Alert,
    Backdrop,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function Ticket({ params: { id = 1 } }) {
    const router = useRouter()
    const workerRef = useRef<Worker>();
    const aleoPrivate = useAleoPrivateKey((s: any) => s.PK)
    const aleoAddress = useAleoPrivateKey((s: any) => s.Address)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen2(true)
            setTimeout(() => {
                setOpen(false)
            }, 2000)
        }, 60000)
    };
    const ticket_details = {
        name: "Music Festival",
        description: "Here's a brief introduction to the NIGHT MUSIC LIVECONCERT music festival:\n" +
            "\n" +
            "NIGHT MUSIC LIVECONCERT is a dynamic and passionate music extravaganza that brings together an array of musical performances, including live bands and DJs, from various genres. The festival's theme is nightlife and music, allowing audiences to revel in the excitement and energy of the night through music and dance.",
    }
    const handleBuyTicket = async () => {
        handleOpen()
        setOpen3(false)
        workerRef.current = workerHelper();
        const feeRecordArray = JSON.parse(window.localStorage.getItem("aleoRecords") as string)?.filter((t: any) => t.result.indexOf("microcredits") > -1).sort((a: any, b: any) => b.height - a.height)
        const feeRecord = feeRecordArray[feeRecordArray.length - 1];
        const metadata = createMomentSwapMetadata(aleoAddress, ticket_details.name, arr[id]);

        const metadataIPFS = await storeMetadataToIPFS(metadata);

        workerRef.current.addEventListener("message", ev => {
            if (ev.data.type == 'EXECUTION_TRANSACTION_COMPLETED') {
                axios.post("https://vm.aleo.org/api" + "/testnet3/transaction/broadcast", ev.data.executeTransaction, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(
                    (response: any) => {
                        console.log(response.data);
                        handleClose()
                        var request = indexedDB.open('aleoDB', 1);

                        request.onsuccess = function (event: any) {
                            var db = event.target.result;

                            var transaction = db.transaction(['AleoStore'], 'readwrite');
                            var store = transaction.objectStore('AleoStore');

                            var deleteRequest = store.delete(feeRecord.id);

                            deleteRequest.onsuccess = function (event: any) {
                                console.log('success');
                            };

                            deleteRequest.onerror = function (event: any) {
                                console.log('fail');
                            };

                            transaction.oncomplete = function () {
                                db.close();
                            };
                        };

                        request.onerror = function (event) {
                            console.log('open db error');
                        };
                    }, () => { handleClose() }
                )
            } else if (ev.data.type == 'ERROR') {
                handleClose()
                alert(ev.data.errorMessage);
                console.log(ev.data.errorMessage);
            }
        });
        const { remoteProgram, url } = aleoHelper();

        workerRef.current?.postMessage({
            type: 'ALEO_EXECUTE_PROGRAM_ON_CHAIN',
            remoteProgram,
            aleoFunction: "mint_public",
            inputs: [aleoAddress, base58ToInteger(stringToBase58("hello")) + "field", "2u64", "2u64", "2u64", (new Date().getTime() + 100).toString() + "u64", ...splitAndAddField(base58ToInteger(stringToBase58(metadataIPFS.toString())), "field", 4), new Date().getTime().toString() + "u64"],
            privateKey: aleoPrivate,
            fee: 2,
            feeRecord: feeRecord.result,
            url
        });
    }

    return <div className="flex min-h-screen flex-col items-center justify-between p-4">
        <div className={"max-h-screen flex s"}>
            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
            <CardMedia
                sx={{ width: "900px" }}
                component="img"
                alt="green iguana"
                height="50"
                image={arr[id]}
            />
            <CardContent className="flex flex-col justify-between">
                <div>
                    <Typography gutterBottom variant="h5" component="div">
                        {ticket_details.name}
                    </Typography>
                    <Typography className={"whitespace-pre-wrap w-[500px]"} variant="body2" color="text.secondary">
                        {ticket_details.description}
                    </Typography>

                </div>
                <div>
                    <Typography className="mb-2 font-bold" variant="body2" color="text.secondary">
                        <br />
                        <span className={"font-bold"}>Price</span> $15
                    </Typography>
                    <Button variant="outlined" onClick={() => setOpen3(true)}>BUY</Button>
                </div>

            </CardContent>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={function () { }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                open={open3}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Signature Message"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to sign the message
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleBuyTicket} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
}