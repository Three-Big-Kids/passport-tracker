// import { useUser } from '@supabase/auth-helpers-react'
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
  useUser
} from '@supabase/auth-helpers-react'

import { Text, TextLink } from '@/components/Catalyst/text'
import { Button } from '@/components/Catalyst/button'

import Head from 'next/head'

import Profile from '@/components/Profile'

const Home = () => {
  // supabase client
  const supabase = useSupabaseClient()

  // user, sesssion and session context
  const user = useUser()
  const session = useSession()
  const sessionContext = useSessionContext()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className='container mx-auto'>
      <Head>
        <title>Passport tracker</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='pt-28'>
        {/* loading */}
        {sessionContext.isLoading && <div>loading</div>}

        {/* no user */}
        {!sessionContext.isLoading && !session && (
          <div className='flex flex-col max-w-sm gap-4 mx-auto'>
            <h1 className='text-2xl font-medium'>Hello!</h1>
            <Text>Looks like you have no account</Text>

            <div className='flex flex-col gap-2'>
              <Button className='w-full' href='/auth/signup'>
                Sign up
              </Button>
              <Button className='w-full' outline href='/auth/signin'>
                Sign in
              </Button>
            </div>
          </div>
        )}

        {/* user is logged in */}
        {!sessionContext.isLoading && session && session.user && (
          <div className='flex flex-col max-w-sm gap-4 mx-auto'>
            <h1 className='text-2xl font-medium'>Welcome back!</h1>
            <Text>You are logged in as {user.email}</Text>

            <Profile userId={user.id} />

            <div className='flex flex-col gap-2'>
              <Button className='w-full' onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
