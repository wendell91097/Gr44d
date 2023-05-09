import Button from "./Button"
import Input from "./Input"
import MultiLineInput from "./MultiLine_Input"

import { useForm } from 'react-hook-form'
import { useToken } from "../custom-hooks/Token"

import { useState, useEffect } from "react"

import { Rating } from "@mui/material"
import { server_calls } from "../api/server"
import { useDispatch, useStore } from 'react-redux'
import { chooseShow, chooseAuthor, chooseRating, chooseReview } from '../redux/slices/rootSlice';

interface ReviewFormProps {
  id?: string[],
  privacy: boolean;
  token: string;
}

const labels: { [index: number]: string } = {
  0: 'Worthless!',
  1: 'Poor...',
  2: 'Okay',
  3: 'Good',
  4: 'Great',
  5: 'Excellent!',
};

interface RatingProps {
  rating : number
}


function RatingToString({ rating }: RatingProps) {
  const [stringValue, setStringValue] = useState('');
  // Update the string value whenever the number changes
  if(rating === null){
    useEffect(() => {
      setStringValue(labels[0] || '');
    }, [0]);
  }else{
    useEffect(() => {
      setStringValue(labels[rating] || '');
    }, [rating]);
  }
  return <div>{stringValue}</div>
}

function ReviewForm( props: ReviewFormProps ) {
  const token = useToken('073fa25327a3f5cfc8b14ef75666dcd27c2986fb4de9248a')
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();
  const [value, setValue] = useState<number | null >(1)

  const onSubmit = ( data: any, event: any) => {
    console.log(`ID: ${props.id}`);
    let rating = 0
    if(value !== null){
      rating = value
    }
    dispatch(chooseShow(data.show));
    dispatch(chooseAuthor(data.author))
    dispatch(chooseRating(rating));
    dispatch(chooseReview(data.review))

    

    if(props.id && props.id.length > 0) {
      server_calls.update(props.id[0], store.getState(), props.privacy, token.token)
      console.log(`Updated: ${data.show} , ${props.id}`)
      setTimeout(() => {window.location.reload()}, 500);
      event.target.reset()
    } else {
      server_calls.create(store.getState(), props.privacy, token.token);
      setTimeout(() => {window.location.reload()}, 500);
    }
  }

  return (

    <div>
      <form onSubmit={ handleSubmit(onSubmit) }> 
        <div className="flex sm:flex-row flex-col justify-between">
          <div className="flex flex-col px-4">
            <div>
              <label htmlFor="show">Show Name</label>
              <Input {...register('show')} name='show' placeholder="Show Name"/>
            </div>
            <div>
              <label htmlFor="author">Author (You)</label>
              <Input {...register('author')} name='author' placeholder="Author"/>
            </div>
            <div className="flex flex-row align-middle justify-center py-4">
              <label htmlFor="rating" className="pr-3">Rating</label>
              <Rating
                name="rating"
                value={value}
                precision={1}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            {value !== null && (
              <div className="pl-2">
                <RatingToString rating={value} />
              </div>
              )}
          </div>
          <div className="flex flex-col px-4 justify-self-end">
            <div>
              <label htmlFor="review">Your Review:</label>
              <MultiLineInput {...register('review')} name='review' placeholder="Tell us what you think!"/>
            </div>
            <div className="flex p-1">
              <Button
                className="flex align-end m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
              >
                Submit
              </Button>
          </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm