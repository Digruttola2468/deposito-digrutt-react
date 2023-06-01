import { FaSearch } from "react-icons/fa";


import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export default function InputMui({title}) {
    
    return (
        <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">
                {title}
            </InputLabel>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <FaSearch />
                </InputAdornment>
              }
            />
          </FormControl>
          
    );
}