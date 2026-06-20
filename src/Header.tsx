import type Time from "./time";

const Header = ({ layer, time }: { layer: string; time: Time }) => (
  <header className="header">
    <span>
      {time.dayToString()} - {time.hourToString()} ({layer})
    </span>
  </header>
);

export default Header;
