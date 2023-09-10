import { useEffect, useState } from 'react';

const AddToHomeScreenButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const addToHomeScreen = () => {
    alert("hi");
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the installation prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <button onClick={addToHomeScreen}>
      Add to Home Screen
    </button>
  );
};

export default AddToHomeScreenButton;