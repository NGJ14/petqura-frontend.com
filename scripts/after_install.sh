#!/bin/bash
sudo cp -a /home/ubuntu/pawwalker-fe-temp/. /home/ubuntu/pawwalker-fe/
#sudo cp /home/ubuntu/messejapp-admin/env_variables/environment.dev /home/ubuntu/messejapp-admin/develop/.env
sudo find /home/ubuntu/pawwalker-fe -type f -exec chown ubuntu.ubuntu {} \;
sudo find /home/ubuntu/pawwalker-fe -type f -exec chmod 644 {} \;
sudo find /home/ubuntu/pawwalker-fe -type d -exec chown ubuntu.ubuntu {} \;
sudo find /home/ubuntu/pawwalker-fe -type d -exec chmod 755 {} \;
# cd /home/ubuntu/pawwalker-fe
# npm install
# npm audit fix
# chmod +x node_modules/react-scripts/bin/react-scripts.js
# npm run build
