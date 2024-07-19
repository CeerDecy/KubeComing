"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}

const F9Icon: React.FC = ({className}: F1IconProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={className}
        >
            <rect width="24" height="24" stroke="none" opacity="0"/>
            <g transform="matrix(0.56 0 0 0.56 12 12)">
                <path
                    style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeDashoffset: 0,
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 4,
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    className={"fill-muted-foreground"}
                    transform="translate(-24, -24)"
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 15.5 17 C 14.671 17 14 17.671 14 18.5 L 14 29.5 C 14 30.329 14.671 31 15.5 31 C 16.328 31 17 30.329 17 29.5 L 17 25.5 L 20 25.5 C 20.828 25.5 21.5 24.829 21.5 24 C 21.5 23.171 20.829 22.5 20 22.5 L 17 22.5 L 17 20 L 21.5 20 C 22.328 20 23 19.329 23 18.5 C 23 17.671 22.329 17 21.5 17 L 15.5 17 z M 29 17 C 26.243 17 24 19.243 24 22 C 24 24.757 26.243 27 29 27 C 29.088478 27 29.174357 26.990891 29.261719 26.986328 C 28.254569 27.862273 27.142577 27.987259 26.917969 28.001953 C 26.096969 28.045953 25.464953 28.744359 25.501953 29.568359 C 25.538953 30.373359 26.201047 31 26.998047 31 C 27.021047 31 27.045359 31.000047 27.068359 30.998047 C 29.466359 30.889047 34 28.923672 34 22.263672 C 34 22.234224 33.991905 22.20676 33.990234 22.177734 C 33.992348 22.118147 34 22.060094 34 22 C 34 19.243 31.757 17 29 17 z M 29 20 C 30.103 20 31 20.897 31 22 C 31 23.103 30.103 24 29 24 C 27.897 24 27 23.103 27 22 C 27 20.897 27.897 20 29 20 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F9Icon.displayName = "F9Icon"
export default F9Icon;
