import React, { useEffect, useRef, useState } from 'react';
import { Camera, FlipCamera2, Zap, ZapOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface CameraViewProps {
  opacity: number;
}

const CameraView: React.FC<CameraViewProps> = ({ opacity }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [flashEnabled, setFlashEnabled] = useState(false);

  const setupCamera = async () => {
    try {
      if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: facingMode,
          }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);

          // Try to enable/disable flash if available
          const track = stream.getVideoTracks()[0];
          const capabilities = track.getCapabilities();
          if (capabilities.torch) {
            await track.applyConstraints({
              advanced: [{ torch: flashEnabled }]
            });
          } else if (flashEnabled) {
            toast.error('Flash is not available on this device');
          }
        }
      }
    } catch (err) {
      toast.error('Unable to access camera. Please grant permission and refresh.');
      setHasPermission(false);
    }
  };

  useEffect(() => {
    setupCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [facingMode, flashEnabled]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const toggleFlash = () => {
    setFlashEnabled(prev => !prev);
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
        style={{ opacity }}
      />
      {!hasPermission ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white">
          Please grant camera access
        </div>
      ) : (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleCamera}
            className="rounded-full bg-black/50 hover:bg-black/70"
          >
            <FlipCamera2 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFlash}
            className="rounded-full bg-black/50 hover:bg-black/70"
          >
            {flashEnabled ? (
              <Zap className="h-4 w-4" />
            ) : (
              <ZapOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CameraView;