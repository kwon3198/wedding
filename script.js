const el = {
  groom: document.getElementById("groomName"),
  bride: document.getElementById("brideName"),
  date: document.getElementById("weddingDate"),
  time: document.getElementById("weddingTime"),
  venue: document.getElementById("venue"),
  message: document.getElementById("message"),
  pvGroom: document.getElementById("pvGroom"),
  pvBride: document.getElementById("pvBride"),
  pvDate: document.getElementById("pvDate"),
  pvTime: document.getElementById("pvTime"),
  pvVenue: document.getElementById("pvVenue"),
  pvMessage: document.getElementById("pvMessage"),
  printBtn: document.getElementById("printBtn"),
  resetBtn: document.getElementById("resetBtn")
};

const defaults = {
  groom: "김민수",
  bride: "이서연",
  time: "13:00",
  venue: "라온웨딩홀 3층 그랜드홀",
  message: "두 사람이 하나가 되는 날, 소중한 걸음으로 함께 축복해 주세요."
};

function formatDate(value) {
  if (!value) return "날짜를 선택해 주세요";
  const [year, month, day] = value.split("-");
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
}

function syncPreview() {
  el.pvGroom.textContent = el.groom.value.trim() || defaults.groom;
  el.pvBride.textContent = el.bride.value.trim() || defaults.bride;
  el.pvDate.textContent = formatDate(el.date.value);
  el.pvTime.textContent = el.time.value || defaults.time;
  el.pvVenue.textContent = el.venue.value.trim() || defaults.venue;
  el.pvMessage.textContent = el.message.value.trim() || defaults.message;
}

function resetAll() {
  el.groom.value = defaults.groom;
  el.bride.value = defaults.bride;
  el.date.value = "";
  el.time.value = defaults.time;
  el.venue.value = defaults.venue;
  el.message.value = defaults.message;
  syncPreview();
}

[el.groom, el.bride, el.date, el.time, el.venue, el.message].forEach((node) => {
  node.addEventListener("input", syncPreview);
});

el.printBtn.addEventListener("click", () => window.print());
el.resetBtn.addEventListener("click", resetAll);

syncPreview();
