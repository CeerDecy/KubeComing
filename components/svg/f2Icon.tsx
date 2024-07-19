"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}

const F2Icon: React.FC = ({className}: F1IconProps) => {
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
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 15.5 17 C 14.671 17 14 17.671 14 18.5 L 14 29.5 C 14 30.329 14.671 31 15.5 31 C 16.328 31 17 30.329 17 29.5 L 17 25.5 L 20 25.5 C 20.828 25.5 21.5 24.829 21.5 24 C 21.5 23.171 20.829 22.5 20 22.5 L 17 22.5 L 17 20 L 21.5 20 C 22.328 20 23 19.329 23 18.5 C 23 17.671 22.329 17 21.5 17 L 15.5 17 z M 29 17 C 26.344 17 24.387625 18.682109 24.015625 21.287109 C 23.898625 22.107109 24.467109 22.867375 25.287109 22.984375 C 26.106109 23.102375 26.867375 22.533891 26.984375 21.712891 C 27.096375 20.931891 27.537 20 29 20 C 30.103 20 31 20.897 31 22 C 31 23.103 30.103 24 29 24 C 26.592 24 24 25.721 24 29.5 C 24 30.329 24.671 31 25.5 31 L 32.5 31 C 33.329 31 34 30.329 34 29.5 C 34 28.671 33.329 28 32.5 28 L 27.308594 28 C 27.781594 27.093 28.664 27 29 27 C 31.757 27 34 24.757 34 22 C 34 19.243 31.757 17 29 17 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F2Icon.displayName = "F2Icon"
export default F2Icon;
