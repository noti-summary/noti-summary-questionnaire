import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

import NotiList from '../../components/NotiList';
import Quest from '../../components/Questionnaire';
import SummaryTextBox from '../../components/SummaryTextBox';
import ThankText from '../../components/ThankText';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export async function getServerSideProps(context) {
    const {summaryId} = context.query
    const dataURL = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/${summaryId}`;

    const response = await axios.get(dataURL);

    return { props: {summaryList: response.data} }
}

const steps = ['step1', 'step2', 'step3'];

function getStepContent(step, summaryList,
                        summary, setSummary) {
    switch (step) {
      case 1:
        return (
            <div className="grid gap-x-80 grid-cols-2">
                <NotiList notis={summaryList.notifications}/>
                <SummaryTextBox setSummary={setSummary} summary={summary}/>
            </div>
        );
      case 2:
      case 3: // Link to /todo doesn't trigger immediately
        return <ThankText />;
      default:
        throw new Error('Unknown step');
    }
}

export default function Questionnaire(props) {
    const router = useRouter();
    const { summaryId } = router.query;

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            const submitTime = new Date().toISOString().substring(0, 19);
            console.log({...summaryContent, esm, submitTime});
            const dataURL = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/${summaryId}`;
            axios.post(dataURL, {...summaryContent, esm, submitTime});
        }
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const [summaryContent, setSummary] = useState({
        'summary': '',
        'reason': ''
    });

    const [esm, setEsm] = useState({});

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        setEsm(data);
        handleNext();
    };

    return(
        <Container component="main">
            <Typography component="h1" mt={2} variant="h4" align="center">
                Summary Quest.
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}><StepLabel></StepLabel></Step>
                ))}
            </Stepper>
            <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    {/* main content */}
                    {activeStep !== 0 ?
                        // step 0
                        getStepContent(activeStep, props.summaryList,
                                       summaryContent, setSummary) :
                        // step 1, 2
                        (<form onSubmit={handleSubmit(onSubmit)}>
                            <Quest register={register}/>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                >下一頁</Button>
                            </Box>
                        </form>)
                    }
                    {activeStep !== 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                上一頁
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 3, ml: 1 }}
                            >
                                {activeStep >= steps.length - 1 ?
                                    (<Link href="/todo" passHref>送出</Link>) :
                                    '下一頁'
                                }
                            </Button>
                        </Box>
                    )}
                </React.Fragment>
            </Paper>
        </Container>
    )
}

