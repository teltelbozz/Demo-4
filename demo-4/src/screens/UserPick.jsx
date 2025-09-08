import React from 'react';
import { Section, Hero } from '../components/Primitives.jsx';
import UserCard from '../components/UserCard.jsx';
export default function UserPick({ seed, onPick }) {
  const females = seed.users.filter(u => u.gender === 'female');
  const males   = seed.users.filter(u => u.gender === 'male');
  return (
    <div className="space-y-6">
    <Hero
      title="デモ用ユーザーを選択"
      subtitle="認証は実装していません。この一覧からデモ用のユーザーを選んでテストしてください。"
    />
      <Section title="女性から選ぶ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {females.map(u => <UserCard key={u.id} u={u} onPick={onPick} />)}
        </div>
      </Section>
      <Section title="男性から選ぶ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {males.map(u => <UserCard key={u.id} u={u} onPick={onPick} />)}
        </div>
      </Section>
    </div>
  );
}
