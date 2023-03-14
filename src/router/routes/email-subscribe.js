export default [
  {
    path: '/email-subscribe',
    name: 'email-subscribe',
    component: () => import('@/views/email-subscribe/EmailSubscribe.vue'),
  },
  {
    path: '/email-offer',
    name: 'offer',
    component: () => import('@/views/send-email/EmailOffer.vue'),
  },
  {
    path: '/email-interview',
    name: 'interview',
    component: () => import('@/views/send-email/EmailInvite.vue'),
  },
  {
    path: '/email-letter',
    name: 'letter',
    component: () => import('@/views/send-email/EmailLetter.vue'),
  },
]
