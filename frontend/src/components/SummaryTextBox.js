import { useForm } from "react-hook-form";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';

function SummaryTextBox(props) {
    const [summaryText, setSummaryText] = useState(props.summary.summary);
    const [summaryReason, setSummaryReason] = useState(props.summary.reason);
    const onTextChange = (e) => {
        setSummaryText(e.target.value)
        props.setSummary({'summary': e.target.value, 'reason': summaryReason});
    };
    const onReasonChange = (e) => {
        setSummaryReason(e.target.value)
        props.setSummary({'summary': summaryText, 'reason': e.target.value});
        
    };

    return (
        <div>
            <Typography variant="h6" className="my-2">
                請填寫左側選擇通知之摘要
            </Typography>
            <TextField
                id="outlined-textarea"
                placeholder="請填寫通知摘要"
                multiline
                value={summaryText}
                onChange={onTextChange}
                rows={4}
                className="w-80 max-w-sm"
                required
            />
            <Typography variant="h6" className="my-2">
                摘要這些通知的原因？
            </Typography>
            <TextField
                id="outlined-textarea"
                placeholder="通知摘要的原因"
                multiline
                value={summaryReason}
                onChange={onReasonChange}
                rows={4}
                className="w-80 max-w-sm"
                required
            />
        </div>
    );
}

export default SummaryTextBox;
