import { useState } from 'react';
import PhotoUpload from '@/components/PhotoUpload';
import TransparencyControls from '@/components/TransparencyControls';

const Index = () => {
  const [opacity, setOpacity] = useState(1);

  return (
    <div className="fixed inset-0 bg-black">
      <PhotoUpload opacity={opacity} />
      <TransparencyControls opacity={opacity} setOpacity={setOpacity} />
    </div>
  );
};

export default Index;