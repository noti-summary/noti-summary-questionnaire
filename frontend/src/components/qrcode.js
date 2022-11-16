import {QRCodeSVG} from 'qrcode.react';

export default function QRCode({token}) {

    return(
        <div>
            <h3>請使用手機APP掃描條碼登入</h3>
            <QRCodeSVG value={token} />
        </div>

    );

}
