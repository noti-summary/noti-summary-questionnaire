import {QRCodeSVG} from 'qrcode.react';

export default function QRCode(props) {

    return(
        <div className="flex flex-col items-center">
            <h3 className="mt-2">請使用手機APP掃描條碼登入</h3>
            <QRCodeSVG size={192} value={props.token} />
        </div>

    );

}
