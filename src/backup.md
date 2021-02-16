# TODO
## Edit tasks
- All day / Date only
## Views
- Compact
- Colorful
- Light 
### Misc
- Make today not be a sort thing
- Focus on input box
- Make tasks unparentable
- Debug tools
  - print out current list
  - delete all current items <-
## Input field
- make day trigger auto set date
  - monday tuesday wednesday thursday friday saturday sunday
  - weekend
  - next week
- make / trigger tags
- make # trigger duration
## Preferences
- General
  - Set Default Duration
  - Set tags
    - Change tag names
    - Change tag colors


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