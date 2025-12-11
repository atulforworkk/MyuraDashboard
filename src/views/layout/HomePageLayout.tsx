import SearchBar from "@/components/searchBar/SearchBar";
import SideBar from "@/components/sideBar/SideBar";
import { Avatar } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { IconStar } from "@tabler/icons-react";
import LogoutMenu from "@/composites/logoutMenu/LogoutMenu";

type Props = {};

const HomePageLayout = (props: Props) => {
  return (
    <div className="flex   h-screen ">
      <div className="flex  w-screen h-screen">
        {/* sidebar */}
        <div className=" w-72 bg-sidebar-color  ">
          <SideBar />
        </div>
        {/* main side */}
        <div className=" h-full flex-1 bg-main-color">
          <div className="h-full  w-11/12  my-8  ">
          <div className="flex justify-between ">
            <SearchBar />
            <LogoutMenu/>
            </div>

            <div className="m-6 bg-white border p-4 rounded-2xl">
            <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
