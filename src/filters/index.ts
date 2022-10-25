import Vue from 'vue';
import {Utils} from '@/utils/utils';

Vue.filter('json', (value: string) => {
    return JSON.stringify(value, null, '\t');
});

Vue.filter('n2br', (value: string) => {
    return String(value).replace(/(\n|\r\n)/g, '<br>');
});

Vue.filter('addMsg', (msg: string | string[] ): string =>{
    //String(value).replace(/(\n|\r\n)/g, '<br>');
    let resultMsg: string | string[]='';
    if( typeof msg === 'string' ){
        resultMsg=msg.replace(/(\n|\r\n)/g, '<br>');
    }else if (typeof msg === 'object') {
        msg.forEach( ( txt: string ) =>{
            resultMsg+= `<p style="text-align:center;">${ txt }</p>`;
        });
    }
    return resultMsg;
});

Vue.filter('split', ( txt: string,  len: number) =>{
    let txtAreaSizeTotal=0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < txt.length; i++) {
        //영문/한글 섞인 문자를 바이트 수 계산
        txtAreaSizeTotal += Utils.getCharByteSize(txt.charAt(i));
    }
    return (txtAreaSizeTotal > len)? txt.slice( 0, len )+'...' : txt;
});

