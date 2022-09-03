import React, { useEffect } from 'react';
import { useGetManufacturersQuery } from '../../../../api/manufacturers';
import range from '../../../../helpers/utils/range';
import ManufecturerProfileCard, {
    ManufacturerProfileCardSkeleton,
} from '../../../common/components/ManufecturerProfileCard';
import useCache from '../../../common/hooks/useCache';
import { Manufacturer } from '../../../../api/manufacturers/Manufacturer';

const BestOfDhakai = () => {
    const { data: manufacturersData, isLoading } = useGetManufacturersQuery({
        params: {
            isFeatured: true,
        },
    });

    const { setCache, data: cacheData } = useCache<Manufacturer>({
        register: 'manufacturers',
        dependency: {},
        skip: 0,
        limit: 0,
    });

    useEffect(() => {
        if (manufacturersData?.result?.manufacturers) {
            const manufacturers: any = manufacturersData.result.manufacturers;
            setCache(manufacturers);
        }
    }, [manufacturersData?.result?.manufacturers]);
    return (
        <>
            {cacheData.length ? (
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-[22px] mt-9 mb-4 ">Best of Dhakai</h2>
                    <div className="pb-9 ">
                        <div className="rounded">
                            <div className="flex flex-wrap gap-y-5 -mx-3 relative z-0">
                                {!isLoading
                                    ? cacheData.map((manufacturer) => {
                                          return (
                                              <ManufecturerProfileCard
                                                  bookmark={manufacturer.isBookmarked || false}
                                                  className="px-3 w-3/12"
                                                  key={manufacturer.uid}
                                                  manufacturer={manufacturer}
                                              />
                                          );
                                      })
                                    : range(1, 4).map((number) => {
                                          return (
                                              <ManufacturerProfileCardSkeleton key={number} className="px-3 w-3/12" />
                                          );
                                      })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default BestOfDhakai;
