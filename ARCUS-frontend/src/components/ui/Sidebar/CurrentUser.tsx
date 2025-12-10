import { UserIcon } from "lucide-react";

type CurrentUser = {
  name: string;
};

const MOCK_USER: CurrentUser = {
  name: "Cheonbi",
};

export const CurrentUser = () => {
  return (
    <div className="sidebar-user">
      <span className="sidebar-user-avatar">
        <UserIcon size={18} />
      </span>
      <div className="sidebar-user-info">{MOCK_USER.name}</div>
    </div>
  );
};
