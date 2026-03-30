export const getColors = (isDark) => ({
  // backgrounds
  bg:          isDark ? '#0f0e0c' : '#faf8f5',
  sbBg:        isDark ? '#161412' : '#f5f2ed',
  card:        isDark ? '#161412' : '#ffffff',
  cardHover:   isDark ? '#1c1a16' : '#faf8f5',
  topbar:      isDark ? '#161412' : '#ffffff',
  statBg:      isDark ? '#161412' : '#ffffff',
  inputBg:     isDark ? '#1c1a16' : '#ffffff',
  panelBg:     isDark ? '#161412' : '#ffffff',

  // borders
  border:      isDark ? '#2a2520' : '#ede8e0',
  borderSub:   isDark ? '#201e1a' : '#f0ece6',

  // text
  text:        isDark ? '#e8ddd0' : '#1a1410',
  textSub:     isDark ? '#6a5e50' : '#8b7d6b',
  textMuted:   isDark ? '#4a4038' : '#a89880',

  // brand / primary action
  primary:     isDark ? '#c8b89a' : '#2c2420',
  primaryText: isDark ? '#1a1410' : '#faf8f5',
  primaryHover:isDark ? '#d8c8aa' : '#3d3530',

  // nav
  navActive:   isDark ? '#c8b89a' : '#2c2420',
  navActiveText:isDark ? '#1a1410' : '#faf8f5',
  navText:     isDark ? '#6a5e50' : '#8b7d6b',
  navActiveBg: isDark ? '#c8b89a' : '#2c2420',

  // buttons
  btnSmBg:     isDark ? '#201e1a' : '#f0ece6',
  btnSmBorder: isDark ? '#2a2520' : '#ddd6c8',
  btnSmText:   isDark ? '#8a7a6a' : '#5c5040',

  // pills
  pillBg:      isDark ? '#201e1a' : '#f0ece6',
  pillBorder:  isDark ? '#2a2520' : '#ddd6c8',
  pillText:    isDark ? '#6a5e50' : '#7a6c5c',

  // inputs
  inputBorder: isDark ? '#2a2520' : '#ddd6c8',
  inputText:   isDark ? '#e8ddd0' : '#1a1410',

  // avatar
  avBg:        isDark ? '#2a2520' : '#e0d8cc',
  avText:      isDark ? '#8a7a6a' : '#5c5040',

  // job card avatar
  jobAvBg:     isDark ? '#1e2830' : '#dde8f0',
  jobAvText:   isDark ? '#7aaccc' : '#3a6080',

  // pipeline track
  pipeTrack:   isDark ? '#201e1a' : '#ede8e0',

  // sidebar misc
  sbLogomark:  isDark ? '#c8b89a' : '#2c2420',
  sbBrand:     isDark ? '#e8ddd0' : '#1a1410',
  sbSection:   isDark ? '#4a4038' : '#a89880',
  sbFooter:    isDark ? '#2a2520' : '#e8e2d8',

  // status badges
  status: {
    Applied:   { bg: isDark ? '#1e2830' : '#e0eaf5', text: isDark ? '#7aaccc' : '#2d5a8a' },
    Interview: { bg: isDark ? '#1e2e1e' : '#dff0df', text: isDark ? '#7acc7a' : '#2a5a2a' },
    Offer:     { bg: isDark ? '#2e2010' : '#f5ede0', text: isDark ? '#cc9a50' : '#7a5020' },
    Rejected:  { bg: isDark ? '#2e1414' : '#f5e0e0', text: isDark ? '#cc7a7a' : '#7a2020' },
    Saved:     { bg: isDark ? '#201e2e' : '#ede8f5', text: isDark ? '#9a8acc' : '#4a3a7a' },
  },

  // pipeline bar colors
  pipe: {
    Applied:   '#7c9cbf',
    Interview: '#a0c4a0',
    Offer:     '#c4b89a',
    Rejected:  '#c4a09a',
    Saved:     '#b4a8c4',
  },

  // activity dot colors
  activity: {
    Offer:     '#a0c4a0',
    Interview: '#7c9cbf',
    Applied:   '#c4b89a',
    Rejected:  '#c4a09a',
    Saved:     '#b4a8c4',
  }
})