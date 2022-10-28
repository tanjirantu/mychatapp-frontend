/**
 *
 * @param date Date String
 * @returns yyyy-mm-dd
 */
const getShortDate = (date: string) => {
    const dateString = new Date(date).toLocaleDateString().split('/').join('-');
    if (dateString === 'Invalid Date') return '';
    return dateString;
};

export default getShortDate;
