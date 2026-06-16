// JavaScript Logic for Jun Wei Liu's Geek Portfolio

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Theme Toggle (Dark / Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    htmlElement.setAttribute('data-theme', initialTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 3. Language switcher & Translation tables
    const translations = {
        'zh-TW': {
            // Nav
            'nav_about': '關於我',
            'nav_skills': '專業技能',
            'nav_projects': '專案作品',
            'nav_friends': '技術夥伴',
            'nav_contact': '聯絡我',
            // Hero
            'hero_badge': 'Uptime: 100% | Available for collaboration',
            'hero_title': '我是 <span class="gradient-text">劉峻瑋 (Jun Wei)</span><br>一個熱愛挑戰的極客',
            'hero_subtitle': '專注於 <strong class="highlight">網路工程</strong> 與 <strong class="highlight">AIoT 邊緣運算</strong>，熱衷於底層虛擬化、網路基礎設施建置，以及軟硬體整合的數位製造實作者。',
            'hero_btn_projects': '瀏覽作品',
            'hero_btn_contact': '與我聯絡',
            // About Me Section
            'about_title': '關於我',
            'about_tagline': '底層探索與數位製造的實踐者',
            'about_role': 'Network & AIoT Developer',
            'about_email_title': '發送 Email / 複製位址',
            'about_card_bg_title': '個人背景',
            'about_card_bg_text': '我目前是電子工程系的學生，專注於網路工程 (Network Engineering) 與 AIoT 邊緣運算。我喜歡拆解複雜的系統架構，探究硬體、韌體、網路到上層軟體的溝通機制。對我而言，將數位程式碼與實體硬體世界連結，是無與倫比的樂趣。',
            'about_card_edu_title': '教育與經歷',
            'about_card_phil_title': '開發哲學',
            'about_card_phil_text': '「專業、穩健、極客精神」。面對複雜的基礎設施架構與除錯挑戰，我秉持系統化的思考方式，以穩健的方式部署環境，並以極客精神追求極限效能與自動化。',
            // Timeline badges
            'timeline_upcoming': '即將',
            'timeline_current': '目前',
            'timeline_past': '經歷',
            // Timeline details
            'timeline_edu_ms': '雲林縣虎尾科技大學 電子工程系 碩士班',
            'timeline_edu_ms_desc': '深造嵌入式系統與 AIoT 領域',
            'timeline_edu_bs': '雲林縣虎尾科技大學 電子工程系',
            'timeline_edu_bs_desc': '主修電子工程，專注於邊緣運算、軟硬體整合、影像辨識及無人機控制系統開發。',
            'timeline_exp_gov': '雲林縣政府',
            'timeline_exp_gov_desc': '於雲林縣政府服務，累積實務管理運作經驗。',
            'timeline_edu_5yr': '雲林縣虎尾科技大學 電子工程科',
            'timeline_edu_5yr_desc': '電子工程科五專部學業，奠定扎實的電子電路與硬體分析基礎。',
            'timeline_edu_vs': '雲林縣西螺農工 電子科',
            'timeline_edu_vs_desc': '高職電子科啟蒙，學習微控制器開發與基礎電子理論。',
            // Terminal Simulator command outputs
            'term_help': `可用指令:
  neofetch    - 顯示個人基本資訊與主機狀態
  experience  - 查詢個人經歷與求學背景
  skills      - 查詢專業技能樹詳情
  projects    - 查詢精選專案摘要
  contact     - 顯示所有聯絡管道
  clear       - 清除終端機畫面
  gui         - 滾動網頁至圖形化介面 (About me)
  help        - 顯示此指令選單
`,
            'term_experience': `=== 個人經歷與求學背景 (Timeline) ===
- [即將] 雲林縣虎尾科技大學 電子工程系 碩士班
- [目前] 雲林縣虎尾科技大學 電子工程系 (專注於邊緣運算、軟硬體整合、影像辨識及無人機控制)
- [經歷] 雲林縣政府 (服務並累積實務經驗)
- [經歷] 雲林縣虎尾科技大學 電子工程科
- [經歷] 雲林縣西螺農工 電子科
`,
            'term_skills': `=== 專業技能清單 (Network & AIoT Labs) ===
[網路與基礎設施]
- Proxmox VE 虛擬化 (90%) - 多節點集群、VM/LXC 架構
- OpenWrt 軟路由 (90%) - VLAN、動態路由、VPN、智慧分流
- Docker 容器化 (85%) - Compose 編排、服務微運行
- 網路安全拓撲 (80%) - 防火牆防禦、網段安全隔離

[軟體與 AIoT 邊緣運算]
- ROS 2 機器人系統 (65%) [進修中] - 無人機室內自主飛行導航控制
- Embedded C++/Python (80%) - ESP32, STM32, Jetson, Raspberry Pi
- 邊緣端 AI 推論 (65%) - YOLOv8 即時目標偵測部署
- Linux 運維 / Git (80%) - Bash/Ansible 自動化腳本

[數位製造與硬體]
- 3D 列印機改造 (95%) - Klipper 核心架構、主動雙軸升級
- Fusion 360 機構 (70%) - 工業零件公差精密結構設計
- 硬體維修與電路量測 (80%) - 示波器量測、SMD 貼片電子銲接
`,
            'term_projects': `=== 精選專案作品集 ===
1. [學術] ICCT-Pacific 國際學術會議 - 發表論文並獲 Best Student Poster Award
2. [AIoT] ROS 2 無人機自主導航 - 無人機 AI 賦能訓練、實作自主航行
3. [架構] 個人極客 Homelab 機櫃 - 開發 Proxmox+OpenWrt 多 VLAN 隔離網路
4. [製造] 3D 列印機雙軸 Klipper 升級 - 設計 Fusion 360 風道零件、優化成型品質
* 輸入 'gui' 可直接滾動至圖形化介面瀏覽專案。
`,
            'term_contact': `=== 聯絡資訊 ===
- Email: liu0308@liu0308.us.kg
- GitHub: https://github.com/ma4980
- 所在地: 台灣 (Taiwan)
- Proxmox 主節點狀態: ONLINE
* 您也可以在右側網頁的聯絡表單直接發送訊息！
`,
            'term_neofetch': `
                        <div class="neofetch-logo">
      /\_/\
    ( o.o )
     > ^ <
  [ junwei.sh ]
                        </div>
                        <div class="neofetch-info">
                            <span class="nf-label">OS:</span> Proxmox VE / Ubuntu LTS<br>
                            <span class="nf-label">Host:</span> Edge AIoT Lab & Homelab Node<br>
                            <span class="nf-label">Kernel:</span> 6.8.0-proxmox-pve<br>
                            <span class="nf-label">Uptime:</span> 18y 9m (EE Student Life)<br>
                            <span class="nf-label">Shell:</span> bash / zsh<br>
                            <span class="nf-label">Core Tech:</span> Proxmox, Docker, ROS 2, OpenWrt<br>
                            <span class="nf-label">Interests:</span> 3D Printing, Drone Control, Virtualization
                        </div>
            `,
            'terminal_info_quote': '"底層架構是我的畫布，硬體電路是我的畫筆，網路通訊是我的語言。"',
            'terminal_help_msg': '可用指令: <span class="cmd-highlight">skills</span>, <span class="cmd-highlight">projects</span>, <span class="cmd-highlight">clear</span>, <span class="cmd-highlight">contact</span>, <span class="cmd-highlight">gui</span>',
            'terminal_placeholder': '在此輸入指令...',
            'term_cmd_not_found': 'bash: 指令未找到: {cmd}。輸入 <span class="cmd-highlight">help</span> 獲取指令清單。',
            'term_gui_msg': '正在引導至圖形化網頁介面...',

            // Skills Section
            'skills_title': '專業技能',
            'skills_tagline': '從實體網路硬體到邊緣運算虛擬化',
            'skills_tab_infra': '網路與基礎設施',
            'skills_tab_aiot': '軟體與 AIoT 邊緣運算',
            'skills_tab_mfg': '數位製造與硬體',
            'skill_pve_name': '<i data-lucide="layers"></i> Proxmox VE 虛擬化',
            'skill_pve_desc': '部署多節點虛擬集群，實現 LXC 容器與 VM 的高可用性架構。',
            'skill_docker_name': '<i data-lucide="container"></i> Docker 容器化',
            'skill_docker_desc': '設計 Docker 檔案與 Compose 配置，構建輕量、易遷移的微服務環境。',
            'skill_openwrt_name': '<i data-lucide="router"></i> OpenWrt 軟路由',
            'skill_openwrt_desc': '編譯客製化韌體，規劃防火牆、VLAN、VPN 通道與智慧分流系統。',
            'skill_net_name': '<i data-lucide="network"></i> 網路拓撲與安全配置',
            'skill_net_desc': '管理網路交換機與路由器，設置多子網隔離、動態路由及防禦策略。',
            'skill_ros_name': '<i data-lucide="navigation"></i> ROS 2 機器人操作系統',
            'skill_ros_desc': '利用 ROS 2 框架開發無人機導航、感測器數據分析與自主避障邏輯。',
            'skill_embed_name': '<i data-lucide="code"></i> Embedded C++ / Python',
            'skill_embed_desc': '編寫微控制器 (ESP32, STM32) 與單板電腦 (樹莓派, Jetson Nano) 控制程式。',
            'skill_ai_name': '<i data-lucide="eye"></i> AI 邊緣推論',
            'skill_ai_desc': '在邊緣運算裝置上部署量化輕量模型 (YOLOv8) 進行即時物件偵測與追蹤。',
            'skill_linux_name': '<i data-lucide="git-branch"></i> Git / Linux 系統管理',
            'skill_linux_desc': '使用版本控制與自動化腳本 (Bash, Ansible) 管理大規模主機運作。',
            'skill_3d_name': '<i data-lucide="printer"></i> 3D 列印機組裝與改造',
            'skill_3d_desc': '熟練改裝 Creality 等機型，自組 Klipper 韌體核心，優化列印品質。',
            'skill_cad_name': '<i data-lucide="box"></i> 3D 建模與結構設計',
            'skill_cad_desc': '使用 Fusion 360 進行機構設計，產出符合公差標準的工業級功能性零件。',
            'skill_hw_name': '<i data-lucide="hammer"></i> 硬體維修與電路量測',
            'skill_hw_desc': '使用示波器與萬用表進行電路分析，能動手進行貼片元件銲接與維修。',
            'level_master': '精通',
            'level_learning': '進修中',
            'level_proficient': '熟練',
            'level_expert': '專家',

            // Projects Section
            'projects_title': '專案作品',
            'projects_tagline': '從實作中累積，以成果來證明',
            'filter_all': '全部',
            'filter_academic': '學術與研討會',
            'filter_aiot': 'AIoT 邊緣運算',
            'filter_infra': '基礎設施',
            'filter_mfg': '數位製造',
            'filter_memories': '過往與生活',
            'proj_acad_badge': '學術成果',
            'proj_acad_title': 'ICCT-Pacific 國際學術會議',
            'proj_acad_desc': '於 ICCT-Pacific 國際學術研討會上發表學術論文，並憑藉扎實的系統架構與精美的海報設計展示，獲頒「最佳學生海報獎 (Best Student Poster Award)」。',
            'proj_acad_link': '詳細論文資訊',
            'proj_drone_badge': '邊緣運算',
            'proj_drone_title': 'ROS 2 無人機 AI 賦能自主飛行',
            'proj_drone_desc': '整合 ROS 2 與邊緣 AI 電腦，利用視覺避障演算法實作無人機在室內無 GPS 環境下的自主航行，設計並主持了無人機 AI 培訓課程的實作紀錄。',
            'proj_drone_link': '專案文件',
            'proj_infra_badge': '基礎設施',
            'proj_infra_title': '個人極客 Homelab 機櫃佈置',
            'proj_infra_desc': '從零建構個人機櫃，採用 Proxmox VE 進行多虛擬機器管理。上層透過 OpenWrt 作為軟路由核心提供 VLAN 隔離、負載均衡與 Docker 微服務部署。',
            'proj_infra_link': '機櫃拓撲與配置',
            'proj_mfg_badge': '數位製造',
            'proj_mfg_title': 'Creality 3D 列印機極客改裝',
            'proj_mfg_desc': '將 Creality 3D 列印機升級為主動雙軸，重寫 Klipper 控制韌體，並用 Fusion 360 設計散熱風道與列印零件，顯著提升了列印精度與速度。',
            'proj_mfg_link': '設計零件 STL',
            'proj_ta_badge': '教學服務',
            'proj_ta_title': '嵌入式系統與 AIoT 課程助理',
            'proj_ta_desc': '擔任電子工程系專業課程教學助理，負責實驗課環境建置指導、電子電路除錯教學、微處理器程式撰寫引導，並協助維護實驗室設備與教材準備。',
            'proj_ta_link': '教學花絮照片',
            'proj_grad_badge': '過往紀錄',
            'proj_grad_title': '我的過往：求學與畢業紀念',
            'proj_grad_desc': '記錄我在雲林西螺農工電子科與國立虎尾科技大學電子工程系的學習歲月，收錄了與老師、實驗室學長及同儕們珍貴的學士服合影。',
            'proj_grad_link': '瀏覽學士服相簿',
            'proj_travel_badge': '生活足跡',
            'proj_travel_title': '我的朋友們：旅行合影',
            'proj_travel_desc': '分享與朋友們共同探索世界的精彩旅程，收錄了在岡山城、日本山口大學及嚴島神社的海上帝居等旅行紀念合照。',
            'proj_travel_link': '瀏覽旅行相簿',

            // Friends Section
            'friends_title': '技術夥伴 & 友鏈',
            'friends_tagline': '共同探索技術、分享旅程的戰友',
            'friend_name': '合作夥伴極摯友 鐘明穎 (Ming-Ying Chung)',
            'friend_bio': '專注於 IoT 開發、影像辨識與無線通訊。西螺農工電子科時期的同窗戰友，熱衷於用工程實作連結影像與真實世界。',
            'friend_btn': '訪問個人網站',

            // Contact Section
            'contact_title': '聯絡我',
            'contact_tagline': '交流想法，或是一起進行有趣的專案',
            'contact_info_title': '聯絡資訊',
            'contact_info_sub': '歡迎透過以下管道與我取得聯繫，我會盡快回覆您！',
            'contact_label_email': 'Email',
            'contact_label_location': '所在地',
            'contact_text_location': '台灣 (Taiwan)',
            'contact_label_github': 'GitHub',
            'contact_label_instagram': 'Instagram',
            'contact_status_title': 'Lab Node Status: Online',
            'contact_status_cpu': 'PVE CPU 使用率: 14%',
            'contact_status_latency': '網路延遲: 4ms',
            'form_label_name': '您的姓名',
            'form_placeholder_name': '例如：林小明',
            'form_error_name': '請填寫姓名',
            'form_label_email': '電子信箱',
            'form_placeholder_email': '例如：example@email.com',
            'form_error_email': '請填寫有效的電子信箱',
            'form_label_subject': '信件主題',
            'form_placeholder_subject': '例如：關於合作案詢問',
            'form_error_subject': '請填寫主題',
            'form_label_message': '您的訊息',
            'form_placeholder_message': '請在此輸入您的詳細訊息...',
            'form_error_message': '請輸入訊息內容',
            'form_btn_submit': '送出訊息',
            'form_btn_sending': '傳送中...',
            'form_success_title': '訊息送出成功！',
            'form_success_desc': '感謝您的聯絡，我已收到您的訊息，將會盡快與您聯繫。',
            'form_btn_reset': '再次發送訊息',

            // Footer
            'footer_rights': '&copy; 2026 Jun Wei Liu. All rights reserved.',
            'footer_portal': '程式導航頁',

            // Toast
            'toast_email_copied': '已複製信箱位址！',

            // Gallery Captions
            'gallery_acad_1': 'ICCT-Pacific 國際學術會議 - 榮獲最佳學生海報獎 (Best Student Poster Award) 頒獎合影',
            'gallery_acad_2': '日本山口大學 - IEEE ICCT-Pacific 會議現場海報展展示與講解',
            'gallery_acad_3': '最佳學生海報獎 (Best Student Poster Award) 官方學術研討獎狀',
            'gallery_acad_4': '與日本山口大學的大學生及參會學者於晚宴中進行學術與文化交流',
            'gallery_acad_5': '研討會晚宴 - 欣賞日本山口溫泉當地的傳統舞蹈表演',
            'gallery_acad_6': '在研討會晚宴上與參會的好友及合作夥伴們合影留念',
            'gallery_acad_7': 'IEEE研討會晚宴現場佈置與精緻會場環境',
            'gallery_drone_1': 'ROS 2 無人機 AI 賦能自主飛行 - 開發邊緣端 YOLOv8 避障自主飛行控制系統',
            'gallery_ta_1': '於嵌入式系統與 AIoT 課程擔任助教，進行課程教學與系統環境操作示範 (1)',
            'gallery_ta_2': '於嵌入式系統與 AIoT 課程擔任助教，進行課程教學與系統環境操作示範 (2)',
            'gallery_ta_3': '於嵌入式系統與 AIoT 課程擔任助教，進行課程教學與系統環境操作示範 (3)',
            'gallery_infra_1': '個人 Homelab 機櫃 - Proxmox PVE 集群虛擬化與 OpenWrt 軟路由 VLAN 拓撲佈置',
            'gallery_mfg_1': '3D 列印機極客改裝 - Creality 主動雙軸硬體升級與 Klipper 韌體客製化調校',
            'gallery_grad_1': '國立虎尾科技大學電子系 - 與實驗室的學長們拍學士服照 (1)',
            'gallery_grad_2': '國立虎尾科技大學電子系 - 與實驗室的學長們拍學士服照 (2)',
            'gallery_grad_3': '國立虎尾科技大學電子系 - 畢業典禮與院長及實驗室學長合影',
            'gallery_grad_4': '雲林西螺農工電子科 - 畢業時與班導楊媽穿著學士服合影留念',
            'gallery_grad_5': '雲林西螺農工電子科 - 畢業時與合作夥伴極摯友鐘明穎在西螺農工校園合影',
            'gallery_friends_1': '日本岡山市 - 與朋友們一同造訪著名的「岡山城」合照',
            'gallery_friends_2': '日本山口大學 - 研討會發表期間與朋友們在校園景點合影留念',
            'gallery_friends_3': '雲林西螺農工電子科 - 與合作夥伴極摯友鐘明穎在西螺農工校園合影',
            'gallery_friends_4': '日本廣島廿日市 - 與合作夥伴極摯友鐘明穎在著名景點嚴島神社合影留念',
            'gallery_ig_1': '掃描 QR Code 追蹤我的 Instagram',
            
            // Newly added elements
            'profile_name': '劉峻瑋',
            'profile_title': 'Jun Wei Liu',
            'tag_vs': '西螺農工電子科',
            'tag_nfu': '虎科大電子工程',
            'tag_grad': '畢業紀念',
            'tag_okayama': '岡山城',
            'tag_yamaguchi': '山口大學',
            'tag_travel': '旅行足跡',
            'qr_tooltip': '掃描追蹤 IG',
            'lightbox_close': '關閉',
            'lightbox_prev': '上一張',
            'lightbox_next': '下一張',
            'lang_toggle_aria': '切換語言',
            'theme_toggle_aria': '切換深淺色模式',
            'menu_toggle_aria': '打開選單',
            'lang_toggle_title': '切換語言 / Select Language',
            'lightbox_img_alt': '大圖',
            'profile_img_alt': '劉峻瑋 Jun Wei Liu',
            'friend_img_alt': '合作夥伴極摯友 鐘明穎 Ming-Ying Chung',
            'proj_acad_alt': 'ICCT-Pacific 最佳學生海報獎',
            'proj_drone_alt': 'ROS 2 無人機 AI 導航與飛行',
            'proj_infra_alt': '伺服器與 NAS 基礎設施配置',
            'proj_mfg_alt': '3D 列印機改裝與組裝',
            'proj_ta_alt': '嵌入式系統與 AIoT 課程助教',
            'proj_grad_alt': '我的過往：學士服合影',
            'proj_travel_alt': '我的朋友們：旅行紀念',
            'lang_zh': '繁體中文',
            'lang_ja': '日文',
            'lang_en': '英文',
            'lang_auto': '跟隨本機',
            'page_title': '劉峻瑋 | Network Engineer & AIoT Developer'
        },
        'en': {
            // Nav
            'nav_about': 'About Me',
            'nav_skills': 'Skills',
            'nav_projects': 'Projects',
            'nav_friends': 'Partners',
            'nav_contact': 'Contact Me',
            // Hero
            'hero_badge': 'Uptime: 100% | Available for collaboration',
            'hero_title': 'I am <span class="gradient-text">Jun Wei Liu</span><br>A geek who loves challenges',
            'hero_subtitle': 'Focusing on <strong class="highlight">Network Engineering</strong> and <strong class="highlight">AIoT Edge Computing</strong>. Passionate about virtualization, infrastructure deployments, and software/hardware integration.',
            'hero_btn_projects': 'View Projects',
            'hero_btn_contact': 'Contact Me',
            // About Me Section
            'about_title': 'About Me',
            'about_tagline': 'Exploring the hardware layers and digital manufacturing',
            'about_role': 'Network & AIoT Developer',
            'about_email_title': 'Send Email / Copy Address',
            'about_card_bg_title': 'Background',
            'about_card_bg_text': 'I am currently a student in Electronic Engineering, focusing on Network Engineering and AIoT edge computing. I love dissecting complex system architectures to discover how hardware, firmware, network and software communicate. For me, bridging the digital code with the physical hardware world is an unmatched joy.',
            'about_card_edu_title': 'Education & Experience',
            'about_card_phil_title': 'Philosophy',
            'about_card_phil_text': '"Professional, Stable, Geek Spirit". Facing complex infrastructure architectures and troubleshooting challenges, I follow systematic thinking to deploy environments securely, pursuing performance limits and automation.',
            // Timeline badges
            'timeline_upcoming': 'Soon',
            'timeline_current': 'Active',
            'timeline_past': 'Past',
            // Timeline details
            'timeline_edu_ms': 'National Formosa University - MS in Electronic Engineering',
            'timeline_edu_ms_desc': 'Deepening research in Embedded Systems & AIoT',
            'timeline_edu_bs': 'National Formosa University - BS in Electronic Engineering',
            'timeline_edu_bs_desc': 'Majored in Electronic Engineering, focusing on edge computing, hardware integration, image recognition, and drone controls.',
            'timeline_exp_gov': 'Yunlin County Government',
            'timeline_exp_gov_desc': 'Served in Yunlin County Government, gaining practical administration experience.',
            'timeline_edu_5yr': 'National Formosa University - 5-Year Associate Degree in EE',
            'timeline_edu_5yr_desc': 'Acquired robust foundations in electronic circuits and hardware analysis.',
            'timeline_edu_vs': 'Silo Senior Vocational School - Electronic Engineering Dept.',
            'timeline_edu_vs_desc': 'Introductory studies in microcontrollers and fundamental electronics theory.',
            // Terminal Simulator command outputs
            'term_help': `Available Commands:
  neofetch    - Show basic info and host status
  experience  - View education and work experience timeline
  skills      - Detail skill-tree proficiency
  projects    - Summary of selected projects
  contact     - Display contact channels
  clear       - Clear the terminal screen
  gui         - Scroll page to graphical About section
  help        - Display this menu
`,
            'term_experience': `=== Education & Experience Timeline ===
- [Soon] National Formosa University - MS in Electronic Engineering
- [Active] National Formosa University - BS in EE (Edge AIoT & Drone Controls)
- [Past] Yunlin County Government (Service & management experience)
- [Past] National Formosa University (5-Year Associate Degree in EE)
- [Past] Silo Senior Vocational School (Electronics Dept.)
`,
            'term_skills': `=== Skills Detail (Network & AIoT Labs) ===
[Network & Infra]
- Proxmox VE Virtualization (90%) - Clusters, VM/LXC Architecture
- OpenWrt Soft Router (90%) - VLANs, Routing, VPN, Smart Routing
- Docker Containerization (85%) - Compose Orchestration, Services
- Network Security & Topo (80%) - Firewall Defense, VLAN Isolation

[Software & AIoT Edge]
- ROS 2 Robotics Framework (65%) [Learning] - Autonomous drone navigation
- Embedded C++/Python (80%) - ESP32, STM32, Jetson Nano, Raspberry Pi
- Edge AI Inference (65%) - YOLOv8 real-time target detection
- Linux Sysadmin / Git (80%) - Bash/Ansible automation scripts

[Digital Mfg & HW]
- 3D Printer Optimization (95%) - Klipper core, active dual-axis upgrades
- Fusion 360 CAD (70%) - Tolerance-fit mechanical design
- HW Repair & Circuits (80%) - Oscilloscopes, SMD/soldering
`,
            'term_projects': `=== Selected Projects Portfolio ===
1. [Academic] ICCT-Pacific Conference - Best Student Poster Award presentation
2. [AIoT] ROS 2 Autonomous Drone - Vision-based indoor navigation & training
3. [Infra] Geek Homelab Rack - Proxmox virtualization & Multi-VLAN setup
4. [Mfg] 3D Printer Klipper Mod - Fusion 360 designs, fast active dual-axis printing
* Type 'gui' to scroll down to visual portfolio cards.
`,
            'term_contact': `=== Contact Information ===
- Email: liu0308@liu0308.us.kg
- GitHub: https://github.com/ma4980
- Location: Taiwan
- Proxmox Node Status: ONLINE
* You can also use the contact form on the right!
`,
            'term_neofetch': `
                        <div class="neofetch-logo">
      /\_/\
    ( o.o )
     > ^ <
  [ junwei.sh ]
                        </div>
                        <div class="neofetch-info">
                            <span class="nf-label">OS:</span> Proxmox VE / Ubuntu LTS<br>
                            <span class="nf-label">Host:</span> Edge AIoT Lab & Homelab Node<br>
                            <span class="nf-label">Kernel:</span> 6.8.0-proxmox-pve<br>
                            <span class="nf-label">Uptime:</span> 18y 9m (EE Student Life)<br>
                            <span class="nf-label">Shell:</span> bash / zsh<br>
                            <span class="nf-label">Core Tech:</span> Proxmox, Docker, ROS 2, OpenWrt<br>
                            <span class="nf-label">Interests:</span> 3D Printing, Drone Control, Virtualization
                        </div>
            `,
            'terminal_info_quote': '"Infrastructure is my canvas, hardware circuits are my brush, and networks are my language."',
            'terminal_help_msg': 'Available commands: <span class="cmd-highlight">skills</span>, <span class="cmd-highlight">projects</span>, <span class="cmd-highlight">clear</span>, <span class="cmd-highlight">contact</span>, <span class="cmd-highlight">gui</span>',
            'terminal_placeholder': 'Type command here...',
            'term_cmd_not_found': 'bash: command not found: {cmd}. Type <span class="cmd-highlight">help</span> to show available commands.',
            'term_gui_msg': 'Navigating to graphical GUI...',

            // Skills Section
            'skills_title': 'Skills',
            'skills_tagline': 'From Physical Networking to Edge Virtualization',
            'skills_tab_infra': 'Network & Infrastructure',
            'skills_tab_aiot': 'Software & AIoT Edge',
            'skills_tab_mfg': 'Digital Mfg & Hardware',
            'skill_pve_name': '<i data-lucide="layers"></i> Proxmox VE Virtualization',
            'skill_pve_desc': 'Deploy multi-node virtual clusters, realizing high-availability architectures using LXC containers and VMs.',
            'skill_docker_name': '<i data-lucide="container"></i> Docker Containerization',
            'skill_docker_desc': 'Design Dockerfiles and Compose configurations to build lightweight, easily-migrated microservices.',
            'skill_openwrt_name': '<i data-lucide="router"></i> OpenWrt Soft Routing',
            'skill_openwrt_desc': 'Compile custom firmware, planning firewalls, VLANs, VPN tunnels, and smart routing rules.',
            'skill_net_name': '<i data-lucide="network"></i> Network Topology & Security',
            'skill_net_desc': 'Manage switches and routers, setting up subnets, VLAN isolation, dynamic routing, and security policies.',
            'skill_ros_name': '<i data-lucide="navigation"></i> ROS 2 Robotics System',
            'skill_ros_desc': 'Utilize the ROS 2 framework to develop drone navigation, sensor data analysis, and autonomous obstacle avoidance.',
            'skill_embed_name': '<i data-lucide="code"></i> Embedded C++ / Python',
            'skill_embed_desc': 'Program microcontrollers (ESP32, STM32) and single-board computers (Raspberry Pi, Jetson Nano).',
            'skill_ai_name': '<i data-lucide="eye"></i> Edge AI Inference',
            'skill_ai_desc': 'Deploy quantized lightweight models (YOLOv8) on edge devices for real-time object detection and tracking.',
            'skill_linux_name': '<i data-lucide="git-branch"></i> Git / Linux Sysadmin',
            'skill_linux_desc': 'Use version control and automation scripts (Bash, Ansible) to manage server operations at scale.',
            'skill_3d_name': '<i data-lucide="printer"></i> 3D Printer Assembly & Modding',
            'skill_3d_desc': 'Modify Creality printers, customize Klipper firmware, and optimize mechanical parts for high-speed printing.',
            'skill_cad_name': '<i data-lucide="box"></i> 3D Modeling & CAD Design',
            'skill_cad_desc': 'Use Fusion 360 for mechanical design, producing industrial-grade functional parts with tolerance compliance.',
            'skill_hw_name': '<i data-lucide="hammer"></i> HW Repair & Instrumentation',
            'skill_hw_desc': 'Analyze circuits using oscilloscopes and multimeters; perform SMD soldering and component-level repairs.',
            'level_master': 'Proficient',
            'level_learning': 'Learning',
            'level_proficient': 'Skilled',
            'level_expert': 'Expert',

            // Projects Section
            'projects_title': 'Projects',
            'projects_tagline': 'Learning by doing, proving with results',
            'filter_all': 'All',
            'filter_academic': 'Academic & Conferences',
            'filter_aiot': 'AIoT Edge',
            'filter_infra': 'Infrastructure',
            'filter_mfg': 'Digital Mfg',
            'filter_memories': 'Memories & Life',
            'proj_acad_badge': 'Academic',
            'proj_acad_title': 'ICCT-Pacific International Conference',
            'proj_acad_desc': 'Presented a paper at the ICCT-Pacific international conference and won the "Best Student Poster Award" for robust system design and presentation.',
            'proj_acad_link': 'Paper Details',
            'proj_drone_badge': 'Edge Computing',
            'proj_drone_title': 'ROS 2 Autonomous Drone Navigation',
            'proj_drone_desc': 'Integrated ROS 2 with edge AI to implement visual obstacle avoidance for GPS-denied indoor flight. Organized and documented hands-on AI drone training courses.',
            'proj_drone_link': 'Project Docs',
            'proj_infra_badge': 'Infrastructure',
            'proj_infra_title': 'Personal Geek Homelab Server Rack',
            'proj_infra_desc': 'Built a custom home server rack from scratch. Uses Proxmox VE for virtualization, with OpenWrt routing handling VLAN isolation, load balancing, and Docker services.',
            'proj_infra_link': 'Rack Topology & Config',
            'proj_mfg_badge': 'Digital Mfg',
            'proj_mfg_title': 'Creality 3D Printer Modding',
            'proj_mfg_desc': 'Upgraded a Creality 3D printer with dual Z-axes, compiled custom Klipper firmware, and designed cooling ducts in Fusion 360 to significantly improve print speed and quality.',
            'proj_mfg_link': 'Design Parts STL',
            'proj_ta_badge': 'Teaching Service',
            'proj_ta_title': 'Embedded Systems & AIoT Course TA',
            'proj_ta_desc': 'Served as a Teaching Assistant for Electronic Engineering, setting up lab environments, troubleshooting circuits, and tutoring microcontroller programming.',
            'proj_ta_link': 'TA Photos',
            'proj_grad_badge': 'Education Memories',
            'proj_grad_title': 'Academic Journey & Graduation',
            'proj_grad_desc': 'Memories of my studies in Electronic Engineering at Siluo Senior Vocational School and National Formosa University, featuring photos with professors and lab colleagues.',
            'proj_grad_link': 'Graduation Album',
            'proj_travel_badge': 'Travel Footprints',
            'proj_travel_title': 'Travels with Friends',
            'proj_travel_desc': 'Shared travels exploring the world with friends, including photos from Okayama Castle, Yamaguchi University, and Itsukushima Shrine in Japan.',
            'proj_travel_link': 'Travel Album',

            // Friends Section
            'friends_title': 'Technical Partners & Links',
            'friends_tagline': 'Comrades exploring technology and sharing journeys',
            'friend_name': 'Ming-Ying Chung (Technical Partner)',
            'friend_bio': 'Focuses on IoT development, image recognition, and wireless communications. A classmate and coding partner since vocational school, passionate about connecting visual data to the physical world.',
            'friend_btn': 'Visit Website',

            // Contact Section
            'contact_title': 'Contact Me',
            'contact_tagline': 'Discuss ideas, ask questions, or start an exciting project together',
            'contact_info_title': 'Contact Info',
            'contact_info_sub': 'Feel free to reach out through any of these channels. I will get back to you as soon as possible!',
            'contact_label_email': 'Email',
            'contact_label_location': 'Location',
            'contact_text_location': 'Taiwan',
            'contact_label_github': 'GitHub',
            'contact_label_instagram': 'Instagram',
            'contact_status_title': 'Lab Node Status: Online',
            'contact_status_cpu': 'PVE CPU Usage: 14%',
            'contact_status_latency': 'Network Latency: 4ms',
            'form_label_name': 'Name',
            'form_placeholder_name': 'e.g., John Doe',
            'form_error_name': 'Please enter your name',
            'form_label_email': 'Email Address',
            'form_placeholder_email': 'e.g., example@email.com',
            'form_error_email': 'Please enter a valid email address',
            'form_label_subject': 'Subject',
            'form_placeholder_subject': 'e.g., Inquiry about collaboration',
            'form_error_subject': 'Please enter a subject',
            'form_label_message': 'Message',
            'form_placeholder_message': 'Please type your detailed message here...',
            'form_error_message': 'Please enter your message',
            'form_btn_submit': 'Send Message',
            'form_btn_sending': 'Sending...',
            'form_success_title': 'Message Sent Successfully!',
            'form_success_desc': 'Thank you for reaching out. I have received your message and will get back to you soon.',
            'form_btn_reset': 'Send Another Message',

            // Footer
            'footer_rights': '&copy; 2026 Jun Wei Liu. All rights reserved.',
            'footer_portal': 'Portal',

            // Toast
            'toast_email_copied': 'Email address copied!',

            // Gallery Captions
            'gallery_acad_1': 'ICCT-Pacific Conference - Receiving the Best Student Poster Award',
            'gallery_acad_2': 'Yamaguchi University, Japan - Poster presentation at IEEE ICCT-Pacific',
            'gallery_acad_3': 'Best Student Poster Award Certificate',
            'gallery_acad_4': 'Academic and cultural exchanges at the conference banquet with students and researchers',
            'gallery_acad_5': 'Banquet entertainment - Enjoying traditional Japanese dance',
            'gallery_acad_6': 'Banquet photo with friends and partners',
            'gallery_acad_7': 'IEEE banquet venue and dining environment',
            'gallery_drone_1': 'ROS 2 Autonomous Drone - YOLOv8 edge AI obstacle avoidance system',
            'gallery_ta_1': 'Serving as a Teaching Assistant for Embedded Systems & AIoT (1)',
            'gallery_ta_2': 'Serving as a Teaching Assistant for Embedded Systems & AIoT (2)',
            'gallery_ta_3': 'Serving as a Teaching Assistant for Embedded Systems & AIoT (3)',
            'gallery_infra_1': 'Homelab Rack - Proxmox virtualization & Multi-VLAN OpenWrt networking',
            'gallery_mfg_1': '3D Printer Modding - Creality printer dual Z-axis upgrade & Klipper firmware tuning',
            'gallery_grad_1': 'NFU Electronic Engineering - Photo with lab seniors in academic dress (1)',
            'gallery_grad_2': 'NFU Electronic Engineering - Photo with lab seniors in academic dress (2)',
            'gallery_grad_3': 'NFU Electronic Engineering - Graduation ceremony with Dean and lab seniors',
            'gallery_grad_4': 'Siluo Senior Vocational School - Graduation photo with homeroom teacher',
            'gallery_grad_5': 'Siluo Senior Vocational School - Photo with partner Ming-Ying Chung on campus',
            'gallery_friends_1': 'Okayama City, Japan - Group photo at the famous Okayama Castle',
            'gallery_friends_2': 'Yamaguchi University, Japan - Photo on campus during conference',
            'gallery_friends_3': 'Siluo Senior Vocational School - Photo with partner Ming-Ying Chung',
            'gallery_friends_4': 'Itsukushima, Hiroshima, Japan - Photo with partner Ming-Ying Chung at Itsukushima Shrine',
            'gallery_ig_1': 'Scan QR code to follow my Instagram',
            
            // Newly added elements
            'profile_name': 'Jun Wei Liu',
            'profile_title': '劉峻瑋',
            'tag_vs': 'Silo EE Dept.',
            'tag_nfu': 'NFU EE',
            'tag_grad': 'Graduation',
            'tag_okayama': 'Okayama Castle',
            'tag_yamaguchi': 'Yamaguchi Univ.',
            'tag_travel': 'Travels',
            'qr_tooltip': 'Scan to follow IG',
            'lightbox_close': 'Close',
            'lightbox_prev': 'Previous',
            'lightbox_next': 'Next',
            'lang_toggle_aria': 'Select Language',
            'theme_toggle_aria': 'Toggle Dark/Light Mode',
            'menu_toggle_aria': 'Open Menu',
            'lang_toggle_title': 'Select Language',
            'lightbox_img_alt': 'Large Image',
            'profile_img_alt': 'Jun Wei Liu',
            'friend_img_alt': 'Partner Ming-Ying Chung',
            'proj_acad_alt': 'ICCT-Pacific Best Student Poster Award',
            'proj_drone_alt': 'ROS 2 Autonomous Drone Navigation',
            'proj_infra_alt': 'Server and NAS Infrastructure Config',
            'proj_mfg_alt': '3D Printer Assembly and Modding',
            'proj_ta_alt': 'Embedded Systems & AIoT Course TA',
            'proj_grad_alt': 'My Academic Journey: Graduation Photo',
            'proj_travel_alt': 'My Friends: Travel Photo',
            'lang_zh': 'Traditional Chinese',
            'lang_ja': 'Japanese',
            'lang_en': 'English',
            'lang_auto': 'System Default',
            'page_title': 'Jun Wei Liu | Network Engineer & AIoT Developer'
        },
        'ja': {
            // Nav
            'nav_about': '自己紹介',
            'nav_skills': 'スキル',
            'nav_projects': '実績',
            'nav_friends': 'パートナー',
            'nav_contact': '連絡先',
            // Hero
            'hero_badge': '稼働率: 100% | コラボレーション募集中',
            'hero_title': '私は <span class="gradient-text">劉峻瑋 (Jun Wei)</span><br>挑戦を愛するギークです',
            'hero_subtitle': '<strong class="highlight">ネットワークエンジニアリング</strong> と <strong class="highlight">AIoTエッジコンピューティング</strong>に注力。仮想環境構築、インフラデプロイ、ソフト・ハード統合開発を得意としています。',
            'hero_btn_projects': 'プロジェクトを見る',
            'hero_btn_contact': 'お問い合わせ',
            // About Me Section
            'about_title': '自己紹介',
            'about_tagline': '低レイヤの探索とデジタルマニュファクチャリングの対話',
            'about_role': 'Network & AIoT Developer',
            'about_email_title': 'メール送信 / アドレスコピー',
            'about_card_bg_title': 'バックグラウンド',
            'about_card_bg_text': '現在電子工学専攻の学生で、ネットワーク工学とAIoTエッジコンピューティングに情熱を注いでいます。複雑なシステムアーキテクチャを分析し、ハードウェア、ファームウェア、ネットワーク、上位ソフトウェアがどのように通信するかを探求するのが大好きです。',
            'about_card_edu_title': '学歴と経歴',
            'about_card_phil_title': '開発理念',
            'about_card_phil_text': '「プロフェッショナル、安定、ギーク精神」。複雑なインフラのトラブルシューティングやデプロイに対し、システム的な思考アプローチで安定した環境を構築し、極限のパフォーマンスと自動化を追求します。',
            // Timeline badges
            'timeline_upcoming': '予定',
            'timeline_current': '現在',
            'timeline_past': '過去',
            // Timeline details
            'timeline_edu_ms': '国立虎尾科技大学 - 電子工学科 修士課程',
            'timeline_edu_ms_desc': '組み込みシステムとAIoT領域の研究を深化',
            'timeline_edu_bs': '国立虎尾科技大学 - 電子工学科',
            'timeline_edu_bs_desc': '電子工学専攻。エッジコンピューティング、ソフトハード統合、画像認識、およびドローン制御開発。',
            'timeline_exp_gov': '雲林県政府',
            'timeline_exp_gov_desc': '雲林県政府での実務運営と管理の経験を蓄積。',
            'timeline_edu_5yr': '国立虎尾科技大学 - 電子工学科（5年制）',
            'timeline_edu_5yr_desc': '電子回路とハードウェア分析の確固たる基礎を築く。',
            'timeline_edu_vs': '西螺農工高校 - 電子科',
            'timeline_edu_vs_desc': 'マイコン開発および基礎電子理論の学習。',
            // Terminal Simulator command outputs
            'term_help': `利用可能なコマンド:
  neofetch    - 基本情報とホストステータスを表示
  experience  - 学歴と経歴のタイムラインを表示
  skills      - 専門スキルの詳細を表示
  projects    - 主なプロジェクト実績を表示
  contact     - 連絡先一覧を表示
  clear       - ターミナル画面を消去
  gui         - 画面を自己紹介セクションまでスクロール
  help        - このヘルプメニューを表示
`,
            'term_experience': `=== 学歴と経歴タイムライン ===
- [予定] 国立虎尾科技大学 - 電子工学科 修士課程
- [現在] 国立虎尾科技大学 - 電子工学科（エッジAIoT & ドローン制御）
- [過去] 雲林県政府（実務経験）
- [過去] 国立虎尾科技大学（電子工学科 5年制）
- [過去] 西螺農工高校（電子科）
`,
            'term_skills': `=== 専門スキル詳細 (Network & AIoT Labs) ===
[ネットワーク & インフラ]
- Proxmox VE 仮想化 (90%) - クラスタ構成、VM/LXC設計
- OpenWrt ソフトウェア制御 (90%) - VLAN、動態ルーティング、VPN
- Docker コンテナ技術 (85%) - Compose構成、サービス管理
- ネットワークセキュリティ (80%) - ファイアウォール、VLAN隔離

[ソフトウェア & AIoT エッジ]
- ROS 2 ロボット制御 (65%) [学習中] - ドローン室内自律飛行・ナビゲーション
- 組み込み C++/Python (80%) - ESP32, STM32, Jetson, Raspberry Pi
- エッジ AI 推論 (65%) - YOLOv8によるリアルタイム物体検出
- Linux 運用管理 / Git (80%) - Bash/Ansibleによる自動化

[デジタル製造 & ハード]
- 3D プリンター改造 (95%) - Klipper調整、主動デュアル軸化
- Fusion 360 CAD設計 (70%) - 精密機構部品設計
- ハードウェア修理 & 測定 (80%) - オシロスコープ、SMDハンダ付け
`,
            'term_projects': `=== 主なプロジェクト実績 ===
1. [学術] ICCT-Pacific 国際会議 - ベスト学生ポスター賞受賞・学会発表
2. [AIoT] ROS 2 自律ドローン - エッジAI室内ナビゲーション自律飛行
3. [構築] 個人 Homelab 機櫃 - Proxmox+OpenWrt 多VLAN隔離ネットワーク
4. [製造] 3Dプリンター Klipper改修 - 高速かつ精密な印刷調整
* 'gui' コマンドでグラフィカルポートフォリオを表示できます。
`,
            'term_contact': `=== 連絡先情報 ===
- Email: liu0308@liu0308.us.kg
- GitHub: https://github.com/ma4980
- 所在地: 台湾
- Proxmox ノード状態: ONLINE
* 画面右側のコンタクトフォームからも直接メッセージを送信できます！
`,
            'term_neofetch': `
                        <div class="neofetch-logo">
      /\_/\
    ( o.o )
     > ^ <
  [ junwei.sh ]
                        </div>
                        <div class="neofetch-info">
                            <span class="nf-label">OS:</span> Proxmox VE / Ubuntu LTS<br>
                            <span class="nf-label">Host:</span> Edge AIoT Lab & Homelab Node<br>
                            <span class="nf-label">Kernel:</span> 6.8.0-proxmox-pve<br>
                            <span class="nf-label">Uptime:</span> 18y 9m (EE Student Life)<br>
                            <span class="nf-label">Shell:</span> bash / zsh<br>
                            <span class="nf-label">Core Tech:</span> Proxmox, Docker, ROS 2, OpenWrt<br>
                            <span class="nf-label">Interests:</span> 3D Printing, Drone Control, Virtualization
                        </div>
            `,
            'terminal_info_quote': '"インフラ構築は私のキャンバスであり、ハードウェア回路は私の筆、ネットワークは私の言語です。"',
            'terminal_help_msg': 'コマンド: <span class="cmd-highlight">skills</span>, <span class="cmd-highlight">projects</span>, <span class="cmd-highlight">clear</span>, <span class="cmd-highlight">contact</span>, <span class="cmd-highlight">gui</span>',
            'terminal_placeholder': 'コマンドを入力してください...',
            'term_cmd_not_found': 'bash: コマンドが見つかりません: {cmd}。 <span class="cmd-highlight">help</span> コマンドでヘルプを参照してください。',
            'term_gui_msg': 'グラフィカル自己紹介セクションに移動中...',

            // Skills Section
            'skills_title': '専門スキル',
            'skills_tagline': '物理ネットワークの構築からエッジサーバーの仮想化まで',
            'skills_tab_infra': 'ネットワーク & インフラ',
            'skills_tab_aiot': 'ソフトウェア & AIoT エッジ',
            'skills_tab_mfg': 'デジタル製造 & ハードウェア',
            'skill_pve_name': '<i data-lucide="layers"></i> Proxmox VE 仮想化',
            'skill_pve_desc': '複数ノードの仮想クラスタをデプロイし、LXCコンテナとVMによる高可用性アーキテクチャを実現。',
            'skill_docker_name': '<i data-lucide="container"></i> Docker コンテナ技術',
            'skill_docker_desc': 'DockerfileやCompose設定を設計し、軽量で移行しやすいマイクロサービス環境を構築。',
            'skill_openwrt_name': '<i data-lucide="router"></i> OpenWrt ソフトウェア制御',
            'skill_openwrt_desc': 'カスタムファームウェアをコンパイルし、ファイアウォール、VLAN、VPNトンネル、スマートルーティングを設計。',
            'skill_net_name': '<i data-lucide="network"></i> ネットワーク設計 & セキュリティ設定',
            'skill_net_desc': 'スイッチとルーターを管理し、マルチサブネットの分離、動的ルーティング、防御戦略を設定。',
            'skill_ros_name': '<i data-lucide="navigation"></i> ROS 2 ロボット制御',
            'skill_ros_desc': 'ROS 2フレームワークを利用して、ドローンのナビゲーション、センサデータ分析、自律障害物回避を開発。',
            'skill_embed_name': '<i data-lucide="code"></i> 組み込み C++ / Python',
            'skill_embed_desc': 'マイクロコントローラ（ESP32、STM32）およびシングルボードコンピュータ（Raspberry Pi、Jetson Nano）を制御。',
            'skill_ai_name': '<i data-lucide="eye"></i> エッジ AI 推論',
            'skill_ai_desc': 'エッジデバイスに軽量化モデル（YOLOv8）をデプロイし、リアルタイムでの物体検出・追跡を実施。',
            'skill_linux_name': '<i data-lucide="git-branch"></i> Git / Linux システム管理',
            'skill_linux_desc': 'バージョン管理と自動化スクリプト（Bash、Ansible）を使用して大規模ホストの稼働を管理。',
            'skill_3d_name': '<i data-lucide="printer"></i> 3D プリンター組立 & 改造',
            'skill_3d_desc': 'Crealityなどのプリンター改造、Klipperカスタムファームウェア調整、高速印刷用の部品設計を最適化。',
            'skill_cad_name': '<i data-lucide="box"></i> 3D モデリング & 機構設計',
            'skill_cad_desc': 'Fusion 360を用いて機械設計を行い、公差基準に適合する産業用機能部品を出力。',
            'skill_hw_name': '<i data-lucide="hammer"></i> ハードウェア修理 & 回路測定',
            'skill_hw_desc': 'オシロスコープとマルチメータによる回路分析、SMDはんだ付けおよび基板レベルの修理を実施。',
            'level_master': '精通',
            'level_learning': '学習中',
            'level_proficient': '習得',
            'level_expert': 'エキスパート',

            // Projects Section
            'projects_title': 'プロジェクト実績',
            'projects_tagline': '実践から学び、成果で証明する',
            'filter_all': 'すべて',
            'filter_academic': '學術・学会発表',
            'filter_aiot': 'AIoTエッジ',
            'filter_infra': 'インフラ構築',
            'filter_mfg': 'デジタル製造',
            'filter_memories': '思い出 & 日常',
            'proj_acad_badge': '学術成果',
            'proj_acad_title': 'ICCT-Pacific 国際会議',
            'proj_acad_desc': 'ICCT-Pacific国際学術会議にて論文を発表し、強固なシステム設計と精緻なポスター展示により「最優秀学生ポスター賞 (Best Student Poster Award)」を受賞。',
            'proj_acad_link': '論文詳細情報',
            'proj_drone_badge': 'エッジ計算',
            'proj_drone_title': 'ROS 2 自律ドローンナビゲーション',
            'proj_drone_desc': 'ROS 2とエッジAIを統合し、GPSのない室内環境における視覚的な障害物回避による自律飛行を実装。実技型ドローンAIトレーニング講座を主催。',
            'proj_drone_link': 'プロジェクト文書',
            'proj_infra_badge': 'インフラ',
            'proj_infra_title': '個人 Homelab サーバラック構築',
            'proj_infra_desc': 'サーバラックをゼロから自作。Proxmox VEによる仮想化とOpenWrtソフトルータによるVLAN隔離、負荷分散、Dockerマイクロサービスのデプロイを管理。',
            'proj_infra_link': 'インフラ構成とトポロジ',
            'proj_mfg_badge': 'デジタル製造',
            'proj_mfg_title': 'Creality 3D プリンター改造',
            'proj_mfg_desc': 'Creality製プリンターをデュアルZ軸にアップグレードし、Klipperファームウェアを構築。Fusion 360で冷却ダクト部品を設計し、精度と印刷速度を向上。',
            'proj_mfg_link': '設計部品 STL',
            'proj_ta_badge': '教育支援',
            'proj_ta_title': '組み込みシステムと AIoT 講義助教',
            'proj_ta_desc': '電子工学科のティーチングアシスタントとして実験環境構築を指導し、回路トラブルシューティングやマイコンプログラミングの学習支援を担当。',
            'proj_ta_link': 'TA活動写真',
            'proj_grad_badge': '学生時代',
            'proj_grad_title': '学業と卒業の記念',
            'proj_grad_desc': '西螺農工高校および国立虎尾科技大学電子工学科での学習の日々を記録し、恩師や実験室の先輩、同期たちとの大切な記念写真を収録。',
            'proj_grad_link': '卒業アルバム',
            'proj_travel_badge': '旅行の足跡',
            'proj_travel_title': '友人との旅行',
            'proj_travel_desc': '岡山城、山口大学、広島の厳島神社など、仲間と共に日本各地を探訪した大切な旅行の思い出写真を共有。',
            'proj_travel_link': '旅行アルバム',

            // Friends Section
            'friends_title': '技術パートナー & 友情リンク',
            'friends_tagline': '技術を探求し、人生の旅路を共にする戦友',
            'friend_name': '鐘明穎 (Ming-Ying Chung) - 共同開発パートナー',
            'friend_bio': 'IoT開発、画像認識、無線通信を専門とする。西螺農工高校電子科時代からの戦友であり、工学の実装を通じて画像と物理世界を結びつけることに情熱を注ぐ。',
            'friend_btn': '公式サイトを訪問',

            // Contact Section
            'contact_title': 'お問い合わせ',
            'contact_tagline': 'アイデアの共有や、面白い共同プロジェクトの開始など',
            'contact_info_title': '連絡先情報',
            'contact_info_sub': '以下の方法でお気軽にご連絡ください。できるだけ早くお返事いたします！',
            'contact_label_email': 'メール',
            'contact_label_location': '所在地',
            'contact_text_location': '台湾',
            'contact_label_github': 'GitHub',
            'contact_label_instagram': 'Instagram',
            'contact_status_title': 'Lab Node Status: Online',
            'contact_status_cpu': 'PVE CPU 使用率: 14%',
            'contact_status_latency': 'ネット遅延: 4ms',
            'form_label_name': 'お名前',
            'form_placeholder_name': '例：山田太郎',
            'form_error_name': 'お名前をご入力ください',
            'form_label_email': 'メールアドレス',
            'form_placeholder_email': '例：example@email.com',
            'form_error_email': '有効なメールアドレスをご入力ください',
            'form_label_subject': '件名',
            'form_placeholder_subject': '例：共同プロジェクトに関するお問い合わせ',
            'form_error_subject': '件名をご入力ください',
            'form_label_message': 'メッセージ',
            'form_placeholder_message': '詳細なメッセージをここに入力してください...',
            'form_error_message': 'メッセージをご入力ください',
            'form_btn_submit': '送信する',
            'form_btn_sending': '送信中...',
            'form_success_title': 'メッセージの送信に成功しました！',
            'form_success_desc': 'お問い合わせいただきありがとうございます。メッセージを受理いたしました。追ってご連絡差し上げます。',
            'form_btn_reset': '別のメッセージを送信',

            // Footer
            'footer_rights': '&copy; 2026 Jun Wei Liu. All rights reserved.',
            'footer_portal': 'ポータル',

            // Toast
            'toast_email_copied': 'メールアドレスをコピーしました！',

            // Gallery Captions
            'gallery_acad_1': 'ICCT-Pacific 国際会議 - 最優秀学生ポスター賞授賞式の様子',
            'gallery_acad_2': '山口大学 - IEEE ICCT-Pacific でのポスター発表と解説',
            'gallery_acad_3': '最優秀学生ポスター賞の公式表彰状',
            'gallery_acad_4': 'レセプション懇親会で山口大学の学生や学会の研究者と学術・文化交流',
            'gallery_acad_5': '懇親会 - 山口温泉の伝統的な舞踊のパフォーマンスを鑑賞',
            'gallery_acad_6': '懇親会にて同行した友人やパートナーたちと記念撮影',
            'gallery_acad_7': 'IEEE学会懇親会会場の雰囲気と様子',
            'gallery_drone_1': 'ROS 2 自律ドローン - YOLOv8を組み込んだエッジAI障害物回避システム',
            'gallery_ta_1': '組み込みシステム・AIoTコースの講義アシスタントを務める様子 (1)',
            'gallery_ta_2': '組み込みシステム・AIoTコースの講義アシスタントを務める様子 (2)',
            'gallery_ta_3': '組み込みシステム・AIoTコースの講義アシスタントを務める様子 (3)',
            'gallery_infra_1': 'Homelabサーバラック - Proxmoxによる仮想化とVLAN OpenWrt構築',
            'gallery_mfg_1': '3Dプリンター改造 - Creality製デュアルZ軸化およびKlipper調整',
            'gallery_grad_1': 'NFU 電子工学科 - 卒業式を控えて実験室の先輩たちとのアカデミックドレス写真 (1)',
            'gallery_grad_2': 'NFU 電子工学科 - 卒業式を控えて実験室の先輩たちとのアカデミックドレス写真 (2)',
            'gallery_grad_3': 'NFU 電子工学科 - 卒業式で学部長、実験室の先輩たちと記念撮影',
            'gallery_grad_4': '西螺農工高校 電子科 - 卒業時に担任の先生とアカデミックドレスで記念撮影',
            'gallery_grad_5': '西螺農工高校 電子科 - 卒業時に共同パートナーである鐘明穎氏と校内で記念撮影',
            'gallery_friends_1': '日本岡山市 - 友人たちと名城「岡山城」を訪れた際の記念写真',
            'gallery_friends_2': '山口大学 - 学会発表の期間中に友人たちとキャンパス内で記念撮影',
            'gallery_friends_3': '西螺農工高校 - パナーの鐘明穎氏との記念撮影',
            'gallery_friends_4': '広島県廿日市市 - パートナーの鐘明穎氏と有名な厳島神社の大鳥居前で記念撮影',
            'gallery_ig_1': 'QRコードをスキャンしてInstagramをフォロー',

            // Newly added elements
            'profile_name': '劉峻瑋',
            'profile_title': 'Jun Wei Liu',
            'tag_vs': '西螺農工電子科',
            'tag_nfu': 'NFU 電子工学',
            'tag_grad': '卒業記念',
            'tag_okayama': '岡山城',
            'tag_yamaguchi': '山口大学',
            'tag_travel': '旅行記',
            'qr_tooltip': 'スキャンしてIGをフォロー',
            'lightbox_close': '閉じる',
            'lightbox_prev': '前へ',
            'lightbox_next': '次へ',
            'lang_toggle_aria': '言語切替',
            'theme_toggle_aria': 'テーマ切替',
            'menu_toggle_aria': 'メニューを開く',
            'lang_toggle_title': '言語切り替え',
            'lightbox_img_alt': '拡大画像',
            'profile_img_alt': '劉峻瑋 Jun Wei Liu',
            'friend_img_alt': 'パートナー鐘明穎氏',
            'proj_acad_alt': 'ICCT-Pacific ベスト学生ポスター賞',
            'proj_drone_alt': 'ROS 2 自律ドローンAIナビゲーション',
            'proj_infra_alt': 'サーバ・NASインフラ構成',
            'proj_mfg_alt': '3Dプリンター改造・組立',
            'proj_ta_alt': '組み込みシステム・AIoTコース助教',
            'proj_grad_alt': '卒業式アカデミックドレス写真',
            'proj_travel_alt': '友人との旅行記念写真',
            'lang_zh': '繁体中国語',
            'lang_ja': '日本語',
            'lang_en': '英語',
            'lang_auto': 'システム設定',
            'page_title': '劉峻瑋 | Network Engineer & AIoT Developer'
        }
    };

    let activeLanguage = 'zh-TW';

    const getSystemLanguage = () => {
        const sysLang = navigator.language || navigator.userLanguage;
        if (sysLang.startsWith('zh')) return 'zh-TW';
        if (sysLang.startsWith('ja')) return 'ja';
        return 'en';
    };

    const updateLanguage = (lang) => {
        let targetLang = lang;
        if (lang === 'auto') {
            targetLang = getSystemLanguage();
        }
        
        activeLanguage = targetLang;
        document.documentElement.lang = targetLang;

        // Translate general text content
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[targetLang] && translations[targetLang][key] !== undefined) {
                if (el.tagName.toLowerCase() === 'title') {
                    document.title = translations[targetLang][key];
                } else {
                    el.innerHTML = translations[targetLang][key];
                }
            }
        });

        // Translate placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[targetLang] && translations[targetLang][key] !== undefined) {
                el.setAttribute('placeholder', translations[targetLang][key]);
            }
        });

        // Translate titles
        const titles = document.querySelectorAll('[data-i18n-title]');
        titles.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (translations[targetLang] && translations[targetLang][key] !== undefined) {
                el.setAttribute('title', translations[targetLang][key]);
            }
        });

        // Translate aria-labels
        const ariaLabels = document.querySelectorAll('[data-i18n-aria-label]');
        ariaLabels.forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            if (translations[targetLang] && translations[targetLang][key] !== undefined) {
                el.setAttribute('aria-label', translations[targetLang][key]);
            }
        });

        // Translate image alt attributes
        const alts = document.querySelectorAll('[data-i18n-alt]');
        alts.forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            if (translations[targetLang] && translations[targetLang][key] !== undefined) {
                el.setAttribute('alt', translations[targetLang][key]);
            }
        });

        // Update active class in dropdown options
        langOptions.forEach(opt => {
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });

        // Re-render Lucide icons for newly injected elements
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Store preference
        localStorage.setItem('lang', lang);
    };

    // Dropdown toggle events
    const langToggleBtn = document.getElementById('lang-toggle');
    const langMenu = document.getElementById('lang-menu');
    const langOptions = document.querySelectorAll('.lang-option');

    langToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!langToggleBtn.contains(e.target) && !langMenu.contains(e.target)) {
            langMenu.classList.remove('show');
        }
    });

    langOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const selectedLang = opt.getAttribute('data-lang');
            updateLanguage(selectedLang);
            langMenu.classList.remove('show');
        });
    });

    // Initialize Language
    const savedLang = localStorage.getItem('lang') || 'auto';
    updateLanguage(savedLang);

    // 4. Mobile Navigation Menu
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            }
        }
    });

    // 5. Navbar scroll class addition
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 6. Scroll Spy (Highlight active nav link)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 150; // offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 7. Geek Interactive Terminal Emulator
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const terminalHistory = document.getElementById('terminal-history');

    // Make clicking the terminal anywhere focus the input
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });

    // Process Terminal Commands
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const commandText = terminalInput.value.trim();
            const lowerCmd = commandText.toLowerCase();
            
            if (commandText === '') return;

            // 1. Create history line for current command
            const userLine = document.createElement('div');
            userLine.className = 'terminal-line';
            userLine.innerHTML = `<span class="term-prompt">guest@junwei-host:~$</span> <span class="term-command">${commandText}</span>`;
            terminalHistory.appendChild(userLine);

            // 2. Create output element
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-output';

            // 3. Logic router
            switch (lowerCmd) {
                case 'help':
                    outputLine.innerText = translations[activeLanguage]['term_help'];
                    break;
                case 'experience':
                    outputLine.innerText = translations[activeLanguage]['term_experience'];
                    break;
                case 'skills':
                    outputLine.innerText = translations[activeLanguage]['term_skills'];
                    break;
                case 'projects':
                    outputLine.innerText = translations[activeLanguage]['term_projects'];
                    break;
                case 'contact':
                    outputLine.innerText = translations[activeLanguage]['term_contact'];
                    break;
                case 'clear':
                    terminalHistory.innerHTML = '';
                    outputLine.style.display = 'none';
                    // clear preset elements as well
                    const presets = terminalBody.querySelectorAll('.terminal-line:not(.terminal-input-line), .terminal-output');
                    presets.forEach(p => p.remove());
                    break;
                case 'neofetch':
                    outputLine.className = 'terminal-output neofetch-output';
                    outputLine.innerHTML = translations[activeLanguage]['term_neofetch'];
                    break;
                case 'gui':
                    outputLine.innerText = translations[activeLanguage]['term_gui_msg'];
                    setTimeout(() => {
                        document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                    break;
                default:
                    const errMsg = translations[activeLanguage]['term_cmd_not_found'].replace('{cmd}', commandText);
                    outputLine.innerHTML = errMsg;
            }

            if (lowerCmd !== 'clear') {
                terminalHistory.appendChild(outputLine);
            }
            
            // Clear input and scroll down
            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });

    // 7. Skills Tab Switching & Progress Bar Animation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Function to trigger progress bar loading
    const animateTabBars = (pane) => {
        const progressBars = pane.querySelectorAll('.skill-progress-bar');
        progressBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress');
            bar.style.width = targetWidth;
        });
    };

    // Animate default active tab's bars
    const activePane = document.querySelector('.tab-pane.active');
    if (activePane) {
        // slightly delay to ensure DOM styling is ready
        setTimeout(() => animateTabBars(activePane), 200);
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active to clicked button and target pane
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(`tab-${tabId}`);
            targetPane.classList.add('active');
            
            // Trigger animation on progress bars
            animateTabBars(targetPane);
        });
    });

    // 8. Portfolio Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active btn
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    // Mini timeout to trigger CSS transitions smoothly
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Match the CSS transition duration
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 9. Contact Form Validation and Mock Submission
    const contactForm = document.getElementById('contact-form');
    const formSuccessAlert = document.getElementById('form-success-alert');
    const btnSubmit = document.getElementById('btn-submit');
    const btnResetForm = document.getElementById('btn-reset-form');
    
    const fields = {
        name: { input: document.getElementById('form-name'), error: document.getElementById('name-error') },
        email: { input: document.getElementById('form-email'), error: document.getElementById('email-error') },
        subject: { input: document.getElementById('form-subject'), error: document.getElementById('subject-error') },
        message: { input: document.getElementById('form-message'), error: document.getElementById('message-error') }
    };

    // Regex for basic email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper to validate single field
    const validateField = (fieldKey) => {
        const field = fields[fieldKey];
        const val = field.input.value.trim();
        const parent = field.input.parentElement;
        
        let isValid = true;
        
        if (fieldKey === 'email') {
            isValid = emailRegex.test(val);
        } else {
            isValid = val !== '';
        }
        
        if (isValid) {
            parent.classList.remove('invalid');
        } else {
            parent.classList.add('invalid');
        }
        
        return isValid;
    };

    // Remove errors dynamically when user types
    Object.keys(fields).forEach(key => {
        fields[key].input.addEventListener('input', () => {
            const parent = fields[key].input.parentElement;
            if (parent.classList.contains('invalid')) {
                validateField(key);
            }
        });
    });

    // Form Submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        Object.keys(fields).forEach(key => {
            const isFieldValid = validateField(key);
            if (!isFieldValid) isFormValid = false;
        });

        if (isFormValid) {
            // Trigger submit loading status
            btnSubmit.setAttribute('disabled', 'true');
            const sendingText = (translations[activeLanguage] && translations[activeLanguage]['form_btn_sending']) || 'Sending...';
            btnSubmit.querySelector('.btn-text').textContent = sendingText;
            btnSubmit.querySelector('.btn-icon').classList.add('hide');
            btnSubmit.querySelector('.spinner').classList.remove('hide');

            // Simulate server network latency (1.5 seconds)
            setTimeout(() => {
                // Hide Form and Show Success Alert
                contactForm.classList.add('hide');
                formSuccessAlert.classList.remove('hide');
                
                // Reset submit button state
                btnSubmit.removeAttribute('disabled');
                const submitText = (translations[activeLanguage] && translations[activeLanguage]['form_btn_submit']) || 'Send Message';
                btnSubmit.querySelector('.btn-text').textContent = submitText;
                btnSubmit.querySelector('.btn-icon').classList.remove('hide');
                btnSubmit.querySelector('.spinner').classList.add('hide');
            }, 1500);
        }
    });

    // Reset Form to send another message
    btnResetForm.addEventListener('click', () => {
        // Reset inputs
        contactForm.reset();
        Object.keys(fields).forEach(key => {
            fields[key].input.parentElement.classList.remove('invalid');
        });
        
        // Toggle view
        formSuccessAlert.classList.add('hide');
        contactForm.classList.remove('hide');
    });

    // 10. Lightbox Gallery Modal
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const btnClose = document.getElementById('lightbox-close');
    const btnPrev = document.getElementById('lightbox-prev');
    const btnNext = document.getElementById('lightbox-next');

    // Photo databases for each project
    const galleries = {
        academic: [
            { src: 'assets/project-academic.jpg', caption: 'ICCT-Pacific 國際學術會議 - 榮獲最佳學生海報獎 (Best Student Poster Award) 頒獎合影', caption_key: 'gallery_acad_1' },
            { src: 'assets/IMG_20260329_101926.jpg', caption: '日本山口大學 - IEEE ICCT-Pacific 會議現場海報展展示與講解', caption_key: 'gallery_acad_2' },
            { src: 'assets/IMG_20260330_104057.jpg', caption: '最佳學生海報獎 (Best Student Poster Award) 官方學術研討獎狀', caption_key: 'gallery_acad_3' },
            { src: 'assets/IMG_20260328_191334.jpg', caption: '與日本山口大學的大學生及參會學者於晚宴中進行學術與文化交流', caption_key: 'gallery_acad_4' },
            { src: 'assets/IMG_20260329_185750.jpg', caption: '研討會晚宴 - 欣賞日本山口溫泉當地的傳統舞蹈表演', caption_key: 'gallery_acad_5' },
            { src: 'assets/IMG_20260329_201629865_HDR.jpg', caption: '在研討會晚宴上與參會的好友及合作夥伴們合影留念', caption_key: 'gallery_acad_6' },
            { src: 'assets/IMG_20260329_204830050_HDR.jpg', caption: 'IEEE研討會晚宴現場佈置與精緻會場環境', caption_key: 'gallery_acad_7' }
        ],
        drone: [
            { src: 'assets/project-drone.png', caption: 'ROS 2 無人機 AI 賦能自主飛行 - 開發邊緣端 YOLOv8 避障自主飛行控制系統', caption_key: 'gallery_drone_1' }
        ],
        assistant: [
            { src: 'assets/project-assistant.jpg', caption: '於嵌入式系統與 AIoT 課程擔任助教，進行課程教學與系統環境操作示範 (1)', caption_key: 'gallery_ta_1' },
            { src: 'assets/IMG_20260518_142139.jpg', caption: '於嵌入式系統與 AIoT 課程擔任助教，進行課程教學與系統環境操作示範 (2)', caption_key: 'gallery_ta_2' },
            { src: 'assets/IMG_20260518_142242.jpg', caption: '於嵌入式系統與 AIoT 課程擔任助教，進行課程教學與系統環境操作示範 (3)', caption_key: 'gallery_ta_3' }
        ],
        infra: [
            { src: 'assets/project-homelab.png', caption: '個人 Homelab 機櫃 - Proxmox PVE 集群虛擬化與 OpenWrt 軟路由 VLAN 拓撲佈置', caption_key: 'gallery_infra_1' }
        ],
        mfg: [
            { src: 'assets/project-3dprint.png', caption: '3D 列印機極客改裝 - Creality 主動雙軸硬體升級與 Klipper 韌體客製化調校', caption_key: 'gallery_mfg_1' }
        ],
        graduation: [
            { src: 'assets/grad-nfue-senior1.jpg', caption: '國立虎尾科技大學電子系 - 與實驗室的學長們拍學士服照 (1)', caption_key: 'gallery_grad_1' },
            { src: 'assets/grad-nfue-senior2.jpg', caption: '國立虎尾科技大學電子系 - 與實驗室的學長們拍學士服照 (2)', caption_key: 'gallery_grad_2' },
            { src: 'assets/grad-nfue-dean.jpg', caption: '國立虎尾科技大學電子系 - 畢業典禮與院長及實驗室學長合影', caption_key: 'gallery_grad_3' },
            { src: 'assets/grad-siluo-teacher.jpg', caption: '雲林西螺農工電子科 - 畢業時與班導楊媽穿著學士服合影留念', caption_key: 'gallery_grad_4' },
            { src: 'assets/grad-siluo-friend.jpg', caption: '雲林西螺農工電子科 - 畢業時與合作夥伴極摯友鐘明穎在西螺農工校園合影', caption_key: 'gallery_grad_5' }
        ],
        friends: [
            { src: 'assets/friend-okayama.jpg', caption: '日本岡山市 - 與朋友們一同造訪著名的「岡山城」合照', caption_key: 'gallery_friends_1' },
            { src: 'assets/friend-yamaguchi.jpg', caption: '日本山口大學 - 研討會發表期間與朋友們在校園景點合影留念', caption_key: 'gallery_friends_2' },
            { src: 'assets/friend-fongying.jpg', caption: '雲林西螺農工電子科 - 與合作夥伴極摯友鐘明穎在西螺農工校園合影', caption_key: 'gallery_friends_3' },
            { src: 'assets/IMG_20260331_125117466.jpg', caption: '日本廣島廿日市 - 與合作夥伴極摯友鐘明穎在著名景點嚴島神社合影留念', caption_key: 'gallery_friends_4' }
        ],
        ig: [
            { src: 'assets/IMG_20260614_201934_141.png', caption: '掃描 QR Code 追蹤我的 Instagram', caption_key: 'gallery_ig_1' }
        ]
    };

    let currentGallery = [];
    let currentIndex = 0;

    // Open lightbox function
    const openLightbox = (galleryKey, imageSrc) => {
        currentGallery = galleries[galleryKey] || [];
        // Find if the clicked image is in the gallery, else default to index 0
        const foundIndex = currentGallery.findIndex(item => imageSrc.includes(item.src));
        currentIndex = foundIndex !== -1 ? foundIndex : 0;

        updateLightboxContent();
        lightbox.classList.remove('hide');
        // trigger transitions
        setTimeout(() => lightbox.classList.add('active'), 50);
        document.body.style.overflow = 'hidden'; // lock background scroll
    };

    const updateLightboxContent = () => {
        if (currentGallery.length === 0) return;
        const currentItem = currentGallery[currentIndex];
        lightboxImg.src = currentItem.src;
        
        // Translate caption dynamically if key exists
        if (currentItem.caption_key && translations[activeLanguage] && translations[activeLanguage][currentItem.caption_key]) {
            lightboxCaption.textContent = translations[activeLanguage][currentItem.caption_key];
        } else {
            lightboxCaption.textContent = currentItem.caption;
        }

        // Toggle navigation arrows if there's only 1 image
        if (currentGallery.length <= 1) {
            btnPrev.style.display = 'none';
            btnNext.style.display = 'none';
        } else {
            btnPrev.style.display = 'flex';
            btnNext.style.display = 'flex';
        }
    };

    const nextImage = () => {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxContent();
    };

    const prevImage = () => {
        if (currentGallery.length === 0) return;
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxContent();
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // restore scroll
        setTimeout(() => lightbox.classList.add('hide'), 300);
    };

    // Attach click events to project cards
    const projectCardElements = document.querySelectorAll('.project-card');
    projectCardElements.forEach(card => {
        const img = card.querySelector('.project-img');
        const galleryKey = card.getAttribute('data-gallery');
        
        if (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                openLightbox(galleryKey, img.getAttribute('src'));
            });
        }
    });

    // Lightbox Controls Events
    btnClose.addEventListener('click', closeLightbox);
    btnNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    btnPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
    lightbox.addEventListener('click', closeLightbox); // Close when clicking backdrop
    
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent closing when clicking image itself
        nextImage(); // clicking image advances to next image
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });


    // Email Copy and Scroll Action
    const emailActions = document.querySelectorAll('.btn-email-action');
    emailActions.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = 'liu0308@liu0308.us.kg';
            const toastMsg = (translations[activeLanguage] && translations[activeLanguage]['toast_email_copied']) || 'Email address copied!';
            navigator.clipboard.writeText(email).then(() => {
                showToast(toastMsg);
            }).catch(err => {
                console.error('Could not copy email: ', err);
            });
            
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Toast notification function
    const showToast = (message) => {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <span class="toast-icon"><i data-lucide="check-circle"></i></span>
            <span>${message}</span>
        `;
        document.body.appendChild(toast);
        
        if (window.lucide) {
            window.lucide.createIcons();
        }
        
        setTimeout(() => toast.classList.add('show'), 50);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        }, 3000);
    };

    // 11. Scroll Reveal Intersection Observer
    const initScrollReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;

        const observerOptions = {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Trigger animation only once
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    };

    // Run scroll reveal init
    initScrollReveal();

    // 12. Interactive Background Particle System
    const initBgParticles = () => {
        const canvas = document.getElementById('bg-particles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId = null;
        let particles = [];
        let mouse = { x: null, y: null, active: false };
        
        let colors = getThemeColors();
        
        function getThemeColors() {
            const style = getComputedStyle(document.documentElement);
            const cyan = style.getPropertyValue('--accent-cyan').trim() || '#06b6d4';
            const purple = style.getPropertyValue('--accent-purple').trim() || '#8b5cf6';
            
            const parseColor = (col) => {
                if (col.startsWith('rgb')) {
                    const matches = col.match(/\d+/g);
                    if (matches && matches.length >= 3) {
                        return { r: parseInt(matches[0]), g: parseInt(matches[1]), b: parseInt(matches[2]) };
                    }
                }
                const cleanHex = col.replace('#', '').trim();
                const num = parseInt(cleanHex, 16);
                if (isNaN(num)) return { r: 6, g: 182, b: 212 };
                return {
                    r: (num >> 16) & 255,
                    g: (num >> 8) & 255,
                    b: num & 255
                };
            };
            
            return {
                cyan: parseColor(cyan),
                purple: parseColor(purple)
            };
        }

        // Setup resizing with support for devicePixelRatio
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = window.innerHeight;
            
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
            
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            
            // Adjust particles count based on screen size
            const area = width * height;
            // Desktop: ~85 particles, Mobile: ~25 particles
            const targetCount = Math.min(Math.floor(area / 18000), window.innerWidth < 768 ? 25 : 85);
            
            adjustParticlesCount(targetCount, width, height);
        };

        class Particle {
            constructor(w, h) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                // very slow and fluid motion
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 1.5 + 1; // 1px to 2.5px
                // Assign a color group (cyan or purple)
                this.colorType = Math.random() > 0.5 ? 'cyan' : 'purple';
                this.alpha = Math.random() * 0.4 + 0.3; // base opacity
            }

            update(w, h) {
                // Apply mouse interaction
                if (mouse.active && mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 180) {
                        // Gentle attraction force
                        const force = (180 - dist) / 180; // stronger force closer to cursor
                        this.vx += (dx / dist) * force * 0.02;
                        this.vy += (dy / dist) * force * 0.02;
                    }
                }

                // Apply simple friction/damping
                this.vx *= 0.98;
                this.vy *= 0.98;

                // Enforce max speed
                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                const maxSpeed = window.innerWidth < 768 ? 0.6 : 1.0;
                if (speed > maxSpeed) {
                    this.vx = (this.vx / speed) * maxSpeed;
                    this.vy = (this.vy / speed) * maxSpeed;
                }

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off boundaries with padding
                const pad = 10;
                if (this.x < -pad) {
                    this.x = w + pad;
                } else if (this.x > w + pad) {
                    this.x = -pad;
                }
                
                if (this.y < -pad) {
                    this.y = h + pad;
                } else if (this.y > h + pad) {
                    this.y = -pad;
                }
            }

            draw() {
                const color = this.colorType === 'cyan' ? colors.cyan : colors.purple;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${this.alpha})`;
                ctx.fill();
            }
        }

        const adjustParticlesCount = (targetCount, w, h) => {
            if (particles.length < targetCount) {
                while (particles.length < targetCount) {
                    particles.push(new Particle(w, h));
                }
            } else if (particles.length > targetCount) {
                particles.splice(targetCount);
            }
        };

        const drawConnections = () => {
            const maxDist = window.innerWidth < 768 ? 100 : 130;
            const w = window.innerWidth;
            const h = window.innerHeight;

            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                
                // Draw connection to mouse cursor
                if (mouse.active && mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - p1.x;
                    const dy = mouse.y - p1.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 150) {
                        const alpha = (1 - dist / 150) * 0.25;
                        const col = p1.colorType === 'cyan' ? colors.cyan : colors.purple;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Draw connections between nodes
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.15;
                        
                        // Select color based on node colors (gradient connection)
                        const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        const c1 = p1.colorType === 'cyan' ? colors.cyan : colors.purple;
                        const c2 = p2.colorType === 'cyan' ? colors.cyan : colors.purple;
                        
                        grad.addColorStop(0, `rgba(${c1.r}, ${c1.g}, ${c1.b}, ${alpha})`);
                        grad.addColorStop(1, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${alpha})`);
                        
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            
            ctx.clearRect(0, 0, w, h);

            // Draw a subtle mouse glow highlight
            if (mouse.active && mouse.x !== null && mouse.y !== null && window.innerWidth >= 768) {
                const isLight = document.documentElement.getAttribute('data-theme') === 'light';
                const radialGlow = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 250
                );
                
                if (isLight) {
                    radialGlow.addColorStop(0, `rgba(${colors.cyan.r}, ${colors.cyan.g}, ${colors.cyan.b}, 0.05)`);
                    radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
                } else {
                    radialGlow.addColorStop(0, `rgba(${colors.cyan.r}, ${colors.cyan.g}, ${colors.cyan.b}, 0.07)`);
                    radialGlow.addColorStop(1, 'rgba(8, 12, 20, 0)');
                }
                
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 250, 0, Math.PI * 2);
                ctx.fillStyle = radialGlow;
                ctx.fill();
            }

            // Update & Draw Particles
            particles.forEach(p => {
                p.update(w, h);
                p.draw();
            });

            // Draw lines between particles
            drawConnections();

            animationFrameId = requestAnimationFrame(animate);
        };

        // Event listeners
        window.addEventListener('resize', resizeCanvas);
        
        const updateMousePosition = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener('mousemove', updateMousePosition);
        
        window.addEventListener('mouseenter', () => {
            mouse.active = true;
        });

        window.addEventListener('mouseleave', () => {
            mouse.active = false;
            mouse.x = null;
            mouse.y = null;
        });

        // Touch support for tablets/mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                mouse.active = true;
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        });

        window.addEventListener('touchend', () => {
            mouse.active = false;
            mouse.x = null;
            mouse.y = null;
        });

        // MutationObserver for detecting theme toggle and updating colors dynamically
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    colors = getThemeColors();
                }
            });
        });
        
        observer.observe(document.documentElement, { attributes: true });

        // Initialize
        resizeCanvas();
        animate();
    };

    // Run particles background
    initBgParticles();
});
