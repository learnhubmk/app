import React from 'react';
import style from './contact.module.scss';

const SpinningLogoCircle: React.FC = () => {
  return (
    <div>
      <div className={style.circle}>
        <div className={style.innerCircle}>
          <svg className={style.svg} viewBox="0 0 100 100" width="100" height="100">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0"
              to="360"
              dur="10.5s"
              additive="sum"
              repeatCount="indefinite"
            />
            <defs>
              <path
                id="circle"
                d="
            M 50, 50
            m -37, 0
            a 37,37 0 1,1 74,0
            a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text>
              <textPath xlinkHref="#circle">Let's Collaborate Let's talk</textPath>
            </text>
          </svg>
          <div className={style.collabInside}>
            <svg
              viewBox="0 0 64 64"
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              preserveAspectRatio="xMidYMid meet"
              fill="#FFFFFF"
              className={style.svgRotate}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M59.998 21.223a12.826 12.826 0 0 1-.006-.402v-.527c0-.41-.045-.492-.263-.604c-.156-.08-.316-.154-.478-.229C54.504 9.156 44.09 2 32 2S9.497 9.156 4.748 19.461c-.161.074-.321.148-.477.229c-.219.111-.262.193-.262.604v.527c0 .178-.003.301-.006.404A29.89 29.89 0 0 0 2 32c0 16.568 13.432 30 30 30s30-13.432 30-30a29.93 29.93 0 0 0-2.002-10.777M32 4.5c10.278 0 19.252 5.672 23.971 14.047c-3.744-.625-8.794-.586-11.467-.354c-3.436.303-6.307 1.076-8.656 2.279c-2.198 1.098-5.497 1.098-7.697 0c-2.349-1.203-5.22-1.977-8.654-2.279c-2.673-.232-7.722-.271-11.467.354C12.748 10.172 21.722 4.5 32 4.5m0 55C16.836 59.5 4.5 47.164 4.5 32c0-3.041.504-5.967 1.42-8.705c.596 1.066.998 2.553 1.259 4.346c.598 4.213 2.666 6.854 6.022 8.115a13.471 13.471 0 0 0 9.69-.105c1.691-.676 3.176-1.742 4.355-3.477c2.067-3.037 1.448-4.936 2.516-7.547c.932-2.277 3.541-2.277 4.473 0c1.067 2.611.448 4.51 2.516 7.547c1.179 1.734 2.664 2.801 4.354 3.477a13.474 13.474 0 0 0 9.691.105c3.356-1.262 5.424-3.902 6.022-8.115c.262-1.793.663-3.281 1.26-4.346A27.38 27.38 0 0 1 59.498 32C59.5 47.164 47.164 59.5 32 59.5"
                  fill="#FFFFFF"
                />
                <path
                  d="M44.584 42.279c-8.109 5.656-17.105 5.623-25.168 0c-.97-.678-1.845.494-1.187 1.578c2.457 4.047 7.417 7.649 13.771 7.649s11.314-3.604 13.771-7.649c.659-1.084-.216-2.253-1.187-1.578"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinningLogoCircle;
