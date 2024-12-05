import React from 'react';

import { cn } from '@/lib/utils';

export type SpinnerProps = React.ComponentProps<'svg'>;

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(({ className, ...props }, ref) => (
  <svg
    ref={ref}
    className={cn('animate-spin', className)}
    fill='none'
    height='24'
    width='24'
    xmlns='http://www.w3.org/2000/svg'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth='2'
    viewBox='0 0 24 24'
    {...props}
  >
    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
  </svg>
));
Spinner.displayName = 'Spinner';

export { Spinner };
