import { useState } from "react";

import MenuButton from "./MenuButton";
import Slider from "./Slider";
import { useOnClickOutside } from "../hooks";

const Menu = ({ layer, layers, onLayerChange }) => {
  const [isOpen, setOpen] = useState(false);
  const menuContainerRef = useOnClickOutside(() => setOpen(false));

  return (
    <div ref={menuContainerRef}>
      <MenuButton isOpen={isOpen} setOpen={setOpen} />
      <Slider
        isOpen={isOpen}
        layer={layer}
        layers={layers}
        onSelectLayer={(layer) => {
          onLayerChange(layer);
          setOpen(false);
        }}
      />
    </div>
  );
};

export default Menu;
