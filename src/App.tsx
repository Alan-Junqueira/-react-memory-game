/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import * as C from './App.styles';

import { Itens } from './data/itens';

import Button from './components/Button';
import InfoItem from './components/InfoItem';
import GridItem from './components/GridItem';

import { GridItemType } from './types/GridItemType';

import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './assets/svgs/restart.svg';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

function App() {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItens, setGridItens] = useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // Verify if opened are equal
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItens.filter((item) => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].iten === opened[1].iten) {
          // v1 - if both are equal, make every "shown" permanent.
          let tmpGrid = [...gridItens];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItens(tmpGrid);
          setShownCount(0);
        } else {
          // v2 - if they are not equal, close all "shown"
          setTimeout(() => {
            let tmpGrid = [...gridItens];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItens(tmpGrid);
            setShownCount(0);
          }, 1500);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItens]);

  // Verify if game is over
  useEffect(() => {
    if(moveCount > 0 && gridItens.every(item => item.permanentShown === true)){
      setPlaying(false);
    }
  

  }, [moveCount, gridItens])
  

  const resetAndCreateGrid = () => {
    // step 1 - Reset the game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // step 2 - Create the grid
    // 2.1 - Create an empty grid
    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < Itens.length * 2; i++) {
      tempGrid.push({
        iten: null,
        shown: false,
        permanentShown: false
      });
    }

    // 2.2 - Fill the grid

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < Itens.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].iten !== null) {
          pos = Math.floor(Math.random() * (Itens.length * 2));
        }
        tempGrid[pos].iten = i;
      }
    }

    // 2.3 - Put on state
    setGridItens(tempGrid);

    // step 3 - Start the game
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItens];

      if (
        tmpGrid[index].permanentShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItens(tmpGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImage} alt="" width={200} />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItens.map((iten, index) => (
            <GridItem
              key={index}
              iten={iten}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App;
