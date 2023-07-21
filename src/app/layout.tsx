import './globals.css'
import { Inter } from 'next/font/google'
import Head from "next/head";
import React from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ticket Swift',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <>
      <html lang="en">
        <body >
          <Header />
          <div className={"h-[100px] w-screen p-2"}></div>
          {children}
        </body>
      </html>
    </>

  )
}
