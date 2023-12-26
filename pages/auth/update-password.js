import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { Text, TextLink } from '@/components/Catalyst/text'
import { Button } from '@/components/Catalyst/button'
import Form from '@/components/Forms/Form'

function UpdatePassword () {
  const supabase = createPagesBrowserClient()
  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fields = [
    {
      fieldType: 'input',
      type: 'password',
      name: 'password',
      label: 'Enter your new password',
      description: 'Must be at least 8 characters long and contain a number',
      descriptionPosition: 'before',
      rules: {
        required: 'Password is required',
        pattern: {
          value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          message: `Password doesn't meet requirements`
        }
      }
    }
  ]

  // handle submit
  const onSubmit = async formData => {
    setSubmitting(true)
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password
    })
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
        <div className='relative w-full p-10 overflow-hidden bg-white border border-gray-100 shadow rounded-xl'>
          <h3 className='mb-8 text-xl font-medium'>Reset your password</h3>
          <Form
            fields={fields}
            submitForm={onSubmit}
            name='Update password'
            submitCta={
              submitting ? 'Updating password...' : 'Update my password'
            }
            icon={submitting ? null : <ChevronRightIcon />}
            submitting={submitting}
          />

          {/* show this message when the account has been created and email sent */}
          {emailSent && (
            <div className='absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full gap-4 p-0 bg-white'>
              <Text>Your password has been reset</Text>
              <Button href='/auth/signin'>
                Sign in
                <ChevronRightIcon />
              </Button>
            </div>
          )}
        </div>
        <Text className={`mt-8 ${emailSent ? 'invisible' : ''}`}>
          Remembered your password?{' '}
          <TextLink href='/auth/signin'>Sign in here</TextLink>
        </Text>
      </div>
    </div>
  )
}

export default UpdatePassword
