// 4合1 命理占卜系統 - Core Application Logic

document.addEventListener('DOMContentLoaded', () => {
    initStarfield();
    initForm();
    initTabs();
});

// ==========================================
// 1. Starfield Background (Canvas Particle System)
// ==========================================
function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 150;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                fadeSpeed: Math.random() * 0.015 + 0.005,
                fading: Math.random() > 0.5
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw subtle space gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#06020f');
        gradient.addColorStop(0.5, '#0f0c20');
        gradient.addColorStop(1, '#06020f');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw stars
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            
            // twinkle logic
            if (star.fading) {
                star.opacity -= star.fadeSpeed;
                if (star.opacity <= 0.1) {
                    star.fading = false;
                }
            } else {
                star.opacity += star.fadeSpeed;
                if (star.opacity >= 0.9) {
                    star.fading = true;
                }
            }

            ctx.fillStyle = `rgba(243, 229, 171, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();
}

// ==========================================
// 2. Tab Navigation
// ==========================================
function initTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetTab = link.getAttribute('data-tab');

            // Toggle active class on links
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Toggle active class on panels
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    // Trigger fade in animation
                    setTimeout(() => {
                        panel.classList.add('active');
                    }, 50);
                }
            });
        });
    });
}

// ==========================================
// 3. Form Submission & Control Flow
// ==========================================
function initForm() {
    const form = document.getElementById('fortune-form');
    const inputSection = document.getElementById('input-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const recalcBtn = document.getElementById('recalc-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading screen with mystic ceremony delay (2 seconds)
        inputSection.classList.add('hidden');
        loadingSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            // Run all fortune telling logic
            calculateAllFortune();
            
            // Switch from loading to result dashboard
            loadingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
            
            // Set first tab as active default
            document.querySelector('.tab-link[data-tab="tab-bazi"]').click();
        }, 2000);
    });

    recalcBtn.addEventListener('click', () => {
        // Clear name and go back to inputs
        document.getElementById('user-name').value = '';
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================
// 4. Fortune Calculations Engine
// ==========================================

// Constants for Chinese Stems and Branches
const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC_SIGNS = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];
const ZODIAC_EMOJIS = ['🐭', '🐮', '🐯', '🐰', '🐲', '🐍', '🐴', '🐑', '🐵', '🐔', '🐶', '🐷'];

const WUXING_MAP = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
    '寅': '木', '卯': '木', '巳': '火', '午': '火', '辰': '土', '戌': '土', '丑': '土', '未': '土', '申': '金', '酉': '金',
    '亥': '水', '子': '水'
};

const WUXING_CLASS = {
    '金': 'element-gold',
    '木': 'element-wood',
    '水': 'element-water',
    '火': 'element-fire',
    '土': 'element-earth'
};

// Common Chinese Character Stroke Database (Offline lookup dictionary)
const COMMON_STROKES = {
    '王': 4, '李': 7, '張': 11, '劉': 15, '陳': 16, '楊': 13, '黃': 12, '趙': 14, '周': 8, '吳': 7, '徐': 10, '孫': 10,
    '胡': 9, '朱': 6, '高': 10, '林': 8, '何': 7, '郭': 11, '馬': 10, '羅': 19, '梁': 11, '宋': 7, '鄭': 15, '謝': 17,
    '韓': 17, '唐': 10, '馮': 15, '于': 3, '董': 12, '蕭': 16, '程': 12, '曹': 11, '袁': 10, '鄧': 15, '許': 11, '傅': 12,
    '沈': 7, '曾': 12, '彭': 12, '呂': 7, '蘇': 19, '盧': 16, '蔣': 15, '蔡': 15, '賈': 13, '丁': 2, '魏': 18, '薛': 16,
    '葉': 13, '閻': 16, '余': 7, '潘': 15, '杜': 7, '戴': 17, '夏': 10, '鍾': 17, '汪': 7, '田': 5, '任': 6, '姜': 9,
    '範': 15, '方': 4, '石': 5, '廖': 14, '金': 8, '陸': 11, '郝': 10, '孔': 4, '白': 5, '崔': 11, '康': 11, '毛': 4,
    '邱': 8, '秦': 10, '江': 6, '史': 5, '顧': 21, '侯': 9, '邵': 7, '孟': 8, '龍': 16, '萬': 13, '段': 9, '雷': 13,
    '錢': 16, '湯': 12, '尹': 4, '黎': 15, '易': 8, '常': 11, '武': 8, '喬': 12, '賀': 12, '賴': 16, '龔': 22, '文': 4,
    '一': 1, '二': 2, '三': 3, '四': 5, '五': 4, '六': 4, '七': 2, '八': 2, '九': 2, '十': 2, '小': 3, '大': 3, '中': 4,
    '明': 8, '華': 10, '國': 11, '家': 10, '豪': 14, '宇': 6, '軒': 10, '婷': 12, '雅': 12, '怡': 8, '欣': 8, '涵': 11,
    '晨': 11, '睿': 14, '皓': 12, '翔': 12, '君': 7, '佳': 8, '俊': 9, '偉': 11, '哲': 10, '志': 7, '建': 9, '文': 4,
    '冠': 9, '博': 12, '淑': 11, '芬': 7, '美': 9, '麗': 19, '靜': 16, '娟': 10, '惠': 12, '倩': 10, '雨': 8, '洋': 9
};

function getCharStrokes(char) {
    if (COMMON_STROKES[char]) {
        return COMMON_STROKES[char];
    }
    // Fallback: Unicode-based stable stroke generation (returns range 3 to 20 based on char code)
    const code = char.charCodeAt(0);
    return 3 + (code % 18);
}

function calculateAllFortune() {
    const name = document.getElementById('user-name').value.trim() || '無名氏';
    const genderVal = document.querySelector('input[name="gender"]:checked').value;
    const genderText = genderVal === 'male' ? '乾造 (男)' : '坤造 (女)';
    const birthDateStr = document.getElementById('birth-date').value;
    const hourVal = parseInt(document.getElementById('birth-hour').value);

    const birthDate = new Date(birthDateStr);
    
    // Quick Profile Badges
    document.getElementById('badge-name').innerText = name;
    document.getElementById('badge-gender').innerText = genderVal === 'male' ? '男' : '女';
    document.getElementById('badge-date').innerText = birthDateStr + ' ' + document.getElementById('birth-hour').options[hourVal].text.split(' ')[0];

    // 1. Calculate Western Horoscope
    const horo = getHoroscope(birthDate);
    document.getElementById('badge-horoscope').innerText = horo.name;
    
    // 2. Calculate Chinese Zodiac
    const zodiac = getZodiac(birthDate);
    document.getElementById('badge-zodiac').innerText = zodiac.name;

    // 3. Calculate Bazi (Four Pillars)
    const bazi = calculateBazi(birthDate, hourVal, genderVal);

    // 4. Calculate Name (San Cai Wu Ge)
    const nameAnalysis = calculateNameSanCai(name);

    // 5. Render Bazi panel
    renderBazi(bazi);
    
    // 6. Render Name panel
    renderName(nameAnalysis);
    
    // 7. Render Zodiac panel
    renderZodiac(zodiac, birthDate.getFullYear());
    
    // 8. Render Horoscope panel
    renderHoroscope(horo);
}

// ==========================================
// 4.1 Western Horoscope Calculations
// ==========================================
function getHoroscope(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const horoData = [
        { name: '摩羯座', emoji: '♑', range: [12, 22, 1, 19], planet: '土星', element: '土象', color: '深灰色、棕色', number: '8', desc: '摩羯座是象徵著堅忍與成就的星座。您具有極強的責任感與毅力，做事腳踏實地。在人生的道路上，您善於默默耕耘，終能攀上事業與生活的高峰。今年您的運勢偏向沉穩，適合做長期規劃與實力累積。' },
        { name: '水瓶座', emoji: '♒', range: [1, 20, 2, 18], planet: '天王星', element: '風象', color: '天藍色、霓虹色', number: '4', desc: '水瓶座代表創新與人道主義。您擁有獨特的思考模式與前瞻性的眼光，不甘隨波逐流。渴望自由的您，常是朋友中的智囊與創意的發起者。目前的星象非常利於您的思維擴展，可能會有新奇的靈光乍現，促成生活圈的轉變。' },
        { name: '雙魚座', emoji: '♓', range: [2, 19, 3, 20], planet: '海王星', element: '水象', color: '粉綠色、海藍色', number: '7', desc: '雙魚座是黃道十二宮的終點，象徵包容與靈性。您直覺敏銳，內心深處溫柔且極富同理心。藝術天賦或第六感往往高於常人，但有時容易陷入感性與幻想。近期運勢顯示您的直覺力極強，適合聽從內心的指引，調整心靈健康。' },
        { name: '牡羊座', emoji: ' Aries ♈', emojiRaw: '♈', range: [3, 21, 4, 19], planet: '火星', element: '火象', color: '鮮紅色、金色', number: '9', desc: '牡羊座是開拓先鋒。您精力充沛、熱情洋溢，充滿了行動力與冒險精神。面對困難，您總能挺身而出、直面挑戰，但有時稍顯衝動。星象吉兆顯示，今年您有開創新局面的絕佳機遇，無論是創業或新企劃，都值得全力以赴。' },
        { name: '金牛座', emoji: '♉', range: [4, 20, 5, 20], planet: '金星', element: '土象', color: '翠綠色、粉紅色', number: '6', desc: '金牛座是品味與穩定的代名詞。您熱愛一切美好的事物，注重感官享受與生活品質，性格溫和沉穩、忠誠度高，但性格較為固執。財運與理財是您的強項。當前運勢非常利於您穩步積累資產，愛情方面也迎來了溫馨穩固的時期。' },
        { name: '雙子座', emoji: '♊', range: [5, 21, 6, 21], planet: '水星', element: '風象', color: '明黃色、淺綠色', number: '5', desc: '雙子座代表智慧的交流與變革。您心思敏捷、口才流利，具備極強的學習能力與適應力。對世界充滿好奇心的您，樂於吸收各類新知，唯需注意避免三分鐘熱度。今年適合拓展人脈，透過多方合作能為事業注入全新活力。' },
        { name: '巨蟹座', emoji: '♋', range: [6, 22, 7, 22], planet: '月亮', element: '水象', color: '銀白色、珍珠色', number: '2', desc: '巨蟹座是母性與家庭的守护者。您情感細膩、防衛心強，對身邊的人充滿了關懷與體貼。直覺極強的您，往往能敏銳捕捉周圍的氣氛變化。近期星象建議您花時間整理內心與居家環境，家人的支持將成為您向前邁進的最大動力。' },
        { name: '獅子座', emoji: '♌', range: [7, 23, 8, 22], planet: '太陽', element: '火象', color: '金黃色、橘紅色', number: '1', desc: '獅子座是天生的王者。您慷慨大方、信心十足，舉手投足間充滿了領袖魅力，渴望成為焦點。熱愛舞台與挑戰的您，在事業上總能引領風潮，但應防範過度自滿。當前運勢非常利於您在公眾場合展現才華，升遷運極佳。' },
        { name: '處女座', emoji: '♍', range: [8, 23, 9, 22], planet: '水星', element: '土象', color: '米色、淡藍色', number: '3', desc: '處女座是完美主義與秩序的追求者。您分析能力卓越，做事條理分明、精益求精。強烈的責任感使您在工作上十分可靠，但也給了自己過大的精神壓力。目前是整頓生活作息與細節的絕佳時機，放鬆心情，運勢會更加順遂。' },
        { name: '天秤座', emoji: '♎', range: [9, 23, 10, 23], planet: '金星', element: '風象', color: '皇家藍、粉藍色', number: '2', desc: '天秤座是和諧與美感的象徵。您優雅迷人，善於協調人際關係，追求公平與正義，在社交場合中往往極受歡迎。對藝術與生活美學有獨到見解。今年桃花運與合作運旺盛，適合透過良好的人際互動來突破事業瓶頸。' },
        { name: '天蠍座', emoji: '♏', range: [10, 24, 11, 22], planet: '冥王星', element: '水象', color: '深紅色、黑色', number: '0', desc: '天蠍座代表洞察、蛻變與強烈的情感。您擁有極佳的直覺與驚人的意志力，能看穿事物的本質。不畏困難的您，在逆境中往往能浴火重生，但對人防禦心較重。目前星座能量集中在您的轉型期，適合斷捨離不合時宜的人事物。' },
        { name: '射手座', emoji: '♐', range: [11, 23, 12, 21], planet: '木星', element: '火象', color: '紫藍色、深紫色', number: '3', desc: '射手座代表真理與自由的追求。您樂觀開朗、思想開明，熱愛旅行與心靈探索。豐富的冒險精神讓您勇於踏出舒適圈，追求更高的視野，但有時缺乏耐心。今年偏財運與遠行運佳，多出門走動或學習外國文化能為您開拓好運。' }
    ];

    // Align emoji for Aries
    horoData[3].emoji = '♈';

    for (let h of horoData) {
        const [sm, sd, em, ed] = h.range;
        if (
            (month === sm && day >= sd) ||
            (month === em && day <= ed) ||
            (sm === 12 && month === 12 && day >= 22) ||
            (sm === 12 && month === 1 && day <= 19)
        ) {
            return h;
        }
    }
    return horoData[0]; // fallback
}

// ==========================================
// 4.2 Chinese Zodiac Calculations
// ==========================================
function getZodiac(date) {
    const year = date.getFullYear();
    // Simplified: Chinese new year falls around early Feb. If date is before Feb 4 (approximate Li Chun), shift year.
    let adjustedYear = year;
    if (date.getMonth() === 0 || (date.getMonth() === 1 && date.getDate() < 4)) {
        adjustedYear = year - 1;
    }

    const index = (adjustedYear - 4) % 12;
    const branch = BRANCHES[index];
    const zodiacName = ZODIAC_SIGNS[index];
    const emoji = ZODIAC_EMOJIS[index];

    // Compatibility rules based on branch indices
    // 三合 (Three Harmonies): +4 and +8 steps
    const sanhe1 = ZODIAC_SIGNS[(index + 4) % 12];
    const sanhe2 = ZODIAC_SIGNS[(index + 8) % 12];
    // 六合 (Six Harmonies) pairs: (0,11), (1,10), (2,9), (3,8), (4,7), (5,6)
    const liuheMap = {0:11, 1:10, 2:9, 3:8, 4:7, 5:6, 6:5, 7:4, 8:3, 9:2, 10:1, 11:0};
    const liuhe = ZODIAC_SIGNS[liuheMap[index]];
    // 相衝 (Conflict): +6 steps
    const chong = ZODIAC_SIGNS[(index + 6) % 12];

    const zodiacDesc = {
        '鼠': '生肖屬鼠的人聰明伶俐、反應敏捷，觀察力極其敏銳，善於把握身邊的每一個機遇。您具有很強的環境適應力與理財智慧，但在細節上可能較為多疑。今年屬鼠者逢太歲合局，凡事多有貴人相助，工作上努力易有成果，切忌過度勞累。',
        '牛': '生肖屬牛的人勤奮踏實、富有耐性與責任感，是典型的實幹家。您做事一步一腳印，行事穩重可靠，但有時思維稍顯保守，不易接受變革。今年屬牛者運勢平穩，在事業上多需靠自身辛勤付出累積成果，財運上宜守不宜攻。',
        '虎': '生肖屬虎的人勇敢開朗、雄心萬丈，富有開拓精神與領導氣質。您行事果斷，樂於挑戰權威與逆境，但有時做事稍顯急躁。今年屬虎者流年運勢回暖，阻礙大減，特別是事業上有突破升遷的良機，唯需注意收斂脾氣，防口舌是非。',
        '兔': '生肖屬兔的人溫柔善良、心思細膩，追求和平與和諧的生活環境。您極具審美眼光，待人接物彬彬有禮，但內心較為敏感防備。今年屬兔者運勢平穩提升，人緣方面相當不錯，適合拓展社交圈；健康上多注意睡眠與消化系統。',
        '龍': '生肖屬龍的人天生具備領袖風範、才華橫溢，對理想有著強烈的執著。您慷慨熱情、不甘平庸，但有時過於高傲、不易妥協。今年屬龍者有吉星照臨，特別適合在專業領域大展拳腳，能獲得上司器重；感情上宜多包容另一半。',
        '蛇': '生肖屬蛇的人神秘睿智、洞察力強，行事深謀遠慮，極具智慧。您冷靜沉著，在紛亂的局勢中能保持理智，但有時給人以距離感。今年屬蛇者逢流年平順，思緒清晰，利於學術研究或策劃工作，財運方面有偏財進帳。',
        '馬': '生肖屬馬的人熱情奔放、崇尚自由，精力旺盛且做事效率極高。您樂天開朗，擅長帶動周圍氣氛，但耐心稍顯不足，容易虎頭蛇尾。今年屬馬者運勢較為奔波，適合出差、遠行或向外發展，「動中生財」是今年的核心趨勢。',
        '羊': '生肖屬羊的人溫和孝順、富同理心，內心堅韌，具有極強的藝術與創造才華。您做事細緻體貼，但容易因他人看法而陷入自我糾結。今年屬羊者逢太歲三合，運勢頗具看頭，事業愛情兩得意，多與生肖兔、豬的人交流能帶來好運。',
        '猴': '生肖屬猴的人活潑好動、機智幽默，學習能力極強，充滿創造力與好奇心。您點子多、適應力極佳，但有時缺乏持久的毅力。今年屬猴者得貴人暗中扶持，事業上會出現意想不到的突破口，理財方面要避免盲目投資。',
        '雞': '生肖屬雞的人精明強幹、行事果斷，具有極強的組織與交際能力。您注重外在形象，坦率真誠，但有時講話過於直接。今年屬雞者流年逢六合，各方面運勢相當順意，合作談判進展順利，人緣桃花極旺，宜把握時機。',
        '狗': '生肖屬狗的人忠誠可靠、富有正義感，待人真誠，是極其值得信賴的朋友。您做事實事求是，防禦心較強，重視承諾。今年屬狗者逢衝太歲，運勢波動較大，面臨較多變化（如搬遷、換工作），宜保持平穩心態，靜觀其變。',
        '豬': '生肖屬豬的人豁達大度、真誠善良，注重生活情趣，是天生的樂天派。您人緣極佳，福澤深厚，但有時做事稍顯懶散。今年屬豬者整體運勢極佳，生活安逸，偶有小財神關照；事業上多聽取他人建議，可事半功倍。'
    };

    return {
        name: `屬${zodiacName}`,
        branch: branch,
        emoji: emoji,
        zodiacChar: zodiacName,
        sanhe: `${sanhe1}、${sanhe2}`,
        liuhe: liuhe,
        chong: chong,
        desc: zodiacDesc[zodiacName]
    };
}

// ==========================================
// 4.3 Bazi Gregorian to Ganzhi Calculations
// ==========================================
function calculateBazi(date, hourVal, gender) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 1. Year Pillar (年柱)
    let baziYear = year;
    // Li Chun (立春) approximation (Feb 4th)
    if (month === 1 || (month === 2 && day < 4)) {
        baziYear = year - 1;
    }
    const yearIndex = (baziYear - 4) % 60;
    const yearStem = STEMS[yearIndex % 10];
    const yearBranch = BRANCHES[yearIndex % 12];

    // 2. Month Pillar (月柱)
    // Find Solar term month index (0: 寅月/立春, 1: 卯月/驚蟄 ... 11: 丑月/小寒)
    let monthBranchIndex = 0;
    if (month === 2 && day >= 4) monthBranchIndex = 0; // 寅月 starts around Feb 4
    else if (month === 3 && day >= 6) monthBranchIndex = 1; // 卯月 starts around Mar 6
    else if (month === 4 && day >= 5) monthBranchIndex = 2; // 辰月 starts around Apr 5
    else if (month === 5 && day >= 6) monthBranchIndex = 3; // 巳月 starts around May 6
    else if (month === 6 && day >= 6) monthBranchIndex = 4; // 芒種 starts around Jun 6
    else if (month === 7 && day >= 7) monthBranchIndex = 5; // 未月 starts around Jul 7
    else if (month === 8 && day >= 8) monthBranchIndex = 6; // 申月 starts around Aug 8
    else if (month === 9 && day >= 8) monthBranchIndex = 7; // 酉月 starts around Sep 8
    else if (month === 10 && day >= 8) monthBranchIndex = 8; // 戌月 starts around Oct 8
    else if (month === 11 && day >= 7) monthBranchIndex = 9; // 亥月 starts around Nov 7
    else if (month === 12 && day >= 7) monthBranchIndex = 10; // 子月 starts around Dec 7
    else if (month === 1 && day >= 6) monthBranchIndex = 11; // 丑月 starts around Jan 6
    else {
        // Before terms date, belongs to previous month branch
        monthBranchIndex = (month + 9) % 12; // conversion mapping
    }
    const monthBranch = BRANCHES[monthBranchIndex];
    
    // Month Stem calculated from Year Stem (五虎遁)
    // 甲己之年丙作首，乙庚之歲戊為頭，丙辛之歲尋庚上，丁壬壬位順水流，若問戊癸何方法，甲寅之上好追求。
    const yearStemIndex = STEMS.indexOf(yearStem);
    let startMonthStemIndex = 0;
    if (yearStemIndex === 0 || yearStemIndex === 5) startMonthStemIndex = 2; // 丙
    else if (yearStemIndex === 1 || yearStemIndex === 6) startMonthStemIndex = 4; // 戊
    else if (yearStemIndex === 2 || yearStemIndex === 7) startMonthStemIndex = 6; // 庚
    else if (yearStemIndex === 3 || yearStemIndex === 8) startMonthStemIndex = 8; // 壬
    else if (yearStemIndex === 4 || yearStemIndex === 9) startMonthStemIndex = 0; // 甲
    
    const monthStemIndex = (startMonthStemIndex + monthBranchIndex) % 10;
    const monthStem = STEMS[monthStemIndex];

    // 3. Day Pillar (日柱)
    // Exact day difference from Julian reference date: 1900-01-01 (was 甲戌 day, index 10 in 60 Ganzhi cycle)
    const refDate = new Date(1900, 0, 1);
    const timeDiff = date.getTime() - refDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const dayGanzhiIndex = (10 + daysDiff) % 60;
    const dayStem = STEMS[dayGanzhiIndex % 10];
    const dayBranch = BRANCHES[dayGanzhiIndex % 12];

    // 4. Hour Pillar (時柱)
    // Hour branch index based on hour select value (0 for 子, 1 for 丑 etc)
    const hourBranch = BRANCHES[hourVal];
    // Hour Stem calculated from Day Stem (五鼠遁)
    // 甲己還加甲，乙庚丙作初，丙辛從戊起，丁壬庚子居，戊癸何方發，壬子是真途。
    const dayStemIndex = STEMS.indexOf(dayStem);
    let startHourStemIndex = 0;
    if (dayStemIndex === 0 || dayStemIndex === 5) startHourStemIndex = 0; // 甲
    else if (dayStemIndex === 1 || dayStemIndex === 6) startHourStemIndex = 2; // 丙
    else if (dayStemIndex === 2 || dayStemIndex === 7) startHourStemIndex = 4; // 戊
    else if (dayStemIndex === 3 || dayStemIndex === 8) startHourStemIndex = 6; // 庚
    else if (dayStemIndex === 4 || dayStemIndex === 9) startHourStemIndex = 8; // 壬

    const hourStemIndex = (startHourStemIndex + hourVal) % 10;
    const hourStem = STEMS[hourStemIndex];

    // 5. Five Elements Calculation
    const stemsList = [yearStem, monthStem, dayStem, hourStem];
    const branchesList = [yearBranch, monthBranch, dayBranch, hourBranch];
    
    const counts = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
    stemsList.forEach(s => counts[WUXING_MAP[s]]++);
    branchesList.forEach(b => counts[WUXING_MAP[b]]++);
    
    const totalChars = 8;
    const pct = {
        gold: Math.round((counts['金'] / totalChars) * 100),
        wood: Math.round((counts['木'] / totalChars) * 100),
        water: Math.round((counts['水'] / totalChars) * 100),
        fire: Math.round((counts['火'] / totalChars) * 100),
        earth: Math.round((counts['土'] / totalChars) * 100)
    };

    // Day Stem (日主) represents the User
    const rizhuElement = WUXING_MAP[dayStem];
    
    // Evaluate strength of Rizhu
    // Simplistic: if day branch or month branch matches rizhu's element, or resource element feeds it, it is strong.
    const resourceMap = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };
    const friendElement = rizhuElement;
    const resourceElement = resourceMap[rizhuElement];
    
    let supportScore = 0;
    stemsList.forEach(s => {
        if (WUXING_MAP[s] === friendElement) supportScore += 1;
        if (WUXING_MAP[s] === resourceElement) supportScore += 1;
    });
    branchesList.forEach(b => {
        if (WUXING_MAP[b] === friendElement) supportScore += 1.5;
        if (WUXING_MAP[b] === resourceElement) supportScore += 1.5;
    });
    
    const isStrong = supportScore >= 4;
    const rizhuStrengthText = isStrong ? '身強' : '身弱';
    
    // Favorable element (喜用神)
    // If Strong: favors elements that weaken it (Metal/Fire/Earth for Wood).
    // If Weak: favors elements that support it (Water/Wood for Wood).
    let yongshen = '';
    const weakenMap = {
        '木': ['火', '土', '金'],
        '火': ['土', '金', '水'],
        '土': ['金', '水', '木'],
        '金': ['水', '木', '火'],
        '水': ['木', '火', '土']
    };
    const supportList = [rizhuElement, resourceElement];
    const weakenList = weakenMap[rizhuElement];
    
    if (isStrong) {
        // Find the weakest among the weakening elements
        let minCount = 9;
        weakenList.forEach(e => {
            if (counts[e] < minCount) {
                minCount = counts[e];
                yongshen = e;
            }
        });
    } else {
        // Find the strongest among the supporting elements
        let maxCount = -1;
        supportList.forEach(e => {
            if (counts[e] > maxCount) {
                maxCount = counts[e];
                yongshen = e;
            }
        });
    }

    // Generate descriptive texts
    const rizhuDesc = `您的命盤日元（日主）為【${dayStem}${rizhuElement}】。日元代表您本人的核心本質。性格特徵上，【${dayStem}】命格之人，在五行中屬【${rizhuElement}】。${
        rizhuElement === '木' ? '您就如同林木一般，心地慈悲、富有同理心，向上心強，具備極佳的成長潛力，但有時倔強不願服輸。' :
        rizhuElement === '火' ? '您就如同熊熊火焰一般，熱情奔放、做事積極爽快，待人真誠，處事風風火火，但有時性子較急、缺乏耐性。' :
        rizhuElement === '土' ? '您就如同厚重大地一般，性格沉穩寬厚、忠厚老實，極具包容力，做事認真負責，但有時較為固執、不善變通。' :
        rizhuElement === '金' ? '您就如同鋼鐵利刃一般，為人仗義直爽、做事果斷幹練，有很強的執行力與正義感，但有時說話較為犀利傷人。' :
        '您就如同奔流之水一般，聰明機智、隨機應變能力極強，思維開闊且充滿想像力，但有時情緒起伏較大、缺乏定性。'
    } 命盤呈現【${rizhuStrengthText}】格。`;

    const wuxingDesc = `您的八字五行分佈：金：${counts['金']}個、木：${counts['木']}個、水：${counts['水']}個、火：${counts['火']}個、土：${counts['土']}個。依據日元強弱與生剋制化，您本命的「喜用神」為【${yongshen}】。喜用神是調和您命盤能量的關鍵。在日常生活中，多接觸與【${yongshen}】相關的顏色、方位或產業，能有效提升運勢。特別是當流年逢【${yongshen}】之運，往往是您事業進展、開創財源的黃金時期。`;

    const fortuneDesc = `此命盤年月四柱交錯，五行能量互補。您的格局大器，早年運勢雖有起伏，但憑藉著天生的智慧與耐力，中年（30-45歲）將迎來人生重大的事業轉捩點。${
        gender === 'male' ? '男命（乾造）利於開創事業，可在管理、技術或業務領域獨當一面。' : '女命（坤造）聰慧有為，兼顧家庭與事業，多有巾幗不讓鬚眉之勢。'
    } 晚年生活安逸，福澤綿長。今年流年運逢印星與財星交會，適合穩步投資，且多有貴人暗中指引，宜多聽長輩建言。`;

    return {
        year: { stem: yearStem, branch: yearBranch },
        month: { stem: monthStem, branch: monthBranch },
        day: { stem: dayStem, branch: dayBranch },
        hour: { stem: hourStem, branch: hourBranch },
        pct: pct,
        rizhu: `${dayStem}${rizhuElement}`,
        rizhuDesc: rizhuDesc,
        wuxingDesc: wuxingDesc,
        fortuneDesc: fortuneDesc
    };
}

// ==========================================
// 4.4 Name (San Cai Wu Ge) Calculations
// ==========================================
function calculateNameSanCai(name) {
    // Basic clean Chinese name parser
    // Ensure we filter out non-Chinese characters for stroke calculations
    const cleanName = name.replace(/[^\u4e00-\u9fa5]/g, '');
    if (cleanName.length === 0) {
        return {
            totalStrokes: 0,
            tiange: 0, renge: 0, dige: 0, waige: 0, zongge: 0,
            tiangeLucky: '吉', rengeLucky: '吉', digeLucky: '吉', waigeLucky: '吉', zonggeLucky: '吉',
            sancai: '木火土',
            sancaiDesc: '無資料。', zonggeDesc: '無資料。', advice: '無資料。'
        };
    }

    let s1 = 0, s2 = 0, n1 = 0, n2 = 0;
    
    // Parse strokes based on character length
    if (cleanName.length === 1) {
        s1 = getCharStrokes(cleanName[0]);
        // virtual name structure
    } else if (cleanName.length === 2) {
        s1 = getCharStrokes(cleanName[0]);
        n1 = getCharStrokes(cleanName[1]);
    } else if (cleanName.length === 3) {
        s1 = getCharStrokes(cleanName[0]);
        n1 = getCharStrokes(cleanName[1]);
        n2 = getCharStrokes(cleanName[2]);
    } else {
        // Double surnames (length >= 4)
        s1 = getCharStrokes(cleanName[0]);
        s2 = getCharStrokes(cleanName[1]);
        n1 = getCharStrokes(cleanName[2]);
        n2 = getCharStrokes(cleanName[3]);
    }

    let tiange = 0, renge = 0, dige = 0, waige = 0, zongge = 0;

    if (cleanName.length === 2) { // Single surname S1, single first name N1 (e.g. 李四)
        tiange = s1 + 1;
        renge = s1 + n1;
        dige = n1 + 1;
        waige = 2; // virtual
        zongge = s1 + n1;
    } else if (cleanName.length === 3) { // Single surname S1, double first name N1 N2 (e.g. 王小明)
        tiange = s1 + 1;
        renge = s1 + n1;
        dige = n1 + n2;
        waige = zongge - renge + 1; // S2_virtual + N2 = 1 + N2
        zongge = s1 + n1 + n2;
        if (waige > 20) waige = 3 + (waige % 15); // limit outer grid scale for balance
    } else if (cleanName.length >= 4) { // Double surname S1 S2, double first name N1 N2
        tiange = s1 + s2;
        renge = s2 + n1;
        dige = n1 + n2;
        waige = s1 + n2;
        zongge = s1 + s2 + n1 + n2;
    } else { // Single char name
        tiange = s1 + 1;
        renge = s1 + 1;
        dige = 2;
        waige = 2;
        zongge = s1;
    }

    // Auspicious Stroke Check Function
    const LUCKY_STROKES = [1, 3, 5, 7, 8, 11, 13, 15, 16, 17, 18, 21, 23, 24, 25, 29, 31, 32, 33, 35, 37, 39, 41, 45, 47, 48, 52, 57, 61, 63, 65, 67, 68, 81];
    const checkLucky = (val) => LUCKY_STROKES.includes(val) ? '吉' : '凶';

    // Five elements of Grids based on last digit
    const getWuxing = (num) => {
        const lastDigit = num % 10;
        if (lastDigit === 1 || lastDigit === 2) return '木';
        if (lastDigit === 3 || lastDigit === 4) return '火';
        if (lastDigit === 5 || lastDigit === 6) return '土';
        if (lastDigit === 7 || lastDigit === 8) return '金';
        return '水'; // 9 or 0
    };

    const tElement = getWuxing(tiange);
    const rElement = getWuxing(renge);
    const dElement = getWuxing(dige);
    const sancai = `${tElement}${rElement}${dElement}`;

    // Custom SanCai Readings
    const sancaiMap = {
        '木火土': '【大吉】天格為木，人格為火，地格為土。木生火，火生土，配置順暢，象徵基礎穩固、能得到長輩扶持，屬下盡忠，凡事順遂，易獲成功。',
        '木火木': '【吉】木生火，火生木。配置相生，生命力旺盛，思維活躍，事業上能得貴人相助，生活多充滿樂趣與活力。',
        '土金水': '【吉】土生金，金生水。做事嚴謹、有責任心，能得長官厚愛。雖然早年辛苦，但中晚年漸入佳境，大有成就。',
        '金水木': '【大吉】金生水，水生木。聰明過人，思維靈活。在商場或職場上游刃有餘，財運與事業極佳，家庭生活美滿。',
        '水木火': '【大吉】水生木，木生火。氣勢旺盛，貴人運強。極具領袖氣質與藝術天分，名利雙收之象，健康狀況良好。',
        '木木火': '【吉】同屬木，木生火。為人慷慨仗義，朋友多，創業路上多有同伴支持。事業發展順遂，但宜注意防範因感情用事帶來的損失。',
        '火土金': '【大吉】火生土，土生金。性格沉穩，做事踏實，能得他人信賴。在金融、行政或房地產領域能有巨大突破。',
        '火金木': '【凶】火克金，金克木。三才配置相剋，情緒起伏大，容易與長輩或上司產生衝突，事業多阻礙，宜修身養性。',
        '金木土': '【凶】金克木，木克土。運勢壓抑，常感懷才不遇。健康上注意肝膽與胃部保養，行事應以溫和保守為宜。'
    };

    const sancaiDesc = sancaiMap[sancai] || `【中吉】三才配置為【${sancai}】。五行配置生剋參半，發展過程中雖有挑戰，但只要堅定信念、踏實努力，終能突破阻礙，迎來事業與人生的轉機。`;

    // Zongge readings
    const zonggeLucky = checkLucky(zongge);
    const zonggeDesc = `您的姓名總格為【${zongge}劃】，數理評估為【${zonggeLucky}】。${
        zonggeLucky === '吉' ? 
        `此數理代表「波瀾重疊，守得雲開見月明」的吉兆。具備極強的領導才華與社交手腕，中晚年事業發達，能累積豐厚的財產，受人尊敬。` : 
        `此數理在波折中蘊含轉機。暗示您一生在奮鬥過程中，需經歷較多的考驗與磨練。建議在人際關係上保持低調謙遜，能有效避開小人是非，化凶為吉。`
    }`;

    // Actionable opening advice
    const advice = `您的姓名人格與天格配置呈現【${rElement}】與【${tElement}】的互動關係。${
        rElement === tElement ? '人天同氣，代表您與家族、長輩關係和諧，能繼承祖德或得到長輩的疼愛。建議平時可多配戴金色或玉石配飾來加強氣場。' :
        `五行屬性存在生剋。建議您的辦公桌或臥室可多擺放綠色植物（木）或流水擺飾（水），能調和五行，為您的事業與人緣帶來開運的助力。`
    }`;

    return {
        totalStrokes: zongge,
        tiange: tiange,
        renge: renge,
        dige: dige,
        waige: waige,
        zongge: zongge,
        tiangeLucky: checkLucky(tiange),
        rengeLucky: checkLucky(renge),
        digeLucky: checkLucky(dige),
        waigeLucky: checkLucky(waige),
        zonggeLucky: zonggeLucky,
        sancai: sancai,
        sancaiDesc: sancaiDesc,
        zonggeDesc: zonggeDesc,
        advice: advice
    };
}

// ==========================================
// 5. DOM Rendering Functions
// ==========================================

function renderBazi(bazi) {
    // Render four pillars stems and branches
    document.getElementById('bazi-stem-hour').innerHTML = `<span class="ganzhi-char">${bazi.hour.stem}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.hour.stem]]}-bg">${WUXING_MAP[bazi.hour.stem]}</span>`;
    document.getElementById('bazi-stem-day').innerHTML = `<span class="ganzhi-char">${bazi.day.stem}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.day.stem]]}-bg">${WUXING_MAP[bazi.day.stem]}</span>`;
    document.getElementById('bazi-stem-month').innerHTML = `<span class="ganzhi-char">${bazi.month.stem}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.month.stem]]}-bg">${WUXING_MAP[bazi.month.stem]}</span>`;
    document.getElementById('bazi-stem-year').innerHTML = `<span class="ganzhi-char">${bazi.year.stem}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.year.stem]]}-bg">${WUXING_MAP[bazi.year.stem]}</span>`;

    document.getElementById('bazi-branch-hour').innerHTML = `<span class="ganzhi-char">${bazi.hour.branch}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.hour.branch]]}-bg">${WUXING_MAP[bazi.hour.branch]}</span>`;
    document.getElementById('bazi-branch-day').innerHTML = `<span class="ganzhi-char">${bazi.day.branch}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.day.branch]]}-bg">${WUXING_MAP[bazi.day.branch]}</span>`;
    document.getElementById('bazi-branch-month').innerHTML = `<span class="ganzhi-char">${bazi.month.branch}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.month.branch]]}-bg">${WUXING_MAP[bazi.month.branch]}</span>`;
    document.getElementById('bazi-branch-year').innerHTML = `<span class="ganzhi-char">${bazi.year.branch}</span><span class="element-tag ${WUXING_CLASS[WUXING_MAP[bazi.year.branch]]}-bg">${WUXING_MAP[bazi.year.branch]}</span>`;

    // Render Five Elements percentages and bars
    document.getElementById('pct-gold').innerText = `${bazi.pct.gold}%`;
    document.getElementById('bar-gold').style.width = `${bazi.pct.gold}%`;
    
    document.getElementById('pct-wood').innerText = `${bazi.pct.wood}%`;
    document.getElementById('bar-wood').style.width = `${bazi.pct.wood}%`;
    
    document.getElementById('pct-water').innerText = `${bazi.pct.water}%`;
    document.getElementById('bar-water').style.width = `${bazi.pct.water}%`;
    
    document.getElementById('pct-fire').innerText = `${bazi.pct.fire}%`;
    document.getElementById('bar-fire').style.width = `${bazi.pct.fire}%`;
    
    document.getElementById('pct-earth').innerText = `${bazi.pct.earth}%`;
    document.getElementById('bar-earth').style.width = `${bazi.pct.earth}%`;

    // Bazi Text analysis
    document.getElementById('bazi-rizhu-desc').innerText = bazi.rizhuDesc;
    document.getElementById('bazi-wuxing-desc').innerText = bazi.wuxingDesc;
    document.getElementById('bazi-fortune-desc').innerText = bazi.fortuneDesc;
}

function renderName(name) {
    // Visual Grids
    document.getElementById('grid-tiange').innerHTML = `${name.tiange} <span class="badge-lucky">${name.tiangeLucky}</span>`;
    document.getElementById('grid-renge').innerHTML = `${name.renge} <span class="badge-lucky">${name.rengeLucky}</span>`;
    document.getElementById('grid-dige').innerHTML = `${name.dige} <span class="badge-lucky">${name.digeLucky}</span>`;
    document.getElementById('grid-waige').innerHTML = `${name.waige} <span class="badge-lucky">${name.waigeLucky}</span>`;
    document.getElementById('grid-zongge').innerHTML = `${name.zongge} <span class="badge-lucky">${name.zonggeLucky}</span>`;

    document.getElementById('name-total-strokes').innerText = name.totalStrokes;
    document.getElementById('name-sancai').innerText = name.sancai;

    // Name Text analysis
    document.getElementById('name-sancai-desc').innerText = name.sancaiDesc;
    document.getElementById('name-zongge-desc').innerText = name.zonggeDesc;
    document.getElementById('name-advice').innerText = name.advice;
}

function renderZodiac(zodiac, birthYear) {
    // Header avatar & Title
    document.getElementById('zodiac-avatar').innerText = zodiac.emoji;
    document.getElementById('zodiac-title').innerText = `生肖運勢：${zodiac.name} (${zodiac.branch})`;

    // Compatibility table
    document.getElementById('zodiac-sanhe').innerText = zodiac.sanhe;
    document.getElementById('zodiac-liuhe').innerText = zodiac.liuhe;
    document.getElementById('zodiac-chong').innerText = zodiac.chong;

    // Detailed descriptions
    document.getElementById('zodiac-char-desc').innerText = zodiac.desc;
    
    const curYear = new Date().getFullYear();
    const age = curYear - birthYear;
    document.getElementById('zodiac-year-desc').innerText = `流年運勢分析：您今年實歲約 ${age} 歲。在流年星盤中，屬【${zodiac.zodiacChar}】的您在今年呈現生機盎然之勢。受吉星引領，人際關係是您今年的重大突破口。唯需注意逢「相衝」生肖【${zodiac.chong}】的流月（如農曆五月、九月），凡事應保守行事，防微杜漸。`;
    
    document.getElementById('zodiac-life-desc').innerText = `事業與財運：宜腳踏實地，忌投機。多與三合貴人【${zodiac.sanhe}】合作，能化繁為簡。感情方面，單身者秋季桃花盛開，有伴侶者則感情甜蜜，多加呵護。健康上，今年應加強關節與腸胃保健，多運動以活絡氣血。`;
}

function renderHoroscope(horo) {
    // Header avatar & Title
    document.getElementById('horo-avatar').innerText = horo.emoji;
    document.getElementById('horo-title').innerText = `西洋星盤：${horo.name}`;

    // Meta Grid
    document.getElementById('horo-planet').innerText = horo.planet;
    document.getElementById('horo-element').innerText = horo.element;
    document.getElementById('horo-color').innerText = horo.color;
    document.getElementById('horo-number').innerText = horo.number;

    // Detailed descriptions
    document.getElementById('horo-char-desc').innerText = horo.desc;
    
    document.getElementById('horo-current-desc').innerText = `今日星象運勢：當前您的守護星【${horo.planet}】相位良好，為您注入極佳的專注力與感知力。這是一個適合理清思緒、修復關係的良機。無論是工作上的決策還是生活上的溝通，多展現【${horo.element}】的優勢特質，能為您免去不必要的磨合。`;
    
    document.getElementById('horo-advice').innerText = `幸運開運指引：今日您的幸運數字為【${horo.number}】，幸運顏色為【${horo.color}】。在裝扮中加入幸運色的配件，或是做出決策時參考幸運數字，能增強您的能量磁場。晚上適合進行靜坐冥想，聆聽內心深處的聲音。`;
}
