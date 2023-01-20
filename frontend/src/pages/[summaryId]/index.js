import React, { useState } from 'react';
import axios from 'axios';
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

    const { handleSubmit: handleSubmit1 } = useForm();
    const onSubmit1 = (_) => {
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
                    {activeStep === 0 &&
                        // page 1
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Quest register={register}/>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                >下一頁</Button>
                            </Box>
                        </form>
                    }

                    {activeStep >= 1 &&
                        // page 2, 3
                        <form onSubmit={handleSubmit1(onSubmit1)}>
                            {activeStep === 1 ? (
                                // page 2
                                <div className="flex flex-wrap justify-around">
                                    <NotiList
                                        notis={props.summaryList.notifications}
                                        snapTime={props.summaryList.endTime}
                                        icons={props.icons}
                                        checked={checked}
                                        setChecked={setChecked} />
                                    <SummaryTextBox setSummary={setSummary} summary={summaryContent}/>
                                </div>
                            ): (
                                // page 3
                                <ThankText />
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                    上一頁
                                </Button>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep >= steps.length - 1 ? '送出' : '下一頁'}
                                </Button>
                            </Box>
                        </form>
                    }
                </React.Fragment>
            </Paper>
        </Container>
    )
}

