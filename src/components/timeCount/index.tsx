import React from "react"
import { Card } from "@/components/ui/card"
import { TimeLeft } from "@/interface"
import TimeCounterImg from "../../assets/images/time-counter-img.svg"
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

export default function TimeCount() {
  const targetDate = React.useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 10)
    return date
  }, [])

  const timeLeft = useCountdown(targetDate)

  return (
    <Card className="w-full gap-x-3    shadow-lg">
      <div className="relative flex  ">
        <img
          src={TimeCounterImg}
          alt="People in a meeting"
          className=" w-[250px] h-[253px] rounded-md object-cover"
        />

        <div className="  flex flex-col items-center gap-2  py-5 px-4 ">
          <div>

            <h2 className=" text-[23px] leading-tight text-center  font-light ">
              Take the Next Step Towards Achieving Personal and Professional Goals
            </h2>
          </div>

          <div className=" flex  flex-row w-full items-center text-center">
            {Object.entries(timeLeft).map(([key, value]) => (
              <div key={key} className="flex bg-black w-full flex-col items-center">
                <div className="bg-black h-full text-white rounded-lg px-4 py-2  ">
                  <span className=" font-normal text-4xl tabular-nums">
                    {value.toString().padStart(2, "0")}
                  </span>
                </div>
                <div className="w-full h-10 bg-[#749BA9] text-center py-2">
                  <h1 className=" text-center font-semibold text-xs text-white capitalize">{key}</h1>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </Card>
  )
}
