import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Grid } from "@material-ui/core";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useHistory, useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';


import { useDispatch } from "react-redux";
import './AddBookableItem.css';

function addBookableItem () {
    /**
    Need a paramId = clientId 
    this would go into dispatch payload with newBookableItem
    */

    const dispatch = useDispatch();
    const params = useParams();
    const history = useHistory();

    const clients = useSelector(store => store.companyName);
    const categoryList = useSelector(store => store.categoryList);
    //grab the list of item names from the reducer 
    const itemList = useSelector(store=> store.itemList);
  
   
    const [newBookableItem, setNewBookableItem] = useState({
        title:    '',
        summary:  '',
        details:   '',
        rate:     '',
        unitTime: '',
        location: '',
        categoryId: ''
    });

    const [fileData, setFileData] = useState();

    const[ clientId, setClientId] = useState('');
    
    //category input state variables 
    const [parentId, setParentId] = useState('');
    const [newItem, setNewItem] = useState('');

    
    useEffect(() => {
        dispatch({
            type: 'FETCH_COMPANY_NAME'
        });

        dispatch({
            type: 'FETCH_CATEGORIES'
        });

        dispatch({
            type: 'FETCH_ITEM_LIST'
            });
    }, []);
    
    const handleChange = (evt, property) => {
        setNewBookableItem({...newBookableItem, [property]: evt.target.value})
    };

    
    const addNewBookableItem = (evt) => {
        evt.preventDefault();

        
        dispatch({
            type: 'POST_BOOKABLE_ITEM',
            payload:  {
                newBookableItem: newBookableItem,
                clientId: clientId
            }
        })
       
    }

    const goBack = () => {
        history.push('/viewBookableItem')
    }


    return(
        <>
        <button onClick={goBack}>Back</button>

        <Paper className="addBookableItemContainer">
            
            <Box
                onSubmit={addNewBookableItem}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <div className="selectCompanyName">  
                <h3 className="InputFieldTitle"> Select Client Company Name </h3>
                <Autocomplete
                    options={clients}
                    sx={{width:620}}
                    value={clients.label}
                    font-size="20px"
                    renderInput={(params) => <TextField {...params} label="Clients (Company Name)" />}
                    onChange={(event, newValue) => setClientId(newValue.id)}
                />
                </div>

                {/* <label>Choose a category for the Item<Box sx={{ minWidth: 120}}>
                    <FormControl sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            label="Category"
                            onChange={(evt) => handleChange(evt, "categoryId")}
                        >
                            {categoryList.map(category => (
                                <MenuItem value={category.id} key={category.id} onChange={(evt) => handleChange(evt, "categoryId")}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                                  
                            </Box></label> */}
                  
                <Grid className="addBookableItemContainer">
                <div className="adminCategoryInputContainer">
                <h3 className="InputFieldTitle"> Enter Bookable Item Title:</h3>
                    <input
                        required
                        className="bookableItemsInput"
                        type="text"
                        placeholder="Title"
                        value={newBookableItem.title}
                        onChange={(evt) => handleChange(evt, "title")}
                    />
                    </div>

                    <div className="adminCategoryInputContainer">
                    <h3 className="InputFieldTitle"> Enter Summary of Item: </h3>
                    <textarea
                        placeholder="ENTER SUMMARY HERE"
                        className='bookableItemsInput'
                        required
                        type="text"
                        label="Summary"
                        color="secondary"
                        focused
                        rows={3}
                        value={newBookableItem.summary}
                        onChange={(evt) => handleChange(evt, "summary")}
                    />
                    </div>

                    <div className="adminCategoryInputContainer">
                    <h3 className="InputFieldTitle"> Enter Street Address of Equipment:</h3>
                    <input
                        className='bookableItemsInput'
                        required
                        type="text"
                        placeholder="Location"
                        value={newBookableItem.location}
                        onChange={(evt) => handleChange(evt, "location")}
                    />
                    </div>
                    <div className="adminCategoryInputContainer">
                    <h3 className="InputFieldTitle"> Rental Rate Here:</h3>
                    <input
                        className='bookableItemsInput'
                        required
                        type="integer"
                        placeholder="Rate"
                        value={newBookableItem.rate}
                        onChange={(evt) => handleChange(evt, "rate")}
                    />
                    </div>

                    <div className="adminCategoryInputContainer">
                    <h3 className="InputFieldTitle"> Select Unit of Time: </h3>
                    <input
                        className='bookableItemsInput'
                        required
                        type="text"
                        placeholder="Unit of Time"
                        value={newBookableItem.unitTime}
                        onChange={(evt) => handleChange(evt, "unitTime")}
                    />
                    </div>
                    <div className="adminCategoryInputContainer">
                    <h3 className="InputFieldTitle"> Enter Details of Bookable Item:</h3>
                    <textarea
                        className="bookableItemsInput"
                        placeholder='ENTER DETAILS HERE'
                        required
                        type="text"
                        multiline
                        rows={2}
                        value={newBookableItem.details}
                        onChange={(evt) => handleChange(evt, "details")}
                    />
                  </div>
                    
            <div className="adminCategoryInputContainer">
            <h3 className="SelectCategoryTitle"> Select Category </h3>
             <Box sx={{ minWidth: 400 }} className="categoryAutocomplete">
                <FormControl >
                    <InputLabel id="demo-simple-select-label" className="SelectCategoryTitlePlaceholder">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        sx={{ width: 400 }}
                        id="demo-simple-select"
                        text="SELECT CATEGORY HERE"
                        className="selectCategoryPlaceholder"
                        onChange= {event => setParentId(event.target.value)}
                    >
                        {categoryList.map(category => (
                            <MenuItem value={category.id} key={category.id} onChange= {event => setParentId(event.target.value)}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>  
            </div>
           
         <br/> 
            <br/>
            <br/>
            <br/>
            <Button
                type="submit"
                variant="outlined"
                size="large"
                className="FormSubmitBtn"
            >
                Submit
            </Button>
           
            
                </Grid>
            </Box>
            </Paper>
        </>
    )
};

export default addBookableItem;