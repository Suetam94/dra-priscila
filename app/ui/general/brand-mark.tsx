import React from 'react'
import clsx from 'clsx'

interface BrandMarkProps {
  /** Altura da moldura externa em px. A largura acompanha a proporção. */
  height?: number
  className?: string
}

// Medido em logo.jpeg (500x500): o símbolo ocupa x 184..287, y 131..275, e o
// nome da médica já vem gravado no arquivo a partir de y 280. A moldura interna
// recorta só o símbolo; a externa fornece o respiro em navy. Esse fundo navy
// precisa acompanhar o símbolo porque o traço é claro e sumiria sobre fundo claro.
const GLYPH = { x: 184, y: 131, w: 103, h: 144, source: 500 }
const FILL = 0.65 // quanto da altura da moldura o símbolo ocupa

const BrandMark = ({ height = 46, className }: BrandMarkProps): React.JSX.Element => {
  const glyphHeight = height * FILL
  const scale = glyphHeight / GLYPH.h
  const glyphWidth = GLYPH.w * scale

  return (
    <span
      className={clsx('flex shrink-0 items-center justify-center rounded-sm bg-navy', className)}
      style={{ width: height * 0.87, height }}
    >
      <span className="relative block overflow-hidden" style={{ width: glyphWidth, height: glyphHeight }}>
        {/* <img> em vez de next/image de propósito: o recorte depende de
            posicionamento em px sobre a imagem em tamanho natural, e o arquivo
            tem só 15KB, então a otimização não compensaria. */}
        <img
          src="/logo.jpeg"
          alt=""
          className="absolute max-w-none"
          style={{
            height: GLYPH.source * scale,
            width: GLYPH.source * scale,
            top: -GLYPH.y * scale,
            left: -GLYPH.x * scale
          }}
        />
      </span>
    </span>
  )
}

export default BrandMark
