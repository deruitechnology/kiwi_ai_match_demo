# Kiwi AI - 綠能智慧管理平台 (Green Energy Smart Management Platform)

![Platform Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

這是一個專為綠能交易設計的運營管理系統，結合 AI 匹配技術與直覺化的數據視覺化工具，協助企業與發電案場優化綠電轉供效率與結算流程。

## 🚀 核心功能 (Key Features)

### 1. AI 智慧匹配 (AI Matching)
- **Sankey 數據視覺化**：透過動態桑基圖 (Sankey Diagram) 呈現供需兩端的轉供配比。
- **匹配策略優化**：提供「RE 最優先」與「成本最佳化」兩種 AI 模型策略，極大化轉供效益。
- **趨勢分析**：即時分析供需匹配趨勢，並提供 SURPLUS/GAP 診斷建議。

### 2. 帳務與結算報表 (Billing & Reports)
- **自動化結算**：自動生成用電端與發電端的月度結算報表。
- **多維度分析**：包含每日用電佔比、獲配比例及效益貢獻分析。
- **報表匯出**：支援一鍵匯出符合法規需求的 CSV 格式報表。

### 3. 電力監控中心 (Monitoring)
- **電號狀態管理**：即時監控各電號的轉供狀態（生效、暫停、待生效）。
- **行政管理流程**：內建電號暫停與恢復轉供的標準作業流程 (SOP)。

### 4. 資產與帳號管理 (Assets & Users)
- **案場與合約管理**：整合發電案場、用電端合約與轉供版本控制。
- **系統權限控制**：完善的帳號管理機制與 KPI 監控中心。

## 🛠 技術棧 (Tech Stack)

- **Frontend**: React.js, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Visualization**: Recharts, D3.js (Sankey)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📦 快速開始 (Getting Started)

### 前置需求
- Node.js (v18+)
- npm 或 yarn

### 安裝步驟

1. **複製專案**
   ```bash
   git clone https://github.com/deruitechnology/kiwi_ai_match_demo.git
   cd kiwi_ai_match_demo
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

## 🌐 部署 (Deployment)

專案已設定自動化部署至 GitHub Pages：
```bash
npm run deploy
```
發布網址：[https://deruitechnology.github.io/kiwi_ai_match_demo/](https://deruitechnology.github.io/kiwi_ai_match_demo/)

---
© 2026 Derui Technology. All Rights Reserved.
