import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const formatMessageTime = (date: string): string => {
    const check = new Date(date);
    const currentDate = new Date();

    if (
        check.getFullYear() == currentDate.getFullYear() &&
        check.getMonth() == currentDate.getMonth() &&
        check.getDate() <= currentDate.getDate()
    ) {
        if (check.getDay() === currentDate.getDay()) {
            return dayjs(date).format('h:mm A');
        } else {
            return dayjs(date).format(' MMM D, h:mm A');
        }
    }

    if (check.getFullYear() == currentDate.getFullYear() && check.getMonth() != currentDate.getMonth()) {
        return dayjs(date).format('MMM D, h:mm A');
    }

    if (check.getFullYear() != currentDate.getFullYear()) {
        return dayjs(date).format('MMMM D, YYYY');
    }

    return '';
};

export const formatMessageFromNow = (date: string) => {
    return dayjs(date).from(new Date());
};

export default formatMessageTime;
