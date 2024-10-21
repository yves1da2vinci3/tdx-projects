import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import userAtom from "../recoil/Atoms/userAtom"
import SideBar from "../Layout/SideBar";
import { Button } from "@mantine/core";
import { IconArrowBack } from "@tabler/icons";
// import { useRecoilValue } from "recoil";

const MainLayout = () => {
const Navigate = useNavigate()
//   const User= useRecoilValue(userAtom)

//   const navigate = useNavigate();
//   const { pathname } = useLocation();c
//   useEffect(()=>{
//     if(Object.keys(User).length > 0) {
//       if (pathname.startsWith("/admin")) {
//         if (!User?.isAdmin) {
//           navigate("/user");
//         }
//       }
//     }

  
//   },[])



  return (
    <div className="flex h-auto ">
      <div className="flex-1">
        <SideBar />
      </div>
      <div className="flex-[3]  h-screen">
        <Button onClick={()=> Navigate(-1)} leftIcon={<IconArrowBack/>} className="border-2 text-black border-black mt-20 hover:bg-green-500 hover:text-white hover:border-green-500" >Back</Button>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
