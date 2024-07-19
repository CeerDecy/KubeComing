"use client"
import React from 'react';

interface F1IconProps {
    className?: string
}

const F7Icon: React.FC = ({className}: F1IconProps) => {
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
                    d="M 11.5 6 C 8.4802259 6 6 8.4802259 6 11.5 L 6 36.5 C 6 39.519774 8.4802259 42 11.5 42 L 36.5 42 C 39.519774 42 42 39.519774 42 36.5 L 42 11.5 C 42 8.4802259 39.519774 6 36.5 6 L 11.5 6 z M 11.5 9 L 36.5 9 C 37.898226 9 39 10.101774 39 11.5 L 39 36.5 C 39 37.898226 37.898226 39 36.5 39 L 11.5 39 C 10.101774 39 9 37.898226 9 36.5 L 9 11.5 C 9 10.101774 10.101774 9 11.5 9 z M 15.5 17 C 14.671 17 14 17.671 14 18.5 L 14 29.5 C 14 30.329 14.671 31 15.5 31 C 16.328 31 17 30.329 17 29.5 L 17 25.5 L 20 25.5 C 20.828 25.5 21.5 24.829 21.5 24 C 21.5 23.171 20.829 22.5 20 22.5 L 17 22.5 L 17 20 L 21.5 20 C 22.328 20 23 19.329 23 18.5 C 23 17.671 22.329 17 21.5 17 L 15.5 17 z M 26.5 17 C 25.671 17 25 17.671 25 18.5 C 25 19.329 25.671 20 26.5 20 L 31.169922 20 L 27.134766 28.878906 C 26.791766 29.632906 27.124906 30.522234 27.878906 30.865234 C 28.080906 30.957234 28.290047 31 28.498047 31 C 29.068047 31 29.614234 30.673094 29.865234 30.121094 L 34.865234 19.121094 C 35.076234 18.656094 35.037719 18.1165 34.761719 17.6875 C 34.485719 17.2585 34.01 17 33.5 17 L 26.5 17 z"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};
F7Icon.displayName = "F7Icon"
export default F7Icon;
