import { useEffect, useState } from 'react';
import SegmentGroup from './SegmentGroups';
import Step from './Step';
import StepController from './StepController';
import TargetGroups from './TargetGroups';
import ProductGroups from './ProductGroups';
import { ProductGroup } from '../../../../api/product-groups/ProductGroup';
import { useAppSelector, useAppDispatch } from '../../../common/hooks';
import { setUser } from '../../../../reducers/userReducer';
import { useUpdateBuyerMutation } from '../../../../api/buyers';
import useLockBodyScroll from '../../../common/hooks/useLockBodyScroll';

const ServicesModal = () => {
    const [target, setTarget] = useState(1);
    const [segmentGroupData, setSegmentGroupData] = useState<ProductGroup[]>([]);
    const [targetGroupData, setTargetGroupData] = useState<ProductGroup[]>([]);
    const [productGroupData, setProductGroupData] = useState<ProductGroup[]>([]);

    const { data: buyerData } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useLockBodyScroll();

    useEffect(() => {
        setSegmentGroupData([...(buyerData?.segmentGroups || [])]);
        setProductGroupData([...(buyerData?.productGroups || [])]);
        setTargetGroupData([...(buyerData?.targetGroups || [])]);
    }, [buyerData?.segmentGroups, buyerData?.productGroups, buyerData?.targetGroups]);

    const [updateBuyer] = useUpdateBuyerMutation();

    const handleSave = async () => {
        if (!buyerData?.uid) return;

        if (target > 3) return;
        if (target === 2) {
            const queryFulfilled: any = await updateBuyer({ uid: buyerData?.uid, segmentGroups: segmentGroupData });
            if (queryFulfilled.data.statusCode === 204) {
                setTarget(target + 1);
            }
        }
        if (target === 3) {
            const queryFulfilled: any = await updateBuyer({ uid: buyerData?.uid, targetGroups: targetGroupData });
            const { data } = queryFulfilled;
            if (queryFulfilled.data.statusCode === 204) {
                dispatch(setUser(data.result));
            }
        }
        if (target === 1) {
            const queryFulfilled: any = await updateBuyer({ uid: buyerData?.uid, productGroups: productGroupData });
            if (queryFulfilled.data.statusCode === 204) {
                setTarget(target + 1);
            }
        }
    };

    const handleChecked = (isChecked: boolean, group: ProductGroup) => {
        if (target === 2) {
            if (isChecked) {
                setSegmentGroupData([...segmentGroupData, group]);
            }
            if (!isChecked) {
                setSegmentGroupData([...segmentGroupData.filter((f) => f.uid !== group.uid)]);
            }
        }

        if (target === 3) {
            if (isChecked) {
                setTargetGroupData([...targetGroupData, group]);
            }
            if (!isChecked) {
                setTargetGroupData([...targetGroupData.filter((f) => f.uid !== group.uid)]);
            }
        }

        if (target === 1) {
            if (isChecked) {
                setProductGroupData([...productGroupData, group]);
            }
            if (!isChecked) {
                setProductGroupData([...productGroupData.filter((f) => f.uid !== group.uid)]);
            }
        }
    };

    const handleBackToPrevious = () => {
        if (target <= 1) return;
        setTarget(target - 1);
    };

    return (
        <div>
            <Step target={target} />
            <div>
                {target === 1 && (
                    <ProductGroups
                        onChange={(isChecked, group) => handleChecked(isChecked, group)}
                        selectedProduct={productGroupData}
                    />
                )}
                {target === 2 && (
                    <SegmentGroup
                        selectedSegment={segmentGroupData}
                        onChange={(isChecked, group) => handleChecked(isChecked, group)}
                    />
                )}
                {target === 3 && (
                    <TargetGroups
                        selectedTarget={targetGroupData}
                        onChange={(isChecked, group) => handleChecked(isChecked, group)}
                    />
                )}
            </div>
            <StepController backToPrevious={handleBackToPrevious} onClick={handleSave} />
        </div>
    );
};

export default ServicesModal;
