// Kapibara Love — Nisyyah Khoirotul Ilmiah

// 1. Typing Effect
const typingEl = document.getElementById('typingText');
const phrases = [
  "kamu itu rumah paling nyaman 🦫🏠",
  "senyum kamu sehangat kapibara berendam ✨",
  "terima kasih sudah jadi kamu, Nisyyah 💛",
  "aku sayang kamu — hari ini & dunia yang nanti 🌍"
];
let pIdx=0, cIdx=0, del=false;
function typeLoop(){
  const curr = phrases[pIdx];
  if(!del){
    typingEl.textContent = curr.slice(0,cIdx+1) + "▌";
    cIdx++;
    if(cIdx===curr.length){ setTimeout(()=>{del=true; typeLoop()},1700); return; }
  } else {
    typingEl.textContent = curr.slice(0,cIdx-1) + "▌";
    cIdx--;
    if(cIdx===0){ del=false; pIdx=(pIdx+1)%phrases.length; }
  }
  setTimeout(typeLoop, del? 35 : 70);
}
typeLoop();

// 2. Surat
const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letterContent');
const closeLetter = document.getElementById('closeLetter');
envelope.addEventListener('click', ()=>{
  envelope.classList.add('open');
  letterContent.classList.remove('hidden');
  letterContent.scrollIntoView({behavior:'smooth', block:'center'});
  triggerConfetti();
});
closeLetter.addEventListener('click', ()=>{
  envelope.classList.remove('open');
  letterContent.classList.add('hidden');
  envelope.scrollIntoView({behavior:'smooth', block:'center'});
});

// 3. Bucin Random
const bucins = [
  "“Nisyyah, kamu kayak WiFi kapibara — sekali konek, nggak mau disconnect lagi 📶🦫”",
  "“Kalau kamu kapibara, aku mau jadi air rendamannya — biar nempel terus 💦🤎”",
  "“Nggak perlu jadi sempurna, Nisyyah. Kamu jadi kamu aja udah bikin aku bersyukur tiap hari 🌸”",
  "“Kamu se-adem kapibara siang bolong, se-hangat peluk malam minggu ✨”",
  "“Aku nggak janji selalu romantis, tapi aku janji selalu ada — kayak kapibara setia nungguin temennya 🫶”",
  "“Lihat kamu ketawa aja, capek seharian langsung hilang. Kamu hebat, Nisyyah!”",
  "“Kalau rindu itu berat, biar kapibara yang pikulin bareng aku 🦫💛”",
  "“Kamu itu kayak sunset buat kapibara — dilihat terus nggak pernah bosen 🌅”",
  "“Nisyyah Khoirotul Ilmiah — nama yang paling enak disebut pas kangen 🥺”",
  "“Aku sayang kamu bukan karena kamu gemoy doang, tapi karena hatimu sehangat itu”",
  "“Jadi kapibara aja butuh air hangat, aku butuhnya kamu yang hangat 🤎”",
  "“Semoga harimu se-tenang kapibara yang lagi ngambang, Nisyyah 😌🫧”",
  "“Kamu itu alasan kenapa aku percaya dunia yang nanti itu indah — karena ada kamu di sana 🌍”",
  "“Kalau cinta itu kompetisi renang, kapibara dan aku juara 1 — renang ke hatimu terus 🏊‍♂️💛”",
  "“Nisyyah, kamu nggak perlu khawatir. Aku di sini, kayak kapibara yang nggak pernah ninggalin koloninya”",
  "“Gemoy kamu itu level kapibara pakai topi jeruk 🍊 — nggak ada lawan!”",
  "“Terima kasih ya sudah kuat sejauh ini. Aku bangga banget sama kamu, sayang 💪🤎”",
  "“Kalau ada 100 kapibara di dunia, aku tetap pilih kamu yang paling gemoy”",
  "“Peluk virtual dari kapibara paling sayang kamu — 🤗🦫”",
  "“Dunia boleh berisik, tapi di dekat kamu semua jadi tenang. Kamu rumahku, Nisyyah 🏠”"
];
const bucinDisplay = document.getElementById('bucinDisplay');
const bucinBtn = document.getElementById('bucinBtn');
bucinBtn.addEventListener('click', ()=>{
  const pick = bucins[Math.floor(Math.random()*bucins.length)];
  bucinDisplay.innerHTML = `<p class="font-bold text-lg animate-pulse">${pick}</p>`;
  spawnHearts(6);
});

function spawnHearts(n=8){
  const container = document.getElementById('hearts-container');
  const emojis = ['💛','🤎','💖','✨','🦫','🌸'];
  for(let i=0;i<n;i++){
    const h = document.createElement('div');
    h.className='heart';
    h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    h.style.left = (Math.random()*90+5)+'vw';
    h.style.top = (Math.random()*20+60)+'vh';
    h.style.fontSize = (Math.random()*10+18)+'px';
    container.appendChild(h);
    setTimeout(()=>h.remove(),2600);
  }
}
function triggerConfetti(){ spawnHearts(14); }
window.triggerConfetti = triggerConfetti;
// hearts on click anywhere cute
document.addEventListener('click', (e)=>{
  if(e.target.closest('button') || e.target.closest('a')) spawnHearts(3);
});

// 4. Gallery - editable via upload + localStorage
const defaultGallery = [
  { caption:"Foto pertama kita 📸 — klik untuk ganti", placeholder:"🦫", color:"bg-peach" },
  { caption:"Senyum Nisyyah yang paling gemoy 😆", placeholder:"🌸", color:"bg-cream" },
  { caption:"Momen random tapi berkesan 💛", placeholder:"✨", color:"bg-sage/20" },
  { caption:"Kapibara approved! Approved gemoy 🦫", placeholder:"🍃", color:"bg-milktea" },
  { caption:"Dunia yang nanti — kita berdua 🌍", placeholder:"💌", color:"bg-peach/60" },
  { caption:"Klik aku untuk upload foto kamu!", placeholder:"📷", color:"bg-white" },
];
const galleryGrid = document.getElementById('galleryGrid');
const STORAGE_KEY = 'nisyyah_gallery_v2';
const CAPTION_KEY = 'nisyyah_captions_v2';

function loadGallery(){
  let saved = null;
  try{ saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); }catch{}
  let captions = null;
  try{ captions = JSON.parse(localStorage.getItem(CAPTION_KEY)); }catch{}
  galleryGrid.innerHTML='';
  defaultGallery.forEach((item, idx)=>{
    const imgData = saved && saved[idx] ? saved[idx] : null;
    const cap = captions && captions[idx] ? captions[idx] : item.caption;
    const card = document.createElement('div');
    card.className='gallery-card group';
    card.innerHTML = `
      <div class="gallery-img-wrap ${item.color}" data-idx="${idx}">
        ${imgData ? `<img src="${imgData}" alt="foto ${idx+1}" loading="lazy">` : `<div class="gallery-placeholder">${item.placeholder}</div>`}
        <div class="upload-badge">📸 klik ganti</div>
        <input type="file" accept="image/*" class="hidden file-input" data-idx="${idx}">
      </div>
      <textarea class="caption-edit" data-cap-idx="${idx}" rows="2">${cap}</textarea>
      <div class="px-3 pb-3 flex gap-2 justify-center">
        <button class="view-btn text-xs font-bold bg-cream border border-milktea px-3 py-1 rounded-full" data-view="${idx}">👁️ Lihat</button>
        <button class="del-btn text-xs font-bold bg-white border border-red-200 px-3 py-1 rounded-full" data-del="${idx}">🗑️ Hapus</button>
      </div>
    `;
    galleryGrid.appendChild(card);
  });
  attachGalleryEvents();
}

function attachGalleryEvents(){
  document.querySelectorAll('.gallery-img-wrap').forEach(el=>{
    el.addEventListener('click', (e)=>{
      if(e.target.closest('button')) return;
      const idx = el.dataset.idx;
      const input = document.querySelector(`.file-input[data-idx="${idx}"]`);
      input.click();
    });
  });
  document.querySelectorAll('.file-input').forEach(inp=>{
    inp.addEventListener('change', (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const reader = new FileReader();
      reader.onload = ()=>{
        saveImage(inp.dataset.idx, reader.result);
      };
      reader.readAsDataURL(file);
    });
  });
  document.querySelectorAll('.caption-edit').forEach(txt=>{
    txt.addEventListener('input', ()=>{
      const idx = txt.dataset.capIdx;
      const all = getCaptions();
      all[idx]=txt.value;
      localStorage.setItem(CAPTION_KEY, JSON.stringify(all));
    });
    txt.addEventListener('click', (e)=> e.stopPropagation());
  });
  document.querySelectorAll('.view-btn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      e.stopPropagation();
      const idx = b.dataset.view;
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
      const caps = getCaptions();
      const src = saved[idx];
      if(src) openLightbox(src, caps[idx]);
      else alert('Belum ada foto di sini — klik kotak fotonya untuk upload dulu ya, Nisyyah! 🦫');
    });
  });
  document.querySelectorAll('.del-btn').forEach(b=>{
    b.addEventListener('click', (e)=>{
      e.stopPropagation();
      const idx = b.dataset.del;
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
      saved[idx]=null;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      loadGallery();
    });
  });
}
function getCaptions(){
  let caps;
  try{ caps = JSON.parse(localStorage.getItem(CAPTION_KEY)); }catch{ caps=null; }
  if(!caps || caps.length !== defaultGallery.length){
    caps = defaultGallery.map(d=>d.caption);
  }
  return caps;
}
function saveImage(idx, dataUrl){
  let saved;
  try{ saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); }catch{ saved=null; }
  if(!Array.isArray(saved) || saved.length!==defaultGallery.length) saved = Array(defaultGallery.length).fill(null);
  saved[idx]=dataUrl;
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }catch(e){
    alert('Gagal simpan — foto mungkin terlalu besar. Coba foto yang lebih kecil ya 🥺');
    return;
  }
  loadGallery();
  spawnHearts(5);
}

// bulk upload
document.getElementById('bulkUpload').addEventListener('change', (e)=>{
  const files = [...e.target.files].slice(0,6);
  let saved;
  try{ saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); }catch{ saved=null; }
  if(!Array.isArray(saved) || saved.length!==defaultGallery.length) saved = Array(defaultGallery.length).fill(null);
  let emptyIdx = saved.findIndex(v=>!v);
  if(emptyIdx===-1) emptyIdx=0;
  files.forEach((file,i)=>{
    const reader = new FileReader();
    reader.onload = ()=>{
      const target = (emptyIdx+i) % defaultGallery.length;
      saved[target]=reader.result;
      if(i===files.length-1){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
        loadGallery();
      }
    };
    reader.readAsDataURL(file);
  });
});
document.getElementById('resetGallery').addEventListener('click', ()=>{
  if(confirm('Reset semua foto ke kapibara gemoy?')){
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CAPTION_KEY);
    loadGallery();
  }
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
function openLightbox(src, cap){
  lightboxImg.src = src;
  lightboxCaption.textContent = cap;
  lightbox.classList.remove('hidden');
  lightbox.classList.add('flex');
}
document.getElementById('closeLightbox').addEventListener('click', closeLb);
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLb(); });
function closeLb(){ lightbox.classList.add('hidden'); lightbox.classList.remove('flex'); }

// 5. Music — YouTube + MP3 fallback
const ytPlayer = document.getElementById('ytPlayer');
const playBtn = document.getElementById('playBtn');
const playStatus = document.getElementById('playStatus');
const musicToggleNav = document.getElementById('musicToggleNav');
const navMusicIcon = document.getElementById('navMusicIcon');
let isPlaying=false;

// Use postMessage to control YouTube if possible, fallback to reload with autoplay
function ytCommand(func){
  try{
    ytPlayer.contentWindow.postMessage(JSON.stringify({event:'command', func: func, args: []}), '*');
  }catch{}
}
let ytReady=false;
playBtn.addEventListener('click', toggleMusic);
musicToggleNav.addEventListener('click', toggleMusic);
function toggleMusic(){
  const fallbackAudio = document.getElementById('audioFallback');
  const hasMp3 = fallbackAudio.src && !fallbackAudio.classList.contains('hidden');
  if(hasMp3){
    if(fallbackAudio.paused){ fallbackAudio.play(); isPlaying=true; }
    else { fallbackAudio.pause(); isPlaying=false; }
    updatePlayUI();
    return;
  }
  // YouTube
  if(!isPlaying){
    // add autoplay
    if(!ytPlayer.src.includes('autoplay=1')){
      ytPlayer.src = ytPlayer.src + (ytPlayer.src.includes('?')?'&':'?') + 'autoplay=1&mute=0';
    }
    ytCommand('playVideo');
    isPlaying=true;
    ytPlayer.scrollIntoView({behavior:'smooth', block:'center'});
  } else {
    ytCommand('pauseVideo');
    // we keep UI as playing because YT iframe without API won't pause reliably — just toggle UI
    isPlaying=false;
  }
  updatePlayUI();
}
function updatePlayUI(){
  playBtn.textContent = isPlaying ? '⏸️' : '▶️';
  playStatus.textContent = isPlaying? 'Pause' : 'Play';
  navMusicIcon.textContent = isPlaying? '⏸️' : '🎵';
  musicToggleNav.classList.toggle('bg-terra', !isPlaying);
  musicToggleNav.classList.toggle('bg-sage', isPlaying);
  if(isPlaying) spawnHearts(5);
}

document.getElementById('ytUpdate').addEventListener('click', ()=>{
  const val = document.getElementById('ytInput').value.trim();
  if(!val) return;
  let id='';
  try{
    const url = new URL(val);
    if(url.hostname.includes('youtu.be')) id = url.pathname.slice(1);
    else if(url.searchParams.get('v')) id = url.searchParams.get('v');
    else id = val;
  }catch{ id = val; }
  id = id.split('&')[0].split('?')[0].split('/').pop();
  if(id.length<5){ alert('Link YouTube tidak valid'); return; }
  ytPlayer.src = `https://www.youtube.com/embed/${id}?enablejsapi=1`;
  isPlaying=false; updatePlayUI();
});

const mp3Upload = document.getElementById('mp3Upload');
const mp3Name = document.getElementById('mp3Name');
const audioFallback = document.getElementById('audioFallback');
mp3Name.addEventListener('click', ()=> mp3Upload.click());
mp3Upload.addEventListener('change', (e)=>{
  const f = e.target.files[0];
  if(!f) return;
  const url = URL.createObjectURL(f);
  audioFallback.src = url;
  audioFallback.classList.remove('hidden');
  mp3Name.textContent = '🎵 ' + f.name + ' — klik play di atas!';
  // auto play via fallback
  audioFallback.play().then(()=>{ isPlaying=true; updatePlayUI(); }).catch(()=>{});
});

// 6. Timeline edit
document.getElementById('editTimelineBtn').addEventListener('click', ()=>{
  const t = prompt('Tulis cerita timeline versimu (akan disimpan di browser):\nContoh: 12 Feb 2024 - First meet di kampus ✨');
  if(t) {
    localStorage.setItem('nisyyah_timeline_custom', t);
    alert('Tersimpan! Refresh untuk lihat — atau aku bisa bikinin editor yang lebih canggih kalau mau, Nisyyah 🦫');
  }
});
const customTimeline = localStorage.getItem('nisyyah_timeline_custom');
if(customTimeline){
  // inject under timeline
  const sec = document.querySelector('section:has(#editTimelineBtn)') || document.body;
}

// init Gallery
loadGallery();

// Easter egg: konami?
let kCount=0;
document.addEventListener('keydown', (e)=>{
  if(e.key==='k' || e.key==='K'){ kCount++; if(kCount>3){ spawnHearts(20); kCount=0; } }
});
