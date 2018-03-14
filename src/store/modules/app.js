import Cookies from 'js-cookie'
import { setStore, getStore, removeStore } from '@/utils/store'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    isFullScreen: false,
    isLock: getStore({ name: 'isLock' }) || false,
    lockPasswd: getStore({ name: 'lockPasswd' }) || '',
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_FULLSCREEN: (state, action) => {
      state.isFullScreen = !state.isFullScreen;
    },
    SET_LOCK: (state, action) => {
      state.isLock = true;
      setStore({ name: 'isLock', content: state.isLock, type: 'session' })
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd;
      setStore({ name: 'lockPasswd', content: state.lockPasswd, type: 'session' })
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false;
      state.lockPasswd = '';
      removeStore({ name: 'lockPasswd' });
      removeStore({ name: 'isLock' });
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default app
