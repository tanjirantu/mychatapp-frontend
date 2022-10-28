import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactNode } from 'react';
import AuthLayout from '../../src/layouts/AuthLayout';
import MessageLayout from '../../src/layouts/MessageLayout';
import MessageContainer from '../../src/modules/messages/containers/MessageContainer';
import { DecodedUser, withSession } from '../_app';

const Messages = () => {
    return <MessageContainer />;
};

Messages.getLayout = (
    page: ReactNode,
    pageProps: AppProps & { user: DecodedUser }
) => {
    return (
        <>
            <Head>
                <title>Messages</title>
            </Head>
            <AuthLayout user={pageProps.user}>
                <MessageLayout>{page}</MessageLayout>
            </AuthLayout>
        </>
    );
};

export const getServerSideProps = withSession(async (ctx, user) => {
    if (user) {
        return {
            props: {
                user,
            },
        };
    }

    return {
        redirect: {
            destination: process.env.NEXT_PUBLIC_SIGNIN_URL,
            permanent: true,
        },
    };
});

export default Messages;
