import React, { useState } from 'react';
import DashboardHeader from '../../common/components/Header';
import DashboardSummary from '../components/Summary';
import ManufecturerProfiles from '../components/ManufecturerProfiles';
import FeedPosts from '../components/Feedposts';
import BestOfDhakai from '../components/BestOfDhakai';
import Dialog from '../../common/components/Dialog';
import ServicesModal from '../components/ServicesModal';
import { useAppSelector } from '../../common/hooks';
import Tab from '../../common/components/Tab';

const Dashboard = () => {
    const [open, setOpen] = useState(true);
    const { data: buyerData } = useAppSelector((state) => state.user);

    return (
        <div className="bg-dh-gray-200 min-h-screen">
            <DashboardHeader title={<Tab />} />
            <div className="relative">
                <div className="absolute h-14 z-10 bg-dh-green-700 w-full"></div>
                <div className="px-12 z-40 relative pt-6">
                    <section>
                        <DashboardSummary />
                        <BestOfDhakai />
                        <FeedPosts />
                        <ManufecturerProfiles />
                    </section>
                </div>
            </div>
            {buyerData !== null &&
            (!buyerData?.segmentGroups.length || !buyerData?.productGroups.length || !buyerData.targetGroups.length) ? (
                <Dialog className="max-w-lg rounded-lg px-9  pt-10" open={open} onClose={() => setOpen(!open)}>
                    <ServicesModal />
                </Dialog>
            ) : null}
        </div>
    );
};

export default Dashboard;
