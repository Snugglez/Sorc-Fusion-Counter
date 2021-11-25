module.exports = function sorcfusioncount(d) {
  let fusionCount = 0,
    fontArray = ['#ffb3b3', '#ffc6b3', '#ffd9b3', '#ffecb3', '#ffffb3', '#d9ffb3', '#b3ffb3', '#b3ffff', '#b3b3ff', '#ecb3ff', '#ecb3ff', '#ecb3ff', '#ecb3ff', '#ecb3ff', '#ecb3ff']

  const hook = (name, cb) => { d.hook(name, '*', { order: -9999999 }, cb) }

  hook('S_ACTION_STAGE', (e) => {
    if (d.game.me.class !== 'sorcerer' || !d.game.me.is(e.gameId) || !d.settings.enabled) return;
    if (e.skill.id == 360600) {
      fusionCount++;
      if (d.settings.inchat) d.command.base.message(false, `<font color='${fontArray[fusionCount - 1]}'>[Fusion] ${fusionCount !== 9 ? fusionCount.toString() + '/9' : 'perfect!'}</font>`)
      if (d.settings.popup)
        d.send('S_DUNGEON_EVENT_MESSAGE', 2, {
          message: `<img src="img://skill__0__${d.game.me.templateId}__360600" width="48" height="48" vspace="-24"/><font size="24" color="${fontArray[fusionCount - 1]}">&nbsp;${fusionCount !== 9 ? fusionCount.toString() + '/9' : 'perfect!'}</font>`,
          type: 51,
          chat: false,
          channel: 0,
        })
    }
  })

  hook('C_START_SKILL', (e) => {
    if (d.game.me.class !== 'sorcerer' || !d.settings.enabled) return;
    if (Math.floor(e.skill.id / 10000) == 34) fusionCount = 0
  })

  d.command.add('sfc', (arg) => {
    if (!arg) {
      d.settings.enabled = !d.settings.enabled
      d.command.message(`${d.settings.enabled ? 'enabled' : 'disabled'}`)
    }
    if (['inchat', 'chat'].includes(arg)) {
      d.settings.inchat = !d.settings.inchat
      d.command.message(`chat log ${d.settings.inchat ? 'enabled' : 'disabled'}`)
    }
    if (arg == 'popup') {
      d.settings.popup = !d.settings.popup
      d.command.message(`popup ${d.settings.popup ? 'enabled' : 'disabled'}`)
    }
  })
}
