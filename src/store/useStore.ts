'use client';
import { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, BetSlipItem, PlacedBet } from '@/types';

interface State {
  user: User | null;
  isLoggedIn: boolean;
  betSlip: BetSlipItem[];
  placedBets: PlacedBet[];
  showAuthModal: boolean;
  authMode: 'login' | 'register';
  authRedirectAction: string | null;
  showBetSlip: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_TO_BETSLIP'; payload: BetSlipItem }
  | { type: 'REMOVE_FROM_BETSLIP'; payload: string }
  | { type: 'CLEAR_BETSLIP' }
  | { type: 'UPDATE_ODDS'; payload: { selectionId: string; odds: number } }
  | { type: 'SHOW_AUTH'; payload: { mode: 'login' | 'register'; action?: string } }
  | { type: 'HIDE_AUTH' }
  | { type: 'TOGGLE_BETSLIP' }
  | { type: 'PLACE_BET'; payload: PlacedBet }
  | { type: 'UPDATE_BALANCE'; payload: number }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const initialState: State = {
  user: null,
  isLoggedIn: false,
  betSlip: [],
  placedBets: [],
  showAuthModal: false,
  authMode: 'login',
  authRedirectAction: null,
  showBetSlip: false,
  notifications: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload, isLoggedIn: true, showAuthModal: false };
    case 'LOGOUT':
      return { ...state, user: null, isLoggedIn: false, betSlip: [] };
    case 'ADD_TO_BETSLIP':
      const exists = state.betSlip.find(b => b.selectionId === action.payload.selectionId);
      if (exists) {
        return { ...state, betSlip: state.betSlip.filter(b => b.selectionId !== action.payload.selectionId) };
      }
      return { ...state, betSlip: [...state.betSlip, action.payload], showBetSlip: true };
    case 'REMOVE_FROM_BETSLIP':
      return { ...state, betSlip: state.betSlip.filter(b => b.selectionId !== action.payload) };
    case 'CLEAR_BETSLIP':
      return { ...state, betSlip: [] };
    case 'SHOW_AUTH':
      return { ...state, showAuthModal: true, authMode: action.payload.mode, authRedirectAction: action.payload.action || null };
    case 'HIDE_AUTH':
      return { ...state, showAuthModal: false, authRedirectAction: null };
    case 'TOGGLE_BETSLIP':
      return { ...state, showBetSlip: !state.showBetSlip };
    case 'PLACE_BET':
      return { ...state, placedBets: [action.payload, ...state.placedBets], betSlip: [], showBetSlip: false };
    case 'UPDATE_BALANCE':
      if (!state.user) return state;
      return { ...state, user: { ...state.user, balance: action.payload } };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, action.payload] };
    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    default:
      return state;
  }
}

import React from 'react';

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return React.createElement(StoreContext.Provider, { value: { state, dispatch } }, children);
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
