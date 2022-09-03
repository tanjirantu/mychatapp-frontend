import React from 'react';
import { translateEnumToText } from '../../../../helpers/utils';
import StatusIndicator from '../../../common/components/StatusIndicator';
import UserAvatar from '../../../common/components/UserAvatar';
import styles from './OrderStatusCard.module.scss';

interface IOrderStatusCard {
    className?: string;
    onOrderTitleClick: () => void;
    logo: string;
    title: string;
    subTitle: string;
    orderType: string;
    orderStatus: string;
}

const OrderStatusCard: React.FC<IOrderStatusCard> = ({
    className,
    onOrderTitleClick,
    logo,
    title,
    subTitle,
    orderStatus,
    orderType,
}) => {
    return (
        <div className={` bg-white p-3 flex flex-col justify-between  rounded ${className} ${styles.status_card}`}>
            <div>
                <UserAvatar className="border-2 border-white -mt-7" name="User" width={66} height={66} src={logo} />
                <div>
                    <h5
                        className="mt-2 mb-1 text-dh-gray-800 hover:text-dh-red-500 cursor-pointer"
                        onClick={onOrderTitleClick}
                    >
                        {title}
                    </h5>
                    <p className="text-dh-gray-700 font-normal block mb-3">{subTitle}</p>
                    <p className="text-dh-green-700 mt-3">{orderType}</p>
                </div>
            </div>

            <div className={`  flex items-center justify-between gap-1`}>
                <h6 className="text-dh-gray-500  font-medium">{translateEnumToText(orderStatus)}</h6>
                <StatusIndicator status={translateEnumToText(orderStatus.toLowerCase())} />
            </div>
        </div>
    );
};

export default OrderStatusCard;
