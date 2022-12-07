import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar, MenuConfig as SidebarMenuConfig } from './Sidebar';

export type MenuConfig = SidebarMenuConfig;

export type AdminLayoutProps = {
  children?: React.ReactNode | null;
  menuConfigs: MenuConfig[];
};

export const AdminLayout: React.FC<AdminLayoutProps> = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="nrg-admin">
      <Navbar onMenuBtnClick={() => setIsSidebarOpen(true)} />
      <div className="nrg-admin-content">{props.children}</div>
      <Sidebar menuConfigs={props.menuConfigs} onClose={handleSidebarClose} open={isSidebarOpen} />
    </div>
  );
};
