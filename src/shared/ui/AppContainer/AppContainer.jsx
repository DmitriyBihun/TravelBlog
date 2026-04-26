import style from './AppContainer.module.css';

const AppContainer = ({
    children,
    maxWidth = '1332px',
    ...props
}) => {
    return (
        <div
            className={style.container}
            style={{
                maxWidth,
                ...props.style,
            }}
        >
            {children}
        </div>
    );
};

export default AppContainer;