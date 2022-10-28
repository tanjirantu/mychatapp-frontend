import { IOrderNotFound } from './IOrderNotFound';

const OrderNotFound: React.FC<IOrderNotFound> = ({ title, subtitle, children }) => {
    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center py-40">
                <img src="/static/assets/images/grocery-shopping.png" />
                <h2 className="mt-4 text-dh-gray-800 text-2xl">{title}</h2>
                <p className="mt-2 text-base text-dh-gray-700">{subtitle}</p>

                <span className="mt-4">{children}</span>
            </div>
        </>
    );
};

export default OrderNotFound;
