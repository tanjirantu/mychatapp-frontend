import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
// import Script from 'next/script';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);

        return initialProps;
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.5.1/leaflet.css" />
                    <link rel="icon" type="image/png" href="/static/assets/icons/icon-72x72.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/static/icons/icon-72x72.png" />
                    <link rel="shortcut icon" href="/static/assets/icons/icon-192x192.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
