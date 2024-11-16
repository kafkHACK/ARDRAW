import { useState } from 'react';
import CameraView from '@/components/CameraView';
import TransparencyControls from '@/components/TransparencyControls';

const Index = () => {
  const [opacity, setOpacity] = useState(1);

  return (
    <div className="fixed inset-0 bg-black">
      <CameraView opacity={opacity} />
      <TransparencyControls opacity={opacity} setOpacity={setOpacity} />
    </div>
  );
};

export default Index;