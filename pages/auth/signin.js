import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { Text, TextLink } from '@/components/Catalyst/text'

import Form from '@/components/Forms/Form'

function SignIn () {
  const supabase = createPagesBrowserClient()
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const fields = [
    {
      fieldType: 'input',
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'you@yourmail.com',
      rules: {
        required: 'Email is required'
      }
    },
    {
      fieldType: 'input',
      type: 'password',
      name: 'password',
      label: 'Password',
      rules: {
        required: 'A password is required'
      },
      description: (
        <>
          Forgot your password? <TextLink href='/auth/reset'>Reset it</TextLink>{' '}
          here
        </>
      ),
      descriptionPosition: 'after'
    }
  ]

  // handle submit
  const onSubmit = async formData => {
    setErrorMessage(null)
    setSubmitting(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })
    if (error) {
      console.log('error', error)
      setSubmitting(false)
      setErrorMessage(error.message)
    } else {
      // setSubmitting(false)
      window.location.href = '/'
      console.log('data', data)
    }
  }

  return (
    <div className='w-screen bg-zinc-50'>
      <div className='flex flex-col items-center justify-center max-w-md mx-auto h-dvh max-md:px-3'>
        <div className='relative w-full p-10 bg-white border border-gray-100 shadow rounded-xl'>
          <h3 className='mb-8 text-xl font-medium'>Sign in</h3>
          <Form
            fields={fields}
            submitForm={onSubmit}
            name='Sign up'
            submitCta={submitting ? 'Signing in...' : 'Sign in'}
            icon={submitting ? null : <ChevronRightIcon />}
            submitting={submitting}
          />
          {errorMessage && (
            <div className='mt-2'>
              <Text className='text-red-400'>{errorMessage}</Text>
            </div>
          )}
        </div>
        <Text className='mt-8'>
          Not a user? <TextLink href='/auth/signup'>Sign up here</TextLink>
        </Text>
      </div>
    </div>
  )
}

export default SignIn
