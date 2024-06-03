import { forwardRef } from 'react';
import { SVGAttributes } from './types';

export const ClipboardIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={ref}
  >
    <g id="Copy">
      <path
        id="Vector"
        d="M7.11719 6.25248H8.38484V4.75162C8.38484 4.15531 8.69516 3.81795 9.32382 3.81795H12.0358V6.91479C12.0358 7.71542 12.4575 8.13187 13.2528 8.13187H16.1074V13.4893C16.1074 14.0909 15.7918 14.4229 15.1632 14.4229H13.9514V15.6906H15.2738C16.6556 15.6906 17.3751 14.9593 17.3751 13.5681V8.43997C17.3751 7.58938 17.1982 7.04626 16.6873 6.52242L13.4605 3.23925C12.9767 2.74363 12.3948 2.55029 11.65 2.55029H9.21848C7.83668 2.55029 7.11719 3.2804 7.11719 4.67281V6.25248ZM13.0939 6.75484V4.34774L15.7775 7.0737H13.4075C13.1857 7.0737 13.0939 6.97664 13.0939 6.75484Z"
        fill="current-Color"
      />
      <path
        id="Vector_2"
        d="M3.92188 16.8867C3.92188 18.2844 4.63723 19.0092 6.02317 19.0092H12.0797C13.4656 19.0092 14.181 18.278 14.181 16.8867V11.9067C14.181 11.0401 14.0711 10.6347 13.529 10.082L10.0221 6.52085C9.50125 5.98937 9.0575 5.8689 8.27808 5.8689H6.02317C4.64254 5.8689 3.92188 6.5937 3.92188 7.99142V16.8867ZM5.18953 16.8079V8.06492C5.18953 7.47392 5.49985 7.13655 6.12967 7.13655H8.11801V10.6786C8.11801 11.6056 8.57637 12.0575 9.49164 12.0575H12.9121V16.8079C12.9121 17.4095 12.5965 17.7416 11.9732 17.7416H6.12437C5.49985 17.7416 5.18953 17.4095 5.18953 16.8079ZM9.61692 10.9395C9.34995 10.9395 9.23595 10.8267 9.23595 10.5586V7.38527L12.736 10.9395H9.61692Z"
        fill="current-Color"
      />
    </g>
  </svg>
));
