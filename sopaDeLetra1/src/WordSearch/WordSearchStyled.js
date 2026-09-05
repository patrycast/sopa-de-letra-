import styled from "styled-components";

export const Page = styled.div`
  --ink: #1f3a3d;
  --sea-deep: #0e5c63;
  --sea: #1d8a8f;
  --sand: #f4e9d8;
  --sand-deep: #e8d5b5;
  --coral: #e8623c;
  --coral-deep: #c74a29;
  --gold: #e0a93e;
  --paper: #fffdf8;
  --found: #3fa34d;

  height: 100dvh;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: radial-gradient(circle at 15% 10%, rgba(224, 169, 62, 0.18), transparent 40%),
    radial-gradient(circle at 85% 90%, rgba(29, 138, 143, 0.18), transparent 45%), var(--paper);
  font-family: "Trebuchet MS", "Segoe UI", Verdana, sans-serif;
  color: var(--ink);

  * {
    box-sizing: border-box;
  }

  @media (max-width: 600px) {    // Ajuste para pantallas pequeñas
    padding: 6px;
  }
`;

export const Wrap = styled.div`
  width: 100%;
  max-width: 620px;
  height: 100%;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

    @media (max-width: 600px) {
    gap: 4px;
    max-width: 100%;
  }
`;

export const Header = styled.header`
  text-align: center;
  flex: 0 0 auto;
`;

export const Eyebrow = styled.p`
  font-size: clamp(15px, 1.6vh, 13px);
  color: var(--sea-deep);
  letter-spacing: 0.3px;
  margin: 0 0 2px;

    @media (max-width: 600px) {
    font-size: 10px;
  }
`;

export const Title = styled.h1`
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(16px, 3.2vh, 26px);
  margin: 0 0 4px;
  color: var(--sea-deep);
  line-height: 1.15;

    @media (max-width: 600px) {
    font-size: clamp(15px, 5.5vw, 20px);
  }
`;

export const Subtitle = styled.p`
  font-size: clamp(13px, 1.5vh, 13px);
  color: #4a5f60;
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.35;

  @media (max-width: 600px) {
    font-size: 11px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const BoardCard = styled.div`
  background: var(--sand);
  border-radius: 20px;
  padding: 12px;
  box-shadow: 0 6px 0 var(--sand-deep), 0 12px 20px rgba(14, 92, 99, 0.15);
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 10px;
    border-radius: 18px;
  }
`;

export const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 0 4px;
  width: 100%;
  flex: 0 0 auto;

   @media (max-width: 600px) {
    margin-bottom: 6px;
  }
`;

export const ProgressLabel = styled.span`
  font-size: clamp(11px, 1.7vh, 15px);
  font-weight: bold;
  color: var(--sea-deep);

    @media (max-width: 600px) {
    font-size: 11px;
  }
`;

export const ProgressTrack = styled.div`
  flex: 1;
  height: 9px;
  margin: 0 10px;
  background: rgba(14, 92, 99, 0.15);
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  width: ${(p) => p.$pct}%;
  background: linear-gradient(90deg, var(--gold), var(--coral));
  transition: width 0.4s ease;
`;

export const ProgressCount = styled.span`
  font-size: clamp(11px, 1.7vh, 15px);
  font-weight: bold;
  color: var(--coral-deep);
  min-width: 40px;
  text-align: right;

   @media (max-width: 600px) {
    font-size: 11px;
    min-width: 32px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  gap: 2px;
  background: var(--sea-deep);
  border-radius: 14px;
  padding: 4px;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  aspect-ratio: 1 / 1;
  width: min(100%, 58vh, 58vw);
  flex: 0 1 auto;
  min-height: 0;

   @media (max-width: 600px) {
    width: min(96vw, 62vh);
    gap: 1.5px;
    padding: 3px;
    border-radius: 12px;
  }
`;

export const Cell = styled.div`
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => (p.$found ? "var(--found)" : p.$painting ? "var(--gold)" : "var(--paper)")};
  color: ${(p) => (p.$found ? "#fff" : "var(--ink)")};
  font-weight: 700;
  font-size: clamp(9px, 2.6vh, 19px);
  border-radius: 5px;
  cursor: pointer;
  transform: ${(p) => (p.$painting ? "scale(1.05)" : "scale(1)")};
  transition: background 0.08s ease, color 0.08s ease, transform 0.08s ease;

   @media (max-width: 600px) {
    font-size: clamp(9px, 4.6vw, 15px);
    border-radius: 4px;
  }
`;

export const WordList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  flex: 0 0 auto;
  width: 100%;
  overflow: hidden;

  @media (max-width: 600px) {
    margin-top: 6px;
    gap: 4px;
  }
`;

export const WordChip = styled.span`
  padding: 4px 10px;
  background: ${(p) => (p.$done ? "var(--found)" : "var(--paper)")};
  border: 2px solid ${(p) => (p.$done ? "var(--found)" : "var(--sea)")};
  border-radius: 999px;
  font-size: clamp(9px, 1.6vh, 13px);
  font-weight: 700;
  color: ${(p) => (p.$done ? "#fff" : "var(--sea-deep)")};
  letter-spacing: 0.2px;
  text-decoration: ${(p) => (p.$done ? "line-through" : "none")};
  text-decoration-thickness: 2px;
  opacity: ${(p) => (p.$done ? 0.85 : 1)};
  white-space: nowrap;
  transition: all 0.3s ease;

  @media (max-width: 600px) {
    font-size: 10px;
    padding: 3px 8px;
    border-width: 1.5px;
  }
`;

export const WinBanner = styled.div`
  display: ${(p) => (p.$show ? "block" : "none")};
  margin-top: 6px;
  text-align: center;
  background: var(--coral);
  color: #fff;
  padding: 8px;
  border-radius: 12px;
  font-size: clamp(11px, 1.8vh, 16px);
  font-weight: bold;
  flex: 0 0 auto;
  width: 100%;

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 6px;
  }
`;

export const ResetButton = styled.button`
  display: block;
  margin: 8px auto 0;
  padding: 8px 20px;
  background: var(--sea-deep);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: clamp(11px, 1.7vh, 15px);
  font-weight: bold;
  cursor: pointer;
  flex: 0 0 auto;

  &:hover {
    background: var(--sea);
  }

   @media (max-width: 600px) {
    font-size: 12px;
    padding: 7px 18px;
    margin-top: 6px;
  }
`;
