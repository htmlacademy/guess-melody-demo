import {RefObject, useEffect} from 'react';

export const useElementListener = (
  eventName: string,
  element: RefObject<HTMLElement>,
  listener: (evt: Event) => void
) => {

  useEffect(() => {
    const domElement = element.current;

    if (!domElement) {
      return;
    }

    domElement.addEventListener(eventName, listener);

    return () => {
      domElement.removeEventListener(eventName, listener);
    };
  }, [eventName, element, listener]);
};
