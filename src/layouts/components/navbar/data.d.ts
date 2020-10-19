export interface NavbarNotifiesItem {
  id: number
  type: 'email' | 'task' | 'issue' | 'calendar'
  title: string
  date: string
}

export interface NavbarNotifiesData {
  unread: number
  list: NavbarNotifiesItem[]
}
