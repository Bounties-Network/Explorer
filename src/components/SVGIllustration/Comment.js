import React from 'react';

const SVG = () => (
  <svg
    width="118"
    height="107"
    viewBox="0 0 118 107"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#3gv_dd)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M92 44C92 57.2548 77.2254 68 59 68C56.2855 68 53.6475 67.7616 51.1236 67.3121C46.9811 72.0056 41.9892 75 35.5 75C38.4641 72.4593 40.3524 67.6475 40.5574 63.9051C31.7749 59.5927 26 52.2868 26 44C26 30.7452 40.7746 20 59 20C77.2254 20 92 30.7452 92 44ZM44 48C46.2091 48 48 46.2091 48 44C48 41.7909 46.2091 40 44 40C41.7909 40 40 41.7909 40 44C40 46.2091 41.7909 48 44 48ZM63 44C63 46.2091 61.2091 48 59 48C56.7909 48 55 46.2091 55 44C55 41.7909 56.7909 40 59 40C61.2091 40 63 41.7909 63 44ZM74 48C76.2091 48 78 46.2091 78 44C78 41.7909 76.2091 40 74 40C71.7909 40 70 41.7909 70 44C70 46.2091 71.7909 48 74 48Z"
        fill="url(#dsfahg_radial)"
      />
    </g>
    <defs>
      <filter
        id="3gv_dd"
        x="0"
        y="0"
        width="118"
        height="107"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="6" />
        <feGaussianBlur stdDeviation="13" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.25098 0 0 0 0 0.462745 0 0 0 0.1 0"
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
        <feGaussianBlur stdDeviation="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.109804 0 0 0 0 0.25098 0 0 0 0 0.462745 0 0 0 0.17 0"
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
      <radialGradient
        id="dsfahg_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(69.5 20) rotate(130.301) scale(51.7929 62.1514)"
      >
        <stop stopColor="white" />
        <stop offset="1" stopColor="#F7F7F7" />
      </radialGradient>
    </defs>
  </svg>
);

export default SVG;
