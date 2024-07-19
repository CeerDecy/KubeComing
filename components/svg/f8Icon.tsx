"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}

const F8Icon: React.FC = ({className}: F1IconProps) => {
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
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 29 16.75 C 26.791 16.75 25 18.541 25 20.75 C 25 21.458823 25.191936 22.117949 25.517578 22.691406 C 24.58675 23.595325 24 24.848712 24 26.25 C 24 29.011 26.239 31.25 29 31.25 C 31.761 31.25 34 29.011 34 26.25 C 34 24.848712 33.41325 23.595325 32.482422 22.691406 C 32.807963 22.117949 33 21.458823 33 20.75 C 33 18.541 31.209 16.75 29 16.75 z M 15.5 17 C 14.671 17 14 17.671 14 18.5 L 14 29.5 C 14 30.329 14.671 31 15.5 31 C 16.328 31 17 30.329 17 29.5 L 17 25.5 L 20 25.5 C 20.828 25.5 21.5 24.829 21.5 24 C 21.5 23.171 20.829 22.5 20 22.5 L 17 22.5 L 17 20 L 21.5 20 C 22.328 20 23 19.329 23 18.5 C 23 17.671 22.329 17 21.5 17 L 15.5 17 z M 29 19.5 C 29.69 19.5 30.25 20.06 30.25 20.75 C 30.25 21.44 29.69 22 29 22 C 28.31 22 27.75 21.44 27.75 20.75 C 27.75 20.06 28.31 19.5 29 19.5 z M 29 24.25 C 30.105 24.25 31 25.145 31 26.25 C 31 27.355 30.105 28.25 29 28.25 C 27.895 28.25 27 27.355 27 26.25 C 27 25.145 27.895 24.25 29 24.25 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F8Icon.displayName = "F8Icon"
export default F8Icon;