import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error('❌ Missing credentials')
          return null
        }

        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://spa-backend-beta.vercel.app'
          console.log('🔐 Attempting login to:', `${apiUrl}/api/auth/login`)
          
          // Call your backend API to validate credentials
          const response = await fetch(`${apiUrl}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          })

          const data = await response.json()
          console.log('🔐 Login response status:', response.status)

          if (response.ok && data.user) {
            console.log('✅ Login successful for:', data.user.email)
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              image: data.user.avatar,
              accessToken: data.accessToken,
            }
          }

          console.error('❌ Login failed:', data)
          return null
        } catch (error) {
          console.error('❌ Auth error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.accessToken = (user as any).accessToken || account?.access_token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        ;(session as any).accessToken = token.accessToken
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
