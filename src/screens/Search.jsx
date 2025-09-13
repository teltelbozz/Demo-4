 import React from 'react';
 import { Card, Btn } from '../components/Primitives.jsx';
 export default function Search({ seed, value, onChange, onSubmit, onBack }) {
  const areas = Array.from(new Set(seed.slots.map(s => s.area)));
  const dates = Array.from(new Set(seed.slots.map(s => s.date)));
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Btn variant="outline" onClick={onBack}>戻る</Btn>
        <h2 className="text-lg font-semibold">日程を選ぶ</h2>
      </div>
      <Card>
        <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">日付</label>
              <select className="w-full border rounded-xl p-2" value={value.date} onChange={e=>onChange({ ...value, date: e.target.value })}>
                <option value="">未選択</option>
                {dates.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text.sm text-gray-600 mb-1">エリア</label>
              <select className="w-full border rounded-xl p-2" value={value.area} onChange={e=>onChange({ ...value, area: e.target.value })}>
                <option value="">未選択</option>
                {areas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <Btn full onClick={onSubmit} disabled={!value.date && !value.area}>この条件で探す</Btn>
            </div>
        </div>
      </Card>
    </div>
  );
}
