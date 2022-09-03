import { useCallback, useEffect, useState } from 'react';
import getUrlParams from '../../../helpers/utils/getUrlParams';

type Params<K extends (...arg: any) => any> = Parameters<K>[0];

type SuccessReturnType<K extends (value: any) => any> = {
    data?: Awaited<ReturnType<K>>;
    isError: boolean;
    isLoading: boolean;
    error: any;
    lazyFetch: (params: Params<K>) => Promise<ReturnType<K>>;
};

const request: {
    [name: string]: any;
} = {};

const useQuery = <T extends (value: any) => any>(
    queryFunction: T,
    query?: {
        skip?: boolean;
        params?: Params<T>;
        onQueryEnd?: (value: Awaited<ReturnType<T>>) => void;
    }
): SuccessReturnType<T> => {
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [isError, setIsError] = useState<boolean>(false);

    const [isLoading, setIsloading] = useState<boolean>(false);

    const removeData = (key: string, timeOut: number) => {
        setTimeout(() => {
            delete request[key];
        }, timeOut);
    };

    const skip = query?.skip === true ? true : false;

    const params = getUrlParams(query?.params);

    const onQueryEnd = query?.onQueryEnd ? query.onQueryEnd : () => ({});

    const memorizedQueryFunction = useCallback(queryFunction, [skip, params]);

    const getResponse = async () => {
        const uniqueName = queryFunction.name + getUrlParams(query?.params || {});

        if (request[uniqueName] === 'initialized') {
            return;
        }

        if (request[uniqueName]) {
            onQueryEnd(request[uniqueName]);
            return;
        }

        try {
            request[uniqueName] = 'initialized';
            setIsloading(true);
            const response = await memorizedQueryFunction(query?.params);
            setData(response);
            setIsloading(false);

            onQueryEnd(response);
            request[uniqueName] = response;
            removeData(uniqueName, 10000);
        } catch (error) {
            setIsError(true);
            setError(error as any);
            setIsloading(false);
            removeData(uniqueName, 0);
        }
    };

    useEffect(() => {
        if (skip === false) {
            getResponse();
        }
    }, [skip, params]);

    const lazyFetch = async (params: Params<T>) => {
        setIsloading(true);
        const response = await memorizedQueryFunction(params);
        setIsloading(false);
        return response;
    };

    return {
        data: data,
        error: error,
        isError,
        isLoading,
        lazyFetch,
    };
};

export default useQuery;
