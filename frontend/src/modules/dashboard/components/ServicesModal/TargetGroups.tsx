import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGetTargetGroupsQuery } from '../../../../api/target-groups';
import Checkbox from '../../../common/components/Checkbox';
import InfiniteScroll from '../../../common/components/InfiniteScroll';
import useCache from '../../../common/hooks/useCache';
import { ProductGroup } from '../../../../api/product-groups/ProductGroup';
// import { TargetGroup } from "../../common/types/TargetGroup";
import styles from './ServiceModal.module.scss';

interface ITargetProupsProps {
    onChange: (event: boolean, data: ProductGroup) => void;
    selectedTarget: ProductGroup[];
}

const TargetGroups: React.FC<ITargetProupsProps> = ({ selectedTarget, onChange }) => {
    const [filter, setFilter] = useState({ skip: 0, limit: 20 });

    const { data, isLoading, isSuccess, isFetching } = useGetTargetGroupsQuery(filter);

    const { data: targetGroupsData, setCache } = useCache<ProductGroup>({
        register: 'targetGroup',
        dependency: {},
        skip: filter.skip || 0,
        limit: filter.limit || 20,
    });

    useEffect(() => {
        if (data?.result.targetGroups) {
            const groups: any = data.result.targetGroups;
            setCache(groups);
        }
    }, [data?.result.targetGroups]);

    return (
        <>
            <div className="text-xl font-semibold mt-4">Select Target Groups</div>
            <div className="text-sm text-dh-gray-700 mb-4 mt-2">Please pick the target groups of your choice</div>
            <div className="max-h-60 py-3 overflow-y-auto">
                {isLoading && (
                    <div className="flex justify-center items-center py-5">
                        <ClipLoader color="#000" size={40} />
                    </div>
                )}

                {isSuccess ? (
                    <InfiniteScroll
                        isLoading={isFetching}
                        skip={targetGroupsData.length}
                        margin={80}
                        count={data?.result.count || 0}
                        actionEvent={({ skip }) => {
                            setFilter({ ...filter, skip });
                        }}
                    >
                        <div className="grid gap-1 grid-cols-3">
                            {data?.result?.targetGroups?.map((group, index: number) => (
                                <div key={index} className={classNames(`flex mb-4`)}>
                                    <Checkbox
                                        name={group.name}
                                        checked={selectedTarget?.filter((f) => f?.uid === group.uid)?.length > 0}
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
export default TargetGroups;
