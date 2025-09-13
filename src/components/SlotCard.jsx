import React from 'react';
import { Card, Btn } from './Primitives.jsx';
import { remainingNeeded, countByGender } from '../lib/roster.js';

export default function SlotCard({ slot, venue, roster, usersById, currentUserId, onJoin, onLeave }) {
  const { needM, needF, total } = remainingNeeded(roster, usersById);
  const mineInP    = roster.participants.includes(currentUserId);
  const mineInW    = roster.waitlist.includes(currentUserId);
  const mineJoined = mineInP || mineInW;
  const { male, female } = countByGender(roster.participants, usersById);
  const names = roster.participants.map(id => usersById[id]?.display_name || "—");

  return (
    <Card>
      <div className="space-y-2">
        <div className="font-medium">{slot.date} {slot.time_range}</div>
        <div className="text-sm text-gray-600">エリア：{slot.area}</div>
        <div className="text-xs text-gray-500">価格帯：{venue?.price_band || "—"}</div>
        {/* 現在の参加者表示 */}
        <div className="text-xs text-gray-700">
          <div className="mb-1">現在: {roster.participants.length}/4（男 {male} / 女 {female}）</div>
          {names.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {names.map(n => (
                <span key={n} className="px-2 py-0.5 rounded-full border text-xs bg-gray-50">{n}</span>
              ))}
            </div>
          )}
          {roster.waitlist.length > 0 && (
            <div className="mt-1 text-[11px] text-gray-500">ウェイトリスト: {roster.waitlist.length} 名</div>
          )}
        </div>

        {roster.status !== "confirmed" ? (
          <>
            <div className="text-sm">残り <b>{total}</b> 名（男 {needM} / 女 {needF}）</div>
            {!mineJoined ? (
              <Btn full className="mt-2" onClick={onJoin}>この枠で参加する</Btn>
            ) : (
              <div className="mt-2 space-y-2">
                <div className="text-sm text-gray-600">
                  {mineInP ? "確保中（pending）" : "ウェイトリストに登録済み"}
                  {total > 0 && `：あと ${total} 名で確定`}
                </div>
                <Btn variant="outline" full onClick={onLeave}>取り消す</Btn>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-sm text-green-700">確定済み！ 合言葉：<span className="font-mono">{roster.code}</span></div>
            <div className="text-xs text-gray-500">会場：{venue?.name}</div>
          </>
        )}
      </div>
    </Card>
  );
}
