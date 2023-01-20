import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';


function Likert(props) {
    return (
        // <div>
        //     <h3 className="text-lg">{props.question}</h3>
        //     <ul className="likert flex">
        //         <li> Strongly Disagree </li>
        //         <li><input className="flex-auto" type="radio" {...props.reg} value="-2"/></li>
        //         <li><input className="flex-auto" type="radio" {...props.reg} value="-1"/></li>
        //         <li><input className="flex-auto" type="radio" {...props.reg} value="0"/></li>
        //         <li><input className="flex-auto" type="radio" {...props.reg} value="1"/></li>
        //         <li><input className="flex-auto" type="radio" {...props.reg} value="2"/></li>
        //         <li> Strongly Agree </li>
        //     </ul>
        // </div>
        <div>
            {/* <Typography component="h6" mt={2} variant="h6">不同意</Typography> */}
            {/* <FormLabel>不同意</FormLabel> */}
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
            {/* <FormLabel>同意</FormLabel> */}
            {/* <Typography component="h6" mt={2} variant="h6">同意</Typography> */}
        </div>
    );
}

export default Likert;
