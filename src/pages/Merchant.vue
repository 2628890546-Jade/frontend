<template>
    <div class="app">
        <!-- 顶部导航 -->
        <header class="header">
            <div class="header-container">
                <div class="logo">
                    <div class="logo-icon">⛅</div>
                    <div class="logo-text">
                        <span class="logo-title">RiskInsight</span>
                        <span class="logo-sub">商户风险预警系统</span>
                    </div>
                </div>
                <div class="header-info">
                    <span class="badge">多源数据融合 · 实时风险评估</span>
                </div>
            </div>
        </header>

        <!-- 主要内容 -->
        <main class="main">
            <div class="container">
                <!-- 输入表单 -->
                <div class="card input-card">
                    <div class="card-header">
                        <h2>商户信息录入</h2>
                        <p class="card-desc">请填写商户经营相关数据，系统将自动评估风险</p>
                    </div>

                    <div class="form-content">
                        <!-- 基础信息 -->
                        <div class="form-section">
                            <div class="section-title">
                                <span class="section-icon">🏪</span>
                                基础信息
                            </div>
                            <div class="form-row">
                                <div class="form-item">
                                    <label class="form-label">商家店名</label>
                                    <input v-model="formData.shopName" type="text" class="form-input" placeholder="请输入商家名称" />
                                </div>
                                <div class="form-item">
                                    <label class="form-label">类别（业态风险）</label>
                                    <select v-model="formData.category" class="form-select">
                                        <option value="">请选择类别</option>
                                        <option value="东北菜">东北菜</option>
                                        <option value="川菜">川菜</option>
                                        <option value="粤菜">粤菜</option>
                                        <option value="快餐">快餐</option>
                                        <option value="便利店">便利店</option>
                                        <option value="生鲜店">生鲜店</option>
                                        <option value="饮品店">饮品店</option>
                                        <option value="烧烤">烧烤</option>
                                        <option value="火锅">火锅</option>
                                        <option value="其他">其他</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-item">
                                    <label class="form-label">口碑评分</label>
                                    <div class="rating-input">
                                        <input v-model.number="formData.rating" type="range" min="0" max="5" step="0.1" class="rating-slider" />
                                        <span class="rating-value">{{ formData.rating.toFixed(1) }}</span>
                                    </div>
                                </div>
                                <div class="form-item">
                                    <label class="form-label">经营年限</label>
                                    <select v-model="formData.operatingYears" class="form-select">
                                        <option value="">请选择经营年限</option>
                                        <option value="1">1年以下</option>
                                        <option value="2">1-3年</option>
                                        <option value="3">3-5年</option>
                                        <option value="5">5年以上</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- 经营数据 -->
                        <div class="form-section">
                            <div class="section-title">
                                <span class="section-icon">📊</span>
                                经营数据
                            </div>
                            <div class="form-row">
                                <div class="form-item">
                                    <label class="form-label">人均消费（元）</label>
                                    <input v-model.number="formData.averageSpend" type="number" min="0" class="form-input" placeholder="请输入人均消费" />
                                </div>
                                <div class="form-item">
                                    <label class="form-label">评论数（热度）</label>
                                    <input v-model.number="formData.reviewCount" type="number" min="0" class="form-input" placeholder="请输入评论数量" />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-item">
                                    <label class="form-label">负债（万元）</label>
                                    <input v-model.number="formData.debt" type="number" min="0" step="0.01" class="form-input" placeholder="请输入负债金额" />
                                </div>
                                <div class="form-item">
                                    <label class="form-label">综合设施投入分</label>
                                    <input v-model.number="formData.facilityScore" type="number" min="0" max="5" step="0.1" class="form-input" placeholder="0-5分" />
                                </div>
                            </div>
                        </div>

                        <!-- 服务设施描述 -->
                        <div class="form-section">
                            <div class="section-title">
                                <span class="section-icon">✨</span>
                                服务设施描述
                                <span class="char-count">{{ facilityDescLength }}/500字</span>
                            </div>
                            <textarea 
                                v-model="formData.facilityDesc" 
                                class="form-textarea" 
                                placeholder="请描述店内设施情况，例如：店内有空调、WiFi、包间、停车场等..."
                                maxlength="500"
                            ></textarea>
                            <div class="facility-tips">
                                <span class="tip-icon">💡</span>
                                <span>描述越详细，设施评分越准确，建议包含设施数量和类型</span>
                            </div>
                        </div>

                        <!-- 行为数据 -->
                        <div class="form-section">
                            <div class="section-title">
                                <span class="section-icon">⚡</span>
                                信用行为
                            </div>
                            <div class="form-row">
                                <div class="form-item">
                                    <label class="form-label">逾期次数</label>
                                    <input v-model.number="formData.overdueCount" type="number" min="0" max="10" class="form-input" placeholder="请输入逾期次数" />
                                </div>
                                <div class="form-item">
                                    <label class="form-label">支付及时性</label>
                                    <div class="timeliness-input">
                                        <input v-model.number="formData.paymentTimeliness" type="range" min="0" max="1" step="0.01" class="timeliness-slider" />
                                        <span class="timeliness-value">{{ (formData.paymentTimeliness * 100).toFixed(0) }}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 外部环境 -->
                        <div class="form-section">
                            <div class="section-title">
                                <span class="section-icon">🏘️</span>
                                外部环境
                            </div>
                            <div class="form-row">
                                <div class="form-item">
                                    <label class="form-label">所在城市</label>
                                    <select v-model="formData.city" class="form-select">
                                        <option value="">请选择城市</option>
                                        <option value="北京">北京</option>
                                        <option value="上海">上海</option>
                                        <option value="广州">广州</option>
                                        <option value="深圳">深圳</option>
                                        <option value="成都">成都</option>
                                        <option value="杭州">杭州</option>
                                        <option value="重庆">重庆</option>
                                        <option value="武汉">武汉</option>
                                        <option value="西安">西安</option>
                                        <option value="苏州">苏州</option>
                                        <option value="天津">天津</option>
                                        <option value="南京">南京</option>
                                        <option value="长沙">长沙</option>
                                        <option value="郑州">郑州</option>
                                        <option value="东莞">东莞</option>
                                        <option value="青岛">青岛</option>
                                        <option value="沈阳">沈阳</option>
                                        <option value="宁波">宁波</option>
                                        <option value="昆明">昆明</option>
                                        <option value="大连">大连</option>
                                        <option value="其他">其他</option>
                                    </select>
                                </div>
                                <div class="form-item">
                                    <label class="form-label">周边竞品数量</label>
                                    <input v-model.number="formData.competitors" type="number" min="0" max="20" class="form-input" placeholder="0-20个" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 提交按钮 -->
                    <div class="submit-section">
                        <button @click="submitForm" class="submit-btn" :disabled="!isFormValid || isLoading">
                            <span class="btn-icon">{{ isLoading ? '⏳' : '🔍' }}</span>
                            {{ isLoading ? '评估中...' : '开始风险评估' }}
                        </button>
                        <button @click="resetForm" class="reset-btn">
                            重置
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- 结果弹窗 -->
        <a-modal 
            v-model:open="showModal" 
            title="风险评估结果" 
            :footer="null"
            width="1000px"
            class="result-modal"
        >
            <div class="modal-content">
                <!-- 评分展示 -->
                <div class="score-display">
                    <div class="score-ring" :class="riskLevelClass">
                        <div class="score-number">{{ riskScore }}</div>
                        <div class="score-max">/ 100</div>
                    </div>
                    <div class="score-tag" :class="riskLevelClass">
                        {{ riskLevel }}
                    </div>
                    <div class="score-desc">{{ riskLevelDescription }}</div>
                </div>

                <!-- 双列布局 -->
                <div class="modal-grid">
                    <!-- 左列 -->
                    <div class="modal-col">
                        <!-- 商户信息 -->
                        <div class="info-section">
                            <div class="section-header">
                                <span class="section-icon">🏪</span>
                                <span>商户信息</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">商家名称</span>
                                <span class="info-value">{{ formData.shopName }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">类别</span>
                                <span class="info-value">{{ formData.category }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">所在城市</span>
                                <span class="info-value">{{ formData.city }}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">口碑评分</span>
                                <span class="info-value">{{ formData.rating.toFixed(1) }}分</span>
                            </div>
                        </div>

                        <!-- 贷款建议 -->
                        <div class="loan-section" v-if="riskScore >= 50">
                            <div class="section-header">
                                <span class="section-icon">💳</span>
                                <span>普惠贷款推荐</span>
                            </div>
                            <div class="loan-content">{{ loanSuggestion }}</div>
                        </div>
                    </div>

                    <!-- 右列 -->
                    <div class="modal-col">
                        <!-- 经营建议 -->
                        <div class="suggestion-section">
                            <div class="section-header">
                                <span class="section-icon">💡</span>
                                <span>经营优化建议</span>
                            </div>
                            <ul class="suggestion-list">
                                <li v-for="(item, index) in suggestions" :key="index" class="suggestion-item">
                                    <span class="suggestion-num">{{ index + 1 }}</span>
                                    <span class="suggestion-text">{{ item }}</span>
                                </li>
                            </ul>
                        </div>

                        <!-- 特征影响 -->
                        <div class="impact-section">
                            <div class="section-header">
                                <span class="section-icon">📈</span>
                                <span>关键影响因素</span>
                            </div>
                            <div class="impact-list">
                                <div v-for="item in topImpacts" :key="item.name" class="impact-row">
                                    <span class="impact-name">{{ item.name }}</span>
                                    <div class="impact-bar-wrapper">
                                        <div class="impact-bar"
                                            :style="{ width: Math.min(Math.abs(item.impact), 100) + '%', background: item.impact >= 0 ? '#10b981' : '#ef4444' }">
                                        </div>
                                    </div>
                                    <span class="impact-value" :class="item.impact >= 0 ? 'positive' : 'negative'">
                                        {{ item.impact >= 0 ? '+' : '' }}{{ item.impact }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a-modal>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal } from 'ant-design-vue'
import axios from 'axios'

// API 基础地址
const api = axios.create({
    baseURL: '/api',
    timeout: 30000
})

// 加载状态
const isLoading = ref(false)

// 表单数据
const formData = ref({
    shopName: '',
    category: '',
    rating: 3.5,
    operatingYears: '',
    averageSpend: 0,
    reviewCount: 0,
    debt: 0,
    facilityScore: 0,
    facilityDesc: '',
    overdueCount: 0,
    paymentTimeliness: 0.8,
    city: '',
    competitors: 5
})

// 弹窗状态
const showModal = ref(false)

// 设施描述字数统计
const facilityDescLength = computed(() => formData.value.facilityDesc.length)

// 表单验证
const isFormValid = computed(() => {
    return formData.value.shopName && 
           formData.value.category && 
           formData.value.operatingYears && 
           formData.value.city &&
           formData.value.averageSpend > 0 &&
           formData.value.facilityDesc.length >= 10
})

// 根据设施描述计算设施评分补充值
const calculateFacilityBonus = (desc) => {
    const keywords = ['空调', 'WiFi', '包间', '停车场', '卫生间', '电梯', '包厢', '卡座', '吧台', '露台']
    let bonus = 0
    keywords.forEach(keyword => {
        if (desc.includes(keyword)) bonus += 0.3
    })
    if (desc.length >= 50) bonus += 0.2
    if (desc.length >= 100) bonus += 0.3
    return Math.min(bonus, 2)
}

// 根据城市获取消费指数（内部计算）
const getCityIndex = (city) => {
    const cityIndexMap = {
        '北京': 85, '上海': 85, '广州': 80, '深圳': 82,
        '杭州': 78, '成都': 72, '重庆': 70, '武汉': 72,
        '西安': 68, '苏州': 75, '天津': 70, '南京': 74,
        '长沙': 68, '郑州': 65, '东莞': 68, '青岛': 70,
        '沈阳': 65, '宁波': 76, '昆明': 65, '大连': 68,
        '其他': 60
    }
    return cityIndexMap[city] || 60
}

// 风险评分算法
const calculateRiskScore = (f) => {
    let score = 100
    
    score -= f.overdueCount * 10
    
    const yearBonus = parseInt(f.operatingYears) * 5
    score += yearBonus
    
    score += (f.rating - 3) * 8
    
    const spendScore = Math.abs(f.averageSpend - 60) < 40 ? 10 : Math.max(0, 20 - Math.abs(f.averageSpend - 60) / 5)
    score += spendScore
    
    score += Math.min(f.reviewCount / 10, 20)
    
    score -= f.debt * 2
    
    const facilityBonus = f.facilityScore + calculateFacilityBonus(f.facilityDesc)
    score += facilityBonus * 3
    
    score += f.paymentTimeliness * 10
    
    const cityIndex = getCityIndex(f.city)
    score += cityIndex * 0.15
    
    score -= f.competitors * 2
    
    const categoryRisk = {
        '东北菜': 0, '川菜': 2, '粤菜': -3, '快餐': -5, 
        '便利店': -8, '生鲜店': 5, '饮品店': -3, '烧烤': 8, '火锅': 3, '其他': 0
    }
    score += categoryRisk[f.category] || 0
    
    return Math.max(0, Math.min(100, Math.round(score)))
}

const riskScore = ref(50)
const riskLevel = ref('中风险')
const loanSuggestion = ref('')
const suggestions = ref(['请填写商户信息后点击评估'])
const topImpacts = ref([])

const riskLevelClass = computed(() => {
    if (riskScore.value >= 70) return 'low'
    if (riskScore.value >= 50) return 'mid'
    return 'high'
})

const riskLevelDescription = computed(() => {
    const s = riskScore.value
    if (s >= 80) return '经营状况良好，还款能力强'
    if (s >= 65) return '经营稳定，风险可控'
    if (s >= 50) return '经营基本稳定，建议关注'
    if (s >= 35) return '存在一定风险，需谨慎评估'
    return '风险较高，建议改善经营后再申请'
})

const submitForm = async () => {
    if (!isFormValid.value) {
        Modal.warning({
            title: '提示',
            content: '请填写完整信息：商家店名、类别、经营年限、所在城市、人均消费为必填项，服务设施描述至少10字'
        })
        return
    }
    
    isLoading.value = true
    
    try {
        // 调用后端快速评估接口
        const { data } = await api.post('/assessment/quick-evaluate', {
            wom_score: formData.value.rating,
            review_count: formData.value.reviewCount,
            avg_price: formData.value.averageSpend,
            debt: formData.value.debt,
            years_in_operation: parseInt(formData.value.operatingYears) || 3
        })
        
        if (data.success) {
            // 更新评分结果
            riskScore.value = data.data.score
            riskLevel.value = data.data.risk_level.split('|')[0].trim()
            loanSuggestion.value = data.data.loan_suggestion?.suggestion_text || ''
            suggestions.value = data.data.optimization_suggestions || []
            topImpacts.value = data.data.key_factors?.map(f => ({
                name: f.name,
                impact: parseInt(f.value.replace('+', ''))
            })) || []
            
            showModal.value = true
        } else {
            Modal.error({
                title: '评估失败',
                content: data.message || '请检查后端服务是否正常运行'
            })
        }
    } catch (error) {
        console.error('API调用失败:', error)
        Modal.error({
            title: '网络错误',
            content: '无法连接到后端服务，请确保后端已启动（npm start）'
        })
    } finally {
        isLoading.value = false
    }
}

const resetForm = () => {
    formData.value = {
        shopName: '',
        category: '',
        rating: 3.5,
        operatingYears: '',
        averageSpend: 0,
        reviewCount: 0,
        debt: 0,
        facilityScore: 0,
        facilityDesc: '',
        overdueCount: 0,
        paymentTimeliness: 0.8,
        city: '',
        competitors: 5
    }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    background: #f5f7fb;
}

/* 顶部导航 */
.header {
    background: #ffffff;
    border-bottom: 1px solid #eef2f6;
    padding: 0 32px;
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: white;
}

.logo-text {
    display: flex;
    flex-direction: column;
}

.logo-title {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    letter-spacing: -0.3px;
}

.logo-sub {
    font-size: 12px;
    color: #94a3b8;
}

.header-info .badge {
    background: #f1f5f9;
    padding: 6px 14px;
    border-radius: 30px;
    font-size: 13px;
    color: #475569;
}

/* 主内容 */
.main {
    padding: 32px;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
}

/* 卡片样式 */
.card {
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 20px 40px -12px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.card-header {
    padding: 28px 32px 16px 32px;
    border-bottom: 1px solid #f0f2f5;
}

.card-header h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 4px;
}

.card-desc {
    font-size: 13px;
    color: #94a3b8;
}

/* 表单内容 */
.form-content {
    padding: 20px 32px;
}

.form-section {
    margin-bottom: 28px;
}

.form-section:last-of-type {
    margin-bottom: 0;
}

.section-title {
    font-size: 14px;
    font-weight: 600;
    color: #6366f1;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-icon {
    font-size: 16px;
}

.char-count {
    margin-left: auto;
    font-size: 12px;
    color: #94a3b8;
    font-weight: 400;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 16px;
}

.form-row:last-child {
    margin-bottom: 0;
}

.form-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-label {
    font-size: 13px;
    font-weight: 500;
    color: #475569;
}

.form-input, .form-select {
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 14px;
    color: #1e293b;
    background: #ffffff;
    transition: all 0.2s;
}

.form-input:focus, .form-select:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea {
    width: 100%;
    height: 100px;
    padding: 12px 16px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 14px;
    color: #1e293b;
    resize: none;
    transition: all 0.2s;
}

.form-textarea:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.facility-tips {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #94a3b8;
}

.tip-icon {
    font-size: 14px;
}

/* 评分滑块 */
.rating-input, .timeliness-input {
    display: flex;
    align-items: center;
    gap: 12px;
}

.rating-slider, .timeliness-slider {
    flex: 1;
    height: 6px;
    -webkit-appearance: none;
    background: #e2e8f0;
    border-radius: 10px;
    outline: none;
}

.rating-slider::-webkit-slider-thumb, .timeliness-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background: #6366f1;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(99, 102, 241, 0.3);
}

.rating-value, .timeliness-value {
    width: 50px;
    text-align: right;
    font-size: 14px;
    font-weight: 500;
    color: #6366f1;
}

/* 提交区域 */
.submit-section {
    padding: 24px 32px;
    border-top: 1px solid #f0f2f5;
    display: flex;
    gap: 16px;
    justify-content: flex-end;
}

.submit-btn {
    padding: 12px 32px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.reset-btn {
    padding: 12px 24px;
    background: #f1f5f9;
    color: #64748b;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.reset-btn:hover {
    background: #e2e8f0;
}

.btn-icon {
    font-size: 16px;
}

/* 弹窗样式 */
.result-modal .ant-modal-body {
    padding: 0;
}

.modal-content {
    padding: 16px;
}

.modal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.modal-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.score-display {
    text-align: center;
    padding: 16px 0;
    background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
    border-radius: 16px;
    margin-bottom: 16px;
}

.score-ring {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 15px 25px -10px rgba(0, 0, 0, 0.1);
}

.score-ring.low {
    background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
    box-shadow: 0 15px 25px -10px rgba(16, 185, 129, 0.3);
}

.score-ring.mid {
    background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
    box-shadow: 0 15px 25px -10px rgba(245, 158, 11, 0.3);
}

.score-ring.high {
    background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
    box-shadow: 0 15px 25px -10px rgba(239, 68, 68, 0.3);
}

.score-number {
    font-size: 44px;
    font-weight: 700;
    color: white;
    line-height: 1;
}

.score-max {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
}

.score-tag {
    display: inline-block;
    margin-top: 16px;
    padding: 6px 18px;
    border-radius: 40px;
    font-size: 14px;
    font-weight: 500;
}

.score-tag.low {
    background: #d1fae5;
    color: #065f46;
}

.score-tag.mid {
    background: #fed7aa;
    color: #92400e;
}

.score-tag.high {
    background: #fee2e2;
    color: #991b1b;
}

.score-desc {
    margin-top: 8px;
    font-size: 13px;
    color: #64748b;
}

.info-section {
    background: #f8fafc;
    border-radius: 12px;
    padding: 12px 16px;
}

.info-section .section-header {
    margin-bottom: 10px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e2e8f0;
}

.info-row:last-child {
    border-bottom: none;
}

.info-label {
    font-size: 13px;
    color: #64748b;
}

.info-value {
    font-size: 13px;
    font-weight: 500;
    color: #1e293b;
}

.loan-section, .suggestion-section, .impact-section {
    margin-bottom: 0;
}

.section-header {
    font-size: 14px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.loan-content {
    padding: 12px 16px;
    background: #f0f9ff;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    color: #0369a1;
}

.suggestion-list {
    list-style: none;
    padding: 0;
}

.suggestion-item {
    display: flex;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #f1f5f9;
}

.suggestion-item:last-child {
    border-bottom: none;
}

.suggestion-num {
    width: 22px;
    height: 22px;
    background: #e0e7ff;
    color: #6366f1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 500;
    flex-shrink: 0;
}

.suggestion-text {
    font-size: 13px;
    color: #475569;
    line-height: 1.4;
}

.impact-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.impact-row {
    display: flex;
    align-items: center;
    gap: 12px;
}

.impact-name {
    width: 70px;
    font-size: 12px;
    color: #64748b;
}

.impact-bar-wrapper {
    flex: 1;
    height: 6px;
    background: #f1f5f9;
    border-radius: 10px;
    overflow: hidden;
}

.impact-bar {
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease;
}

.impact-value {
    width: 40px;
    font-size: 12px;
    font-weight: 500;
    text-align: right;
}

.impact-value.positive {
    color: #10b981;
}

.impact-value.negative {
    color: #ef4444;
}

/* 响应式 */
@media (max-width: 600px) {
    .header {
        padding: 0 16px;
    }
    
    .main {
        padding: 16px;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .card-header, .form-content, .submit-section {
        padding: 16px;
    }
    
    .submit-section {
        flex-direction: column;
    }
    
    .submit-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>