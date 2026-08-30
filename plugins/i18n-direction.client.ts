export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter()
  
    const setDirection = () => {
      const html = document.documentElement
  
      const isPersian = router.currentRoute.value.path.startsWith('/fa')
  
      if (isPersian) {
        html.setAttribute('lang', 'fa-IR')
        html.setAttribute('dir', 'rtl')
      } else {
        html.setAttribute('lang', 'en-US')
        html.setAttribute('dir', 'ltr')
      }
    }
  
    // Initial direction
    setDirection()
  
    // Change direction when route changes
    router.afterEach(() => {
      setDirection()
    })
  })