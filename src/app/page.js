'use client'
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scanResult, setScanResult] = useState(null);

  const formatsToSupport = [
    Html5QrcodeSupportedFormats.QR_CODE,
    Html5QrcodeSupportedFormats.CODE_39,
    Html5QrcodeSupportedFormats.UPC_E,
    Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
  ];

  useEffect(() => {
    const startQRCodeScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // Camera access is granted; you can start scanning QR codes here
        const scanner = new Html5QrcodeScanner('reader', {
          qrbox: {
            width: 250,
            height: 250,
          },
          fps: 5,
          formatsToSupport: formatsToSupport,
        });

        function onScanSuccess(decodedText, decodedResult) {
          // Handle on success condition with the decoded text or result.
          console.log(`Scan result: ${decodedText}`, decodedResult);
          // ...
          scanner.clear();
          // ^ this will stop the scanner (video feed) and clear the scan area.
        }

        const success = (result) => {
          scanner.clear();
          setScanResult(result);
        };

        scanner.render(success, null, onScanSuccess);

        // Clean up when the component unmounts
        return () => {
          scanner.clear();
          scanner.stop();
          stream.getTracks().forEach((track) => track.stop()); // Stop the camera stream
        };
      } catch (error) {
        // Handle permission denied or other errors
        console.warn(error);
        alert('Camera access denied or an error occurred while accessing the camera.');
      }
    };

    startQRCodeScanner();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="w-full bg-orange-500 pt-4 pb-4 text-center text-white">QR code scanner in react</h1>
      <br />
      {scanResult ? (
        <div>
          <input type="text" className="p-3 rounded bg-green-600 text-white" value={scanResult}></input>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </main>
  );
}