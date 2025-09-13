import React from 'react';
import { Section, Card, Btn } from '../components/Primitives.jsx';
import { remainingNeeded } from '../lib/roster.js';
export default function Tickets({ seed, app, usersById, onBack }) {
  const myId = app.userId;
  const myPending = Object.entries(app.rosters || {})
    .filter(([slotId, r]) => r.status !== "confirmed" && (r.participants.includes(myId) || r.waitlist.includes(myId)))
    .map(([slotId, r]) => ({ slotId, roster: r }));
  const myConfirmed = app.tickets.filter(t => t.ownerId === myId && t.status === "confirmed");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Btn variant="outline" onClick={onBack}>戻る</Btn>
        <h2 className="text-lg font-semibold">マイ参加</h2>
      </div>
      <Section title="確定待ち（pending）">
        {myPending.length === 0 ? (
          <Card><div className="text-sm text-gray-600">pending の参加はありません。</div></Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {myPending.map(({ slotId, roster }) => {
              const slot = seed.slots.find(s => s.id === slotId);
              const { total } = remainingNeeded(roster, usersById);
              return (
                <Card key={slotId}>
                  <div className="space-y-1">
                    <div className="font-medium">{slot.date} {slot.time_range} / {slot.area}</div>
                    <div className="text-sm text-gray-600">あと {total} 名で確定</div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>
      <Section title="確定済み（confirmed）">
        {myConfirmed.length === 0 ? (
          <Card><div className="text-sm text-gray-600">確定済みのチケットはありません。</div></Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {myConfirmed.map(t => {
              const slot = seed.slots.find(s => s.id === t.slotId);
              const venue = seed.venues.find(v => v.id === slot.venue_id);
              return (
                <Card key={t.id}>
                  <div className="space-y-1">
                    <div className="font-medium">{slot.date} {slot.time_range} / {slot.area}</div>
                    <div className="text-sm text-gray-600">{venue?.name}</div>
                    <div className="text-xs text-gray-500">合言葉：<span className="font-mono">{t.code}</span></div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>
    </div>
  );
}
