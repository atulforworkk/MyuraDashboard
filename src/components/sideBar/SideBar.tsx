import { useNavigate } from "react-router-dom";
import NavigationSiderBar from "../navigationSiderBar/NavigationSiderBar";
import { Button } from "../ui/button";
import images from "@/assets/images/imageData/ImageData";
type Props = {};

const SideBar = (props: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home/newtask");
  };
  return (
    <div className="text-white flex  flex-col px-4 py-2  ">
      <div className="flex items-center ">
      <img src={images.logo} alt="" className="w-58 h-20" />
      </div>
      {/* <Button variant="secondary" onClick={handleClick}>
        New Task
      </Button> */}

      <NavigationSiderBar />
    </div>
  );
};

export default SideBar;
