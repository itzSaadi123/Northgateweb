(function() {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    var fa = document.createElement('link');
    fa.rel = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(fa);
  }

  var style = document.createElement('style');
  style.innerHTML = `
  #ng-chat-btn {
    position: fixed !important;
    bottom: 28px !important;
    right: 28px !important;
    width: 62px !important;
    height: 62px !important;
    border-radius: 50% !important;
    background: linear-gradient(135deg, #c0392b, #1e3a8a) !important;
    border: none !important;
    cursor: pointer !important;
    box-shadow: 0 6px 24px rgba(0,0,0,0.22) !important;
    animation: ng-glow 2.5s infinite !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    z-index: 99999 !important;
    transition: transform 0.2s, box-shadow 0.2s !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  #ng-chat-btn:hover { transform: scale(1.07) !important; }
  @keyframes ng-glow {
    0%, 100% { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 0 0 rgba(192,57,43,0.5); }
    50% { box-shadow: 0 6px 24px rgba(0,0,0,0.22), 0 0 18px 8px rgba(192,57,43,0.25); }
  }
  #ng-chat-btn i { color: white !important; font-size: 26px !important; }
  #ng-chat-btn .ng-badge {
    position: absolute !important;
    top: 3px !important; right: 3px !important;
    background: #22c55e !important;
    width: 14px !important; height: 14px !important;
    border-radius: 50% !important;
    border: 2px solid white !important;
    animation: ng-pulse 2s infinite !important;
  }
  @keyframes ng-pulse {
    0%,100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
  }
  #ng-chat-box {
    position: fixed !important;
    bottom: 102px !important;
    right: 28px !important;
    width: 370px !important;
    max-height: 540px !important;
    border-radius: 20px !important;
    background: #fff !important;
    box-shadow: 0 12px 50px rgba(0,0,0,0.18) !important;
    z-index: 99998 !important;
    display: none !important;
    flex-direction: column !important;
    overflow: hidden !important;
    font-family: Inter, sans-serif !important;
    border: 1px solid #e5e7eb !important;
  }
  #ng-chat-box.ng-open {
    display: flex !important;
    animation: ng-slideUp 0.28s ease;
  }
  @keyframes ng-slideUp {
    from { opacity: 0; transform: translateY(18px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .ng-header {
    background: linear-gradient(135deg, #b91c1c, #1e3a8a) !important;
    padding: 14px 18px !important;
    display: flex !important;
    align-items: center !important;
    gap: 11px !important;
    flex-shrink: 0 !important;
  }
  .ng-avatar {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; color: white;
    border: 2px solid rgba(255,255,255,0.4);
    flex-shrink: 0;
  }
  .ng-header-info { flex: 1; }
  .ng-header-info h4 { color: white !important; font-size: 14px !important; font-weight: 700 !important; line-height: 1.2 !important; margin: 0 !important; }
  .ng-header-info span { color: rgba(255,255,255,0.75) !important; font-size: 11px !important; display: flex !important; align-items: center !important; gap: 4px !important; }
  .ng-header-info span::before { content:''; width:7px; height:7px; border-radius:50%; background:#4ade80; display:inline-block; }
  .ng-close-btn {
    background: rgba(255,255,255,0.15) !important;
    border: none !important; cursor: pointer !important;
    color: white !important; font-size: 16px !important;
    width: 30px !important; height: 30px !important;
    border-radius: 50% !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
    flex-shrink: 0 !important; padding: 0 !important;
  }
  .ng-messages {
    flex: 1 !important;
    overflow-y: auto !important;
    padding: 16px 14px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    background: #f8fafc !important;
  }
  .ng-msg {
    max-width: 86%;
    padding: 9px 13px;
    border-radius: 16px;
    font-size: 13px !important;
    line-height: 1.55 !important;
    word-break: break-word;
    margin: 0 !important;
  }
  .ng-msg.ng-bot {
    background: white !important;
    border: 1px solid #e5e7eb !important;
    border-bottom-left-radius: 4px !important;
    color: #1e293b !important;
    align-self: flex-start !important;
  }
  .ng-msg.ng-user {
    background: linear-gradient(135deg, #b91c1c, #1e3a8a) !important;
    color: white !important;
    border-bottom-right-radius: 4px !important;
    align-self: flex-end !important;
  }
  .ng-msg a { color: #1e3a8a; font-weight: 600; text-decoration: underline; }
  .ng-msg.ng-user a { color: #bfdbfe; }
  .ng-quick-btns {
    display: flex !important;
    flex-wrap: wrap !important;
    gap: 6px !important;
    padding: 0 14px 10px !important;
    background: #f8fafc !important;
  }
  .ng-qbtn {
    background: white !important;
    border: 1.5px solid #e2e8f0 !important;
    color: #1e3a8a !important;
    font-size: 11.5px !important;
    font-weight: 600 !important;
    padding: 5px 11px !important;
    border-radius: 20px !important;
    cursor: pointer !important;
    white-space: nowrap !important;
    font-family: Inter, sans-serif !important;
  }
  .ng-qbtn:hover { background: #1e3a8a !important; color: white !important; }
  .ng-input-row {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    padding: 10px 12px !important;
    border-top: 1px solid #e5e7eb !important;
    background: white !important;
    flex-shrink: 0 !important;
  }
  #ng-user-input {
    flex: 1 !important;
    border: 1.5px solid #e2e8f0 !important;
    border-radius: 22px !important;
    padding: 8px 14px !important;
    font-size: 13px !important;
    color: #1e293b !important;
    outline: none !important;
    background: #f8fafc !important;
    font-family: Inter, sans-serif !important;
  }
  #ng-user-input:focus { border-color: #1e3a8a !important; background: white !important; }
  #ng-send-btn {
    width: 36px !important; height: 36px !important;
    border-radius: 50% !important;
    background: linear-gradient(135deg, #b91c1c, #1e3a8a) !important;
    border: none !important; cursor: pointer !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
    flex-shrink: 0 !important; padding: 0 !important;
  }
  #ng-send-btn i { color: white !important; font-size: 13px !important; }
  .ng-typing {
    display: flex; gap: 4px; align-items: center;
    padding: 9px 14px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    border-bottom-left-radius: 4px;
    align-self: flex-start;
    width: fit-content;
  }
  .ng-typing span {
    width: 7px; height: 7px; border-radius: 50%;
    background: #94a3b8;
    animation: ng-bounce 1.1s infinite;
  }
  .ng-typing span:nth-child(2) { animation-delay: 0.18s; }
  .ng-typing span:nth-child(3) { animation-delay: 0.36s; }
  @keyframes ng-bounce {
    0%,80%,100% { transform: translateY(0); }
    40% { transform: translateY(-5px); }
  }
  @media (max-width: 768px) {
    #ng-chat-box { width: calc(100vw - 20px) !important; right: 10px !important; bottom: 88px !important; }
    #ng-chat-btn { right: 16px !important; bottom: 16px !important; width: 62px !important; height: 62px !important; }
    #ng-chat-btn i { font-size: 26px !important; }
  }
  `;
  document.head.appendChild(style);

  var wrapper = document.createElement('div');
  wrapper.innerHTML = `
<button id="ng-chat-btn" onclick="toggleChat()" aria-label="Open chat">
  <i class="fa-solid fa-comments" id="ng-btn-icon"></i>
  <div class="ng-badge"></div>
</button>
<div id="ng-chat-box">
  <div class="ng-header">
    <div class="ng-avatar" style="overflow:hidden;padding:2px;background:white !important;border-radius:50% !important;">
      <img src="https://northgatevisaservices.com/logo.webp" style="width:34px;height:34px;object-fit:contain;display:block;border-radius:50%;">
    </div>
    <div class="ng-header-info">
      <h4>NorthGate Support</h4>
      <span>Online — Typically replies instantly</span>
    </div>
    <button class="ng-close-btn" onclick="toggleChat()"><i class="fa-solid fa-xmark"></i></button>
  </div>
  <div class="ng-messages" id="ng-messages"></div>
  <div class="ng-quick-btns" id="ng-quick-btns">
    <button class="ng-qbtn" onclick="ngQuickAsk('Services')">📋 Services</button>
    <button class="ng-qbtn" onclick="ngQuickAsk('Fees')">💰 Fees</button>
    <button class="ng-qbtn" onclick="ngQuickAsk('Apply')">📝 How to Apply</button>
    <button class="ng-qbtn" onclick="ngQuickAsk('Umrah')">🕌 Umrah</button>
    <button class="ng-qbtn" onclick="ngQuickAsk('Student Visa')">🎓 Student Visa</button>
    <button class="ng-qbtn" onclick="ngQuickAsk('Track Application')">📍 Track Application</button>
  </div>
  <div class="ng-input-row">
    <input type="text" id="ng-user-input" placeholder="Type your question..." onkeydown="if(event.key==='Enter') ngSendMsg()">
    <button id="ng-send-btn" onclick="ngSendMsg()"><i class="fa-solid fa-paper-plane"></i></button>
  </div>
</div>`;
  document.body.appendChild(wrapper);

  const KB = [
    { keys: ["government","affiliated","official","state department","ircc","embassy","endorsed"], ans: "NorthGate Visa Service Center is a <strong>private and independent</strong> firm. We are <strong>not affiliated</strong> with or endorsed by the U.S. Department of State, IRCC, or any government body." },
    { keys: ["guarantee","guaranteed","sure","confirm","100%","approval","promise","will i get"], ans: "We do <strong>not guarantee</strong> visa approval — that decision is solely at the discretion of the respective embassy or immigration authority. We do not make false promises. Our job is to prepare your case as strongly as possible." },
    { keys: ["service","provide","offer","what do you do","help","assistance","what can"], ans: "We provide:<br>✅ Visa application form assistance<br>✅ Documentation review<br>✅ Interview preparation guidance<br>✅ General process consultation<br>✅ Student visa & university admission processing<br>✅ Umrah package bookings" },
    { keys: ["speed up","fast","expedite","urgent","quickly","quick","how long","processing time","how many days"], ans: "Processing times are determined entirely by the relevant <strong>embassy or immigration authority</strong>. We cannot speed up or influence their timelines." },
    { keys: ["fake","sponsor","sponsorship","invitation letter","fake document","false document"], ans: "We <strong>do not</strong> provide fake documents, sponsorship letters, or invitation arrangements of any kind. We follow a strictly ethical and transparent approach." },
    { keys: ["registered","secp","fbr","legal","company","official company","license"], ans: "Yes! NorthGate Visa Service Center is <strong>officially registered</strong> with both <strong>SECP</strong> (Securities and Exchange Commission of Pakistan) and <strong>FBR</strong>." },
    { keys: ["fee","fees","cost","charge","price","how much","payment","service fee","pay","rate"], ans: "Our service fees vary by visa category. <strong>Government/embassy fees are paid separately</strong> by the applicant. For exact fee details, feel free to email us at <a href='mailto:support@northgatevisaservices.com'>support@northgatevisaservices.com</a> with your destination country and visa type." },
    { keys: ["refused","rejected","refusal","denied","visa refused","what if refused","reapply"], ans: "Visa decisions are made by government authorities. If your visa is refused, we can <strong>review the refusal reason</strong> and provide strategic guidance for a reapplication." },
    { keys: ["personal","information","data","secure","confidential","privacy","safe"], ans: "Yes — we maintain <strong>strict confidentiality</strong> of all personal and application data shared with us." },
    { keys: ["apply","how to apply","start","begin","process","procedure","application form","submit form"], ans: "To apply, select your country:<br><br>🇺🇸 <a href='https://northgatevisaservicecenter.github.io/U.S_Form/' target='_blank'>U.S. Visa Form</a><br>🇨🇦 <a href='https://northgatevisaservicecenter.github.io/Canada_form/' target='_blank'>Canada Visa Form</a><br>🇮🇹 <a href='https://northgatevisaservicecenter.github.io/Italy_form/' target='_blank'>Italy Visa Form</a><br>🌍 <a href='https://northgatevisaservices.com/countries.html' target='_blank'>Other Countries</a><br><br>After submission, our team contacts you within <strong>24 hours</strong>." },
    { keys: ["us visa","usa","U.S","america","american","united states","b1","b2","f1","tourist","work visa us"], ans: "We assist with <strong>U.S. Visa applications</strong> including tourist (B1/B2), student (F1), and other categories. Fill the form here: <a href='https://northgatevisaservicecenter.github.io/U.S_Form/' target='_blank'>U.S. Visa Form</a>" },
    { keys: ["canada","canadian","pr","permanent resident","canada visa"], ans: "We assist with <strong>Canada Visa applications</strong>. Fill the form here: <a href='https://northgatevisaservicecenter.github.io/Canada_form/' target='_blank'>Canada Visa Form</a><br>Our team will review your case within 24 hours." },
    { keys: ["italy","italian"], ans: "We assist with <strong>Italy Visa applications</strong>. Fill the form here: <a href='https://northgatevisaservicecenter.github.io/Italy_form/' target='_blank'>Italy Visa Form</a>" },
    { keys: ["schengen","europe","european","germany","france","spain","netherlands","belgium"], ans: "We assist with <strong>Schengen Visa applications</strong>. Click here: <a href='https://northgatevisaservices.com/countries.html' target='_blank'>Schengen Visa →</a>" },
    { keys: ["countries","which countries","available","worldwide","other countries","all countries"], ans: "We assist with visas for <strong>U.S., Canada, Italy, Schengen countries</strong>, and many more worldwide. See the full list here: <a href='https://northgatevisaservices.com/countries.html' target='_blank'>All Countries</a>" },
    { keys: ["track","tracking","status","application status","where is","check status","tracker"], ans: "You can track your application live using your <strong>Tracking ID (NGV-2026...)</strong> here: <a href='https://northgatevisaservices.com/Tracker.html' target='_blank'>Track My Application →</a>" },
    { keys: ["student visa","study abroad","student","university","admission","college","study","education","academic"], ans: "We provide <strong>complete student visa &amp; university admission processing</strong>:<br>✅ Profile evaluation &amp; university shortlisting<br>✅ Admission application<br>✅ Offer letter assistance<br>✅ Visa file preparation &amp; interview guidance<br><br>Learn more: <a href='https://northgatevisaservices.com/student-visa.html' target='_blank'>Student Visa Page →</a>" },
    { keys: ["umrah","makkah","madinah","mecca","medina","hajj","saudi","holy","ziyarat","spiritual","umrah price","umrah cost"], ans: "We offer a <strong>15-Day Umrah Package (June–July 2026)</strong>:<br><br>🕌 <strong>3-Star:</strong> PKR 135,000/person<br>⭐ <strong>4-Star:</strong> PKR 160,000 (Triple) | PKR 175,000 (Double)<br>🌟 <strong>5-Star:</strong> PKR 190,000 (Triple) | PKR 210,000 (Double)<br>💎 <strong>5-Star Premium</strong> (Haram View): PKR 250,000/person<br><br>Includes: Return air tickets, Umrah visa, hotel, airport transfers.<br><br><a href='https://northgatevisaservices.com/umrah-package.html' target='_blank'>Full Package Details →</a>" },
    { keys: ["contact","phone","number","whatsapp","call","reach","email","address","location"], ans: "You can reach us through:<br><br>📱 <strong>WhatsApp:</strong> <a href='https://wa.me/923452613587' target='_blank'>+92 345 2613587</a><br>📧 <strong>Email:</strong> <a href='mailto:support@northgatevisaservices.com'>support@northgatevisaservices.com</a><br>🕐 <strong>Hours:</strong> Mon–Sat, 9AM – 7PM" },
    { keys: ["24 hours","response","reply","when","how soon","long wait","wait"], ans: "Our team typically responds within <strong>24 hours</strong> of form submission. For immediate queries, email us at <a href='mailto:support@northgatevisaservices.com'>support@northgatevisaservices.com</a>." },
    { keys: ["document","documents","required","what documents","checklist","passport","ielts","bank statement"], ans: "Required documents vary by visa type and destination. After form submission, our officer will provide a <strong>complete personalised checklist</strong> within 24 hours. For urgent queries, email us at <a href='mailto:support@northgatevisaservices.com'>support@northgatevisaservices.com</a>." },
    { keys: ["interview","embassy interview","preparation","mock","practice","tips"], ans: "Yes, we provide <strong>expert interview preparation</strong> — structured coaching to help you answer confidently and correctly. This is included in our service package." },
    { keys: ["challan","mcb","bank","payment","pay fee","bank challan","how to pay"], ans: "After your case review, you will receive a <strong>fee challan on your registered email</strong>. Pay at any nearest <strong>MCB Bank branch</strong>. You'll receive a confirmation email within 24 hours." },
    { keys: ["terms","condition","policy","terms and conditions","refund","cancellation"], ans: "Please read our full terms and conditions here: <a href='https://northgatevisaservices.com/terms.html' target='_blank'>Terms & Conditions →</a>" },
    { keys: ["about","who are you","northgate","company","team","about us","background"], ans: "NorthGate Visa Service Center is an <strong>independent, ethical, and transparent</strong> visa consultancy registered with SECP &amp; FBR. We specialise in U.S. and Canada visas, with assistance available worldwide. <a href='https://northgatevisaservices.com/about.html' target='_blank'>About us →</a>" },
    { keys: ["walikum","waliakum","walaikum","wa alaikum","وعلیکم"], ans: [
      "Wa Alaikum! 😊 How can we help you today?",
      "Wa Alaikum wa Rahmatullahi! 🌟 What can we assist you with?",
      "Wa Alaikum! Feel free to ask us anything!"
    ]},
    { keys: ["hello","hi","hey","good morning","good afternoon","good evening","helo","hii","sup"], ans: [
      "Assalam o Alaikum! 👋 Welcome to <strong>NorthGate Visa Service Center</strong>. How can we help you today?",
      "Hello! 😊 How can we assist you today? Feel free to ask about our visa services, fees, or Umrah packages!",
      "Hi there! Welcome to NorthGate. Ask us anything about visa applications, student visas, or Umrah packages!",
      "Assalam o Alaikum! 🌟 Glad you reached out. What can we help you with today?"
    ]},
    { keys: ["thank","thanku","thanks","thankyou","thank you","shukriya","jazakallah"], ans: [
      "You're most welcome! 😊 Feel free to email us at <a href='mailto:support@northgatevisaservices.com'>support@northgatevisaservices.com</a> for further help.",
      "Jazakallah Khair! 🌟 We are always here to help. Email us anytime at <a href='mailto:support@northgatevisaservices.com'>support@northgatevisaservices.com</a>.",
      "Our pleasure! 😊 If you have more questions, we are happy to assist.",
      "You're welcome! Don't hesitate to reach out anytime — we are here for you."
    ]}
  ];

  let ngIsOpen = false;
  let ngGreeted = false;

  window.toggleChat = function() {
    ngIsOpen = !ngIsOpen;
    const box = document.getElementById('ng-chat-box');
    const icon = document.getElementById('ng-btn-icon');
    if (ngIsOpen) {
      box.classList.add('ng-open');
      icon.className = 'fa-solid fa-xmark';
      if (!ngGreeted) {
        ngGreeted = true;
        setTimeout(() => {
          ngAddMsg('bot', "👋 Greetings from <strong>NorthGate Visa Service Center</strong>.<br><br>Welcome to our official support assistant. We are here to assist you with visa services, application procedures, service packages, and general guidance throughout your application process.<br><br>How may we assist you today?");
        }, 350);
      }
      setTimeout(() => {
        const msgs = document.getElementById('ng-messages');
        msgs.scrollTop = msgs.scrollHeight;
        document.getElementById('ng-user-input').focus();
      }, 400);
    } else {
      box.classList.remove('ng-open');
      icon.className = 'fa-solid fa-comments';
    }
  };

  function ngAddMsg(who, text) {
    const msgs = document.getElementById('ng-messages');
    const div = document.createElement('div');
    div.className = 'ng-msg ng-' + who;
    div.innerHTML = text;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function ngShowTyping() {
    const msgs = document.getElementById('ng-messages');
    const t = document.createElement('div');
    t.className = 'ng-typing';
    t.id = 'ng-typing-indicator';
    t.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(t);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function ngHideTyping() {
    const t = document.getElementById('ng-typing-indicator');
    if (t) t.remove();
  }

  function ngFindAnswer(input) {
    const q = input.toLowerCase().trim();
    let best = null, bestScore = 0;
    for (const item of KB) {
      let score = 0;
      for (const k of item.keys) {
        if (q.includes(k)) score += k.split(' ').length + 1;
      }
      if (score > bestScore) { bestScore = score; best = item; }
    }
    if (!best) return null;
    if (Array.isArray(best.ans)) {
      return best.ans[Math.floor(Math.random() * best.ans.length)];
    }
    return best.ans;
  }

  window.ngSendMsg = function() {
    const inp = document.getElementById('ng-user-input');
    const text = inp.value.trim();
    if (!text) return;
    inp.value = '';
    ngAddMsg('user', text);
    ngShowTyping();
    setTimeout(() => {
      ngHideTyping();
      const ans = ngFindAnswer(text);
      if (ans) {
        ngAddMsg('bot', ans);
      } else {
        ngAddMsg('bot', "For further details on this, feel free to email us at <a href='mailto:support@northgatevisaservices.com'><strong>support@northgatevisaservices.com</strong></a> — we are happy to assist you.");
      }
    }, 800 + Math.random() * 400);
  };

  window.ngQuickAsk = function(topic) {
    document.getElementById('ng-user-input').value = topic;
    ngSendMsg();
    document.getElementById('ng-quick-btns').style.display = 'none';
  };

})();