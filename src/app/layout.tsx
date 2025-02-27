"use client";

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Finance Made Simple" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Finomic" />
        <meta property="og:description" content="Finance Made Simple" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://www.finomic.radiantways.in" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Finomic" />
        <meta name="twitter:description" content="Finance Made Simple" />
        <meta name="twitter:image" content="/favicon.ico" />
        <title>Finomic</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <ColorSchemeScript />
      </head>
      <body
        className={`${inter.className}  antialiased`}
      >
        <Provider store={store}>
          <MantineProvider>
            <ToastContainer position="top-right" autoClose={5000} />
            {children}
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
