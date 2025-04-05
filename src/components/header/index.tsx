"use client";
import SignBtn from "@/hooks/auth";
import {  useLazyGetUserStatsByPhoneQuery } from "@/store/api/loginApi";
import { useAppDispatch } from "@/store/hooks";
import { setLoading } from "@/store/slices/loadingSlice";
import { resetAuthUser, setAuthUserDetail } from "@/store/slices/userInfoAuthSlice";
import { useAppSelector } from "@/store/store";
import { deleteCookie, getCookie } from "@/utils/axiosHelper";
import { ArrowDropDownRounded, MenuRounded } from "@mui/icons-material";
import { Drawer, IconButton, Menu } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../logo";
import { navLinks } from "./data";
import SukoonDrawer from "./drawer";
import useDeviceType from "@/hooks/useDeviceType";
import useScrollPosition from "@/utils/useScrollPosition";
import ProfileDropdown from "./ProfileDropdown";
import { usePathname } from "next/navigation";
import { checkAgent } from "@/utils/helpers";
import { clearIndexedDB, getItems } from "@/utils/indexDbUtils";
import Btn from "../button";


const Header = () => {
  const verifiedUserData = useAppSelector(
    (state) => state.authUserReducer.data
  );
  const dispatcher = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isApp, setIsApp] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [fetchUserProfile] = useLazyGetUserStatsByPhoneQuery();

  useEffect(() => {

    const init = async () => {
      try {
        const fetchuserToken = await getCookie("userToken");
        const getUserMeta = await getItems();
        // @ts-ignore
        if (getUserMeta?.phoneNumber) {

          // @ts-ignore

          if (getUserMeta) {
            // addItem(apiData)
            //@ts-ignore
            dispatcher(setAuthUserDetail(getUserMeta));
            dispatcher(setLoading(false))
          }

        } else {
          deleteCookie();
          dispatcher(resetAuthUser());
        }
      } catch (e) {
        deleteCookie();
        dispatcher(resetAuthUser());
      }
    };
    init();
    checkAgentLocal();
  }, [dispatcher, fetchUserProfile]);
  useEffect(() => {
    if (verifiedUserData?.phoneNumber) {
      fetchUserProfile(verifiedUserData?.phoneNumber).unwrap().then(res=>{
        //@ts-ignore
         if (!res?.output_details?.phoneNumber ) {
          logoutFn();
         }
      }).catch(e => {
        logoutFn();
      });
    }
    
  }, [verifiedUserData]);


  const logoutFn = async () => {
    try {
      clearIndexedDB();
      document.cookie.split(";").forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    } catch (error) {
      // console.log(error);
    }
    // dispatcher(setLoading(true))

    deleteCookie()
      .then(() => {
        dispatcher(setLoading(false));
      })
      .catch(() => {
        dispatcher(setLoading(false));
      });
    window.location.reload();
  };

  const router = usePathname();

  const { isMobile } = useDeviceType();
  const { scrolled100vh } = useScrollPosition();

  const yellowHeader = scrolled100vh || router !== '/' && router !== '/success' && router !== '/success_google';

  const checkAgentLocal = async () => {
    const clientAgent = await checkAgent();
    setIsApp(clientAgent.agent === 'APP_AGENT_TARGET')
  }
  return (
    !isApp && <header
      className="fixed drop-down overflow-y-auto top-0 p-1 md:py-2 px-4 md:px-6 lg:px-10 flex justify-between items-center w-full z-30 backdrop-blur-lg rounded-b-md bg-[#FFF9E9]"
    >
      <span className="w-12 sm:w-16 [&>*]:my-auto cursor-pointer">
        <Link href={'/'}>
          <Logo color={"black"} />
        </Link>
      </span>

      {/* NAV LINKS */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks?.map((link: any, index) => (
          <Link key={index} href={link?.path}>
            <p
              className={`font-normalFont text-black text-base hover:text-primaryYellow hover:scale-105 transition-all`}
            >
              {link?.title}
              {link?.highlight && (
                <sup className="font-normalFont text-green"> New </sup>
              )}
            </p>
          </Link>
        ))}
      </div>
      {/* NAV LINKS */}

      {/* MENU AND PROFILE */}

      <div className="flex gap-5 items-center justify-between p-2">
        {verifiedUserData?._id ? (
          <div className="flex items-center gap-4 ">
            {/* <div className="flex flex-col items-center justify-center gap-0">
              {verifiedUserData?.name && (
                <p className="text-lg">
                  Hi, {verifiedUserData?.name?.split(" ")[0]}
                </p>
              )}
            </div> */}
            <span
              onClick={handleClick}
              className="flex justify-center items-center [&>svg]:hover:translate-y-1 cursor-pointer"
            >
              <span className="border border-primaryYellow/70 size-11 backdrop-blur-lg bg-primaryYellow/10 hover:bg-primaryYellow/15 transition-all text-primaryYellow flex justify-center items-center rounded-full text-xl cursor-pointer">
                {verifiedUserData?.name ? verifiedUserData?.name[0] : "U"}
              </span>
              <ArrowDropDownRounded className="text-primaryYellow transition-all" />
            </span>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}

              sx={{
                p: 0,
                m: 0,
              }}
            >
              <ProfileDropdown
                userName={verifiedUserData?.name ? verifiedUserData?.name : ""}
                onClose={handleClose}
                logout={() => logoutFn()}
              />
            </Menu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
          <SignBtn buttonText="Sign up"  blur={!yellowHeader} />
          {/* <Link  href="/login">
           <Btn text="Download App" fontSize="text-base" color="primaryYellow" textColor="black" border="black" borderType="3d" />
            </Link> */}
          </div>
        )}
        <div className="flex md:hidden flex-row max-h-12">
          <IconButton onClick={() => setOpenDrawer(true)}>
            <MenuRounded
              sx={{
                width: { sm: 30, md: 36, lg: 40 },
                height: { sm: 30, md: 36, lg: 40 },
                color:"black",
              }}
            />
          </IconButton>
        </div>

        {isMobile && (
          <Drawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
            anchor="left"
          >
            <SukoonDrawer verifiedUserData={verifiedUserData} close={() => setOpenDrawer(false)} />
          </Drawer>
        )}
      </div>
      {/* MENU AND PROFILE */}
    </header>
  );
};

export default Header;
