"use client"
import {
    Avatar,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, List, ListItem, ListItemAvatar, ListItemText,
    Popover,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useRef, useState } from "react";
import init, * as aleo from 'aleo-wasm-swift';
import { useAleoPrivateKey } from "@/utils/useAleo";
import axios from "axios";
import { workerRecordHelper } from "@/utils/aleo/worker-helper";
import Link from "next/link";
import { PrivateKey } from "aleo-wasm-swift-decrypt-record";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import WorkIcon from '@mui/icons-material/Work';

export const Header = () => {
    const [open, setOpen] = React.useState(false);
    const started = useRef(false);
    const setAleoPrivate = useAleoPrivateKey((s: any) => s.setAleoPrivateKey)
    const setAleoAddress = useAleoPrivateKey((s: any) => s.setAleoAddress)
    const aleoAddress = useAleoPrivateKey((s: any) => s.Address)
    const aleoPrivate = useAleoPrivateKey((s: any) => s.PK)
    const [refresh, setRefresh] = useState(1)
    const workerRef = useRef<Worker>();
    const workerExecRef = useRef<Worker>();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const PopoverOpen = Boolean(anchorEl);
    const popoverId = open ? 'simple-popover' : undefined;
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        var request = indexedDB.open('aleoDB', 1);

        request.onupgradeneeded = function (event: any) {
            const db = event.target?.result;

            if (!db.objectStoreNames.contains("AleoStore")) {
                db.createObjectStore("AleoStore", { keyPath: "id" });
            }
        };
        request.onsuccess = function (event: any) {
            var db = event.target.result;

            var transaction = db.transaction(['AleoStore'], 'readonly');
            var objectStore = transaction.objectStore('AleoStore');


            var getDataRequest = objectStore.getAll();

            getDataRequest.onsuccess = function (event: any) {
                var data = event.target.result;
                window.localStorage.setItem("aleoRecords", JSON.stringify(data))
            };
            transaction.oncomplete = function (event: any) {
                db.close();
            };
        };
        (async function () {
            console.log(1);
            await aleo.default()
            console.log(aleo);
            JSON.parse(window?.localStorage.getItem("aleoRecords") as string) && typeof window !== "undefined" && JSON.parse(window?.localStorage.getItem("aleoRecords") as string).forEach((t: any, i: number) => {
                const s = (aleo?.PrivateKey?.from_string(aleoPrivate) as PrivateKey).decryptrecords(JSON.stringify([{ record_ciphertext: t.record_ciphertext, sn_id: t.sn_id }]))

                s && axios.get('https://vm.aleo.org/api/testnet3/find/transitionID/' + (JSON.parse(s)[0].sn_id)).then(e => {
                    console.log(e, "is used");
                    var request = indexedDB.open('aleoDB', 1);

                    request.onsuccess = function (event: any) {
                        var db = event.target.result;

                        var transaction = db.transaction(['AleoStore'], 'readwrite');
                        var store = transaction.objectStore('AleoStore');



                        var deleteRequest = store.delete(t.id);

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
                })
            });
        }())
    }, [refresh])
    const handleClose = () => {
        setOpen(false);
        const handleRecords = async (now?: string) => {
            if (started.current) {
                return
            }
            workerRef.current = workerRecordHelper()
            await aleo.default()
            const privateKey = (aleo?.PrivateKey.from_string(aleoPrivate));

            const viewKey = privateKey?.to_view_key().to_string();
            const v = aleo?.ViewKey.from_string(viewKey);
            const address = privateKey?.to_address().to_string();
            setAleoAddress(address)
            window.localStorage.setItem("aleoAddress", address)


            let page
            if (window.localStorage.getItem("aleoHeight")) {
                page = parseInt(window.localStorage.getItem("aleoHeight") as string)
            } else {
                page = 0
            }
            // setAleoLoading(true)

            while (true) {
                started.current = true;
                const height = await axios.get('https://vm.aleo.org/api/testnet3/latest/height').then(e => (e.data))
                console.log("current height: " + height);
                const response: any = await axios.get('http://58.246.225.150:38015/records', {
                    params: {
                        start_block: page,
                        end_block: page + 1000,
                    }
                });
                if (response.data.length === 0) {
                    page > height ? window.localStorage.setItem("aleoHeight", height.toString()) : window.localStorage.setItem("aleoHeight", page.toString())
                }
                window.localStorage.setItem("aleoHeight", page.toString())
                response.data.length > 1 ? page = response.data[response.data.length - 1].height : page
                try {
                    const task = { viewKey, address, response: response.data, privateKey: aleoPrivate };
                    workerRef.current?.postMessage(task);
                } catch (error) {
                    return;
                }

                console.log(page);

                await new Promise((resolve) => setTimeout(resolve, 3000));
                setRefresh(refresh + 1)

            }
        }
        handleRecords();
    }
    return <>
        <div className="bg-gray-800 text-white p-4 fixed top-0 w-screen">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/"><h1 className="text-2xl font-bold">Swift Ticket</h1></Link>
                <nav>
                    <ul className="flex space-x-4">
                        {
                            !aleoAddress && <li>
                                <span onClick={handleClickOpen} className="hover:text-gray-300 cursor-pointer"> Connect</span>
                            </li>
                        }

                        <li>
                            <Link href="/me" className="hover:text-gray-300">Me</Link>
                        </li>
                        <li>
                            {aleoAddress &&
                                /*@ts-ignore*/
                                <div aria-describedby={popoverId} variant="contained" onClick={handlePopoverClick}>
                                    Profile
                                </div>
                            }
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <Popover
            id={popoverId}
            open={PopoverOpen}
            anchorEl={anchorEl}
            sx={{ marginTop: 4, maxHeight: 700 }}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Card sx={{ width: 345 }}>
                <CardMedia
                    sx={{ height: 340 }}
                    image="https://i.seadn.io/gcs/files/7386920d3a2250737e9278e8d44cba47.gif?auto=format&dpr=1&w=640"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Aleo!
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Address: {aleoAddress ? aleoAddress.slice(0, 12) + "..." + aleoAddress.slice(-12) : "-"}
                    </Typography>
                </CardContent>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                    }}
                >

                    <Divider variant="inset" component="li" />
                    {typeof window !== "undefined" && JSON.parse(window?.localStorage.getItem("aleoRecords") as string)?.map((t: any) => <div key={1}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Record" secondary={t.result} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>)}


                </List>

            </Card>
        </Popover>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Set your Private Key"}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="Private"
                    label="Private Key"
                    type="Private"
                    fullWidth
                    variant="standard"
                    // onChange={(e)=> {}}
                    onChange={(e) => setAleoPrivate(e.currentTarget.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} autoFocus>
                    OK!
                </Button>
            </DialogActions>
        </Dialog>
    </>

}