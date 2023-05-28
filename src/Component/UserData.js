import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Style.css'
import Container from '@mui/material/Container';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@mui/material/TextField';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogContentText from '@material-ui/core/DialogContentText'
import {Grid} from '@material-ui/core';

const UserData = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedData, setSelectedData] = useState(null);
    const [userData, setUserData] = useState([])
    const [editpopup, setEditpopup] = useState(false)
    const [deletopen , setDeleteopen] = useState(false)
    const [open, setOpen] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setimage_url] = useState('');
    const [is_verified, setis_verified] = useState(true);
    const [deleteProfileId, setDeleteProfileId] = useState('');

    const [editProfileId, setEditProfileId] = useState('');
    const [editProfileData, setEditProfileData] = useState({});
    const [selectedDataId, setSelectedDataId] = useState(null);
    const [displayFormat, setDisplayFormat] = useState('list')

    const handleShow = (event, data) => {
      setSelectedDataId(data.id);
        setAnchorEl(event.currentTarget);
        setSelectedData(data);
      };
      
      const handleDelete = (profileId) => {
        setDeleteProfileId(profileId);
        setDeleteopen(true);
      };

      const handleCancel = () => {
        setDeleteopen(false);
      };

      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleEditpop = ()=>{
    setEditpopup(false)
      }
    
      const handleEpop = (profileId) => {
        setEditProfileId(profileId);
        setEditpopup(true);
      };
    
      const handleClosepop = () => {
        setOpen(false);
      };
    


      //  Edit User =======================================================================

      
      const handleEdit = () => {
        const requestBody = {
          query: `
            mutation UpdateProfile(
              $updateProfileId: String!,
              $firstName: String!,
              $lastName: String!,
              $email: String!,
              $isVerified: Boolean!,
              $imageUrl: String!,
              $description: String!
            ) {
              updateProfile(
                id: $updateProfileId,
                first_name: $firstName,
                last_name: $lastName,
                email: $email,
                is_verified: $isVerified,
                image_url: $imageUrl,
                description: $description
              ) {
                id
                first_name
                last_name
                email
                is_verified
                image_url
                description
              }
            }
          `,
          variables: {
            updateProfileId: "hrrcQa1J3oxwTDE52a0E",
            firstName: "test",
            lastName: "updated",
            email: "test@updated.com",
            isVerified: false,
            imageUrl: "test.com",
            description: "test updated"
          }
        };
      
        axios
          .post('https://api.poc.graphql.dev.vnplatform.com/graphql', requestBody, {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6ImhhcmlvbXJ6NTBAZ21haWwuY29tIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2ODUwMDE0NzIsImV4cCI6MTY4NTUxOTg3Mn0.KMqdeT_AvuQsUdaKu62LDMICoZuRe1KU5q94G4KTQcE`
            }
          })
          .then(response => {
            const updatedProfile = response.data.data.updateProfile;
            console.log(updatedProfile, 'data is updated');
          })
          .catch(error => {
            // Handle the error here
            console.error(error);
          });
      };


      //  Delete API ======================================================================================
      
      const handleConfirmDelete = () => {
        const requestBody = {
          query: `
            mutation DeleteProfile($deleteProfileId: String!) {
              deleteProfile(id: $deleteProfileId)
            }
          `,
          variables: {
            deleteProfileId,
          },
        };
    
        axios.post('https://api.poc.graphql.dev.vnplatform.com/graphql', requestBody, {
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6ImhhcmlvbXJ6NTBAZ21haWwuY29tIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2ODUwMDE0NzIsImV4cCI6MTY4NTUxOTg3Mn0.KMqdeT_AvuQsUdaKu62LDMICoZuRe1KU5q94G4KTQcE`
          }
        })
          .then(response => {
            const data = response.data;
            console.log(data);
            alert('User is deleted')
            setDeleteopen(false);
          })
          .catch(error => {
            console.error(error);
          });
      };
      
      const handleClose = () => {
        setAnchorEl(null);
      };
      

      // Fetch User Data  =============================================================================

      const fetchData = () => {
        axios
          .post(
            'https://api.poc.graphql.dev.vnplatform.com/graphql',
            {
              query: `
                query GetAllProfiles($orderBy: globalOrderBy, $searchString: String, $rows: Int, $page: Int) {
                  getAllProfiles(orderBy: $orderBy, searchString: $searchString, rows: $rows, page: $page) {
                    size
                    profiles {
                      id
                      first_name
                      last_name
                      email
                      is_verified
                      image_url
                      description
                    }
                  }
                }
              `,
              variables: {
                orderBy: {
                  key: 'is_verified',
                  sort: 'desc'
                },
                rows: 10,
                page: 0,
                searchString: searchString
              }
            },
            {
              headers: {
                Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6ImhhcmlvbXJ6NTBAZ21haWwuY29tIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2ODUwMDE0NzIsImV4cCI6MTY4NTUxOTg3Mn0.KMqdeT_AvuQsUdaKu62LDMICoZuRe1KU5q94G4KTQcE`
              }
            }
          )
          .then(response => {
              console.log(response)
            setUserData(response?.data?.data?.getAllProfiles?.profiles);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    

useEffect(() => {
    fetchData();
  }, [searchString]);



  
  // Get user by ID  =======================================================================================

  useEffect(() => {
    if (selectedDataId) {
      const requestBody = {
        query: `
          query GetProfileById($getProfileByIdId: String!) {
            getProfileById(id: $getProfileByIdId) {
              id
              first_name
              last_name
              email
              is_verified
              image_url
              description
            }
          }
        `,
        variables: {
          getProfileByIdId: selectedDataId,
        },
      };

      axios
        .post('https://api.poc.graphql.dev.vnplatform.com/graphql', requestBody,  {
          headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6ImhhcmlvbXJ6NTBAZ21haWwuY29tIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2ODUwMDE0NzIsImV4cCI6MTY4NTUxOTg3Mn0.KMqdeT_AvuQsUdaKu62LDMICoZuRe1KU5q94G4KTQcE`
          }
        })
        .then((response) => {

          const data = response.data.data.getProfileById;
          console.log(data, 'data')
          setEditProfileData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [editProfileId]);



// Create Profile Logic  ================================================================================================
  const handleCreateProfile = () => {
    const requestBody = {
      query: `
        mutation CreateProfile($first_name: String!, $last_name: String!, $email: String!, $is_verified: Boolean!, $image_url: String!, $description: String!) {
          createProfile(first_name: $first_name, last_name: $last_name, email: $email, is_verified: $is_verified, image_url: $image_url, description: $description) {
            id
            first_name
            last_name
            email
            is_verified
            image_url
            description
          }
        }
      `,
      variables: {
        first_name,
        last_name,
        email,
        is_verified: true,
        image_url,
        description,
      },
    };

    axios.post('https://api.poc.graphql.dev.vnplatform.com/graphql', requestBody, 
    {
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6ImhhcmlvbXJ6NTBAZ21haWwuY29tIiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2ODUwMDE0NzIsImV4cCI6MTY4NTUxOTg3Mn0.KMqdeT_AvuQsUdaKu62LDMICoZuRe1KU5q94G4KTQcE`
      }
    }
    )
      .then(response => {
        const data = response.data;
        alert('User is created')
        console.log(data);
        setfirst_name('')
        setlast_name('')
        setEmail('')
        setDescription('')
        setimage_url('')
        handleClosepop();
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  return (
    <div className='mt-5'>
      <Container maxWidth="lg" >
      <div className='mb-3 d-flex'>
      <TextField
  fullWidth
  id="outlined-basic"
  label="Search"
  variant="outlined"
  value={searchString}
  onChange={(e) => setSearchString(e.target.value)}
  sx={{
    width: 900,
    maxWidth: '100%',
    height: 30
  }}
/>
      <Button className='mt-2 m-2 Btnstyle'  style={{
        color: '#3DACFF',
        border: '1px solid #3DACFF',
       borderColor: '#3DACFF', }} onClick={handleOpen}> Create Profile</Button>

<div className='border border-dark rounded  mt-2 h-25'>
       <ViewWeekIcon className='m-1' onClick={() => setDisplayFormat('grid')}/>
       <FormatListBulletedIcon onClick={() => setDisplayFormat('list')}/>
      </div>
      </div>


      {/* ======================= Create Profile ============================= */}
      <Dialog open={open} onClose={handleClosepop} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-title">Create Profile
        <IconButton aria-label="close" onClick={handleClosepop} style={{ position: 'absolute', right: '8px', top: '8px' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers> 
          <div>
            <label className='form-label'>Image link</label>
            <input className='form-control mb-4' type='text' value={image_url} onChange={(e) => setimage_url(e.target.value)} />
            <div className='d-flex flex-wrap justify-content-around mb-4'>
              <div>
              <label className='form-lable'>First Name</label>
            <input className='form-control' type='text' value={first_name} onChange={(e) => setfirst_name(e.target.value)}/>
              </div>
            <div className='ms-5'>
            <label className='form-lable'>Last Name</label>
            <input className='form-control ' type='text'  value={last_name}
            onChange={(e) => setlast_name(e.target.value)}/>
            </div>
            </div>
            <label className='form-lable'>Email</label>
            <input className='form-control mb-4' type='email'   value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <label className='form-lable'>Description</label>
            <textarea rows={5} className='form-control mb-4' type='email' value={description} placeholder='Write a description for the talent'
            onChange={(e) => setDescription(e.target.value)}> </textarea>

        <FormControlLabel className='mb-5'
           label="Talent is verified"
            control={<Switch checked={is_verified} onChange={(e) => setis_verified(e.target.checked)} color="primary"/>}
            
          />
          </div>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleCreateProfile} color="primary" style={{
        color: 'white',
        border: '1px solid #3DACFF',
        backgroundColor:'#3DACFF',
       borderColor: '#3DACFF', }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>


      {/* =================================== Modal End ===========================*/}



{/* ======================== Edit Modal ============================= */}

<Dialog open={editpopup} onClose={handleEditpop} aria-labelledby="form-dialog-title" fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-title">Edit Profile
        <IconButton aria-label="close" onClick={handleEditpop} style={{ position: 'absolute', right: '8px', top: '8px' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers> 
          <div>
            <label className='form-label'>Image link</label>
            <input className='form-control mb-4' type='text' value={editProfileData.image_url} onChange={(e) => setimage_url(e.target.value)} />
            <div className='d-flex flex-wrap justify-content-around mb-4'>
              <div>
              <label className='form-lable'>First Name</label>
            <input className='form-control' type='text' value={editProfileData.first_name} onChange={(e) => setfirst_name(e.target.value)}/>
              </div>
            <div className='ms-5'>
            <label className='form-lable'>Last Name</label>
            <input className='form-control ' type='text'  value={editProfileData.last_name}
            onChange={(e) => setlast_name(e.target.value)}/>
            </div>
            </div>
            <label className='form-lable'>Email</label>
            <input className='form-control mb-4' type='email'   value={editProfileData.email}
            onChange={(e) => setEmail(e.target.value)}/>
            <label className='form-lable'>Description</label>
            <textarea rows={5} className='form-control mb-4' type='email' value={editProfileData.description} placeholder='Write a description for the talent'
            onChange={(e) => setDescription(e.target.value)}> </textarea>

        <FormControlLabel className='mb-5'
           label="Talent is verified"
            control={<Switch checked={is_verified} onChange={(e) => setis_verified(e.target.checked)} color="primary"/>}
            
          />
          </div>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleEdit} color="primary"   style={{
        color: 'white',
        border: '1px solid #3DACFF',
        backgroundColor:'#3DACFF',
       borderColor: '#3DACFF', }}>
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>


{/* ================================= Delete Modal ================================= */}

<Dialog open={deletopen} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
          Removed profile will be deleted permenantly and won’t be available anymore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="contained" color="error">
            Cancel
          </Button>
          <Button variant="contained" style={{ backgroundColor: 'red', color: 'white' }} onClick={handleConfirmDelete} >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      
        <TableContainer component={Paper}>
        <Table arial-label='simple table'>
            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Description</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

            {displayFormat === 'list' ? (
    userData
      .filter(data => {
        const fullName = `${data.first_name} ${data.last_name}`.toLowerCase();
        return fullName.includes(searchString.toLowerCase());
      })
      .map(data => (
        <TableRow key={data.id} sx={{'&:last-child td, &:last-child th':{border:0}}}>
                    <TableCell ><img src={data.image_url} alt=''  className='image p-2' />  {data.first_name} {data.last_name}</TableCell>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>
                  <MoreVertIcon onClick={(event) => handleShow(event, data)} />
                 <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}  PaperProps={{
                  style: {
                    borderRadius: 0, 
                  },
                }}>
                <MenuItem onClick={() => handleEpop(data.id)} >Edit Profile</MenuItem>
                <MenuItem onClick={() => handleDelete(data.id)}>Remove Profile</MenuItem>
              </Menu>                    </TableCell>
                    </TableRow>
      ))
  ) : (
    <Grid container spacing={3}>
      {userData
        .filter(data => {
          const fullName = `${data.first_name} ${data.last_name}`.toLowerCase();
          return fullName.includes(searchString.toLowerCase());
        })
        .map(data => (

          <Grid item key={data.id} xs={12} sm={6} md={4} lg={3} >
             <Card >
          <CardContent>
            <Typography >
              {`${data.first_name} ${data.last_name}`}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Email: {data.email}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Description: {data.description.substring(0, 54)}
            </Typography>
          </CardContent>
        </Card>
          </Grid>
        ))}
    </Grid>
  )}
            </TableBody>
        </Table>
    </TableContainer>
      </Container>
    </div>
    


  )
}

export default UserData
