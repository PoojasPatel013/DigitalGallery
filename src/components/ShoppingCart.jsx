'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCartIcon as CartIcon, X, Plus, Minus } from 'lucide-react'
import { Button } from './ui/Button'

const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState([])

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart([...cart, item])
  }

  const removeFromCart = (index) => {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  const updateQuantity = (index, delta) => {
    const newCart = [...cart]
    newCart[index].quantity = Math.max(1, (newCart[index].quantity || 1) + delta)
    setCart(newCart)
  }

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  return (
    <>
      <Button
        className="fixed top-4 right-4 z-50"
        onClick={() => setIsOpen(true)}
      >
        <CartIcon className="w-6 h-6 mr-2" />
        <span>{totalItems}</span>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-96 bg-gray-900 shadow-lg z-50 p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                <ul className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-400">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(index, -1)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span>{item.quantity || 1}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(index, 1)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => removeFromCart(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-xl font-bold mb-4">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <Button className="w-full" size="lg">
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ShoppingCart
