"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}


const F10Icon: React.FC = ({className}: F1IconProps) => {
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
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 12.5 17 C 11.671 17 11 17.671 11 18.5 L 11 29.5 C 11 30.329 11.671 31 12.5 31 C 13.329 31 14 30.329 14 29.5 L 14 25.5 L 16 25.5 C 16.829 25.5 17.5 24.829 17.5 24 C 17.5 23.171 16.829 22.5 16 22.5 L 14 22.5 L 14 20 L 17.5 20 C 18.329 20 19 19.329 19 18.5 C 19 17.671 18.329 17 17.5 17 L 12.5 17 z M 32 17 C 29.243 17 27 19.243 27 22 L 27 26 C 27 28.757 29.243 31 32 31 C 34.757 31 37 28.757 37 26 L 37 22 C 37 19.243 34.757 17 32 17 z M 24.375 17.042969 C 24.257547 17.052859 24.139641 17.076984 24.025391 17.115234 L 21.025391 18.115234 C 20.239391 18.377234 19.814172 19.225719 20.076172 20.011719 C 20.338172 20.797719 21.190609 21.225938 21.974609 20.960938 L 23 20.619141 L 23 29.537109 C 23 30.366109 23.671 31.037109 24.5 31.037109 C 25.329 31.037109 26 30.366109 26 29.537109 L 26 18.537109 C 26 18.055109 25.767953 17.602313 25.376953 17.320312 C 25.082953 17.108812 24.727359 17.013297 24.375 17.042969 z M 32 20 C 33.103 20 34 20.897 34 22 L 34 26 C 34 27.103 33.103 28 32 28 C 30.897 28 30 27.103 30 26 L 30 22 C 30 20.897 30.897 20 32 20 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F10Icon.displayName = "F10Icon"
export default F10Icon;
