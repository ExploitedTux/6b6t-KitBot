//Made by injectExploit
const mineflayer = require('mineflayer')
const minecraftData = require('minecraft-data')
const {pathfinder,Movements,goals: { GoalNear }} = require('mineflayer-pathfinder')

//config
const WHITELIST = [
  '',
  //Add your accounts here
]
const pass = '123456' //your password here

const bot = mineflayer.createBot({
  host: '6b6t.org',
  port: 25565,
  username: 'User', //add your username here
  auth: 'offline', //change to microsoft if you want to use premium account
  version: '1.21.11'
})

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
let mcData
let busy = false
let waitingForRespawn = false

bot.loadPlugin(pathfinder)

bot.once('spawn', async () => {
  console.log('Spawned')
  console.log('15 seconds until ingame')

  mcData = minecraftData(bot.version)
  console.log('mcData loaded:', !!mcData)

  bot.pathfinder.setMovements(
    new Movements(bot, mcData))

  await sleep(1000)
  bot.chat(`/login ${pass}`)

  //travel from the register to ingame
  await sleep(3000)
  bot.setControlState('forward', true)
  await sleep(6000)
  bot.setControlState('forward', false)
  await sleep(3000)
  bot.setControlState('forward', true)
  await sleep(3000)
  bot.setControlState('forward', false)

  console.log('Ready for ?kit')
})

function getWhitelistedUser(name) {
  return WHITELIST.find(user =>
    user.toLowerCase() === name.toLowerCase()
  )
}

bot.on('messagestr', async msg => {
  console.log('[MSG]', msg)

  const tpaMatch = msg.match(/\/tpy\s+([A-Za-z0-9_]+)/i)

  if (tpaMatch) {
    const requester = tpaMatch[1]
    const whitelisted = getWhitelistedUser(requester)

    if (whitelisted) {
      console.log(`Accepting TPA from ${whitelisted}`)
      bot.chat(`/tpy ${requester}`)
    } else {
      console.log(`Ignoring TPA from ${requester}`) 
  }
  return
}

  if (busy || !msg.toLowerCase().includes('?kit')) return

  const username = WHITELIST.find(name => msg.toLowerCase().includes(name.toLowerCase()))
  if (!username) return

  console.log(`Whitelisted ${username} requested a kit`)
  busy = true

  try {
    await giveKit(username)
  } catch (e) {
    console.error('KIT ERROR:', e)
    busy = false
  }
})

async function giveKit(username) {
  console.log('Looking for shulker...')

  const shulker = await fShulker()

  if (!shulker) {
    console.log('No shulker found')
    busy = false
    return
  }

  console.log('Shulker obtained:', shulker.name)

  const oldPos = bot.entity.position.clone()

  console.log(`TPA -> ${username}`)
  bot.chat(`/tpa ${username}`)

  const teleported = await waitTeleport(oldPos, 30000)

  if (!teleported) {
    console.log('Teleport failed')
    busy = false
    return
  }

  console.log('Teleport detected')

  await sleep(1000)

  const item = bot.inventory.items().find(item =>
    item.name === 'shulker_box' ||
    item.name.endsWith('_shulker_box')
  )

  if (!item) {
    console.log('Shulker missing from inventory')
    busy = false
    return
  }

  console.log('Dropping:', item.name)

  await bot.toss(
    item.type,
    item.metadata,
    1)

  await sleep(500)

  console.log('Killing bot for respawn')

  await sleep(500)

  waitingForRespawn = true
  bot.chat('/kill')
}

async function fShulker() {
  if (!mcData) {
    console.log('mcData is not initialized')
    return null
  }

  const chestIds = [
    mcData.blocksByName.chest?.id,
    mcData.blocksByName.trapped_chest?.id
  ].filter(id => id !== undefined)

  console.log('Chest IDs:', chestIds)

  const positions = bot.findBlocks({
    matching: chestIds,
    maxDistance: 16,
    count: 100
  })

  console.log(`Found ${positions.length} chests`)

  positions.sort((a, b) =>
    bot.entity.position.distanceTo(a) -
    bot.entity.position.distanceTo(b))

  for (const pos of positions) {
    console.log(
      `Trying chest at ${pos.x}, ${pos.y}, ${pos.z}`
    )

    try {
      await bot.pathfinder.goto(
        new GoalNear(
          pos.x,
          pos.y,
          pos.z,
          2
        )
      )

      console.log('Reached chest:', pos)

      const chest = bot.blockAt(pos)

      if (!chest) {
        console.log('Chest disappeared')
        continue
      }

      console.log('Block:', chest.name)
      console.log('Opening chest...')

      const container = await bot.openContainer(chest)

      console.log('Chest opened successfully')

      const items = container.containerItems()

      console.log(
        'Contents:',
        items.map(item =>
          `${item.name} x${item.count}`
        )
      )

      const shulker = items.find(item =>
        item.name === 'shulker_box' ||
        item.name.endsWith('_shulker_box')
      )

      if (!shulker) {
        console.log('No shulker in this chest')
        container.close()
        continue
      }

      console.log(`Found ${shulker.name} in chest`)

      await container.withdraw(
        shulker.type,
        shulker.metadata,
        1
      )

      container.close()

      console.log('Shulker withdrawn')

      return shulker

    } catch (err) {
      console.error(
        `Chest failed at ${pos.x}, ${pos.y}, ${pos.z}`
      )

      console.error(err)

      try {
        if (bot.currentWindow) {
          bot.closeWindow(bot.currentWindow)
        }
      } catch {}
    }
  }

  return null
}

async function waitTeleport(oldPos, timeout) {
  const start = Date.now()

  while (Date.now() - start < timeout) {
    if (!bot.entity) {
      await sleep(250)
      continue
    }

    const distance = bot.entity.position.distanceTo(oldPos)

    if (distance > 5) {
      return true
    }

    await sleep(250)
  }

  return false
}

bot.on('spawn', () => {
  if (!waitingForRespawn) return

  waitingForRespawn = false
  busy = false

  console.log('Respawned, ready for another kit')

})

//Error handling
bot.on('kicked', reason => {
  console.error('KICKED:', reason)
})

bot.on('error', error => {
  console.error('ERROR:', error)
})

bot._client.on('error', error => {
  console.error('CLIENT ERROR:', error)
})
