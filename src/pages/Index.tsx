import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "games" | "bonuses" | "payments" | "leaderboard" | "help";

const GAMES = [
  { id: 1,  name: "Neon Slots",                    category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🎰", players: 1842, bg: "from-purple-900/60 to-pink-900/60",   border: "border-pink-500/30",    provider: "NetEnt",    maxWin: "×5000",   tags: [] },
  { id: 2,  name: "Cyber Poker",                   category: "Покер",   rtp: "98.2%", badge: "new",  emoji: "🃏", players: 634,  bg: "from-cyan-900/60 to-blue-900/60",    border: "border-cyan-500/30",    provider: "Evolution", maxWin: "×200",    tags: [] },
  { id: 3,  name: "Dragon Crash",                  category: "Краш",    rtp: "97.0%", badge: "hot",  emoji: "🐉", players: 3210, bg: "from-orange-900/60 to-red-900/60",   border: "border-orange-500/30",  provider: "Spribe",    maxWin: "×∞",      tags: [] },
  { id: 4,  name: "Galaxy Roulette",               category: "Рулетка", rtp: "97.3%", badge: null,   emoji: "🌌", players: 521,  bg: "from-indigo-900/60 to-purple-900/60",border: "border-indigo-500/30",  provider: "Evolution", maxWin: "×36",     tags: [] },
  { id: 5,  name: "Gold Rush",                     category: "Слоты",   rtp: "95.8%", badge: null,   emoji: "⚡", players: 988,  bg: "from-yellow-900/60 to-amber-900/60", border: "border-yellow-500/30",  provider: "Pragmatic", maxWin: "×10000",  tags: ["Bonus Buy"] },
  { id: 6,  name: "Quantum Dice",                  category: "Кости",   rtp: "99.1%", badge: "new",  emoji: "🎲", players: 412,  bg: "from-green-900/60 to-teal-900/60",   border: "border-green-500/30",   provider: "BGaming",   maxWin: "×100",    tags: [] },
  { id: 7,  name: "Cyber Fruits",                  category: "Слоты",   rtp: "96.2%", badge: "hot",  emoji: "🍒", players: 2140, bg: "from-red-900/60 to-rose-900/60",     border: "border-red-500/30",     provider: "Pragmatic", maxWin: "×8000",   tags: [] },
  { id: 8,  name: "Fortune Tiger",                 category: "Слоты",   rtp: "96.8%", badge: "hot",  emoji: "🐯", players: 3850, bg: "from-orange-900/60 to-yellow-900/60",border: "border-orange-400/30",  provider: "PG Soft",   maxWin: "×2500",   tags: [] },
  { id: 9,  name: "Starlight Princess",            category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "⭐", players: 1620, bg: "from-pink-900/60 to-fuchsia-900/60", border: "border-pink-400/30",    provider: "Pragmatic", maxWin: "×5000",   tags: ["Bonus Buy"] },
  { id: 10, name: "Book of Dead",                  category: "Слоты",   rtp: "96.2%", badge: null,   emoji: "📖", players: 970,  bg: "from-amber-900/60 to-stone-900/60",  border: "border-amber-500/30",   provider: "Play'n GO", maxWin: "×5000",   tags: [] },
  { id: 11, name: "Sweet Bonanza",                 category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🍭", players: 2890, bg: "from-purple-900/60 to-violet-900/60",border: "border-violet-500/30",  provider: "Pragmatic", maxWin: "×21100",  tags: ["Bonus Buy", "Cluster"] },
  { id: 12, name: "Gates of Olympus",              category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "⚡", players: 4210, bg: "from-blue-900/60 to-indigo-900/60",  border: "border-blue-400/30",    provider: "Pragmatic", maxWin: "×15000",  tags: ["Bonus Buy", "Cluster"] },
  { id: 13, name: "Wolf Gold",                     category: "Слоты",   rtp: "96.0%", badge: null,   emoji: "🐺", players: 730,  bg: "from-slate-900/60 to-zinc-900/60",   border: "border-slate-500/30",   provider: "Pragmatic", maxWin: "×2500",   tags: ["Jackpot"] },
  { id: 14, name: "Aztec Magic",                   category: "Слоты",   rtp: "96.7%", badge: "new",  emoji: "🏺", players: 540,  bg: "from-emerald-900/60 to-green-900/60",border: "border-emerald-500/30", provider: "BGaming",   maxWin: "×3000",   tags: [] },
  { id: 15, name: "Money Train 4",                 category: "Слоты",   rtp: "96.0%", badge: "hot",  emoji: "🚂", players: 1760, bg: "from-red-900/60 to-orange-900/60",   border: "border-red-400/30",     provider: "Relax",     maxWin: "×100000", tags: ["Bonus Buy"] },
  { id: 16, name: "Dog House",                     category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "🐕", players: 820,  bg: "from-cyan-900/60 to-teal-900/60",    border: "border-teal-500/30",    provider: "Pragmatic", maxWin: "×7000",   tags: ["Bonus Buy"] },
  { id: 17, name: "Big Bass Bonanza",              category: "Слоты",   rtp: "96.7%", badge: "hot",  emoji: "🎣", players: 3120, bg: "from-blue-900/60 to-cyan-900/60",    border: "border-blue-500/30",    provider: "Pragmatic", maxWin: "×4000",   tags: ["Bonus Buy"] },
  { id: 18, name: "Dog House Megaways",            category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "🦴", players: 1450, bg: "from-yellow-900/60 to-lime-900/60",  border: "border-yellow-400/30",  provider: "Pragmatic", maxWin: "×12305",  tags: ["Megaways", "Bonus Buy"] },
  { id: 19, name: "Fruit Party 2",                 category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "🍉", players: 980,  bg: "from-green-900/60 to-emerald-900/60",border: "border-green-400/30",   provider: "Pragmatic", maxWin: "×5000",   tags: ["Cluster"] },
  { id: 20, name: "Wild West Gold",                category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🤠", players: 2670, bg: "from-amber-900/60 to-orange-900/60", border: "border-amber-400/30",   provider: "Pragmatic", maxWin: "×10000",  tags: ["Bonus Buy"] },
  { id: 21, name: "Joker's Jewels",               category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "💍", players: 610,  bg: "from-rose-900/60 to-red-900/60",     border: "border-rose-500/30",    provider: "Pragmatic", maxWin: "×1000",   tags: [] },
  { id: 22, name: "Mustang Gold",                  category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "🐎", players: 890,  bg: "from-orange-900/60 to-red-900/60",   border: "border-orange-500/30",  provider: "Pragmatic", maxWin: "×10000",  tags: ["Jackpot"] },
  { id: 23, name: "Hot to Burn Extreme",           category: "Слоты",   rtp: "96.7%", badge: null,   emoji: "🔥", players: 540,  bg: "from-red-900/60 to-yellow-900/60",   border: "border-red-300/30",     provider: "Pragmatic", maxWin: "×500",    tags: [] },
  { id: 24, name: "Extra Juicy Megaways",          category: "Слоты",   rtp: "96.4%", badge: "new",  emoji: "🍊", players: 720,  bg: "from-orange-900/60 to-amber-900/60", border: "border-orange-300/30",  provider: "Pragmatic", maxWin: "×5000",   tags: ["Megaways"] },
  { id: 25, name: "Gems Bonanza",                  category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "💎", players: 1130, bg: "from-violet-900/60 to-purple-900/60",border: "border-violet-400/30",  provider: "Pragmatic", maxWin: "×10000",  tags: ["Cluster", "Bonus Buy"] },
  { id: 26, name: "Pirate Gold Deluxe",            category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "☠️", players: 480,  bg: "from-teal-900/60 to-cyan-900/60",    border: "border-teal-400/30",    provider: "Pragmatic", maxWin: "×6000",   tags: [] },
  { id: 27, name: "Starlight Princess 1000",       category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "🌸", players: 2150, bg: "from-fuchsia-900/60 to-pink-900/60", border: "border-fuchsia-400/30", provider: "Pragmatic", maxWin: "×25000",  tags: ["Bonus Buy"] },
  { id: 28, name: "Buffalo King Megaways",         category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🦬", players: 1870, bg: "from-stone-900/60 to-amber-900/60",  border: "border-stone-400/30",   provider: "Pragmatic", maxWin: "×11000",  tags: ["Megaways", "Bonus Buy"] },
  { id: 29, name: "Big Bass Splash",               category: "Слоты",   rtp: "96.7%", badge: "hot",  emoji: "🐟", players: 2340, bg: "from-blue-900/60 to-sky-900/60",     border: "border-sky-400/30",     provider: "Pragmatic", maxWin: "×5000",   tags: ["Bonus Buy"] },
  { id: 30, name: "Sugar Rush 1000",               category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "🍬", players: 1890, bg: "from-pink-900/60 to-purple-900/60",  border: "border-pink-300/30",    provider: "Pragmatic", maxWin: "×25000",  tags: ["Cluster", "Bonus Buy"] },
  { id: 31, name: "5 Lions Megaways",              category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🦁", players: 2110, bg: "from-yellow-900/60 to-orange-900/60",border: "border-yellow-300/30",  provider: "Pragmatic", maxWin: "×5000",   tags: ["Megaways", "Bonus Buy"] },
  { id: 32, name: "Aztec Blaze",                   category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "🦅", players: 810,  bg: "from-amber-900/60 to-red-900/60",    border: "border-amber-300/30",   provider: "Pragmatic", maxWin: "×5000",   tags: [] },
  { id: 33, name: "Cash Elevator",                 category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "🏙️", players: 770,  bg: "from-slate-900/60 to-blue-900/60",   border: "border-slate-300/30",   provider: "Pragmatic", maxWin: "×5000",   tags: ["Bonus Buy"] },
  { id: 34, name: "Bounty Gold",                   category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "💰", players: 1540, bg: "from-yellow-900/60 to-lime-900/60",  border: "border-yellow-500/30",  provider: "Pragmatic", maxWin: "×10000",  tags: ["Bonus Buy"] },
  { id: 35, name: "Eye of Cleopatra",              category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "👁️", players: 920,  bg: "from-amber-900/60 to-yellow-900/60", border: "border-amber-200/30",   provider: "Pragmatic", maxWin: "×10000",  tags: ["Bonus Buy"] },
  { id: 36, name: "Madame Destiny Megaways",       category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🔮", players: 1230, bg: "from-purple-900/60 to-pink-900/60",  border: "border-purple-300/30",  provider: "Pragmatic", maxWin: "×10000",  tags: ["Megaways", "Bonus Buy"] },
  { id: 37, name: "Curse Werewolf Megaways",       category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🐺", players: 980,  bg: "from-gray-900/60 to-purple-900/60",  border: "border-gray-300/30",    provider: "Pragmatic", maxWin: "×10000",  tags: ["Megaways"] },
  { id: 38, name: "Release the Kraken 2",          category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "🦑", players: 1430, bg: "from-teal-900/60 to-blue-900/60",    border: "border-teal-300/30",    provider: "Pragmatic", maxWin: "×10000",  tags: ["Bonus Buy"] },
  { id: 39, name: "Floating Dragon",               category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🐲", players: 1670, bg: "from-red-900/60 to-pink-900/60",     border: "border-red-300/30",     provider: "Pragmatic", maxWin: "×10000",  tags: ["Bonus Buy"] },
  { id: 40, name: "Magician's Secrets",           category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "🎩", players: 510,  bg: "from-violet-900/60 to-indigo-900/60",border: "border-violet-300/30",  provider: "Pragmatic", maxWin: "×10000",  tags: ["Bonus Buy"] },
  { id: 41, name: "3 Buzzing Wilds",               category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "🐝", players: 450,  bg: "from-yellow-900/60 to-amber-900/60", border: "border-yellow-600/30",  provider: "Pragmatic", maxWin: "×5000",   tags: [] },
  { id: 42, name: "John Hunter Aztec",             category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🗡️", players: 1050, bg: "from-emerald-900/60 to-amber-900/60",border: "border-emerald-300/30", provider: "Pragmatic", maxWin: "×5000",   tags: ["Bonus Buy"] },
  { id: 43, name: "Lucky Lightning",               category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "⚡", players: 750,  bg: "from-yellow-900/60 to-sky-900/60",   border: "border-yellow-200/30",  provider: "Pragmatic", maxWin: "×5000",   tags: [] },
  { id: 44, name: "Big Bass Keeping It Reel",      category: "Слоты",   rtp: "96.7%", badge: "new",  emoji: "🎣", players: 1180, bg: "from-cyan-900/60 to-blue-900/60",    border: "border-cyan-300/30",    provider: "Pragmatic", maxWin: "×5000",   tags: ["Bonus Buy"] },
  { id: 45, name: "Gates of Olympus 1000",         category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🏛️", players: 5120, bg: "from-indigo-900/60 to-blue-900/60",  border: "border-indigo-300/30",  provider: "Pragmatic", maxWin: "×25000",  tags: ["Cluster", "Bonus Buy"] },
  { id: 46, name: "Sweet Bonanza 1000",            category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🍯", players: 3840, bg: "from-purple-900/60 to-fuchsia-900/60",border:"border-purple-200/30",  provider: "Pragmatic", maxWin: "×25000",  tags: ["Cluster", "Bonus Buy"] },
  { id: 47, name: "Big Bass Christmas Bash",       category: "Слоты",   rtp: "96.7%", badge: null,   emoji: "🎅", players: 640,  bg: "from-red-900/60 to-green-900/60",    border: "border-red-200/30",     provider: "Pragmatic", maxWin: "×5000",   tags: ["Bonus Buy"] },
  { id: 48, name: "Wild Wild Riches Megaways",     category: "Слоты",   rtp: "96.5%", badge: null,   emoji: "🍀", players: 720,  bg: "from-green-900/60 to-teal-900/60",   border: "border-green-200/30",   provider: "Pragmatic", maxWin: "×5000",   tags: ["Megaways", "Bonus Buy"] },
  { id: 49, name: "Reel Banks",                    category: "Слоты",   rtp: "96.5%", badge: "new",  emoji: "🏦", players: 580,  bg: "from-slate-900/60 to-emerald-900/60",border: "border-slate-200/30",   provider: "Pragmatic", maxWin: "×5000",   tags: ["Bonus Buy"] },
  { id: 50, name: "Chilli Heat Megaways",          category: "Слоты",   rtp: "96.5%", badge: "hot",  emoji: "🌶️", players: 1310, bg: "from-red-900/60 to-orange-900/60",   border: "border-red-200/30",     provider: "Pragmatic", maxWin: "×5000",   tags: ["Megaways", "Bonus Buy"] },
];

const SLOT_SYMBOLS = ["🍒", "🍋", "🍇", "🔔", "⭐", "💎", "7️⃣", "🃏"];

const BONUSES = [
  { icon: "🎁", title: "Приветственный бонус", desc: "200% на первый депозит до 5 BTC", value: "+200%", color: "var(--neon-purple)", glow: "rgba(155,71,255,0.3)" },
  { icon: "🔄", title: "Бонус за перезагрузку", desc: "50% каждую пятницу до 1 ETH", value: "+50%", color: "var(--neon-cyan)", glow: "rgba(0,245,255,0.3)" },
  { icon: "⚡", title: "Кэшбэк", desc: "10% возврат каждую неделю", value: "10%", color: "var(--neon-gold)", glow: "rgba(255,215,0,0.3)" },
  { icon: "👑", title: "VIP Программа", desc: "Эксклюзивные бонусы для лояльных игроков", value: "VIP", color: "var(--neon-pink)", glow: "rgba(255,45,120,0.3)" },
  { icon: "🎯", title: "Фриспины", desc: "100 фриспинов за депозит от 0.01 BTC", value: "×100", color: "var(--neon-green)", glow: "rgba(0,255,136,0.3)" },
  { icon: "🏆", title: "Турнирный бонус", desc: "Призовой фонд $500,000 ежемесячно", value: "$500K", color: "var(--neon-gold)", glow: "rgba(255,215,0,0.3)" },
];

const CRYPTOS = [
  { symbol: "BTC", name: "Bitcoin", emoji: "₿", rate: "$67,420", color: "#F7931A", min: "0.001 BTC", max: "50 BTC", time: "~10 мин" },
  { symbol: "ETH", name: "Ethereum", emoji: "Ξ", rate: "$3,521", color: "#627EEA", min: "0.01 ETH", max: "500 ETH", time: "~2 мин" },
  { symbol: "USDT", name: "Tether", emoji: "₮", rate: "$1.00", color: "#26A17B", min: "10 USDT", max: "1,000,000 USDT", time: "~1 мин" },
  { symbol: "BNB", name: "BNB Chain", emoji: "◈", rate: "$412", color: "#F3BA2F", min: "0.05 BNB", max: "2,000 BNB", time: "~1 мин" },
  { symbol: "SOL", name: "Solana", emoji: "◎", rate: "$185", color: "#9945FF", min: "0.1 SOL", max: "10,000 SOL", time: "<30 сек" },
  { symbol: "TON", name: "Toncoin", emoji: "💎", rate: "$6.8", color: "#0088CC", min: "5 TON", max: "500,000 TON", time: "<1 мин" },
];

const LEADERS = [
  { rank: 1, name: "CryptoKing_88", amount: "$284,500", game: "Dragon Crash", avatar: "👑", badge: "🥇" },
  { rank: 2, name: "NeonRider", amount: "$156,200", game: "Neon Slots", avatar: "⚡", badge: "🥈" },
  { rank: 3, name: "GhostPlayer", amount: "$98,750", game: "Cyber Poker", avatar: "👻", badge: "🥉" },
  { rank: 4, name: "DiamondHands", amount: "$67,100", game: "Galaxy Roulette", avatar: "💎", badge: null },
  { rank: 5, name: "LuckyStrike_X", amount: "$54,800", game: "Gold Rush", avatar: "🍀", badge: null },
  { rank: 6, name: "SatoshiPro", amount: "$43,200", game: "Quantum Dice", avatar: "🚀", badge: null },
  { rank: 7, name: "NightOwl777", amount: "$38,900", game: "Dragon Crash", avatar: "🦉", badge: null },
  { rank: 8, name: "CyberWolf", amount: "$29,400", game: "Neon Slots", avatar: "🐺", badge: null },
];

const FAQ = [
  { q: "Как пополнить счёт криптовалютой?", a: "Перейдите в раздел «Платежи», выберите нужную криптовалюту и скопируйте адрес кошелька. Средства зачисляются автоматически после подтверждения транзакции." },
  { q: "Как долго выводятся средства?", a: "Вывод в криптовалюте происходит мгновенно — обычно в течение 1-30 минут в зависимости от выбранной сети и её загруженности." },
  { q: "Есть ли лимиты на вывод?", a: "Ежедневный лимит вывода: до 10 BTC или эквивалент. VIP-игроки получают повышенные лимиты без ограничений." },
  { q: "Как активировать приветственный бонус?", a: "Бонус начисляется автоматически после первого депозита. Никаких промокодов не требуется — просто пополните счёт и получите +200%." },
  { q: "Лицензия и безопасность?", a: "NeonBet работает по лицензии Curaçao eGaming. Все транзакции защищены шифрованием SSL 256-bit. Ваши данные в полной безопасности." },
];

const TICKER_WINS = [
  "CryptoKing_88 выиграл $12,400 в Dragon Crash",
  "NeonRider получил джекпот $8,200 в Neon Slots",
  "GhostPlayer сорвал куш $5,600 в Cyber Poker",
  "DiamondHands выиграл $3,100 в Galaxy Roulette",
  "LuckyStrike_X получил $9,800 в Gold Rush",
  "SatoshiPro выиграл $4,200 в Quantum Dice",
  "CyberWolf сорвал джекпот $15,000 в Dragon Crash",
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [selectedCrypto, setSelectedCrypto] = useState<string>("BTC");
  const [paymentTab, setPaymentTab] = useState<"deposit" | "withdraw">("deposit");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "games", label: "Игры", icon: "Gamepad2" },
    { id: "bonuses", label: "Бонусы", icon: "Gift" },
    { id: "payments", label: "Платежи", icon: "Wallet" },
    { id: "leaderboard", label: "Лидерборд", icon: "Trophy" },
    { id: "help", label: "Помощь", icon: "HelpCircle" },
  ];

  return (
    <div className="min-h-screen scrollbar-neon" style={{ background: "var(--bg-deep)" }}>
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-[120px]" style={{ background: "var(--neon-purple)" }} />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-8 blur-[100px]" style={{ background: "var(--neon-cyan)" }} />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-6 blur-[100px]" style={{ background: "var(--neon-pink)" }} />
        <div className="grid-bg absolute inset-0 opacity-30" />
      </div>

      {/* Live wins ticker */}
      <div className="relative z-10 overflow-hidden py-2" style={{ background: "linear-gradient(90deg, #1a0a2e, #0d0b1e, #1a0a2e)", borderBottom: "1px solid rgba(155,71,255,0.2)" }}>
        <div className="flex animate-ticker whitespace-nowrap">
          {[...TICKER_WINS, ...TICKER_WINS].map((win, i) => (
            <span key={i} className="mx-8 text-xs font-body flex items-center gap-2">
              <span className="neon-text-gold">🎉</span>
              <span style={{ color: "rgba(255,255,255,0.7)" }}>{win}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-20 sticky top-0" style={{ background: "rgba(6,5,15,0.9)", borderBottom: "1px solid rgba(155,71,255,0.2)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => setActiveSection("home")} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg animate-glow-pulse" style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))" }}>
                ⚡
              </div>
              <span className="font-display font-black text-lg gradient-text">NEONBET</span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                    activeSection === item.id ? "text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.08)]" : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={activeSection === item.id ? { textShadow: "0 0 10px rgba(0,245,255,0.6)" } : {}}
                >
                  <Icon name={item.icon} size={15} />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button className="btn-outline-neon hidden md:block text-sm py-2 px-4">Войти</button>
              <button className="btn-neon-purple text-sm py-2 px-4">Играть</button>
              <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "rgba(155,71,255,0.2)", background: "rgba(6,5,15,0.98)" }}>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-body transition-colors ${activeSection === item.id ? "text-[var(--neon-cyan)]" : "text-gray-400"}`}>
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activeSection === "home" && <HomeSection setActiveSection={setActiveSection} />}
        {activeSection === "games" && <GamesSection />}
        {activeSection === "bonuses" && <BonusesSection setActiveSection={setActiveSection} />}
        {activeSection === "payments" && (
          <PaymentsSection selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} paymentTab={paymentTab} setPaymentTab={setPaymentTab} />
        )}
        {activeSection === "leaderboard" && <LeaderboardSection />}
        {activeSection === "help" && <HelpSection openFaq={openFaq} setOpenFaq={setOpenFaq} />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-16 py-8" style={{ borderTop: "1px solid rgba(155,71,255,0.15)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-sm gradient-text">NEONBET</span>
            <span className="text-xs text-gray-600">• Лицензия Curaçao eGaming</span>
          </div>
          <div className="text-xs text-gray-600 font-body">18+ | Играйте ответственно | © 2024 NeonBet</div>
          <div className="flex gap-4 text-xs text-gray-600 font-body">
            <span className="cursor-pointer hover:text-gray-400 transition-colors">Конфиденциальность</span>
            <span className="cursor-pointer hover:text-gray-400 transition-colors">Условия</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── HOME ── */
function HomeSection({ setActiveSection }: { setActiveSection: (s: Section) => void }) {
  return (
    <div className="space-y-16 animate-fade-in">
      <div className="relative text-center py-16 md:py-24">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]" style={{ background: "radial-gradient(circle, var(--neon-purple), var(--neon-cyan))" }} />
        </div>
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-display font-semibold" style={{ background: "rgba(155,71,255,0.1)", border: "1px solid rgba(155,71,255,0.3)", color: "var(--neon-purple)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse-neon" style={{ background: "var(--neon-green)" }} />
            3,210 игроков онлайн прямо сейчас
          </div>
          <h1 className="font-display font-black text-4xl md:text-7xl leading-tight mb-6">
            <span className="gradient-text">ИГРАЙ</span>
            <span className="text-white"> В </span>
            <span className="neon-text-cyan">БУДУЩЕМ</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Премиум криптоказино нового поколения. Мгновенные выплаты, честные игры, neon-атмосфера.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setActiveSection("games")} className="btn-neon-cyan text-base py-4 px-8">🎮 Начать играть</button>
            <button onClick={() => setActiveSection("bonuses")} className="btn-outline-neon text-base py-4 px-8">🎁 Получить бонус</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Выплачено выигрышей", value: "$284M+", icon: "💰", color: "var(--neon-gold)" },
          { label: "Активных игроков", value: "50K+", icon: "👥", color: "var(--neon-cyan)" },
          { label: "Игр в каталоге", value: "3,500+", icon: "🎮", color: "var(--neon-purple)" },
          { label: "Мин. вывод", value: "0.001 BTC", icon: "⚡", color: "var(--neon-green)" },
        ].map((stat, i) => (
          <div key={i} className="card-neon p-6 text-center">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="font-display font-black text-2xl md:text-3xl mb-1" style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}40` }}>{stat.value}</div>
            <div className="font-body text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl md:text-2xl text-white">🔥 Популярные игры</h2>
          <button onClick={() => setActiveSection("games")} className="text-sm font-body flex items-center gap-1" style={{ color: "var(--neon-cyan)" }}>
            Все игры <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GAMES.slice(0, 3).map((game) => <GameCard key={game.id} game={game} large />)}
        </div>
      </div>

      <div className="card-neon p-8 relative overflow-hidden" style={{ borderColor: "rgba(0,245,255,0.3)" }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10" style={{ background: "var(--neon-cyan)" }} />
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="badge-new inline-block mb-3">CRYPTO FIRST</div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-3">Мгновенные крипто-выплаты</h3>
            <p className="font-body text-gray-400 mb-5">BTC, ETH, USDT, BNB, SOL, TON — 6 криптовалют без комиссии. Вывод за 30 секунд.</p>
            <div className="flex gap-2 flex-wrap">
              {["₿ BTC", "Ξ ETH", "₮ USDT", "◈ BNB", "◎ SOL", "💎 TON"].map((c) => (
                <span key={c} className="px-3 py-1 rounded-full text-xs font-display font-semibold" style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.3)", color: "var(--neon-cyan)" }}>{c}</span>
              ))}
            </div>
          </div>
          <button onClick={() => setActiveSection("payments")} className="btn-neon-cyan whitespace-nowrap">Пополнить счёт</button>
        </div>
      </div>
    </div>
  );
}

/* ── GAMES ── */
function GamesSection() {
  const [filter, setFilter] = useState("Все");
  const [providerFilter, setProviderFilter] = useState("Все");
  const [tagFilter, setTagFilter] = useState("Все");
  const [search, setSearch] = useState("");
  const [slotOpen, setSlotOpen] = useState<number | null>(null);
  const categories = ["Все", "Слоты", "Покер", "Рулетка", "Краш", "Кости"];
  const filtered = filter === "Все" ? GAMES : GAMES.filter(g => g.category === filter);
  const allSlots = GAMES.filter(g => g.category === "Слоты");
  const providers = ["Все", "Pragmatic", "PG Soft", "NetEnt", "Play'n GO", "Relax", "BGaming"];
  const featureTags = ["Все", "Megaways", "Bonus Buy", "Cluster", "Jackpot"];
  const slots = allSlots
    .filter(g => providerFilter === "Все" || g.provider === providerFilter)
    .filter(g => tagFilter === "Все" || g.tags.includes(tagFilter))
    .filter(g => !search || g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-2">🎮 Игры</h2>
        <p className="font-body text-gray-500">3,500+ игр от ведущих провайдеров</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button key={cat} onClick={() => { setFilter(cat); setProviderFilter("Все"); }}
            className={`px-4 py-2 rounded-full text-sm font-display font-semibold transition-all duration-200 ${filter === cat ? "text-[var(--bg-deep)]" : "text-gray-400 hover:text-white"}`}
            style={filter === cat
              ? { background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))", boxShadow: "0 0 20px rgba(155,71,255,0.4)" }
              : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Slots spotlight section */}
      {(filter === "Все" || filter === "Слоты") && (
        <div className="mb-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <span className="text-2xl">🎰</span>
            <h3 className="font-display font-bold text-xl text-white">Слоты</h3>
            <span className="badge-hot ml-1">POPULAR</span>
            <span className="font-body text-xs text-gray-500 ml-auto">{slots.length} из {allSlots.length} слотов</span>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск слота..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl font-body text-sm text-white outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>

          {/* Provider filter */}
          <div className="flex gap-2 flex-wrap mb-3">
            {providers.map((p) => {
              const isPragmatic = p === "Pragmatic";
              const isActive = providerFilter === p;
              return (
                <button key={p} onClick={() => setProviderFilter(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all duration-200"
                  style={isActive
                    ? { background: isPragmatic ? "linear-gradient(135deg, #ff6b35, #ff2d78)" : "rgba(155,71,255,0.3)", color: "white", border: isPragmatic ? "1px solid rgba(255,107,53,0.6)" : "1px solid rgba(155,71,255,0.5)", boxShadow: isPragmatic ? "0 0 15px rgba(255,107,53,0.4)" : "0 0 15px rgba(155,71,255,0.3)" }
                    : { background: "rgba(255,255,255,0.04)", color: isPragmatic ? "#ff8c5a" : "#9ca3af", border: isPragmatic ? "1px solid rgba(255,107,53,0.25)" : "1px solid rgba(255,255,255,0.08)" }
                  }>
                  {isPragmatic ? "🔥 " : ""}{p}
                </button>
              );
            })}
          </div>

          {/* Feature tag filter */}
          <div className="flex gap-2 flex-wrap mb-5">
            {featureTags.map((tag) => {
              const tagColors: Record<string, string> = { "Megaways": "#a855f7", "Bonus Buy": "#f59e0b", "Cluster": "#06b6d4", "Jackpot": "#ffd700" };
              const isActive = tagFilter === tag;
              const color = tagColors[tag] || "#9ca3af";
              return (
                <button key={tag} onClick={() => setTagFilter(tag)}
                  className="px-3 py-1 rounded-full text-xs font-display font-semibold transition-all duration-200"
                  style={isActive
                    ? { background: tag === "Все" ? "rgba(255,255,255,0.15)" : `${color}30`, color: tag === "Все" ? "white" : color, border: `1px solid ${tag === "Все" ? "rgba(255,255,255,0.3)" : `${color}60`}`, boxShadow: `0 0 10px ${color}30` }
                    : { background: "rgba(255,255,255,0.03)", color: tag === "Все" ? "#6b7280" : `${color}99`, border: `1px solid rgba(255,255,255,0.06)` }
                  }>
                  {tag === "Megaways" && "⚡ "}
                  {tag === "Bonus Buy" && "💸 "}
                  {tag === "Cluster" && "🔵 "}
                  {tag === "Jackpot" && "👑 "}
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Pragmatic spotlight banner */}
          {providerFilter === "Pragmatic" && (
            <div className="mb-5 p-4 rounded-xl" style={{ background: "linear-gradient(135deg, rgba(255,107,53,0.12), rgba(255,45,120,0.08))", border: "1px solid rgba(255,107,53,0.3)" }}>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="text-3xl">🔥</div>
                <div className="flex-1">
                  <div className="font-display font-bold text-sm text-white">Pragmatic Play — официальный провайдер</div>
                  <div className="font-body text-xs text-gray-400 mt-0.5">{allSlots.filter(g => g.provider === "Pragmatic").length} слотов · RTP 95.8%–96.8% · Megaways, Bonus Buy, Cluster</div>
                </div>
                <div className="flex gap-5 text-center">
                  {[["×25000", "Макс. выигрыш"], ["96.5%", "Средний RTP"], ["Bonus Buy", "Фишки"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <div className="font-display font-black text-sm" style={{ color: "#ff6b35" }}>{val}</div>
                      <div className="font-body text-xs text-gray-500">{lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {slots.length === 0 ? (
            <div className="text-center py-16 text-gray-600 font-body">Ничего не найдено 🤷</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {slots.map((game) => (
                <SlotCard key={game.id} game={game} onPlay={() => setSlotOpen(game.id)} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Other games */}
      {filter !== "Слоты" && (
        <>
          {filter === "Все" && (
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">🃏</span>
              <h3 className="font-display font-bold text-xl text-white">Другие игры</h3>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.filter(g => g.category !== "Слоты").map((game) => (
              <GameCard key={game.id} game={game} large />
            ))}
          </div>
        </>
      )}

      {/* Slot simulator modal */}
      {slotOpen !== null && (
        <SlotSimulator
          game={GAMES.find(g => g.id === slotOpen)!}
          onClose={() => setSlotOpen(null)}
        />
      )}
    </div>
  );
}

/* ── SLOT CARD ── */
const TAG_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  "Megaways":   { bg: "rgba(168,85,247,0.25)",  color: "#c084fc", label: "⚡ Megaways" },
  "Bonus Buy":  { bg: "rgba(245,158,11,0.25)",  color: "#fbbf24", label: "💸 Bonus Buy" },
  "Cluster":    { bg: "rgba(6,182,212,0.25)",   color: "#22d3ee", label: "🔵 Cluster" },
  "Jackpot":    { bg: "rgba(255,215,0,0.25)",   color: "#ffd700", label: "👑 Jackpot" },
};

function SlotCard({ game, onPlay }: { game: typeof GAMES[0]; onPlay: () => void }) {
  return (
    <div className={`card-neon overflow-hidden group cursor-pointer relative`} style={{ borderColor: game.border.replace("border-","").replace("/30","") }}>
      {/* Thumbnail */}
      <div className={`h-32 bg-gradient-to-br ${game.bg} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: "radial-gradient(circle at center, rgba(155,71,255,0.3), transparent)" }} />
        <span className="text-5xl group-hover:scale-125 transition-transform duration-300 relative z-10">{game.emoji}</span>

        {/* Badge top-left */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {game.badge === "hot" && <span className="badge-hot">HOT</span>}
          {game.badge === "new" && <span className="badge-new">NEW</span>}
        </div>

        {/* Max win top-right */}
        <div className="absolute top-2 right-2">
          <span className="font-display font-black text-xs neon-text-gold">{game.maxWin}</span>
        </div>

        {/* Hover overlay: play buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200" style={{ background: "rgba(6,5,15,0.75)", backdropFilter: "blur(4px)" }}>
          <button onClick={onPlay}
            className="px-5 py-2 rounded-lg font-display font-bold text-xs text-white w-4/5"
            style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))", boxShadow: "0 0 20px rgba(155,71,255,0.6)" }}>
            ▶ Демо
          </button>
          <button className="px-5 py-1.5 rounded-lg font-display font-bold text-xs w-4/5"
            style={{ background: "rgba(255,215,0,0.15)", color: "var(--neon-gold)", border: "1px solid rgba(255,215,0,0.3)" }}>
            💰 На деньги
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-display font-bold text-xs text-white leading-tight mb-2 line-clamp-2">{game.name}</h3>

        {/* Tags */}
        {game.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {game.tags.slice(0, 2).map(tag => {
              const s = TAG_STYLES[tag];
              return s ? (
                <span key={tag} className="text-[10px] font-display font-semibold px-1.5 py-0.5 rounded"
                  style={{ background: s.bg, color: s.color }}>
                  {s.label}
                </span>
              ) : null;
            })}
          </div>
        )}

        <div className="flex items-center justify-between text-xs font-body">
          <span className="neon-text-green font-semibold">{game.rtp}</span>
          <span className="text-gray-600">{game.provider}</span>
        </div>

        {/* Players online */}
        <div className="flex items-center gap-1 mt-1.5">
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--neon-green)" }} />
          <span className="font-body text-xs text-gray-600">{game.players.toLocaleString()} онлайн</span>
        </div>
      </div>
    </div>
  );
}

/* ── SLOT SIMULATOR ── */
function SlotSimulator({ game, onClose }: { game: typeof GAMES[0]; onClose: () => void }) {
  const [reels, setReels] = useState<string[][]>([
    ["🍒", "🍋", "💎"],
    ["🔔", "⭐", "🍒"],
    ["💎", "7️⃣", "🍇"],
  ]);
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(10);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [spinCount, setSpinCount] = useState(0);

  const spin = () => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    setLastWin(null);
    setBalance(b => b - bet);

    let ticks = 0;
    const interval = setInterval(() => {
      setReels([
        [SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]],
        [SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]],
        [SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]],
      ]);
      ticks++;
      if (ticks >= 12) {
        clearInterval(interval);
        const finalReels: string[][] = [
          [SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]],
          [SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]],
          [SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)], SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)]],
        ];
        // Occasionally force a win for fun
        const newCount = spinCount + 1;
        setSpinCount(newCount);
        if (newCount % 4 === 0) {
          const sym = SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];
          finalReels[0][1] = sym;
          finalReels[1][1] = sym;
          finalReels[2][1] = sym;
        }
        setReels(finalReels);
        const mid = [finalReels[0][1], finalReels[1][1], finalReels[2][1]];
        if (mid[0] === mid[1] && mid[1] === mid[2]) {
          const multipliers: Record<string, number> = { "💎": 50, "7️⃣": 30, "⭐": 20, "🔔": 15, "🍇": 10, "🍋": 8, "🍒": 5, "🃏": 3 };
          const win = bet * (multipliers[mid[0]] || 5);
          setLastWin(win);
          setBalance(b => b + win);
        }
        setSpinning(false);
      }
    }, 80);
  };

  const isWin = lastWin !== null && lastWin > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)" }}>
      <div className="w-full max-w-md rounded-2xl overflow-hidden" style={{ background: "var(--bg-card2)", border: "1px solid rgba(155,71,255,0.4)", boxShadow: "0 0 60px rgba(155,71,255,0.3)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ background: "rgba(155,71,255,0.1)", borderBottom: "1px solid rgba(155,71,255,0.2)" }}>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{game.emoji}</span>
            <div>
              <div className="font-display font-bold text-sm text-white">{game.name}</div>
              <div className="font-body text-xs text-gray-500">{game.provider} · RTP {game.rtp}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Reels */}
          <div className="relative rounded-xl overflow-hidden mb-4" style={{ background: "rgba(0,0,0,0.5)", border: "2px solid rgba(155,71,255,0.3)" }}>
            {isWin && (
              <div className="absolute inset-0 pointer-events-none animate-pulse-neon" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.1), rgba(155,71,255,0.1))" }} />
            )}
            <div className="grid grid-cols-3 gap-1 p-4">
              {reels.map((reel, ri) => (
                <div key={ri} className="flex flex-col gap-1">
                  {reel.map((sym, si) => (
                    <div key={si} className={`h-16 rounded-lg flex items-center justify-center text-3xl transition-all duration-75 ${si === 1 ? "ring-1" : ""} ${spinning ? "opacity-70" : ""}`}
                      style={si === 1 ? { background: "rgba(155,71,255,0.15)", ringColor: "rgba(155,71,255,0.5)" } : { background: "rgba(255,255,255,0.03)" }}>
                      {sym}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Payline indicator */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)" }} />
          </div>

          {/* Win message */}
          {isWin && (
            <div className="text-center mb-4 p-3 rounded-xl animate-scale-in" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)" }}>
              <div className="font-display font-black text-2xl neon-text-gold">🎉 ВЫИГРЫШ!</div>
              <div className="font-display font-bold text-xl text-white">+{lastWin} монет</div>
            </div>
          )}
          {lastWin === 0 && (
            <div className="text-center mb-4 p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
              <div className="font-body text-sm text-gray-500">Не повезло, попробуй ещё раз!</div>
            </div>
          )}

          {/* Balance & Bet */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl text-center" style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.15)" }}>
              <div className="font-body text-xs text-gray-500 mb-1">Баланс</div>
              <div className="font-display font-black text-lg neon-text-cyan">{balance}</div>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.15)" }}>
              <div className="font-body text-xs text-gray-500 mb-1">Ставка</div>
              <div className="flex items-center justify-center gap-2">
                <button onClick={() => setBet(b => Math.max(5, b - 5))} className="text-gray-400 hover:text-white w-5 h-5 font-bold">−</button>
                <span className="font-display font-black text-lg neon-text-gold">{bet}</span>
                <button onClick={() => setBet(b => Math.min(balance, b + 5))} className="text-gray-400 hover:text-white w-5 h-5 font-bold">+</button>
              </div>
            </div>
          </div>

          {/* Spin button */}
          <button
            onClick={spin}
            disabled={spinning || balance < bet}
            className="w-full py-4 rounded-xl font-display font-black text-lg text-white transition-all duration-200 disabled:opacity-50"
            style={{ background: spinning ? "rgba(155,71,255,0.4)" : "linear-gradient(135deg, #7b2ff7, #00f5ff)", boxShadow: spinning ? "none" : "0 0 30px rgba(155,71,255,0.5)" }}
          >
            {spinning ? "⟳ КРУТИТСЯ..." : "⚡ КРУТИТЬ"}
          </button>

          <p className="text-center font-body text-xs text-gray-600 mt-3">Демо-режим · Виртуальные монеты</p>
        </div>
      </div>
    </div>
  );
}

/* ── GAME CARD ── */
function GameCard({ game, large = false }: { game: typeof GAMES[0]; large?: boolean }) {
  return (
    <div className={`card-neon overflow-hidden group cursor-pointer ${game.border}`}>
      <div className={`${large ? "h-44" : "h-32"} bg-gradient-to-br ${game.bg} flex items-center justify-center relative`}>
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{game.emoji}</span>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        {game.badge && (
          <div className="absolute top-3 right-3">
            {game.badge === "hot" ? <span className="badge-hot">HOT</span> : <span className="badge-new">NEW</span>}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display font-bold text-sm text-white">{game.name}</h3>
          <span className="text-xs font-body text-gray-500">{game.category}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-body neon-text-green">RTP {game.rtp}</span>
          <span className="text-xs font-body text-gray-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--neon-green)" }} />
            {game.players.toLocaleString()}
          </span>
        </div>
        <button className="w-full mt-3 py-2 rounded-lg text-xs font-display font-semibold text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
          style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))" }}>
          Играть сейчас
        </button>
      </div>
    </div>
  );
}

/* ── BONUSES ── */
function BonusesSection({ setActiveSection }: { setActiveSection: (s: Section) => void }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-2">🎁 Бонусы</h2>
        <p className="font-body text-gray-500">Эксклюзивные предложения для новых и постоянных игроков</p>
      </div>

      <div className="relative rounded-2xl overflow-hidden mb-8 p-8 md:p-12" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d1a3a 50%, #0a1a0d 100%)", border: "1px solid rgba(155,71,255,0.4)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-[100px] opacity-20" style={{ background: "var(--neon-purple)" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-[100px] opacity-15" style={{ background: "var(--neon-cyan)" }} />
        </div>
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="text-7xl md:text-9xl animate-float">🎰</div>
          <div className="flex-1 text-center md:text-left">
            <div className="badge-hot inline-block mb-3">ТОП БОНУС</div>
            <h3 className="font-display font-black text-4xl md:text-5xl text-white mb-3"><span className="gradient-text">+200%</span></h3>
            <p className="font-body text-gray-300 text-lg mb-2">на первый депозит до <span className="neon-text-gold font-semibold">5 BTC</span></p>
            <p className="font-body text-gray-500 text-sm mb-6">+ 100 фриспинов в Neon Slots. Без сложных условий отыгрыша.</p>
            <button onClick={() => setActiveSection("payments")} className="btn-neon-purple px-8 py-3 text-base">Получить бонус</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {BONUSES.map((bonus, i) => (
          <div key={i} className="card-neon p-6 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{bonus.icon}</div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-sm text-white mb-1">{bonus.title}</h4>
                <p className="font-body text-xs text-gray-500">{bonus.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-2xl" style={{ color: bonus.color, textShadow: `0 0 15px ${bonus.glow}` }}>{bonus.value}</span>
              <button className="text-xs font-display font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{ background: `${bonus.glow.replace("0.3", "0.1")}`, color: bonus.color, border: `1px solid ${bonus.glow.replace("0.3", "0.3")}` }}>
                Активировать
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── PAYMENTS ── */
function PaymentsSection({ selectedCrypto, setSelectedCrypto, paymentTab, setPaymentTab }: {
  selectedCrypto: string; setSelectedCrypto: (s: string) => void;
  paymentTab: "deposit" | "withdraw"; setPaymentTab: (t: "deposit" | "withdraw") => void;
}) {
  const crypto = CRYPTOS.find(c => c.symbol === selectedCrypto)!;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-2">💳 Платежи</h2>
        <p className="font-body text-gray-500">Мгновенное пополнение и вывод в криптовалюте</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-sm text-gray-400 uppercase tracking-wider mb-4">Выберите валюту</h3>
          {CRYPTOS.map((c) => (
            <button key={c.symbol} onClick={() => setSelectedCrypto(c.symbol)}
              className="w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-left"
              style={selectedCrypto === c.symbol
                ? { background: `${c.color}15`, border: `1px solid ${c.color}60`, boxShadow: `0 0 20px ${c.color}20` }
                : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: `${c.color}25`, color: c.color }}>{c.emoji}</div>
              <div className="flex-1">
                <div className="font-display font-bold text-sm text-white">{c.symbol}</div>
                <div className="font-body text-xs text-gray-500">{c.name}</div>
              </div>
              <div className="text-right">
                <div className="font-body text-sm font-semibold" style={{ color: c.color }}>{c.rate}</div>
                <div className="font-body text-xs text-gray-600">{c.time}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="md:col-span-2">
          <div className="card-neon p-6 md:p-8" style={{ borderColor: `${crypto.color}30` }}>
            <div className="flex rounded-xl p-1 mb-8" style={{ background: "rgba(255,255,255,0.05)" }}>
              {(["deposit", "withdraw"] as const).map((tab) => (
                <button key={tab} onClick={() => setPaymentTab(tab)}
                  className={`flex-1 py-3 rounded-lg font-display font-bold text-sm transition-all duration-200 ${paymentTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"}`}
                  style={paymentTab === tab ? { background: `linear-gradient(135deg, ${crypto.color}aa, ${crypto.color}66)`, boxShadow: `0 0 20px ${crypto.color}40` } : {}}>
                  {tab === "deposit" ? "⬇️ Пополнение" : "⬆️ Вывод"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl mb-6" style={{ background: `${crypto.color}10`, border: `1px solid ${crypto.color}25` }}>
              <div className="text-4xl">{crypto.emoji}</div>
              <div>
                <div className="font-display font-black text-xl" style={{ color: crypto.color }}>{crypto.name}</div>
                <div className="font-body text-sm text-gray-400">Курс: <span className="text-white font-semibold">{crypto.rate}</span> · Время: <span className="text-white font-semibold">{crypto.time}</span></div>
              </div>
            </div>

            {paymentTab === "deposit" ? (
              <div className="space-y-5">
                <div>
                  <label className="block font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wider">Адрес кошелька</label>
                  <div className="flex gap-2">
                    <div className="flex-1 p-4 rounded-xl font-body text-sm text-gray-400 truncate" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "monospace" }}>
                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </div>
                    <button className="px-4 rounded-xl font-display font-bold text-xs" style={{ background: `${crypto.color}20`, color: crypto.color, border: `1px solid ${crypto.color}40` }}>
                      Копировать
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wider">Сумма ({selectedCrypto})</label>
                  <input type="number" placeholder={`Мин. ${crypto.min}`} className="w-full p-4 rounded-xl font-body text-white text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 font-body">
                  {[["Мин.", crypto.min], ["Макс.", crypto.max], ["Комиссия", "0%"]].map(([label, val]) => (
                    <div key={label} className="p-3 rounded-lg text-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="text-white font-semibold mb-0.5">{label}</div>
                      <div className={val === "0%" ? "neon-text-green" : ""}>{val}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 rounded-xl font-display font-black text-base text-white"
                  style={{ background: `linear-gradient(135deg, ${crypto.color}cc, ${crypto.color}88)`, boxShadow: `0 0 30px ${crypto.color}40` }}>
                  ⬇️ Пополнить счёт
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wider">Ваш адрес {selectedCrypto}</label>
                  <input type="text" placeholder="Введите адрес кошелька" className="w-full p-4 rounded-xl font-body text-white text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "monospace" }} />
                </div>
                <div>
                  <label className="block font-display font-semibold text-xs text-gray-400 mb-2 uppercase tracking-wider">Сумма ({selectedCrypto})</label>
                  <input type="number" placeholder={`Мин. ${crypto.min}`} className="w-full p-4 rounded-xl font-body text-white text-sm outline-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} />
                </div>
                <button className="w-full py-4 rounded-xl font-display font-black text-base text-white"
                  style={{ background: `linear-gradient(135deg, ${crypto.color}cc, ${crypto.color}88)`, boxShadow: `0 0 30px ${crypto.color}40` }}>
                  ⬆️ Вывести средства
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── LEADERBOARD ── */
function LeaderboardSection() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-2">🏆 Лидерборд</h2>
        <p className="font-body text-gray-500">Топ игроков этого месяца</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 items-end">
        {[LEADERS[1], LEADERS[0], LEADERS[2]].map((leader, idx) => {
          const heights = ["h-32", "h-44", "h-28"];
          const colors = ["#C0C0C0", "#FFD700", "#CD7F32"];
          return (
            <div key={leader.rank} className={`card-neon flex flex-col items-center justify-end p-4 ${heights[idx]} text-center`}
              style={{ borderColor: `${colors[idx]}40`, boxShadow: leader.rank === 1 ? `0 0 40px ${colors[idx]}30` : undefined }}>
              <div className="text-3xl mb-1">{leader.badge || leader.avatar}</div>
              <div className="font-display font-bold text-xs text-white truncate w-full text-center">{leader.name}</div>
              <div className="font-display font-black text-sm mt-1" style={{ color: colors[idx] }}>{leader.amount}</div>
            </div>
          );
        })}
      </div>

      <div className="card-neon overflow-hidden">
        <div className="grid grid-cols-4 px-6 py-3 text-xs font-display font-semibold text-gray-500 uppercase tracking-wider" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span>#</span><span>Игрок</span><span className="text-center">Игра</span><span className="text-right">Выигрыш</span>
        </div>
        {LEADERS.map((leader, i) => (
          <div key={leader.rank} className="grid grid-cols-4 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
            style={{ borderBottom: i < LEADERS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <div className="font-display font-black text-lg" style={{ color: leader.rank <= 3 ? ["#FFD700","#C0C0C0","#CD7F32"][leader.rank-1] : "rgba(255,255,255,0.2)" }}>
              {leader.badge || `#${leader.rank}`}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{leader.avatar}</span>
              <span className="font-body font-medium text-sm text-white">{leader.name}</span>
            </div>
            <div className="font-body text-xs text-gray-500 text-center">{leader.game}</div>
            <div className="font-display font-bold text-sm text-right neon-text-green">{leader.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── HELP ── */
function HelpSection({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (n: number | null) => void }) {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-2">❓ Помощь</h2>
        <p className="font-body text-gray-500">Ответы на частые вопросы и поддержка</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { icon: "💬", title: "Live чат", desc: "Онлайн 24/7 · Ответ за 1 мин", color: "var(--neon-cyan)", glow: "rgba(0,245,255,0.2)" },
          { icon: "📧", title: "Email", desc: "support@neonbet.io · До 1 часа", color: "var(--neon-purple)", glow: "rgba(155,71,255,0.2)" },
          { icon: "📱", title: "Telegram", desc: "@NeonBetSupport · Быстро", color: "var(--neon-green)", glow: "rgba(0,255,136,0.2)" },
        ].map((channel, i) => (
          <div key={i} className="card-neon p-6 text-center cursor-pointer hover:scale-105 transition-transform duration-200">
            <div className="text-4xl mb-3">{channel.icon}</div>
            <h3 className="font-display font-bold text-sm text-white mb-1">{channel.title}</h3>
            <p className="font-body text-xs text-gray-500">{channel.desc}</p>
            <button className="mt-4 px-4 py-2 rounded-lg text-xs font-display font-semibold"
              style={{ background: channel.glow, color: channel.color, border: `1px solid ${channel.glow.replace("0.2","0.4")}` }}>
              Написать
            </button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-display font-bold text-xl text-white mb-5">Частые вопросы</h3>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <div key={i} className="card-neon overflow-hidden" style={{ borderColor: openFaq === i ? "rgba(155,71,255,0.4)" : "rgba(155,71,255,0.1)" }}>
              <button className="w-full flex items-center justify-between p-5 text-left" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-body font-medium text-sm text-white pr-4">{item.q}</span>
                <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={18} className="flex-shrink-0 text-gray-500" />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="font-body text-sm text-gray-400 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}