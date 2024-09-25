/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FormLabel } from '@mui/material';
import { useState } from 'react';

const AddQuotetionDetails = (props) => {
  const { open, handleClose } = props;
  const validationSchema = yup.object({
    subject: yup.string().required('Subject is required'),
    receiver: yup.string().email().required('Receiver is required'),
    lcv: yup.string().required('lcv is required')
  });

  // -----------   initialValues
  const initialValues = {
    sender: '',
    subject: '',
    receiver: '',
    lcv: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      // addClaim(values);
      console.log('EmailValues', values);
      handleClose();
      formik.resetForm();
      toast.success('Email Add successfully');
      resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Add Quotation Details</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>

                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="from"
                    name="from"
                    label="From"
                    size="small"
                    fullWidth
                    value={formik.values.from}
                    onChange={formik.handleChange}
                    error={formik.touched.from && Boolean(formik.errors.from)}
                    helperText={formik.touched.from && formik.errors.from}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="to"
                    name="to"
                    label="To"
                    size="small"
                    fullWidth
                    value={formik.values.to}
                    onChange={formik.handleChange}
                    error={formik.touched.to && Boolean(formik.errors.to)}
                    helperText={formik.touched.to && formik.errors.to}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    size="small"
                    fullWidth
                    multiline
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    id="size"
                    name="size"
                    label="Size"
                    size="small"
                    fullWidth
                    value={formik.values.size}
                    onChange={formik.handleChange}
                    error={formik.touched.size && Boolean(formik.errors.size)}
                    helperText={formik.touched.size && formik.errors.size}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    id="weight"
                    name="weight"
                    label="weight"
                    size="small"
                    fullWidth
                    value={formik.values.weight}
                    onChange={formik.handleChange}
                    error={formik.touched.weight && Boolean(formik.errors.weight)}
                    helperText={formik.touched.weight && formik.errors.weight}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <TextField
                    id="ETA"
                    name="ETA"
                    label="ETA"
                    size="small"
                    fullWidth
                    value={formik.values.ETA}
                    onChange={formik.handleChange}
                    error={formik.touched.ETA && Boolean(formik.errors.ETA)}
                    helperText={formik.touched.ETA && formik.errors.ETA}
                  />
                </Grid>


                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="rate"
                    name="rate"
                    label="Rate"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.rate}
                    onChange={formik.handleChange}
                    error={formik.touched.rate && Boolean(formik.errors.rate)}
                    helperText={formik.touched.rate && formik.errors.rate}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    id="advance"
                    name="advance"
                    label="Advance"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.advance}
                    onChange={formik.handleChange}
                    error={formik.touched.advance && Boolean(formik.errors.advance)}
                    helperText={formik.touched.advance && formik.errors.advance}
                  />
                </Grid>



              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddQuotetionDetails;
