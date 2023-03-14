import ToastificationContent from '@core/components/toastification/ToastificationContent'
import toast from '@/libs/toastification'

export const errorHandler = err => {
  const error = err.response ? err.response.data.error : err
  if (error.isAxiosError) {
    if (error.message === 'Network Error') {
      toast({
        component: ToastificationContent,
        props: {
          title: 'Connection',
          icon: 'BellIcon',
          text: 'Please check your internet connection',
          variant: 'danger',
        },
      })
      return
    }
  }
  toast({
    component: ToastificationContent,
    props: {
      title: 'Error',
      icon: 'AlertTriangleIcon',
      text: error.message || error,
      variant: 'danger',
    },
  })
}

export default function useToastHandler() {
  const showToastError = (err, title) => {
    toast({
      component: ToastificationContent,
      props: {
        title: title || 'Error',
        icon: 'AlertTriangleIcon',
        text: err ? err.message || err : null,
        variant: 'danger',
      },
    })
  }

  const showToastSuccess = (title, text) => {
    toast({
      component: ToastificationContent,
      props: {
        title,
        text,
        icon: 'CheckIcon',
        variant: 'success',
      },
    })
  }

  return {
    errorHandler,
    showToastError,
    showToastSuccess,
  }
}
