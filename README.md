# Sigmacord: Elevate Your Discord Experience

Unlock an unparalleled Discord experience with Sigmacord – your ultimate Discord client. Sigmacord is feature-packed, offering you a wealth of powerful tools, including customizable plugins, breathtaking themes, seamless CSS theme integration, and full-fledged Vencord support. Step into the future of Discord interaction with Sigmacord today!

# Usage Information

## Installation

1. Visit our [releases page](https://www.github.com/enginestein/Sigmacord/releases) to download the latest MSI installer.
2. Install Sigmacord by running the downloaded MSI installer.

## Plugins

Sigmacord comes pre-equipped with numerous plugins, all accessible via the **Settings/Plugins** menu.

![Sigmacord Plugins](https://github.com/enginestein/Sigmacord/assets/117010357/bf7d9f0e-7cc2-4ca5-9ebc-e9b016fd3b50)

To add custom plugins, navigate to **Settings/Sigmacord Settings**. Scroll down until you locate the **folders** section, which includes the **Plugins folder** and **Themes folder**. Click the black folder button to access the respective folders, typically found in **C:/Users/user/sigmacord/**.

For new plugins, create a new folder with a custom name within the Plugins folder and place the plugin files inside it. If the plugin already comes in a folder, paste the entire folder, ensuring there are no nested folders within the plugin folder.

The process for adding new themes is identical to adding plugins. Once added, you'll find your themes listed in the Sigmacord settings under the **Theme** dropdown menu. Select your desired theme, scroll down, and click the "Save and Restart" button.

![Sigmacord Themes](https://github.com/enginestein/Sigmacord/assets/117010357/ea2805e5-92ce-46c4-be0d-9c44473d0254)

For plugin management, scroll further down to the **Plugins** section.

![Plugin Management](https://github.com/enginestein/Sigmacord/assets/117010357/7ccf6067-160c-4230-aff9-232029eb6504)

Dive into the world of Sigmacord, where customization and enhanced functionality await your Discord journey!

# For developers

## Building Sigmacord

To set up Sigmacord and get started, you'll need a few prerequisites: `pnpm`, `node`, and `cargo`. Once you have these installed, follow these steps:

1. Clone the Sigmacord repository to your local machine.

2. Navigate to the cloned repository's directory in your terminal.

3. Install the necessary packages by running:

   ```shell
   pnpm install
   ```

4. Next, build the project files with:

   ```shell
   pnpm build
   ```

5. Build the Tauri source files:

   ```shell
   pnpm tauri build
   ```

6. Finally, you can run Sigmacord using:

   ```shell
   pnpm tauri dev
   ```   

# Ending note

Thank you for installing Sigmacord (if you have). 

Sigmacord is not made with love, its made with brain 🧠

[Join our server](https://discord.gg/GMeBhcvcq7)
