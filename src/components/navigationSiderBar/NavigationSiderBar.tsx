import { NavLink } from "react-router-dom";

type Props = {};

const NavigationSiderBar = (props: Props) => {
  const baseClasses =
    "block mx-2 my-3 px-4 py-1 rounded-lg transition-colors duration-200";
  const activeClasses = "font-bold text-blue-500 bg-white";
  const inactiveClasses = "text-white hover:text-blue-200";

  return (
    <div>
      <div className="text-xl font-semibold">
        <ul>
          <li>
            <NavLink
              to="/home/dashboard"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
              end
            >
              Dashboard
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/home/orders"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              Orders
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/home/products"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              Products
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/home/customers"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              Customers
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/home/discounts"
              className={({ isActive }) =>
                `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
              }
            >
              Discounts
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationSiderBar;
