import {
  Description,
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label
} from '@/components/Catalyst/fieldset'
import { Input } from '@/components/Catalyst/input'
import { Select } from '@/components/Catalyst/select'
import { Textarea } from '@/components/Catalyst/textarea'
import { Button } from '@/components/Catalyst/button'

import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Profile = ({ userId }) => {
  const { data, error } = useSWR(`/api/getUserProfile?id=${userId}`, fetcher)
  console.log('user data', data)

  if (error) {
    return <div>Failed to load</div>
  }
  if (!data) {
    return <div>Loading...</div>
  }

  return <div>{data.name}</div>
}

export default Profile
