"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}

const F1Icon: React.FC = ({className}: F1IconProps) => {
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
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 17.5 17 C 16.671 17 16 17.671 16 18.5 L 16 29.5 C 16 30.329 16.671 31 17.5 31 C 18.329 31 19 30.329 19 29.5 L 19 25.5 L 22 25.5 C 22.829 25.5 23.5 24.829 23.5 24 C 23.5 23.171 22.829 22.5 22 22.5 L 19 22.5 L 19 20 L 23.5 20 C 24.329 20 25 19.329 25 18.5 C 25 17.671 24.329 17 23.5 17 L 17.5 17 z M 30.375 17.042969 C 30.257547 17.052859 30.139641 17.076984 30.025391 17.115234 L 27.025391 18.115234 C 26.239391 18.377234 25.814172 19.225719 26.076172 20.011719 C 26.338172 20.797719 27.190609 21.225938 27.974609 20.960938 L 29 20.619141 L 29 29.537109 C 29 30.366109 29.671 31.037109 30.5 31.037109 C 31.329 31.037109 32 30.366109 32 29.537109 L 32 18.537109 C 32 18.055109 31.767953 17.602313 31.376953 17.320312 C 31.082953 17.108812 30.727359 17.013297 30.375 17.042969 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F1Icon.displayName = "F1Icon"
export default F1Icon;
