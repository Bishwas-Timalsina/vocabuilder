import { Link } from "react-router-dom";

const NavButton = ({
  icon,
  label,
  route,
}: {
  icon: React.ReactNode;
  label: string;
  route: string;
}) => {
  return (
    <Link
      to={`/${route}`}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default NavButton;
