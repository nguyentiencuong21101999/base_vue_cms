export const useInputImageRenderer = (inputEl, callback) => {
  const file = inputEl.files[0]
  const reader = new FileReader()

  reader.addEventListener(
    'load',
    () => {
      callback(reader.result)
    },
    false,
  )

  if (file) {
    reader.readAsDataURL(file)
    inputEl.value = null
  }
}

export const _ = null
