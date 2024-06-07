import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UseScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
};

export default UseScrollToTop;