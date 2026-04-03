import { useState } from "react";

const TODAY = "04/03";

const unlocks = [
  {
    date: "04/01", token: "TIA", name: "Celestia", cat: "Modular", type: "클리프",
    unlockVal: "$53M", unlockPct: 17.20, recipient: "Early Investors/Seed/Core",
    mcap: "$258M", price: "$0.2946", athDrop: "-84.1%", circPct: 73.6,
    shortScore: 95, shortGrade: "S",
    analysis: "유통 대비 19.5% 클리프 완료. 시총 $258M에 $53M 인사이더 물량. 이미 풀림.",
    verified: true, risk: "매우높음", tradeable: "Binance/Bybit",
    // 차트 분석 (TvDatafeed 2026-04-03)
    chart: { rsi14: 40.2, rsi4h: 51.0, macd: "bearish", trend: "강한 하락", bbPct: 26.9, support: "$0.289", resistance: "$0.384", change7d: "+0.2%", change30d: "-13.5%", shortTech: 70, timing: "하락 추세 지속 — 숏 유지" },
    // 리서치
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "5/1 11.2M TIA (0.96%), 10/30 175.6M (대규모)",
    riskDetail: "4/1 완료. 매도 압력 지속. 10월 대규모 언락(84.89%) 예정. 추가 숏 진입보다 기존 유지 권장."
  },
  {
    date: "04/01", token: "SUI", name: "Sui", cat: "L1", type: "클리프",
    unlockVal: "$36M", unlockPct: 1.10, recipient: "Series B/Community",
    mcap: "$3.47B", price: "$0.877", athDrop: "-77.9%", circPct: 39.0,
    shortScore: 35, shortGrade: "C",
    analysis: "매월 반복. 시총 대비 1%. 패스.",
    verified: true, risk: "낮음", tradeable: "Binance/Bybit",
    chart: { rsi14: 42.4, rsi4h: 51.4, macd: "bearish", trend: "강한 하락", bbPct: 29.0, support: "$0.830", resistance: "$1.087", change7d: "+2.1%", change30d: "-8.0%", shortTech: 70, timing: "하락 추세 지속" },
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "매월 반복",
    riskDetail: "시총 대비 미미. 패스."
  },
  {
    date: "04/01", token: "EIGEN", name: "EigenLayer", cat: "Restaking", type: "클리프",
    unlockVal: "$7M", unlockPct: 2.04, recipient: "Early Contributors",
    mcap: "$340M", price: "$0.154", athDrop: "-92.9%", circPct: 67.0,
    shortScore: 50, shortGrade: "B-",
    analysis: "ATH -93%. 하방 제한. 완료.",
    verified: true, risk: "중간", tradeable: "Binance/Bybit",
    chart: { rsi14: 32.0, rsi4h: 30.5, macd: "bearish", trend: "강한 하락", bbPct: 12.7, support: "$0.150", resistance: "$0.237", change7d: "-9.0%", change30d: "-21.0%", shortTech: 60, timing: "하락 추세 지속" },
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "N/A",
    riskDetail: "RSI 32 과매도. BB 하단. 숏 추가 진입 위험."
  },
  {
    date: "04/01", token: "KITE", name: "Kite AI", cat: "AI/L1", type: "클리프",
    unlockVal: "$10M", unlockPct: 3.62, recipient: "Ecosystem/Team",
    mcap: "$277M", price: "$0.133", athDrop: "-58.9%", circPct: 18.0,
    shortScore: 60, shortGrade: "B",
    analysis: "런치풀 물량 완료. 6개 거래소 perp. -51% 30일.",
    verified: false, risk: "높음", tradeable: "Binance/Bybit/OKX/Bitget/KuCoin/Gate",
    chart: { rsi14: 32.5, rsi4h: 34.4, macd: "bearish", trend: "강한 하락", bbPct: 8.2, support: "$0.126", resistance: "$0.300", change7d: "-18.9%", change30d: "-51.4%", shortTech: 60, timing: "하락 추세 지속" },
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit/OKX/Bitget/KuCoin/Gate (6개)",
    nextUnlock: "미확인",
    riskDetail: "RSI 32.5 과매도, BB 하단(8.2%). 이미 -51% 폭락. 숏 추가 위험."
  },
  {
    date: "04/02", token: "ENA", name: "Ethena", cat: "DeFi", type: "클리프",
    unlockVal: "$28M", unlockPct: 2.00, recipient: "Foundation (300M)",
    mcap: "$790M", price: "$0.082", athDrop: "-88.6%", circPct: 56.6,
    shortScore: 55, shortGrade: "B",
    analysis: "Foundation 배분 완료. 4/5 Core 0.52% 추가 예정. 과거 유사 언락 시 -16%.",
    verified: true, risk: "중간", tradeable: "Binance/Bybit",
    chart: { rsi14: 33.0, rsi4h: 34.7, macd: "bearish", trend: "강한 하락", bbPct: 13.1, support: "$0.081", resistance: "$0.131", change7d: "-9.4%", change30d: "-28.8%", shortTech: 60, timing: "하락 추세 지속 — 숏 유지" },
    oi: "$173M", funding: "N/A", perp: "Binance/Bybit/OKX/Gate/Bitget (25개)",
    nextUnlock: "4/5 Core 0.52% ($4M)",
    riskDetail: "OI $173M 매우 풍부. RSI 33 과매도. 역사적 -16% 선례. 4/2 완료됨."
  },
  {
    date: "04/02", token: "OPN", name: "Opinion", cat: "Social/예측", type: "클리프",
    unlockVal: "$7M", unlockPct: 25.42, recipient: "Team/Investors",
    mcap: "$180M", price: "$0.186", athDrop: "-75.8%", circPct: 23.0,
    shortScore: 90, shortGrade: "S",
    analysis: "25.42% 팀/투자자 클리프. 실제 언락일 4/5로 확인됨 (대시보드 수정). -49% 30일.",
    verified: false, risk: "매우높음", tradeable: "Coinbase/BingX",
    chart: { rsi14: 33.8, rsi4h: 51.5, macd: "bullish", trend: "강한 하락", bbPct: 27.0, support: "$0.183", resistance: "$0.629", change7d: "-1.2%", change30d: "-49.4%", shortTech: 50, timing: "하락 추세 지속" },
    oi: "N/A", funding: "N/A", perp: "Coinbase/BingX (2개)",
    nextUnlock: "확인 필요",
    riskDetail: "실제 언락 4/5. 25% 대규모이나 Coinbase/BingX만 perp. Binance 미상장."
  },
  {
    date: "04/03", token: "W", name: "Wormhole", cat: "인터옵", type: "클리프",
    unlockVal: "$49M", unlockPct: 28.39, recipient: "Core Contributors/Eco",
    mcap: "$85M", price: "$0.0137", athDrop: "-90.8%", circPct: 56.0,
    shortScore: 92, shortGrade: "S",
    analysis: "오늘! 시총 $85M에 $49M(57%) 클리프! Core Contributors 물량. RSI 29.9 과매도 주의.",
    verified: true, risk: "매우높음", tradeable: "Binance/Bybit",
    chart: { rsi14: 29.9, rsi4h: 32.1, macd: "bearish", trend: "강한 하락", bbPct: 9.5, support: "$0.0136", resistance: "$0.0219", change7d: "-7.4%", change30d: "-26.4%", shortTech: 50, timing: "과매도 — 숏 진입 위험" },
    oi: "$18.7M", funding: "확인필요", perp: "Binance/Bybit",
    nextUnlock: "월간 선형 언락 지속",
    riskDetail: "RSI 29.9 과매도 + BB 하단(9.5%). OI $18.7M 낮아 슬리피지 주의. 포지션 크기 제한 필수."
  },
  {
    date: "04/03", token: "STO", name: "StakeStone", cat: "LSD/DeFi", type: "클리프",
    unlockVal: "$3M", unlockPct: 8.93, recipient: "Team/Ecosystem",
    mcap: "$46M~$304M", price: "$0.140", athDrop: "-92.5%", circPct: null,
    shortScore: 30, shortGrade: "C",
    analysis: "오늘! +135% 30일 급등 중. 강한 상승추세. 숏 위험. 가격 데이터 편차 심각.",
    verified: false, risk: "매우높음(역방향)", tradeable: "Binance/Bybit/Bitget",
    chart: { rsi14: 50.7, rsi4h: 43.0, macd: "bullish", trend: "강한 상승", bbPct: 53.6, support: "$0.052", resistance: "$0.169", change7d: "+19.2%", change30d: "+135.0%", shortTech: 30, timing: "상승 추세 — 숏 주의" },
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit/Bitget",
    nextUnlock: "미확인",
    riskDetail: "강한 상승 추세(+135% 30일). RSI 50.7 중립. 숏 시 역추세 매매. 위험."
  },
  {
    date: "04/03", token: "ICNT", name: "Impossible Cloud", cat: "DePIN/Cloud", type: "클리프",
    unlockVal: "$4M", unlockPct: 3.41, recipient: "Ecosystem/Team",
    mcap: "$100~136M", price: "N/A", athDrop: "N/A", circPct: 35.7,
    shortScore: 40, shortGrade: "C+",
    analysis: "오늘! 3.4% 소규모. BingX만 perp. 숏 실행 어려움.",
    verified: false, risk: "중간", tradeable: "BingX만",
    chart: null,
    oi: "N/A", funding: "N/A", perp: "BingX만 (1개)",
    nextUnlock: "미확인",
    riskDetail: "단일 거래소(BingX)만 perp. 유동성 매우 부족. 실질적 숏 불가."
  },
  {
    date: "04/04", token: "LA", name: "Lagrange", cat: "ZK/Infra", type: "클리프",
    unlockVal: "$2M", unlockPct: 5.94, recipient: "Ecosystem/Team",
    mcap: "$193M", price: "$0.184", athDrop: "-69.3%", circPct: 19.3,
    shortScore: 70, shortGrade: "A-",
    analysis: "내일. 6% 클리프. 강한 하락추세. Binance perp.",
    verified: false, risk: "높음", tradeable: "Binance",
    chart: { rsi14: 38.8, rsi4h: 43.6, macd: "bearish", trend: "강한 하락", bbPct: 27.9, support: "$0.174", resistance: "$0.275", change7d: "+7.0%", change30d: "-15.1%", shortTech: 70, timing: "하락 추세 지속 — 숏 유지" },
    oi: "N/A", funding: "N/A", perp: "Binance",
    nextUnlock: "마지막 확인: 3/4 (1.15%). 2035년까지 장기 베스팅",
    riskDetail: "숏 기술점수 70. 강한 하락추세 + bearish MACD. Binance perp 유동성 양호. 유력."
  },
  {
    date: "04/05", token: "ENA2", name: "Ethena 2차", cat: "DeFi", type: "클리프",
    unlockVal: "$4M", unlockPct: 0.52, recipient: "Core Contributors",
    mcap: "$790M", price: "$0.082", athDrop: "-88.6%", circPct: 56.6,
    shortScore: 40, shortGrade: "C+",
    analysis: "0.52% 소규모 추가 언락.",
    verified: true, risk: "낮음", tradeable: "Binance/Bybit",
    chart: { rsi14: 33.0, rsi4h: 34.7, macd: "bearish", trend: "강한 하락", bbPct: 13.1, support: "$0.081", resistance: "$0.131", change7d: "-9.4%", change30d: "-28.8%", shortTech: 60, timing: "하락 추세 지속" },
    oi: "$173M", funding: "N/A", perp: "Binance/Bybit/OKX (25개)",
    nextUnlock: "월간 지속",
    riskDetail: "0.52% 소규모. 별도 포지션 불필요."
  },
  {
    date: "04/05", token: "POWER", name: "Power", cat: "DeFi", type: "클리프",
    unlockVal: "$1M", unlockPct: 8.87, recipient: "Team/Ecosystem",
    mcap: "소규모", price: "$0.077", athDrop: "-90%+", circPct: null,
    shortScore: 0, shortGrade: "X",
    analysis: "Perp 없음 — 숏 불가. Team 30M개 거래소 전송 후 90% 폭락. 사기 의심.",
    verified: false, risk: "거래불가", tradeable: "Perp 없음",
    chart: null,
    oi: "없음", funding: "없음", perp: "없음",
    nextUnlock: "N/A",
    riskDetail: "Perpetual 선물 미지원. Team의 대량 출금 후 90% 폭락. 숏 물리적 불가."
  },
  {
    date: "04/06", token: "HYPE", name: "Hyperliquid", cat: "DEX/L1", type: "클리프",
    unlockVal: "$12M", unlockPct: 2.66, recipient: "Core Contributors",
    mcap: "$8.84B", price: "$35.93", athDrop: "-39.7%", circPct: 24.0,
    shortScore: 45, shortGrade: "B-",
    analysis: "보유 포지션! 바이백 월 2.3M > 월 언락 1.75M. 순 디플레이션 구조.",
    verified: true, risk: "낮음", tradeable: "Binance/Bybit",
    chart: { rsi14: 47.2, rsi4h: 44.7, macd: "bearish", trend: "하락", bbPct: 15.3, support: "$26.73", resistance: "$41.85", change7d: "-9.0%", change30d: "+17.7%", shortTech: 60, timing: "단기 조정 중" },
    oi: "N/A", funding: "4%/h 상한제", perp: "Binance/Bybit + Hyperliquid",
    nextUnlock: "월간 선형",
    riskDetail: "바이백($645M 누적) > 언락($12M). 구조적 흡수. 숏 비추. 보유 유지."
  },
  {
    date: "04/07", token: "GUN", name: "Gunz", cat: "Gaming", type: "클리프",
    unlockVal: "$1M", unlockPct: 4.91, recipient: "Ecosystem/Team",
    mcap: "$68M", price: "$0.015", athDrop: "-61.4%", circPct: null,
    shortScore: 70, shortGrade: "A-",
    analysis: "게이밍 5% 클리프. 3/31 런칭 초신규. 강한 하락추세.",
    verified: false, risk: "높음", tradeable: "Binance/OKX",
    chart: { rsi14: 38.9, rsi4h: 38.6, macd: "bearish", trend: "강한 하락", bbPct: 26.2, support: "$0.015", resistance: "$0.030", change7d: "-3.9%", change30d: "-24.4%", shortTech: 70, timing: "하락 추세 지속 — 숏 유지" },
    oi: "N/A", funding: "N/A", perp: "Binance (75x) / OKX",
    nextUnlock: "미확인 (3/31 런칭 초신규)",
    riskDetail: "숏 기술점수 70. 강한 하락 + bearish MACD. 런칭 직후라 변동성 극심."
  },
  {
    date: "04/12", token: "APT", name: "Aptos", cat: "L1", type: "클리프",
    unlockVal: "$10M", unlockPct: 1.3, recipient: "Community/Core",
    mcap: "$719M", price: "$0.868", athDrop: "-84.7%", circPct: 63.9,
    shortScore: 40, shortGrade: "C+",
    analysis: "매월 반복. Community 포함. 임팩트 작음.",
    verified: true, risk: "낮음", tradeable: "Binance/Bybit",
    chart: { rsi14: 39.5, rsi4h: 39.6, macd: "bearish", trend: "하락", bbPct: 15.9, support: "$0.838", resistance: "$1.156", change7d: "-6.7%", change30d: "-12.9%", shortTech: 60, timing: "하락 추세" },
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "매월 반복",
    riskDetail: "매월 1.3%. 시총 대비 미미. 패스."
  },
  {
    date: "04/15", token: "STRK", name: "Starknet", cat: "L2/ZK", type: "클리프",
    unlockVal: "$4M", unlockPct: 1.27, recipient: "Early/Investors",
    mcap: "$32M", price: "$0.034", athDrop: "-88.0%", circPct: 56.8,
    shortScore: 55, shortGrade: "B",
    analysis: "시총 $32M에 $4M(12.5%). 비율 상당하나 유동성 극도 부족.",
    verified: true, risk: "높음", tradeable: "Binance/Bybit",
    chart: { rsi14: 35.8, rsi4h: 42.5, macd: "bullish", trend: "강한 하락", bbPct: 24.3, support: "$0.033", resistance: "$0.053", change7d: "-1.3%", change30d: "-15.9%", shortTech: 50, timing: "하락 추세 지속" },
    oi: "$33~70M", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "매월 15일 127M STRK, 2027/3까지",
    riskDetail: "24h 거래량 $351K 극저. 숏 실행 시 슬리피지 극심. 시총 대비 비율은 높으나 유동성 경고."
  },
  {
    date: "04/16", token: "ARB", name: "Arbitrum", cat: "L2", type: "클리프",
    unlockVal: "$9M", unlockPct: 1.5, recipient: "DAO Treasury",
    mcap: "$1.2B", price: "$0.094", athDrop: "-82.4%", circPct: 72.0,
    shortScore: 30, shortGrade: "C",
    analysis: "DAO Treasury = 시장 매도 아님. 패스.",
    verified: true, risk: "매우낮음", tradeable: "Binance/Bybit",
    chart: { rsi14: 45.8, rsi4h: 57.7, macd: "bullish", trend: "강한 하락", bbPct: 40.2, support: "$0.089", resistance: "$0.122", change7d: "+4.9%", change30d: "-8.5%", shortTech: 50, timing: "방향 혼재" },
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "매월",
    riskDetail: "DAO Treasury 배분. 시장 직접 매도 아님. 패스."
  },
  {
    date: "04/20", token: "ZRO", name: "LayerZero", cat: "인터옵", type: "클리프",
    unlockVal: "$49M", unlockPct: 2.40, recipient: "Core/전략",
    mcap: "~$500M", price: "$1.94", athDrop: "-25.0%", circPct: 49.7,
    shortScore: 70, shortGrade: "A-",
    analysis: "Core $49M. 시총 대비 10%. OI $125.9M 풍부. 단기 숏 유력.",
    verified: true, risk: "중간~높음", tradeable: "Binance/Bybit",
    chart: { rsi14: 48.0, rsi4h: 52.4, macd: "bearish", trend: "하락", bbPct: 29.4, support: "$1.45", resistance: "$2.32", change7d: "-2.8%", change30d: "+3.1%", shortTech: 70, timing: "하락 추세" },
    oi: "$125.9M", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "월간 선형, 442일 남음",
    riskDetail: "OI 풍부. Core contributor 매도 거의 확정. ATH -25%로 하락 여지 큼. 4/15~19 진입 추천."
  },
  {
    date: "04/20", token: "KAITO", name: "Kaito", cat: "SocialFi", type: "클리프",
    unlockVal: "$5M", unlockPct: 5.19, recipient: "Core Contributors",
    mcap: "$98.75M", price: "$0.426", athDrop: "-74.5%", circPct: 24.1,
    shortScore: 55, shortGrade: "B",
    analysis: "Core 5.19%. 현재 강한 상승 추세(+19% 30일, RSI 66). BB 상단. 숏 타이밍 주의.",
    verified: true, risk: "높음", tradeable: "Bybit/Bitget",
    chart: { rsi14: 66.2, rsi4h: 64.4, macd: "bullish", trend: "강한 상승", bbPct: 92.8, support: "$0.288", resistance: "$0.437", change7d: "+9.6%", change30d: "+19.3%", shortTech: 40, timing: "상승 추세 — 숏 주의" },
    oi: "$29.7M", funding: "N/A", perp: "Bybit/Bitget",
    nextUnlock: "5월 추가 언락 예정 (연쇄)",
    riskDetail: "차트 상승 중! RSI 66, BB 92.8%. 과거 언락 시 -11~37%이나 현재 모멘텀 강함. 4/18~19 진입 대기, 추세 꺾임 확인 후."
  },
  {
    date: "04/28", token: "JUP", name: "Jupiter", cat: "DEX", type: "클리프",
    unlockVal: "$10M", unlockPct: 1.7, recipient: "Community",
    mcap: "$1.1B", price: "$0.164", athDrop: "-71.4%", circPct: 52.0,
    shortScore: 30, shortGrade: "C",
    analysis: "Community 배분. 실적 DEX. 상승 추세. 패스.",
    verified: true, risk: "낮음", tradeable: "Binance/Bybit",
    chart: { rsi14: 55.4, rsi4h: 62.4, macd: "bullish", trend: "상승", bbPct: 75.0, support: "$0.137", resistance: "$0.193", change7d: "+13.6%", change30d: "-12.1%", shortTech: 30, timing: "상승 추세 — 숏 주의" },
    oi: "N/A", funding: "N/A", perp: "Binance/Bybit",
    nextUnlock: "매월",
    riskDetail: "상승 추세(RSI 55.4, +13.6% 7일). Community 배분. 숏 부적합."
  },
];

// ============================================================
// 내 포지션 데이터 (2026-04-03 19:53 KST)
// ============================================================
const myPositions = {
  standalone: [
    { coin: "W", exchange: "binance", side: "short", size: 10870.3, entry: 0.01374, mark: 0.01379, pnl: -0.46, pnlPct: -0.3, lev: 5, notional: 150, unlockToken: true, note: "오늘 28% 언락" },
    { coin: "POWER", exchange: "binance", side: "short", size: 7247, entry: 0.0747, mark: 0.0761, pnl: -10.1, pnlPct: -1.7, lev: 5, notional: 552, unlockToken: true, note: "오늘 8.9% 언락" },
    { coin: "SOL", exchange: "bybit", side: "short", size: 14.41, entry: 82.0, mark: 79.97, pnl: 29.2, pnlPct: 2.5, lev: 10, notional: 1152, unlockToken: false, note: "부분헷지 5.59/20, 14.41 단독" },
    { coin: "BTC", exchange: "bybit", side: "short", size: 0.07, entry: 66425, mark: 66816, pnl: -27.3, pnlPct: -0.6, lev: 10, notional: 4677, unlockToken: false, note: "고레버 방향성 숏" },
    { coin: "SIREN", exchange: "binance", side: "short", size: 650, entry: 0.2664, mark: 0.1744, pnl: 59.8, pnlPct: 34.9, lev: 2, notional: 113, unlockToken: false, note: "" },
    { coin: "D", exchange: "binance", side: "short", size: 234813, entry: 0.008, mark: 0.00695, pnl: 247.5, pnlPct: 13.2, lev: 3, notional: 1631, unlockToken: false, note: "" },
    { coin: "ZKP", exchange: "binance", side: "short", size: 28669, entry: 0.0758, mark: 0.068, pnl: 223.1, pnlPct: 10.3, lev: 1, notional: 1949, unlockToken: false, note: "저레버 안정" },
    { coin: "ROBO", exchange: "binance", side: "short", size: 158941, entry: 0.02, mark: 0.01865, pnl: 221.3, pnlPct: 6.8, lev: 5, notional: 2965, unlockToken: false, note: "" },
    { coin: "SUPER", exchange: "binance", side: "short", size: 16800, entry: 0.1045, mark: 0.0998, pnl: 80.1, pnlPct: 4.4, lev: 5, notional: 1676, unlockToken: false, note: "" },
    { coin: "CRCL", exchange: "binance", side: "short", size: 11.5, entry: 93.9, mark: 90.74, pnl: 36.4, pnlPct: 3.4, lev: 5, notional: 1044, unlockToken: false, note: "" },
    { coin: "ETHFI", exchange: "binance", side: "short", size: 2300, entry: 0.461, mark: 0.4454, pnl: 35.8, pnlPct: 3.4, lev: 3, notional: 1024, unlockToken: false, note: "" },
    { coin: "YGG", exchange: "bybit", side: "short", size: 16726.8, entry: 0.03617, mark: 0.03536, pnl: 13.6, pnlPct: 2.1, lev: 5, notional: 591, unlockToken: false, note: "" },
    { coin: "BASED", exchange: "bybit", side: "short", size: 11250, entry: 0.08683, mark: 0.0855, pnl: 15.0, pnlPct: 1.8, lev: 10, notional: 962, unlockToken: false, note: "" },
    { coin: "WLD", exchange: "binance", side: "short", size: 5000, entry: 0.2752, mark: 0.2713, pnl: 19.6, pnlPct: 1.3, lev: 5, notional: 1356, unlockToken: false, note: "" },
    { coin: "MSTR", exchange: "binance", side: "short", size: 8, entry: 121.75, mark: 120.37, pnl: 11.0, pnlPct: 1.1, lev: 5, notional: 963, unlockToken: false, note: "" },
    { coin: "EWY", exchange: "binance", side: "short", size: 3, entry: 120.06, mark: 122.06, pnl: -6.0, pnlPct: -1.7, lev: 3, notional: 366, unlockToken: false, note: "" },
    { coin: "CELR", exchange: "binance", side: "short", size: 400000, entry: 0.00246, mark: 0.00254, pnl: -33.8, pnlPct: -3.4, lev: 5, notional: 1018, unlockToken: false, note: "" },
    { coin: "COOKIE", exchange: "binance", side: "short", size: 16590, entry: 0.01578, mark: 0.01681, pnl: -17.1, pnlPct: -6.5, lev: 5, notional: 279, unlockToken: false, note: "" },
    { coin: "BP", exchange: "bybit", side: "short", size: 2000, entry: 0.1496, mark: 0.1618, pnl: -24.3, pnlPct: -8.1, lev: 3, notional: 324, unlockToken: false, note: "" },
    { coin: "LIT", exchange: "binance", side: "short", size: 690, entry: 0.9286, mark: 1.021, pnl: -63.8, pnlPct: -10.2, lev: 2, notional: 704, unlockToken: false, note: "손실 최대" },
  ],
  hedged: [
    { coin: "TRUMP", exchange: "bybit", hedgeWith: "bithumb", pnlPct: 3.6, lev: 10 },
    { coin: "ILV", exchange: "binance", hedgeWith: "bithumb", pnlPct: 4.3, lev: 5 },
    { coin: "KAT", exchange: "binance", hedgeWith: "upbit", pnlPct: 15.7, lev: 5 },
    { coin: "ZORA", exchange: "bybit", hedgeWith: "bithumb", pnlPct: 2.3, lev: 10 },
    { coin: "PROVE", exchange: "bybit", hedgeWith: "upbit", pnlPct: 2.2, lev: 10 },
    { coin: "KAVA", exchange: "bybit", hedgeWith: "upbit", pnlPct: -0.4, lev: 5 },
    { coin: "MON", exchange: "binance", hedgeWith: "bybit", pnlPct: -6.0, lev: 3 },
    { coin: "TAIKO", exchange: "binance", hedgeWith: "bybit", pnlPct: 7.5, lev: 5 },
    { coin: "VVV", exchange: "binance", hedgeWith: "bybit", pnlPct: -4.0, lev: 5 },
    { coin: "DOGE", exchange: "bybit", hedgeWith: "bybit", pnlPct: -1.4, lev: 10 },
    { coin: "HYPE", exchange: "bybit", hedgeWith: "bybit", pnlPct: 7.8, lev: 5 },
    { coin: "SOL", exchange: "bybit", hedgeWith: "bybit", pnlPct: 2.5, lev: 10, note: "5.59/20 부분헷지" },
    { coin: "ETH", exchange: "bybit", hedgeWith: "bybit", pnlPct: -3.4, lev: 10 },
  ],
  summary: {
    totalStandalone: 20,
    totalHedged: 13,
    standaloneWinning: 12,
    standaloneLosing: 8,
    winRate: 60,
    totalPnl: 889.2,
    totalNotional: 23496,
    updatedAt: "2026-04-03 19:53 KST"
  }
};

// ============================================================
// 유틸리티
// ============================================================
const getStatus = (d) => {
  const n = parseInt(d.split("/")[1]);
  const t = parseInt(TODAY.split("/")[1]);
  return n < t ? "done" : n === t ? "today" : "upcoming";
};
const statusLabel = { done: "완료", today: "오늘!", upcoming: "예정" };
const statusColor = { done: "#5b5b6b", today: "#ff4444", upcoming: "#4ade80" };
const gradeColor = (g) =>
  g === "S" ? "#ff4444" : g === "X" ? "#5b5b6b" : g.startsWith("A") ? "#ff8844" : g.startsWith("B") ? "#facc15" : g.startsWith("C") ? "#4ade80" : "#9ca3af";

const rsiColor = (v) => !v ? "#5b5b6b" : v <= 30 ? "#a855f7" : v <= 40 ? "#3b82f6" : v <= 60 ? "#9ca3af" : v <= 70 ? "#fb923c" : "#ef4444";
const rsiLabel = (v) => !v ? "N/A" : v <= 30 ? "과매도" : v <= 40 ? "약세" : v <= 60 ? "중립" : v <= 70 ? "강세" : "과매수";
const trendColor = (t) => !t ? "#5b5b6b" : t.includes("상승") ? "#4ade80" : t.includes("하락") ? "#f87171" : "#facc15";
const techScoreColor = (s) => s >= 70 ? "#4ade80" : s >= 50 ? "#facc15" : "#f87171";

// ============================================================
// 컴포넌트
// ============================================================
export default function App() {
  const [filter, setFilter] = useState("upcoming");
  const [sort, setSort] = useState("date");
  const [exp, setExp] = useState(null);
  const [tab, setTab] = useState("main"); // main | chart | risk

  const filtered = unlocks.filter((u) => {
    const s = getStatus(u.date);
    if (filter === "upcoming") return s !== "done";
    if (filter === "top") return s !== "done" && u.shortScore >= 65;
    if (filter === "chart") return u.chart !== null;
    return true;
  });
  const sorted = [...filtered].sort((a, b) =>
    sort === "date" ? a.date.localeCompare(b.date) :
    sort === "score" ? b.shortScore - a.shortScore :
    sort === "tech" ? (b.chart?.shortTech || 0) - (a.chart?.shortTech || 0) :
    b.shortScore - a.shortScore
  );
  const todayU = unlocks.filter((u) => getStatus(u.date) === "today");
  const doneC = unlocks.filter((u) => getStatus(u.date) === "done").length;

  return (
    <div style={{ background: "#06080c", minHeight: "100vh", color: "#e2e2ee", fontFamily: "'JetBrains Mono',monospace", padding: 16, maxWidth: 800, margin: "0 auto" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#1a1c28;border-radius:4px}`}</style>

      {/* 헤더 */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 10, color: "#6b6b7b", letterSpacing: 3 }}>APRIL 2026 · TODAY {TODAY} · TVDATAFEED ANALYSIS</div>
        <div style={{ fontFamily: "'Space Grotesk'", fontSize: 22, fontWeight: 700 }}>Token Unlock 숏 전략</div>
        <div style={{ display: "flex", gap: 12, marginTop: 4, fontSize: 10 }}>
          <span style={{ color: "#6b6b7b" }}>총 {unlocks.length}개</span>
          <span style={{ color: "#5b5b6b" }}>완료 {doneC}</span>
          <span style={{ color: "#4ade80" }}>남은 {unlocks.length - doneC}</span>
          <span style={{ color: "#ff4444" }}>오늘 {todayU.length}</span>
        </div>
      </div>

      {/* 오늘 언락 패널 */}
      {todayU.length > 0 && (
        <div style={{ background: "linear-gradient(135deg, #1a0808, #140a0a)", border: "1px solid #3a1212", borderRadius: 12, padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#ff4444", marginBottom: 10 }}>TODAY — {TODAY}</div>
          {todayU.map((u) => (
            <div key={u.token} style={{ background: "#200a0a", border: "1px solid #401515", borderRadius: 8, padding: 12, marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontFamily: "'Space Grotesk'", fontSize: 18, fontWeight: 700, color: "#ff4444" }}>{u.token}</span>
                  <span style={{ fontSize: 10, color: "#9b6060", marginLeft: 8 }}>{u.name}</span>
                </div>
                <span style={{ fontSize: 20, fontWeight: 700, color: gradeColor(u.shortGrade), fontFamily: "'Space Grotesk'" }}>{u.shortGrade}</span>
              </div>
              <div style={{ fontSize: 11, color: "#d4a0a0", marginTop: 6 }}>{u.unlockPct}% 클리프 · {u.unlockVal} · {u.recipient}</div>
              {u.chart && (
                <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#1a0a0a", border: "1px solid #301515", color: rsiColor(u.chart.rsi14) }}>RSI {u.chart.rsi14}</span>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#1a0a0a", border: "1px solid #301515", color: trendColor(u.chart.trend) }}>{u.chart.trend}</span>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#1a0a0a", border: "1px solid #301515", color: u.chart.macd === "bearish" ? "#f87171" : "#4ade80" }}>MACD {u.chart.macd}</span>
                  {u.oi && u.oi !== "N/A" && <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#1a0a0a", border: "1px solid #301515", color: "#60a5fa" }}>OI {u.oi}</span>}
                </div>
              )}
              <div style={{ fontSize: 10, color: "#9b7070", marginTop: 6, lineHeight: 1.6 }}>{u.riskDetail || u.analysis}</div>
            </div>
          ))}
        </div>
      )}

      {/* 필터/정렬 바 */}
      <div style={{ display: "flex", gap: 5, marginBottom: 10, flexWrap: "wrap" }}>
        {[["upcoming", "오늘+예정"], ["top", "숏후보(65+)"], ["chart", "차트분석"], ["all", "전체"]].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{ background: filter === k ? "#1a1c28" : "transparent", color: filter === k ? "#e2e2ee" : "#5b5b6b", border: "1px solid #1a1c28", padding: "4px 12px", borderRadius: 6, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
        ))}
        <div style={{ flex: 1 }} />
        {[["date", "날짜"], ["score", "숏점수"], ["tech", "기술점수"]].map(([k, l]) => (
          <button key={k} onClick={() => setSort(k)} style={{ background: sort === k ? "#1a1c28" : "transparent", color: sort === k ? "#e2e2ee" : "#5b5b6b", border: "1px solid #1a1c28", padding: "4px 12px", borderRadius: 6, fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
        ))}
      </div>

      {/* 토큰 카드 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {sorted.map((u) => {
          const st = getStatus(u.date);
          const id = u.token + u.date;
          const open = exp === id;
          const c = u.chart;
          return (
            <div key={id} onClick={() => setExp(open ? null : id)} style={{ background: st === "today" ? "#0e0808" : st === "done" ? "#08080a" : "#0a0c12", border: `1px solid ${st === "today" ? "#2a1212" : open ? "#2a2a3a" : "#111318"}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", opacity: st === "done" ? 0.45 : 1 }}>
              {/* 카드 헤더 */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 46, textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: statusColor[st] }}>{u.date}</div>
                  <div style={{ fontSize: 7, color: statusColor[st], marginTop: 1 }}>{statusLabel[st]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "'Space Grotesk'", fontSize: 13, fontWeight: 700 }}>{u.token}</span>
                    <span style={{ fontSize: 8, color: "#4b4b5b" }}>{u.cat}</span>
                    {!u.verified && <span style={{ fontSize: 7, color: "#facc15", background: "#1a1808", padding: "0 3px", borderRadius: 2 }}>?</span>}
                    {u.token === "HYPE" && <span style={{ fontSize: 7, color: "#60a5fa", background: "#081020", padding: "0 3px", borderRadius: 2 }}>보유</span>}
                    {u.shortGrade === "X" && <span style={{ fontSize: 7, color: "#ef4444", background: "#1a0808", padding: "0 3px", borderRadius: 2 }}>거래불가</span>}
                    {/* RSI 뱃지 */}
                    {c && <span style={{ fontSize: 7, color: rsiColor(c.rsi14), background: "#0c0d14", padding: "0 4px", borderRadius: 2 }}>RSI {c.rsi14}</span>}
                    {/* 추세 뱃지 */}
                    {c && <span style={{ fontSize: 7, color: trendColor(c.trend), background: "#0c0d14", padding: "0 4px", borderRadius: 2 }}>{c.trend}</span>}
                  </div>
                  <div style={{ fontSize: 9, color: "#4b4b5b", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {u.unlockPct}% · {u.unlockVal} · {u.recipient.substring(0, 24)}
                  </div>
                </div>
                <div style={{ width: 80, textAlign: "right", flexShrink: 0 }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 4, alignItems: "baseline" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: st === "done" ? "#3b3b4b" : gradeColor(u.shortGrade), fontFamily: "'Space Grotesk'" }}>{u.shortGrade}</span>
                    {c && <span style={{ fontSize: 9, color: techScoreColor(c.shortTech) }}>T{c.shortTech}</span>}
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: "#151720", marginTop: 2 }}>
                    <div style={{ height: 3, borderRadius: 2, width: `${u.shortScore}%`, background: st === "done" ? "#2b2b3b" : gradeColor(u.shortGrade), transition: "width .3s" }} />
                  </div>
                </div>
              </div>

              {/* 확장 상세 패널 */}
              {open && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid #151720" }}>
                  {/* 탭 */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
                    {[["main", "기본"], ["chart", "차트분석"], ["risk", "리스크"]].map(([k, l]) => (
                      <button key={k} onClick={(e) => { e.stopPropagation(); setTab(k); }} style={{ background: tab === k ? "#1a1c28" : "transparent", color: tab === k ? "#e2e2ee" : "#5b5b6b", border: "1px solid #1a1c28", padding: "3px 10px", borderRadius: 5, fontSize: 9, cursor: "pointer", fontFamily: "inherit" }}>{l}</button>
                    ))}
                  </div>

                  {/* 기본 탭 */}
                  {tab === "main" && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 5, marginBottom: 8 }}>
                        {[["시총", u.mcap], ["가격", u.price], ["ATH↓", u.athDrop], ["유통", u.circPct ? `${u.circPct}%` : "?"]].map(([k, v]) => (
                          <div key={k} style={{ background: "#0c0d14", borderRadius: 5, padding: "5px 6px" }}>
                            <div style={{ fontSize: 7, color: "#4b4b5b" }}>{k}</div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: "#a0a0b0" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 5, marginBottom: 8 }}>
                        {[["OI", u.oi || "N/A"], ["Perp", u.perp || "N/A"], ["다음언락", u.nextUnlock ? u.nextUnlock.substring(0, 28) : "N/A"]].map(([k, v]) => (
                          <div key={k} style={{ background: "#0c0d14", borderRadius: 5, padding: "5px 6px" }}>
                            <div style={{ fontSize: 7, color: "#4b4b5b" }}>{k}</div>
                            <div style={{ fontSize: 9, fontWeight: 500, color: "#8090a0" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ background: "#0c0d14", borderRadius: 6, padding: 8 }}>
                        <div style={{ fontSize: 10, color: "#9090a0", lineHeight: 1.7 }}>{u.analysis}</div>
                      </div>
                    </>
                  )}

                  {/* 차트분석 탭 */}
                  {tab === "chart" && c && (
                    <>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 5, marginBottom: 8 }}>
                        {[
                          ["RSI(14)", c.rsi14, rsiColor(c.rsi14)],
                          ["RSI(4h)", c.rsi4h, rsiColor(c.rsi4h)],
                          ["MACD", c.macd, c.macd === "bearish" ? "#f87171" : "#4ade80"],
                          ["BB%", `${c.bbPct}%`, c.bbPct < 20 ? "#a855f7" : c.bbPct > 80 ? "#ef4444" : "#9ca3af"],
                        ].map(([k, v, col]) => (
                          <div key={k} style={{ background: "#0c0d14", borderRadius: 5, padding: "5px 6px" }}>
                            <div style={{ fontSize: 7, color: "#4b4b5b" }}>{k}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: col }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 5, marginBottom: 8 }}>
                        {[
                          ["추세", c.trend, trendColor(c.trend)],
                          ["7일", c.change7d, c.change7d?.startsWith("-") ? "#f87171" : "#4ade80"],
                          ["30일", c.change30d, c.change30d?.startsWith("-") ? "#f87171" : "#4ade80"],
                          ["숏기술", c.shortTech, techScoreColor(c.shortTech)],
                        ].map(([k, v, col]) => (
                          <div key={k} style={{ background: "#0c0d14", borderRadius: 5, padding: "5px 6px" }}>
                            <div style={{ fontSize: 7, color: "#4b4b5b" }}>{k}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: col }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 8 }}>
                        <div style={{ background: "#0c0d14", borderRadius: 5, padding: "5px 6px" }}>
                          <div style={{ fontSize: 7, color: "#4b4b5b" }}>지지선</div>
                          <div style={{ fontSize: 10, fontWeight: 600, color: "#4ade80" }}>{c.support || "N/A"}</div>
                        </div>
                        <div style={{ background: "#0c0d14", borderRadius: 5, padding: "5px 6px" }}>
                          <div style={{ fontSize: 7, color: "#4b4b5b" }}>저항선</div>
                          <div style={{ fontSize: 10, fontWeight: 600, color: "#f87171" }}>{c.resistance || "N/A"}</div>
                        </div>
                      </div>
                      <div style={{ background: "#0c0d14", borderRadius: 6, padding: 8 }}>
                        <div style={{ fontSize: 7, color: "#4b4b5b", marginBottom: 2 }}>타이밍 판단</div>
                        <div style={{ fontSize: 10, fontWeight: 500, color: c.timing?.includes("위험") || c.timing?.includes("주의") ? "#fb923c" : "#4ade80", lineHeight: 1.6 }}>{c.timing}</div>
                      </div>
                    </>
                  )}
                  {tab === "chart" && !c && (
                    <div style={{ background: "#0c0d14", borderRadius: 6, padding: 12, textAlign: "center" }}>
                      <div style={{ fontSize: 10, color: "#5b5b6b" }}>차트 데이터 없음 (TvDatafeed 미지원)</div>
                    </div>
                  )}

                  {/* 리스크 탭 */}
                  {tab === "risk" && (
                    <>
                      <div style={{ background: "#0c0d14", borderRadius: 6, padding: 10, marginBottom: 6 }}>
                        <div style={{ fontSize: 7, color: "#4b4b5b", marginBottom: 4 }}>상세 리스크 분석</div>
                        <div style={{ fontSize: 10, color: "#b0b0c0", lineHeight: 1.8 }}>{u.riskDetail || u.analysis}</div>
                      </div>
                      {u.nextUnlock && (
                        <div style={{ background: "#0c0d14", borderRadius: 6, padding: 10 }}>
                          <div style={{ fontSize: 7, color: "#4b4b5b", marginBottom: 4 }}>다음 언락 일정</div>
                          <div style={{ fontSize: 10, color: "#8090a0", lineHeight: 1.6 }}>{u.nextUnlock}</div>
                        </div>
                      )}
                    </>
                  )}

                  {/* 하단 정보 */}
                  <div style={{ display: "flex", gap: 8, marginTop: 8, fontSize: 9, flexWrap: "wrap" }}>
                    <span style={{ color: "#5b5b6b" }}>리스크: <span style={{ color: u.risk.includes("매우높") || u.risk.includes("거래불가") ? "#f87171" : u.risk.includes("높") ? "#fb923c" : u.risk.includes("중") ? "#facc15" : "#4ade80" }}>{u.risk}</span></span>
                    <span style={{ color: "#5b5b6b" }}>거래소: <span style={{ color: "#8b8b9b" }}>{u.tradeable}</span></span>
                    {u.oi && u.oi !== "N/A" && u.oi !== "없음" && <span style={{ color: "#5b5b6b" }}>OI: <span style={{ color: "#60a5fa" }}>{u.oi}</span></span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 전략 요약 + 차트 분석 요약 */}
      <div style={{ background: "#0a0c12", borderRadius: 10, border: "1px solid #141820", padding: 14, marginTop: 12 }}>
        <div style={{ fontSize: 10, color: "#6b6b7b", letterSpacing: 2, marginBottom: 8 }}>전략 요약 (차트 분석 반영)</div>
        <div style={{ fontSize: 10, color: "#a0a0b0", lineHeight: 2.4 }}>
          <span style={{ color: "#ff4444" }}>■</span> <b>4/3 오늘</b> — W 28% $49M / RSI 29.9 <span style={{ color: "#a855f7" }}>과매도</span>. 포지션 크기 제한 필수. STO +135% <span style={{ color: "#4ade80" }}>상승 중</span> 숏 금지.
          <br /><span style={{ color: "#fb923c" }}>■</span> <b>4/4~5</b> — LA 6% / RSI 38.8 하락추세 <span style={{ color: "#4ade80" }}>숏 유력</span>. GUN -24% 하락추세. POWER <span style={{ color: "#ef4444" }}>Perp 없음</span>.
          <br /><span style={{ color: "#60a5fa" }}>■</span> <b>4/6</b> — HYPE 2.66% / 바이백이 54배 커버. <span style={{ color: "#60a5fa" }}>보유 유지</span>.
          <br /><span style={{ color: "#a78bfa" }}>■</span> <b>4/20 핵심구간</b> — ZRO $49M / OI $125.9M <span style={{ color: "#4ade80" }}>숏 최적</span>. KAITO RSI 66 <span style={{ color: "#fb923c" }}>상승 중 — 추세 꺾임 대기</span>.
          <br /><span style={{ color: "#4b4b5b" }}>■</span> <b>패스</b> — SUI/APT/ARB/JUP (시총 대비 미미 or DAO/Community 배분)
        </div>
      </div>

      {/* 내 포지션 패널 */}
      <div style={{ background: "#0a0c12", borderRadius: 10, border: "1px solid #141820", padding: 14, marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 10, color: "#6b6b7b", letterSpacing: 2 }}>내 포지션 (단독 숏)</div>
            <div style={{ fontSize: 8, color: "#3b3b4b", marginTop: 2 }}>{myPositions.summary.updatedAt}</div>
          </div>
          <div style={{ display: "flex", gap: 10, fontSize: 10 }}>
            <span style={{ color: "#4ade80" }}>{myPositions.summary.standaloneWinning}W</span>
            <span style={{ color: "#f87171" }}>{myPositions.summary.standaloneLosing}L</span>
            <span style={{ color: "#9ca3af" }}>승률 {myPositions.summary.winRate}%</span>
            <span style={{ color: myPositions.summary.totalPnl >= 0 ? "#4ade80" : "#f87171", fontWeight: 600 }}>${myPositions.summary.totalPnl.toFixed(0)}</span>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9 }}>
            <thead>
              <tr style={{ color: "#5b5b6b", borderBottom: "1px solid #1a1c28" }}>
                <th style={{ padding: "4px 6px", textAlign: "left" }}>코인</th>
                <th style={{ padding: "4px 6px", textAlign: "center" }}>거래소</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>규모</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>레버</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>진입가</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>PnL%</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>PnL$</th>
                <th style={{ padding: "4px 6px", textAlign: "left" }}>비고</th>
              </tr>
            </thead>
            <tbody>
              {[...myPositions.standalone].sort((a, b) => a.pnlPct - b.pnlPct).map((p) => {
                const pnlCol = p.pnlPct >= 0 ? "#4ade80" : "#f87171";
                const riskCol = Math.abs(p.pnlPct) > 8 ? "#ef4444" : Math.abs(p.pnlPct) > 5 ? "#fb923c" : "#9ca3af";
                return (
                  <tr key={p.coin + p.exchange} style={{ borderBottom: "1px solid #0e1018", background: p.unlockToken ? "#0e0a14" : "transparent" }}>
                    <td style={{ padding: "5px 6px", fontWeight: 600, fontFamily: "'Space Grotesk'" }}>
                      {p.coin}
                      {p.unlockToken && <span style={{ fontSize: 7, color: "#a855f7", marginLeft: 4, background: "#1a0a20", padding: "0 3px", borderRadius: 2 }}>언락</span>}
                    </td>
                    <td style={{ padding: "5px 6px", textAlign: "center", color: "#5b5b6b", fontSize: 8 }}>{p.exchange === "binance" ? "BN" : "BB"}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: "#8b8b9b" }}>${p.notional.toLocaleString()}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: p.lev >= 10 ? "#fb923c" : "#8b8b9b" }}>{p.lev}x</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: "#6b6b7b", fontSize: 8 }}>{p.entry < 1 ? p.entry.toFixed(4) : p.entry.toFixed(2)}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", fontWeight: 600, color: pnlCol }}>{p.pnlPct >= 0 ? "+" : ""}{p.pnlPct.toFixed(1)}%</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: pnlCol }}>{p.pnl >= 0 ? "+" : ""}{p.pnl.toFixed(1)}</td>
                    <td style={{ padding: "5px 6px", textAlign: "left", color: "#4b4b5b", fontSize: 8, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 헷지 포지션 요약 */}
        <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #151720" }}>
          <div style={{ fontSize: 9, color: "#5b5b6b", marginBottom: 6 }}>헷지 포지션 ({myPositions.hedged.length}개)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {myPositions.hedged.map((h) => (
              <span key={h.coin} style={{ fontSize: 8, padding: "2px 8px", borderRadius: 4, background: "#0c0d14", border: "1px solid #1a1c28", color: h.pnlPct >= 0 ? "#4ade80" : "#f87171" }}>
                {h.coin} {h.pnlPct >= 0 ? "+" : ""}{h.pnlPct}% <span style={{ color: "#3b3b4b" }}>← {h.hedgeWith}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 리스크 알림 */}
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid #151720" }}>
          <div style={{ fontSize: 9, color: "#5b5b6b", marginBottom: 4 }}>리스크 알림</div>
          <div style={{ fontSize: 9, color: "#b0b0c0", lineHeight: 2 }}>
            <span style={{ color: "#f87171" }}>●</span> LIT -10.2% (2x) — 손절 검토
            {" · "}<span style={{ color: "#f87171" }}>●</span> BP -8.1% (3x) — 손절 검토
            {" · "}<span style={{ color: "#fb923c" }}>●</span> BTC 10x $4,677 — 고레버 최대 규모
            {" · "}<span style={{ color: "#fb923c" }}>●</span> BASED 10x — 고레버 주의
            <br /><span style={{ color: "#a855f7" }}>●</span> W 언락 $150 소규모 — 추가 진입 시 RSI 29.9 과매도 주의
            {" · "}<span style={{ color: "#a855f7" }}>●</span> POWER 언락 $552 — 대시보드 "Perp없음" 오류, 실제 포지션 보유
            <br /><span style={{ color: "#4ade80" }}>●</span> 수익 상위: SIREN +34.9% · D +13.2% · ZKP +10.3% — 부분 익절 고려
          </div>
        </div>
      </div>

      {/* 차트 분석 매트릭스 */}
      <div style={{ background: "#0a0c12", borderRadius: 10, border: "1px solid #141820", padding: 14, marginTop: 8 }}>
        <div style={{ fontSize: 10, color: "#6b6b7b", letterSpacing: 2, marginBottom: 8 }}>기술적 분석 매트릭스 (TvDatafeed 일봉 기준)</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9 }}>
            <thead>
              <tr style={{ color: "#5b5b6b", borderBottom: "1px solid #1a1c28" }}>
                <th style={{ padding: "4px 6px", textAlign: "left" }}>토큰</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>RSI</th>
                <th style={{ padding: "4px 6px", textAlign: "center" }}>추세</th>
                <th style={{ padding: "4px 6px", textAlign: "center" }}>MACD</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>BB%</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>7d</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>30d</th>
                <th style={{ padding: "4px 6px", textAlign: "right" }}>숏기술</th>
                <th style={{ padding: "4px 6px", textAlign: "center" }}>판정</th>
              </tr>
            </thead>
            <tbody>
              {unlocks.filter(u => u.chart && getStatus(u.date) !== "done").sort((a, b) => (b.chart?.shortTech || 0) - (a.chart?.shortTech || 0)).map((u) => {
                const c = u.chart;
                const verdict = c.shortTech >= 70 ? "GO" : c.shortTech >= 50 ? "WAIT" : "SKIP";
                const verdictColor = verdict === "GO" ? "#4ade80" : verdict === "WAIT" ? "#facc15" : "#f87171";
                return (
                  <tr key={u.token + u.date} style={{ borderBottom: "1px solid #0e1018" }}>
                    <td style={{ padding: "5px 6px", fontWeight: 600, fontFamily: "'Space Grotesk'" }}>{u.token}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: rsiColor(c.rsi14) }}>{c.rsi14}</td>
                    <td style={{ padding: "5px 6px", textAlign: "center", color: trendColor(c.trend), fontSize: 8 }}>{c.trend}</td>
                    <td style={{ padding: "5px 6px", textAlign: "center", color: c.macd === "bearish" ? "#f87171" : "#4ade80" }}>{c.macd === "bearish" ? "B" : "L"}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: c.bbPct < 20 ? "#a855f7" : c.bbPct > 80 ? "#ef4444" : "#9ca3af" }}>{c.bbPct}%</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: c.change7d?.startsWith("-") ? "#f87171" : "#4ade80" }}>{c.change7d}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", color: c.change30d?.startsWith("-") ? "#f87171" : "#4ade80" }}>{c.change30d}</td>
                    <td style={{ padding: "5px 6px", textAlign: "right", fontWeight: 600, color: techScoreColor(c.shortTech) }}>{c.shortTech}</td>
                    <td style={{ padding: "5px 6px", textAlign: "center", fontWeight: 700, color: verdictColor }}>{verdict}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 하단 범례 */}
      <div style={{ marginTop: 10, padding: "8px 12px", background: "#08090e", borderRadius: 8, border: "1px solid #111318" }}>
        <div style={{ fontSize: 8, color: "#3b3b4b", lineHeight: 1.8 }}>
          RSI: <span style={{ color: "#a855f7" }}>~30 과매도</span> · <span style={{ color: "#3b82f6" }}>30~40 약세</span> · <span style={{ color: "#9ca3af" }}>40~60 중립</span> · <span style={{ color: "#fb923c" }}>60~70 강세</span> · <span style={{ color: "#ef4444" }}>70~ 과매수</span>
          {" · "}BB%: <span style={{ color: "#a855f7" }}>~20% 하단</span> · <span style={{ color: "#ef4444" }}>80%~ 상단</span>
          {" · "}판정: <span style={{ color: "#4ade80" }}>GO</span>=숏기술70+ · <span style={{ color: "#facc15" }}>WAIT</span>=50~69 · <span style={{ color: "#f87171" }}>SKIP</span>=~49
          <br />데이터: TvDatafeed (Binance/Bybit Perp) · 2026-04-03 기준 · 일봉 200개 + 4시간봉 100개 분석
        </div>
      </div>
    </div>
  );
}
