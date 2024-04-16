import { Suspense } from 'react'

import { auth } from '@/auth'
import { clearChats } from '@/app/actions'
import { Sidebar } from '@/components/sidebar'
import { SidebarList } from '@/components/sidebar-list'
import { IconSeparator } from '@/components/ui/icons'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ClearHistory } from '@/components/clear-history'
import { UserMenu } from '@/components/user-menu'
import { LoginButton } from '@/components/login-button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { ConnectButton } from '@/components/connect-button'
import { SettingsDropDown } from './settings-drop-down'

export async function Header() {
  const session = await auth()
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center">
        <Sidebar>
          <Suspense fallback={<div className="flex-1 overflow-auto" />}>
            <SidebarList userId={`${session?.user?.id}`} />
          </Suspense>
          <SidebarFooter className="justify-end">
            {session && <ClearHistory clearChats={clearChats} />}
          </SidebarFooter>
        </Sidebar>
        <div className="flex items-center">
          <IconSeparator className="size-6 text-muted-foreground/50" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <LoginButton
              variant="link"
              showGithubIcon={true}
              text="Login"
              className="-ml-2"
            />
          )}
        </div>
      </div>
      <div className="invisible absolute inset-0 -z-10 flex items-center justify-center gap-4 md:visible">
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className={`bg-yellow-300 text-xs text-slate-800`}>
              GPT-4 Turbo
            </Badge>
          </TooltipTrigger>
          <TooltipContent>{'Model'}</TooltipContent>
        </Tooltip>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <ConnectButton />
        <SettingsDropDown />
      </div>
    </header>
  )
}
