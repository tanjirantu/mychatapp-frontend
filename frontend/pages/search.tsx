import React from 'react';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import AuthLayout from '../src/layouts/AuthLayout';
import MessageLayout from '../src/layouts/MessageLayout';
import { DecodedUser, withSession } from './_app';
import CreateContactModal from '../src/modules/messages/components/CreateContactModal';

const Search = () => {
    return (
        <div>
            <CreateContactModal
                isOpen={true}
                onClose={() => console.log('hi')}
            />
        </div>
    );
};

Search.getLayout = (
    page: ReactNode,
    pageProps: AppProps & { user: DecodedUser }
) => {
    return (
        <AuthLayout user={pageProps.user}>
            <MessageLayout>{page}</MessageLayout>
        </AuthLayout>
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

export default Search;
