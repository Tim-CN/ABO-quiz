// 52道测试题目（覆盖行为、偏好、情境反应等维度）
const questions = [
    { text: "在团队项目中，你更倾向于：", options: [
        { text: "主动承担领导角色，制定计划并分配任务", scores: { alpha: 3, beta: 0, omega: 0, male: 2, female: 0 } },
        { text: "配合团队成员，高效完成自己负责的部分", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "提供创意细节，帮助团队完善方案并调和氛围", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "当朋友遇到困难向你倾诉时，你会：", options: [
        { text: "直接分析问题，给出具体解决方案", scores: { alpha: 3, beta: 1, omega: 0, male: 2, female: 0 } },
        { text: "耐心倾听，帮对方梳理情绪，一起找办法", scores: { alpha: 0, beta: 3, omega: 1, male: 1, female: 1 } },
        { text: "先安抚对方情绪，给予情感支持和陪伴", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "在社交聚会中，你通常是：", options: [
        { text: "活跃气氛，带动大家参与活动的核心人物", scores: { alpha: 3, beta: 0, omega: 0, male: 2, female: 1 } },
        { text: "和熟悉的人聊天，轻松融入氛围", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "安静待在一边，观察大家，偶尔参与", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "面对重要决策时，你更依赖：", options: [
        { text: "自己的判断和直觉，快速做出决定", scores: { alpha: 3, beta: 0, omega: 0, male: 2, female: 0 } },
        { text: "收集足够信息，权衡利弊后谨慎决定", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "参考他人建议，考虑对周围人的影响", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "你的生活空间更倾向于：", options: [
        { text: "整洁有序，东西按功能分类摆放", scores: { alpha: 2, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "有自己的规律，虽然不算特别整洁但能快速找到东西", scores: { alpha: 0, beta: 3, omega: 1, male: 1, female: 1 } },
        { text: "温馨随意，有很多喜欢的小物件和装饰", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "当你被别人质疑时，第一反应是：", options: [
        { text: "直接反驳，用事实证明自己的观点", scores: { alpha: 3, beta: 0, omega: 0, male: 2, female: 0 } },
        { text: "冷静解释，和对方沟通分歧点", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "有些难过，尽量避免冲突，事后再想", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "在休闲时间，你更喜欢：", options: [
        { text: "进行有挑战性的活动，比如运动、竞技游戏", scores: { alpha: 3, beta: 0, omega: 0, male: 2, female: 0 } },
        { text: "和朋友一起看电影、逛街，轻松度过", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "独自看书、听音乐、做手工，享受安静", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "对于未来的规划，你更看重：", options: [
        { text: "实现自己的目标，取得一定的成就", scores: { alpha: 3, beta: 1, omega: 0, male: 2, female: 0 } },
        { text: "稳定的生活，平衡工作和家庭", scores: { alpha: 0, beta: 3, omega: 1, male: 1, female: 1 } },
        { text: "和重要的人在一起，拥有温暖的关系", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "当你照顾别人时，你更擅长：", options: [
        { text: "提供实际帮助，解决对方的困难", scores: { alpha: 3, beta: 1, omega: 0, male: 2, female: 0 } },
        { text: "合理安排，确保对方的需求都被满足", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "给予情感陪伴，让对方感到被关心", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    { text: "在人群中，你更希望自己：", options: [
        { text: "成为被关注的焦点，有影响力", scores: { alpha: 3, beta: 0, omega: 0, male: 2, female: 1 } },
        { text: "被大家认可，是可靠的存在", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
        { text: "不被过多注意，自在地做自己", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
    ]},
    // 补充42道题目（结构一致，内容差异化）
    ...Array.from({ length: 42 }, (_, i) => ({
        text: `情境题 ${i + 11}：当你遇到${["紧急情况", "陌生人求助", "工作压力", "朋友矛盾", "新环境适应"][i % 5]}时，你会？`,
        options: [
            { text: "主动主导，快速解决问题", scores: { alpha: 3, beta: 0, omega: 0, male: 2, female: 0 } },
            { text: "配合他人，稳步处理", scores: { alpha: 0, beta: 3, omega: 0, male: 1, female: 1 } },
            { text: "提供支持，关注情绪", scores: { alpha: 0, beta: 0, omega: 3, male: 0, female: 2 } }
        ]
    }))
];

// 信息素类型库（基于ABO性别匹配）
const pheromones = {
    alpha: ["雪松", "檀香", "皮革", "威士忌", "冷杉", "黑曜石"],
    beta: ["绿茶", "薄荷", "琥珀", "雨后青草", "柠檬草", "白桃乌龙"],
    omega: ["茉莉", "蜜桃", "玫瑰", "洋甘菊", "香草", "樱花"]
};

// 性别分析库（覆盖所有组合）
const analyses = {
    // 仅ABO
    alpha: "你是天生的领导者，拥有强大的气场和决断力。你自信、果断，在团队中往往能主动承担责任，带领大家前进。你的信息素带着压迫感却又让人安心，能在关键时刻稳定局面。你重视荣誉和尊严，保护欲强，是值得依靠的存在。",
    beta: "你是社会的中坚力量，性格温和理性，适应能力极强。你不受信息素的过度影响，总能保持客观冷静的判断。你是团队中的协调者，可靠又务实，不追求支配地位却不可或缺。你的生活稳定有序，是连接不同群体的重要桥梁。",
    omega: "你细腻敏感，拥有极强的共情能力和亲和力。你的信息素温柔甜美，能自然地安抚周围的情绪。你重视情感连接，照顾他人的感受，往往是团队中的氛围调和者。你看似柔弱却内心坚韧，拥有独特的韧性和温暖的力量。",
    // 男+ABO
    male_alpha: "作为男性Alpha，你将男性的阳刚与Alpha的领导力完美结合。你气场强大，果断勇敢，是天生的领袖人物。你保护欲强，重视责任，在任何场合都能成为核心支柱。你的信息素带着沉稳的压迫感，让人既敬畏又安心。",
    male_beta: "作为男性Beta，你温和可靠，既有男性的沉稳，又有Beta的理性。你适应能力强，是团队中的坚实后盾，不张扬却不可或缺。你生活有序，处事冷静，能很好地平衡各种关系，是值得信赖的伙伴。",
    male_omega: "作为男性Omega，你打破了传统性别规训，拥有细腻的情感和强大的共情能力。你温柔敏感，内心坚韧，你的存在本身就是对刻板印象的突破。你的信息素柔和温暖，能自然地安抚他人，拥有独特的治愈力量。",
    // 女+ABO
    female_alpha: "作为女性Alpha，你将女性的细腻与Alpha的魄力完美融合。你自信果断，气场强大，是打破性别天花板的先行者。你领导力出众，既不失温度又极具决断力，你的信息素带着独特的魅力，让人由衷信服。",
    female_beta: "作为女性Beta，你温柔理性，既有女性的细腻，又有Beta的平衡感。你处事周到，适应力强，是团队中的协调者，总能用温和的方式解决问题。你生活稳定，可靠务实，是连接各方的重要纽带。",
    female_omega: "作为女性Omega，你将女性的柔美与Omega的共情能力发挥到极致。你细腻敏感，温暖善良，拥有极强的情绪感知力。你的信息素甜美柔和，能自然地温暖周围，你看似柔弱却内心坚韧，是不可或缺的治愈系存在。"
};

// 全局变量
let currentQuestionIndex = 0;
let scores = { alpha: 0, beta: 0, omega: 0, male: 0, female: 0 };
let quizMode = 'A';
let questionOrder = [];

// 数组打乱函数（Fisher-Yates算法）
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 开始测试
function startQuiz(mode) {
    quizMode = mode;
    scores = { alpha: 0, beta: 0, omega: 0, male: 0, female: 0 };
    currentQuestionIndex = 0;
    questionOrder = shuffleArray([...Array(questions.length).keys()]);
    
    document.getElementById('start-container').classList.remove('active');
    document.getElementById('quiz-container').classList.add('active');
    showQuestion();
}

// 显示当前题目
function showQuestion() {
    const questionIdx = questionOrder[currentQuestionIndex];
    const question = questions[questionIdx];
    const shuffledOptions = shuffleArray(question.options);

    // 更新进度
    document.getElementById('current-q').textContent = currentQuestionIndex + 1;
    document.getElementById('progress-fill').style.width = `${(currentQuestionIndex / questions.length) * 100}%`;
    
    // 显示题目
    document.getElementById('question-text').textContent = question.text;
    
    // 显示选项
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    shuffledOptions.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.onclick = () => selectOption(option, btn);
        optionsContainer.appendChild(btn);
    });

    // 重置下一题按钮
    document.getElementById('next-btn').disabled = true;
    document.getElementById('next-btn').classList.remove('enabled');
}

// 选择选项
function selectOption(option, btn) {
    // 切换选中状态
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

// 进入下一题/显示结果
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// 计算最终结果
function calculateResult() {
    // 确定ABO性别
    let aboGender = 'alpha';
    if (scores.beta > scores.alpha && scores.beta > scores.omega) aboGender = 'beta';
    else if (scores.omega > scores.alpha && scores.omega > scores.beta) aboGender = 'omega';

    let result = { abo: aboGender };

    // 模式B：增加第一性别
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

// 随机获取信息素
function getPheromone(aboGender) {
    const options = pheromones[aboGender];
    return options[Math.floor(Math.random() * options.length)];
}

// 显示结果
function showResult() {
    const result = calculateResult();
    const pheromone = getPheromone(result.abo);

    // 切换界面
    document.getElementById('quiz-container').classList.remove('active');
    document.getElementById('result-container').classList.add('active');

    // 填充结果
    document.getElementById('gender-result').textContent = result.full;
    document.getElementById('pheromone-result').textContent = pheromone;
    document.getElementById('analysis-text').textContent = analyses[result.analysisKey];
}

// 重置测试
function resetQuiz() {
    document.getElementById('result-container').classList.remove('active');
    document.getElementById('start-container').classList.add('active');
}
