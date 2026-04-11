import { useState } from "react";

// ============================================================
// Token Unlock Data — Full fact-check 2026-04-08
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
    market: { price: "$0.078", mcap: "$2.5B", fdv: "$7.9B", vol24h: "$256M", athDrop: "-76.2%", exchanges: "Binance, Upbit, Bithumb, Coinone, OKX, Bybit, Gate.io" },
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
    market: { price: "$0.0145", mcap: "$54M", fdv: "$155M", vol24h: "$15M", athDrop: "-91.3%", exchanges: "Binance, OKX, Kraken, KuCoin, Bybit, CoinW" },
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
    date: "2026-05-19", token: "PYTH", name: "Pyth Network", cat: "Oracle",
    unlockPct: 36.96, unlockVal: 97.15, recipient: "Ecosystem + Publishers + Protocol Dev + Private Sale",
    circulating: "5.76B", totalSupply: "10B", maxSupply: "10B",
    featured: true,
    allocation: [
      { name: "Publisher Rewards", pct: 24.4 },
      { name: "Protocol Development", pct: 21.3 },
      { name: "Ecosystem Growth", pct: 21.6 },
      { name: "Private Sale", pct: 25.0 },
      { name: "Community & Launch", pct: 7.7 },
    ],
    unlockBreakdown: [
      { name: "Private Sale", amount: "532M", pct: 25, color: "#ef4444" },
      { name: "Ecosystem Growth", amount: "460M", pct: 21.6, color: "#3b82f6" },
      { name: "Publisher Rewards", amount: "520M", pct: 24.4, color: "#f59e0b" },
      { name: "Protocol Dev", amount: "454M", pct: 21.3, color: "#8b5cf6" },
    ],
    market: { price: "$0.046", mcap: "$265M", fdv: "$460M", vol24h: "$25M+", athDrop: "-94%+", exchanges: "Binance, Coinbase, OKX, Bybit, Kraken" },
    vesting: "2.13B PYTH 동시 언락 — 유통 대비 36.96%. DAO에서 6개월 연기 제안 투표 중 (미승인). Private Sale 투자자 물량 25% 포함. 역대급 단일 언락 이벤트",
    strategy: [
      { type: "short", title: "역대급 숏 기회", desc: "유통 대비 36.96% (2.13B PYTH). Private Sale 25% 매도 확정적. $97M 규모 vs 24h vol $25M = 거래량 4배. 시장 소화 불가", risk: "DAO 6개월 연기 투표 결과에 따라 무산 가능. 투표 결과 반드시 확인" },
      { type: "timing", title: "5/12~18 진입", desc: "1주 전부터 선반영 시작. 연기 투표 미승인 확인 후 진입. RSI/OBV 확인", risk: "연기 확정 시 숏 스퀴즈 위험. 소규모 포지션으로 시작" },
      { type: "caution", title: "연기 투표 모니터링 필수", desc: "DAO 제안: 6개월 연기하여 토크노믹스 재검토. 미승인 상태. 투표 결과가 전략 전체를 결정", risk: "연기 확정 시 불확실성 해소 → 반등 가능. 연기 부결 시 폭락 가능" },
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
            <p style={{ fontSize: 14, color: "#555", marginTop: 6 }}>Apr–May 2026 · Fact-checked: Tokenomist + CoinGecko + Official Docs</p>
          </div>
          <div style={{ fontSize: 12, color: "#444", textAlign: "right" }}>
            <div>Last verified: 2026-04-11</div>
          </div>
        </div>

        {/* Top Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid #181c24" }}>
          {[["unlocks", "Token Unlocks"], ["short", "Short Strategy"]].map(([k, l]) => (
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

        {activeTab === "short" && <ShortStrategyTab />}
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

// ============================================================
// Short Strategy Tab — WLFI Analysis (2026-04-11)
// ============================================================
const WLFI_MARKET = {
  price: "$0.078", mcap: "$2.5B", fdv: "$7.9B", vol24h: "$256M",
  volFutures: "$536M", oi: "$254.7M", oiRange30d: "$234-294M",
  liq24h: "$3.99M", athPrice: "$0.33", athDate: "2025.09.01", athDrop: "-76.2%",
  atlPrice: "$0.077", atlDate: "2026.04.11", circulating: "31.7B / 100B (31.7%)",
  exchanges: "Binance, Upbit, Bithumb, OKX, Bybit, Gate.io",
  dolomiteStatus: "HR 3.11 | LTV 21.4% | 담보 $237M | 대출 $50.8M",
};

const WLFI_TECHNICALS = {
  trend: "Strong Bearish",
  ema20: "$0.10", ema50: "$0.105", ema200: "$0.112",
  deathCross: true,
  supertrend: "Bearish (trailing $0.11)",
  ichimoku: "Red cloud, price below",
  change24h: "-5.6%", change7d: "-19.6%", change30d: "-21.2%",
};

const WLFI_LEVELS = [
  { type: "R", label: "R3", price: "$0.112", note: "EMA200, 강한 저항" },
  { type: "R", label: "R2", price: "$0.10-0.105", note: "EMA20/50 밀집대" },
  { type: "R", label: "R1", price: "$0.088-0.097", note: "이전 지지→저항 전환" },
  { type: "NOW", label: "현재가", price: "$0.078", note: "ATL 근접" },
  { type: "S", label: "S1", price: "$0.07", note: "최후 방어선" },
  { type: "S", label: "S2", price: "$0.06", note: "채널 하단, 극단 약세 타겟" },
];

const WLFI_DOLOMITE = {
  collateral: "30억 WLFI ($236.8M) — MultiSig Safe 지갑",
  loan: "총 $50.76M (USD1 $40.45M + USDC $10.31M)",
  healthRate: "3.11 (DeBank 실시간)",
  ltv: "21.4%",
  liquidationPrice: "~$0.021 (WLFI -73% 하락 시 청산)",
  concentration: "Dolomite TVL의 51%+ 점유",
  teamClaim: "청산 위험 없음, 추가 담보 공급 가능",
  realRisk: "자사 토큰 담보 = FTT/FTX 구조. 가격 급락→담보가치↓→강제청산→추가하락 악순환. 30억개 시장 소화 불가",
  walletAge: "8일 전 생성 (MultiSig: Safe)",
  coinbasePrime: "$40M+ Coinbase Prime 전송 이력 (현금화 의심)",
};

const WLFI_SCENARIOS = [
  {
    id: "A", title: "반등 시 숏 진입 (권장)", priority: "1순위",
    entry: "$0.088-0.097", sl: "$0.105 (EMA50 위)", tp1: "$0.07 (R:R ≈ 1:1.5)", tp2: "$0.06 (R:R ≈ 1:2.5)",
    signal: "4H 캔들 긴 윗꼬리/도지, 거래량 감소 확인",
    rationale: "$0.0972 = 이전 강한 지지(69/100)였으나 이탈 → 저항 전환. 반등 시 매도벽 형성 예상",
    risk: "ATL 근처 반등 없이 수직 하락 시 진입 기회 놓침",
    color: "#ef4444",
  },
  {
    id: "B", title: "거버넌스 투표 이벤트 트레이드", priority: "2순위",
    entry: "투표 결과 직후 (4월 중순)", sl: "$0.105", tp1: "$0.07", tp2: "$0.055",
    signal: "'단계적 베스팅' 확정 → 반등 고점에서 진입 / '빠른 언락' 확정 → 즉시 추격",
    rationale: "투표 결과 불문 중장기 매도 압력 확정. 16B WLFI(유통대비 50%+) 해제 + Team 33.5B 베스팅 5월~ 시작",
    risk: "투표 결과에 따라 변동성 극대. 180일 스테이킹 필수로 투표 참여율 불확실",
    color: "#f59e0b",
  },
  {
    id: "C", title: "Dolomite 청산 캐스케이드", priority: "고위험/고보상",
    entry: "$0.068-0.07 하방 이탈 확인 후", sl: "$0.078 (현재가 복귀)", tp1: "$0.055", tp2: "$0.04",
    signal: "$0.07 지지 붕괴 + 거래량 급증 + Dolomite TVL 변동",
    rationale: "49.9억 WLFI 담보 → 청산 시 시장 소화 불가. 프로토콜 전체 위험. 팀 추가담보 여력 불명",
    risk: "극단적 변동성, 스프레드 확대. 거래소 긴급 조치 가능성",
    color: "#8b5cf6",
  },
];

const WLFI_CATALYSTS = [
  { date: "4/9", event: "Dolomite에 30억 WLFI 담보 예치, $75M 차입. USD1 풀 93% 고갈", impact: "리스크 발생", done: true },
  { date: "4/10", event: "거버넌스 제안 공개 + WLFI -12% 급락 (사상 최저). $40M+ Coinbase Prime 전송", impact: "급락", done: true },
  { date: "4/11", event: "$25M 상환 → 잔여 $50.8M. Health Rate 3.11 (DeBank 확인). LTV 21.4%", impact: "일부 개선", done: true },
  { date: "4월 중순", event: "거버넌스 투표 개시 (16B WLFI 언락 일정 결정)", impact: "핵심 촉매", done: false },
  { date: "4월 말~", event: "투표 결과 확정 + 시장 반응", impact: "방향성 결정", done: false },
  { date: "5월~", event: "Team/Advisors 베스팅 시작 가능 (33.5B WLFI)", impact: "장기 매도 압력", done: false },
  { date: "9월~", event: "Public Sale 80% 단계적 해제 시작 (투표 결과에 따라)", impact: "대규모 매도", done: false },
];

// ============================================================
// BABY (Babylon) Analysis Data — 2026-04-11
// ============================================================
const BABY_MARKET = {
  price: "$0.0145", mcap: "$54M", fdv: "$155M", vol24h: "$15M",
  volFutures: "~$107M (SMA)", oi: "$433.6M", oiPeak: "$1B (3월)",
  liq24h: "644K long / 210K short", athPrice: "$0.166", athDate: "2025.04.12", athDrop: "-91.3%",
  atlPrice: "$0.0107", atlDate: "2026.03.07", circulating: "3.72B / 10.73B (34.7%)",
  exchanges: "Binance, OKX, Kraken, KuCoin, Bybit, CoinW",
  fundingRate: "-0.0029 (숏 우세)",
  maxSupply: "Unlimited (~8%/yr inflation)",
};

const BABY_TECHNICALS = {
  trend: "Oversold Bearish (바닥 다지기)",
  rsi: "29.87 (과매도)",
  ema: "전 이평선 아래 (데스크로스)",
  fundingRate: "-0.003 (숏 페이, 스퀴즈 가능)",
  oiChange: "3월 $1B → 현재 $433M (-57%)",
  volumePattern: "3월 대규모 청산 후 안정화",
  change24h: "+5.7%", change7d: "+1.5%", change30d: "+2.6%",
};

const BABY_LEVELS = [
  { type: "R", label: "R3", price: "$0.035", note: "1월 고점, 강한 저항" },
  { type: "R", label: "R2", price: "$0.020", note: "12월 이후 저항대, 스퀴즈 타겟" },
  { type: "R", label: "R1", price: "$0.018", note: "최근 단기 고점 (4월)" },
  { type: "NOW", label: "현재가", price: "$0.0145", note: "ATL +35%, 기저 형성 중" },
  { type: "S", label: "S1", price: "$0.012", note: "최근 4개월 지지대" },
  { type: "S", label: "S2", price: "$0.0107", note: "ATL (2026.03.07)" },
];

const BABY_VESTING = [
  { name: "Inflation (4Y)", amount: "3.60B", pct: "33.6%", schedule: "4년 동적 해제 (22.2% 해제, 77.9% 잔여)", color: "#6b7280" },
  { name: "Early Private", amount: "3.05B", pct: "29.6%", schedule: "1Y cliff + 3Y linear (12.5%=381.25M 해제)", color: "#ef4444" },
  { name: "Ecosystem", amount: "1.80B", pct: "17.5%", schedule: "1Y cliff + 2Y linear (28.1%=506.25M 해제)", color: "#3b82f6" },
  { name: "R&D", amount: "1.80B", pct: "17.5%", schedule: "1Y cliff + 2Y linear (28.1%=506.25M 해제)", color: "#06b6d4" },
  { name: "Team", amount: "1.50B", pct: "14.6%", schedule: "1Y cliff + 3Y linear (12.5%=187.5M 해제)", color: "#f59e0b" },
  { name: "Community", amount: "1.37B", pct: "13.4%", schedule: "TGE 100% 해제 완료", color: "#34d399" },
  { name: "Advisors", amount: "350M", pct: "3.4%", schedule: "1Y cliff + 3Y linear (12.5%=43.75M 해제)", color: "#8b5cf6" },
  { name: "Binance Mkt", amount: "121.6M", pct: "1.18%", schedule: "6M cliff → Batch 1 전량 해제", color: "#ec4899" },
];

const BABY_SCENARIOS = [
  {
    id: "A", title: "롱: 과매도 반등 플레이 (권장)", priority: "1순위",
    entry: "$0.012-0.013 (S1 지지대)", sl: "$0.0105 (ATL 아래)", tp1: "$0.018 (R1, R:R ≈ 1:2)", tp2: "$0.020 (R2, R:R ≈ 1:3)",
    signal: "RSI 30 이하 + 거래량 감소 후 양봉 전환 + OI 안정/증가",
    rationale: "RSI 29.87 과매도. Funding -0.003 숏 우세→스퀴즈 유인. OI $1B→$434M 급감=포지션 정리 완료. Aave BTC 렌딩 4월 출시=펀더멘털 촉매. $0.012-0.018 4개월 횡보 기저 형성",
    risk: "무한 공급 + 월간 언락 = 반등 제한. 단타 2~5일 접근 필수. 장기 보유 불리",
    color: "#34d399",
  },
  {
    id: "B", title: "숏: 5월 언락 물량 매도 압력", priority: "2순위",
    entry: "$0.018-0.020 반등 시 (R1-R2 저항)", sl: "$0.022 (12월 고점 위)", tp1: "$0.013 (R:R ≈ 1:2)", tp2: "$0.011 (R:R ≈ 1:3)",
    signal: "R1-R2 도달 후 4H 긴 윗꼬리/도지, 거래량 감소",
    rationale: "4월 cliff 후 매월 선형 언락 시작. Early Private 2.66B + Team 1.31B + Advisors 306M = 총 4.28B가 3년간 풀림. 격월 스퀴즈 패턴(DYDX 유사) 감안, 반등 고점에서 숏",
    risk: "과매도 상태에서 숏은 스퀴즈 위험. RSI 30 이하에서 진입 금지",
    color: "#ef4444",
  },
  {
    id: "C", title: "격월 스퀴즈 단타 (DYDX 패턴)", priority: "관찰",
    entry: "스퀴즈 패턴 확인 후", sl: "직전 스윙 저점", tp1: "직전 스윙 고점", tp2: "R2 $0.020",
    signal: "과거 DYDX 인센티브 해제일 전후 스퀴즈 패턴 재현 여부. 4월 cliff 후 5월 첫 월간 언락 시 반응 관찰",
    rationale: "커뮤니티 분석: '백서상 4월부터 물량이 풀리기 시작하나, 과거 패턴 보면 격월 스퀴즈 움직임. 4월보다 5월 단타 노림이 유효'. 3월 대규모 청산($40M+) 이후 숏 포지션 정리 → 신규 숏 축적 시 재스퀴즈",
    risk: "패턴 관찰에 기반한 추론. 확정적이지 않음. 소규모로 검증 후 증액",
    color: "#f59e0b",
  },
];

const BABY_CATALYSTS = [
  { date: "4/10", event: "1주년 cliff 해제: 612.5M BABY (유통대비 19.88%)", impact: "핵심 이벤트", done: true },
  { date: "4/11~", event: "Early Private/Team/Advisors 선형 언락 시작 (월간)", impact: "지속 매도 압력", done: true },
  { date: "4월 중", event: "Babylon + Aave BTC 네이티브 렌딩 출시 예정", impact: "긍정 촉매", done: false },
  { date: "5월~", event: "첫 월간 선형 언락 + 스퀴즈 패턴 관찰 구간", impact: "단타 기회", done: false },
  { date: "10월", event: "Binance Marketing 121.6M 해제 (6M cliff)", impact: "추가 매도", done: false },
  { date: "~2028", event: "Team/Advisors 베스팅 완료. Inflation 4Y 동적 해제", impact: "장기 압력", done: false },
];

// ============================================================
// FF (Falcon Finance) Analysis Data — 2026-04-11
// ============================================================
const FF_MARKET = {
  price: "$0.098 / 142원", mcap: "$225M", fdv: "$961M", vol24h: "$298M",
  circulating: "2.34B / 10B (23.4%)", athPrice: "$0.77", athDate: "2025.09.29 (TGE)",
  athDrop: "-87.3%", atlPrice: "$0.062", atlDate: "2025.10.10",
  range24h: "$0.071 — $0.165 (+132%)", exchanges: "Binance, Upbit, Bithumb, Bybit, KuCoin, MEXC",
  tvl: "~$2B (USDf 1.9B 유통)", category: "DeFi / Synthetic Dollar (USDf)",
};

const FF_TECHNICALS = {
  trend: "NEUTRAL — 방향 불명확",
  alphaScore: "+20 (V4 Engine)",
  fundingRate: "극단 음수 → 숏 스퀴즈 대기",
  cvd: "가격↑ + CVD↑ — 실제 매수 주도 (진짜 수요)",
  longShort: "L/S 1.04 균형",
  taker: "1.12+ 매수우세",
  orderbook: "STRONG BID 2.42",
  liquidation: "숏 우세 → 스퀴즈 가능성",
  fearGreed: "극단 공포 → 역발상 매수 ★",
  vwap: "단기 VWAP 하회 이탈",
  rs: "BTC 대비 극단적 약세 (이탈)",
  bb: "BB 중립 (위치 44%, 밴드폭 144%)",
  atr: "변동성 극중 (ATR 6.01%) — 고위험",
  kimchi: "김치프리미엄 0.3%",
  change24h: "+37.2%", change7d: "+39.2%", change30d: "+32.3%",
};

const FF_LEVELS = [
  { type: "R", label: "R3", price: "$0.165", note: "4/10 고점 (ATH 이후 최고)" },
  { type: "R", label: "R2", price: "$0.12-0.13", note: "50% Fib 되돌림, 1차 저항" },
  { type: "R", label: "R1", price: "$0.10", note: "심리적 저항 + 당일 반등 고점" },
  { type: "NOW", label: "현재가", price: "$0.098", note: "급등 후 조정 중 (-40.6%)" },
  { type: "S", label: "S1", price: "$0.074", note: "웨일 매집 평단 (7개 지갑)" },
  { type: "S", label: "S2", price: "$0.062", note: "ATL (2025.10.10)" },
];

const FF_TOKENOMICS = [
  { name: "Ecosystem", pct: "35%", schedule: "미공개 (최대 리스크)", color: "#3b82f6" },
  { name: "Foundation", pct: "24%", schedule: "미공개", color: "#8b5cf6" },
  { name: "Core Team", pct: "20%", schedule: "1Y cliff + 3Y linear", color: "#ef4444" },
  { name: "Community/Airdrop", pct: "8.3%", schedule: "Miles Program + Buidlpad", color: "#34d399" },
  { name: "Marketing", pct: "8.2%", schedule: "미공개", color: "#f59e0b" },
  { name: "Investors", pct: "4.5%", schedule: "1Y cliff + 3Y linear", color: "#ec4899" },
];

const FF_ARKHAM = [
  { holder: "Gnosis Safe (0x08F)", amount: "2,990,000,000", pct: "최대홀더", usd: "$275.4M", type: "treasury" },
  { holder: "Foundation (0xaaT)", amount: "2,400,000,000", pct: "22.88%", usd: "$222.9M", type: "foundation" },
  { holder: "Core Team (0x0f2)", amount: "2,000,000,000", pct: "19.07%", usd: "$185.7M", type: "team" },
  { holder: "LockedReleasePool (0x0e9)", amount: "488,597,194", pct: "4.66%", usd: "$45.4M", type: "vesting" },
  { holder: "Investors (0x09f)", amount: "400,000,000", pct: "4.29%", usd: "$41.0M", type: "investors" },
  { holder: "Gnosis Safe (0x8BB)", amount: "393,740,631", pct: "3.75%", usd: "$36.5M", type: "treasury" },
];

const VVV_ARKHAM = [
  { holder: "sVVV Staking Contract (0x321)", amount: "32,399,434", pct: "71.3%", usd: "$273.1M", type: "staking" },
  { holder: "Venice Safe (0x208)", amount: "20,228,318", pct: "17.87%", usd: "$170.5M", type: "treasury" },
  { holder: "Venice Safe (0x44a)", amount: "8,513,141", pct: "7.52%", usd: "$71.7M", type: "treasury" },
  { holder: "Sablier Lockup (0x4cB)", amount: "3,771,366", pct: "3.33%", usd: "$31.8M", type: "vesting" },
  { holder: "Venice Safe (0xb3c)", amount: "1,467,742", pct: "1.30%", usd: "$12.4M", type: "treasury" },
];

const FF_DWF_PATTERN = [
  { phase: "매집", duration: "2-4주", desc: "7개 지갑 227.5M FF 매집 (유통의 ~10%). 거래소 잔고 -25%", status: "done" },
  { phase: "펌핑", duration: "1-4일", desc: "발표/뉴스 없이 급등 +73~132%", status: "done" },
  { phase: "분배", duration: "수시간~수일", desc: "급락 50-67%. 현재 진행 중 (-40.6%)", status: "active" },
  { phase: "서서히 빠짐", duration: "1-4주", desc: "총 되돌림 50-82%. 타겟: $0.07-0.08", status: "upcoming" },
  { phase: "장기", duration: "수개월", desc: "대부분 ATH 대비 90-99% 하락 정착", status: "upcoming" },
];

const FF_SCENARIOS = [
  {
    id: "A", title: "숏: 반등 시 진입 (DWF 분배 패턴)", priority: "1순위",
    entry: "$0.12-0.13 반등 시 (38-50% Fib)", sl: "$0.14 (61.8% Fib 위)", tp1: "$0.085 (R:R ≈ 1:2.8)", tp2: "$0.074 (웨일 매집가, R:R ≈ 1:4)",
    signal: "반등 후 4H 긴 윗꼬리, 거래량 감소, OI 증가 없이 가격 상승",
    rationale: "DWF 역사적 패턴: 50-67% 되돌림 (수일), 80%+ (수주). FF 고점 $0.165→50% 되돌림=$0.082, 67%=$0.054. 현재 -40.6%로 아직 1차 타겟 미달. 촉매 없는 급등=운전 신호",
    risk: "DWF가 프로젝트 자체를 소유→타이밍 예측 불가. 추가 스퀴즈 가능 (FR 극단 음수). 포지션 소규모 유지",
    color: "#ef4444",
  },
  {
    id: "B", title: "롱: 매집가 지지 매수 (단타)", priority: "2순위",
    entry: "$0.07-0.075 (웨일 매집 평단)", sl: "$0.06 (ATL 아래)", tp1: "$0.10 (R:R ≈ 1:2.5)", tp2: "$0.12 (R:R ≈ 1:4)",
    signal: "거래량 급감 후 횡보 안정화, $0.074 지지 3회 이상 테스트",
    rationale: "7개 웨일 지갑이 $0.074 평단에 227.5M FF(유통의 ~10%) 매집. 이 가격대가 '운전 원가'. TVL $2B 실제 프로토콜. WLFI $10M 투자. Airdrop/Miles 프로그램으로 유저 유입 중",
    risk: "DWF 프로젝트=운전 원가 아래로도 가격 조작 가능. USDf 96% 오프체인 리저브=투명성 우려. 장기 보유 금지, 단타만",
    color: "#34d399",
  },
  {
    id: "C", title: "재펌핑 대비 관찰", priority: "관찰",
    entry: "DWF 패턴 재발 시", sl: "직전 저점", tp1: "+25% (역사적 안전 익절선)", tp2: "N/A",
    signal: "거래소 잔고 급감 (780M→587M같은), 신규 지갑 대량 매집, OI 급증 없는 가격 상승",
    rationale: "DWF는 반복적으로 같은 토큰 재펌핑. CFX: 첫 20x 후 2차 투자→2차 펌핑→-57%. 역사적으로 +25% 시점이 안전 이탈 구간",
    risk: "언제 올지 예측 불가. 24시간 내 전체 수익 반납 사례 다수. 절대 탐욕 금지",
    color: "#f59e0b",
  },
];

const FF_CATALYSTS = [
  { date: "4/7-10", event: "7개 웨일 지갑 227.5M FF 매집 (유통의 ~10%). 거래소 잔고 780M→587M", impact: "매집 완료", done: true },
  { date: "4/10-11", event: "FF +132% 급등 (104원→247원). 촉매 미공개. 24h 거래량 $298M", impact: "펌핑 완료", done: true },
  { date: "4/11~", event: "하락 조정 중 (-40.6%). DWF 분배 페이즈 추정", impact: "분배 진행", done: true },
  { date: "9/29~", event: "Team+Investors 1Y cliff 해제 (24.5% = 2.45B FF)", impact: "대규모 언락", done: false },
  { date: "2026 중", event: "RWA 엔진 확장, GENIUS/MiCA 규제 라이선스 추진, $5B TVL 목표", impact: "펀더멘털", done: false },
  { date: "미정", event: "Ecosystem 35% + Foundation 24% = 59% 물량 베스팅 미공개", impact: "최대 리스크", done: false },
];

// ============================================================
// ARIA (AriaAI) Analysis Data — 2026-04-11
// ============================================================
const ARIA_MARKET = {
  price: "$0.54", mcap: "$99M", fdv: "$540M", vol24h: "$55M",
  volFutures: "$1.49B (스팟의 51배)", oi: "$83.1M", liq24h: "$9.4M (4H 청산 BTC 초과)",
  circulating: "183M / 1B (18.3%)", athPrice: "$0.78", athDate: "2026.04.09",
  athDrop: "-30.8%", atlPrice: "$0.033", atlDate: "2025.08.25",
  exchanges: "Gate.io, KuCoin, Bitget, MEXC, PancakeSwap V3",
  futuresExchanges: "Binance Futures ($954M), Bybit ($203M)",
  category: "GameFi / AI Gaming (BNB Chain)",
  crashDetail: "4/9 ATH $0.78 → 1시간 내 -83% ($0.10) → 회복 $0.54",
};

const ARIA_TECHNICALS = {
  trend: "VOLATILE — 크래시 후 회복 중",
  futuresSpotRatio: "51:1 (극단적 레버리지)",
  liqDominance: "4H 청산 $6.12M (BTC $2.3M 초과)",
  volMcapRatio: "1.69x (조작 시그널)",
  smartMoney: "6개 스마트머니 $0.31에 매도 (크래시 전)",
  whaleAccum: "7개 지갑 17.52M ARIA CEX 인출 → 콜드스토리지",
  onchainBuy: "0x65b... 지갑 $90K 단계적 매수 중 (스테이블코인 인출)",
  onchainSell: "프레시 지갑에서 매도 시작 — 이전 거래소 인출 이력",
  contractRisk: "스마트컨트랙트 소스코드 미검증 (Sentinacle 경고)",
  change7d: "-30%", change30d: "+754%",
};

const ARIA_LEVELS = [
  { type: "R", label: "R3", price: "$0.78", note: "ATH (4/9, 크래시 직전)" },
  { type: "R", label: "R2", price: "$0.64-0.66", note: "크래시 전 고점대" },
  { type: "R", label: "R1", price: "$0.60", note: "심리적 저항" },
  { type: "NOW", label: "현재가", price: "$0.54", note: "크래시 후 회복 중 (-30%)" },
  { type: "S", label: "S1", price: "$0.40-0.45", note: "포스트크래시 지지대" },
  { type: "S", label: "S2", price: "$0.30", note: "초기 회복 레벨" },
  { type: "S", label: "S3", price: "$0.10", note: "크래시 저점 (4/9)" },
];

const ARIA_TOKENOMICS = [
  { name: "Community & Airdrop", pct: "51%", schedule: "TGE 8.8% + 36M linear", color: "#3b82f6" },
  { name: "Team", pct: "15%", schedule: "12M cliff + 36M linear", color: "#ef4444" },
  { name: "Marketing", pct: "10.8%", schedule: "TGE 81.5% 해제 (대부분 유통)", color: "#f59e0b" },
  { name: "Ecosystem Fund", pct: "9.7%", schedule: "36M linear (0% TGE)", color: "#06b6d4" },
  { name: "Investors", pct: "8.5%", schedule: "12M cliff + 12M quarterly", color: "#8b5cf6" },
  { name: "Liquidity", pct: "5%", schedule: "TGE 100% 해제", color: "#34d399" },
];

const ARIA_SCENARIOS = [
  {
    id: "A", title: "롱: 크래시 후 회복 지속 플레이", priority: "1순위",
    entry: "$0.40-0.45 (S1 지지대 테스트 시)", sl: "$0.35 (S1 하방 이탈)", tp1: "$0.60 (R:R ≈ 1:2.5)", tp2: "$0.65 (R:R ≈ 1:3.5)",
    signal: "4H RSI 과매도 + 거래량 감소 후 양봉 전환. $0.40 3회 이상 지지 확인",
    rationale: "ATL $0.033 대비 +1,600%. 30일 +754%. 크래시(-83%)에서 이미 $0.54로 회복(+420%). 실제 프로덕트(AI RPG) + Animoca/Galaxy/Spartan 투자. Binance Futures 상장 = 유동성 충분. 온체인 매수 활동 관찰 ($90K/hr)",
    risk: "프레시 지갑 매도 시작 — 추가 하락 가능. 51:1 선물/현물 비율 = 청산 캐스케이드 재발 위험. 스마트컨트랙트 미검증",
    color: "#34d399",
  },
  {
    id: "B", title: "숏: R1-R2 저항 반등 시 진입", priority: "2순위",
    entry: "$0.60-0.66 반등 시", sl: "$0.70 (ATH 아래)", tp1: "$0.45 (R:R ≈ 1:2)", tp2: "$0.35 (R:R ≈ 1:3.5)",
    signal: "R1-R2 도달 후 거래량 감소 + 4H 긴 윗꼬리. OI 증가 없이 가격 상승",
    rationale: "크래시 전 대형 지갑이 덤프. 프레시 지갑 매도 시작. 81.7% 물량 락업 중 → 향후 언락 압력. 스마트컨트랙트 '블랙박스' Sentinacle 경고. DWF 연관 정황 (미확인)",
    risk: "Binance Futures 상장 토큰 = 숏 스퀴즈 위험. 30일 +754% 모멘텀 강력. 매수세 지갑 $90K/hr 활동 중",
    color: "#ef4444",
  },
  {
    id: "C", title: "온체인 매수/매도 추적 트레이드", priority: "관찰",
    entry: "온체인 신호에 따라 유동적", sl: "직전 스윙 레벨", tp1: "+15-20%", tp2: "N/A",
    signal: "0x65b... 지갑 매수 지속 여부 + 프레시 매도 지갑 활동 모니터링. 거래소 잔고 변화 추적. CEX 순유출 = 강세, 순유입 = 약세",
    rationale: "온체인에서 매수($90K/hr)와 매도(프레시 지갑) 양쪽 활동 동시 관찰 = 방향 미정. 어제 덤프한 대형 지갑이 재매도 가능성 경고. 충분한 물량 보유 중",
    risk: "온체인 데이터 해석 시차. 고래 vs 고래 싸움에 리테일 끼면 양쪽에서 청산 당할 수 있음",
    color: "#f59e0b",
  },
];

const ARIA_CATALYSTS = [
  { date: "4/9", event: "ATH $0.78 → 1시간 내 -83% 크래시. $9.4M 청산. Sentinacle 스마트컨트랙트 경고", impact: "크래시", done: true },
  { date: "4/10-11", event: "크래시 저점 $0.10에서 $0.54로 +420% 회복. 온체인 매수/매도 혼재", impact: "회복 중", done: true },
  { date: "8/21~", event: "Team(15%)+Investors(8.5%) 12M cliff 해제 (TGE 2025.8.21)", impact: "대규모 언락", done: false },
  { date: "2026 중", event: "Season 3 콘텐츠 + 모바일 RPG 확장 + AI Agent 기능", impact: "펀더멘털", done: false },
  { date: "미정", event: "Binance 정식 상장 여부 (현재 Alpha만). 상장 시 급등 가능", impact: "잠재 촉매", done: false },
  { date: "미정", event: "Community 51% 물량 36M linear 해제 지속 (81.7% 락업)", impact: "장기 희석", done: false },
];

// ============================================================
// VVV (Venice Token) Analysis Data — 2026-04-11
// ============================================================
const VVV_MARKET = {
  price: "$8.54", mcap: "$384M", fdv: "$672M", vol24h: "$22.4M",
  circulating: "45.47M / 79.45M (57.2%)", burned: "33.7M+ 소각 (원래 100M의 42.3%)",
  athPrice: "$22.58", athDate: "2025.01.28", athDrop: "-62.6%",
  atlPrice: "$0.92", atlDate: "2025.12.01", category: "AI / Privacy AI (Base L2)",
  exchanges: "Coinbase, Bybit, Bithumb, Kraken, KuCoin, Gate",
  notListed: "Binance 스팟 미상장 (선물만) → 잠재 촉매",
  emissions: "6M VVV/년 (2026.2.10 25% 감축 완료)",
  stakingApy: "~65% APY, 7일 쿨다운",
  change7d: "+22.4%", change30d: "+49.7%", change60d: "+383%",
};

const VVV_TECHNICALS = {
  trend: "Strong Uptrend (60일 +383%)",
  wintermute: "DEX에서 적극 매수 주도 (런칭때는 덤핑한 이력)",
  staking: "7일 쿨다운 → 대량 언스테이크 시 7일 후 매도 예측 가능",
  diem: "sVVV 락업→DIEM 발행. 유통 제거 효과. 하지만 DIEM 소각해야 언락",
  burnRate: "월 $115-123K 바이백&번. 42.3% 이미 소각",
  goplus: "GoPlus 경고: 컨트랙트 소유자가 매도 비활성화/수수료 변경/민팅 가능",
  founder: "Erik Voorhees (ShapeShift 창업자). 1인 프로젝트 리스크",
};

const VVV_LEVELS = [
  { type: "R", label: "R3", price: "$22.58", note: "ATH (2025.01.28)" },
  { type: "R", label: "R2", price: "$10.00", note: "심리적 저항, 오버헤드 매물대" },
  { type: "R", label: "R1", price: "$8.50-9.00", note: "현재 고점 영역" },
  { type: "NOW", label: "현재가", price: "$8.54", note: "60일 +383%, ATL +828%" },
  { type: "S", label: "S1", price: "$7.00-7.50", note: "24h 저점 + 최근 지지" },
  { type: "S", label: "S2", price: "$5.50-6.00", note: "3월 중순 브레이크아웃 레벨" },
  { type: "S", label: "S3", price: "$3.50", note: "2월 구조적 지지" },
];

const VVV_SCENARIOS = [
  {
    id: "A", title: "롱: 조정 시 매수 (모멘텀 추종)", priority: "1순위",
    entry: "$7.00-7.50 (S1 조정 시)", sl: "$6.30 (S1 하방)", tp1: "$10.00 (R:R ≈ 1:2.5)", tp2: "$12.00 (R:R ≈ 1:4)",
    signal: "4H RSI 과매도 접근 + S1 지지 확인 + Wintermute 지갑 매수 지속",
    rationale: "60일 +383% 강한 업트렌드. 실제 프로덕트(1.3M유저, 45B토큰/일). 바이백&번 가속 중($123K/월). 에미션 25% 감축. DIEM 유통 제거 효과. Binance 스팟 미상장=잠재 촉매. Wintermute 현재 매수 주도",
    risk: "ATH -62.6% 오버헤드. Wintermute 런칭 시 덤핑 전력. GoPlus 컨트랙트 경고. 팀 35M 베스팅 진행 중",
    color: "#34d399",
  },
  {
    id: "B", title: "숏: $10 심리저항 도달 시", priority: "2순위",
    entry: "$9.50-10.00 (R2 접근 시)", sl: "$10.80", tp1: "$7.50 (R:R ≈ 1:2)", tp2: "$6.00 (R:R ≈ 1:3.5)",
    signal: "$10 도달 후 거래량 감소 + 4H 다이버전스. Wintermute 지갑 매도 전환 감지",
    rationale: "ATH $22.58 대비 -62.6%. $10-15 구간 대량 매물대 (런칭 시 고점 구매자). Wintermute 런칭 시 $19→$2.44 덤핑 이력. 현재 매수 주도 = 향후 분배 가능. 팀 베스팅 물량 + 에미션 6M/년",
    risk: "업트렌드 강력 (60일 +383%). Binance 상장 시 숏 스퀴즈 위험. 바이백&번 = 자연적 매수 압력",
    color: "#ef4444",
  },
  {
    id: "C", title: "스테이킹 언스테이크 추적", priority: "관찰",
    entry: "대량 언스테이크 감지 7일 후", sl: "직전 스윙 고점", tp1: "-10~15%", tp2: "S1 지지",
    signal: "0x321b... 스테이킹 유출 지갑에서 대량 출금 감지 → 7일 쿨다운 → 매도 시점 예측",
    rationale: "스테이킹 참여자들은 언스테이크 후 대부분 매도. 7일 쿨다운 = 예측 가능한 매도 시점. 대량 유출 시 선제 숏 진입 가능",
    risk: "언스테이크 후 재스테이크할 수도 있음. DIEM 락업으로 언스테이크 불가한 물량 존재",
    color: "#f59e0b",
  },
];

const VVV_CATALYSTS = [
  { date: "2025.12", event: "바이백&번 시작. ATL $0.92에서 반등 개시", impact: "상승 전환", done: true },
  { date: "2026.02.10", event: "에미션 25% 영구 감축 (8M→6M/년)", impact: "공급 축소", done: true },
  { date: "2026.03.02", event: "OpenClaw 파트너십 → VVV +20%", impact: "급등", done: true },
  { date: "2026.03.18", event: "TEE + E2EE 암호화 AI 모드 출시 → +10%", impact: "프로덕트", done: true },
  { date: "2026.04", event: "x402 통합 (AI 에이전트 결제) + Seedance 2.0", impact: "유틸리티 확장", done: true },
  { date: "진행중", event: "Wintermute/봇 지갑 DEX 매수 주도 — 온체인 모니터링 중", impact: "가격 상승 주도", done: true },
  { date: "미정", event: "Binance 스팟 상장 (현재 선물만). 상장 시 급등 예상", impact: "잠재 촉매", done: false },
  { date: "~2026말", event: "팀 35M VVV 베스팅 완료 (24개월)", impact: "매도 압력", done: false },
];

// ============================================================
// GWEI (ETHGas) + SKYAI Analysis Data — 2026-04-11
// ============================================================
const GWEI_DATA = {
  price: "$0.0675", mcap: "$118M", fdv: "$675M", vol24h: "$14.8M",
  circulating: "1.75B / 10B (17.5%)", athDrop: "ATH 근접 (+21.8% 24h)",
  chain: "Ethereum", exchanges: "Coinbase, Kraken, Bitget, Bithumb, KuCoin",
  team: "Kevin Lepsoe (ex-Morgan Stanley Asia 파생상품 헤드)",
  funding: "Polychain Capital 리드 $12M 시드",
  verdict: "프로젝트 합법 + 토큰 분배 조작 의심",
  verdictColor: "#f59e0b",
  redFlags: [
    "재단 지갑 → 10개 신규 지갑에 $6M 분배 → 거래소 입금 (Bitget 100%)",
    "ethgasfoundation → 0x096f... → Bitget Deposit: 15M GWEI ($820K) Arkham 확인",
    "Bubblemaps: 상위 클러스터 15.17% (건전 기준 15% 경계선)",
    "Foundation 8%는 즉시 언락 (베스팅 없음). Team 22% + Investors 27% = 49% 내부자",
    "ATH 근접 상태에서 재단 지갑 활발 = 고점 매도 패턴",
  ],
  greenFlags: [
    "실제 팀 (Morgan Stanley, Deutsche Bank, HKEx 출신)",
    "Polychain Capital $12M 투자",
    "Coinbase + Kraken 상장 (컴플라이언스 통과)",
    "실제 프로덕트: Ethereum 블록스페이스 선물 시장",
  ],
};

const SKYAI_DATA = {
  price: "$0.127", mcap: "$127M", fdv: "$127M", vol24h: "$25.9M",
  circulating: "998M / 1B (99.8%)", athDrop: "ATH 돌파 중 (+76.4% 24h)",
  chain: "BNB Chain", exchanges: "Gate, HTX, Poloniex, LBank (저급 거래소만)",
  team: "익명 (Google AI, Binance, OpenAI 출신 주장 — 미검증)",
  funding: "Four.meme 런치패드 $50M 주장 (CryptoRank $100 표시 — 불일치)",
  verdict: "SIREN 패턴 + 파생상품 극단 과열",
  verdictColor: "#ef4444",
  redFlags: [
    "#넥스트사이렌: SIREN과 동일 패턴 (BNB Chain + Binance Alpha + 지갑 분산)",
    "익명 팀 + 'No team allocation' 주장 ↔ 온체인 대규모 지갑 분배 모순",
    "0x5a26... 웨일 = $1.1M SKYAI 보유, $91-93K씩 정기 분배 (Arkham 확인)",
    "99.8% 유통 주장이지만 실제 집중도 은폐 (SIREN: 52/54 지갑 = 1 엔터티 88.5%)",
    "저급 거래소만 상장 (Coinbase/Binance/OKX 없음). +185% 30d = 수직 상승",
    "알고리즘 매도로 대형 포지션 79% 수익 실현 후 이탈",
    "펀딩비 0.2058% — 극단적 롱 과밀. OI $299M vs MCap $127M = 2.35x (과열)",
  ],
  greenFlags: [
    "BNB Chain Foundation $100K 매수 (인센티브 프로그램)",
    "MCap/FDV = 1.0 (추가 희석 없음 — 단, 집중도가 문제)",
  ],
};

const GWEI_LEVELS = [
  { type: "R", label: "R3", price: "$0.085", note: "심리적 저항 + 미유통 오버헤드" },
  { type: "R", label: "R2", price: "$0.075", note: "ATH 영역" },
  { type: "R", label: "R1", price: "$0.070", note: "최근 고점" },
  { type: "NOW", label: "현재가", price: "$0.0675", note: "ATH 근접 (+21.8% 24h)" },
  { type: "S", label: "S1", price: "$0.055", note: "이전 저항→지지 전환" },
  { type: "S", label: "S2", price: "$0.04", note: "장기 지지대" },
];

const GWEI_TOKENOMICS = [
  { name: "Investors", pct: "27%", schedule: "베스팅 있음 (미공개)", color: "#8b5cf6" },
  { name: "Team", pct: "22%", schedule: "베스팅 있음 (미공개)", color: "#ef4444" },
  { name: "Foundation", pct: "8%", schedule: "즉시 언락 (베스팅 없음)", color: "#f59e0b" },
  { name: "Ecosystem", pct: "43%", schedule: "미공개", color: "#3b82f6" },
];

const GWEI_SCENARIOS = [
  {
    id: "A", title: "숏: 재단 매도 포착 후 진입", priority: "1순위",
    entry: "재단 지갑 → CEX 입금 감지 시 ($0.065-0.068)", sl: "$0.075 (ATH 위)", tp1: "$0.05 (R:R ≈ 1:2)", tp2: "$0.04 (R:R ≈ 1:3.5)",
    signal: "ethgasfoundation → 시드 지갑 → Bitget 입금 패턴 반복 감지. Arkham 알림 설정",
    rationale: "Arkham에서 0x096f→Bitget 15M GWEI 입금 확인. 재단 8% 즉시 언락 (베스팅 없음). 82.5% 미유통 = 향후 언락 매도 압력. ATH 근처 펌핑 중 재단 매도 = 고전적 인사이더 덤프. Bubblemaps 15.17% 클러스터 경고",
    risk: "프로젝트 자체는 합법 (Polychain, Coinbase). 펀더멘털 매수세 유입 가능. 숏 스퀴즈 주의",
    color: "#ef4444",
  },
  {
    id: "B", title: "숏: 82.5% 미유통 언락 대비", priority: "2순위",
    entry: "$0.068-0.072 (ATH 근접 시)", sl: "$0.08", tp1: "$0.05 (R:R ≈ 1:1.5)", tp2: "$0.04",
    signal: "Team 22% + Investors 27% 베스팅 일정 공개 시. 또는 재단 지갑 추가 이동 감지",
    rationale: "유통 17.5% = 82.5% 잠금. 인사이더(Team+Investors) 49%. 베스팅 일정 미공개 자체가 리스크. ATH 근접 상태에서 재단이 이미 매도 활동 중 = 내부자가 고점으로 판단",
    risk: "베스팅 일정 공개 전까지 촉매 부재. 장기 포지션 유지 비용. Coinbase/Kraken 상장 신뢰도",
    color: "#f59e0b",
  },
  {
    id: "C", title: "롱: 펀더멘털 매수 (조건부)", priority: "관찰",
    entry: "$0.04 이하 조정 시", sl: "$0.03", tp1: "$0.06 (R:R ≈ 1:2)", tp2: "$0.07",
    signal: "재단 매도 활동 중단 + 프로덕트 출시/채택 뉴스",
    rationale: "실제 팀 (Morgan Stanley, Deutsche Bank 출신). Polychain $12M 투자. Coinbase+Kraken 상장. 블록스페이스 선물 시장 = 실제 프로덕트. 인사이더 매도 완료 후 저점 매수 기회",
    risk: "인사이더 매도 규모/일정 미확인. 추가 물량 해제 리스크. 프로덕트 PMF 미검증",
    color: "#34d399",
  },
];

const GWEI_CATALYSTS = [
  { date: "~2025", event: "TGE + Polychain $12M 시드 라운드. Coinbase, Kraken 상장", impact: "런칭", done: true },
  { date: "2026.04", event: "재단 지갑 → 10개 신규 지갑에 $6M 분배 → Bitget 입금", impact: "재단 덤프", done: true },
  { date: "23시간 전", event: "0x096f → Bitget 15M GWEI ($820K). 잔액 $9.64 (전량 매도)", impact: "매도 확인", done: true },
  { date: "진행중", event: "ATH 근접 펌핑 + 재단 활발 매도 = 인사이더 덤프 패턴", impact: "경고", done: true },
  { date: "미정", event: "Team 22% + Investors 27% 베스팅 일정 공개", impact: "핵심 리스크", done: false },
  { date: "미정", event: "Ethereum 블록스페이스 선물 시장 프로덕트 채택 지표", impact: "펀더멘털", done: false },
];

// ============================================================
// SKYAI Standalone Deep Analysis — 2026-04-11
// Source: TradingView (Binance Futures SKYAIUSDT Daily), Velo, Arkham
// ============================================================
const SKYAI_MARKET = {
  price: "$0.127", mcap: "$127M", fdv: "$127M", vol24h: "$25.9M",
  oi: "$298.9M", oiMcapRatio: "2.35x (OI > MCap = 극단적 투기)",
  fundingRate: "0.2058% (8H OI 가중평균)",
  liq24h: "Long 1.385M / Short -722K",
  athPrice: "$0.128+", athDate: "2026.04.11 (진행중)",
  atlPrice: "$0.0143", atlDate: "2025.10.11",
  circulating: "998M / 1B (99.8%)",
  exchanges: "Binance Futures, Gate.io, HTX, OrangeX, PancakeSwap",
  chain: "BNB Chain", volumeSma: "769.64M",
  change24h: "+76.4%", change7d: "+104.8%", change30d: "+185%",
};

const SKYAI_TECHNICALS = {
  trend: "Parabolic Extension — 극단적 과열",
  ma14: "$0.07239", ma21: "$0.06799", ma35: "$0.05875",
  ma50: "$0.05428", ma100: "$0.04645", ma200: "$0.03635",
  maDeviation: "+253% (MA200 대비) — 역사적 이격",
  fundingRate: "0.2058% — 연환산 ~750%. 롱 포지션 유지비용 극단적",
  oiSurge: "~40M → 298.9M (+647%) in 1개월. MCap의 2.35배",
  vpvr: "POC $0.035-0.055. $0.06 위 거래량 희박 = 허공 구간",
  liqProfile: "롱 청산 1.385M > 숏 청산 722K. 롱 레버리지 과다",
  priceVsMa: "전 이평선(14/21/35/50/100/200) 위에서 거래 — 극단적 이격 상태",
};

const SKYAI_LEVELS = [
  { type: "R", label: "R3", price: "$0.14", note: "라운드 넘버, 심리적 저항" },
  { type: "R", label: "R2", price: "$0.13", note: "4/11 고점 영역" },
  { type: "NOW", label: "현재가", price: "$0.127", note: "ATH 돌파 중 (+76.4%)" },
  { type: "S", label: "S1", price: "$0.072", note: "MA14 + VPVR 상단. 1차 되돌림 타겟 (-43%)" },
  { type: "S", label: "S2", price: "$0.054-0.059", note: "MA35-50 밀집 + VPVR 고밀도대" },
  { type: "S", label: "S3", price: "$0.036-0.041", note: "MA200 + VPVR POC. 풀 되돌림 (-70%)" },
  { type: "S", label: "S4", price: "$0.025", note: "직전 저항→지지 전환. SIREN급 크래시 타겟" },
];

const SKYAI_SCENARIOS_FULL = [
  {
    id: "A", title: "숏: 파생상품 과열 되돌림 (최우선)", priority: "1순위",
    entry: "현재 $0.127 (소규모) 또는 반등 시 $0.13-0.14", sl: "$0.16 (+26%)", tp1: "$0.072 (MA14, R:R ≈ 1:1.8)", tp2: "$0.055 (MA35-50, R:R ≈ 1:2.5)",
    signal: "4H 캔들 긴 윗꼬리/도지 + 거래량 감소 + OI 감소 시작. 또는 펀딩비 0.3% 초과 시 과열 극대",
    rationale: "펀딩비 0.2058% = 연환산 ~750%. 롱 포지션 유지비만으로 소멸. OI/MCap 2.35x = 투기적 레버리지 극단. MA200 대비 +253% 이격 = 역사적 수준. VPVR $0.06 위 거래량 부재 = 하락 시 지지 없음. SIREN 패턴 + 익명팀 + 지갑 분산 = 구조적 리스크",
    risk: "파라볼릭 상승 중 숏은 스퀴즈 위험. +76% 24h 모멘텀 강력. 소규모 포지션 + 넓은 손절 필수. BNB Chain Foundation 매수가 단기 지지",
    color: "#ef4444",
  },
  {
    id: "B", title: "숏: 펀딩비 리셋 이벤트", priority: "2순위",
    entry: "펀딩비 0.3%+ 도달 시 또는 OI 피크 확인 후", sl: "직전 ATH +10%", tp1: "$0.072 (MA14)", tp2: "$0.041 (MA100 부근)",
    signal: "펀딩비 0.3% 초과 + OI 증가 멈춤 + 가격 정체 = 롱 소진. 대규모 롱 청산 캐스케이드 시작 시 추격 숏",
    rationale: "펀딩비 0.2%+에서 반전한 역사적 사례 다수 (PEPE, BONK, WIF 등). OI 298.9M이 MCap 127M의 2.35배 = 가격이 10% 하락하면 롱 청산 연쇄. $0.06 위 VPVR 공백 = 하락 시 '에어포켓' — 급락 가능",
    risk: "고펀딩이 더 오래 유지될 수 있음 (밈코인 광풍기). OI 추가 유입 시 스퀴즈 지속. 타이밍 예측 어려움",
    color: "#f59e0b",
  },
  {
    id: "C", title: "크래시 후 데드캣 바운스 롱 (극고위험)", priority: "관찰",
    entry: "SIREN급 -70~80% 크래시 후 $0.025-0.035 안정화 시", sl: "$0.018", tp1: "$0.055 (+80%)", tp2: "N/A",
    signal: "수직 하락 후 거래량 소멸 → 3일+ 횡보 안정화. OI 90%+ 감소 확인",
    rationale: "SIREN -90% 크래시 후에도 단기 반등 있었음. MA200 $0.036 부근 = 자연적 평균 회귀 지지. 단, 순수 투기이며 프로젝트 가치와 무관",
    risk: "스캠 토큰 반등은 재반등 불가능할 수 있음. 전액 손실 가능. 극소량만. SIREN은 반등 후 재하락",
    color: "#6b7280",
  },
];

const SKYAI_CATALYSTS = [
  { date: "2025.04", event: "Four.meme 런치패드 $50M 레이징 (주장). 112K 지갑 참여", impact: "런칭", done: true },
  { date: "2025.05.14", event: "TGE. ATH $0.09 달성 후 하락", impact: "고점", done: true },
  { date: "2025.10.11", event: "ATL $0.0143 도달 (-84% from ATH)", impact: "바닥", done: true },
  { date: "2026.04.05", event: "11개월 보유 지갑 79% 수익 실현 후 알고리즘 매도 이탈", impact: "웨일 이탈", done: true },
  { date: "2026.04.06", event: "MM 240만 토큰 Gate.io 인출 → 서브지갑 분배 (약세 신호)", impact: "분배", done: true },
  { date: "2026.04.11", event: "+76.4% 급등. ATH 돌파. 펀딩비 0.2058%. OI $299M (MCap의 2.35x)", impact: "극단 과열", done: true },
  { date: "진행중", event: "0x5a26 웨일 $91-93K씩 정기 서브지갑 매도 지속", impact: "지속 매도", done: true },
  { date: "미정", event: "펀딩비 리셋 or SIREN급 크래시 — 역사적 패턴상 수일~수주 내", impact: "핵심 리스크", done: false },
];

function ShortStrategyTab() {
  const [selectedToken, setSelectedToken] = useState("WLFI");
  const [expandedScenario, setExpandedScenario] = useState(null);

  const sectionStyle = { marginBottom: 24 };
  const sectionTitle = (text) => (
    <div style={{ fontSize: 13, fontWeight: 700, color: "#888", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>{text}</div>
  );
  const cardStyle = { background: "#0e1018", borderRadius: 10, border: "1px solid #181c24", padding: "16px 18px" };

  const tokens = [
    { id: "WLFI", name: "World Liberty Financial", verdict: "STRONG SHORT", verdictColor: "#ef4444" },
    { id: "SKYAI", name: "SkyAI", verdict: "SIREN + 파생상품 극단 과열", verdictColor: "#ef4444" },
    { id: "BABY", name: "Babylon", verdict: "LONG BIAS (과매도)", verdictColor: "#34d399" },
    { id: "FF", name: "Falcon Finance", verdict: "DWF 운전 — 분배 중", verdictColor: "#f59e0b" },
    { id: "ARIA", name: "AriaAI", verdict: "크래시 후 회복 — 혼재", verdictColor: "#8b5cf6" },
    { id: "VVV", name: "Venice AI", verdict: "강한 업트렌드 +383%", verdictColor: "#06b6d4" },
    { id: "GWEI", name: "ETHGas", verdict: "재단 인사이더 덤프", verdictColor: "#f59e0b" },
  ];

  return (
    <div>
      {/* Token Selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {tokens.map((t) => (
          <button key={t.id} onClick={() => { setSelectedToken(t.id); setExpandedScenario(null); }} style={{
            background: selectedToken === t.id ? "#181c24" : "transparent",
            border: `1px solid ${selectedToken === t.id ? "#282c38" : "#181c24"}`,
            color: selectedToken === t.id ? "#f0f0f5" : "#555",
            padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 14, fontWeight: 800 }}>{t.id}</span>
            <span style={{ fontSize: 10, padding: "2px 5px", borderRadius: 3, background: `${t.verdictColor}15`, border: `1px solid ${t.verdictColor}33`, color: t.verdictColor, fontWeight: 600 }}>{t.verdict}</span>
          </button>
        ))}
      </div>

      {selectedToken === "WLFI" && <WLFIAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "SKYAI" && <SkyaiAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "BABY" && <BABYAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "FF" && <FFAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "ARIA" && <ARIAAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "VVV" && <VVVAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "GWEI" && <GweiAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
    </div>
  );
}

// ============================================================
// WLFI Analysis Component
// ============================================================
function WLFIAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>WLFI</span>
        <span style={{ fontSize: 14, color: "#888" }}>World Liberty Financial</span>
        <span style={{ fontSize: 11, color: "#ef4444", background: "#1a0a0e", padding: "3px 8px", borderRadius: 4, border: "1px solid #2a1418", fontWeight: 700 }}>SHORT ANALYSIS</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-11 · Sources: CoinGecko, CoinGlass, CoinDesk, CoinMarketCap</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a0a0e 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #2a1418", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#ef4444" }}>STRONG SHORT — 반등 시 진입 대기</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>ATL에서 즉시 숏은 비추. $0.088-0.097 반등 또는 거버넌스 투표 이벤트 대기</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["추세", "강한 하락", "#ef4444"], ["수급", "극도 불리", "#ef4444"], ["촉매", "약세 다수", "#f59e0b"], ["반등", "제한적", "#6b7280"]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", WLFI_MARKET.price, "#f0f0f5", true],
            ["24h 변동", WLFI_TECHNICALS.change24h, "#ef4444", false],
            ["7d 변동", WLFI_TECHNICALS.change7d, "#ef4444", false],
            ["30d 변동", WLFI_TECHNICALS.change30d, "#ef4444", false],
            ["시가총액", WLFI_MARKET.mcap, "#ccc", false],
            ["FDV", WLFI_MARKET.fdv, "#ccc", false],
            ["유통량", WLFI_MARKET.circulating, "#ccc", false],
            ["ATH Drop", WLFI_MARKET.athDrop, "#ef4444", false],
            ["OI (미결제약정)", WLFI_MARKET.oi, "#60a5fa", false],
            ["OI 30d 레인지", WLFI_MARKET.oiRange30d, "#888", false],
            ["24h 거래량", WLFI_MARKET.vol24h, "#ccc", false],
            ["24h 선물거래량", WLFI_MARKET.volFutures, "#ccc", false],
            ["24h 청산", WLFI_MARKET.liq24h, "#f59e0b", false],
            ["ATL", `${WLFI_MARKET.atlPrice} (${WLFI_MARKET.atlDate})`, "#ef4444", false],
            ["ATH", `${WLFI_MARKET.athPrice} (${WLFI_MARKET.athDate})`, "#888", false],
            ["Dolomite 온체인", WLFI_MARKET.dolomiteStatus, "#f59e0b", false],
            ["거래소", WLFI_MARKET.exchanges, "#888", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Indicators */}
      <div style={sectionStyle}>
        {sectionTitle("Technical Indicators")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Trend Summary */}
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>추세 지표 — 전부 약세</div>
            {[
              ["EMA", `20(${WLFI_TECHNICALS.ema20}) < 50(${WLFI_TECHNICALS.ema50}) < 200(${WLFI_TECHNICALS.ema200})`, "#ef4444"],
              ["Death Cross", "EMA20 < EMA50 — 활성", "#ef4444"],
              ["Supertrend", WLFI_TECHNICALS.supertrend, "#ef4444"],
              ["Ichimoku", WLFI_TECHNICALS.ichimoku, "#ef4444"],
              ["전체 추세", WLFI_TECHNICALS.trend, "#ef4444"],
            ].map(([label, val, col]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #14161e" }}>
                <span style={{ fontSize: 12, color: "#888" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: col }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Support / Resistance */}
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {WLFI_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#34d399", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(52,211,153,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(52,211,153,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#34d399" : "#ccc", minWidth: 100 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dolomite Risk */}
      <div style={sectionStyle}>
        {sectionTitle("Dolomite 포지션 — FTT/FTX 구조 경고")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
          {/* Health Rate 배너 */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, padding: "10px 14px", background: "#0d1f15", borderRadius: 6, border: "1px solid #1a3a25" }}>
            <div>
              <div style={{ fontSize: 10, color: "#34d399", textTransform: "uppercase" }}>Health Rate</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#34d399" }}>{WLFI_DOLOMITE.healthRate}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#34d399", textTransform: "uppercase" }}>LTV</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#34d399" }}>{WLFI_DOLOMITE.ltv}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>청산 추정가</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>{WLFI_DOLOMITE.liquidationPrice}</div>
            </div>
            <div style={{ fontSize: 11, color: "#888", marginLeft: "auto" }}>DeBank 실시간 · MultiSig Safe</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 14 }}>
            {[
              ["담보", WLFI_DOLOMITE.collateral], ["총 대출", WLFI_DOLOMITE.loan], ["프로토콜 집중도", WLFI_DOLOMITE.concentration],
              ["지갑 나이", WLFI_DOLOMITE.walletAge], ["Coinbase Prime", WLFI_DOLOMITE.coinbasePrime], ["팀 주장", WLFI_DOLOMITE.teamClaim],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#ccc", marginTop: 2 }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "12px 14px", border: "1px solid #2a1418" }}>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>FTT/FTX 구조 비교 — 실제 리스크</div>
            <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.7 }}>{WLFI_DOLOMITE.realRisk}</div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 8, lineHeight: 1.5 }}>
              현재 LTV 21.4%는 숫자상 안전하나, 담보가 자사 토큰 → WLFI $0.021 이하(-73%)에서 청산 위험. 이미 ATH 대비 -76% 하락 상태. 거버넌스 투표로 16B WLFI 추가 해제 시 가격 하락 → 담보가치↓ → 악순환 트리거 가능
            </div>
          </div>
        </div>
      </div>

      {/* Arkham On-chain */}
      <div style={sectionStyle}>
        {sectionTitle("Arkham On-chain — DWF Labs & WLFI 엔터티")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ ...cardStyle, borderLeft: "2px solid #f59e0b" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", marginBottom: 6 }}>DWF Labs ($25.36M)</div>
            <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7 }}>
              WLFI <b>250M</b> ($19.93M) = 포트폴리오의 <span style={{ color: "#ef4444" }}>78.6%</span><br/>
              JST 51.15M ($3.6M) | DEXE 33.8K ($331K)<br/>
              GALA 58.3M ($175K) | SONIC 4.32M ($153K)
            </div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>DWF Labs → WLFI $25M 투자 + WLFI → FF $10M 투자 = 삼각 자본 구조</div>
          </div>
          <div style={{ ...cardStyle, borderLeft: "2px solid #3b82f6" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#3b82f6", marginBottom: 6 }}>World Liberty Fi ($3.286B, 64주소)</div>
            <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7 }}>
              WLFI <b>40.698B</b> ($3.24B) | USD1 37.88M ($37.88M)<br/>
              SOL 18.4K ($1.55M) | USDC 739.6K | USDT 344.4K<br/>
              입금: Bitgo 58%, Binance 24%, Coinbase Prime 12%
            </div>
            <div style={{ fontSize: 11, color: "#888", marginTop: 6 }}>10분 전 USD1 민팅 활동 진행 중 (Arkham 실시간)</div>
          </div>
        </div>
      </div>

      {/* Entry Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Short Entry Scenarios")}
        <div style={{ display: "grid", gap: 12 }}>
          {WLFI_SCENARIOS.map((sc) => {
            const isOpen = expandedScenario === sc.id;
            return (
              <div key={sc.id} style={{ ...cardStyle, borderLeft: `3px solid ${sc.color}`, cursor: "pointer" }} onClick={() => setExpandedScenario(isOpen ? null : sc.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: sc.color }}>#{sc.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f5" }}>{sc.title}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${sc.color}15`, border: `1px solid ${sc.color}33`, color: sc.color, fontWeight: 600 }}>{sc.priority}</span>
                  </div>
                  <span style={{ fontSize: 16, color: "#444" }}>{isOpen ? "▾" : "▸"}</span>
                </div>

                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #14161e" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
                      {[
                        ["진입", sc.entry, sc.color],
                        ["손절", sc.sl, "#ef4444"],
                        ["TP1", sc.tp1, "#34d399"],
                        ["TP2", sc.tp2, "#34d399"],
                      ].map(([label, val, col]) => (
                        <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>진입 시그널</div>
                      <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{sc.signal}</div>
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>근거</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{sc.rationale}</div>
                    </div>
                    <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>리스크</div>
                      <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>{sc.risk}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalyst Timeline */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={{ ...cardStyle, position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 24, top: 20, bottom: 20, width: 2, background: "#1e2028" }} />
          {WLFI_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < WLFI_CATALYSTS.length - 1 ? 16 : 0 }}>
              <div style={{
                position: "absolute", left: -12, top: 4, width: 10, height: 10, borderRadius: "50%",
                background: cat.done ? "#34d399" : "#0c0e14", border: `2px solid ${cat.done ? "#34d399" : "#f59e0b"}`,
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: cat.done ? "#666" : "#f0f0f5", minWidth: 70 }}>{cat.date}</span>
                <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 600,
                  color: cat.done ? "#34d399" : "#f59e0b",
                  background: cat.done ? "rgba(52,211,153,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${cat.done ? "rgba(52,211,153,0.2)" : "rgba(245,158,11,0.2)"}`,
                }}>{cat.done ? "완료" : "대기"}</span>
                <span style={{ fontSize: 11, fontWeight: 600,
                  color: cat.impact === "핵심 촉매" ? "#ef4444" : cat.impact === "방향성 결정" ? "#f59e0b" : "#888",
                }}>{cat.impact}</span>
              </div>
              <div style={{ fontSize: 13, color: cat.done ? "#555" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management */}
      <div style={sectionStyle}>
        {sectionTitle("Risk Management")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {[
            ["레버리지", "10x 이하 권장 (변동성 극대)", "#f59e0b"],
            ["포지션 사이즈", "전체 자본 대비 5% 이하", "#f59e0b"],
            ["손절 필수", "$0.105 이상 회복 시 즉시 손절", "#ef4444"],
            ["슬리피지 주의", "OI $255M 안정적이나 급변 시 확대", "#888"],
            ["지금 바로 진입 비추", "ATL에서 숏 = 기술적 반등에 물릴 가능성", "#ef4444"],
            ["$25M 상환 효과", "미미한 호재 + 과매도 = 단기 반등 여지", "#34d399"],
          ].map(([title, desc, col]) => (
            <div key={title} style={{ ...cardStyle, padding: "12px 14px", borderLeft: `2px solid ${col}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: col, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: CoinGecko · CoinGlass · CoinDesk · Yahoo Finance · CoinMarketCap · Crypto.news · CoinGabbar · BlockMedia
      </div>
    </div>
  );
}

// ============================================================
// BABY Analysis Component
// ============================================================
function BABYAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>BABY</span>
        <span style={{ fontSize: 14, color: "#888" }}>Babylon · BTC Staking</span>
        <span style={{ fontSize: 11, color: "#34d399", background: "#0d1f15", padding: "3px 8px", borderRadius: 4, border: "1px solid #1a3a25", fontWeight: 700 }}>LONG/SHORT ANALYSIS</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-11 · Sources: TradingView, CoinGecko, CoinGlass, Tokenomist, Community</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #0d1f15 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #1a3a25", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#34d399" }}>LONG BIAS — 과매도 반등 + 스퀴즈 대기</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>RSI 30 이하 과매도. 숏 우세 Funding. $0.012-0.013 지지 매수 → $0.018-0.020 익절. 5월 스퀴즈 패턴 주목</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["추세", "약세 (바닥)", "#f59e0b"], ["RSI", "29.87", "#34d399"], ["Funding", "숏 우세", "#34d399"], ["수급", "언락 시작", "#ef4444"]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", BABY_MARKET.price, "#f0f0f5", true],
            ["24h 변동", BABY_TECHNICALS.change24h, "#34d399", false],
            ["7d 변동", BABY_TECHNICALS.change7d, "#34d399", false],
            ["30d 변동", BABY_TECHNICALS.change30d, "#34d399", false],
            ["시가총액", BABY_MARKET.mcap, "#ccc", false],
            ["FDV", BABY_MARKET.fdv, "#ccc", false],
            ["유통량", BABY_MARKET.circulating, "#ccc", false],
            ["ATH Drop", BABY_MARKET.athDrop, "#ef4444", false],
            ["OI (미결제약정)", BABY_MARKET.oi, "#60a5fa", false],
            ["OI 3월 고점", BABY_MARKET.oiPeak, "#888", false],
            ["Funding Rate", BABY_MARKET.fundingRate, "#34d399", false],
            ["24h 선물거래량", BABY_MARKET.volFutures, "#ccc", false],
            ["24h 청산", BABY_MARKET.liq24h, "#f59e0b", false],
            ["ATL", `${BABY_MARKET.atlPrice} (${BABY_MARKET.atlDate})`, "#888", false],
            ["ATH", `${BABY_MARKET.athPrice} (${BABY_MARKET.athDate})`, "#888", false],
            ["최대공급", BABY_MARKET.maxSupply, "#f59e0b", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Indicators */}
      <div style={sectionStyle}>
        {sectionTitle("Technical Indicators (TradingView 1D)")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>차트 지표</div>
            {[
              ["RSI (14)", BABY_TECHNICALS.rsi, "#34d399"],
              ["EMA", BABY_TECHNICALS.ema, "#ef4444"],
              ["Funding Rate", BABY_TECHNICALS.fundingRate, "#34d399"],
              ["OI 변화", BABY_TECHNICALS.oiChange, "#f59e0b"],
              ["거래량", BABY_TECHNICALS.volumePattern, "#888"],
              ["전체 추세", BABY_TECHNICALS.trend, "#f59e0b"],
            ].map(([label, val, col]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #14161e" }}>
                <span style={{ fontSize: 12, color: "#888" }}>{label}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: col }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {BABY_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#34d399", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(52,211,153,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(52,211,153,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#34d399" : "#ccc", minWidth: 80 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vesting Schedule */}
      <div style={sectionStyle}>
        {sectionTitle("Vesting Schedule — 4/10 Cliff 이후 월간 선형 시작")}
        <div style={cardStyle}>
          <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
            {BABY_VESTING.map((v, i) => (
              <div key={i} style={{ width: `${parseFloat(v.pct)}%`, background: v.color, minWidth: 3 }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {BABY_VESTING.map((v, i) => (
              <div key={i} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#ccc" }}>{v.name}</span>
                  <span style={{ fontSize: 11, color: "#888" }}>{v.amount} ({v.pct})</span>
                </div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>{v.schedule}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "#1a1508", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a2418", fontSize: 12, color: "#d4a54a", lineHeight: 1.6 }}>
            커뮤니티 분석: "백서상 4월부터 물량이 풀리기 시작하나, 과거 패턴 보면 격월 스퀴즈 내는 움직임. DYDX 월별 인센티브 풀리는 날 유사 패턴. 4월보다 5월 단타를 노리면 유효"
          </div>
        </div>
      </div>

      {/* Entry Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios — Long & Short")}
        <div style={{ display: "grid", gap: 12 }}>
          {BABY_SCENARIOS.map((sc) => {
            const isOpen = expandedScenario === sc.id;
            return (
              <div key={sc.id} style={{ ...cardStyle, borderLeft: `3px solid ${sc.color}`, cursor: "pointer" }} onClick={() => setExpandedScenario(isOpen ? null : sc.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: sc.color }}>#{sc.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f5" }}>{sc.title}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${sc.color}15`, border: `1px solid ${sc.color}33`, color: sc.color, fontWeight: 600 }}>{sc.priority}</span>
                  </div>
                  <span style={{ fontSize: 16, color: "#444" }}>{isOpen ? "▾" : "▸"}</span>
                </div>

                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #14161e" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
                      {[
                        ["진입", sc.entry, sc.color],
                        ["손절", sc.sl, "#ef4444"],
                        ["TP1", sc.tp1, "#34d399"],
                        ["TP2", sc.tp2, "#34d399"],
                      ].map(([label, val, col]) => (
                        <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>진입 시그널</div>
                      <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{sc.signal}</div>
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>근거</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{sc.rationale}</div>
                    </div>
                    <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>리스크</div>
                      <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>{sc.risk}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalyst Timeline */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={{ ...cardStyle, position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 24, top: 20, bottom: 20, width: 2, background: "#1e2028" }} />
          {BABY_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < BABY_CATALYSTS.length - 1 ? 16 : 0 }}>
              <div style={{
                position: "absolute", left: -12, top: 4, width: 10, height: 10, borderRadius: "50%",
                background: cat.done ? "#34d399" : "#0c0e14", border: `2px solid ${cat.done ? "#34d399" : "#f59e0b"}`,
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: cat.done ? "#666" : "#f0f0f5", minWidth: 70 }}>{cat.date}</span>
                <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 600,
                  color: cat.done ? "#34d399" : "#f59e0b",
                  background: cat.done ? "rgba(52,211,153,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${cat.done ? "rgba(52,211,153,0.2)" : "rgba(245,158,11,0.2)"}`,
                }}>{cat.done ? "완료" : "대기"}</span>
                <span style={{ fontSize: 11, fontWeight: 600,
                  color: cat.impact === "핵심 이벤트" ? "#ef4444" : cat.impact === "긍정 촉매" ? "#34d399" : cat.impact === "단타 기회" ? "#f59e0b" : "#888",
                }}>{cat.impact}</span>
              </div>
              <div style={{ fontSize: 13, color: cat.done ? "#555" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management */}
      <div style={sectionStyle}>
        {sectionTitle("Risk Management")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {[
            ["레버리지", "3x 이하 권장 (시총 극소, 변동성 극심)", "#f59e0b"],
            ["포지션 사이즈", "전체 자본 대비 3% 이하", "#f59e0b"],
            ["롱 접근", "단타 2~5일. $0.012-0.013 매수 → $0.018-0.020 익절", "#34d399"],
            ["숏 접근", "$0.018-0.020 반등 시에만. 과매도 바닥에서 숏 금지", "#ef4444"],
            ["스퀴즈 주의", "Funding 숏 우세 → 숏커버 랠리 가능. OI 급증 시 경계", "#f59e0b"],
            ["장기 보유 불가", "무한 공급 + 월간 언락 = 보유 가치 희석. 스윙 전용", "#ef4444"],
          ].map(([title, desc, col]) => (
            <div key={title} style={{ ...cardStyle, padding: "12px 14px", borderLeft: `2px solid ${col}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: col, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: TradingView (Velo indicators) · CoinGecko · CoinGlass · Tokenomist · CoinCodex · CoinMarketCap
      </div>
    </div>
  );
}

// ============================================================
// FF (Falcon Finance) Analysis Component
// ============================================================
function FFAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>FF</span>
        <span style={{ fontSize: 14, color: "#888" }}>Falcon Finance · DeFi/Synthetic Dollar</span>
        <span style={{ fontSize: 11, color: "#f59e0b", background: "#1a1508", padding: "3px 8px", borderRadius: 4, border: "1px solid #2a2418", fontWeight: 700 }}>DWF LABS 운전</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-11 · Sources: CoinGecko, CoinGlass, Blockchain Magazine, CoinDesk, On-chain data</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a1508 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #2a2418", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>DWF 분배 진행 중 — 숏 반등 대기 or 매집가 롱</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>촉매 없는 +132% 급등→-40% 하락. DWF 역사적 패턴: 50-82% 되돌림. $0.12-0.13 반등 시 숏, $0.07-0.075 안정화 시 롱</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["Alpha", "+20", "#f59e0b"], ["FR", "극단 음수", "#34d399"], ["CVD", "매수 주도", "#34d399"], ["DWF", "분배 중", "#ef4444"]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", FF_MARKET.price, "#f0f0f5", true],
            ["24h 변동", FF_TECHNICALS.change24h, "#34d399", false],
            ["7d 변동", FF_TECHNICALS.change7d, "#34d399", false],
            ["30d 변동", FF_TECHNICALS.change30d, "#34d399", false],
            ["시가총액", FF_MARKET.mcap, "#ccc", false],
            ["FDV", FF_MARKET.fdv, "#ccc", false],
            ["유통량", FF_MARKET.circulating, "#ccc", false],
            ["ATH Drop", FF_MARKET.athDrop, "#ef4444", false],
            ["24h 레인지", FF_MARKET.range24h, "#f59e0b", false],
            ["24h 거래량", FF_MARKET.vol24h, "#ccc", false],
            ["TVL", FF_MARKET.tvl, "#34d399", false],
            ["카테고리", FF_MARKET.category, "#888", false],
            ["ATL", `${FF_MARKET.atlPrice} (${FF_MARKET.atlDate})`, "#888", false],
            ["ATH", `${FF_MARKET.athPrice} (${FF_MARKET.athDate})`, "#888", false],
            ["김치프리미엄", FF_TECHNICALS.kimchi, "#ccc", false],
            ["거래소", FF_MARKET.exchanges, "#888", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alpha Score + Technicals */}
      <div style={sectionStyle}>
        {sectionTitle("Alpha Score & Technical Indicators")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>Alpha Score (V4 Engine)</div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>+20</span>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#f59e0b", fontWeight: 600 }}>NEUTRAL</span>
            </div>
            {[
              ["Funding Rate", FF_TECHNICALS.fundingRate, "#34d399"],
              ["CVD", FF_TECHNICALS.cvd, "#34d399"],
              ["L/S 비율", FF_TECHNICALS.longShort, "#888"],
              ["테이커", FF_TECHNICALS.taker, "#34d399"],
              ["호가창", FF_TECHNICALS.orderbook, "#34d399"],
              ["청산존", FF_TECHNICALS.liquidation, "#f59e0b"],
              ["F&G", FF_TECHNICALS.fearGreed, "#34d399"],
              ["VWAP", FF_TECHNICALS.vwap, "#ef4444"],
              ["RS (BTC 대비)", FF_TECHNICALS.rs, "#ef4444"],
            ].map(([label, val, col]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #14161e" }}>
                <span style={{ fontSize: 12, color: "#888" }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: col, maxWidth: "55%", textAlign: "right" }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {FF_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#f59e0b", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(245,158,11,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(245,158,11,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#f59e0b" : "#ccc", minWidth: 90 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
            <div style={{ marginTop: 10 }}>
              {[["BB", FF_TECHNICALS.bb, "#888"], ["ATR", FF_TECHNICALS.atr, "#ef4444"]].map(([label, val, col]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "4px 10px" }}>
                  <span style={{ fontSize: 11, color: "#666" }}>{label}</span>
                  <span style={{ fontSize: 11, color: col }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DWF Labs Pattern */}
      <div style={sectionStyle}>
        {sectionTitle("DWF Labs 운전 패턴 — FF 현재 위치")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #f59e0b" }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 12, lineHeight: 1.6 }}>
            DWF Labs = FF 프로젝트 소유자 (보도 기반). 역사적 패턴: YGG +482%→-82%, C98 -67% 수시간, CFX 20x→-57%. <span style={{ color: "#ef4444", fontWeight: 600 }}>Binance 내부조사에서 $300M+ 워시트레이딩 적발→조사관 해고 (WSJ)</span>. 단, FF는 자사 프로젝트→외부 토큰 대비 바닥 방어 유인 존재
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
            {FF_DWF_PATTERN.map((p, i) => {
              const statusColors = { done: "#34d399", active: "#f59e0b", upcoming: "#555" };
              const sc = statusColors[p.status];
              return (
                <div key={i} style={{ background: p.status === "active" ? "rgba(245,158,11,0.08)" : "#0c0e14", borderRadius: 6, padding: "10px 10px", border: `1px solid ${p.status === "active" ? "rgba(245,158,11,0.3)" : "#14161e"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.status === "done" ? sc : "transparent", border: `2px solid ${sc}`, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: sc }}>{p.phase}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#666", marginBottom: 3 }}>{p.duration}</div>
                  <div style={{ fontSize: 11, color: p.status === "active" ? "#f59e0b" : "#888", lineHeight: 1.4 }}>{p.desc}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
              <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>웨일 매집 (온체인)</div>
              <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>7개 신규 지갑이 227.5M FF 매집 (유통의 13%). 거래소 잔고 780M→587M (-25%). 매집 평단 ~$0.074</div>
            </div>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>순환 자본 구조</div>
              <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>WLFI→FF $10M 투자 + DWF→WLFI $25M 투자. USDf 리저브 96% 오프체인. 2025.7 디페그 사건 ($0.98)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenomics */}
      <div style={sectionStyle}>
        {sectionTitle("Tokenomics — 76.6% Locked, 59% 베스팅 미공개")}
        <div style={cardStyle}>
          <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
            {FF_TOKENOMICS.map((v, i) => (
              <div key={i} style={{ width: `${parseFloat(v.pct)}%`, background: v.color, minWidth: 3 }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {FF_TOKENOMICS.map((v, i) => (
              <div key={i} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: `1px solid ${v.schedule === "미공개 (최대 리스크)" || v.schedule === "미공개" ? "#2a1418" : "#14161e"}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#ccc" }}>{v.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: v.color }}>{v.pct}</span>
                </div>
                <div style={{ fontSize: 11, color: v.schedule.includes("미공개") ? "#ef4444" : "#666" }}>{v.schedule}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418", fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>
            Ecosystem(35%) + Foundation(24%) = 59%의 베스팅 일정이 미공개. DWF가 프로젝트 소유자이므로 언제든 이 물량을 시장에 풀 수 있는 구조. TGE(2025.9.29) 기준 Team+Investors 1Y cliff = 2026.9.29 해제 예정
          </div>
        </div>
      </div>

      {/* Arkham Top Holders */}
      <div style={sectionStyle}>
        {sectionTitle("Arkham On-chain — Top Holders (실시간)")}
        <div style={cardStyle}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 0.6fr 1fr", gap: 4, marginBottom: 8, padding: "0 4px" }}>
            {["홀더", "보유량", "비율", "가치"].map((h) => (
              <div key={h} style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{h}</div>
            ))}
          </div>
          {FF_ARKHAM.map((h, i) => {
            const typeColors = { treasury: "#3b82f6", foundation: "#8b5cf6", team: "#ef4444", vesting: "#f59e0b", investors: "#ec4899" };
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 0.6fr 1fr", gap: 4, padding: "6px 4px", borderBottom: "1px solid #14161e" }}>
                <div style={{ fontSize: 12, color: typeColors[h.type] || "#ccc" }}>{h.holder}</div>
                <div style={{ fontSize: 12, color: "#ccc" }}>{h.amount}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{h.pct}</div>
                <div style={{ fontSize: 12, color: "#ccc", fontWeight: 600 }}>{h.usd}</div>
              </div>
            );
          })}
          <div style={{ marginTop: 8, fontSize: 11, color: "#888" }}>Source: Arkham Intelligence · 프로젝트가 44.3억개 (42%) 직접 보유. DWF Labs 포트폴리오에 FF 미표시 (동일 소유자)</div>
        </div>
      </div>

      {/* Entry Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios")}
        <div style={{ display: "grid", gap: 12 }}>
          {FF_SCENARIOS.map((sc) => {
            const isOpen = expandedScenario === sc.id;
            return (
              <div key={sc.id} style={{ ...cardStyle, borderLeft: `3px solid ${sc.color}`, cursor: "pointer" }} onClick={() => setExpandedScenario(isOpen ? null : sc.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: sc.color }}>#{sc.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f5" }}>{sc.title}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${sc.color}15`, border: `1px solid ${sc.color}33`, color: sc.color, fontWeight: 600 }}>{sc.priority}</span>
                  </div>
                  <span style={{ fontSize: 16, color: "#444" }}>{isOpen ? "▾" : "▸"}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #14161e" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
                      {[["진입", sc.entry, sc.color], ["손절", sc.sl, "#ef4444"], ["TP1", sc.tp1, "#34d399"], ["TP2", sc.tp2, "#34d399"]].map(([label, val, col]) => (
                        <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>진입 시그널</div>
                      <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{sc.signal}</div>
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>근거</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{sc.rationale}</div>
                    </div>
                    <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>리스크</div>
                      <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>{sc.risk}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalyst Timeline */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={{ ...cardStyle, position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 24, top: 20, bottom: 20, width: 2, background: "#1e2028" }} />
          {FF_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < FF_CATALYSTS.length - 1 ? 16 : 0 }}>
              <div style={{
                position: "absolute", left: -12, top: 4, width: 10, height: 10, borderRadius: "50%",
                background: cat.done ? "#34d399" : "#0c0e14", border: `2px solid ${cat.done ? "#34d399" : "#f59e0b"}`,
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: cat.done ? "#666" : "#f0f0f5", minWidth: 70 }}>{cat.date}</span>
                <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 600,
                  color: cat.done ? "#34d399" : "#f59e0b",
                  background: cat.done ? "rgba(52,211,153,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${cat.done ? "rgba(52,211,153,0.2)" : "rgba(245,158,11,0.2)"}`,
                }}>{cat.done ? "완료" : "대기"}</span>
                <span style={{ fontSize: 11, fontWeight: 600,
                  color: cat.impact === "최대 리스크" ? "#ef4444" : cat.impact === "대규모 언락" ? "#ef4444" : cat.impact === "펀더멘털" ? "#34d399" : "#888",
                }}>{cat.impact}</span>
              </div>
              <div style={{ fontSize: 13, color: cat.done ? "#555" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management */}
      <div style={sectionStyle}>
        {sectionTitle("Risk Management — DWF 운전 토큰 주의사항")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {[
            ["레버리지", "3x 이하 (ATR 6.01%, 변동성 극중)", "#f59e0b"],
            ["포지션 사이즈", "전체 자본 대비 2% 이하 (극고위험)", "#ef4444"],
            ["숏 가능 여부", "Binance FFUSDT perp 존재. Bybit/OKX도 확인 필요. 펀딩레이트 극단 음수 = 숏 비용 높음", "#f59e0b"],
            ["DWF 카운터파티", "DWF가 MM → 포지션 노출 가능. 유동성 조작으로 스탑 사냥 위험", "#ef4444"],
            ["+25% = 안전 이탈", "DWF 토큰 역사적으로 +25% 후 급반전 빈번", "#f59e0b"],
            ["$0.075-0.085 데드존", "숏 TP($0.085)와 롱 진입($0.075) 사이 갭. 이 구간은 관망", "#888"],
            ["59% 물량 미공개", "Ecosystem+Foundation 59% 언제든 시장 방출 가능", "#ef4444"],
            ["실제 프로덕트 존재", "TVL $2B, USDf 1.9B. 자사 프로젝트→바닥 방어 유인 있음", "#34d399"],
          ].map(([title, desc, col]) => (
            <div key={title} style={{ ...cardStyle, padding: "12px 14px", borderLeft: `2px solid ${col}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: col, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sources */}
      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: CoinGecko · CoinGlass · Blockchain Magazine · CoinDesk · The Block · Messari · Tokenomist · CryptoRank · Metaverse Post · DWF Labs Research
      </div>
    </div>
  );
}

// ============================================================
// ARIA (AriaAI) Analysis Component
// ============================================================
function ARIAAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>ARIA</span>
        <span style={{ fontSize: 14, color: "#888" }}>AriaAI · GameFi/AI Gaming · BNB Chain</span>
        <span style={{ fontSize: 11, color: "#8b5cf6", background: "#150d1f", padding: "3px 8px", borderRadius: 4, border: "1px solid #251a3a", fontWeight: 700 }}>CRASH RECOVERY</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-11 · Sources: CoinGecko, CryptoTimes, Blockchain Magazine, On-chain Radar</div>

      {/* Verdict */}
      <div style={{ background: "linear-gradient(135deg, #150d1f 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #251a3a", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#8b5cf6", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#8b5cf6" }}>혼재 — 크래시 회복 vs 온체인 매도 경고</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>4/9 ATH→-83% 크래시 후 $0.54 회복. 온체인 매수($90K/hr)와 프레시 매도 동시 관찰. 레버리지 51:1 극단. $0.40-0.45 지지 매수 or $0.60+ 저항 숏</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["크래시", "-83% → 회복", "#f59e0b"], ["선물/현물", "51:1", "#ef4444"], ["온체인", "매수+매도 혼재", "#8b5cf6"], ["물량", "81.7% 락업", "#f59e0b"]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", ARIA_MARKET.price, "#f0f0f5", true],
            ["30d 변동", ARIA_TECHNICALS.change30d, "#34d399", false],
            ["7d 변동", ARIA_TECHNICALS.change7d, "#ef4444", false],
            ["ATH Drop", ARIA_MARKET.athDrop, "#ef4444", false],
            ["시가총액", ARIA_MARKET.mcap, "#ccc", false],
            ["FDV", ARIA_MARKET.fdv, "#ccc", false],
            ["유통량", ARIA_MARKET.circulating, "#ccc", false],
            ["카테고리", ARIA_MARKET.category, "#888", false],
            ["OI", ARIA_MARKET.oi, "#60a5fa", false],
            ["24h 청산", ARIA_MARKET.liq24h, "#ef4444", false],
            ["24h 거래량", ARIA_MARKET.vol24h, "#ccc", false],
            ["선물 거래량", ARIA_MARKET.volFutures, "#ef4444", false],
            ["크래시 상세", ARIA_MARKET.crashDetail, "#f59e0b", false],
            ["ATL", `${ARIA_MARKET.atlPrice} (${ARIA_MARKET.atlDate})`, "#888", false],
            ["파생상품", ARIA_MARKET.futuresExchanges, "#888", false],
            ["거래소", ARIA_MARKET.exchanges, "#888", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* On-chain + Technicals */}
      <div style={sectionStyle}>
        {sectionTitle("On-chain Activity & Risk Indicators")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>온체인 신호 (혼재)</div>
            {[
              ["선물/현물 비율", ARIA_TECHNICALS.futuresSpotRatio, "#ef4444"],
              ["거래량/시총 비율", ARIA_TECHNICALS.volMcapRatio, "#ef4444"],
              ["4H 청산 지배", ARIA_TECHNICALS.liqDominance, "#ef4444"],
              ["스마트머니 매도", ARIA_TECHNICALS.smartMoney, "#f59e0b"],
              ["웨일 매집", ARIA_TECHNICALS.whaleAccum, "#34d399"],
              ["실시간 매수", ARIA_TECHNICALS.onchainBuy, "#34d399"],
              ["프레시 매도", ARIA_TECHNICALS.onchainSell, "#ef4444"],
              ["컨트랙트 리스크", ARIA_TECHNICALS.contractRisk, "#ef4444"],
            ].map(([label, val, col]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #14161e" }}>
                <span style={{ fontSize: 12, color: "#888", minWidth: 100 }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: col, maxWidth: "55%", textAlign: "right" }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {ARIA_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#8b5cf6", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(139,92,246,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#8b5cf6" : "#ccc", minWidth: 80 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Crash Analysis */}
      <div style={sectionStyle}>
        {sectionTitle("4/9 크래시 분석 — ATH $0.78 → $0.10 (-83%)")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #8b5cf6" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>크래시 원인 1: Sentinacle 경고</div>
              <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>스마트컨트랙트 소스코드 미검증 — "블랙박스". 백도어/경제적 취약점 은닉 가능. 홀더 집중도 분석 불가</div>
            </div>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>크래시 원인 2: 레버리지 언와인드</div>
              <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>선물/현물 51:1. $83M OI + 얇은 현물 유동성. 소규모 반전 → 청산 캐스케이드. 60+ 페어 동시 -65~66% 하락</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0d1f15", borderRadius: 6, padding: "10px 12px", border: "1px solid #1a3a25" }}>
              <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, marginBottom: 4 }}>회복 근거</div>
              <div style={{ fontSize: 12, color: "#88ccaa", lineHeight: 1.6 }}>실제 프로덕트(AI RPG). Animoca/Galaxy/Spartan/Folius 투자. $5M+ 펀딩. 크래시 저점에서 +420% 회복. 온체인 매수 $90K/hr</div>
            </div>
            <div style={{ background: "#150d1f", borderRadius: 6, padding: "10px 12px", border: "1px solid #251a3a" }}>
              <div style={{ fontSize: 11, color: "#8b5cf6", fontWeight: 600, marginBottom: 4 }}>DWF 연관 정황 (미확인)</div>
              <div style={{ fontSize: 12, color: "#aa88cc", lineHeight: 1.6 }}>유통 물량 집중 보유 정황. SIREN 토큰과 유사 패턴 (BNB Chain + Binance Alpha). 단, 직접 증거 없음</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tokenomics */}
      <div style={sectionStyle}>
        {sectionTitle("Tokenomics — 81.7% Locked")}
        <div style={cardStyle}>
          <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 12 }}>
            {ARIA_TOKENOMICS.map((v, i) => (
              <div key={i} style={{ width: `${parseFloat(v.pct)}%`, background: v.color, minWidth: 3 }} />
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {ARIA_TOKENOMICS.map((v, i) => (
              <div key={i} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: v.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#ccc" }}>{v.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: v.color }}>{v.pct}</span>
                </div>
                <div style={{ fontSize: 11, color: "#666" }}>{v.schedule}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, color: "#888", lineHeight: 1.6, background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
            TGE: 2025.8.21. Team(15%)+Investors(8.5%) = 23.5%가 12M cliff 후 해제 → <span style={{ color: "#ef4444", fontWeight: 600 }}>2026년 8월 대규모 언락 예정</span>. FDV/MCap = 5.5x — 희석 압력 상당
          </div>
        </div>
      </div>

      {/* Entry Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios — Long & Short")}
        <div style={{ display: "grid", gap: 12 }}>
          {ARIA_SCENARIOS.map((sc) => {
            const isOpen = expandedScenario === sc.id;
            return (
              <div key={sc.id} style={{ ...cardStyle, borderLeft: `3px solid ${sc.color}`, cursor: "pointer" }} onClick={() => setExpandedScenario(isOpen ? null : sc.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: sc.color }}>#{sc.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f5" }}>{sc.title}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${sc.color}15`, border: `1px solid ${sc.color}33`, color: sc.color, fontWeight: 600 }}>{sc.priority}</span>
                  </div>
                  <span style={{ fontSize: 16, color: "#444" }}>{isOpen ? "▾" : "▸"}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #14161e" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
                      {[["진입", sc.entry, sc.color], ["손절", sc.sl, "#ef4444"], ["TP1", sc.tp1, "#34d399"], ["TP2", sc.tp2, "#34d399"]].map(([label, val, col]) => (
                        <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>진입 시그널</div>
                      <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{sc.signal}</div>
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>근거</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{sc.rationale}</div>
                    </div>
                    <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>리스크</div>
                      <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>{sc.risk}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalyst Timeline */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={{ ...cardStyle, position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 24, top: 20, bottom: 20, width: 2, background: "#1e2028" }} />
          {ARIA_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < ARIA_CATALYSTS.length - 1 ? 16 : 0 }}>
              <div style={{
                position: "absolute", left: -12, top: 4, width: 10, height: 10, borderRadius: "50%",
                background: cat.done ? "#34d399" : "#0c0e14", border: `2px solid ${cat.done ? "#34d399" : "#f59e0b"}`,
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: cat.done ? "#666" : "#f0f0f5", minWidth: 70 }}>{cat.date}</span>
                <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 600,
                  color: cat.done ? "#34d399" : "#f59e0b",
                  background: cat.done ? "rgba(52,211,153,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${cat.done ? "rgba(52,211,153,0.2)" : "rgba(245,158,11,0.2)"}`,
                }}>{cat.done ? "완료" : "대기"}</span>
                <span style={{ fontSize: 11, fontWeight: 600,
                  color: cat.impact === "크래시" ? "#ef4444" : cat.impact === "대규모 언락" ? "#ef4444" : cat.impact === "펀더멘털" ? "#34d399" : "#888",
                }}>{cat.impact}</span>
              </div>
              <div style={{ fontSize: 13, color: cat.done ? "#555" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management */}
      <div style={sectionStyle}>
        {sectionTitle("Risk Management")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {[
            ["레버리지", "2x 이하 (선물/현물 51:1, 청산 캐스케이드 재발 가능)", "#ef4444"],
            ["포지션 사이즈", "전체 자본 대비 2% 이하 (크래시 이력 -83%)", "#ef4444"],
            ["스마트컨트랙트", "소스코드 미검증. Sentinacle '블랙박스' 경고. 추가 취약점 가능", "#ef4444"],
            ["온체인 모니터링", "매수(0x65b...) + 매도(프레시 지갑) 동시. BscScan 추적 필수", "#f59e0b"],
            ["8월 언락 주의", "Team+Investors 23.5% cliff 해제 (2026.8.21). 2개월 전부터 선반영", "#f59e0b"],
            ["실제 프로덕트", "AI RPG + VC 투자(Animoca/Galaxy). 완전 스캠은 아님", "#34d399"],
          ].map(([title, desc, col]) => (
            <div key={title} style={{ ...cardStyle, padding: "12px 14px", borderLeft: `2px solid ${col}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: col, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: CoinGecko · CryptoTimes · Blockchain Magazine · AInvest · CoinEdition · CryptoRank · On-chain Radar (Telegram)
      </div>
    </div>
  );
}

// ============================================================
// VVV (Venice Token) Analysis Component
// ============================================================
function VVVAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>VVV</span>
        <span style={{ fontSize: 14, color: "#888" }}>Venice AI · Privacy AI Inference · Base L2</span>
        <span style={{ fontSize: 11, color: "#06b6d4", background: "#0a1a1f", padding: "3px 8px", borderRadius: 4, border: "1px solid #153a45", fontWeight: 700 }}>WINTERMUTE 매수 주도</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-11 · Sources: CoinGecko, Venice.ai, Bankless Times, On-chain Radar, Arkham</div>

      {/* Verdict */}
      <div style={{ background: "linear-gradient(135deg, #0a1a1f 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #153a45", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#06b6d4", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#06b6d4" }}>강한 업트렌드 — 조정 시 롱 or $10 저항 숏</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>60일 +383%. Wintermute DEX 매수 주도. 바이백&번 가속. Binance 미상장=잠재 촉매. 단, 런칭 덤핑 전력 주의</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["60d", "+383%", "#34d399"], ["소각", "42.3%", "#06b6d4"], ["Wintermute", "매수 중", "#34d399"], ["ATH", "-62.6%", "#f59e0b"]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", VVV_MARKET.price, "#f0f0f5", true],
            ["7d", VVV_MARKET.change7d, "#34d399", false],
            ["30d", VVV_MARKET.change30d, "#34d399", false],
            ["60d", VVV_MARKET.change60d, "#34d399", false],
            ["시가총액", VVV_MARKET.mcap, "#ccc", false],
            ["FDV", VVV_MARKET.fdv, "#ccc", false],
            ["유통량", VVV_MARKET.circulating, "#ccc", false],
            ["ATH Drop", VVV_MARKET.athDrop, "#ef4444", false],
            ["소각", VVV_MARKET.burned, "#06b6d4", false],
            ["에미션", VVV_MARKET.emissions, "#888", false],
            ["스테이킹", VVV_MARKET.stakingApy, "#34d399", false],
            ["24h 거래량", VVV_MARKET.vol24h, "#ccc", false],
            ["Binance", VVV_MARKET.notListed, "#f59e0b", false],
            ["ATL", `${VVV_MARKET.atlPrice} (${VVV_MARKET.atlDate})`, "#888", false],
            ["카테고리", VVV_MARKET.category, "#888", false],
            ["거래소", VVV_MARKET.exchanges, "#888", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wintermute + Technicals */}
      <div style={sectionStyle}>
        {sectionTitle("Wintermute 온체인 활동 & 지표")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>핵심 지표</div>
            {[
              ["추세", VVV_TECHNICALS.trend, "#34d399"],
              ["Wintermute", VVV_TECHNICALS.wintermute, "#f59e0b"],
              ["스테이킹", VVV_TECHNICALS.staking, "#888"],
              ["DIEM 시스템", VVV_TECHNICALS.diem, "#06b6d4"],
              ["바이백&번", VVV_TECHNICALS.burnRate, "#06b6d4"],
              ["GoPlus 경고", VVV_TECHNICALS.goplus, "#ef4444"],
              ["창업자", VVV_TECHNICALS.founder, "#888"],
            ].map(([label, val, col]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px 0", borderBottom: "1px solid #14161e" }}>
                <span style={{ fontSize: 12, color: "#888", minWidth: 80 }}>{label}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: col, maxWidth: "60%", textAlign: "right" }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {VVV_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#06b6d4", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(6,182,212,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(6,182,212,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#06b6d4" : "#ccc", minWidth: 80 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Arkham Top Holders */}
      <div style={sectionStyle}>
        {sectionTitle("Arkham On-chain — Top Holders & Flows")}
        <div style={cardStyle}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 0.6fr 1fr", gap: 4, marginBottom: 8, padding: "0 4px" }}>
            {["홀더", "보유량", "비율", "가치"].map((h) => (
              <div key={h} style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{h}</div>
            ))}
          </div>
          {VVV_ARKHAM.map((h, i) => {
            const typeColors = { staking: "#06b6d4", treasury: "#3b82f6", vesting: "#f59e0b" };
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 0.6fr 1fr", gap: 4, padding: "6px 4px", borderBottom: "1px solid #14161e" }}>
                <div style={{ fontSize: 12, color: typeColors[h.type] || "#ccc" }}>{h.holder}</div>
                <div style={{ fontSize: 12, color: "#ccc" }}>{h.amount}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{h.pct}</div>
                <div style={{ fontSize: 12, color: "#ccc", fontWeight: 600 }}>{h.usd}</div>
              </div>
            );
          })}
          <div style={{ marginTop: 8, fontSize: 11, color: "#06b6d4" }}>스테이킹 컨트랙트에 32.4M (71.3%) 락업 — 대량 출금 = 매도 7일 전 경고. Wintermute 7일 +128K 순매수 확인</div>
        </div>
      </div>

      {/* Wintermute History Warning */}
      <div style={sectionStyle}>
        {sectionTitle("Wintermute 이력 — 런칭 덤핑 vs 현재 매수")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #f59e0b" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>2025.01 런칭 (덤핑)</div>
              <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>총 공급의 5.5% 마켓메이커 할당 수령 후 CEX 상장 전 DEX에서 즉시 덤핑. ATH $22.58→$2.44 (-89%) 2주 내 폭락. 온체인 분석가 Amir Ormu 적발</div>
            </div>
            <div style={{ background: "#0d1f15", borderRadius: 6, padding: "10px 12px", border: "1px solid #1a3a25" }}>
              <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, marginBottom: 4 }}>2026.04 현재 (매수 주도)</div>
              <div style={{ fontSize: 12, color: "#88ccaa", lineHeight: 1.6 }}>Wintermute + 봇 지갑들이 DEX에서 적극 매수. 가격 상승 주도. 일부 지갑에 새 매수 유동성 준비. 런칭과 정반대 행동</div>
            </div>
          </div>
          <div style={{ marginTop: 10, background: "#1a1508", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a2418", fontSize: 12, color: "#d4a54a", lineHeight: 1.6 }}>
            핵심 질문: 현재 매수는 (1) 진정한 포지션 구축인가, (2) 더 높은 가격에서 분배하기 위한 펌핑인가? 런칭 시 $19에서 덤핑한 전력 감안, 온체인 모니터링으로 매도 전환 시점을 잡는 것이 핵심
          </div>
        </div>
      </div>

      {/* Entry Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios")}
        <div style={{ display: "grid", gap: 12 }}>
          {VVV_SCENARIOS.map((sc) => {
            const isOpen = expandedScenario === sc.id;
            return (
              <div key={sc.id} style={{ ...cardStyle, borderLeft: `3px solid ${sc.color}`, cursor: "pointer" }} onClick={() => setExpandedScenario(isOpen ? null : sc.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 14, fontWeight: 800, color: sc.color }}>#{sc.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f5" }}>{sc.title}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${sc.color}15`, border: `1px solid ${sc.color}33`, color: sc.color, fontWeight: 600 }}>{sc.priority}</span>
                  </div>
                  <span style={{ fontSize: 16, color: "#444" }}>{isOpen ? "▾" : "▸"}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #14161e" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
                      {[["진입", sc.entry, sc.color], ["손절", sc.sl, "#ef4444"], ["TP1", sc.tp1, "#34d399"], ["TP2", sc.tp2, "#34d399"]].map(([label, val, col]) => (
                        <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>진입 시그널</div>
                      <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{sc.signal}</div>
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>근거</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{sc.rationale}</div>
                    </div>
                    <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>리스크</div>
                      <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>{sc.risk}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalyst Timeline */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={{ ...cardStyle, position: "relative", paddingLeft: 28 }}>
          <div style={{ position: "absolute", left: 24, top: 20, bottom: 20, width: 2, background: "#1e2028" }} />
          {VVV_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ position: "relative", marginBottom: i < VVV_CATALYSTS.length - 1 ? 16 : 0 }}>
              <div style={{
                position: "absolute", left: -12, top: 4, width: 10, height: 10, borderRadius: "50%",
                background: cat.done ? "#34d399" : "#0c0e14", border: `2px solid ${cat.done ? "#34d399" : "#f59e0b"}`,
              }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 3 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: cat.done ? "#666" : "#f0f0f5", minWidth: 80 }}>{cat.date}</span>
                <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 600,
                  color: cat.done ? "#34d399" : "#f59e0b",
                  background: cat.done ? "rgba(52,211,153,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${cat.done ? "rgba(52,211,153,0.2)" : "rgba(245,158,11,0.2)"}`,
                }}>{cat.done ? "완료" : "대기"}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: cat.impact === "잠재 촉매" ? "#06b6d4" : "#888" }}>{cat.impact}</span>
              </div>
              <div style={{ fontSize: 13, color: cat.done ? "#555" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Management */}
      <div style={sectionStyle}>
        {sectionTitle("Risk Management")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {[
            ["레버리지", "5x 이하 (업트렌드지만 변동성 큼)", "#f59e0b"],
            ["포지션 사이즈", "전체 자본 대비 3% 이하", "#f59e0b"],
            ["Wintermute 전환 감시", "매수→매도 전환 시 즉시 롱 청산. 온체인 모니터링 가동 중", "#ef4444"],
            ["스테이킹 유출", "0x321b... 지갑 출금 감지 → 7일 후 매도 예측. 선제 숏 기회", "#f59e0b"],
            ["GoPlus 경고", "컨트랙트 소유자 매도 비활성화/민팅 가능. 중앙화 리스크", "#ef4444"],
            ["실제 프로덕트", "1.3M유저, 45B토큰/일. Erik Voorhees. 바이백&번 가속 중", "#34d399"],
          ].map(([title, desc, col]) => (
            <div key={title} style={{ ...cardStyle, padding: "12px 14px", borderLeft: `2px solid ${col}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: col, marginBottom: 3 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: CoinGecko · Venice.ai · Bankless Times · CCN · Arkham Intelligence · On-chain Radar · Bitget News · CryptoBriefing
      </div>
    </div>
  );
}

// ============================================================
// GWEI + SKYAI Combined Analysis
// ============================================================
// ============================================================
// SKYAI Standalone Analysis Component
// ============================================================
function SkyaiAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>SKYAI</span>
        <span style={{ fontSize: 14, color: "#888" }}>SkyAI · BNB Chain</span>
        <span style={{ fontSize: 11, color: "#ef4444", background: "#1a0a0e", padding: "3px 8px", borderRadius: 4, border: "1px solid #2a1418", fontWeight: 700 }}>DERIVATIVES OVERHEATED</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-11 · Sources: TradingView (Binance Futures), Velo, Arkham, CoinGecko</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a0a0e 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #2a1418", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#ef4444" }}>SIREN 패턴 + 파생상품 극단 과열 — 숏 우선</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>펀딩비 0.2058%, OI/MCap 2.35x, MA200 대비 +253%. 역사적 과열 시그널 전부 점등</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["펀딩비", "0.2058%", "#ef4444"], ["OI/MCap", "2.35x", "#ef4444"], ["MA200 이격", "+253%", "#ef4444"], ["SIREN", "패턴 매치", "#f59e0b"]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center", minWidth: 70 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", SKYAI_MARKET.price, "#f0f0f5", true],
            ["24h 변동", SKYAI_MARKET.change24h, "#34d399", false],
            ["7d 변동", SKYAI_MARKET.change7d, "#34d399", false],
            ["30d 변동", SKYAI_MARKET.change30d, "#34d399", false],
            ["시가총액", SKYAI_MARKET.mcap, "#ccc", false],
            ["FDV", SKYAI_MARKET.fdv, "#ccc", false],
            ["유통량", SKYAI_MARKET.circulating, "#ccc", false],
            ["ATH", `${SKYAI_MARKET.athPrice} (${SKYAI_MARKET.athDate})`, "#34d399", false],
            ["OI (미결제약정)", SKYAI_MARKET.oi, "#ef4444", true],
            ["OI/MCap 비율", SKYAI_MARKET.oiMcapRatio, "#ef4444", false],
            ["펀딩비 (8H)", SKYAI_MARKET.fundingRate, "#ef4444", false],
            ["24h 청산", SKYAI_MARKET.liq24h, "#f59e0b", false],
            ["24h 거래량", SKYAI_MARKET.vol24h, "#ccc", false],
            ["Volume SMA", SKYAI_MARKET.volumeSma, "#ccc", false],
            ["ATL", `${SKYAI_MARKET.atlPrice} (${SKYAI_MARKET.atlDate})`, "#888", false],
            ["거래소", SKYAI_MARKET.exchanges, "#888", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Derivatives Overheating Alert */}
      <div style={sectionStyle}>
        {sectionTitle("파생상품 과열 경고 — 핵심 숏 근거")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, padding: "10px 14px", background: "#1a0a0e", borderRadius: 6, border: "1px solid #2a1418" }}>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>Funding Rate</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>0.2058%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>연환산</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>~750%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>OI / MCap</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>2.35x</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>OI 급증</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>+647%</div>
            </div>
            <div style={{ fontSize: 11, color: "#888", marginLeft: "auto" }}>Velo · Binance Futures</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              ["롱 청산", "1.385M", "#ef4444"],
              ["숏 청산", "722K", "#34d399"],
              ["청산 비율", "L:S = 1.92:1", "#f59e0b"],
            ].map(([label, val, col]) => (
              <div key={label}>
                <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "12px 14px", border: "1px solid #2a1418" }}>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>과열 시그널 종합</div>
            <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.7 }}>
              펀딩비 0.2058% = 롱이 숏에게 8시간마다 0.2% 지불. 연환산 ~750%. 롱 포지션 유지비만으로 자본 소멸 속도 극대.
              OI $298.9M이 시총 $127M의 2.35배 = 가격 10% 하락 시 레버리지 롱 연쇄 청산 불가피.
              1개월 내 OI 40M → 299M (+647%) 급증 = 투기적 레버리지 집중.
              역사적으로 펀딩비 0.2%+ 구간에서 반전한 사례 다수 (PEPE -35%, BONK -40%, WIF -45%).
            </div>
          </div>
        </div>
      </div>

      {/* Technical Indicators */}
      <div style={sectionStyle}>
        {sectionTitle("Technical Indicators")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Moving Averages */}
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>이동평균 — 전부 하방 (극단 이격)</div>
            {[
              ["MA14", SKYAI_TECHNICALS.ma14, "$0.127 대비 +75.6%"],
              ["MA21", SKYAI_TECHNICALS.ma21, "$0.127 대비 +86.8%"],
              ["MA35", SKYAI_TECHNICALS.ma35, "$0.127 대비 +116%"],
              ["MA50", SKYAI_TECHNICALS.ma50, "$0.127 대비 +134%"],
              ["MA100", SKYAI_TECHNICALS.ma100, "$0.127 대비 +173%"],
              ["MA200", SKYAI_TECHNICALS.ma200, "$0.127 대비 +253%"],
            ].map(([label, val, note]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #14161e" }}>
                <span style={{ fontSize: 12, color: "#888", minWidth: 50 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa" }}>{val}</span>
                <span style={{ fontSize: 10, color: "#ef4444" }}>{note}</span>
              </div>
            ))}
            <div style={{ marginTop: 8, padding: "6px 10px", background: "#1a0a0e", borderRadius: 4, border: "1px solid #2a1418" }}>
              <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 600 }}>VPVR: </span>
              <span style={{ fontSize: 11, color: "#ef8888" }}>{SKYAI_TECHNICALS.vpvr}</span>
            </div>
          </div>

          {/* Support / Resistance */}
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {SKYAI_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#34d399", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(52,211,153,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(52,211,153,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#34d399" : "#ccc", minWidth: 100 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SIREN Pattern + Red Flags */}
      <div style={sectionStyle}>
        {sectionTitle("SIREN 패턴 매치 + Red Flags")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Red Flags — SIREN 패턴</div>
            {SKYAI_DATA.redFlags.map((f, i) => (
              <div key={i} style={{ fontSize: 11, color: "#ef8888", lineHeight: 1.6, paddingLeft: 10, borderLeft: "2px solid #2a1418", marginBottom: 4 }}>{f}</div>
            ))}
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Arkham On-chain: 0x5a26...</div>
            <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7 }}>
              잔액: <b>$1,105,758</b> (SKYAI Whale 태그)<br/>
              보유: 9.45M SKYAI ($1.11M)<br/>
              2-3주 전: <span style={{ color: "#ef4444" }}>$91-93K씩 동일 금액 반복 분배</span><br/>
              다수 서브 지갑으로 정기 배분 = 조직적 분산<br/>
              <span style={{ color: "#ef4444" }}>SIREN 동일 패턴: 52/54 지갑 = 1 엔터티</span>
            </div>
            <div style={{ marginTop: 10, padding: "8px 10px", background: "#0d1f15", borderRadius: 4, border: "1px solid #1a3a25" }}>
              <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, marginBottom: 4 }}>Green Flags (제한적)</div>
              {SKYAI_DATA.greenFlags.map((f, i) => (
                <div key={i} style={{ fontSize: 11, color: "#88ccaa", lineHeight: 1.5 }}>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Entry Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios")}
        <div style={{ display: "grid", gap: 12 }}>
          {SKYAI_SCENARIOS_FULL.map((sc) => {
            const isOpen = expandedScenario === sc.id;
            return (
              <div key={sc.id} style={{ ...cardStyle, borderLeft: `3px solid ${sc.color}`, cursor: "pointer" }} onClick={() => setExpandedScenario(isOpen ? null : sc.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f5" }}>{sc.title}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${sc.color}15`, border: `1px solid ${sc.color}33`, color: sc.color, fontWeight: 600 }}>{sc.priority}</span>
                  </div>
                  <span style={{ fontSize: 16, color: "#444" }}>{isOpen ? "▾" : "▸"}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #14161e" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
                      {[["진입", sc.entry, sc.color], ["손절", sc.sl, "#ef4444"], ["TP1", sc.tp1, "#34d399"], ["TP2", sc.tp2, "#34d399"]].map(([label, val, col]) => (
                        <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>시그널</div>
                      <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{sc.signal}</div>
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>근거</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{sc.rationale}</div>
                    </div>
                    <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>리스크</div>
                      <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>{sc.risk}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalyst Timeline */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={cardStyle}>
          {SKYAI_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", borderBottom: i < SKYAI_CATALYSTS.length - 1 ? "1px solid #14161e" : "none" }}>
              <div style={{ minWidth: 70, fontSize: 12, fontWeight: 700, color: cat.done ? "#555" : "#f0f0f5" }}>{cat.date}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: cat.done ? "#888" : "#ccc", lineHeight: 1.5, textDecoration: cat.done ? "none" : "none" }}>{cat.event}</div>
              </div>
              <div style={{ minWidth: 80, textAlign: "right" }}>
                <span style={{
                  fontSize: 10, padding: "2px 6px", borderRadius: 3, fontWeight: 600,
                  background: cat.done ? "rgba(107,114,128,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${cat.done ? "rgba(107,114,128,0.2)" : "rgba(239,68,68,0.2)"}`,
                  color: cat.done ? "#6b7280" : "#ef4444",
                }}>{cat.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: TradingView (Binance Futures SKYAIUSDT Daily) · Velo Aggregated Data · Arkham Intelligence · CoinGecko · CoinMarketCap · On-chain Radar
      </div>
    </div>
  );
}

// ============================================================
// GWEI (ETHGas) Standalone Analysis Component
// ============================================================
function GweiAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>GWEI</span>
        <span style={{ fontSize: 14, color: "#888" }}>ETHGas · Ethereum</span>
        <span style={{ fontSize: 11, color: "#f59e0b", background: "rgba(245,158,11,0.08)", padding: "3px 8px", borderRadius: 4, border: "1px solid rgba(245,158,11,0.2)", fontWeight: 700 }}>INSIDER DUMP</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-11 · Sources: Arkham, CoinGecko, Bubblemaps, On-chain Radar, CoinMarketCap</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a1408 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #2a2418", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#f59e0b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>프로젝트 합법 + 재단 인사이더 덤프 — 숏 대기</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>실제 팀 + Polychain VC 있지만, 재단 지갑→Bitget 100% 매도 패턴 Arkham 확인. 82.5% 미유통</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["유통률", "17.5%", "#ef4444"], ["인사이더", "49%", "#ef4444"], ["재단 매도", "확인", "#f59e0b"], ["프로덕트", "실재", "#34d399"]].map(([label, val, col]) => (
              <div key={label} style={{ textAlign: "center", minWidth: 65 }}>
                <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: col }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", GWEI_DATA.price, "#f0f0f5", true],
            ["24h 변동", GWEI_DATA.athDrop, "#34d399", false],
            ["시가총액", GWEI_DATA.mcap, "#ccc", false],
            ["FDV", GWEI_DATA.fdv, "#ccc", false],
            ["유통량", GWEI_DATA.circulating, "#ef4444", false],
            ["24h 거래량", GWEI_DATA.vol24h, "#ccc", false],
            ["체인", GWEI_DATA.chain, "#888", false],
            ["거래소", GWEI_DATA.exchanges, "#888", false],
            ["팀", GWEI_DATA.team, "#ccc", false],
            ["투자", GWEI_DATA.funding, "#ccc", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tokenomics + Red/Green Flags */}
      <div style={sectionStyle}>
        {sectionTitle("Tokenomics & On-chain 분석")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Tokenomics */}
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>토큰 분배 — 49% 인사이더</div>
            <div style={{ display: "flex", height: 18, borderRadius: 4, overflow: "hidden", marginBottom: 10 }}>
              {GWEI_TOKENOMICS.map((t, i) => (
                <div key={i} style={{ width: t.pct, background: t.color, height: "100%" }} title={`${t.name}: ${t.pct}`} />
              ))}
            </div>
            {GWEI_TOKENOMICS.map((t, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid #14161e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color }} />
                  <span style={{ fontSize: 12, color: "#ccc" }}>{t.name}</span>
                </div>
                <span style={{ fontSize: 12, color: "#888" }}>{t.pct}</span>
                <span style={{ fontSize: 10, color: "#666" }}>{t.schedule}</span>
              </div>
            ))}
          </div>

          {/* S/R Levels */}
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {GWEI_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#34d399", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(52,211,153,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(52,211,153,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#34d399" : "#ccc", minWidth: 90 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Arkham On-chain Evidence */}
      <div style={sectionStyle}>
        {sectionTitle("Arkham On-chain 증거 — 재단 덤프 확인")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #f59e0b" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#f59e0b", marginBottom: 8 }}>0x096f... → Bitget (Arkham 확인)</div>
          <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7, marginBottom: 12 }}>
            잔액: <b>$9.64</b> (ETH만 남음 — 전량 매도 완료)<br/>
            23시간 전: → <span style={{ color: "#ef4444" }}>Bitget Deposit 15M GWEI ($820K)</span><br/>
            1개월 전: → Bitget Deposit 5M GWEI ($156K)<br/>
            1개월 전: ethgasfoundation → 이 지갑 20M GWEI ($612K)<br/>
            패턴: <span style={{ color: "#ef4444" }}>재단 → 시드지갑 → Bitget 100% (중간 경유)</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>Red Flags</div>
              {GWEI_DATA.redFlags.map((f, i) => (
                <div key={i} style={{ fontSize: 11, color: "#ef8888", lineHeight: 1.6, paddingLeft: 8, borderLeft: "2px solid #2a1418", marginBottom: 3 }}>{f}</div>
              ))}
            </div>
            <div style={{ background: "#0d1f15", borderRadius: 6, padding: "10px 12px", border: "1px solid #1a3a25" }}>
              <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, marginBottom: 4 }}>Green Flags</div>
              {GWEI_DATA.greenFlags.map((f, i) => (
                <div key={i} style={{ fontSize: 11, color: "#88ccaa", lineHeight: 1.6, paddingLeft: 8, borderLeft: "2px solid #1a3a25", marginBottom: 3 }}>{f}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Entry Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios")}
        <div style={{ display: "grid", gap: 12 }}>
          {GWEI_SCENARIOS.map((sc) => {
            const isOpen = expandedScenario === sc.id;
            return (
              <div key={sc.id} style={{ ...cardStyle, borderLeft: `3px solid ${sc.color}`, cursor: "pointer" }} onClick={() => setExpandedScenario(isOpen ? null : sc.id)}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#f0f0f5" }}>{sc.title}</span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: `${sc.color}15`, border: `1px solid ${sc.color}33`, color: sc.color, fontWeight: 600 }}>{sc.priority}</span>
                  </div>
                  <span style={{ fontSize: 16, color: "#444" }}>{isOpen ? "▾" : "▸"}</span>
                </div>
                {isOpen && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #14161e" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 12 }}>
                      {[["진입", sc.entry, sc.color], ["손절", sc.sl, "#ef4444"], ["TP1", sc.tp1, "#34d399"], ["TP2", sc.tp2, "#34d399"]].map(([label, val, col]) => (
                        <div key={label} style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e" }}>
                          <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase" }}>{label}</div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: col, marginTop: 2 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>시그널</div>
                      <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.6 }}>{sc.signal}</div>
                    </div>
                    <div style={{ background: "#0c0e14", borderRadius: 6, padding: "10px 12px", border: "1px solid #14161e", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 4 }}>근거</div>
                      <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6 }}>{sc.rationale}</div>
                    </div>
                    <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
                      <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>리스크</div>
                      <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>{sc.risk}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalyst Timeline */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={cardStyle}>
          {GWEI_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", borderBottom: i < GWEI_CATALYSTS.length - 1 ? "1px solid #14161e" : "none" }}>
              <div style={{ minWidth: 70, fontSize: 12, fontWeight: 700, color: cat.done ? "#555" : "#f0f0f5" }}>{cat.date}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: cat.done ? "#888" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
              </div>
              <div style={{ minWidth: 80, textAlign: "right" }}>
                <span style={{
                  fontSize: 10, padding: "2px 6px", borderRadius: 3, fontWeight: 600,
                  background: cat.done ? "rgba(107,114,128,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${cat.done ? "rgba(107,114,128,0.2)" : "rgba(245,158,11,0.2)"}`,
                  color: cat.done ? "#6b7280" : "#f59e0b",
                }}>{cat.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: Arkham Intelligence · CoinGecko · CoinMarketCap · Bubblemaps · On-chain Radar · The Block
      </div>
    </div>
  );
}
