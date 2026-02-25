import { ChangeEvent, useMemo, useState } from "react";

type InviteForm = {
  groom: string;
  bride: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  message: string;
  hostLine: string;
  contactLine: string;
  coverImage: string;
  title: string;
};

const defaults: InviteForm = {
  groom: "김민수",
  bride: "이서윤",
  date: "2026-05-23",
  time: "13:00",
  venue: "아모르 가든 3층 그레이스홀",
  address: "서울시 강남구 테헤란로 120",
  message: "서로의 계절이 되어준 두 사람이 같은 방향으로 천천히 걸어가려 합니다. 소중한 날, 함께 축복해 주세요.",
  hostLine: "신랑 김철수 · 신부 이지연의 장남 · 장녀",
  contactLine: "신랑측 010-1234-5678 · 신부측 010-8765-4321",
  coverImage:
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1300&q=80",
  title: "우리, 결혼합니다"
};

const steps = ["정보 입력", "디자인 확인", "배포"];

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
      address: form.address.trim() || defaults.address,
      message: form.message.trim() || defaults.message,
      hostLine: form.hostLine.trim() || defaults.hostLine,
      contactLine: form.contactLine.trim() || defaults.contactLine,
      coverImage: form.coverImage.trim() || defaults.coverImage,
      title: form.title.trim() || defaults.title
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
          <p className="kicker">Wedding Editor</p>
          <h1>모바일 청첩장 에디터</h1>
          <p className="hint">Bonneyajou 스타일처럼 모바일 완성본 중심으로 미리보기 됩니다.</p>
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
          <h2>콘텐츠 편집</h2>

          <label>
            커버 타이틀
            <input type="text" value={form.title} onChange={updateField("title")} />
          </label>
          <label>
            커버 이미지 URL
            <input type="text" value={form.coverImage} onChange={updateField("coverImage")} />
          </label>

          <div className="row">
            <label>
              신랑 이름
              <input type="text" value={form.groom} onChange={updateField("groom")} />
            </label>
            <label>
              신부 이름
              <input type="text" value={form.bride} onChange={updateField("bride")} />
            </label>
          </div>

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
            주소
            <input type="text" value={form.address} onChange={updateField("address")} />
          </label>
          <label>
            인사말
            <textarea rows={4} value={form.message} onChange={updateField("message")} />
          </label>
          <label>
            혼주 문구
            <input type="text" value={form.hostLine} onChange={updateField("hostLine")} />
          </label>
          <label>
            연락처
            <input type="text" value={form.contactLine} onChange={updateField("contactLine")} />
          </label>

          <div className="actions">
            <button type="button" className="primary" onClick={() => window.print()}>
              완성본 출력
            </button>
            <button type="button" className="ghost" onClick={() => setForm(defaults)}>
              기본값 복원
            </button>
          </div>
        </article>

        <article className="preview card">
          <p className="preview-label">모바일 완성본 미리보기</p>
          <div className="phone">
            <div className="phone-notch" />
            <div className="letter">
              <section className="hero" style={{ backgroundImage: `url(${view.coverImage})` }}>
                <div className="overlay" />
                <div className="hero-copy">
                  <p className="hero-kicker">Wedding Invitation</p>
                  <h3>{view.title}</h3>
                  <p className="hero-names">
                    {view.groom} <span>&amp;</span> {view.bride}
                  </p>
                </div>
              </section>

              <section className="section intro">
                <h4>초대합니다</h4>
                <p>{view.message}</p>
              </section>

              <section className="section info">
                <h4>예식 안내</h4>
                <dl>
                  <div>
                    <dt>날짜</dt>
                    <dd>{view.date}</dd>
                  </div>
                  <div>
                    <dt>시간</dt>
                    <dd>{view.time}</dd>
                  </div>
                  <div>
                    <dt>장소</dt>
                    <dd>{view.venue}</dd>
                  </div>
                  <div>
                    <dt>주소</dt>
                    <dd>{view.address}</dd>
                  </div>
                </dl>
              </section>

              <section className="section contact">
                <h4>혼주 및 연락처</h4>
                <p>{view.hostLine}</p>
                <p className="dim">{view.contactLine}</p>
                <button type="button" className="route-btn">
                  길찾기 열기
                </button>
              </section>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
