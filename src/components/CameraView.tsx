import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface CameraViewProps {
  opacity: number;
}

const CameraView: React.FC<CameraViewProps> = ({ opacity }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        toast.error('Unable to access camera. Please grant permission and refresh.');
        setHasPermission(false);
      }
    };

    setupCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        style={{ opacity }}
      />
      {!hasPermission && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
          Please grant camera access
        </div>
      )}
    </div>
  );
};

export default CameraView;