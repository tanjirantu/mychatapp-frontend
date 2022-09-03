import React from 'react';
import Skeleton from '../Skeleton';
import styles from './ManufecturerProfileCard.module.scss';

interface IMenufecturerProfileCardProps {
    className?: string;
}

const ManufacturerProfileCardSkeleton: React.FC<IMenufecturerProfileCardProps> = ({ className = '' }) => {
    return (
        <div className={className}>
            <div className={styles.card}>
                <div className="relative">
                    <div className={styles.banner}>
                        <Skeleton />
                    </div>
                    <Skeleton
                        className={`absolute overflow-hidden rounded-full box-content  ${styles.logo}`}
                        height={75}
                        width={75}
                    />
                </div>
                <div className={`${styles.profileSummary}`}>
                    <Skeleton className="mt-8" width={200} height={16} />
                    <div className="flex gap-x-4 gap-y-2 mt-2 flex-wrap">
                        <Skeleton width={120} height={10} />
                        <Skeleton width={100} height={10} />
                        <Skeleton width={50} height={10} />
                        <Skeleton width={50} height={10} />
                        <Skeleton width={50} height={10} />
                    </div>
                    <Skeleton height={32} width={120} className="rounded-3xl mt-8" />
                </div>
            </div>
        </div>
    );
};

export default ManufacturerProfileCardSkeleton;
