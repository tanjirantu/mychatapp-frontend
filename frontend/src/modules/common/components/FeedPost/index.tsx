import React, { useState } from 'react';
import { useLikeProductMutation, useDislikeProductMutation } from '../../../../api/products';
import { updateCache } from '../../hooks/useCache';
import HeartIcon from '../../icons/HeartIcon';
import { Product } from '../../../../api/products/Product';
import UserAvatar from '../UserAvatar';
import styles from './FeedPost.module.scss';

interface IUpdateCachePerameter {
    register: { name: 'products'; identifierName: string };
    updatedData: any;
}
interface IFeedPost {
    className?: string;
    product: Product;
    updateSingleDataCache?: (perameter: IUpdateCachePerameter) => void;
}

const FeedPost: React.FC<IFeedPost> = ({ className, product, updateSingleDataCache }) => {
    const [likeProduct] = useLikeProductMutation();
    const [unlikeProduct] = useDislikeProductMutation();

    const [onActive, setOnActive] = useState(false);

    const handleLikeProduct = async ({
        manufacturerUid,
        productUid,
        likesCount,
    }: {
        productUid: string;
        manufacturerUid: string;
        likesCount: number;
    }) => {
        setOnActive(true);
        setTimeout(() => setOnActive(false), 300);

        try {
            const response = await likeProduct({ manufacturerUid, productUid });
            if ('data' in response && response.data.statusCode === 204) {
                updateCache({
                    register: {
                        identifierName: 'uid',
                        name: 'products',
                    },
                    updatedData: {
                        uid: productUid,
                        isLiked: true,
                    },
                });

                updateSingleDataCache &&
                    updateSingleDataCache({
                        register: {
                            identifierName: 'uid',
                            name: 'products',
                        },
                        updatedData: {
                            uid: productUid,
                            isLiked: true,
                            likesCount,
                        },
                    });
            }
        } catch (error) {}
    };
    const handleunLikeProduct = async ({
        manufacturerUid,
        productUid,
        likesCount,
    }: {
        productUid: string;
        manufacturerUid: string;
        likesCount: number;
    }) => {
        setOnActive(true);
        setTimeout(() => setOnActive(false), 300);

        try {
            const response = await unlikeProduct({ manufacturerUid, productUid });
            if ('data' in response && response.data.statusCode === 204) {
                updateCache({
                    register: {
                        identifierName: 'uid',
                        name: 'products',
                    },
                    updatedData: {
                        uid: productUid,
                        isLiked: false,
                        likesCount,
                    },
                });
                updateSingleDataCache &&
                    updateSingleDataCache({
                        register: {
                            identifierName: 'uid',
                            name: 'products',
                        },
                        updatedData: {
                            uid: productUid,
                            isLiked: false,
                            likesCount,
                        },
                    });
            }
        } catch (error) {}
    };

    const defaultImages = product.images.find((img) => img.isDefault)?.url;
    return (
        <div className={`${className} ${styles.container}`}>
            <div className={`${styles.img_wraper} rounded relative`}>
                {defaultImages ? (
                    <img
                        src={defaultImages}
                        alt={product.title}
                        onError={(event: any) => (event.target.src = '/static/assets/images/no-image-placeholder.webp')}
                    />
                ) : null}

                <div className="absolute bottom-2 left-2 border-2 border-white rounded-full">
                    <UserAvatar
                        name={product.title}
                        width={44}
                        height={44}
                        src={!!product.manufacturer.meta.logo?.url ? product.manufacturer.meta.logo.url : ''}
                    />
                </div>
            </div>
            <div className="flex justify-between mt-4 ">
                <div>
                    <h3 className="font-medium mb-2 ">{product.title}</h3>
                    <div className="flex gap-1.5 items-center">
                        <p className="text-dh-green-700">Min Order Qty: {product.manufacturer.minOrderQty}</p>{' '}
                        <span className={`${styles.dot} rounded-full`}></span>{' '}
                        <p className={styles.like_count}>{product.likesCount} Likes</p>
                    </div>
                </div>
                <div className="flex gap-4 cursor-pointer">
                    <button
                        className="border-0 bg-transparent outline-none"
                        onClick={() =>
                            product.isLiked
                                ? handleunLikeProduct({
                                      manufacturerUid: product.manufacturer.uid,
                                      productUid: product.uid,
                                      likesCount: Number(product.likesCount) - 1,
                                  })
                                : handleLikeProduct({
                                      manufacturerUid: product.manufacturer.uid,
                                      productUid: product.uid,
                                      likesCount: Number(product.likesCount) + 1,
                                  })
                        }
                    >
                        <HeartIcon
                            fill={product.isLiked ? '#ff5b43' : 'none'}
                            stroke={product.isLiked ? 'none' : '#63636a'}
                            className={onActive ? 'w-5 h-5 scale-x-125 scale-y-125' : 'w-5 h-5'}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

FeedPost.defaultProps = {
    className: '',
};
export default FeedPost;
