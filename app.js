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
    faviconSVG: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="16" fill="%236c5ce7"/><text x="50" y="70" font-size="54" font-family="sans-serif" fill="white" text-anchor="middle">QR</text></svg>',
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
if(CFG.faviconSVG){var _fi=document.getElementById('dynamic-favicon');if(_fi)_fi.href='data:image/svg+xml,'+encodeURIComponent(CFG.faviconSVG)}
var hc=document.getElementById('hlinks');
if(hc&&hc.children.length===0){CFG.headerLinks.forEach(function(l){var a=document.createElement('a');a.className='hlink';a.href=l.url;if(l.external)a.target='_blank';a.innerHTML='<i class="'+l.icon+'"></i> '+l.label;hc.appendChild(a)})};

var cTab='url',dSty='square',cSty='square',cdSty='square',ecLv='M',selIc='none',custImg=null,qrI=null,dbt=null;

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
    fg=document.getElementById('cfg').value,bg=document.getElementById('cbg').value,
    cc=document.getElementById('cc').value,cd=document.getElementById('ccd').value,
    ir=+document.getElementById('is').value,hd=document.getElementById('ihd').dataset.active==='true',
    img=null;
    if(custImg)img=custImg;else if(custIconData)img=custIconData;else if(selIc!=='none')img=mkIcon(selIc,200);
    var c={width:sz,height:sz,margin:mg,data:data,
        dotsOptions:{color:fg,type:dSty},
        backgroundOptions:{color:bg},
        cornersSquareOptions:{color:cc,type:cSty==='square'?'square':cSty},
        cornersDotOptions:{color:cd,type:cdSty==='square'?'square':cdSty},
        qrOptions:{errorCorrectionLevel:ecLv}};
    if(img){c.image=img;c.imageOptions={crossOrigin:'anonymous',margin:4,imageSize:ir,hideBackgroundDots:hd}}
    var o=document.getElementById('qo');o.innerHTML='';
    qrI=new QRCodeStyling(c);qrI.append(o);
    document.getElementById('dp').disabled=false;
    document.getElementById('ds').disabled=false;
    document.getElementById('qi').style.display='block';
    document.getElementById('qd').textContent=data.length>60?data.substring(0,60)+'...':data;
}

document.getElementById('dp').onclick=function(){if(qrI){qrI.download({name:'qr-genius',extension:'png'});toast('PNG downloaded!')}};
document.getElementById('ds').onclick=function(){if(qrI){qrI.download({name:'qr-genius',extension:'svg'});toast('SVG downloaded!')}};

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

[['cfg','cfgh'],['cbg','cbgh'],['cc','cch'],['ccd','ccdh']].forEach(function(p){
    var picker=document.getElementById(p[0]),hex=document.getElementById(p[1]);
    picker.oninput=function(){hex.value=picker.value;sched()};
    hex.oninput=function(){var v=hex.value;if(v.charAt(0)!=='#')v='#'+v;if(/^#[0-9a-fA-F]{6}$/.test(v)){picker.value=v;sched()}};
    hex.onblur=function(){var v=hex.value;if(v.charAt(0)!=='#')v='#'+v;if(/^#[0-9a-fA-F]{6}$/.test(v)){hex.value=v;picker.value=v}else{hex.value=picker.value}}});


// ===================== UNDO / REDO =====================
var hist=[],hIdx=-1,maxHist=50,skipSnap=false;
function snap(){
    if(skipSnap)return;
    var s={tab:cTab,dSty:dSty,cSty:cSty,cdSty:cdSty,ecLv:ecLv,selIc:selIc,custImg:custImg,custIconData:custIconData,
        cfg:document.getElementById('cfg').value,cbg:document.getElementById('cbg').value,
        cc:document.getElementById('cc').value,ccd:document.getElementById('ccd').value,
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
    document.querySelectorAll('#dtabs .tab').forEach(function(b){b.classList.toggle('on',b.dataset.tab===cTab)});
    document.querySelectorAll('.tc').forEach(function(c){c.classList.toggle('on',c.id==='tab-'+cTab)});
    [['dsg',dSty],['csg',cSty],['cdsg',cdSty]].forEach(function(g){document.querySelectorAll('#'+g[0]+' .so').forEach(function(o){o.classList.toggle('on',o.dataset.style===g[1])})});
    document.querySelectorAll('#eco .ec').forEach(function(o){o.classList.toggle('on',o.dataset.ec===ecLv)});
    document.querySelectorAll('#icg .io').forEach(function(o){o.classList.toggle('on',o.dataset.icon===selIc)});
    [['cfg','cfgh'],['cbg','cbgh'],['cc','cch'],['ccd','ccdh']].forEach(function(p){document.getElementById(p[0]).value=s[p[0]];document.getElementById(p[1]).value=s[p[0]]});
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

setTimeout(gen,300);
})();
