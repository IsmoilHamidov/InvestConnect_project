import { useEffect } from 'react';

function Progressbar() {
    useEffect(() => {
        function updateProgressBar() {
            const { scrollTop, scrollHeight } = document.documentElement;
            const scrollPercent = `${(scrollTop / (scrollHeight - window.innerHeight)) * 100}%`;

            const progressBar = document.querySelector('#progress-bar') as HTMLElement;

            if (progressBar) {
                progressBar.style.setProperty('--progress', scrollPercent);
            }
        }

        document.addEventListener('scroll', updateProgressBar);

        return () => {
            document.removeEventListener('scroll', updateProgressBar);
        };
    }, []);

    return (
        <div
            id="progress-bar"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '4px',
                backgroundColor: 'transparent',
                zIndex: 1000,
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    width: 'var(--progress)',
                    height: '100%',
                    backgroundColor: '#4CAF50',
                    transition: 'width 0.1s ease',
                }}
            ></div>
        </div>
    );
}

export default Progressbar;
