export default [
  {
    title: 'Email Subscribe',
    icon: 'MailIcon',
    route: 'email-subscribe',
  },
  {
    title: 'Email Template',
    icon: 'SendIcon',

    children: [
      {
        title: 'Offer Letter',
        route: 'offer',
        icon: 'EditIcon',
      },
      {
        title: 'Interview Invitation',
        route: 'interview',
        icon: 'InboxIcon',
      },
      {
        title: 'Thank-you Letter',
        route: 'letter',
        icon: 'MessageSquareIcon',
      },
    ],
  },
]
