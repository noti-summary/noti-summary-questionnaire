import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

import NotiList from '../../../components/NotiList';
import Quest from '../../../components/Questionnaire';
import SummaryTextBox from '../../../components/SummaryTextBox';
import ThankText from '../../../components/ThankText';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export async function getServerSideProps(context) {
    const {userId, summaryId} = context.query
    const dataURL = `http://0.0.0.0:8000/summary/${userId}/${summaryId}`;

    const response = await axios.get(dataURL);

    return { props: {summaryList: response.data} }
}

const steps = ['', '', ''];

function getStepContent(step, summaryList, summary, setSummary) {
    switch (step) {
      case 0:
        return <Quest />;
      case 1:
        return (
            <div className="grid gap-x-80 grid-cols-2">
                <NotiList notis={summaryList.notification}/>
                <SummaryTextBox setSummary={setSummary} summary={summary}/>
            </div>
        );
      case 2:
        return <ThankText />;
      default:
        throw new Error('Unknown step');
    }
}

export default function Questionnaire(props) {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            console.log(summaryRet);
            // TODO: send summaryRet back to Firestore
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const [summaryRet, setSummary] = useState({
        text: '',
        reason: ''
    });

    return(
        <Container component="main">
            <Typography component="h1" mt={2} variant="h4" align="center">
                Summary Quest.
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            {activeStep === steps.length ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Link href="/todo" passHref>
                        <Button variant="contained" size="large">回到目錄</Button>
                    </Link>
                </Box>
            ) : (
                <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    {/* main content */}
                    {getStepContent(activeStep, props.summaryList, summaryRet, setSummary)}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                上一頁
                            </Button>
                        )}

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 3, ml: 1 }}
                        >
                            {activeStep === steps.length - 1 ? '送出' : '下一頁'}
                        </Button>
                    </Box>
                </React.Fragment>
                </Paper>
            )}
        </Container>
    )
}

