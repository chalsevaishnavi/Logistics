import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Button,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddQuotetionDetails from './AddQuotetionDetails';
import { postApi, getApi } from 'views/services/api';

const AddQuotes = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchCustomers = async () => {
    try {
      const response = await getApi(`/user/getalluser_byId/${user._id}`);
      const filterCustomer = response.data.data.filter((item) => item.role === 'Customer');
      setCustomers(filterCustomer);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleAddQuoteDetails = (details) => {
    console.log('details--->', details);
    setQuoteDetails((prevDetails) => [...prevDetails, details]);
  };
  console.log('quoteDetails =====>', quoteDetails);

  const formik = useFormik({
    initialValues: {
      customer: '',
      date: '',
      remark: ''
    },
    validationSchema: Yup.object({
      customer: Yup.string().required('Customer is Required'),
      date: Yup.string().required('Date is Required'),
      remark: Yup.string().required('Remark is Required')
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log('values ===>', values);
      try {
        values.created_by = user._id;
        const response = await postApi('/quote/add', values);
        console.log('response =======>', response);

        const quoteid = response.data.data._id;
        console.log("quoteid ==>",quoteid);

        //add this (quoteid) in updatedQuoteDetails
        
        if (quoteDetails) {
          const updatedQuoteDetails = quoteDetails.map((detail) => ({
            ...detail,
            created_by: user._id,
            quoteId: quoteid,
          }));
          console.log('updatedQuoteDetails ===>', updatedQuoteDetails);

          const responseDetails = await postApi('/quote/addquotedetails', updatedQuoteDetails);
          console.log('responseDetails ==>', responseDetails);
        }

        resetForm();
        setQuoteDetails([]);
      } catch (error) {
        console.error(error);
      }

      handleCloseAdd();
      formik.resetForm();
    }
  });

  return (
    <>
      <AddQuotetionDetails open={openAdd} handleClose={handleCloseAdd} setMoreDetails={handleAddQuoteDetails} />
      <Box sx={{ padding: 4, borderRadius: '4px', backgroundColor: '#fff' }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Quotation Form
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormLabel>Select Customer</FormLabel>
              <TextField
                select
                name="customer"
                fullWidth
                variant="outlined"
                value={formik.values.customer}
                onChange={formik.handleChange}
                error={formik.touched.customer && Boolean(formik.errors.customer)}
                helperText={formik.touched.customer && formik.errors.customer}
              >
                {customers.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormLabel>Date</FormLabel>
              <TextField
                type="date"
                name="date"
                fullWidth
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} />

            <Grid item xs={12} md={8}>
              <TextField
                label="Remark"
                name="remark"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={formik.values.remark}
                onChange={formik.handleChange}
                error={formik.touched.remark && Boolean(formik.errors.remark)}
                helperText={formik.touched.remark && formik.errors.remark}
              />
            </Grid>
            <Grid item xs={12} md={4} />

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontSize: '1.3rem' }}>
                Quotation Details
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table aria-label="Quotation Details">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Weight</TableCell>
                      <TableCell>ETA</TableCell>
                      <TableCell>Advance</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quoteDetails.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{detail.from}</TableCell>
                        <TableCell>{detail.to}</TableCell>
                        <TableCell>{detail.description}</TableCell>
                        <TableCell>{detail.size}</TableCell>
                        <TableCell>{detail.weight}</TableCell>
                        <TableCell>{detail.ETA}</TableCell>
                        <TableCell>{detail.advance}</TableCell>
                        <TableCell> {/* Add Action Buttons Here */} </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item xs={12} container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleOpenAdd}>
                  Add Quotation Details
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Save
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

export default AddQuotes;
