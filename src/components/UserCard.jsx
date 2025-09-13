import React from 'react';
import { Card, Chip, Btn } from './Primitives.jsx';
export default function UserCard({ u, onPick }) {
  return (
    <Card className="min-w-[260px] h-full flex flex-col justify-between">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">{u.display_name[0]}</div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-base leading-tight truncate max-w-[12rem]">{u.display_name} <span className="text-sm text-gray-500">({u.age_range})</span></div>
          <div className="text-xs text-gray-500">{u.job_cat}</div>
          <div className="mt-2 flex flex-wrap">{u.tags.map(t => <Chip key={t}>{t}</Chip>)}</div>
        </div>
      </div>
      <div className="mt-4"><Btn full onClick={()=>onPick(u.id)}>このユーザーで体験</Btn></div>
    </Card>
  );
}
