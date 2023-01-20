import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';


function Likert(props) {
    return (
        <div>
            <FormControl fullWidth={true}>
                <Typography component="h6" mt={2} variant="h6">{props.question}</Typography>
                <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    className="flex flex-nowrap justify-around"
                >
                    <FormControlLabel value="-2" control={<Radio />} {...props.reg} label="不同意" labelPlacement="top" className="mx-0" />
                    <FormControlLabel value="-1" control={<Radio />} {...props.reg} label="" labelPlacement="top" className="mx-0" />
                    <FormControlLabel value="0" control={<Radio />} {...props.reg} label="" labelPlacement="top" className="mx-0" />
                    <FormControlLabel value="1" control={<Radio />} {...props.reg} label="" labelPlacement="top" className="mx-0" />
                    <FormControlLabel value="2" control={<Radio />} {...props.reg} label="同意" labelPlacement="top" className="mx-0" />
                </RadioGroup>
            </FormControl>
        </div>
    );
}

export default Likert;
