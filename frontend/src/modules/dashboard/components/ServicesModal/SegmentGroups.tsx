import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGetSegmentGroupsQuery } from '../../../../api/segment-groups';
import Checkbox from '../../../common/components/Checkbox';
import InfiniteScroll from '../../../common/components/InfiniteScroll';
import useCache from '../../../common/hooks/useCache';
import { ProductGroup } from '../../../../api/product-groups/ProductGroup';
import { TargetGroup } from '../../../../api/target-groups/TargetGroup';
import styles from './ServiceModal.module.scss';

interface ISegmentProupsProps {
    onChange: (event: boolean, data: TargetGroup) => void;
    selectedSegment: TargetGroup[];
}

const SegmentGroup: React.FC<ISegmentProupsProps> = ({ selectedSegment, onChange }) => {
    const [filter, setFilter] = useState({ skip: 0, limit: 20 });
    const { data, isSuccess, isLoading, isFetching } = useGetSegmentGroupsQuery(filter);
    const { data: segmentGroupsData, setCache } = useCache<ProductGroup>({
        register: 'segmentGroups',
        dependency: {},
        skip: filter.skip || 0,
        limit: filter.limit || 20,
    });

    useEffect(() => {
        if (data?.result.segmentGroups) {
            const groups: any = data.result.segmentGroups;
            setCache(groups);
        }
    }, [data?.result.segmentGroups]);

    return (
        <>
            <div className="text-xl font-semibold mt-4">Select Segment Segment</div>
            <div className="text-sm text-dh-gray-700 mb-4 mt-2">Please pick the segments groups of your choice</div>
            {isLoading && (
                <div className="flex justify-center items-center py-5">
                    <ClipLoader color="#000" size={40} />
                </div>
            )}
            <div className="max-h-60 py-3 overflow-y-auto">
                {isSuccess ? (
                    <InfiniteScroll
                        isLoading={isFetching}
                        skip={segmentGroupsData.length}
                        margin={80}
                        count={data?.result.count || 0}
                        actionEvent={({ skip }) => {
                            setFilter({ ...filter, skip });
                        }}
                    >
                        <div className="grid gap-1 grid-cols-3">
                            {data?.result?.segmentGroups?.map((group, index: number) => (
                                <div key={index} className={classNames(`flex mb-4`)}>
                                    <Checkbox
                                        name={group.name}
                                        checked={selectedSegment?.filter((f) => f?.uid === group.uid)?.length > 0}
                                        onChange={(e) => onChange(e.currentTarget.checked, group)}
                                    />
                                    <div className={classNames(`${styles.checkboxLabel}`)}>{group.name}</div>
                                </div>
                            ))}
                        </div>
                    </InfiniteScroll>
                ) : null}
            </div>
        </>
    );
};
export default SegmentGroup;
