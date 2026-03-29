// ==================== 全局变量 ====================
let allQuestions = [];          // 存储从 JSON 加载的全部题目（200题）
let currentQuestions = [];      // 当前测试使用的52道随机题目
let currentQuestionIndex = 0;
let scores = { alpha: 0, beta: 0, omega: 0, male: 0, female: 0 };
let quizMode = 'A';
let questionOrder = [];         // 当前52题的随机顺序索引

// ==================== 静态数据（信息素库、分析库） ====================
const pheromones = {
    alpha: ["雪松", "檀香", "皮革", "威士忌", "冷杉", "黑曜石"],
    beta: ["绿茶", "薄荷", "琥珀", "雨后青草", "柠檬草", "白桃乌龙"],
    omega: ["茉莉", "蜜桃", "玫瑰", "洋甘菊", "香草", "樱花"]
};

const analyses = {
    alpha: "你是天生的领导者，拥有强大的气场和决断力。你自信、果断，在团队中往往能主动承担责任，带领大家前进。你的信息素带着压迫感却又让人安心，能在关键时刻稳定局面。你重视荣誉和尊严，保护欲强，是值得依靠的存在。",
    beta: "你是社会的中坚力量，性格温和理性，适应能力极强。你不受信息素的过度影响，总能保持客观冷静的判断。你是团队中的协调者，可靠又务实，不追求支配地位却不可或缺。你的生活稳定有序，是连接不同群体的重要桥梁。",
    omega: "你细腻敏感，拥有极强的共情能力和亲和力。你的信息素温柔甜美，能自然地安抚周围的情绪。你重视情感连接，照顾他人的感受，往往是团队中的氛围调和者。你看似柔弱却内心坚韧，拥有独特的韧性和温暖的力量。",
    male_alpha: "作为男性Alpha，你将男性的阳刚与Alpha的领导力完美结合。你气场强大，果断勇敢，是天生的领袖人物。你保护欲强，重视责任，在任何场合都能成为核心支柱。你的信息素带着沉稳的压迫感，让人既敬畏又安心。",
    male_beta: "作为男性Beta，你温和可靠，既有男性的沉稳，又有Beta的理性。你适应能力强，是团队中的坚实后盾，不张扬却不可或缺。你生活有序，处事冷静，能很好地平衡各种关系，是值得信赖的伙伴。",
    male_omega: "作为男性Omega，你打破了传统性别规训，拥有细腻的情感和强大的共情能力。你温柔敏感，内心坚韧，你的存在本身就是对刻板印象的突破。你的信息素柔和温暖，能自然地安抚他人，拥有独特的治愈力量。",
    female_alpha: "作为女性Alpha，你将女性的细腻与Alpha的魄力完美融合。你自信果断，气场强大，是打破性别天花板的先行者。你领导力出众，既不失温度又极具决断力，你的信息素带着独特的魅力，让人由衷信服。",
    female_beta: "作为女性Beta，你温柔理性，既有女性的细腻，又有Beta的平衡感。你处事周到，适应力强，是团队中的协调者，总能用温和的方式解决问题。你生活稳定，可靠务实，是连接各方的重要纽带。",
    female_omega: "作为女性Omega，你将女性的柔美与Omega的共情能力发挥到极致。你细腻敏感，温暖善良，拥有极强的情绪感知力。你的信息素甜美柔和，能自然地温暖周围，你看似柔弱却内心坚韧，是不可或缺的治愈系存在。"
};

// ==================== 辅助函数 ====================
// Fisher-Yates 随机打乱数组
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 从全部题目中随机抽取 count 道不重复的题目
function getRandomQuestions(count) {
    if (allQuestions.length === 0) return [];
    // 随机排序副本，取前 count 个
    const shuffledAll = shuffleArray(allQuestions);
    return shuffledAll.slice(0, count);
}

// 重新开始一轮测试：随机抽取52题，重置分数和索引，打乱顺序
function initNewQuiz() {
    currentQuestions = getRandomQuestions(52);
    // 如果加载的题目不足52道（预防），实际数量就是 allQuestions.length
    if (currentQuestions.length < 52) {
        console.warn(`实际加载题目仅 ${currentQuestions.length} 道，将使用全部题目进行测试`);
    }
    scores = { alpha: 0, beta: 0, omega: 0, male: 0, female: 0 };
    currentQuestionIndex = 0;
    // 生成当前52题的随机顺序索引（0 到 len-1）
    questionOrder = shuffleArray([...Array(currentQuestions.length).keys()]);
}

// ==================== 测试流程函数 ====================
function startQuiz(mode) {
    if (allQuestions.length === 0) {
        alert("题目加载中，请稍后再试...");
        return;
    }
    quizMode = mode;
    initNewQuiz();          // 随机抽取52题并重置状态
    document.getElementById('start-container').classList.remove('active');
    document.getElementById('quiz-container').classList.add('active');
    showQuestion();
}

function showQuestion() {
    const questionIdx = questionOrder[currentQuestionIndex];
    const question = currentQuestions[questionIdx];
    const shuffledOptions = shuffleArray(question.options);

    // 更新进度（分母为实际题目数量，通常为52）
    document.getElementById('current-q').textContent = currentQuestionIndex + 1;
    document.getElementById('progress-fill').style.width = `${(currentQuestionIndex / currentQuestions.length) * 100}%`;
    
    // 显示题目文本
    document.getElementById('question-text').textContent = question.text;
    
    // 渲染选项
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    shuffledOptions.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = () => selectOption(option, btn);
        optionsContainer.appendChild(btn);
    });

    // 禁用下一题按钮，等待用户选择
    document.getElementById('next-btn').disabled = true;
    document.getElementById('next-btn').classList.remove('enabled');
}

function selectOption(option, btn) {
    // 移除其他选项的高亮
    document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    
    // 累加得分
    Object.keys(option.scores).forEach(key => {
        scores[key] += option.scores[key];
    });

    // 启用下一题按钮
    document.getElementById('next-btn').disabled = false;
    document.getElementById('next-btn').classList.add('enabled');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function calculateResult() {
    // 确定ABO性别
    let aboGender = 'alpha';
    if (scores.beta > scores.alpha && scores.beta > scores.omega) aboGender = 'beta';
    else if (scores.omega > scores.alpha && scores.omega > scores.beta) aboGender = 'omega';

    let result = { abo: aboGender };

    if (quizMode === 'B') {
        const firstGender = scores.male >= scores.female ? '男' : '女';
        result.first = firstGender;
        result.full = firstGender + aboGender.charAt(0).toUpperCase() + aboGender.slice(1);
        result.analysisKey = `${firstGender === '男' ? 'male' : 'female'}_${aboGender}`;
    } else {
        result.full = aboGender.charAt(0).toUpperCase() + aboGender.slice(1);
        result.analysisKey = aboGender;
    }
    return result;
}

function getPheromone(aboGender) {
    const options = pheromones[aboGender];
    return options[Math.floor(Math.random() * options.length)];
}

function showResult() {
    const result = calculateResult();
    const pheromone = getPheromone(result.abo);

    document.getElementById('quiz-container').classList.remove('active');
    document.getElementById('result-container').classList.add('active');

    document.getElementById('gender-result').textContent = result.full;
    document.getElementById('pheromone-result').textContent = pheromone;
    document.getElementById('analysis-text').textContent = analyses[result.analysisKey];
}

function resetQuiz() {
    document.getElementById('result-container').classList.remove('active');
    document.getElementById('start-container').classList.add('active');
    // 注意：重置时不需要重新加载 JSON，但可以重新抽取题目（可选，下次 startQuiz 时会重新抽取）
    // 这里不主动抽取，留给 startQuiz 去做。
}

// ==================== 页面加载：读取 question.json ====================
fetch('question.json')
    .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
    })
    .then(data => {
        allQuestions = data;
        console.log(`成功加载 ${allQuestions.length} 道题目`);
        // 启用开始按钮（假设开始按钮初始为禁用状态）
        const startBtnA = document.querySelector('#start-container button[onclick="startQuiz(\'A\')"]');
        const startBtnB = document.querySelector('#start-container button[onclick="startQuiz(\'B\')"]');
        if (startBtnA) startBtnA.disabled = false;
        if (startBtnB) startBtnB.disabled = false;
    })
    .catch(error => {
        console.error('加载 question.json 失败:', error);
        alert('题目文件加载失败，请检查 question.json 是否存在且格式正确。');
        // 可显示错误提示，禁用开始按钮
        const btns = document.querySelectorAll('#start-container button');
        btns.forEach(btn => btn.disabled = true);
    });
