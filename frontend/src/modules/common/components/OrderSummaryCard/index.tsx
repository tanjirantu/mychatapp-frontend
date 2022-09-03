import Link from 'next/link';
import Button from '../Button';
import StatusIndicator from '../StatusIndicator';
import styles from './OrderSummaryCard.module.scss';
import { translateEnumToText } from '../../../../helpers/utils';
import OrderSummaryCardSkeleton from './OrderSummaryCard.Skeleton';

const OrderSummaryCard = (props: any) => {
    const {
        uid,
        productTitle,
        productGroup,
        manufacturer = '',
        createdAt,
        orderStatus,
        paymentStatus,
        amount,
        files,
        href,
    } = props;

    return (
        <div className={`w-full bg-white rounded flex items-center ${styles.order_summary_card}`}>
            <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
                <img
                    alt={files[0].name || ''}
                    className="min-w-full min-h-full object-cover"
                    src={files[0].url}
                    onError={(event: any) => (event.target.src = '/static/assets/images/no-image-placeholder.webp')}
                />
            </div>

            <div className="w-full px-4 flex justify-between items-center">
                <div className="flex flex-col gap-2 w-3/12">
                    <div className="relative flex items-center">
                        <span
                            className={`inline-block pr-1 h-4 rounded-sm font-semibold text-dh-green-700 items-center ${styles.tag}`}
                        >
                            {uid}
                        </span>
                        <span className="text-dh-gray-600 font-medium px-2 text-sm">{productGroup}</span>
                    </div>
                    <h4 className="font-medium">{productTitle}</h4>
                    <span className="font-medium text-dh-gray-600">Date: {new Date(createdAt).toDateString()}</span>
                </div>
                <div className="w-3/12">
                    <p className="text-dh-gray-600  mb-2.5">Request to</p>
                    <h5 className="mb-2 font-medium">{manufacturer === '' ? 'Dhakai, Inc.' : manufacturer}</h5>
                    <p className="text-dh-gray-600 font-normal">
                        {manufacturer?.addresses?.length
                            ? `${manufacturer.addresses[0].city}, ${manufacturer.addresses[0].country}`
                            : null}
                    </p>
                </div>
                <div className="w-2/12">
                    <p className="text-dh-gray-600 mb-2.5">Status</p>
                    <div className="flex flex-col gap-1 justify-start">
                        <h5 className="font-medium mb-2">{translateEnumToText(orderStatus)}</h5>
                        <StatusIndicator status={orderStatus.toLowerCase()} />
                    </div>
                </div>
                <div className="w-2/12">
                    <p className="text-dh-gray-600 mb-2.5">Total amount</p>
                    <h5 className="font-medium mb-2">${amount}</h5>
                    <span
                        className={`w-5/6 text-xs rounded px-1 text-white ${
                            paymentStatus == 'SUCCEEDED' || paymentStatus === 'PAID'
                                ? 'bg-dh-green-500'
                                : 'bg-dh-yellow-500 '
                        }`}
                    >
                        {translateEnumToText(paymentStatus)}
                    </span>
                </div>
                <div>
                    <Link href={href}>
                        <a>
                            <Button className="text-dh-green-800" color="secondaryGreen" size="sm">
                                View Details
                            </Button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export { OrderSummaryCardSkeleton };
export default OrderSummaryCard;
