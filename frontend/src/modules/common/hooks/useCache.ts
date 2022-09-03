import { useState } from 'react';
import uniqueArray from '../../../helpers/utils/uniqueArray';
interface IRegister {
    skip: number;
    limit: number;
    dependency: {
        [key: string]: any;
    };
    register: string;
}
interface ICache<T> {
    [k: string]: T[];
}

type ValidationStore = typeof cacheValidationStore;
interface IUpdateCachePerameter {
    register: { name: keyof ValidationStore; identifierName: string };
    updatedData: any;
}
interface IValidation {
    id: string;
    identifierName: string;
    data: any;
}
const cacheValidationStore: {
    [key: string]: IValidation[];
} = {};

//collect updated cache and store to the global validationStore
export const updateCache = ({ register: { name, identifierName }, updatedData }: IUpdateCachePerameter) => {
    if (!updatedData[identifierName]) {
        throw new Error(`You must provide ${identifierName} on updatedData`);
        return;
    }
    const id = Date.now().toString();

    const findIndex = cacheValidationStore[name]
        ? cacheValidationStore[name].findIndex((cache) => cache.data[identifierName] === updatedData[identifierName])
        : -1;
    if (findIndex < 0) {
        cacheValidationStore[name] = [
            ...(cacheValidationStore[name] ? cacheValidationStore[name] : []),
            {
                id,
                identifierName,
                data: updatedData,
            },
        ];
    } else {
        const _cacheArrayRegisterName = [...cacheValidationStore[name]];
        _cacheArrayRegisterName.splice(findIndex, 1, {
            id,
            identifierName,
            data: updatedData,
        });

        cacheValidationStore[name] = _cacheArrayRegisterName;
    }

    clearCacheValidation(id, name as string);
};

//clear from the store after timeout
const clearCacheValidation = (id: string, registerName: string, duration = 360000) => {
    setTimeout(() => {
        const _cacheArrayRegisterName = [...cacheValidationStore[registerName]];
        const findIndex = _cacheArrayRegisterName.findIndex((cache) => cache.id === id);
        if (findIndex > -1) {
            _cacheArrayRegisterName.splice(findIndex, 1);
            cacheValidationStore[registerName] = _cacheArrayRegisterName;
        }
    }, duration);
};

const getObjectUniqueKey = (object: { [key: string]: any }) => {
    return JSON.stringify(
        Object.keys(object)
            .sort()
            .map((k) => `${k}-${object[k]}`)
            .join('-')
    );
};

//we ceep track our data based on dependency object. So we need to pass only those key which only related to data and help to store data by unique id
const useCache = <T>({ dependency, register, skip, limit }: IRegister) => {
    const [cacheData, setCacheData] = useState<ICache<T>>({});
    const [data, setData] = useState<T[]>([]);
    const setCache = (data: T[]) => {
        const updatedData: IValidation[] = cacheValidationStore[register] || [];
        const uniqueKey = getObjectUniqueKey(dependency || {});

        if (updatedData.length) {
            updatedData.forEach((updated) => {
                data = data.map((d: any) => {
                    if (d[updated.identifierName] === updated.data[updated.identifierName]) {
                        return {
                            ...d,
                            ...updated.data,
                        };
                    }
                    return d;
                });
            });
        }

        const _cache = { ...cacheData };
        _cache[uniqueKey] = {
            ..._cache[uniqueKey],
            [getObjectUniqueKey({ skip, limit })]: data,
        };
        setCacheData(_cache);
        return genaratedData(_cache);
    };

    const genaratedData = (cacheData: ICache<T>) => {
        let data: T[] = [];

        const uniqueKey = getObjectUniqueKey(dependency || {});
        if (!!Object.keys(cacheData).length) {
            Object.values(cacheData[uniqueKey]).forEach((_data: any) => {
                data = [...data, ..._data];
            });
            setData(uniqueArray(data));
            return uniqueArray(data) as T[];
        }
    };

    const updateSingleDataCache = ({ register: { identifierName }, updatedData }: IUpdateCachePerameter) => {
        const _cacheData = { ...cacheData };
        Object.entries(_cacheData).forEach(([key, value]) => {
            Object.entries(value).forEach(([Cachekey, Cachevalue]: any) => {
                const mapedValue = Cachevalue.map((val: any) => {
                    if (val[identifierName] === updatedData[identifierName]) {
                        return {
                            ...val,
                            ...updatedData,
                        };
                    }
                    return val;
                });
                _cacheData[key][Cachekey] = mapedValue;
            });
        });

        genaratedData(_cacheData);
    };

    return { data, setCache, updateSingleDataCache };
};

export default useCache;
