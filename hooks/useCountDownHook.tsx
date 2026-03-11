import { useCallback, useEffect, useRef, useState } from 'react'

const useCountDownHook = (key = 'resendTimestamp', time = 30) => {
  const [resendTimer, setResendTimer] = useState(() => {
    if (typeof window === 'undefined') return 0
    const storedTimestamp = localStorage.getItem(key)
    if (!storedTimestamp) return 0
    const timePassed = Math.floor(
      (Date.now() - Number(storedTimestamp)) / 1000,
    )
    const remainingTime = time - timePassed
    if (remainingTime > 0) return remainingTime
    localStorage.removeItem(key)
    return 0
  })
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer <= 1 && intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          if (typeof window !== 'undefined') {
            localStorage.removeItem(key)
          }
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
  }, [key])

  const setTimer = useCallback(() => {
    setResendTimer(time)
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, Date.now().toString())
    }
    startTimer()
  }, [key, time, startTimer])

  useEffect(() => {
    if (resendTimer > 0) {
      startTimer()
    }
  }, [resendTimer, startTimer])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])
  return {
    resendTimer,
    startTimer,
    setTimer,
  }
}

export default useCountDownHook
