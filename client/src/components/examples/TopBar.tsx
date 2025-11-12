import TopBar from "../TopBar";

export default function TopBarExample() {
  return (
    <TopBar
      title="Dashboard"
      role="tenant"
      notificationCount={3}
      onMenuClick={() => console.log("Menu clicked")}
      onNotificationClick={() => console.log("Notifications clicked")}
    />
  );
}
