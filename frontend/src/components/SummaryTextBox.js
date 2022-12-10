import { useForm } from "react-hook-form";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

function SummaryTextBox(props) {
    const [summaryText, setSummaryText] = useState(props.summary.text);
    const [summaryReason, setSummaryReason] = useState(props.summary.reason);
    const onTextChange = (e) => {
        setSummaryText(e.target.value)
        props.setSummary({text: e.target.value, reason: summaryReason});
    };
    const onReasonChange = (e) => {
        setSummaryReason(e.target.value)
        props.setSummary({text: summaryText, reason: e.target.value});
        
    };

    return (
        <div>
            <Typography variant="h6">
                請填寫左側選擇通知之摘要
            </Typography>
            <TextField
                id="outlined-textarea"
                placeholder="請填寫通知摘要"
                multiline
                value={summaryText}
                onChange={onTextChange}
                rows={4}
            />
            <Typography variant="h6">
                摘要這些通知的原因？
            </Typography>
            <TextField
                id="outlined-textarea"
                placeholder="通知摘要的原因"
                multiline
                value={summaryReason}
                onChange={onReasonChange}
                rows={4}
            />
        </div>
    );
}

export default SummaryTextBox;