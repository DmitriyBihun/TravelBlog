import style from './Marquee.module.css'

function Marquee({ text }) {
    return (
        <div className={style.marquee}>
            <div className={style.marqueeTrack}>
                <div className={style.marqueeGroup}>
                    <span>{text}</span>
                    <span>{text}</span>
                </div>
                <div aria-hidden="true" className={style.marqueeGroup}>
                    <span>{text}</span>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
}

export default Marquee;