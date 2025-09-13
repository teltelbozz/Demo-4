 import React from 'react';
 import { Hero, Card, Btn, Section } from '../components/Primitives.jsx';
 import { remainingNeeded, countByGender } from '../lib/roster.js';
 export default function Home({ onStart, seed, app, usersById, onTickets }) {
  return (
    <div className="space-y-6">
      <Hero
        title="日程を選んで参加体験"
        subtitle={
          <>
            このデモでは、認証なしで合コンマッチングの流れを体験できます。<br /><br />
            ① ユーザーを選んでログイン（デモ用の任意ユーザーを選択）<br />
            ② 日付とエリアを選んで候補枠を検索<br />
            ③ 「この枠で参加する」を押してエントリー<br />
            ④ 他の参加者が揃うと定員4名（男女2:2）で自動的に確定<br />
            ⑤ 確定時には合言葉が発行され、参加チケットとして確認可能<br /><br />
            ※ 確定前ならキャンセルや他枠への参加も自由に体験できます。
          </>
        }
      />
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <div className="space-y-3">
            <div className="text-sm text-gray-500">次回の開催（例）</div>
            <ul className="text-sm list-disc ml-5">
              {seed.slots.slice(0,3).map(s => {
                const r = app.rosters[s.id] || { participants: [], waitlist: [], status: 'open' };
                const { male, female } = countByGender(r.participants, usersById);
                const { total } = remainingNeeded(r, usersById);
                return (
                  <li key={s.id} className="mb-1">
                    {s.date} {s.time_range} / {s.area}
                    <span className="ml-2 text-gray-500 text-xs">
                      参加 {r.participants.length}/4（男 {male} / 女 {female}）／ 残り {total}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div><Btn onClick={onStart}>日程を選ぶ</Btn></div>
          </div>
        </Card>
        {/* トップにマイ参加一覧を直接表示 */}
        <Card>
          <div className="space-y-3">
            <div className="text-sm text-gray-500">マイ参加</div>
            {/* pending */}
            <Section title="確定待ち（pending）">
              {(() => {
                const myId = app.userId;
                const pendings = Object.entries(app.rosters || {}).filter(
                  ([, r]) => r.status !== 'confirmed' && (r.participants.includes(myId) || r.waitlist.includes(myId))
                );
                if (pendings.length === 0) {
                  return <div className="text-sm text-gray-600">pending の参加はありません。</div>;
                }
                return (
                  <div className="divide-y">
                    {pendings.map(([slotId, r]) => {
                      const slot = seed.slots.find(s => s.id === slotId);
                      const { total } = remainingNeeded(r, usersById);
                      const { male, female } = countByGender(r.participants, usersById);
                      return (
                        <div key={slotId} className="py-2 text-sm flex items-center justify-between">
                          <div className="min-w-0">
                            <div className="font-medium truncate">{slot.date} {slot.time_range} / {slot.area}</div>
                            <div className="text-xs text-gray-500">
                              参加 {r.participants.length}/4（男 {male} / 女 {female}）
                            </div>
                          </div>
                          <div className="ml-3 shrink-0">
                            <span className="px-2 py-1 rounded-full border text-xs bg-white">
                              残り {total} 名
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </Section>
           {/* confirmed */}
           <Section title="確定済み（confirmed）">
             {(() => {
               const mine = app.tickets.filter(t => t.ownerId === app.userId && t.status === 'confirmed');
               if (mine.length === 0) {
                 return <div className="text-sm text-gray-600">確定済みのチケットはありません。</div>;
               }
               return (
                 <div className="divide-y">
                   {mine.map(t => {
                     const slot = seed.slots.find(s => s.id === t.slotId);
                     const venue = seed.venues.find(v => v.id === slot.venue_id);
                     return (
                       <div key={t.id} className="py-2 text-sm flex items-center justify-between">
                         <div className="min-w-0">
                           <div className="font-medium truncate">{slot.date} {slot.time_range} / {slot.area}</div>
                           <div className="text-xs text-gray-500">
                             会場：{venue?.name || "—"} ／ 参加 4/4
                           </div>
                         </div>
                         <div className="ml-3 shrink-0">
                           <span className="px-2 py-1 rounded-full border text-xs bg-white font-mono">合言葉 {t.code}</span>
                         </div>
                       </div>
                     );
                   })}
                 </div>
               );
             })()}
           </Section>
            {/* 必要なら詳細画面へのリンク（任意） */}
            {onTickets && <div className="pt-1"><Btn variant="outline" onClick={onTickets}>詳細を見る</Btn></div>}
          </div>
        </Card>
      </div>
    </div>
  );
}
