import Link from 'next/link';
import React from 'react';
import Button from '../../../common/components/Button';
import styles from './ActionCard.module.scss';

const Banner = () => {
    return (
        <div className={`${styles.banner} relative flex rounded bg-white w-full`}>
            <div className={`${styles.banner_image} absolute right-0 top-0 bottom-0`}>
                <img alt="" className="h-full w-full" src="/static/assets/images/action-banner.png" />
            </div>
            <div className="px-6 py-6 relative">
                <h2 className="font-bold mb-8">Access to hundreds of compliant manufacturers</h2>
                <Link href="/search">
                    <a>
                        <Button className="font-medium text-xs">Find manufactures</Button>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Banner;
