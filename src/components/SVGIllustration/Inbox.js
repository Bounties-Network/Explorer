import React from 'react';

const SVG = () => (
  <svg
    width="120"
    height="92"
    viewBox="0 0 120 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#35rhg_dd)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40.3238 36C37.099 36 34.1895 37.9362 32.9443 40.9109L26.6205 56.0178C26.2109 56.9962 26 58.0462 26 59.1069V68C26 72.4183 29.5817 76 34 76H86C90.4183 76 94 72.4183 94 68V59.1069C94 58.0462 93.7891 56.9962 93.3795 56.0178L87.0557 40.9109C85.8105 37.9362 82.901 36 79.6762 36H40.3238ZM41.9854 38.717C39.5706 38.717 37.3911 40.1647 36.4548 42.3906L31.1675 54.9604C30.613 56.2786 31.581 57.7358 33.0111 57.7358H52.0411C52.0139 57.9871 52.0001 58.242 52.0001 58.5C52.0001 62.6421 55.5818 66 60.0001 66C64.4183 66 68.0001 62.6421 68.0001 58.5C68.0001 58.242 67.9862 57.9871 67.959 57.7358H86.9891C88.4191 57.7358 89.3871 56.2786 88.8326 54.9604L83.5453 42.3906C82.609 40.1647 80.4295 38.717 78.0147 38.717H41.9854Z"
        fill="url(#vdf_linear)"
      />
    </g>
    <defs>
      <filter
        id="35rhg_dd"
        x="0"
        y="0"
        width="120"
        height="92"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="-10" />
        <feGaussianBlur stdDeviation="13" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.25098 0 0 0 0 0.462745 0 0 0 0.09 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="4.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.25098 0 0 0 0 0.462745 0 0 0 0.21 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow"
          result="effect2_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="vdf_linear"
        x1="60.2383"
        y1="80.3537"
        x2="34.8486"
        y2="7.94072"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#F7F7F7" />
      </linearGradient>
    </defs>
  </svg>
);

export default SVG;
