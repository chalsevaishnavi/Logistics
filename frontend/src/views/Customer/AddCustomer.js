import React from 'react';
import { Box, Grid, TextField, MenuItem, Typography, Button, FormLabel, Divider } from '@mui/material';
import { Form, useFormik } from 'formik';
import * as Yup from 'yup';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Card } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { Switch } from '@mui/material';
import { postApi } from 'views/services/api';
import { useState } from 'react';

const AddCustomer = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      companyname: '',
      gstno: '',
      phoneno: '',
      address: '',
      usernote: '',
      showRates: 0, 
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
      name: Yup.string().required('Required'),
      companyname: Yup.string().required('Required'),
      gstno: Yup.string().required('Required'),
      phoneno: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number is not valid')
        .min(10, 'Phone number should be at least 10 digits')
        .required('Required'),
      address: Yup.string().required('Required'),
      usernote: Yup.string(), 
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log('values===>', values);

      try {
        values.created_by = JSON.parse(localStorage.getItem('user'))._id;
        console.log('values.created_by ==>', values.created_by);

        postApi('/user/add', values)
          .then((response) => {
            console.log('response ==>', response);
            resetForm();
          })
          .catch((error) => {
            console.log('error ', error);
          });
      } catch (error) {
        console.error(error);
      }

      handleClose();
      resetForm();
      toast.success('Admin added successfully!!');
      
    }
  });

  return (
    <>
     <Box sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
              Customer Info
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="email"
              name="email"
              label="Email"
              size="small"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="password"
              name="password"
              label="Password"
              size="small"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="name"
              name="name"
              label="Name"
              size="small"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="companyname"
              name="companyname"
              label="Company Name"
              size="small"
              fullWidth
              value={formik.values.companyname}
              onChange={formik.handleChange}
              error={formik.touched.companyname && Boolean(formik.errors.companyname)}
              helperText={formik.touched.companyname && formik.errors.companyname}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              id="gstno"
              name="gstno"
              label="GST No"
              size="small"
              fullWidth
              value={formik.values.gstno}
              onChange={formik.handleChange}
              error={formik.touched.gstno && Boolean(formik.errors.gstno)}
              helperText={formik.touched.gstno && formik.errors.gstno}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="phoneno"
              name="phoneno"
              label="Phone No"
              size="small"
              fullWidth
              value={formik.values.phoneno}
              onChange={formik.handleChange}
              error={formik.touched.phoneno && Boolean(formik.errors.phoneno)}
              helperText={formik.touched.phoneno && formik.errors.phoneno}
            />
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* <Grid item xs={12} md={6}>
            <TextField label="Enter pincode to fetch address automatically" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12} md={6} /> */}

          <Grid item xs={12} md={6}>
            <TextField
              multiline
              rows={3}
              id="address"
              name="address"
              label="Address"
              size="small"
              fullWidth
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="usernote"
              name="usernote"
              label="User Notes - For internal use only."
              multiline
              rows={3}
              size="small"
              fullWidth
              value={formik.values.usernote}
              onChange={formik.handleChange}
              error={formik.touched.usernote && Boolean(formik.errors.usernote)}
              helperText={formik.touched.usernote && formik.errors.usernote}
            />
          </Grid>

          <Grid item xs={12} container alignItems="center">
            <Grid item>
              <Typography>Show Rates</Typography>
            </Grid>
            <Grid item>
              <Switch />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={formik.handleSubmit}>
                Add Customer
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Return to the dashboard
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
    </>
   
  );
};

export default AddCustomer;
