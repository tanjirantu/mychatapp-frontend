import React, { useEffect, useState } from 'react';
import ManufecturerProfileCard, {
    ManufacturerProfileCardSkeleton,
} from '../../../common/components/ManufecturerProfileCard';
import FilterTags from './FilterTags';
import { useGetManufacturersQuery } from '../../../../api/manufacturers';
import { useGetTagsQuery } from '../../../../api/tags';
import { removeNullOrEmpty } from '../../../../helpers';
import useCache from '../../../common/hooks/useCache';
import { Manufacturer } from '../../../../api/manufacturers/Manufacturer';
import InfiniteScroll from '../../../common/components/InfiniteScroll';
import range from '../../../../helpers/utils/range';

const ManufecturerProfiles = () => {
    const { data: tagsData } = useGetTagsQuery(undefined);
    const [activeTag, setActiveTag] = useState('');
    const [skip, setSkip] = useState(0);
    const { setCache, data: cacheData } = useCache<Manufacturer>({
        register: 'manufacturers',
        dependency: { activeTag },
        skip,
        limit: 12,
    });
    const [searchLoading, setSearchLoading] = useState(false);
    const { data: manufacturersData, isFetching } = useGetManufacturersQuery({
        params: {
            ...removeNullOrEmpty({ tags: activeTag, skip, limit: 12 }),
        },
    });

    useEffect(() => {
        if (manufacturersData?.result?.manufacturers) {
            const manufacturers = manufacturersData.result.manufacturers;
            setCache(manufacturers);
            setSearchLoading(false);
        }
    }, [manufacturersData?.result?.manufacturers]);
    const handleActiveTag = (tag: string) => {
        setSkip(0);
        setSearchLoading(true);
        setActiveTag(tag);
    };

    return (
        <div className="mt-5 pb-6 ">
            <div className="rounded">
                {!!tagsData?.result?.tags?.length ? (
                    <FilterTags
                        tags={[{ name: 'All For you', uid: '' }, ...tagsData?.result.tags]}
                        setActiveTag={(tag) => handleActiveTag(tag)}
                        activeTag={activeTag}
                    />
                ) : null}

                <div className="pb-6 pt-6 max-w-7xl w-full mx-auto ">
                    <div className="flex flex-wrap -mx-3 gap-y-5  relative z-0">
                        {!searchLoading ? (
                            <InfiniteScroll
                                isLoading={isFetching}
                                margin={60}
                                skip={searchLoading ? 0 : cacheData.length}
                                count={manufacturersData?.result?.count || 0}
                                actionEvent={({ skip }) => {
                                    setSkip(skip);
                                }}
                            >
                                {cacheData.map((manufacturer) => {
                                    return (
                                        <ManufecturerProfileCard
                                            bookmark={manufacturer.isBookmarked || false}
                                            className="px-3 w-3/12"
                                            key={manufacturer.uid}
                                            manufacturer={manufacturer}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : null}
                        {searchLoading &&
                            range(1, 12).map((number) => {
                                return <ManufacturerProfileCardSkeleton key={number} className="px-3 w-3/12" />;
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManufecturerProfiles;
