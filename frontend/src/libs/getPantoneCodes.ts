import pantoneColors from '../constants/pantoneColors';

const getPantoneCodes = (skip = 0, limit = 50) => {
    const count = pantoneColors.length;
    const updatedPantoneCodes = [...pantoneColors.slice(skip, skip + limit)];
    const result = {
        count,
        data: updatedPantoneCodes,
    };
    return result;
};

export default getPantoneCodes;
