import React from 'react';
import styles from './ManufecturerProfileCard.module.scss';
import Link from 'next/link';
import { Manufacturer } from '../../../../api/manufacturers/Manufacturer';
import Button from '../Button';
import UserAvatar from '../UserAvatar';
import ProfileBookmarkIcon from '../../icons/ProfileBookmarkIcon';
import ManufacturerProfileCardSkeleton from './ManufacturerProfileCard.Skeleton';
interface IMenufecturerProfileCardProps {
    className?: string;
    manufacturer: Manufacturer;
    bookmark?: boolean;
}

const MenufecturerProfileCard: React.FC<IMenufecturerProfileCardProps> = ({
    className,
    manufacturer,
    bookmark = false,
}) => {
    return (
        <div className={className}>
            <Link href={`/manufacturer/${manufacturer.uid}`}>
                <a>
                    <div className={`cursor-pointer ${styles.card}`}>
                        <div className="relative">
                            <div className={`${styles.banner} `}>
                                <div
                                    className={`flex gap-0.5 w-full rounded-md overflow-hidden h-full ${
                                        manufacturer.meta.banners.length ? '' : 'bg-dh-gray-200'
                                    }`}
                                >
                                    {manufacturer.meta.banners.slice(0, 3).map((img, index) => {
                                        return (
                                            <div key={index} className={`h-full relative w-full `}>
                                                <img
                                                    className="min-h-full min-w-full max-h-full object-cover"
                                                    key={index}
                                                    src={img.url}
                                                    alt={img.name}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <UserAvatar
                                className={`absolute overflow-hidden rounded-full box-content  ${styles.logo}`}
                                height={75}
                                width={75}
                                src={manufacturer.meta.logo?.url || ''}
                                name={manufacturer.meta.companyName}
                            />
                        </div>

                        <div className={`${styles.profileSummary}`}>
                            <h3>{manufacturer?.meta?.companyName}</h3>
                            <div className="flex mt-1.5 gap-1.5 items-center">
                                <p>Dhaka, Bangladesh</p>
                                <span className={styles.dot}></span>
                                <span className={` text-xs ${styles.qty} text-dh-green-700 font-medium`}>
                                    Min Qty: {manufacturer.minOrderQty}
                                </span>
                            </div>

                            <div className="mb-6 flex flex-wrap">
                                {manufacturer?.productGroups?.length
                                    ? manufacturer.productGroups
                                          .map((item, index) => (
                                              <span key={index} className={`${styles.list} whitespace-pre-line`}>
                                                  {item.name}
                                              </span>
                                          ))
                                          .slice(0, 4)
                                    : null}
                            </div>
                            <div className="flex items-center justify-between">
                                <Button rounded size="sm" color="secondaryGreen">
                                    View Details
                                </Button>
                                {bookmark ? <ProfileBookmarkIcon className="mr-5" /> : null}
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    );
};

MenufecturerProfileCard.defaultProps = {
    className: '',
};
export { ManufacturerProfileCardSkeleton };
export default MenufecturerProfileCard;
