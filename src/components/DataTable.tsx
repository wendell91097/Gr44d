import React, { useState } from 'react'
import Button from './Button'
import Modal from './Modal'
import { server_calls } from '../api/server';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetData } from '../custom-hooks/FetchData';
import { Rating, FormControlLabel, Switch } from '@mui/material';
import { usePrivacyToggle } from '../custom-hooks/PrivacyToggle';

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

function RatingToString({ rating } : RatingProps ) {
  const [stringValue, setStringValue] = useState('');
  // Update the string value whenever the number changes
  React.useEffect(() => {
    setStringValue(labels[rating] || '');
  }, [rating]);

  return <div>{stringValue}</div>
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90, hide:true},
  { field: 'show', headerName: 'Show', flex: 4},
  { field: 'author', headerName:'Author', flex: 4},
  { field: 'rating', 
    headerName: 'Rating', 
    flex: 5,
    renderCell: (params) => (
      <div className='inline-flex row-auto'>
        <Rating
          name='rating' 
          value={params.row.rating}
          readOnly/>
        <div className='pl-2 pt-1'>
          <RatingToString rating={params.row.rating}/>
        </div>
      </div>
    ) 
  },
  { field: 'review', headerName: 'Review', flex: 20,}
]

type TableProps = {
  token: string
}

function DataTable(props: TableProps) {
  const [ open, setOpen ] = useState(false);
  const [ showPrivateReviews, setShowPrivateReviews] = useState(false);
  const { privacy, togglePrivacy } = usePrivacyToggle(false, setShowPrivateReviews);
  const { reviewData, getData } = useGetData(privacy, props.token);
  const [ selectionModel, setSelectionModel ] = useState<string[]>([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)  
  }
    
  const deleteData = () => {
    for(let i = 0; i < selectionModel.length; i++){
      server_calls.delete(selectionModel[i], privacy, props.token);
    }
    getData();
    console.log(`Selection model: ${selectionModel}`) 
    setTimeout(() => {window.location.reload()}, 500)
  }
    
  return (
    <div className='bg-gradient-to-r from-white to-sky-100'>
      <Modal
        id={ selectionModel }
        token={props.token}
        open={ open } 
        privacy={ privacy }
        onClose={ handleClose }
      /> 
      <div className='flex flex-row px-3 pt-2 pb-1'>
        <div>
          <button
            className='p-3 m-3 bg-slate-300 rounded-xl shadow-xl hover:bg-slate-800 hover:text-white'
            onClick={() => handleOpen()}
          >
            Add Review   
          </button>
        </div>
        <Button onClick={ handleOpen } className='p-3 m-3 bg-slate-300 rounded-xl shadow-xl hover:bg-slate-800 hover:text-white'>
          Update
        </Button>
        <Button onClick={ deleteData } className='p-3 m-3 bg-slate-300 rounded-xl shadow-xl hover:bg-slate-800 hover:text-white'>
          Delete
        </Button>
        <div className="flex items-center">
          <FormControlLabel
            control={
              <Switch
                checked={privacy}
                onChange={togglePrivacy}
              />
            }
            label="Private Mode"
          />
        </div>
      </div>
      <div className={ open ? "hidden" : "container px-5 py-5 flex flex-col" }
        style={{ height: 450, width: '100%' }}
      >
        <h2 className='p-3 bg-slate-300 my-3 rounded'>Opinions with Factual Support</h2>
        <DataGrid
          rows={ reviewData }
          columns={columns}
          rowsPerPageOptions={[5, 10, 25, 100]}
          checkboxSelection={true} 
          onSelectionModelChange={(item:any) => {
            setSelectionModel(item)
          }}
        />
      </div>
    </div>
  )
}

export default DataTable
