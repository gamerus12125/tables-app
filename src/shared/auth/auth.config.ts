import GitHub from "next-auth/providers/github"
import Yandex from "next-auth/providers/yandex"
import Discord from "next-auth/providers/discord"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
 
export default { providers: [GitHub, Yandex, Discord, Credentials] } satisfies NextAuthConfig