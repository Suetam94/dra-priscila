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
const SOURCE = { width: 116, height: 155 }

// unoptimized: o arquivo tem 1,4KB, então o otimizador não teria o que ganhar,
// e traz dois riscos concretos. Ele negocia formato pelo cabeçalho Accept e cai
// para JPEG quando o cliente não anuncia webp, o que descarta o canal alfa e
// devolve a marca sobre fundo opaco. E mantém cache próprio por dimensão, que
// continuou servindo um recorte antigo depois de o arquivo ser corrigido.
const BrandMark = ({ height = 44, className }: BrandMarkProps): React.JSX.Element => (
  <Image
    src="/marca-priscila.webp"
    alt=""
    width={SOURCE.width}
    height={SOURCE.height}
    priority
    unoptimized
    className={clsx('shrink-0', className)}
    style={{ height, width: Math.round(height * (SOURCE.width / SOURCE.height)) }}
  />
)

export default BrandMark
