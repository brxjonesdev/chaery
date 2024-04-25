import CouplesMenu from '@/components/details'
import Notifications from '@/components/notifications'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import UserSettings from '@/components/user-settings'
import { Separator } from '@/components/ui/separator'
import { AppSettings } from '@/components/app-settings'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  return (
    <section className="w-full flex flex-col gap-6">
      {/* Header */}
      <header className="w-full flex flex-col gap-4 bg-black-500 h-fit p-4 rounded-lg">
        {/* Settings & Notification */}
        <section className="flex justify-between">
          <div>
            {/* User Settings (Logout) */}
            <Dialog>
              <DialogTrigger className="hover:brightness-90 flex items-center gap-2 bg-white-200 p-2 rounded-xl">
                <Avatar className="w-8 h-8">
                  {/* <AvatarImage src={user.avatar} /> */}
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p></p>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-left text-2xl font-nunito_sans font-bold">User Settings</DialogTitle>
                  <DialogDescription>
                    <UserSettings />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 items-center">
            {/* Settings */}
            <Dialog>
              <DialogTrigger className="hover:brightness-90">
                <div className="w-8 h-8 rounded-full bg-cherry_medium-700 hover:bg-cherry_medium-800"></div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-left text-2xl font-nunito_sans font-bold">Chaery Settings</DialogTitle>
                  <DialogDescription>
                    <AppSettings />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </section>
        {/* Details */}
        <Notifications />
        {/* Add a cool animation here! */}
        <section className="flex flex-col items-center">
          <Collapsible className="w-full flex flex-col items-center">
            <CollapsibleTrigger className="font-nunito_sans text-center" disabled={false}>
              Open
            </CollapsibleTrigger>
            <CollapsibleContent className="w-full mt-3">
              {/* Users */}
              <section className="flex gap-4 justify-center bg-black-400 w-full py-4 rounded-md self-center">
                <div className="flex flex-col items-center justify-center ">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-nunito_sans font-medium text-lg">{``}</p>
                </div>
                <div className="flex items-center">
                  <p>❤️</p>
                </div>
                <div className="flex flex-col items-center">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-nunito_sans font-medium text-lg">{``}</p>
                </div>
              </section>
              <CouplesMenu />
            </CollapsibleContent>
          </Collapsible>
        </section>
      </header>
      {/* Main Content */}
      <section className="bg-black-500 h-fit p-4 rounded-lg">{children}</section>
    </section>
  )
}