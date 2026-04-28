(function(){
'use strict';

// ═══════════════════════════════════════════════════════════════════════
//  SITE CONFIGURATION — Edit these values to customize your deployment
// ═══════════════════════════════════════════════════════════════════════
const CFG = {
    title: 'QR Genius — Advanced QR Code Generator',
    logoText: ['QR', 'Genius'],
    logoIcon: 'fas fa-qrcode',           // FontAwesome class
    logoLink: '/',
    headerLinks: [
        { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/nucl3arn30n/qr-genius', external: true }
    ],
    footerHTML: 'QR Genius &mdash; Built for <a href="https://qr.genius-space.org">qr.genius-space.org</a> &middot; Open Source',
    defaultURL: 'https://qr.genius-space.org'
};
// ═══════════════════════════════════════════════════════════════════════

document.title = CFG.title;
var _lt1=document.getElementById('lt1');if(_lt1)_lt1.textContent=CFG.logoText[0];
var _lt2=document.getElementById('lt2');if(_lt2)_lt2.textContent=CFG.logoText[1];
var _li=document.getElementById('logo-icon');if(_li)_li.innerHTML='<i class="'+CFG.logoIcon+'"></i>';
var _ll=document.getElementById('logo-link');if(_ll)_ll.href=CFG.logoLink;
var _ft=document.getElementById('ft');if(_ft)_ft.innerHTML='<p>'+CFG.footerHTML+'</p>';
var _iu=document.getElementById('input-url');if(_iu&&!_iu.value)_iu.value=CFG.defaultURL;
var hc=document.getElementById('hlinks');
if(hc&&hc.children.length===0){CFG.headerLinks.forEach(function(l){var a=document.createElement('a');a.className='hlink';a.href=l.url;if(l.external)a.target='_blank';a.innerHTML='<i class="'+l.icon+'"></i> '+l.label;hc.appendChild(a)})};

var cTab='url',dSty='square',cSty='square',cdSty='square',ecLv='M',selIc='none',custImg=null,qrI=null,dbt=null;
var useGrad=false,gradDir='vertical',qrShape='none';

function sched(){clearTimeout(dbt);dbt=setTimeout(gen,180)}

var iSVG={
globe:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="224" fill="none" stroke="#000" stroke-width="36"/><ellipse cx="256" cy="256" rx="90" ry="224" fill="none" stroke="#000" stroke-width="36"/><line x1="32" y1="256" x2="480" y2="256" stroke="#000" stroke-width="36"/><path d="M72 160h368M72 352h368" fill="none" stroke="#000" stroke-width="36"/></svg>',
heart:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e74c3c" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>',
star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#f39c12" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/></svg>',
home:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#000" d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/></svg>',
shopping:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="#000" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>',
music:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75.02v184.63a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V32a32 32 0 0 0-41.62-30.49z"/></svg>',
camera:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM256 368c70.7 0 128-57.3 128-128S326.7 112 256 112s-128 57.3-128 128 57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"/></svg>',
wifi:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M634.91 154.88C457.74-8.99 182.19-8.93 5.09 154.88c-6.66 6.16-6.79 16.59-.35 22.98l34.24 33.97c6.14 6.1 16.02 6.23 22.4.38 145.92-136.68 382.8-136.68 528.72 0 6.38 5.85 16.26 5.71 22.4-.38l34.24-33.97c6.43-6.39 6.3-16.82-.36-22.98zM320 352c-35.35 0-64 28.65-64 64s28.65 64 64 64 64-28.65 64-64-28.65-64-64-64zm202.67-83.59c-115.26-101.93-290.21-101.82-405.34 0-6.9 6.1-7.12 16.69-.57 23.15l34.44 33.99c6 5.92 15.66 6.32 22.05.8 83.95-72.57 209.45-72.57 293.44 0 6.39 5.52 16.05 5.13 22.05-.8l34.44-33.99c6.56-6.46 6.33-17.06-.57-23.15z"/></svg>',
lock:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/></svg>',
envelope:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>',
phone:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>',
map:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="#e74c3c" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/></svg>',
code:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#000" d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
bolt:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#f39c12" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"/></svg>'
};

function mkIcon(n,s){var v=iSVG[n];if(!v)return null;s=s||200;var m=v.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);var vw=m?parseFloat(m[1]):512,vh=m?parseFloat(m[2]):512;var pad=s*0.18;var area=s-pad*2;var sc=Math.min(area/vw,area/vh);var ox=pad+(area-vw*sc)/2;var oy=pad+(area-vh*sc)/2;var inner=v.replace(/<svg[^>]*>/,'').replace(/<\/svg>/,'');var w='<svg xmlns="http://www.w3.org/2000/svg" width="'+s+'" height="'+s+'" viewBox="0 0 '+s+' '+s+'"><rect width="'+s+'" height="'+s+'" rx="12" fill="white"/><g transform="translate('+ox+','+oy+') scale('+sc+')">'+inner+'</g></svg>';return 'data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(w)))}

function bData(){
    switch(cTab){
        case'url':return document.getElementById('input-url').value||CFG.defaultURL;
        case'text':return document.getElementById('input-text').value||'Hello World';
        case'email':{var e=document.getElementById('input-email').value,s=document.getElementById('input-email-subject').value,b=document.getElementById('input-email-body').value,m='mailto:'+e,p=[];if(s)p.push('subject='+encodeURIComponent(s));if(b)p.push('body='+encodeURIComponent(b));if(p.length)m+='?'+p.join('&');return m}
        case'phone':return'tel:'+document.getElementById('input-phone').value;
        case'sms':{var ph=document.getElementById('input-sms-phone').value,bd=document.getElementById('input-sms-body').value;return bd?'sms:'+ph+'?body='+encodeURIComponent(bd):'sms:'+ph}
        case'wifi':{var ss=document.getElementById('input-wifi-ssid').value,pw=document.getElementById('input-wifi-pass').value,en=document.getElementById('input-wifi-enc').value,hd=document.getElementById('wifi-hidden').dataset.active==='true';return'WIFI:T:'+en+';S:'+ss+';P:'+pw+';H:'+(hd?'true':'false')+';;'}
        case'vcard':{var fn=document.getElementById('input-vcard-fn').value,ln=document.getElementById('input-vcard-ln').value,og=document.getElementById('input-vcard-org').value,vp=document.getElementById('input-vcard-phone').value,ve=document.getElementById('input-vcard-email').value,vu=document.getElementById('input-vcard-url').value,vc='BEGIN:VCARD\nVERSION:3.0\nN:'+ln+';'+fn+'\nFN:'+fn+' '+ln+'\n';if(og)vc+='ORG:'+og+'\n';if(vp)vc+='TEL:'+vp+'\n';if(ve)vc+='EMAIL:'+ve+'\n';if(vu)vc+='URL:'+vu+'\n';return vc+'END:VCARD'}
        case'event':{var ti=document.getElementById('input-event-title').value||'Event',lo=document.getElementById('input-event-location').value,st=document.getElementById('input-event-start').value,et=document.getElementById('input-event-end').value,de=document.getElementById('input-event-desc').value;function fm(d){return d?d.replace(/[-:]/g,'').replace('T','T')+'00':''}var ev='BEGIN:VCALENDAR\nBEGIN:VEVENT\nSUMMARY:'+ti+'\n';if(st)ev+='DTSTART:'+fm(st)+'\n';if(et)ev+='DTEND:'+fm(et)+'\n';if(lo)ev+='LOCATION:'+lo+'\n';if(de)ev+='DESCRIPTION:'+de+'\n';return ev+'END:VEVENT\nEND:VCALENDAR'}
        default:return CFG.defaultURL
    }
}

function gen(){
    var data=bData(),sz=+document.getElementById('qs').value,mg=+document.getElementById('qm').value,
    cc=document.getElementById('cc').value,cd=document.getElementById('ccd').value,
    ir=+document.getElementById('is').value,hd=document.getElementById('ihd').dataset.active==='true',
    img=null;
    if(custImg)img=custImg;else if(custIconData)img=custIconData;else if(selIc!=='none')img=mkIcon(selIc,200);

    var dotsOpts,bgColor;
    if(useGrad){
        var gc1=document.getElementById('grc1').value,gc2=document.getElementById('grc2').value;
        bgColor=document.getElementById('gbg').value;
        var gradCfg={colorStops:[{offset:0,color:gc1},{offset:1,color:gc2}]};
        if(gradDir==='radial'){
            gradCfg.type='radial';
        }else{
            gradCfg.type='linear';
            if(gradDir==='horizontal')gradCfg.rotation=Math.PI/2;
            else if(gradDir==='diagonal')gradCfg.rotation=Math.PI/4;
            else gradCfg.rotation=0;
        }
        dotsOpts={gradient:gradCfg,type:dSty};
    }else{
        var fg=document.getElementById('cfg').value;
        bgColor=document.getElementById('cbg').value;
        dotsOpts={color:fg,type:dSty};
    }

    var transBg=document.getElementById('trans-bg').dataset.active==='true';

    var csqOpts={color:cc,type:cSty==='square'?'square':cSty};
    var cdtOpts={color:cd,type:cdSty==='square'?'square':cdSty};
    if(useGrad){csqOpts.gradient=gradCfg;cdtOpts.gradient=gradCfg}

    var c={width:sz,height:sz,margin:mg,data:data,
        dotsOptions:dotsOpts,
        backgroundOptions:{color:transBg?'rgba(0,0,0,0)':bgColor},
        cornersSquareOptions:csqOpts,
        cornersDotOptions:cdtOpts,
        qrOptions:{errorCorrectionLevel:ecLv}};
    if(img){c.image=img;c.imageOptions={crossOrigin:'anonymous',margin:4,imageSize:ir,hideBackgroundDots:hd}}
    var o=document.getElementById('qo');o.innerHTML='';
    qrI=new QRCodeStyling(c);qrI.append(o);

    // Post-process: patterns, shapes, frames, labels
    var needsPost=qrShape!=='none'||bgPat!=='none'||qrFrame!=='none'||document.getElementById('show-label').dataset.active==='true'||transBg;
    if(needsPost){
        setTimeout(function(){postProcess(o,sz)},80);
    }

    document.getElementById('dp').disabled=false;
    document.getElementById('ds').disabled=false;
    document.getElementById('dpdf').disabled=false;
    document.getElementById('qi').style.display='block';
    document.getElementById('qd').textContent=data.length>60?data.substring(0,60)+'...':data;
}

// ===================== SHAPE MASK =====================
function getShapePath(shape,w,h,pad){
    var cx=w/2,cy=h/2,r=Math.min(w,h)/2-pad;
    switch(shape){
        case'circle':
            return 'M'+cx+','+(cy-r)+' A'+r+','+r+' 0 1,1 '+cx+','+(cy+r)+' A'+r+','+r+' 0 1,1 '+cx+','+(cy-r)+' Z';
        case'rounded':
            var rr=r*0.25,x1=cx-r,x2=cx+r,y1=cy-r,y2=cy+r;
            return 'M'+(x1+rr)+','+y1+' L'+(x2-rr)+','+y1+' Q'+x2+','+y1+' '+x2+','+(y1+rr)+' L'+x2+','+(y2-rr)+' Q'+x2+','+y2+' '+(x2-rr)+','+y2+' L'+(x1+rr)+','+y2+' Q'+x1+','+y2+' '+x1+','+(y2-rr)+' L'+x1+','+(y1+rr)+' Q'+x1+','+y1+' '+(x1+rr)+','+y1+' Z';
        case'heart':
            var s=r*1.15;
            return 'M'+cx+','+(cy+s*0.85)+' C'+(cx-s*0.05)+','+(cy+s*0.6)+' '+(cx-s)+','+(cy+s*0.1)+' '+(cx-s)+','+(cy-s*0.25)+' C'+(cx-s)+','+(cy-s*0.85)+' '+cx+','+(cy-s*0.85)+' '+cx+','+(cy-s*0.35)+' C'+cx+','+(cy-s*0.85)+' '+(cx+s)+','+(cy-s*0.85)+' '+(cx+s)+','+(cy-s*0.25)+' C'+(cx+s)+','+(cy+s*0.1)+' '+(cx+s*0.05)+','+(cy+s*0.6)+' '+cx+','+(cy+s*0.85)+' Z';
        case'diamond':
            return 'M'+cx+','+(cy-r)+' L'+(cx+r)+','+cy+' L'+cx+','+(cy+r)+' L'+(cx-r)+','+cy+' Z';
        case'shield':
            var sw=r,sh=r*1.15;
            return 'M'+cx+','+(cy-sh)+' C'+(cx+sw*0.6)+','+(cy-sh)+' '+(cx+sw)+','+(cy-sh*0.65)+' '+(cx+sw)+','+(cy-sh*0.3)+' L'+(cx+sw)+','+cy+' C'+(cx+sw)+','+(cy+sh*0.45)+' '+cx+','+(cy+sh)+' '+cx+','+(cy+sh)+' C'+cx+','+(cy+sh)+' '+(cx-sw)+','+(cy+sh*0.45)+' '+(cx-sw)+','+cy+' L'+(cx-sw)+','+(cy-sh*0.3)+' C'+(cx-sw)+','+(cy-sh*0.65)+' '+(cx-sw*0.6)+','+(cy-sh)+' '+cx+','+(cy-sh)+' Z';
        case'hexagon':
            var pts=[];
            for(var i=0;i<6;i++){var a=Math.PI/3*i-Math.PI/2;pts.push((cx+r*Math.cos(a))+','+(cy+r*Math.sin(a)))}
            return 'M'+pts.join(' L')+' Z';
        case'star':
            var pts2=[],or=r,ir2=r*0.45;
            for(var i=0;i<10;i++){var a=Math.PI/5*i-Math.PI/2;var rr2=i%2===0?or:ir2;pts2.push((cx+rr2*Math.cos(a))+','+(cy+rr2*Math.sin(a)))}
            return 'M'+pts2.join(' L')+' Z';
        default:return null;
    }
}

document.getElementById('dp').onclick=function(){if(qrI){qrI.download({name:'qr-genius',extension:'png'});toast('PNG downloaded!')}};
document.getElementById('ds').onclick=function(){if(qrI){qrI.download({name:'qr-genius',extension:'svg'});toast('SVG downloaded!')}};
// ===================== PDF BACKGROUND UPLOAD =====================
var pdfBgData=null,pdfBgType=null;
var pdfuaEl=document.getElementById('pdfua'),pdfuiEl=document.getElementById('pdfui');
pdfuaEl.onclick=function(){pdfuiEl.click()};
pdfuaEl.ondragover=function(e){e.preventDefault();pdfuaEl.style.borderColor='var(--ac)'};
pdfuaEl.ondragleave=function(){pdfuaEl.style.borderColor=''};
pdfuaEl.ondrop=function(e){e.preventDefault();pdfuaEl.style.borderColor='';if(e.dataTransfer.files.length)handlePdfBg(e.dataTransfer.files[0])};
pdfuiEl.onchange=function(){if(pdfuiEl.files.length)handlePdfBg(pdfuiEl.files[0])};
function handlePdfBg(f){
    if(!f.type.match(/^image\/(png|jpeg|svg\+xml)$/)){toast('Use PNG, JPG or SVG');return}
    var r=new FileReader();r.onload=function(e){
        pdfBgData=e.target.result;
        pdfBgType=f.type.indexOf('svg')!==-1?'SVG':(f.type.indexOf('png')!==-1?'PNG':'JPEG');
        pdfuaEl.classList.add('has');
        document.getElementById('pdful').textContent=f.name;
        document.getElementById('pdfuc').style.display='flex';
    };r.readAsDataURL(f);
}
document.getElementById('pdfuc').onclick=function(){
    pdfBgData=null;pdfBgType=null;
    pdfuaEl.classList.remove('has');
    document.getElementById('pdful').textContent='Upload A4 background (PNG, JPG, SVG)';
    document.getElementById('pdfuc').style.display='none';
    pdfuiEl.value='';
};

// ===================== PDF EXPORT =====================
document.getElementById('dpdf').onclick=function(){
    if(!qrI)return;
    var canvas=document.querySelector('#qo canvas');
    if(!canvas){toast('Generate a QR code first');return}
    var jsPDFClass=window.jspdf&&window.jspdf.jsPDF||window.jsPDF;
    if(!jsPDFClass){toast('PDF library not loaded');return}
    try{
        var pdf=new jsPDFClass({orientation:'portrait',unit:'mm',format:'a4'});
        var pw=210,ph=297;

        function addQrAndSave(){
            var imgData=canvas.toDataURL('image/png');
            var qrSize=120;
            var x=(pw-qrSize)/2;
            var y=(ph-qrSize)/2;
            pdf.addImage(imgData,'PNG',x,y,qrSize,qrSize);
            pdf.save('qr-genius.pdf');
            toast('PDF downloaded!');
        }

        if(pdfBgData&&pdfBgType){
            if(pdfBgType==='SVG'){
                // rasterize SVG to canvas first
                var img=new Image();
                img.onload=function(){
                    var cvs=document.createElement('canvas');
                    // A4 at 150 DPI
                    cvs.width=1240;cvs.height=1754;
                    var ctx=cvs.getContext('2d');
                    ctx.drawImage(img,0,0,cvs.width,cvs.height);
                    pdf.addImage(cvs.toDataURL('image/png'),'PNG',0,0,pw,ph);
                    addQrAndSave();
                };
                img.onerror=function(){toast('Could not load SVG background');addQrAndSave()};
                img.src=pdfBgData;
            }else{
                pdf.addImage(pdfBgData,pdfBgType,0,0,pw,ph);
                addQrAndSave();
            }
        }else{
            addQrAndSave();
        }
    }catch(e){console.error('PDF export error:',e);toast('PDF export failed')}
};

document.querySelectorAll('#dtabs .tab').forEach(function(b){b.onclick=function(){
    document.querySelectorAll('#dtabs .tab').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on');cTab=b.dataset.tab;
    document.querySelectorAll('.tc').forEach(function(x){x.classList.remove('on')});
    document.getElementById('tab-'+cTab).classList.add('on');sched()}});

function setupSG(id,fn){document.querySelectorAll('#'+id+' .so').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#'+id+' .so').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');fn(o.dataset.style);sched()}})}
setupSG('dsg',function(v){dSty=v});setupSG('csg',function(v){cSty=v});setupSG('cdsg',function(v){cdSty=v});


// ===================== ICON SOURCE TABS =====================
var curIconSrc='presets',custIconData=null,activeIconSrc='presets';
function switchIconTab(src){
    curIconSrc=src;
    document.querySelectorAll('#isrc-tabs .icon-src-tab').forEach(function(x){x.classList.toggle('on',x.dataset.src===src)});
    document.querySelectorAll('.icon-src-content').forEach(function(x){x.classList.toggle('on',x.id==='isrc-'+src)});
}
document.querySelectorAll('#isrc-tabs .icon-src-tab').forEach(function(t){t.onclick=function(){
    switchIconTab(t.dataset.src);
    // when switching to presets with "none" selected and no preset active, clear custom
    if(curIconSrc==='presets'&&selIc==='none'&&activeIconSrc!=='presets'){custIconData=null;custImg=null;sched()}
}});

document.querySelectorAll('#icg .io').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#icg .io').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');selIc=o.dataset.icon;
    custImg=null;custIconData=null;activeIconSrc='presets';
    document.getElementById('ua').classList.remove('has');document.getElementById('ul').textContent='Click or drag to upload (PNG, JPG, SVG)';
    // clear all custom icon inputs
    ['fa','ri','nf','si'].forEach(function(p){var el=document.getElementById(p+'-class');if(el)el.value='';var pv=document.getElementById(p+'-prev');if(pv){pv.classList.remove('ok');pv.innerHTML='<i class="fas fa-icons"></i>'}});
    sched()}});


// ===================== RENDER CSS ICON TO DATA URL =====================
function renderIconToDataURL(iconClass,color,cb){
    var canvas=document.createElement('canvas');canvas.width=400;canvas.height=400;
    var ctx=canvas.getContext('2d');
    // white background with rounded corners
    ctx.fillStyle='#ffffff';
    ctx.beginPath();ctx.roundRect(0,0,400,400,24);ctx.fill();
    // render icon offscreen
    var tmp=document.createElement('div');
    tmp.style.cssText='position:fixed;left:-9999px;top:-9999px;width:400px;height:400px;display:flex;align-items:center;justify-content:center;font-size:240px;color:'+(color||'#000000')+';line-height:1;';
    var ic=document.createElement('i');
    iconClass.trim().split(/\s+/).forEach(function(c){ic.classList.add(c)});
    tmp.appendChild(ic);document.body.appendChild(tmp);
    // wait for font to render
    setTimeout(function(){
        var rect=ic.getBoundingClientRect();
        // use html2canvas approach via foreignObject
        var svgStr='<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><foreignObject width="400" height="400"><div xmlns="http://www.w3.org/1999/xhtml" style="width:400px;height:400px;display:flex;align-items:center;justify-content:center;font-size:240px;color:'+(color||'#000')+';line-height:1;background:#fff;border-radius:24px;">'+tmp.innerHTML+'</div></foreignObject></svg>';
        // This won't work due to CORS on fonts, so use canvas text fallback
        // Instead, get computed content and draw it
        var cs=getComputedStyle(ic,':before');
        var charCode=cs.content;
        if(charCode&&charCode!=='none'&&charCode!=='normal'){
            charCode=charCode.replace(/['"]/g,'');
            var ff=getComputedStyle(ic).fontFamily;
            var fw=getComputedStyle(ic).fontWeight;
            ctx.font=fw+' 240px '+ff;
            ctx.fillStyle=color||'#000000';
            ctx.textAlign='center';ctx.textBaseline='middle';
            ctx.fillText(charCode,200,210);
        }
        document.body.removeChild(tmp);
        cb(canvas.toDataURL('image/png'));
    },150);
}


// ===================== SIMPLE ICONS FETCHER =====================
var siCache={};
function fetchSimpleIcon(slug,color,cb){
    slug=slug.toLowerCase().trim().replace(/\s+/g,'');
    if(siCache[slug]){
        var svg=siCache[slug].replace(/<svg /,'<svg fill="'+(color||'#000')+'" ');
        var wrapped='<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" rx="24" fill="white"/><g transform="translate(70,70) scale(10.833)">'+svg.replace(/<svg[^>]*>/,'').replace(/<\/svg>/,'')+'</g></svg>';
        cb('data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(wrapped))));
        return;
    }
    fetch('https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/'+slug+'.svg')
    .then(function(r){if(!r.ok)throw new Error('Not found');return r.text()})
    .then(function(svg){
        siCache[slug]=svg;
        svg=svg.replace(/<svg /,'<svg fill="'+(color||'#000')+'" ');
        var wrapped='<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" rx="24" fill="white"/><g transform="translate(70,70) scale(10.833)">'+svg.replace(/<svg[^>]*>/,'').replace(/<\/svg>/,'')+'</g></svg>';
        cb('data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(wrapped))));
    })
    .catch(function(){cb(null)});
}


// ===================== CUSTOM ICON INPUT HANDLERS =====================
function setupCustomIcon(prefix,prevId){
    var inp=document.getElementById(prefix+'-class');
    var prev=document.getElementById(prefix+'-prev');
    var cpick=document.getElementById(prefix+'-color');
    var chex=document.getElementById(prefix+'-colorh');
    if(cpick&&chex){
        cpick.oninput=function(){chex.value=cpick.value;triggerCustom()};
        chex.oninput=function(){var v=chex.value;if(v.charAt(0)!=='#')v='#'+v;if(/^#[0-9a-fA-F]{6}$/.test(v)){cpick.value=v;triggerCustom()}};
        chex.onblur=function(){var v=chex.value;if(v.charAt(0)!=='#')v='#'+v;if(/^#[0-9a-fA-F]{6}$/.test(v)){chex.value=v;cpick.value=v}else{chex.value=cpick.value}};
    }
    function clearOtherProviders(){
        ['fa','ri','nf','si'].forEach(function(p){
            if(p===prefix)return;
            var el=document.getElementById(p+'-class');if(el)el.value='';
            var pv=document.getElementById(p+'-prev');if(pv){pv.classList.remove('ok');pv.innerHTML='<i class="fas fa-icons"></i>'}
        });
        // clear presets selection to "none"
        document.querySelectorAll('#icg .io').forEach(function(x){x.classList.remove('on')});
        document.querySelector('#icg .io[data-icon="none"]').classList.add('on');
        selIc='none';
        // clear upload
        document.getElementById('ua').classList.remove('has');document.getElementById('ul').textContent='Click or drag to upload (PNG, JPG, SVG)';
        custImg=null;
    }
    function triggerCustom(){
        var val=inp.value.trim();
        if(!val){custIconData=null;custImg=null;prev.classList.remove('ok');prev.innerHTML='<i class="fas fa-icons"></i>';sched();return}
        var color=cpick?cpick.value:'#000000';
        clearOtherProviders();
        var srcMap={fa:'fontawesome',ri:'remix',nf:'nerd',si:'simple'};
        activeIconSrc=srcMap[prefix]||prefix;
        switchIconTab(activeIconSrc);
        if(prefix==='si'){
            prev.innerHTML='<i class="fas fa-spinner fa-spin"></i>';
            fetchSimpleIcon(val,null,function(url){
                if(url){
                    custIconData=url;
                    prev.innerHTML='<img src="'+url+'">';prev.classList.add('ok');
                }else{
                    custIconData=null;prev.innerHTML='<i class="fas fa-times" style="color:#e17055"></i>';prev.classList.remove('ok');
                }
                sched();
            });
        }else{
            var cls=val;
            if(prefix==='nf'&&val.indexOf('nf ')!==0) cls='nf '+val;
            renderIconToDataURL(cls,color,function(url){
                custIconData=url;
                prev.innerHTML='<i class="'+cls+'" style="color:'+color+'"></i>';prev.classList.add('ok');
                sched();
            });
        }
    }
    var debTm;
    inp.addEventListener('input',function(){clearTimeout(debTm);debTm=setTimeout(triggerCustom,400)});
}
setupCustomIcon('fa','fa-prev');
setupCustomIcon('ri','ri-prev');
setupCustomIcon('nf','nf-prev');
setupCustomIcon('si','si-prev');

document.querySelectorAll('#eco .ec').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#eco .ec').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');ecLv=o.dataset.ec;sched()}});

[['cfg','cfgh'],['cbg','cbgh'],['cc','cch'],['ccd','ccdh'],['grc1','grc1h'],['grc2','grc2h'],['gbg','gbgh'],['bgpat-col','bgpat-colh'],['frame-col','frame-colh'],['label-col','label-colh']].forEach(function(p){
    var picker=document.getElementById(p[0]),hex=document.getElementById(p[1]);
    if(!picker||!hex)return;
    picker.oninput=function(){hex.value=picker.value;sched()};
    hex.oninput=function(){var v=hex.value;if(v.charAt(0)!=='#')v='#'+v;if(/^#[0-9a-fA-F]{6}$/.test(v)){picker.value=v;sched()}};
    hex.onblur=function(){var v=hex.value;if(v.charAt(0)!=='#')v='#'+v;if(/^#[0-9a-fA-F]{6}$/.test(v)){hex.value=v;picker.value=v}else{hex.value=picker.value}}});

// ===================== GRADIENT TOGGLE =====================
document.getElementById('use-grad').onclick=function(){
    useGrad=this.dataset.active==='true';
    // toggle is handled by the generic .tg handler, so read after toggle
};
// Override generic toggle for use-grad specifically
(function(){
    var gt=document.getElementById('use-grad');
    var origClick=null;
    gt.addEventListener('click',function(){
        // After the generic handler toggles data-active:
        setTimeout(function(){
            useGrad=gt.dataset.active==='true';
            document.getElementById('color-solid').style.display=useGrad?'none':'';
            document.getElementById('color-grad').style.display=useGrad?'':'none';
            sched();
        },10);
    });
})();

// ===================== GRADIENT DIRECTION =====================
document.querySelectorAll('#grad-dir .so').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#grad-dir .so').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');gradDir=o.dataset.dir;sched()}});

// ===================== SHAPE MASK SELECTOR =====================
document.querySelectorAll('#shape-sg .so').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#shape-sg .so').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');qrShape=o.dataset.shape;
    document.getElementById('shape-pad-wrap').style.display=qrShape==='none'?'none':'';
    sched()}});
document.getElementById('shape-pad').oninput=function(e){document.getElementById('shape-pad-val').textContent=e.target.value;sched()};


// ===================== UNDO / REDO =====================
var hist=[],hIdx=-1,maxHist=50,skipSnap=false;
function snap(){
    if(skipSnap)return;
    var s={tab:cTab,dSty:dSty,cSty:cSty,cdSty:cdSty,ecLv:ecLv,selIc:selIc,custImg:custImg,custIconData:custIconData,
        useGrad:useGrad,gradDir:gradDir,qrShape:qrShape,
        cfg:document.getElementById('cfg').value,cbg:document.getElementById('cbg').value,
        cc:document.getElementById('cc').value,ccd:document.getElementById('ccd').value,
        grc1:document.getElementById('grc1').value,grc2:document.getElementById('grc2').value,
        gbg:document.getElementById('gbg').value,shapePad:document.getElementById('shape-pad').value,
        qs:document.getElementById('qs').value,qm:document.getElementById('qm').value,
        is:document.getElementById('is').value,ihd:document.getElementById('ihd').dataset.active,
        wh:document.getElementById('wifi-hidden').dataset.active};
    document.querySelectorAll('.pb input[type="text"],.pb input[type="url"],.pb input[type="email"],.pb input[type="tel"],.pb input[type="datetime-local"],.pb textarea,.pb select').forEach(function(el){if(el.id&&!el.classList.contains('hex-in'))s['f_'+el.id]=el.value});
    if(hIdx<hist.length-1)hist.splice(hIdx+1);
    hist.push(JSON.stringify(s));
    if(hist.length>maxHist)hist.shift();
    hIdx=hist.length-1;
    updUR()
}
function restore(json){
    skipSnap=true;
    var s=JSON.parse(json);
    cTab=s.tab;dSty=s.dSty;cSty=s.cSty;cdSty=s.cdSty;ecLv=s.ecLv;selIc=s.selIc;custImg=s.custImg;custIconData=s.custIconData||null;
    useGrad=!!s.useGrad;gradDir=s.gradDir||'vertical';qrShape=s.qrShape||'none';
    var gt=document.getElementById('use-grad');gt.dataset.active=String(useGrad);gt.classList.toggle('on',useGrad);
    document.getElementById('color-solid').style.display=useGrad?'none':'';
    document.getElementById('color-grad').style.display=useGrad?'':'none';
    document.querySelectorAll('#grad-dir .so').forEach(function(o){o.classList.toggle('on',o.dataset.dir===gradDir)});
    document.querySelectorAll('#shape-sg .so').forEach(function(o){o.classList.toggle('on',o.dataset.shape===qrShape)});
    document.getElementById('shape-pad-wrap').style.display=qrShape==='none'?'none':'';
    if(s.shapePad){document.getElementById('shape-pad').value=s.shapePad;document.getElementById('shape-pad-val').textContent=s.shapePad}
    document.querySelectorAll('#dtabs .tab').forEach(function(b){b.classList.toggle('on',b.dataset.tab===cTab)});
    document.querySelectorAll('.tc').forEach(function(c){c.classList.toggle('on',c.id==='tab-'+cTab)});
    [['dsg',dSty],['csg',cSty],['cdsg',cdSty]].forEach(function(g){document.querySelectorAll('#'+g[0]+' .so').forEach(function(o){o.classList.toggle('on',o.dataset.style===g[1])})});
    document.querySelectorAll('#eco .ec').forEach(function(o){o.classList.toggle('on',o.dataset.ec===ecLv)});
    document.querySelectorAll('#icg .io').forEach(function(o){o.classList.toggle('on',o.dataset.icon===selIc)});
    [['cfg','cfgh'],['cbg','cbgh'],['cc','cch'],['ccd','ccdh'],['grc1','grc1h'],['grc2','grc2h'],['gbg','gbgh']].forEach(function(p){if(s[p[0]]){document.getElementById(p[0]).value=s[p[0]];document.getElementById(p[1]).value=s[p[0]]}});
    document.getElementById('qs').value=s.qs;document.getElementById('sl').textContent=s.qs+'px';
    document.getElementById('qm').value=s.qm;document.getElementById('ml').textContent=s.qm;
    document.getElementById('is').value=s.is;document.getElementById('isl').textContent=s.is;
    var ihd=document.getElementById('ihd');ihd.dataset.active=s.ihd;ihd.classList.toggle('on',s.ihd==='true');
    var wh=document.getElementById('wifi-hidden');wh.dataset.active=s.wh;wh.classList.toggle('on',s.wh==='true');
    if(custImg){document.getElementById('ua').classList.add('has')}else{document.getElementById('ua').classList.remove('has');document.getElementById('ul').textContent='Click or drag to upload (PNG, JPG, SVG)'}
    Object.keys(s).forEach(function(k){if(k.indexOf('f_')===0){var el=document.getElementById(k.substring(2));if(el)el.value=s[k]}});
    skipSnap=false;gen();updUR()
}
function updUR(){document.getElementById('ubtn').disabled=hIdx<=0;document.getElementById('rbtn').disabled=hIdx>=hist.length-1}
document.getElementById('ubtn').onclick=function(){if(hIdx>0){hIdx--;restore(hist[hIdx])}};
document.getElementById('rbtn').onclick=function(){if(hIdx<hist.length-1){hIdx++;restore(hist[hIdx])}};
var origSched=sched;
sched=function(){clearTimeout(dbt);dbt=setTimeout(function(){gen();snap()},180)};
// initial snapshot
setTimeout(function(){snap()},400);

document.getElementById('qs').oninput=function(e){document.getElementById('sl').textContent=e.target.value+'px';sched()};
document.getElementById('qm').oninput=function(e){document.getElementById('ml').textContent=e.target.value;sched()};
document.getElementById('is').oninput=function(e){document.getElementById('isl').textContent=e.target.value;sched()};

document.querySelectorAll('.tg').forEach(function(t){t.onclick=function(){
    var a=t.dataset.active==='true';t.dataset.active=!a;t.classList.toggle('on',!a);sched()}});

document.querySelectorAll('.pb input[type="text"],.pb input[type="url"],.pb input[type="email"],.pb input[type="tel"],.pb input[type="datetime-local"],.pb textarea,.pb select').forEach(function(el){
    el.addEventListener('input',sched);el.addEventListener('change',sched)});

var uaEl=document.getElementById('ua'),uiEl=document.getElementById('ui');
uaEl.onclick=function(){uiEl.click()};
uaEl.ondragover=function(e){e.preventDefault();uaEl.style.borderColor='var(--ac)'};
uaEl.ondragleave=function(){uaEl.style.borderColor=''};
uaEl.ondrop=function(e){e.preventDefault();uaEl.style.borderColor='';if(e.dataTransfer.files.length)hFile(e.dataTransfer.files[0])};
uiEl.onchange=function(){if(uiEl.files.length)hFile(uiEl.files[0])};
function hFile(f){if(!f.type.startsWith('image/'))return;var r=new FileReader();r.onload=function(e){
    custImg=e.target.result;selIc='none';custIconData=null;activeIconSrc='upload';
    document.querySelectorAll('#icg .io').forEach(function(x){x.classList.remove('on')});
    document.querySelector('#icg .io[data-icon="none"]').classList.add('on');
    ['fa','ri','nf','si'].forEach(function(p){var el=document.getElementById(p+'-class');if(el)el.value='';var pv=document.getElementById(p+'-prev');if(pv){pv.classList.remove('ok');pv.innerHTML='<i class="fas fa-icons"></i>'}});
    switchIconTab('upload');
    uaEl.classList.add('has');document.getElementById('ul').textContent=f.name;sched()};r.readAsDataURL(f)}

function toast(m){var t=document.getElementById('toast');document.getElementById('tm').textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2500)}

// ===================== STYLE PRESETS =====================
var PRESET_KEY='qrgenius_presets';

function capturePreset(){
    return{
        v:1, // version for future compat
        dSty:dSty,cSty:cSty,cdSty:cdSty,ecLv:ecLv,selIc:selIc,
        useGrad:useGrad,gradDir:gradDir,qrShape:qrShape,bgPat:bgPat,qrFrame:qrFrame,
        cfg:document.getElementById('cfg').value,cbg:document.getElementById('cbg').value,
        cc:document.getElementById('cc').value,ccd:document.getElementById('ccd').value,
        grc1:document.getElementById('grc1').value,grc2:document.getElementById('grc2').value,
        gbg:document.getElementById('gbg').value,
        shapePad:document.getElementById('shape-pad').value,
        qs:document.getElementById('qs').value,qm:document.getElementById('qm').value,
        is:document.getElementById('is').value,
        ihd:document.getElementById('ihd').dataset.active,
        transBg:document.getElementById('trans-bg').dataset.active,
        // bg pattern
        bgpatCol:document.getElementById('bgpat-col').value,
        bgpatOp:document.getElementById('bgpat-op').value,
        // frame
        frameCol:document.getElementById('frame-col').value,
        frameW:document.getElementById('frame-w').value,
        // label
        showLabel:document.getElementById('show-label').dataset.active,
        labelText:document.getElementById('label-text').value,
        labelPos:document.querySelector('#label-pos .so.on')?document.querySelector('#label-pos .so.on').dataset.pos:'below',
        labelFs:document.getElementById('label-fs').value,
        labelCol:document.getElementById('label-col').value,
        labelFont:document.getElementById('label-font').value
    };
}

function applyPreset(p){
    if(!p||!p.v)return;
    dSty=p.dSty||'square';cSty=p.cSty||'square';cdSty=p.cdSty||'square';ecLv=p.ecLv||'M';
    selIc=p.selIc||'none';useGrad=!!p.useGrad;gradDir=p.gradDir||'vertical';
    qrShape=p.qrShape||'none';bgPat=p.bgPat||'none';qrFrame=p.qrFrame||'none';

    // dot/corner style selectors
    [['dsg',dSty,'style'],['csg',cSty,'style'],['cdsg',cdSty,'style']].forEach(function(g){
        document.querySelectorAll('#'+g[0]+' .so').forEach(function(o){o.classList.toggle('on',o.dataset[g[2]]===g[1])})});
    // ec level
    document.querySelectorAll('#eco .ec').forEach(function(o){o.classList.toggle('on',o.dataset.ec===ecLv)});
    // icon
    document.querySelectorAll('#icg .io').forEach(function(o){o.classList.toggle('on',o.dataset.icon===selIc)});
    // gradient
    var gt=document.getElementById('use-grad');gt.dataset.active=String(useGrad);gt.classList.toggle('on',useGrad);
    document.getElementById('color-solid').style.display=useGrad?'none':'';
    document.getElementById('color-grad').style.display=useGrad?'':'none';
    document.querySelectorAll('#grad-dir .so').forEach(function(o){o.classList.toggle('on',o.dataset.dir===gradDir)});
    // shape
    document.querySelectorAll('#shape-sg .so').forEach(function(o){o.classList.toggle('on',o.dataset.shape===qrShape)});
    document.getElementById('shape-pad-wrap').style.display=qrShape==='none'?'none':'';
    if(p.shapePad){document.getElementById('shape-pad').value=p.shapePad;document.getElementById('shape-pad-val').textContent=p.shapePad}
    // bg pattern
    document.querySelectorAll('#bgpat-sg .so').forEach(function(o){o.classList.toggle('on',o.dataset.pat===bgPat)});
    document.getElementById('bgpat-opts').style.display=bgPat==='none'?'none':'';
    if(p.bgpatCol){document.getElementById('bgpat-col').value=p.bgpatCol;document.getElementById('bgpat-colh').value=p.bgpatCol}
    if(p.bgpatOp){document.getElementById('bgpat-op').value=p.bgpatOp;document.getElementById('bgpat-op-val').textContent=p.bgpatOp}
    // frame
    document.querySelectorAll('#frame-sg .so').forEach(function(o){o.classList.toggle('on',o.dataset.frame===qrFrame)});
    document.getElementById('frame-opts').style.display=qrFrame==='none'?'none':'';
    if(p.frameCol){document.getElementById('frame-col').value=p.frameCol;document.getElementById('frame-colh').value=p.frameCol}
    if(p.frameW){document.getElementById('frame-w').value=p.frameW;document.getElementById('frame-w-val').textContent=p.frameW}
    // label
    var sl=document.getElementById('show-label');
    var showLbl=p.showLabel==='true';
    sl.dataset.active=String(showLbl);sl.classList.toggle('on',showLbl);
    document.getElementById('label-opts').style.display=showLbl?'':'none';
    if(p.labelText!=null)document.getElementById('label-text').value=p.labelText;
    document.querySelectorAll('#label-pos .so').forEach(function(o){o.classList.toggle('on',o.dataset.pos===(p.labelPos||'below'))});
    if(p.labelFs){document.getElementById('label-fs').value=p.labelFs;document.getElementById('label-fs-val').textContent=p.labelFs}
    if(p.labelCol){document.getElementById('label-col').value=p.labelCol;document.getElementById('label-colh').value=p.labelCol}
    if(p.labelFont)document.getElementById('label-font').value=p.labelFont;
    // transparent bg
    var tb=document.getElementById('trans-bg');
    var tbOn=p.transBg==='true';
    tb.dataset.active=String(tbOn);tb.classList.toggle('on',tbOn);
    // colors
    [['cfg','cfgh'],['cbg','cbgh'],['cc','cch'],['ccd','ccdh'],['grc1','grc1h'],['grc2','grc2h'],['gbg','gbgh']].forEach(function(pair){
        if(p[pair[0]]){document.getElementById(pair[0]).value=p[pair[0]];document.getElementById(pair[1]).value=p[pair[0]]}});
    // sliders
    if(p.qs){document.getElementById('qs').value=p.qs;document.getElementById('sl').textContent=p.qs+'px'}
    if(p.qm){document.getElementById('qm').value=p.qm;document.getElementById('ml').textContent=p.qm}
    if(p.is){document.getElementById('is').value=p.is;document.getElementById('isl').textContent=p.is}
    var ihd=document.getElementById('ihd');ihd.dataset.active=p.ihd||'true';ihd.classList.toggle('on',(p.ihd||'true')==='true');

    sched();
}

function loadPresets(){
    try{return JSON.parse(localStorage.getItem(PRESET_KEY))||[]}catch(e){return[]}
}
function savePresets(list){
    try{localStorage.setItem(PRESET_KEY,JSON.stringify(list))}catch(e){}
}

function renderPresetList(){
    var list=loadPresets(),el=document.getElementById('preset-list');
    el.innerHTML='';
    if(!list.length){el.innerHTML='<div class="preset-empty">No saved presets</div>';return}
    list.forEach(function(p,idx){
        var item=document.createElement('div');item.className='preset-item';
        // color swatch preview
        var swatch=document.createElement('div');swatch.className='preset-swatch';
        var fg=p.data.useGrad?p.data.grc1:p.data.cfg;
        var bg=p.data.useGrad?p.data.gbg:p.data.cbg;
        swatch.style.background='linear-gradient(135deg,'+fg+' 50%,'+bg+' 50%)';
        var info=document.createElement('div');info.className='preset-info';
        info.innerHTML='<strong>'+escHtml(p.name)+'</strong><span>'+p.data.dSty+' · EC:'+p.data.ecLv+(p.data.useGrad?' · gradient':'')+(p.data.qrShape!=='none'?' · '+p.data.qrShape:'')+'</span>';
        var actions=document.createElement('div');actions.className='preset-actions';
        var applyBtn=document.createElement('button');applyBtn.className='preset-act-btn';applyBtn.title='Apply';applyBtn.innerHTML='<i class="fas fa-check"></i>';
        applyBtn.onclick=function(){applyPreset(p.data);toast('Preset "'+p.name+'" applied')};
        var exportBtn=document.createElement('button');exportBtn.className='preset-act-btn';exportBtn.title='Export';exportBtn.innerHTML='<i class="fas fa-download"></i>';
        exportBtn.onclick=function(){
            var blob=new Blob([JSON.stringify({name:p.name,data:p.data},null,2)],{type:'application/json'});
            var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='qr-preset-'+p.name.replace(/\s+/g,'-').toLowerCase()+'.json';a.click();
            toast('Preset exported');
        };
        var delBtn=document.createElement('button');delBtn.className='preset-act-btn preset-del';delBtn.title='Delete';delBtn.innerHTML='<i class="fas fa-trash"></i>';
        delBtn.onclick=function(){
            var ls=loadPresets();ls.splice(idx,1);savePresets(ls);renderPresetList();toast('Preset deleted');
        };
        actions.appendChild(applyBtn);actions.appendChild(exportBtn);actions.appendChild(delBtn);
        item.appendChild(swatch);item.appendChild(info);item.appendChild(actions);
        el.appendChild(item);
    });
}

function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

// Save preset
document.getElementById('preset-save').onclick=function(){
    var name=prompt('Preset name:');
    if(!name||!name.trim())return;
    var list=loadPresets();
    list.push({name:name.trim(),data:capturePreset()});
    savePresets(list);
    renderPresetList();
    toast('Preset "'+name.trim()+'" saved');
};

// Load preset from file
document.getElementById('preset-load').onclick=function(){document.getElementById('preset-file').click()};
document.getElementById('preset-file').onchange=function(){
    var f=this.files[0];if(!f)return;
    var r=new FileReader();r.onload=function(e){
        try{
            var obj=JSON.parse(e.target.result);
            if(obj.data&&obj.data.v){
                // It's a single preset file
                var list=loadPresets();
                list.push({name:obj.name||'Imported',data:obj.data});
                savePresets(list);
                applyPreset(obj.data);
                renderPresetList();
                toast('Preset "'+obj.name+'" imported & applied');
            }else{
                toast('Invalid preset file');
            }
        }catch(err){toast('Could not parse preset file')}
    };r.readAsText(f);
    this.value='';
};

renderPresetList();

setTimeout(gen,300);

// ===================== BACKGROUND PATTERN =====================
var bgPat='none';
document.querySelectorAll('#bgpat-sg .so').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#bgpat-sg .so').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');bgPat=o.dataset.pat;
    document.getElementById('bgpat-opts').style.display=bgPat==='none'?'none':'';
    sched()}});
document.getElementById('bgpat-op').oninput=function(e){document.getElementById('bgpat-op-val').textContent=e.target.value;sched()};

// ===================== FRAME =====================
var qrFrame='none';
document.querySelectorAll('#frame-sg .so').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#frame-sg .so').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');qrFrame=o.dataset.frame;
    document.getElementById('frame-opts').style.display=qrFrame==='none'?'none':'';
    sched()}});
document.getElementById('frame-w').oninput=function(e){document.getElementById('frame-w-val').textContent=e.target.value;sched()};

// ===================== TEXT LABEL =====================
(function(){
    var lt=document.getElementById('show-label');
    lt.addEventListener('click',function(){
        setTimeout(function(){
            var on=lt.dataset.active==='true';
            document.getElementById('label-opts').style.display=on?'':'none';
            sched();
        },10);
    });
})();
document.querySelectorAll('#label-pos .so').forEach(function(o){o.onclick=function(){
    document.querySelectorAll('#label-pos .so').forEach(function(x){x.classList.remove('on')});
    o.classList.add('on');sched()}});
document.getElementById('label-text').addEventListener('input',sched);
document.getElementById('label-fs').oninput=function(e){document.getElementById('label-fs-val').textContent=e.target.value;sched()};
document.getElementById('label-font').addEventListener('change',sched);

// ===================== TRANSPARENT BG =====================
(function(){
    var tb=document.getElementById('trans-bg');
    tb.addEventListener('click',function(){
        setTimeout(function(){sched()},10);
    });
})();

// ===================== POST-PROCESS PIPELINE =====================
function postProcess(container,sz){
    var canvas=container.querySelector('canvas');
    if(!canvas)return;

    var showLabel=document.getElementById('show-label').dataset.active==='true';
    var labelText=document.getElementById('label-text').value||'';
    var labelPos=document.querySelector('#label-pos .so.on');
    var labelAbove=labelPos&&labelPos.dataset.pos==='above';
    var labelFs=+document.getElementById('label-fs').value;
    var labelCol=document.getElementById('label-col').value;
    var labelFont=document.getElementById('label-font').value;
    var transBg=document.getElementById('trans-bg').dataset.active==='true';

    // Calculate total canvas size with label
    var labelH=0;
    if(showLabel&&labelText){labelH=labelFs+16}
    var totalW=sz,totalH=sz+labelH;

    var c2=document.createElement('canvas');c2.width=totalW;c2.height=totalH;
    var ctx=c2.getContext('2d');

    // Background
    if(!transBg){
        var bgCol=useGrad?document.getElementById('gbg').value:document.getElementById('cbg').value;
        ctx.fillStyle=bgCol;
        ctx.fillRect(0,0,totalW,totalH);
    }

    // Background pattern
    if(bgPat!=='none'){
        var patCol=document.getElementById('bgpat-col').value;
        var patOp=+document.getElementById('bgpat-op').value;
        ctx.save();ctx.globalAlpha=patOp;
        var qrY=labelAbove&&showLabel&&labelText?labelH:0;
        drawBgPattern(ctx,bgPat,patCol,totalW,totalH);
        ctx.restore();
    }

    // Draw QR at offset if label above
    var qrY=labelAbove&&showLabel&&labelText?labelH:0;

    // Shape mask or plain
    if(qrShape!=='none'){
        var pad=+document.getElementById('shape-pad').value;
        var path=getShapePath(qrShape,sz,sz,pad);
        if(path){
            ctx.save();
            var p2=new Path2D(path);
            ctx.translate(0,qrY);
            ctx.clip(p2);
            ctx.drawImage(canvas,0,0);
            ctx.restore();
            ctx.save();ctx.translate(0,qrY);
            ctx.strokeStyle=useGrad?document.getElementById('grc1').value:document.getElementById('cfg').value;
            ctx.lineWidth=Math.max(2,sz*0.008);
            ctx.stroke(p2);
            ctx.restore();
        }
    }else{
        ctx.drawImage(canvas,0,qrY);
    }

    // Frame
    if(qrFrame!=='none'){
        var fCol=document.getElementById('frame-col').value;
        var fW=+document.getElementById('frame-w').value;
        drawFrame(ctx,qrFrame,fCol,fW,0,qrY,sz,sz);
    }

    // Text label
    if(showLabel&&labelText){
        var ly=labelAbove?labelFs+4:sz+qrY+labelFs+4;
        ctx.font='600 '+labelFs+'px '+labelFont+', sans-serif';
        ctx.fillStyle=labelCol;
        ctx.textAlign='center';ctx.textBaseline='alphabetic';
        ctx.fillText(labelText,totalW/2,ly);
    }

    // Replace canvas
    canvas.width=totalW;canvas.height=totalH;
    var ctxO=canvas.getContext('2d');
    if(transBg)ctxO.clearRect(0,0,totalW,totalH);
    ctxO.drawImage(c2,0,0);
}

function drawBgPattern(ctx,pat,col,w,h){
    ctx.fillStyle=col;ctx.strokeStyle=col;
    if(pat==='dots'){
        var sp=16;
        for(var y=sp/2;y<h;y+=sp)for(var x=sp/2;x<w;x+=sp){ctx.beginPath();ctx.arc(x,y,1.5,0,Math.PI*2);ctx.fill()}
    }else if(pat==='grid'){
        ctx.lineWidth=0.5;var sp=20;
        for(var x=0;x<w;x+=sp){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
        for(var y=0;y<h;y+=sp){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
    }else if(pat==='noise'){
        for(var i=0;i<w*h*0.02;i++){
            var x=Math.random()*w,y=Math.random()*h;
            ctx.globalAlpha=Math.random()*0.5;
            ctx.fillRect(x,y,1,1);
        }
        ctx.globalAlpha=1;
    }
}

function drawFrame(ctx,type,col,w,x,y,fw,fh){
    ctx.strokeStyle=col;ctx.lineWidth=w;
    if(type==='simple'){
        ctx.strokeRect(x+w/2,y+w/2,fw-w,fh-w);
    }else if(type==='rounded'){
        var r=12;
        ctx.beginPath();ctx.roundRect(x+w/2,y+w/2,fw-w,fh-w,r);ctx.stroke();
    }else if(type==='badge'){
        var r=Math.min(fw,fh)*0.08;
        ctx.beginPath();ctx.roundRect(x+w/2,y+w/2,fw-w,fh-w,r);ctx.stroke();
        // inner line
        var g=w+4;
        ctx.lineWidth=Math.max(1,w*0.4);
        ctx.beginPath();ctx.roundRect(x+g,y+g,fw-g*2,fh-g*2,Math.max(0,r-4));ctx.stroke();
        ctx.lineWidth=w;
    }else if(type==='ticket'){
        var nr=10;
        ctx.beginPath();
        ctx.moveTo(x+w/2+nr,y+w/2);ctx.lineTo(x+fw-w/2-nr,y+w/2);
        ctx.arc(x+fw-w/2-nr,y+w/2+nr,nr,-Math.PI/2,0);
        ctx.lineTo(x+fw-w/2,y+fh*0.3);
        ctx.arc(x+fw-w/2-nr,y+fh*0.3,nr,0,Math.PI/2);ctx.arc(x+fw-w/2-nr,y+fh*0.3+nr*2,nr,-Math.PI/2,0);
        ctx.lineTo(x+fw-w/2,y+fh-w/2-nr);
        ctx.arc(x+fw-w/2-nr,y+fh-w/2-nr,nr,0,Math.PI/2);
        ctx.lineTo(x+w/2+nr,y+fh-w/2);
        ctx.arc(x+w/2+nr,y+fh-w/2-nr,nr,Math.PI/2,Math.PI);
        ctx.lineTo(x+w/2,y+fh*0.3+nr*2);
        ctx.arc(x+w/2+nr,y+fh*0.3+nr*2,nr,Math.PI,Math.PI*1.5);ctx.arc(x+w/2+nr,y+fh*0.3,nr,Math.PI/2,Math.PI);
        ctx.lineTo(x+w/2,y+w/2+nr);
        ctx.arc(x+w/2+nr,y+w/2+nr,nr,Math.PI,Math.PI*1.5);
        ctx.stroke();
    }
}

// ===================== MODE SWITCHER =====================
function switchMode(mode){
    ['create','read','bulk'].forEach(function(m){
        var tab=document.getElementById('mode-'+m);
        var app=document.getElementById('app-'+m);
        if(tab)tab.classList.toggle('on',m===mode);
        if(app)app.style.display=m===mode?'':'none';
    });
}
document.getElementById('mode-create').onclick=function(){switchMode('create')};
document.getElementById('mode-read').onclick=function(){switchMode('read')};
document.getElementById('mode-bulk').onclick=function(){switchMode('bulk')};

// ===================== QR READER =====================
var qrReadUa=document.getElementById('qr-read-ua'),qrReadIn=document.getElementById('qr-read-input');
qrReadUa.onclick=function(){qrReadIn.click()};
qrReadUa.ondragover=function(e){e.preventDefault();qrReadUa.style.borderColor='var(--ac)'};
qrReadUa.ondragleave=function(){qrReadUa.style.borderColor=''};
qrReadUa.ondrop=function(e){e.preventDefault();qrReadUa.style.borderColor='';if(e.dataTransfer.files.length)decodeQRFile(e.dataTransfer.files[0])};
qrReadIn.onchange=function(){if(qrReadIn.files.length)decodeQRFile(qrReadIn.files[0])};

document.getElementById('qr-read-clear').onclick=function(){
    document.getElementById('qr-read-preview-wrap').style.display='none';
    document.getElementById('reader-result').style.display='none';
    document.getElementById('reader-error').style.display='none';
    document.getElementById('reader-placeholder').style.display='flex';
    document.getElementById('qr-read-label').textContent='Drop or click to upload a QR code image';
    qrReadUa.classList.remove('has');
    qrReadIn.value='';
};

document.getElementById('qr-paste-btn').onclick=function(){
    if(!navigator.clipboard||!navigator.clipboard.read){toast('Clipboard not supported in this browser');return}
    navigator.clipboard.read().then(function(items){
        for(var i=0;i<items.length;i++){
            var types=items[i].types;
            for(var j=0;j<types.length;j++){
                if(types[j].startsWith('image/')){
                    items[i].getType(types[j]).then(function(blob){decodeQRBlob(blob)});return;
                }
            }
        }
        toast('No image found in clipboard');
    }).catch(function(){toast('Could not read clipboard')});
};

document.getElementById('reader-copy').onclick=function(){
    var raw=document.getElementById('reader-raw').textContent;
    navigator.clipboard.writeText(raw).then(function(){toast('Copied to clipboard!')}).catch(function(){toast('Copy failed')});
};

function decodeQRFile(f){
    if(!f.type.startsWith('image/')){toast('Please upload an image file');return}
    decodeQRBlob(f);
}

function decodeQRBlob(blob){
    var url=URL.createObjectURL(blob);
    var img=new Image();
    img.onload=function(){
        document.getElementById('qr-read-preview').src=url;
        document.getElementById('qr-read-preview-wrap').style.display='flex';
        document.getElementById('qr-read-label').textContent=blob.name||'Image loaded';
        qrReadUa.classList.add('has');

        // draw to canvas and decode
        var cvs=document.createElement('canvas');
        // Use higher resolution for better detection
        var maxDim=Math.max(img.naturalWidth,img.naturalHeight,800);
        var scale=maxDim>1600?1600/maxDim:1;
        cvs.width=Math.round(img.naturalWidth*scale);
        cvs.height=Math.round(img.naturalHeight*scale);
        var ctx=cvs.getContext('2d');
        ctx.drawImage(img,0,0,cvs.width,cvs.height);
        var imageData=ctx.getImageData(0,0,cvs.width,cvs.height);

        if(typeof jsQR==='undefined'){showReaderError('QR reader library not loaded');return}
        var result=jsQR(imageData.data,cvs.width,cvs.height,{inversionAttempts:'attemptBoth'});

        if(result&&result.data){
            showReaderResult(result.data);
        }else{
            // retry with grayscale + contrast enhancement
            for(var k=0;k<imageData.data.length;k+=4){
                var gray=imageData.data[k]*0.299+imageData.data[k+1]*0.587+imageData.data[k+2]*0.114;
                gray=gray>128?255:0;
                imageData.data[k]=imageData.data[k+1]=imageData.data[k+2]=gray;
            }
            result=jsQR(imageData.data,cvs.width,cvs.height,{inversionAttempts:'attemptBoth'});
            if(result&&result.data){
                showReaderResult(result.data);
            }else{
                showReaderError('Could not decode QR code. Make sure the image contains a clear, readable QR code.');
            }
        }
    };
    img.onerror=function(){showReaderError('Could not load image')};
    img.src=url;
}

function showReaderError(msg){
    document.getElementById('reader-placeholder').style.display='none';
    document.getElementById('reader-result').style.display='none';
    document.getElementById('reader-error').style.display='flex';
    document.getElementById('reader-error-msg').textContent=msg;
}

function showReaderResult(data){
    document.getElementById('reader-placeholder').style.display='none';
    document.getElementById('reader-error').style.display='none';
    document.getElementById('reader-result').style.display='block';
    document.getElementById('reader-raw').textContent=data;

    var parsed=parseQRData(data);
    document.getElementById('reader-type').innerHTML='<i class="'+parsed.icon+'"></i> '+parsed.type;

    var parsedEl=document.getElementById('reader-parsed');
    parsedEl.innerHTML='';
    if(parsed.fields.length>0){
        var sec=document.createElement('div');sec.className='reader-parsed-section';
        parsed.fields.forEach(function(f){
            var row=document.createElement('div');row.className='reader-parsed-row';
            row.innerHTML='<span class="reader-parsed-key">'+f.key+'</span><span class="reader-parsed-val">'+escHtml(f.value)+'</span>';
            sec.appendChild(row);
        });
        parsedEl.appendChild(sec);
    }

    var openWrap=document.getElementById('reader-open-wrap');
    var openBtn=document.getElementById('reader-open');
    if(parsed.link){
        openBtn.href=parsed.link;
        openBtn.innerHTML='<i class="fas fa-external-link-alt"></i> '+parsed.linkLabel;
        openWrap.style.display='block';
    }else{
        openWrap.style.display='none';
    }
}

function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}

function parseQRData(data){
    var r={type:'Text',icon:'fas fa-font',fields:[],link:null,linkLabel:'Open'};

    // URL
    if(/^https?:\/\//i.test(data)){
        r.type='URL';r.icon='fas fa-link';
        r.fields.push({key:'URL',value:data});
        r.link=data;r.linkLabel='Open URL';
        return r;
    }

    // mailto
    if(/^mailto:/i.test(data)){
        r.type='Email';r.icon='fas fa-envelope';
        var mailParts=data.replace(/^mailto:/i,'').split('?');
        r.fields.push({key:'Email',value:mailParts[0]});
        if(mailParts[1]){
            var params=new URLSearchParams(mailParts[1]);
            if(params.get('subject'))r.fields.push({key:'Subject',value:params.get('subject')});
            if(params.get('body'))r.fields.push({key:'Body',value:params.get('body')});
        }
        r.link=data;r.linkLabel='Compose Email';
        return r;
    }

    // tel
    if(/^tel:/i.test(data)){
        r.type='Phone';r.icon='fas fa-phone';
        r.fields.push({key:'Number',value:data.replace(/^tel:/i,'')});
        r.link=data;r.linkLabel='Call Number';
        return r;
    }

    // sms
    if(/^sms:/i.test(data)){
        r.type='SMS';r.icon='fas fa-comment';
        var smsParts=data.replace(/^sms:/i,'').split('?');
        r.fields.push({key:'Number',value:smsParts[0]});
        if(smsParts[1]){
            var sp=new URLSearchParams(smsParts[1]);
            if(sp.get('body'))r.fields.push({key:'Message',value:sp.get('body')});
        }
        r.link=data;r.linkLabel='Send SMS';
        return r;
    }

    // WiFi
    if(/^WIFI:/i.test(data)){
        r.type='WiFi';r.icon='fas fa-wifi';
        var wm=data.match(/S:([^;]*)/);if(wm)r.fields.push({key:'SSID',value:wm[1]});
        var wp=data.match(/P:([^;]*)/);if(wp)r.fields.push({key:'Password',value:wp[1]});
        var wt=data.match(/T:([^;]*)/);if(wt)r.fields.push({key:'Encryption',value:wt[1]});
        var wh=data.match(/H:([^;]*)/);if(wh&&wh[1]==='true')r.fields.push({key:'Hidden',value:'Yes'});
        return r;
    }

    // vCard
    if(/^BEGIN:VCARD/i.test(data)){
        r.type='vCard / Contact';r.icon='fas fa-address-card';
        var vn=data.match(/FN:(.+)/i);if(vn)r.fields.push({key:'Name',value:vn[1].trim()});
        var vo=data.match(/ORG:(.+)/i);if(vo)r.fields.push({key:'Organization',value:vo[1].trim()});
        var vt=data.match(/TEL:(.+)/i);if(vt)r.fields.push({key:'Phone',value:vt[1].trim()});
        var ve=data.match(/EMAIL:(.+)/i);if(ve)r.fields.push({key:'Email',value:ve[1].trim()});
        var vu=data.match(/URL:(.+)/i);if(vu){r.fields.push({key:'Website',value:vu[1].trim()});r.link=vu[1].trim();r.linkLabel='Open Website'}
        var va=data.match(/ADR[^:]*:(.+)/i);if(va)r.fields.push({key:'Address',value:va[1].replace(/;/g,', ').trim()});
        return r;
    }

    // vCalendar / iCal Event
    if(/^BEGIN:VCALENDAR/i.test(data)||/^BEGIN:VEVENT/i.test(data)){
        r.type='Calendar Event';r.icon='fas fa-calendar';
        var es=data.match(/SUMMARY:(.+)/i);if(es)r.fields.push({key:'Title',value:es[1].trim()});
        var el=data.match(/LOCATION:(.+)/i);if(el)r.fields.push({key:'Location',value:el[1].trim()});
        var eds=data.match(/DTSTART:?(\d{8}T?\d{4,6})/i);if(eds)r.fields.push({key:'Start',value:formatDt(eds[1])});
        var ede=data.match(/DTEND:?(\d{8}T?\d{4,6})/i);if(ede)r.fields.push({key:'End',value:formatDt(ede[1])});
        var ed=data.match(/DESCRIPTION:(.+)/i);if(ed)r.fields.push({key:'Description',value:ed[1].trim()});
        return r;
    }

    // Plain text fallback
    r.fields.push({key:'Content',value:data});
    // If it looks like a URL without protocol
    if(/^[\w][\w.-]+\.\w{2,}(\/|$)/i.test(data)){
        r.link='https://'+data;r.linkLabel='Open as URL';
        r.type='URL (no protocol)';r.icon='fas fa-link';
    }
    return r;
}

function formatDt(s){
    // 20250115T143000 -> 2025-01-15 14:30
    if(s.length>=13){
        return s.substring(0,4)+'-'+s.substring(4,6)+'-'+s.substring(6,8)+' '+s.substring(9,11)+':'+s.substring(11,13);
    }
    return s;
}

// ===================== BULK MODE =====================
var bulkQRs=[];

// CSV upload
var bulkCsvUa=document.getElementById('bulk-csv-ua'),bulkCsvIn=document.getElementById('bulk-csv-input');
bulkCsvUa.onclick=function(){bulkCsvIn.click()};
bulkCsvIn.onchange=function(){if(bulkCsvIn.files.length)parseCsvFile(bulkCsvIn.files[0])};

function parseCsvFile(f){
    var r=new FileReader();r.onload=function(e){
        var text=e.target.result;
        var lines=text.split(/\r?\n/).filter(function(l){return l.trim()});
        if(lines.length<2){toast('CSV needs a header row + data');return}
        var sep=lines[0].indexOf('\t')!==-1?'\t':',';
        var headers=lines[0].split(sep).map(function(h){return h.replace(/^["']|["']$/g,'').trim()});
        var sel=document.getElementById('bulk-csv-col');
        sel.innerHTML='';
        headers.forEach(function(h,i){var o=document.createElement('option');o.value=i;o.textContent=h;sel.appendChild(o)});
        document.getElementById('bulk-csv-config').style.display='';
        document.getElementById('bulk-csv-count').textContent=lines.length-1;
        document.getElementById('bulk-csv-label').textContent=f.name;
        bulkCsvUa.classList.add('has');
        bulkCsvUa._csvLines=lines;bulkCsvUa._csvSep=sep;
    };r.readAsText(f);
}

function getBulkData(){
    var items=[];
    if(bulkCsvUa._csvLines&&bulkCsvUa._csvLines.length>1){
        var colIdx=+document.getElementById('bulk-csv-col').value;
        var sep=bulkCsvUa._csvSep;
        for(var i=1;i<bulkCsvUa._csvLines.length;i++){
            var cols=bulkCsvUa._csvLines[i].split(sep);
            var val=cols[colIdx];
            if(val)items.push(val.replace(/^["']|["']$/g,'').trim());
        }
    }
    var text=document.getElementById('bulk-text').value.trim();
    if(text){text.split(/\n/).forEach(function(l){l=l.trim();if(l)items.push(l)})}
    return items;
}

function makeBulkConfig(dataStr,sz,mg){
    var fg=document.getElementById('cfg').value,bg=document.getElementById('cbg').value;
    var cc=document.getElementById('cc').value,cd=document.getElementById('ccd').value;
    var ir=+document.getElementById('is').value,hd=document.getElementById('ihd').dataset.active==='true';
    var transBg=document.getElementById('trans-bg').dataset.active==='true';
    var dotsOpts;
    if(useGrad){
        var gc1=document.getElementById('grc1').value,gc2=document.getElementById('grc2').value;
        bg=document.getElementById('gbg').value;
        var g={colorStops:[{offset:0,color:gc1},{offset:1,color:gc2}]};
        if(gradDir==='radial'){g.type='radial'}else{g.type='linear';g.rotation=gradDir==='horizontal'?Math.PI/2:gradDir==='diagonal'?Math.PI/4:0}
        dotsOpts={gradient:g,type:dSty};
    }else{dotsOpts={color:fg,type:dSty}}
    var csqOpts={color:cc,type:cSty==='square'?'square':cSty};
    var cdtOpts={color:cd,type:cdSty==='square'?'square':cdSty};
    if(useGrad){csqOpts.gradient=g;cdtOpts.gradient=g}
    var c={width:sz,height:sz,margin:mg||8,data:dataStr,
        dotsOptions:dotsOpts,backgroundOptions:{color:transBg?'rgba(0,0,0,0)':bg},
        cornersSquareOptions:csqOpts,
        cornersDotOptions:cdtOpts,
        qrOptions:{errorCorrectionLevel:ecLv}};
    // icon
    var img=null;
    if(custImg)img=custImg;else if(custIconData)img=custIconData;else if(selIc!=='none')img=mkIcon(selIc,Math.round(sz*0.5));
    if(img){c.image=img;c.imageOptions={crossOrigin:'anonymous',margin:4,imageSize:ir,hideBackgroundDots:hd}}
    return c;
}

function needsPostProcess(){
    return qrShape!=='none'||bgPat!=='none'||qrFrame!=='none'||
        document.getElementById('show-label').dataset.active==='true'||
        document.getElementById('trans-bg').dataset.active==='true';
}

document.getElementById('bulk-gen').onclick=function(){
    var items=getBulkData();
    if(!items.length){toast('Enter data first');return}
    if(items.length>200){toast('Max 200 items');return}
    var grid=document.getElementById('bulk-grid');
    grid.innerHTML='';bulkQRs=[];
    document.getElementById('bulk-count-label').textContent='('+items.length+' codes)';
    var thumbSz=200;
    items.forEach(function(d,idx){
        var card=document.createElement('div');card.className='bulk-card';
        var wrap=document.createElement('div');wrap.className='bulk-qr-wrap';
        var lbl=document.createElement('div');lbl.className='bulk-card-label';
        lbl.textContent=d.length>30?d.substring(0,30)+'...':d;lbl.title=d;
        card.appendChild(wrap);card.appendChild(lbl);grid.appendChild(card);
        var cfg=makeBulkConfig(d,thumbSz);
        var qr=new QRCodeStyling(cfg);qr.append(wrap);
        bulkQRs.push({qr:qr,data:d});
        // apply post-processing to thumbnail
        if(needsPostProcess()){
            (function(w,s){setTimeout(function(){postProcess(w,s)},100+idx*20)})(wrap,thumbSz);
        }
    });
    document.getElementById('bulk-export').style.display='flex';
};

function bulkGenFull(dataStr,sz,cb){
    var cfg=makeBulkConfig(dataStr,sz,+document.getElementById('qm').value);
    var tmp=document.createElement('div');tmp.style.cssText='position:fixed;left:-9999px';
    document.body.appendChild(tmp);
    var qr=new QRCodeStyling(cfg);qr.append(tmp);
    var delay=needsPostProcess()?200:120;
    setTimeout(function(){
        if(needsPostProcess())postProcess(tmp,sz);
        setTimeout(function(){cb(qr,tmp)},60);
    },120);
}

function bulkZipExport(ext){
    if(!bulkQRs.length){toast('Generate first');return}
    if(typeof JSZip==='undefined'){toast('JSZip not loaded');return}
    var zip=new JSZip(),sz=+document.getElementById('qs').value;
    var done=0,total=bulkQRs.length;
    toast('Generating '+total+' codes...');
    bulkQRs.forEach(function(item,idx){
        bulkGenFull(item.data,sz,function(qr,tmp){
            qr.getRawData(ext).then(function(blob){
                var name=(item.data.replace(/[^a-zA-Z0-9]/g,'_').substring(0,40))||('qr_'+idx);
                zip.file(name+'.'+ext,blob);done++;
                document.body.removeChild(tmp);
                if(done===total){zip.generateAsync({type:'blob'}).then(function(c){
                    var a=document.createElement('a');a.href=URL.createObjectURL(c);a.download='qr-genius-bulk.zip';a.click();toast('ZIP downloaded!')
                })}
            });
        });
    });
}
document.getElementById('bulk-zip-png').onclick=function(){bulkZipExport('png')};
document.getElementById('bulk-zip-svg').onclick=function(){bulkZipExport('svg')};

document.getElementById('bulk-pdf').onclick=function(){
    if(!bulkQRs.length){toast('Generate first');return}
    var J=window.jspdf&&window.jspdf.jsPDF||window.jsPDF;
    if(!J){toast('jsPDF not loaded');return}
    var pdf=new J({orientation:'portrait',unit:'mm',format:'a4'});
    var sz=+document.getElementById('qs').value,pw=210,ph=297,qSz=120;
    var total=bulkQRs.length;
    toast('Generating '+total+' page PDF...');
    function addPage(idx){
        if(idx>=total){pdf.save('qr-genius-bulk.pdf');toast('PDF downloaded!');return}
        bulkGenFull(bulkQRs[idx].data,sz,function(qr,tmp){
            var cvs=tmp.querySelector('canvas');
            if(cvs){
                if(idx>0)pdf.addPage();
                pdf.addImage(cvs.toDataURL('image/png'),'PNG',(pw-qSz)/2,(ph-qSz)/2-20,qSz,qSz);
                pdf.setFontSize(10);pdf.setTextColor(100);
                var l=bulkQRs[idx].data;if(l.length>80)l=l.substring(0,80)+'...';
                pdf.text(l,pw/2,(ph-qSz)/2+qSz-2,{align:'center'});
            }
            document.body.removeChild(tmp);addPage(idx+1);
        });
    }
    addPage(0);
};

// ===================== PWA INSTALL =====================
var deferredPrompt=null;
var installBtn=document.getElementById('pwa-install');

function isInstalled(){
    return window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
}

window.addEventListener('beforeinstallprompt',function(e){
    e.preventDefault();
    deferredPrompt=e;
    if(!isInstalled())installBtn.style.display='';
});

installBtn.onclick=function(){
    if(!deferredPrompt)return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(result){
        if(result.outcome==='accepted'){
            installBtn.style.display='none';
            toast('App installed!');
        }
        deferredPrompt=null;
    });
};

window.addEventListener('appinstalled',function(){
    installBtn.style.display='none';
    deferredPrompt=null;
});

if(isInstalled())installBtn.style.display='none';

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(function(e){console.log('SW registration failed:',e)});
}

})();
