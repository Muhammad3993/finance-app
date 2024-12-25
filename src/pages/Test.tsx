import { useState, useEffect } from 'react';

const KeyboardListener = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const MIN_KEYBOARD_HEIGHT = window.screen.height * 0.4; // 40% of the screen height
    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardOpen =
          isMobile &&
          window.screen.height - MIN_KEYBOARD_HEIGHT > window.visualViewport.height;
        setIsKeyboardOpen(keyboardOpen);
      }
    };

    // Attach the listener
    window.visualViewport?.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    // Cleanup function
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div style={{ padding: '20px', color: "white" }}>
      <p>Keyboard is {isKeyboardOpen ? 'Open' : 'Closed'}</p>
      <input
        type="text"
        placeholder="Type here to test"
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '100%',
          marginTop: '20px',
        }}
      />
    </div>
  );
};

export default KeyboardListener;
