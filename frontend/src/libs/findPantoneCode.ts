import PantoneCodes from '../constants/pantoneColors';

const findPantoneCode = (colorCode: string) => {
    return PantoneCodes.find((item) => new RegExp(colorCode, 'i').test(item.pantone));
};

export default findPantoneCode;
