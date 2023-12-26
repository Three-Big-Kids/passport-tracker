import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { Text, TextLink, Code } from '@/components/Catalyst/text'

import Form from '@/components/Forms/Form'

function Reset () {
  const supabase = createPagesBrowserClient()
  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [userEmail, setUserEmail] = useState('')

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
    }
  ]

  // handle submit
  const onSubmit = async formData => {
    setSubmitting(true)
    setUserEmail(formData.email)
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: 'http://localhost:3000/auth/update-password'
      }
    )
    if (error) {
      console.log('error', error)
    } else {
      setEmailSent(true)
      setSubmitting(false)
      console.log('data', data)
    }
  }

  return (
    <div className='w-screen bg-zinc-50'>
      <div className='flex flex-col items-center justify-center max-w-md mx-auto h-dvh max-md:px-3'>
        <div className='relative w-full p-10 bg-white border border-gray-100 shadow rounded-xl'>
          <h3 className='mb-8 text-xl font-medium'>Reset your password</h3>
          <Form
            fields={fields}
            submitForm={onSubmit}
            name='Reset password'
            submitCta={
              submitting ? 'Sending reset email...' : 'Send reset email'
            }
            icon={submitting ? null : <ChevronRightIcon />}
            submitting={submitting}
          />

          {/* show this message when the account has been created and email sent */}
          {emailSent && (
            <div className='absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full p-0 bg-white'>
              <Text>
                A reset link has been sent to <Code>{userEmail}</Code>
              </Text>
            </div>
          )}
        </div>
        <Text className='mt-8'>
          Remembered your password?{' '}
          <TextLink href='/auth/signin'>Sign in here</TextLink>
        </Text>
      </div>
    </div>
  )
}

export default Reset
