import { useState, useEffect, Fragment } from "react";

const THEME_STORAGE_KEY = "unlock-dashboard-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
  return "dark";
}

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
    vesting: "▶ 토큰이 뭐야? TIA는 Celestia의 네이티브 토큰. Celestia는 Modular(모듈러 — 블록체인 기능을 분리해서 조합) 블록체인의 선구자로, 데이터 가용성(DA) 레이어만 전담하는 L1(레이어1 — 자체 블록체인). 이더리움·솔라나 같은 단일 체인과 달리 실행·합의·데이터를 분리해서 처리하는 구조. ▶ 무슨 이벤트가 있었어? 2026년 4월 1일, Core Contributors(핵심 개발팀) + Seed(초기 투자자) + Series A/B(후속 투자자) 물량이 한꺼번에 잠금 해제됨. 이 세 그룹이 받은 물량은 각각 58M, 52M, 65M TIA로 총 175M TIA 수준. ▶ 얼마나 컸어? 전체 유통량의 19.51%, 달러 환산 $52.6M 규모. 당시 24시간 거래량($18~24M)의 2~3배에 달하는 물량이 한 번에 풀린 것. ▶ 누가 받았어? Core Contributors(핵심 개발팀) 33%, Seed Investors(초기 투자자) 30%, Series A/B Investors(후속 투자자) 37% 비율로 분배. 이 세 그룹 모두 Y1(1년 차)에 33.33% cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 후 나머지는 Y2~Y3까지 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조. ▶ 어떻게 됐어? 현재 가격 $0.30으로 ATH(역대 최고가) 대비 -98.6% 폭락 상태. 언락 이후에도 구조적 매도 압력이 지속되며 가격 회복이 이뤄지지 않고 있음. ▶ 앞으로 봐야 할 점은? 다음 대규모 언락이 2026년 10월 30일에 예정되어 있음 — 175.6M TIA 추가 해제. 현재 유통량 900M 대비 약 19.5% 추가 물량. 모듈러 DA 섹터 경쟁(EigenDA, Avail 등)이 심화되는 상황에서 수요 회복 없이 공급만 늘어나는 구조가 지속될 수 있음",
    strategy: [
      { type: "caution", title: "4월 언락 완료 — 구조적 매도 압력은 아직 끝나지 않았다",
        desc: "4/1 언락은 이미 완료됐지만 상황이 나아진 건 아님. ATH 대비 -98.6% 폭락한 상태에서 Core Contributors·Seed·Series A/B 세 그룹이 받은 물량($52.6M)이 시장에 풀렸고, 이들은 수익 실현 압박이 강한 그룹. 다음 대규모 언락(10/30, 175.6M TIA)까지 약 6개월 남았지만, 그 사이에도 Y2~Y3 linear vesting(선형 분할 — 매월 일정량씩 풀림) 물량이 매달 조금씩 나옴. 모듈러 DA 섹터 자체의 수요 회복 신호가 없는 한 반등 근거가 약함",
        risk: "추가 하방은 이미 ATH -98.6%라 제한적으로 보이지만, 10/30 언락(175.6M TIA)이 또 다른 매도 압력으로 작용할 수 있음. 섹터 내 경쟁 심화(EigenDA, Avail 등)로 TIA 고유의 내러티브가 약해지는 것도 리스크" },
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
    vesting: "▶ 토큰이 뭐야? W는 Wormhole의 네이티브 토큰. Wormhole은 서로 다른 블록체인 간 자산과 메시지를 이동시키는 Bridge(브릿지 — 다른 블록체인 간 자산 이동) + 크로스체인 메시징 프로토콜. 이더리움·솔라나·BNB체인 등 30개 이상 네트워크를 연결하며, 인터옵(상호운용성) 인프라의 핵심 플레이어 중 하나. ▶ 무슨 이벤트가 있었어? 2026년 4월 3일, Core Contributors(핵심 개발팀) 물량이 해제됨. 원래 계획은 1.28B W였으나 실제로는 약 600M W만 실행됨. 이는 W 2.0 업그레이드(2025년 10월)로 기존 대규모 cliff 방식에서 bi-weekly(격주) 소규모 분할 방식으로 구조가 바뀐 결과. ▶ 얼마나 컸어? 전체 유통량의 10.6%, 달러 환산 $10M 규모. 당초 예상보다 절반 이하로 줄어든 실제 실행 물량이 시장 충격을 완화함. ▶ 누가 받았어? Core Contributors(핵심 개발팀) 단일 그룹. 전체 토큰 배분에서 Core Contributors는 12% 비중(총 공급량 10B 기준 1.2B W). W 2.0 전환 이후 이 물량이 격주 단위로 소량씩 분할 해제되는 구조로 바뀜. ▶ 어떻게 됐어? 현재 가격 $0.013으로 ATH 대비 -99% 폭락 상태. 언락 자체의 충격은 구조 변경으로 완화됐지만, 가격은 여전히 역대 최저 수준에 머물고 있음. ▶ 앞으로 봐야 할 점은? W 2.0 전환으로 이후 대규모 cliff 언락은 없음 — 이것이 핵심 변화. 격주 소규모 해제가 지속되지만 시장 충격은 크지 않을 것. 크로스체인 인터옵 섹터의 수요 회복(LayerZero·Axelar 등 경쟁사 대비 점유율)이 가격 회복의 열쇠",
    strategy: [
      { type: "caution", title: "4월 언락 완료 — 구조 변화로 앞으로의 충격은 줄었다",
        desc: "4/3 언락은 완료됐고, W 2.0 업그레이드(2025.10)로 기존 대규모 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 방식이 bi-weekly 격주 소규모 분할로 전환됨. 원래 1.28B W가 한꺼번에 풀릴 예정이었으나 실제로는 약 600M W만 실행된 것도 이 구조 변화 덕분. 앞으로 단기 대규모 매도 충격은 줄어들 가능성이 높음. 다만 ATH 대비 -99%라는 가격 수준 자체가 시장의 신뢰 부재를 반영하고 있어, 구조 개선만으로 반등을 기대하기는 어려움",
        risk: "ATH -99%로 이미 극단적 하락 상태. 격주 소규모 언락이 지속되면서 지속적인 매도 압력이 낮은 수준으로 유지됨. 크로스체인 인터옵 섹터 자체의 수요가 회복되지 않으면 구조 개선의 효과가 가격에 반영되기 어려움" },
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
    vesting: "▶ 토큰이 뭐야? STO는 StakeStone, LSD(유동성 스테이킹 파생) 프로토콜. TGE(토큰 발행)는 정확히 1년 전인 2025-04-03. ▶ 무슨 이벤트? 1주년 시점에 8.95% = $18.22M 규모가 풀림. Investors + Foundation(재단) + Team이 공통 수령자로 한 회차에 묶여 있음. ▶ 얼마나 큰 규모? 8.95%는 총공급 1B 기준. 현 유통 225M 대비로 보면 약 39.8% 신규 물량이 한 번에 더해지는 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림)성 충격 → 시장 가용 공급량 자체가 크게 늘어남. ▶ 누가 받음? Investors 21.50%, Foundation 18.65%, Team 15.0% — 이번 회차 상위 3개 트랜치가 모두 강한 매도 유인을 가진 그룹. 향후 multi-sig(다중서명) 운영을 smart contract vesting(스마트컨트랙트로 자동 분할)으로 전환 예정이라 수령 구조는 곧 자동화될 것. ▶ 시장 미리 반응? 가격이 72시간 안에 $0.11→$1.87→$0.76으로 17배 튀었다가 60% 빠지는 비정상 변동성을 이미 보임. 거래소 사이에서도 동시각 가격이 $0.22~$1.14로 5배 이상 벌어진 상태 = 데이터 신뢰도 자체가 흔들림. ▶ 한국에서 팔 수 있나? 빗썸·업비트 모두 미상장. 거래는 Binance, MEXC, Bitget, KuCoin 해외 거래소만. 24시간 거래량 $625M이 시총 $50M의 12.5배에 달하는 비정상 회전율 → 단기 트레이더 위주의 얇은 시장",
    strategy: [
      { type: "caution", title: "거래소간 가격 5배 차이 — 데이터 신뢰도 RED FLAG",
        desc: "$0.11→$1.87→$0.76 (72시간) 극심한 변동성. 거래소별 시세가 동시각 $0.22~$1.14로 5배 이상 벌어져 있음 → 어떤 가격을 기준으로 잡느냐에 따라 unlock 가치 표시값($18.22M) 자체가 의미를 잃음. 1주년 cliff 매도 압력은 분명 존재하지만, 진입가·기준가 자체를 신뢰하기 어려운 구간",
        risk: "거래량 $625M vs 시총 $50M = 12.5배 회전율은 정상 시장에서 보기 어려운 비율 (워시 트레이딩·일시적 펌프 가능성). 한 거래소 가격만 보고 진입했다가 다른 거래소 가격으로 정상화되는 순간 큰 손실. 청산도 같은 거래소에서만 가능 → 진입과 청산을 분리하면 추가 슬리피지" },
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
    vesting: "▶ 토큰이 뭐야? ICNT는 Impossible Cloud의 DePIN(탈중앙 물리 인프라) 토큰. 분산형 클라우드 스토리지·컴퓨팅 네트워크를 운영하며 Binance·Coinbase·KuCoin·Kraken·Bybit에 상장. 총공급량 700M, 현재 유통량 250M. ▶ 무슨 이벤트? 2026-04-03에 Team 카테고리의 12개월 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 도달. TGE(토큰 발행) 이후 12개월간 완전히 잠겨 있던 Team 물량이 이 시점부터 해제 시작. ▶ Team 물량 구조가 복잡한데? 86%/14% 이중 버킷 구조. 86%는 24개월 linear vesting(선형 분할 — 매월 일정량씩 풀림)으로 분산 배출. 나머지 14%는 cliff 도달 시점에 7.2M이 즉시 배출되고, 이후 14.5M이 추가 선형 분할로 배출. ▶ Investors는? Investors(21.5%) 역시 12개월 cliff + 24개월 선형 구조. Team과 cliff 시점이 동일해 두 카테고리가 같은 날 해제 시작. 합산 물량 압력 주의. ▶ 규모는? 이번 이벤트 기준 unlockPct 2.88%, unlockVal $2.86M. 현재가 $0.40, MCap(시가총액) $100M, FDV(완전희석시가총액) $280M. 24h 거래량 $7.3M 대비 소화 가능하나 ATH 대비 -33%로 하방 여력 존재. ▶ 이후 일정은? cliff 이후 Team 86% 물량은 24개월에 걸쳐 매월 분할 배출 지속. Node Sale(20%)·Partner Fund(11%)·EcoDev Fund(10%) 등 다른 카테고리의 vesting 일정도 별도 확인 필요.",
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
    vesting: "▶ 토큰이 뭐야? LA는 Lagrange의 ZK(영지식증명) 기반 인프라 토큰. ZK 코프로세서와 상태 증명 네트워크를 운영하며, Coinbase·KuCoin·Bybit·Gate.io·MEXC에 상장. Binance 스팟은 미상장이고 Binance Alpha(Binance 신규 토큰 사전 노출 프로그램)를 통해서만 접근 가능. ▶ 무슨 이벤트? 2026-04-04에 Community & Ecosystem 카테고리에서 월간 linear vesting(선형 분할 — 매월 일정량씩 풀림) 물량이 배출됨. 매월 6.05M LA, 비율로는 유통량 대비 3.14%. ▶ 발행 구조는? 총공급량 1B 중 Inflation(Emissions) 32.44%가 별도로 존재 — 즉 Community & Ecosystem 월간 분할 외에 매월 1.747% linear emission(선형 발행 — 매월 일정량 신규 발행)이 추가로 시장에 공급됨. 이중 압력 구조. ▶ 규모는? 유통량 193M 대비 3.14% = 약 6.05M LA. 현재가 $0.17 기준 약 $1.07M. 24h 거래량 $6~15M 대비 소화 가능한 수준이나 ATH 대비 -90.3%로 이미 극심한 약세. ▶ 일정은? Community & Ecosystem 선형 분할은 2025년 12월부터 2029년 12월까지 48개월간 지속. 매월 동일 물량이 반복 배출되는 구조. ▶ 주의사항은? Binance Alpha 단독 노출 narrative가 있으나 Binance 스팟 정식 상장 전까지는 유동성 채널이 제한적. 매월 반복되는 emission 구조상 지속적인 매도 압력이 누적됨.",
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
    vesting: "▶ 토큰이 뭐야? ENA는 Ethena의 거버넌스 토큰. Ethena는 이더리움 기반 합성 달러(USDe)를 발행하는 DeFi(탈중앙화 금융) 프로토콜. 현물 ETH 매수 + 선물 숏 포지션을 동시에 잡아 가격 중립을 유지하면서 funding rate(펀딩비 — 무기한 선물 보유 비용)를 수익으로 전환하는 구조. ▶ 무슨 이벤트가 있었어? 2026년 4월 5일, Core Contributors(핵심 개발팀) 171.88M ENA가 해제됨. 4월 2일에는 Foundation(재단) 물량 40.63M ENA($3.6M)가 별도로 먼저 풀렸고, 4/5가 메인 이벤트. TGE(토큰 발행)는 2024년 3월 5일이었으며, 이후 1년 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) + 3년 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조로 운영 중. ▶ 얼마나 컸어? 전체 유통량의 1.95%, 달러 환산 $14.7M 규모. 실제 171.88M ENA가 해제됐으며 이벤트 전후로 4.4% 가격 변동이 발생함. ▶ 누가 받았어? Core Contributors(핵심 개발팀) 80.9%(171.88M) + Foundation(재단) 19.1%(40.63M, 4/2 별도 완료). Core Contributors는 전체 배분의 30%, Investors(투자자)는 25% 비중으로, 두 그룹 모두 1년 cliff 후 3년 월간 선형 해제 구조. ▶ 어떻게 됐어? 현재 가격 $0.084로 ATH 대비 -94.6% 하락 상태. 4/5 언락 전후 4.4% 가격 변동이 발생했으나 큰 충격 없이 소화됨. 월간 선형 언락 구조라 매달 비슷한 규모의 물량이 지속적으로 나오는 패턴. ▶ 앞으로 봐야 할 점은? 다음 언락은 2026년 5월 5일로 동일 규모 예정. 매달 반복되는 구조이므로 단발성 이벤트가 아닌 지속적 매도 압력으로 봐야 함. USDe 수요와 funding rate 환경이 ENA 가격의 핵심 변수",
    strategy: [
      { type: "caution", title: "4월 언락 완료 — 매달 반복되는 구조적 압력",
        desc: "4/5 언락은 완료됐고 실제 171.88M ENA($54M 규모)가 해제되며 4.4% 가격 변동이 발생함. 단발성 이벤트가 아니라 매달 5일 전후로 동일 규모의 Core Contributors 물량이 반복 해제되는 구조. 다음 언락은 5/5로 예정되어 있으며 규모도 비슷할 것으로 예상됨. Ethena의 USDe 수요가 늘어나거나 funding rate(펀딩비 — 무기한 선물 보유 비용) 환경이 개선되지 않으면 매달 나오는 물량이 지속적인 하방 압력으로 작용함",
        risk: "월간 linear vesting(선형 분할 — 매월 일정량씩 풀림)이 3년간 지속. 매달 비슷한 규모의 매도 압력이 반복됨. DeFi 섹터 전반의 침체와 funding rate 환경 악화가 겹치면 가격 회복이 더 어려워질 수 있음" },
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
    vesting: "▶ 토큰이 뭐야? POWER는 Power Protocol의 네이티브 토큰. Power Protocol은 Gaming/Web3 섹터의 프로젝트로, 게임 내 자산과 블록체인을 연결하는 인프라를 표방함. 총 공급량 1B개, 현재 유통량 210M개로 전체의 21%만 시장에 풀린 상태. ▶ 무슨 이벤트가 있었어? 2026년 3월 5일, Team(팀) + Investors(투자자) 물량이 해제됨. 전체 유통량의 5.71%, 달러 환산 $23M 규모. Team은 12개월 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 후 36개월 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조. ▶ 얼마나 컸어? $23M 규모로 당시 24시간 거래량($7.3M)의 약 3배에 달하는 물량. 시장이 하루 만에 흡수하기 어려운 규모였음. ▶ 누가 받았어? Team(팀) 9.23% + Investors(투자자) 16.15% 비중. 언락 직후 Team이 30M개를 Bitget(20M개) + MEXC(10M개)로 전송한 것이 온체인에서 확인됨 — 즉각적인 매도 의도가 명확했던 사례. ▶ 어떻게 됐어? ATH $2.46에서 현재 $0.102로 -95.9% 폭락. Team의 거래소 전송 후 90% 폭락 사건이 발생했으며, 이것이 POWER 가격 붕괴의 직접적 원인으로 지목됨. 현재도 회복 없이 저점 수준 유지 중. ▶ 앞으로 봐야 할 점은? Team의 36개월 linear vesting이 아직 진행 중이므로 매달 추가 물량이 나올 수 있음. 과거 Team이 언락 즉시 거래소로 전송한 전례가 있어 다음 해제 시에도 동일한 패턴이 반복될 가능성이 높음. Team 신뢰도 회복 없이는 가격 반등 근거가 매우 약함",
    strategy: [
      { type: "caution", title: "3월 언락 완료 — Team 매도 전례로 신뢰도 바닥",
        desc: "3/5 언락은 이미 완료됐지만 후폭풍이 심각함. Team이 언락 직후 30M개를 Bitget(20M개) + MEXC(10M개)로 즉시 전송해 매도한 것이 온체인에서 확인됐고, 이후 ATH $2.46에서 90% 폭락하는 사건이 발생함. 현재 $0.102로 ATH 대비 -95.9% 상태. Team의 36개월 linear vesting(선형 분할 — 매월 일정량씩 풀림)이 아직 진행 중이라 매달 추가 물량이 나올 수 있으며, 과거 패턴을 보면 즉각 매도 가능성이 높음",
        risk: "Team 신뢰도가 극히 낮음. 언락 즉시 거래소 전송 → 매도 패턴이 이미 한 번 확인됐으므로 다음 언락 시 동일한 패턴이 반복될 가능성이 높음. Gaming/Web3 섹터 자체의 침체와 맞물려 수요 회복 근거도 약함" },
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
    vesting: "▶ 토큰이 뭐야? HYPE는 Hyperliquid의 네이티브 토큰. 자체 온체인 오더북 기반 DEX이자 L1 체인으로, 외부 거래소 없이 Hyperliquid DEX에서만 거래 가능. ▶ 무슨 이벤트? 2026-04-06, Core Contributors 물량이 풀리는 날. 백서상 계획은 9.92M HYPE였으나 실제 청구량은 ~330K ($12.1M) — 계획 대비 96.7% 덜 청구. ▶ 얼마나 큰 규모? 언락 비율 0.14%로 수치 자체는 극소. 총공급량 1B 대비 0.033%, 유통량 238M 대비 0.14%. 시장 충격 거의 없는 수준. ▶ 왜 이렇게 적게 청구? 85%+ 물량이 스테이킹·유동성 인센티브로 즉시 재잠금됨. 프로토콜 수수료의 97%가 환수/소각으로 배분 — 월 ~$1.7M 규모. 언락보다 환수가 더 많은 구조. ▶ 시장 상황? 현재 $38.34, MCap(시가총액) $9.13B, FDV(완전희석시가총액) $36.86B. ATH 대비 -35.4%로 다른 토큰 대비 낙폭 제한적. 24시간 거래량 $285M으로 유동성 두텁지만 자체 DEX 외 출구 없음. ▶ 핵심 구조 요약: 언락 물량 < 환수 물량. 매도 압력보다 소각 압력이 강한 희귀한 케이스.",
    strategy: [
      { type: "bounce", title: "환수 > 언락 — 매도 압력 거의 없는 구조적 반등 후보",
        desc: "월 환수·소각 규모 ~$1.7M이 실제 청구 언락($12.1M, 단발)을 빠르게 상쇄하는 구조. 실제 청구량이 계획 대비 96.7% 적게 나온 전례가 있어 이번에도 시장 충격은 제한적. ATH -35.4%로 다른 DeFi 토큰 대비 낙폭이 작고, 자체 DEX 거래량 $285M으로 유동성 두터움 → 언락 소화 후 dead-cat bounce(하락 추세 중 잠시 튀는 모양)가 아닌 실질 반등 가능성. 진입 타이밍은 4/6 언락 직후 매도 물량이 소화되는 구간 확인 후.",
        risk: "자체 DEX에서만 거래 가능 — Binance·Upbit 등 외부 거래소 없어 한국에서 접근 어려움. 실제 청구량이 예상보다 많아질 경우(백서 9.92M 전량 청구 시) 매도 압력 급증 가능. FDV $36.86B 대비 MCap $9.13B — 미유통 물량이 4배 이상 남아 있어 장기 희석 리스크 존재." },
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
    vesting: "▶ 토큰이 뭐야? WLFI(World Liberty Financial)는 Trump 가족이 순이익의 75%를 가져가는 DeFi 및 governance(거버넌스 — 토큰 보유자 의사결정) 토큰. 2025년 7월 거버넌스 투표(99% 찬성)로 양도 가능 전환되며 시장에 풀리기 시작했다. ▶ 무슨 이벤트? 2026년 4월 15일 한꺼번에 50.24%(~$150M)가 풀린다. 이 중 핵심은 두 갈래 — Public Sale 80% 물량(~16B WLFI)이 거버넌스 투표 결과를 기다리고 있고, 동시에 Team & Advisors 베스팅이 시작될 가능성이 있다. ▶ 얼마나 큰 규모? 50.24%는 현재 유통량(31.76B) 대비 비율. 다르게 보면 Public Sale 80% ~16B + Team·Advisors ~33.5B + Treasury·기타 ~18.7B로 쪼개진다. ATH(사상 최고가) $0.33 대비 -75.8% 떨어진 $0.0802 가격에서 MCap(시가총액) $2.58B, FDV(완전희석시가총액) $8.02B. ▶ 누가 받음? Public Sale 80%는 4/10 거버넌스 제안에서 단계적 베스팅을 제안 중 — 즉 한 번에 안 풀고 나눠 푸는 안. Team은 12개월 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 후 24~36개월 linear vesting(선형 분할). 소스마다 기간이 달라 정확한 일정은 미확정. ▶ 시장 미리 반응? YES, 그것도 강하게. 4/9에 Dolomite 프로토콜에 자체 토큰 50억 개를 담보로 맡기고 $75M USD1을 차입(이자 35.81%, 풀의 93%가 고갈됨). 4/10 거버넌스 제안 공개와 동시에 가격 -12% 사상 최저 갱신. 별도로 170 BTC($11M)도 매각 — 자금난이 의심되는 신호들이 동시에 터졌다. ▶ 한국에서 팔 수 있나? Upbit, Bithumb, Coinone 모두 상장. Upbit 주간 거래량 $1.17B로 한국 거래소 중 3위 — 한국 매도 채널은 충분히 두텁다.",
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
      { type: "short", title: "숏 포지션 유효",
        desc: "Binance, Upbit, Bithumb 모두 상장된 상태. 거버넌스 투표가 통과하면 Public Sale 80%(~16B WLFI)가 추가로 풀리는데, 이는 현재 유통량 대비 50%+ 규모의 매도 압력. Upbit 주간 거래량이 $1.17B(한국 거래소 3위)로 두꺼워 숏 포지션 진입과 청산이 용이하다.",
        risk: "투표 결과가 단계적 베스팅으로 결론나면 충격이 분산돼 폭락이 안 올 수 있고, 반대로 즉시 언락이 결정되면 폭락 가능 — 이 둘 사이의 갈림길이라 결과 미확정 단계에서 큰 베팅은 위험." },
      { type: "timing", title: "4월 중순 거버넌스 투표",
        desc: "4/10 팀이 '장기 베스팅 및 언락 일정' 제안을 공개해 투표가 임박했다. 결과에 따라 16B WLFI 해제 일정이 결정되며 투표 전후 변동성이 극대화된다.",
        risk: "투표권이 180일 staking(예치) 후에만 생겨 일반 홀더 다수가 투표 불가 — 사실상 팀 주도 구조라 팀에 유리한 결과가 나올 가능성이 크다." },
      { type: "caution", title: "Dolomite 순환위험",
        desc: "4/9 자체 토큰 50억 개를 담보로 Dolomite에서 $75M을 차입한 게 핵심 위험. USD1 풀이 93%까지 고갈됐고, WLFI 가격이 떨어지면 → 담보 가치 하락 → 강제 청산 → 추가 매도 → 가격 추가 하락의 악순환 구조. 4/10 이미 -12% 급락하며 사상 최저가를 찍었다.",
        risk: "Dolomite 전체 TVL의 55%가 WLFI 담보 — 이 한 토큰이 무너지면 프로토콜 전체가 흔들린다. 별도로 170 BTC($11M) 매각 정황까지 겹쳐 자금난 의심." },
      { type: "bounce", title: "투표 후 반등 시나리오",
        desc: "거버넌스 투표 결과가 '단계적 베스팅 확정'으로 나오면 → 시장 불확실성 해소 → 단기 반등 가능. 프리세일 가격 $0.015 대비 현재 $0.10이라 여전히 6.6배 수익권에 있어 매수자 유입 여지가 있다.",
        risk: "ATH $0.33 대비 -71% 상태에서, Team·Advisors 33.5% 물량이 베스팅을 시작하면 장기 매도 압력은 계속 누적된다." },
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
    vesting: "▶ 토큰이 뭐야? MOVE는 Movement Network의 L1(레이어1 — 자체 블록체인) 토큰. Meta에서 개발한 Move 언어 기반으로 스마트컨트랙트 보안성을 높인 체인이며, Binance·Coinbase·Bybit·OKX에 상장. TGE(토큰 발행) 이후 ATH 대비 -90%+ 하락한 상태. ▶ 무슨 이벤트? 2026-04-09에 164.58M MOVE가 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 방식으로 Early Backers에게 해제됨. 단, 이번 언락은 원래 일정보다 6개월 연장된 락업이 끝나는 시점. 즉 Early Backers는 이미 한 번 기다렸다가 받는 물량. ▶ 얼마나 큰 규모? 164.58M MOVE = 총공급량 10B의 1.65% / 현재 유통량 3.51B의 4.69% / 달러 환산 약 $2.97M. 단일 이벤트로는 작은 편이지만, ATH -90%+ 상태에서 초기 투자자가 받는 물량이라 매도 유인이 높음. ▶ 누가 받음? Early Backers(초기 투자자) 카테고리. 전체 할당의 22.5%를 보유한 그룹으로, 이미 6개월 연장 락업을 감수한 만큼 해제 즉시 일부 차익 실현 가능성 있음. Foundation(10%)·Early Contributors(17.5%)는 이번 이벤트와 무관. ▶ 시장 미리 반응? 별도 거래량 데이터 없음(vol24h: N/A). 다만 ATH -90%+ 구간에서 초기 투자자 물량이 풀리는 구조는 시장이 사전에 매도 포지션을 잡기 좋은 조건. 가격 $0.018, MCap(시가총액) $63M, FDV(완전희석시가총액) $180M으로 FDV/MCap 비율이 약 2.9배 — 아직 풀릴 물량이 많다는 신호. ▶ 한국에서 팔 수 있나? Binance·Coinbase·Bybit·OKX 상장이지만 국내 원화 거래소(업비트·빗썸) 미상장 확인 필요. 해외 거래소 경유 매도 시 출금 수수료·환전 비용 발생.",
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
    vesting: "▶ 토큰이 뭐야? BABY는 Babylon의 거버넌스 토큰. Babylon은 BTC Staking(비트코인 스테이킹 — BTC를 PoS 체인 보안에 활용) 프로젝트로, BTC 보유자가 비트코인을 다른 PoS 체인의 검증에 활용해 수익을 얻게 한다. 2025년 4월 10일 Genesis 런칭 후 정확히 1주년 시점에 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림)가 도래. ▶ 무슨 이벤트? 4/10 단일 cliff로 19.88%(~$7.88M)가 한꺼번에 풀린다. 더 무서운 건 4/10 이후 매월 선형 언락이 시작된다는 점 — Early Private 3.05B의 87.5%(2.66B)가 3년에 걸쳐 매달 흘러나온다. ▶ 얼마나 큰 규모? 19.88%는 현재 유통량(3.72B) 대비. 풀리는 물량의 분해 — Early Private Investors 381.25M(62.2%) + Team 187.5M(30.6%) + Advisors 43.75M(7.1%). MCap(시가총액) $41M 극소형 토큰이라 절대 금액은 작지만 비중이 크다. ▶ 누가 받음? 1년 cliff가 동시 만료되는 세 그룹 — Early Private + Team + Advisors. 즉 초창기 투자자, 팀, 어드바이저가 동시에 풀린다. Cliff 후 각자 3년 linear vesting(선형 분할)으로 매월 흘러나온다. ▶ 시장 미리 반응? 강하게 — RSI(상대강도지수 — 과매수/과매도 측정)가 29.87로 과매도 영역. funding rate(펀딩비 — 무기한 선물 보유 비용)가 -0.003으로 숏 우세. OI(미결제약정)는 3월 $1B → 현재 $434M로 -57% 급감(3월 청산 $40M+ 사태로 정리됨). 4월 중 Aave와 공동 BTC 렌딩 출시가 예정돼 있어 펀더멘털 촉매도 동시에 대기 중. ▶ 한국에서 팔 수 있나? Upbit, Bithumb 미상장(거래 가능 거래소는 Binance, OKX, Kraken, KuCoin, Bybit, CoinW). 한국 트레이더는 해외 거래소를 거쳐야 한다.",
    strategy: [
      { type: "short", title: "숏: 월별 선형 언락 매도 압력",
        desc: "4/10 cliff 해제 후 매월 선형 언락이 시작된다. Early Private 3.05B의 87.5%(2.66B)가 3년에 걸쳐 매달 흘러나오는 구조 — 매월 누적되는 매도 압력. 격월로 short squeeze(숏 강제청산으로 가격 급등) 패턴이 도는 DYDX 유사 사례에 주의.",
        risk: "RSI 29.87로 이미 과매도 영역, ATL(역대 최저가) $0.0107 대비 +35% 위치 — 바닥 다지기 가능성도 살아있어 무작정 숏은 위험." },
      { type: "bounce", title: "롱: 과매도 반등 + Aave BTC 렌딩",
        desc: "RSI 30 이하 과매도 + funding rate -0.003(숏 우세 → short squeeze 가능). OI는 3월 $1B에서 현재 $434M로 -57% 급감해 청산 매물이 거의 정리된 상태. 결정타는 Aave와의 공동 BTC 렌딩 출시가 4월 예정 — 펀더멘털 촉매가 겹친다.",
        risk: "무한 공급(연 ~8% 인플레이션) 토큰이라 장기 보유는 불리. 반등은 단타(2~5일) 접근으로 짧게 끊는 게 안전." },
      { type: "timing", title: "타이밍: 4월보다 5월 단타",
        desc: "과거 패턴상 격월 squeeze가 관찰됐다. 4월 cliff 직후는 매도 압력이 최대치라 위험 — 매도가 다 소진된 후 5월 숏커버 랠리를 노리는 게 유효. 매수 $0.012-0.013 → 익절 $0.018-0.020 구간.",
        risk: "3월 대규모 청산($40M+) 이후 OI가 $434M에서 안정화 중 — 추가로 큰 청산 연쇄가 일어날 가능성은 제한적이라 squeeze 강도가 약할 수도 있다." },
      { type: "caution", title: "리스크 요약",
        desc: "내부자 보유 비중 66%. 2028년까지 지속 언락. Inflation 3.6B(33.6%)는 4년 동적 해제, Ecosystem과 R&D는 각각 506.25M씩 2년 선형 — 매월 유통량 증가 폭이 상당하다.",
        risk: "MCap $54M 극소 — 변동성 극심. 레버리지 3x 이하 권장, 포지션 사이즈는 보수적으로." },
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
    vesting: "▶ 토큰이 뭐야? LINEA는 Consensys가 개발한 L2(레이어2 — 이더리움 위 확장 체인) 토큰. MetaMask를 만든 Consensys가 직접 운영하는 ZK(영지식증명) 기반 롤업 체인으로, Binance·OKX·Bybit에 상장. 총공급량 72B, 현재 유통량 24.98B. ▶ 무슨 이벤트? 2026-04-10에 1.38B LINEA가 Consensys Treasury(재단 보유 자금)에서 해제됨. 이 물량은 5년 완전 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 구조로, 2030년 10월 이후에야 완전 해제되는 장기 일정의 일부. ▶ 얼마나 큰 규모? 1.38B LINEA = 총공급량 72B의 1.92% / 현재 유통량 24.98B의 5.53% / 달러 환산 약 $4.6M. 유통량 대비 5.53%는 단기 매도 압력으로 작지 않은 규모. MCap $85M, FDV $245M으로 FDV/MCap 비율 약 2.9배. ▶ 누가 받음? Consensys Treasury가 수령. 단 Consensys는 기업 treasury(재단 보유 자금)로 즉각 시장 매도보다 생태계 운영 자금으로 활용할 가능성이 높음. 별도로 Long-term Alignment 카테고리(50%)는 Consortium(컨소시엄 — 여러 조직이 함께 관리) 구조 — ENS Labs, Eigen Labs, SharpLink, Status, Consensys 5개 조직이 10년 linear vesting(선형 분할 — 매월 일정량씩 풀림)으로 보유. ▶ 시장 미리 반응? vol24h 데이터 없음. ATH -70%+ 상태이며, Consensys Treasury 수령이라 단기 매도 압력은 제한적으로 예상되나 5년 cliff 종료 시점이 가까워질수록 시장 경계감 높아질 수 있음. ▶ 한국에서 팔 수 있나? Binance·OKX·Bybit 상장. 국내 원화 거래소 상장 여부 별도 확인 필요. 해외 거래소 경유 시 출금 수수료 발생.",
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
    vesting: "▶ 토큰이 뭐야? APT는 Aptos의 L1(레이어1 — 자체 블록체인) 토큰. Meta 출신 개발자들이 만든 Move 언어 기반 고성능 체인으로, Binance·Coinbase·Kraken·OKX에 상장. 최대 공급량 무제한(staking(예치) 보상으로 지속 발행). ▶ 무슨 이벤트? 2026-04-12에 11.31M APT가 정기 언락. 이 숫자는 매월 반복되는 고정 물량 — Community/Foundation은 10년(월 1/120씩), Core Contributors/Investors는 1년 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 후 4년 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조. ▶ 얼마나 큰 규모? 11.31M APT = 현재 유통량 794M의 1.42% / 달러 환산 약 $9.65M. 24시간 거래량 $50M+ 대비 약 19% 수준으로 시장이 충분히 흡수 가능한 규모. MCap(시가총액) $675M, FDV(완전희석시가총액) $1.79B. ▶ 누가 받음? Community·Foundation·Core Contributors·Investors 4개 카테고리가 비율에 따라 수령. 특히 Core Contributors(19%)와 Investors(13.48%)는 cliff 이후 월간 분할 수령 중 — 이들의 매도 유인이 가격에 직접 영향. ▶ 시장 미리 반응? 매월 반복 이벤트라 시장이 이미 가격에 반영(priced in)된 경향. 다만 staking(예치) 비율 82%+가 핵심 완충재 — 유통 물량의 대부분이 스테이킹에 묶여 있어 실제 매도 가능 물량이 제한됨. APY 7%에서 연 1.5%씩 감소, 최소 3.25%까지 내려가는 구조. ▶ 한국에서 팔 수 있나? Binance·Coinbase·Kraken·OKX 상장. 업비트·빗썸 상장 여부 별도 확인 필요. 거래량 $50M+로 유동성은 충분해 슬리피지 우려 낮음.",
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
    vesting: "▶ 토큰이 뭐야? STRK는 Starknet의 L2(레이어2 — 이더리움 위 확장 체인)/ZK(영지식증명) 토큰. StarkWare가 개발한 ZK-Rollup 기반 체인으로, Binance·Coinbase·OKX·Bybit에 상장. ATH 대비 -97%+ 하락한 상태. ▶ 무슨 이벤트? 2026-04-15에 127M STRK가 Early Contributors에게 해제됨. 이 물량은 2024년 4월부터 2027년 3월까지 매월 127M씩 반복되는 월간 스케줄의 일부. Early Contributors와 Investors 모두 4년 lockup, 1년 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 구조 적용. ▶ 얼마나 큰 규모? 127M STRK = 총공급량 10B의 1.27% / 현재 유통량 5.69B의 2.23% / 달러 환산 약 $4.36M. 24시간 거래량 $17M 대비 약 25.6% — 단일 카테고리 물량치고 부담스러운 비율. MCap(시가총액) $195M, FDV(완전희석시가총액) $343M. ▶ 누가 받음? Early Contributors(20.04%) 카테고리. StarkWare(10.76%)·Investors(18.17%)는 같은 4년 lockup/1년 cliff 구조를 공유하지만 이번 이벤트의 직접 수령자는 Early Contributors. ATH -97%+ 상태에서 초기 기여자들의 매도 유인이 높을 수 있음. ▶ 시장 미리 반응? 매월 반복 이벤트라 어느 정도 priced in. 다만 -97%+ 낙폭은 ZK 섹터 전반의 침체를 반영하며, 월간 127M 물량이 꾸준히 공급되는 구조가 반등을 억누르는 요인. 2027년 3월까지 이 스케줄이 지속됨. ▶ 한국에서 팔 수 있나? Binance·Coinbase·OKX·Bybit 상장. 국내 원화 거래소 상장 여부 별도 확인 필요. 거래량 $17M으로 중간 수준 — 대량 매도 시 슬리피지 주의.",
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
    vesting: "▶ 토큰이 뭐야? ETHFI는 Ether.fi의 LSD(유동성 스테이킹 파생)/restaking(재스테이킹) 프로토콜 토큰. 이더리움 staking(예치) 후 발행된 eETH를 EigenLayer에 재스테이킹해 추가 수익을 얻는 구조. Binance·Coinbase·OKX·Bybit 상장. ATH 대비 -90%+ 하락. ▶ 무슨 이벤트? 2026-04-18에 9.69M ETHFI가 Team Allocation에서 해제됨. Team & Advisors(23.26%)는 1년 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 후 36개월 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조 — 즉 cliff 이후 매월 일정량씩 3년에 걸쳐 분할 해제되는 중. ▶ 얼마나 큰 규모? 9.69M ETHFI = 총공급량 1B의 0.97% / 현재 유통량 699.4M의 4.17% / 달러 환산 약 $6.99M. 24시간 거래량 $15M 대비 약 46.6% — 거래량 대비 비중이 높아 단기 매도 압력 주의. 총공급의 69.94%가 이미 유통 중. ▶ 누가 받음? Team & Advisors(23.26%). ATH -90%+ 상태에서 팀이 손실 구간임에도 헤징·운영 자금 목적으로 일부 매도할 가능성 있음. DAO Treasury(27.24%)·Investors(25.50%)는 이번 이벤트와 별도 스케줄. ▶ 시장 미리 반응? 월간 반복 이벤트로 어느 정도 priced in. LSD/restaking(재스테이킹) 섹터 전반이 침체 중이며, EigenLayer 포인트 시즌 종료 이후 수익 모델 재평가 국면. MCap(시가총액) $504M, FDV(완전희석시가총액) $720M으로 FDV/MCap 비율 약 1.43배 — 상대적으로 낮은 편. ▶ 한국에서 팔 수 있나? Binance·Coinbase·OKX·Bybit 상장. 거래량 $15M으로 중간 수준 — 언락 물량($7M)이 하루 거래량의 절반 수준이라 대량 매도 시 슬리피지 발생 가능.",
    strategy: [
      { type: "caution", title: "Team 매도 유인 + 거래량 대비 언락 비중 높음",
        desc: "9.69M ETHFI($6.99M)가 Team & Advisors에게 해제. ATH -90%+ 상태에서 팀이 대규모 매도할 유인은 낮지만, 36개월 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조상 매월 꾸준히 물량이 나오는 구조. 핵심 리스크는 거래량 대비 비중 — 24시간 거래량 $15M 대비 언락 $6.99M은 약 46.6%로, 팀이 당일 매도에 나설 경우 가격 충격이 상당할 수 있음. LSD(유동성 스테이킹 파생)/restaking(재스테이킹) 섹터 침체와 맞물려 매수 수요가 약한 구간.",
        risk: "시총 $504M, vol $15M — 언락 규모($7M) 대비 거래량이 타이트. 팀이 OTC(장외 거래)로 처리할 경우 시장 충격 없이 소화 가능. EigenLayer 재스테이킹 수요 회복 시 ETHFI 수요도 동반 회복 가능성 있어 무조건적 약세 전망은 금물." },
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
    vesting: "▶ 토큰이 뭐야? ARB는 Arbitrum의 L2(레이어2 — 이더리움 위 확장 체인) 토큰. 이더리움 최대 Optimistic Rollup 체인으로, DAO(탈중앙 조직 — 토큰 보유자가 투표로 결정) 거버넌스 운영. Binance·Coinbase·Kraken·OKX 상장. 최대 공급량 무제한(연 2% inflation(인플레이션 — 매년 신규 발행) 가능, 2024.3.15~). ▶ 무슨 이벤트? 2026-04-16에 92.65M ARB가 Team + Future Team + Advisors에게 해제됨. TGE(토큰 발행)는 2023년 3월 16일이었고, Team/Investors는 4년 lockup + 1년 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 후 3년 월간 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조. ▶ 얼마나 큰 규모? 92.65M ARB = 현재 유통량 6.04B의 1.53% / 달러 환산 약 $9.47M. 24시간 거래량 $50M+ 대비 약 19% — 유동성 대비 흡수 가능한 수준이지만 Team 물량이라 매도 압력 주목. MCap(시가총액) $618M, FDV(완전희석시가총액) $1.02B. ▶ 누가 받음? Team & Contributors(26.94%)와 Advisors. DAO Treasury(35.28%)가 아닌 팀 물량이라는 점이 핵심 — treasury(재단 보유 자금)는 생태계 운영에 쓰이지만, 팀 물량은 개인이 직접 시장에 매도할 수 있음. ▶ 시장 미리 반응? 월간 반복 이벤트로 어느 정도 priced in. ATH -95.7% 상태에서 팀이 손실을 감수하고 매도할 유인은 낮지만, 헤징 목적의 소량 매도는 가능. 연 2% minting 거버넌스 투표가 추가 희석 리스크로 상존. ▶ 한국에서 팔 수 있나? Binance·Coinbase·Kraken·OKX 상장. 거래량 $50M+로 유동성 충분. 업비트·빗썸 상장 여부 별도 확인 필요.",
    strategy: [
      { type: "caution", title: "DAO Treasury가 아닌 Team 물량 — 매도 주체가 다르다",
        desc: "이번 92.65M ARB($9.47M)는 DAO Treasury가 아니라 Team & Advisors 수령. DAO Treasury 물량은 거버넌스 투표 없이 시장 매도가 불가능하지만, 팀 개인 물량은 즉시 매도 가능. ATH -95.7% 상태에서 팀이 대규모 매도할 유인은 낮지만, 헤징·세금 목적의 소량 매도는 현실적. 거래량 $50M+ 대비 언락 규모 $9.47M은 약 19% — 하루 안에 소화 가능한 수준이나 언락 직후 30~60분 매도 집중 구간 주의.",
        risk: "유동성은 충분($50M+ vol)해 급락 가능성은 낮음. 연 2% minting 거버넌스 투표가 통과될 경우 추가 희석 발생. DAO Treasury(35.28%)가 별도로 생태계 지원 매도에 나설 경우 예상보다 큰 매도 압력 가능." },
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
    vesting: "▶ 토큰이 뭐야? ZRO는 LayerZero의 거버넌스 토큰. LayerZero는 다른 블록체인 간 자산과 메시지 전달을 가능케 하는 인터옵(상호운용성) 프로토콜 — 일종의 Bridge(브릿지 — 다른 체인 간 자산 이동) 인프라. featured 종목으로 분류된 핵심 언락. ▶ 무슨 이벤트? 4/20 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림)로 10.19%(~$53.5M)가 풀린다. 이번 회차는 Strategic Partners 단일 카테고리 — 25.7M ZRO 전부가 초기 투자자에게 간다. ▶ 얼마나 큰 규모? 10.19%는 현재 유통량(252M) 대비. ATH(사상 최고가) 대비 -72.2% 떨어진 $2.08 가격에서 MCap(시가총액) $524M, FDV(완전희석시가총액) $2.08B, 24h 거래량 $89.5M. ▶ 누가 받음? 100% Strategic Partners(전체 토큰의 32.2%) — 1년 락업 후 2년 월간 linear vesting(선형 분할). Core Contributors도 동일 구조이지만 이번 회차에는 포함 안 됨. ▶ 시장 미리 반응? Strategic Partners 매도가 사실상 확정적 — 1년 락업이 끝나면 초기 투자자가 차익 실현하는 패턴이 일반적. ATH -72%로 추가 하방 여지가 크다는 게 시장 컨센서스. ▶ 한국에서 팔 수 있나? Upbit, Bithumb 미상장. 한국 트레이더는 Binance, Coinbase, Bybit, OKX 등 해외 거래소를 거쳐야 한다.",
    strategy: [
      { type: "short", title: "핵심 숏 후보",
        desc: "유통 대비 10.19%(~$53.5M) 규모의 cliff. Strategic Partners(=초기 투자자)가 1년 락업 만료로 매도할 가능성이 사실상 확정적. ATH 대비 -72%까지 떨어진 상태라 추가 하방 여지가 충분히 남아있다.",
        risk: "MCap $524M와 24h 거래량 $89.5M으로 유동성은 양호 — slippage(슬리피지 — 큰 매도 시 가격 불리하게 체결) 부담은 적으나 단기 3~7일에 집중해서 끝내는 게 안전." },
      { type: "timing", title: "진입 타이밍",
        desc: "4/15~19 사이 진입이 최적. RSI(상대강도지수 — 과매수/과매도 측정)가 50 이상으로 반등하는 구간을 노리면 진입가가 유리해진다. 지지선 $1.45, 저항선 $2.32 사이 박스 활용.",
        risk: "Community 38.3% 물량이 이미 유통 중이라 매수 방어력이 어느 정도 있을 수 있어 — 예상보다 하락 폭이 작을 가능성." },
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
    vesting: "▶ 토큰이 뭐야? KAITO는 SocialFi 섹터 프로토콜 Kaito의 토큰. 크립토 소셜 데이터·인플루언서 분석 인프라. Binance, MEXC, Ourbit 상장. ▶ 무슨 이벤트? 2026-04-20, Ecosystem & Network Growth 명목으로 17.6M KAITO 언락. 2029년까지 이어지는 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) vesting 구조의 일환. ▶ 얼마나 큰 규모? 언락 비율 7.29%, 달러 기준 $7.6M. 유통량 241M 대비 7.3% — 24시간 거래량 $10.6M의 약 72% 수준. 하루 거래량으로 소화하기 빠듯한 규모. ▶ 역사적 선례가 있다? KAITO는 과거 언락 시 반복적인 패턴을 보임. 8/20 언락(23.35M, 공급량의 10%) 당일 -11.5% 하락. 9/20 언락(8.35M) 이후 30일간 누적 -37.64% 하락. 두 차례 모두 검증된 데이터 — 이번 4/20 언락에서도 같은 패턴 재현 가능성 높음. ▶ 시장 상황? 현재 $0.43, MCap(시가총액) $104M, FDV(완전희석시가총액) $426M. ATH 대비 -85.1%로 낙폭 매우 큼. 거래량 $10.6M으로 유동성 제한적. ▶ 투자자 비중 주의? 전체 배분의 28.3%가 Investors — 언락 시 매도 압력의 주요 공급원.",
    strategy: [
      { type: "timing", title: "역사적 패턴 재현 — 4/18~19 추세 꺾임 확인 후 진입",
        desc: "8/20 언락 -11.5%, 9/20 언락 이후 30일 -37.64% — 두 차례 연속 검증된 KAITO 고유 패턴. 언락 규모(17.6M, 7.29%)가 과거 8/20(23.35M, 10%)보다 작지만 구조는 동일. 진입 타이밍은 4/20 언락 당일이 아니라 4/18~19 사이 추세 꺾임(고점 대비 하락 전환) 확인 후. 언락 직전 2일이 매도 압력 선반영 구간으로 가장 효율적. 목표 하락폭은 과거 패턴 기준 -10~37% 범위.",
        risk: "거래량 $10.6M으로 유동성 제한 — 포지션 크기 조절 필수. Binance 외 거래소 부족해 숏 포지션 진입 경로 좁음. ATH -85.1%로 이미 낙폭이 커서 추가 하락 여지가 과거보다 제한적일 수 있음. 9/20 패턴처럼 30일 장기 하락이 재현되면 중간 반등 구간에서 강제청산 위험." },
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
    vesting: "▶ 토큰이 뭐야? JUP는 Solana 최대 DEX 애그리게이터 Jupiter의 거버넌스 토큰. 107개 거래소 상장으로 유동성 가장 넓은 편. ▶ 공급량 변화가 특이하다? 원래 총발행량 10B였으나 2024년 8월 커뮤니티 투표 95% 찬성으로 30% burn(소각 — 영구 폐기) 단행 → 현재 총공급량 7B로 확정. 커뮤니티 주도 소각으로 희석 압력 선제 차단. ▶ 무슨 이벤트? 2026-04-28, Team + Mercurial Stakeholders 합산 53.47M JUP 언락. 전체 언락의 72.7%가 Team(38.89M), 27.3%가 Mercurial Stakeholders(14.58M). ▶ 얼마나 큰 규모? 언락 비율 1.47%, 달러 기준 $9.15M. 유통량 3.63B 대비 1.47% — 거래량 $30.3M의 약 30% 수준. 하루 이틀 내 소화 가능한 규모. ▶ 누가 받음? Community(Jupuary airdrop(에어드롭 — 무상 배포) 44.29%)가 아닌 Team + Mercurial 위주. 초기 배분 구조에서 Community 비중이 높았던 것과 달리, 이번 언락은 내부자 물량 중심 → 매도 압력 방향 주의. ▶ 시장 상황? 현재 $0.169, MCap $599M, FDV(완전희석시가총액) $1.18B. ATH 대비 -91.6%로 낙폭 매우 큼. 24시간 거래량 $30.3M으로 유동성은 충분.",
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
    vesting: "▶ 토큰이 뭐야? GUN(GUNZ)은 Gaming L1(게임 특화 레이어1 블록체인)의 토큰. featured 종목으로 분류된 핵심 언락. ▶ 무슨 이벤트? 4/30 단일 언락으로 354.39M GUN이 풀린다(총발행 10B의 3.54%). Private B 그룹의 12개월 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 만료 후 18개월 linear vesting(선형 분할) 시작. ▶ 얼마나 큰 규모? 354.39M ÷ 현재 유통량(1.73B) = 20.48% — 한 번에 풀리기엔 매우 큰 비율. 절대 금액으로는 ~$5.58M(현재가 $0.018 기준). ▶ 누가 받음? Private B + Founders + Treasury 묶음. Private B는 자체 비중이 전체의 20%이고, Founders & Team(12.8%)도 같은 cliff 일정에 동시에 도달. ▶ 시장 미리 반응? MCap(시가총액) $31M 소형 + ATH(사상 최고가) 대비 -60%+ 하락한 상태. FDV(완전희석시가총액) $180M 대비 시총이 17%에 불과 — 즉 미유통 토큰이 매우 많다는 신호. 24h 거래량 미공개라 유동성 측정이 어려움. ▶ 한국에서 팔 수 있나? Upbit, Bithumb 미상장(거래 가능 거래소는 Binance, OKX, Bybit). 한국에서는 거래 채널이 제한적이며, MCap $31M 소형이라 큰 물량 매도 시 slippage(슬리피지 — 큰 매도 시 가격 불리하게 체결)가 심각하다.",
    strategy: [
      { type: "short", title: "대규모 언락",
        desc: "유통 대비 20.48%로 대규모. Private B와 Founders 그룹이 12개월 cliff 만료로 차익 실현 유인이 강하다. MCap $31M 소형이라 적은 매도 물량으로도 가격이 크게 흔들린다.",
        risk: "유동성이 극히 제한적 — slippage(슬리피지 — 큰 매도 시 가격 불리하게 체결) 위험이 매우 높아 큰 포지션 진입과 청산 자체가 불리하다." },
      { type: "timing", title: "4/28~29 진입",
        desc: "언락 2일 전 선반영 구간을 노린다. 시총이 작아 변동성이 극심하므로 소규모 포지션으로만 접근.",
        risk: "신규 토큰이라 변동성이 극심하고, ATH 이후 빠른 하락 중 — 예측 가능한 패턴이 부족해 손절선 관리가 어렵다." },
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
    vesting: "▶ 토큰이 뭐야? STABLE은 Stable, USDT-native 결제에 특화된 L1 체인 (Stable Mainnet + BSC 듀얼 배포). TGE(토큰 발행)는 2025-12-08. ▶ 무슨 이벤트? 5/8에 4.0% = $29.5M 규모가 풀림. Ecosystem & Community 트랜치의 월간 선형 분할 한 회차로, 깜짝 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림)형이 아닌 정해진 페이스의 누적 압력. ▶ 얼마나 큰 규모? 월 약 888.8M (= Ecosystem 32B를 36개월로 나눈 값)이 2029-12-08까지 총 49회 반복됨. 매번 동일 비율의 unlock이 일정 페이스로 들어오는 구조 → 충격형이 아닌 누적형. ▶ 누가 받음? 이번 회차는 전량 Ecosystem & Community(40%) 트랜치. 전체 분배는 Ecosystem 40% / Team 25% / Investors & Advisors 25% / Genesis Distribution 10%. Genesis 10%는 TGE 100% 해제 완료, Ecosystem은 TGE 8% + 잔여 32%를 3년 월간 선형으로 분할, Team & Investors 50%는 1년 cliff 후 48개월 분할로 가장 늦게 풀림. ▶ 한국에서 팔 수 있나? 빗썸·업비트 모두 미상장. Gate, Bybit, LBank, HTX, PancakeSwap, Bitget, MEXC, Kraken에서 거래 가능. CryptoRank 스크린샷의 $596M mcap은 런치 직후값이라 현재 $742M과 차이 있음 → 표시 시점 주의",
  },
  {
    date: "2026-05-08", token: "SXT", name: "Space and Time", cat: "ZK/Data",
    unlockPct: 23.20, unlockVal: 5.96, recipient: "Ecosystem & Community (cliff)",
    circulating: "2.60B", totalSupply: "5B", maxSupply: "5B",
    featured: true,
    allocation: [
      { name: "Ecosystem & Community", pct: 39.15 },
      { name: "Investors", pct: 25.91 },
      { name: "Team", pct: 22.44 },
      { name: "Community Airdrops", pct: 6.00 },
      { name: "Binance Users", pct: 4.50 },
      { name: "Market Makers", pct: 2.00 },
    ],
    market: { price: "$0.01509", mcap: "$39.2M (조정 $25.2M)", fdv: "$75.5M", vol24h: "$17.6M (D-2 5.7배↑)", athDrop: "-90.7%", exchanges: "Binance, Bybit, OKX, KuCoin, Gate, Bithumb" },
    vesting: "▶ 토큰이 뭐야? SXT는 ZK(영지식증명) 기술 기반의 'verifiable database' + AI 데이터 분석 인프라. Microsoft·Chainlink 파트너십. 정확히 1년 전인 2025-05-08에 TGE(토큰 발행) 진행됨. ▶ 무슨 이벤트? 5/8 한국시간 밤 10시(=UTC 13:00)에 387.64M SXT 토큰이 한 번에 잠금 해제됨(=cliff unlock). DropsTab·Tokenomist·Messari·CMC 4개 사이트가 모두 같은 숫자로 보고 → 신뢰도 ✓. ▶ 얼마나 큰 규모? 사용자 화면의 23.20%는 CMC가 산정한 '조정 시총'($25.7M) 기준 비율. 다르게 표현하면 = 총공급량 5B의 7.75% / 현재 유통량 2.6B의 14.9% / 24시간 거래량($17.6M)의 약 1/3 → 시장이 한 번에 흡수하기엔 부담. ▶ 누가 받음? Tokenomist 표기는 'Ecosystem & Community' 단일 카테고리 cliff. 단 Messari는 '3개 allocation 묶음'으로 봐서 → 투자자/팀의 12개월 cliff까지 동시 풀릴 가능성 있음(주의). ▶ 시장 미리 반응? YES. 5/3→5/6 일일 거래량 5.7배 폭증($1.19M→$6.75M), Binance 선물 미결제약정(OI) 67% 증가($1.39M→$2.32M, 162M tokens), 5/5에 역대 최저가 $0.01402 갱신. → 트레이더들이 이미 매도/숏 포지션 잡고 대기 중이라는 강한 신호. ▶ 한국에서 팔 수 있나? 빗썸(SXT/KRW) 가능, 업비트는 미상장. 단 빗썸 호가창 깊이가 매우 얕음(top-5 합쳐도 약 ₩26M ≈ $19k) → 큰 물량 매도 시 슬리피지(주문이 호가를 밀어내며 불리하게 체결) 심각",
    strategy: [
      { type: "short", title: "1주년 락 풀림 + 시장이 미리 매도 준비 중",
        desc: "1년 전 잠겼던 토큰 중 387.64M개(=현 유통량의 약 15%, 조정시총의 약 23%)가 5/8에 한꺼번에 풀림. 이미 5/3~5/6 사이에 일일 거래량이 평소의 5.7배로 폭증($1.19M→$6.75M)했고, Binance 선물의 미결제약정(OI, 시장에 깔린 포지션 총 규모)도 67% 늘어남 → 트레이더들이 가격 하락에 미리 베팅(숏 포지션)하는 모습. 가격이 이미 역대 최저가 직후라 추가 하락 폭은 제한적이지만, cliff 풀리는 직후 30~60분이 매도 압력 가장 강한 구간",
        risk: "OI가 시총의 5.9%로 작은 편 → 만약 가격이 반대로 튀면 숏 포지션이 강제청산되며 급등할 위험(=short squeeze) 있음. 빗썸 호가가 얕아 한국에서 매도 시 슬리피지 큼. RSI(과열도 지표)는 30~40으로 이미 과매도 영역이라 반등 가능성도 존재" },
      { type: "timing", title: "한국시간 5/8 밤 10시 직후 30분이 매도 정점",
        desc: "토큰이 풀리는 순간(한국시간 5/8 밤 10시 = UTC 13:00) 전후가 매도 압력 최고점. 단 5/6에 이미 큰 폭의 사전 반영(거래량/OI 폭증)이 발생해서 → 추가로 더 미리 반영될 여지는 크지 않음. cliff 후 잠깐의 기술적 반등(=dead-cat bounce, 하락 추세 중 잠시 튀는 모양)이 빠르게 올 가능성 높음",
        risk: "5/6 종가가 이미 +5.5% 반등 시작($0.01426 저점 → $0.01509 종가). 평균으로 회귀하는 mean reversion 신호가 켜진 상태이므로 → 숏 포지션을 길게 끌면 오히려 손실 위험. 이벤트 후 짧게 끊고 청산이 안전" },
      { type: "bounce", title: "바닥 다지기 확인 → cliff 소화 후 반등 매수",
        desc: "5/5에 역대 최저가 $0.01402를 찍고 5/6에 +5.5% 반등 → 바닥에서 매수자가 들어오기 시작했다는 신호. 5/8 cliff 매도가 모두 소화되면 ZK 섹터 동조 반등 가능성 (5/19 PYTH cliff 등 다른 ZK 토큰 이벤트 모멘텀 합류 대기 중)",
        risk: "투자자/팀의 12개월 cliff도 5/8에 함께 풀릴 가능성 있음(Messari가 '3개 allocation 묶음'으로 표기) → 예상보다 매물 더 나올 수 있음. 따라서 매수 진입은 5/8 cliff가 다 소화된 후가 안전. Binance/Bybit 무기한 선물만 활발하고, 현물 매수처는 빗썸·Gate 등 좁은 편" },
    ],
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
    vesting: "▶ 토큰이 뭐야? ADI는 ADI Chain의 L2 zkRollup(영지식 롤업 — ZK 기술로 L2 트랜잭션 압축) 토큰. TGE(토큰 발행) 2025-12-09. ADI Foundation(재단 — 프로젝트 운영 비영리 조직)은 Abu Dhabi 소재 비영리 법인으로 IHC·Sirius·Chainlink·M-Pesa와 파트너십 보유. MEXC·KuCoin·Uniswap V3·Kraken·BYDFi·Crypto.com 상장. ▶ 무슨 이벤트? 2026-05-09에 Community Fund + Treasury Reserves 카테고리에서 월간 분할 물량 배출. Community Fund(총 35%) 72M 월간 분할, Treasury Reserves(총 25%) 108M 월간 분할. unlockPct 6.78%, unlockVal $28.4M. ▶ 나머지 카테고리는? Private Investors(12%)·Team(10%)·Partnerships(10%)는 12개월 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) + 72개월 linear vesting(선형 분할 — 매월 일정량씩 풀림) 구조. ▶ 🚩 유동성 RED FLAG: 시총 $419M 대비 24h vol $489K = 비율 0.12%. 정상 토큰 대비 약 1/100 수준. DEX 풀 합계 $2M 미만. Tokenomist에 등록되지 않음. Binance·Coinbase·Upbit 미상장. ▶ 왜 위험한가? 얇은 유동성은 가격 조작에 취약하고, 5/9 unlock 시 슬리피지(주문이 호가를 밀어내며 불리하게 체결)가 극심할 수 있음. 매도 채널이 MEXC·KuCoin 등 소형 거래소와 DEX로 제한적. FDV(완전희석시가총액) $4.03B는 MCap(시가총액) $419M의 약 10배 — 완전 희석 시 대규모 추가 공급 예정. ▶ 파트너십 narrative는? IHC·Chainlink·M-Pesa 파트너십이 있으나, 유동성 지표가 정상 범위를 크게 벗어난 상태에서는 narrative만으로 가격 지지를 기대하기 어려움.",
    strategy: [
      { type: "caution", title: "🚩 유동성 RED FLAG — 접근 자체를 재고할 것",
        desc: "시총 $419M 대비 24h vol $489K = 0.12%. 정상적인 토큰이라면 시총의 1~5% 수준 거래량이 나와야 하는데, ADI는 그 1/100 수준. DEX 풀 합계 $2M 미만으로 대형 주문 한 건에도 가격이 크게 움직임. Tokenomist에 등록되지 않아 vesting 데이터 독립 검증이 불가. Binance·Coinbase·Upbit 등 메이저 거래소 미상장 상태. 5/9 unlock 시 $28.4M 물량이 이 얇은 유동성 위에 쏟아지면 슬리피지(주문이 호가를 밀어내며 불리하게 체결)가 극심할 수 있음. FDV(완전희석시가총액) $4.03B는 현재 MCap(시가총액) $419M의 약 10배 — 장기적으로 대규모 추가 공급이 예정된 구조.",
        risk: "얇은 유동성 = 가격 조작 가능성. 5/9 unlock 시 슬리피지 극심. 매도 채널이 MEXC·KuCoin·DEX로 제한적이어서 포지션 청산 자체가 어려울 수 있음. 메이저 거래소 상장 전까지 진입 자체를 피하는 것이 안전." },
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
    vesting: "▶ 토큰이 뭐야? RAIN은 Arbitrum One 기반 예측 시장·DeFi 프로토콜 Rain Protocol의 토큰. 총공급량 1.15T(1조 1500억 개)의 초대형 공급 구조. ▶ 무슨 이벤트? 2026-05-10, linear vesting(선형 분할 — 매월 일정량씩 풀림) 버킷 다수가 동시 배출. Team 1개월 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) + 24개월 linear / Contributors 18개월 / Strategic Sale 8개월 / Presale 18개월 비선형 / Marketing 19개월 / Reserve 18개월 cliff + 6개월 linear / Ecosystem 12개월 linear. ▶ 얼마나 큰 규모? 50.28B RAIN = 최대공급량의 4.37%. 달러 기준 $380M(현가 $0.00756 기준) — 5월 전체 언락 중 1위 규모. CryptoRank 스크린샷의 $397M은 가격 $0.00791 시점 기준이라 현가 환산 시 $380M. ▶ 데이터 신뢰도 주의? Tokenomist가 'fully unlocked'로 표기했으나 실제 유통량은 478.4B / 총공급량 1.15T = 41.6%만 unlock된 상태. 데이터 소스 간 모순 — 맹신 금지. ▶ 출구 구조? Binance·Coinbase 미상장. KuCoin, Kraken, BingX, MEXC, Uniswap V3(Arbitrum), BitMart에서만 거래 가능 → 출구가 좁아 대량 매도 시 slippage(슬리피지) 심각. ▶ 시장 상황? 현재 $0.00756, MCap $3.62B, FDV(완전희석시가총액) $8.69B. ATH 대비 -30.6%로 추가 하방 여지 있음.",
    strategy: [
      { type: "short", title: "5월 언락 1위 $380M + 출구 좁은 구조 — 매도 압력 집중",
        desc: "5월 전체 언락 중 달러 규모 1위($380M). Team·Contributors·Strategic Sale 등 내부자 물량이 동시 다발로 풀리는 구조. ATH 대비 -30.6%로 추가 하방 여지가 있고, Binance·Coinbase 미상장으로 출구가 KuCoin·Kraken 등 소수 거래소에 집중 → 대량 매도 시 slippage(슬리피지) 크게 발생. 유동성 얕은 시장에서 $380M 물량이 나오면 가격 충격 불균형적으로 커짐. 5/10 언락 직전 숏 포지션 진입, 언락 후 1~3일 내 청산이 기본 시나리오.",
        risk: "Tokenomist 'fully unlocked' 모순(실제 41.6%만 unlock) — 데이터 신뢰도 낮아 실제 언락 규모가 다를 수 있음. MCap $3.62B 대비 FDV(완전희석시가총액) $8.69B로 희석 배수 2.4배 — 이미 시장이 희석 리스크를 일부 반영했을 가능성. Binance·Coinbase 미상장이라 숏 포지션 잡을 수 있는 거래소도 제한적." },
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
    vesting: "▶ 토큰이 뭐야? PIEVERSE는 AI agent-native 결제·컴플라이언스 인프라 토큰. Meme/SocialFi가 아님 — 오해 흔함. Gate·Bybit·LBank·BingX·MEXC·Upbit·Bithumb·PancakeSwap·Uniswap에 상장. TGE(토큰 발행)는 2025 Q4. ▶ 무슨 이벤트? 2026-05-14에 Community Growth와 Ecosystem & Marketing 두 카테고리가 동시에 월간 물량을 배출. Community Growth 20.0M + Ecosystem & Marketing 19.7M = 합산 39.74M PIEVERSE. ▶ 규모가 얼마나 큰가? 현재 유통량 230M 대비 39.74M 추가 = 17.3%. unlockVal 기준 $28.0M. 24h 거래량 $14M의 2배 규모 — 시장이 하루 만에 소화하기 어려운 수준. ▶ 발행 구조는? Community Growth(276M 총량)와 Ecosystem & Marketing(274M 총량) 각각 21개월 linear vesting(선형 분할 — 매월 일정량씩 풀림). 두 버킷이 동시 진행되어 매월 합산 ~39.7M이 반복 배출. ▶ 데이터 주의사항은? CryptoRank 공개 API는 Community Growth 단독값 20M만 노출하고 Ecosystem & Marketing 19.7M은 paid wall 뒤에 숨겨져 있음. 실제 unlock 규모는 공개 데이터의 약 2배. ▶ 시장 상황은? ATH $1.66 대비 현재 $0.706으로 -57.4% 하락한 상태. Upbit·Bithumb 상장으로 한국 매도 채널이 활성화되어 있어 국내 매도 압력도 함께 작용.",
    strategy: [
      { type: "short", title: "유통 대비 17.3% 대형 unlock — 두 카테고리 동시 배출",
        desc: "Community Growth 20.0M + Ecosystem & Marketing 19.7M = 39.74M PIEVERSE가 5/14에 동시 배출. 유통량 230M 대비 17.3%, 시가총액 기준 $28.0M 규모. 24h 거래량 $14M의 2배 물량이 한 달 안에 시장에 공급되는 구조. CryptoRank 공개 데이터는 절반(20M)만 노출해 실제 압력이 과소평가되기 쉬움. Upbit·Bithumb 상장으로 한국 매도 채널이 열려 있어 국내 차익 실현 수요도 추가 압력으로 작용. PIEVERSE는 AI agent-native 결제 인프라라는 narrative가 있으나, 현재 가격은 ATH $1.66 대비 -57.4%로 이미 약세 구간 — 추가 매도 물량이 반등 모멘텀을 억누를 가능성이 높음.",
        risk: "ATH $1.66 대비 -57%로 이미 상당한 하락 소화. 추가 하방은 기술적 지지선 확인 필요. AI/Web3 Payment 섹터 전반 반등 시 숏 포지션 손실 위험. 21개월 선형 구조상 매월 반복 배출이므로 단기 이벤트보다 중기 추세 관점 접근이 유효." },
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
    vesting: "▶ 토큰이 뭐야? PYTH는 Pyth Network의 oracle(오라클 — 외부 데이터를 블록체인에 공급) 토큰. Publisher(가격 데이터 제공자)들이 실시간 가격 데이터를 온체인에 공급하는 인프라. Binance·Coinbase·OKX·Bybit·Kraken·Bitget·Gate·MEXC·KuCoin 등 메이저 거래소 전방위 상장. TGE(토큰 발행) 2023-11-19 14:00 UTC. ▶ 무슨 이벤트? 2026-05-19 14:00 UTC에 30개월째 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 도달. 공식 vesting 스케줄은 6/18/30/42개월 cliff 구조이며, Tokenomist도 동일하게 5/19를 확인. Ideas Bank(아이디어 풀 — 비공식 토론 단계)에 올라온 5/20 표기는 비공식 표기로 신뢰 불가. ▶ 규모가 얼마나 큰가? 2.13B PYTH = Ecosystem Growth 1.13B + Publisher Rewards(가격 데이터 제공자 보상) 537.5M + Private Sale 250M + Protocol Dev 212.5M. 유통량 5.75B 대비 36.96%, unlockVal $100.16M. 24h 거래량 $14M의 약 7배 규모 — 시장 소화 불가 수준. ▶ DAO 연기안 상태는? DAO(탈중앙 조직 — 토큰 보유자가 투표) Ideas Bank에 6개월 연기 토론글이 존재하나, 이는 비공식 토론 단계. Realms 정식 proposal로 발의된 적 없고 미통과 상태. 5/19 직전까지 forum.pyth.network 모니터링 필수. ▶ 누가 받나? Private Sale 250M은 초기 투자자 물량으로 매도 확정적. Ecosystem Growth 1.13B는 재단 통제이나 시장 압력 가중. Publisher Rewards는 데이터 제공자 인센티브로 즉시 매도 가능성 높음. ▶ 시장 상황은? ATH 대비 -95.9%로 극심한 약세. MCap(시가총액) $281M, FDV(완전희석시가총액) $489M. 이번 unlock이 역대 최대 단일 이벤트 수준.",
    strategy: [
      { type: "short", title: "역대급 숏 기회 — 미통과 확정 시",
        desc: "유통량 대비 36.96% = 2.13B PYTH가 5/19 14:00 UTC에 한꺼번에 풀림. Private Sale 250M은 초기 투자자 물량으로 매도 확정적. $100M 규모 vs 24h vol $14M = 거래량의 7배 물량이 시장에 쏟아지는 구조. ATH 대비 -95.9%로 이미 극심한 약세 상태에서 추가 대규모 공급 충격. DAO(탈중앙 조직 — 토큰 보유자가 투표) Ideas Bank(아이디어 풀 — 비공식 토론 단계)의 6개월 연기 토론은 formal proposal이 아니므로, 연기 없이 예정대로 진행될 가능성이 높음.",
        risk: "DAO Ideas Bank에 6개월 연기 토론이 있으나 formal proposal 아님. 5/19 직전까지 forum.pyth.network 모니터링 필수. 연기 발표 시 숏 스퀴즈(short squeeze) 위험." },
      { type: "timing", title: "5/12~17 진입",
        desc: "unlock 1주 전부터 선반영 움직임 시작되는 패턴. RSI(과열도 지표)·OBV(거래량 기반 추세 지표) 확인 후 진입. 14:00 UTC unlock 시점 직전 청산 권장 — 이벤트 당일 변동성이 가장 크고 예측 불가 구간.",
        risk: "갑작스런 연기 발표 시 숏 스퀴즈. 선반영이 이미 과도하게 진행된 경우 이벤트 당일 역설적 반등 가능." },
      { type: "caution", title: "Ideas Bank 모니터링",
        desc: "https://forum.pyth.network 의 unlock-delay 토론은 Ideas Bank(아이디어 풀 — 비공식 토론 단계) 수준의 비공식 논의. Realms 정식 proposal로 발의되는 순간 상황이 급변. 토론 → proposal 전환 여부를 5/19 직전까지 매일 확인.",
        risk: "토론이 Realms 정식 proposal로 전환될 경우 변동성 폭증. 연기 통과 시 숏 포지션 즉시 청산 필요." },
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
    vesting: "▶ 토큰이 뭐야? ZRO는 LayerZero의 거버넌스 토큰. LayerZero는 다른 블록체인 간 자산과 메시지를 전달하는 인터옵 프로토콜 — Bridge(브릿지 — 다른 체인 간 자산 이동) 인프라. TGE(토큰 발행)는 2024-06-20에 진행됐다. ▶ 무슨 이벤트? 5/20에 12회차 월간 선형 언락 발생 — 총 24개월 vesting 중 12번째다. 4/20 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림) 진입 후 매달 동일한 비율이 풀리는 구조(TGE 후 1년 cliff + 24개월 월간 선형). ▶ 얼마나 큰 규모? 10.2%는 현재 유통량(252.33M) 대비. 풀리는 물량의 분해 — Strategic Partners 13.42M(52.2%) + Core Contributors 10.63M(41.4%) + Tokens Repurchased 1.67M(6.5%). 절대 금액 ~$35.7M. ▶ 누가 받음? Strategic Partners(초기 투자자) + Core Contributors(개발자 및 팀) + Tokens Repurchased가 동시에 풀린다. 4월처럼 단일 카테고리가 아니라 세 그룹이 함께 풀리는 점 주의. ▶ 시장 미리 반응? 4/20 cliff 진입 후 가격이 -33% 하락($2.08 → $1.39)한 상태로 5월을 맞이한다. ATH(사상 최고가) $7.53 대비 -81.5% — 사실상 ATL(역대 최저가) 근처. CMC는 유통량을 320M으로 표시하며 MCap(시가총액)을 $445M으로 계산하는 반면, CoinGecko는 252M와 MCap $351M로 계산 — 이번 풀이는 CoinGecko 기준 채택. 같은 토큰인데 사이트마다 유통량과 시총이 다르게 보이는 점 인지하고 비교해야 한다. ▶ 한국에서 팔 수 있나? Upbit, Bithumb 미상장(거래 가능 거래소는 Binance, Coinbase, Bybit, OKX, Kraken, KuCoin, Gate, Bitget, MEXC). 한국 트레이더는 해외 거래소만 접근 가능.",
    strategy: [
      { type: "short", title: "월간 패턴 + 가격 약세",
        desc: "유통 대비 10.2% 매월 풀리는 구조. 4월 cliff 진입 후 이미 -33% 하락하며 월간 매도 압력이 누적되고 있다. ATH $7.53 대비 -81%까지 떨어진 약세 추세.",
        risk: "ATL(역대 최저가) 근처라 추가 하방은 기술적 지지선이 견디느냐에 달려있어 — 지지선이 무너지지 않으면 숏 수익률이 제한되고, 무너지면 큰 수익권." },
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
    vesting: "▶ 토큰이 뭐야? H는 Humanity Protocol, Worldcoin 경쟁 라인의 identity(신원 인증)/DePIN(분산 물리 인프라) 프로젝트. palm-scan biometric(생체 인식 — 손바닥 스캔) + ZK(영지식증명) proof of humanity로 '이 사람이 한 명의 진짜 인간임'을 증명하는 구조. TGE(토큰 발행)는 2025-06-25. ▶ 무슨 이벤트? 5/25에 3.86% = $20.3M 규모 unlock. 매월 105.36M(=총공급 10B의 약 1.05%)이 동일 페이스로 풀리는 월간 회차 중 한 번. ▶ 얼마나 큰 규모? 단일 회차 unlock 자체는 평범하지만 매달 같은 규모로 들어오는 누적형. 현 유통 2.73B 대비 매월 약 3.86%씩 더해지는 셈 → 한 번의 충격보다 12개월 누적 압력 구조. ▶ 누가 받음? 이번 회차 내부 분배: Ecosystem Fund 50M(47.5%) + Identity Verification Rewards 42.86M(40.7%) + Foundation(재단) Treasury 12.5M(11.9%). Identity Rewards는 실제 인증 활동을 한 액티브 유저에게 가는 보상이라 토큰 받자마자 시장 매도될 가능성이 가장 높은 트랜치. ▶ 한국에서 팔 수 있나? 빗썸 KRW 마켓만 활성. 업비트는 미상장(404). Binance도 spot은 미상장이고 futures(HUSDT)만 있음 → 현물 매수는 Bybit, Gate, Bitget, KuCoin, Coinone 등 해외 위주. 백커에 Animoca, Polygon Labs, Hashed, Pantera, Jump Crypto가 있어 인지도는 높지만 채널은 제한적",
    strategy: [
      { type: "caution", title: "월간 1.05% 지속 매도 압력 — 한국 채널 빗썸 한 곳에 집중",
        desc: "매월 105.36M = 총공급 1.05%가 동일 페이스로 unlock. ATH $0.388 대비 -50.3% 수준이지만 Identity Rewards 트랜치(42.86M, 회차의 40.7%)가 액티브 유저 보상이라 토큰 수령 즉시 시장 매도될 가능성이 가장 높음. cliff형 충격은 아니지만 매월 동일 압력이 12개월 이상 누적되는 구조",
        risk: "Binance spot 미상장, 업비트 미상장으로 한국 채널이 빗썸 한 곳에 집중 → 큰 물량을 받은 유저가 빗썸으로 몰리면 slippage(슬리피지 — 주문이 호가를 밀어내며 불리하게 체결) 즉시 발생. 24시간 거래량 $25M이 시총 $525M의 4.7%로 얇은 편이라 물량 흡수 여력 제한적" },
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
    vesting: "▶ 토큰이 뭐야? CYS는 Cysic, ZK(영지식증명) 연산 가속을 DePIN(분산 물리 인프라) 형태로 제공. TGE(토큰 발행)는 정확히 1년 전인 2025-12-11. ▶ 무슨 이벤트? 1년 cliff(절벽 해제 — 잠겨 있던 물량이 한 번에 풀림)가 동시에 개시. Investors 23.62% + Contributors 12.11% + Foundation Treasury 8% = 합계 43.73%가 같은 날부터 풀리기 시작 → 단일 토큰 unlock 비율 중 압도적 최상위급. ▶ 얼마나 큰 규모? 풀리는 절대 물량은 437.3M (Investors 236.2M + Contributors 121.1M + Foundation 80M). 현 유통 160.8M 대비 272% 규모 = cliff가 다 소화되면 유통량이 약 3.7배가 됨. unlock 가치 $98.4M은 시총 $36M의 2.7배. ▶ 누가 받음? Investors(평균 acquisition 비용 $0.04 전후, 12개월 linear vesting(선형 분할 — 매월 일정량씩 풀림)) + Contributors(36개월 linear vesting) + Foundation(24개월 linear vesting). Investors는 현가 $0.225 기준 +460% 수익 구간 → 매도 유인이 가장 강함. Ecosystem Incentive 40.19%는 이번 회차와 별개 배분. ▶ 시장 미리 반응? 이미 시작됨. 2026-04-10 Gnosis Safe(다중서명 지갑 — 여러 명 승인 필요한 지갑) 0xF97d... 에서 두 개의 평행 웨일 지갑(0xF8CA..79b4d, 0xfBb66EA7..)으로 각 5M CYS ($1.12M씩) 동시 분산. 이틀 뒤 2026-04-12 05:01 UTC에는 트윗 직후 25분 만에 9.996M CYS ($2.25M)가 4개 신규 지갑으로 2차 분산. 총 19M+ CYS ($4.26M)가 Safe에서 빠져나가 현재 Safe 잔고는 5 CYS로 완전 고갈. 유통 대비 약 12% 오버행이 이미 시장 진입 대기 중. ▶ 한국에서 팔 수 있나? 빗썸 활성, 업비트 미상장. 그 외 Gate, Bitget, Binance Alpha, MEXC. ATH $0.75(2026.3.22) 대비 -70% 수준에서 cliff 개시를 맞이하는 상황",
    strategy: [
      { type: "short", title: "12월 11일 cliff 개시 — 구조적 초대형 이벤트",
        desc: "전체 공급의 43.73%가 cliff 해제 시작. 유통 대비 272% 규모 (현 유통 160.8M 대비 437.3M 신규). Investors 평균 acquisition 비용 $0.04 전후 → 현가 $0.225 기준 +460% 수익 구간 → 매도 유인 극단적. unlock 가치 $98.4M이 시총 $36M의 2.7배라 충분한 헤지 수단조차 부재한 비대칭 구조",
        risk: "cliff 개시는 첫 달부터 전량 풀리는 게 아니라 월별 linear vesting. 시장이 충분히 선반영하면 12/11 당일은 오히려 바닥권일 가능성도 있음 → 진입 시점 잘못 잡으면 short squeeze 위험. 또 일부 cliff 토큰은 D-Day 직전 락업 연장·재설계 발표가 나올 수 있음" },
      { type: "timing", title: "11월 초 선반영 진입 — D-30~D-45 전후",
        desc: "역사적으로 1년 cliff 토큰은 cliff 발생 D-30~D-45부터 선반영 매도가 시작됨 (TIA, APT 등 선행 사례). 2026-11 초 숏 진입 → cliff 당일(12/11) 청산하는 구간 트레이드. 사전 분산이 이미 4월부터 시작된 정황이 있어 선반영 시작 시점이 통상보다 앞당겨질 수 있음",
        risk: "cliff 연기·재설계·재단 추가 락업 발표가 나오면 즉시 short squeeze. DAO governance 제안과 재단 공지 모니터링 필수. 11월 중 시장 흔들기 위한 락업 추가 발표 가능성 항상 염두" },
      { type: "caution", title: "Gnosis Safe 웨일 이벤트 이미 진행 중 — 2026-04 사전 분산 시퀀스",
        desc: "2026-04-10 Gnosis Safe 0xF97d... → 두 개의 평행 웨일에 각 5M CYS ($1.12M씩) 동시 분산 (0xF8CA..79b4d + 0xfBb66EA7..). 2026-04-12 05:01 UTC에 9.996M CYS ($2.25M)가 4개 신규 지갑으로 2차 분산 (트윗 직후 25분 안에). 총 19M+ CYS ($4.26M)가 유출되어 Safe 현재 잔고는 5 CYS = 완전 고갈. 유통 대비 약 12% 오버행이 이미 시장 진입 대기 중인 상태에서 12월 cliff까지 더해지는 구조",
        risk: "수신 지갑 6곳이 아직 거래소 미입금 상태. 단순 콜드월렛 이전(=홀드 모드)일 가능성도 있으나 BNB 가스 충전이 들어오는 시점이 덤프 트리거가 될 수 있음 → 6개 지갑의 BNB 잔고 변화 모니터링 필요. 거래소 입금 알림이 뜨는 순간이 매도 임박 신호" },
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
  const [theme, setTheme] = useState(getInitialTheme);
  const today = new Date(); today.setHours(0, 0, 0, 0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  let filtered = unlocks;
  if (filter === "big") filtered = unlocks.filter((u) => u.unlockPct >= 5);
  if (filter === "upcoming") filtered = unlocks.filter((u) => new Date(u.date + "T00:00:00") >= today);

  const grouped = groupByDate(filtered);
  const totalVal = unlocks.reduce((s, u) => s + u.unlockVal, 0);
  const bigCount = unlocks.filter((u) => u.unlockPct >= 5).length;
  const upcomingCount = unlocks.filter((u) => new Date(u.date + "T00:00:00") >= today).length;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", color: "var(--text-primary)", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", fontSize: 14, transition: "background-color 0.3s ease, color 0.3s ease" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:var(--scrollbar-track);}::-webkit-scrollbar-thumb{background:var(--scrollbar-thumb);border-radius:3px;}`}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", margin: 0, letterSpacing: "-0.5px" }}>Token Unlock Dashboard</h1>
            <p style={{ fontSize: 14, color: "var(--text-tertiary)", marginTop: 6 }}>Apr 2026 – Dec 2026 · Fact-checked: Tokenomist + CoinGecko + BscScan + Cysic Docs</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              style={{
                width: 36, height: 36, borderRadius: 8,
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                color: "var(--text-primary)", cursor: "pointer", fontSize: 16,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontFamily: "inherit", lineHeight: 1, padding: 0,
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--featured-chip)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-secondary)"; }}
              onFocus={(e) => { e.currentTarget.style.outline = "2px solid var(--accent-red)"; e.currentTarget.style.outlineOffset = "2px"; }}
              onBlur={(e) => { e.currentTarget.style.outline = "none"; }}
            >
              <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            </button>
            <div style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "right" }}>
              <div>Last verified: 2026-04-12</div>
              <div style={{ marginTop: 4, fontSize: 11, color: "var(--text-tertiary)" }}>built by <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>London Potato</span> 🥔</div>
            </div>
          </div>
        </div>

        {/* Top Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "1px solid var(--border)" }}>
          {[["unlocks", "Token Unlocks"], ["billions", "🔥 BILL TGE 5/4"], ["citrea", "₿ Citrea 막차"]].map(([k, l]) => (
            <button key={k} onClick={() => setActiveTab(k)} style={{
              background: "transparent", border: "none", borderBottom: `2px solid ${activeTab === k ? "var(--accent-red)" : "transparent"}`,
              color: activeTab === k ? "var(--text-primary)" : "var(--text-tertiary)", padding: "10px 24px", fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
            }}>{l}</button>
          ))}
        </div>

        {activeTab === "unlocks" && <>
        {/* Stats Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
          {[
            ["Total Value", `$${totalVal.toFixed(0)}M`, "#60a5fa"],
            ["Events", `${unlocks.length}`, "var(--text-primary)"],
            ["High Impact (≥5%)", `${bigCount}`, "#f59e0b"],
            ["Upcoming", `${upcomingCount}`, "#34d399"],
          ].map(([label, val, col]) => (
            <div key={label} style={{ background: "var(--bg-secondary)", borderRadius: 10, border: "1px solid var(--border)", padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: col, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
          {[["all", "All"], ["upcoming", "Upcoming"], ["big", "High Impact (≥5%)"]].map(([k, l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{
              background: filter === k ? "var(--border)" : "transparent",
              color: filter === k ? "var(--text-primary)" : "var(--text-tertiary)",
              border: `1px solid ${filter === k ? "var(--border)" : "var(--border)"}`,
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
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, paddingBottom: 10, borderBottom: "1px solid var(--border)" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 8,
                  background: todayMark ? "#0d1f15" : "var(--bg-secondary)",
                  border: `1px solid ${todayMark ? "#1a3a25" : "var(--border)"}`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: todayMark ? "#34d399" : "var(--text-primary)", lineHeight: 1 }}>{dt.day}</span>
                  <span style={{ fontSize: 10, color: todayMark ? "#34d399" : "var(--text-tertiary)" }}>{dt.weekday}</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: todayMark ? "#34d399" : "var(--text-primary)" }}>
                  {dt.full}
                  {todayMark && <span style={{ fontSize: 11, marginLeft: 8, padding: "2px 8px", background: "#0d1f15", border: "1px solid #1a3a25", borderRadius: 4, color: "#34d399", fontWeight: 600 }}>TODAY</span>}
                </span>
                <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-tertiary)", fontWeight: 500 }}>{items.length}건 · ${dayVal.toFixed(1)}M</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: items.length === 1 ? "1fr" : "repeat(auto-fill, minmax(520px, 1fr))", gap: 10 }}>
                {items.map((u) => (
                  <UnlockCard key={u.token + u.date} u={u} expanded={expanded === u.token} onToggle={() => setExpanded(expanded === u.token ? null : u.token)} />
                ))}
              </div>
            </div>
          );
        })}

        {grouped.length === 0 && <div style={{ textAlign: "center", padding: 60, color: "var(--text-muted)" }}>해당 조건의 언락 일정이 없습니다.</div>}
        </>}

        {activeTab === "billions" && <BillionsTab />}

        {activeTab === "citrea" && <CitreaTab />}
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
    <div style={{ background: u.featured ? "var(--featured-bg)" : pctBg(u.unlockPct), border: `1px solid ${u.featured ? "var(--featured-border)" : "var(--border)"}`, borderRadius: 10, borderLeft: `3px solid ${col}`, overflow: "hidden" }}>
      <div onClick={onToggle} style={{ padding: "14px 18px", cursor: "pointer", display: "grid", gridTemplateColumns: "1fr auto", gap: "4px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", minWidth: 50 }}>{u.token}</span>
          <span style={{ fontSize: 13, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</span>
          <span style={{ fontSize: 11, color: "var(--text-tertiary)", background: "var(--bg-secondary)", padding: "2px 7px", borderRadius: 3, flexShrink: 0 }}>{u.cat}</span>
          {u.featured && <span style={{ fontSize: 10, color: "var(--accent-red)", background: "var(--featured-chip)", padding: "2px 6px", borderRadius: 3, border: "1px solid var(--featured-border)", fontWeight: 700 }}>FEATURED</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right", minWidth: 70 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: col }}>{u.unlockPct}%</div>
            <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>유통 대비</div>
          </div>
          <div style={{ textAlign: "right", minWidth: 60 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>${u.unlockVal}M</div>
            <div style={{ fontSize: 10, color: "var(--text-tertiary)" }}>가치</div>
          </div>
          <span style={{ fontSize: 16, color: "var(--text-muted)", marginLeft: 4 }}>{expanded ? "▾" : "▸"}</span>
        </div>
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 16, fontSize: 12, color: "var(--text-tertiary)", marginTop: 2, flexWrap: "wrap" }}>
          <span>수령: <span style={{ color: "var(--text-secondary)" }}>{u.recipient}</span></span>
          <span>유통: <span style={{ color: "var(--text-secondary)" }}>{u.circulating}</span></span>
          <span>총발행: <span style={{ color: "var(--text-secondary)" }}>{u.totalSupply}</span></span>
          {u.maxSupply !== u.totalSupply && <span>최대: <span style={{ color: u.maxSupply.includes("Unlimited") ? "#f59e0b" : "var(--text-secondary)" }}>{u.maxSupply}</span></span>}
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "0 18px 16px", borderTop: "1px solid var(--border)" }}>
          {/* Allocation bar */}
          <div style={{ marginTop: 14, marginBottom: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Token Allocation</div>
            <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
              {u.allocation.map((a, i) => (
                <div key={i} style={{ width: `${a.pct}%`, background: ALLOC_COLORS[i % ALLOC_COLORS.length], minWidth: 2 }} />
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px" }}>
              {u.allocation.map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: ALLOC_COLORS[i % ALLOC_COLORS.length], flexShrink: 0 }} />
                  <span style={{ color: "var(--text-secondary)" }}>{a.name}</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Unlock Breakdown */}
          {u.unlockBreakdown && (
            <div style={{ marginTop: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Unlock Breakdown</div>
              <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", marginBottom: 8 }}>
                {u.unlockBreakdown.map((b, i) => (
                  <div key={i} style={{ width: `${b.pct}%`, background: b.color, minWidth: 4 }} />
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(u.unlockBreakdown.length, 3)}, 1fr)`, gap: 8 }}>
                {u.unlockBreakdown.map((b, i) => (
                  <div key={i} style={{ background: "var(--bg-secondary)", borderRadius: 6, padding: "10px 12px", border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: b.color }} />
                      <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{b.name}</span>
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: b.color }}>{b.amount}</div>
                    <div style={{ fontSize: 11, color: "var(--text-tertiary)" }}>{b.pct}% of unlock</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Market Data */}
          {u.market && (
            <div style={{ marginTop: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Market Data</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                {[
                  ["Price", u.market.price, "var(--text-primary)"],
                  ["MCap", u.market.mcap, "var(--text-primary)"],
                  ["FDV", u.market.fdv, "var(--text-primary)"],
                  ["24h Volume", u.market.vol24h, "var(--text-primary)"],
                  ["ATH Drop", u.market.athDrop, "var(--accent-red)"],
                  ["Exchanges", u.market.exchanges, "var(--text-secondary)"],
                ].map(([label, val, valCol]) => (
                  <div key={label} style={{ background: "var(--bg-secondary)", borderRadius: 6, padding: "8px 12px", border: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 10, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: valCol, marginTop: 2 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vesting note */}
          {u.vesting && (
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.6, background: "var(--bg-secondary)", borderRadius: 6, padding: "10px 12px", border: "1px solid var(--border)" }}>
              <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>Vesting: </span>{u.vesting}
            </div>
          )}

          {/* Timeline */}
          {u.timeline && (
            <div style={{ marginTop: 12, marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10 }}>Unlock Timeline</div>
              <div style={{ position: "relative", paddingLeft: 20 }}>
                <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: "var(--border)" }} />
                {u.timeline.map((t, i) => {
                  const statusColors = { done: "#34d399", upcoming: "#f59e0b", unconfirmed: "var(--text-tertiary)" };
                  const statusLabels = { done: "완료", upcoming: "임박", unconfirmed: "미확정" };
                  const sc = statusColors[t.status] || "var(--text-tertiary)";
                  return (
                    <div key={i} style={{ position: "relative", marginBottom: i < u.timeline.length - 1 ? 10 : 0, paddingBottom: i < u.timeline.length - 1 ? 10 : 0, borderBottom: i < u.timeline.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ position: "absolute", left: -17, top: 4, width: 10, height: 10, borderRadius: "50%", background: t.status === "done" ? sc : "var(--bg-secondary)", border: `2px solid ${sc}` }} />
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: t.status === "upcoming" ? "#f59e0b" : "var(--text-primary)", minWidth: 90 }}>{t.date}</span>
                        <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 3, fontWeight: 600, color: sc, background: `${sc}15`, border: `1px solid ${sc}33` }}>{statusLabels[t.status]}</span>
                        {t.warn && <span style={{ fontSize: 10, color: "var(--accent-red)", fontWeight: 700 }}>!</span>}
                      </div>
                      <div style={{ fontSize: 12, color: t.warn ? "#ef8888" : "var(--text-secondary)", lineHeight: 1.5 }}>{t.event}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Strategy */}
          {u.strategy && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Strategy Analysis</div>
              <div style={{ display: "grid", gridTemplateColumns: u.strategy.length > 2 ? "repeat(2, 1fr)" : "1fr", gap: 8 }}>
                {u.strategy.map((s, i) => {
                  const typeColors = { short: "#ef4444", timing: "#f59e0b", bounce: "#34d399", caution: "#6b7280" };
                  const tc = typeColors[s.type] || "#6b7280";
                  return (
                    <div key={i} style={{ background: "var(--bg-secondary)", borderRadius: 6, padding: "12px 14px", border: "1px solid var(--border)", borderLeft: `2px solid ${tc}` }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: tc, marginBottom: 4 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 6 }}>{s.desc}</div>
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
// Billions ($BILL) — TGE 5/4 Analysis Tab
// Cross-verified: Official docs (billions.network), GitHub, X, CoinGecko
// ============================================================
const BILLIONS_DATA = {
  identity: {
    name: "Billions Network",
    ticker: "BILL",
    category: "Identity / AI Trust Layer / Web3 Infra",
    tagline: "사람과 AI가 개인정보 노출 없이 신원·고유성·신뢰를 증명하는 네트워크",
    tgeDate: "2026-05-04",
    tgeTime: "09:00 CET",
    tokenType: "ERC-20 utility (Ethereum L2)",
    totalSupply: "10,000,000,000 BILL",
    tgeCirc: "약 24.28% (2.4B)",
    inflation: "0% (fixed supply)",
    funding: "$30M+",
    users: "2.6M+",
  },
  channels: [
    { label: "Website", url: "https://billions.network", icon: "🌐" },
    { label: "X (@billions_ntwk)", url: "https://x.com/billions_ntwk", icon: "𝕏" },
    { label: "CEO X (@provenauthority)", url: "https://x.com/provenauthority", icon: "𝕏" },
    { label: "Token Overview", url: "https://billions.network/token-overview", icon: "📄" },
    { label: "White Paper", url: "https://billions.network/whitepaper", icon: "📄" },
    { label: "MiCA Paper", url: "https://billions.network/mica-white-paper", icon: "📄" },
    { label: "GitHub", url: "https://github.com/BillionsNetwork/billions-token", icon: "💻" },
    { label: "Discord", url: "https://discord.com/invite/billions-ntwk", icon: "💬" },
    { label: "FAQ", url: "https://billions.network/faq", icon: "❓" },
    { label: "Reward Portal", url: "https://signup.billions.network/sign-in", icon: "🎁" },
    { label: "Wallet", url: "https://wallet.billions.network/", icon: "👛" },
  ],
  contracts: [
    { chain: "Ethereum", address: "0xb1110919016846972056AB995054D65560D5f05E", verified: true, explorer: "https://etherscan.io/token/" },
    { chain: "Billions Mainnet", address: "0xb060E40C3B053C33D458f7105F95DA52741CAb62", verified: true, explorer: null },
    { chain: "BSC (사용자 제공)", address: "0xDf24f8c21Cb404B3031a450D8e049D6E39FC1FA5", verified: false, explorer: "https://bscscan.com/token/" },
    { chain: "Arbitrum", address: "0x55b9f84605B30Df9Bb9d817A6900219F25218157", verified: false, explorer: "https://arbiscan.io/token/" },
    { chain: "Optimism", address: "0x55b9f84605B30Df9Bb9d817A6900219F25218157", verified: false, explorer: "https://optimistic.etherscan.io/token/" },
    { chain: "Polygon", address: "0x0a1ac7A9CD9Af4fCd7321A8a090De580a1C037D6", verified: false, explorer: "https://polygonscan.com/token/" },
    { chain: "Base", address: "0x42Bdfa05945dB355D59fE0B65124e3636F7fEdB5", verified: false, explorer: "https://basescan.org/token/" },
  ],
  tokenomics: [
    { name: "Community", pct: 40, amount: "4.0B", color: "#3b82f6", vesting: "에어드롭, 스테이킹, 해커톤, 그로스 리워드" },
    { name: "Foundation Reserves", pct: 32, amount: "3.2B", color: "#f59e0b", vesting: "4년 분할 release" },
    { name: "Contributors", pct: 20, amount: "2.0B", color: "#8b5cf6", vesting: "1년 cliff + 3년 linear vesting" },
    { name: "Investors", pct: 6, amount: "0.6B", color: "#ef4444", vesting: "12개월 cliff + 4년 vesting" },
    { name: "Creators Program", pct: 2, amount: "0.2B", color: "#6b7280", vesting: "long-term contributors" },
  ],
  cexListings: [
    { exchange: "KuCoin", pair: "BILL/USDT (추정)", time: "2026-05-04 17:00", status: "확정" },
    { exchange: "MEXC", pair: "BILL/USDT", time: "Innovation Zone + Convert (사전 거래)", status: "확정" },
    { exchange: "Binance Alpha", pair: "BILL", time: "노출됨 (Spot 미확인)", status: "예정" },
    { exchange: "Coinbase", pair: "—", time: "로드맵 등재만", status: "예정" },
    { exchange: "Kraken", pair: "—", time: "상장 예정 (시각 미확인)", status: "예정" },
    { exchange: "OKX", pair: "—", time: "Boost 캠페인 추정 (조건 미확인)", status: "미확인" },
  ],
  timeline: [
    { date: "2024-06-13", title: "Polygon 분사", desc: "Polygon Labs에서 분사하여 Privado ID로 출범" },
    { date: "2024-09-19", title: "Disco.xyz 합병", desc: "Evin McMullen CSO 합류" },
    { date: "2025-02-28", title: "Billions 브랜드 공개", desc: "첫 공식 브랜딩 발표" },
    { date: "2025-06-26", title: "모바일 앱 런칭", desc: "4개월에 100만 pre-registration 달성" },
    { date: "2025-11-13", title: "$BILL 티커 공개", desc: "공식 토큰 티커 발표" },
    { date: "2026-01-20", title: "Token Overview 업데이트", desc: "토크노믹스 최종 확정" },
    { date: "2026-04-10", title: "NESA AI 파트너십", desc: "E2E encrypted AI + verified identity" },
    { date: "2026-04-12", title: "Agglayer Identity Layer", desc: "Polygon Agglayer 공식 ID 레이어" },
    { date: "2026-04-16", title: "Tria 파트너십", desc: "Privacy-preserving KYC for Web3 Finance" },
    { date: "2026-05-04", title: "TGE 🔥", desc: "Token Generation Event — 09:00 CET", future: true },
  ],
  utility: [
    { icon: "💳", title: "수수료 결제", desc: "검증/크레덴셜 수수료 (BILL 사용 시 10-15% 할인)" },
    { icon: "🗳️", title: "거버넌스", desc: "투표권 (future phases)" },
    { icon: "🔒", title: "스테이킹", desc: "평판 구축, 프리미엄 기능 접근" },
    { icon: "🎁", title: "리워드", desc: "에어드롭, 추천 인센티브" },
    { icon: "🤖", title: "AI 담보", desc: "AI 에이전트 및 앱 담보 자산" },
    { icon: "🛡️", title: "DID 안티스팸", desc: "Decentralized Identity 스팸 방어" },
    { icon: "🔓", title: "기능 해금", desc: "네트워크 프리미엄 기능 액세스" },
  ],
  roadmap: [
    { phase: "Phase 1", title: "Human & AI Internet", desc: "현재 단계. 사람과 AI 식별 기반 구축", current: true },
    { phase: "Phase 2", title: "Reputation Layer", desc: "평판 시스템 도입, 신뢰도 기반 인터랙션", current: false },
    { phase: "Phase 3", title: "Global Trust Economy", desc: "전세계 신뢰 경제 인프라로 확장", current: false },
  ],
  shortTerm: [
    "Rewards Dashboard 통합/이관",
    "FAIRR (First AI Agent Rewards) 확장",
    "스테이킹 기능 런칭",
    "추가 정부 ID 지원 확대",
    "Premium Badge / Premium usernames",
  ],
  team: [
    { name: "Evin McMullen", role: "CEO & Co-founder", bg: "Disco.xyz 출신, doxxed", link: "https://x.com/provenauthority" },
    { name: "Antoni Martin", role: "Co-founder & COO", bg: "Privado ID 출신", link: null },
    { name: "David Z.", role: "Co-founder", bg: "LinkedIn 확인", link: null },
    { name: "CTO", role: "미공개", bg: "공식 발표 대기", link: null },
  ],
  backers: ["Polychain", "Coinbase Ventures", "Liberty City Ventures", "BITKRAFT"],
  partners: {
    chains: ["Agglayer", "Base", "BNB Chain", "Linea", "Polygon"],
    apps: ["NESA AI", "Tria", "Sentient", "OpenClaw", "Sony Bank", "HSBC", "Red Cross", "Lagrange", "q/acc"],
  },
  competitive: [
    { feature: "검증 방식", billions: "Mobile-first, passport/phone 기반", worldcoin: "Iris hardware (Orb)" },
    { feature: "하드웨어", billions: "전용 하드웨어 불필요", worldcoin: "Orb 디바이스 필수" },
    { feature: "크레덴셜", billions: "ZK reusable credentials", worldcoin: "단일 검증" },
    { feature: "대상", billions: "사람 + AI 둘 다", worldcoin: "사람만" },
    { feature: "프라이버시", billions: "Zero-knowledge proof 기본", worldcoin: "Iris hash 저장" },
  ],
  news: [
    { date: "2026-05-03", title: "KuCoin: $BILL 상장 발표", desc: "5/4 17:00 거래 시작 공식화", url: "https://x.com/billions_ntwk", tag: "상장" },
    { date: "2026-05-02", title: "MEXC: First in Market - Innovation Zone + Convert", desc: "사전 거래 가능한 Convert Feature 활성화", url: "https://x.com/billions_ntwk", tag: "상장" },
    { date: "2026-05-02", title: "Binance Alpha: Airdrop frenzy begins", desc: "Binance Alpha 노출 시작", url: "https://x.com/billions_ntwk", tag: "상장" },
    { date: "2026-05-02", title: "BILL Token TGE 발표", desc: "공식 TGE 일정 5/4 09:00 CET 확정", url: "https://billions.network", tag: "TGE" },
    { date: "2026-04-16", title: "Tria 파트너십", desc: "Privacy-preserving KYC for Web3 Finance", url: "https://billions.network/blog/billions-x-tria-bringing-privacy-preserving-kcy-to-the-next-generation-of-web3-finance", tag: "파트너십" },
    { date: "2026-04-12", title: "Agglayer 공식 Identity Layer", desc: "Polygon Agglayer의 공식 ID 레이어로 채택", url: "https://billions.network/blog/billions-becomes-agglayers-official-identity-layer", tag: "파트너십" },
    { date: "2026-04-10", title: "NESA AI 파트너십", desc: "First end-to-end encrypted AI network with verified identity", url: "https://billions.network/blog/the-first-end-to-end-encrypted-ai-network-now-has-verified-identity", tag: "파트너십" },
    { date: "2026-04-XX", title: "⚠️ Last-minute token unlock 변경 백래시", desc: "토큰 언락 일정 변경에 대한 커뮤니티 일부 비판", url: "https://x.com/billions_ntwk", tag: "리스크" },
  ],
  risks: [
    { title: "Last-minute unlock 변경", desc: "TGE 직전 토큰 언락 일정 변경에 대한 커뮤니티 일부 백래시 보도" },
    { title: "Sell-the-news 우려", desc: "TGE 후 단기 매도 압력 가능성 (CEX 동시 상장으로 유동성은 충분)" },
    { title: "TGE 유통 비율 24.28%", desc: "업계 평균 10-15% 대비 다소 높음. 초기 매도 압력 잠재" },
    { title: "CTO 미공개", desc: "기술 리더십 투명성 부족. 라운드별 밸류에이션도 미공개" },
    { title: "상장 조건 미확정", desc: "Coinbase/Kraken/OKX 정확한 상장 시각 및 페어 미확정" },
  ],
};

function dDayLabel(targetDateStr) {
  const target = new Date(targetDateStr + "T00:00:00");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return "D-DAY";
  return `D+${Math.abs(diffDays)}`;
}

function BillionsTab() {
  const [copiedAddr, setCopiedAddr] = useState(null);
  const [contractsOpen, setContractsOpen] = useState(true);
  const data = BILLIONS_DATA;
  const dday = dDayLabel(data.identity.tgeDate);

  const copyAddr = (addr) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(addr).then(() => {
        setCopiedAddr(addr);
        setTimeout(() => setCopiedAddr(null), 1500);
      }).catch(() => {});
    }
  };

  const sectionTitle = (txt) => (
    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12 }}>{txt}</div>
  );

  const card = (children, extra = {}) => (
    <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 18px", transition: "transform 0.15s, border-color 0.15s", ...extra }}>{children}</div>
  );

  return (
    <div>
      <style>{`
        @keyframes billPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.04); } }
        @keyframes billGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6); } 50% { box-shadow: 0 0 0 12px rgba(239,68,68,0); } }
        .bill-card-hover:hover { transform: translateY(-2px); border-color: var(--text-tertiary) !important; }
      `}</style>


      <div style={{
        background: "var(--featured-bg)",
        border: "1px solid var(--featured-border)",
        borderRadius: 14,
        padding: "28px 28px 24px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-red)", background: "var(--featured-chip)", border: "1px solid var(--featured-border)", padding: "4px 10px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.8px" }}>TGE EVENT</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-tertiary)" }}>{data.identity.category}</span>
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px", lineHeight: 1.2, margin: 0 }}>
              🔥 ${data.identity.ticker} TGE — 내일 5/4 09:00 CET
            </h2>
            <div style={{ fontSize: 16, color: "var(--text-secondary)", marginTop: 10, lineHeight: 1.6, maxWidth: 720 }}>
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>{data.identity.name}</span> · {data.identity.tagline}
            </div>
          </div>
          <div style={{
            background: "var(--accent-red)",
            color: "#fff",
            borderRadius: 14,
            padding: "16px 22px",
            textAlign: "center",
            minWidth: 120,
            animation: "billGlow 2.4s ease-in-out infinite",
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.9, textTransform: "uppercase", letterSpacing: "1.2px" }}>Countdown</div>
            <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1, marginTop: 8, animation: "billPulse 1.6s ease-in-out infinite" }}>{dday}</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8, opacity: 0.9 }}>{data.identity.tgeTime}</div>
          </div>
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Quick Stats")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
          {[
            ["총공급", "10B BILL", "var(--text-primary)"],
            ["TGE 유통", data.identity.tgeCirc, "#f59e0b"],
            ["펀딩 라운드", data.identity.funding, "#34d399"],
            ["검증 사용자", data.identity.users, "#3b82f6"],
            ["백커", `${data.backers.length}곳`, "#8b5cf6"],
            ["TGE 가격", "TBD", "var(--text-tertiary)"],
          ].map(([label, val, col]) => (
            <div key={label} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 14, color: "var(--text-tertiary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>{label}</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: col, marginTop: 6, lineHeight: 1.2 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Tokenomics — 10B Total Supply")}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>

          <div style={{ display: "flex", height: 14, borderRadius: 6, overflow: "hidden", marginBottom: 14 }}>
            {data.tokenomics.map((t) => (
              <div key={t.name} style={{ width: `${t.pct}%`, background: t.color, minWidth: 4 }} title={`${t.name} ${t.pct}%`} />
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
            {data.tokenomics.map((t) => (
              <div key={t.name} style={{ display: "grid", gridTemplateColumns: "auto 160px 70px 80px 1fr", gap: 12, alignItems: "center", padding: "10px 12px", background: "var(--bg-primary)", borderRadius: 6, border: "1px solid var(--border)" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: t.color, flexShrink: 0 }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{t.name}</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: t.color }}>{t.pct}%</span>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-secondary)" }}>{t.amount}</span>
                <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{t.vesting}</span>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("CEX Listing Schedule")}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 2fr 0.8fr", padding: "12px 16px", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            <div>거래소</div>
            <div>페어</div>
            <div>시각</div>
            <div style={{ textAlign: "right" }}>상태</div>
          </div>
          {data.cexListings.map((x, i) => {
            const statusColor = x.status === "확정" ? "#34d399" : x.status === "예정" ? "#f59e0b" : "#6b7280";
            return (
              <div key={x.exchange} style={{ display: "grid", gridTemplateColumns: "1.2fr 1.4fr 2fr 0.8fr", padding: "12px 16px", borderBottom: i < data.cexListings.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{x.exchange}</div>
                <div style={{ fontSize: 15, color: "var(--text-secondary)" }}>{x.pair}</div>
                <div style={{ fontSize: 15, color: "var(--text-tertiary)" }}>{x.time}</div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: statusColor, background: `${statusColor}1a`, border: `1px solid ${statusColor}40`, padding: "4px 11px", borderRadius: 4 }}>{x.status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        <div onClick={() => setContractsOpen(!contractsOpen)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1.5px" }}>Multichain Contracts</span>
          <span style={{ fontSize: 14, color: "var(--text-muted)" }}>{contractsOpen ? "▾" : "▸"}</span>
        </div>
        {contractsOpen && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
            {data.contracts.map((c) => (
              <div key={c.chain + c.address} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 16px", display: "grid", gridTemplateColumns: "180px 1fr auto auto", gap: 12, alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{c.chain}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c.verified ? "#34d399" : "#f59e0b", background: c.verified ? "rgba(52,211,153,0.1)" : "rgba(245,158,11,0.1)", border: `1px solid ${c.verified ? "rgba(52,211,153,0.3)" : "rgba(245,158,11,0.3)"}`, padding: "3px 8px", borderRadius: 3 }}>
                    {c.verified ? "✓ verified" : "⚠ unverified"}
                  </span>
                </div>
                <code style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "ui-monospace, Consolas, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.address}</code>
                <button onClick={() => copyAddr(c.address)} style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 5, padding: "5px 12px", fontSize: 13, fontWeight: 600, color: copiedAddr === c.address ? "#34d399" : "var(--text-secondary)", cursor: "pointer", fontFamily: "inherit", transition: "color 0.15s" }}>
                  {copiedAddr === c.address ? "✓ Copied" : "📋 Copy"}
                </button>
                {c.explorer ? (
                  <a href={c.explorer + c.address} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none", padding: "5px 12px", border: "1px solid var(--border)", borderRadius: 5, background: "var(--bg-primary)", fontWeight: 600 }}>↗ Explorer</a>
                ) : <span style={{ fontSize: 13, color: "var(--text-muted)", padding: "5px 12px" }}>—</span>}
              </div>
            ))}
          </div>
        )}
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Project Timeline")}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "18px 22px" }}>
          <div style={{ position: "relative", paddingLeft: 22 }}>
            <div style={{ position: "absolute", left: 6, top: 4, bottom: 4, width: 2, background: "var(--border)" }} />
            {data.timeline.map((ev, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < data.timeline.length - 1 ? 14 : 0, paddingBottom: i < data.timeline.length - 1 ? 14 : 0, borderBottom: i < data.timeline.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ position: "absolute", left: -19, top: 4, width: 12, height: 12, borderRadius: "50%", background: ev.future ? "var(--accent-red)" : "var(--bg-primary)", border: `2px solid ${ev.future ? "var(--accent-red)" : "var(--text-tertiary)"}`, animation: ev.future ? "billPulse 1.8s ease-in-out infinite" : "none" }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: ev.future ? "var(--accent-red)" : "var(--text-primary)", minWidth: 110 }}>{ev.date}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: ev.future ? "var(--accent-red)" : "var(--text-primary)" }}>{ev.title}</span>
                  {ev.future && <span style={{ fontSize: 12, color: "var(--accent-red)", background: "var(--featured-chip)", border: "1px solid var(--featured-border)", padding: "3px 9px", borderRadius: 3, fontWeight: 700 }}>UPCOMING</span>}
                </div>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginLeft: 120 }}>{ev.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Token Utility")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {data.utility.map((u) => (
            <div key={u.title} className="bill-card-hover" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", transition: "transform 0.15s, border-color 0.15s" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{u.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{u.title}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{u.desc}</div>
            </div>
          ))}
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Roadmap — 3 Phases")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10, marginBottom: 14 }}>
          {data.roadmap.map((p, i) => (
            <div key={p.phase} style={{
              background: p.current ? "var(--featured-bg)" : "var(--bg-secondary)",
              border: `1px solid ${p.current ? "var(--featured-border)" : "var(--border)"}`,
              borderLeft: `3px solid ${p.current ? "var(--accent-red)" : ALLOC_COLORS[i % ALLOC_COLORS.length]}`,
              borderRadius: 10,
              padding: "16px 18px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: p.current ? "var(--accent-red)" : "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px" }}>{p.phase}</span>
                {p.current && <span style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-red)", background: "var(--featured-chip)", border: "1px solid var(--featured-border)", padding: "3px 9px", borderRadius: 3 }}>NOW</span>}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>{p.title}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 18px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>단기 (Q2-Q3 2026)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {data.shortTerm.map((s) => (
              <span key={s} style={{ fontSize: 14, color: "var(--text-secondary)", background: "var(--bg-primary)", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: 5 }}>{s}</span>
            ))}
          </div>
        </div>
      </div>


      <div style={{ marginBottom: 28, display: "grid", gridTemplateColumns: "1fr", gap: 18 }}>
        <div>
          {sectionTitle("Team")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {data.team.map((t) => (
              <div key={t.name} className="bill-card-hover" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", transition: "transform 0.15s, border-color 0.15s" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{t.name}</div>
                <div style={{ fontSize: 13, color: "#3b82f6", fontWeight: 600, marginBottom: 8 }}>{t.role}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: t.link ? 10 : 0 }}>{t.bg}</div>
                {t.link && <a href={t.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none", fontWeight: 600 }}>↗ X Profile</a>}
              </div>
            ))}
          </div>
        </div>
        <div>
          {sectionTitle("Backers ($30M+ raised)")}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
            {data.backers.map((b) => (
              <div key={b} style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>💎</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Partnerships & Integrations")}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Chains</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.partners.chains.map((c) => (
                <span key={c} style={{ fontSize: 15, fontWeight: 600, color: "#3b82f6", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", padding: "6px 13px", borderRadius: 5 }}>{c}</span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 10 }}>Apps</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.partners.apps.map((a) => (
                <span key={a} style={{ fontSize: 15, fontWeight: 600, color: "var(--text-secondary)", background: "var(--bg-primary)", border: "1px solid var(--border)", padding: "6px 13px", borderRadius: 5 }}>{a}</span>
              ))}
            </div>
          </div>
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Competitive — vs Worldcoin")}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr", padding: "12px 16px", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)", fontSize: 13, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            <div>구분</div>
            <div style={{ color: "var(--accent-red)" }}>Billions ($BILL)</div>
            <div>Worldcoin ($WLD)</div>
          </div>
          {data.competitive.map((c, i) => (
            <div key={c.feature} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr", padding: "12px 16px", borderBottom: i < data.competitive.length - 1 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-secondary)" }}>{c.feature}</div>
              <div style={{ fontSize: 15, color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.5 }}>{c.billions}</div>
              <div style={{ fontSize: 15, color: "var(--text-tertiary)", lineHeight: 1.5 }}>{c.worldcoin}</div>
            </div>
          ))}
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Recent News (Last 30 days)")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
          {data.news.map((n, i) => {
            const tagColors = { TGE: "#ef4444", 상장: "#34d399", 파트너십: "#3b82f6", 리스크: "#f59e0b" };
            const tc = tagColors[n.tag] || "#6b7280";
            return (
              <div key={i} className="bill-card-hover" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderLeft: `3px solid ${tc}`, borderRadius: 8, padding: "12px 16px", transition: "transform 0.15s, border-color 0.15s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)" }}>{n.date}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: tc, background: `${tc}1a`, border: `1px solid ${tc}40`, padding: "3px 9px", borderRadius: 3 }}>{n.tag}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>{n.title}</span>
                </div>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 8 }}>{n.desc}</div>
                <a href={n.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none", wordBreak: "break-all", fontWeight: 500 }}>↗ {n.url}</a>
              </div>
            );
          })}
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("⚠️ Risk Signals")}
        <div style={{ background: "var(--featured-bg)", border: "1px solid var(--featured-border)", borderLeft: "3px solid var(--accent-red)", borderRadius: 10, padding: "16px 18px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10 }}>
            {data.risks.map((r, i) => (
              <div key={i} style={{ background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--accent-red)", marginBottom: 6 }}>{`#${i + 1} ${r.title}`}</div>
                <div style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div style={{ marginBottom: 28 }}>
        {sectionTitle("Official Channels")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
          {data.channels.map((c) => (
            <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="bill-card-hover" style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "12px 14px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 10,
              transition: "transform 0.15s, border-color 0.15s",
            }}>
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.label}</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 }}>{c.url.replace(/^https?:\/\//, "")}</div>
              </div>
            </a>
          ))}
        </div>
      </div>


      <div style={{ textAlign: "center", padding: "24px 0 0", borderTop: "1px solid var(--border)", marginTop: 8 }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
          데이터 출처: billions.network 공식 docs · GitHub · X · CoinGecko · 1차+2차 librarian 교차검증
          <br />
          본 정보는 투자 자문이 아니며, TGE 직전 변경 가능성 있음 (Last verified: 2026-05-03)
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Citrea Deep-Dive Tab — Bitcoin's First ZK Rollup
// Sources: docs · blog (17 posts) · DeFiLlama · GitHub · X
// 3-pass librarian verification (2026-05-03)
// ============================================================
const X_BASE = "https://x.com/";
const KOREA_X_BASE = X_BASE + "Citrea" + "Korea/status/";
const BLOG_BASE = "https://www.blog.citrea.xyz/";

const CITREA_DATA = {
  identity: {
    name: "Citrea",
    fullName: "Citrea (Bitcoin's First ZK Rollup)",
    tagline: "비트코인 첫 ZK Rollup · BTC L2",
    chain: "Chain ID 4114, native cBTC",
    mainnetLive: "2026-01-27",
    tokenStatus: "❌ 자체 토큰 없음 (cBTC = native, ERC20 wrapper WCBTC)",
    company: "Chainway Labs (Cayman Islands, 2022 설립, 11-50명)",
  },
  alert: {
    title: "Citrea 에어드랍 캠페인 — 마무리 단계 · 막차 타이밍",
    subtitle: "메인넷 포인트 시스템 · 50등 컷 약 2,936점 · 6개 활동 적립 → 향후 에어드랍 가중치",
    dashboardUrl: "https://app.citrea.xyz",
  },
  campaign: {
    startDate: "2026-01-27 (메인넷 라이브와 동시)",
    endDate: "공식 마감일 미공개",
    seasonStructure: "공식 'Season 1/2' 구조 미확인 (weekly recap 운영 중)",
    updateSchedule: "화요일 / 금요일 정기 업데이트",
    pointSystem: "비선형 알고리즘, sybil 검사 적용",
    rewardGuarantee: "❌ 보상/토큰 권리 보장 없음 (대시보드 명시)",
    dashboardUrl: "https://app.citrea.xyz",
    announceUrl: "https://fixvx.com/citrea_xyz/status/2044400892791968062",
  },
  categories: [
    { id: "bridger", name: "Bridger", icon: "🌉", color: "#3b82f6", activatedDate: "2026-01-30", boostActive: true, dApps: ["Bridge Hub", "Avail Nexus", "Squid", "Stargate", "Symbiosis", "Atomiq", "Clementine"], description: "BTC → cBTC 입금" },
    { id: "lp", name: "Liquidity Provider", icon: "💧", color: "#f59e0b", activatedDate: "2026-02-06", boostActive: true, dApps: ["Satsuma", "JuiceSwap"], description: "DEX 풀 유동성 공급" },
    { id: "trader", name: "Trader", icon: "📈", color: "#8b5cf6", activatedDate: "2026-02-13", boostActive: false, dApps: ["Satsuma", "JuiceSwap", "Fibrous"], description: "스왑/거래" },
    { id: "lender", name: "Lender", icon: "🏦", color: "#ef4444", activatedDate: "2026-02-20", boostActive: true, dApps: ["Zentra"], description: "ctUSD supply (borrow X)" },
    { id: "yield", name: "Yield Strategist", icon: "🌾", color: "#34d399", activatedDate: "2026-02-27", boostActive: true, dApps: ["Accountable", "Generic USD"], description: "Vault 예치" },
    { id: "adventurer", name: "Adventurer", icon: "🗺️", color: "#6b7280", activatedDate: "2026-03-06", boostActive: false, dApps: ["Signals", "Foresight", "Omnihub", "Rango", "DFX"], description: "Citrea 거래 빈도" },
  ],
  badges: [
    { name: "Beginner", color: "#6b7280", description: "시작 단계" },
    { name: "Explorer", color: "#3b82f6", description: "기본 활동 진행" },
    { name: "Advanced", color: "#f59e0b", description: "고급 활동 다수" },
    { name: "Power User", color: "#ef4444", description: "최상위 활동" },
  ],
  leaderboard: {
    snapshotDate: "2026-05-01 14:00 UTC",
    rank1: "6,316.03",
    rank50Cut: "2,936.28",
    safeTarget: "3,000~3,100점 (다음 업데이트 전 진입)",
    note: "공개 API는 상위 50명만 노출 (limit=100 시도해도 동일)",
  },
  koreanGuides: [
    { type: "브릿지", url: KOREA_X_BASE + "2037509197332623617" },
    { type: "렌딩 (Zentra)", url: KOREA_X_BASE + "2037719468647108664" },
    { type: "유동성 (Satsuma Merkl)", url: KOREA_X_BASE + "2041059226995626189" },
    { type: "예측시장", url: KOREA_X_BASE + "2041861811767799861" },
  ],
  channels: [
    { type: "Website", url: "https://citrea.xyz", label: "citrea.xyz" },
    { type: "X", url: X_BASE + "citrea_xyz", label: "@citrea_xyz" },
    { type: "Docs", url: "https://docs.citrea.xyz", label: "docs.citrea.xyz" },
    { type: "Blog", url: BLOG_BASE, label: "blog.citrea.xyz" },
    { type: "Dashboard", url: "https://app.citrea.xyz", label: "app.citrea.xyz" },
    { type: "Explorer", url: "https://explorer.mainnet.citrea.xyz", label: "explorer.mainnet" },
    { type: "🇰🇷 Korea X", url: X_BASE + "Citrea" + "Korea", label: "@" + "Citrea" + "Korea (공식)" },
    { type: "🇰🇷 Korea Telegram", url: "https://t.me/citreakorea", label: "t.me/citreakorea" },
  ],
  mainnetStats: {
    tvl: "$2.9M",
    txDaily: "11,328",
    txTotal: "898,005",
    addressTotal: "37,857",
    blocksTotal: "6,859,760",
    blockTime: "2초",
    blockGasLimit: "10,000,000",
    bridgedBTC: "26.0218 WCBTC",
    chainId: "4114",
    apps: "30+ ₿apps (실명 노출 20+)",
  },
  tech: {
    type: "Type 2 zkEVM",
    prover: "RISC Zero (zk-STARK → SNARK 래핑)",
    da: "Bitcoin Data Availability",
    bridge: "Clementine (BitVM2 기반 trust-minimized two-way peg)",
    finality: "BTC mainnet 6 confirmations",
    sequencer: "현재 단일 sequencer (분산화는 로드맵)",
    consensus: "1-of-N honest signer assumption",
  },
  team: [
    { name: "Orkun Kılıç", role: "CEO / Co-founder / Tech Lead", background: "前 Dexalot, BiLira, OlymposHQ, Geometry Venture Development, Koç Univ AI Lab", x: X_BASE + "0x_orkun", url: "https://0rkun.com/" },
    { name: "Murat Karademir", role: "COO / Co-founder", background: "前 Inzva (비영리)", x: null, url: null },
    { name: "Ekrem Bal", role: "Chief Scientist", background: "Clementine 공개 글 공저자", x: null, url: null },
    { name: "Jason Chew", role: "Ecosystem Growth Manager", background: "—", x: null, url: null },
  ],
  funding: {
    total: "$16.7M",
    rounds: [
      { name: "Seed", amount: "$2.7M", date: "2024-02-21 (2023 클로징)", lead: "Galaxy", url: BLOG_BASE + "announcing-our-seed-round/" },
      { name: "Series A", amount: "$14M", date: "2024-10-31", lead: "Founders Fund", url: BLOG_BASE + "announcing-citrea-series-a-round/" },
    ],
    investors: [
      "Founders Fund (lead Series A)", "Galaxy (lead Seed)", "Maven11", "Mirana", "dao5",
      "Delphi Ventures", "Erik Voorhees", "Balaji Srinivasan", "Nikil Viswanathan (Alchemy CEO)",
      "Mert Mumtaz (Helius CEO)", "Jameson Lopp", "Anurag Arjun (Avail co-founder)",
      "Eric Wall", "BatuX", "Igor Barinov", "James Parillo",
    ],
    valuation: "공식 미공개",
    nextRound: "공식 발표 없음",
  },
  partners: {
    techCore: ["BitVM Alliance", "RISC Zero"],
    bridges: ["Symbiosis", "Atomiq", "LayerZero", "Hyperlane", "Squid Router", "Avail"],
    stablecoin: ["MoonPay (ctUSD 발행)", "M0 (powered by)"],
    clementineSigners: ["Chainway Labs", "Galaxy", "Coinsummer", "Omakase", "Nansen", "Nethermind", "Laminated Labs", "Hashkey Cloud", "Finoa", "Luxor"],
  },
  timeline: [
    { date: "2024-02-06", title: "Citrea 첫 공개", desc: "'Bitcoin's First ZK Rollup' 첫 소개", url: BLOG_BASE + "introducing-citrea/" },
    { date: "2024-02-21", title: "Seed Round 공개", desc: "$2.7M, Galaxy 리드", url: BLOG_BASE + "announcing-our-seed-round/" },
    { date: "2024-03-21", title: "Clementine 공개", desc: "BitVM 기반 trust-minimized two-way peg", url: BLOG_BASE + "unveiling-clementine/" },
    { date: "2024-06-05", title: "Public Devnet", desc: "공개 devnet 라이브", url: BLOG_BASE + "citrea-public-devnet-live/" },
    { date: "2024-09-24", title: "Testnet", desc: "Bitcoin Testnet4 위 testnet", url: BLOG_BASE + "citrea-testnet-live-on-bitcoin-testnet4/" },
    { date: "2024-10-31", title: "Series A", desc: "$14M, Founders Fund 리드, 누적 $16.7M", url: BLOG_BASE + "announcing-citrea-series-a-round/" },
    { date: "2024-11-20", title: "Road to Mainnet", desc: "메인넷 전 마지막 기술 과제 공개", url: BLOG_BASE + "citrea-road-to-mainnet/" },
    { date: "2024-12-19", title: "Prover 공개", desc: "Bitcoin용 prover 설계/최적화", url: BLOG_BASE + "citrea-prover-designed-for-bitcoin/" },
    { date: "2024-12-23", title: "Kumquat fork", desc: "첫 fork/업그레이드", url: BLOG_BASE + "kumquat-the-first-ever-fork-on-citrea/" },
    { date: "2025-04-21", title: "Tangerine 업그레이드", desc: "BitVM activation 포함 핵심 업그레이드", url: BLOG_BASE + "tangerine-upgrade-bitvm-activation-on-clementine/" },
    { date: "2025-07-15", title: "Unfreeze ₿apps 캠페인", desc: "메인넷 전 커뮤니티 캠페인 시작", url: BLOG_BASE + "unfreeze-bapps-campaign/" },
    { date: "2025-10-29", title: "Audit 완료", desc: "메인넷 직전 감사 단계 완료", url: BLOG_BASE + "citrea-fully-completes-its-audit-phase/" },
    { date: "2025-11-12", title: "Trusted Setup 완료", desc: "BitVM ZK proof trusted setup", url: BLOG_BASE + "citrea-completes-the-first-ever-trusted-setup-ceremony-for-zk-proofs-used-in-bitvm/" },
    { date: "2026-01-15", title: "ctUSD 공개", desc: "MoonPay/M0 native stablecoin", url: BLOG_BASE + "introducing-citrea-usd-ctusd-the-native-stablecoin-for-bitcoin-issued-by-moonpay-and-powered-by-m0/" },
    { date: "2026-01-27", title: "🚀 메인넷 라이브", desc: "Citrea Mainnet 공식 오픈", url: BLOG_BASE + "citrea-mainnet-is-live/", featured: true },
    { date: "2026-03-02", title: "Citrea Foundation", desc: "독립 재단 출범", url: BLOG_BASE + "citrea-introduces-the-citrea-foundation/" },
    { date: "2026-04-03", title: "Post-Quantum", desc: "양자내성 대응 로드맵", url: BLOG_BASE + "post-quantum-citrea/" },
  ],
  roadmap: {
    shortTerm: {
      title: "단기 (Q2 2026, 1-3개월)",
      items: ["메인넷 초기 유저/앱 확대", "더 많은 ₿apps 롤아웃", "기관 파트너 / 생태계 발표", "Citrea Foundation 그랜트 프로그램"],
    },
    midTerm: {
      title: "중기 (Q3-Q4 2026)",
      items: ["토큰 발행 공식 발표 없음", "추가 펀딩 라운드 공식 없음", "Foundation 기반 그랜트/생태계 성장", "ctUSD 확장", "Post-Quantum 연구 진행"],
    },
    longTerm: {
      title: "장기 (2027+)",
      items: ["비전: 'Bitcoin capital markets / world's finance'", "기술 방향: Multi-proving", "Decentralized sequencing", "Volition model"],
    },
  },
  competitors: [
    { name: "Citrea", tvl: "$2.9M", mcap: "N/A (토큰 없음)", note: "BitVM 기반, RISC Zero, 메인넷 초기", featured: true },
    { name: "Stacks", tvl: "$119.59M", mcap: "$413.91M", note: "가장 성숙, 토큰 STX" },
    { name: "Mezo", tvl: "$27.13M", mcap: "$21.36M", note: "토큰 있음" },
    { name: "BOB", tvl: "$10.78M", mcap: "$16.75M", note: "토큰 있음" },
    { name: "Botanix", tvl: "$415,853", mcap: "N/A", note: "토큰 미발행" },
  ],
  strategy: {
    target: "3,000~3,100점 (50등 컷 2,936 + 여유)",
    timing: "다음 업데이트(화/금) 전 진입",
    priority: [
      { rank: 1, action: "Bridge", note: "1회 진입 + 유지 (Bridge Hub 또는 Stargate/Squid)", boost: true },
      { rank: 2, action: "LP Satsuma", note: "Merkl 캠페인 진행 중, 우선 추천", boost: true },
      { rank: 3, action: "Lend Zentra (ctUSD supply)", note: "borrow X, supply만", boost: true },
      { rank: 4, action: "Yield vault", note: "Accountable/Generic USD 적은 금액", boost: true },
      { rank: 5, action: "Adventurer", note: "저비용 다회 tx (Signals/Foresight 등)", boost: false },
      { rank: 6, action: "Trader", note: "volume 필요해서 비효율 가능", boost: false },
    ],
    risks: [
      "Sybil 검사 적용 (캠페인 중·후)",
      "진행도 비선형 알고리즘",
      "기능 언제든 변경/중단 가능",
      "보상/토큰 권리 보장 없음",
      "에어드랍 확정처럼 말하는 사람 경계",
    ],
  },
};

function CitreaTab() {
  const data = CITREA_DATA;

  const sectionTitle = (txt, accent) => (
    <div style={{
      fontSize: 14, fontWeight: 700, color: accent || "var(--text-tertiary)",
      textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 12,
      display: "flex", alignItems: "center", gap: 8,
    }}>{txt}</div>
  );

  const linkStyle = { fontSize: 13, color: "#f59e0b", textDecoration: "none", fontWeight: 600 };
  const extLink = (href, label) => (
    <a href={href} target="_blank" rel="noopener noreferrer" style={linkStyle} className="citrea-link-hover">↗ {label}</a>
  );

  return (
    <div>
      <style>{`
        @keyframes citreaPulseStrong { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.6), 0 0 28px 0 rgba(245,158,11,0.25); } 50% { box-shadow: 0 0 0 16px rgba(239,68,68,0), 0 0 44px 6px rgba(245,158,11,0.15); } }
        @keyframes citreaBadgePulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.78; transform: scale(1.04); } }
        @keyframes citreaBannerPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.5); } 50% { box-shadow: 0 0 0 10px rgba(239,68,68,0); } }
        @keyframes mainnetGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.55); } 50% { box-shadow: 0 0 22px 4px rgba(245,158,11,0.25); } }
        .citrea-alert { animation: citreaBannerPulse 2.4s ease-in-out infinite; cursor: pointer; transition: transform .15s; }
        .citrea-alert:hover { transform: translateY(-1px); }
        .citrea-cta { transition: transform .15s, box-shadow .15s, background .15s; cursor: pointer; }
        .citrea-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -6px rgba(239,68,68,0.55); }
        .citrea-card-hover:hover { transform: translateY(-2px); border-color: var(--text-tertiary) !important; }
        .citrea-cat-card { transition: transform .15s, border-color .15s, background .15s; }
        .citrea-cat-card:hover { transform: translateY(-3px); }
        .citrea-link-hover:hover { text-decoration: underline; }
        .citrea-guide-card { transition: transform .15s, border-color .15s, background .15s; cursor: pointer; }
        .citrea-guide-card:hover { transform: translateY(-2px); border-color: #ef4444 !important; background: rgba(239,68,68,0.08) !important; }
        .citrea-tl-dot { transition: transform .15s, background .15s; }
        .citrea-tl-row:hover .citrea-tl-dot { transform: scale(1.25); }
        .citrea-tl-row:hover { background: rgba(245,158,11,0.04); }
        .citrea-mainnet-row { animation: mainnetGlow 2.6s ease-in-out infinite; }
        .citrea-chip { transition: transform .15s, background .15s; }
        .citrea-chip:hover { transform: translateY(-1px); background: rgba(245,158,11,0.15) !important; }
      `}</style>

      {/* ============= 1. ALERT 배너 ============= */}
      <a
        href={data.alert.dashboardUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="citrea-alert"
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16,
          background: "linear-gradient(90deg, rgba(239,68,68,0.20) 0%, rgba(245,158,11,0.18) 50%, rgba(239,68,68,0.20) 100%)",
          border: "1px solid rgba(239,68,68,0.6)",
          borderRadius: 12, padding: "14px 20px", marginBottom: 16,
          textDecoration: "none", flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1, minWidth: 280 }}>
          <span style={{
            fontSize: 11, fontWeight: 800, color: "#fff", background: "#ef4444",
            padding: "5px 11px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "1px",
            animation: "citreaBadgePulse 1.6s ease-in-out infinite", whiteSpace: "nowrap",
          }}>🚨 LIVE</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.2px", lineHeight: 1.3 }}>
              Citrea 에어드랍 캠페인 — <span style={{ color: "#ef4444" }}>마무리 단계</span> · 막차 타이밍
            </div>
            <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 2, lineHeight: 1.4 }}>
              {data.alert.subtitle}
            </div>
          </div>
        </div>
        <div style={{
          fontSize: 13, fontWeight: 800, color: "#fff", background: "#ef4444",
          padding: "9px 16px", borderRadius: 7, whiteSpace: "nowrap",
        }}>Dashboard 열기 →</div>
      </a>

      {/* ============= 2. Hero ============= */}
      <div style={{
        background: "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(239,68,68,0.05) 100%), var(--featured-bg)",
        border: "1px solid var(--featured-border)",
        borderRadius: 14, padding: "28px 28px 24px", marginBottom: 24,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.35)", padding: "4px 10px", borderRadius: 4, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                BTC L2 · DEEP DIVE
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-tertiary)" }}>
                Chain ID 4114 · native cBTC · Mainnet 2026-01-27
              </span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.5px", lineHeight: 1.15, margin: 0 }}>
              ₿ Citrea — BTC 첫 ZK Rollup
            </h2>
            <div style={{ fontSize: 15, color: "var(--text-secondary)", marginTop: 10, lineHeight: 1.6, maxWidth: 720 }}>
              {data.identity.tagline} · BitVM2 기반 trust-minimized peg + RISC Zero zkEVM Type 2.
              <br/>
              <strong style={{ color: "#ef4444" }}>{data.identity.tokenStatus}</strong> · 운영사 {data.identity.company}
            </div>
            <div style={{
              marginTop: 16, padding: "14px 18px",
              background: "var(--bg-primary)", border: "1px solid var(--border)",
              borderLeft: "3px solid #ef4444", borderRadius: 6,
              fontStyle: "italic", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7,
            }}>
              <span style={{ fontSize: 22, color: "#ef4444", marginRight: 6, lineHeight: 1 }}>"</span>
              메인넷 라이브 후 포인트 캠페인이 마무리 단계 — 50등 컷 진입이 막차의 마지노선
              <span style={{ fontSize: 22, color: "#ef4444", marginLeft: 4, lineHeight: 1 }}>"</span>
            </div>
          </div>
          <div style={{
            background: "linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)",
            color: "#fff", borderRadius: 14, padding: "16px 22px",
            textAlign: "center", minWidth: 170,
            animation: "citreaPulseStrong 2.6s ease-in-out infinite",
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.95, textTransform: "uppercase", letterSpacing: "1.2px" }}>50등 컷</div>
            <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1, marginTop: 6, fontFamily: "ui-monospace, Consolas, monospace", letterSpacing: "-1px" }}>
              {data.leaderboard.rank50Cut}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 6, opacity: 0.95, lineHeight: 1.3 }}>점 (스냅샷 5/1)</div>
          </div>
        </div>
      </div>

      {/* ============= 3. 캠페인 마무리 박스 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🚨 캠페인 마무리 단계 — 막차 진입 가이드", "#ef4444")}
        <div style={{
          background: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(245,158,11,0.08) 100%)",
          border: "1px solid rgba(239,68,68,0.4)",
          borderRadius: 12, padding: "20px 22px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>50등 컷</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#ef4444", letterSpacing: "-1px", lineHeight: 1, fontFamily: "ui-monospace, Consolas, monospace" }}>
                {data.leaderboard.rank50Cut}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>점 · 막차 마지노선</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>1등</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1, fontFamily: "ui-monospace, Consolas, monospace" }}>
                {data.leaderboard.rank1}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>점 · 상위권 격차</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>안전 타겟</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#34d399", lineHeight: 1, fontFamily: "ui-monospace, Consolas, monospace" }}>
                3,000~3,100
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>여유분 포함 추천</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>업데이트 주기</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b", lineHeight: 1.2 }}>
                화 / 금
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>다음 업데이트 전 진입</div>
            </div>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8,
            paddingTop: 14, borderTop: "1px dashed rgba(239,68,68,0.3)",
          }}>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>스냅샷:</strong> {data.leaderboard.snapshotDate}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>알고리즘:</strong> {data.campaign.pointSystem}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              <strong style={{ color: "var(--text-primary)" }}>마감:</strong> {data.campaign.endDate}
            </div>
          </div>
        </div>
      </div>

      {/* ============= 4. 6개 활동 카테고리 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🎯 6개 활동 카테고리 — Boost 표시 + dApp 리스트", "#f59e0b")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {data.categories.map((cat) => (
            <div key={cat.id} className="citrea-cat-card" style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderLeft: `4px solid ${cat.color}`,
              borderRadius: 10, padding: "14px 16px",
              position: "relative",
            }}>
              {cat.boostActive && (
                <span style={{
                  position: "absolute", top: 10, right: 10,
                  fontSize: 10, fontWeight: 800,
                  color: "#fff", background: "linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)",
                  padding: "3px 8px", borderRadius: 4, letterSpacing: "0.5px",
                  animation: "citreaBadgePulse 1.8s ease-in-out infinite",
                }}>🔥 BOOST</span>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{cat.icon}</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)" }}>{cat.name}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginBottom: 4 }}>{cat.description}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: cat.color, marginBottom: 10, fontFamily: "ui-monospace, Consolas, monospace" }}>
                활성화: {cat.activatedDate}
              </div>
              <div style={{ paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>dApps</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {cat.dApps.map((d) => (
                    <span key={d} style={{
                      fontSize: 11, fontWeight: 700, color: cat.color,
                      background: `${cat.color}1A`, border: `1px solid ${cat.color}55`,
                      padding: "3px 8px", borderRadius: 4,
                    }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============= 5. 뱃지 등급 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🏆 뱃지 등급 — 4단계 (정정: Active → Explorer)", "#3b82f6")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {data.badges.map((b, i) => (
            <div key={b.name} style={{
              background: `linear-gradient(180deg, ${b.color}1A 0%, ${b.color}05 100%), var(--bg-secondary)`,
              border: `1px solid ${b.color}55`,
              borderRadius: 10, padding: "16px 18px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 4 }}>
                Tier {i + 1}
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: b.color, marginBottom: 6, letterSpacing: "-0.3px" }}>
                {b.name}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{b.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ============= 6. 막차 실전 전략 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("📋 막차 실전 전략 — 우선순위 1~6위", "#ef4444")}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}>
          <div style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: 10, overflow: "hidden",
          }}>
            <div style={{
              display: "grid", gridTemplateColumns: "60px 1.2fr 2fr 70px",
              padding: "10px 16px", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)",
              fontSize: 11, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px",
            }}>
              <div style={{ textAlign: "center" }}>순위</div>
              <div>액션</div>
              <div>가이드</div>
              <div style={{ textAlign: "center" }}>Boost</div>
            </div>
            {data.strategy.priority.map((p, i) => (
              <div key={p.rank} style={{
                display: "grid", gridTemplateColumns: "60px 1.2fr 2fr 70px",
                padding: "12px 16px", alignItems: "center",
                borderBottom: i < data.strategy.priority.length - 1 ? "1px solid var(--border)" : "none",
                background: p.boost ? "rgba(239,68,68,0.04)" : "transparent",
              }}>
                <div style={{ textAlign: "center" }}>
                  <span style={{
                    display: "inline-block",
                    width: 28, height: 28, lineHeight: "28px",
                    fontSize: 13, fontWeight: 800,
                    color: p.rank <= 3 ? "#fff" : "var(--text-secondary)",
                    background: p.rank === 1 ? "#ef4444" : p.rank === 2 ? "#f59e0b" : p.rank === 3 ? "#8b5cf6" : "var(--bg-primary)",
                    border: p.rank > 3 ? "1px solid var(--border)" : "none",
                    borderRadius: "50%", textAlign: "center",
                  }}>{p.rank}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)" }}>{p.action}</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{p.note}</div>
                <div style={{ textAlign: "center" }}>
                  {p.boost ? (
                    <span style={{
                      fontSize: 10, fontWeight: 800, color: "#fff",
                      background: "linear-gradient(90deg, #ef4444 0%, #f59e0b 100%)",
                      padding: "3px 7px", borderRadius: 4, letterSpacing: "0.4px", whiteSpace: "nowrap",
                    }}>🔥</span>
                  ) : (
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>—</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{
            background: "linear-gradient(180deg, rgba(239,68,68,0.10) 0%, rgba(239,68,68,0.04) 100%), var(--bg-secondary)",
            border: "1px solid rgba(239,68,68,0.45)",
            borderLeft: "4px solid #ef4444",
            borderRadius: 10, padding: "16px 18px",
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 12, fontWeight: 800, color: "#ef4444",
              textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12,
            }}>⚠️ 위험 시그널 5개</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {data.strategy.risks.map((r, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 8,
                  fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5,
                }}>
                  <span style={{ color: "#ef4444", fontWeight: 800, flexShrink: 0 }}>•</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 14, paddingTop: 12, borderTop: "1px dashed rgba(239,68,68,0.3)",
              fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.5,
            }}>
              <strong style={{ color: "var(--text-primary)" }}>🎯 타겟:</strong> {data.strategy.target}
              <br/><strong style={{ color: "var(--text-primary)" }}>⏰ 타이밍:</strong> {data.strategy.timing}
            </div>
          </div>
        </div>
      </div>

      {/* ============= 7. 한국어 가이드 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🇰🇷 한국어 가이드 — 공식 한국 채널", "#ef4444")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
          {data.koreanGuides.map((g) => (
            <a key={g.type} href={g.url} target="_blank" rel="noopener noreferrer"
              className="citrea-guide-card"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                padding: "12px 14px",
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                borderRadius: 8, textDecoration: "none",
                fontSize: 13, fontWeight: 700, color: "var(--text-primary)",
              }}>
              <span>{g.type}</span>
              <span style={{ color: "#ef4444", fontSize: 14 }}>↗</span>
            </a>
          ))}
        </div>
      </div>

      {/* ============= 8. 메인넷 통계 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("📊 메인넷 통계 — Live Stats (DeFiLlama + Explorer)", "#34d399")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10 }}>
          {[
            ["TVL", data.mainnetStats.tvl, "#34d399"],
            ["일일 Tx", data.mainnetStats.txDaily, "#3b82f6"],
            ["총 Tx", data.mainnetStats.txTotal, "var(--text-primary)"],
            ["총 주소", data.mainnetStats.addressTotal, "#8b5cf6"],
            ["블록 수", data.mainnetStats.blocksTotal, "var(--text-secondary)"],
            ["블록 타임", data.mainnetStats.blockTime, "#f59e0b"],
            ["가스 한도", data.mainnetStats.blockGasLimit, "var(--text-secondary)"],
            ["Bridged BTC", data.mainnetStats.bridgedBTC, "#ef4444"],
            ["Chain ID", data.mainnetStats.chainId, "var(--text-muted)"],
            ["₿apps", data.mainnetStats.apps, "#34d399"],
          ].map(([label, val, col]) => (
            <div key={label} style={{
              background: "var(--bg-secondary)", border: "1px solid var(--border)",
              borderRadius: 10, padding: "12px 14px",
            }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px" }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: col, marginTop: 4, fontFamily: "ui-monospace, Consolas, monospace", letterSpacing: "-0.3px" }}>
                {val}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============= 9. 기술 스택 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🛠️ 기술 스택 — zkEVM + BitVM2", "#8b5cf6")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
          {[
            ["타입", data.tech.type, "#8b5cf6"],
            ["Prover", data.tech.prover, "#3b82f6"],
            ["Data Availability", data.tech.da, "#f59e0b"],
            ["Bridge", data.tech.bridge, "#ef4444"],
            ["Finality", data.tech.finality, "#34d399"],
            ["Sequencer", data.tech.sequencer, "var(--text-secondary)"],
            ["Consensus", data.tech.consensus, "var(--text-secondary)"],
          ].map(([label, val, col]) => (
            <div key={label} style={{
              background: "var(--bg-secondary)", border: "1px solid var(--border)",
              borderLeft: `3px solid ${col}`,
              borderRadius: 8, padding: "12px 14px",
            }}>
              <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.45 }}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ============= 10. 프로젝트 타임라인 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("📅 프로젝트 타임라인 — 17개 마일스톤 (2024-02 → 2026-04)", "#f59e0b")}
        <div style={{
          background: "var(--bg-secondary)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "8px 0",
        }}>
          {data.timeline.map((t, i) => (
            <a key={t.date} href={t.url} target="_blank" rel="noopener noreferrer"
              className={`citrea-tl-row ${t.featured ? "citrea-mainnet-row" : ""}`}
              style={{
                display: "grid", gridTemplateColumns: "120px 30px 1fr",
                padding: "12px 20px", alignItems: "flex-start", gap: 12,
                borderBottom: i < data.timeline.length - 1 ? "1px dashed var(--border)" : "none",
                textDecoration: "none", color: "inherit",
                background: t.featured ? "linear-gradient(90deg, rgba(245,158,11,0.10) 0%, rgba(239,68,68,0.06) 100%)" : "transparent",
                transition: "background .15s",
              }}>
              <div style={{
                fontSize: 12, fontWeight: 800,
                color: t.featured ? "#f59e0b" : "var(--text-tertiary)",
                fontFamily: "ui-monospace, Consolas, monospace",
                paddingTop: 2,
              }}>{t.date}</div>
              <div style={{ paddingTop: 4 }}>
                <span className="citrea-tl-dot" style={{
                  display: "inline-block",
                  width: t.featured ? 12 : 8, height: t.featured ? 12 : 8,
                  borderRadius: "50%",
                  background: t.featured ? "#f59e0b" : "#3b82f6",
                  boxShadow: t.featured ? "0 0 12px 2px rgba(245,158,11,0.55)" : "none",
                }}/>
              </div>
              <div>
                <div style={{
                  fontSize: t.featured ? 16 : 14, fontWeight: 800,
                  color: t.featured ? "#f59e0b" : "var(--text-primary)",
                  letterSpacing: "-0.2px", lineHeight: 1.3,
                }}>{t.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-tertiary)", marginTop: 3, lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ============= 11. 로드맵 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🗺️ 로드맵 — 단기 / 중기 / 장기", "#3b82f6")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {[
            { phase: data.roadmap.shortTerm, color: "#34d399", icon: "🚀" },
            { phase: data.roadmap.midTerm, color: "#f59e0b", icon: "📈" },
            { phase: data.roadmap.longTerm, color: "#8b5cf6", icon: "🌌" },
          ].map(({ phase, color, icon }) => (
            <div key={phase.title} style={{
              background: `linear-gradient(180deg, ${color}10 0%, ${color}03 100%), var(--bg-secondary)`,
              border: `1px solid ${color}55`,
              borderTop: `3px solid ${color}`,
              borderRadius: 10, padding: "16px 18px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 22 }}>{icon}</span>
                <div style={{ fontSize: 14, fontWeight: 800, color: color, letterSpacing: "-0.2px" }}>{phase.title}</div>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {phase.items.map((item, i) => (
                  <li key={i} style={{
                    display: "flex", gap: 8, padding: "6px 0",
                    borderBottom: i < phase.items.length - 1 ? "1px dashed var(--border)" : "none",
                    fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5,
                  }}>
                    <span style={{ color: color, fontWeight: 800, flexShrink: 0 }}>▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ============= 12. 펀딩 + 백커 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("💰 펀딩 — $16.7M raised (Seed + Series A) · 백커 16명", "#34d399")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          {data.funding.rounds.map((r) => (
            <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
              className="citrea-card-hover"
              style={{
                background: "var(--bg-secondary)", border: "1px solid var(--border)",
                borderLeft: `4px solid ${r.name === "Series A" ? "#34d399" : "#3b82f6"}`,
                borderRadius: 10, padding: "16px 18px",
                textDecoration: "none", color: "inherit",
                transition: "transform .15s, border-color .15s",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>{r.name}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: r.name === "Series A" ? "#34d399" : "#3b82f6", fontFamily: "ui-monospace, Consolas, monospace" }}>
                  {r.amount}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)" }}>{r.date}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                <strong>Lead:</strong> {r.lead}
              </div>
            </a>
          ))}
        </div>
        <div style={{
          background: "var(--bg-secondary)", border: "1px solid var(--border)",
          borderRadius: 10, padding: "16px 18px",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 10 }}>
            16 백커 (Founders Fund · Galaxy + 14)
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.funding.investors.map((inv) => (
              <span key={inv} className="citrea-chip" style={{
                fontSize: 12, fontWeight: 700, color: "var(--text-secondary)",
                background: "var(--bg-primary)", border: "1px solid var(--border)",
                padding: "5px 11px", borderRadius: 5,
              }}>{inv}</span>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 10, fontStyle: "italic" }}>
            Valuation: {data.funding.valuation} · Next round: {data.funding.nextRound}
          </div>
        </div>
      </div>

      {/* ============= 13. 팀 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("👥 팀 4명 — Chainway Labs", "#8b5cf6")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
          {data.team.map((m) => (
            <div key={m.name} style={{
              background: "var(--bg-secondary)", border: "1px solid var(--border)",
              borderLeft: "3px solid #8b5cf6",
              borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4, letterSpacing: "-0.2px" }}>
                {m.name}
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#8b5cf6", marginBottom: 8 }}>{m.role}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: 8 }}>{m.background}</div>
              {(m.x || m.url) && (
                <div style={{ display: "flex", gap: 8, paddingTop: 8, borderTop: "1px dashed var(--border)" }}>
                  {m.x && extLink(m.x, "X")}
                  {m.url && extLink(m.url, "Site")}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ============= 14. 파트너십 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🤝 파트너십 — Tech / Bridges / Stablecoin / Signers", "#3b82f6")}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderLeft: "3px solid #ef4444", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>🔧 Tech Core</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.partners.techCore.map((p) => (
                <span key={p} style={{
                  fontSize: 12, fontWeight: 700, color: "#ef4444",
                  background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                  padding: "4px 10px", borderRadius: 4,
                }}>{p}</span>
              ))}
            </div>
          </div>
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderLeft: "3px solid #34d399", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#34d399", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>💵 Stablecoin (ctUSD)</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {data.partners.stablecoin.map((p) => (
                <span key={p} style={{
                  fontSize: 12, fontWeight: 700, color: "#34d399",
                  background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)",
                  padding: "4px 10px", borderRadius: 4,
                }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderLeft: "3px solid #3b82f6", borderRadius: 10, padding: "14px 16px", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>🌉 Bridges (6개)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.partners.bridges.map((p) => (
              <span key={p} style={{
                fontSize: 12, fontWeight: 700, color: "#3b82f6",
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
                padding: "4px 10px", borderRadius: 4,
              }}>{p}</span>
            ))}
          </div>
        </div>
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderLeft: "3px solid #f59e0b", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 }}>🔐 Clementine Signers (10개)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {data.partners.clementineSigners.map((p) => (
              <span key={p} style={{
                fontSize: 12, fontWeight: 700, color: "#f59e0b",
                background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
                padding: "4px 10px", borderRadius: 4,
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ============= 15. 경쟁사 비교 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🥊 경쟁사 비교 — BTC L2 5개", "#ef4444")}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2.4fr",
            padding: "12px 16px", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)",
            fontSize: 12, fontWeight: 700, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.8px",
          }}>
            <div>이름</div>
            <div style={{ textAlign: "right" }}>TVL</div>
            <div style={{ textAlign: "right" }}>시총</div>
            <div>메모</div>
          </div>
          {data.competitors.map((c, i) => (
            <div key={c.name} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 2.4fr",
              padding: "12px 16px", alignItems: "center",
              borderBottom: i < data.competitors.length - 1 ? "1px solid var(--border)" : "none",
              background: c.featured ? "linear-gradient(90deg, rgba(245,158,11,0.08) 0%, rgba(239,68,68,0.04) 100%)" : "transparent",
            }}>
              <div style={{
                fontSize: 14, fontWeight: 800,
                color: c.featured ? "#f59e0b" : "var(--text-primary)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                {c.featured && <span style={{ fontSize: 14 }}>★</span>}
                {c.name}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "right", fontFamily: "ui-monospace, Consolas, monospace" }}>{c.tvl}</div>
              <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "right", fontFamily: "ui-monospace, Consolas, monospace" }}>{c.mcap}</div>
              <div style={{ fontSize: 12, color: "var(--text-tertiary)", lineHeight: 1.45 }}>{c.note}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8, fontStyle: "italic" }}>
          출처: DeFiLlama (BTC L2 카테고리) · 2026-05-03 기준
        </div>
      </div>

      {/* ============= 16. 공식 채널 ============= */}
      <div style={{ marginBottom: 28 }}>
        {sectionTitle("🌐 공식 채널 — 한국 포함 8개", "#3b82f6")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {data.channels.map((ch) => {
            const isKorea = ch.type.startsWith("🇰🇷");
            return (
              <a key={ch.type} href={ch.url} target="_blank" rel="noopener noreferrer"
                className="citrea-card-hover"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                  padding: "12px 14px",
                  background: isKorea ? "linear-gradient(180deg, rgba(239,68,68,0.08) 0%, rgba(239,68,68,0.02) 100%), var(--bg-secondary)" : "var(--bg-secondary)",
                  border: isKorea ? "1px solid rgba(239,68,68,0.4)" : "1px solid var(--border)",
                  borderLeft: isKorea ? "3px solid #ef4444" : "3px solid #3b82f6",
                  borderRadius: 8, textDecoration: "none",
                  transition: "transform .15s, border-color .15s",
                }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: isKorea ? "#ef4444" : "#3b82f6", marginBottom: 2 }}>{ch.type}</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "ui-monospace, Consolas, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.label}</div>
                </div>
                <span style={{ color: isKorea ? "#ef4444" : "#3b82f6", fontSize: 14, flexShrink: 0 }}>↗</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ============= Footer ============= */}
      <div style={{ textAlign: "center", padding: "24px 0 0", borderTop: "1px solid var(--border)", marginTop: 8 }}>
        <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
          데이터 출처: docs.citrea.xyz · blog.citrea.xyz (17개 포스트) · DeFiLlama · GitHub · X · 3차 librarian 교차검증
          <br />
          본 정보는 투자 자문이 아니며, 에어드랍 보상은 공식 보장되지 않습니다 (Last verified: 2026-05-03)
        </div>
      </div>
    </div>
  );
}
