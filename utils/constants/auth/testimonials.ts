const ALL_AUTH_TESTIMONIALS = [
  {
    quote:
      'Loved the product. Other providers might look attractive for email sending but ReachInbox team improves this software every week and seeing new features make me excited. Because every update brings another solution to email marketing. I use ReachInbox for 5 months now.',
    name: 'Alperen Erbay',
    designation: 'Digital marketing agency owner',
    src: '/assets/img/onboarding/image-1.png',
  },
  {
    quote:
      'ReachInbox makes cold emailing simple, fast, and effective. Easy to use, great deliverability, and solid support. Highly recommend for anyone doing outbound!',
    name: 'Sam Abery',
    designation: '',
    src: '/assets/img/onboarding/image-2.png',
  },
  {
    quote:
      'The smart organization and automation tools save me time every day, effortlessly sorting and prioritizing messages.',
    name: 'Juliatodd',
    designation: '',
    src: '/assets/img/onboarding/image-3.png',
  },
  {
    quote:
      "Reach inbox came highly recommended and did not disappoint! They've made putting together a cold email campaign incredibly easy with all the right tools for us to succeed and have provided great support when needed",
    name: 'Miguel Legacy',
    src: '/assets/img/onboarding/image-4.png',
  },
  {
    quote:
      "It's super easy to use, keeps my campaigns organized, and has amazing deliverability. The automation saves me hours every week, and the support team is quick and genuinely helpful.",
    name: 'Gur T.',
    designation: 'Marketing Agency Owner',
    src: '/assets/img/onboarding/image-5.webp',
  },
  {
    quote:
      'Best cold email sender out there. Highly recommend it, has all kinds of features and integrations you will need to build effective and high-converting blast email campaigns.',
    name: 'Ricardo Corona',
    designation: '',
    src: '/assets/img/onboarding/ricardo-corona.png',
  },
  {
    quote:
      "This is my go-to website for finding contacts. They really allow you to drill down and find the exact poeple you are looking to contact. Much better than similiar sites I've used.",
    name: 'Michael Lesko',
    designation: '',
    src: '/assets/img/onboarding/michael-lesko.png',
  },
  {
    quote:
      'Just got started with ReachInbox and so far, things are looking really great! 🙌 One thing I gotta say the sign-up team is AMAZING. I actually missed a limited-time offer, but they still hooked me up and made sure I got the deal anyway. That’s what I call looking out! Seriously felt like a once-in-a-lifetime kind of deal. Big shoutout to the team y’all rock!',
    name: 'Bleunix Technology',
    designation: '',
    src: '/assets/img/onboarding/bleunix-technology-1.png',
  },
  {
    quote:
      "So far so good with ReachInBox.ai after almost two weeks of using another service which couldn't validate that oh, the emails were actually delivered other than into a SPAM folder! I found them through a YouTube video mention, rather than all the other fodder around all the affiliate marketing dudes. The ability to setup mailboxes easily from domains let alone to Gmail has saved tons of time, headaches and tech support compared to one of their competitors.",
    name: 'S Rowan Wilson',
    designation: '',
    src: '/assets/img/onboarding/bleunix-technology-2.png',
  },
  {
    quote:
      "New to the program, so far the best program I've used, 15 different email services. I need to get into that inbox.",
    name: 'Marcus Ruiz',
    designation: '',
    src: '/assets/img/onboarding/marcus-ruiz.png',
  },
]

export const AUTH_TESTIMONIALS = [...ALL_AUTH_TESTIMONIALS]
  .sort(() => 0.5 - Math.random())
  .slice(0, 5)
