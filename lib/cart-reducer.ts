import { CartItem } from "@/components/domains/pos/cart"

export interface CartState {
  items: CartItem[]
  discount: number
  amountReceived: number
  paymentMethod: string
  phoneNumber: string
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: any }
  | { type: 'INCREMENT_ITEM'; payload: number }
  | { type: 'DECREMENT_ITEM'; payload: number }
  | { type: 'DELETE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_DISCOUNT'; payload: number }
  | { type: 'SET_AMOUNT_RECEIVED'; payload: number }
  | { type: 'SET_PAYMENT_METHOD'; payload: string }
  | { type: 'SET_PHONE_NUMBER'; payload: string }

export const initialState: CartState = {
  items: [],
  discount: 0,
  amountReceived: 0,
  paymentMethod: 'cash',
  phoneNumber: '',
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
              : item
          )
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1, total: action.payload.price }]
      }
    }
    
    case 'INCREMENT_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        )
      }
    
    case 'DECREMENT_ITEM':
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1, total: (item.quantity - 1) * item.price }
          }
          return item
        })
      }
    
    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        discount: 0,
        amountReceived: 0,
      }
    
    case 'SET_DISCOUNT':
      return {
        ...state,
        discount: action.payload
      }
    
    case 'SET_AMOUNT_RECEIVED':
      return {
        ...state,
        amountReceived: action.payload
      }
    
    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload
      }
    
    case 'SET_PHONE_NUMBER':
      return {
        ...state,
        phoneNumber: action.payload
      }
    
    default:
      return state
  }
}
