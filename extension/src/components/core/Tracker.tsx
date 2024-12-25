import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileLinks } from "./ProfileLinks"

const Tracker = () => {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Profile</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <ProfileLinks />
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>

  )
}

export default Tracker