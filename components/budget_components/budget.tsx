import { Button } from '@/components/ui/button'
import { TabsTrigger, TabsList, TabsContent, Tabs } from '@/components/ui/tabs'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import FinancialOverview from './overview'
import FinancialGoals from './goals'
import FinancialResponsibilities from './bills'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function Budget() {
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
    <div className="flex flex-col h-full w-full  mx-auto p-6 md:p-10 bg-white dark:bg-gray-950 rounded-lg shadow-lg text-black-100">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Budget</h1>
        <div className="flex items-center space-x-4">
          <Button size="icon" variant="ghost">
            <SettingsIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button size="icon" variant="ghost">
            <HelpCircleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="sr-only">Help</span>
          </Button>
        </div>
      </header>
      <Tabs className="" defaultValue="overview">
        <TabsList className="w-full bg-black-900">
          <TabsTrigger value="overview" className="w-full">
            Overview
          </TabsTrigger>
          <TabsTrigger value="bills" className="w-full">
            Bills
          </TabsTrigger>
          <TabsTrigger value="goals" className="w-full">
            Goals
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <FinancialOverview />
        </TabsContent>
        <TabsContent value="goals">
          <FinancialGoals />
        </TabsContent>
        <TabsContent value="bills">
          <FinancialResponsibilities />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function HelpCircleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}

function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
