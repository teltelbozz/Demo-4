import React, { useEffect, useMemo, useState } from 'react';
import { loadSeed, loadState, saveState } from './lib/state.js';
import { Btn } from './components/Primitives.jsx';
import UserPick from './screens/UserPick.jsx';
import Home from './screens/Home.jsx';
import Search from './screens/Search.jsx';
import RosteredSlots from './screens/Slots.jsx';
import Tickets from './screens/Tickets.jsx';

const screens = { USER_PICK:'USER_PICK', HOME:'HOME', SEARCH:'SEARCH', SLOTS:'SLOTS', TICKETS:'TICKETS' };

export default function Demo4App() {
  const [seed, setSeed] = useState(null);
  const [app, setApp] = useState(() => loadState({
    screen: screens.USER_PICK,
    userId: null,
    search: { date: '', area: '' },
    tickets: [],
    rosters: {}
  }));

  useEffect(() => { loadSeed().then(setSeed); }, []);
  useEffect(() => { saveState(app); }, [app]);

  // 初期rosterの用意
  useEffect(() => {
    if (!seed) return;
    setApp(s => {
      if (s.rosters && Object.keys(s.rosters).length) return s;
      const next = { ...s, rosters: {} };
      seed.slots.forEach(slot => {
        const p = Array.isArray(slot.participants) ? [...slot.participants] : [];
        const w = Array.isArray(slot.waitlist) ? [...slot.waitlist] : [];
        const status = (p.length === 4) ? 'confirmed' : 'open';
        next.rosters[slot.id] = { participants: p, waitlist: w, status, code: slot.code || undefined };
      });
      return next;
    });
  }, [seed]);

  const usersById = useMemo(() => Object.fromEntries((seed?.users || []).map(u => [u.id, u])), [seed]);
  const currentUser = app.userId ? usersById[app.userId] : null;

  if (!seed) return <div className="p-6">Loading seed…</div>;

  const resetAll = () => setApp({ screen: screens.USER_PICK, userId: null, search: { date: '', area: '' }, tickets: [], rosters: {} });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Header onReset={resetAll} onSwitchUser={() => setApp(s => ({ ...s, screen: screens.USER_PICK, userId: null }))} currentUser={currentUser} />
      <main className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
        {app.screen === screens.USER_PICK && (<UserPick seed={seed} onPick={(id)=>setApp(s=>({ ...s, userId:id, screen:screens.HOME }))} />)}
        {app.screen === screens.HOME && (
          <Home
          seed={seed}
          app={app}
          usersById={usersById}
          onStart={()=>setApp(s=>({ ...s, screen:screens.SEARCH }))}
          onTickets={()=>setApp(s=>({ ...s, screen:screens.TICKETS }))}
          />
          )}
         {app.screen === screens.SEARCH && (
          <Search
          seed={seed}
          value={app.search}
          onChange={(v)=>setApp(s=>({ ...s, search:v }))}
          onSubmit={()=>setApp(s=>({ ...s, screen:screens.SLOTS }))}
          onBack={()=>setApp(s=>({ ...s, screen:screens.HOME }))}
          />
          )}
        
        {app.screen === screens.SLOTS && (<RosteredSlots seed={seed} search={app.search} app={app} setApp={setApp} usersById={usersById} />)}
        {app.screen === screens.TICKETS && (<Tickets seed={seed} app={app} usersById={usersById} onBack={()=>setApp(s=>({ ...s, screen:screens.HOME }))} />)}
      </main>
      <Footer meta={seed.meta} />
    </div>
  );
}

function Header({ onReset, onSwitchUser, currentUser }) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <div className="font-bold text-xl">Demo-4 v0.2</div>
        <div className="flex items-center gap-3">
          {currentUser && (<span className="text-sm text-gray-600">体験中: <b>{currentUser.display_name}</b></span>)}
          <Btn variant="outline" onClick={onSwitchUser}>ユーザー切り替え</Btn>
          <Btn variant="outline" onClick={onReset}>体験をリセット</Btn>
        </div>
      </div>
    </div>
  );
}
function Footer({ meta }) {
  return (
    <div className="text-xs text-gray-500 border-t mt-8">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <span>Demo-4 / v{meta?.version || "0.2"}</span>
        <span>このデモはダミーデータ・疑似ロジックで動作します。</span>
      </div>
    </div>
  );
}
