import { useState } from "react";
import { useOnClickOutside } from "../hooks";
import MenuButton from "./MenuButton";
import Slider from "./Slider";

const Menu = ({
  layer,
  layers,
  onLayerChange,
}: {
  layer: string;
  layers: Record<string, string>;
  onLayerChange: (layer: string) => void;
}) => {
  const [isOpen, setOpen] = useState(false);
  const menuContainerRef = useOnClickOutside<HTMLDivElement>(() =>
    setOpen(false),
  );

  return (
    <div ref={menuContainerRef}>
      <MenuButton isOpen={isOpen} setOpen={setOpen} />
      <Slider
        isOpen={isOpen}
        layer={layer}
        layers={layers}
        onSelectLayer={(key) => {
          onLayerChange(key);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default Menu;
