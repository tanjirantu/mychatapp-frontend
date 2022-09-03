import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../common/components/Button';
import ActionCard from '../ActionCard';
import Banner from '../ActionCard/Banner';
import OrderStatusCard from '../OrderStatusCard';
import { useGetSampleRequestsQuery } from '../../../../api/sample-requests';
import Router from 'next/router';
import { SampleRequest } from '../../../../api/sample-requests/SampleRequest';
import OverflowSlider from '../../../common/components/OverflowSlider';
import LeftIcon from '../../../common/icons/LeftIcon';
import Link from 'next/link';
import { translateEnumToText } from '../../../../helpers/utils';

const DashboardSummary = () => {
    const { data: sampleRequestsResponse, isSuccess } = useGetSampleRequestsQuery({
        exclude: 'DRAFT',
        skip: 0,
        limit: 5,
    });

    const [summaryCardWidth, setSummaryCardWidth] = useState(500);
    const [actionCardswidh, setActionCardWidth] = useState(370);

    const actionCardsRef = useRef<HTMLDivElement>(null);
    const summaryRef = useRef<HTMLDivElement>(null);

    const onSampleRequestCardClick = (sampleRequest: SampleRequest) => {
        const orderStatus = sampleRequest.orderStatus;
        const paymentStatus = sampleRequest.paymentStatus;

        if (orderStatus === 'DRAFT' || paymentStatus === 'PENDING')
            Router.push(`/sample-requests/${sampleRequest.uid}/info`);
    };

    const changeLayout = () => {
        if (isSuccess) {
            const data = sampleRequestsResponse?.result?.sampleRequests?.length || [];
            if (summaryRef.current && actionCardsRef.current) {
                const totalWidth = summaryRef.current?.clientWidth - 370;

                if (data > 4) {
                    setSummaryCardWidth(totalWidth - 16);
                    setActionCardWidth(370);
                } else {
                    setSummaryCardWidth(0);
                }
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', changeLayout);
        changeLayout();

        return () => removeEventListener('resize', changeLayout);
    }, [sampleRequestsResponse?.result.sampleRequests]);

    return (
        <div ref={summaryRef} className="flex  gap-3.5 max-w-7xl mx-auto">
            <div className="flex gap-2 transition-all" ref={actionCardsRef} style={{ width: actionCardswidh }}>
                <ActionCard
                    href="/quotations"
                    icon="/static/assets/icons/request-qoutation-action.png"
                    titleClassName=" text-white "
                    backgroundColor="#7e3442"
                    title={
                        <>
                            Request <br /> Quotations
                        </>
                    }
                    className="w-6/12 transition-all"
                    infoBox={
                        <div className="w-80">
                            {/* <h4 className="text-dh-gray-500 mb-3.5">Know more about Request Quotations</h4> */}
                            <div className="mb-5">
                                <h4 className="mb-1 text-dh-gray-800">
                                    Receive multiple quotations from compliant factories
                                </h4>
                                <p className="text-dh-gray-600">
                                    Find the best fit manufacturer by receiving bids from multiple compliant factories
                                    based on your specific price, timeline and quantity.
                                </p>
                            </div>
                            <Link href="/quotations">
                                <a>
                                    <div className="flex justify-end">
                                        <Button size="sm">Request Now</Button>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    }
                />
                <ActionCard
                    href="/sample-requests"
                    icon="/static/assets/icons/sample-request-action.png"
                    titleClassName=" text-white "
                    backgroundColor="#00745a"
                    title={
                        <>
                            Sample <br /> Request
                        </>
                    }
                    className="w-6/12 transition-all"
                    infoBox={
                        <div className="w-80">
                            {/* <h4 className="text-dh-gray-500 mb-3.5">Know more about Sample Request</h4> */}
                            <div className="mb-5">
                                <h4 className="mb-1 text-dh-gray-800">Get your physical or 3D sample</h4>
                                <p className="text-dh-gray-600">
                                    Start sourcing pre-built, customizable products with your own logos, labels, and
                                    packaging.
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <Button size="sm">Start Now</Button>
                            </div>
                        </div>
                    }
                />
            </div>
            <div className="transition-all" style={{ width: summaryCardWidth === 0 ? 'auto' : summaryCardWidth }}>
                {sampleRequestsResponse?.result.sampleRequests?.length ? (
                    <OverflowSlider
                        slidesToShow={1}
                        className="flex flex-nowrap flex-grow-0 -mx-2"
                        nextBtn={({ handleNext, activeNext }) =>
                            activeNext ? (
                                <div
                                    style={{ boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.3)' }}
                                    onClick={handleNext}
                                    className={`absolute select-none h-10 w-10  rounded-full bg-white cursor-pointer z-50 top-16 -right-4  flex items-center justify-center `}
                                >
                                    <LeftIcon className="text-dh-red-500 w-6 h-6 rotate-180 transform" />
                                </div>
                            ) : (
                                <></>
                            )
                        }
                        prevBtn={({ handlePrev, activePrev }) =>
                            activePrev ? (
                                <div
                                    onClick={handlePrev}
                                    style={{ boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.3)' }}
                                    className={`absolute select-none h-10 w-10 rounded-full transform rotate-180 bg-white shadow-xl cursor-pointer z-50 top-16 -left-4 bottom-0 flex items-center justify-center `}
                                >
                                    <LeftIcon className="text-dh-red-500 w-6 h-6 rotate-180 transform" />
                                </div>
                            ) : (
                                <></>
                            )
                        }
                    >
                        {sampleRequestsResponse.result.sampleRequests.map((sr, i) => (
                            <div key={i} className=" px-2">
                                <OrderStatusCard
                                    onOrderTitleClick={() => onSampleRequestCardClick(sr)}
                                    logo={sr.files ? sr.files[0].url || '' : ''}
                                    title={sr?.productTitle || ''}
                                    subTitle={`Dhakai Inc.`}
                                    orderType={translateEnumToText(sr.orderType)}
                                    orderStatus={sr?.orderStatus || ''}
                                />
                            </div>
                        ))}
                    </OverflowSlider>
                ) : null}
            </div>

            {isSuccess ? sampleRequestsResponse?.result?.sampleRequests?.length <= 1 ? <Banner /> : null : null}
        </div>
    );
};

export default DashboardSummary;

// <ActionCard
// href="/"
// icon="/static/assets/icons/dhakai-express-action.png"
// titleClassName=" text-black "
// backgroundColor="#A7E521"
// title={
//     <>
//         Order <br /> Private-Label
//     </>
// }
// className="w-4/12 transition-all"
// infoBox={
//     <div className="w-80">
//         {/* <h4 className="text-dh-gray-500 mb-3.5">Know more about Request Quotations</h4> */}
//         <div className="mb-5">
//             <h4 className="mb-1">Looking to private label?</h4>
//             <p className="text-dh-gray-600">
//                 Start sourcing pre-built, customizable products with your own logos, labels and
//                 packaging.
//             </p>
//         </div>
//         <div className="flex justify-end">
//             <Button size="sm">Start Now</Button>
//         </div>
//     </div>
// }
// />
