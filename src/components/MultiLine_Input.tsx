import { forwardRef } from 'react'
import { TextField } from '@mui/material'

interface InputType {
    name: string,
    placeholder: string,
}

const MultiLineInput = forwardRef(( props: InputType, ref) => {
  return (
    <TextField
        variant='outlined'
        margin='normal'
        inputRef={ref}
        fullWidth
        type='text'
        multiline={true}
        rows={7}
        {...props}
    >

    </TextField>
  )
});

export default MultiLineInput