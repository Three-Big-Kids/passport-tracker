import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/16/solid'
import { Text, TextLink } from '@/components/Catalyst/text'

import Form from '@/components/Forms/Form'

function SignUp () {
  const supabase = createPagesBrowserClient()
  const [emailSent, setEmailSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const fields = [
    {
      fieldType: 'input',
      type: 'text',
      name: 'name',
      label: 'Name',
      placeholder: 'Your Name',
      rules: {
        required: 'Name is required'
      }
      // description: 'Your name is required',
      // descriptionPosition: 'after'
    },
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
      }
    }
  ]

  // handle submit
  const onSubmit = async formData => {
    setSubmitting(true)
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name
        }
      }
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
          <h3 className='mb-8 text-xl font-medium'>Sign up</h3>
          <Form
            fields={fields}
            submitForm={onSubmit}
            name='Sign up'
            submitCta={submitting ? 'Submitting...' : 'Sign up'}
            icon={submitting ? null : <ChevronRightIcon />}
            submitting={submitting}
          />

          {/* show this message when the account has been created and email sent */}
          {emailSent && (
            <div className='absolute top-0 left-0 z-10 flex flex-col items-center justify-center w-full h-full gap-2 p-0 bg-white'>
              <h3 className='text-xl font-medium'>Thank you for joining</h3>
              <Text>Check your email to confirm your account.</Text>
            </div>
          )}
        </div>
        <Text className={`mt-8 ${emailSent ? 'invisible' : ''}`}>
          Already a user? <TextLink href='/auth/signin'>Sign in here</TextLink>
        </Text>
      </div>
    </div>
  )
}

export default SignUp
