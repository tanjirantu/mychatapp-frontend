import React from 'react';
import NoActivity from './NoActivity';
import styles from './MyActivities.module.scss';
const MyActivities = () => {
    const activity = true;
    return (
        <div className="w-full min-h-screen bg-white">
            {activity ? (
                <div className="px-4 py-5 overflow-hidden">
                    <p className="uppercase text-dh-gray-600 mb-4">Quotation updates</p>
                    <div className={`flex flex-nowrap gap-3 ${styles.qutation_update}`}>
                        <div className={`flex-shrink-0 ${styles.qutation_update_box}`}>
                            <div className={styles.qutation_update_img_wraper}>
                                <img src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/pushyya/product_images/1627451409.TEEM0134.jpg" />
                                <div className={`${styles.qutation_update_box_content} flex flex-col justify-between`}>
                                    <span className="text-white bg-dh-green-700 uppercase self-start font-bold rounded-sm h-4">
                                        Jackets
                                    </span>

                                    <div>
                                        <h5 className="text-white">Sodadera Jogging Block</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-4 -space-x-3">
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        className="mx-auto max-w-full max-h-full"
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                        alt="home"
                                    />
                                </div>
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        className="mx-auto max-w-full max-h-full"
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                        alt="home"
                                    />
                                </div>
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        className="mx-auto max-w-full max-h-full"
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                        alt="home"
                                    />
                                </div>
                            </div>
                            <p className="text-dh-gray-500 mt-2">and 15 other response</p>
                        </div>
                        <div className={`flex-shrink-0 ${styles.qutation_update_box}`}>
                            <div className={styles.qutation_update_img_wraper}>
                                <img src="https://webmerx.sgp1.cdn.digitaloceanspaces.com/pushyya/product_images/1627451409.TEEM0134.jpg" />
                                <div className={`${styles.qutation_update_box_content} flex flex-col justify-between`}>
                                    <span className="text-white bg-dh-green-700 uppercase self-start font-bold rounded-sm h-4">
                                        Jackets
                                    </span>

                                    <div>
                                        <h5 className="text-white">Sodadera Jogging Block</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-4 -space-x-3">
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        className="mx-auto max-w-full max-h-full"
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                        alt="home"
                                    />
                                </div>
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        className="mx-auto max-w-full max-h-full"
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                        alt="home"
                                    />
                                </div>
                                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white">
                                    <img
                                        className="mx-auto max-w-full max-h-full"
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                                        alt="home"
                                    />
                                </div>
                            </div>
                            <p className="text-dh-gray-500 mt-2">and 15 other response</p>
                        </div>
                    </div>
                    <p className="uppercase text-dh-gray-600 my-5">Most Recent</p>
                    <div className={`${styles.notification} flex mb-7`}>
                        <div className={`${styles.icon} flex-shrink-0 rounded-full bg-dh-green-700`}></div>
                        <div className={styles.notification_body}>
                            <h6>
                                <span className="font-semibold">Superfine Fashion Ltd.</span> send you a new message
                                with attachment
                            </h6>
                            <p className="text-dh-green-700">18 minunites ago</p>
                        </div>
                    </div>
                    <div className={`${styles.notification} flex mb-7`}>
                        <div className={`${styles.icon} flex-shrink-0 rounded-full bg-dh-green-700`}></div>
                        <div className={styles.notification_body}>
                            <h6>
                                <span className="font-semibold">Superfine Fashion Ltd.</span> send you a new message
                                with attachment
                            </h6>
                            <p className="text-dh-green-700">18 minunites ago</p>
                        </div>
                    </div>
                    <div className={`${styles.notification} flex mb-7`}>
                        <div className={`${styles.icon} flex-shrink-0 rounded-full bg-dh-green-700`}></div>
                        <div className={styles.notification_body}>
                            <h6>
                                <span className="font-semibold">Superfine Fashion Ltd.</span> send you a new message
                                with attachment
                            </h6>
                            <p className="text-dh-green-700">18 minunites ago</p>
                        </div>
                    </div>
                </div>
            ) : (
                <NoActivity />
            )}
        </div>
    );
};

export default MyActivities;
