import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Grid, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AddQuotetionDetails = (props) => {
  const { open, handleClose, setMoreDetails } = props;

  const validationSchema = yup.object({
    from: yup.string().required('From Location is Required'),
    to: yup.string().required('To Location is Required'),
    description: yup.string().required('Description is Required'),
    size: yup.number().required('Size is Required'),
    weight: yup.number().required('Weight is Required'),
    ETA: yup.number().required('ETA is Required'),
    advance: yup.number().required('Advance is Required')
  });

  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      description: '',
      size: '',
      weight: '',
      ETA: '',
      advance: ''
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("values  ===>",values);
      setMoreDetails(values);
      handleClose();
      resetForm();
    }
  });

  return (
    <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth="xs">
      <DialogTitle
        id="scroll-dialog-title"
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h6">Add Quotation Details</Typography>
        <Typography>
          <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <form onSubmit={formik.handleSubmit}>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  size="small"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="size"
                  name="size"
                  label="Size"
                  size="small"
                  type="number"
                  fullWidth
                  value={formik.values.size}
                  onChange={formik.handleChange}
                  error={formik.touched.size && Boolean(formik.errors.size)}
                  helperText={formik.touched.size && formik.errors.size}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="weight"
                  name="weight"
                  label="Weight"
                  size="small"
                  type="number"
                  fullWidth
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  error={formik.touched.weight && Boolean(formik.errors.weight)}
                  helperText={formik.touched.weight && formik.errors.weight}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="ETA"
                  name="ETA"
                  label="ETA"
                  size="small"
                  type="number"
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

              <Grid item xs={12} md={6}>
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

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuotetionDetails;
