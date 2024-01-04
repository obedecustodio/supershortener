import { useEffect, useState } from "react";

const Header = () => {
    const texts = ['Shrink Urls', 'Generate Qr Code', 'Faster Qr Code',];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="header">
            <div className="overlay"></div>
            {/* <div className="text-animation-container mt-5">
                <div className="text-animation">
                    <h1 className="text-white">Url Shortener</h1>
                </div>
            </div> */}
            <div className="text-scroll-animation">
                {texts.map((text, index) => (
                    <div key={index} className={`text ${index === currentTextIndex ? 'active' : ''}`}>
                        {text}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Header;
