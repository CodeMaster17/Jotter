import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ILinkItem } from "@/types";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

interface TrackerProps {
  userData: ILinkItem[]
  onLogout: () => void;
}

const Tracker = ({ userData, onLogout }: TrackerProps) => {

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          {userData.map((item) => {
            return (
              <p key={item.type}>
                {item.type}: {item.url}
              </p>
            )
          })}
          <button onClick={onLogout} className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">Logout</button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <Button variant="ghost" size="icon" onClick={onLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </TabsContent>
    </Tabs>

  )
}

export default Tracker