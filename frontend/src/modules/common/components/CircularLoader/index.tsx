import { motion } from 'framer-motion';
import { combinedClassNames } from '../../../../helpers';
import styles from './CircularLoader.module.scss';
import { ICircularLoaderProps } from './ICircularLoaderProps';

const CircularLoader: React.FC<ICircularLoaderProps> = ({
    width,
    className,
    centered,
    topSpaced,
    ySpaced,
    ...restProps
}) => {
    const imgSrc = '/static/assets/icons/icon-192x192.png';

    const imgWidth = width ? width : 3;

    return (
        <div
            className={combinedClassNames(
                styles,
                {
                    root: true,
                    centered,
                    topSpaced,
                    ySpaced,
                },
                className || ''
            )}
        >
            <motion.img
                key={imgSrc}
                src={imgSrc}
                alt="Dhakai, Inc."
                initial={{ opacity: 0.5 }}
                // animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0.5 }}
                // className={styles.root}
                animate={{
                    scale: [1, 1.1, 1.1, 1, 1, 1.1, 1.1, 1],
                    rotate: [0, 0, 270, 270, 0, 0, 180, 180],
                    opacity: [0.5, 0.75, 1, 1, 1, 0.75, 0.5],
                    // opacity: 1,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
                style={{
                    width: `${imgWidth}rem`,
                }}
                {...restProps}
            />
        </div>
    );
};

export default CircularLoader;
