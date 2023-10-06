import { useLayoutEffect, useState } from 'react';

function usePortrait() {
  const [portrait, setPortrait] = useState(false);
  useLayoutEffect(() => {
    function updateSize() {
      setPortrait(window.innerHeight > window.innerWidth)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return portrait;
}

export default usePortrait