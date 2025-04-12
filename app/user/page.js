// // app/user/page.js
// import ProfileForm from "@/components/ProfileForm";

// export default function UserPage() {
//   return <ProfileForm />;
// }


"use client";

import { useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import ProfileForm from "@/components/ProfileForm";
import OrderOverview from "@/components/OrderOverview";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto p-4 space-y-8 ">
      {/* Navigation Menu */}
      <NavigationMenu>
        <NavigationMenuList className="justify-center">
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setActiveTab("profile")}
              className={activeTab === "profile" ? "bg-accent text-accent-foreground" : ""}
            >
              User Profil
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem className="cursor-pointer">
            <NavigationMenuLink
              onClick={() => setActiveTab("orders")}
              className={activeTab === "orders" ? "bg-accent text-accent-foreground" : ""}
            >
              Bestellübersicht
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Inhalte abhängig vom aktiven Tab */}
      <div>
        {activeTab === "profile" && <ProfileForm />}
        {activeTab === "orders" && <OrderOverview />}
      </div>
    </div>
  );
}
