import { ChangeEvent, useMemo, useState } from "react";

type InviteForm = {
  groom: string;
  bride: string;
  date: string;
  time: string;
  venue: string;
  message: string;
};

const defaults: InviteForm = {
  groom: "김민수",
  bride: "이서윤",
  date: "2026-05-23",
  time: "13:00",
  venue: "아모르 가든 3층 그레이스홀",
  message: "서로의 계절이 되어준 두 사람이 같은 방향으로 천천히 걸어가려 합니다. 소중한 날, 함께 축복해 주세요."
};

function formatDate(value: string): string {
  if (!value) return "날짜를 선택해 주세요";
  const [year, month, day] = value.split("-");
  return `${year}. ${Number(month)}. ${Number(day)}`;
}

export default function App() {
  const [form, setForm] = useState<InviteForm>(defaults);

  const view = useMemo(
    () => ({
      groom: form.groom.trim() || defaults.groom,
      bride: form.bride.trim() || defaults.bride,
      date: formatDate(form.date),
      time: form.time || defaults.time,
      venue: form.venue.trim() || defaults.venue,
      message: form.message.trim() || defaults.message
    }),
    [form]
  );

  function updateField<K extends keyof InviteForm>(key: K) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };
  }

  return (
    <main className="layout">
      <section className="panel form-panel">
        <p className="eyebrow">Wedding Builder</p>
        <h1>청첩장 미리보기</h1>
        <p className="sub">왼쪽에서 입력하면 오른쪽 카드가 바로 업데이트됩니다.</p>

        <label>
          신랑 이름
          <input type="text" value={form.groom} onChange={updateField("groom")} />
        </label>
        <label>
          신부 이름
          <input type="text" value={form.bride} onChange={updateField("bride")} />
        </label>
        <label>
          예식 날짜
          <input type="date" value={form.date} onChange={updateField("date")} />
        </label>
        <label>
          예식 시간
          <input type="time" value={form.time} onChange={updateField("time")} />
        </label>
        <label>
          예식 장소
          <input type="text" value={form.venue} onChange={updateField("venue")} />
        </label>
        <label>
          초대 메시지
          <textarea rows={4} value={form.message} onChange={updateField("message")} />
        </label>

        <div className="actions">
          <button type="button" onClick={() => window.print()}>
            청첩장 인쇄
          </button>
          <button type="button" className="ghost" onClick={() => setForm(defaults)}>
            기본값 복원
          </button>
        </div>
      </section>

      <section className="panel preview-panel">
        <div className="invite-card">
          <div className="glow" />
          <p className="small">Wedding Invitation</p>
          <h2>
            <span>{view.groom}</span> &amp; <span>{view.bride}</span>
          </h2>
          <p className="msg">{view.message}</p>
          <div className="detail">
            <p>{view.date}</p>
            <p>{view.time}</p>
            <p>{view.venue}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
