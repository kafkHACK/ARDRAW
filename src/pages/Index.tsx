import { useState } from 'react';
import CameraView from '@/components/CameraView';
import PhotoUpload from '@/components/PhotoUpload';
import TransparencyControls from '@/components/TransparencyControls';

const Index = () => {
  const [opacity, setOpacity] = useState(1);

  return (
    <div className="fixed inset-0 bg-black">
      <div className="relative w-full h-full">
        <CameraView opacity={1} />
        <div className="absolute inset-0">
          <PhotoUpload opacity={opacity} />
        </div>
      </div>
      <TransparencyControls opacity={opacity} setOpacity={setOpacity} />
    </div>
  );
};

export default Index;