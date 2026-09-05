import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Page, Wrap, Header, Eyebrow, Title, Subtitle, BoardCard,
  ProgressRow, ProgressLabel, ProgressTrack, ProgressFill, ProgressCount,
  Grid, Cell, WordList, WordChip, WinBanner, ResetButton
} from "./WordSearchStyled.js";

// ---------------------------------------------
// Datos del juego
// ---------------------------------------------
const SIZE = 15;

const GRID_LETTERS = [
  "FVDMVSHENERGIAT",
  "GPFBCPULZHWWCVS",
  "YMNLKTBBWAMUQIS",
  "RVPIBPAWTOZRKRV",
  "MEXAKLHIVDULASD",
  "OIQRLEAIRNWTAAA",
  "FOAUPXMUOOSUQRD",
  "FNFUIIYMSEMVLMI",
  "WTPUELRLNZKELOL",
  "WTJNEQIEKRKQMNA",
  "IYTVMRIBYGYSFIT",
  "TOTAXBZFRVKDYAI",
  "TZPWICJAKIYSDIV",
  "AICNATSNOCOTFYR",
  "ILAPICRYLENXBBX",
];

const WORDS = [
  { word: "EQUILIBRIO", cells: [[4,1],[5,2],[6,3],[7,4],[8,5],[9,6],[10,7],[11,8],[12,9],[13,10]] },
  { word: "MOVIMIENTO", cells: [[2,10],[3,9],[4,8],[5,7],[6,6],[7,5],[8,4],[9,3],[10,2],[11,1]] },
  { word: "CONSTANCIA", cells: [[13,9],[13,8],[13,7],[13,6],[13,5],[13,4],[13,3],[13,2],[13,1],[13,0]] },
  { word: "BIENESTAR", cells: [[11,5],[10,6],[9,7],[8,8],[7,9],[6,10],[5,11],[4,12],[3,13]] },
  { word: "VITALIDAD", cells: [[12,14],[11,14],[10,14],[9,14],[8,14],[7,14],[6,14],[5,14],[4,14]] },
  { word: "MEMORIA", cells: [[9,12],[8,11],[7,10],[6,9],[5,8],[4,7],[3,6]] },
  { word: "ENERGIA", cells: [[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13]] },
  { word: "ARMONIA", cells: [[5,13],[6,13],[7,13],[8,13],[9,13],[10,13],[11,13]] },
  { word: "FUERZA", cells: [[7,2],[8,3],[9,4],[10,5],[11,6],[12,7]] },
  { word: "SALUD", cells: [[4,13],[4,12],[4,11],[4,10],[4,9]] },
];

// ---------------------------------------------
// Helpers
// ---------------------------------------------
const cellKey = (r, c) => `${r}_${c}`;

function cellsInLine(r1, c1, r2, c2) {
  const isStraight = r1 === r2 || c1 === c2 || Math.abs(r2 - r1) === Math.abs(c2 - c1);
  if (!isStraight) return null;
  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);
  const len = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1)) + 1;
  const cells = [];
  for (let i = 0; i < len; i++) cells.push([r1 + dr * i, c1 + dc * i]);
  return cells;
}

function sameCellSet(pathCells, wordCells) {
  if (pathCells.length !== wordCells.length) return false;
  const a = pathCells.map((p) => p.join(",")).sort().join("|");
  const b = wordCells.map((p) => p.join(",")).sort().join("|");
  return a === b;
}

// ---------------------------------------------
// Componente principal
// ---------------------------------------------
export default function WordSearch() {
  const [foundWords, setFoundWords] = useState(() => new Set());
  const [paintedPath, setPaintedPath] = useState([]);
  const isSelectingRef = useRef(false);
  const startCellRef = useRef(null);
  const gridRef = useRef(null);

  const paintedSet = new Set(paintedPath.map(([r, c]) => cellKey(r, c)));
  const foundCellSet = new Set();
  WORDS.forEach((w) => {
    if (foundWords.has(w.word)) {
      w.cells.forEach(([r, c]) => foundCellSet.add(cellKey(r, c)));
    }
  });

  const getCellFromEvent = useCallback((clientX, clientY) => {
    const el = document.elementFromPoint(clientX, clientY);
    if (el && el.dataset && el.dataset.r !== undefined) return el;
    return null;
  }, []);

  const startSelection = useCallback((r, c) => {
    isSelectingRef.current = true;
    startCellRef.current = { r, c };
    setPaintedPath([[r, c]]);
  }, []);

  const updateSelection = useCallback((r, c) => {
    if (!isSelectingRef.current || !startCellRef.current) return;
    const { r: r1, c: c1 } = startCellRef.current;
    const line = cellsInLine(r1, c1, r, c);
    setPaintedPath(line || []);
  }, []);

  const endSelection = useCallback(() => {
    if (!isSelectingRef.current) return;
    isSelectingRef.current = false;

    setPaintedPath((path) => {
      if (path.length > 0) {
        const match = WORDS.find(
          (w) => !foundWords.has(w.word) && sameCellSet(path, w.cells)
        );
        if (match) {
          setFoundWords((prev) => {
            const next = new Set(prev);
            next.add(match.word);
            return next;
          });
        }
      }
      return [];
    });
    startCellRef.current = null;
  }, [foundWords]);

  useEffect(() => {
    const onMouseUp = () => endSelection();
    const onTouchEnd = () => endSelection();
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [endSelection]);

  const handleMouseDown = (r, c) => (e) => {
    e.preventDefault();
    startSelection(r, c);
  };

  const handleMouseEnter = (r, c) => () => {
    if (isSelectingRef.current) updateSelection(r, c);
  };

  const handleTouchStart = (r, c) => (e) => {
    startSelection(r, c);
  };

  const handleTouchMove = (e) => {
    if (!isSelectingRef.current) return;
    const touch = e.touches[0];
    const el = getCellFromEvent(touch.clientX, touch.clientY);
    if (el) {
      updateSelection(Number(el.dataset.r), Number(el.dataset.c));
    }
    e.preventDefault();
  };

  const handleReset = () => {
    setFoundWords(new Set());
    setPaintedPath([]);
  };

  const progressPct = (foundWords.size / WORDS.length) * 100;
  const allFound = foundWords.size === WORDS.length;

  return (
    <Page>
      <Wrap>
        <Header>
          <Eyebrow>+60 con Patry · Estimulación cognitiva</Eyebrow>
          <Title>Cuerpo Activo, Mente Ágil</Title>
          <Subtitle>
            Encontrá las 10 palabras escondidas en la grilla. Pueden estar en cualquier
            dirección: adelante, atrás, arriba, abajo o en diagonal. Arrastrá el mouse o el
            dedo sobre las letras.
          </Subtitle>
        </Header>

        <BoardCard>
          <ProgressRow>
            <ProgressLabel>Progreso</ProgressLabel>
            <ProgressTrack>
              <ProgressFill $pct={progressPct} />
            </ProgressTrack>
            <ProgressCount>{foundWords.size}/{WORDS.length}</ProgressCount>
          </ProgressRow>

          <Grid ref={gridRef} onTouchMove={handleTouchMove}>
            {GRID_LETTERS.map((row, r) =>
              row.split("").map((letter, c) => {
                const key = cellKey(r, c);
                return (
                  <Cell
                    key={key}
                    data-r={r}
                    data-c={c}
                    $painting={paintedSet.has(key)}
                    $found={foundCellSet.has(key)}
                    onMouseDown={handleMouseDown(r, c)}
                    onMouseEnter={handleMouseEnter(r, c)}
                    onTouchStart={handleTouchStart(r, c)}
                  >
                    {letter}
                  </Cell>
                );
              })
            )}
          </Grid>

          <WordList>
            {WORDS.map((w) => (
              <WordChip key={w.word} $done={foundWords.has(w.word)}>
                {w.word}
              </WordChip>
            ))}
          </WordList>

          <WinBanner $show={allFound}>¡Excelente! Encontraste las 10 palabras. 🎉</WinBanner>

          <ResetButton onClick={handleReset}>Empezar de nuevo</ResetButton>
        </BoardCard>
      </Wrap>
    </Page>
  );
}
