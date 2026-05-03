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
  price: "$0.0808", mcap: "$2.60B", fdv: "$8.08B", vol24h: "$46.2M",
  volFutures: "Bybit 24h $20.8M", oi: "$91.6M (Binance 1.13B tokens × $0.0808)", oiMcapRatio: "3.5% (저레버리지)", oiRange30d: "$234-294M (CoinGlass 집계, 실측 대비 2배)",
  liq24h: "$3.99M", athPrice: "$0.3313", athDate: "2025.09.01", athDrop: "-75.8%",
  atlPrice: "$0.077", atlDate: "2026.04.11", circulating: "32.2B / 100B (32.2%)",
  exchanges: "Binance, Upbit, Bithumb, OKX, Bybit, Gate.io",
  dolomiteStatus: "50억 WLFI 담보 | $75M 대출 | LTV 19-21% | HR 3.11",
};

const WLFI_TECHNICALS = {
  trend: "ATL 근접 bounce — 약세 지속",
  ema20: "$0.10", ema50: "$0.105", ema200: "$0.112",
  deathCross: true,
  supertrend: "Bearish (trailing $0.11)",
  ichimoku: "Red cloud, price below",
  rsi: "45.28 (중립)",
  change24h: "+2.80%", change7d: "-15%", change30d: "-22%",
};

const WLFI_LEVELS = [
  { type: "R", label: "R3", price: "$0.112", note: "EMA200, 강한 저항" },
  { type: "R", label: "R2", price: "$0.10-0.105", note: "EMA20/50 밀집대" },
  { type: "R", label: "R1", price: "$0.088-0.097", note: "이전 지지→저항 전환" },
  { type: "NOW", label: "현재가", price: "$0.0808", note: "ATL $0.077에서 +4% 반등, 4/14 +2.80%" },
  { type: "S", label: "S1", price: "$0.07", note: "최후 방어선" },
  { type: "S", label: "S2", price: "$0.06", note: "채널 하단, 극단 약세 타겟" },
];

const WLFI_DOLOMITE = {
  collateral: "50억 WLFI ($396-440M) — 담보 추가 공급 완료",
  loan: "$75M (USDC/USD1)",
  healthRate: "3.11 (DeBank 실시간)",
  ltv: "19-21%",
  liquidationPrice: "ATL $0.077 근접. 15-20% 추가 하락 시 캐스케이드 트리거",
  concentration: "Dolomite 총 공급의 55% (이전 51%에서 확대)",
  teamClaim: "청산 위험 없음, 추가 담보 공급 가능",
  realRisk: "담보 50억 WLFI = 공급의 5%. ATL 돌파 시 강제청산→가격 폭락→악순환. 가격 동인이 펀더멘털이 아닌 대출 포지션이 됨",
  walletAge: "MultiSig Safe 운영 중",
  coinbasePrime: "$40M+ Coinbase Prime 전송 이력. 87건 대형 $100K+ 이체 (7주 최고)",
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
  price: "$0.01475", mcap: "$42.0M", fdv: "$158.3M", vol24h: "$2.4M",
  volFutures: "Binance $1.22M 일 / Bybit $1.23M 일", oi: "$5.3M (Binance $3.0M + Bybit $2.3M)", oiMcapRatio: "13% (정상 범위)", oiPeak: "$1B (3월 CoinGlass 주장)",
  liq24h: "낮음 (디레버리지 완료)", athPrice: "$0.166", athDate: "2025.04.12", athDrop: "-91.4%",
  atlPrice: "$0.0107", atlDate: "2026.03.07", circulating: "2.85B / 10.73B (26.6%)",
  exchanges: "Binance, OKX, Kraken, KuCoin, Bybit, CoinW",
  fundingRate: "+0.004% Binance / -0.008% Bybit (중립)",
  maxSupply: "Unlimited (~8%/yr inflation)",
};

const BABY_TECHNICALS = {
  trend: "Oversold Consolidation (언락 흡수 완료)",
  rsi: "29.87 (과매도 유지)",
  ema: "전 이평선 아래 (데스크로스)",
  fundingRate: "+0.004% / -0.008% (중립)",
  oiChange: "Binance+Bybit 실시간 $5.3M = 시총의 13% (정상). CoinGlass 집계 $400M은 과장 가능성",
  volumePattern: "4/10 612.5M 언락 -1.4% 소화. 판매 압력 소멸",
  change24h: "+4.46%", change7d: "+12%", change30d: "+8%",
};

const BABY_LEVELS = [
  { type: "R", label: "R3", price: "$0.035", note: "1월 고점, 강한 저항" },
  { type: "R", label: "R2", price: "$0.020", note: "12월 이후 저항대, 스퀴즈 타겟" },
  { type: "R", label: "R1", price: "$0.018", note: "최근 단기 고점 (4월)" },
  { type: "NOW", label: "현재가", price: "$0.01475", note: "ATL +38%, 24h +4.46% 점진 회복" },
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
    rationale: "RSI 29.87 과매도. Bybit Funding -0.008% 숏 우세→스퀴즈 유인. 실시간 OI $5.3M (Binance+Bybit 합산) = 시총의 13% (정상, 극단 레버리지 없음). Aave BTC 렌딩 4월 출시=펀더멘털 촉매. $0.012-0.018 4개월 횡보 기저 형성. 4/10 언락 -1.4% 흡수 완료. 3월 피크 $1B 주장은 CoinGlass 집계로 실측과 괴리 가능",
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
  price: "$0.0784", mcap: "$183.5M", fdv: "$784M", vol24h: "$44.1M",
  oi: "$33.2M (Binance $25.1M + Bybit $8.1M)", oiMcapRatio: "18% (중간 레버리지)",
  fundingRate: "-0.002% Binance / +0.001% Bybit (중립)",
  circulating: "2.34B / 10B (23.4%)", athPrice: "$0.77", athDate: "2025.09.29 (TGE)",
  athDrop: "-89.6%", atlPrice: "$0.062", atlDate: "2025.10.10",
  range24h: "$0.0798 — $0.0955 (4/13)", exchanges: "Binance, Upbit, Bithumb, Bybit, KuCoin, MEXC",
  tvl: "~$2.1B (USDf 유통)", category: "DeFi / Synthetic Dollar (USDf)",
};

const FF_TECHNICALS = {
  trend: "DOWNWARD — 분배 페이즈 진행",
  alphaScore: "+20 (V4 Engine)",
  fundingRate: "음수 (숏 커버링, 약세 분출)",
  cvd: "4/12 전환: 가격↓ + 분배 진행",
  longShort: "N/A (데이터 없음)",
  taker: "매도 전환",
  orderbook: "매수벽 약화",
  liquidation: "숏 커버링 완료 후 약세 지속",
  fearGreed: "탐욕 → 중립",
  vwap: "단기 VWAP 하회 지속",
  rs: "BTC 대비 약세",
  bb: "BB 중립",
  atr: "변동성 고 (33% 풀백)",
  kimchi: "김치프리미엄 감소",
  change24h: "+0.93%", change7d: "~+30%", change30d: "~+40%",
};

const FF_LEVELS = [
  { type: "R", label: "R3", price: "$0.1232", note: "4/10 고점 (ATH 이후 최고)" },
  { type: "R", label: "R2", price: "$0.11", note: "4/11 반등 고점" },
  { type: "R", label: "R1", price: "$0.098", note: "4/11 종가, 단기 저항" },
  { type: "NOW", label: "현재가", price: "$0.0784", note: "DWF 분배 후 안정화, 24h +0.93%" },
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
    id: "DONE", title: "✅ 숏 A (4/11) — DWF 분배 타겟 달성 (TP2 히트)", priority: "실현 완료",
    entry: "$0.12-0.13 (이론적 진입)", sl: "$0.14", tp1: "$0.085 (**통과**)", tp2: "$0.074 (**거의 도달**)",
    signal: "**REALIZED 2026-04-14**: 4/11 고점 $0.1232 → 4/14 현재 $0.0784. TP1 $0.085 통과, TP2 $0.074 웨일 매집가 근접. 반등 진입 없이 이미 분배 완료",
    rationale: "DWF 분배 논제 정확히 실현. 고점 $0.165 → 현재 $0.0784 = -52% (DWF 50-67% 되돌림 패턴 확인). 이제 신규 숏 진입 부적합 — 타겟 이미 도달",
    risk: "진입 기회 놓침. 현재는 $0.074 웨일 매집가 근처 = B 롱 시나리오 활성화 구간",
    color: "#34d399",
  },
  {
    id: "B", title: "롱 B: 웨일 매집가 $0.074 활성 매수 (현재가 근처)", priority: "1순위 / 활성",
    entry: "$0.074-0.078 (현재가 $0.0784 근처)", sl: "$0.062 (ATL 아래)", tp1: "$0.098 (R:R ≈ 1:2)", tp2: "$0.120 (R:R ≈ 1:4)",
    signal: "**활성 구간**: $0.074 웨일 매집가 3회 이상 지지 확인. 4H 거래량 급감 + 횡보 안정화. 펀딩비 -로 전환 시 매수 강화",
    rationale: "entry_mid $0.076, SL $0.062, risk $0.014. TP1 $0.098 reward $0.022 = 1:1.57. TP2 $0.120 reward $0.044 = 1:3.14. 7개 웨일 지갑 $0.074 평단 227.5M FF 매집 (유통 10%) = 운전 원가. TVL $2.1B 실제 프로토콜. 단타만",
    risk: "DWF 프로젝트=운전 원가 아래로도 조작 가능. USDf 96% 오프체인 리저브 투명성 우려. **장기 보유 금지, 단타 1-3일만**",
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
  price: "$0.8405", mcap: "$153.8M", fdv: "$840.5M", vol24h: "$300M",
  volFutures: "Bybit 24h $196.8M (디레버리지 후 재상승)",
  oi: "$43.3M (Binance $30.7M + Bybit $12.6M)", oiMcapRatio: "26% (정상)",
  liq24h: "Bybit 24h 턴오버 $165.7M",
  circulating: "183M / 1B (18.3%)", athPrice: "$0.9267", athDate: "2026.04.13 (갱신 후 조정)",
  athDrop: "-9% from 4/13 ATH", atlPrice: "$0.1038", atlDate: "2026.04.09 (크래시 저점)",
  exchanges: "Gate.io, KuCoin, Bitget, MEXC, PancakeSwap V3",
  futuresExchanges: "Binance Futures + Bybit (Binance Spot 아직 미상장)",
  category: "GameFi / AI Gaming (BNB Chain)",
  crashDetail: "4/9 ATH $0.9165 → $0.1038 (-87%) → 4/13 $0.9267 (+793% bounce, ATH 재돌파)",
};

const ARIA_TECHNICALS = {
  trend: "V-SHAPE RECOVERY — 크래시 저점 대비 +793% (ATH 재돌파)",
  futuresSpotRatio: "정상화 — OI/MCap 26%",
  liqDominance: "Bybit 펀딩 중립, Binance 펀딩 -0.06% (숏 스퀴즈 압력)",
  volMcapRatio: "정상 영역",
  smartMoney: "6개 스마트머니 $0.31에 매도 (크래시 직전 정확한 타이밍)",
  whaleAccum: "7개 지갑 17.52M ARIA 콜드스토리지 이동",
  onchainBuy: "0x65b... 지갑 $90K/hr 매집 — 리테일 FOMO 선행 정확히 맞음",
  onchainSell: "프레시 지갑 매도 소진",
  contractRisk: "Sentinacle 경고 미해결 — 블랙박스 리스크 지속",
  rsi: "70+ (과열, ATH 재돌파)",
  change24h: "+6.58%", change7d: "+55%", change30d: "+650%",
};

const ARIA_LEVELS = [
  { type: "R", label: "R3", price: "$1.20", note: "심리적 저항 — 신고가 영역" },
  { type: "R", label: "R2", price: "$1.00", note: "라운드 넘버 저항" },
  { type: "R", label: "R1", price: "$0.93", note: "직전 고점 (ATH 영역)" },
  { type: "NOW", label: "현재가", price: "$0.8405", note: "ATH 재돌파 후 -9% 조정, 24h +6.58%" },
  { type: "S", label: "S1", price: "$0.75", note: "피보 38.2% 되돌림" },
  { type: "S", label: "S2", price: "$0.60", note: "피보 50% 되돌림" },
  { type: "S", label: "S3", price: "$0.40", note: "피보 61.8% 되돌림" },
  { type: "S", label: "S4", price: "$0.1038", note: "크래시 저점 (4/9)" },
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
    id: "A", title: "롱: $0.75 피보 38.2% 되돌림 진입 (조정 진행 중)", priority: "1순위 (4/14 업데이트)",
    entry: "$0.75-0.78 (피보 38.2% 되돌림)", sl: "$0.70", tp1: "$0.90 (R:R ≈ 1:2.3)", tp2: "$1.00 (R:R ≈ 1:3.6)",
    signal: "**조정 진행 중**: ATH $0.9165 재돌파 후 $0.8405로 -9% 풀백. 24h +6.58% (저점 반등). 4H RSI 과매수 해소 + S1 $0.75 3회 지지 확인 후 진입",
    rationale: "4/9 크래시 저점 $0.1038 → 4/13 ATH 재돌파 $0.9267 (+793% bounce). 현재 조정 중. entry_mid $0.765, SL $0.70, risk $0.065. TP1 $0.90 reward $0.135 = 1:2.08. TP2 $1.00 reward $0.235 = 1:3.62. Binance 펀딩 -0.042% (숏 우세 잔존 = 추가 스퀴즈 여지)",
    risk: "조정이 $0.75 이전에 끝나면 진입 기회 놓침. Sentinacle 계약 감사 리스크 미해결. 크래시 재발 가능",
    color: "#34d399",
  },
  {
    id: "B", title: "숏: $0.90+ 재돌파 실패 시 (ATH 저항)", priority: "2순위",
    entry: "$0.90-0.93 (R1 ATH 저항)", sl: "$1.00", tp1: "$0.75 (R:R ≈ 1:2)", tp2: "$0.60 (R:R ≈ 1:3.4)",
    signal: "R1 $0.93 재돌파 실패 + 4H 적색 마감 + 거래량 감소. OI 급감 없이 가격 정체",
    rationale: "+793% 단기 랠리 = 과매수 지속. ATH $0.9165 저항 2차 재시험 실패 시 조정 연장. entry_mid $0.915, SL $1.00, risk $0.085. TP1 $0.75 reward $0.165 = 1:1.94. TP2 $0.60 reward $0.315 = 1:3.71",
    risk: "Binance 펀딩 음수 = 숏 스퀴즈 위험. Binance 정식 상장 시 추가 +30% 가능. 소규모 포지션",
    color: "#ef4444",
  },
  {
    id: "C", title: "숏: $1.00+ 추가 급등 시 매도", priority: "관찰",
    entry: "$1.00-1.15 (라운드 넘버 저항)", sl: "$1.20", tp1: "$0.85 (R:R ≈ 1:1.5)", tp2: "$0.70 (R:R ≈ 1:3)",
    signal: "$1 라운드 돌파 후 거래량 감소 + 긴 윗꼬리. OI 급감 없이 가격 정체",
    rationale: "+793% 단기 랠리 = 과매수. 라운드 넘버 $1에서 자연스러운 저항. Sentinacle 계약 감사 리스크가 촉매될 수 있음",
    risk: "강한 모멘텀 지속 시 숏 스퀴즈. Binance 정식 상장 시 추가 +30% 가능. 소규모 포지션",
    color: "#ef4444",
  },
];

const ARIA_CATALYSTS = [
  { date: "4/9", event: "ATH $0.9165 → 1시간 내 -87% 크래시 ($0.1038). $9.4M 청산. Sentinacle 스마트컨트랙트 경고", impact: "크래시", done: true },
  { date: "4/10-13", event: "크래시 저점 $0.1038에서 $0.9267로 +793% 회복. ATH $0.9165 재돌파. Binance 펀딩 -0.06% 숏 스퀴즈", impact: "V자 반등", done: true },
  { date: "8/21~", event: "Team(15%)+Investors(8.5%) 12M cliff 해제 (TGE 2025.8.21)", impact: "대규모 언락", done: false },
  { date: "2026 중", event: "Season 3 콘텐츠 + 모바일 RPG 확장 + AI Agent 기능", impact: "펀더멘털", done: false },
  { date: "미정", event: "Binance 정식 상장 여부 (현재 Alpha만). 상장 시 급등 가능", impact: "잠재 촉매", done: false },
  { date: "미정", event: "Community 51% 물량 36M linear 해제 지속 (81.7% 락업)", impact: "장기 희석", done: false },
];

// ============================================================
// VVV (Venice Token) Analysis Data — 2026-04-11
// ============================================================
const VVV_MARKET = {
  price: "$8.96", mcap: "$408M", fdv: "$712M", vol24h: "$28.3M",
  oi: "$28.1M (Binance $13.6M + Bybit $14.5M)", oiMcapRatio: "7.8% (중저 레버리지)",
  fundingRate: "+0.005% / +0.0053% (중립)",
  longShort: "중립 (펀딩 ~0)",
  circulating: "45.57M / 79.52M (57.3%)", burned: "33.7M+ 소각 (원래 100M의 42.3%)",
  athPrice: "$22.58", athDate: "2025.01.28", athDrop: "-60.2%",
  atlPrice: "$0.92", atlDate: "2025.12.01", category: "AI / Privacy AI (Base L2)",
  exchanges: "Coinbase, Bybit, Bithumb, Kraken, KuCoin, Gate",
  notListed: "Binance 스팟 아직 미상장 (선물만) → 잠재 촉매",
  emissions: "6M VVV/년 (2026.2.10 25% 감축 완료) + mutable contract",
  stakingApy: "~65% APY, 7일 쿨다운 · 32.45M VVV (71%) 스테이킹 중",
  change24h: "-8.15%", change7d: "+24.7%", change30d: "+44.7%", change60d: "+208.7%",
};

const VVV_TECHNICALS = {
  trend: "조정 중 — 7일 +24% 후 오늘 -8% 차익실현",
  rsi: "중립 (과매수에서 조정)",
  wintermute: "⚠️ 라벨된 Wintermute 지갑(0xdbf5...)은 VVV 0 보유 · 0x51c7은 MEV bot (라벨 없음)",
  staking: "71% 스테이킹 (32.45M VVV) · free float 13M VVV만 거래 중 · 매우 얇은 유동성",
  diem: "sVVV 락업→DIEM 발행. 유통 제거 효과",
  burnRate: "월 $115-123K 바이백&번. 42.3% 이미 소각",
  goplus: "⚠️ GoPlus CRITICAL: 컨트랙트 mutable — 매도 비활성화/수수료 변경/민팅 가능 (rug vector)",
  founder: "Erik Voorhees (ShapeShift 창업자). 1인 프로젝트 리스크",
  keyCatalyst: "Binance 스팟 상장 대기 (발생 시 +20-30% 예상)",
  freshBuyer: "신규 지갑 0x1afE...가 49,648 sVVV ($444K) 2시간 이내 매수 후 즉시 스테이킹 (2026-04-15)",
  historicalDump: "2025.1 Wintermute $1.4M DEX 덤프 + Venice 팀 멀티시그 $10.2M 덤프 → 2주간 -63%",
};

const VVV_LEVELS = [
  { type: "R", label: "R3", price: "$22.58", note: "ATH (2025.01.28) · -60% 거리" },
  { type: "R", label: "R2", price: "$12.00", note: "다음 주요 저항" },
  { type: "R", label: "R1", price: "$9.90", note: "24h 고점 (조정 시작)" },
  { type: "NOW", label: "현재가", price: "$8.96", note: "4/15 -8.15% 조정 · 7일 +24.7% 러리 후" },
  { type: "S", label: "S1", price: "$8.50", note: "4/9 브레이크아웃 + 24h 저점" },
  { type: "S", label: "S2", price: "$7.50", note: "피보 38.2%" },
  { type: "S", label: "S3", price: "$6.76", note: "4/9 저점 (7일 러리 시작)" },
];

const VVV_SCENARIOS = [
  {
    id: "A", title: "롱: 조정 시 매수 (모멘텀 추종)", priority: "1순위",
    entry: "$7.00-7.50 (S1 조정 시)", sl: "$6.30 (S1 하방)", tp1: "$10.00 (R:R ≈ 1:2.5)", tp2: "$12.00 (R:R ≈ 1:4)",
    signal: "4H RSI 과매도 접근 + S1 지지 확인 + Wintermute 지갑 매수 지속",
    rationale: "60일 +208.7% / 30일 +44.7% 업트렌드. 71% 스테이킹으로 float 얇음(~13M VVV). 실제 프로덕트(Venice AI). 바이백&번 가속 중($123K/월). 에미션 25% 감축. Binance 스팟 미상장=잠재 촉매. MEV bot(0x51c7/0xa836) DEX 매수 활동 확인 (단, 라벨된 Wintermute 0xdbf5은 VVV 0 보유)",
    risk: "ATH -62.6% 오버헤드. Wintermute 런칭 시 덤핑 전력. GoPlus 컨트랙트 경고. 팀 35M 베스팅 진행 중",
    color: "#34d399",
  },
  {
    id: "B", title: "숏: $10 심리저항 도달 시", priority: "2순위",
    entry: "$9.50-10.00 (R2 접근 시)", sl: "$10.80", tp1: "$7.50 (R:R ≈ 1:2)", tp2: "$6.00 (R:R ≈ 1:3.5)",
    signal: "$10 도달 후 거래량 감소 + 4H 다이버전스. Wintermute 지갑 매도 전환 감지",
    rationale: "ATH $22.58 대비 -60.2%. $10-15 구간 대량 매물대 (런칭 시 고점 구매자). 2025.1 Wintermute $1.4M DEX 덤프 + Venice 팀 $10.2M 덤프 이력 → 2주 -63%. Contract mutable (GoPlus rug flag). Max supply infinite. 팀 베스팅 물량 + 에미션 6M/년",
    risk: "업트렌드 (60일 +208%). Binance 상장 시 숏 스퀴즈 위험. 71% 스테이킹 = free float 얇아 급등 가능. 바이백&번 = 자연적 매수 압력",
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
  { date: "진행중", event: "0x51c7/0xa836 MEV bot DEX 매수 활동 — 온체인 모니터링 중 (Wintermute 라벨은 미확인)", impact: "MEV 활동", done: true },
  { date: "미정", event: "Binance 스팟 상장 (현재 선물만). 상장 시 급등 예상", impact: "잠재 촉매", done: false },
  { date: "~2026말", event: "팀 35M VVV 베스팅 완료 (24개월)", impact: "매도 압력", done: false },
];

// ============================================================
// GWEI (ETHGas) + SKYAI Analysis Data — 2026-04-11
// ============================================================
const GWEI_DATA = {
  price: "$0.0655", mcap: "$114.6M", fdv: "$655M", vol24h: "$5.4M",
  oi: "$10.7M (Binance Futures only, Bybit 미상장)", oiMcapRatio: "9.5% (중저 레버리지)",
  liq24h: "$417.6K (24h, OI의 ~4%)",
  fundingRate: "+0.005% Binance 8h (중립)",
  ath: "$0.0729 (2026.04.11)", athDrop: "-12% (ATH에서 조정, +13% 반등 중)",
  circulating: "1.75B / 10B (17.5%)",
  chain: "Ethereum", exchanges: "Coinbase, Kraken, Bitget, Bithumb, KuCoin, Binance",
  team: "Kevin Lepsoe (ex-Morgan Stanley Asia 파생상품 헤드)",
  funding: "Polychain Capital 리드 $12M 시드",
  verdict: "Cliff 이벤트 D-6 — ATH에서 -12%, 반등 후 재조정 대기",
  verdictColor: "#f59e0b",
  redFlags: [
    "**4/19 1년 클리프 만료** (6일 내) — Team 22% + Investors 27% 베스팅 시작",
    "Foundation 8% 즉시 언락 — ethgasfoundation → 0x096f → Bitget 매도 지속",
    "ATH $0.0729 (4/11)에서 $0.0569 저점 → $0.0642 반등 = 시장이 망설임 중",
    "Team post-cliff: 10% 즉시 언락 + 2년 선형 (월 0.75% 추가)",
    "Bubblemaps: 상위 클러스터 15.17% (건전 기준 경계)",
    "얇은 선물 시장 (Binance OI $10.7M, Bybit 미상장) = 큰 매도 충격 흡수 불가",
  ],
  greenFlags: [
    "실제 팀 (Morgan Stanley, Deutsche Bank, HKEx 출신)",
    "Polychain Capital $12M 투자",
    "Coinbase + Kraken + Binance 상장 (컴플라이언스 통과)",
    "Ethereum 블록스페이스 선물 시장 (실제 프로덕트)",
    "YTD +314% (1월 ATL $0.0167부터 회복)",
  ],
};

const SKYAI_DATA = {
  price: "$0.12546", mcap: "$125.5M", fdv: "$125.5M", vol24h: "$53.9M",
  circulating: "1B / 1B (100%)", athDrop: "ATH $0.1384 -9.4% 조정",
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
    "펀딩비 +0.113% 8h (연환산 ~124%) — 롱 과밀 지속. OI $35.5M Binance only = 시총 $125.5M의 28% (정상)",
  ],
  greenFlags: [
    "BNB Chain Foundation $100K 매수 (인센티브 프로그램)",
    "MCap/FDV = 1.0 (추가 희석 없음 — 단, 집중도가 문제)",
  ],
};

const GWEI_LEVELS = [
  { type: "R", label: "R3", price: "$0.0729", note: "ATH (4/11) — 재테스트 저항" },
  { type: "R", label: "R2", price: "$0.068", note: "4/12 고점" },
  { type: "NOW", label: "현재가", price: "$0.0655", note: "ATH에서 -10%, 4/19 Cliff D-5" },
  { type: "S", label: "S1", price: "$0.055", note: "단기 지지 + 이전 저항" },
  { type: "S", label: "S2", price: "$0.050", note: "심리적 지지 + Cliff 흡수 타겟" },
  { type: "S", label: "S3", price: "$0.040", note: "중기 지지대" },
  { type: "S", label: "S4", price: "$0.03", note: "극단 하락 시 (4/19 Cliff 반응)" },
];

const GWEI_TOKENOMICS = [
  { name: "Investors", pct: "27%", schedule: "베스팅 있음 (미공개)", color: "#8b5cf6" },
  { name: "Team", pct: "22%", schedule: "베스팅 있음 (미공개)", color: "#ef4444" },
  { name: "Foundation", pct: "8%", schedule: "즉시 언락 (베스팅 없음)", color: "#f59e0b" },
  { name: "Ecosystem", pct: "43%", schedule: "미공개", color: "#3b82f6" },
];

const GWEI_SCENARIOS = [
  {
    id: "A", title: "숏: 4/19 Cliff 이벤트 선반영 (최우선)", priority: "1순위",
    entry: "$0.062-0.068 반등 시 (R1-R2 저항)", sl: "$0.075 (ATH 위)", tp1: "$0.050 (R:R ≈ 1:1.5)", tp2: "$0.040 (R:R ≈ 1:2.5)",
    signal: "반등 후 4H 긴 윗꼬리 + 거래량 감소. Cliff D-day 전 4/17-18 선반영 매도 포착",
    rationale: "4/19 Team 22% + Investors 27% 1년 Cliff 만료 (6일 내). 역사 사례(ARB/APT/STRK) 모두 Cliff D-7부터 -20~-40% 선반영. ATH $0.0729 → $0.0642 -12% 조정 진행. 4/11-12 저점 $0.0569에서 +13% 반등 = 시장이 망설임. Foundation 지갑 매도 지속 확인",
    risk: "선물 시장 Binance only (OI $10.7M) = 큰 포지션 불가. +13% 반등 모멘텀 잔존. Coinbase/Kraken/Binance 기관 매수 가능",
    color: "#ef4444",
  },
  {
    id: "B", title: "관망: Cliff 이벤트 반응 확인 후 결정", priority: "2순위",
    entry: "4/19 당일 또는 익일 실제 반응 확인", sl: "—", tp1: "—", tp2: "—",
    signal: "Cliff 만료 후 팀/투자자 실제 매도 vs 홀드 확인. Arkham 추적",
    rationale: "Cliff 이벤트는 선반영 vs 실제 반응 둘 다 가능. 물량 실제로 매도되는지 vs 장기 베스팅만 시작인지 확인 필요. Team 10% 즉시 언락 + 2년 선형 (월 0.75%)",
    risk: "이벤트 이후 방향 결정 = 지각 진입 리스크. 큰 변동성 후 추격 불가",
    color: "#f59e0b",
  },
  {
    id: "C", title: "롱: $0.040-0.050 구간 저점 매수 (조건부)", priority: "관찰",
    entry: "$0.040-0.050 (S1-S2 지지대)", sl: "$0.035", tp1: "$0.062 (R:R ≈ 1:2)", tp2: "$0.070",
    signal: "Cliff 이후 매도 완료 + 3일+ 안정화 + Glamsterdam 포크 뉴스",
    rationale: "실제 팀 (Morgan Stanley 출신). Polychain $12M. Coinbase+Kraken+Binance 상장. Glamsterdam 포크 (2026 중) 블록스페이스 가치 상승. 인사이더 매도 완료 후 장기 저점",
    risk: "Cliff 이후에도 월간 선형 언락 지속. 2년 vesting 부담. 프로덕트 PMF 미검증",
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
  price: "$0.10912", mcap: "$109.1M", fdv: "$109.1M", vol24h: "$22.5M",
  oi: "$35.5M (Binance Futures, Bybit 미상장)", oiMcapRatio: "28% (정상 중상)",
  fundingRate: "+0.113% Binance 8h (연환산 ~124%)",
  liq24h: "Binance Futures only — Bybit/OKX 선물 미상장",
  athPrice: "$0.1384", athDate: "2026.04.11",
  atlPrice: "$0.01433", atlDate: "2025.10.11",
  circulating: "1B / 1B (100%)",
  exchanges: "Binance Futures, Gate.io, HTX, OrangeX, PancakeSwap",
  chain: "BNB Chain", volumeSma: "769.64M",
  change24h: "-13.86%", change7d: "+50%", change30d: "+170%",
};

const SKYAI_TECHNICALS = {
  trend: "Consolidation — ATH $0.1384 후 공고화",
  ma14: "$0.085 (추정)", ma21: "$0.080", ma35: "$0.070",
  ma50: "$0.062", ma100: "$0.048", ma200: "$0.036",
  maDeviation: "+248% (MA200 $0.036 대비) — 여전히 극단적",
  fundingRate: "+0.113% Binance 8h — 연환산 ~124% (여전히 매우 높음)",
  oiSurge: "실시간 OI $35.5M (Binance 단독) = 시총의 28%. 초기 과장 추정 정정",
  vpvr: "POC $0.035-0.055. $0.06 위 거래량 희박 = 허공 구간",
  liqProfile: "크래시 없이 공고화. SIREN 패턴 트리거 미발동. 펀딩비만 여전히 과열",
  priceVsMa: "전 이평선 위 유지. $0.10 이탈 시 캐스케이드 가능",
  squeezeStatus: "펀딩비 경로 유지 — OI 극단 주장은 정정됨",
};

const SKYAI_LEVELS = [
  { type: "R", label: "R3", price: "$0.15", note: "라운드 넘버, 심리적 저항" },
  { type: "R", label: "R2", price: "$0.1384", note: "ATH (4/11), 재테스트 저항" },
  { type: "R", label: "R1", price: "$0.13", note: "4/12 단기 고점" },
  { type: "NOW", label: "현재가", price: "$0.10912", note: "**24h -13.86%** — SIREN 패턴 발동 시작 ($0.1384 ATH에서 -21%)" },
  { type: "S", label: "S1", price: "$0.10", note: "심리적 지지, $0.10 이탈 시 캐스케이드" },
  { type: "S", label: "S2", price: "$0.072", note: "MA14 추정 + VPVR 상단 (-42%)" },
  { type: "S", label: "S3", price: "$0.054-0.059", note: "MA35-50 + VPVR 고밀도대" },
  { type: "S", label: "S4", price: "$0.036", note: "MA200 + VPVR POC. 풀 되돌림 (-71%)" },
];

const SKYAI_SCENARIOS_FULL = [
  {
    id: "A", title: "숏: 진행 중인 크래시 — $0.10 이탈 시 추격 (4/14 업데이트)", priority: "1순위 (진행 중)",
    entry: "$0.10 이탈 확인 후 시장가 또는 $0.115+ 반등 시 숏", sl: "$0.125 (+15%)", tp1: "$0.072 (MA14, R:R ≈ 1:2.8)", tp2: "$0.054 (MA35-50, R:R ≈ 1:5)",
    signal: "**바이너리 트리거**: (1) $0.10 4H 종가 이탈 확인, OR (2) $0.115+ 반등 후 4H 적색 마감. OI 감소 지속 확인",
    rationale: "**SIREN 패턴 발동 확인**: 4/11 ATH $0.1384 → 4/14 $0.10912 (-21%). entry_mid $0.10, SL $0.125, risk $0.025. TP1 $0.072 reward $0.028 = 1:1.12. TP2 $0.054 reward $0.046 = 1:1.84. **진입점 상향 시 R:R 개선** ($0.115 entry → TP1 1:1.72, TP2 1:2.44). $0.06 위 VPVR 공백 = 가속 하락 가능",
    risk: "**Kill switch**: BNB Chain Foundation 대량 매수 재개 시 숏 종료. 이미 -21% 크래시 후 저점 반등 가능. 뒤늦은 진입 대신 $0.10 이탈 확인 필수",
    color: "#ef4444",
  },
  {
    id: "B", title: "숏: 펀딩비 리셋 이벤트", priority: "2순위",
    entry: "펀딩비 0.3%+ 도달 시 또는 OI 피크 확인 후", sl: "직전 ATH +10%", tp1: "$0.072 (MA14)", tp2: "$0.041 (MA100 부근)",
    signal: "펀딩비 0.3% 초과 + OI 증가 멈춤 + 가격 정체 = 롱 소진. 대규모 롱 청산 캐스케이드 시작 시 추격 숏",
    rationale: "펀딩비 0.2%+에서 반전한 역사적 사례 다수 (PEPE, BONK, WIF 등). 현재 +0.113% 8h 유지 중. OI $35.5M이 상대적으로 적지만 펀딩비만으로도 롱 포지션 소모 가속. $0.06 위 VPVR 공백 = 하락 시 '에어포켓' — 급락 가능",
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
  { date: "2026.04.11", event: "+76.4% 급등. ATH $0.1384 달성. 펀딩비 0.2058% 정점 (역사적 수준)", impact: "극단 과열", done: true },
  { date: "2026.04.13", event: "펀딩비 축소 시작 (+0.113%로 감소). 공고화 구간 진입", impact: "과열 완화", done: true },
  { date: "**2026.04.14**", event: "**SIREN 패턴 발동 — 24h -13.86% 크래시 시작 ($0.1254 → $0.1091)**", impact: "**숏 검증**", done: true },
  { date: "진행중", event: "0x5a26 웨일 $91-93K씩 정기 서브지갑 매도 지속", impact: "지속 매도", done: true },
  { date: "미정", event: "$0.10 지지 이탈 시 VPVR 공백 구간 가속 하락 (-40~70% 추가)", impact: "핵심 리스크", done: false },
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
    { id: "WCT", name: "WalletConnect", verdict: "TGE 1주년 Cliff D-1", verdictColor: "#ef4444" },
    { id: "INX", name: "Infinex", verdict: "✅ 숏 실현 -38.6%", verdictColor: "#34d399" },
    { id: "ENJ", name: "Enjin Coin", verdict: "숏 스퀴즈 극단 +23%", verdictColor: "#f59e0b" },
    { id: "YGG", name: "Yield Guild", verdict: "Cliff D-13 (4/27)", verdictColor: "#f59e0b" },
    { id: "OP", name: "Optimism", verdict: "Quarterly Cliff D-16", verdictColor: "#f59e0b" },
    { id: "NXPC", name: "Nexpace", verdict: "FDV 3.77x Overhang", verdictColor: "#ef4444" },
    { id: "TRUST", name: "Intuition", verdict: "무한 공급 + Q4 Cliff", verdictColor: "#ef4444" },
    { id: "POLYX", name: "Polymesh", verdict: "RWA 모멘텀 (관찰)", verdictColor: "#06b6d4" },
    { id: "CYS", name: "Cysic", verdict: "Safe 완전 고갈 + 12월 Cliff", verdictColor: "#ef4444" },
    { id: "SKYAI", name: "SkyAI", verdict: "SIREN 발동 -13.86% 진행", verdictColor: "#ef4444" },
    { id: "BABY", name: "Babylon", verdict: "LONG BIAS (과매도)", verdictColor: "#34d399" },
    { id: "FF", name: "Falcon Finance", verdict: "DWF 운전 — 분배 중", verdictColor: "#f59e0b" },
    { id: "ARIA", name: "AriaAI", verdict: "ATH 재돌파 — 관망", verdictColor: "#8b5cf6" },
    { id: "VVV", name: "Venice AI", verdict: "업트렌드 + 조정", verdictColor: "#06b6d4" },
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
      {selectedToken === "CYS" && <CysicAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "INX" && <InxAnalysis expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "ENJ" && <GenericTokenAnalysis data={ENJ_DATA} levels={ENJ_LEVELS} tokenomics={ENJ_TOKENOMICS} scenarios={ENJ_SCENARIOS} catalysts={ENJ_CATALYSTS} expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "YGG" && <GenericTokenAnalysis data={YGG_DATA} levels={YGG_LEVELS} tokenomics={YGG_TOKENOMICS} scenarios={YGG_SCENARIOS} catalysts={YGG_CATALYSTS} expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "OP" && <GenericTokenAnalysis data={OP_DATA} levels={OP_LEVELS} tokenomics={OP_TOKENOMICS} scenarios={OP_SCENARIOS} catalysts={OP_CATALYSTS} expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "NXPC" && <GenericTokenAnalysis data={NXPC_DATA} levels={NXPC_LEVELS} tokenomics={NXPC_TOKENOMICS} scenarios={NXPC_SCENARIOS} catalysts={NXPC_CATALYSTS} expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "TRUST" && <GenericTokenAnalysis data={TRUST_DATA} levels={TRUST_LEVELS} tokenomics={TRUST_TOKENOMICS} scenarios={TRUST_SCENARIOS} catalysts={TRUST_CATALYSTS} expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "WCT" && <GenericTokenAnalysis data={WCT_DATA} levels={WCT_LEVELS} tokenomics={WCT_TOKENOMICS} scenarios={WCT_SCENARIOS} catalysts={WCT_CATALYSTS} expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
      {selectedToken === "POLYX" && <GenericTokenAnalysis data={POLYX_DATA} levels={POLYX_LEVELS} tokenomics={POLYX_TOKENOMICS} scenarios={POLYX_SCENARIOS} catalysts={POLYX_CATALYSTS} expandedScenario={expandedScenario} setExpandedScenario={setExpandedScenario} sectionStyle={sectionStyle} sectionTitle={sectionTitle} cardStyle={cardStyle} />}
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
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: CoinGecko, CoinGlass, CoinDesk, CoinMarketCap</div>

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

      {/* 쉬운 설명 — Plain Language Explainer */}
      <div style={sectionStyle}>
        {sectionTitle("🥔 쉬운 설명 — 지금 무슨 일이 벌어지고 있나")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #f59e0b", background: "linear-gradient(135deg, #14110a 0%, #0e1018 100%)" }}>
          <div style={{ fontSize: 13, color: "#f0f0f5", fontWeight: 700, marginBottom: 10 }}>
            한 줄 요약: 트럼프 가족이 찍은 코인이 폭락 중인데, 팀이 자기 토큰을 담보로 돈을 빌렸다가 <span style={{ color: "#ef4444" }}>"FTX 2호"</span>가 될 수 있는 구조에 빠졌습니다.
          </div>
          <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.8, marginBottom: 12 }}>
            <b style={{ color: "#f59e0b" }}>비유 ▸</b> 친구가 수제 티셔츠 사업을 한다고 칩시다.
          </div>
          <div style={{ display: "grid", gap: 8, marginBottom: 12 }}>
            {[
              ["1", "친구가 자기가 만든 티셔츠 30억 장을 담보로 전당포에 맡기고 $5,000만 현금을 빌렸습니다.", "#ccc"],
              ["2", "문제는 전당포 금고의 절반 이상이 이 친구 티셔츠로 채워져 있습니다 (Dolomite TVL 51%+ 점유).", "#f59e0b"],
              ["3", "티셔츠 가격이 떨어지면 전당포는 \"담보 가치 부족, 강제로 팔아서 회수할게\"라고 통보합니다 (청산).", "#f59e0b"],
              ["4", "전당포가 30억 장을 한꺼번에 시장에 던지면 → 가격 폭락 → 담보 가치 더 떨어짐 → 더 청산 → 악순환.", "#ef4444"],
              ["5", "이게 2022년 FTX가 자기 토큰(FTT)을 담보로 쓰다가 망한 방식과 똑같은 구조입니다.", "#ef4444"],
            ].map(([n, txt, col]) => (
              <div key={n} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: col, background: "#0c0e14", border: `1px solid ${col}33`, borderRadius: 10, minWidth: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
                <span style={{ fontSize: 12, color: col, lineHeight: 1.6 }}>{txt}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#1a0a0e", border: "1px solid #2a1418", borderRadius: 6, padding: "10px 12px", fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>
            <b>여기에 추가로 ▸</b> 곧 500억 장의 신규 티셔츠(언락 물량)가 시장에 풀릴 예정인데, 언제 풀지는 이번 주 투표로 결정됩니다. 풀리는 양이 <b>현 유통량의 약 50%</b> 수준입니다.
          </div>
        </div>
      </div>

      {/* 3대 위험 요약 */}
      <div style={sectionStyle}>
        {sectionTitle("3대 위험 요약")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            {
              n: "#1", title: "Dolomite FTT 구조", color: "#ef4444",
              headline: "자사 토큰 담보 청산 캐스케이드",
              body: "팀이 8일 전 생성한 MultiSig 지갑에서 30억 WLFI ($237M)를 Dolomite에 담보 예치 → $50.76M 차입. Dolomite TVL의 51%+ 점유. 가격 하락 시 강제청산 → 30억 매도 → 추가 하락 악순환.",
              metric: "HR 3.11 · LTV 21.4% · 청산가 ~$0.021 (-73%)",
            },
            {
              n: "#2", title: "16B 언락 + 거버넌스 투표", color: "#f59e0b",
              headline: "현 유통 대비 50% 초대형 해제",
              body: "4/15 유통 대비 50.24% ($150M 상당) 언락. Public Sale 80% (~16B) 해제 일정을 이번 주 거버넌스 투표로 결정. 180일 스테이킹 필수라 참여율 낮음 → 소수 결정 리스크. Team/Advisors 33.5B 베스팅도 5월~ 개시.",
              metric: "유통 31.7B → +16B 단기 + 33.5B 장기",
            },
            {
              n: "#3", title: "정치/규제 오버행", color: "#8b5cf6",
              headline: "트럼프 가족 순이익 75%",
              body: "트럼프 가족이 이 프로젝트 순이익의 75%를 수취하는 구조. 정치 리스크가 코인 가격과 직결. '내부자 토큰' 인식 강화, SEC 규제 뇌관 상존. 정부 이슈 발생 시 센티먼트 즉각 반응.",
              metric: "정치 이벤트 연동 변동성 상시",
            },
          ].map((r) => (
            <div key={r.n} style={{ ...cardStyle, borderLeft: `3px solid ${r.color}`, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 800, color: r.color }}>{r.n}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#f0f0f5" }}>{r.title}</span>
              </div>
              <div style={{ fontSize: 12, color: r.color, fontWeight: 600, marginBottom: 8 }}>{r.headline}</div>
              <div style={{ fontSize: 11, color: "#999", lineHeight: 1.6, marginBottom: 10 }}>{r.body}</div>
              <div style={{ fontSize: 10, color: "#666", background: "#0c0e14", border: "1px solid #14161e", borderRadius: 4, padding: "6px 8px", fontFamily: "monospace" }}>{r.metric}</div>
            </div>
          ))}
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
            ["OI / MCap", WLFI_MARKET.oiMcapRatio, "#888", false],
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

          {/* 악순환 다이어그램 */}
          <div style={{ marginTop: 14, background: "#0c0e14", border: "1px solid #14161e", borderRadius: 6, padding: "14px 16px" }}>
            <div style={{ fontSize: 11, color: "#888", fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.3px" }}>청산 캐스케이드 악순환</div>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, fontSize: 11, lineHeight: 1.5 }}>
              {[
                { t: "WLFI 가격 ↓", c: "#ef4444" },
                { t: "담보 가치 ↓", c: "#ef4444" },
                { t: "LTV 상승 → 청산", c: "#ef4444" },
                { t: "30억 WLFI 강제 매도", c: "#ef4444" },
                { t: "시장 유동성 부족 (24h vol $256M < 담보 $237M)", c: "#f59e0b" },
                { t: "가격 추가 폭락", c: "#ef4444" },
                { t: "잔여 담보 가치 ↓", c: "#ef4444" },
                { t: "재청산 (loop)", c: "#8b0000" },
              ].map((step, i, arr) => (
                <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ padding: "4px 10px", borderRadius: 4, background: `${step.c}15`, border: `1px solid ${step.c}44`, color: step.c, fontWeight: 600, whiteSpace: "nowrap" }}>{step.t}</span>
                  {i < arr.length - 1 && <span style={{ color: "#444", fontSize: 13 }}>→</span>}
                </span>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 11, color: "#885544", lineHeight: 1.6 }}>
              <b style={{ color: "#ef4444" }}>핵심 함정</b> — "LTV 21.4%, HR 3.11이면 안전" 주장은 담보가 독립 자산일 때만 성립. 담보 = 자사 토큰일 때는 청산 트리거가 담보 가치를 직접 파괴하므로 <b>숫자상 안전이 무의미</b>. FTT도 붕괴 전날까지 숫자상 안전했습니다.
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
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: TradingView, CoinGecko, CoinGlass, Tokenomist, Community</div>

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
            ["OI / MCap", BABY_MARKET.oiMcapRatio, "#60a5fa", false],
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
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: CoinGecko, CoinGlass, Blockchain Magazine, CoinDesk, On-chain data</div>

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
            ["OI (미결제약정)", FF_MARKET.oi, "#60a5fa", false],
            ["OI / MCap", FF_MARKET.oiMcapRatio, "#888", false],
            ["펀딩비", FF_MARKET.fundingRate, "#ef4444", false],
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
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: CoinGecko, CryptoTimes, Blockchain Magazine, On-chain Radar</div>

      {/* Verdict */}
      <div style={{ background: "linear-gradient(135deg, #150d1f 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #251a3a", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#8b5cf6", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#8b5cf6" }}>ATH 재돌파 중 — 추격 금지, 단기 과열</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>4/9 크래시 저점 $0.1038 → 4/13 ATH $0.9267 → 4/14 $0.8405 (-9% 풀백, 24h +6.58% 저점 반등). Binance 펀딩 -0.042% (숏 우세). 계약 감사 리스크 미해결. $0.75 조정 매수 or $0.93 반등 실패 숏</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["bounce", "+793%", "#34d399"], ["24h", "+35%", "#34d399"], ["펀딩비", "-0.06%", "#f59e0b"], ["감사", "미해결", "#ef4444"]].map(([label, val, col]) => (
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
            ["24h 변동", ARIA_TECHNICALS.change24h, "#34d399", false],
            ["7d 변동", ARIA_TECHNICALS.change7d, "#34d399", false],
            ["30d 변동", ARIA_TECHNICALS.change30d, "#34d399", false],
            ["ATH Drop", ARIA_MARKET.athDrop, "#ef4444", false],
            ["시가총액", ARIA_MARKET.mcap, "#ccc", false],
            ["FDV", ARIA_MARKET.fdv, "#ccc", false],
            ["유통량", ARIA_MARKET.circulating, "#ccc", false],
            ["카테고리", ARIA_MARKET.category, "#888", false],
            ["OI (미결제약정)", ARIA_MARKET.oi, "#60a5fa", false],
            ["OI / MCap", ARIA_MARKET.oiMcapRatio, "#34d399", false],
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
        {sectionTitle("4/9 크래시 분석 — ATH $0.9165 → $0.1038 (-87%)")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #8b5cf6" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>크래시 원인 1: Sentinacle 경고</div>
              <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>스마트컨트랙트 소스코드 미검증 — "블랙박스". 백도어/경제적 취약점 은닉 가능. 홀더 집중도 분석 불가</div>
            </div>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>크래시 원인 2: 레버리지 언와인드</div>
              <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.6 }}>4/9 당시 선물/현물 51:1 극단 레버리지 + 얇은 현물 유동성. 소규모 반전 → 청산 캐스케이드. 이후 OI/MCap 26%로 정상화됨</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "#0d1f15", borderRadius: 6, padding: "10px 12px", border: "1px solid #1a3a25" }}>
              <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, marginBottom: 4 }}>회복 근거</div>
              <div style={{ fontSize: 12, color: "#88ccaa", lineHeight: 1.6 }}>실제 프로덕트(AI RPG). Animoca/Galaxy/Spartan/Folius 투자. $5M+ 펀딩. 크래시 저점 $0.1038에서 $0.9267로 +793% 회복 (ATH 재돌파). 온체인 매수 $90K/hr</div>
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
            ["레버리지", "2-3x 이하 (4/9 크래시 재발 리스크 + 감사 미해결)", "#ef4444"],
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
        <span style={{ fontSize: 11, color: "#06b6d4", background: "#0a1a1f", padding: "3px 8px", borderRadius: 4, border: "1px solid #153a45", fontWeight: 700 }}>MEV BOT 매수 활동</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: CoinGecko, Venice.ai, Bankless Times, On-chain Radar, Arkham</div>

      {/* Verdict */}
      <div style={{ background: "linear-gradient(135deg, #0a1a1f 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #153a45", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#06b6d4", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#06b6d4" }}>강한 업트렌드 — 조정 시 롱 or $10 저항 숏</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>60일 +208.7% / 30일 +44.7%. 71% 스테이킹으로 float 얇음. MEV bot DEX 매수 활동 (Wintermute 라벨 미확인). 바이백&번 가속. Binance 미상장=잠재 촉매. 2025.1 Wintermute $1.4M 덤프 전력 주의</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["60d", "+208.7%", "#34d399"], ["소각", "42.3%", "#06b6d4"], ["스테이킹", "71%", "#06b6d4"], ["ATH", "-60.2%", "#f59e0b"]].map(([label, val, col]) => (
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
            ["24h", VVV_MARKET.change24h, "#34d399", false],
            ["7d", VVV_MARKET.change7d, "#34d399", false],
            ["30d", VVV_MARKET.change30d, "#34d399", false],
            ["60d", VVV_MARKET.change60d, "#34d399", false],
            ["시가총액", VVV_MARKET.mcap, "#ccc", false],
            ["FDV", VVV_MARKET.fdv, "#ccc", false],
            ["유통량", VVV_MARKET.circulating, "#ccc", false],
            ["ATH Drop", VVV_MARKET.athDrop, "#ef4444", false],
            ["OI (미결제약정)", VVV_MARKET.oi, "#60a5fa", false],
            ["OI / MCap", VVV_MARKET.oiMcapRatio, "#888", false],
            ["펀딩비", VVV_MARKET.fundingRate, "#34d399", false],
            ["L/S Ratio", VVV_MARKET.longShort, "#34d399", false],
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
              ["RSI", VVV_TECHNICALS.rsi, "#888"],
              ["Wintermute 검증", VVV_TECHNICALS.wintermute, "#f59e0b"],
              ["스테이킹", VVV_TECHNICALS.staking, "#888"],
              ["신규 바이어", VVV_TECHNICALS.freshBuyer, "#34d399"],
              ["과거 덤프", VVV_TECHNICALS.historicalDump, "#ef4444"],
              ["DIEM 시스템", VVV_TECHNICALS.diem, "#06b6d4"],
              ["바이백&번", VVV_TECHNICALS.burnRate, "#06b6d4"],
              ["GoPlus ⚠️", VVV_TECHNICALS.goplus, "#ef4444"],
              ["촉매", VVV_TECHNICALS.keyCatalyst, "#06b6d4"],
              ["창업자", VVV_TECHNICALS.founder, "#888"],
            ].filter(([, v]) => v).map(([label, val, col]) => (
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
          <div style={{ marginTop: 8, fontSize: 11, color: "#06b6d4" }}>스테이킹 컨트랙트에 32.4M (71.3%) 락업 — 대량 출금 = 매도 7일 전 경고. MEV bot(0x51c7/0xa836) DEX 매수 활동 확인 (Wintermute 라벨 미검증)</div>
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
              <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, marginBottom: 4 }}>2026.04 현재 (MEV bot 매수)</div>
              <div style={{ fontSize: 12, color: "#88ccaa", lineHeight: 1.6 }}>0x51c7/0xa836 MEV bot들이 DEX에서 매수 활동 확인. 2026-04-15: 신규 지갑 0x1afE...가 $444K sVVV 매수. 단, BaseScan 공식 라벨된 Wintermute(0xdbf5)는 VVV 0 보유 — "Wintermute 주도" 클레임은 미검증</div>
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
            ["MEV Bot 전환 감시", "매수→매도 전환 시 즉시 롱 청산. 0x51c7/0xa836 온체인 모니터링 가동 중", "#ef4444"],
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
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: TradingView (Binance Futures), Velo, Arkham, CoinGecko</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a0a0e 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #2a1418", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#ef4444" }}>SIREN 패턴 + 펀딩비 과열 — 크래시 미발생, 공고화 중</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>4/11 ATH $0.1384 후 -9% 공고화. 펀딩비 +0.113% 8h (연환산 ~124%), OI/MCap 28% (Binance only), MA200 대비 +248%. $0.10 이탈 시 캐스케이드</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["펀딩비", "+0.113%", "#ef4444"], ["OI/MCap", "28%", "#f59e0b"], ["MA200 이격", "+248%", "#ef4444"], ["SIREN", "공고화", "#f59e0b"]].map(([label, val, col]) => (
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
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>+0.113%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>연환산</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>~124%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#f59e0b", textTransform: "uppercase" }}>OI (Binance)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b" }}>$35.5M</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>MA200 이격</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>+248%</div>
            </div>
            <div style={{ fontSize: 11, color: "#888", marginLeft: "auto" }}>Binance API · 2026-04-13</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[
              ["롱 청산 (4/11)", "1.385M", "#ef4444"],
              ["숏 청산 (4/11)", "722K", "#34d399"],
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
              펀딩비 +0.113% 8h = 4/11 0.2058% 정점에서 축소되었으나 여전히 극단 (연환산 ~124%). 롱 포지션 유지비만으로 자본 소모 가속.
              OI $35.5M (Binance only, Bybit 미상장)은 시총 $125.5M의 28% — 절대 극단은 아니지만 펀딩비만으로도 롱 포지션 소진 유인.
              4/11 ATH $0.1384 후 크래시 없이 공고화 지속. MA200 $0.036 대비 +248% 이격 = 역사적 수준. $0.10 이탈 시 캐스케이드 가능.
              역사적으로 펀딩비 0.1%+ 구간에서 반전한 사례 다수 (PEPE -35%, BONK -40%, WIF -45%).
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
              ["MA14", SKYAI_TECHNICALS.ma14, "현재가 대비 +48%"],
              ["MA21", SKYAI_TECHNICALS.ma21, "현재가 대비 +57%"],
              ["MA35", SKYAI_TECHNICALS.ma35, "현재가 대비 +79%"],
              ["MA50", SKYAI_TECHNICALS.ma50, "현재가 대비 +102%"],
              ["MA100", SKYAI_TECHNICALS.ma100, "현재가 대비 +161%"],
              ["MA200", SKYAI_TECHNICALS.ma200, "현재가 대비 +248%"],
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
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: Arkham, CoinGecko, Bubblemaps, On-chain Radar, CoinMarketCap</div>

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
            ["ATH Drop", GWEI_DATA.athDrop, "#ef4444", false],
            ["시가총액", GWEI_DATA.mcap, "#ccc", false],
            ["FDV", GWEI_DATA.fdv, "#ccc", false],
            ["유통량", GWEI_DATA.circulating, "#ef4444", false],
            ["OI (미결제약정)", GWEI_DATA.oi, "#60a5fa", false],
            ["OI / MCap", GWEI_DATA.oiMcapRatio, "#888", false],
            ["24h 청산", GWEI_DATA.liq24h, "#f59e0b", false],
            ["펀딩비", GWEI_DATA.fundingRate, "#888", false],
            ["24h 거래량", GWEI_DATA.vol24h, "#ccc", false],
            ["ATH", GWEI_DATA.ath, "#888", false],
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

// ============================================================
// CYS (Cysic) Standalone Analysis — 2026-04-12
// Sources: BscScan, CoinGecko, Cysic Foundation Docs, @0xInChain Twitter, CryptoRank
// ============================================================
const CYS_DATA = {
  price: "$0.2794", mcap: "$44.9M", fdv: "$279.4M", vol24h: "$14.0M",
  oi: "$16.6M (Binance $14.2M + Bybit $2.4M)", oiMcapRatio: "40% (높음 — 펀딩 과열)",
  fundingRate: "+0.125% Binance / +0.070% Bybit 8h (연환산 ~137% — 롱 과열)",
  change24h: "+4.02%", change7d: "+8%",
  circulating: "160.8M / 1B (16.08%)",
  athDrop: "ATH $0.75 (-65% / Bithumb 개장 $6.24 기준 -96%)",
  chain: "BNB Chain (+ Base, Ethereum)",
  exchanges: "Gate, Bitget, Bithumb, Binance Alpha, MEXC, Kraken",
  team: "2022 설립 (ZK/하드웨어 엔지니어 + 암호학자)",
  funding: "Seed $6M (2023.02) + Series A $12M (2024.05)",
  tge: "2025-12-11 (Binance Alpha 첫 상장)",
  ath: "$0.7508 (2026-03-22)",
  atl: "$0.1332 (2026-01-30)",
  verdict: "Gnosis Safe 완전 고갈 + 12월 Cliff 구조적 리스크",
  verdictColor: "#ef4444",
  redFlags: [
    "Gnosis Safe 0xF97d...4228: 2026-04-10에 두 개의 평행 웨일로 각 5M CYS 동시 분산 (0xF8CA..79b4d + 0xfBb66EA7..) → 2026-04-12 05:01 UTC 4개 지갑에 9.996M CYS ($2.25M) 2차 분산 → 현재 잔고 5 CYS (완전 고갈). 총 유출 19M+ CYS ($4.26M)",
    "2차 분산은 @0xInChain 경고 트윗 게시 25분 뒤 실행. 4개 지갑으로 쪼갠 classic trail obfuscation. 트윗은 1차 절반(5M)만 포착했을 뿐 동시 평행 출고(또 다른 5M)를 놓쳤음",
    "현 유통 160.8M = Community & Liquidity 할당 16.08%와 정확히 일치 → Investors/Contributors/Foundation 43.73% 전량 아직 cliff 중",
    "Investors 23.62% (236M) 1년 cliff, 2026-12-11 개시 → 12개월 linear. 평균 acq $0.04 추정 → 현가 기준 +460% 수익",
    "FDV $258.5M vs MCap $41.6M = 6.21배 디버전스. 언락 대기 물량이 시총의 5.2배",
    "ATH $0.7508 (2026-03-22) → 현재 $0.26 = -65%. Bithumb 3/12 개장가 $6.24 기준으로는 -96%",
    "67% 베어리시 커뮤니티 센티먼트 (CoinGecko 폴)",
  ],
  greenFlags: [
    "실제 팀 + 실제 프로덕트 (zkVM 'Venus' 오픈소스 5일 전 출시)",
    "Polychain 계열 VC 펀딩 트랙 있음 (Seed $6M + Series A $12M)",
    "Binance Alpha, Bithumb, Kraken 상장 (컴플라이언스 통과)",
    "MCap/FDV 0.16 = 아직 16% 유통이라 오히려 상승 여지 (단, cliff 전까지)",
    "Cliff가 선형 12m라 즉시 덤프는 아님. 월별 유입 압력 분산",
  ],
};

const CYS_LEVELS = [
  { type: "R", label: "R3", price: "$0.40", note: "직전 박스권 고점 / 심리적 저항" },
  { type: "R", label: "R2", price: "$0.32", note: "50일 EMA 추정" },
  { type: "R", label: "R1", price: "$0.29", note: "최근 단기 고점" },
  { type: "NOW", label: "현재가", price: "$0.2794", note: "+4.02% 24h 지속 반등" },
  { type: "S", label: "S1", price: "$0.21", note: "4월 중간 지지" },
  { type: "S", label: "S2", price: "$0.13", note: "ATL $0.1332 (2026-01-30)" },
  { type: "S", label: "S3", price: "$0.08", note: "Cliff 선반영 시 타겟" },
];

const CYS_TOKENOMICS = [
  { name: "Ecosystem", pct: "40.19%", schedule: "점진 배분 (no cliff)", color: "#3b82f6" },
  { name: "Investors", pct: "23.62%", schedule: "1y cliff + 12m linear → 2026-12-11", color: "#ef4444" },
  { name: "Community & Liquidity", pct: "16.08%", schedule: "TGE 일괄 (현재 유통 = 이 버킷)", color: "#10b981" },
  { name: "Contributors", pct: "12.11%", schedule: "1y cliff + 36m linear → 2026-12-11", color: "#f59e0b" },
  { name: "Foundation", pct: "8.00%", schedule: "1y cliff + 24m linear → 2026-12-11", color: "#8b5cf6" },
];

const CYS_ARKHAM = [
  { label: "Gnosis Safe (고갈)", addr: "0xf97d8e9a6D5b2FB05423a222C9E390d46b744228", detail: "2025-12-12 생성 · 현재 잔고 5 CYS ($1.12) · 48시간 내 총 19,001,000 CYS ($4.26M) 유출" },
  { label: "웨일 #1", addr: "0xF8CA0FCeD2001BE6B99D4100E42120Ac4Fc79b4d", detail: "2026-04-10 08:24+08:37 UTC · 5M CYS 수신 · EOA, BNB 0, 송금 0건 — 홀드 상태 (가스 미확보)" },
  { label: "웨일 #2 (병렬)", addr: "0xfBb66EA7...", detail: "2026-04-10 09:20+09:24 UTC · 5M CYS 수신 · 첫 번째 웨일과 동시 평행 출고 (트윗은 포착 못함)" },
  { label: "웨일 #3", addr: "0xE66ab72d...C3a20DaEb", detail: "2026-04-12 05:01 UTC · 2,499,000 CYS 수신 (2차 분산, 신규 지갑)" },
  { label: "웨일 #4", addr: "0xd113feF4...721d7D5f7", detail: "2026-04-12 05:01 UTC · 2,499,000 CYS 수신 (2차 분산, 신규 지갑)" },
  { label: "웨일 #5", addr: "0x87b82D1e...B475f94dc", detail: "2026-04-12 05:01 UTC · 2,499,000 CYS 수신 (2차 분산, 신규 지갑)" },
  { label: "웨일 #6", addr: "0x9F254079...04840A70d", detail: "2026-04-12 05:01 UTC · 2,499,000 CYS 수신 (2차 분산, 신규 지갑)" },
];

const CYS_SCENARIOS = [
  {
    id: "A", title: "숏: 웨일 거래소 입금 감지 후 진입", priority: "1순위",
    entry: "웨일 지갑 → CEX deposit 감지 시 ($0.24-0.28)", sl: "$0.30 (R1 돌파 시)", tp1: "$0.19 (R:R ≈ 1:2)", tp2: "$0.14 (ATL 근접, R:R ≈ 1:3.5)",
    signal: "BscScan 모니터링: 6개 웨일 지갑 (0xF8CA.., 0xfBb6.., 0xE66a.., 0xd113.., 0x87b8.., 0x9F25..) 중 어느 하나라도 BNB 가스 충전 수신 → 즉시 Gate/Bitget/MEXC deposit 주소로 전송하는 패턴. Arkham 알림 설정",
    rationale: "Gnosis Safe에서 19M CYS (유통의 ~12%)가 직전 48시간 내 6개 EOA로 분산. 현재 모든 수신 지갑 BNB 0, out-tx 0 = 덤프 대기 자세. @0xInChain 트윗 이후 Safe 완전 고갈 = 추가 출고 불가능, 남은 압력은 수신 지갑 6곳에 집중. 24h vol $30M이 흡수 가능 상한 — 19M CYS ($4.26M) = 14% 물량 충격",
    risk: "수신 지갑이 OTC나 장기 홀드일 수도 있음 (가스 미확보는 일시적). Cysic 팀이 zkVM 'Venus' 출시 같은 펀더멘털 촉매 발표 시 반등. 소규모 포지션 + 타이트 손절",
    color: "#ef4444",
  },
  {
    id: "B", title: "숏: 12월 Cliff 선반영 (장기)", priority: "2순위",
    entry: "2026-11-01 ~ 2026-11-15 사이 반등 시 $0.28-0.35", sl: "$0.42", tp1: "$0.18 (R:R ≈ 1:2)", tp2: "$0.10 (Cliff 당일 타겟)",
    signal: "D-30 선반영 시작 시점. RSI 다이버전스 + OBV 감소 + 선물 OI 급증 확인. 역사 사례: TIA, APT, PYTH 모두 1년 cliff D-30부터 -40~-60% 선반영",
    rationale: "437.3M CYS 신규 유통 개시 (현 유통 160.8M의 272%). Investors는 평균 $0.04에서 확보 → 현가에서 +460% 수익이므로 linear 해제 즉시 매도 유인. 월 36.4M CYS 유입 = $8.2M 월간 매도 압력 vs 24h vol $30M",
    risk: "Cliff 연기/재설계 DAO 제안 가능성 (PYTH 사례처럼). 선형 vesting이라 첫 달이 가장 약할 뿐 지속 압력. 장기 포지션 유지 비용",
    color: "#f59e0b",
  },
  {
    id: "C", title: "관찰: Venus zkVM 촉매 롱 (조건부)", priority: "관찰",
    entry: "$0.13-0.15 (ATL 재테스트 시)", sl: "$0.11", tp1: "$0.22 (+60%)", tp2: "$0.30",
    signal: "웨일 덤프 완료 후 거래량 소멸 + 3일 이상 바닥 횡보. Cysic 측에서 zkVM 'Venus' 실제 채택/파트너십 발표 시",
    rationale: "프로젝트 자체는 real-product. 2026-04-07 경 Venus open-source 출시 = 구조적 언락과 분리된 펀더멘털 카탈리스트. 바닥권에서 인사이더 물량 해소 후 턴어라운드 가능",
    risk: "Cliff가 8개월 남았으므로 근본적인 오버행 해소 불가. 롱은 스윙 (수일~2주) 범위만. 12월 전 청산 필수",
    color: "#34d399",
  },
];

const CYS_CATALYSTS = [
  { date: "2023.02", event: "Seed round $6M 유치 (ZK hardware 스타트업)", impact: "펀딩", done: true },
  { date: "2024.05", event: "Series A $12M 유치", impact: "펀딩", done: true },
  { date: "2025.12.11", event: "TGE · Binance Alpha 상장. Community & Liquidity 16.08% 유통 개시", impact: "런칭", done: true },
  { date: "2025.12.12", event: "Gnosis Safe 0xF97d...4228 생성 (유통 풀 운영용)", impact: "인프라", done: true },
  { date: "2026.01.30", event: "ATL $0.1332 도달", impact: "바닥", done: true },
  { date: "2026.03.12", event: "Bithumb 상장. 개장 $6.24 → $0.75 영역까지 크래시", impact: "개장 폭등/폭락", done: true },
  { date: "2026.03.22", event: "ATH $0.7508 (CoinGecko 기준)", impact: "고점", done: true },
  { date: "2026.04.07", event: "zkVM 'Venus' 오픈소스 출시 (펀더멘털)", impact: "제품", done: true },
  { date: "2026.04.10 08:24/08:37", event: "Gnosis Safe → 0xF8CA..79b4d 1K 테스트 + 4,999,000 CYS ($1.12M) 본대 (웨일 #1)", impact: "웨일 1차", done: true },
  { date: "2026.04.10 09:20/09:24", event: "Gnosis Safe → 0xfBb66EA7.. 1K 테스트 + 4,999,000 CYS ($1.12M) 병렬 송출 (웨일 #2, 트윗 미포착)", impact: "웨일 1차", done: true },
  { date: "2026.04.12 04:36", event: "@0xInChain 트윗: 'Gnosis Safe 백만달러 제출' 경고 (첫 번째 웨일만 언급)", impact: "여론", done: true },
  { date: "2026.04.12 04:35 + 05:01", event: "Safe → 4개 신규 지갑 9.996M CYS ($2.25M) 2차 분산 (트윗 25분 뒤). Safe 잔고 5 CYS (완전 고갈)", impact: "웨일 2차", done: true },
  { date: "48시간 집계", event: "총 유출 19,001,000 CYS ≈ $4.26M · 6개 EOA로 분산", impact: "결산", done: true },
  { date: "진행중", event: "5개 수신 지갑 BNB 가스 충전 → 거래소 입금 감지 대기", impact: "핵심 트리거", done: false },
  { date: "2026.12.11", event: "1년 Cliff 개시 — Investors 23.62% + Contributors 12.11% + Foundation 8% = 437.3M CYS linear 해제 시작", impact: "구조적 초대형", done: false },
];

// ============================================================
// INX (Infinex) Analysis Data — 2026-04-13
// Source: Binance/Bybit Futures API, CoinGecko, Arkham, On-chain Radar
// ============================================================
const INX_DATA = {
  price: "$0.01510", mcap: "$30.2M", fdv: "$151M", vol24h: "$202M (급증 — 청산 캐스케이드)",
  oi: "$3.51M (Binance ~$3.51M, Bybit 축소)", oiMcapRatio: "11.6% (디레버리지 완료)",
  fundingRate: "+0.005% Binance (중립 리셋)",
  fundingAnnualized: "극단 과열 → 중립 리셋 완료 (mean revert 실현)",
  athPrice: "$0.033", athDate: "2026.01.30 (TGE)", athDrop: "-54% from ATH / -33% 24h 롤링",
  atlPrice: "$0.01067", atlDate: "2026년 내 형성",
  circulating: "2B / 10B (20%)",
  change24h: "-32.52%", change7d: "-40%", change30d: "N/A",
  chain: "Multi-chain (Ethereum, Solana, Base, Arbitrum 외 9체인)",
  category: "DeFi 슈퍼앱 / 크로스체인 애그리게이터",
  exchanges: "Binance Alpha, Bybit, KuCoin, Gate, MEXC, Bitget, Kraken",
  futuresExchanges: "Binance Futures + Bybit Futures",
  founder: "Kain Warwick (Synthetix 창업자)",
  investors: "Framework Ventures, Solana Ventures, Wintermute, Bankless, Eden Block",
  verdict: "**✅ 숏 시나리오 A/A1 완전 실현** — $0.024 → $0.0147 (-38.6%). TP1 돌파, TP2 근접",
  verdictColor: "#34d399",
  redFlags: [
    "**2026-10 Team 2B INX (유통 100%) 12개월 linear 언락 D-175** — 구조적 overhang 지속",
    "2027-01-30 Patron Locked NFT 클리프 + Sonar Sale 언락 (장기 매도 압력)",
    "FDV $147M vs MCap $29.5M = 5x 디버전스 (잠금 물량이 시총의 5배)",
    "크래시 후 바닥 매수 리스크 — 기술적 반등 짧을 가능성",
  ],
  greenFlags: [
    "**숏 A1/A2 시나리오 100% 실현** — $0.024→$0.0147 -38.6% (TP1 $0.019 통과)",
    "펀딩비 극단 과열 → 중립 리셋 완료 (논제 검증)",
    "Kain Warwick (Synthetix 창업자) — 실제 프로덕트 기반 바닥 강함",
    "Framework/Solana/Wintermute 기관 투자 지속",
    "디레버리지 완료 (OI $10.7M → $3.51M, -67%)",
  ],
};

const INX_LEVELS = [
  { type: "R", label: "R3", price: "$0.033", note: "TGE ATH (2026.01.30)" },
  { type: "R", label: "R2", price: "$0.024", note: "4/13 전고점 (숏 진입점)" },
  { type: "R", label: "R1", price: "$0.018", note: "최근 반등 저항" },
  { type: "NOW", label: "현재가", price: "$0.01473", note: "**24h -16.68% 크래시** — 숏 시나리오 A1/A2 100% 실현" },
  { type: "S", label: "S1", price: "$0.0135", note: "TP2 타겟 (거의 도달)" },
  { type: "S", label: "S2", price: "$0.012", note: "ATL 하회 타겟" },
  { type: "S", label: "S3", price: "$0.01067", note: "ATL 바닥" },
];

const INX_TOKENOMICS = [
  { name: "Patron NFT", pct: "44.04%", schedule: "다양한 베스팅 (Locked 36m cliff+vest / Unlocked 24m daily)", color: "#3b82f6" },
  { name: "Team/Advisors", pct: "20%", schedule: "2026-10 cliff 후 12m linear — 월 167M INX", color: "#ef4444" },
  { name: "Investors", pct: "미공개", schedule: "Framework/Solana VC/Wintermute (정확 할당 미공개)", color: "#8b5cf6" },
  { name: "Ecosystem/Treasury", pct: "~30%", schedule: "미공개", color: "#f59e0b" },
  { name: "Sonar Sale", pct: "5%", schedule: "1년 락 (2027.01.30) or 조기 언락 (decaying FDV)", color: "#34d399" },
];

const INX_ARKHAM = [
  { label: "베스팅 매도 #1 (실측)", addr: "0x7489661eE3dE9216D4920A8fEf911f1a31B9764a", detail: "잔고: 8,995,879 INX ($162K @ spot $0.018). 2026-03-24 15.2M INX 수령 (vesting src 0xc78974d8). 4/13 17:07 → CoW Protocol Settlement (0x9008d19f58) 3.79M INX 전송 확인. 4/13 추가 매도 총 ~6.79M INX ($122K spot)" },
  { label: "베스팅 매도 #2 (실측)", addr: "0xB568c358A5c7424875D907610aF2eB936823A27A", detail: "잔고: 10,868,942 INX ($194K @ spot). TGE 당일 2026-01-31: 41.45M 수령 후 즉시 16M 덤프 이력. 2026-02-27 5.3M 추가. 4/13 17:10~17:35: 20.18M INX ($363K spot) 대규모 매도" },
  { label: "실측 매도 요약 (4/13)", addr: "—", detail: "W1 $122K + W2 $363K = 총 $485K 오늘 매도 (스크린샷 $400K 주장 vs 실측 $485K — 과소 보고). 잠재 매도 잔여: W1+W2 합계 19.86M INX = $356K spot / $477K futures" },
  { label: "매집 지갑 #1 (MM bot)", addr: "0x5Deb6F32f9Ba3f44871F77756dB1204Ddec0AE65", detail: "잔고: 0 (즉시 분배 패턴). 4/13 16:48-17:57 사이 15+ 트랜잭션, Uniswap 풀 직접 상호작용. 활발한 MM 중립 포지션 — 단순 매집이 아닌 양방향 트레이딩" },
  { label: "라우팅 패턴", addr: "CoW Protocol Settlement (0x9008d19f58)", detail: "W1 4/13 17:07 전송 확인 (3.79M INX). MEV 보호 배치 옥션 경유 — 슬리피지 최소화 + 기관급 분배 시그널" },
];

const INX_SCENARIOS = [
  {
    id: "DONE", title: "✅ 숏 A1/A2 — 완전 실현 (과거 시나리오)", priority: "실현 완료",
    entry: "A1 $0.024 / A2 $0.028-0.0297", sl: "$0.033 (ATH)", tp1: "$0.019 (**통과**)", tp2: "$0.0135 (**거의 도달**)",
    signal: "**REALIZED 2026-04-14**: 4/13 entry $0.024 → 4/14 현재 $0.01510 = -37% 내 완료. TP1 $0.019 통과, TP2 $0.0135 -11% 근접",
    rationale: "펀딩비 +0.491%/4h 극단 + 베스팅 지갑 CoW 분배 + FDV/MCap 5x 디버전스 논제 정확히 실현됨. 4/13 우리 설정 이후 -37% 하락",
    risk: "**이 시나리오는 완료됨. 더 이상 진입 금지.** 현재가 $0.0151에 맞는 새 시나리오(D 또는 E) 참조",
    color: "#34d399",
  },
  {
    id: "D", title: "숏 continuation: $0.017+ 반등 시 (현재가 기준)", priority: "1순위 (new 4/14)",
    entry: "$0.017-0.019 (R1-R2 반등 시)", sl: "$0.020 (+18%)", tp1: "$0.013 (R:R ≈ 1:1.7)", tp2: "$0.010 (R:R ≈ 1:3)",
    signal: "**바이너리 트리거**: (1) $0.017+ 반등 확인 AND (2) 거래량 감소 AND (3) 펀딩 -로 전환되지 않음. 2027-01 클리프 선반영 초기 단계",
    rationale: "entry_mid $0.018, SL $0.020, risk $0.002. TP1 $0.013 reward $0.005 = 1:2.5. TP2 $0.010 reward $0.008 = 1:4. Team 2B 2026-10 클리프 D-170, 여전히 구조적 overhang",
    risk: "-37% 크래시 후 단기 반등 가능성 (dead-cat bounce). 소규모 포지션. 2026-10 클리프까지 6개월 — 장기 포지션 유지 비용",
    color: "#ef4444",
  },
  {
    id: "E", title: "롱: 바닥 매수 $0.011-0.013 (ATL 테스트 시)", priority: "2순위 관찰",
    entry: "$0.011-0.013 (ATL $0.01067 근접)", sl: "$0.010 (ATL 하회)", tp1: "$0.017 (R:R ≈ 1:4)", tp2: "$0.024 (4/13 고점, R:R ≈ 1:9)",
    signal: "**Hard Gate**: (1) 거래량 소멸 + 3일 횡보, AND (2) 펀딩비 중립 유지, AND (3) Kain Warwick 트윗 공식 대응. 바닥 확인 전 진입 금지",
    rationale: "entry_mid $0.012, SL $0.010, risk $0.002. TP1 $0.017 reward $0.005 = 1:2.5. TP2 $0.024 reward $0.012 = 1:6. Kain Warwick (Synthetix 창업자) 트랙 레코드 + Framework/Solana/Wintermute = 펀더멘털 바닥 존재. 2026-10 클리프 전 단기 반등 거래 가능",
    risk: "**2026-10 Team 클리프 기억**: 단기 반등 거래만 허용, 장기 보유 금지. 클리프 전 이익 실현 필수",
    color: "#34d399",
  },
  {
    id: "B", title: "숏 B: 2026-10 Team 클리프 선반영 (장기)", priority: "2순위 / 장기",
    entry: "9월말~10월초 반등 시 $0.025+ (D-30 선반영)", sl: "$0.035", tp1: "$0.015 (R:R ≈ 1:1.5)", tp2: "$0.010 (R:R ≈ 1:2.5)",
    signal: "D-30 선반영 시작. 역사 사례 (TIA, APT, PYTH, ARB, STRK) 모두 클리프 D-30~D-7부터 -30~-60% 선반영. **지금 할 일**: 8월말 알림 설정, 매주 베스팅 컨트랙트 확인, 클리프 연장 DAO 제안 모니터링",
    rationale: "2026-10 Team 2B INX (현 유통의 100%) 12개월 linear 시작. 월 167M INX = 현 유통의 8.3%/월 지속 매도 압력. 2027-01 Patron Locked NFT 클리프 + Sonar Sale 언락 추가. FDV $240M vs MCap $48M = 5배 디버전스. Scenario A → B → C는 순차 플레이북 (대안 아님)",
    risk: "**Kill Switch**: 팀 클리프 연장/재협상 발표 시 즉시 포지션 종료 — ARB·STRK 선례 있음 (PYTH는 DAO 연기 투표로 숏 스퀴즈 발생). Infinex 플랫폼 채택 가속 시 반전 가능. Kain Warwick 트랙 레코드 강력",
    color: "#f59e0b",
  },
  {
    id: "C", title: "롱 C: 클리프 덤프 이후 바닥 매수 (2027+)", priority: "관찰 / 2027+",
    entry: "**2026-10 클리프 덤프 확인 후** $0.008-0.011", sl: "$0.0070", tp1: "$0.018 (R:R ≈ 1:3.0)", tp2: "$0.025 (R:R ≈ 1:5.0)",
    signal: "**Hard Gate**: 2026-10 Team 클리프 실제 덤프 확인 전 진입 금지. 신호: (1) 펀딩비 중립/음수 전환, (2) 월간 언락 매도 소화 확인, (3) Infinex TVL 증가, (4) 3일+ 저점 횡보 안정화",
    rationale: "Kain Warwick (Synthetix 창업자) SNX을 0에서 $1B+ 구축 트랙 레코드. Framework/Solana/Wintermute 지원. Multi-chain DeFi 슈퍼앱 전략 + Synthetix sUSD 통합. 단, 167M/월 매도 감안 시 ATL $0.01067 하회 가능성 높음 — 기존 entry $0.011-0.013은 너무 높음",
    risk: "**조기 진입 절대 금지**: 2026-10 클리프 덤프 확인 전 매수 금지. 현재 ATL $0.01067은 클리프 전 형성된 바닥이라 언더컷 가능성 높음. $0.008 이하 바닥 형성 후 진입 권장. Scenario A/B 숏 완료 후 이어지는 플레이",
    color: "#34d399",
  },
];

const INX_CATALYSTS = [
  { date: "2026.01.03-10", event: "Sonar Sale (공개 판매) — $15M ICO @ $300M 밸류", impact: "자금 조달", done: true },
  { date: "2026.01.30", event: "TGE @ $0.033 ($330M FDV). Binance Alpha + Bybit 조기 상장", impact: "런칭 고점", done: true },
  { date: "2026.02", event: "Early Feb -36% 크래시 (TGE 에어드롭/ICO 수익 실현)", impact: "크래시", done: true },
  { date: "2026.02-04", event: "수개월 $0.011-0.013 ATL 형성, -64% drawdown", impact: "바닥", done: true },
  { date: "2026.03.16", event: "Synthetix sUSD 디포짓 보상 8주 확장 (펀더멘털 통합)", impact: "긍정 촉매", done: true },
  { date: "2026.04.13", event: "24h +87.5% 수직 랠리 ($0.01276 → $0.02973). Binance 펀딩 +0.276% (8h) / Bybit +0.491% (4h) = 연 302-1074% 극단", impact: "극단 과열", done: true },
  { date: "2026.04.13 (진행)", event: "베스팅 지갑 0x7489 + 0xB568 각 $400K CoW 경유 매도, $1M 잔여. 매집 지갑 0x5Deb $100K/hr 대응", impact: "분배 vs 매집", done: true },
  { date: "**2026.04.14**", event: "**크래시 실현 — 24h -16.68% ($0.024 → $0.01473). 어제 대비 -38.6%, 숏 시나리오 A1/A2 100% 실현**. TP1 $0.019 통과, TP2 $0.0135 근접", impact: "**숏 검증 완료**", done: true },
  { date: "2026.04.14 이후", event: "펀딩비 0.276-0.491% → 0.005% 리셋 완료 (mean revert 실현). OI $10.7M → $3.51M (-67% 디레버리지)", impact: "구조 정상화", done: true },
  { date: "2026.10", event: "Team 2B INX (20% 총공급) 12m linear 클리프 만료 — 월 167M 매도 개시", impact: "핵심 하락 리스크", done: false },
  { date: "2027.01.30", event: "Patron Locked NFT 클리프 + Sonar Sale 1년 락 해제", impact: "추가 매도 압력", done: false },
];

// ============================================================
// CysicAnalysis Component
// ============================================================
function CysicAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>CYS</span>
        <span style={{ fontSize: 14, color: "#888" }}>Cysic · ZK Compute / ComputeFi</span>
        <span style={{ fontSize: 11, color: "#ef4444", background: "#1a0a0e", padding: "3px 8px", borderRadius: 4, border: "1px solid #2a1418", fontWeight: 700 }}>WHALE DRAIN + CLIFF</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: BscScan, CoinGecko, Cysic Foundation Docs, @0xInChain, CryptoRank, CoinMarketCap</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a0a0e 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #2a1418", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#ef4444" }}>SHORT — Gnosis Safe 완전 고갈, 웨일 5곳 덤프 대기</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>단기: 웨일 입금 감지 트리거 | 장기: 2026-12-11 Cliff 43.73% 구조적 압력</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["Safe 잔고", "5 CYS", "#ef4444"], ["웨일 대기", "6 지갑", "#ef4444"], ["유통률", "16.08%", "#f59e0b"], ["Cliff D-day", "D-243", "#f59e0b"]].map(([label, val, col]) => (
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
            ["현재가", CYS_DATA.price, "#f0f0f5", true],
            ["24h 변동", CYS_DATA.change24h, "#34d399", false],
            ["7d 변동", CYS_DATA.change7d, "#ef4444", false],
            ["시가총액", CYS_DATA.mcap, "#ccc", false],
            ["FDV", CYS_DATA.fdv, "#ef4444", false],
            ["유통량", CYS_DATA.circulating, "#f59e0b", false],
            ["OI (미결제약정)", CYS_DATA.oi, "#888", false],
            ["펀딩비 (선물)", CYS_DATA.fundingRate, "#888", false],
            ["24h 거래량", CYS_DATA.vol24h, "#ccc", false],
            ["ATH", `${CYS_DATA.ath} (2026.3.22)`, "#888", false],
            ["ATL", `${CYS_DATA.atl} (2026.1.30)`, "#ef4444", false],
            ["체인", CYS_DATA.chain, "#888", false],
            ["거래소", CYS_DATA.exchanges, "#888", false],
            ["TGE", CYS_DATA.tge, "#ccc", false],
            ["투자", CYS_DATA.funding, "#ccc", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tokenomics + S/R */}
      <div style={sectionStyle}>
        {sectionTitle("Tokenomics & S/R")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>토큰 분배 — 43.73% Cliff 대기</div>
            <div style={{ display: "flex", height: 18, borderRadius: 4, overflow: "hidden", marginBottom: 10 }}>
              {CYS_TOKENOMICS.map((t, i) => (
                <div key={i} style={{ width: t.pct, background: t.color, height: "100%" }} title={`${t.name}: ${t.pct}`} />
              ))}
            </div>
            {CYS_TOKENOMICS.map((t, i) => (
              <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid #14161e" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color }} />
                    <span style={{ fontSize: 12, color: "#ccc" }}>{t.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{t.pct}</span>
                </div>
                <div style={{ fontSize: 10, color: "#666", marginTop: 2, paddingLeft: 14 }}>{t.schedule}</div>
              </div>
            ))}
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 10 }}>Support / Resistance Levels</div>
            {CYS_LEVELS.map((lv, i) => {
              const colors = { R: "#ef4444", NOW: "#34d399", S: "#3b82f6" };
              const c = colors[lv.type];
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", marginBottom: 4, borderRadius: 6,
                  background: lv.type === "NOW" ? "rgba(52,211,153,0.08)" : "transparent",
                  border: lv.type === "NOW" ? "1px solid rgba(52,211,153,0.2)" : "1px solid transparent",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c, minWidth: 36 }}>{lv.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lv.type === "NOW" ? "#34d399" : "#ccc", minWidth: 70 }}>{lv.price}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{lv.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* On-chain Evidence — Whale Tracking */}
      <div style={sectionStyle}>
        {sectionTitle("On-chain 증거 — Gnosis Safe 고갈 추적 (BscScan 팩트체크 완료)")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Gnosis Safe (0xf97d...4228) — 잔고 5 CYS ($1.12)</div>
          <div style={{ fontSize: 12, color: "#ccc", lineHeight: 1.7, marginBottom: 12 }}>
            <b>2026-04-10 08:24/08:37 UTC</b>: → 0xF8CA...79b4d <span style={{ color: "#ef4444" }}>5,000,000 CYS ($1.12M) 1차 웨일 (트윗 포착)</span><br/>
            <b>2026-04-10 09:20/09:24 UTC</b>: → 0xfBb66EA7... <span style={{ color: "#ef4444" }}>5,000,000 CYS ($1.12M) 동시 평행 웨일 (트윗 미포착)</span><br/>
            <b>2026-04-12 04:35 UTC</b>: → 4개 신규 지갑 <span style={{ color: "#ef4444" }}>각 1,000 CYS 테스트 (총 4K)</span><br/>
            <b>2026-04-12 05:01 UTC</b>: → 4개 신규 지갑 <span style={{ color: "#ef4444" }}>각 2,499,000 CYS (총 9.996M, $2.25M)</span><br/>
            <span style={{ color: "#f59e0b" }}>→ 총 유출 19,001,000 CYS (~$4.26M) · 현재 Safe 잔고 5 CYS · 2차는 @0xInChain 트윗 25분 뒤 실행</span>
          </div>
          {CYS_ARKHAM.map((w, i) => (
            <div key={i} style={{ background: "#0c0e14", borderRadius: 6, padding: "8px 12px", border: "1px solid #14161e", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: i === 0 ? "#ef4444" : "#f59e0b", minWidth: 90 }}>{w.label}</span>
                <span style={{ fontSize: 10, color: "#666", fontFamily: "monospace" }}>{w.addr}</span>
              </div>
              <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5, paddingLeft: 98 }}>{w.detail}</div>
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "10px 12px", border: "1px solid #2a1418" }}>
              <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>Red Flags</div>
              {CYS_DATA.redFlags.map((f, i) => (
                <div key={i} style={{ fontSize: 11, color: "#ef8888", lineHeight: 1.6, paddingLeft: 8, borderLeft: "2px solid #2a1418", marginBottom: 3 }}>{f}</div>
              ))}
            </div>
            <div style={{ background: "#0d1f15", borderRadius: 6, padding: "10px 12px", border: "1px solid #1a3a25" }}>
              <div style={{ fontSize: 11, color: "#34d399", fontWeight: 600, marginBottom: 4 }}>Green Flags</div>
              {CYS_DATA.greenFlags.map((f, i) => (
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
          {CYS_SCENARIOS.map((sc) => {
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
          {CYS_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", borderBottom: i < CYS_CATALYSTS.length - 1 ? "1px solid #14161e" : "none" }}>
              <div style={{ minWidth: 130, fontSize: 12, fontWeight: 700, color: cat.done ? "#555" : "#f0f0f5" }}>{cat.date}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: cat.done ? "#888" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
              </div>
              <div style={{ minWidth: 90, textAlign: "right" }}>
                <span style={{
                  fontSize: 10, padding: "2px 6px", borderRadius: 3, fontWeight: 600,
                  background: cat.done ? "rgba(107,114,128,0.1)" : "rgba(239,68,68,0.12)",
                  border: `1px solid ${cat.done ? "rgba(107,114,128,0.2)" : "rgba(239,68,68,0.3)"}`,
                  color: cat.done ? "#6b7280" : "#ef4444",
                }}>{cat.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8, marginTop: 8 }}>
        Sources: BscScan (온체인 팩트체크) · CoinGecko · CoinMarketCap · Cysic Foundation Docs · CryptoRank · @0xInChain Twitter · MEXC
      </div>
    </div>
  );
}

// ============================================================
// INX (Infinex) Standalone Analysis Component
// ============================================================
function InxAnalysis({ expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>INX</span>
        <span style={{ fontSize: 14, color: "#888" }}>Infinex · Multi-chain DeFi 슈퍼앱</span>
        <span style={{ fontSize: 11, color: "#ef4444", background: "#1a0a0e", padding: "3px 8px", borderRadius: 4, border: "1px solid #2a1418", fontWeight: 700 }}>FUNDING OVERHEATED</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: Binance/Bybit API (라이브), CoinGecko, Arkham, On-chain Radar</div>

      {/* Verdict Banner */}
      <div style={{ background: "linear-gradient(135deg, #1a0a0e 0%, #0e1018 100%)", borderRadius: 10, border: "1px solid #2a1418", padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#ef4444" }}>3중 숏 시그널 — 펀딩 극단 + 베스팅 분배 + 스팟/선물 26% 프리미엄</div>
            <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>선물 $0.024 vs DEX spot $0.01775 = 26% 콘탱고 (mean-revert 임박). Binance 펀딩 +0.276% (8h, 연 302%) / Bybit +0.491% (4h, 연 1074%). 베스팅 W1+W2 실측 $485K 오늘 매도 (CoW 경유 확인), $356K 잠재 잔여</div>
            <div style={{ fontSize: 11, color: "#f59e0b", marginTop: 6, fontStyle: "italic" }}>⚡ 플레이북: A1 (즉시 스타터) → A2 (반등 피라미드) → B (9~10월 클리프 선반영) → C (2027+ 바닥 매수). 순차 전략, 대안 아님.</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {[["Binance 8h", "+0.276%", "#ef4444"], ["Bybit 4h", "+0.491%", "#ef4444"], ["24h", "+87.5%", "#f59e0b"], ["베스팅", "분배 중", "#ef4444"]].map(([label, val, col]) => (
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
            ["현재가", INX_DATA.price, "#f0f0f5", true],
            ["24h 변동", INX_DATA.change24h, "#34d399", false],
            ["7d 변동", INX_DATA.change7d, "#34d399", false],
            ["ATH Drop", INX_DATA.athDrop, "#f59e0b", false],
            ["시가총액", INX_DATA.mcap, "#ccc", false],
            ["FDV", INX_DATA.fdv, "#ccc", false],
            ["유통량", INX_DATA.circulating, "#ef4444", false],
            ["ATH", `${INX_DATA.athPrice} (${INX_DATA.athDate})`, "#888", false],
            ["OI (Binance+Bybit)", INX_DATA.oi, "#60a5fa", true],
            ["OI / MCap", INX_DATA.oiMcapRatio, "#60a5fa", false],
            ["펀딩비 (4h)", INX_DATA.fundingRate, "#ef4444", false],
            ["연환산 펀딩", INX_DATA.fundingAnnualized, "#ef4444", false],
            ["24h 거래량", INX_DATA.vol24h, "#ccc", false],
            ["체인", INX_DATA.chain, "#888", false],
            ["카테고리", INX_DATA.category, "#888", false],
            ["파생상품", INX_DATA.futuresExchanges, "#888", false],
            ["ATL", `${INX_DATA.atlPrice} (${INX_DATA.atlDate})`, "#888", false],
            ["거래소", INX_DATA.exchanges, "#888", false],
            ["창업자", INX_DATA.founder, "#34d399", false],
            ["투자자", INX_DATA.investors, "#34d399", false],
          ].map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Funding Overheating Alert */}
      <div style={sectionStyle}>
        {sectionTitle("펀딩비 과열 경고 — 역사적 극단 영역")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14, padding: "10px 14px", background: "#1a0a0e", borderRadius: 6, border: "1px solid #2a1418" }}>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>Binance 펀딩 (8h)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>+0.276%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>Bybit 펀딩 (4h)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>+0.491%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>연환산 (Binance)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>~302%</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: "#ef4444", textTransform: "uppercase" }}>연환산 (Bybit)</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ef4444" }}>~1074%</div>
            </div>
            <div style={{ fontSize: 11, color: "#888", marginLeft: "auto" }}>Binance/Bybit API · 2026-04-13</div>
          </div>
          <div style={{ background: "#1a0a0e", borderRadius: 6, padding: "12px 14px", border: "1px solid #2a1418" }}>
            <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 600, marginBottom: 4 }}>펀딩 극단 과열의 의미</div>
            <div style={{ fontSize: 12, color: "#ef8888", lineHeight: 1.7 }}>
              Binance 8h 주기 +0.276% = 연환산 302% (하루 3번 롱 지불). Bybit는 4h 주기로 +0.491% = 연환산 1074% (하루 6번 롱 지불, 2배 속도).
              Bybit는 4일 안에 롱 포지션 자본 전액 소멸시키는 수준. 역사적으로 연환산 300%+ 구간에서 반전한 사례 다수 (PEPE, BONK, WIF).
              24h +87.5% 수직 랠리 직후 = 전형적 FOMO 피크 시그널. 베스팅 지갑 2개가 CoW Protocol (MEV 보호)로 $400K 매도 완료 + $1M 잠재 매도 = 지속 공급 압력.
              DEX 유동성 $3.12M (Uniswap INX/USDC). **스팟 $0.01775 vs 선물 $0.024 = 26% 프리미엄** = 극단적 콘탱고, mean-revert 필연.
            </div>
          </div>
        </div>
      </div>

      {/* Support / Resistance Levels */}
      <div style={sectionStyle}>
        {sectionTitle("Support / Resistance Levels")}
        <div style={cardStyle}>
          {INX_LEVELS.map((lv, i) => {
            const colors = { R: "#ef4444", NOW: "#34d399", S: "#3b82f6" };
            const c = colors[lv.type];
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 4, borderRadius: 6,
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

      {/* Tokenomics */}
      <div style={sectionStyle}>
        {sectionTitle("Tokenomics & Vesting")}
        <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
          <div style={{ display: "flex", height: 18, borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
            {INX_TOKENOMICS.map((t, i) => (
              <div key={i} style={{ width: t.pct, background: t.color, height: "100%" }} title={`${t.name}: ${t.pct}`} />
            ))}
          </div>
          {INX_TOKENOMICS.map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 0.7fr 2.5fr", gap: 8, padding: "6px 0", borderBottom: "1px solid #14161e" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color }} />
                <span style={{ fontSize: 12, color: "#ccc" }}>{t.name}</span>
              </div>
              <span style={{ fontSize: 12, color: "#888", fontWeight: 700 }}>{t.pct}</span>
              <span style={{ fontSize: 11, color: "#666" }}>{t.schedule}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: "8px 12px", background: "#1a0a0e", borderRadius: 4, border: "1px solid #2a1418" }}>
            <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 600 }}>핵심 위험: </span>
            <span style={{ fontSize: 11, color: "#ef8888" }}>FDV $240M vs MCap $48M = 5배 디버전스. 잠금 물량이 현 시총의 5배. 2026-10 Team 클리프부터 월 167M INX 매도 압력</span>
          </div>
        </div>
      </div>

      {/* Arkham On-chain */}
      <div style={sectionStyle}>
        {sectionTitle("Arkham On-chain — 베스팅 분배 vs MM 매집")}
        <div style={cardStyle}>
          {INX_ARKHAM.map((w, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: i < INX_ARKHAM.length - 1 ? "1px solid #14161e" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#f0f0f5" }}>{w.label}</span>
                <span style={{ fontSize: 10, color: "#555", fontFamily: "monospace" }}>{w.addr}</span>
              </div>
              <div style={{ fontSize: 11, color: "#888", lineHeight: 1.5 }}>{w.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Red/Green Flags */}
      <div style={sectionStyle}>
        {sectionTitle("Red Flags & Green Flags")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Red Flags</div>
            {INX_DATA.redFlags.map((f, i) => (
              <div key={i} style={{ fontSize: 11, color: "#ef8888", lineHeight: 1.6, paddingLeft: 10, borderLeft: "2px solid #2a1418", marginBottom: 4 }}>{f}</div>
            ))}
          </div>
          <div style={{ ...cardStyle, borderLeft: "3px solid #34d399" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", marginBottom: 8 }}>Green Flags</div>
            {INX_DATA.greenFlags.map((f, i) => (
              <div key={i} style={{ fontSize: 11, color: "#88ccaa", lineHeight: 1.6, paddingLeft: 10, borderLeft: "2px solid #1a3a25", marginBottom: 4 }}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios")}
        <div style={{ display: "grid", gap: 12 }}>
          {INX_SCENARIOS.map((sc) => {
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

      {/* Catalysts */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={cardStyle}>
          {INX_CATALYSTS.map((cat, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", borderBottom: i < INX_CATALYSTS.length - 1 ? "1px solid #14161e" : "none" }}>
              <div style={{ minWidth: 120, fontSize: 12, fontWeight: 700, color: cat.done ? "#555" : "#f0f0f5" }}>{cat.date}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: cat.done ? "#888" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
              </div>
              <div style={{ minWidth: 100, textAlign: "right" }}>
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
        Sources: Binance Futures API · Bybit API v5 · CoinGecko · CoinMarketCap · Arkham Intelligence · Etherscan · The Block · Infinex Official Docs
      </div>
    </div>
  );
}

// ============================================================
// Multi-Token Analysis Data — 2026-04-14
// Live Binance+Bybit API verified. 7 tokens added via token-analysis skill.
// ============================================================

// ============================================================
// ENJ (Enjin Coin) — Short-Squeeze Extreme
// ============================================================
const ENJ_DATA = {
  token: "ENJ", name: "Enjin Coin", chain: "Ethereum (+ Polygon, Harmony)",
  category: "GameFi / NFT 인프라", icon: "🎮",
  price: "$0.04516", mcap: "$88.0M", fdv: "$89.4M", vol24h: "$1.03B",
  oi: "$22.15M (Binance $13.0M + Bybit $9.2M)", oiMcapRatio: "25.2%",
  fundingRate: "-0.228% Binance 8h / **-0.365% Bybit 1h** (연환산 -3196%)",
  fundingAnnualized: "Bybit 1h 주기 = 하루 24번 부담. 역사적 극단 숏 스퀴즈",
  athPrice: "$4.82", athDate: "2021.11.25", athDrop: "-99.06%",
  atlPrice: "$0.01740", atlDate: "2026.03.08",
  circulating: "1.95B / 1.98B (98.35%)",
  change24h: "+23.15%", change7d: "+128.83%", change30d: "+144.79%",
  exchanges: "Binance, Upbit, Coinbase, Kraken, Bybit, OKX",
  futuresExchanges: "Binance Futures 8h / Bybit Futures 1h",
  founder: "Maxim Blagov (CEO), Witek Radomski (CTO)",
  verdict: "과매수 RSI 87 + 극단 숏 스퀴즈 진행 — 위험한 숏 기회",
  verdictColor: "#f59e0b",
  redFlags: [
    "RSI 87.29 극단 과매수 — 단기 조정 확률 높음",
    "Bybit 1h 펀딩비 -0.365% (연환산 -3196%) = 숏 포지션이 롱에게 지불 중, 숏 과다 포지셔닝",
    "24h +23%, 7d +129%, 30d +145% 수직 랠리 = 수익 실현 압력",
    "ATL $0.0174 (3/8)에서 +160% 반등 = 단기 exit liquidity",
    "DEX 유동성 매우 얇음 ($117K) — CEX 의존",
    "**온체인 주의**: Ethereum 컨트랙트 0xf629는 ENJ 1.0 legacy. Top holder 43% = burn address (ENJ 2.0 migration). 실제 primary는 Efinity 파라체인",
  ],
  greenFlags: [
    "Fully unlocked (98.35% circulating) — 추가 희석 리스크 없음",
    "GameFi 섹터 로테이션 + Hyperbridge 크로스체인 출시 예정",
    "Microsoft, Square Enix, Samsung 기존 파트너십",
    "숏 포지션 과다 = 추가 스퀴즈 leg 가능",
    "24h 거래량 $1B (Binance Futures) = 강한 유동성",
  ],
};
const ENJ_LEVELS = [
  { type: "R", label: "R3", price: "$0.060", note: "심리적 저항, 추가 스퀴즈 타겟" },
  { type: "R", label: "R2", price: "$0.0510", note: "24h 고점 영역" },
  { type: "R", label: "R1", price: "$0.048", note: "직전 고점" },
  { type: "NOW", label: "현재가", price: "$0.0452", note: "24h +23% 극단 과매수, RSI 87" },
  { type: "S", label: "S1", price: "$0.035", note: "피보 38.2% 되돌림" },
  { type: "S", label: "S2", price: "$0.030", note: "피보 50% + 주요 지지" },
  { type: "S", label: "S3", price: "$0.0174", note: "ATL (2026.03.08)" },
];
const ENJ_TOKENOMICS = [
  { name: "ENJ/EFI Migrated", pct: "53.22%", schedule: "TGE 2017 완료, 100% 유통", color: "#3b82f6" },
  { name: "Early Governance", pct: "14.04%", schedule: "Migration 완료", color: "#8b5cf6" },
  { name: "Staking", pct: "12.44%", schedule: "Staking rewards", color: "#06b6d4" },
  { name: "Ecosystem", pct: "11.20%", schedule: "Ecosystem grants", color: "#f59e0b" },
  { name: "Company", pct: "5.60%", schedule: "Company treasury", color: "#34d399" },
  { name: "Team", pct: "3.50%", schedule: "Vesting 완료", color: "#ef4444" },
];
const ENJ_SCENARIOS = [
  {
    id: "A1", title: "숏 A1: 즉시 스타터 (사이즈 20-30%)", priority: "1순위 / 즉시",
    entry: "$0.0452 (현재가, 소규모)", sl: "$0.055 (+22%)", tp1: "$0.035 (R:R ≈ 1:1.06)", tp2: "$0.030 (R:R ≈ 1:1.55)",
    signal: "**즉시 진입 (소규모)**: 스퀴즈 모멘텀이 너무 강해서 바운스를 기다리면 기회 놓침 가능. 목표 사이즈의 20-30%만 구축",
    rationale: "entry $0.0452, SL $0.055, risk $0.0098. TP1 $0.035 reward $0.0102 = 1:1.04. 정직한 R:R 낮음 — A2 피라미딩 필수. RSI 87 극단 과매수 + Bybit 1h 펀딩 -0.365%",
    risk: "**숏 스퀴즈 2차 leg 위험**: Bybit 1h 펀딩 연환산 -3196%는 숏 과다 포지션. 추가 스퀴즈 $0.06+ 가능. 20-30% 이상 진입 금지. Thesis invalidation: 펀딩비 양수 전환 시 즉시 종료",
    color: "#ef4444",
  },
  {
    id: "A2", title: "숏 A2: $0.048+ 반등 시 피라미드 (사이즈 70-80%)", priority: "1순위 / 피라미드",
    entry: "$0.048-0.051 (R1-R2 반등)", sl: "$0.055", tp1: "$0.035 (R:R ≈ 1:3)", tp2: "$0.030 (R:R ≈ 1:4.4)",
    signal: "**바이너리 트리거**: (1) 4H RSI >85 + divergence, AND (2) Bybit 1h 펀딩 ≤ -0.3% 유지 중단 (0에 근접 = 스퀴즈 종료), AND (3) 4H 적색 캔들 $0.048+ 에서 시가 하회",
    rationale: "entry_mid $0.0495, SL $0.055, risk $0.0055. TP1 reward $0.0145 = 1:2.64 (honest, A1 대비 훨씬 유리). TP2 reward $0.0195 = 1:3.55. 바운스 확인 후 정당한 진입",
    risk: "반등 미발생 시 A2 기회 없음. $0.055+ 돌파 시 전체 A 플랜 무효 → 손절. Thesis kill: 펀딩비 양수 전환",
    color: "#ef4444",
  },
  {
    id: "B", title: "관망: 스퀴즈 종료 확인 대기", priority: "2순위",
    entry: "Bybit 펀딩이 0 또는 양수 전환 후", sl: "—", tp1: "—", tp2: "—",
    signal: "펀딩비 리셋 (-0.3% → 0%) + 24h 거래량 30% 이상 감소 + 4H 종가 하락 전환",
    rationale: "현재 숏 진입은 스퀴즈 노출 위험. 펀딩 리셋 후 기술적 하락 전환 확인 시 깨끗한 숏 진입",
    risk: "진입 기회 놓칠 가능성. 모멘텀 전환 확인에만 집중",
    color: "#f59e0b",
  },
  {
    id: "C", title: "롱: $0.025-0.030 조정 시 저점 매수", priority: "관찰",
    entry: "$0.025-0.030 (S2-S3)", sl: "$0.022 (타이트)", tp1: "$0.040 (R:R ≈ 1:1.8)", tp2: "$0.055 (R:R ≈ 1:5.3)",
    signal: "되돌림 후 거래량 감소 + 안정화 3일+",
    rationale: "entry_mid $0.0275, SL $0.022, risk $0.0055. TP1 $0.040 reward $0.0125 = 1:2.27 (honest). TP2 $0.055 reward $0.0275 = 1:5. Fully unlocked = 구조적 overhang 없음. GameFi 로테이션 + Hyperbridge 촉매",
    risk: "GameFi 섹터 약세 지속 시 ATL $0.0174 재시험. 모멘텀 전환 확인 후 진입",
    color: "#34d399",
  },
];
const ENJ_CATALYSTS = [
  { date: "2021.11.25", event: "ATH $4.82 (불런 고점)", impact: "과거 고점", done: true },
  { date: "2023.Q4", event: "ENJ 2.0 migration + Efinity 통합", impact: "토큰 업그레이드", done: true },
  { date: "2026.02.03", event: "Essence of Elements 시즌 캠페인 시작", impact: "사용자 유입", done: true },
  { date: "2026.03.08", event: "ATL $0.0174 도달", impact: "바닥", done: true },
  { date: "2026.04.12", event: "ENJ +38% 단일 세션 랠리 (가속 시작)", impact: "모멘텀 시작", done: true },
  { date: "2026.04.13-14", event: "24h +23% 수직 랠리, RSI 87, Bybit 펀딩 -0.365%/1h", impact: "극단 과매수", done: true },
  { date: "미정", event: "Hyperbridge Mainnet 출시 (크로스체인)", impact: "긍정 촉매", done: false },
];

// ============================================================
// YGG (Yield Guild Games) — Cliff D-13
// ============================================================
const YGG_DATA = {
  token: "YGG", name: "Yield Guild Games", chain: "Ethereum (+ Ronin, Base, Polygon, BSC)",
  category: "GameFi / Guild", icon: "⚔️",
  price: "$0.0385", mcap: "$28.1M", fdv: "$38.5M", vol24h: "$1.92M",
  oi: "$3.27M (Binance $2.10M + Bybit $1.17M)", oiMcapRatio: "11.6%",
  fundingRate: "+0.005% Binance / +0.005% Bybit 4h (중립)",
  fundingAnnualized: "연환산 ~5.5% (극히 중립)",
  athPrice: "$11.17", athDate: "2021.11.20", athDrop: "-99.66%",
  atlPrice: "$0.03347", atlDate: "2026.03.29",
  circulating: "730.6M / 1B (73.06%)",
  change24h: "+0.71%", change7d: "+7.20%", change30d: "-8.87%",
  exchanges: "Binance, Upbit, Bithumb, Bybit, OKX, KuCoin",
  futuresExchanges: "Binance Futures 4h / Bybit Futures 4h",
  verdict: "4/27 언락 D-13 + Legend of YMIR 파트너십 혼재",
  verdictColor: "#f59e0b",
  redFlags: [
    "**2026-04-27 Cliff D-13** — 8.82M YGG ($340K) 커뮤니티 언락, 유통의 0.88%",
    "1y -77% 추락 (P2E 섹터 약세 지속)",
    "OI 매우 낮음 ($3.27M) — 선물 시장 관심 부족",
    "KuCoin 크로스마진 딜리스팅 (3/26) = 레버리지 감소",
    "Investors 22.42% + Founders 15% = 37.42% 내부자 (대부분 해제됨)",
    "**온체인 집중도 경고**: Top 2 holders 36.9% 집중 (18.99% treasury/vesting + 17.93% Binance hot wallet 0xf977814e)",
  ],
  greenFlags: [
    "ATL $0.0335에서 +15% 탈출 = 기술적 저점 확인",
    "Legend of YMIR Web3 MMORPG 파트너십 (Axie 이후 첫 대형 통합)",
    "73.06% 이미 유통 = 추가 희석 제한적",
    "펀딩 중립 = 양방향 균형",
  ],
};
const YGG_LEVELS = [
  { type: "R", label: "R3", price: "$0.055", note: "주요 저항대" },
  { type: "R", label: "R2", price: "$0.045", note: "1월 반등 고점" },
  { type: "R", label: "R1", price: "$0.040", note: "직전 단기 고점" },
  { type: "NOW", label: "현재가", price: "$0.0385", note: "ATL +15%, 박스권 중간" },
  { type: "S", label: "S1", price: "$0.036", note: "단기 지지" },
  { type: "S", label: "S2", price: "$0.0335", note: "ATL (2026.03.29)" },
  { type: "S", label: "S3", price: "$0.028", note: "Cliff 반영 타겟" },
];
const YGG_TOKENOMICS = [
  { name: "Community", pct: "45.00%", schedule: "4년 선형 (주간 언락)", color: "#3b82f6" },
  { name: "Investors", pct: "24.92%", schedule: "1Y cliff + 3Y linear (완료)", color: "#ef4444" },
  { name: "Founders", pct: "15.00%", schedule: "1Y cliff + 3Y linear (완료)", color: "#8b5cf6" },
  { name: "Treasury", pct: "13.33%", schedule: "Governance", color: "#f59e0b" },
  { name: "Advisors", pct: "1.75%", schedule: "Vesting", color: "#34d399" },
];
const YGG_SCENARIOS = [
  {
    id: "A", title: "숏 A: 4/27 Cliff + S1 $0.036 이탈 트리거", priority: "1순위",
    entry: "$0.040-0.042 (R1 반등 시)", sl: "$0.0435 (타이트)", tp1: "$0.034 (R:R ≈ 1:2.8)", tp2: "$0.030 (R:R ≈ 1:4.4)",
    signal: "**바이너리 트리거**: (1) R1 $0.040 재도달 + 4H 적색 마감 거래량 감소, OR (2) S1 $0.036 하락 이탈 확인 (모멘텀 확정). Cliff D-10 이내 진입",
    rationale: "entry_mid $0.041, SL $0.0435, risk $0.0025 (타이트 손절). TP1 $0.034 reward $0.007 = 1:2.8 (honest). TP2 $0.030 reward $0.011 = 1:4.4. 4/27 언락 0.88% dilution. OI $3.27M 매우 얇아서 소규모 매도도 가격 영향",
    risk: "**Kill switch**: Legend YMIR 파트너십 상세 공시 (MMORPG 통합 세부사항) 발표 시 즉시 숏 종료. OI 낮아서 스퀴즈보다 횡보 지속 가능",
    color: "#ef4444",
  },
  {
    id: "B", title: "롱 B: Legend YMIR 파트너십 확정 후", priority: "관찰",
    entry: "$0.040 이상 + 파트너십 세부사항 공시", sl: "$0.034", tp1: "$0.045", tp2: "$0.055",
    signal: "R1 $0.040 돌파 + 뉴스 촉매 + 거래량 증가",
    rationale: "실제 MMORPG 통합 = 유저 유입 촉매. P2E 섹터 reversion 후보",
    risk: "파트너십 소프트 런치 시 실망 매도",
    color: "#34d399",
  },
];
const YGG_CATALYSTS = [
  { date: "2021.11.20", event: "ATH $11.17 (불런 고점)", impact: "과거 고점", done: true },
  { date: "2026.03.26", event: "KuCoin 크로스마진 딜리스팅", impact: "유동성 감소", done: true },
  { date: "2026.03.29", event: "ATL $0.0335 도달", impact: "바닥", done: true },
  { date: "2026.04.09", event: "'Degen Mode' $CHAD 스테이킹 티저", impact: "커뮤니티", done: true },
  { date: "**2026.04.27**", event: "**Cliff 언락 8.82M YGG (0.88%)**", impact: "**핵심 리스크 D-13**", done: false },
  { date: "미정", event: "Legend of YMIR MMORPG 출시", impact: "긍정 촉매", done: false },
];

// ============================================================
// OP (Optimism) — Quarterly Unlock D-16
// ============================================================
const OP_DATA = {
  token: "OP", name: "Optimism", chain: "Optimism L2 (+ Superchain ecosystem)",
  category: "Ethereum L2", icon: "🔴",
  price: "$0.1147", mcap: "$245M", fdv: "$492M", vol24h: "$25.8M",
  oi: "$27.79M (Binance $15.37M + Bybit $12.42M)", oiMcapRatio: "11.3%",
  fundingRate: "+0.010% Binance / +0.010% Bybit 8h (중립)",
  fundingAnnualized: "연환산 ~11% (중립)",
  athPrice: "$4.84", athDate: "2024.03.06", athDrop: "-97.63%",
  atlPrice: "$0.100", atlDate: "2026.03.29",
  circulating: "2.14B / 4.29B (49.74%)",
  change24h: "+7.79%", change7d: "+4.74%", change30d: "-7.20%",
  exchanges: "Binance, Coinbase, Kraken, Bybit, OKX, Upbit",
  futuresExchanges: "Binance Futures 8h / Bybit Futures 8h",
  verdict: "4/30 quarterly cliff D-16 + Superchain buyback 완화",
  verdictColor: "#f59e0b",
  redFlags: [
    "**2026-04-30 Quarterly Unlock D-16** — 31.34M OP, 유통의 1.89% (Core Contributors)",
    "97.63% ATH $4.84에서 추락 — 장기 loser",
    "4.29B 총공급 vs 2.14B 유통 (50% 미유통 overhang)",
    "L2 경쟁 격화 (Arbitrum, Base, zkSync)",
    "BTC 상관관계 0.85 — BTC 약세 시 -30% 동반",
  ],
  greenFlags: [
    "**Superchain Revenue Buyback** (Feb 2026 시작) — 50% 수수료 → OP 매입 (디플레이션)",
    "Fraud Proofs Live (Stage 1 성숙) — 기술적 credibility",
    "30+ OP Stack 체인 (Base, World Chain 등) — 네트워크 효과",
    "ATL $0.100에서 +15% 탈출 + 기술적 bounce",
    "Core allocation 분산 (RetroPGF 20% + Airdrop 19% + Governance) = 정당성",
  ],
};
const OP_LEVELS = [
  { type: "R", label: "R3", price: "$0.19", note: "2024 반등 고점" },
  { type: "R", label: "R2", price: "$0.14", note: "3월 고점" },
  { type: "R", label: "R1", price: "$0.12", note: "단기 저항 (20일 MA)" },
  { type: "NOW", label: "현재가", price: "$0.1147", note: "ATL +15%, 24h +7.79%" },
  { type: "S", label: "S1", price: "$0.105", note: "피보 38.2%" },
  { type: "S", label: "S2", price: "$0.100", note: "ATL (2026.03.29)" },
  { type: "S", label: "S3", price: "$0.085", note: "ATL 이탈 시 타겟" },
];
const OP_TOKENOMICS = [
  { name: "Ecosystem Fund", pct: "25.00%", schedule: "거버넌스 배분", color: "#3b82f6" },
  { name: "RetroPG Funding", pct: "20.00%", schedule: "분기별 Retroactive", color: "#8b5cf6" },
  { name: "Core Contributors", pct: "19.00%", schedule: "Quarterly unlocks thru 2029 (D-16)", color: "#ef4444" },
  { name: "Airdrops", pct: "19.00%", schedule: "Community airdrops", color: "#06b6d4" },
  { name: "Sugar Momma / Investors", pct: "17.00%", schedule: "Quarterly unlocks", color: "#f59e0b" },
];
const OP_SCENARIOS = [
  {
    id: "A", title: "숏 A: 4/30 Cliff 선반영 ($0.12+ 반등 시)", priority: "1순위",
    entry: "$0.120-0.125 (R1 저항)", sl: "$0.132 (타이트)", tp1: "$0.105 (R:R ≈ 1:2.2)", tp2: "$0.095 (R:R ≈ 1:3.4)",
    signal: "**바이너리 트리거**: (1) R1 $0.120 재시험 + Cliff D-10 이내 + 4H 적색 마감, AND (2) 최근 7일 Superchain 월간 buyback 볼륨 < $1M (매입 압력 약화 확인). **No-bounce 대안**: 10일 내 바운스 미발생 시 A skip, B(롱)로 전환",
    rationale: "entry_mid $0.1225, SL $0.132, risk $0.0095. TP1 $0.105 reward $0.0175 = 1:1.84. TP2 $0.095 reward $0.0275 = 1:2.89 (honest). 1.89% dilution 중간 규모. 역사상 OP quarterly unlock마다 -5~15% 조정",
    risk: "**Buyback Kill switch**: Superchain 50% 수수료 매입이 월 $2M+ 확인되면 숏 종료 (언락 흡수 가능). BTC 상승 상관 시 숏 스퀴즈. NOW $0.1147 < entry — 바운스 대기 설정",
    color: "#ef4444",
  },
  {
    id: "B", title: "롱 B: 반등 지속 + $0.14 돌파", priority: "2순위",
    entry: "$0.115 (현재가) 또는 $0.14 돌파 후", sl: "$0.100 (ATL)", tp1: "$0.14", tp2: "$0.19",
    signal: "Superchain 수수료 데이터 증가 + 4월 cliff 무난 소화 + BTC 강세",
    rationale: "Fraud Proofs + OP Stack 네트워크 효과 + RetroPGF 지속 = 장기 펀더멘털. ATL $0.100 지지 확실",
    risk: "L2 경쟁 + BTC 상관 리스크",
    color: "#34d399",
  },
];
const OP_CATALYSTS = [
  { date: "2024.03.06", event: "ATH $4.84", impact: "과거 고점", done: true },
  { date: "2026.01", event: "Fraud Proofs Live (Stage 1 성숙)", impact: "기술", done: true },
  { date: "2026.02", event: "Superchain Revenue Buyback 시작 (50% 수수료)", impact: "디플레이션", done: true },
  { date: "2026.03.29", event: "ATL $0.100 도달", impact: "바닥", done: true },
  { date: "2026.04", event: "op-node v1.16.11 업데이트 + ZK Proving 파트너십", impact: "기술", done: true },
  { date: "**2026.04.30**", event: "**Quarterly Unlock 31.34M OP (1.89%)**", impact: "**핵심 리스크 D-16**", done: false },
  { date: "2026.07/10", event: "Q3, Q4 quarterly unlocks (계속)", impact: "주기적 압력", done: false },
];

// ============================================================
// NXPC (Nexpace) — Nexon GameFi Overhang
// ============================================================
const NXPC_DATA = {
  token: "NXPC", name: "Nexpace (MapleStory Universe)", chain: "Ethereum (+ Solana, Avalanche)",
  category: "GameFi / Nexon IP", icon: "🍁",
  price: "$0.2839", mcap: "$74.8M", fdv: "$282.4M", vol24h: "$6.5M",
  oi: "$6.68M (Binance $5.09M + Bybit $1.59M)", oiMcapRatio: "8.9%",
  fundingRate: "-0.002% Binance / +0.005% Bybit 4h (중립)",
  fundingAnnualized: "연환산 ~0% (극히 중립)",
  athPrice: "$3.77", athDate: "2025.05.15", athDrop: "-92.47%",
  atlPrice: "$0.2469", atlDate: "2026.02.11",
  circulating: "263.5M / 994.6M (26.5%)",
  change24h: "+1.98%", change7d: "N/A", change30d: "N/A",
  exchanges: "Binance, Kraken, Gate, Bitget, KuCoin, MEXC",
  futuresExchanges: "Binance Futures 4h / Bybit Futures 4h",
  founder: "Nexon (MapleStory 제작사)",
  verdict: "구조적 Overhang FDV $282M vs MCap $74.8M (3.77배)",
  verdictColor: "#ef4444",
  redFlags: [
    "**FDV $282M vs MCap $74.8M = 3.77배 디버전스** — 잠금 물량이 시총의 2.77배",
    "72.5% 미유통 (731M 토큰 lock) — 구조적 overhang",
    "ATH $3.77 (2025-05-15)에서 **-92.5% 추락** — 레거시 매도 압력",
    "9개월 cliff 후 quarterly unlocks thru Q4 2027 (12개월+ 남음)",
    "Contribution Reward 80% (Play-to-earn 보상) — 지속적 생산/매도",
    "MapleStory Universe 아직 playtest 단계 — 프로덕트 미검증",
    "**온체인 경고**: Ethereum 컨트랙트 (0x329749)는 totalSupply 0 = proxy/legacy. NXPC primary chain은 Avalanche 또는 Solana. DEX pairs 없음 (CEX-only 확인)",
  ],
  greenFlags: [
    "Nexon 브랜드 + 20년+ MapleStory IP",
    "$50M 에코시스템 펀드 (2025.11 deployed)",
    "Polygon Supernet + Avalanche 파트너십",
    "Verse Eight AI 파트너십 (2026.01.30)",
    "Binance Futures 상장 (유동성)",
  ],
};
const NXPC_LEVELS = [
  { type: "R", label: "R3", price: "$0.40", note: "심리적 저항, 2026.03 고점 근방" },
  { type: "R", label: "R2", price: "$0.32", note: "20/50 MA" },
  { type: "R", label: "R1", price: "$0.30", note: "단기 저항" },
  { type: "NOW", label: "현재가", price: "$0.2839", note: "ATL +15%, 24h +1.98% 플랫" },
  { type: "S", label: "S1", price: "$0.272", note: "단기 지지" },
  { type: "S", label: "S2", price: "$0.247", note: "ATL (2026.02.11)" },
  { type: "S", label: "S3", price: "$0.20", note: "Cliff 반영 타겟" },
];
const NXPC_TOKENOMICS = [
  { name: "Contribution Reward", pct: "80.00%", schedule: "P2E 지속 생산", color: "#3b82f6" },
  { name: "Early Community", pct: "16.31%", schedule: "1Y cliff + 36m quarterly", color: "#ef4444" },
  { name: "Airdrop", pct: "3.00%", schedule: "TGE 완료", color: "#34d399" },
  { name: "IP Management", pct: "2.00%", schedule: "Vesting", color: "#f59e0b" },
  { name: "Team", pct: "0.70%", schedule: "Vesting", color: "#8b5cf6" },
];
const NXPC_SCENARIOS = [
  {
    id: "A", title: "숏 A: $0.30 저항 반등 시 (타이트)", priority: "1순위",
    entry: "$0.30-0.31 (R1 근접)", sl: "$0.325 (+6%)", tp1: "$0.26 (R:R ≈ 1:1.8)", tp2: "$0.20 (R:R ≈ 1:4)",
    signal: "**바이너리 트리거**: R1 $0.30 재시험 + 4H 적색 마감 + 거래량 감소. 바운스 없이 $0.272 이탈 시 skip (이미 하락 중 신호)",
    rationale: "entry_mid $0.305, SL $0.325, risk $0.02. TP1 $0.26 reward $0.045 = 1:2.25 (honest). TP2 $0.20 reward $0.105 = 1:5.25. FDV/MCap 3.77배 overhang. 72.5% 미유통. 펀딩 중립",
    risk: "**No-bounce fallback**: NOW $0.2839가 entry 하단보다 낮음 = 바운스 미발생 시 기회 놓침. 10일 내 바운스 없으면 취소. Nexon 브랜드 retail 유입 가능",
    color: "#ef4444",
  },
  {
    id: "B", title: "롱 B: MapleStory 정식 출시 확인 후", priority: "관찰",
    entry: "정식 출시 + DAU 10K+ 확인 후", sl: "$0.23", tp1: "$0.40", tp2: "$0.55",
    signal: "MapleStory Universe 메인넷 출시 + 게임 metrics 검증",
    rationale: "Nexon 브랜드 + 실제 프로덕트 검증 시 펀더멘털 재평가 가능",
    risk: "Playtest 연장 / 출시 지연. overhang 해제 없이는 상승 제한",
    color: "#34d399",
  },
];
const NXPC_CATALYSTS = [
  { date: "2025.05.15", event: "TGE & Binance 상장 ATH $3.77", impact: "런칭 고점", done: true },
  { date: "2025.11", event: "$50M Ecosystem Fund deployed", impact: "펀더멘털", done: true },
  { date: "2026.01.30", event: "Verse Eight AI 파트너십", impact: "통합", done: true },
  { date: "2026.02.11", event: "ATL $0.247 도달", impact: "바닥", done: true },
  { date: "미정", event: "MapleStory Universe 정식 출시 (현재 playtest)", impact: "핵심 촉매", done: false },
  { date: "Q4 2026+", event: "Cliff quarterly unlocks 지속 thru 2027", impact: "구조적 압력", done: false },
];

// ============================================================
// TRUST (Intuition) — Infinite Supply + Airdrop Collapse
// ============================================================
const TRUST_DATA = {
  token: "TRUST", name: "Intuition", chain: "Base L3 (+ Ethereum)",
  category: "AI / Data Trust Layer", icon: "🧠",
  price: "$0.0691", mcap: "$12.4M", fdv: "$68.9M", vol24h: "$2.9M",
  oi: "$1.48M (Binance $0.86M + Bybit $0.62M)", oiMcapRatio: "11.9%",
  fundingRate: "+0.005% / +0.005% 4h (중립)",
  fundingAnnualized: "연환산 ~5.5% (극히 중립)",
  athPrice: "$0.606", athDate: "2025.11.05", athDrop: "-88.6%",
  atlPrice: "$0.0605", atlDate: "2026.03.29",
  circulating: "179.6M / 1B (17.96%)",
  change24h: "+8.17%", change7d: "N/A", change30d: "N/A",
  exchanges: "Binance, Coinbase, Upbit, Bitget, Bybit",
  futuresExchanges: "Binance Futures 4h / Bybit Futures 4h",
  verdict: "무한 공급 + 88% 크래시 + Q4 2026 Cliff — 강한 숏",
  verdictColor: "#ef4444",
  redFlags: [
    "**무한 공급 (Max: Unlimited)** — 구조적 디플레이션 불가",
    "2025.11 에어드롭 덤프 -88% 크래시 = 리테일 고갈",
    "**Q4 2026 (Oct-Nov) 주요 vesting cliff** — Investors 20.5% + Contributors 14% = 34.5% 선형 시작",
    "FDV $68.9M vs MCap $12.4M = 5.56배 디버전스",
    "82% 미유통 + 무한 공급 = 영구 희석 리스크",
    "Q1 2026 AI Agent 로드맵 미출시 (프로덕트 미검증)",
    "**온체인 확인**: Base L2 컨트랙트 0x6cd905, 11,096 holders, max 1.034B (인플레이션 시작 확인), transparent proxy 패턴 (업그레이드 가능성)",
    "DEX 유동성 $365K (base-aerodrome TRUST/USDC $362K — 단일 풀 집중)",
  ],
  greenFlags: [
    "Base L3 (Arbitrum Orbit) — 커스터디 리스크 감소",
    "AI + 데이터 trust layer = 서사 있음",
    "Code4rena 감사 (2026.03)",
    "ATL $0.0605 근처 + 14% bounce",
    "Binance Futures 50x 상장 (유동성)",
  ],
};
const TRUST_LEVELS = [
  { type: "R", label: "R3", price: "$0.15", note: "2026.01 반등 고점" },
  { type: "R", label: "R2", price: "$0.09", note: "저항 클러스터" },
  { type: "R", label: "R1", price: "$0.08", note: "직전 저항" },
  { type: "NOW", label: "현재가", price: "$0.0691", note: "ATL +14%, 24h +8.17%" },
  { type: "S", label: "S1", price: "$0.065", note: "단기 지지" },
  { type: "S", label: "S2", price: "$0.0605", note: "ATL (2026.03.29)" },
  { type: "S", label: "S3", price: "$0.045", note: "Q4 cliff 반영 타겟" },
];
const TRUST_TOKENOMICS = [
  { name: "Community/Ecosystem", pct: "20.00%", schedule: "Linear", color: "#3b82f6" },
  { name: "Investors", pct: "20.50%", schedule: "1Y cliff + 2Y linear (Q4 2026 시작)", color: "#ef4444" },
  { name: "Labs/Strategic", pct: "14.50%", schedule: "Reserve", color: "#8b5cf6" },
  { name: "Core Contributors", pct: "14.00%", schedule: "1Y cliff + 3Y linear (Q4 2026)", color: "#f59e0b" },
  { name: "Liquidity/MM", pct: "2.50%", schedule: "TGE 완료", color: "#34d399" },
  { name: "미공개 (Airdrop/Foundation 추정)", pct: "28.50%", schedule: "공식 문서 미완전 공개 — 추가 희석 리스크", color: "#6b7280" },
];
const TRUST_SCENARIOS = [
  {
    id: "A", title: "숏 A: 단기 반등 시 즉시 진입 (타이트)", priority: "1순위",
    entry: "$0.072-0.078 (+4~13% from NOW $0.069)", sl: "$0.085 (타이트)", tp1: "$0.065 (R:R ≈ 1:1)", tp2: "$0.045 (R:R ≈ 1:3)",
    signal: "**바이너리 트리거**: 4H 캔들 $0.075+ 도달 후 적색 마감 + 거래량 감소 + RSI >60. 10일 내 바운스 미발생 시 B(장기 Q4 cliff)로 전환",
    rationale: "entry_mid $0.075, SL $0.085, risk $0.010. TP1 $0.065 reward $0.010 = 1:1 (sub-optimal, A2 보완 필요). TP2 $0.045 reward $0.030 = 1:3. 무한 공급 + 88% 크래시 + 28.5% 미공개 allocation. 펀딩 중립",
    risk: "**Kill switch**: AI Agent 출시 + 실사용 데이터 증가 시 즉시 종료. ATL 근접 $0.0605 reversal 리스크. 소규모 포지션 권장",
    color: "#ef4444",
  },
  {
    id: "B", title: "숏 B: Q4 2026 Cliff 선반영 (장기)", priority: "2순위",
    entry: "9월말~10월 초 반등 시 $0.08+", sl: "$0.10", tp1: "$0.05", tp2: "$0.035",
    signal: "Cliff D-30 선반영 시작. 역사 사례 (ARB, APT, STRK) 패턴",
    rationale: "Investors 20.5% + Contributors 14% = 34.5% 선형 시작. 월 1M+ TRUST 매도 압력 예상",
    risk: "Kill switch: AI Agent 출시 + 실사용 지표 증가",
    color: "#f59e0b",
  },
];
const TRUST_CATALYSTS = [
  { date: "2025.11.05", event: "ATH $0.606 + 에어드롭 시작", impact: "고점", done: true },
  { date: "2025.11.18", event: "스테이킹 버그 수정 (protocol 미성숙)", impact: "경고", done: true },
  { date: "2025.Q4", event: "에어드롭 덤프 -88% 크래시", impact: "크래시", done: true },
  { date: "2026.03", event: "Code4rena 보안 감사", impact: "긍정", done: true },
  { date: "2026.03.29", event: "ATL $0.0605 도달", impact: "바닥", done: true },
  { date: "**2026.Q4 (Oct-Nov)**", event: "**Major Vesting Cliff** — Investors 20.5% + Contributors 14%", impact: "**핵심 리스크**", done: false },
  { date: "미정", event: "AI Agent Integration 로드맵 (Q1 2026 예정, 지연)", impact: "펀더멘털", done: false },
];

// ============================================================
// WCT (WalletConnect Token) — TGE 1주년 Cliff D-1!
// ============================================================
const WCT_DATA = {
  token: "WCT", name: "WalletConnect Token", chain: "Optimism",
  category: "Infrastructure / Wallet Protocol", icon: "🔗",
  price: "$0.0587", mcap: "$10.9M", fdv: "$58.6M", vol24h: "$13.8M",
  oi: "$6.54M (Binance $3.70M + Bybit $2.84M)", oiMcapRatio: "60.0% (시총 대비 매우 높음)",
  fundingRate: "-0.0007% Binance / -0.0093% Bybit 4h (약한 음수)",
  fundingAnnualized: "Bybit 연환산 ~-20% (숏 페이, 미약)",
  athPrice: "$1.34", athDate: "2025.05.31", athDrop: "-95.62%",
  atlPrice: "$0.0506", atlDate: "2026.02.06",
  circulating: "186.2M / 1B (18.62%)",
  change24h: "+9.46%", change7d: "N/A", change30d: "N/A",
  exchanges: "Binance, Coinbase, Bybit, KuCoin, Gate, OKX",
  futuresExchanges: "Binance Futures 4h / Bybit Futures 4h",
  founder: "WalletConnect Foundation",
  investors: "1kx, USV, Coinbase Ventures, ConsenSys, Circle, Hashkey",
  verdict: "**2026-04-15 TGE 1주년 Cliff D-1!** — 팀/투자자 베스팅 시작",
  verdictColor: "#ef4444",
  redFlags: [
    "**2026-04-15 TGE 1주년 = Team + Investor 1Y Cliff 만료 (D-1)!**",
    "Team 18.5% + Investors 11.5% + Token Warrants 11.25% = 41.25% 베스팅 시작",
    "4Y 선형 베스팅 = 월간 매도 압력 지속",
    "FDV $58.6M vs MCap $10.9M = 5.37배 디버전스",
    "OI/MCap 60% — 매우 높음 (작은 시총 대비 선물 과다)",
    "95.6% ATH $1.34 추락 = 에어드롭 덤프 피해",
    "RSI 25 과매도이나 구조적 매도 압력 우세",
    "**온체인 확인**: Optimism L2 컨트랙트 0xef4461, 134,481 holders, Total 980.68M (전량 기준) — 유통 186M (18.6%), Team+Investor 절반 이상 locked",
    "DEX 유동성 $432K (optimism-uniswap WCT/WETH $195K 분산)",
  ],
  greenFlags: [
    "**WalletConnect = Web3 인프라 핵심** (billions of wallet connections/yr)",
    "탑-tier 투자자 (1kx, USV, Coinbase Ventures, Circle, ConsenSys, Hashkey)",
    "Stake 메커니즘 + 거버넌스 유틸리티",
    "Optimism L2 배포 — 저가 거래",
    "RSI 25 극단 과매도 = 단기 반등 가능",
    "18.62% 유통 = 낮은 유통으로 시총 민감",
  ],
};
const WCT_LEVELS = [
  { type: "R", label: "R3", price: "$0.12", note: "2월 반등 고점" },
  { type: "R", label: "R2", price: "$0.09", note: "주요 저항" },
  { type: "R", label: "R1", price: "$0.070", note: "단기 저항" },
  { type: "NOW", label: "현재가", price: "$0.0587", note: "ATL +16%, RSI 25 과매도, Cliff D-1" },
  { type: "S", label: "S1", price: "$0.052", note: "단기 지지" },
  { type: "S", label: "S2", price: "$0.0506", note: "ATL (2026.02.06)" },
  { type: "S", label: "S3", price: "$0.040", note: "Cliff 덤프 타겟" },
];
const WCT_TOKENOMICS = [
  { name: "Foundation Treasury", pct: "20.05%", schedule: "설정 기간 후 일괄", color: "#3b82f6" },
  { name: "Team", pct: "18.50%", schedule: "**1Y cliff + 4Y linear (2026.04.15 만료)**", color: "#ef4444" },
  { name: "Rewards Pool", pct: "17.50%", schedule: "Staking rewards", color: "#06b6d4" },
  { name: "Seasonal Airdrops", pct: "13.50%", schedule: "Multi-season", color: "#34d399" },
  { name: "Early Investors", pct: "11.50%", schedule: "**1Y cliff + 4Y linear (D-1)**", color: "#ef4444" },
  { name: "Token Warrants", pct: "11.25%", schedule: "**1Y cliff (D-1)**", color: "#f59e0b" },
  { name: "Protocol Dev", pct: "7.00%", schedule: "Dev fund", color: "#8b5cf6" },
];
const WCT_SCENARIOS = [
  {
    id: "A1", title: "숏 A1: 즉시 스타터 (4/15 Cliff D-1)", priority: "1순위 / 즉시",
    entry: "$0.0587 (현재가, 사이즈 30-40%)", sl: "$0.0680 (+16%)", tp1: "$0.052 (R:R ≈ 1:0.7)", tp2: "$0.040 (R:R ≈ 1:2)",
    signal: "**D-1 이벤트 임박** — 즉시 진입. 소규모로 구축. Cliff 당일 반응 대기",
    rationale: "팀/투자자 1Y cliff 4/15 만료. 총 41.25% 물량 베스팅 시작. 단, R:R 1:0.7로 TP1은 타이트. Cliff 당일 즉시 반영 여부에 따라 조정",
    risk: "RSI 25 과매도 + 단기 반등 가능. Cliff가 이미 선반영되었을 수 있음. 소규모 + 타이트 손절",
    color: "#ef4444",
  },
  {
    id: "A2", title: "숏 A2: $0.07 반등 시 추가 진입", priority: "1순위 / 피라미드",
    entry: "$0.070-0.075 (R1)", sl: "$0.08", tp1: "$0.052 (R:R ≈ 1:2.7)", tp2: "$0.040 (R:R ≈ 1:4.3)",
    signal: "R1 $0.07 재시험 + 4H 적색 마감 + OI 감소",
    rationale: "entry_mid $0.0725, SL $0.08, risk $0.0075. TP1 $0.052 reward $0.0205 = 1:2.73. TP2 $0.040 reward $0.0325 = 1:4.33 (honest). Cliff 이후 dead-cat bounce 진입",
    risk: "반등 미발생 시 A1만 유지. $0.08+ 돌파 시 전체 무효",
    color: "#ef4444",
  },
  {
    id: "B", title: "롱 B: Cliff 흡수 + $0.045 바닥 매수 (조건부)", priority: "관찰",
    entry: "**Cliff 덤프 확인 후** $0.045-0.050", sl: "$0.040", tp1: "$0.070", tp2: "$0.090",
    signal: "4/15 이후 매도 소화 + 3일+ 안정화 + RSI 반전",
    rationale: "WalletConnect 인프라 가치 + 기관 투자자. Cliff 이후 매수 기회. RSI 25 극단 과매도 역발상",
    risk: "**조기 진입 금지**: 4/15 Cliff 덤프 확인 전 매수 금지",
    color: "#34d399",
  },
];
const WCT_CATALYSTS = [
  { date: "2024.09", event: "WCT 발표 (WalletConnect Foundation)", impact: "런칭", done: true },
  { date: "2024.11~2025.01", event: "에어드롭 시즌 1 (50M WCT 청구)", impact: "분배", done: true },
  { date: "2025.04.15", event: "TGE + Binance/Bybit/Coinbase 상장", impact: "유통 시작", done: true },
  { date: "2025.05.31", event: "ATH $1.34", impact: "고점", done: true },
  { date: "2026.02.06", event: "ATL $0.0506 도달", impact: "바닥", done: true },
  { date: "**2026.04.15**", event: "**TGE 1주년 — Team 18.5% + Investor 11.5% Cliff 만료 (D-1!)**", impact: "**핵심 리스크 D-1**", done: false },
  { date: "2026.04.16+", event: "4Y 선형 베스팅 시작 (월간 매도 압력)", impact: "지속 압력", done: false },
];

// ============================================================
// POLYX (Polymesh) — Inflationary RWA
// ============================================================
const POLYX_DATA = {
  token: "POLYX", name: "Polymesh", chain: "Polymesh (Substrate)",
  category: "RWA / Regulated Assets", icon: "📜",
  price: "$0.0500", mcap: "$63.3M", fdv: "$63.3M", vol24h: "$2.1M",
  oi: "$3.14M (Binance $1.80M + Bybit $1.34M)", oiMcapRatio: "5.0%",
  fundingRate: "-0.0001% Binance / +0.003% Bybit 4h (중립)",
  fundingAnnualized: "연환산 ~3% (극히 중립)",
  athPrice: "$0.7488", athDate: "2024.03.31", athDrop: "-93.32%",
  atlPrice: "$0.03831", atlDate: "2026.02.06",
  circulating: "1.266B (100% + 연 11% 인플레이션)",
  change24h: "+3.71%", change7d: "+8.00%", change30d: "+26.30%",
  exchanges: "Binance, Bybit, Gate, Bitvavo, KuCoin, MEXC",
  futuresExchanges: "Binance Futures 4h / Bybit Futures 4h",
  founder: "Polymath (합병 완료)",
  verdict: "RWA 내러티브 강세 + 연 11% 인플레이션 — 중립",
  verdictColor: "#06b6d4",
  redFlags: [
    "**연 11% 인플레이션** (140M POLYX/년 고정) — 구조적 dilution",
    "93.3% ATH $0.7488 추락 — 장기 loser",
    "RWA 섹터 아직 material TVL 부재 (아나운스만 있음)",
    "DEX 유동성 부재 (Substrate native, CEX only)",
    "OI 낮음 ($3.14M) — 선물 시장 관심 부족",
    "SEC 증권 분류 리스크 (Polymath FINRA 라이선스 역풍)",
  ],
  greenFlags: [
    "**30일 +26.3% 강한 모멘텀** (섹터 로테이션 1순위)",
    "Polymath-Polymesh 합병 완료 (거버넌스 명확)",
    "Republic, BitGo, Paysafe, GK8 파트너십",
    "Polymath FINRA 브로커-딜러 라이선스",
    "On-chain identity 의무화 (규제 준수)",
    "ATL +30% 탈출 + 기술적 반등 확인",
  ],
};
const POLYX_LEVELS = [
  { type: "R", label: "R3", price: "$0.11", note: "전 사이클 상단 저항대" },
  { type: "R", label: "R2", price: "$0.081", note: "주요 저항" },
  { type: "R", label: "R1", price: "$0.052", note: "1차 저항" },
  { type: "NOW", label: "현재가", price: "$0.0500", note: "30일 +26% 강한 모멘텀" },
  { type: "S", label: "S1", price: "$0.046", note: "단기 지지" },
  { type: "S", label: "S2", price: "$0.0383", note: "ATL (2026.02.06)" },
];
const POLYX_TOKENOMICS = [
  { name: "Public Sale + Airdrops", pct: "40.00%", schedule: "Community 분배 (완료)", color: "#3b82f6" },
  { name: "Team (Vesting)", pct: "22.50%", schedule: "Vesting (대부분 해제)", color: "#ef4444" },
  { name: "Polymath Dev Fund", pct: "22.50%", schedule: "Dev operations", color: "#8b5cf6" },
  { name: "Ecosystem", pct: "15.00%", schedule: "Partners", color: "#f59e0b" },
  { name: "Inflation", pct: "연 11%", schedule: "140M POLYX/년 고정 (PoS 리워드)", color: "#34d399" },
];
const POLYX_SCENARIOS = [
  {
    id: "A", title: "롱 A: RWA 내러티브 돌파 ($0.052+)", priority: "1순위",
    entry: "$0.052 돌파 시", sl: "$0.046", tp1: "$0.065 (R:R ≈ 1:2.2)", tp2: "$0.081 (R:R ≈ 1:5)",
    signal: "**트리거**: R1 $0.052 재테스트 + 거래량 증가 + BTC 강세",
    rationale: "30일 +26% 강한 모멘텀. Polymath 합병 + FINRA + Republic/BitGo 파트너십. RWA 섹터 로테이션. ATL +30% 탈출",
    risk: "연 11% 인플레이션 지속 = 장기 매도 압력. RWA TVL 실측 부재",
    color: "#34d399",
  },
  {
    id: "B", title: "숏 B: $0.055 저항 페이드 (조건부)", priority: "2순위",
    entry: "$0.053-0.057 (R1-R2 근접 실패 시)", sl: "$0.060 (+10% from entry)", tp1: "$0.040 (R:R ≈ 1:3.5)", tp2: "$0.0383 (ATL, R:R ≈ 1:4.8)",
    signal: "**바이너리 트리거**: R1 $0.052 재시험 실패 + 30일 모멘텀 +26% 축소 (+15% 이하) + 거래량 감소. RWA 섹터 약세 전환 확인",
    rationale: "entry_mid $0.055, SL $0.060, risk $0.005. TP1 $0.040 reward $0.015 = 1:3. TP2 $0.0383 reward $0.0167 = 1:3.3. 연 11% 인플레이션 지속 = 장기 매도 압력. 모멘텀 소진 시 평균 회귀",
    risk: "**Kill switch**: Republic/BitGo/Paysafe 구체적 TVL 데이터 발표 시 즉시 숏 종료. 모멘텀 지속 시 $0.065+ 돌파 가능",
    color: "#ef4444",
  },
];
const POLYX_CATALYSTS = [
  { date: "2024.03.31", event: "ATH $0.7488", impact: "과거 고점", done: true },
  { date: "2024.02.29", event: "POLY→POLYX 마이그레이션 브리지 종료", impact: "완료", done: true },
  { date: "2026.02.06", event: "ATL $0.0383 도달", impact: "바닥", done: true },
  { date: "2026.Q1", event: "Polymath 합병 + Polymesh Association 흡수", impact: "거버넌스", done: true },
  { date: "2026.03-04", event: "Republic, BitGo, Paysafe, GK8 파트너십", impact: "기관 통합", done: true },
  { date: "2026.04", event: "Polymath FINRA 브로커-딜러 라이선스", impact: "규제 검증", done: true },
  { date: "지속", event: "연 11% 인플레이션 (140M POLYX/년)", impact: "구조적 dilution", done: false },
];

// ============================================================
// Generic Token Analysis Component
// Accepts token data bundle and renders standardized analysis view
// ============================================================
function GenericTokenAnalysis({ data, levels, tokenomics, scenarios, catalysts, expandedScenario, setExpandedScenario, sectionStyle, sectionTitle, cardStyle }) {
  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
        <span style={{ fontSize: 24 }}>{data.icon}</span>
        <span style={{ fontSize: 24, fontWeight: 800, color: "#f0f0f5" }}>{data.token}</span>
        <span style={{ fontSize: 14, color: "#888" }}>{data.name} · {data.chain}</span>
        <span style={{ fontSize: 11, color: data.verdictColor, background: `${data.verdictColor}15`, padding: "3px 8px", borderRadius: 4, border: `1px solid ${data.verdictColor}33`, fontWeight: 700 }}>{data.category}</span>
      </div>
      <div style={{ fontSize: 12, color: "#555", marginBottom: 24 }}>Last updated: 2026-04-14 · Sources: Binance/Bybit API (라이브) · CoinGecko · DexScreener · token-analysis skill</div>

      {/* Verdict Banner */}
      <div style={{ background: `linear-gradient(135deg, ${data.verdictColor}15 0%, #0e1018 100%)`, borderRadius: 10, border: `1px solid ${data.verdictColor}33`, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: data.verdictColor, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>종합 판단</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: data.verdictColor }}>{data.verdict}</div>
        <div style={{ fontSize: 13, color: "#999", marginTop: 6 }}>{data.change24h} / {data.change7d} / {data.change30d} (24h/7d/30d) · OI {data.oi} · 펀딩 {data.fundingRate}</div>
      </div>

      {/* Market Overview */}
      <div style={sectionStyle}>
        {sectionTitle("Market Overview")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            ["현재가", data.price, "#f0f0f5", true],
            ["24h 변동", data.change24h, data.change24h.startsWith("+") ? "#34d399" : "#ef4444", false],
            ["7d 변동", data.change7d, "#ccc", false],
            ["30d 변동", data.change30d, "#ccc", false],
            ["시가총액", data.mcap, "#ccc", false],
            ["FDV", data.fdv, "#ccc", false],
            ["유통량", data.circulating, "#ccc", false],
            ["ATH Drop", data.athDrop, "#ef4444", false],
            ["OI (Binance+Bybit)", data.oi, "#60a5fa", true],
            ["OI / MCap", data.oiMcapRatio, "#60a5fa", false],
            ["펀딩비", data.fundingRate, "#ef4444", false],
            ["펀딩 해석", data.fundingAnnualized, "#ef4444", false],
            ["24h 거래량", data.vol24h, "#ccc", false],
            ["ATH", `${data.athPrice} (${data.athDate})`, "#888", false],
            ["ATL", `${data.atlPrice} (${data.atlDate})`, "#888", false],
            ["카테고리", data.category, "#888", false],
            ["파생상품", data.futuresExchanges, "#888", false],
            ["거래소", data.exchanges, "#888", false],
          ].filter(row => row[1] && row[1] !== "N/A").map(([label, val, col, big]) => (
            <div key={label} style={{ ...cardStyle, padding: "10px 14px" }}>
              <div style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
              <div style={{ fontSize: big ? 20 : 14, fontWeight: big ? 800 : 600, color: col, marginTop: 3 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* S/R Levels */}
      <div style={sectionStyle}>
        {sectionTitle("Support / Resistance Levels")}
        <div style={cardStyle}>
          {levels.map((lv, i) => {
            const colors = { R: "#ef4444", NOW: "#34d399", S: "#3b82f6" };
            const c = colors[lv.type];
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", marginBottom: 4, borderRadius: 6,
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

      {/* Tokenomics */}
      <div style={sectionStyle}>
        {sectionTitle("Tokenomics & Vesting")}
        <div style={cardStyle}>
          <div style={{ display: "flex", height: 18, borderRadius: 4, overflow: "hidden", marginBottom: 12 }}>
            {tokenomics.map((t, i) => (
              <div key={i} style={{ width: t.pct, background: t.color, height: "100%" }} title={`${t.name}: ${t.pct}`} />
            ))}
          </div>
          {tokenomics.map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1.5fr 0.7fr 2.5fr", gap: 8, padding: "6px 0", borderBottom: "1px solid #14161e" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color }} />
                <span style={{ fontSize: 12, color: "#ccc" }}>{t.name}</span>
              </div>
              <span style={{ fontSize: 12, color: "#888", fontWeight: 700 }}>{t.pct}</span>
              <span style={{ fontSize: 11, color: "#666" }}>{t.schedule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Red / Green Flags */}
      <div style={sectionStyle}>
        {sectionTitle("Red Flags & Green Flags")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ ...cardStyle, borderLeft: "3px solid #ef4444" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#ef4444", marginBottom: 8 }}>Red Flags</div>
            {data.redFlags.map((f, i) => (
              <div key={i} style={{ fontSize: 11, color: "#ef8888", lineHeight: 1.6, paddingLeft: 10, borderLeft: "2px solid #2a1418", marginBottom: 4 }}>{f}</div>
            ))}
          </div>
          <div style={{ ...cardStyle, borderLeft: "3px solid #34d399" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#34d399", marginBottom: 8 }}>Green Flags</div>
            {data.greenFlags.map((f, i) => (
              <div key={i} style={{ fontSize: 11, color: "#88ccaa", lineHeight: 1.6, paddingLeft: 10, borderLeft: "2px solid #1a3a25", marginBottom: 4 }}>{f}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div style={sectionStyle}>
        {sectionTitle("Entry Scenarios")}
        <div style={{ display: "grid", gap: 12 }}>
          {scenarios.map((sc) => {
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

      {/* Catalysts */}
      <div style={sectionStyle}>
        {sectionTitle("Catalyst Timeline")}
        <div style={cardStyle}>
          {catalysts.map((cat, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "10px 0", borderBottom: i < catalysts.length - 1 ? "1px solid #14161e" : "none" }}>
              <div style={{ minWidth: 100, fontSize: 12, fontWeight: 700, color: cat.done ? "#555" : "#f0f0f5" }}>{cat.date}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: cat.done ? "#888" : "#ccc", lineHeight: 1.5 }}>{cat.event}</div>
              </div>
              <div style={{ minWidth: 100, textAlign: "right" }}>
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
        Sources: Binance Futures API (fapi.binance.com) · Bybit API v5 · CoinGecko · DexScreener · token-analysis skill playbook
      </div>
    </div>
  );
}
