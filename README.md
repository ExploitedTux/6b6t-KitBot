<div align="center">
Mineflayer KitBot
<p> <strong>A simple and lightweight Minecraft kitbot built with Mineflayer.</strong> </p> <p> Automatically deliver shulker kits to whitelisted players with minimal setup. </p> <br> <a href="https://github.com/ExploitedTux/6b6t-KitBot"> <img src="https://img.shields.io/github/stars/ExploitedTux/6b6t-KitBot?style=for-the-badge&color=yellow" alt="Stars"> </a> <a href="https://github.com/ExploitedTux/6b6t-KitBot"> <img src="https://img.shields.io/github/forks/ExploitedTux/6b6t-KitBot?style=for-the-badge" alt="Forks"> </a> <a href="https://github.com/ExploitedTux/6b6t-KitBot/blob/main/LICENSE"> <img src="https://img.shields.io/github/license/ExploitedTux/6b6t-KitBot?style=for-the-badge" alt="License"> </a>

<br><br>

<a href="#features">Features</a> •
<a href="#requirements">Requirements</a> •
<a href="#installation">Installation</a> •
<a href="#configuration">Configuration</a> •
<a href="#usage">Usage</a> •
<a href="#important">Important</a> •
<a href="#support">Support</a>

</div>
<h2 id="features">Features</h2> <table> <tr> <td width="50%"> <h3>Automatic Login</h3>

Automatically logs into the Minecraft server using the configured password.

</td> <td width="50%"> <h3>Kit Delivery</h3>

Automatically finds and delivers shulker kits to whitelisted players.

</td> </tr> <tr> <td> <h3>Chest Searching</h3>

Searches nearby chests for available shulker boxes.

</td> <td> <h3>Pathfinding</h3>

Uses Mineflayer Pathfinder to automatically walk to nearby chests.

</td> </tr> <tr> <td> <h3>Whitelist</h3>

Only players added to the whitelist can request kits.

</td> <td> <h3>Automatic Respawn</h3>

Respawns after delivering a kit and becomes ready for the next request.

</td> </tr> <tr> <td> <h3>Simple Setup</h3>

Configure the bot and whitelist in a single configuration file.

</td> <td> <h3>Lightweight</h3>

Designed to be simple, minimal, and easy to run.

</td> </tr> </table>
<h2 id="requirements">Requirements</h2> <p>Before running the bot, make sure you have the following installed:</p> <ul> <li><b>Node.js</b> 26.9.0</li> <li><b>npm</b></li> <li><b>Mineflayer</b></li> <li><b>minecraft-data</b></li> <li><b>mineflayer-pathfinder</b></li> <li><b>A Minecraft server</b> that allows your bot to connect</li> </ul>
<h2 id="installation">Installation</h2> <h3>1. Clone the Repository</h3> <p>Clone the repository and enter the project directory:</p> <pre><code>git clone https://github.com/ExploitedTux/6b6t-KitBot.git cd 6b6t-KitBot</code></pre> <h3>2. Install Dependencies</h3> <p>Install the required Node.js dependencies:</p> <pre><code>npm install</code></pre> <h3>3. Configure the Bot</h3> <p>Configure your Minecraft account, server, password, and whitelist.</p> <h3>4. Start the Bot</h3> <pre><code>node kitbot.js</code></pre> <p> The bot should now connect to the server and be ready to receive kit requests. </p>
<h2 id="configuration">Configuration</h2> <p> The bot uses <code>config.json</code> for its main configuration. </p> <h3>Example Configuration</h3> <pre><code>{ {
  "username": "kitbot",
  "password": "123456789",
  "whitelist": ["madman432", "excitedguy431"],
  "rec": "4000",
  "ip": "simpleanarchy.org"
}
 }</code></pre> <h3>Minecraft Connection</h3> <table> <tr> <th>Setting</th> <th>Description</th> </tr> <tr> <td><code>username</code></td> <td>Minecraft username used by the bot.</td> </tr> <tr> <td><code>password</code></td> <td>Password used for servers requiring <code>/login</code>.</td> </tr> <tr> <td><code>ip</code></td> <td>Minecraft server address.</td> </tr> <tr> <td><code>whitelist</code></td> <td>Players allowed to request kits.</td> </tr> </table> <h3>Whitelist</h3> <p> Only players listed in <code>whitelist</code> can use the kit command. </p> <pre><code>"whitelist": [ "PlayerOne", "PlayerTwo" ]</code></pre>
<h2 id="usage">Usage</h2> <h3>Requesting a Kit</h3> <p> Whitelisted players can request a kit using: </p> <pre><code>?kit</code></pre> <p> The bot will: </p> <ol> <li>Detect the <code>?kit</code> request.</li> <li>Check whether the player is whitelisted.</li> <li>Search nearby chests for a shulker box.</li> <li>Walk to the chest using Pathfinder.</li> <li>Withdraw one shulker.</li> <li>Send a TPA request to the player.</li> <li>Wait for the teleport.</li> <li>Drop the shulker.</li> <li>Use <code>/kill</code> to respawn.</li> <li>Become ready for another kit.</li> </ol> <h3>Example</h3> <pre><code>PlayerOne: ?kit</code></pre> <p> If <code>PlayerOne</code> is whitelisted and a shulker is available, the bot will automatically process the request. </p>
<h2 id="important">Important</h2> <h3>Chest Location</h3> <p> The kitbot needs to be near chests containing shulker boxes. The bot searches for nearby normal and trapped chests and checks them for shulkers. </p> <h3>Respawn Point</h3> <p> There needs to be a valid respawn point near the chest area so the bot can return after using <code>/kill</code>. </p> <h3>Whitelist</h3> <p> Only players included in the configured whitelist can request kits. </p> <h3>TPA</h3> <p> The bot sends TPA requests when delivering kits, but it does not automatically accept incoming TPA requests from other players. </p>
<h2>Project Structure</h2> <pre><code>6b6t-KitBot/ ├── kitbot.js ├── config.json ├── package.json ├── package-lock.json ├── LICENSE └── README.md</code></pre>
<h2>Customization</h2> <p> The bot is designed to be easy to customize. </p> <table> <tr> <th>Setting</th> <th>Configurable</th> </tr> <tr> <td><b>Minecraft Server</b></td> <td>Yes</td> </tr> <tr> <td><b>Bot Username</b></td> <td>Yes</td> </tr> <tr> <td><b>Login Password</b></td> <td>Yes</td> </tr> <tr> <td><b>Player Whitelist</b></td> <td>Yes</td> </tr> <tr> <td><b>Kit Command</b></td> <td>Yes</td> </tr> <tr> <td><b>Chest Search Distance</b></td> <td>Yes</td> </tr> </table>
<h2>Links</h2> <table> <tr> <td><b>GitHub</b></td> <td> <a href="https://github.com/ExploitedTux/6b6t-KitBot">6b6t-KitBot</a> </td> </tr> <tr> <td><b>Mineflayer</b></td> <td> <a href="https://github.com/PrismarineJS/mineflayer">Mineflayer</a> </td> </tr> <tr> <td><b>Mineflayer Pathfinder</b></td> <td> <a href="https://github.com/PrismarineJS/mineflayer-pathfinder">mineflayer-pathfinder</a> </td> </tr> <tr> <td><b>Minecraft Data</b></td> <td> <a href="https://github.com/PrismarineJS/minecraft-data">minecraft-data</a> </td> </tr> </table>
<h2 id="support">Support</h2> <p> Need help or want to get in touch? </p> <table> <tr> <td><b>LEC Public Discord</b></td> <td><code>discord.gg/6b6tlec</code></td> </tr> <tr> <td><b>Discord</b></td> <td><code>injectexploit</code> / <code>exploitedtux</code></td> </tr> </table>
<h2>License</h2> <p> This project is released under the <b>MIT License</b>. </p> <p> See <a href="LICENSE">LICENSE</a> for more information. </p> <br> <div align="center"> <p> <b>Made by ExploitedTux / injectExploit</b> </p> <p> <i>I'm too lazy to update, I gotta build cat girl mapart. I'm sorry.</i> </p> <br> <a href="https://github.com/ExploitedTux/6b6t-KitBot"> <img src="https://img.shields.io/github/stars/ExploitedTux/6b6t-KitBot?style=for-the-badge&color=yellow" alt="Stars"> </a> <a href="https://github.com/ExploitedTux/6b6t-KitBot"> <img src="https://img.shields.io/github/forks/ExploitedTux/6b6t-KitBot?style=for-the-badge" alt="Forks"> </a> <a href="https://github.com/ExploitedTux/6b6t-KitBot/blob/main/LICENSE"> <img src="https://img.shields.io/github/license/ExploitedTux/6b6t-KitBot?style=for-the-badge" alt="License"> </a> </div> ```

I kept the original HTML-heavy README style and badge layout, but updated the content to reflect the current KitBot behavior, including the fact that it sends TPA requests but doesn't accept incoming /tpy requests.
