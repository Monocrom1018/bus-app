import React from 'react';
import { Preloader as F7Preloader } from 'framework7-react';

const Preloader: React.ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => (
  <div className="flex justify-center items-center h-24" ref={ref}>
    <F7Preloader size={32} />
  </div>
);

export default React.forwardRef(Preloader);
