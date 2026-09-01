import { useState } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string | null
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, width, height, className, priority = false }: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(src)

  const handleError = () => {
    if (!imageError && imageSrc) {
      setImageError(true)
      setImageSrc(null)
    }
  }

  if (!imageSrc || imageError) {
    return (
      <div 
        className={`flex items-center justify-center bg-muted/50 text-muted-foreground text-xs font-medium ${className}`}
        style={{ width, height }}
      >
        No image
      </div>
    )
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      className={className}
      onError={handleError}
    />
  )
}
