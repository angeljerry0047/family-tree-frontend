# steps to deploy
# 1) update version in app.json

# 2) update expo cli
npm install -g expo-cli
npm install -g eas-cli

# 3) update npm modules
npm install

# 4) build app
expo build:ios

# 5) upload app (ask monzer for password)
expo upload:ios --apple-id monzer@exequt.com --apple-id-password current-password
# when asked for app specfic password type this in:
# wsdn-lvah-danw-uqlt
