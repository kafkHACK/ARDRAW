import React from 'react';
import { Slider } from "@/components/ui/slider";

interface TransparencyControlsProps {
  opacity: number;
  setOpacity: (value: number) => void;
}

const TransparencyControls: React.FC<TransparencyControlsProps> = ({ opacity, setOpacity }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-64 bg-black/50 backdrop-blur-sm rounded-full p-4 animate-fade-in">
      <Slider
        value={[opacity]}
        onValueChange={(values) => setOpacity(values[0])}
        max={1}
        step={0.01}
        className="w-full"
      />
    </div>
  );
};

export default TransparencyControls;