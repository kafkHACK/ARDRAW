import React, { useEffect, useRef, useState } from 'react';
import { Camera, FlipHorizontal, Zap, ZapOff } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface CameraViewProps {
  opacity: number;
}

const CameraView: React.FC<CameraViewProps> = ({ opacity }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [flashAvailable, setFlashAvailable] = useState<boolean>(false);
  const [flashOn, setFlashOn] = useState<boolean>(false);

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Check if flash/torch is available
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        setFlashAvailable('fillLightMode' in capabilities);
      }
      setHasPermission(true);
    } catch (err) {
      toast.error('Unable to access camera. Please grant permission and refresh.');
      setHasPermission(false);
    }
  };

  const toggleFlash = async () => {
    try {
      const stream = videoRef.current?.srcObject as MediaStream;
      if (!stream) return;

      const track = stream.getVideoTracks()[0];
      if (!track) return;

      // Using the standard API for torch/flash control
      await track.applyConstraints({
        advanced: [{ fillLightMode: flashOn ? 'none' : 'flash' }] as any
      });
      
      setFlashOn(!flashOn);
    } catch (err) {
      toast.error('Unable to control flash');
    }
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newMode);
  };

  useEffect(() => {
    setupCamera();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [facingMode]);

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
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={toggleCamera}
          className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
        >
          <FlipHorizontal className="h-6 w-6" />
        </Button>
        {flashAvailable && (
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleFlash}
            className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70"
          >
            {flashOn ? (
              <ZapOff className="h-6 w-6" />
            ) : (
              <Zap className="h-6 w-6" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CameraView;