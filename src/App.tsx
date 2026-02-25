import { ChangeEvent, useMemo, useState } from "react";

type InviteForm = {
  groom: string;
  bride: string;
  date: string;
  time: string;
  venue: string;
  message: string;
  hostLine: string;
  contactLine: string;
};

const defaults: InviteForm = {
  groom: "김민수",
  bride: "이서윤",
  date: "2026-05-23",
  time: "13:00",
  venue: "아모르 가든 3층 그레이스홀",
  message: "서로의 계절이 되어준 두 사람이 같은 방향으로 천천히 걸어가려 합니다. 소중한 날, 함께 축복해 주세요.",
  hostLine: "신랑 김철수 · 신부 이지연의 장남 · 장녀",
  contactLine: "신랑측 010-1234-5678 · 신부측 010-8765-4321"
};

const steps = ["기본 정보", "디자인", "공유"];

function formatDate(value: string): string {
  if (!value) return "날짜를 선택해 주세요";
  const [year, month, day] = value.split("-");
  return `${year}. ${Number(month)}. ${Number(day)} 토요일`;
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
      message: form.message.trim() || defaults.message,
      hostLine: form.hostLine.trim() || defaults.hostLine,
      contactLine: form.contactLine.trim() || defaults.contactLine
    }),
    [form]
  );

  function updateField<K extends keyof InviteForm>(key: K) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };
  }

  return (
    <main className="page">
      <header className="top">
        <div>
          <p className="kicker">Card Create</p>
          <h1>모바일 청첩장 만들기</h1>
          <p className="hint">왼쪽에서 입력하면 오른쪽 미리보기에 즉시 반영됩니다.</p>
        </div>
        <ol className="steps" aria-label="제작 단계">
          {steps.map((step, index) => (
            <li key={step} className={index === 0 ? "active" : ""}>
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </header>

      <section className="workspace">
        <article className="editor card">
          <h2>기본 정보</h2>

          <label>
            신랑 이름
            <input type="text" value={form.groom} onChange={updateField("groom")} />
          </label>
          <label>
            신부 이름
            <input type="text" value={form.bride} onChange={updateField("bride")} />
          </label>

          <div className="row">
            <label>
              예식 날짜
              <input type="date" value={form.date} onChange={updateField("date")} />
            </label>
            <label>
              예식 시간
              <input type="time" value={form.time} onChange={updateField("time")} />
            </label>
          </div>

          <label>
            예식 장소
            <input type="text" value={form.venue} onChange={updateField("venue")} />
          </label>
          <label>
            혼주 문구
            <input type="text" value={form.hostLine} onChange={updateField("hostLine")} />
          </label>
          <label>
            연락처
            <input type="text" value={form.contactLine} onChange={updateField("contactLine")} />
          </label>
          <label>
            초대 메시지
            <textarea rows={4} value={form.message} onChange={updateField("message")} />
          </label>

          <div className="actions">
            <button type="button" className="primary" onClick={() => window.print()}>
              카드 출력
            </button>
            <button type="button" className="ghost" onClick={() => setForm(defaults)}>
              기본값 복원
            </button>
          </div>
        </article>

        <article className="preview card">
          <p className="preview-label">실시간 미리보기</p>
          <div className="phone">
            <div className="phone-notch" />
            <div className="invitation">
              <p className="small">Wedding Invitation</p>
              <h3>
                {view.groom} <span>&amp;</span> {view.bride}
              </h3>
              <p className="lead">{view.message}</p>
              <div className="meta">
                <p>{view.date}</p>
                <p>{view.time}</p>
                <p>{view.venue}</p>
              </div>
              <div className="divider" />
              <p className="foot">{view.hostLine}</p>
              <p className="foot dim">{view.contactLine}</p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
