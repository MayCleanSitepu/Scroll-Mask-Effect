'use client'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from './page.module.css'

export default function Home() {

  const container = useRef(null)
  const stickyMask = useRef(null)

  const initialMaskSize = .8
  const targetMaskSize = 30

  useEffect(() => {
    requestAnimationFrame(animate)
  }, [])

  const easing = 0.15
  let easedScrollProgress = 0

  const animate = () => {
    const maskSizeProgress = targetMaskSize * getScrollProgress()
    stickyMask.current.style.webkitMaskSize = (initialMaskSize + maskSizeProgress) * 100 + '%'
    requestAnimationFrame(animate)
  }

  const getScrollProgress = () => {
    const scrollProgress = stickyMask.current.offsetTop / (container.current.getBoundingClientRect().height - window.innerHeight)
    const delta = scrollProgress - easedScrollProgress 
    easedScrollProgress += delta * easing
    return easedScrollProgress
  }

  return (
    <main className={styles.main} >
        <div ref={container} className={styles.container}>
          <div ref={stickyMask} className={styles.stickyMask}>
            <video autoPlay muted loop>
              <source src="/medias/maycoba4k.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
    </main>
  )
}
