import { useCallback, useEffect } from 'react';

type ShortcutMap = {
  [key: string]: () => void;
};

type PreventDefaultKeys = {
  [key: string]: boolean;
};

const useShortcut = (
  shortcutMap: ShortcutMap,
  preventDefaultKeys: PreventDefaultKeys = {}
) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCtrlOrMetaPressed = isMac ? metaKey : ctrlKey;

      // Ignore the "Shift" key by itself
      if (key?.toLowerCase() === 'shift') return;

      const pressedKeys: string[] = [];

      if (isCtrlOrMetaPressed) pressedKeys.push('CtrlOrMeta');
      if (shiftKey) pressedKeys.push('Shift');
      if (altKey) pressedKeys.push('Alt');
      pressedKeys.push(key?.toLowerCase());

      // Handle up to three-key combinations
      const combination = pressedKeys.join('+');

      // console.log('Pressed keys:', combination);

      // Check if the key combination exists in the shortcut map
      if (shortcutMap[combination]) {
        // Prevent default action if specified in preventDefaultKeys
        if (preventDefaultKeys[combination]) {
          event.preventDefault();
        }
        // Execute the callback function associated with the key combination
        shortcutMap[combination]();
      }
    },
    [shortcutMap, preventDefaultKeys]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};

export default useShortcut;
