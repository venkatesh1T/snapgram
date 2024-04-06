import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext  , INITIAL_USER} from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  const navigate = useNavigate();
  const { user  , setIsAuthenticated , setUser} = useUserContext();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar" style={{ height: "100vh" }}>
      <div className="flex flex-col gap-6" style={{ paddingBottom: "1rem" }}> {/* Adjust padding bottom and decrease gap */}
        <Link to="/" className="flex gap-2 items-center"> {/* Decrease gap */}
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={150} // Decrease width
            height={32} // Decrease height
          />
        </Link>

        <Link to={`/profile/${user.id}`} className="flex gap-2 items-center"> {/* Decrease gap */}
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg."}
            alt="profile"
            className="h-12 w-12 rounded-full" // Decrease size
          />
          <div className=" flex flex-col">
            <p className="body-bold text-sm">{user.name}</p> {/* Decrease font size */}
            <p className="small-regular text-light-3 text-xs">{user.username}</p> {/* Decrease font size */}
          </div>
        </Link>
        <ul className="flex flex-col gap-4"> {/* Decrease gap */}
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${isActive && "bg-primary-500"}`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-2 items-center p-3" // Decrease padding and gap
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white w-5 h-5 ${isActive && "invert-white"}`} // Decrease icon size
                  />
                  <span className="text-sm">{link.label}</span> {/* Decrease font size */}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost"
        style={{ marginTop: "auto" }}
        onClick={(e) => handleSignOut(e)}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
