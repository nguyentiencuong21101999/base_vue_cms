import store from '@/store'

export const getAbility = isLoggedIn => {
  switch (isLoggedIn) {
    case true:
      return [
        {
          action: 'manage',
          subject: 'all',
        },
      ]
    case false:
      return [
        {
          action: 'read',
          subject: 'Auth',
        },
      ]
    default:
      return [
        {
          action: 'read',
          subject: 'Auth',
        },
      ]
  }
}

export const formatRole = roleId => {
  switch (roleId) {
    case 1:
      return 'superadmin'
    case 2:
      return 'admin'
    default:
      return 'user'
  }
}

export const isRoleSuperAdmin = () => store.state.auth.user.role === 'superadmin'
export const isRoleAdmin = () => store.state.auth.user.role === 'admin'
export const isRoleUser = () => store.state.auth.user.role === 'user'
