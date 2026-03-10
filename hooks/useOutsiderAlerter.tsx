import { MutableRefObject, useEffect } from 'react';

function useOutsideAlerter(
  ref: MutableRefObject<HTMLElement | null>,
  setShow: ((value: boolean) => void) | null = null,
  callBack: (() => void) | null = null
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (setShow) {
          setShow(false);
        }
        if (callBack) {
          callBack();
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export default useOutsideAlerter;
