import { ReactNode, FC, useEffect } from 'react';
import { useAppDispatch } from '../../modules/common/hooks';
import { setUser } from '../../reducers/userReducer';
import { getToken } from '../../libs/authClient';
import { DecodedUser } from '../../../pages/_app';
import { getUser } from '../../api/auth';

type Props = {
    children: ReactNode;
    user: DecodedUser | null;
};

const AuthLayout: FC<Props> = ({ children }) => {
    const dispatch = useAppDispatch();

    const checkLogin = async () => {
        const token = getToken();
        if (token) {
            const user = await getUser();
            if (user) {
                return dispatch(setUser(user));
            }
            window.location.href =
                process.env.NEXT_PUBLIC_SIGNIN_URL || '/no-redirect-url-in-env';
        }
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return <>{children}</>;
};
export default AuthLayout;
