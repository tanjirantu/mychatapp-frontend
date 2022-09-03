import Dropdown from '../Dropdown';
import styles from './KebabMenuButton.module.scss';
import { translateEnumToText } from '../../../../helpers/utils';
import { IKebabMenuButton } from './IKebabMenuButton';

const KebabMenuButton: React.FC<IKebabMenuButton> = ({ items }) => {
    return (
        <Dropdown className={`relative ${styles.root}`}>
            <Dropdown.Menu>
                {({ toggle, open }) => (
                    <div onClick={() => toggle(!open)}>
                        <button>
                            <div className="h-8 w-8 bg-dh-gray-200 px-2 py-2 rounded-full flex flex-col justify-between items-center cursor-pointer">
                                <div className="w-1 h-1 bg-dh-gray-700 rounded-full"> &nbsp; </div>
                                <div className="w-1 h-1 bg-dh-gray-700 rounded-full"> &nbsp; </div>
                                <div className="w-1 h-1 bg-dh-gray-700 rounded-full"> &nbsp; </div>
                            </div>
                        </button>
                    </div>
                )}
            </Dropdown.Menu>
            <Dropdown.Item>
                {() => (
                    <div className={`absolute top-0 z-50 bg-white right-0 rounded ${styles.dropdown}`}>
                        <div className={`p-[20px]`}>
                            <div className={`${styles.list}`}>
                                <ul>
                                    {items.map((item, i) => (
                                        <li key={i} className={`${styles.listItem} flex gap-2 items-cente mb-1`}>
                                            <p className="pb-2 text-sm">{translateEnumToText(item.label)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </Dropdown.Item>
        </Dropdown>
    );
};

export default KebabMenuButton;
