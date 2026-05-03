import { useState } from "react";

// ============================================================
// Token Unlock Data — Full fact-check 2026-04-14
// Sources: Tokenomist, CoinGecko, CoinMarketCap, Official Docs
// ============================================================
const unlocks = [
  {
    date: "2026-04-01", token: "TIA", name: "Celestia", cat: "Modular",
    unlockPct: 19.51, unlockVal: 52.6, recipient: "Core Contributors + Seed + Series A/B",
    circulating: "900M", totalSupply: "1.165B", maxSupply: "Unlimited (inflation)",
    allocation: [
      { name: "R&D & Ecosystem", pct: 26.79 },
      { name: "Public Allocation", pct: 20.0 },
      { name: "Series A/B Investors", pct: 19.67 },
      { name: "Initial Core Contributors", pct: 17.64 },
      { name: "Seed Investors", pct: 15.90 },
    ],
    unlockBreakdown: [
      { name: "Series A/B Investors", amount: "65M", pct: 37.0, color: "#3b82f6" },
      { name: "Core Contributors", amount: "58M", pct: 33.0, color: "#ef4444" },
      { name: "Seed Investors", amount: "52M", pct: 30.0, color: "#f59e0b" },
    ],
    market: { price: "$0.30", mcap: "$270M", fdv: "$510M", vol24h: "$18~24M", athDrop: "-98.6%", exchanges: "Binance, Coinbase, Kraken" },
    vesting: "Core Contributors: Y1에 33.33% + Y3까지 선형. Early Backers: Y1에 33.33% + Y2까지 선형. 다음 대규모 10/30 (175.6M TIA)",
    strategy: [
      { type: "caution", title: "이미 완료", desc: "4/1 언락 이미 완료. ATH 대비 -98.6% 폭락 상태", risk: "추가 하방 제한적이나 구조적 매도 압력 지속" },
    ],
  },
  {
    date: "2026-04-03", token: "W", name: "Wormhole", cat: "인터옵",
    unlockPct: 10.6, unlockVal: 10, recipient: "Core Contributors (W2.0 bi-weekly 전환)",
    circulating: "5.66B", totalSupply: "10B", maxSupply: "10B",
    allocation: [
      { name: "Ecosystem & Incubation", pct: 31.0 },
      { name: "Foundation Treasury", pct: 23.3 },
      { name: "Community & Launch", pct: 17.0 },
      { name: "Core Contributors", pct: 12.0 },
      { name: "Strategic Network", pct: 11.6 },
      { name: "Guardian Nodes", pct: 5.1 },
    ],
    market: { price: "$0.013", mcap: "$74M", fdv: "$141M", vol24h: "$20~35M", athDrop: "-99%", exchanges: "Binance (Seed Tag), Coinbase, Kraken" },
    vesting: "W 2.0 업그레이드(2025.10)로 대규모 cliff→bi-weekly 전환. 당초 1.28B 예정이었으나 실제 ~600M 실행. 이후 대규모 cliff 없음",
    strategy: [
      { type: "caution", title: "이미 완료", desc: "4/3 언락 완료. W2.0으로 향후 bi-weekly 소규모 언락으로 전환", risk: "ATH -99%. 구조적 변화로 향후 언락 충격 감소" },
    ],
  },
  {
    date: "2026-04-03", token: "STO", name: "StakeStone", cat: "LSD",
    unlockPct: 8.95, unlockVal: 18.22, recipient: "Investors + Foundation + Team",
    circulating: "225M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Investors", pct: 21.50 },
      { name: "Foundation", pct: 18.65 },
      { name: "Community", pct: 17.87 },
      { name: "Team", pct: 15.0 },
      { name: "Marketing & Partnerships", pct: 9.13 },
      { name: "Airdrop & Future", pct: 7.85 },
      { name: "Liquidity", pct: 6.0 },
      { name: "Ecosystem & Treasury", pct: 4.0 },
    ],
    market: { price: "$0.22~1.14", mcap: "$50M", fdv: "N/A", vol24h: "$625M", athDrop: "-88%", exchanges: "Binance, MEXC, Bitget, KuCoin" },
    vesting: "TGE(2025.4.3) 시 22.53% 해제. 1년 후 대규모 언락 시작. 향후 multi-sig→smart contract vesting 전환 예정",
    strategy: [
      { type: "caution", title: "극심한 변동성", desc: "$0.11→$1.87→$0.76 (72시간). 거래소별 가격 $0.22~$1.14 심각한 차이", risk: "거래량 $625M vs 시총 $50M = 비정상. 거래소간 가격 불일치" },
    ],
  },
  {
    date: "2026-04-03", token: "ICNT", name: "Impossible Cloud", cat: "DePIN",
    unlockPct: 2.88, unlockVal: 2.86, recipient: "Team (Month 12 release)",
    circulating: "250M", totalSupply: "700M", maxSupply: "700M",
    allocation: [
      { name: "Team", pct: 22.1 },
      { name: "Investors", pct: 21.5 },
      { name: "Node Sale", pct: 20.0 },
      { name: "Partner Fund", pct: 11.0 },
      { name: "EcoDev Fund", pct: 10.0 },
      { name: "Rewards Reserve", pct: 10.0 },
      { name: "DevCo", pct: 5.4 },
    ],
    market: { price: "$0.40", mcap: "$100M", fdv: "$280M", vol24h: "$7.3M", athDrop: "-33%", exchanges: "Binance, Coinbase, KuCoin, Kraken, Bybit" },
    vesting: "Team: 12개월 lock → 86% 24개월 선형 + 14% split (7.2M @mo12 + 14.5M 선형). Investors: 12개월 cliff + 24개월 선형",
  },
  {
    date: "2026-04-04", token: "LA", name: "Lagrange", cat: "ZK/Infra",
    unlockPct: 3.14, unlockVal: 1.07, recipient: "Community & Ecosystem (monthly linear)",
    circulating: "193M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Inflation (Emissions)", pct: 32.44 },
      { name: "Community & Ecosystem", pct: 23.49 },
      { name: "Core Contributors", pct: 17.15 },
      { name: "Investors", pct: 12.52 },
      { name: "Foundation", pct: 7.63 },
      { name: "Public Airdrop", pct: 6.76 },
    ],
    market: { price: "$0.17", mcap: "$34M", fdv: "$170M", vol24h: "$6~15M", athDrop: "-90.3%", exchanges: "Coinbase, KuCoin, Bybit, Gate.io, MEXC" },
    vesting: "Community & Ecosystem: 월 1.747% 선형 (2025.12~2029.12). 월 6.05M LA. Binance 스팟 미상장 (Alpha만)",
  },
  {
    date: "2026-04-05", token: "ENA", name: "Ethena", cat: "DeFi",
    unlockPct: 1.95, unlockVal: 14.7, recipient: "Core Contributors (monthly linear)",
    circulating: "8.8B", totalSupply: "15B", maxSupply: "15B",
    featured: true,
    allocation: [
      { name: "Core Contributors", pct: 30.0 },
      { name: "Ecosystem & Airdrops", pct: 30.0 },
      { name: "Investors", pct: 25.0 },
      { name: "Foundation", pct: 15.0 },
    ],
    unlockBreakdown: [
      { name: "Core Contributors", amount: "171.88M", pct: 80.9, color: "#ef4444" },
      { name: "Foundation (4/2)", amount: "40.63M", pct: 19.1, color: "#8b5cf6" },
    ],
    market: { price: "$0.084", mcap: "$738M", fdv: "$1.26B", vol24h: "$97M", athDrop: "-94.6%", exchanges: "Binance, Coinbase, Kraken, Bybit, OKX" },
    vesting: "TGE: 2024.3.5. Core/Investors: 1년 25% cliff + 3년 월간 선형. 4/2 Foundation 40.63M($3.6M) 별도 완료. 4/5는 Core Contributors 171.88M($8~14.7M)",
    strategy: [
      { type: "caution", title: "이미 완료", desc: "4/5 언락 완료. 실제 171.88M ENA ($54M 규모), 4.4% 가격 변동 발생", risk: "월간 선형 언락 지속. 다음 5/5 동일 규모 예정" },
    ],
  },
  {
    date: "2026-03-05", token: "POWER", name: "Power Protocol", cat: "Gaming/Web3",
    unlockPct: 5.71, unlockVal: 23, recipient: "Team / Investors",
    circulating: "210M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Community Rewards", pct: 37.2 },
      { name: "Ecosystem Fund", pct: 28.0 },
      { name: "Investors", pct: 16.15 },
      { name: "Team", pct: 9.23 },
      { name: "Liquidity", pct: 5.0 },
      { name: "Advisors", pct: 4.42 },
    ],
    market: { price: "$0.102", mcap: "$21M", fdv: "$102M", vol24h: "$7.3M", athDrop: "-95.9%", exchanges: "Binance, Bitget, MEXC" },
    vesting: "Team: 12개월 cliff + 36개월 선형. 3/5 언락 후 Team이 30M개를 Bitget(20M)+MEXC(10M) 전송 → ATH $2.46에서 90% 폭락 사건 발생",
    strategy: [
      { type: "caution", title: "완료 + 위험 이력", desc: "3/5 언락 이미 완료. Team 매도로 90% 폭락 전례. ATH $2.46 → 현재 $0.102", risk: "Team 신뢰도 극히 낮음. 추가 언락 시 반복 가능" },
    ],
  },
  {
    date: "2026-04-06", token: "HYPE", name: "Hyperliquid", cat: "DEX/L1",
    unlockPct: 0.14, unlockVal: 12.1, recipient: "Core Contributors (실 청구 330K)",
    circulating: "238M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Future Emissions", pct: 38.89 },
      { name: "Genesis Distribution", pct: 31.0 },
      { name: "Core Contributors", pct: 23.8 },
      { name: "Hyper Foundation", pct: 6.0 },
      { name: "Community Grants", pct: 0.3 },
      { name: "HIP-2", pct: 0.01 },
    ],
    market: { price: "$38.34", mcap: "$9.13B", fdv: "$36.86B", vol24h: "$285M", athDrop: "-35.4%", exchanges: "Hyperliquid DEX (자체)" },
    vesting: "백서상 9.92M HYPE 예정이었으나 실제 청구 ~330K ($12.1M). 85%+ 스테이킹/유동성 인센티브로 즉시 묶임. 프로토콜 수수료 97%가 환수/소각으로 배분되어 월 ~$1.7M 환수",
    strategy: [
      { type: "bounce", title: "환수 > 언락", desc: "월 환수 $1.7M이 월 언락을 상쇄. 실제 청구량 극소. 매도 압력 거의 없음", risk: "자체 DEX만 거래 가능. ATH -35%로 다른 토큰 대비 양호" },
    ],
  },
  {
    date: "2026-04-15", token: "WLFI", name: "World Liberty Financial", cat: "DeFi/Gov (Trump)",
    unlockPct: 50.24, unlockVal: 150, recipient: "Public Sale 80% (거버넌스 투표 대기) + Team/Advisors 베스팅 시작",
    circulating: "31.76B", totalSupply: "100B", maxSupply: "100B",
    featured: true,
    allocation: [
      { name: "Team & Advisors", pct: 33.51 },
      { name: "Public Sale", pct: 20.02 },
      { name: "Treasury", pct: 19.96 },
      { name: "Community Growth", pct: 10.0 },
      { name: "Alt5 Sigma", pct: 7.78 },
      { name: "Strategic Partners", pct: 5.85 },
      { name: "Liquidity", pct: 2.88 },
    ],
    unlockBreakdown: [
      { name: "Public Sale 80% (투표 대기)", amount: "~16B", pct: 60, color: "#ef4444" },
      { name: "Team/Advisors 베스팅", amount: "~33.5B", pct: 30, color: "#f59e0b" },
      { name: "Treasury/기타", amount: "~18.7B", pct: 10, color: "#6b7280" },
    ],
    market: { price: "$0.0802", mcap: "$2.58B", fdv: "$8.02B", vol24h: "$221M", athDrop: "-75.8%", exchanges: "Binance, Upbit, Bithumb, Coinone, OKX, Bybit, Gate.io" },
    vesting: "2025.7 거버넌스 투표로 양도가능 전환 (99% 찬성). 2025.9.1 첫 20% 해제 + 거래소 상장. 나머지 80%(~16B)는 4/10 거버넌스 제안 공개 → 단계적 베스팅 제안 중. Team 12m cliff+24~36m 선형 (소스간 불일치). 트럼프 가족 순이익 75%",
    timeline: [
      { date: "2025.07", event: "거버넌스 투표 → 양도가능 전환 (99% 찬성)", status: "done" },
      { date: "2025.09.01", event: "Public Sale 첫 20% 해제 (~4B WLFI) + 거래소 상장", status: "done" },
      { date: "2026.04.09", event: "Dolomite에 50억개 담보 공탁 → $75M USD1 차입 (풀 93% 고갈, 이자 35.81%)", status: "done", warn: true },
      { date: "2026.04.10", event: "거버넌스 제안 공개: '장기 베스팅 및 언락 일정' + WLFI -12% 급락 (사상 최저)", status: "done", warn: true },
      { date: "2026.04 중순", event: "거버넌스 투표 진행 → 16B WLFI(Public Sale 80%) 해제 일정 결정", status: "upcoming" },
      { date: "2026.05~", event: "Team/Advisors 베스팅 시작 가능 (12m cliff+24~36m 선형)", status: "unconfirmed" },
      { date: "2026.09~", event: "Public Sale 80% 단계적 해제 시작 (투표 결과에 따라)", status: "unconfirmed" },
      { date: "~2028", event: "Team/Advisors 베스팅 완료 (33.5B WLFI)", status: "unconfirmed" },
    ],
    strategy: [
      { type: "short", title: "숏 포지션 유효", desc: "Binance/Upbit/Bithumb 상장 중. 거버넌스 투표로 80%(16B) 추가 언락 시 엄청난 매도 압력. 유통 대비 50%+ 규모. Upbit 주간 거래량 $1.17B (3위)", risk: "투표 결과 미확정. 단계적 베스팅이면 충격 완화. 반대로 즉시 언락이면 폭락 가능" },
      { type: "timing", title: "4월 중순 거버넌스 투표", desc: "4/10 팀이 '장기 베스팅 및 언락 일정' 제안 공개. 투표 임박. 결과에 따라 16B WLFI 해제 일정 결정. 투표 전후 변동성 극대화", risk: "180일 스테이킹 필수로 많은 홀더 투표 불가. 팀 주도 투표 구조 → 팀 유리한 결과 가능성" },
      { type: "caution", title: "Dolomite 순환위험", desc: "자체 토큰 50억개 담보→$75M 차입. USD1 풀 93% 고갈. 가격 하락→담보 가치↓→청산→추가 하락 악순환 구조. 4/10 이미 -12% 급락 (사상 최저)", risk: "Dolomite TVL의 55%가 WLFI 담보. 강제 청산 시 프로토콜 전체 위험. 별도로 170 BTC($11M) 매각 — 자금난 신호" },
      { type: "bounce", title: "투표 후 반등 시나리오", desc: "단계적 베스팅 확정 시 불확실성 해소 → 단기 반등 가능. 프리세일 $0.015 대비 현재 $0.10 = 여전히 6.6배 수익", risk: "ATH $0.33에서 -71%. 팀/어드바이저 33.5% 물량 베스팅 시작 시 장기 매도 압력" },
    ],
  },
  {
    date: "2026-04-09", token: "MOVE", name: "Movement", cat: "L1",
    unlockPct: 4.69, unlockVal: 2.97, recipient: "Early Backers",
    circulating: "3.51B", totalSupply: "10B", maxSupply: "10B",
    allocation: [
      { name: "Ecosystem & Community", pct: 40.0 },
      { name: "Early Backers", pct: 22.5 },
      { name: "Early Contributors", pct: 17.5 },
      { name: "Foundation", pct: 10.0 },
      { name: "Initial Claims (MoveDrop)", pct: 10.0 },
    ],
    market: { price: "$0.018", mcap: "$63M", fdv: "$180M", vol24h: "N/A", athDrop: "-90%+", exchanges: "Binance, Coinbase, Bybit, OKX" },
    vesting: "Cliff vesting 방식. Early Backers 6개월 연장 락업 적용. 2029년까지 연장. 164.58M개 언락",
  },
  {
    date: "2026-04-10", token: "BABY", name: "Babylon", cat: "BTC Staking",
    unlockPct: 19.88, unlockVal: 7.88, recipient: "Investors + Team + Advisors (1주년 cliff 동시 해제)",
    circulating: "3.72B", totalSupply: "10.73B", maxSupply: "Unlimited (연 ~8% 인플레이션)",
    featured: true,
    allocation: [
      { name: "Inflation (4Y)", pct: 33.6 },
      { name: "Early Private Round", pct: 29.6 },
      { name: "Ecosystem Building", pct: 17.5 },
      { name: "R&D + Operations", pct: 17.5 },
      { name: "Team", pct: 14.6 },
      { name: "Community Incentives", pct: 13.4 },
      { name: "Advisors", pct: 3.4 },
      { name: "Binance Marketing", pct: 1.18 },
    ],
    unlockBreakdown: [
      { name: "Early Private Investors", amount: "381.25M", pct: 62.2, color: "#ef4444" },
      { name: "Team", amount: "187.5M", pct: 30.6, color: "#f59e0b" },
      { name: "Advisors", amount: "43.75M", pct: 7.1, color: "#8b5cf6" },
    ],
    market: { price: "$0.01439", mcap: "$41M", fdv: "$154.4M", vol24h: "$14.2M", athDrop: "-91.3%", exchanges: "Binance, OKX, Kraken, KuCoin, Bybit, CoinW" },
    vesting: "Genesis 런칭 1주년(2025.4.10) cliff 해제. Early Private: 1Y cliff+3Y linear (12.5%=381.25M). Ecosystem/R&D: 1Y cliff+2Y linear (28.1%=506.25M each). Team: 1Y cliff+3Y linear (12.5%=187.5M). Community: TGE 100%(1.37B). Advisors: 1Y cliff+3Y linear (12.5%=43.75M). 무한 공급(연 ~8%)",
    strategy: [
      { type: "short", title: "숏: 월별 선형 언락 매도 압력", desc: "4/10 cliff 해제 후 매월 선형 언락 시작. Early Private 3.05B의 87.5%=2.66B가 3년간 풀림. 격월 스퀴즈 패턴 주의 (DYDX 유사 사례)", risk: "RSI 29.87 과매도 상태. ATL $0.0107 대비 +35%. 바닥 다지기 가능성" },
      { type: "bounce", title: "롱: 과매도 반등 + Aave BTC 렌딩", desc: "RSI 30 이하 과매도. Funding rate -0.003 (숏 우세→스퀴즈 가능). OI $434M→3월 $1B 대비 -57% 급감. Aave 공동 BTC 렌딩 출시 4월 예정 = 펀더멘털 촉매", risk: "무한 공급 + 월간 언락 = 장기 보유 불리. 반등은 단타(2~5일) 접근" },
      { type: "timing", title: "타이밍: 4월보다 5월 단타", desc: "과거 패턴상 격월 스퀴즈 관찰됨. 4월 cliff 직후는 매도 압력 최대. 매도 소진 후 5월 숏커버 랠리 노림 유효. $0.012-0.013 매수→$0.018-0.020 익절", risk: "3월 대규모 청산($40M+) 이후 OI 안정화 중. 추가 청산 연쇄는 제한적" },
      { type: "caution", title: "리스크 요약", desc: "내부자 보유 66%. 2028년까지 지속 언락. Inflation 3.6B(33.6%) 4년 동적 해제. Ecosystem/R&D 각 506.25M 2년 선형 — 총 월간 유통 증가 상당", risk: "시총 $54M 극소. 변동성 극심. 레버리지 3x 이하 권장. 포지션 사이즈 보수적" },
    ],
  },
  {
    date: "2026-04-10", token: "LINEA", name: "Linea", cat: "L2 (Consensys)",
    unlockPct: 5.53, unlockVal: 4.6, recipient: "Consensys Treasury",
    circulating: "24.98B", totalSupply: "72B", maxSupply: "72B",
    allocation: [
      { name: "Long-term Alignment (Consortium)", pct: 50.0 },
      { name: "Consensys Treasury", pct: 15.0 },
      { name: "Early Users & Builders", pct: 14.0 },
      { name: "Ignition", pct: 12.0 },
      { name: "Future Airdrop", pct: 5.0 },
      { name: "Liquidity (CEX/MM)", pct: 4.0 },
    ],
    market: { price: "$0.0034", mcap: "$85M", fdv: "$245M", vol24h: "N/A", athDrop: "-70%+", exchanges: "Binance, OKX, Bybit" },
    vesting: "Consensys Treasury: 5년 완전 cliff (2030.10 이후 해제). Long-term: 10년 선형. Consortium = ENS Labs, Eigen Labs, SharpLink, Status, Consensys. 1.38B LINEA 언락",
  },
  {
    date: "2026-04-12", token: "APT", name: "Aptos", cat: "L1",
    unlockPct: 1.42, unlockVal: 9.65, recipient: "Staking Rewards",
    circulating: "794M", totalSupply: "2.1B", maxSupply: "Unlimited",
    allocation: [
      { name: "Community", pct: 51.02 },
      { name: "Core Contributors", pct: 19.0 },
      { name: "Foundation", pct: 16.5 },
      { name: "Investors", pct: 13.48 },
    ],
    market: { price: "$0.85", mcap: "$675M", fdv: "$1.79B", vol24h: "$50M+", athDrop: "-85%", exchanges: "Binance, Coinbase, Kraken, OKX" },
    vesting: "매월 11.31M APT 반복 언락. Community/Foundation: 10년(월 1/120). Core/Investors: 1년 cliff + 4년. 스테이킹율 82%+, APY 7%→연 1.5% 감소, 최소 3.25%",
  },
  {
    date: "2026-04-15", token: "STRK", name: "Starknet", cat: "L2/ZK",
    unlockPct: 2.23, unlockVal: 4.36, recipient: "Early Contributors",
    circulating: "5.69B", totalSupply: "10B", maxSupply: "10B",
    allocation: [
      { name: "Early Contributors", pct: 20.04 },
      { name: "Investors", pct: 18.17 },
      { name: "Grants & Dev Partners", pct: 12.93 },
      { name: "StarkWare", pct: 10.76 },
      { name: "Foundation Reserves", pct: 10.0 },
      { name: "Community Provisions", pct: 9.0 },
      { name: "Community Rebates", pct: 9.0 },
      { name: "Foundation Treasury", pct: 8.1 },
      { name: "Donations", pct: 2.0 },
    ],
    market: { price: "$0.034", mcap: "$195M", fdv: "$343M", vol24h: "$17M", athDrop: "-97%+", exchanges: "Binance, Coinbase, OKX, Bybit" },
    vesting: "Early Contributors & Investors: 4년 lockup, 1년 cliff. 월간 127M STRK 언락 (2024.4~2027.3)",
  },
  {
    date: "2026-04-18", token: "ETHFI", name: "Ether.fi", cat: "LSD/Restaking",
    unlockPct: 4.17, unlockVal: 6.99, recipient: "Team Allocation",
    circulating: "699.4M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Team & Advisors", pct: 23.26 },
      { name: "DAO Treasury", pct: 27.24 },
      { name: "Investors", pct: 25.50 },
      { name: "Airdrop & Stakers", pct: 11.0 },
      { name: "Protocol Guild", pct: 1.0 },
      { name: "Liquidity", pct: 12.0 },
    ],
    market: { price: "$0.72", mcap: "$504M", fdv: "$720M", vol24h: "$15M", athDrop: "-90%+", exchanges: "Binance, Coinbase, OKX, Bybit" },
    vesting: "Team/Advisors: 1년 cliff + 36개월 선형. 총 공급의 69.94% 이미 유통. 9.69M ETHFI 언락",
    strategy: [
      { type: "caution", title: "Team 매도 유인", desc: "Team 할당 4.17% 해제. ATH -90%+ 상태에서 추가 매도 압력 가능", risk: "시총 $504M, vol $15M — 언락 규모($7M) 대비 거래량 적당" },
    ],
  },
  {
    date: "2026-04-16", token: "ARB", name: "Arbitrum", cat: "L2",
    unlockPct: 1.53, unlockVal: 9.47, recipient: "Team + Future Team + Advisors",
    circulating: "6.04B", totalSupply: "10B", maxSupply: "Unlimited (연 2% minting)",
    allocation: [
      { name: "DAO Treasury", pct: 35.28 },
      { name: "Team & Contributors", pct: 26.94 },
      { name: "Investors", pct: 17.53 },
      { name: "Users Airdrop", pct: 11.62 },
      { name: "Foundation", pct: 7.5 },
      { name: "DAO Builders", pct: 1.13 },
    ],
    market: { price: "$0.102", mcap: "$618M", fdv: "$1.02B", vol24h: "$50M+", athDrop: "-95.7%", exchanges: "Binance, Coinbase, Kraken, OKX" },
    vesting: "TGE: 2023.3.16. Team/Investors: 4년 lockup, 1년 cliff + 3년 월간 선형. 92.65M ARB 언락. 연 2% minting 가능(2024.3.15~, 거버넌스)",
    strategy: [
      { type: "caution", title: "수령자 주의", desc: "DAO Treasury가 아니라 Team/Advisors 수령. 시장 매도 가능성 있음", risk: "시총 $618M, vol $50M+로 유동성은 충분" },
    ],
  },
  {
    date: "2026-04-20", token: "ZRO", name: "LayerZero", cat: "인터옵",
    unlockPct: 10.19, unlockVal: 53.5, recipient: "Strategic Partners",
    circulating: "252M", totalSupply: "1B", maxSupply: "1B",
    featured: true,
    allocation: [
      { name: "Community", pct: 38.3 },
      { name: "Strategic Partners", pct: 32.2 },
      { name: "Core Contributors", pct: 25.5 },
      { name: "Tokens Repurchased", pct: 4.0 },
    ],
    unlockBreakdown: [
      { name: "Strategic Partners", amount: "25.7M", pct: 100, color: "#3b82f6" },
    ],
    market: { price: "$2.08", mcap: "$524M", fdv: "$2.08B", vol24h: "$89.5M", athDrop: "-72.2%", exchanges: "Binance, Coinbase, Bybit, OKX" },
    vesting: "Strategic Partners: 1년 락업 + 2년 월간 선형 (총 3년). Core Contributors 동일 구조. 유통량 252M의 10.19% 규모",
    strategy: [
      { type: "short", title: "핵심 숏 후보", desc: "유통 대비 10.19%($53.5M). Strategic Partners 매도 확정적. ATH -72%로 하락 여지 큼", risk: "시총 $524M, vol $89.5M으로 유동성 양호. 단기 3~7일 집중" },
      { type: "timing", title: "진입 타이밍", desc: "4/15~19 진입. RSI 50 이상 반등 시 최적. 지지 $1.45 / 저항 $2.32", risk: "Community 38.3% 이미 유통 → 매도 방어력 있을 수 있음" },
    ],
  },
  {
    date: "2026-04-20", token: "KAITO", name: "Kaito", cat: "SocialFi",
    unlockPct: 7.29, unlockVal: 7.6, recipient: "Ecosystem & Network Growth",
    circulating: "241M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Community & Ecosystem", pct: 32.2 },
      { name: "Investors", pct: 28.3 },
      { name: "Core Contributors", pct: 25.0 },
      { name: "Foundation", pct: 14.5 },
    ],
    market: { price: "$0.43", mcap: "$104M", fdv: "$426M", vol24h: "$10.6M", athDrop: "-85.1%", exchanges: "Binance, MEXC, Ourbit" },
    vesting: "Cliff vesting. 17.6M KAITO 언락. 2029년까지 선형. 과거 8/20 언락(23.35M, 10%) 시 -11.5%, 9/20 언락(8.35M) 시 30일간 -37.64% 검증됨",
    strategy: [
      { type: "timing", title: "역사적 패턴", desc: "과거 언락 시 -11~37% 검증됨. 4/18~19 추세 꺾임 확인 후 진입", risk: "vol $10.6M으로 유동성 제한. Binance 외 거래소 부족" },
    ],
  },
  {
    date: "2026-04-28", token: "JUP", name: "Jupiter", cat: "DEX",
    unlockPct: 1.47, unlockVal: 9.15, recipient: "Mercurial Stakeholders + Team",
    circulating: "3.63B", totalSupply: "7B", maxSupply: "7B",
    allocation: [
      { name: "Jupuary (Community)", pct: 44.29 },
      { name: "Team", pct: 20.0 },
      { name: "Strategic Reserve", pct: 19.04 },
      { name: "Mercurial Stakeholders", pct: 5.0 },
      { name: "Community Reserves", pct: 4.29 },
      { name: "JUP Launch Pool", pct: 3.57 },
      { name: "Other", pct: 3.81 },
    ],
    unlockBreakdown: [
      { name: "Team", amount: "38.89M", pct: 72.7, color: "#ef4444" },
      { name: "Mercurial Stakeholders", amount: "14.58M", pct: 27.3, color: "#8b5cf6" },
    ],
    market: { price: "$0.169", mcap: "$599M", fdv: "$1.18B", vol24h: "$30.3M", athDrop: "-91.6%", exchanges: "107개 거래소" },
    vesting: "총발행 10B→7B (2024.8 커뮤니티 투표 95% 찬성으로 30% 소각). Team + Mercurial 53.47M JUP 언락. Community가 아닌 Team 위주",
  },
  {
    date: "2026-04-30", token: "GUN", name: "GUNZ", cat: "Gaming L1",
    unlockPct: 20.48, unlockVal: 5.58, recipient: "Private B + Founders + Treasury",
    circulating: "1.73B", totalSupply: "10B", maxSupply: "10B",
    featured: true,
    allocation: [
      { name: "Private B", pct: 20.0 },
      { name: "Treasury", pct: 13.0 },
      { name: "Founders & Team", pct: 12.8 },
      { name: "Private A", pct: 12.5 },
      { name: "Platform Rewards", pct: 10.0 },
      { name: "GUNZ Foundation", pct: 9.0 },
      { name: "Advisors", pct: 5.29 },
      { name: "Community Incentives", pct: 4.0 },
      { name: "Liquidity Pool", pct: 3.0 },
    ],
    market: { price: "$0.018", mcap: "$31M", fdv: "$180M", vol24h: "N/A", athDrop: "-60%+", exchanges: "Binance, OKX, Bybit" },
    vesting: "Private B: 12개월 cliff + 18개월 선형. 354.39M GUN 언락 (총발행 3.54%). 유통 대비 20.48% — 대규모",
    strategy: [
      { type: "short", title: "대규모 언락", desc: "유통 대비 20.48%. Private B + Founders 수익 실현 유인. 시총 $31M 소형", risk: "유동성 극히 제한. 슬리피지 위험 높음" },
      { type: "timing", title: "4/28~29 진입", desc: "언락 2일 전 선반영. 소규모 포지션으로 접근", risk: "신규 토큰 변동성 극심. ATH 이후 빠른 하락 중" },
    ],
  },
  {
    date: "2026-05-08", token: "STABLE", name: "Stable", cat: "L1/Payment",
    unlockPct: 4.0, unlockVal: 29.5, recipient: "Ecosystem & Community (3년 월간 선형)",
    circulating: "22.34B", totalSupply: "100B", maxSupply: "100B",
    allocation: [
      { name: "Ecosystem & Community", pct: 40.0 },
      { name: "Team", pct: 25.0 },
      { name: "Investors & Advisors", pct: 25.0 },
      { name: "Genesis Distribution", pct: 10.0 },
    ],
    market: { price: "$0.0332", mcap: "$742M", fdv: "$3.32B", vol24h: "$17.7M", athDrop: "-20.8%", exchanges: "Gate, Bybit, LBank, HTX, PancakeSwap, Bitget, MEXC, Kraken" },
    vesting: "TGE 2025-12-08 · USDT-native 결제 특화 L1 (Stable Mainnet + BSC). Genesis 100% TGE / Ecosystem TGE 8% + 32% 3년 월간 선형 / Team & Investors 1년 cliff + 48개월 선형. 월 ~888.8M (32B/36mo). 2029-12-08까지 49회 unlock. CryptoRank 스샷의 $596M mcap은 런치 직후값",
  },
  {
    date: "2026-05-09", token: "ADI", name: "ADI Chain", cat: "L2/Infra",
    unlockPct: 6.78, unlockVal: 28.4, recipient: "Community Fund + Treasury Reserves (월간)",
    circulating: "104M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Community Fund", pct: 35.0 },
      { name: "Treasury Reserves", pct: 25.0 },
      { name: "Private Investors", pct: 12.0 },
      { name: "Partnerships", pct: 10.0 },
      { name: "Team", pct: 10.0 },
      { name: "Token Incentivization", pct: 4.0 },
      { name: "Liquidity", pct: 4.0 },
    ],
    market: { price: "$4.04", mcap: "$419M", fdv: "$4.03B", vol24h: "$489K", athDrop: "-11.2%", exchanges: "MEXC, KuCoin, Uniswap V3, Kraken, BYDFi, Crypto.com" },
    vesting: "TGE 2025-12-09 · Ethereum L2 zkRollup. ADI Foundation (Abu Dhabi 비영리, IHC/Sirius/Chainlink/M-Pesa 파트너십). Community Fund 72m / Treasury 108m 월간 분할. Private/Team/Partnerships 12m cliff + 72m",
    strategy: [
      { type: "caution", title: "🚩 유동성 RED FLAG", desc: "시총 $419M 대비 24h vol $489K = 0.12% (정상 토큰의 1/100). DEX 풀 합계 $2M 미만. Tokenomist에 등록 안됨. Binance/Coinbase/Upbit 미상장", risk: "얇은 유동성 = 가격 조작 가능. 5/9 unlock 시 슬리피지 극심. 매도 채널 제한적" },
    ],
  },
  {
    date: "2026-05-10", token: "RAIN", name: "Rain Protocol", cat: "Prediction Markets/DeFi",
    unlockPct: 10.5, unlockVal: 380, recipient: "Linear vesting buckets (월간 정기 배출)",
    circulating: "478.4B", totalSupply: "1.15T", maxSupply: "1.15T",
    featured: true,
    allocation: [
      { name: "Marketing & Development", pct: 20.0 },
      { name: "Reserve & Treasury", pct: 20.0 },
      { name: "Launchpad/Exchanges/LP", pct: 15.0 },
      { name: "Ecosystem Growth & Staking", pct: 15.0 },
      { name: "Team", pct: 10.0 },
      { name: "Contributors/Advisors/Partners", pct: 10.0 },
      { name: "Strategic Sale", pct: 9.0 },
      { name: "Presale", pct: 1.0 },
    ],
    market: { price: "$0.00756", mcap: "$3.62B", fdv: "$8.69B", vol24h: "$11M", athDrop: "-30.6%", exchanges: "KuCoin, Kraken, BingX, MEXC, Uniswap V3 (Arbitrum), BitMart" },
    vesting: "Arbitrum One. Team 1m cliff + 24m linear / Contributors 18m / Strategic Sale 8m / Presale 18m non-linear / Marketing 19m / Reserve 18m cliff + 6m linear / Ecosystem 12m linear. 50.28B = 4.37% of max supply. CryptoRank 스샷 $397M은 가격 $0.00791 시점, 현가 기준 $380M",
    strategy: [
      { type: "short", title: "월 최대 규모 unlock ($380M+)", desc: "5월 unlock 1위. ATH 대비 -30%로 추가 하방 여지. Binance/Coinbase 미상장 = 출구 좁아 매도 시 가격 충격 큼", risk: "Tokenomist 'fully unlocked' 표기는 모순 (실제 41.6%만 unlock). 데이터 신뢰도 주의" },
    ],
  },
  {
    date: "2026-05-14", token: "PIEVERSE", name: "Pieverse", cat: "AI/Web3 Payment",
    unlockPct: 17.3, unlockVal: 28.0, recipient: "Community Growth + Ecosystem & Marketing (월간 합산)",
    circulating: "230M", totalSupply: "1B", maxSupply: "1B",
    featured: true,
    allocation: [
      { name: "Community Growth", pct: 27.6 },
      { name: "Ecosystem & Marketing", pct: 27.4 },
      { name: "Team & Advisors", pct: 20.0 },
      { name: "Investors", pct: 15.0 },
      { name: "Foundation Reserve", pct: 10.0 },
    ],
    unlockBreakdown: [
      { name: "Community Growth", amount: "20.0M", pct: 50.3, color: "#3b82f6" },
      { name: "Ecosystem & Marketing", amount: "19.7M", pct: 49.7, color: "#f59e0b" },
    ],
    market: { price: "$0.706", mcap: "$162M", fdv: "$706M", vol24h: "$14M", athDrop: "-57.4%", exchanges: "Gate, Bybit, LBank, BingX, MEXC, Upbit, Bithumb, PancakeSwap, Uniswap" },
    vesting: "TGE 2025 Q4 · agent-native 결제/컴플라이언스 인프라 (Meme/SocialFi 아님). Community Growth(276M)와 Ecosystem & Marketing(274M) 두 카테고리가 동시 월간 분할 unlock. 각 21개월 선형. CryptoRank 공개 API는 Community Growth 단독값 20M만 노출 (Ecosystem & Marketing은 paid wall)",
    strategy: [
      { type: "short", title: "유통 대비 17.3% 대형 unlock", desc: "유통 230M에 39.74M 추가 = 17.3% mcap. 두 카테고리 동시 배출로 시장 흡수 부담 큼. Upbit/Bithumb 상장으로 한국 매도 채널 활성", risk: "ATH $1.66 대비 -57%로 이미 약세. 추가 하방은 기술적 지지선 확인 필요" },
    ],
  },
  {
    date: "2026-05-19", token: "PYTH", name: "Pyth Network", cat: "Oracle",
    unlockPct: 36.96, unlockVal: 100.16, recipient: "Ecosystem + Publishers + Protocol Dev + Private Sale",
    circulating: "5.75B", totalSupply: "10B", maxSupply: "10B",
    featured: true,
    allocation: [
      { name: "Publisher Rewards", pct: 24.4 },
      { name: "Protocol Development", pct: 21.3 },
      { name: "Ecosystem Growth", pct: 21.6 },
      { name: "Private Sale", pct: 25.0 },
      { name: "Community & Launch", pct: 7.7 },
    ],
    unlockBreakdown: [
      { name: "Ecosystem Growth", amount: "1.13B", pct: 53.0, color: "#3b82f6" },
      { name: "Publisher Rewards", amount: "537.5M", pct: 25.3, color: "#f59e0b" },
      { name: "Private Sale", amount: "250M", pct: 11.8, color: "#ef4444" },
      { name: "Protocol Dev", amount: "212.5M", pct: 10.0, color: "#8b5cf6" },
    ],
    market: { price: "$0.0489", mcap: "$281M", fdv: "$489M", vol24h: "$14M", athDrop: "-95.9%", exchanges: "Binance, Coinbase, OKX, Bybit, Kraken, Bitget, Gate, MEXC, KuCoin" },
    vesting: "공식 TGE 2023-11-19 14:00 UTC + 6/18/30/42개월 cliff. 30개월째 = 2026-05-19 14:00 UTC (Tokenomist 동일 / Ideas Bank 토론글의 5/20은 비공식 표기). 2.13B = Ecosystem 1.13B + Publishers 537.5M + Private Sale 250M + Protocol Dev 212.5M. DAO 6개월 연기안은 Ideas Bank 토론뿐 (formal proposal 아님, 미통과)",
    strategy: [
      { type: "short", title: "역대급 숏 기회 — 미통과 확정시", desc: "유통 대비 36.96% (2.13B PYTH). Private Sale 25% 매도 확정적. $100M 규모 vs 24h vol $14M = 거래량 7배. 시장 소화 불가", risk: "DAO Ideas Bank에 6개월 연기 토론 있으나 formal proposal 아님. 5/19 직전까지 모니터링 필수" },
      { type: "timing", title: "5/12~17 진입", desc: "1주 전부터 선반영. RSI/OBV 확인 후 진입. 14:00 UTC unlock 시점 직전 청산 권장", risk: "갑작스런 연기 발표 시 숏 스퀴즈" },
      { type: "caution", title: "Ideas Bank 모니터링", desc: "https://forum.pyth.network 의 unlock-delay 토론은 비공식. Realms 정식 proposal 발의 시 즉시 포지션 재평가", risk: "토론 → proposal 전환 시 변동성 폭증" },
    ],
  },
  {
    date: "2026-05-20", token: "ZRO", name: "LayerZero", cat: "인터옵",
    unlockPct: 10.2, unlockVal: 35.7, recipient: "Strategic Partners + Core Contributors + Tokens Repurchased (월간 12회차)",
    circulating: "252.33M", totalSupply: "1B", maxSupply: "1B",
    allocation: [
      { name: "Community", pct: 38.3 },
      { name: "Strategic Partners", pct: 32.2 },
      { name: "Core Contributors", pct: 25.5 },
      { name: "Tokens Repurchased", pct: 4.0 },
    ],
    unlockBreakdown: [
      { name: "Strategic Partners", amount: "13.42M", pct: 52.2, color: "#3b82f6" },
      { name: "Core Contributors", amount: "10.63M", pct: 41.4, color: "#ef4444" },
      { name: "Tokens Repurchased", amount: "1.67M", pct: 6.5, color: "#8b5cf6" },
    ],
    market: { price: "$1.39", mcap: "$351M", fdv: "$1.39B", vol24h: "$20M", athDrop: "-81.5%", exchanges: "Binance, Coinbase, Bybit, OKX, Kraken, KuCoin, Gate, Bitget, MEXC" },
    vesting: "TGE 2024-06-20 + 1년 cliff + 24개월 월간 선형. 5/20 = 12회차 (12/24). 4월 cliff 진입 후 가격 -33% (2.08→1.39). CMC는 320M 유통 표시 (방법론 차이로 mcap $445M), CoinGecko 252M 기준 채택",
    strategy: [
      { type: "short", title: "월간 패턴 + 가격 약세", desc: "유통 대비 10.2%. 4월 cliff 진입 후 월간 매도 압력 누적. ATH $7.53 대비 -81%", risk: "ATL 근처라 추가 하방은 기술적 지지선 의존" },
    ],
  },
  {
    date: "2026-05-25", token: "H", name: "Humanity Protocol", cat: "Identity/DePIN",
    unlockPct: 3.86, unlockVal: 20.3, recipient: "Ecosystem Fund + Foundation Treasury + Identity Verification Rewards (월간)",
    circulating: "2.73B", totalSupply: "10B", maxSupply: "10B",
    allocation: [
      { name: "Ecosystem Fund", pct: 24.0 },
      { name: "Early Contributors (Team)", pct: 19.0 },
      { name: "Identity Verification Rewards", pct: 18.0 },
      { name: "Foundation Operations Treasury", pct: 12.0 },
      { name: "Community Incentives", pct: 12.0 },
      { name: "Investors", pct: 10.0 },
      { name: "Human Institute Strategic Reserve", pct: 5.0 },
    ],
    unlockBreakdown: [
      { name: "Ecosystem Fund", amount: "50M", pct: 47.5, color: "#3b82f6" },
      { name: "Identity Rewards", amount: "42.86M", pct: 40.7, color: "#f59e0b" },
      { name: "Foundation Treasury", amount: "12.5M", pct: 11.9, color: "#8b5cf6" },
    ],
    market: { price: "$0.193", mcap: "$525M", fdv: "$1.93B", vol24h: "$25M", athDrop: "-50.3%", exchanges: "Bybit, Gate, Bitget, KuCoin, Bithumb, Coinone, Binance Futures (HUSDT, spot 미상장)" },
    vesting: "TGE 2025-06-25 (Worldcoin 경쟁자 — palm-scan biometric, ZK proof of humanity). 월간 105.36M 지속 unlock. Binance spot 미상장 / futures만 / Upbit 미상장 (404) / Bithumb KRW 활성. 백커: Animoca, Polygon Labs, Hashed, Pantera, Jump Crypto",
    strategy: [
      { type: "caution", title: "월간 1.05% 지속 매도 압력", desc: "매월 105.36M = 총공급 1.05%. ATH $0.388 대비 -50%이지만 Identity Rewards가 액티브 유저 보상이라 즉시 시장 매도 가능", risk: "Binance spot 미상장 / Upbit 미상장으로 한국 채널 Bithumb만. 유동성 제한적" },
    ],
  },
  {
    date: "2026-12-11", token: "CYS", name: "Cysic", cat: "ZK/DePIN",
    unlockPct: 43.73, unlockVal: 98.4, recipient: "Investors + Contributors + Foundation (1-year cliff 시작)",
    circulating: "160.8M (16.08%)", totalSupply: "1B", maxSupply: "1B",
    featured: true,
    allocation: [
      { name: "Ecosystem Incentive", pct: 40.19 },
      { name: "Investors", pct: 23.62 },
      { name: "Community & Liquidity", pct: 16.08 },
      { name: "Contributors", pct: 12.11 },
      { name: "Foundation Treasury", pct: 8.0 },
    ],
    unlockBreakdown: [
      { name: "Investors (12m linear 개시)", amount: "236.2M", pct: 23.62, color: "#ef4444" },
      { name: "Contributors (36m linear 개시)", amount: "121.1M", pct: 12.11, color: "#f59e0b" },
      { name: "Foundation Treasury (24m linear 개시)", amount: "80M", pct: 8.0, color: "#8b5cf6" },
    ],
    market: { price: "$0.225", mcap: "$36M", fdv: "$225M", vol24h: "$30M", athDrop: "-70% (ATH $0.75, 2026.3.22)", exchanges: "Gate, Bitget, Bithumb, Binance Alpha, MEXC" },
    vesting: "TGE 2025-12-11 · 현 유통 160.8M = Community&Liquidity 16.08% 전량 (TGE 일괄 해제). Investors 23.62% / Contributors 12.11% / Foundation 8% 모두 1년 cliff → 2026-12-11 동시 개시. Ecosystem 40.19%는 별도 배분",
    strategy: [
      { type: "short", title: "12월 11일 cliff 개시 — 구조적 초대형 이벤트", desc: "전체 공급의 43.73%가 cliff 해제 시작. 유통 대비 272% 규모 (현 유통 160.8M 대비 437.3M 신규). Investors 평균 acq $0.04 전후 → 현가 $0.225에서 +460% 수익 → 매도 유인 극단적", risk: "cliff 개시는 월별 선형이라 즉시 전량 해제 아님. 시장이 일찌감치 선반영하면 12월 당일은 오히려 바닥권일 수 있음" },
      { type: "timing", title: "11월 초 선반영 진입", desc: "역사적으로 1년 cliff 토큰은 cliff D-30~D-45부터 선반영 시작. TIA, APT 등 선행 사례. 2026-11 초 숏 진입, cliff 당일 청산", risk: "cliff 연기/재설계 발표 시 숏 스퀴즈. DAO governance 개입 모니터링 필수" },
      { type: "caution", title: "Gnosis Safe 웨일 이벤트 이미 진행 중", desc: "2026-04-10 Gnosis Safe 0xF97d... → 두 개의 평행 웨일에 각 5M CYS ($1.12M씩) 동시 분산 (0xF8CA..79b4d + 0xfBb66EA7..). 2026-04-12 05:01 UTC 9.996M CYS ($2.25M) 4개 신규 지갑으로 2차 분산 (트윗 직후 25분). 총 19M+ CYS ($4.26M) 유출. Safe 현재 잔고 5 CYS = 완전 고갈. 유통 대비 ~12% 오버행이 이미 시장 진입 대기 중", risk: "수신 지갑 6곳이 아직 거래소 미입금. 홀드 모드일 가능성도 존재하나 BNB 가스 충전 시점이 덤프 트리거" },
    ],
  },
];

// ============================================================
// Helpers
// ============================================================
function groupByDate(data) {
  const map = {};
  data.forEach((item) => { if (!map[item.date]) map[item.date] = []; map[item.date].push(item); });
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
}

function fmtDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return { day: d.getDate(), weekday: weekdays[d.getDay()], month: d.getMonth() + 1, full: `${d.getMonth() + 1}월 ${d.getDate()}일 (${weekdays[d.getDay()]})` };
}

function isToday(dateStr) {
  const t = new Date(), d = new Date(dateStr + "T00:00:00");
  return t.getFullYear() === d.getFullYear() && t.getMonth() === d.getMonth() && t.getDate() === d.getDate();
}

function isPast(dateStr) {
  const t = new Date(); t.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") < t;
}

function pctColor(pct) {
  if (pct >= 10) return "#ef4444";
  if (pct >= 5) return "#f59e0b";
  if (pct >= 2) return "#3b82f6";
  return "#6b7280";
}

function pctBg(pct) {
  if (pct >= 10) return "rgba(239,68,68,0.06)";
  if (pct >= 5) return "rgba(245,158,11,0.04)";
  return "transparent";
}

const ALLOC_COLORS = ["#3b82f6", "#8b5cf6", "#06b6d4", "#f59e0b", "#ef4444", "#10b981", "#ec4899", "#14b8a6", "#f97316"];

// ============================================================
// App
// ============================================================
export default function App() {
  const [activeTab, setActiveTab] = useState("unlocks");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  let filtered = unlocks;
  if (filter === "big") filtered = unlocks.filter((u) => u.unlockPct >= 5);
  if (filter === "upcoming") filtered = unlocks.filter((u) => new Date(u.date + "T00:00:00") >= today);

  const grouped = groupByDate(filtered);
  const totalVal = unlocks.reduce((s, u) => s + u.unlockVal, 0);
  const bigCount = unlocks.filter((u) => u.unlockPct >= 5).length;
  const upcomingCount = unlocks.filter((u) => new Date(u.date + "T00:00:00") >= today).length;

  return (
    <div style={{ background: "#090b10", minHeight: "100vh", color: "#c8c8d0", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", fontSize: 14 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:#0d0f14;}::-webkit-scrollbar-thumb{background:#252830;border-radius:3px;}`}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "#f0f0f5", margin: 0, letterSpacing: "-0.5px" }}>Token Unlock Dashboard</h1>
            <p style={{ fontSize: 14, color: "#555", marginTop: 6 }}>Apr 2026 – Dec 2026 · Fact-checked: Tokenomist + CoinGecko + BscScan + Cysic Docs</p>
          </div>
          <div style={{ fontSize: 12, color: "#444", textAlign: "right" }}>
            <div>Last verified: 2026-04-12</div>
            <div style={{ marginTop: 4, fontSize: 11, color: "#555" }}>built by <span style={{ color: "#888", fontWeight: 600 }}>London Potato</span> 🥔</div>
          </div>
        </div>

        {/* Top Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid #181c24" }}>
          {[["unlocks", "Token Unlocks"]].map(([k, l]) => (
            <button key={k} onClick={() => setActiveTab(k)} style={{
              background: "transparent", border: "none", borderBottom: `2px solid ${activeTab === k ? "#ef4444" : "transparent"}`,
              color: activeTab === k ? "#f0f0f5" : "#555", padding: "10px 24px", fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
            }}>{l}</button>
          ))}
        </div>

        {activeTab === "unlocks" && <>
        {/* Stats Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            ["Total Value", `$${totalVal.toFixed(0)}M`, "#60a5fa"],
            ["Events", `${unlocks.length}`, "#c8c8d0"],
            ["High Impact (≥5%)", `${bigCount}`, "#f59e0b"],
            ["Upcoming", `${upcomingCount}`, "#34d399"],
          ].map(([label, val, col]) => (
            <div key={label} style={{ background: "#0e1018", borderRadius: 10, border: "1px solid #181c24", padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "#555", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: col, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {[["all", "All"], ["upcoming", "Upcoming"], ["big", "High Impact (≥5%)"]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              background: filter === k ? "#181c24" : "transparent",
              color: filter === k ? "#e5e5e5" : "#555",
              border: `1px solid ${filter === k ? "#282c38" : "#181c24"}`,
              padding: "7px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>{l}</button>
          ))}
        </div>

        {/* Timeline */}
        {grouped.map(([date, items]) => {
          const dt = fmtDate(date);
          const todayMark = isToday(date);
          const past = isPast(date);
          const dayVal = items.reduce((s, u) => s + u.unlockVal, 0);

          return (
            <div key={date} style={{ marginBottom: 28, opacity: past ? 0.35 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid #14161e" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: todayMark ? "#0d1f15" : "#0e1018",
                  border: `1px solid ${todayMark ? "#1a3a25" : "#181c24"}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: todayMark ? "#34d399" : "#ddd", lineHeight: 1 }}>{dt.day}</span>
                  <span style={{ fontSize: 10, color: todayMark ? "#34d399" : "#666" }}>{dt.weekday}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: todayMark ? "#34d399" : "#aaa" }}>
                  {dt.full}
                  {todayMark && <span style={{ fontSize: 11, marginLeft: 8, padding: "2px 8px", background: "#0d1f15", border: "1px solid #1a3a25", borderRadius: 4, color: "#34d399", fontWeight: 600 }}>TODAY</span>}
                </span>
                <span style={{ marginLeft: "auto", fontSize: 13, color: "#555", fontWeight: 500 }}>{items.length}건 · ${dayVal.toFixed(1)}M</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: items.length === 1 ? "1fr" : "repeat(auto-fill, minmax(520px, 1fr))", gap: 10 }}>
                {items.map((u) => (
                  <UnlockCard key={u.token + u.date} u={u} expanded={expanded === u.token} onToggle={() => setExpanded(expanded === u.token ? null : u.token)} />
                ))}
              </div>
            </div>
          );
        })}

        {grouped.length === 0 && <div style={{ textAlign: "center", padding: 60, color: "#444" }}>해당 조건의 언락 일정이 없습니다.</div>}
        </>}
      </div>
    </div>
  );
}

// ============================================================
// Unlock Card
// ============================================================
function UnlockCard({ u, expanded, onToggle }) {
  const col = pctColor(u.unlockPct);

  return (
    <div style={{ background: u.featured ? "rgba(239,68,68,0.04)" : pctBg(u.unlockPct), border: `1px solid ${u.featured ? "#2a1418" : "#181c24"}`, borderRadius: 10, borderLeft: `3px solid ${col}`, overflow: "hidden" }}>
      <div onClick={onToggle} style={{ padding: "14px 18px", cursor: "pointer", display: "grid", gridTemplateColumns: "1fr auto", gap: "4px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#f0f0f5", minWidth: 50 }}>{u.token}</span>
          <span style={{ fontSize: 13, color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</span>
          <span style={{ fontSize: 11, color: "#555", background: "#14161e", padding: "2px 7px", borderRadius: 3, flexShrink: 0 }}>{u.cat}</span>
          {u.featured && <span style={{ fontSize: 10, color: "#ef4444", background: "#1a0a0e", padding: "2px 6px", borderRadius: 3, border: "1px solid #2a1418", fontWeight: 700 }}>FEATURED</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right", minWidth: 70 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: col }}>{u.unlockPct}%</div>
            <div style={{ fontSize: 10, color: "#555" }}>유통 대비</div>
          </div>
          <div style={{ textAlign: "right", minWidth: 60 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#ccc" }}>${u.unlockVal}M</div>
            <div style={{ fontSize: 10, color: "#555" }}>가치</div>
          </div>
          <span style={{ fontSize: 16, color: "#444", marginLeft: 4 }}>{expanded ? "▾" : "▸"}</span>
        </div>
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 16, fontSize: 12, color: "#555", marginTop: 2, flexWrap: "wrap" }}>
          <span>수령: <span style={{ color: "#888" }}>{u.recipient}</span></span>
          <span>유통: <span style={{ color: "#888" }}>{u.circulating}</span></span>
          <span>총발행: <span style={{ color: "#888" }}>{u.totalSupply}</span></span>
          {u.maxSupply !== u.totalSupply && <span>최대: <span style={{ color: u.maxSupply.includes("Unlimited") ? "#f59e0b" : "#888" }}>{u.maxSupply}</span></span>}
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "0 18px 16px", borderTop: "1px solid #14161e" }}>
          {/* Allocation bar */}
          <div style={{ marginTop: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8 }}>Token Allocation</div>
            <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
              {u.allocation.map((a, i) => (
                <div key={i} style={{ width: `${a.pct}%`, background: ALLOC_COLORS[i % ALLOC_COLORS.length], minWidth: 2 }} />
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
              {u.allocation.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: ALLOC_COLORS[i % ALLOC_COLORS.length], flexShrink: 0 }} />
                  <span style={{ color: "#888" }}>{a.name}</span>
                  <span style={{ color: "#bbb", fontWeight: 600 }}>{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Unlock Breakdown */}
          {u.unlockBreakdown && (
            <div style={{ marginTop: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8 }}>Unlock Breakdown</div>
              <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", marginBottom: 8 }}>
                {u.unlockBreakdown.map((b, i) => (
                  <div key={i} style={{ width: `${b.pct}%`, background: b.color, minWidth: 4 }} />
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(u.unlockBreakdown.length, 3)}, 1fr)`, gap: 8 }}>
                {u.unlockBreakdown.map((b, i) => (
                  <div key={i} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: b.color }} />
                      <span style={{ fontSize: 11, color: "#888" }}>{b.name}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: b.color }}>{b.amount}</div>
                    <div style={{ fontSize: 11, color: "#555" }}>{b.pct}% of unlock</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Data */}
          {u.market && (
            <div style={{ marginTop: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8 }}>Market Data</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[
                  ["Price", u.market.price, "#ccc"],
                  ["MCap", u.market.mcap, "#ccc"],
                  ["FDV", u.market.fdv, "#ccc"],
                  ["24h Volume", u.market.vol24h, "#ccc"],
                  ["ATH Drop", u.market.athDrop, "#ef4444"],
                  ["Exchanges", u.market.exchanges, "#888"],
                ].map(([label, val, valCol]) => (
                  <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "8px 12px", border: "1px solid #14161e" }}>
                    <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: valCol, marginTop: 2 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vesting note */}
          {u.vesting && (
            <div style={{ marginTop: 10, fontSize: 12, color: "#666", lineHeight: 1.6, background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
              <span style={{ color: "#888", fontWeight: 600 }}>Vesting: </span>{u.vesting}
            </div>
          )}

          {/* Timeline */}
          {u.timeline && (
            <div style={{ marginTop: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Unlock Timeline</div>
              <div style={{ position: "relative", paddingLeft: 20 }}>
                <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: "#1e2028" }} />
                {u.timeline.map((t, i) => {
                  const statusColors = { done: "#34d399", upcoming: "#f59e0b", unconfirmed: "#555" };
                  const statusLabels = { done: "완료", upcoming: "임박", unconfirmed: "미확정" };
                  const sc = statusColors[t.status] || "#555";
                  return (
                    <div key={i} style={{ position: "relative", marginBottom: i < u.timeline.length - 1 ? 10 : 0, paddingBottom: i < u.timeline.length - 1 ? 10 : 0, borderBottom: i < u.timeline.length - 1 ? "1px solid #14161e" : "none" }}>
                      <div style={{ position: "absolute", left: -17, top: 4, width: 10, height: 10, borderRadius: "50%", background: t.status === "done" ? sc : "#0c0e14", border: `2px solid ${sc}` }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: t.status === "upcoming" ? "#f59e0b" : "#aaa", minWidth: 90 }}>{t.date}</span>
                        <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 600, color: sc, background: `${sc}15`, border: `1px solid ${sc}33` }}>{statusLabels[t.status]}</span>
                        {t.warn && <span style={{ fontSize: 10, color: "#ef4444", fontWeight: 700 }}>!</span>}
                      </div>
                      <div style={{ fontSize: 12, color: t.warn ? "#ef8888" : "#888", lineHeight: 1.5 }}>{t.event}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Strategy */}
          {u.strategy && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 8 }}>Strategy Analysis</div>
              <div style={{ display: "grid", gridTemplateColumns: u.strategy.length > 2 ? "repeat(2, 1fr)" : "1fr", gap: 8 }}>
                {u.strategy.map((s, i) => {
                  const typeColors = { short: "#ef4444", timing: "#f59e0b", bounce: "#34d399", caution: "#6b7280" };
                  const tc = typeColors[s.type] || "#6b7280";
                  return (
                    <div key={i} style={{ background: "#0c0e14", borderRadius: 6, padding: "12px 14px", border: "1px solid #14161e", borderLeft: `2px solid ${tc}` }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 4 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6, marginBottom: 6 }}>{s.desc}</div>
                      <div style={{ fontSize: 11, color: "#664433", lineHeight: 1.5 }}>
                        <span style={{ color: "#885544", fontWeight: 600 }}>Risk: </span>{s.risk}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

