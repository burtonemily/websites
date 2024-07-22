import { forwardRef } from 'react';
import { SVGAttributes } from './types';

export const QuestionIcon = forwardRef<SVGSVGElement, SVGAttributes>((props, ref) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" {...props} ref={ref}>
    <path d="M10.655 21.444c5.752 0 10.501-4.755 10.501-10.5C21.156 5.194 16.4.447 10.647.447 4.905.446.157 5.193.157 10.945c0 5.744 4.756 10.499 10.498 10.499Zm0-2.068a8.395 8.395 0 0 1-8.422-8.431 8.388 8.388 0 0 1 8.414-8.431 8.411 8.411 0 0 1 8.441 8.43 8.404 8.404 0 0 1-8.433 8.432Z" />
    <path d="M11.256 10.384c.401 0 .6-.106.89-.382.255-.296.365-.587.375-1.075l-.002-.07a1.776 1.776 0 0 0-.118-.675 1.667 1.667 0 0 0-.346-.564 1.527 1.527 0 0 0-.568-.4 1.849 1.849 0 0 0-.78-.164c-.647.011-1.034.169-1.407.547-.35.395-.508.822-.512 1.457l.004.696-1.405.002v-.771c0-.41.063-.829.196-1.203.143-.374.366-.769.633-1.054a3.24 3.24 0 0 1 1.058-.727c.401-.17.925-.27 1.451-.27.446 0 .92.088 1.293.24.375.15.726.373.994.64.267.26.524.627.676.975.151.338.233.752.233 1.135l-.002.26c0 .347-.068.713-.193 1.034a2.685 2.685 0 0 1-.52.855 2.678 2.678 0 0 1-.78.587 2.376 2.376 0 0 1-1.027.225l-.184-.005c-.162.014-.23.05-.233.27l-.002 1.132-1.348-.004v-1.408c0-.339.11-.678.34-.896.205-.242.587-.393.947-.387h.337Zm.146 4.289a1.078 1.078 0 1 1-2.156 0 1.078 1.078 0 0 1 2.156 0Z" />
  </svg>
));