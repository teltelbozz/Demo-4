import React from 'react';
import { Btn } from '../components/Primitives.jsx';
import SlotCard from '../components/SlotCard.jsx';
import { joinSlot, leaveSlot } from '../lib/roster.js';
export default function RosteredSlots({ seed, search, app, setApp, usersById }) {
  let list = seed.slots.filter(s => (!search.date || s.date === search.date) && (!search.area || s.area === search.area));
  if (list.length === 0) list = seed.slots;
  list = list.slice(0, 3);
  const currentUserId = app.userId;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Btn variant="outline" onClick={() => setApp(s => ({ ...s, screen: 'SEARCH' }))}>戻る</Btn>
        <h2 className="text-lg font-semibold">候補枠</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {list.map(s => {
          const roster = app.rosters[s.id] || { participants: [], waitlist: [], status: 'open' };
          const venue = seed.venues.find(v => v.id === s.venue_id);
          return (
            <SlotCard
              key={s.id}
              slot={s}
              venue={venue}
              roster={roster}
              usersById={usersById}
              currentUserId={currentUserId}
              onJoin={() => joinSlot(s.id, currentUserId, usersById, app, setApp)}
              onLeave={() => leaveSlot(s.id, currentUserId, usersById, app, setApp)}
            />
          );
        })}
      </div>
    </div>
  );
}
