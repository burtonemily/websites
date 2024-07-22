import { forwardRef } from 'react';
import { SVGAttributes } from './types';

export const GlobeIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29" {...props} ref={ref}>
    <path d="M17.39.47s-.05 0-.07-.02a14.4 14.4 0 0 0-5.76 0c-.06 0-.11.03-.16.04A14.28 14.28 0 0 0 .19 14.41c0 7.87 6.4 14.25 14.25 14.25s14.25-6.4 14.25-14.25A14.27 14.27 0 0 0 17.39.47Zm-1.96 26.16v-4.47a23.8 23.8 0 0 0 3.51-.5c-.87 2.4-1.9 4.12-2.35 4.82-.38.07-.77.12-1.16.15Zm-3.17-.16a23.6 23.6 0 0 1-2.3-4.66c1.19.22 2.35.34 3.48.37v4.44c-.4-.03-.8-.09-1.18-.16v.01Zm1.18-24.26v4.44a21.9 21.9 0 0 0-3.6.39c.57-1.54 1.36-3.1 2.43-4.67a11 11 0 0 1 1.17-.15V2.2Zm3.14.15a22.56 22.56 0 0 1 2.5 4.83 23.87 23.87 0 0 0-3.65-.51V2.21c.4.03.77.08 1.15.15Zm10.07 11.06h-4.42a21.49 21.49 0 0 0-.36-3.42c2.31.86 3.96 1.84 4.63 2.29.06.37.11.75.14 1.13h.01Zm-6.35 0h-4.86v-4.8c1.55.1 2.98.35 4.29.7.35 1.4.53 2.78.57 4.1Zm-6.85-4.84v4.84H8.57c.05-1.36.23-2.76.6-4.22 1.47-.38 2.9-.57 4.28-.62Zm-6.83 4.84H2.23c.03-.38.08-.75.15-1.12A21.92 21.92 0 0 1 7 9.89c-.23 1.2-.35 2.4-.38 3.54v-.01ZM2.23 15.4h4.42c.08 1.27.26 2.46.5 3.59a22.59 22.59 0 0 1-4.78-2.47c-.06-.37-.11-.74-.15-1.12h.01Zm6.36 0h4.85v4.83a19.59 19.59 0 0 1-4.16-.59 22.6 22.6 0 0 1-.7-4.24Zm6.84 4.8v-4.8h4.83a21.6 21.6 0 0 1-.67 4.14 21.8 21.8 0 0 1-4.17.66h.01Zm6.77-4.8h4.45c-.03.38-.08.76-.14 1.13-.7.45-2.4 1.48-4.79 2.35.23-1.1.4-2.25.48-3.48Zm3.49-5.86a27.2 27.2 0 0 0-4.35-1.76 23.2 23.2 0 0 0-1.89-4.55 12.35 12.35 0 0 1 6.24 6.31ZM9.39 3.26c-.8 1.47-1.4 2.92-1.84 4.35a23.19 23.19 0 0 0-4.3 1.82 12.4 12.4 0 0 1 6.14-6.18v.01ZM3.24 19.4c1.52.83 3.03 1.46 4.5 1.9a27.6 27.6 0 0 0 1.76 4.34 12.32 12.32 0 0 1-6.26-6.24Zm16.09 6.26a28.09 28.09 0 0 0 1.82-4.55 28.24 28.24 0 0 0 4.54-1.81 12.36 12.36 0 0 1-6.36 6.36Z" />
  </svg>
));