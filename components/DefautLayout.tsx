import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Avatar,
  Button,
  ConfigProvider,
  Drawer,
  Layout,
  Menu,
  MenuProps,
} from "antd";
import {
  faBars,
  faSignOut,
  faSignIn,
  faHome,
  faUser,
  faUserPlus,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import nProgress from "nprogress";

const { Content, Sider } = Layout;

const sidebarBackgroundColor = "#001529";
const sidebarMenuSelectedItemBackgroundColor = "#1677ff";

const DefaultLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  console.log(userEmail);

  useEffect(() => {
    // Subscribe to userEmail from local storage
    const userEmailFromLocalStorage = localStorage.getItem("userEmail");
    setUserEmail(userEmailFromLocalStorage);
  }, []);

  const [selected, setSelected] = useState([router.pathname]);

  function getMenu(): MenuProps["items"] {
    const menu: MenuProps["items"] = [];

    menu.push({
      key: "/",
      label: "Home",
      icon: <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>,
      onClick: () => router.push("/"),
    });

    // Adding Order Menu
    menu.push({
      key: "#order-menu",
      label: "Order",
      icon: <FontAwesomeIcon icon={faClipboardList}></FontAwesomeIcon>,
      children: [
        {
          key: "/order/post",
          label: "Post Order",
          onClick: () => router.push("/order/post"),
        },
      ],
    });

    if (status === "authenticated" || userEmail) {
      menu.push({
        key: "/sign-out",
        label: "Sign out",
        icon: <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>,
        onClick: () => {
          nProgress.start();
          signOut();
          // Remove userEmail from local storage
          localStorage.removeItem("userEmail");
          // Sign out
          // Refresh the page
        },
      });
    } else {
      menu.push({
        key: "/sign-in",
        label: "Sign in",
        icon: <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon>,
        onClick: () => {
          nProgress.start();
          router.push("/login");
        },
      });
    }

    menu.push({
      key: "register",
      label: "Register",
      icon: <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>,
      onClick: () => {
        nProgress.start();
        router.push("/register");
      },
    });

    return menu;
  }

  const displayUserName = session?.user?.name;

  function renderAvatar() {
    if (status === "authenticated") {
      return (
        <div className="flex flex-col items-center mt-6">
          <div>
            <Avatar
              size={64}
              icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}
            />
          </div>
          <div className="my-4 text-white">Hello, {displayUserName}</div>
        </div>
      );
    }

    return null;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            colorBgHeader: sidebarBackgroundColor,
          },
        },
      }}
    >
      <Layout className="min-h-screen">
        <Head>
          <meta key="meta-charset" charSet="utf-8" />
          <meta
            key="meta-viewport"
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <link key="favicon" rel="icon" href="/favicon.ico" />
        </Head>

        <Sider width={240} className="pb-24 hidden lg:block">
          <div className="h-12 p-2 m-4 text-white bg-slate-600">Logo</div>
          {renderAvatar()}
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  colorItemBg: sidebarBackgroundColor,
                  colorItemBgSelected: sidebarMenuSelectedItemBackgroundColor,
                },
              },
            }}
          >
            {userEmail && (
              <div className="flex flex-col justify-center items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <h1 className="text-white font-bold text-xl text-center">
                  Hello {userEmail}
                </h1>
              </div>
            )}
            <Menu
              theme="dark"
              mode="vertical"
              items={getMenu()}
              selectedKeys={selected}
              onSelect={(e) => setSelected(e.selectedKeys)}
            />
          </ConfigProvider>
        </Sider>
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  colorActiveBarBorderSize: 0,
                },
              },
            }}
          >
            <Menu
              mode="inline"
              items={getMenu()}
              selectedKeys={selected}
              onSelect={(e) => setSelected(e.selectedKeys)}
            />
          </ConfigProvider>
        </Drawer>
        <Layout>
          <div className="bg-topbar grid grid-cols-3 lg:hidden px-8 py-4 items-center">
            <div>
              <Button onClick={() => setDrawerOpen(true)} type="primary">
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
              </Button>
            </div>
            <div className="h-12 p-2 text-white bg-slate-600">Logo</div>
            {userEmail && (
              <div className="flex justify-end text-white">
                Hi, {userEmail}{" "}
                <Button
                  onClick={() => {
                    nProgress.start();
                    // Remove userEmail from local storage
                    localStorage.removeItem("userEmail");
                    // Sign out
                    window.location.reload();
                    // Refresh the page
                  }}
                  type="primary"
                  className="ml-4"
                >
                  Sign out
                </Button>
              </div>
            )}
          </div>
          <Content className="m-5 p-8 bg-white">{children}</Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export const WithDefaultLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default DefaultLayout;
