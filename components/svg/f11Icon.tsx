"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}


const F11Icon: React.FC = ({className}: F1IconProps) => {
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
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 14.5 17 C 13.671 17 13 17.671 13 18.5 L 13 29.5 C 13 30.329 13.671 31 14.5 31 C 15.329 31 16 30.329 16 29.5 L 16 25.5 L 19 25.5 C 19.829 25.5 20.5 24.829 20.5 24 C 20.5 23.171 19.829 22.5 19 22.5 L 16 22.5 L 16 20 L 20.5 20 C 21.329 20 22 19.329 22 18.5 C 22 17.671 21.329 17 20.5 17 L 14.5 17 z M 27.375 17.042969 C 27.257547 17.052859 27.139641 17.076984 27.025391 17.115234 L 24.025391 18.115234 C 23.239391 18.377234 22.814172 19.225719 23.076172 20.011719 C 23.338172 20.797719 24.190609 21.225938 24.974609 20.960938 L 26 20.619141 L 26 29.537109 C 26 30.366109 26.671 31.037109 27.5 31.037109 C 28.329 31.037109 29 30.366109 29 29.537109 L 29 18.537109 C 29 18.055109 28.767953 17.602313 28.376953 17.320312 C 28.082953 17.108812 27.727359 17.013297 27.375 17.042969 z M 34.375 17.042969 C 34.257547 17.052859 34.139641 17.076984 34.025391 17.115234 L 31.025391 18.115234 C 30.239391 18.377234 29.814172 19.225719 30.076172 20.011719 C 30.338172 20.797719 31.190609 21.225938 31.974609 20.960938 L 33 20.619141 L 33 29.537109 C 33 30.366109 33.671 31.037109 34.5 31.037109 C 35.329 31.037109 36 30.366109 36 29.537109 L 36 18.537109 C 36 18.055109 35.767953 17.602313 35.376953 17.320312 C 35.082953 17.108812 34.727359 17.013297 34.375 17.042969 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F11Icon.displayName = "F11Icon"
export default F11Icon;