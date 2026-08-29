import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

interface BrandMarkProps {
  /** Altura do símbolo em px. A largura acompanha a proporção. */
  height?: number
  className?: string
}

// marca-priscila.webp é o símbolo recortado de logo.jpeg com o fundo removido
// por luminância, já sem o nome que vem gravado no arquivo original.
//
// Antes o símbolo vinha dentro de uma caixa navy, porque o traço é claro e
// precisava de fundo escuro. Só que o azul do arquivo (#121a27) não é o navy do
// site (#121927) e, principalmente, o header é #10141c: a caixa aparecia como um
// retângulo recortado, de azul diferente, em volta da marca. Com o fundo
// removido, o traço assenta direto sobre qualquer superfície escura.
const SOURCE = { width: 116, height: 157 }

const BrandMark = ({ height = 44, className }: BrandMarkProps): React.JSX.Element => (
  <Image
    src="/marca-priscila.webp"
    alt=""
    width={SOURCE.width}
    height={SOURCE.height}
    priority
    className={clsx('shrink-0', className)}
    style={{ height, width: Math.round(height * (SOURCE.width / SOURCE.height)) }}
  />
)

export default BrandMark
