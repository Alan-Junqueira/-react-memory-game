import React from 'react'
import { GridItemType } from '../../types/GridItemType'
import b7Svg from '../../assets/svgs/b7.svg'
import { Itens } from '../../data/itens'

import * as C from './styles'

type GridItemProps = {
  iten: GridItemType
  onClick: () => void
}

const GridItem = ({iten, onClick}: GridItemProps) => {
  return (
    <C.Container 
      showBackground={iten.permanentShown || iten.shown}
      onClick={onClick}
    >
      {!iten.permanentShown && !iten.shown && 
        <C.Icon src={b7Svg} alt="Logo b7web" opacity={.1}/>
      }
      {(iten.permanentShown || iten.shown) && iten.iten !== null &&
        <C.Icon src={Itens[iten.iten].icon} alt="" />
      }
    </C.Container>
  )
}

export default GridItem