# TODO
## Edit tasks
- All day / Date only
### Misc
- Make today not be a sort thing
- Focus on input box
- Make tasks unparentable
- Show completed tasks
## Input field
- make day trigger auto set date
  - monday tuesday wednesday thursday friday saturday sunday
  - weekend
  - next week
- make / trigger tags
- make # trigger duration
## Dashboard
- Stats
## Global State architecture
state = {
  items: [],
  prefs: {
    general: {
      default_duration: 30,
      tags: [
        { value: 'Personal Projects', label: 'Personal Projects', color: '#bd3a61' },
      ]
    },
    appearence: {
      theme: 'dark',
      style: 'regular,
      wallpaper: false
    },
  }
}