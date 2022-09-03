import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Offer } from '../../../../api/quotations/Quotation';
import CheckMarkIcon from '../../icons/CheckMarkIcon';
import CrossIcon from '../../icons/CrossIcon';
import UserAvatar from '../UserAvatar';

interface IQuotationOfferCard {
    className?: string;
    data: Offer;
    manufacturerUid: string;
}

const QuotationOfferCard: React.FC<IQuotationOfferCard> = ({ className, data }) => {
    const quantity = useMemo(() => {
        let quantity = 0;
        for (let i = 0; i < data?.quantityAndSizes.length; i++) {
            quantity = quantity + data?.quantityAndSizes[i]?.quantity;
        }
        return quantity;
    }, [data]);

    return (
        <div className={`pt-5 rounded bg-white shadow relative`}>
            <div className={`${className} px-5 pb-4`}>
                <UserAvatar
                    className="mb-2.5 mx-auto"
                    name="Tusher"
                    src={data?.manufacturer?.meta?.logo?.url || ''}
                    height={58}
                    width={58}
                />
                <h3 className="text-dh-gray-800 text-center mb-1.5">{data.manufacturer.meta.companyName}</h3>
                <p className="font-normal text-center text-dh-gray-700 mb-4">
                    {data?.manufacturer.addresses.length
                        ? `${data?.manufacturer?.addresses[0]?.city}, &nbsp;${data?.manufacturer?.addresses[0]?.country}`
                        : null}
                </p>
                <div className="flex justify-center gap-2">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <CheckMarkIcon />
                        <p>{dayjs(data?.deliveryDate).format('MMM D')}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <CheckMarkIcon />
                        <p>{quantity}</p>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <CheckMarkIcon />
                        <p>${data?.avgUnitPrice ? data?.avgUnitPrice : null}</p>
                    </div>
                </div>
            </div>
            {data.manufacturer.uid ? (
                <div
                    className={`flex py-1 justify-center w-full rounded-b ${
                        data.approvalStatus === 'IN_PROGRESS' && 'bg-dh-green-400'
                    } ${data.approvalStatus === 'REJECTED' && 'bg-dh-red-500'} ${
                        data.approvalStatus === 'APPROVED' && 'bg-dh-green-700'
                    } text-white text-sm`}
                >
                    {data.approvalStatus === 'APPROVED' && (
                        <p className="font-semibold tracking-wider flex items-center">
                            <CheckMarkIcon stroke="#fff" fill="none" size="24" />
                            Approved
                        </p>
                    )}
                    {data.approvalStatus === 'IN_PROGRESS' && (
                        <p className="font-semibold tracking-wider flex items-center">
                            <CheckMarkIcon stroke="#fff" fill="none" size="24" />
                            In Progress
                        </p>
                    )}
                    {data.approvalStatus === 'REJECTED' && (
                        <p className="font-semibold tracking-wider flex items-center">
                            <CrossIcon /> Rejected
                        </p>
                    )}
                </div>
            ) : (
                <div className="h-8"></div>
            )}
        </div>
    );
};

export default QuotationOfferCard;
