import { useState } from "react"
import { Calendar } from 'lucide-react'
import { Button } from "./ui/Button"
import { Calendar as CalendarComponent } from "./ui/Calender"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/Popover"
import { cn } from "./ui/lib/utils"
import { format } from "date-fns"

const Tickets = () => {
  const [date, setDate] = useState()
  const [ticketType, setTicketType] = useState("regular")
  const [quantity, setQuantity] = useState(1)

  const ticketTypes = {
    regular: {
      name: "Regular Admission",
      price: 25,
      description: "Access to all gallery exhibitions",
    },
    student: {
      name: "Student",
      price: 15,
      description: "Valid student ID required",
    },
    vip: {
      name: "VIP Experience",
      price: 50,
      description: "Includes guided tour and exhibition catalog",
    },
  }

  const handleBooking = (e) => {
    e.preventDefault()
    // Handle booking logic here
    console.log({
      date,
      ticketType,
      quantity,
      total: ticketTypes[ticketType].price * quantity,
    })
  }

  return (
    <div className="min-h-screen py-20 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Book Tickets</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-900 rounded-lg p-8">
            <form onSubmit={handleBooking} className="space-y-6">
              <div>
                <label className="block text-lg mb-2">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent className={"bg-blue-200"}
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="block text-lg mb-2">Ticket Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(ticketTypes).map(([type, details]) => (
                    <div
                      key={type}
                      className={`p-4 rounded-lg border-2 cursor-pointer ${
                        ticketType === type
                          ? "border-white bg-gray-800"
                          : "border-gray-700"
                      }`}
                      onClick={() => setTicketType(type)}
                    >
                      <h3 className="font-bold mb-1">{details.name}</h3>
                      <p className="text-2xl font-bold mb-2">${details.price}</p>
                      <p className="text-sm text-gray-400">{details.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-lg mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-xl font-bold">{quantity}</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800">
                <div className="flex justify-between mb-4">
                  <span className="text-lg">Total</span>
                  <span className="text-2xl font-bold">
                    ${ticketTypes[ticketType].price * quantity}
                  </span>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200"
                  size="lg"
                >
                  Book Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tickets
