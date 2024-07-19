"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}

const F5Icon: React.FC = ({className}: F1IconProps) => {
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
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 15.5 17 C 14.671 17 14 17.671 14 18.5 L 14 29.5 C 14 30.329 14.671 31 15.5 31 C 16.328 31 17 30.329 17 29.5 L 17 25.5 L 20 25.5 C 20.828 25.5 21.5 24.829 21.5 24 C 21.5 23.171 20.829 22.5 20 22.5 L 17 22.5 L 17 20 L 21.5 20 C 22.328 20 23 19.329 23 18.5 C 23 17.671 22.329 17 21.5 17 L 15.5 17 z M 26.845703 17 C 26.124703 17 25.504094 17.513656 25.371094 18.222656 L 24.525391 22.722656 C 24.443391 23.161656 24.560703 23.614031 24.845703 23.957031 C 25.129703 24.300031 25.554 24.5 26 24.5 L 29.25 24.5 C 30.215 24.5 31 25.285 31 26.25 C 31 27.696 29.913 28 29 28 C 27.385 28 26.484922 27.362453 26.419922 27.314453 C 25.772922 26.811453 24.840125 26.9205 24.328125 27.5625 C 23.810125 28.2095 23.9155 29.153875 24.5625 29.671875 C 24.7325 29.807875 26.302 31 29 31 C 31.944 31 33.999047 29.047 33.998047 26.25 C 33.998047 23.631 31.867047 21.5 29.248047 21.5 L 27.808594 21.5 L 28.089844 20 L 32 20 C 32.829 20 33.5 19.329 33.5 18.5 C 33.5 17.671 32.829 17 32 17 L 26.845703 17 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F5Icon.displayName = "F5Icon"
export default F5Icon;
