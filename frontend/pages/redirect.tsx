import { useEffect } from 'react';
import { setToken } from '../src/libs/authClient';
import { useRouter } from 'next/router';

const Redirect = () => {
    const router = useRouter();
    const checkToken = () => {
        if (router.query.token) {
            const newToken: string = router.query.token as string;
            setToken({ token: newToken });
        }
    };

    const redirect = () => {
        const redirectUrl: string = (router.query.url as string) || '/';
        router.push(redirectUrl);
    };

    useEffect(() => {
        checkToken();
        redirect();
    }, [router.query]);

    return null;
};

export default Redirect;
