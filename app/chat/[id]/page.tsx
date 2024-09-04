import { notFound, redirect } from "next/navigation"

import { auth } from "@/auth"
import { Chat } from "@/components/chat/chat"
import { getAiThreadMessages } from "@/lib/actions/ai"
import { getAgent, getChat } from "@/lib/actions/db"
import type { ChatPageProps } from "@/lib/types"

export default async function ChatPage({ params, searchParams }: ChatPageProps) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect(`/sign-in?next=/chat/${params.id}`)
  }

  const chat = await getChat(params.id)

  if (!chat) {
    redirect("/")
  }

  if (chat?.userId !== session?.user?.id) {
    notFound()
  }

  const agentId = chat.agentId || (searchParams?.a as string)
  const [agent, messages] = await Promise.all([agentId ? getAgent(agentId) : undefined, getAiThreadMessages(params.id)])

  return <Chat agent={agent} initialThreadId={chat.id} initialMessages={messages} session={session} />
}
