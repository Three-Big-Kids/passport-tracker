// THIS ENDPOINT SHOULD RETURN THE USER'S PROFILE
// CONTAINING USER DATA AND THEIR PASSPORTS

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)
export default async function handler (req, res) {
  const body = req.query
  console.log('hello')
  const { data, error } = await supabase
    .from('profiles')
    .select('*, passports(*)')
    .eq('id', body.id)
  if (error) {
    res.status(400).json(data)
  } else {
    res.status(200).json(data[0])
  }
}
