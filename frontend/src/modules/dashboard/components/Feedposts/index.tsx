import Link from 'next/link';
import React, { useEffect } from 'react';
import { useGetProductsQuery } from '../../../../api/products';
import Button from '../../../common/components/Button';
import FeedPost from '../../../common/components/FeedPost';
import OverflowSlider from '../../../common/components/OverflowSlider';
import useCache from '../../../common/hooks/useCache';
import LeftIcon from '../../../common/icons/LeftIcon';
import { Product } from '../../../../api/products/Product';

const FeedPosts = () => {
    const { data } = useGetProductsQuery({ params: { skip: 0, limit: 20 } });

    const {
        setCache,
        data: cacheData,
        updateSingleDataCache,
    } = useCache<Product>({
        register: 'products',
        dependency: {},
        limit: 20,
        skip: 0,
    });

    useEffect(() => {
        if (data?.result?.products) {
            const products: any = data.result.products;
            setCache(products);
        }
    }, [data?.result?.products]);

    return (
        <>
            {data?.result?.products?.length ? (
                <div className="max-w-7xl mx-auto mt-4">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-[22px] ">Latest Products</h2>
                        <Link href="/products">
                            <a>
                                <Button uppercase rounded size="sm" accessKey="all products" color="secondary">
                                    all Products
                                </Button>
                            </a>
                        </Link>
                    </div>
                    <div className=" rounded px-7 py-5 overflow-hidden shadow-lg  bg-white select-none ">
                        <OverflowSlider
                            slidesToShow={1}
                            className="flex flex-nowrap w-full -mx-3"
                            nextBtn={({ handleNext, activeNext }) =>
                                activeNext ? (
                                    <div
                                        style={{ boxShadow: '0 10px 20px 0 rgba(0, 0, 0, 0.3)' }}
                                        onClick={handleNext}
                                        className={`absolute select-none h-10 w-10  rounded-full bg-white cursor-pointer z-50 top-36 right-3  flex items-center justify-center `}
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
                                        className={`absolute select-none h-10 w-10 rounded-full transform rotate-180 bg-white shadow-xl cursor-pointer z-50 top-36 left-3 bottom-0 flex items-center justify-center `}
                                    >
                                        <LeftIcon className="text-dh-red-500 w-6 h-6 rotate-180 transform" />
                                    </div>
                                ) : (
                                    <></>
                                )
                            }
                        >
                            {cacheData.map((product) => {
                                return (
                                    <div key={product._id} className="px-3">
                                        <FeedPost
                                            updateSingleDataCache={updateSingleDataCache}
                                            className="w-60"
                                            product={product}
                                        />
                                    </div>
                                );
                            })}
                        </OverflowSlider>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default FeedPosts;
