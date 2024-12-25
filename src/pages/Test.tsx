import  { useState, useEffect } from 'react';

const KeyboardListener = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const MIN_KEYBOARD_HEIGHT = window.screen.height * 0.4; // 40% of the screen height
    const isMobile = window.innerWidth < 768; // Check if it's a mobile device

    const handleResize = () => {
      if (window.visualViewport) {
        const keyboardOpen =
          isMobile &&
          window.screen.height - MIN_KEYBOARD_HEIGHT > window.visualViewport.height;

        setIsKeyboardOpen(keyboardOpen); // Update the state based on the keyboard visibility
      }
    };

    // Attach the resize listener
    window.visualViewport?.addEventListener('resize', handleResize);

    // Initial check for keyboard state
    handleResize();

    // Cleanup function to remove the event listener
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array ensures this runs only once on mount

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
