'use client'
// import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import { useGetAppointmentQuery } from '@/services/Query'
import { Chip, Container, Grid, Skeleton } from '@mui/material'
import Image from 'next/image'
function RecipeReviewCard() {
   const { data: appointment, isLoading, isError } = useGetAppointmentQuery()
   if (isLoading) {
      return (
         <Container maxWidth='sm'>
            <Grid mt={3} container spacing={2}>
               {[1, 2, 3].map((_, i) => (
                  <Grid
                     item
                     key={i}
                     xs={12}
                     sm={12}
                     md={12}
                     lg={12}
                     sx={{ paddingBottom: '1rem' }}
                  >
                     <Card sx={{ backgroundColor: '#C4D0DC' }}>
                        <CardContent>
                           <Skeleton
                              animation='wave'
                              height={20}
                              width='80%'
                              style={{ marginBottom: 6 }}
                           />
                           <Skeleton
                              animation='wave'
                              height={20}
                              width='40%'
                              style={{ marginBottom: 6 }}
                           />
                           <Grid container spacing={1}>
                              <Grid item>
                                 <Skeleton
                                    animation='wave'
                                    height={30}
                                    width={30}
                                    variant='circular'
                                 />
                              </Grid>
                              <Grid item>
                                 <Skeleton
                                    animation='wave'
                                    height={30}
                                    width='80%'
                                    style={{ marginBottom: 6 }}
                                 />
                              </Grid>
                           </Grid>
                           <Skeleton
                              animation='wave'
                              height={30}
                              width='60%'
                              style={{ marginBottom: 6 }}
                           />
                        </CardContent>
                     </Card>
                  </Grid>
               ))}
            </Grid>
         </Container>
      )
   } else if (isError || !Array.isArray(appointment?.data) || appointment.data.length === 0) {
      return (
         // <Container maxWidth='xl' sx={{ height: '90vh', alignItems: 'center' }}>
         <Grid mt={2} container spacing={2} justifyContent='center' alignItems='center'>
            <Image
               src={'https://hospital0000.s3.ap-south-1.amazonaws.com/error+images/No+data.gif'}
               width={360}
               height={360}
               alt='No appointment Here'
               style={{ marginTop: 25 }}
            />
         </Grid>
         // </Container>
      );
      //  <p> No Appointment Here {isError}</p>
   } else {
      return (
         <Container maxWidth='sm'>
            <Grid mt={2} container spacing={2}>
               {Array.isArray(appointment?.data) &&
                  appointment?.data?.map((e, i) => (
                     <Grid
                        item
                        key={i}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        sx={{ paddingBottom: '1rem' }}
                     >
                        <Card sx={{ backgroundColor: '#C4D0DC' }}>
                           <Grid container justifyContent='space-between'>
                              <Grid item>
                                 <CardHeader
                                    avatar={
                                       <Avatar
                                          sx={{ bgcolor: '#13293D' }}
                                          aria-label='recipe'
                                       >
                                          {e?.doctor?.employee?.employee_name.split('')[0]}
                                       </Avatar>
                                    }
                                    title={e?.doctor?.employee?.employee_name}
                                    subheader={
                                       formatTime(e?.appointment_time) + '   ' + e?.appointment_date
                                    }
                                 />
                              </Grid>
                              <Grid item p={3}>
                                 <Chip
                                    label={e?.checked ? 'Checked' : 'Not Checked'}
                                    sx={{
                                       backgroundColor: e?.checked ? '#39CEF5' : '#13293D',
                                       color: e?.checked ? 'white' : 'white',
                                       marginRight: 1,
                                    }}
                                 />
                              </Grid>
                           </Grid>
                           <CardContent>
                              <Grid
                                 container
                                 spacing={1}
                                 alignItems='center'
                                 justifyContent='space-between'
                              >
                                 <Grid item>
                                    <Chip
                                       label={e?.disease?.disease_name}
                                       sx={{ backgroundColor: '#7F8FA45B', marginRight: 1 }}
                                    />
                                 </Grid>
                              </Grid>
                           </CardContent>
                        </Card>
                     </Grid>
                  ))}
            </Grid>
         </Container>
      )
   }
}

function formatTime(timeString) {
   const [hours, minutes] = timeString.split(':');
   let formattedTime = '';
   let meridiem = '';

   let hour = parseInt(hours, 10);
   if (hour === 0) {
      formattedTime = `12:${minutes}`;
      meridiem = 'AM';
   } else if (hour < 12) {
      formattedTime = `${hour}:${minutes}`;
      meridiem = 'AM';
   } else if (hour === 12) {
      formattedTime = `12:${minutes}`;
      meridiem = 'PM';
   } else {
      hour -= 12;
      formattedTime = `${hour}:${minutes}`;
      meridiem = 'PM';
   }

   return `${formattedTime} ${meridiem}`;
}
export default RecipeReviewCard















