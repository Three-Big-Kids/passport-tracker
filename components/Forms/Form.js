import { useForm, Controller } from 'react-hook-form'
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

const Form = ({ fields, submitForm, name, submitCta, icon, submitting }) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const renderField = (item, field) => {
    switch (item.fieldType) {
      case 'textarea':
        return (
          <>
            <Label>{item.label}</Label>
            {item.descriptionPosition !== 'after' && (
              <Description>{item.description}</Description>
            )}
            <Textarea
              {...field}
              name={item.name}
              placeholder={item.placeholder}
              type={item.type}
              invalid={errors[item.name] === undefined ? false : true}
            />
            {item.descriptionPosition === 'after' && (
              <Description>{item.description}</Description>
            )}
            {errors[item.name] && (
              <ErrorMessage>{errors[item.name].message}</ErrorMessage>
            )}
          </>
        )
      // default is an input field
      default:
        return (
          <>
            <Label>{item.label}</Label>
            {item.descriptionPosition !== 'after' && (
              <Description>{item.description}</Description>
            )}
            <Input
              {...field}
              name={item.name}
              placeholder={item.placeholder}
              type={item.type}
              invalid={errors[item.name] === undefined ? false : true}
            />
            {item.descriptionPosition === 'after' && (
              <Description>{item.description}</Description>
            )}
            {errors[item.name] && (
              <ErrorMessage>{errors[item.name].message}</ErrorMessage>
            )}
          </>
        )
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className='w-full'>
      <Fieldset aria-label={name} disabled={submitting}>
        <FieldGroup>
          {fields.map((item, index) => (
            <Field key={index}>
              <Controller
                name={item.name}
                control={control}
                rules={item.rules}
                render={({ field }) => renderField(item, field)}
              />
            </Field>
          ))}
          <Button type='submit'>
            {submitCta}
            {icon && icon}
          </Button>
        </FieldGroup>
      </Fieldset>
    </form>
  )
}

export default Form
