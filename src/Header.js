const Header = ({ layer, time }) => (
  <header className="header">
    <span>
      {time.dayToString()} - {time.hourToString()} ({layer})
    </span>
  </header>
);

export default Header;
