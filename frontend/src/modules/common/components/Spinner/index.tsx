import { MoonLoader } from 'react-spinners';
const Spinner = ({ size = 24 }) => {
    return (
        <div className="w-full flex justify-center items-center mt-40">
            <MoonLoader size={size} color="#27a88b" />
        </div>
    );
};
export default Spinner;
