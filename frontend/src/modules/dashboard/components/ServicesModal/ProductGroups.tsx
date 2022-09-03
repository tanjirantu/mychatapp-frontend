import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useGetProductGroupsQuery } from '../../../../api/product-groups';
import Checkbox from '../../../common/components/Checkbox';
import InfiniteScroll from '../../../common/components/InfiniteScroll';
import useCache from '../../../common/hooks/useCache';
import { ProductGroup } from '../../../../api/product-groups/ProductGroup';
import styles from './ServiceModal.module.scss';

interface IProductProupsProps {
    onChange: (event: boolean, data: ProductGroup) => void;
    selectedProduct: ProductGroup[];
}

const ProductGroups: React.FC<IProductProupsProps> = ({ onChange, selectedProduct }) => {
    const [filter, setFilter] = useState({ skip: 0, limit: 20 });
    const { data, isFetching, isLoading } = useGetProductGroupsQuery(filter);

    const { data: productGroupsData, setCache } = useCache<ProductGroup>({
        register: 'productGroup',
        dependency: {},
        skip: filter.skip || 0,
        limit: filter.limit || 20,
    });

    useEffect(() => {
        if (data?.result.productGroups) {
            const groups: any = data.result.productGroups;
            setCache(groups);
        }
    }, [data?.result.productGroups]);

    return (
        <>
            <div className="text-xl font-semibold mt-4">Select Product Groups</div>
            <div className="text-sm pb-3 mt-2">Please pick the product groups of your choice</div>
            <div className="max-h-60 py-3 overflow-y-auto">
                {isLoading && (
                    <div className="flex justify-center items-center py-5">
                        <ClipLoader color="#000" size={40} />
                    </div>
                )}
                {!isLoading && productGroupsData.length ? (
                    <InfiniteScroll
                        isLoading={isFetching}
                        skip={productGroupsData.length}
                        margin={80}
                        count={data?.result.count || 0}
                        actionEvent={({ skip }) => {
                            setFilter({ ...filter, skip });
                        }}
                    >
                        <div className="grid gap-1 grid-cols-3">
                            {productGroupsData?.map((group, index) => (
                                <div key={index} className={classNames(`flex mb-4`)}>
                                    <Checkbox
                                        name={group.name}
                                        checked={selectedProduct?.filter((f) => f?.uid === group.uid)?.length > 0}
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
export default ProductGroups;
