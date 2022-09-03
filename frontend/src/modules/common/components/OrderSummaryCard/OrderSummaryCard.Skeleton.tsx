import React from 'react';
import Skeleton from '../Skeleton';
import styles from './OrderSummaryCard.module.scss';

interface IOderSummarySkeletonCard {
    className?: string;
}

const OrderSummaryCardSkeleton: React.FC<IOderSummarySkeletonCard> = ({ className = '' }) => {
    return (
        <div className={`w-full bg-white rounded flex items-center ${styles.order_summary_card} ${className}`}>
            <Skeleton className="rounded-md" height={96} width={96} />
            <div className="w-full px-4 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="relative mb-1 gap-3 flex items-center">
                        <Skeleton height={14} width={100} />
                        <Skeleton height={14} width={40} />
                    </div>
                    <Skeleton className="mb-1.5" height={16} width={130} />
                    <Skeleton height={10} width={110} />
                </div>
                <div>
                    <Skeleton height={12} width={130} className=" mb-2.5" />
                    <Skeleton height={16} width={140} className=" mb-3" />
                    <Skeleton height={10} width={100} />
                </div>
                <div>
                    <Skeleton height={12} width={70} className=" mb-2.5" />
                    <Skeleton height={16} width={80} className=" mb-3" />
                    <Skeleton height={10} width={60} />
                </div>
                <div>
                    <Skeleton height={12} width={70} className=" mb-2.5" />
                    <Skeleton height={16} width={80} className=" mb-3" />
                    <Skeleton height={10} width={60} />
                </div>
                <Skeleton height={34} width={121} className="rounded-md" />
            </div>
        </div>
    );
};

export default OrderSummaryCardSkeleton;
