import DataTable from '../components/DataTable'
import { TextField, Button, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import { useToken } from '../custom-hooks/Token';

function Dashboard() {

  function refreshPageHalfSecond() {
    setTimeout(() => {
      window.location.reload();
    }, 500); 
  }
  
  const { token, setToken, saveToken, deleteToken } = useToken('073fa25327a3f5cfc8b14ef75666dcd27c2986fb4de9248a');
  const [savedTokens, setSavedTokens] = useState<string[]>([]);

  useEffect(() => {
    const storedTokens = localStorage.getItem('userTokens');
    if (storedTokens) {
      setSavedTokens(JSON.parse(storedTokens));
    }
  }, []);

  const handleTokenSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token.trim() === '') {
      return; 
    }
    saveToken(token);
    setToken(token);
    refreshPageHalfSecond();
  }

  const handleTokenDelete = (tokenToDelete: string) => {
    const newTokens = savedTokens.filter(userToken => userToken !== tokenToDelete);
    localStorage.setItem('userTokens', JSON.stringify(newTokens));
    setSavedTokens(newTokens);
  }

  let tokenSelect = 'Select'

  

  return (
    <div>
      <div className="flex flex-row p-5 text-center bg-gradient-to-r from-white to-sky-100 text-slate-800">
        <div className="flex flex-row border rounded">
          <form onSubmit={handleTokenSubmit} className='p-3'>
            <TextField
              label="Enter Token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
            />
            <div className="pt-2 flex justify-start"><Button type="submit">Submit</Button></div>
          </form>
          <div className="p-3">
            <TextField
                  select
                  label="Saved Tokens"
                  value={token}
                  sx={{ width: "210px" }}
                  onChange={(event) => {
                    setToken(event.target.value);
                    refreshPageHalfSecond();
                  }}
                >
                  {savedTokens.map((token) => (
                    <MenuItem key={token} value={token}>
                      <div className="flex flex-row">
                        {token}
                        <div
                          className="cursor-pointer hover:text-red-500"
                          onClick={() => handleTokenDelete(token)}
                        >
                          <Delete />
                        </div>
                      </div>
                    </MenuItem>
                  ))}
                </TextField>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="pt-3 pl-3 max-h-7">Need a token?</div>
          <div className="mt-7 sm:mt-3 pl-3 max-h-7 text-indigo-600 hover:text-indigo-300" id='FlaskLink'>
            <Link to="https://review-keybase.glitch.me/" target="_blank">
              go to TOKENS
            </Link>
          </div>
        </div>
      </div>
      <DataTable token={token}/>
      <div className='h-12 bg-gradient-to-r from-white to-sky-100'></div>
    </div>
  )
}

export default Dashboard;