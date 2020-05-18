import React, { useState } from "react";
import cn from "classnames";
import { FiMenu } from "react-icons/fi";

import { slide as BurgerMenu } from "react-burger-menu";

const styles = {
  menu: {
    bmBurgerButton: {
      position: "fixed",
      width: "30px",
      height: "30px",
      left: "8px",
      top: "8px",
    },
    bmBurgerBars: {
      background: "#373a47",
    },
    bmMenu: {
      background: "#FFFFFF",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      height: "default",
      margin: "0.8em",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  },
  menuItem: {
    cursor: "pointer",
    margin: 10,
  },
};

const Menu = ({ layer, layers, onSelectLayer }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <BurgerMenu
      customBurgerIcon={<FiMenu />}
      isOpen={isMenuOpen}
      onStateChange={({ isOpen }) => setMenuOpen(isOpen)}
      styles={styles.menu}
      width={200}
    >
      {Object.entries(layers).map(([key, name]) => (
        <span
          className={cn({ active: layer === key })}
          key={key}
          onClick={() => {
            setMenuOpen(false);
            onSelectLayer(key);
          }}
          style={styles.menuItem}
        >
          {name}
        </span>
      ))}
    </BurgerMenu>
  );
};

export default Menu;
