import { useState } from 'react';
import useIntersectionObserver, {
  IntersectionObserverHookArgs,
  IntersectionObserverHookResult,
} from './useIntersectionObserver';

// Define the types for the arguments and return values for the useTrackVisibility hook
export type TrackVisibilityHookArgs = IntersectionObserverHookArgs;

export type TrackVisibilityHookResult = [
  IntersectionObserverHookResult[0], // The reference to the element being observed
  IntersectionObserverHookResult[1] & {
    isVisible: boolean;
    wasEverVisible: boolean;
  }
];

function useTrackVisibility(
  args?: IntersectionObserverHookArgs
): TrackVisibilityHookResult {
  const [ref, result] = useIntersectionObserver(args);
  const isVisible = Boolean(result.entry?.isIntersecting);
  const [wasEverVisible, setWasEverVisible] = useState(isVisible);

  if (isVisible && !wasEverVisible) {
    setWasEverVisible(true);
  }

  return [ref, { ...result, isVisible, wasEverVisible }];
}

export default useTrackVisibility;
