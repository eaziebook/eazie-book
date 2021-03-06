import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import './ClientTable.css'
function ClientTable() {


    const dispatch = useDispatch();
    const history = useHistory();

    const [newFirstName, setFirstName] = useState('');
    const [newLastName, setLastName] = useState('');
    const [newEmail, setEmail] = useState('');
    const [newPhoneNumber, setPhoneNumber] = useState('');
    const [newCompanyName, setCompanyName] = useState('');
    const [newAddress, setAddress] = useState('');
    const [newCity, setCity] = useState('');
    const [newState, setState] = useState('');
    const [newZipCode, setZipCode] = useState('');
    const [newWebsiteUrl, setWebsiteUrl] = useState('');
    const [clientId, setClientId] = useState('');


    const [btnStatus, setBtnStatus] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'FETCH_CLIENTS'
        })
    }, [])

    const clients = useSelector(store => store.clients);

    const deleteClient = (id) => {
        console.log('selected id is', id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this row of information",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if(willDelete){
                swal("POOF! The row has been deleted!"), {
                    icon: "success",
                }
                dispatch({
                    type: 'DELETE_SELECTED_CLIENT',
                    payload: { id: id }
                });

                history.push('/user');
            } else {
                swal("The row of information is safe!")
            }
        })
        /* still need sweet alerts */
       


        console.log('delete button pressed');
    }

    const editClient = (client) => {
        console.log('Edit button clicked');

        setBtnStatus(true);

        setFirstName(client.firstName);
        setLastName(client.lastName);
        setEmail(client.email);
        setPhoneNumber(client.phoneNumber);
        setCompanyName(client.companyName);
        setAddress(client.address);
        setCity(client.city);
        setState(client.state);
        setZipCode(client.zipcode);
        setWebsiteUrl(client.websiteUrl);
        setClientId(client.id);
    }

    const handleSave = () => {
        console.log('Save button pressed!');

        setBtnStatus(false);

        console.log('save btnStatus is:', btnStatus);

        dispatch({
            type: 'UPDATE_CLIENT',
            payload: {
                id: clientId,
                firstName: newFirstName,
                lastName: newLastName,
                email: newEmail,
                phoneNumber: newPhoneNumber,
                companyName: newCompanyName,
                address: newAddress,
                city: newCity,
                state: newState,
                zipCode: newZipCode,
                websiteUrl: newWebsiteUrl
            }
        })
    }

    const cancelChanges = () => {
        setBtnStatus(false);
    }

    const bookableItem = (client) => {

        dispatch({
            type: 'FETCH_CLIENT_BOOKABLE_ITEM',
            payload: client.id
        })

        history.push(`/viewBookableItem/${client.id}`)
    }

    return (
        <>
            {/* <br/>
            <br/>
            <br/> */}
            <div className="clientTable">
                <TableContainer component={Paper}>
                    <Table>
                        {/* <TableHead>
                            <TableRow >
                                <TableCell align="center" className="clientListTableHeadingsFirstName"> <strong>First Name </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadingsLastName"> <strong>Last Name  </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Username  </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Email </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Phone Number  </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Company Name </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Address </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>City </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>State </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Zip Code </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Website URL </strong></TableCell>
                                <TableCell align="center" className="clientListTableHeadings"> <strong>Bookable Items </strong></TableCell>
                            </TableRow>
                        </TableHead> */}

                        {
                            btnStatus ?
                                <>  
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="right">First Name</TableCell>
                                            <TableCell align="right">Last Name</TableCell>
                                            <TableCell align="right">Email</TableCell>
                                            <TableCell align="right">Phone Number</TableCell>
                                            <TableCell align="right">Company Name</TableCell>
                                            <TableCell align="right">Address</TableCell>
                                            <TableCell align="right">City</TableCell>
                                            <TableCell align="right">State</TableCell>
                                            <TableCell align="right">Zip Code</TableCell>
                                            <TableCell align="right">Website Url</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="large"
                                                    value={newFirstName}
                                                    onChange={(event) => setFirstName(event.target.value)} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newLastName}
                                                    onChange={(event) => setLastName(event.target.value)} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newEmail}
                                                    onChange={(event) => setEmail(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newPhoneNumber}
                                                    onChange={(event) => setPhoneNumber(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newCompanyName}
                                                    onChange={(event) => setCompanyName(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newAddress}
                                                    onChange={(event) => setAddress(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newCity}
                                                    onChange={(event) => setCity(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newState}
                                                    onChange={(event) => setState(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newZipCode}
                                                    onChange={(event) => setZipCode(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id="standard-basic"
                                                    variant="standard"
                                                    size="small"
                                                    value={newWebsiteUrl}
                                                    onChange={(event) => setWebsiteUrl(event.target.value)}
                                                />
                                            </TableCell>
                                            <TableCell align="center"><Button onClick={handleSave}>Save</Button></TableCell>
                                            <TableCell align="center"><Button onClick={cancelChanges}>Cancel</Button></TableCell>
                                        </TableRow>
                                    </TableBody>
                                </>

                                :

                                <>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className="clientListTableHeadings"><strong>First Name</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Last Name</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Username</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Email</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Phone Number</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Company Name</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Address</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>City</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>State</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Zip Code</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Website URL</strong></TableCell>
                                            <TableCell align="center" className="clientListTableHeadings"><strong>Bookable Items</strong></TableCell>
                                            <TableCell align="center"></TableCell>
                                            <TableCell align="center"></TableCell>
                                        </TableRow>
                                    </TableHead> 
                                    <TableBody className="clientTableBody">
                                        {clients.map(client => (
                                            <TableRow key={client.id} id={client.id}>
                                                <TableCell>{client.firstName}</TableCell>
                                                <TableCell align="center" className="clientTableBodyLastName">{client.lastName}</TableCell>
                                                <TableCell align="center">{client.username}</TableCell>
                                                <TableCell align="center">{client.email}</TableCell>
                                                <TableCell align="center" className="clientTableBodyAddress">{client.phoneNumber}</TableCell>
                                                <TableCell align="center">{client.companyName}</TableCell>
                                                <TableCell align="center" className="clientTableBodyAddress">{client.address}</TableCell>
                                                <TableCell align="center">{client.city}</TableCell>
                                                <TableCell align="center">{client.state}</TableCell>
                                                <TableCell align="center">{client.zipcode}</TableCell>
                                                <TableCell align="center">{client.websiteUrl}</TableCell>
                                                <TableCell align="center" ><button className="clientTableOpenButtons" onClick={(event) => bookableItem(client)}>Open Bookable Items</button></TableCell>
                                                <TableCell align="center" ><button className="clientTableEditButtons" onClick={event => editClient(client)}>Edit</button></TableCell>
                                                <TableCell align="center" ><button className="clientTableDeleteButtons" onClick={event => deleteClient(client.id)}>Delete</button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </>
                        }

                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default ClientTable;