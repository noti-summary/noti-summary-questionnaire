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
    const summaryURL = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/${summaryId}`;
    const iconURL = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/appIcons`;

    const summaryResponse = await axios.get(summaryURL);
    const iconResponse = await axios.get(iconURL);

    return { props: {summaryList: summaryResponse.data, icons: iconResponse.data} }
}

const steps = ['step1', 'step2', 'step3'];

function getStepContent(step, summaryList, icons, summary, setSummary, checked, setChecked) {
    switch (step) {
      case 1:
        return (
            <div className="flex flex-wrap justify-around">
                <NotiList notis={summaryList.notifications} snapTime={summaryList.endTime} icons={icons} checked={checked} setChecked={setChecked}/>
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

    const [checked, setChecked] = useState([]);

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep >= steps.length - 1) {
            const submitTime = new Date().toISOString().substring(0, 19);
            console.log({...summaryContent, esm, submitTime, checked});
            const dataURL = `${process.env.NEXT_PUBLIC_SERVER_IP}/summary/${summaryId}`;
            axios.post(dataURL, {...summaryContent, esm, submitTime, selectedNotifications: checked});
            router.push('/todo');
        }
        else {
            setActiveStep(activeStep + 1);
        }
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
        <Container component="main" className="flex flex-col">
            <Typography component="h1" mt={2} variant="h4" align="center">
                Summary Quest.
            </Typography>
            <Stepper activeStep={activeStep} className="self-center w-[40vw]" sx={{ pt: 3, pb: 5 }} alternativeLabel>
                {steps.map((label) => (
                <Step key={label}><StepLabel></StepLabel></Step>
                ))}
            </Stepper>
            <Paper elevation={3} className="self-center py-7 w-fit md:w-[60vw]" sx={{ p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    {/* main content */}
                    {activeStep !== 0 ?
                        // step 1, 2
                        getStepContent(
                            activeStep, 
                            props.summaryList,
                            props.icons, 
                            summaryContent, 
                            setSummary, 
                            checked, 
                            setChecked
                        ):
                        // step 0
                        (<form onSubmit={handleSubmit(onSubmit)}>
                            <Quest
                                register={register}
                                longitude={props.summaryList.longitude}
                                latitude={props.summaryList.latitude}/>
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
                                {activeStep >= steps.length - 1 ? '送出' : '下一頁'}
                            </Button>
                        </Box>
                    )}
                </React.Fragment>
            </Paper>
        </Container>
    )
}

