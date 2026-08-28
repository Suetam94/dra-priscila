import React from 'react'
import clsx from 'clsx'

interface BrandMarkProps {
  size?: number
  className?: string
}

const CROP = { source: 500, x: 115, y: 70, size: 270 }

const BrandMark = ({ size = 36, className }: BrandMarkProps): React.JSX.Element => {
  const scale = size / CROP.size

  return (
    <span
      className={clsx('relative block overflow-hidden rounded-sm shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.jpeg"
        alt=""
        className="absolute max-w-none"
        style={{
          width: CROP.source * scale,
          height: CROP.source * scale,
          top: -CROP.y * scale,
          left: -CROP.x * scale
        }}
      />
    </span>
  )
}

export default BrandMark
