import QuickActionPanel from "@/components/newUI/QuickActionPanel";
import ProfileViewSwitch from "@/components/newUI/ProfileViewSwitch";
import { RoomApp } from "@/components/room/RoomApp";
import "@/components/room/room.css";

/** The Profile section's 3D view. Its page-switcher + "Page | Room" switch appear on the entry screen and when Esc pauses the room. */
export default function RoomPage() {
  return (
    <RoomApp
      menu={
        <>
          <QuickActionPanel glass="dark" />
          <ProfileViewSwitch current="room" glass="dark" />
        </>
      }
    />
  );
}
