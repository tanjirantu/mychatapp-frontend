import CheckMarkFilledIcon from '../../../common/icons/CheckMarkFilledIcon';
import TrashIcon from '../../icons/TrashIcon';
import { IAddressCard } from './IAddressCard';

const AddressCard: React.FC<IAddressCard> = ({
    checked,
    index,
    uid,
    street,
    city,
    state,
    country,
    zipCode,
    onClick,
    onEdit,
    onDelete,
}) => {
    return (
        <>
            <div
                className={`rounded bg-opacity-60  border h-56 ${
                    checked && 'border-2 border-dh-green-700'
                } hover:border-2 hover:border-dotted hover:border-dh-green-700`}
            >
                <div className="h-12 px-[17px] flex items-center justify-between border-b border-dh-gray-300 ">
                    <div className="flex gap-4 items-center">
                        {checked ? (
                            <button className="w-6 h-6 flex items-center justify-center rounded-full">
                                <CheckMarkFilledIcon />
                            </button>
                        ) : (
                            <button
                                onClick={() => onClick(uid)}
                                className="w-6 h-6 flex items-center justify-center border-2 border-dh-gray-500 rounded-full"
                            ></button>
                        )}

                        <h4 className="text-dh-gray-800">Address {index}</h4>
                    </div>
                    <div className="flex gap-5">
                        <button onClick={() => onEdit(uid)}>
                            <img src="/static/assets/icons/edit.png" alt="" />
                        </button>
                        <button
                            onClick={() => onDelete(uid)}
                            className="text-dh-gray-600 stroke-current hover:text-dh-red-500"
                        >
                            <TrashIcon />
                        </button>
                    </div>
                </div>
                <div className="px-[21px] pt-[20px] cursor-pointer" onClick={() => onClick(uid)}>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6">
                            <img className="flex-shrink-0 w-4" src="/static/assets/icons/location.svg" alt="" />
                        </div>

                        <div className="pr-3">
                            <h4 className="font-medium text-dh-gray-800 mb-4">
                                {zipCode} - {street}
                            </h4>
                            <h5 className="font-normal text-dh-gray-700 mb-1.5">City : {city}</h5>
                            <h5 className="font-normal text-dh-gray-700 mb-1.5">State : {state}</h5>
                            <h5 className="font-normal text-dh-gray-700 mb-1.5">Country : {country}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddressCard;
