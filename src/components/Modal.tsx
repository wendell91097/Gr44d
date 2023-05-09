import React from 'react'
import ReviewForm from './InfoForm';

type Props = {
    id?: string[];
    open: boolean;
    privacy: boolean;
    token: string;
    onClose: () => void;

}
const Modal = ( props: Props) => {
    if( !props.open ) return (<></>);
    return (
        <div 
        onClick={props.onClose} 
        
        className='fixed w-full h-full flex overflow-auto
        z-10 justify-center align-middle bg-gray-300 bg-opacity-30'
        >
            <div className='min-w-600px w-3/5 fixed flex z-10 my-20 bg-white shadow-xl rounded overflow-y-scroll'
            onClick={(e) => {
                e.stopPropagation()
            }}
            >
                <div className="justify-between flex flex-row">
                    <div className="flex flex-col">
                        <p className="flex justify-end m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
                        onClick={props.onClose}>
                            X
                        </p>
                    </div>
                    {/* <div className="flex items-center text-center my-3 p-1">
                        <ReviewFormPrivate id={ props.id } />
                    </div> */}
                    <div className="flex items-center text-center my-3 p-1">
                        <ReviewForm id={ props.id } privacy = { props.privacy} token={props.token}/>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Modal