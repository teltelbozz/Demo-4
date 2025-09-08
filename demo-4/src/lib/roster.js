export function genCode() { return "FOUR-" + Math.random().toString(36).slice(2,6).toUpperCase(); }

export function countByGender(userIds, usersById) {
  let male = 0, female = 0;
  userIds.forEach(id => {
    const g = usersById[id]?.gender;
    if (g === "male") male += 1;
    if (g === "female") female += 1;
  });
  return { male, female };
}
export function remainingNeeded(roster, usersById) {
  const { male, female } = countByGender(roster.participants, usersById);
  const needM = Math.max(0, 2 - male);
  const needF = Math.max(0, 2 - female);
  return { needM, needF, total: needM + needF };
}
export function canAddWithGender(roster, usersById, userId) {
  const g = usersById[userId]?.gender;
  if (!g) return false;
  const { male, female } = countByGender(roster.participants, usersById);
  if (g === "male" && male >= 2) return false;
  if (g === "female" && female >= 2) return false;
  return roster.participants.length < 4;
}

// Functional updates, robust to missing roster entry
export function joinSlot(slotId, userId, usersById, app, setApp) {
  const roster = app.rosters[slotId] || { participants: [], waitlist: [], status: "open" };
  if (roster.participants.includes(userId) || roster.waitlist.includes(userId)) return;
  if (roster.status === "confirmed") return;

  setApp(prev => {
    const curr = prev.rosters[slotId] || { participants: [], waitlist: [], status: "open" };
    let participants = [...curr.participants];
    let waitlist     = [...curr.waitlist];
    if (canAddWithGender({ participants, waitlist }, usersById, userId)) {
      participants.push(userId);
    } else {
      waitlist.push(userId);
    }

    let status = curr.status;
    let code   = curr.code;
    const tickets = [...prev.tickets];
    if (participants.length === 4) {
      status = "confirmed";
      if (!code) code = genCode();
      participants.forEach(uid => {
        if (!tickets.some(t => t.slotId === slotId && t.ownerId === uid)) {
          tickets.push({ id: `t_${slotId}_${uid}`, slotId, ownerId: uid, code, status: "confirmed" });
        }
      });
    }
    return {
      ...prev,
      tickets,
      rosters: { ...prev.rosters, [slotId]: { participants, waitlist, status, code } },
    };
  });
}

export function leaveSlot(slotId, userId, usersById, app, setApp) {
  const roster = app.rosters[slotId] || { participants: [], waitlist: [], status: "open" };
  if (roster.status === "confirmed") return;

  setApp(prev => {
    const curr = prev.rosters[slotId] || { participants: [], waitlist: [], status: "open" };
    let participants = curr.participants.filter(id => id !== userId);
    let waitlist     = curr.waitlist.filter(id => id !== userId);
    let promoted = true;
    while (promoted && participants.length < 4 && waitlist.length > 0) {
      promoted = false;
      for (let i = 0; i < waitlist.length; i++) {
        const cand = waitlist[i];
        if (canAddWithGender({ participants, waitlist }, usersById, cand)) {
          participants = [...participants, cand];
          waitlist = [...waitlist.slice(0, i), ...waitlist.slice(i + 1)];
          promoted = true;
          break;
        }
      }
    }
    return {
      ...prev,
      rosters: { ...prev.rosters, [slotId]: { ...curr, participants, waitlist } },
    };
  });
}
